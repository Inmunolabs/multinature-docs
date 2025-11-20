#!/usr/bin/env node

/**
 * Script de Limpieza de Archivos
 * 
 * Identifica archivos temporales, duplicados y obsoletos para limpieza segura.
 * NO borra definitivamente - mueve a .trash_FECHA/
 * 
 * Uso:
 *   node scripts/migration/cleanup-plan.js [--dry-run] [--confirm]
 * 
 * Opciones:
 *   --dry-run   Modo simulación (default)
 *   --confirm   Mover archivos a .trash_FECHA/
 * 
 * Salidas:
 *   logs/cleanup-plan-YYYYMMDD.json
 *   logs/cleanup-summary.md
 *   .trash_YYYYMMDD/ (si --confirm)
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// ============================================================================
// CONFIGURACIÓN
// ============================================================================

const CONFIG = {
  backendPath: path.join(__dirname, '..', '..'),
  docsPath: path.join(__dirname, '..', '..', 'docs'),
  logsPath: path.join(__dirname, '..', '..', 'logs'),
  trashPath: null, // Se genera dinámicamente
  dryRun: true,
  excludeDirs: ['node_modules', '.git', 'dist', 'build', 'coverage']
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

function getFileHash(filePath) {
  try {
    const content = fs.readFileSync(filePath);
    return crypto.createHash('md5').update(content).digest('hex');
  } catch (error) {
    return null;
  }
}

// ============================================================================
// DETECCIÓN DE CANDIDATOS
// ============================================================================

function findFiles(dir, results = [], relativeTo = null) {
  if (!relativeTo) relativeTo = dir;
  
  const entries = fs.readdirSync(dir);
  
  for (const entry of entries) {
    if (CONFIG.excludeDirs.includes(entry)) continue;
    
    const fullPath = path.join(dir, entry);
    const relativePath = path.relative(relativeTo, fullPath);
    
    try {
      const stats = fs.statSync(fullPath);
      
      if (stats.isDirectory()) {
        if (!entry.startsWith('.') && entry !== 'docs') {
          findFiles(fullPath, results, relativeTo);
        }
      } else {
        results.push({
          path: fullPath,
          relativePath: relativePath.replace(/\\/g, '/'),
          name: entry,
          size: stats.size,
          modified: stats.mtime,
          hash: null // Se calcula bajo demanda
        });
      }
    } catch (error) {
      // Ignorar
    }
  }
  
  return results;
}

function identifyCleanupCandidates() {
  log('🔍 Escaneando archivos...\n', 'blue');
  
  const allFiles = findFiles(CONFIG.backendPath);
  const candidates = [];
  
  // Regla 1: Archivos temporales
  const tempPatterns = [/\.tmp$/, /\.bak$/, /\.backup$/, /^~\$/, /\.DS_Store$/, /Thumbs\.db$/];
  
  for (const file of allFiles) {
    for (const pattern of tempPatterns) {
      if (pattern.test(file.name)) {
        candidates.push({
          ...file,
          motivo: 'Archivo temporal',
          accion: 'mover a trash',
          categoria: 'temporal'
        });
        break;
      }
    }
  }
  
  // Regla 2: Logs antiguos (>60 días)
  const sixtyDaysAgo = new Date();
  sixtyDaysAgo.setDate(sixtyDaysAgo.getDate() - 60);
  
  const logFiles = allFiles.filter(f => 
    f.relativePath.startsWith('logs/') && 
    f.name.endsWith('.log') &&
    f.modified < sixtyDaysAgo
  );
  
  for (const file of logFiles) {
    candidates.push({
      ...file,
      motivo: `Log antiguo (>${((Date.now() - file.modified) / (1000*60*60*24)).toFixed(0)} días)`,
      accion: 'mover a trash',
      categoria: 'log_antiguo'
    });
  }
  
  // Regla 3: Duplicados por hash (solo archivos .md)
  const mdFiles = allFiles.filter(f => f.name.endsWith('.md'));
  const byHash = new Map();
  
  log('🔍 Calculando hashes para detectar duplicados...\n', 'blue');
  
  for (const file of mdFiles) {
    const hash = getFileHash(file.path);
    if (hash) {
      if (!byHash.has(hash)) {
        byHash.set(hash, []);
      }
      byHash.get(hash).push({ ...file, hash });
    }
  }
  
  // Identificar duplicados
  for (const [hash, files] of byHash.entries()) {
    if (files.length > 1) {
      // Ordenar por: docs/ primero, luego por fecha más reciente
      files.sort((a, b) => {
        const aInDocs = a.relativePath.startsWith('docs/') ? 0 : 1;
        const bInDocs = b.relativePath.startsWith('docs/') ? 0 : 1;
        
        if (aInDocs !== bInDocs) return aInDocs - bInDocs;
        return b.modified - a.modified;
      });
      
      // Conservar el primero, marcar resto como duplicados
      for (let i = 1; i < files.length; i++) {
        candidates.push({
          ...files[i],
          motivo: `Duplicado exacto de ${files[0].relativePath}`,
          accion: 'mover a trash',
          categoria: 'duplicado',
          duplicadoDe: files[0].relativePath
        });
      }
    }
  }
  
  return candidates;
}

// ============================================================================
// GENERACIÓN DE REPORTES
// ============================================================================

function generateSummary(candidates) {
  let md = `# Plan de Limpieza de Archivos\n\n`;
  md += `**Fecha:** ${getTimestamp()}  \n`;
  md += `**Candidatos para limpieza:** ${candidates.length}  \n\n`;
  md += `---\n\n`;
  
  // Agrupar por categoría
  const byCategory = new Map();
  for (const candidate of candidates) {
    if (!byCategory.has(candidate.categoria)) {
      byCategory.set(candidate.categoria, []);
    }
    byCategory.get(candidate.categoria).push(candidate);
  }
  
  md += `## Resumen por Categoría\n\n`;
  
  for (const [categoria, items] of byCategory.entries()) {
    md += `### ${categoria.toUpperCase()} (${items.length} archivos)\n\n`;
    md += `| Archivo | Motivo | Tamaño | Última Modificación |\n`;
    md += `|---------|--------|--------|---------------------|\n`;
    
    for (const item of items) {
      const sizeKB = (item.size / 1024).toFixed(2);
      const date = item.modified.toISOString().split('T')[0];
      md += `| \`${item.relativePath}\` | ${item.motivo} | ${sizeKB} KB | ${date} |\n`;
    }
    
    md += `\n`;
  }
  
  md += `---\n\n`;
  md += `## Instrucciones\n\n`;
  md += `### Mover a trash (NO borrado definitivo):\n\n`;
  md += `\`\`\`bash\n`;
  md += `node scripts/migration/cleanup-plan.js --confirm\n`;
  md += `\`\`\`\n\n`;
  md += `Esto creará \`.trash_${getTimestamp()}/\` con todos los archivos.\n\n`;
  md += `### Borrado definitivo (después de revisar):\n\n`;
  md += `Revisa el contenido de \`.trash_FECHA/\` y si estás seguro:\n\n`;
  md += `\`\`\`bash\n`;
  md += `# Windows\n`;
  md += `rmdir /s /q .trash_${getTimestamp()}\n\n`;
  md += `# Bash\n`;
  md += `rm -rf .trash_${getTimestamp()}\n`;
  md += `\`\`\`\n\n`;
  
  return md;
}

// ============================================================================
// MAIN
// ============================================================================

function main() {
  console.clear();
  
  log('╔' + '═'.repeat(68) + '╗', 'cyan');
  log('║' + ' '.repeat(15) + 'PLAN DE LIMPIEZA DE ARCHIVOS' + ' '.repeat(24) + '║', 'cyan');
  log('╚' + '═'.repeat(68) + '╝\n', 'cyan');
  
  // Parsear argumentos
  const args = process.argv.slice(2);
  CONFIG.dryRun = !args.includes('--confirm');
  
  if (CONFIG.dryRun) {
    log('⚠️  MODO DRY RUN - Solo análisis\n', 'yellow');
  }
  
  // Generar trash path
  CONFIG.trashPath = path.join(CONFIG.backendPath, `.trash_${getTimestamp()}`);
  
  // Identificar candidatos
  const candidates = identifyCleanupCandidates();
  
  log(`✓ ${candidates.length} archivos identificados para limpieza\n`, 'green');
  
  // Agrupar por categoría
  const byCategory = new Map();
  for (const candidate of candidates) {
    if (!byCategory.has(candidate.categoria)) {
      byCategory.set(candidate.categoria, 0);
    }
    byCategory.set(candidate.categoria, byCategory.get(candidate.categoria) + 1);
  }
  
  log('📊 Por categoría:\n', 'cyan');
  for (const [categoria, count] of byCategory.entries()) {
    log(`   ${categoria}: ${count}`, 'yellow');
  }
  log('');
  
  // Mover a trash si --confirm
  if (!CONFIG.dryRun && candidates.length > 0) {
    log('🗑️  Moviendo archivos a trash...\n', 'yellow');
    ensureDir(CONFIG.trashPath);
    
    let moved = 0;
    for (const candidate of candidates) {
      const srcPath = path.join(CONFIG.backendPath, candidate.relativePath);
      const destPath = path.join(CONFIG.trashPath, candidate.relativePath);
      
      try {
        ensureDir(path.dirname(destPath));
        fs.renameSync(srcPath, destPath);
        log(`  ✓ ${candidate.relativePath}`, 'green');
        moved++;
      } catch (error) {
        log(`  ✗ ${candidate.relativePath} - ${error.message}`, 'red');
      }
    }
    
    log(`\n✓ ${moved} archivos movidos a ${CONFIG.trashPath}\n`, 'green');
  }
  
  // Guardar reportes
  const timestamp = getTimestamp();
  const planPath = path.join(CONFIG.logsPath, `cleanup-plan-${timestamp}.json`);
  const summaryPath = path.join(CONFIG.logsPath, `cleanup-summary.md`);
  
  fs.writeFileSync(planPath, JSON.stringify({
    timestamp: new Date().toISOString(),
    trashPath: CONFIG.trashPath,
    candidates
  }, null, 2));
  
  fs.writeFileSync(summaryPath, generateSummary(candidates));
  
  log(`📄 Plan: ${planPath}`, 'cyan');
  log(`📄 Resumen: ${summaryPath}\n`, 'cyan');
  
  if (CONFIG.dryRun) {
    log('💡 Para aplicar: node scripts/migration/cleanup-plan.js --confirm\n', 'blue');
  }
  
  process.exit(0);
}

if (require.main === module) {
  main();
}

module.exports = { identifyCleanupCandidates };

