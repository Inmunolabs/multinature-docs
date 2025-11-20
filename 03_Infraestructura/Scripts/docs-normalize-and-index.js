#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const DOCS_DIR = path.join(__dirname, '..', 'docs');
const IGNORE_PATTERNS = ['.excalidraw', '.crswap', '.png', '.jpg', '.jpeg', '.gif', 'node_modules'];

const stats = {
  filesScanned: 0,
  filesNormalized: 0,
  issuesFixed: []
};

function shouldIgnore(filePath) {
  return IGNORE_PATTERNS.some(pattern => filePath.includes(pattern));
}

function normalizeMarkdown(content, filePath) {
  let normalized = content;
  let changes = [];

  // 1. Asegurar que tiene heading principal
  if (!normalized.match(/^#\s+.+$/m)) {
    const fileName = path.basename(filePath, '.md');
    const heading = fileName.charAt(0).toUpperCase() + fileName.slice(1);
    normalized = `# ${heading}\n\n${normalized}`;
    changes.push('Agregado heading principal');
  }

  // 2. Normalizar saltos de línea al final
  normalized = normalized.trimEnd() + '\n';

  // 3. Eliminar múltiples líneas vacías consecutivas (más de 2)
  normalized = normalized.replace(/\n{4,}/g, '\n\n\n');

  // 4. Espacios al final de líneas
  normalized = normalized.replace(/ +$/gm, '');

  // 5. Asegurar espacio después de # en headings
  normalized = normalized.replace(/^(#{1,6})([^ #])/gm, '$1 $2');

  // 6. Normalizar listas (espacio después de - o *)
  normalized = normalized.replace(/^([ \t]*)([-*])([^ ])/gm, '$1$2 $3');

  return { normalized, changes };
}

function normalizeFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const relativePath = path.relative(DOCS_DIR, filePath);
    
    stats.filesScanned++;

    const { normalized, changes } = normalizeMarkdown(content, filePath);

    if (normalized !== content) {
      fs.writeFileSync(filePath, normalized, 'utf8');
      stats.filesNormalized++;
      
      if (changes.length > 0) {
        stats.issuesFixed.push({
          file: relativePath,
          changes
        });
      }
    }
  } catch (error) {
    console.error(`Error normalizando ${filePath}: ${error.message}`);
  }
}

function scanAndNormalize(dirPath) {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    
    if (shouldIgnore(fullPath)) {
      continue;
    }
    
    if (entry.isDirectory()) {
      scanAndNormalize(fullPath);
    } else if (entry.name.endsWith('.md')) {
      normalizeFile(fullPath);
    }
  }
}

function runScript(scriptPath, scriptName) {
  try {
    console.log(`\n🔄 Ejecutando ${scriptName}...`);
    const output = execSync(`node "${scriptPath}"`, {
      cwd: path.join(__dirname, '..'),
      encoding: 'utf8'
    });
    console.log(output);
    return { success: true, output };
  } catch (error) {
    console.log(error.stdout || error.message);
    return { success: false, error: error.message, code: error.status };
  }
}

console.log('🔄 NORMALIZACIÓN E INDEXACIÓN COMPLETA DE DOCUMENTACIÓN\n');
console.log('='.repeat(70));

// PASO 1: Normalizar formato
console.log('\n📝 PASO 1: NORMALIZACIÓN DE FORMATO\n');
console.log('Escaneando y normalizando archivos markdown...\n');

scanAndNormalize(DOCS_DIR);

console.log(`✅ Archivos escaneados: ${stats.filesScanned}`);
console.log(`✅ Archivos normalizados: ${stats.filesNormalized}\n`);

if (stats.issuesFixed.length > 0) {
  console.log('🔧 Correcciones aplicadas:\n');
  stats.issuesFixed.slice(0, 10).forEach((issue, i) => {
    console.log(`   ${i + 1}. ${issue.file}`);
    issue.changes.forEach(change => {
      console.log(`      - ${change}`);
    });
  });
  if (stats.issuesFixed.length > 10) {
    console.log(`   ... y ${stats.issuesFixed.length - 10} archivos más\n`);
  }
}

console.log('\n' + '='.repeat(70));

// PASO 2: Actualizar índices
console.log('\n📚 PASO 2: ACTUALIZACIÓN DE ÍNDICES\n');

const updateDbModelsPath = path.join(__dirname, 'update-db-models-index.js');
const updateDbResult = runScript(updateDbModelsPath, 'update-db-models-index.js');

const verifyIndexPath = path.join(__dirname, 'docs-verify-and-index.js');
const verifyResult = runScript(verifyIndexPath, 'docs-verify-and-index.js');

console.log('='.repeat(70));

// PASO 3: Ejecutar auditorías
console.log('\n🔍 PASO 3: SUITE DE AUDITORÍAS\n');

const auditResults = [];

// Auditoría estructural
const auditStructPath = path.join(__dirname, 'docs-audit.js');
console.log('📊 Auditoría 1/3: Estructura y Mapeos');
const structResult = runScript(auditStructPath, 'docs-audit.js');
auditResults.push({ name: 'Estructura', result: structResult });

// Auditoría de contenido
const auditContentPath = path.join(__dirname, 'docs-content-audit.js');
console.log('📊 Auditoría 2/3: Contenido y Completitud');
const contentResult = runScript(auditContentPath, 'docs-content-audit.js');
auditResults.push({ name: 'Contenido', result: contentResult });

// Auditoría de privacidad
const auditPrivacyPath = path.join(__dirname, 'docs-privacy-audit.js');
console.log('📊 Auditoría 3/3: Seguridad y Privacidad');
const privacyResult = runScript(auditPrivacyPath, 'docs-privacy-audit.js');
auditResults.push({ name: 'Privacidad', result: privacyResult });

console.log('='.repeat(70));

// PASO 4: Resumen final
console.log('\n📊 RESUMEN FINAL\n');

console.log('✅ Normalización:');
console.log(`   - Archivos procesados: ${stats.filesScanned}`);
console.log(`   - Archivos modificados: ${stats.filesNormalized}`);
console.log(`   - Correcciones aplicadas: ${stats.issuesFixed.length}\n`);

console.log('✅ Índices:');
console.log(`   - DB_MODELS.md: ${updateDbResult.success ? '✅ Actualizado' : '❌ Error'}`);
console.log(`   - DOCUMENTATION_INDEX.md: ${verifyResult.success ? '✅ Actualizado' : '❌ Error'}\n`);

console.log('✅ Auditorías:');
auditResults.forEach(audit => {
  const status = audit.result.success ? '✅ PASS' : 
                 audit.result.code === 1 ? '⚠️  WARN' : 
                 '❌ FAIL';
  console.log(`   - ${audit.name}: ${status}`);
});

console.log('\n' + '='.repeat(70));

// Generar reporte
const report = {
  timestamp: new Date().toISOString(),
  normalization: {
    filesScanned: stats.filesScanned,
    filesNormalized: stats.filesNormalized,
    issuesFixed: stats.issuesFixed.length
  },
  indices: {
    dbModels: updateDbResult.success,
    documentationIndex: verifyResult.success
  },
  audits: auditResults.map(a => ({
    name: a.name,
    success: a.result.success,
    code: a.result.code
  }))
};

const reportPath = path.join(__dirname, '..', 'docs', 'reports', 'docs-normalize-report.json');
fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));

console.log('\n📄 Reporte guardado en: docs/reports/docs-normalize-report.json\n');

// Exit code
const hasErrors = auditResults.some(a => a.result.code === 2);
const hasWarnings = auditResults.some(a => a.result.code === 1);

if (hasErrors) {
  console.log('❌ Proceso completado con ERRORES\n');
  process.exit(2);
} else if (hasWarnings) {
  console.log('⚠️  Proceso completado con ADVERTENCIAS\n');
  process.exit(1);
} else {
  console.log('✅ Proceso completado EXITOSAMENTE\n');
  process.exit(0);
}

