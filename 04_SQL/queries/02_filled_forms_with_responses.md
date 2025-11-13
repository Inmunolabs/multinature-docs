# 02 – Formularios llenados (respuestas de pacientes)

## Objetivo

Obtener todas las **respuestas** que se han generado a partir de un formulario (template) específico o filtrando por:

- **ID de template** (`form_template_id`)
- **ID de paciente** (`user_id`)
- **ID de especialista** (`specialist_id`)

El resultado agrupa por formulario llenado (`filled_forms`) y devuelve un arreglo JSON con todas las respuestas (`filled_form_values`) asociadas.

---

## Query principal (MySQL)

```sql
SELECT
  f.id               AS filled_form_id,
  f.form_template_id AS template_id,
  ft.name            AS template_name,
  f.user_id          AS patient_id,
  p.name             AS patient_name,     -- ajusta según tu modelo de users
  f.specialist_id    AS specialist_id,
  s.name             AS specialist_name,  -- ajusta según tu modelo de users
  f.booking_id,
  b.booking_date,
  f.created_at,
  JSON_ARRAYAGG(
    JSON_OBJECT(
      'filledFormValueId', ffv.id,
      'conceptId',         ffv.concept_id,
      'conceptName',       ffv.concept_name,
      'value',             ffv.value,
      'unit',              ffv.unit,
      'isGraphable',       ffv.is_graphable,
      'observation',       ffv.observation
    )
  ) AS answers_json
FROM filled_forms f
JOIN form_templates ft ON ft.id = f.form_template_id
LEFT JOIN users p      ON p.id  = f.user_id
LEFT JOIN users s      ON s.id  = f.specialist_id
LEFT JOIN bookings b   ON b.id  = f.booking_id
JOIN filled_form_values ffv ON ffv.filled_form_id = f.id
WHERE
  (:templateId   IS NULL OR f.form_template_id = :templateId)
  AND (:patientId     IS NULL OR f.user_id     = :patientId)
  AND (:specialistId  IS NULL OR f.specialist_id = :specialistId)
GROUP BY
  f.id,
  f.form_template_id,
  ft.name,
  f.user_id,
  p.name,
  f.specialist_id,
  s.name,
  f.booking_id,
  b.booking_date,
  f.created_at
ORDER BY
  b.booking_date DESC,
  f.created_at  DESC;
```

> 🔎 Notas:
> - `:templateId`, `:patientId`, `:specialistId` son filtros opcionales.
> - El `JSON_ARRAYAGG` devuelve todas las respuestas asociadas a ese formulario llenado.
> - La combinación de `booking_date` + `created_at` te permite reconstruir la línea de tiempo clínica de un paciente.

---

## Ejemplos de uso

### 1. Todas las respuestas de un template específico

```sql
SET @templateId   = '58d99460-ef10-40b6-bebd-3233e62279ff';
SET @patientId    = NULL;
SET @specialistId = NULL;

-- Ejecutar el query principal usando estas variables
```

### 2. Historial de formularios clínicos de un paciente

```sql
SET @templateId   = NULL;
SET @patientId    = 'USER-ID-DEL-PACIENTE';
SET @specialistId = NULL;
```

### 3. Formularios llenados por un especialista en particular

```sql
SET @templateId   = NULL;
SET @patientId    = NULL;
SET @specialistId = 'USER-ID-DEL-ESPECIALISTA';
```

---

## Ejemplo de resultado (forma conceptual)

```json
{
  "filled_form_id": "f8c1d9e0-1234-4567-89ab-0123456789ab",
  "template_id": "58d99460-ef10-40b6-bebd-3233e62279ff",
  "template_name": "Formulario base de Nutrición",
  "patient_id": "USER-ID-DEL-PACIENTE",
  "patient_name": "Carlos Pérez",
  "specialist_id": "USER-ID-DEL-ESPECIALISTA",
  "specialist_name": "Dra. Ana",
  "booking_id": "BOOKING-ID",
  "booking_date": "2025-11-10 10:00:00",
  "created_at": "2025-11-10 10:05:00",
  "answers_json": [
    {
      "filledFormValueId": "val-1",
      "conceptId": "08fb0a58-9791-4f24-b5ee-97c564661b0e",
      "conceptName": "Peso",
      "value": "72",
      "unit": "kg",
      "isGraphable": true,
      "observation": null
    },
    {
      "filledFormValueId": "val-2",
      "conceptId": "23ba7e84-94ba-11f0-8618-1290daed9e2f",
      "conceptName": "¿Cuál es tu horario de sueño durante la semana?",
      "value": "Duermo de 23:00 a 06:30",
      "unit": "",
      "isGraphable": false,
      "observation": "Se despierta varias veces en la noche"
    }
  ]
}
```

---

## Posibles extensiones

- Agregar columna calculada tipo `is_complete_for_dietagent` basada en si todas las preguntas A están contestadas.
- Filtrar por fecha de cita (`booking_date`) o por rango de fechas para análisis de evolución.
- Utilizar este query como base para un exportador CSV/JSON en herramientas internas.
