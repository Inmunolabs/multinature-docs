#!/usr/bin/env node

/**
 * Script de Barrido de Documentación en Backend
 * 
 * Detecta archivos .md fuera de docs/ y propone su ubicación
 * en la nueva estructura.
 * 
 * Uso:
 *   node scripts/migration/sweep-backend-docs.js
 * 
 * Salidas:
 *   logs/sweep-plan-YYYYMMDD.json
 *   logs/sweep-summary.md
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
  excludeDirs: [
    'node_modules',
    '.git',
    'dist',
    'build',
    'coverage',
    'docs' // Ya procesado
  ]
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
// BÚSQUEDA DE ARCHIVOS
// ============================================================================

function findMarkdownFiles(dir, results = [], relativeTo = null) {
  if (!relativeTo) {
    relativeTo = dir;
  }
  
  const entries = fs.readdirSync(dir);
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry);
    const relativePath = path.relative(relativeTo, fullPath);
    
    // Saltar directorios excluidos
    if (CONFIG.excludeDirs.includes(entry)) {
      continue;
    }
    
    try {
      const stats = fs.statSync(fullPath);
      
      if (stats.isDirectory()) {
        findMarkdownFiles(fullPath, results, relativeTo);
      } else if (entry.endsWith('.md')) {
        results.push({
          path: fullPath,
          relativePath: relativePath.replace(/\\/g, '/'),
          name: entry,
          size: stats.size,
          modified: stats.mtime
        });
      }
    } catch (error) {
      // Ignorar errores de acceso
    }
  }
  
  return results;
}

// ============================================================================
// CLASIFICACIÓN Y PROPUESTA DE DESTINO
// ============================================================================

function proposeDestination(file) {
  const { relativePath, name } = file;
  
  // Reglas de clasificación
  
  // 1. .cursor/ → 05_Privado/.cursor_context/
  if (relativePath.startsWith('.cursor/')) {
    return {
      destino: `docs/05_Privado/.cursor_context/${relativePath.replace('.cursor/', '')}`,
      categoria: 'cursor_context',
      sensibilidad: 'privado',
      razon: 'Metadatos de Cursor - contexto interno'
    };
  }
  
  // 2. logs/ → 05_Privado/Reportes/
  if (relativePath.startsWith('logs/')) {
    // Logs de migración van a Reportes
    if (name.includes('migration') || name.includes('broken-links') || name.includes('fix-links')) {
      return {
        destino: `docs/05_Privado/Reportes/Logs/${name}`,
        categoria: 'logs_migracion',
        sensibilidad: 'privado',
        razon: 'Logs de migración - histórico'
      };
    }
    
    return {
      destino: `docs/05_Privado/Reportes/Logs/${name}`,
      categoria: 'logs_general',
      sensibilidad: 'privado',
      razon: 'Logs del sistema - interno'
    };
  }
  
  // 3. scripts/ (docs de scripts) → 03_Infraestructura/Scripts/
  if (relativePath.startsWith('scripts/') && !relativePath.includes('migration/')) {
    return {
      destino: `docs/03_Infraestructura/Scripts/${name}`,
      categoria: 'scripts_docs',
      sensibilidad: 'publico',
      razon: 'Documentación de scripts de infraestructura'
    };
  }
  
  // 4. scripts/migration/ (ya están bien, solo indexar)
  if (relativePath.startsWith('scripts/migration/')) {
    return {
      destino: 'mantener', // Ya están en su lugar correcto
      categoria: 'scripts_migracion',
      sensibilidad: 'publico',
      razon: 'Scripts de migración - ya en ubicación correcta'
    };
  }
  
  // 5. READMEs en apis/ → 01_Backend/APIs/{api-name}/
  if (relativePath.startsWith('apis/') && name === 'README.md') {
    const apiName = relativePath.split('/')[1];
    return {
      destino: `docs/01_Backend/APIs/${apiName}/CODE_README.md`,
      categoria: 'api_readme',
      sensibilidad: 'publico',
      razon: `README de código de ${apiName}`
    };
  }
  
  // 6. READMEs en layers/ → 01_Backend/Layers/
  if (relativePath.startsWith('layers/') && name === 'README.md') {
    const layerName = relativePath.split('/')[1];
    return {
      destino: `docs/01_Backend/Layers/${layerName}/README.md`,
      categoria: 'layer_readme',
      sensibilidad: 'publico',
      razon: `README de ${layerName}`
    };
  }
  
  // 7. Archivos raíz (README, CHANGELOG, etc.)
  if (!relativePath.includes('/')) {
    if (name === 'README.md') {
      return {
        destino: 'docs/00_Overview/PROJECT_README.md',
        categoria: 'root_readme',
        sensibilidad: 'publico',
        razon: 'README principal del proyecto'
      };
    }
    
    if (name === 'CHANGELOG.md') {
      return {
        destino: 'docs/00_Overview/CHANGELOG.md',
        categoria: 'root_changelog',
        sensibilidad: 'publico',
        razon: 'Changelog del proyecto'
      };
    }
  }
  
  // Default: mantener
  return {
    destino: 'mantener',
    categoria: 'other',
    sensibilidad: 'publico',
    razon: 'No coincide con reglas de migración'
  };
}

// ============================================================================
// GENERACIÓN DE REPORTES
// ============================================================================

function generateSweepSummary(files, proposals) {
  let md = `# Barrido de Documentación en Backend\n\n`;
  md += `**Fecha:** ${new Date().toISOString().split('T')[0]}  \n`;
  md += `**Archivos .md encontrados fuera de docs/:** ${files.length}  \n\n`;
  md += `---\n\n`;
  
  // Agrupar por categoría
  const byCategory = new Map();
  
  for (const proposal of proposals) {
    if (!byCategory.has(proposal.categoria)) {
      byCategory.set(proposal.categoria, []);
    }
    byCategory.get(proposal.categoria).push(proposal);
  }
  
  md += `## Resumen por Categoría\n\n`;
  
  for (const [categoria, items] of byCategory.entries()) {
    md += `### ${categoria.replace(/_/g, ' ').toUpperCase()} (${items.length} archivos)\n\n`;
    
    for (const item of items) {
      md += `**${item.file.name}**\n`;
      md += `- Ubicación actual: \`${item.file.relativePath}\`\n`;
      
      if (item.destino === 'mantener') {
        md += `- Acción: ✓ Mantener en ubicación actual\n`;
      } else {
        md += `- Destino propuesto: \`${item.destino}\`\n`;
        md += `- Sensibilidad: ${item.sensibilidad}\n`;
      }
      
      md += `- Razón: ${item.razon}\n\n`;
    }
  }
  
  // Archivos a mover
  const toMove = proposals.filter(p => p.destino !== 'mantener');
  
  if (toMove.length > 0) {
    md += `---\n\n`;
    md += `## Acciones Propuestas\n\n`;
    md += `Total de archivos a mover: ${toMove.length}\n\n`;
    
    md += `### Por Destino\n\n`;
    
    const byDestino = new Map();
    for (const item of toMove) {
      const destDir = path.dirname(item.destino);
      if (!byDestino.has(destDir)) {
        byDestino.set(destDir, []);
      }
      byDestino.get(destDir).push(item);
    }
    
    for (const [destDir, items] of byDestino.entries()) {
      md += `#### ${destDir}\n\n`;
      md += `${items.length} archivo(s):\n\n`;
      
      for (const item of items) {
        md += `- \`${item.file.relativePath}\` → \`${path.basename(item.destino)}\`\n`;
      }
      
      md += `\n`;
    }
  }
  
  // Instrucciones
  md += `---\n\n`;
  md += `## Instrucciones\n\n`;
  
  if (toMove.length > 0) {
    md += `### Opción 1: Mover manualmente\n\n`;
    md += `Revisa cada archivo y muévelo según el destino propuesto.\n\n`;
    
    md += `### Opción 2: Crear migrations-map adicional\n\n`;
    md += `Agrega estas entradas a \`docs/migrations-map.json\` y re-ejecuta el script de migración.\n\n`;
  } else {
    md += `✅ No hay archivos que mover. Todo está en su lugar correcto.\n\n`;
  }
  
  return md;
}

// ============================================================================
// MAIN
// ============================================================================

function main() {
  console.clear();
  
  log('╔' + '═'.repeat(68) + '╗', 'cyan');
  log('║' + ' '.repeat(15) + 'BARRIDO DE DOCUMENTACIÓN' + ' '.repeat(28) + '║', 'cyan');
  log('╚' + '═'.repeat(68) + '╝\n', 'cyan');
  
  log('🔍 Escaneando backend/ en busca de archivos .md...\n', 'blue');
  
  // Buscar archivos
  const files = findMarkdownFiles(CONFIG.backendPath);
  
  log(`✓ Encontrados ${files.length} archivos .md fuera de docs/\n`, 'green');
  
  if (files.length === 0) {
    log('✅ No hay archivos .md fuera de docs/\n', 'green');
    process.exit(0);
  }
  
  // Proponer destinos
  log('🎯 Generando propuestas de destino...\n', 'blue');
  
  const proposals = files.map(file => ({
    file,
    ...proposeDestination(file)
  }));
  
  // Estadísticas
  const stats = {
    total: files.length,
    toMove: proposals.filter(p => p.destino !== 'mantener').length,
    toKeep: proposals.filter(p => p.destino === 'mantener').length,
    public: proposals.filter(p => p.sensibilidad === 'publico').length,
    private: proposals.filter(p => p.sensibilidad === 'privado').length
  };
  
  log(`📊 Resultados:\n`, 'cyan');
  log(`   Total de archivos: ${stats.total}`, 'blue');
  log(`   A mover: ${stats.toMove}`, 'yellow');
  log(`   Mantener: ${stats.toKeep}`, 'green');
  log(`   Públicos: ${stats.public}`, 'blue');
  log(`   Privados: ${stats.private}\n`, 'red');
  
  // Guardar plan JSON
  const timestamp = getTimestamp();
  const planPath = path.join(CONFIG.logsPath, `sweep-plan-${timestamp}.json`);
  
  fs.writeFileSync(planPath, JSON.stringify({
    timestamp: new Date().toISOString(),
    stats,
    proposals
  }, null, 2), 'utf8');
  
  log(`📄 Plan guardado: ${planPath}\n`, 'cyan');
  
  // Generar resumen Markdown
  const summaryMd = generateSweepSummary(files, proposals);
  const summaryPath = path.join(CONFIG.logsPath, `sweep-summary.md`);
  fs.writeFileSync(summaryPath, summaryMd, 'utf8');
  
  log(`📄 Resumen guardado: ${summaryPath}\n`, 'cyan');
  
  // Mostrar categorías encontradas
  log('📁 Archivos por categoría:\n', 'blue');
  
  const byCategory = new Map();
  for (const proposal of proposals) {
    if (!byCategory.has(proposal.categoria)) {
      byCategory.set(proposal.categoria, 0);
    }
    byCategory.set(proposal.categoria, byCategory.get(proposal.categoria) + 1);
  }
  
  for (const [categoria, count] of byCategory.entries()) {
    log(`   ${categoria}: ${count}`, 'cyan');
  }
  
  log('\n' + '='.repeat(70), 'cyan');
  log('📋 PRÓXIMOS PASOS', 'cyan');
  log('='.repeat(70) + '\n', 'cyan');
  
  log('1. Revisar: ' + summaryPath, 'white');
  log('2. Decidir qué archivos mover', 'white');
  log('3. Actualizar migrations-map.json si es necesario', 'white');
  log('4. Ejecutar migración con nuevos archivos\n', 'white');
  
  process.exit(0);
}

// Ejecutar
if (require.main === module) {
  main();
}

module.exports = { findMarkdownFiles, proposeDestination };
