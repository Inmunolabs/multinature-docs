-- ============================================================================
-- Exportación de Form Templates - Queries para MySQL Workbench
-- ============================================================================
-- 
-- Este archivo contiene los queries SQL para exportar los INSERTs de los
-- formularios especificados y sus registros relacionados.
--
-- INSTRUCCIONES:
-- 1. Ejecuta cada sección en orden
-- 2. Copia el resultado de cada SELECT (columna con los valores)
-- 3. Usa el script export-form-templates.js para generar los INSERTs con la nueva sintaxis
--
-- ============================================================================

-- ============================================================================
-- PASO 1: Crear tabla temporal con los IDs de los templates a exportar
-- ============================================================================
USE `multi-dev`;

DROP TEMPORARY TABLE IF EXISTS tmp_keep_templates;
CREATE TEMPORARY TABLE tmp_keep_templates (
  id varchar(36) PRIMARY KEY
);

-- Insertar los IDs de los templates a exportar
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

-- ============================================================================
-- PASO 2: Exportar valores para tabla 'concepts'
-- ============================================================================
-- 
-- Ejecuta este query y copia el contenido de la columna 'concepts_values'
-- 

SET SESSION group_concat_max_len = 1024 * 1024;

SELECT
  GROUP_CONCAT(
    CONCAT(
      '(', QUOTE(c.id), ', ',
      IF(c.specialist_id IS NULL, 'NULL', QUOTE(c.specialist_id)), ', ',
      QUOTE(c.name), ', ',
      IF(c.default_unit IS NULL, 'NULL', QUOTE(c.default_unit)), ', ',
      IF(c.description IS NULL, 'NULL', QUOTE(c.description)), ')'
    )
    ORDER BY c.name
    SEPARATOR ',\n'
  ) AS concepts_values
FROM concepts c
JOIN form_template_concepts ftc ON ftc.concept_id = c.id
JOIN tmp_keep_templates t ON t.id = ftc.form_template_id;

-- ============================================================================
-- PASO 3: Exportar valores para tabla 'form_templates'
-- ============================================================================
-- 
-- Ejecuta este query y copia el contenido de la columna 'form_templates_values'
-- 

SELECT
  GROUP_CONCAT(
    CONCAT(
      '(', QUOTE(ft.id), ', ',
      IF(ft.specialty_id IS NULL, 'NULL', QUOTE(ft.specialty_id)), ', ',
      IF(ft.specialist_id IS NULL, 'NULL', QUOTE(ft.specialist_id)), ', ',
      QUOTE(ft.name), ', ',
      IF(ft.description IS NULL, 'NULL', QUOTE(ft.description)), ', ',
      IF(ft.is_initial_assessment IS NULL, '0', ft.is_initial_assessment), ', ',
      IF(ft.is_dietagent_intake IS NULL, '0', ft.is_dietagent_intake), ', ',
      'NOW(), NOW(), ',
      'NULL, ',
      IF(ft.base_template_id IS NULL, 'NULL', QUOTE(ft.base_template_id)), ')'
    )
    ORDER BY ft.name
    SEPARATOR ',\n'
  ) AS form_templates_values
FROM form_templates ft
JOIN tmp_keep_templates t ON t.id = ft.id;

-- ============================================================================
-- PASO 4: Exportar valores para tabla 'form_template_concepts'
-- ============================================================================
-- 
-- Ejecuta este query y copia el contenido de la columna 'form_template_concepts_values'
-- 

SELECT
  GROUP_CONCAT(
    CONCAT(
      '(', QUOTE(ftc.id), ', ',
      QUOTE(ftc.form_template_id), ', ',
      QUOTE(ftc.concept_id), ', ',
      IF(ftc.custom_name IS NULL, 'NULL', QUOTE(ftc.custom_name)), ', ',
      IF(ftc.unit IS NULL, 'NULL', QUOTE(ftc.unit)), ', ',
      ftc.`index`, ', ',
      IF(ftc.is_graphable IS NULL, '0', ftc.is_graphable), ', ',
      IF(ftc.is_mandatory IS NULL, '0', ftc.is_mandatory), ')'
    )
    ORDER BY ftc.form_template_id, ftc.`index`
    SEPARATOR ',\n'
  ) AS form_template_concepts_values
FROM form_template_concepts ftc
JOIN tmp_keep_templates t ON t.id = ftc.form_template_id;

-- ============================================================================
-- NOTAS:
-- ============================================================================
-- 
-- 1. Los resultados de cada SELECT aparecerán en una sola fila con una columna
--    que contiene todos los valores concatenados.
-- 
-- 2. Para generar los INSERTs con la nueva sintaxis (sin warnings de deprecación),
--    ejecuta el script: node export-form-templates.js
-- 
-- 3. El script generará un archivo SQL con un solo INSERT por tabla usando la
--    nueva sintaxis con alias (AS new_values) en lugar de VALUES().
-- 
-- 4. Orden recomendado para ejecutar los INSERTs:
--    a) concepts
--    b) form_templates
--    c) form_template_concepts
-- 
-- 5. Si algún query no devuelve resultados, significa que no hay registros
--    relacionados para esos templates.
-- 
-- ============================================================================
