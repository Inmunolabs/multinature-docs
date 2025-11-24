# 01 – Sistema de formularios clínicos (forms-api)

## Reglas, comportamiento y propuestas de mejora

Este documento describe el comportamiento funcional del **sistema de formularios / cuestionarios clínicos** de Multinature, a partir del modelo de datos:

- `concepts`
- `form_templates`
- `form_template_concepts`
- `filled_forms`
- `filled_form_values`

Además incluye **propuestas de mejora** concretas (con explicación del por qué y cómo agregarlas al proyecto), pensando en su interoperabilidad con el **dietAgent** y en la trazabilidad histórica de la información clínica.

---

## 1. `concepts` – Catálogo de conceptos clínicos

Representa el catálogo de **conceptos medibles o registrables** (ej. peso, talla, horas de sueño, antecedentes clínicos, preguntas abiertas de estilo de vida, etc.) que se pueden usar en uno o varios formularios.

```sql
CREATE TABLE `concepts` (
  `id` varchar(36) NOT NULL,
  `specialist_id` varchar(36) DEFAULT NULL,
  `name` varchar(100) NOT NULL,
  `default_unit` varchar(20) DEFAULT NULL,
  `description` text,
  PRIMARY KEY (`id`)
);
```

### 1.1 Campos y reglas implícitas

- `id` (`varchar(36)`, PK)  
  Identificador único del concepto (UUID). Es la referencia estable que se reusa en plantillas y valores llenados históricamente.

- `specialist_id` (`varchar(36)`, FK opcional hacia `users.id`)

  - `NULL` → concepto **global** (puede ser usado por cualquier especialista dentro de una especialidad).
  - No nulo → concepto **particular de un especialista** (catálogo privado o semi-privado).

- `name` (`varchar(100)`, NOT NULL)  
  Nombre canónico del concepto (ej. `"Peso"`, `"Estatura"`, `"¿Consumes alcohol?"`).  
  Es el texto base; puede ser sobreescrito en la plantilla vía `custom_name`.

- `default_unit` (`varchar(20)`, NULL)  
  Unidad sugerida (`"kg"`, `"cm"`, `"mmHg"`, `"h"`, etc.).  
  Se puede sobreescribir en la configuración de la plantilla.

- `description` (`text`, NULL)  
  En la práctica se está usando como **categoría / grupo visual** para el formulario, por ejemplo: `"Hábitos de sueño"`, `"Estilo de vida"`, `"Clínico"`, `"Dietético"`, `"Antecedentes de ejercicio"`.  
  El backend ya expone esta descripción como `description` en cada `question` del payload:

  ```json
  {
    "conceptId": "23ba7e84-94ba-11f0-8618-1290daed9e2f",
    "customName": "¿Cuál es tu horario de sueño durante la semana?",
    "unit": "",
    "description": "Hábitos de sueño",
    "isGraphable": false,
    "isMandatory": false
  }
  ```

### 1.2 Comportamiento derivado

- **Concepto como pieza central**  
  Un `concept` conecta:

  - Lo que se muestra en los formularios (`form_template_concepts` → `questions` en el payload).
  - Los valores clínicos capturados a lo largo del tiempo (`filled_form_values`).

- **No se debe borrar en duro**  
  Dado que:

  - No existe `ON DELETE CASCADE` desde `concepts` hacia `form_template_concepts` ni `filled_form_values`,
  - Y un mismo concepto puede tener N registros históricos,

  entonces, a nivel de negocio, **no conviene borrar conceptos físicamente**.

  Estrategia recomendada: agregarlos a una lista de “conceptos deprecados / ocultos” para que dejen de aparecer como opción al crear nuevas plantillas, pero se conserven para lectura histórica.

  <!-- TODO: Agregar los conceptos borrados a una lista de “conceptos deprecados / ocultos” para que dejen de aparecer como opción al crear nuevas plantillas, pero se conserven para lectura histórica. -->

---

## 2. `form_templates` – Plantillas de formularios clínicos

Cada registro representa una **plantilla de cuestionario clínico**, por ejemplo:

- `"Formulario base de Nutrición"` (valoración inicial estándar)
- `"Preguntas para pacientes diabeticos"` (plantilla personalizada de un especialista)

```sql
CREATE TABLE `form_templates` (
  `id` varchar(36) NOT NULL,
  `specialty_id` varchar(36) DEFAULT NULL,
  `specialist_id` varchar(36) DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL,
  `description` text,
  `is_initial_assessment` tinyint(1) NOT NULL DEFAULT '0',
  `is_dietagent_intake` tinyint(1) NOT NULL DEFAULT '0',
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `deleted_at` datetime DEFAULT NULL,
  `base_template_id` char(36) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `specialistId` (`specialist_id`),
  KEY `fk_form_templates_base` (`base_template_id`),
  CONSTRAINT `fk_form_templates_base` FOREIGN KEY (`base_template_id`) REFERENCES `form_templates` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `form_templates_ibfk_1` FOREIGN KEY (`specialist_id`) REFERENCES `users` (`id`)
);
```

### 2.1 Campos y reglas implícitas

- `id` (`varchar(36)`, PK)  
  Identificador único de la plantilla (UUID).

- `specialty_id` (`varchar(36)`, NULL)  
  Especialidad clínica a la que pertenece la plantilla (nutrición, entrenamiento, psicología, etc.).

  > Aunque el FK no está declarado, se asume que apunta a la tabla de especialidades.

- `specialist_id` (`varchar(36)`, FK, NULL)

  - `NULL` → plantilla **global** para una especialidad (ej. `"Formulario base de Nutrición"`).
  - Con valor → plantilla **propia de un especialista**.

- `name` (`varchar(100)`, NULL)  
  Nombre de la plantilla (se muestra en el selector `Seleccionar Cuestionario`).

- `description` (`text`, NULL)  
  Descripción general de la plantilla, usada en la UI como texto de contexto bajo el título del formulario.

- `is_initial_assessment` (`tinyint(1)`, default `0`)  
  Marca si la plantilla corresponde a una **valoración inicial**.  
  A nivel de negocio se puede usar para:

  - Preseleccionar esta plantilla cuando se abre el módulo de “Responder Cuestionario” por primera vez.
  - Regla típica: por especialidad, puede existir una plantilla base de inicio recomendada por Multinature.

- `is_dietagent_intake` (`tinyint(1)`, default `0`)  
  Flag exclusivo para **dietAgent Intake**.  
  - `1` → plantilla que nutre el plan de 7 días generado por el agente (etapa A).  
  - `0` → plantilla usada para valoraciones generales o de seguimiento.  
  Reglas:
  - Debe existir al menos una plantilla global `is_dietagent_intake = 1` por especialidad soportada por dietAgent.
  - Los clones derivados deben heredar el flag y solo se habilitan si mantienen compatibilidad con la plantilla base.

- `created_at`, `updated_at` (`datetime`)  
  Timestamps de auditoría. `updated_at` debería actualizarse desde backend al modificar la plantilla.

- `deleted_at` (`datetime`, NULL)  
  Habilita **soft delete** de la plantilla.

  - Consultas sobre plantillas activas deben filtrar `WHERE deleted_at IS NULL`.
  - Esto permite que **formularios históricos** (`filled_forms`) sigan referenciando la plantilla aunque se deje de usar.

- `base_template_id` (`char(36)`, FK hacia `form_templates.id`)  
  Permite manejar herencia / clonación de plantillas.
  - `ON DELETE SET NULL` → si se borra la plantilla base en duro, las derivadas pierden esa referencia pero siguen existiendo.
  - `ON UPDATE CASCADE` → si cambiara el `id` (raro, pero soportado) se actualiza en cascada.

### 2.2 Comportamiento derivado

- Se pueden tener plantillas **globales** y **personalizadas por especialista**.
- Se puede construir una plantilla nueva a partir de otra usando `base_template_id`, copiando sus conceptos y luego ajustando.
- Por consistencia histórica con los formularios llenados, lo recomendable es:
  - **No borrar** plantillas que ya tengan formularios ligados.
  - Preferir `deleted_at` para “retirarlas” del uso cotidiano.

### 2.3 Priorización de plantillas (A/B/C)

Para todas las integraciones con **dietAgent** se establece la siguiente jerarquía de selección:

- **A – Intake dietAgent** → `is_dietagent_intake = 1`.  
  Primera opción en consultas y generación automática. El endpoint `/forms/template?isDietagentIntake=true` debe devolver exclusivamente esta variante.
- **B – Valoración inicial** → `is_initial_assessment = 1`.  
  Se usa como plan de respaldo cuando no existe una plantilla Intake específica para la especialidad del paciente.
- **C – Plantillas regulares** → resto de las plantillas activas.  
  Aplican para seguimientos o formularios personalizados; no se envían como contexto inicial a dietAgent salvo que las categorías anteriores no estén disponibles.

> La lógica A/B/C debe mantenerse sincronizada entre backend, dietAgent y documentación funcional. Al duplicar o clonar plantillas se copia el flag correspondiente.

---

## 3. `form_template_concepts` – Configuración de preguntas por plantilla

Define **qué conceptos** se incluyen en cada plantilla y **cómo se presentan** (orden, texto, unidad, obligatoriedad, etc.).

```sql
CREATE TABLE `form_template_concepts` (
  `id` varchar(36) NOT NULL,
  `form_template_id` varchar(36) NOT NULL,
  `concept_id` varchar(36) NOT NULL,
  `custom_name` varchar(100) DEFAULT NULL,
  `unit` varchar(20) DEFAULT NULL,
  `index` int NOT NULL DEFAULT '0',
  `is_graphable` tinyint(1) DEFAULT '0',
  `is_mandatory` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `conceptId` (`concept_id`),
  KEY `form_template_units_ibfk_1` (`form_template_id`),
  CONSTRAINT `form_template_concepts_ibfk_1` FOREIGN KEY (`form_template_id`) REFERENCES `form_templates` (`id`) ON DELETE CASCADE,
  CONSTRAINT `form_template_concepts_ibfk_2` FOREIGN KEY (`concept_id`) REFERENCES `concepts` (`id`)
);
```

### 3.1 Campos y reglas implícitas

- `form_template_id` (FK, `ON DELETE CASCADE`)  
  Si se elimina una plantilla, sus relaciones con conceptos se eliminan automáticamente.

- `concept_id` (FK, sin `ON DELETE CASCADE`)

  - Un concepto puede pertenecer a muchas plantillas.
  - No se debe borrar el concepto mientras existan plantillas o valores históricos asociados.

- `custom_name` (`varchar(100)`, NULL)  
  Texto específico que se muestra en la pregunta dentro de esa plantilla, por ejemplo:  
  `"¿Cuál es tu horario de sueño durante la semana?"`.  
  Si es `NULL`, se debería mostrar `concepts.name`.

- `unit` (`varchar(20)`, NULL)  
  Unidad específica en esa plantilla (por ejemplo, `cm` o `kg`).  
  Si es `NULL`, se sugiere usar `concepts.default_unit`.

- `index` (`int`, NOT NULL, default `0`)  
  Define el **orden de la pregunta** dentro del cuestionario. El frontend puede ordenar por este campo.

- `is_graphable` (`tinyint(1)`, default `0`)  
  Marca si la respuesta de este concepto debe considerarse **candidata a graficarse** en seguimientos (por ejemplo, peso, horas de sueño).  
  Se replica también en `filled_form_values` (ver tabla 5), lo cual permite mantener la decisión aunque la plantilla cambie después.

- `is_mandatory` (`tinyint(1)`, default `0`)  
  Indica si la pregunta es obligatoria en esa plantilla. El frontend ya está usando el asterisco `*` para señalarlas.

### 3.2 Construcción del payload de plantilla

El backend combina `form_templates`, `form_template_concepts` y `concepts` para devolver payloads como:

```json
{
  "id": "58d99460-ef10-40b6-bebd-3233e62279ff",
  "specialtyId": "9ce67305-eafc-11ef-bd0a-1290daed9e2f",
  "specialistId": "",
  "name": "Formulario base de Nutrición",
  "description": "Plantilla base de preguntas de consulta para nutrición creado y recomendado por multinature.mx",
  "isInitialAssessment": true,
  "isDietagentIntake": true,
  "questions": [
    {
      "conceptId": "23ba7e84-94ba-11f0-8618-1290daed9e2f",
      "customName": "¿Cuál es tu horario de sueño durante la semana?",
      "unit": "",
      "description": "Hábitos de sueño",
      "isGraphable": false,
      "isMandatory": false
    },
    ...
  ]
}
```

- `description` dentro de cada `question` proviene de `concepts.description` y se usa para agrupar visualmente el formulario (subtítulos: `"Hábitos de sueño"`, `"Estilo de vida"`, etc.).
- El frontend puede agrupar o solo mostrarlo como texto de apoyo, según el diseño.

---

## 4. `filled_forms` – Formularios respondidos

Representa cada **instancia de formulario respondido**, ligada a un paciente y un especialista (y opcionalmente a una cita).

```sql
CREATE TABLE `filled_forms` (
  `id` varchar(36) NOT NULL,
  `booking_id` varchar(36) DEFAULT NULL,
  `form_template_id` varchar(36) NOT NULL,
  `user_id` varchar(36) NOT NULL,
  `specialist_id` varchar(36) NOT NULL,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `bookingId` (`booking_id`),
  KEY `formTemplateId` (`form_template_id`),
  KEY `userId` (`user_id`),
  KEY `specialistId` (`specialist_id`),
  CONSTRAINT `filled_forms_ibfk_1` FOREIGN KEY (`booking_id`) REFERENCES `bookings` (`id`),
  CONSTRAINT `filled_forms_ibfk_2` FOREIGN KEY (`form_template_id`) REFERENCES `form_templates` (`id`),
  CONSTRAINT `filled_forms_ibfk_3` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `filled_forms_ibfk_4` FOREIGN KEY (`specialist_id`) REFERENCES `users` (`id`)
);
```

### 4.1 Campos y reglas implícitas

- `booking_id` (`varchar(36)`, NULL, FK hacia `bookings.id`)  
  Hace posible ligar el formulario a una cita específica.  
  Permite escenarios como:

  - Formularios de valoración llenados **durante** una cita.
  - Formularios de pre-consulta o seguimiento ligados a una cita futura o pasada.

- `form_template_id` (`varchar(36)`, NOT NULL, FK)  
  Indica **con qué plantilla** se generó ese formulario.  
  Importante: si la plantilla cambia después, este `filled_form` debe seguir interpretándose respecto a la configuración vigente en el momento en que se llenó (ver propuestas en sección 7.3).

- `user_id` (`varchar(36)`, NOT NULL, FK hacia `users.id`)  
  Paciente al que pertenece la información clínica.

- `specialist_id` (`varchar(36)`, NOT NULL, FK hacia `users.id`)  
  Especialista responsable del formulario (titular de la consulta).  
  Esto es independiente de si el propio paciente llenó los campos (ver discusión en sección 7.4).

- `created_at`, `updated_at`  
  Timestamps de creación y última modificación del formulario.

### 4.2 Comportamiento derivado

- Un paciente puede tener **múltiples formularios** de la misma plantilla, por ejemplo:

  - Valoración inicial.
  - Revaloración a los 3 meses.
  - Revaloración anual.

- Los historiales de formularios pueden consultarse por:
  - `user_id` + `specialist_id`
  - `user_id` + `specialty_id` (unión a través de la plantilla)
  - `booking_id` (qué se llenó en esa cita)

---

## 5. `filled_form_values` – Respuestas a nivel de pregunta

Guarda las respuestas concretas para cada pregunta (concepto) en un formulario llenado.

```sql
CREATE TABLE `filled_form_values` (
  `id` varchar(36) NOT NULL,
  `filled_form_id` varchar(36) NOT NULL,
  `concept_id` varchar(36) NOT NULL,
  `concept_name` varchar(100) DEFAULT NULL,
  `value` text,
  `unit` varchar(20) DEFAULT NULL,
  `observation` text,
  `is_graphable` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `filledFormId` (`filled_form_id`),
  KEY `conceptId` (`concept_id`),
  CONSTRAINT `filled_form_values_ibfk_1` FOREIGN KEY (`filled_form_id`) REFERENCES `filled_forms` (`id`),
  CONSTRAINT `filled_form_values_ibfk_2` FOREIGN KEY (`concept_id`) REFERENCES `concepts` (`id`)
);
```

### 5.1 Campos y reglas implícitas

- `filled_form_id` (FK)  
  Agrupa todas las respuestas que pertenecen al mismo formulario.

- `concept_id` (FK)  
  Enlaza con el concepto clínico original. Permite:

  - Hacer consultas longitudinales (ej. evolución del peso, horas de sueño).
  - Reconocer el mismo concepto en diferentes plantillas.

- `concept_name` (`varchar(100)`, NULL)  
  **Snapshot del texto de la pregunta** en el momento del llenado (típicamente el `custom_name` usado en la plantilla).  
  Esto ayuda a que, si el texto cambia después en la plantilla o en el `concept`, la respuesta histórica siga mostrando la formulación original que vio el paciente.

- `value` (`text`, NULL)  
  Respuesta cruda en formato texto. Actualmente se usa para todo tipo de preguntas (abiertas, numéricas, horarios, etc.).

- `unit` (`varchar(20)`, NULL)  
  Snapshot de la unidad usada al momento del llenado (`kg`, `cm`, `h`, etc.).  
  Esto protege contra cambios futuros de unidades en la plantilla.

- `observation` (`text`, NULL)  
  Campo pensado para comentarios adicionales del especialista (o del paciente) sobre esa respuesta concreta.

- `is_graphable` (`tinyint(1)`, default `0`)  
  Snapshot de la decisión de graficabilidad para ese valor.  
  Esto es importante porque, si en algún momento se decide dejar de graficar un concepto en la plantilla, los valores previos que ya se graficaban conservan esa marca para usos analíticos.

### 5.2 Comportamiento derivado

- Es posible reconstruir **historiales clínicos** a partir de `filled_form_values` agrupando por `user_id` y `concept_id`.
- El backend es responsable de generar los datasets ya agrupados para el frontend (gráficas, tablas de evolución, etc.), tal como se define en el punto 5 de contexto original.

---

## 6. Flujo funcional típico

1. El especialista (o el sistema) elige una plantilla (`form_templates`) para un paciente.
2. El frontend consume el endpoint que devuelve algo como:

   ```json
   {
     "id": "58d99460-ef10-40b6-bebd-3233e62279ff",
     "specialtyId": "...",
     "specialistId": "",
     "name": "Formulario base de Nutrición",
     "description": "Plantilla base...",
     "isInitialAssessment": true,
    "isDietagentIntake": true,
     "questions": [
       {
         "conceptId": "...",
         "customName": "¿Cuál es tu horario de sueño durante la semana?",
         "unit": "",
         "description": "Hábitos de sueño",
         "isGraphable": false,
         "isMandatory": false
       },
       ...
     ]
   }
   ```

   El endpoint `GET /forms/template?isDietagentIntake=true` retorna únicamente las plantillas de prioridad **A**. Si el flag no se envía, el backend entrega el catálogo completo respetando la jerarquía al serializar la respuesta.

3. El usuario (paciente o especialista) responde las preguntas.
4. El backend crea un registro en `filled_forms` y luego una fila en `filled_form_values` por cada respuesta, copiando:

   - `concept_id`
   - `concept_name` (desde `custom_name` o `concepts.name`)
   - `unit` (desde `form_template_concepts.unit` o `concepts.default_unit`)
   - `is_graphable` (desde `form_template_concepts.is_graphable`)
   - `value` y `observation` desde el payload del frontend.

5. Para reportes y gráficos, el backend lee `filled_forms` + `filled_form_values`, agrupa por `user_id` y `concept_id`, y construye los datasets que el frontend necesita.

---

## 7. Propuestas de mejora

Las siguientes propuestas incluyen:

- **Por qué conviene tenerlas** (para qué ayudan / qué problema resuelven).
- **Cómo agregarlas** al proyecto (a nivel de base de datos y de API).

### 7.1 Propuesta: tipo de campo / input (`field_type`)

Actualmente el sistema asume que todas las respuestas se guardan como texto (`value TEXT`), y el tipo de input está implícito en el frontend. Esto limita:

- Validaciones específicas (números, fechas, booleanos, opciones).
- Generación de estadísticas más inteligentes desde el backend.
- Que el dietAgent entienda mejor el contexto (diferenciar texto libre vs. valor numérico).

#### 7.1.1 ¿Para qué servirá?

- **Validaciones más fuertes** en backend y frontend (ejemplo: si `field_type = "number"`, no aceptar `"abc"`).
- **Mejor experiencia de captura** (mostrar datepickers, select múltiples, switches, etc.).
- **Contexto semántico para dietAgent**, por ejemplo:
  - Distinguir entre respuestas tipo `"sí/no"`, listados de opciones, escalas de frecuencia, etc.
  - Ayudar a interpretar correctamente unidades y magnitudes.

#### 7.1.2 Dónde modelarlo

Hay dos alternativas razonables:

1. **En `concepts`** (tipo general del concepto):

   - Campo sugerido: `field_type` (`varchar(30)` o `enum`).
   - Ejemplos de valores: `"text"`, `"number"`, `"boolean"`, `"date"`, `"time"`, `"choice_single"`, `"choice_multiple"`, `"scale_1_5"`, etc.

2. **En `form_template_concepts`** (tipo específico por plantilla):
   - Útil si un mismo concepto necesita distintos tipos de captura en plantillas diferentes (menos común).

En la práctica, lo más sencillo y consistente es:

- Agregar `field_type` a `concepts`.
- Permitir que el frontend, si quiere, lo sobreescriba a nivel de plantilla en una fase posterior (no urgente).

#### 7.1.3 Cambios sugeridos en BD

```sql
ALTER TABLE `concepts`
  ADD COLUMN `field_type` varchar(30) NOT NULL DEFAULT 'text' AFTER `default_unit`;
```

Valores recomendados inicialmente:

- `"text"` – campo de texto libre.
- `"number"` – número (entero o decimal).
- `"boolean"` – sí/no.
- `"date"` – fecha.
- `"time"` – hora.
- `"choice_single"` – opción única de un catálogo.
- `"choice_multiple"` – múltiples opciones.

_(El catálogo se puede ajustar sobre la marcha, no es crítico encasillarlo desde ya.)_

#### 7.1.4 Cambios sugeridos en API / backend

- Incluir `fieldType` en el payload de `questions`:

  ```json
  {
    "conceptId": "...",
    "customName": "Peso",
    "unit": "kg",
    "description": "Peso actual del paciente",
    "fieldType": "number",
    "isGraphable": true,
    "isMandatory": false
  }
  ```

- Validar, al guardar `filled_form_values`, que el `value` sea compatible con `field_type`.
  - Ejemplo: si `field_type = "number"`, intentar parsear a `DECIMAL` y rechazar valores inválidos.
- Para dietAgent, exponer el tipo de campo cuando se le pase el contexto (para que pueda diferenciar entre “texto descriptivo” y “dato numérico estructurado”).

---

### 7.2 Propuesta: manejo de valores estructurados (no solo texto)

Hoy `value` es siempre `TEXT`. Aunque esto funciona, limita:

- Diferenciar entre número y texto cuando se analiza en backend.
- Representar información compleja como:
  - Rangos de horario (`{ from: "22:00", to: "06:00" }`).
  - Listas de suplementos (`["Vitamina D", "Omega 3", ...]`).
  - Selecciones múltiples (lista de strings u objetos).

#### 7.2.1 ¿Para qué servirá?

- **Alimentar mejor al backend de analytics** y a dietAgent con datos estructurados.
- **Permitir respuestas más ricas** sin romper el modelo: por ejemplo, que un concepto pueda tener internamente un JSON con múltiples propiedades.
- **Simplificar queries** cuando se necesiten filtros por valores específicos (por ejemplo, encontrar pacientes cuyo IMC > X almacenado en numérico).

#### 7.2.2 Cómo modelarlo sin romper lo actual

Mantener compatibilidad hacia atrás es clave. Una estrategia gradual:

1. Mantener el campo actual `value TEXT`.
2. Agregar campos nuevos, por ejemplo:

   ```sql
   ALTER TABLE `filled_form_values`
     ADD COLUMN `value_type` varchar(30) NOT NULL DEFAULT 'text' AFTER `concept_name`,
     ADD COLUMN `value_number` decimal(12,4) DEFAULT NULL AFTER `value`,
     ADD COLUMN `value_json` json DEFAULT NULL AFTER `value_number`;
   ```

   - `value_type` define qué campo se debe usar / interpretar: `"text"`, `"number"`, `"json"`, etc.
   - `value_number` permite guardar numéricos listos para consultas y gráficas.
   - `value_json` guarda estructuras más complejas (para horarios, selecciones múltiples, etc.).

3. En la primera etapa, el backend puede:
   - Seguir llenando `value` como antes (texto).
   - Sólo para campos numéricos (`field_type = "number"`), intentar llenar además `value_number`.
   - Para inputs complejos, almacenar tanto `value` (versión string) como un JSON en `value_json`.

De esta forma, nada se rompe en el frontend actual, pero el backend y dietAgent ganan contexto adicional.

#### 7.2.3 Cambios en API / backend

- El payload de guardado puede seguir enviando un único `value` string.
- Opcionalmente se puede introducir un payload enriquecido:

  ```json
  {
    "conceptId": "2c9482da-d46b-486d-b4b4-76482a24f6bd",
    "rawValue": "72.5",
    "numericValue": 72.5,
    "structuredValue": null,
    "observation": "Pesado en ayunas"
  }
  ```

- El backend decide cómo mapear:
  - `rawValue` → `value`
  - `numericValue` → `value_number`
  - `structuredValue` → `value_json`

_(Esto se puede introducir por etapas, sin forzar cambios inmediatos en todos los consumidores.)_

---

### 7.3 Propuesta: conservar mejor la estructura histórica de formularios

Tú intención es que los formularios históricos (`filled_forms`) **conserven la estructura original** aunque la plantilla (`form_templates` + `form_template_concepts`) se modifique después.  
Hoy ya se hace un snapshot parcial a nivel de cada respuesta (`concept_name`, `unit`, `is_graphable`), pero hay áreas donde esto todavía puede quedar corto:

- Orden de las preguntas en el formulario en ese momento.
- Agrupadores / secciones (ej. `"Hábitos de sueño"`, `"Estilo de vida"`).
- Preguntas que existían pero se dejaron sin respuesta.
- Versión de la plantilla usada.

#### 7.3.1 ¿Por qué lo que hay hoy “medio sí pero no del todo”?

- `filled_form_values` guarda snapshots por respuesta, pero:
  - No existe un snapshot explícito de la **lista completa de preguntas** del formulario en el momento del llenado.
  - No se guarda el `description` del concepto (categoría) en la respuesta.
  - No hay un indicador de versión de la plantilla en `filled_forms`.

Esto puede causar problemas si, por ejemplo:

- Se elimina una pregunta de la plantilla.
- Se cambia el orden de las preguntas.
- Se cambian descripciones de grupo (`description` en `concepts`).

#### 7.3.2 Estrategia recomendada

Manteniendo simple el modelo actual, una propuesta pragmática:

1. **Agregar más snapshots en `filled_form_values`**

   ```sql
   ALTER TABLE `filled_form_values`
     ADD COLUMN `group_description` varchar(255) DEFAULT NULL AFTER `concept_name`,
     ADD COLUMN `question_index` int DEFAULT NULL AFTER `group_description`;
   ```

   - `group_description` → copia en el momento del llenado del `concepts.description` (ej. `"Hábitos de sueño"`).
   - `question_index` → copia del `form_template_concepts.index` para ese formulario.

   Con esto, cada respuesta sabe:

   - Qué grupo visual tenía.
   - En qué orden aparecía en el formulario.

2. **Agregar versión de plantilla a `form_templates` y `filled_forms`**

   ```sql
   ALTER TABLE `form_templates`
     ADD COLUMN `version` int NOT NULL DEFAULT 1 AFTER `is_initial_assessment`;

   ALTER TABLE `filled_forms`
     ADD COLUMN `template_version` int NOT NULL DEFAULT 1 AFTER `form_template_id`;
   ```

   Reglas de uso:

   - Cada vez que se haga un cambio “estructural” relevante en la plantilla (agregar/quitar preguntas, cambiar orden importante), se incrementa `form_templates.version`.
   - Al crear un nuevo `filled_forms`, se copia `version` en `template_version`.
   - A nivel de consultas históricas, se puede saber con qué versión de la plantilla se llenó cada formulario.

3. **Opcional: snapshot JSON de la plantilla en `filled_forms`**

   Para máxima robustez, se puede agregar un campo JSON:

   ```sql
   ALTER TABLE `filled_forms`
     ADD COLUMN `template_snapshot` json DEFAULT NULL AFTER `template_version`;
   ```

   - Guarda la definición de preguntas que se usó al momento del llenado, por ejemplo el mismo payload que consume el frontend (`questions` con `conceptId`, `customName`, `unit`, `description`, etc.).
   - Esto permite reconstruir exactamente cómo se veía el formulario incluso si la base de datos cambia radicalmente en el futuro.

#### 7.3.3 Impacto en backend / dietAgent

- El backend puede usar `template_snapshot` (si se implementa) para mostrar “cómo se veía el formulario” en un punto del tiempo.
- El dietAgent puede recibir también esa snapshot cuando necesite contexto profundo de una consulta pasada (para entender no solo las respuestas sino también la forma en que se preguntó).

---

### 7.4 Propuesta: ¿Quién llena el formulario? ¿Paciente vs. especialista?

Contexto:

- Tu primera idea: los formularios siempre los llena el **especialista** durante la consulta.
- Andrés (product owner) propone que algunos formularios los llene el **paciente** antes de la cita.

#### 7.4.1 Análisis y recomendación

La mejor solución suele ser un modelo **híbrido**:

1. **Formularios de pre-consulta llenados por el paciente**

   - Ejemplos:
     - Motivo de consulta.
     - Hábitos generales (sueño, trabajo, tiempos de comida).
     - Antecedentes dietéticos básicos.
   - Beneficios:
     - Ahorra tiempo valioso de la consulta.
     - Permite al especialista llegar “calentado” a la cita, con preguntas ya revisadas.
     - Empodera al paciente y lo hace parte activa del proceso.

2. **Formularios clínicos / decisiones clave llenados por el especialista**

   - Ejemplos:
     - Diagnósticos clínicos.
     - Observaciones profesionales.
     - Decisiones terapéuticas.
   - Beneficios:
     - Reduce el riesgo de que el paciente se equivoque en información sensible.
     - Mantiene claras las responsabilidades legales / clínicas.

3. **Formulario mixto**
   - Algunas secciones habilitadas para capturar por el paciente, otras solo por el especialista.
   - Esto podría controlarse más adelante con flags a nivel de `form_template_concepts` (ej. `can_be_filled_by_patient`).

#### 7.4.2 Cómo representarlo en el modelo actual

El modelo actual ya guarda:

- `user_id` → paciente.
- `specialist_id` → especialista responsable.

Podemos agregar un campo que indique **quién llenó el formulario** (o, a futuro, si fue mixto):

```sql
ALTER TABLE `filled_forms`
  ADD COLUMN `filled_by` enum('specialist','patient','mixed') NOT NULL DEFAULT 'specialist' AFTER `specialist_id`;
```

Reglas sugeridas:

- Formularios creados desde el panel del especialista → `filled_by = 'specialist'`.
- Formularios llenados desde el portal / app del paciente antes de la cita → `filled_by = 'patient'`.
- En escenarios donde el paciente llena algunas secciones y el especialista corrige o añade información durante la consulta → `filled_by = 'mixed'`.

A nivel de negocio y UX:

- Puedes partir de un modelo simple (solo especialista) e ir habilitando poco a poco formularios de pre-consulta para pacientes.
- Esto permite medir adoption y fricción sin cambiar todo de golpe.

---

## 8. DietAgent: uso de estos formularios como contexto

Buenas prácticas para usar estos datos como contexto del **dietAgent**:

1. **Usar siempre `concept_id` como clave fija**

   - Permite que dietAgent reconozca el mismo concepto aunque cambie el texto de la pregunta.
   - Para cada `concept_id`, se le puede dar al agente:
     - Nombre canónico (`concepts.name`).
     - Categoría (`concepts.description` / `group_description`).
     - Tipo (`field_type`).
     - Unidades (`default_unit`).

2. **Pasar historiales agregados por concepto**

   - En lugar de mandarle todas las respuestas crudas, enviar resúmenes por concepto (último valor, tendencia, rango, etc.).
   - Esto lo puede construir el backend usando los campos numéricos / estructurados propuestos en 7.2.

3. **Diferenciar quién llenó la información**

   - Si `filled_by = 'patient'`, dietAgent puede tratar algunas respuestas como “autorreporte” (más sujeto a sesgos).
   - Si `filled_by = 'specialist'`, puede considerarlas como información clínicamente validada.

4. **Dar prioridad a plantillas de tipo `is_initial_assessment = 1`**
   - Útiles para construir el “estado base” del paciente.
   - Los formularios de seguimiento pueden verse como “capas” que actualizan o complementan esa línea base.

5. **Validar Intake activo**  
   - Intentar primero con `is_dietagent_intake = 1` (prioridad A).  
   - Si no existe, degradar a plantillas `is_initial_assessment = 1` (prioridad B).  
   - Solo recurrir a prioridad C cuando no haya registros disponibles en las categorías anteriores.  
   Registrar en `agent_traces` qué nivel se utilizó para mantener trazabilidad.
