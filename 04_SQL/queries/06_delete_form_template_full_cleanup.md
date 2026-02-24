# 06 -- Eliminar un formulario completo (y limpieza de conceptos exclusivos)

## Objetivo

Dado el **ID** o el **nombre** de uno o varios `form_templates`,
eliminar de forma segura:

-   Todas las relaciones `form_template_concepts` del template.
-   Todos los `filled_forms` generados desde ese template.
-   Todos los `filled_form_values` asociados a esos filled forms.
-   Los `concepts` únicamente si esos conceptos solo se usan en los
    templates que estás eliminando (es decir, no están referenciados por
    `form_template_concepts` de otros templates).

⚠️ Importante: - Esto hace DELETE físico. - Ejecuta primero la sección
de previsualización antes del COMMIT.

------------------------------------------------------------------------

## Variables de entrada

``` sql
SET SESSION group_concat_max_len = 1024 * 1024;

SET @templateId   = NULL;  -- ejemplo: 'fb5a77a5-c3d9-4d1b-a88d-42b75664d071'
SET @templateName = 'Evaluación Inicial - Fitness';
```

------------------------------------------------------------------------

## Script completo

``` sql
START TRANSACTION;

DROP TEMPORARY TABLE IF EXISTS tmp_templates_to_delete;
CREATE TEMPORARY TABLE tmp_templates_to_delete (
  id CHAR(36) PRIMARY KEY
) ENGINE=Memory;

INSERT INTO tmp_templates_to_delete (id)
SELECT ft.id
FROM form_templates ft
WHERE
  (@templateId IS NOT NULL AND ft.id = @templateId)
  OR
  (@templateId IS NULL AND @templateName IS NOT NULL AND ft.name = @templateName);

SELECT COUNT(*) AS templates_found FROM tmp_templates_to_delete;


DROP TEMPORARY TABLE IF EXISTS tmp_filled_forms_to_delete;
CREATE TEMPORARY TABLE tmp_filled_forms_to_delete (
  id CHAR(36) PRIMARY KEY
) ENGINE=Memory;

INSERT INTO tmp_filled_forms_to_delete (id)
SELECT ff.id
FROM filled_forms ff
JOIN tmp_templates_to_delete t ON t.id = ff.form_template_id;


DROP TEMPORARY TABLE IF EXISTS tmp_concepts_candidates;
CREATE TEMPORARY TABLE tmp_concepts_candidates (
  concept_id CHAR(36) PRIMARY KEY
) ENGINE=Memory;

INSERT INTO tmp_concepts_candidates (concept_id)
SELECT DISTINCT ftc.concept_id
FROM form_template_concepts ftc
JOIN tmp_templates_to_delete t ON t.id = ftc.form_template_id;


DROP TEMPORARY TABLE IF EXISTS tmp_concepts_exclusive;
CREATE TEMPORARY TABLE tmp_concepts_exclusive (
  concept_id CHAR(36) PRIMARY KEY
) ENGINE=Memory;

INSERT INTO tmp_concepts_exclusive (concept_id)
SELECT c.concept_id
FROM tmp_concepts_candidates c
JOIN form_template_concepts ftc_all
  ON ftc_all.concept_id = c.concept_id
LEFT JOIN tmp_templates_to_delete t
  ON t.id = ftc_all.form_template_id
GROUP BY c.concept_id
HAVING SUM(t.id IS NULL) = 0;


SELECT
  (SELECT COUNT(*) FROM tmp_templates_to_delete) AS templates_to_delete,
  (SELECT COUNT(*) FROM form_template_concepts ftc
     JOIN tmp_templates_to_delete t ON t.id = ftc.form_template_id) AS ftc_rows_to_delete,
  (SELECT COUNT(*) FROM tmp_filled_forms_to_delete) AS filled_forms_to_delete,
  (SELECT COUNT(*) FROM filled_form_values ffv
     JOIN tmp_filled_forms_to_delete f ON f.id = ffv.filled_form_id) AS filled_form_values_to_delete,
  (SELECT COUNT(*) FROM tmp_concepts_exclusive) AS concepts_exclusive_to_delete;


DELETE ffv
FROM filled_form_values ffv
JOIN tmp_filled_forms_to_delete f ON f.id = ffv.filled_form_id;

DELETE ff
FROM filled_forms ff
JOIN tmp_filled_forms_to_delete f ON f.id = ff.id;

DELETE ftc
FROM form_template_concepts ftc
JOIN tmp_templates_to_delete t ON t.id = ftc.form_template_id;

DELETE ft
FROM form_templates ft
JOIN tmp_templates_to_delete t ON t.id = ft.id;

DELETE c
FROM concepts c
JOIN tmp_concepts_exclusive x ON x.concept_id = c.id;

COMMIT;
```
