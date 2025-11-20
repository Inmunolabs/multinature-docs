#!/usr/bin/env node

/**
 * Script de Validación de Enlaces en Documentación
 * 
 * Valida que todos los enlaces relativos en archivos .md existan.
 * 
 * Uso:
 *   node scripts/migration/validate-docs-links.js [--public-only] [--verbose]
 * 
 * Opciones:
 *   --public-only  Ignorar carpeta 05_Privado/
 *   --verbose      Mostrar todos los enlaces validados
 *   --fix          Generar sugerencias de corrección
 * 
 * Códigos de salida:
 *   0  Todo OK, sin enlaces rotos
 *   1  Se encontraron enlaces rotos
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// ============================================================================
// CONFIGURACIÓN
// ============================================================================

const CONFIG = {
  docsPath: path.join(__dirname, '..', '..', 'docs'),
  publicOnly: false,
  verbose: false,
  fix: false
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

// ============================================================================
// EXTRACCIÓN DE ENLACES
// ============================================================================

function extractLinks(content, filePath) {
  const links = [];
  
  // Patrón para enlaces Markdown: [texto](enlace)
  const linkPattern = /\[([^\]]+)\]\(([^)]+)\)/g;
  let match;
  
  while ((match = linkPattern.exec(content)) !== null) {
    const text = match[1];
    const link = match[2];
    const lineNumber = content.substring(0, match.index).split('\n').length;
    
    // Solo enlaces relativos (no http, https, mailto, etc.)
    if (!link.startsWith('http') && 
        !link.startsWith('mailto:') && 
        !link.startsWith('#') &&
        !link.startsWith('//')) {
      
      // Remover anchor (#section)
      const cleanLink = link.split('#')[0];
      
      if (cleanLink) {
        links.push({
          text,
          link: cleanLink,
          lineNumber,
          originalLink: link,
          hasAnchor: link.includes('#')
        });
      }
    }
  }
  
  return links;
}

// ============================================================================
// VALIDACIÓN DE ENLACES
// ============================================================================

function validateLink(link, sourceFile) {
  const sourceDir = path.dirname(sourceFile);
  const targetPath = path.resolve(sourceDir, link);
  
  // Verificar si el archivo existe
  const exists = fs.existsSync(targetPath);
  
  return {
    exists,
    targetPath,
    relativePath: path.relative(CONFIG.docsPath, targetPath)
  };
}

function suggestFix(link, sourceFile) {
  const suggestions = [];
  
  // Buscar archivos con nombre similar
  const fileName = path.basename(link);
  const pattern = path.join(CONFIG.docsPath, '**', fileName);
  
  try {
    const matches = glob.sync(pattern, {
      ignore: CONFIG.publicOnly ? ['**/05_Privado/**'] : []
    });
    
    if (matches.length > 0) {
      const sourceDir = path.dirname(sourceFile);
      
      for (const match of matches) {
        const relativePath = path.relative(sourceDir, match);
        suggestions.push({
          path: relativePath,
          fullPath: match
        });
      }
    }
  } catch (error) {
    // Ignorar errores en glob
  }
  
  return suggestions;
}

// ============================================================================
// PROCESAMIENTO DE ARCHIVOS
// ============================================================================

function validateFile(filePath) {
  const relativePath = path.relative(CONFIG.docsPath, filePath);
  const content = fs.readFileSync(filePath, 'utf8');
  const links = extractLinks(content, filePath);
  
  const results = {
    file: relativePath,
    totalLinks: links.length,
    validLinks: 0,
    brokenLinks: [],
    warnings: []
  };
  
  for (const link of links) {
    const validation = validateLink(link.link, filePath);
    
    if (validation.exists) {
      results.validLinks++;
      
      if (CONFIG.verbose) {
        log(`  ✓ ${link.link}`, 'green');
      }
    } else {
      results.brokenLinks.push({
        ...link,
        ...validation,
        suggestions: CONFIG.fix ? suggestFix(link.link, filePath) : []
      });
    }
  }
  
  return results;
}

function processAllFiles() {
  log('\n🔍 Escaneando archivos Markdown...\n', 'blue');
  
  // Buscar todos los archivos .md
  const pattern = path.join(CONFIG.docsPath, '**', '*.md');
  const ignorePattern = CONFIG.publicOnly ? ['**/05_Privado/**'] : [];
  
  const files = glob.sync(pattern, { ignore: ignorePattern });
  
  log(`   Encontrados: ${files.length} archivos\n`, 'cyan');
  
  if (CONFIG.publicOnly) {
    log('   Modo: Solo documentación pública (ignorando 05_Privado/)\n', 'yellow');
  }
  
  const allResults = [];
  let totalLinks = 0;
  let totalValid = 0;
  let totalBroken = 0;
  
  for (const file of files) {
    const results = validateFile(file);
    allResults.push(results);
    
    totalLinks += results.totalLinks;
    totalValid += results.validLinks;
    totalBroken += results.brokenLinks.length;
  }
  
  return {
    files: allResults,
    totalFiles: files.length,
    totalLinks,
    totalValid,
    totalBroken
  };
}

// ============================================================================
// REPORTE
// ============================================================================

function printBrokenLinks(results) {
  const filesWithBroken = results.files.filter(f => f.brokenLinks.length > 0);
  
  if (filesWithBroken.length === 0) {
    return;
  }
  
  log('\n' + '='.repeat(70), 'red');
  log('🔗 ENLACES ROTOS ENCONTRADOS', 'red', '\n');
  
  for (const file of filesWithBroken) {
    log(`\n📄 ${file.file}`, 'bright');
    log(`   Enlaces rotos: ${file.brokenLinks.length} de ${file.totalLinks}`, 'yellow');
    
    for (const broken of file.brokenLinks) {
      log(`\n   ✗ Línea ${broken.lineNumber}: [${broken.text}](${broken.link})`, 'red');
      log(`     Buscando: ${broken.relativePath}`, 'yellow');
      
      if (CONFIG.fix && broken.suggestions.length > 0) {
        log(`     💡 Sugerencias:`, 'cyan');
        for (const suggestion of broken.suggestions.slice(0, 3)) {
          log(`        → ${suggestion.path}`, 'cyan');
        }
      }
    }
  }
  
  log('\n' + '='.repeat(70), 'red');
}

function printSummary(results) {
  log('\n' + '='.repeat(70), 'cyan');
  log('📊 RESUMEN DE VALIDACIÓN', 'cyan', '\n');
  
  log(`   Archivos procesados: ${results.totalFiles}`, 'blue');
  log(`   Enlaces totales:     ${results.totalLinks}`, 'blue');
  log(`   Enlaces válidos:     ${results.totalValid}`, 'green');
  log(`   Enlaces rotos:       ${results.totalBroken}`, results.totalBroken > 0 ? 'red' : 'green');
  
  const percentage = results.totalLinks > 0 
    ? ((results.totalValid / results.totalLinks) * 100).toFixed(1)
    : 100;
  
  log(`\n   Tasa de éxito:       ${percentage}%`, percentage === '100.0' ? 'green' : 'yellow');
  
  log('\n' + '='.repeat(70), 'cyan');
  
  if (results.totalBroken === 0) {
    log('\n✅ Todos los enlaces están válidos\n', 'green');
  } else {
    log(`\n⚠️  ${results.totalBroken} enlace(s) roto(s) necesitan corrección\n`, 'yellow');
  }
}

function saveReport(results, outputPath) {
  const report = {
    timestamp: new Date().toISOString(),
    summary: {
      totalFiles: results.totalFiles,
      totalLinks: results.totalLinks,
      totalValid: results.totalValid,
      totalBroken: results.totalBroken,
      successRate: results.totalLinks > 0 
        ? ((results.totalValid / results.totalLinks) * 100).toFixed(2)
        : 100
    },
    brokenLinks: results.files
      .filter(f => f.brokenLinks.length > 0)
      .map(f => ({
        file: f.file,
        brokenLinks: f.brokenLinks.map(b => ({
          line: b.lineNumber,
          text: b.text,
          link: b.link,
          targetPath: b.relativePath,
          suggestions: b.suggestions
        }))
      }))
  };
  
  fs.writeFileSync(outputPath, JSON.stringify(report, null, 2));
  log(`\n📄 Reporte JSON guardado en: ${outputPath}`, 'cyan');
}

// ============================================================================
// MAIN
// ============================================================================

function main() {
  console.clear();
  
  log('╔' + '═'.repeat(68) + '╗', 'cyan');
  log('║' + ' '.repeat(15) + 'VALIDACIÓN DE ENLACES EN DOCS' + ' '.repeat(24) + '║', 'cyan');
  log('╚' + '═'.repeat(68) + '╝', 'cyan');
  
  // Parsear argumentos
  const args = process.argv.slice(2);
  CONFIG.publicOnly = args.includes('--public-only');
  CONFIG.verbose = args.includes('--verbose');
  CONFIG.fix = args.includes('--fix');
  
  // Verificar que existe el directorio docs
  if (!fs.existsSync(CONFIG.docsPath)) {
    log(`\n✗ No se encontró el directorio: ${CONFIG.docsPath}\n`, 'red');
    process.exit(1);
  }
  
  // Procesar archivos
  const results = processAllFiles();
  
  // Imprimir enlaces rotos
  printBrokenLinks(results);
  
  // Imprimir resumen
  printSummary(results);
  
  // Guardar reporte JSON si hay enlaces rotos
  if (results.totalBroken > 0) {
    const logsDir = path.join(__dirname, '..', '..', 'logs');
    if (!fs.existsSync(logsDir)) {
      fs.mkdirSync(logsDir, { recursive: true });
    }
    
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').substring(0, 19);
    const reportPath = path.join(logsDir, `broken-links-${timestamp}.json`);
    saveReport(results, reportPath);
  }
  
  // Código de salida
  process.exit(results.totalBroken > 0 ? 1 : 0);
}

// Ejecutar
if (require.main === module) {
  main();
}

module.exports = { extractLinks, validateLink, validateFile };

