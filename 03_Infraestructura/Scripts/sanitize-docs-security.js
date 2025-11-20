#!/usr/bin/env node

/**
 * Script de Sanitización de Seguridad para Documentación
 * 
 * Ejecuta reemplazos automáticos de datos sensibles en archivos .md
 * Basado en hallazgos de auditoría de seguridad 2025-10-20
 * 
 * Uso:
 *   node scripts/sanitize-docs-security.js [--dry-run] [--backup]
 * 
 * Opciones:
 *   --dry-run    Muestra cambios sin aplicarlos
 *   --backup     Crea backup de archivos antes de modificar
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// ============================================================================
// CONFIGURACIÓN
// ============================================================================

const REPLACEMENTS = {
  // JWT Tokens (reemplazar por placeholder)
  jwtTokens: {
    pattern: /eyJ[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_.]+/g,
    replacement: 'eyJ...EXAMPLE_TOKEN_PLACEHOLDER_DO_NOT_USE',
    description: 'JWT Token',
    severity: 'CRÍTICO'
  },

  // Emails potencialmente reales
  emails: [
    {
      pattern: /mvaldes988@gmail\.com/g,
      replacement: 'admin.ejemplo@multinature.local',
      description: 'Email admin'
    },
    {
      pattern: /inmunosalud\.mx@gmail\.com/g,
      replacement: 'nutriologo.ejemplo@multinature.local',
      description: 'Email nutriólogo'
    },
    {
      pattern: /sabyreveles@gmail\.com/g,
      replacement: 'usuario1.ejemplo@multinature.local',
      description: 'Email usuario 1'
    },
    {
      pattern: /samu\.sandbox@gmail\.com/g,
      replacement: 'usuario2.ejemplo@multinature.local',
      description: 'Email usuario 2'
    },
    {
      pattern: /anderson\.nutra@gmail\.com/g,
      replacement: 'especialista.ejemplo@multinature.local',
      description: 'Email especialista'
    },
    {
      pattern: /multinature\.mx@gmail\.com/g,
      replacement: 'contacto@multinature.local',
      description: 'Email contacto'
    },
    {
      pattern: /000@multi\.com/g,
      replacement: 'test.paciente@multinature.local',
      description: 'Email test paciente'
    },
    {
      pattern: /pedidos\.inmunosalud\.mx@gmail\.com/g,
      replacement: 'pedidos.ejemplo@multinature.local',
      description: 'Email pedidos'
    },
    {
      pattern: /mvaldes999@gmail\.com/g,
      replacement: 'cliente.test@multinature.local',
      description: 'Email cliente test'
    }
  ],

  // Números telefónicos (reemplazar por patrón estándar)
  phones: [
    {
      pattern: /\+525512345678/g,
      replacement: '+525550001000',
      description: 'Teléfono ejemplo 1'
    },
    {
      pattern: /\+525512345679/g,
      replacement: '+525550001001',
      description: 'Teléfono ejemplo 2'
    },
    {
      pattern: /\+525512345680/g,
      replacement: '+525550001002',
      description: 'Teléfono ejemplo 3'
    },
    {
      pattern: /\+525512345681/g,
      replacement: '+525550001003',
      description: 'Teléfono ejemplo 4'
    },
    {
      pattern: /\+525598765432/g,
      replacement: '+525550002000',
      description: 'Teléfono ejemplo 5'
    },
    {
      pattern: /\+525598765433/g,
      replacement: '+525550002001',
      description: 'Teléfono ejemplo 6'
    }
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
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function createBackup(filePath) {
  const backupPath = `${filePath}.bak`;
  fs.copyFileSync(filePath, backupPath);
  return backupPath;
}

// ============================================================================
// PROCESAMIENTO
// ============================================================================

function processFile(filePath, options = {}) {
  const { dryRun = false, backup = false } = options;
  
  // Leer contenido
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;
  const changes = [];

  // Procesar JWT Tokens
  if (REPLACEMENTS.jwtTokens.pattern.test(content)) {
    const matches = content.match(REPLACEMENTS.jwtTokens.pattern);
    changes.push({
      type: 'JWT Token',
      count: matches.length,
      severity: REPLACEMENTS.jwtTokens.severity
    });
    content = content.replace(
      REPLACEMENTS.jwtTokens.pattern,
      REPLACEMENTS.jwtTokens.replacement
    );
    modified = true;
  }

  // Procesar Emails
  let emailCount = 0;
  REPLACEMENTS.emails.forEach(({ pattern, replacement, description }) => {
    if (pattern.test(content)) {
      const matches = content.match(pattern);
      emailCount += matches ? matches.length : 0;
      content = content.replace(pattern, replacement);
      modified = true;
    }
  });
  if (emailCount > 0) {
    changes.push({
      type: 'Emails',
      count: emailCount,
      severity: 'ALTA'
    });
  }

  // Procesar Teléfonos
  let phoneCount = 0;
  REPLACEMENTS.phones.forEach(({ pattern, replacement, description }) => {
    if (pattern.test(content)) {
      const matches = content.match(pattern);
      phoneCount += matches ? matches.length : 0;
      content = content.replace(pattern, replacement);
      modified = true;
    }
  });
  if (phoneCount > 0) {
    changes.push({
      type: 'Teléfonos',
      count: phoneCount,
      severity: 'ALTA'
    });
  }

  // Aplicar cambios si hay modificaciones
  if (modified && !dryRun) {
    if (backup) {
      createBackup(filePath);
    }
    fs.writeFileSync(filePath, content, 'utf8');
  }

  return { modified, changes };
}

// ============================================================================
// MAIN
// ============================================================================

function main() {
  // Parsear argumentos
  const args = process.argv.slice(2);
  const dryRun = args.includes('--dry-run');
  const backup = args.includes('--backup');

  log('\n🔒 SANITIZACIÓN DE SEGURIDAD - DOCUMENTACIÓN MULTINATURE\n', 'cyan');
  
  if (dryRun) {
    log('⚠️  Modo DRY RUN - No se aplicarán cambios\n', 'yellow');
  }
  
  if (backup) {
    log('📦 Modo BACKUP - Se crearán archivos .bak\n', 'blue');
  }

  // Buscar archivos .md
  log('🔍 Escaneando archivos...', 'blue');
  const docsPath = path.join(__dirname, '..', 'docs');
  const files = glob.sync(`${docsPath}/**/*.md`);
  
  log(`   Encontrados: ${files.length} archivos\n`, 'cyan');

  // Procesar archivos
  let totalModified = 0;
  let totalChanges = {
    'JWT Token': 0,
    'Emails': 0,
    'Teléfonos': 0
  };

  const modifiedFiles = [];

  files.forEach((file) => {
    const result = processFile(file, { dryRun, backup });
    
    if (result.modified) {
      totalModified++;
      const relativePath = path.relative(process.cwd(), file);
      modifiedFiles.push(relativePath);
      
      // Acumular cambios
      result.changes.forEach(change => {
        totalChanges[change.type] = (totalChanges[change.type] || 0) + change.count;
      });

      // Mostrar archivo modificado
      log(`   ✓ ${relativePath}`, 'green');
      result.changes.forEach(change => {
        const severityColor = change.severity === 'CRÍTICO' ? 'red' : 
                               change.severity === 'ALTA' ? 'yellow' : 'cyan';
        log(`     - ${change.type}: ${change.count} reemplazo(s)`, severityColor);
      });
    }
  });

  // Resumen
  log('\n' + '='.repeat(70), 'cyan');
  log('📊 RESUMEN DE SANITIZACIÓN\n', 'cyan');
  
  log(`Archivos procesados:  ${files.length}`, 'blue');
  log(`Archivos modificados: ${totalModified}`, totalModified > 0 ? 'yellow' : 'green');
  
  log('\nCambios por tipo:', 'cyan');
  Object.entries(totalChanges).forEach(([type, count]) => {
    if (count > 0) {
      const color = type === 'JWT Token' ? 'red' : 'yellow';
      log(`  ${type}: ${count} reemplazo(s)`, color);
    }
  });

  if (dryRun) {
    log('\n⚠️  DRY RUN: Ningún cambio fue aplicado', 'yellow');
    log('   Para aplicar cambios, ejecuta sin --dry-run\n', 'yellow');
  } else if (totalModified > 0) {
    log('\n✅ Cambios aplicados exitosamente', 'green');
    
    if (backup) {
      log('   Backups creados con extensión .bak', 'blue');
    }
    
    log('\n📝 Próximos pasos:', 'cyan');
    log('   1. Revisar los cambios:', 'white');
    log('      git diff docs/', 'cyan');
    log('   2. Si todo está correcto, commitear:', 'white');
    log('      git add docs/', 'cyan');
    log('      git commit -m "docs: sanitize sensitive data from documentation"', 'cyan');
    log('   3. Push:', 'white');
    log('      git push origin main', 'cyan');
  } else {
    log('\n✅ No se encontraron datos sensibles para sanitizar', 'green');
  }

  log('\n' + '='.repeat(70) + '\n', 'cyan');

  // Retornar código de salida
  process.exit(totalModified > 0 && !dryRun ? 1 : 0);
}

// Ejecutar
if (require.main === module) {
  main();
}

module.exports = { processFile, REPLACEMENTS };

