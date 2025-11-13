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
SELECT
  ft.id              AS template_id,
  ft.name            AS template_name,
  ft.specialty_id    AS specialty_id,
  ft.specialist_id   AS specialist_id,
  u.name             AS specialist_name, -- ajusta según tu modelo de users
  JSON_ARRAYAGG(
    JSON_OBJECT(
      'formTemplateConceptId', ftc.id,
      'conceptId',             c.id,
      'question',              COALESCE(ftc.custom_name, c.name),
      'unit',                  COALESCE(ftc.unit, c.default_unit),
      'isMandatory',           ftc.is_mandatory,
      'isGraphable',           ftc.is_graphable,
      'index',                 ftc.`index`
    )
    ORDER BY ftc.`index`
  ) AS questions_json
FROM form_templates ft
JOIN form_template_concepts ftc ON ftc.form_template_id = ft.id
LEFT JOIN concepts c            ON c.id = ftc.concept_id
LEFT JOIN users u               ON u.id = ft.specialist_id
WHERE
  (:templateId   IS NULL OR ft.id            = :templateId)
  AND (:templateName IS NULL OR ft.name     LIKE CONCAT('%', :templateName, '%'))
  AND (:specialistId IS NULL OR ft.specialist_id = :specialistId)
  AND (ft.deleted_at IS NULL)
GROUP BY ft.id, ft.name, ft.specialty_id, ft.specialist_id, u.name
ORDER BY ft.created_at DESC;
```

> 🔎 Notas:
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
  "template_id": "58d99460-ef10-40b6-bebd-3233e62279ff",
  "template_name": "Formulario base de Nutrición",
  "specialty_id": "9ce67305-eafc-11ef-bd0a-1290daed9e2f",
  "specialist_id": null,
  "specialist_name": null,
  "questions_json": [
    {
      "formTemplateConceptId": "abc123...",
      "conceptId": "23ba7e84-94ba-11f0-8618-1290daed9e2f",
      "question": "¿Cuál es tu horario de sueño durante la semana?",
      "unit": "",
      "isMandatory": true,
      "isGraphable": false,
      "index": 140
    },
    {
      "formTemplateConceptId": "def456...",
      "conceptId": "08fb0a58-9791-4f24-b5ee-97c564661b0e",
      "question": "Peso",
      "unit": "kg",
      "isMandatory": true,
      "isGraphable": true,
      "index": 100
    }
  ]
}
```

---

## Posibles extensiones

- Agregar `isInitialAssessment` y `isDietagentIntake` al SELECT para filtrar templates de intake del dietAgent.
- Incluir `specialty` haciendo JOIN con la tabla de especialidades.
- Adaptar este query a una *view* o *stored procedure* si se vuelve de uso muy frecuente.
