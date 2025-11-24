#!/usr/bin/env node

/**
 * Exportador de Form Templates a SQL
 *
 * Genera un archivo SQL con todos los INSERTs de los formularios especificados
 * y sus registros relacionados en las tablas:
 * - concepts
 * - form_templates
 * - form_template_concepts
 *
 * Uso:
 *   node docs/03_Infraestructura/Scripts/export-form-templates.js
 *
 * Requiere variables de entorno:
 *   DB_HOST - Host de la base de datos MySQL
 *   DB_USER - Usuario de la base de datos (default: admin)
 *   DB_PASSWORD - Contraseña de la base de datos
 *   DB_DATABASE - Nombre de la base de datos (default: multi-dev)
 *   DB_PORT - Puerto de la base de datos (default: 3306)
 *
 * Salida:
 *   docs/03_Infraestructura/Scripts/exported-form-templates.sql
 */

const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

// ============================================================================
// CONFIGURACIÓN
// ============================================================================

const TEMPLATE_IDS = [
  '1b0ea18d-bd63-42d2-995f-bff9f8094e50',
  '13323607-20d2-46b7-8069-021e72dd9ed1',
  'b3be081d-0c3d-4627-8832-53dd247c7ca4',
  '273e544b-e7ff-4b86-8691-b4631572cbdc',
  '8968e478-f4a2-40da-8d25-20c3563419b4',
  '5ff521f8-1d4a-4ad5-8f2f-0bfcfc41c069',
  '0f6975e5-400c-4a5b-ab72-b3f24d4c0561',
  '408886cd-1bcb-48d5-b913-d8ee89a4e1d8',
  '85482d5a-3201-403b-a04b-f384c42be226',
  '752a2111-ae6d-48bb-8125-e45e8e82653c',
  '910f7307-d863-4901-ab51-33764f8ce6a8',
];

const DB_CONFIG = {
  host: process.env.DB_HOST || 'multi-proxy-dev.proxy-cktj1ovzcxhe.us-east-1.rds.amazonaws.com',
  user: process.env.DB_USER || 'admin',
  password: process.env.DB_PASSWORD || 'Ot60nkSBLwtpmur0ZP39Rr',
  database: process.env.DB_DATABASE || (process.env.ENV === 'prod' ? 'multi-prod' : 'multi-dev'),
  port: parseInt(process.env.DB_PORT || '3306', 10),
  connectTimeout: 60000, // 60 segundos
  acquireTimeout: 60000, // 60 segundos
  timeout: 60000, // 60 segundos
  ssl: process.env.DB_SSL === 'false' ? false : { 
    minVersion: 'TLSv1.2', 
    rejectUnauthorized: false 
  },
  // Configuración adicional para conexiones más estables
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
};

const OUTPUT_FILE = path.join(__dirname, 'exported-form-templates.sql');

// ============================================================================
// FUNCIONES AUXILIARES
// ============================================================================

/**
 * Creates a temporary table with template IDs
 */
async function createTempTable(connection) {
  const createTableQuery = `
    DROP TEMPORARY TABLE IF EXISTS tmp_keep_templates;
    CREATE TEMPORARY TABLE tmp_keep_templates (
      id varchar(36) PRIMARY KEY
    );
  `;

  await connection.query(createTableQuery);

  // Insert template IDs
  const placeholders = TEMPLATE_IDS.map(() => '(?)').join(',');
  const insertQuery = `INSERT INTO tmp_keep_templates (id) VALUES ${placeholders}`;
  await connection.query(insertQuery, TEMPLATE_IDS);

  console.log(`✅ Tabla temporal creada con ${TEMPLATE_IDS.length} templates`);
}

/**
 * Exports INSERTs for concepts table
 * Returns a single INSERT with multiple VALUES and new alias syntax
 */
async function exportConcepts(connection) {
  const query = `
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
        SEPARATOR ',\\n'
      ) AS concepts_values
    FROM concepts c
    JOIN form_template_concepts ftc ON ftc.concept_id = c.id
    JOIN tmp_keep_templates t ON t.id = ftc.form_template_id;
  `;

  const [rows] = await connection.query(query);
  const values = rows[0]?.concepts_values || '';
  
  if (!values) return '';
  
  return `INSERT INTO concepts (id, specialist_id, name, default_unit, description) 
VALUES 
${values}
AS new_values
ON DUPLICATE KEY UPDATE 
  specialist_id = new_values.specialist_id,
  name = new_values.name,
  default_unit = new_values.default_unit,
  description = new_values.description;`;
}

/**
 * Exports INSERTs for form_templates table
 * Returns a single INSERT with multiple VALUES and new alias syntax
 */
async function exportFormTemplates(connection) {
  const query = `
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
        SEPARATOR ',\\n'
      ) AS form_templates_values
    FROM form_templates ft
    JOIN tmp_keep_templates t ON t.id = ft.id;
  `;

  const [rows] = await connection.query(query);
  const values = rows[0]?.form_templates_values || '';
  
  if (!values) return '';
  
  return `INSERT INTO form_templates (id, specialty_id, specialist_id, name, description, is_initial_assessment, is_dietagent_intake, updated_at, created_at, deleted_at, base_template_id) 
VALUES 
${values}
AS new_values
ON DUPLICATE KEY UPDATE 
  specialty_id = new_values.specialty_id,
  specialist_id = new_values.specialist_id,
  name = new_values.name,
  description = new_values.description,
  is_initial_assessment = new_values.is_initial_assessment,
  is_dietagent_intake = new_values.is_dietagent_intake,
  updated_at = new_values.updated_at,
  created_at = new_values.created_at,
  deleted_at = new_values.deleted_at,
  base_template_id = new_values.base_template_id;`;
}

/**
 * Exports INSERTs for form_template_concepts table
 * Returns a single INSERT with multiple VALUES and new alias syntax
 */
async function exportFormTemplateConcepts(connection) {
  const query = `
    SELECT
      GROUP_CONCAT(
        CONCAT(
          '(', QUOTE(ftc.id), ', ',
          QUOTE(ftc.form_template_id), ', ',
          QUOTE(ftc.concept_id), ', ',
          IF(ftc.custom_name IS NULL, 'NULL', QUOTE(ftc.custom_name)), ', ',
          IF(ftc.unit IS NULL, 'NULL', QUOTE(ftc.unit)), ', ',
          ftc.\`index\`, ', ',
          IF(ftc.is_graphable IS NULL, '0', ftc.is_graphable), ', ',
          IF(ftc.is_mandatory IS NULL, '0', ftc.is_mandatory), ')'
        )
        ORDER BY ftc.form_template_id, ftc.\`index\`
        SEPARATOR ',\\n'
      ) AS form_template_concepts_values
    FROM form_template_concepts ftc
    JOIN tmp_keep_templates t ON t.id = ftc.form_template_id;
  `;

  const [rows] = await connection.query(query);
  const values = rows[0]?.form_template_concepts_values || '';
  
  if (!values) return '';
  
  return `INSERT INTO form_template_concepts (id, form_template_id, concept_id, custom_name, unit, \`index\`, is_graphable, is_mandatory) 
VALUES 
${values}
AS new_values
ON DUPLICATE KEY UPDATE 
  form_template_id = new_values.form_template_id,
  concept_id = new_values.concept_id,
  custom_name = new_values.custom_name,
  unit = new_values.unit,
  \`index\` = new_values.\`index\`,
  is_graphable = new_values.is_graphable,
  is_mandatory = new_values.is_mandatory;`;
}

/**
 * Generates the SQL file with all INSERTs
 */
function generateSQLFile(conceptsInserts, formTemplatesInserts, formTemplateConceptsInserts) {
  const header = `-- ============================================================================
-- Exportación de Form Templates
-- Generado: ${new Date().toISOString()}
-- Templates exportados: ${TEMPLATE_IDS.length}
-- ============================================================================

-- Template IDs:
${TEMPLATE_IDS.map((id) => `--   - ${id}`).join('\n')}

-- ============================================================================
-- 1. INSERTs para tabla: concepts
-- ============================================================================

`;

  const conceptsSection = conceptsInserts
    ? conceptsInserts + '\n\n'
    : '-- No se encontraron concepts para exportar\n\n';

  const formTemplatesHeader = `-- ============================================================================
-- 2. INSERTs para tabla: form_templates
-- ============================================================================

`;

  const formTemplatesSection = formTemplatesInserts
    ? formTemplatesInserts + '\n\n'
    : '-- No se encontraron form_templates para exportar\n\n';

  const formTemplateConceptsHeader = `-- ============================================================================
-- 3. INSERTs para tabla: form_template_concepts
-- ============================================================================

`;

  const formTemplateConceptsSection = formTemplateConceptsInserts
    ? formTemplateConceptsInserts + '\n\n'
    : '-- No se encontraron form_template_concepts para exportar\n\n';

  const footer = `-- ============================================================================
-- Fin de la exportación
-- ============================================================================
`;

  const sqlContent =
    header +
    conceptsSection +
    formTemplatesHeader +
    formTemplatesSection +
    formTemplateConceptsHeader +
    formTemplateConceptsSection +
    footer;

  fs.writeFileSync(OUTPUT_FILE, sqlContent, 'utf8');
  console.log(`✅ Archivo SQL generado: ${OUTPUT_FILE}`);
}

// ============================================================================
// FUNCIÓN PRINCIPAL
// ============================================================================

async function main() {
  console.log('🚀 Iniciando exportación de Form Templates...\n');
  console.log(`📋 Templates a exportar: ${TEMPLATE_IDS.length}`);
  console.log(`💾 Base de datos: ${DB_CONFIG.database}@${DB_CONFIG.host}:${DB_CONFIG.port}`);
  console.log(`🔐 SSL: ${DB_CONFIG.ssl ? 'Habilitado' : 'Deshabilitado'}\n`);

  let connection;

  try {
    // Connect to database
    console.log('⏳ Conectando a la base de datos...');
    connection = await mysql.createConnection(DB_CONFIG);
    console.log('✅ Conexión a la base de datos establecida\n');

    // Create temporary table with template IDs
    await createTempTable(connection);

    // Export each table
    console.log('📤 Exportando concepts...');
    const conceptsInserts = await exportConcepts(connection);
    const conceptsCount = conceptsInserts
      ? conceptsInserts.split('\n').filter((line) => line.trim().startsWith('INSERT')).length
      : 0;
    console.log(`   ✅ ${conceptsCount} concepts exportados\n`);

    console.log('📤 Exportando form_templates...');
    const formTemplatesInserts = await exportFormTemplates(connection);
    const formTemplatesCount = formTemplatesInserts
      ? formTemplatesInserts.split('\n').filter((line) => line.trim().startsWith('INSERT')).length
      : 0;
    console.log(`   ✅ ${formTemplatesCount} form_templates exportados\n`);

    console.log('📤 Exportando form_template_concepts...');
    const formTemplateConceptsInserts = await exportFormTemplateConcepts(connection);
    const formTemplateConceptsCount = formTemplateConceptsInserts
      ? formTemplateConceptsInserts.split('\n').filter((line) => line.trim().startsWith('INSERT')).length
      : 0;
    console.log(`   ✅ ${formTemplateConceptsCount} form_template_concepts exportados\n`);

    // Generate SQL file
    console.log('📝 Generando archivo SQL...');
    generateSQLFile(conceptsInserts, formTemplatesInserts, formTemplateConceptsInserts);

    console.log('\n✨ Exportación completada exitosamente!');
    console.log(`📄 Archivo generado: ${OUTPUT_FILE}`);
  } catch (error) {
    console.error('\n❌ Error durante la exportación:');
    console.error(`   Tipo: ${error.code || 'UNKNOWN'}`);
    console.error(`   Mensaje: ${error.message}`);
    
    // Mensajes de ayuda específicos según el tipo de error
    if (error.code === 'ETIMEDOUT' || error.code === 'ECONNREFUSED') {
      console.error('\n💡 Posibles soluciones:');
      console.error('   1. Verifica que el host de la base de datos sea correcto');
      console.error('   2. Verifica que tengas acceso a la red/VPN si es necesario');
      console.error('   3. Verifica que el puerto esté abierto (default: 3306)');
      console.error('   4. Intenta deshabilitar SSL: DB_SSL=false');
    } else if (error.code === 'ER_ACCESS_DENIED_ERROR') {
      console.error('\n💡 Posibles soluciones:');
      console.error('   1. Verifica las credenciales (DB_USER, DB_PASSWORD)');
      console.error('   2. Verifica que el usuario tenga permisos en la base de datos');
    } else if (error.code === 'ER_BAD_DB_ERROR') {
      console.error('\n💡 Posibles soluciones:');
      console.error('   1. Verifica que la base de datos exista (DB_DATABASE)');
      console.error('   2. Verifica el nombre de la base de datos');
    }
    
    if (error.stack && process.env.DEBUG === 'true') {
      console.error('\nStack trace:');
      console.error(error.stack);
    }
    process.exit(1);
  } finally {
    if (connection) {
      try {
        await connection.end();
        console.log('\n🔌 Conexión cerrada');
      } catch (closeError) {
        // Ignorar errores al cerrar la conexión
      }
    }
  }
}

// Execute main function
main();
