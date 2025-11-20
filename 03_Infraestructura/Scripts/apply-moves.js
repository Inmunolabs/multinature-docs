#!/usr/bin/env node

/**
 * Script de Aplicación de Movimientos Adicionales
 * 
 * Mueve archivos .md adicionales detectados fuera de docs/
 * a su ubicación correcta en la nueva estructura.
 * 
 * Uso:
 *   node scripts/migration/apply-moves.js [--dry-run] [--confirm]
 * 
 * Opciones:
 *   --dry-run   Modo simulación (default)
 *   --confirm   Ejecutar movimientos reales
 * 
 * Salidas:
 *   logs/moves-plan-YYYYMMDD.json
 *   logs/moves-summary.md
 */

const fs = require('fs');
const path = require('path');

// ============================================================================
// CONFIGURACIÓN
// ============================================================================

const CONFIG = {
  backendPath: path.join(__dirname, '..', '..'),
  docsPath: path.join(__dirname, '..', '..', 'docs'),
  logsPath: path.join(__dirname, '..', '..', 'logs'),
  dryRun: true
};

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

function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

// ============================================================================
// MOVIMIENTOS PROPUESTOS
// ============================================================================

const PROPOSED_MOVES = [
  // .cursor/ → docs/05_Privado/.cursor_context/
  {
    pattern: /^\.cursor\//,
    destination: (relativePath) => `docs/05_Privado/.cursor_context/${relativePath.replace('.cursor/', '')}`,
    reason: 'Contexto de Cursor - privado',
    risk: 'bajo'
  },
  
  // apis/*/README.md → docs/01_Backend/APIs/*/CODE_README.md
  {
    pattern: /^apis\/([^/]+)\/README\.md$/,
    destination: (relativePath, match) => `docs/01_Backend/APIs/${match[1]}/CODE_README.md`,
    reason: 'README de código de API',
    risk: 'bajo'
  },
  
  // layers/*/README.md → docs/01_Backend/Layers/*/README.md
  {
    pattern: /^layers\/([^/]+)\/README\.md$/,
    destination: (relativePath, match) => `docs/01_Backend/Layers/${match[1]}/README.md`,
    reason: 'Documentación de layer',
    risk: 'bajo'
  }
];

// ============================================================================
// PROCESAMIENTO
// ============================================================================

function applyMove(file, destination, reason) {
  const srcPath = path.join(CONFIG.backendPath, file);
  const destPath = path.join(CONFIG.backendPath, destination);
  
  if (!fs.existsSync(srcPath)) {
    return { success: false, error: 'Origen no existe' };
  }
  
  if (fs.existsSync(destPath)) {
    return { success: false, error: 'Destino ya existe' };
  }
  
  if (!CONFIG.dryRun) {
    try {
      ensureDir(path.dirname(destPath));
      fs.renameSync(srcPath, destPath);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
  
  return { success: true, dryRun: true };
}

function processFiles() {
  const sweepPlanFiles = fs.readdirSync(CONFIG.logsPath)
    .filter(f => f.startsWith('sweep-plan-') && f.endsWith('.json'))
    .sort()
    .reverse();
  
  if (sweepPlanFiles.length === 0) {
    log('\n✗ No se encontró sweep-plan. Ejecuta primero:', 'red');
    log('  node scripts/migration/sweep-backend-docs.js\n', 'yellow');
    process.exit(1);
  }
  
  const sweepPlan = JSON.parse(
    fs.readFileSync(path.join(CONFIG.logsPath, sweepPlanFiles[0]), 'utf8')
  );
  
  const moves = [];
  
  for (const proposal of sweepPlan.proposals) {
    if (proposal.destino !== 'mantener') {
      moves.push({
        origen: proposal.file.relativePath,
        destino: proposal.destino,
        razon: proposal.razon,
        categoria: proposal.categoria,
        sensibilidad: proposal.sensibilidad
      });
    }
  }
  
  return moves;
}

function executeMoves(moves) {
  const stats = { success: 0, errors: 0, skipped: 0 };
  
  log('\n🔄 Procesando movimientos...\n', 'blue');
  
  for (let i = 0; i < moves.length; i++) {
    const move = moves[i];
    const progress = `[${i + 1}/${moves.length}]`;
    
    if (CONFIG.dryRun) {
      log(`${progress} ${move.origen}`, 'cyan');
      log(`  → ${move.destino}`, 'cyan');
      stats.skipped++;
    } else {
      const result = applyMove(move.origen, move.destino, move.razon);
      
      if (result.success) {
        log(`${progress} ✓ ${move.origen}`, 'green');
        log(`  → ${move.destino}`, 'green');
        stats.success++;
      } else {
        log(`${progress} ✗ ${move.origen} - ${result.error}`, 'red');
        stats.errors++;
      }
    }
  }
  
  return stats;
}

function generateSummary(moves) {
  let md = `# Plan de Reubicación de Archivos\n\n`;
  md += `**Fecha:** ${getTimestamp()}  \n`;
  md += `**Total de movimientos:** ${moves.length}  \n\n`;
  md += `---\n\n`;
  
  // Agrupar por categoría
  const byCategory = new Map();
  for (const move of moves) {
    if (!byCategory.has(move.categoria)) {
      byCategory.set(move.categoria, []);
    }
    byCategory.get(move.categoria).push(move);
  }
  
  md += `## Movimientos por Categoría\n\n`;
  
  for (const [categoria, items] of byCategory.entries()) {
    md += `### ${categoria.replace(/_/g, ' ').toUpperCase()} (${items.length} archivos)\n\n`;
    md += `| Origen | Destino | Razón |\n`;
    md += `|--------|---------|-------|\n`;
    
    for (const item of items) {
      md += `| \`${item.origen}\` | \`${item.destino}\` | ${item.razon} |\n`;
    }
    
    md += `\n`;
  }
  
  md += `---\n\n`;
  md += `## Instrucciones\n\n`;
  md += `### Aplicar movimientos:\n\n`;
  md += `\`\`\`bash\n`;
  md += `node scripts/migration/apply-moves.js --confirm\n`;
  md += `\`\`\`\n\n`;
  
  return md;
}

// ============================================================================
// MAIN
// ============================================================================

function main() {
  console.clear();
  
  log('╔' + '═'.repeat(68) + '╗', 'cyan');
  log('║' + ' '.repeat(15) + 'APLICACIÓN DE MOVIMIENTOS' + ' '.repeat(27) + '║', 'cyan');
  log('╚' + '═'.repeat(68) + '╝\n', 'cyan');
  
  // Parsear argumentos
  const args = process.argv.slice(2);
  CONFIG.dryRun = !args.includes('--confirm');
  
  if (CONFIG.dryRun) {
    log('⚠️  MODO DRY RUN - No se harán cambios reales\n', 'yellow');
  }
  
  // Procesar archivos
  log('📂 Cargando plan de movimientos...\n', 'blue');
  const moves = processFiles();
  
  log(`✓ ${moves.length} movimientos propuestos\n`, 'green');
  
  // Ejecutar
  const stats = executeMoves(moves);
  
  // Generar reportes
  const timestamp = getTimestamp();
  const planPath = path.join(CONFIG.logsPath, `moves-plan-${timestamp}.json`);
  const summaryPath = path.join(CONFIG.logsPath, `moves-summary.md`);
  
  fs.writeFileSync(planPath, JSON.stringify({ timestamp: new Date().toISOString(), moves }, null, 2));
  fs.writeFileSync(summaryPath, generateSummary(moves));
  
  log('\n' + '='.repeat(70), 'cyan');
  log('📊 RESUMEN', 'cyan');
  log('='.repeat(70) + '\n', 'cyan');
  
  if (CONFIG.dryRun) {
    log(`   Movimientos planeados: ${stats.skipped}`, 'yellow');
  } else {
    log(`   Exitosos: ${stats.success}`, 'green');
    log(`   Errores: ${stats.errors}`, stats.errors > 0 ? 'red' : 'green');
  }
  
  log(`\n📄 Plan: ${planPath}`, 'cyan');
  log(`📄 Resumen: ${summaryPath}\n`, 'cyan');
  
  if (!CONFIG.dryRun && stats.success > 0) {
    log('📋 Próximos pasos:', 'blue');
    log('  1. node scripts/migration/generate-indexes.js --overwrite', 'white');
    log('  2. node scripts/migration/validate-docs-links.js\n', 'white');
  }
  
  process.exit(stats.errors > 0 ? 1 : 0);
}

if (require.main === module) {
  main();
}

module.exports = { applyMove, processFiles };

