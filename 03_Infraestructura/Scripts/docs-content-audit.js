#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const DOCS_DIR = path.join(__dirname, '..', 'docs');
const MIN_CONTENT_LENGTH = 200; // Menos de 200 caracteres = incompleto
const IGNORE_PATTERNS = [
  '.excalidraw',
  '.png',
  '.jpg',
  '.jpeg',
  '.gif',
  '.crswap',
  'TEMPLATE',
  'node_modules'
];

const results = {
  empty: [],
  incomplete: [],
  withTodos: [],
  complete: [],
  total: 0
};

function shouldIgnore(filePath) {
  return IGNORE_PATTERNS.some(pattern => filePath.includes(pattern));
}

function analyzeMarkdownFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const relativePath = path.relative(DOCS_DIR, filePath);
    
    results.total++;
    
    // Archivo vacío
    if (content.trim().length === 0) {
      results.empty.push({
        path: relativePath,
        size: 0,
        reason: 'Archivo completamente vacío'
      });
      return;
    }
    
    // Buscar TODOs, WIP, PENDIENTE, etc.
    const todoPattern = /TODO|PENDIENTE|WIP|COMPLETAR|AGREGAR|FALTA|FIXME|XXX/gi;
    const todos = content.match(todoPattern);
    
    if (todos && todos.length > 0) {
      results.withTodos.push({
        path: relativePath,
        todos: todos.length,
        size: content.length
      });
    }
    
    // Contenido muy corto (menos de MIN_CONTENT_LENGTH caracteres)
    if (content.length < MIN_CONTENT_LENGTH) {
      results.incomplete.push({
        path: relativePath,
        size: content.length,
        reason: `Contenido muy corto (${content.length} chars < ${MIN_CONTENT_LENGTH})`
      });
      return;
    }
    
    // Archivo completo
    results.complete.push({
      path: relativePath,
      size: content.length
    });
    
  } catch (error) {
    console.error(`Error procesando ${filePath}: ${error.message}`);
  }
}

function scanDirectory(dirPath) {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    
    if (shouldIgnore(fullPath)) {
      continue;
    }
    
    if (entry.isDirectory()) {
      scanDirectory(fullPath);
    } else if (entry.name.endsWith('.md')) {
      analyzeMarkdownFile(fullPath);
    }
  }
}

console.log('📝 AUDITORÍA DE CONTENIDO DE DOCUMENTACIÓN\n');
console.log('='.repeat(70));
console.log('\n🔍 Escaneando documentación...\n');

scanDirectory(DOCS_DIR);

console.log('\n' + '='.repeat(70));
console.log('\n📊 RESULTADOS\n');

console.log(`📁 Total de archivos .md: ${results.total}\n`);

// Archivos vacíos
if (results.empty.length > 0) {
  console.log(`❌ Archivos VACÍOS (${results.empty.length}):\n`);
  results.empty.slice(0, 10).forEach(file => {
    console.log(`   - ${file.path}`);
  });
  if (results.empty.length > 10) {
    console.log(`   ... y ${results.empty.length - 10} más`);
  }
  console.log('');
}

// Archivos incompletos
if (results.incomplete.length > 0) {
  console.log(`⚠️  Archivos INCOMPLETOS (${results.incomplete.length}):\n`);
  results.incomplete
    .sort((a, b) => a.size - b.size)
    .slice(0, 15)
    .forEach(file => {
      console.log(`   - ${file.path} (${file.size} chars)`);
    });
  if (results.incomplete.length > 15) {
    console.log(`   ... y ${results.incomplete.length - 15} más`);
  }
  console.log('');
}

// Archivos con TODOs
if (results.withTodos.length > 0) {
  console.log(`📝 Archivos con TODOs/PENDIENTES (${results.withTodos.length}):\n`);
  results.withTodos
    .sort((a, b) => b.todos - a.todos)
    .slice(0, 15)
    .forEach(file => {
      console.log(`   - ${file.path} (${file.todos} TODOs)`);
    });
  if (results.withTodos.length > 15) {
    console.log(`   ... y ${results.withTodos.length - 15} más`);
  }
  console.log('');
}

// Archivos completos
console.log(`✅ Archivos COMPLETOS: ${results.complete.length}\n`);

// Resumen
console.log('='.repeat(70));
console.log('\n📈 RESUMEN\n');

const emptyPercent = ((results.empty.length / results.total) * 100).toFixed(1);
const incompletePercent = ((results.incomplete.length / results.total) * 100).toFixed(1);
const withTodosPercent = ((results.withTodos.length / results.total) * 100).toFixed(1);
const completePercent = ((results.complete.length / results.total) * 100).toFixed(1);

console.log(`   ❌ Vacíos:      ${results.empty.length.toString().padStart(3)} (${emptyPercent}%)`);
console.log(`   ⚠️  Incompletos: ${results.incomplete.length.toString().padStart(3)} (${incompletePercent}%)`);
console.log(`   📝 Con TODOs:   ${results.withTodos.length.toString().padStart(3)} (${withTodosPercent}%)`);
console.log(`   ✅ Completos:   ${results.complete.length.toString().padStart(3)} (${completePercent}%)\n`);

const needsWork = results.empty.length + results.incomplete.length + results.withTodos.length;
const healthScore = ((results.complete.length / results.total) * 100).toFixed(1);

console.log(`📊 Salud general: ${healthScore}% completo`);
console.log(`🔧 Archivos que necesitan trabajo: ${needsWork}\n`);

// Recomendaciones
console.log('='.repeat(70));
console.log('\n💡 RECOMENDACIONES\n');

if (results.empty.length > 0) {
  console.log(`   1️⃣  Completar ${results.empty.length} archivos vacíos (prioridad ALTA)`);
}

if (results.incomplete.length > 10) {
  console.log(`   2️⃣  Expandir ${results.incomplete.length} archivos con contenido mínimo`);
}

if (results.withTodos.length > 20) {
  console.log(`   3️⃣  Resolver ${results.withTodos.length} archivos con TODOs pendientes`);
}

console.log(`   4️⃣  Mantener los ${results.complete.length} archivos completos actualizados\n`);

// Generar reporte JSON
const report = {
  timestamp: new Date().toISOString(),
  summary: {
    total: results.total,
    empty: results.empty.length,
    incomplete: results.incomplete.length,
    withTodos: results.withTodos.length,
    complete: results.complete.length,
    healthScore: parseFloat(healthScore)
  },
  details: results
};

const reportPath = path.join(__dirname, '..', 'docs-content-audit-report.json');
fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
console.log(`📄 Reporte detallado guardado en: docs-content-audit-report.json\n`);

console.log('='.repeat(70));
console.log('\n');

// Exit code según salud
if (healthScore < 70) {
  console.log('⚠️  Salud de documentación por debajo del 70%\n');
  process.exit(1);
} else {
  console.log('✅ Salud de documentación aceptable\n');
  process.exit(0);
}

