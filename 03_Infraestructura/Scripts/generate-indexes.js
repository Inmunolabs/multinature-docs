#!/usr/bin/env node

/**
 * Script de Generación de Índices Locales
 * 
 * Genera/actualiza archivos 00_README.md o 00_INDEX.md en cada carpeta
 * con una lista ordenada de los archivos .md que contiene.
 * 
 * Uso:
 *   node scripts/migration/generate-indexes.js [--dry-run] [--overwrite]
 * 
 * Opciones:
 *   --dry-run     Modo simulación, no escribe archivos
 *   --overwrite   Sobrescribir índices existentes completamente
 *   --frontmatter Añadir frontmatter YAML
 */

const fs = require('fs');
const path = require('path');

// ============================================================================
// CONFIGURACIÓN
// ============================================================================

const CONFIG = {
  docsPath: path.join(__dirname, '..', '..', 'docs'),
  dryRun: false,
  overwrite: false,
  addFrontmatter: false,
  indexNames: ['00_README.md', '00_INDEX.md']
};

// ============================================================================
// UTILIDADES
// ============================================================================

const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function isIndexFile(fileName) {
  return CONFIG.indexNames.includes(fileName);
}

function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

// ============================================================================
// ANÁLISIS DE DIRECTORIO
// ============================================================================

function analyzeDirectory(dirPath) {
  const items = fs.readdirSync(dirPath);
  const relativePath = path.relative(CONFIG.docsPath, dirPath);
  
  const markdownFiles = [];
  const subdirectories = [];
  let existingIndex = null;
  
  for (const item of items) {
    const fullPath = path.join(dirPath, item);
    const stats = fs.statSync(fullPath);
    
    if (stats.isDirectory()) {
      // Ignorar carpetas que empiecen con . o _
      if (!item.startsWith('.') && !item.startsWith('_')) {
        subdirectories.push({
          name: item,
          path: fullPath
        });
      }
    } else if (item.endsWith('.md')) {
      if (isIndexFile(item)) {
        existingIndex = {
          name: item,
          path: fullPath
        };
      } else {
        markdownFiles.push({
          name: item,
          path: fullPath,
          title: extractTitle(fullPath)
        });
      }
    }
  }
  
  return {
    path: dirPath,
    relativePath: relativePath || '.',
    markdownFiles: markdownFiles.sort((a, b) => a.name.localeCompare(b.name)),
    subdirectories: subdirectories.sort((a, b) => a.name.localeCompare(b.name)),
    existingIndex
  };
}

function extractTitle(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Buscar primer heading nivel 1
    const match = content.match(/^#\s+(.+)$/m);
    if (match) {
      return match[1].trim();
    }
    
    // Si no hay heading, usar nombre de archivo
    return path.basename(filePath, '.md')
      .replace(/-/g, ' ')
      .replace(/_/g, ' ')
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  } catch (error) {
    return path.basename(filePath, '.md');
  }
}

// ============================================================================
// GENERACIÓN DE CONTENIDO
// ============================================================================

function generateFrontmatter(dirInfo) {
  const folderName = path.basename(dirInfo.path);
  const title = folderName.replace(/_/g, ' ').replace(/^\d+_/, '');
  
  return `---
title: "${title}"
last_updated: ${new Date().toISOString().split('T')[0]}
type: index
---

`;
}

function generateIndexContent(dirInfo) {
  let content = '';
  
  // Frontmatter opcional
  if (CONFIG.addFrontmatter) {
    content += generateFrontmatter(dirInfo);
  }
  
  // Título
  const folderName = path.basename(dirInfo.path);
  const title = folderName.replace(/_/g, ' ').replace(/^\d+_/, '');
  content += `# ${title}\n\n`;
  
  // Descripción placeholder
  content += `Documentación de ${title.toLowerCase()}.\n\n`;
  content += '---\n\n';
  
  // Subdirectorios
  if (dirInfo.subdirectories.length > 0) {
    content += '## Secciones\n\n';
    
    for (const subdir of dirInfo.subdirectories) {
      const subdirTitle = subdir.name.replace(/_/g, ' ').replace(/^\d+_/, '');
      const indexFile = CONFIG.indexNames[0]; // Usar 00_README.md por defecto
      content += `- [${subdirTitle}](./${subdir.name}/${indexFile})\n`;
    }
    
    content += '\n';
  }
  
  // Archivos markdown
  if (dirInfo.markdownFiles.length > 0) {
    content += '## Archivos\n\n';
    
    for (const file of dirInfo.markdownFiles) {
      content += `- [${file.title}](./${file.name})\n`;
    }
    
    content += '\n';
  }
  
  // Footer
  content += '---\n\n';
  content += `- **Última actualización:** ${new Date().toISOString().split('T')[0]}  \n`;
  content += `- **Total de archivos:** ${dirInfo.markdownFiles.length}\n`;
  
  return content;
}

function mergeWithExistingIndex(existingPath, newContent) {
  const existing = fs.readFileSync(existingPath, 'utf8');
  
  // Buscar sección personalizada (entre <!-- CUSTOM --> tags)
  const customMatch = existing.match(/<!-- CUSTOM START -->([\s\S]*?)<!-- CUSTOM END -->/);
  
  if (customMatch) {
    // Preservar contenido personalizado
    const customContent = customMatch[1];
    newContent = newContent.replace(
      '---\n\n',
      `---\n\n<!-- CUSTOM START -->${customContent}<!-- CUSTOM END -->\n\n`
    );
  }
  
  return newContent;
}

// ============================================================================
// PROCESAMIENTO
// ============================================================================

function processDirectory(dirPath, stats) {
  const dirInfo = analyzeDirectory(dirPath);
  
  // Determinar nombre del índice
  let indexName = CONFIG.indexNames[0];
  if (dirInfo.existingIndex) {
    indexName = dirInfo.existingIndex.name;
  }
  
  // Ruta del índice
  const indexPath = path.join(dirPath, indexName);
  
  // Generar contenido
  let content = generateIndexContent(dirInfo);
  
  // Si existe y no es overwrite, merge
  if (dirInfo.existingIndex && !CONFIG.overwrite) {
    content = mergeWithExistingIndex(dirInfo.existingIndex.path, content);
  }
  
  // Escribir o simular
  if (!CONFIG.dryRun) {
    fs.writeFileSync(indexPath, content, 'utf8');
    
    if (dirInfo.existingIndex) {
      log(`  ✓ Actualizado: ${dirInfo.relativePath}/${indexName}`, 'green');
      stats.updated++;
    } else {
      log(`  ✓ Creado: ${dirInfo.relativePath}/${indexName}`, 'cyan');
      stats.created++;
    }
  } else {
    if (dirInfo.existingIndex) {
      log(`  → Actualizar: ${dirInfo.relativePath}/${indexName}`, 'yellow');
      stats.planned++;
    } else {
      log(`  → Crear: ${dirInfo.relativePath}/${indexName}`, 'cyan');
      stats.planned++;
    }
  }
  
  // Procesar subdirectorios recursivamente
  for (const subdir of dirInfo.subdirectories) {
    processDirectory(subdir.path, stats);
  }
}

function findAllDirectories(rootPath) {
  const dirs = [rootPath];
  
  function walk(dirPath) {
    const items = fs.readdirSync(dirPath);
    
    for (const item of items) {
      const fullPath = path.join(dirPath, item);
      
      try {
        const stats = fs.statSync(fullPath);
        
        if (stats.isDirectory()) {
          // Ignorar carpetas especiales
          if (!item.startsWith('.') && !item.startsWith('_') && item !== 'node_modules') {
            dirs.push(fullPath);
            walk(fullPath);
          }
        }
      } catch (error) {
        // Ignorar errores de acceso
      }
    }
  }
  
  walk(rootPath);
  return dirs;
}

// ============================================================================
// MAIN
// ============================================================================

function main() {
  console.clear();
  
  log('╔' + '═'.repeat(68) + '╗', 'cyan');
  log('║' + ' '.repeat(15) + 'GENERACIÓN DE ÍNDICES LOCALES' + ' '.repeat(23) + '║', 'cyan');
  log('╚' + '═'.repeat(68) + '╝\n', 'cyan');
  
  // Parsear argumentos
  const args = process.argv.slice(2);
  CONFIG.dryRun = args.includes('--dry-run');
  CONFIG.overwrite = args.includes('--overwrite');
  CONFIG.addFrontmatter = args.includes('--frontmatter');
  
  if (CONFIG.dryRun) {
    log('⚠️  MODO DRY RUN - No se harán cambios reales\n', 'yellow');
  }
  
  if (CONFIG.overwrite) {
    log('⚠️  MODO OVERWRITE - Se sobrescribirán índices existentes\n', 'yellow');
  }
  
  // Verificar que existe el directorio docs
  if (!fs.existsSync(CONFIG.docsPath)) {
    log(`✗ No se encontró el directorio: ${CONFIG.docsPath}\n`, 'red');
    process.exit(1);
  }
  
  // Encontrar todos los directorios
  log('🔍 Escaneando directorios...\n', 'blue');
  const directories = findAllDirectories(CONFIG.docsPath);
  log(`   Encontrados: ${directories.length} directorios\n`, 'cyan');
  
  // Procesar cada directorio
  const stats = {
    created: 0,
    updated: 0,
    planned: 0,
    skipped: 0
  };
  
  log('📝 Generando índices...\n', 'blue');
  
  for (const dir of directories) {
    const dirInfo = analyzeDirectory(dir);
    
    // Solo procesar si tiene archivos .md o subdirectorios
    if (dirInfo.markdownFiles.length > 0 || dirInfo.subdirectories.length > 0) {
      processDirectory(dir, stats);
    }
  }
  
  // Resumen
  log('\n' + '='.repeat(70), 'cyan');
  log('📊 RESUMEN DE GENERACIÓN', 'cyan', '\n');
  
  if (CONFIG.dryRun) {
    log(`   Índices planeados: ${stats.planned}`, 'yellow');
  } else {
    log(`   Índices creados:    ${stats.created}`, 'green');
    log(`   Índices actualizados: ${stats.updated}`, 'cyan');
  }
  
  log('\n' + '='.repeat(70), 'cyan');
  
  if (CONFIG.dryRun) {
    log('\n💡 Ejecuta sin --dry-run para aplicar cambios\n', 'blue');
  } else {
    log('\n✅ Generación de índices completada\n', 'green');
  }
  
  process.exit(0);
}

// Ejecutar
if (require.main === module) {
  main();
}

module.exports = { analyzeDirectory, generateIndexContent };

