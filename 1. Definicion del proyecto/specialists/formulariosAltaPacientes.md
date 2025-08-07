# Formularios para alta de pacientes

## FLUJO GENERAL: De template a formulario llenado

### Escenario:

- La especialista **Dra. Ana** es nutrióloga.
- Tiene varios pacientes y quiere crear una plantilla de formulario personalizada.
- Cuando un paciente llega a consulta, ella selecciona esa plantilla y **llena los datos del paciente** en función de los conceptos definidos.

### 1. CREACIÓN DEL TEMPLATE (una sola vez por especialista y formulario)

La Dra. Ana crea un nuevo template que llama:

**“Evaluación - Adultos”**

Y define los siguientes conceptos dentro del template:

| Concepto         | Unidad | Graficable | Observación |
| ---------------- | ------ | ---------- | ----------- |
| Peso             | kg     | ✅         |             |
| Estatura         | cm     | ❌         |             |
| % Grasa corporal | %      | ✅         |             |
| Cintura          | cm     | ✅         |             |

Este template se guarda en:

- `form_templates` → nombre: “Evaluación - Adultos”, specialist_id = Dra. Ana
- Cada campo se guarda en `form_template_concepts`:
  - Uno por cada concepto, relacionándolo con el template, ya sea con `concept_id` (si es del catálogo) o con `custom_name` si es un campo "personalizado" para ese template.

### 2. ALTA DE CITA Y LLENADO DE FORMULARIO

Supongamos que llega el paciente **Carlos Pérez** el 1 de abril a consulta. La Dra. Ana:

1. Si no existe crea una nueva cita (`booking`), de lo contrario selecciona la cita del paciente
2. Selecciona el template “Evaluación - Adultos”
3. Llena los campos uno a uno desde ese template:
   - Peso: `72 kg`
   - Estatura: `1.70 m`
   - % Grasa: `22 %`
   - Cintura: `90 cm`
4. Guarda el formulario

Esto genera:

- Un nuevo `filled_form` relacionado con la cita (`booking_id`)
- Cada campo capturado se guarda en `filled_form_values`, copiando:
  - El nombre del concepto (como texto plano)
  - El valor, unidad, graficable, y observación

> 🔍 Nota: Al guardar el formulario, **no se copian referencias** a `form_template_concepts`, solo se clona la info textual del concepto. Esto es lo que permite que si el template cambia en el futuro, los formularios viejos **no se vean afectados**.

### 3. MODIFICACIÓN O VERSIONADO DEL FORMULARIO

Si en menos de 7 días la Dra. Ana nota un error y quiere corregir:

- Se permite editar directamente el `filled_form` y `filled_form_values`.

Si pasaron más de 7 días:

- El sistema puede generar una **copia del formulario viejo**, lo guarda como uno nuevo (otro `filled_form` para la misma cita), y permite editar la copia.

### 4. EVOLUCIÓN EN EL TIEMPO

El sistema puede luego graficar la evolución de ciertos conceptos (por ejemplo: "Peso", "Cintura") usando todos los `filled_form_values.is_graphable = true` de un mismo paciente, ordenados por fecha de cita (`booking.booking_date`).

---

### ¿Qué es un template entonces?

Un **template de formulario** es simplemente:

- Un conjunto de conceptos definidos por un especialista (o por el sistema).
- Que sirve como **base estructural** para capturar valores en formularios reales.

> Los formularios reales (`filled_forms`) son **instancias** de un template, **llenos con datos de un paciente en una cita específica**.

---

## Propuesta de estructura de tablas

### `concepts` (Catálogo base del sistema)

```sql
id VARCHAR(36) PRIMARY KEY,
specialistId VARCHAR(36),
name VARCHAR(100) NOT NULL,
defaultUnit VARCHAR(20),
description TEXT,
FOREIGN KEY (specialistId) REFERENCES users(id)
```

---

### Form Templates

#### `form_templates`

```sql
id VARCHAR(36) PRIMARY KEY,
specialtyId VARCHAR(36),
specialistId VARCHAR(36), -- null en caso de que sea un template general del sistema
name VARCHAR(100),
description TEXT,
updated DATETIME DEFAULT CURRENT_TIMESTAMP,
created DATETIME DEFAULT CURRENT_TIMESTAMP,
FOREIGN KEY (specialistId) REFERENCES users(id)
```

#### `form_template_units`

```sql
id VARCHAR(36) PRIMARY KEY,
formTemplateId VARCHAR(36) NOT NULL,
conceptId VARCHAR(36) NOT NULL, -- puede ser null si es personalizado
customName VARCHAR(100), -- si es concepto personalizado
unit VARCHAR(20),
isGraphable BOOLEAN DEFAULT FALSE,
FOREIGN KEY (formTemplateId) REFERENCES form_templates(id) ON DELETE CASCADE,
FOREIGN KEY (conceptId) REFERENCES concepts(id)
```

---

### Formularios llenados

#### `filled_forms`

```sql
id VARCHAR(36) PRIMARY KEY,
bookingId VARCHAR(36) NOT NULL, -- si no existe una cita agendada, al momento de crear el formulario se crea una cita
formTemplateId VARCHAR(36) NOT NULL, -- guarda la relación con el template original
userId VARCHAR(36) NOT NULL, -- guarda la relación con el paciente
specialistId VARCHAR(36) NOT NULL, -- guarda la relación con el especialista
updated DATETIME DEFAULT CURRENT_TIMESTAMP,
created DATETIME DEFAULT CURRENT_TIMESTAMP,
FOREIGN KEY (bookingId) REFERENCES bookings(id),
FOREIGN KEY (formTemplateId) REFERENCES form_templates(id),
FOREIGN KEY (userId) REFERENCES users(id),
FOREIGN KEY (specialistId) REFERENCES users(id)
```

#### `filled_form_values`

```sql
id VARCHAR(36) PRIMARY KEY,
filledFormId VARCHAR(36) NOT NULL,
conceptName VARCHAR(100), -- copia del nombre, sea base o personalizado
value TEXT,
unit VARCHAR(20),
observation TEXT,
isGraphable BOOLEAN DEFAULT FALSE,
FOREIGN KEY (filledFormId) REFERENCES filled_forms(id)
```

---

## Lógica de versionado de formularios

Cuando un formulario `filled_form` es editado **después de 7 días**, el backend debe:

- Clonar los valores viejos como un nuevo `filled_form`
- Copiar el `form_template_id` y crear nuevos `filled_form_values`
- Marcar el nuevo como vigente
