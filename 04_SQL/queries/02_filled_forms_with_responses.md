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
SET @templateId   = NULL;
SET @patientId    = '0eeb910f-965c-4f62-b7ad-337e1027550b';
SET @specialistId = NULL;

SELECT
  JSON_ARRAYAGG(
    JSON_OBJECT(
      'filledFormId',    t.filled_form_id,
      'templateId',      t.template_id,
      'templateName',    t.template_name,
      'patientId',       t.patient_id,
      'patientName',     t.patient_name,
      'specialistId',    t.specialist_id,
      'specialistName',  t.specialist_name,
      'bookingId',       t.booking_id,
      'bookingDate',     t.booking_date,
      'createdAt',       t.created_at,
      'answers',         t.answers_json   -- arreglo de respuestas por form
    )
  ) AS forms_json
FROM (
  SELECT
    f.id               						AS filled_form_id,
    f.form_template_id 						AS template_id,
    ft.name            						AS template_name,
    f.user_id            					AS patient_id,
    CONCAT(p.first_name, ' ', p.last_name)	AS patient_name,
    f.specialist_id            				AS specialist_id,
    CONCAT(s.first_name, ' ', s.last_name)	AS specialist_name,
    f.booking_id,
    b.date                                  AS booking_date,
    f.created_at,
    JSON_ARRAYAGG(
      JSON_OBJECT(
        -- 'filledFormValueId', ffv.id,
        -- 'conceptId',         ffv.concept_id,
        'conceptName',       ffv.concept_name,
        'value',             ffv.value
        -- 'unit',              ffv.unit,
        -- 'isGraphable',       ffv.is_graphable,
        -- 'observation',       ffv.observation
      )
    ) AS answers_json
  FROM filled_forms f
  JOIN form_templates ft ON ft.id = f.form_template_id
  LEFT JOIN users p      ON p.id  = f.user_id
  LEFT JOIN users s      ON s.id  = f.specialist_id
  LEFT JOIN bookings b   ON b.id  = f.booking_id
  JOIN filled_form_values ffv ON ffv.filled_form_id = f.id
  WHERE
    (@templateId   	   IS NULL OR f.form_template_id = @templateId)
    AND (@patientId    IS NULL OR f.user_id          = @patientId)
    AND (@specialistId IS NULL OR f.specialist_id    = @specialistId)
  GROUP BY
    f.id,
    f.form_template_id,
    ft.name,
    f.user_id,
    p.first_name,
    p.last_name,
    f.specialist_id,
    s.first_name,
    s.last_name,
    f.booking_id,
    b.date,
    f.created_at
  ORDER BY
    b.date DESC,
    f.created_at  DESC
) AS t;

```

> 🔎 Notas:
>
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
[
  {
    "answers": [
      {
        "value": "No",
        "conceptName": "¿Fumas cigarro?"
      },
      {
        "value": "Alérgia al camarón",
        "conceptName": "¿Eres alérgico o intolerante a algún alimento?"
      },
      {
        "value": "El paciente busca bajar de peso, aumentar masa muscular y disminuir grasa coroporal",
        "conceptName": "¿Cuál es tu objetivo principal con el plan nutricional?"
      },
      {
        "value": "No",
        "conceptName": "¿Presentas dolores de cabeza, temblores o visión borrosa?"
      },
      {
        "value": "83",
        "conceptName": "Estatura"
      },
      {
        "value": "101",
        "conceptName": "Peso"
      },
      {
        "value": "2 a 3 litros ",
        "conceptName": "¿Cuánta cantidad de agua consumes al día?"
      },
      {
        "value": "De Lunes a Viernes de 10:00 am a 05:30 pm",
        "conceptName": "¿Cuál es tu horario de trabajo?"
      },
      {
        "value": "Asma, Hiperreactividad, Disautonomía, Ansiedad moderada y Depresión moderada",
        "conceptName": "¿Tienes antecedentes clínicos relevantes?"
      },
      {
        "value": "Gimnasio",
        "conceptName": "¿Si realizas ejercicio en dónde lo haces?"
      },
      {
        "value": "No",
        "conceptName": "¿Tienes intolerancia al gluten o la lactosa?"
      },
      {
        "value": "Desayuno y comida",
        "conceptName": "¿Con qué frecuencia consumes verduras al día?"
      },
      {
        "value": "En las cenas, y algún licuado de dos a tres veces por semana",
        "conceptName": "¿Con qué frecuencia consumes frutas al día?"
      },
      {
        "value": "Apróximadamente de 01:00 a 08:30",
        "conceptName": "¿Cuál es tu horario de sueño durante la semana?"
      },
      {
        "value": "Solo café un litro al día como mínimo",
        "conceptName": "¿Tomas café, refrescos o jugos?"
      },
      {
        "value": "Si, al menos un día a la semana",
        "conceptName": "¿Consumes alcohol?"
      },
      {
        "value": "8",
        "conceptName": "¿Cómo calificarías tu nivel de estrés actual (1-10)?"
      },
      {
        "value": "No",
        "conceptName": "¿Tienes antecedentes ginecológicos? (No aplica si eres hombre)"
      },
      {
        "value": "De cuatro a cinco días a la semana de 18:00 a 20:00 apróximadamente",
        "conceptName": "¿Si realizas ejercicio en que horarios lo haces?"
      },
      {
        "value": "Aversiones a mariscos",
        "conceptName": "¿Tienes aversiones a algún alimento?"
      },
      {
        "value": "El paciente comenta que suele sentirse cansado, pero lo atribuye a la disautonomía",
        "conceptName": "¿Cómo describirías tu nivel de energía durante el día?"
      },
      {
        "value": "Si, gastritis, colitis, reflujo y acides",
        "conceptName": "¿Tienes antecedentes gastrointestinales?"
      },
      {
        "value": "Sertralina y Creatina",
        "conceptName": "¿Consumes medicamentos, homeopatía o suplementos?"
      },
      {
        "value": "Apróximadamente 09:00; 13:00 - 15:00; 21:00 y a veces 00:00",
        "conceptName": "¿Cuáles son tus horarios de comida?"
      }
    ],
    "bookingId": "ce7b76b8-020c-4ded-90bc-9b37b5d8b2fe",
    "createdAt": "2025-11-14 07:49:07.000000",
    "patientId": "0eeb910f-965c-4f62-b7ad-337e1027550b",
    "templateId": "1b0ea18d-bd63-42d2-995f-bff9f8094e50",
    "bookingDate": "2025-11-14",
    "patientName": "Miguel 002 Prueba Valdés",
    "filledFormId": "72b9c94a-f62b-4725-b687-e3bf60eabd82",
    "specialistId": "c5ae4fe4-b462-444d-a283-4e02d3df436d",
    "templateName": "Formulario base de Nutrición",
    "specialistName": "Miguel Angel Valdés García"
  }
]
```

---

## Posibles extensiones

- Agregar columna calculada tipo `is_complete_for_dietagent` basada en si todas las preguntas A están contestadas.
- Filtrar por fecha de cita (`booking_date`) o por rango de fechas para análisis de evolución.
- Utilizar este query como base para un exportador CSV/JSON en herramientas internas.
