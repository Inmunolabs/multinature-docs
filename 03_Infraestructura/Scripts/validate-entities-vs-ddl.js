#!/usr/bin/env node
/**
 * Script de validación: Entities vs DDL
 * 
 * Compara las entities definidas en multi-mysql-layer/src/entities/
 * contra los DDL documentados en docs/db/*.md
 * 
 * Uso:
 *   node scripts/validate-entities-vs-ddl.js
 *   node scripts/validate-entities-vs-ddl.js --entity=foods
 *   node scripts/validate-entities-vs-ddl.js --fix (modo auto-fix, requiere confirmación)
 */

const fs = require('fs');
const path = require('path');

// ============================================================================
// CONFIGURACIÓN
// ============================================================================

const ENTITIES_DIR = path.join(__dirname, '../layers/multi-mysql-layer/src/entities');
const DDL_DIR = path.join(__dirname, '../docs/db');
const DB_MODELS_FILE = path.join(__dirname, '../docs/DB_MODELS.md');

// Colores para terminal
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
};

// ============================================================================
// UTILIDADES
// ============================================================================

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function parseArgs() {
  const args = process.argv.slice(2);
  const options = {
    entity: null,
    fix: false,
    verbose: false,
  };

  args.forEach(arg => {
    if (arg.startsWith('--entity=')) {
      options.entity = arg.split('=')[1];
    } else if (arg === '--fix') {
      options.fix = true;
    } else if (arg === '--verbose' || arg === '-v') {
      options.verbose = true;
    }
  });

  return options;
}

/**
 * Extrae columnas del DDL en formato SQL CREATE TABLE
 */
function extractColumnsFromDDL(ddlContent) {
  const createTableMatch = ddlContent.match(/CREATE TABLE[^(]*\(([\s\S]*?)\)/i);
  if (!createTableMatch) return [];

  const tableBody = createTableMatch[1];
  const lines = tableBody.split('\n');
  const columns = [];

  for (const line of lines) {
    const trimmed = line.trim();
    
    // Ignorar líneas de constraints, keys, etc.
    if (!trimmed || 
        trimmed.startsWith('PRIMARY KEY') ||
        trimmed.startsWith('UNIQUE KEY') ||
        trimmed.startsWith('KEY ') ||
        trimmed.startsWith('CONSTRAINT') ||
        trimmed.startsWith('FOREIGN KEY')) {
      continue;
    }

    // Extraer nombre de columna (primer token sin backticks)
    const match = trimmed.match(/^`?(\w+)`?\s+/);
    if (match) {
      columns.push(match[1]);
    }
  }

  return columns;
}

/**
 * Extrae campos definidos en una entity JS
 */
function extractFieldsFromEntity(entityContent) {
  const classMatch = entityContent.match(/export class (\w+)\s*\{([\s\S]*?)\n\s*static/);
  if (!classMatch) return { className: null, fields: [] };

  const className = classMatch[1];
  const classBody = classMatch[2];
  const lines = classBody.split('\n');
  const fields = [];

  for (const line of lines) {
    const trimmed = line.trim();
    
    // Buscar declaraciones de campos (sin = ni () )
    if (trimmed && !trimmed.startsWith('//') && !trimmed.startsWith('/*')) {
      const match = trimmed.match(/^(\w+);?\s*(\/\/.*)?$/);
      if (match && match[1] !== 'static') {
        fields.push(match[1]);
      }
    }
  }

  return { className, fields };
}

/**
 * Lee todos los DDL disponibles
 */
function loadAllDDLs() {
  const ddls = {};
  
  if (!fs.existsSync(DDL_DIR)) {
    log(`⚠️  Directorio de DDL no encontrado: ${DDL_DIR}`, 'yellow');
    return ddls;
  }

  const files = fs.readdirSync(DDL_DIR);
  
  for (const file of files) {
    if (!file.endsWith('.md') || file === 'TEMPLATE_TABLE.md') continue;
    
    const tableName = file.replace('.md', '');
    const filePath = path.join(DDL_DIR, file);
    const content = fs.readFileSync(filePath, 'utf8');
    
    ddls[tableName] = {
      file: filePath,
      content,
      columns: extractColumnsFromDDL(content),
    };
  }

  return ddls;
}

/**
 * Lee todas las entities disponibles
 */
function loadAllEntities() {
  const entities = {};
  
  if (!fs.existsSync(ENTITIES_DIR)) {
    log(`⚠️  Directorio de entities no encontrado: ${ENTITIES_DIR}`, 'yellow');
    return entities;
  }

  const files = fs.readdirSync(ENTITIES_DIR);
  
  for (const file of files) {
    if (!file.endsWith('.js')) continue;
    
    const entityName = file.replace('.js', '');
    const filePath = path.join(ENTITIES_DIR, file);
    const content = fs.readFileSync(filePath, 'utf8');
    const { className, fields } = extractFieldsFromEntity(content);
    
    entities[entityName] = {
      file: filePath,
      content,
      className,
      fields,
    };
  }

  return entities;
}

/**
 * Compara una entity con su DDL correspondiente
 */
function compareEntityWithDDL(entityName, entity, ddl) {
  const report = {
    entityName,
    tableName: entityName,
    className: entity.className,
    status: 'OK',
    missingFields: [],
    extraFields: [],
    suggestions: [],
  };

  if (!ddl) {
    report.status = 'NO_DDL';
    report.suggestions.push(`No se encontró DDL para ${entityName}.md`);
    return report;
  }

  if (!entity.fields || entity.fields.length === 0) {
    report.status = 'NO_FIELDS';
    report.suggestions.push(`Entity ${entity.className} no tiene campos definidos`);
    return report;
  }

  // Comparar campos
  const entityFieldSet = new Set(entity.fields);
  const ddlFieldSet = new Set(ddl.columns);

  // Campos en DDL pero no en entity
  for (const col of ddl.columns) {
    if (!entityFieldSet.has(col)) {
      report.missingFields.push(col);
    }
  }

  // Campos en entity pero no en DDL (posible obsoleto)
  for (const field of entity.fields) {
    if (!ddlFieldSet.has(field)) {
      report.extraFields.push(field);
    }
  }

  // Determinar status
  if (report.missingFields.length > 0 || report.extraFields.length > 0) {
    report.status = 'MISMATCH';
    
    if (report.missingFields.length > 0) {
      report.suggestions.push(
        `Agregar campos: ${report.missingFields.join(', ')}`
      );
    }
    
    if (report.extraFields.length > 0) {
      report.suggestions.push(
        `⚠️  Campos obsoletos (no en DDL): ${report.extraFields.join(', ')}`
      );
    }
  }

  return report;
}

// ============================================================================
// REPORTE
// ============================================================================

function printReport(reports) {
  log('\n' + '='.repeat(80), 'cyan');
  log('📊 REPORTE DE VALIDACIÓN: Entities vs DDL', 'cyan');
  log('='.repeat(80) + '\n', 'cyan');

  const stats = {
    total: reports.length,
    ok: 0,
    mismatch: 0,
    noDDL: 0,
    noFields: 0,
  };

  // Agrupar por status
  const byStatus = {
    OK: [],
    MISMATCH: [],
    NO_DDL: [],
    NO_FIELDS: [],
  };

  reports.forEach(report => {
    stats[report.status.toLowerCase().replace('_', '')]++;
    byStatus[report.status].push(report);
  });

  // Mostrar resumen
  log('📈 RESUMEN:', 'blue');
  log(`   Total entities: ${stats.total}`);
  log(`   ✅ Correctas: ${stats.ok}`, 'green');
  log(`   ⚠️  Con diferencias: ${stats.mismatch}`, 'yellow');
  log(`   ❌ Sin DDL: ${stats.noDDL}`, 'red');
  log(`   ⚠️  Sin campos: ${stats.noFields}`, 'yellow');
  log('');

  // Mostrar entities OK
  if (byStatus.OK.length > 0) {
    log('✅ ENTITIES CORRECTAS:', 'green');
    byStatus.OK.forEach(r => {
      log(`   • ${r.entityName} (${r.fields?.length || 0} campos)`, 'green');
    });
    log('');
  }

  // Mostrar entities con problemas
  if (byStatus.MISMATCH.length > 0) {
    log('⚠️  ENTITIES CON DIFERENCIAS:', 'yellow');
    byStatus.MISMATCH.forEach(r => {
      log(`\n   📄 ${r.entityName} (${r.className})`, 'yellow');
      
      if (r.missingFields.length > 0) {
        log(`      ❌ Campos faltantes (${r.missingFields.length}):`, 'red');
        r.missingFields.forEach(f => log(`         - ${f}`, 'red'));
      }
      
      if (r.extraFields.length > 0) {
        log(`      ⚠️  Campos obsoletos (${r.extraFields.length}):`, 'yellow');
        r.extraFields.forEach(f => log(`         - ${f}`, 'yellow'));
      }
      
      if (r.suggestions.length > 0) {
        log(`      💡 Sugerencias:`, 'cyan');
        r.suggestions.forEach(s => log(`         ${s}`, 'cyan'));
      }
    });
    log('');
  }

  // Mostrar entities sin DDL
  if (byStatus.NO_DDL.length > 0) {
    log('❌ ENTITIES SIN DDL CORRESPONDIENTE:', 'red');
    byStatus.NO_DDL.forEach(r => {
      log(`   • ${r.entityName}`, 'red');
    });
    log('');
  }

  // Estadísticas finales
  log('='.repeat(80), 'cyan');
  
  if (stats.mismatch > 0 || stats.noDDL > 0) {
    log('⚠️  ACCIÓN REQUERIDA: Hay entities que necesitan actualización', 'yellow');
  } else {
    log('✅ TODAS LAS ENTITIES ESTÁN ALINEADAS CON EL DDL', 'green');
  }
  
  log('='.repeat(80) + '\n', 'cyan');
}

/**
 * Genera reporte en formato Markdown
 */
function generateMarkdownReport(reports) {
  let md = '# Reporte de Validación: Entities vs DDL\n\n';
  md += `**Fecha**: ${new Date().toISOString().split('T')[0]}\n\n`;
  
  md += '## Resumen\n\n';
  const stats = {
    total: reports.length,
    ok: reports.filter(r => r.status === 'OK').length,
    mismatch: reports.filter(r => r.status === 'MISMATCH').length,
    noDDL: reports.filter(r => r.status === 'NO_DDL').length,
  };
  
  md += `- Total entities: ${stats.total}\n`;
  md += `- ✅ Correctas: ${stats.ok}\n`;
  md += `- ⚠️ Con diferencias: ${stats.mismatch}\n`;
  md += `- ❌ Sin DDL: ${stats.noDDL}\n\n`;
  
  // Detalles por entity
  md += '## Detalles por Entity\n\n';
  
  reports.forEach(report => {
    if (report.status === 'MISMATCH') {
      md += `### ⚠️ ${report.entityName}\n\n`;
      
      if (report.missingFields.length > 0) {
        md += '**Campos faltantes**:\n';
        report.missingFields.forEach(f => md += `- \`${f}\`\n`);
        md += '\n';
      }
      
      if (report.extraFields.length > 0) {
        md += '**Campos obsoletos**:\n';
        report.extraFields.forEach(f => md += `- \`${f}\`\n`);
        md += '\n';
      }
    }
  });
  
  return md;
}

// ============================================================================
// MAIN
// ============================================================================

async function main() {
  const options = parseArgs();
  
  log('🔍 Validando entities contra DDL...', 'cyan');
  log('');

  // Cargar todos los DDL y entities
  const ddls = loadAllDDLs();
  const entities = loadAllEntities();
  
  log(`📚 Cargados ${Object.keys(ddls).length} DDLs`);
  log(`📦 Cargadas ${Object.keys(entities).length} entities`);
  log('');

  // Si se especificó una entity, solo procesar esa
  let entitiesToProcess = entities;
  if (options.entity) {
    if (!entities[options.entity]) {
      log(`❌ Entity '${options.entity}' no encontrada`, 'red');
      process.exit(1);
    }
    entitiesToProcess = { [options.entity]: entities[options.entity] };
  }

  // Comparar cada entity con su DDL
  const reports = [];
  
  for (const [entityName, entity] of Object.entries(entitiesToProcess)) {
    const ddl = ddls[entityName];
    const report = compareEntityWithDDL(entityName, entity, ddl);
    reports.push(report);
  }

  // Imprimir reporte
  printReport(reports);

  // Generar archivo MD si hay problemas
  const hasIssues = reports.some(r => r.status === 'MISMATCH' || r.status === 'NO_DDL');
  if (hasIssues) {
    const mdReport = generateMarkdownReport(reports);
    const reportPath = path.join(__dirname, '../ENTITY_VALIDATION_REPORT.md');
    fs.writeFileSync(reportPath, mdReport);
    log(`📄 Reporte detallado guardado en: ${reportPath}`, 'cyan');
  }

  // Exit code
  process.exit(hasIssues ? 1 : 0);
}

// Ejecutar
if (require.main === module) {
  main().catch(err => {
    log(`❌ Error: ${err.message}`, 'red');
    if (process.argv.includes('--verbose')) {
      console.error(err);
    }
    process.exit(1);
  });
}

module.exports = { 
  loadAllDDLs, 
  loadAllEntities, 
  compareEntityWithDDL 
};

