#!/usr/bin/env node

/**
 * Script de Reparación de Enlaces Rotos
 * 
 * Analiza el reporte de enlaces rotos y genera un plan de reparación
 * basado en el migrations-map.json.
 * 
 * Uso:
 *   node scripts/migration/fix-broken-links.js [--apply]
 * 
 * Opciones:
 *   --apply   Aplicar correcciones (por defecto solo genera plan)
 * 
 * Salidas:
 *   logs/fix-links-plan-YYYYMMDD.json
 *   logs/fix-links-summary.md
 */

const fs = require('fs');
const path = require('path');

// ============================================================================
// CONFIGURACIÓN
// ============================================================================

const CONFIG = {
  docsPath: path.join(__dirname, '..', '..', 'docs'),
  logsPath: path.join(__dirname, '..', '..', 'logs'),
  brokenLinksPattern: 'broken-links-*.json',
  migrationsMapPath: path.join(__dirname, '..', '..', 'docs', 'migrations-map.json'),
  apply: false
};

// ============================================================================
// UTILIDADES
// ============================================================================

const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function getTimestamp() {
  return new Date().toISOString().split('T')[0];
}

// ============================================================================
// CARGA DE DATOS
// ============================================================================

function findLatestBrokenLinksReport() {
  const files = fs.readdirSync(CONFIG.logsPath)
    .filter(f => f.startsWith('broken-links-') && f.endsWith('.json'))
    .sort()
    .reverse();
  
  if (files.length === 0) {
    return null;
  }
  
  return path.join(CONFIG.logsPath, files[0]);
}

function loadMigrationsMap() {
  const content = fs.readFileSync(CONFIG.migrationsMapPath, 'utf8');
  const migrations = JSON.parse(content);
  
  // Crear índice de origen → destino
  const map = new Map();
  for (const migration of migrations) {
    map.set(migration.origen, migration.destino);
  }
  
  return map;
}

// ============================================================================
// ANÁLISIS DE ENLACES
// ============================================================================

function analyzeEnlaceRoto(brokenLink, sourceFile, migrationsMap) {
  const { link, targetPath } = brokenLink;
  
  // El enlace original apuntaba a una ruta que cambió
  // Necesitamos encontrar la nueva ubicación
  
  const suggestions = [];
  
  // Estrategia 1: Buscar en migrations-map por nombre de archivo
  const fileName = path.basename(link);
  
  for (const [origen, destino] of migrationsMap.entries()) {
    if (origen.endsWith(fileName) || destino.endsWith(fileName)) {
      // Calcular ruta relativa desde sourceFile a destino
      const sourceDir = path.dirname(path.join(CONFIG.docsPath, sourceFile));
      const targetFullPath = path.join(CONFIG.docsPath, destino);
      const relativePath = path.relative(sourceDir, targetFullPath).replace(/\\/g, '/');
      
      suggestions.push({
        type: 'migration_map',
        newLink: relativePath,
        confidence: 'high',
        reason: `Archivo migrado: ${origen} → ${destino}`
      });
    }
  }
  
  // Estrategia 2: Patrones comunes de migración
  const patterns = [
    {
      from: /\.\.\/\.\.\/db\//,
      to: '../Database/Tables/',
      reason: 'Tablas de BD movidas a Database/Tables/'
    },
    {
      from: /\.\.\/db\//,
      to: './Database/Tables/',
      reason: 'Tablas de BD movidas a Database/Tables/'
    },
    {
      from: /\.\.\/refactors\//,
      to: '../05_Privado/Refactors/',
      reason: 'Refactors movidos a carpeta privada'
    },
    {
      from: /\.\.\/reports\//,
      to: '../05_Privado/Reportes/',
      reason: 'Reportes movidos a carpeta privada'
    },
    {
      from: /\.\.\/scripts\//,
      to: '../03_Infraestructura/Scripts/',
      reason: 'Scripts movidos a Infraestructura'
    }
  ];
  
  for (const pattern of patterns) {
    if (pattern.from.test(link)) {
      const newLink = link.replace(pattern.from, pattern.to);
      suggestions.push({
        type: 'pattern',
        newLink,
        confidence: 'medium',
        reason: pattern.reason
      });
    }
  }
  
  // Estrategia 3: DB_MODELS.md → 01_Backend/Database/00_INDEX.md
  if (link.includes('DB_MODELS.md')) {
    const sourceDir = path.dirname(path.join(CONFIG.docsPath, sourceFile));
    const targetFullPath = path.join(CONFIG.docsPath, '01_Backend/Database/00_INDEX.md');
    const relativePath = path.relative(sourceDir, targetFullPath).replace(/\\/g, '/');
    
    suggestions.push({
      type: 'special_case',
      newLink: relativePath,
      confidence: 'high',
      reason: 'DB_MODELS.md fue renombrado a 00_INDEX.md'
    });
  }
  
  return {
    originalLink: link,
    targetPath,
    suggestions: suggestions.slice(0, 3), // Top 3 sugerencias
    autoFix: suggestions.length > 0 && suggestions[0].confidence === 'high'
  };
}

function generateFixPlan(brokenLinksReport, migrationsMap) {
  const fixes = [];
  
  for (const fileReport of brokenLinksReport.brokenLinks) {
    for (const brokenLink of fileReport.brokenLinks) {
      const analysis = analyzeEnlaceRoto(brokenLink, fileReport.file, migrationsMap);
      
      fixes.push({
        file: fileReport.file,
        line: brokenLink.line,
        text: brokenLink.text,
        ...analysis
      });
    }
  }
  
  return fixes;
}

// ============================================================================
// GENERACIÓN DE REPORTES
// ============================================================================

function generateSummaryMarkdown(fixes, stats) {
  let md = `# Plan de Reparación de Enlaces Rotos\n\n`;
  md += `**Fecha:** ${new Date().toISOString().split('T')[0]}  \n`;
  md += `**Enlaces rotos:** ${stats.total}  \n`;
  md += `**Auto-reparables:** ${stats.autoFix}  \n`;
  md += `**Requieren revisión:** ${stats.manual}  \n\n`;
  md += `---\n\n`;
  
  // Agrupar por archivo
  const byFile = new Map();
  for (const fix of fixes) {
    if (!byFile.has(fix.file)) {
      byFile.set(fix.file, []);
    }
    byFile.get(fix.file).push(fix);
  }
  
  md += `## Resumen por Archivo\n\n`;
  md += `Total de archivos afectados: ${byFile.size}\n\n`;
  
  // Archivos con auto-fix
  md += `### Auto-reparables (Alta Confianza)\n\n`;
  let autoFixCount = 0;
  
  for (const [file, fileFixes] of byFile.entries()) {
    const autoFixable = fileFixes.filter(f => f.autoFix);
    if (autoFixable.length > 0) {
      autoFixCount++;
      md += `#### ${file}\n\n`;
      md += `Enlaces a corregir: ${autoFixable.length}\n\n`;
      
      for (const fix of autoFixable) {
        md += `**Línea ${fix.line}:** \`[${fix.text}](${fix.originalLink})\`\n`;
        md += `- ✅ Sugerencia: \`${fix.suggestions[0].newLink}\`\n`;
        md += `- Razón: ${fix.suggestions[0].reason}\n\n`;
      }
    }
  }
  
  if (autoFixCount === 0) {
    md += `No hay enlaces auto-reparables.\n\n`;
  }
  
  // Archivos que requieren revisión manual
  md += `### Requieren Revisión Manual\n\n`;
  let manualCount = 0;
  
  for (const [file, fileFixes] of byFile.entries()) {
    const manual = fileFixes.filter(f => !f.autoFix);
    if (manual.length > 0) {
      manualCount++;
      md += `#### ${file}\n\n`;
      md += `Enlaces a revisar: ${manual.length}\n\n`;
      
      for (const fix of manual.slice(0, 5)) { // Primeros 5
        md += `**Línea ${fix.line}:** \`[${fix.text}](${fix.originalLink})\`\n`;
        
        if (fix.suggestions.length > 0) {
          md += `- Sugerencias:\n`;
          for (const sug of fix.suggestions) {
            md += `  - \`${sug.newLink}\` (${sug.confidence}) - ${sug.reason}\n`;
          }
        } else {
          md += `- ⚠️ Sin sugerencias automáticas\n`;
        }
        md += `\n`;
      }
      
      if (manual.length > 5) {
        md += `... y ${manual.length - 5} enlaces más\n\n`;
      }
    }
  }
  
  // Instrucciones
  md += `---\n\n`;
  md += `## Instrucciones\n\n`;
  md += `### Para aplicar correcciones automáticas:\n\n`;
  md += `\`\`\`bash\n`;
  md += `node scripts/migration/fix-broken-links.js --apply\n`;
  md += `\`\`\`\n\n`;
  md += `### Para correcciones manuales:\n\n`;
  md += `1. Revisar este documento\n`;
  md += `2. Editar archivos uno por uno\n`;
  md += `3. Re-validar: \`node scripts/migration/validate-docs-links.js\`\n\n`;
  
  return md;
}

// ============================================================================
// APLICACIÓN DE CORRECCIONES
// ============================================================================

function applyFix(fix) {
  const filePath = path.join(CONFIG.docsPath, fix.file);
  
  if (!fs.existsSync(filePath)) {
    return { success: false, error: 'Archivo no existe' };
  }
  
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split('\n');
    
    // Buscar y reemplazar en la línea específica
    if (fix.line <= lines.length) {
      const oldLine = lines[fix.line - 1];
      const newLine = oldLine.replace(
        `](${fix.originalLink})`,
        `](${fix.suggestions[0].newLink})`
      );
      
      if (oldLine !== newLine) {
        lines[fix.line - 1] = newLine;
        content = lines.join('\n');
        fs.writeFileSync(filePath, content, 'utf8');
        
        return { 
          success: true, 
          oldLine, 
          newLine 
        };
      }
    }
    
    return { success: false, error: 'No se encontró el enlace en la línea' };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// ============================================================================
// MAIN
// ============================================================================

function main() {
  console.clear();
  
  log('╔' + '═'.repeat(68) + '╗', 'cyan');
  log('║' + ' '.repeat(15) + 'REPARACIÓN DE ENLACES ROTOS' + ' '.repeat(25) + '║', 'cyan');
  log('╚' + '═'.repeat(68) + '╝\n', 'cyan');
  
  // Parsear argumentos
  const args = process.argv.slice(2);
  CONFIG.apply = args.includes('--apply');
  
  if (!CONFIG.apply) {
    log('⚠️  MODO ANÁLISIS - Solo generará plan de reparación\n', 'yellow');
    log('   Para aplicar: node scripts/migration/fix-broken-links.js --apply\n', 'yellow');
  }
  
  // Buscar reporte de enlaces rotos
  log('🔍 Buscando reporte de enlaces rotos...\n', 'blue');
  
  const reportPath = findLatestBrokenLinksReport();
  if (!reportPath) {
    log('✗ No se encontró reporte de enlaces rotos\n', 'red');
    log('  Ejecuta primero: node scripts/migration/validate-docs-links.js\n', 'yellow');
    process.exit(1);
  }
  
  log(`✓ Encontrado: ${path.basename(reportPath)}\n`, 'green');
  
  // Cargar datos
  const brokenLinksReport = JSON.parse(fs.readFileSync(reportPath, 'utf8'));
  const migrationsMap = loadMigrationsMap();
  
  log(`📊 Estadísticas del reporte:\n`, 'cyan');
  log(`   Total de enlaces rotos: ${brokenLinksReport.summary.totalBroken}`, 'yellow');
  log(`   Archivos afectados: ${brokenLinksReport.brokenLinks.length}`, 'yellow');
  log(`   Tasa de éxito actual: ${brokenLinksReport.summary.successRate}%\n`, 'yellow');
  
  // Generar plan de corrección
  log('🔧 Generando plan de reparación...\n', 'blue');
  
  const fixes = generateFixPlan(brokenLinksReport, migrationsMap);
  
  // Estadísticas del plan
  const stats = {
    total: fixes.length,
    autoFix: fixes.filter(f => f.autoFix).length,
    manual: fixes.filter(f => !f.autoFix).length,
    withSuggestions: fixes.filter(f => f.suggestions.length > 0).length,
    noSuggestions: fixes.filter(f => f.suggestions.length === 0).length
  };
  
  log(`✓ Plan generado:\n`, 'green');
  log(`   Total de enlaces: ${stats.total}`, 'cyan');
  log(`   Auto-reparables: ${stats.autoFix} (${((stats.autoFix/stats.total)*100).toFixed(1)}%)`, 'green');
  log(`   Requieren revisión: ${stats.manual}`, 'yellow');
  log(`   Sin sugerencias: ${stats.noSuggestions}`, 'red');
  log('');
  
  // Guardar plan JSON
  const timestamp = getTimestamp();
  const planPath = path.join(CONFIG.logsPath, `fix-links-plan-${timestamp}.json`);
  
  fs.writeFileSync(planPath, JSON.stringify({
    timestamp: new Date().toISOString(),
    stats,
    fixes
  }, null, 2), 'utf8');
  
  log(`📄 Plan guardado: ${planPath}\n`, 'cyan');
  
  // Generar resumen Markdown
  const summaryMd = generateSummaryMarkdown(fixes, stats);
  const summaryPath = path.join(CONFIG.logsPath, `fix-links-summary.md`);
  fs.writeFileSync(summaryPath, summaryMd, 'utf8');
  
  log(`📄 Resumen guardado: ${summaryPath}\n`, 'cyan');
  
  // Aplicar correcciones si --apply
  if (CONFIG.apply) {
    log('\n🔧 Aplicando correcciones automáticas...\n', 'blue');
    
    const autoFixable = fixes.filter(f => f.autoFix);
    let applied = 0;
    let failed = 0;
    
    for (const fix of autoFixable) {
      const result = applyFix(fix);
      
      if (result.success) {
        log(`  ✓ ${fix.file}:${fix.line}`, 'green');
        applied++;
      } else {
        log(`  ✗ ${fix.file}:${fix.line} - ${result.error}`, 'red');
        failed++;
      }
    }
    
    log(`\n📊 Correcciones aplicadas: ${applied}`, 'green');
    log(`   Fallidas: ${failed}\n`, failed > 0 ? 'red' : 'green');
    
    if (applied > 0) {
      log('💡 Re-valida con: node scripts/migration/validate-docs-links.js\n', 'blue');
    }
  }
  
  // Resumen final
  log('='.repeat(70), 'cyan');
  log('📋 PRÓXIMOS PASOS', 'cyan');
  log('='.repeat(70) + '\n', 'cyan');
  
  if (!CONFIG.apply) {
    log('1. Revisar: ' + summaryPath, 'white');
    log('2. Aplicar auto-fix: node scripts/migration/fix-broken-links.js --apply', 'white');
    log('3. Corregir manualmente los restantes', 'white');
    log('4. Re-validar: node scripts/migration/validate-docs-links.js\n', 'white');
  } else {
    log('1. Re-validar: node scripts/migration/validate-docs-links.js', 'white');
    log('2. Revisar enlaces que aún están rotos', 'white');
    log('3. Corregir manualmente si es necesario\n', 'white');
  }
  
  process.exit(0);
}

// Ejecutar
if (require.main === module) {
  main();
}

module.exports = { analyzeEnlaceRoto, generateFixPlan };
