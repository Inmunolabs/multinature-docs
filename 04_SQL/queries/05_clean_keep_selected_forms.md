# 05 – Limpieza y Exportación de Formularios (Keep Selected Templates)

### (_Versión corregida para compatibilidad con triggers existentes_)

Este archivo reemplaza completamente al anterior **04_clean_keep_selected_forms.md**, ahora como **05_clean_keep_selected_forms.md**, incorporando la solución correcta para evitar errores **MySQL 1442** cuando existen triggers en `filled_form_values` que llaman al procedure `touch_filled_form`.

Este enfoque es 100% seguro con tu esquema actual y tus triggers.

---

# 🎯 Objetivo

1. Mantener únicamente los formularios (`form_templates`) cuyos IDs tú definas.
2. Exportar los INSERTs completos de:
   - `concepts`
   - `form_templates`
   - `form_template_concepts`
3. Limpiar la DB eliminando:
   - `filled_form_values` ajenos a los templates permitidos (sin romper triggers)
   - `filled_forms`
   - `form_template_concepts`
   - `form_templates`
   - `concepts` huérfanos

---

# ⚙️ 0. Preparar lista de templates permitidos

```sql
DROP TEMPORARY TABLE IF EXISTS tmp_keep_templates;
CREATE TEMPORARY TABLE tmp_keep_templates (
  id varchar(36) PRIMARY KEY
);

-- 👉 EDITA ESTA LISTA
INSERT INTO tmp_keep_templates (id) VALUES
  ('1b0ea18d-bd63-42d2-995f-bff9f8094e50');
  -- ,('OTRO-TEMPLATE-ID')
```

---

# 📤 1. Export: INSERTs para `concepts`

```sql
SET SESSION group_concat_max_len = 1024 * 1024;

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
JOIN tmp_keep_templates t       ON t.id = ftc.form_template_id;
```

---

# 📤 2. Export: INSERT para `form_templates`

```sql
SELECT
  GROUP_CONCAT(
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
    )
    ORDER BY ft.name
    SEPARATOR '\n'
  ) AS form_templates_inserts
FROM form_templates ft
JOIN tmp_keep_templates t ON t.id = ft.id;
```

---

# 📤 3. Export: INSERTs para `form_template_concepts`

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
    ORDER BY ftc.form_template_id, ftc.`index`
    SEPARATOR '\n'
  ) AS form_template_concepts_inserts
FROM form_template_concepts ftc
JOIN tmp_keep_templates t ON t.id = ftc.form_template_id;
```

---

# 🧹 4. Limpieza **segura con triggers activos**

### (Versión protegida contra MySQL Error 1442)

### 🟢 Paso A — Identificar `filled_forms` que se deben eliminar

```sql
DROP TEMPORARY TABLE IF EXISTS tmp_delete_filled_forms;
CREATE TEMPORARY TABLE tmp_delete_filled_forms (
  id varchar(36) PRIMARY KEY
);

INSERT INTO tmp_delete_filled_forms (id)
SELECT ff.id
FROM filled_forms ff
LEFT JOIN tmp_keep_templates t ON t.id = ff.form_template_id
WHERE t.id IS NULL;
```

---

### 🟢 Paso B — Borrar `filled_form_values` sin tocar directamente `filled_forms`

```sql
DELETE ffv
FROM filled_form_values ffv
JOIN tmp_delete_filled_forms d ON d.id = ffv.filled_form_id;
```

---

### 🟢 Paso C — Borrar los `filled_forms` ya huérfanos

```sql
DELETE ff
FROM filled_forms ff
JOIN tmp_delete_filled_forms d ON d.id = ff.id;
```

---

# 🧹 5. Borrar `form_template_concepts` que no correspondan

```sql
DELETE ftc
FROM form_template_concepts ftc
LEFT JOIN tmp_keep_templates t ON t.id = ftc.form_template_id
WHERE t.id IS NULL;
```

---

# 🧹 6. Borrar `form_templates` no permitidos

```sql
DELETE ft
FROM form_templates ft
LEFT JOIN tmp_keep_templates t ON t.id = ft.id
WHERE t.id IS NULL;
```

---

# 🧹 7. Borrar `concepts` huérfanos

```sql
DELETE c
FROM concepts c
LEFT JOIN form_template_concepts ftc ON ftc.concept_id = c.id
WHERE ftc.id IS NULL;
```

---

# ✔️ Uso recomendado

1. Edita los IDs permitidos en `tmp_keep_templates`.
2. Ejecuta los SELECT exportadores y guarda los INSERTs.
3. Ejecuta la limpieza con seguridad (versión anti‑1442).
4. Opcional: vuelve a insertar los INSERTs en una DB nueva/limpia.

---

# TODO EN UNO

```sql
DROP TEMPORARY TABLE IF EXISTS tmp_keep_templates;
CREATE TEMPORARY TABLE tmp_keep_templates (
id varchar(36) PRIMARY KEY
);

INSERT INTO tmp_keep_templates (id) VALUES
('1b0ea18d-bd63-42d2-995f-bff9f8094e50'),
('13323607-20d2-46b7-8069-021e72dd9ed1'),
('b3be081d-0c3d-4627-8832-53dd247c7ca4'),
('273e544b-e7ff-4b86-8691-b4631572cbdc'),
('8968e478-f4a2-40da-8d25-20c3563419b4'),
('5ff521f8-1d4a-4ad5-8f2f-0bfcfc41c069'),
('0f6975e5-400c-4a5b-ab72-b3f24d4c0561'),
('408886cd-1bcb-48d5-b913-d8ee89a4e1d8'),
('85482d5a-3201-403b-a04b-f384c42be226'),
('752a2111-ae6d-48bb-8125-e45e8e82653c'),
('910f7307-d863-4901-ab51-33764f8ce6a8');

# 📤 1. Export: INSERTs para `concepts`

SET SESSION group_concat_max_len = 1024 * 1024;;

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
JOIN tmp_keep_templates t ON t.id = ftc.form_template_id;

# 📤 2. Export: INSERT para `form_templates`

SELECT
GROUP_CONCAT(
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
)
ORDER BY ft.name
SEPARATOR '\n'
) AS form_templates_inserts
FROM form_templates ft
JOIN tmp_keep_templates t ON t.id = ft.id;

# 📤 3. Export: INSERTs para `form_template_concepts`

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
ORDER BY ftc.form_template_id, ftc.`index`
SEPARATOR '\n'
) AS form_template_concepts_inserts
FROM form_template_concepts ftc
JOIN tmp_keep_templates t ON t.id = ftc.form_template_id;

# 🧹 4. Limpieza **segura con triggers activos**

### (Versión protegida contra MySQL Error 1442)

### 🟢 Paso A — Identificar `filled_forms` que se deben eliminar

DROP TEMPORARY TABLE IF EXISTS tmp_delete_filled_forms;
CREATE TEMPORARY TABLE tmp_delete_filled_forms (
id varchar(36) PRIMARY KEY
);

INSERT INTO tmp_delete_filled_forms (id)
SELECT ff.id
FROM filled_forms ff
LEFT JOIN tmp_keep_templates t ON t.id = ff.form_template_id
WHERE t.id IS NULL;

### 🟢 Paso B — Borrar `filled_form_values` sin tocar directamente `filled_forms`

DELETE ffv
FROM filled_form_values ffv
JOIN tmp_delete_filled_forms d ON d.id = ffv.filled_form_id;

### 🟢 Paso C — Borrar los `filled_forms` ya huérfanos

DELETE ff
FROM filled_forms ff
JOIN tmp_delete_filled_forms d ON d.id = ff.id;

# 🧹 5. Borrar `form_template_concepts` que no correspondan

DELETE ftc
FROM form_template_concepts ftc
LEFT JOIN tmp_keep_templates t ON t.id = ftc.form_template_id
WHERE t.id IS NULL;

# 🧹 6. Borrar `form_templates` no permitidos

DELETE ft
FROM form_templates ft
LEFT JOIN tmp_keep_templates t ON t.id = ft.id
WHERE t.id IS NULL;

# 🧹 7. Borrar `concepts` huérfanos

DELETE c
FROM concepts c
LEFT JOIN form_template_concepts ftc ON ftc.concept_id = c.id
WHERE ftc.id IS NULL;

```
