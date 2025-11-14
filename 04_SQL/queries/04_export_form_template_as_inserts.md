# 04 – Exportar un formulario completo como INSERTs

## Objetivo

Dado el **ID de un `form_template`**, generar los **scripts `INSERT`** necesarios para recrear ese formulario desde cero en otra base de datos:

- `INSERT` para todos los **conceptos** usados en el formulario (`concepts`).
- `INSERT` para la **plantilla** como tal (`form_templates`).
- `INSERT` para las relaciones **plantilla ↔ conceptos** (`form_template_concepts`).

La idea es usar este query como una especie de *mini-mysqldump* específico de formularios.

⚠️ **Importante:**
- Este enfoque respeta los mismos IDs.
- Asegúrate de que en la base destino no existan registros con esos mismos IDs.

---

## Variables de entrada

```sql
SET @templateId = '1b0ea18d-bd63-42d2-995f-bff9f8094e50';
```

---

## 1. INSERTs para `concepts`

```sql
SELECT
  GROUP_CONCAT(
    CONCAT(
      'INSERT INTO concepts (id, specialist_id, name, default_unit, description) VALUES (',
        QUOTE(c.id), ', ',
        IF(c.specialist_id IS NULL, 'NULL', QUOTE(c.specialist_id)), ', ',
        QUOTE(c.name), ', ',
        IF(c.default_unit IS NULL, 'NULL', QUOTE(c.default_unit)), ', ',
        IF(c.description IS NULL, 'NULL', QUOTE(c.description)),
      ');'
    )
    ORDER BY c.name
    SEPARATOR '\n'
  ) AS concepts_inserts
FROM concepts c
JOIN form_template_concepts ftc ON ftc.concept_id = c.id
WHERE ftc.form_template_id = @templateId;
```

---

## 2. INSERT para `form_templates`

```sql
SELECT
  CONCAT(
    'INSERT INTO form_templates (',
      'id, specialty_id, specialist_id, name, description, ',
      'is_initial_assessment, is_dietagent_intake, ',
      'updated_at, created_at, deleted_at, base_template_id',
    ') VALUES (',
      QUOTE(ft.id), ', ',
      IF(ft.specialty_id IS NULL, 'NULL', QUOTE(ft.specialty_id)), ', ',
      IF(ft.specialist_id IS NULL, 'NULL', QUOTE(ft.specialist_id)), ', ',
      QUOTE(ft.name), ', ',
      IF(ft.description IS NULL, 'NULL', QUOTE(ft.description)), ', ',
      IF(ft.is_initial_assessment IS NULL, '0', ft.is_initial_assessment), ', ',
      IF(ft.is_dietagent_intake IS NULL, '0', ft.is_dietagent_intake), ', ',
      'NOW(), NOW(), ',
      'NULL, ',
      IF(ft.base_template_id IS NULL, 'NULL', QUOTE(ft.base_template_id)),
    ');'
  ) AS form_template_insert
FROM form_templates ft
WHERE ft.id = @templateId;
```

---

## 3. INSERTs para `form_template_concepts`

```sql
SELECT
  GROUP_CONCAT(
    CONCAT(
      'INSERT INTO form_template_concepts (',
        'id, form_template_id, concept_id, custom_name, unit, `index`, ',
        'is_graphable, is_mandatory',
      ') VALUES (',
        QUOTE(ftc.id), ', ',
        QUOTE(ftc.form_template_id), ', ',
        QUOTE(ftc.concept_id), ', ',
        IF(ftc.custom_name IS NULL, 'NULL', QUOTE(ftc.custom_name)), ', ',
        IF(ftc.unit IS NULL, 'NULL', QUOTE(ftc.unit)), ', ',
        ftc.`index`, ', ',
        IF(ftc.is_graphable IS NULL, '0', ftc.is_graphable), ', ',
        IF(ftc.is_mandatory IS NULL, '0', ftc.is_mandatory),
      ');'
    )
    ORDER BY ftc.`index`
    SEPARATOR '\n'
  ) AS form_template_concepts_inserts
FROM form_template_concepts ftc
WHERE ftc.form_template_id = @templateId;
```

---

## Uso práctico

1. Define el ID del template.
2. Ejecuta cada SELECT.
3. Copia los INSERT resultantes en tu nueva base.
