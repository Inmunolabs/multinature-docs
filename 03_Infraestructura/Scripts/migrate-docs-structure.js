#!/usr/bin/env node

/**
 * Script de Migración de Estructura de Documentación
 * 
 * Migra archivos de documentación según matriz de reubicación.
 * 
 * Uso:
 *   node scripts/migration/migrate-docs-structure.js [--dry-run] [--confirm]
 * 
 * Opciones:
 *   --dry-run     Modo simulación (default)
 *   --confirm     Ejecutar movimientos reales
 *   --skip-backup No crear backup
 * 
 * Acciones soportadas:
 *   - mover: Mover archivo a nueva ubicación
 *   - renombrar: Renombrar archivo en misma carpeta
 *   - fusionar: Concatenar múltiples archivos
 *   - eliminar: Eliminar archivo (con confirmación)
 *   - mantener: No hacer nada
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

// ============================================================================
// CONFIGURACIÓN
// ============================================================================

const CONFIG = {
  docsPath: path.join(__dirname, '..', '..', 'docs'),
  mapPath: path.join(__dirname, '..', '..', 'docs', 'migrations-map.json'),
  logsPath: path.join(__dirname, '..', '..', 'logs'),
  backupPath: path.join(__dirname, '..', '..', 'docs_backup'),
  dryRun: true,
  skipBackup: false
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
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

function log(message, color = 'reset', prefix = '') {
  console.log(`${colors[color]}${prefix}${message}${colors.reset}`);
}

function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

function getTimestamp() {
  const now = new Date();
  return now.toISOString().replace(/[:.]/g, '-').substring(0, 19);
}

function askConfirmation(question) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise((resolve) => {
    rl.question(`${colors.yellow}${question} (y/n): ${colors.reset}`, (answer) => {
      rl.close();
      resolve(answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes');
    });
  });
}

// ============================================================================
// BACKUP
// ============================================================================

function createBackup() {
  if (CONFIG.skipBackup) {
    log('⏩ Saltando backup (--skip-backup)', 'yellow');
    return null;
  }

  const timestamp = getTimestamp();
  const backupDir = `${CONFIG.backupPath}_${timestamp}`;
  
  log(`\n📦 Creando backup en: ${backupDir}`, 'blue');
  
  try {
    ensureDir(backupDir);
    copyRecursive(CONFIG.docsPath, backupDir);
    log(`✓ Backup creado exitosamente`, 'green');
    return backupDir;
  } catch (error) {
    log(`✗ Error creando backup: ${error.message}`, 'red');
    throw error;
  }
}

function copyRecursive(src, dest) {
  const stats = fs.statSync(src);
  
  if (stats.isDirectory()) {
    ensureDir(dest);
    const entries = fs.readdirSync(src);
    
    for (const entry of entries) {
      copyRecursive(
        path.join(src, entry),
        path.join(dest, entry)
      );
    }
  } else {
    fs.copyFileSync(src, dest);
  }
}

// ============================================================================
// LOGGING
// ============================================================================

class MigrationLogger {
  constructor() {
    this.timestamp = getTimestamp();
    this.logFile = path.join(CONFIG.logsPath, `migration-${this.timestamp}.log`);
    this.rollbackFile = path.join(CONFIG.logsPath, `rollback-${this.timestamp}.sh`);
    this.entries = [];
    this.rollbackCommands = [];
    
    ensureDir(CONFIG.logsPath);
  }

  log(level, message, data = {}) {
    const entry = {
      timestamp: new Date().toISOString(),
      level,
      message,
      ...data
    };
    
    this.entries.push(entry);
    
    // Escribir a archivo
    const logLine = `[${entry.timestamp}] [${level}] ${message}\n`;
    fs.appendFileSync(this.logFile, logLine);
  }

  addRollback(command) {
    this.rollbackCommands.push(command);
  }

  writeRollback() {
    const header = `#!/bin/bash
# Rollback script generado: ${this.timestamp}
# Ejecutar desde raíz del proyecto
# PRECAUCIÓN: Revisa antes de ejecutar

set -e

`;
    
    const content = header + this.rollbackCommands.reverse().join('\n') + '\n';
    fs.writeFileSync(this.rollbackFile, content, { mode: 0o755 });
    
    log(`\n📝 Script de rollback: ${this.rollbackFile}`, 'cyan');
  }

  summary() {
    const success = this.entries.filter(e => e.level === 'SUCCESS').length;
    const errors = this.entries.filter(e => e.level === 'ERROR').length;
    const warnings = this.entries.filter(e => e.level === 'WARN').length;
    const skipped = this.entries.filter(e => e.level === 'SKIP').length;
    
    log('\n' + '='.repeat(70), 'cyan');
    log('📊 RESUMEN DE MIGRACIÓN', 'cyan', '\n');
    log(`✓ Exitosos:  ${success}`, 'green', '  ');
    log(`⚠ Advertencias: ${warnings}`, 'yellow', '  ');
    log(`⏭ Saltados:  ${skipped}`, 'blue', '  ');
    log(`✗ Errores:   ${errors}`, 'red', '  ');
    log('\n📄 Log completo: ' + this.logFile, 'cyan');
    log('='.repeat(70) + '\n', 'cyan');
    
    return { success, errors, warnings, skipped };
  }
}

// ============================================================================
// ACCIONES DE MIGRACIÓN
// ============================================================================

function moveFile(migration, logger, stats) {
  const srcPath = path.join(CONFIG.docsPath, migration.origen);
  const destPath = path.join(CONFIG.docsPath, migration.destino);
  
  // Verificar que origen existe
  if (!fs.existsSync(srcPath)) {
    log(`  ⚠ Origen no existe: ${migration.origen}`, 'yellow');
    logger.log('SKIP', `Origen no existe: ${migration.origen}`);
    stats.skipped++;
    return;
  }
  
  // Verificar si destino ya existe
  if (fs.existsSync(destPath)) {
    log(`  ⏭ Destino ya existe: ${migration.destino}`, 'blue');
    logger.log('SKIP', `Destino ya existe: ${migration.destino}`);
    stats.skipped++;
    return;
  }
  
  // Ejecutar movimiento
  if (!CONFIG.dryRun) {
    try {
      ensureDir(path.dirname(destPath));
      fs.renameSync(srcPath, destPath);
      
      // Rollback command
      const rollbackCmd = `mv "${migration.destino}" "${migration.origen}"`;
      logger.addRollback(rollbackCmd);
      
      log(`  ✓ Movido: ${migration.origen} → ${migration.destino}`, 'green');
      logger.log('SUCCESS', `Movido: ${migration.origen} → ${migration.destino}`);
      stats.success++;
    } catch (error) {
      log(`  ✗ Error: ${error.message}`, 'red');
      logger.log('ERROR', `Error moviendo ${migration.origen}: ${error.message}`);
      stats.errors++;
    }
  } else {
    log(`  → Mover: ${migration.origen} → ${migration.destino}`, 'cyan');
    stats.planned++;
  }
}

function renameFile(migration, logger, stats) {
  // Similar a mover pero en misma carpeta
  moveFile(migration, logger, stats);
}

function fusionarFiles(migration, logger, stats) {
  const sources = Array.isArray(migration.origen) ? migration.origen : [migration.origen];
  const destPath = path.join(CONFIG.docsPath, migration.destino);
  
  if (fs.existsSync(destPath)) {
    log(`  ⏭ Archivo fusionado ya existe: ${migration.destino}`, 'blue');
    logger.log('SKIP', `Archivo fusionado ya existe: ${migration.destino}`);
    stats.skipped++;
    return;
  }
  
  if (!CONFIG.dryRun) {
    try {
      let content = `# ${migration.titulo || 'Archivo Consolidado'}\n\n`;
      content += `> Generado automáticamente fusionando ${sources.length} archivos\n\n`;
      content += '---\n\n';
      
      for (const src of sources) {
        const srcPath = path.join(CONFIG.docsPath, src);
        if (fs.existsSync(srcPath)) {
          const srcContent = fs.readFileSync(srcPath, 'utf8');
          content += `## De: ${src}\n\n${srcContent}\n\n---\n\n`;
        }
      }
      
      ensureDir(path.dirname(destPath));
      fs.writeFileSync(destPath, content, 'utf8');
      
      log(`  ✓ Fusionados ${sources.length} archivos → ${migration.destino}`, 'green');
      logger.log('SUCCESS', `Fusionados ${sources.length} archivos → ${migration.destino}`);
      stats.success++;
    } catch (error) {
      log(`  ✗ Error fusionando: ${error.message}`, 'red');
      logger.log('ERROR', `Error fusionando: ${error.message}`);
      stats.errors++;
    }
  } else {
    log(`  → Fusionar ${sources.length} archivos → ${migration.destino}`, 'cyan');
    stats.planned++;
  }
}

async function eliminarFile(migration, logger, stats) {
  const srcPath = path.join(CONFIG.docsPath, migration.origen);
  
  if (!fs.existsSync(srcPath)) {
    log(`  ⏭ Archivo ya eliminado: ${migration.origen}`, 'blue');
    logger.log('SKIP', `Archivo ya eliminado: ${migration.origen}`);
    stats.skipped++;
    return;
  }
  
  if (!CONFIG.dryRun) {
    const confirmed = await askConfirmation(`¿Eliminar ${migration.origen}?`);
    
    if (confirmed) {
      try {
        // Backup del archivo antes de eliminar
        const backupPath = srcPath + '.deleted.' + getTimestamp();
        fs.copyFileSync(srcPath, backupPath);
        fs.unlinkSync(srcPath);
        
        log(`  ✓ Eliminado: ${migration.origen} (backup: ${backupPath})`, 'green');
        logger.log('SUCCESS', `Eliminado: ${migration.origen}`);
        stats.success++;
      } catch (error) {
        log(`  ✗ Error eliminando: ${error.message}`, 'red');
        logger.log('ERROR', `Error eliminando ${migration.origen}: ${error.message}`);
        stats.errors++;
      }
    } else {
      log(`  ⏭ Eliminación cancelada: ${migration.origen}`, 'yellow');
      logger.log('SKIP', `Eliminación cancelada: ${migration.origen}`);
      stats.skipped++;
    }
  } else {
    log(`  → Eliminar: ${migration.origen}`, 'magenta');
    stats.planned++;
  }
}

function mantenerFile(migration, logger, stats) {
  log(`  ○ Mantener: ${migration.origen}`, 'blue');
  logger.log('SKIP', `Mantener: ${migration.origen}`);
  stats.skipped++;
}

// ============================================================================
// PROCESADOR PRINCIPAL
// ============================================================================

async function processMigrations(migrations, logger) {
  const stats = {
    success: 0,
    errors: 0,
    warnings: 0,
    skipped: 0,
    planned: 0
  };
  
  log('\n🔄 Procesando migraciones...\n', 'blue');
  
  for (let i = 0; i < migrations.length; i++) {
    const migration = migrations[i];
    const progress = `[${i + 1}/${migrations.length}]`;
    
    log(`${progress} ${migration.accion.toUpperCase()}: ${migration.origen}`, 'bright');
    
    switch (migration.accion) {
      case 'mover':
        moveFile(migration, logger, stats);
        break;
      
      case 'renombrar':
        renameFile(migration, logger, stats);
        break;
      
      case 'fusionar':
        fusionarFiles(migration, logger, stats);
        break;
      
      case 'eliminar':
        await eliminarFile(migration, logger, stats);
        break;
      
      case 'mantener':
        mantenerFile(migration, logger, stats);
        break;
      
      default:
        log(`  ⚠ Acción desconocida: ${migration.accion}`, 'yellow');
        logger.log('WARN', `Acción desconocida: ${migration.accion}`);
        stats.warnings++;
    }
  }
  
  return stats;
}

// ============================================================================
// MAIN
// ============================================================================

async function main() {
  console.clear();
  
  log('╔' + '═'.repeat(68) + '╗', 'cyan');
  log('║' + ' '.repeat(10) + 'MIGRACIÓN DE ESTRUCTURA DE DOCUMENTACIÓN' + ' '.repeat(17) + '║', 'cyan');
  log('╚' + '═'.repeat(68) + '╝\n', 'cyan');
  
  // Parsear argumentos
  const args = process.argv.slice(2);
  CONFIG.dryRun = !args.includes('--confirm');
  CONFIG.skipBackup = args.includes('--skip-backup');
  
  if (CONFIG.dryRun) {
    log('⚠️  MODO DRY RUN - No se harán cambios reales', 'yellow', '\n');
    log('   Para ejecutar: node scripts/migration/migrate-docs-structure.js --confirm\n', 'yellow');
  } else {
    log('🔴 MODO EJECUCIÓN REAL - Se modificarán archivos', 'red', '\n');
  }
  
  // Verificar que existe el mapa de migraciones
  if (!fs.existsSync(CONFIG.mapPath)) {
    log(`\n✗ No se encontró el archivo de mapeo: ${CONFIG.mapPath}`, 'red');
    log('  Genera el archivo migrations-map.json primero\n', 'yellow');
    process.exit(1);
  }
  
  // Cargar migraciones
  let migrations;
  try {
    const content = fs.readFileSync(CONFIG.mapPath, 'utf8');
    migrations = JSON.parse(content);
    log(`✓ Cargadas ${migrations.length} migraciones\n`, 'green');
  } catch (error) {
    log(`\n✗ Error leyendo ${CONFIG.mapPath}: ${error.message}\n`, 'red');
    process.exit(1);
  }
  
  // Crear backup si no es dry-run
  let backupDir = null;
  if (!CONFIG.dryRun) {
    try {
      backupDir = createBackup();
    } catch (error) {
      log('\n✗ Error en backup. Abortando migración.\n', 'red');
      process.exit(1);
    }
  }
  
  // Confirmar antes de proceder
  if (!CONFIG.dryRun) {
    const proceed = await askConfirmation('\n¿Proceder con la migración?');
    if (!proceed) {
      log('\n⏹  Migración cancelada por el usuario\n', 'yellow');
      process.exit(0);
    }
  }
  
  // Procesar migraciones
  const logger = new MigrationLogger();
  const stats = await processMigrations(migrations, logger);
  
  // Generar script de rollback
  if (!CONFIG.dryRun && logger.rollbackCommands.length > 0) {
    logger.writeRollback();
  }
  
  // Mostrar resumen
  const summary = logger.summary();
  
  // Código de salida
  if (CONFIG.dryRun) {
    log('💡 Ejecuta con --confirm para aplicar cambios\n', 'blue');
    process.exit(0);
  } else if (summary.errors > 0) {
    log('⚠️  Migración completada con errores\n', 'yellow');
    process.exit(1);
  } else {
    log('✅ Migración completada exitosamente\n', 'green');
    if (backupDir) {
      log(`📦 Backup disponible en: ${backupDir}\n`, 'cyan');
    }
    process.exit(0);
  }
}

// Ejecutar
if (require.main === module) {
  main().catch(error => {
    log(`\n✗ Error fatal: ${error.message}\n`, 'red');
    console.error(error);
    process.exit(1);
  });
}

module.exports = { processMigrations, moveFile };

