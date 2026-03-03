#!/usr/bin/env node

/**
 * Encriptar y Comparar Contraseñas con bcryptjs
 *
 * Script interactivo para encriptar (hash) contraseñas y comparar un texto plano
 * contra un hash existente usando bcryptjs.
 *
 * Uso:
 *   # Modo interactivo
 *   node docs/03_Infraestructura/Scripts/encrypt-decrypt.js
 *
 *   # Encriptar directamente
 *   node docs/03_Infraestructura/Scripts/encrypt-decrypt.js --encrypt="MiPassword123"
 *
 *   # Comparar texto plano contra hash
 *   node docs/03_Infraestructura/Scripts/encrypt-decrypt.js --compare="MiPassword123" --hash="$2a$10$..."
 *
 *   # Especificar salt rounds (default: 10)
 *   node docs/03_Infraestructura/Scripts/encrypt-decrypt.js --encrypt="MiPassword123" --rounds=12
 */

const bcrypt = require('bcryptjs');
const readline = require('readline');

// ============================================================================
// CONFIGURACIÓN
// ============================================================================

const DEFAULT_SALT_ROUNDS = 10;

// ============================================================================
// UTILIDADES
// ============================================================================

function parseArgs() {
  const args = {};
  process.argv.slice(2).forEach(arg => {
    if (arg === '--help' || arg === '-h') {
      args.help = true;
    } else if (arg.startsWith('--')) {
      const [key, ...valueParts] = arg.slice(2).split('=');
      args[key] = valueParts.join('=') || true;
    }
  });
  return args;
}

function showHelp() {
  console.log(`
================================================================================
  ENCRYPT / COMPARE - Herramienta de contraseñas con bcryptjs
================================================================================

Uso:
  node encrypt-decrypt.js [opciones]

Opciones:
  --encrypt=TEXT       Encripta el texto proporcionado
  --compare=TEXT       Texto plano a comparar contra un hash
  --hash=HASH          Hash contra el cual comparar (requiere --compare)
  --rounds=N           Salt rounds para encriptación (default: ${DEFAULT_SALT_ROUNDS})
  --help, -h           Mostrar esta ayuda

Ejemplos:
  # Modo interactivo
  node encrypt-decrypt.js

  # Encriptar una contraseña
  node encrypt-decrypt.js --encrypt="MiPassword123"

  # Encriptar con salt rounds personalizado
  node encrypt-decrypt.js --encrypt="MiPassword123" --rounds=12

  # Comparar contraseña contra hash
  node encrypt-decrypt.js --compare="MiPassword123" --hash="\\$2a\\$10\\$hashedValue..."

Nota:
  bcrypt es un algoritmo de hashing unidireccional. No es posible "desencriptar"
  un hash. Solo se puede comparar un texto plano contra un hash existente.
================================================================================
`);
}

function createReadline() {
  return readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
}

function ask(rl, question) {
  return new Promise(resolve => rl.question(question, resolve));
}

// ============================================================================
// OPERACIONES
// ============================================================================

async function encryptText(text, saltRounds) {
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(text, salt);
  return hash;
}

async function compareText(plainText, hash) {
  return bcrypt.compareSync(plainText, hash);
}

// ============================================================================
// MODOS DE EJECUCIÓN
// ============================================================================

async function runEncrypt(text, saltRounds) {
  console.log('\n----------------------------------------');
  console.log('  ENCRIPTAR');
  console.log('----------------------------------------');
  console.log(`  Texto:        ${text}`);
  console.log(`  Salt Rounds:  ${saltRounds}`);
  console.log('----------------------------------------');

  const hash = await encryptText(text, saltRounds);

  console.log(`\n  Hash generado:\n`);
  console.log(`  ${hash}`);
  console.log('\n----------------------------------------\n');
}

async function runCompare(plainText, hash) {
  console.log('\n----------------------------------------');
  console.log('  COMPARAR');
  console.log('----------------------------------------');
  console.log(`  Texto plano:  ${plainText}`);
  console.log(`  Hash:         ${hash}`);
  console.log('----------------------------------------');

  const match = await compareText(plainText, hash);

  if (match) {
    console.log('\n  Resultado: ✅ COINCIDE - El texto plano corresponde al hash\n');
  } else {
    console.log('\n  Resultado: ❌ NO COINCIDE - El texto plano NO corresponde al hash\n');
  }
  console.log('----------------------------------------\n');
}

async function runInteractive() {
  const rl = createReadline();

  console.log(`
================================================================================
  ENCRYPT / COMPARE - Herramienta de contraseñas con bcryptjs
================================================================================
`);

  const action = await ask(rl, '  Selecciona una acción:\n    [1] Encriptar texto\n    [2] Comparar texto contra hash\n\n  Opción (1/2): ');

  if (action.trim() === '1') {
    const text = await ask(rl, '\n  Texto a encriptar: ');
    const roundsInput = await ask(rl, `  Salt rounds (Enter para ${DEFAULT_SALT_ROUNDS}): `);
    const saltRounds = roundsInput.trim() ? parseInt(roundsInput.trim(), 10) : DEFAULT_SALT_ROUNDS;

    rl.close();
    await runEncrypt(text.trim(), saltRounds);
  } else if (action.trim() === '2') {
    const plainText = await ask(rl, '\n  Texto plano: ');
    const hash = await ask(rl, '  Hash a comparar: ');

    rl.close();
    await runCompare(plainText.trim(), hash.trim());
  } else {
    console.log('\n  Opción no válida. Usa 1 o 2.\n');
    rl.close();
    process.exit(1);
  }
}

// ============================================================================
// MAIN
// ============================================================================

async function main() {
  const args = parseArgs();

  if (args.help) {
    showHelp();
    process.exit(0);
  }

  const saltRounds = args.rounds ? parseInt(args.rounds, 10) : DEFAULT_SALT_ROUNDS;

  if (args.encrypt) {
    await runEncrypt(args.encrypt, saltRounds);
  } else if (args.compare && args.hash) {
    await runCompare(args.compare, args.hash);
  } else if (args.compare && !args.hash) {
    console.error('\n  ❌ ERROR: --compare requiere --hash\n');
    console.error('  Ejemplo: node encrypt-decrypt.js --compare="MiPassword123" --hash="$2a$10$..."\n');
    process.exit(1);
  } else {
    await runInteractive();
  }
}

main().catch(err => {
  console.error(`\n  ❌ ERROR: ${err.message}\n`);
  process.exit(1);
});
