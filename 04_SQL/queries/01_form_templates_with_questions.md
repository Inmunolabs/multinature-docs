# 01 – Formularios (templates) con sus preguntas

## Objetivo

Obtener una vista legible de los **formularios clínicos** y sus **preguntas asociadas**, pensada como una “vista cliente” o de usuario final, incluyendo:

- IDs relevantes (template, specialty, specialist, concepto).
- Pregunta que se le haría al paciente (`customName` o `concept.name`).
- Unidad, obligatoriedad (`isMandatory`) y si es graficable (`isGraphable`).
- Filtros por:
  - **ID de template**
  - **Nombre de template** (búsqueda parcial)
  - **ID de especialista**

El resultado se devuelve en una forma fácil de transformar a JSON en el backend.

---

## Query principal (MySQL)

```sql
-- Opcional: si tienes muchas preguntas, sube este límite
SET SESSION group_concat_max_len = 1024 * 1024;

-- Si quieres filtrar por un template concreto:
SET @templateId    = '1b0ea18d-bd63-42d2-995f-bff9f8094e50';
SET @templateName  = NULL;
SET @specialistId  = NULL;

SELECT
  JSON_OBJECT(
    'templateId',      ft.id,
    'templateName',    ft.name,
    'specialtyId',     ft.specialty_id,
    'specialistId',    ft.specialist_id,
    'specialistName',  CONCAT(u.first_name, ' ', u.last_name),
    'questions',
      CAST(
        CONCAT(
          '[',
          GROUP_CONCAT(
            JSON_OBJECT(
              -- 'formTemplateConceptId', ftc.id,
              -- 'conceptId',             c.id,
              'question',              CONCAT(ftc.index, '.- ', COALESCE(ftc.custom_name, c.name)),
              -- 'unit',                  COALESCE(ftc.unit, c.default_unit),
              'isMandatory',           ftc.is_mandatory,
              'isGraphable',           ftc.is_graphable
              -- 'index',                 ftc.`index`
            )
            ORDER BY ftc.`index`
            SEPARATOR ','
          ),
          ']'
        ) AS JSON
      )
  ) AS template_json
FROM form_templates ft
JOIN form_template_concepts ftc ON ftc.form_template_id = ft.id
LEFT JOIN concepts c            ON c.id = ftc.concept_id
LEFT JOIN users u               ON u.id = ft.specialist_id
WHERE
  (@templateId    IS NULL OR ft.id            = @templateId)
  AND (@templateName IS NULL OR ft.name      LIKE CONCAT('%', @templateName, '%'))
  AND (@specialistId IS NULL OR ft.specialist_id = @specialistId)
  AND ft.deleted_at IS NULL
GROUP BY
  ft.id, ft.name, ft.specialty_id, ft.specialist_id, u.first_name;

```

> 🔎 Notas:
>
> - `:templateId`, `:templateName`, `:specialistId` son parámetros opcionales (puedes adaptarlos a `?` según tu driver).
> - El `JSON_ARRAYAGG` construye un arreglo con todas las preguntas del formulario, ya ordenadas por el campo `index`.
> - Puedes quitar o agregar campos al `JSON_OBJECT` según tus necesidades de UI.

---

## Ejemplos de uso

### 1. Traer todos los templates activos

```sql
-- Sin filtros: todos los templates no eliminados
SET @templateId    = NULL;
SET @templateName  = NULL;
SET @specialistId  = NULL;

-- Ejecutar el query principal usando estas variables
```

### 2. Buscar por nombre parcial del template

```sql
SET @templateId    = NULL;
SET @templateName  = 'Nutrición'; -- buscará "Nutrición" en el nombre
SET @specialistId  = NULL;
```

### 3. Buscar templates creados por un especialista

```sql
SET @templateId    = NULL;
SET @templateName  = NULL;
SET @specialistId  = '742745d3-86fa-46dd-8f6c-7910284dfec6';
```

---

## Ejemplo de resultado (forma conceptual)

```json
{
  "questions": [
    { "question": "0.- ¿Cuál es tu objetivo principal con el plan nutricional?", "isGraphable": 0, "isMandatory": 1 },
    { "question": "1.- Peso", "isGraphable": 1, "isMandatory": 1 },
    { "question": "2.- Estatura", "isGraphable": 0, "isMandatory": 1 },
    { "question": "3.- ¿Eres alérgico o intolerante a algún alimento?", "isGraphable": 0, "isMandatory": 1 },
    { "question": "4.- ¿Tienes intolerancia al gluten o la lactosa?", "isGraphable": 0, "isMandatory": 1 },
    { "question": "5.- ¿Tienes aversiones a algún alimento?", "isGraphable": 0, "isMandatory": 1 },
    { "question": "6.- ¿Tienes antecedentes clínicos relevantes?", "isGraphable": 0, "isMandatory": 1 },
    { "question": "7.- ¿Tienes antecedentes gastrointestinales?", "isGraphable": 0, "isMandatory": 1 },
    {
      "question": "8.- ¿Tienes antecedentes ginecológicos? (No aplica si eres hombre)",
      "isGraphable": 0,
      "isMandatory": 1
    },
    { "question": "9.- ¿Consumes medicamentos, homeopatía o suplementos?", "isGraphable": 0, "isMandatory": 1 },
    { "question": "10.- ¿Cuál es tu horario de trabajo?", "isGraphable": 0, "isMandatory": 1 },
    { "question": "11.- ¿Cuáles son tus horarios de comida?", "isGraphable": 0, "isMandatory": 1 },
    { "question": "12.- ¿Cuál es tu horario de sueño durante la semana?", "isGraphable": 0, "isMandatory": 1 },
    { "question": "13.- ¿Cuánta cantidad de agua consumes al día?", "isGraphable": 0, "isMandatory": 1 },
    { "question": "14.- Fórmulas para el dietocálculo", "isGraphable": 0, "isMandatory": 0 },
    { "question": "15.- Coeficiente de Actividad Física (CAF)", "isGraphable": 0, "isMandatory": 0 },
    { "question": "16.- ¿Si realizas ejercicio en que horarios lo haces?", "isGraphable": 0, "isMandatory": 0 },
    { "question": "17.- ¿Si realizas ejercicio en dónde lo haces?", "isGraphable": 0, "isMandatory": 0 },
    { "question": "18.- ¿Con qué frecuencia consumes frutas al día?", "isGraphable": 0, "isMandatory": 0 },
    { "question": "19.- ¿Con qué frecuencia consumes verduras al día?", "isGraphable": 0, "isMandatory": 0 },
    { "question": "20.- ¿Fumas cigarro?", "isGraphable": 0, "isMandatory": 0 },
    { "question": "21.- ¿Consumes alcohol?", "isGraphable": 0, "isMandatory": 0 },
    { "question": "22.- ¿Tomas café, refrescos o jugos?", "isGraphable": 0, "isMandatory": 0 },
    { "question": "23.- ¿Cómo describirías tu nivel de energía durante el día?", "isGraphable": 0, "isMandatory": 0 },
    { "question": "24.- ¿Cómo calificarías tu nivel de estrés actual (1-10)?", "isGraphable": 0, "isMandatory": 0 },
    { "question": "25.- ¿Presentas dolores de cabeza, temblores o visión borrosa?", "isGraphable": 0, "isMandatory": 0 }
  ],
  "templateId": "1b0ea18d-bd63-42d2-995f-bff9f8094e50",
  "specialtyId": "9ce67305-eafc-11ef-bd0a-1290daed9e2f",
  "specialistId": null,
  "templateName": "Formulario base de Nutrición",
  "specialistName": null
}
```

---

## Posibles extensiones

- Agregar `isInitialAssessment` y `isDietagentIntake` al SELECT para filtrar templates de intake del dietAgent.
- Incluir `specialty` haciendo JOIN con la tabla de especialidades.
- Adaptar este query a una _view_ o _stored procedure_ si se vuelve de uso muy frecuente.
