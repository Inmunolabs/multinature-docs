#!/usr/bin/env node
// ============================================================================
// Script: clone-workspace-repos.js
// Description: Clone all Multinature repos into workspace/backend (apis, layers, api-collection, docs)
// Usage: From workspace/backend/ → node docs/03_Infraestructura/Scripts/clone-workspace-repos.js [options]
// ============================================================================

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const REPOS = [
  { url: 'https://github.com/Inmunolabs/multinature-api-collection', type: 'root', folder: 'api-collection' },
  { url: 'https://github.com/Inmunolabs/multinature-docs', type: 'root', folder: 'docs' },
  { url: 'https://github.com/Inmunolabs/multinature-addresses-api', type: 'api', folder: 'addresses-api' },
  { url: 'https://github.com/Inmunolabs/multinature-bookings-api', type: 'api', folder: 'bookings-api' },
  { url: 'https://github.com/Inmunolabs/multinature-cart-api', type: 'api', folder: 'cart-api' },
  { url: 'https://github.com/Inmunolabs/multinature-commissions-api', type: 'api', folder: 'commissions-api' },
  { url: 'https://github.com/Inmunolabs/multinature-constants-api', type: 'api', folder: 'constants-api' },
  { url: 'https://github.com/Inmunolabs/multinature-diets-api', type: 'api', folder: 'diets-api' },
  { url: 'https://github.com/Inmunolabs/multinature-forms-api', type: 'api', folder: 'forms-api' },
  { url: 'https://github.com/Inmunolabs/multinature-integrations-api', type: 'api', folder: 'integrations-api' },
  { url: 'https://github.com/Inmunolabs/multinature-monthly-purchases-api', type: 'api', folder: 'monthly-purchases-api' },
  { url: 'https://github.com/Inmunolabs/multinature-notifications-api', type: 'api', folder: 'notifications-api' },
  { url: 'https://github.com/Inmunolabs/multinature-orders-api', type: 'api', folder: 'orders-api' },
  { url: 'https://github.com/Inmunolabs/multinature-payment-methods-api', type: 'api', folder: 'payment-methods-api' },
  { url: 'https://github.com/Inmunolabs/multinature-products-api', type: 'api', folder: 'products-api' },
  { url: 'https://github.com/Inmunolabs/multinature-routines-api', type: 'api', folder: 'routines-api' },
  { url: 'https://github.com/Inmunolabs/multinature-users-api', type: 'api', folder: 'users-api' },
  { url: 'https://github.com/Inmunolabs/multinature-user-files-api', type: 'api', folder: 'user-files-api' },
  { url: 'https://github.com/Inmunolabs/multinature-mysql-layer', type: 'layer', folder: 'multi-mysql-layer' },
  { url: 'https://github.com/Inmunolabs/multinature-commons-layer', type: 'layer', folder: 'multi-commons-layer' },
  { url: 'https://github.com/Inmunolabs/multinature-emails-layer', type: 'layer', folder: 'multi-emails-layer' },
];

const args = process.argv.slice(2);
const config = {
  root: getArg('--root') || process.cwd(),
  branch: getArg('--branch') || 'develop',
  pullIfExists: args.includes('--pull-if-exists'),
  dryRun: args.includes('--dry-run'),
  help: args.includes('--help') || args.includes('-h'),
};

function getArg(name) {
  const a = args.find(x => x.startsWith(name + '='));
  return a ? a.slice(name.length + 1).trim() : null;
}

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    if (!config.dryRun) fs.mkdirSync(dir, { recursive: true });
    console.log('[mkdir] ' + dir);
  }
}

function isGitRepo(dir) {
  try {
    return fs.statSync(path.join(dir, '.git')).isDirectory();
  } catch {
    return false;
  }
}

function run(cmd, opts = {}) {
  if (config.dryRun) {
    console.log('[dry-run] ' + cmd);
    return;
  }
  execSync(cmd, { stdio: 'inherit', ...opts });
}

function main() {
  if (config.help) {
    console.log(`
Uso: node docs/03_Infraestructura/Scripts/clone-workspace-repos.js [OPTIONS]

Ejecutar desde: workspace/backend/

Opciones:
  --root=PATH         Raíz del backend (default: directorio actual = workspace/backend)
  --branch=BRANCH     Rama a clonar (default: develop)
  --pull-if-exists    Si la carpeta ya existe y es repo git, hacer git pull origin develop
  --dry-run           Solo mostrar qué se haría, sin clonar
  -h, --help          Esta ayuda
`);
    process.exit(0);
  }

  if (!fs.existsSync(config.root)) {
    console.error('Error: directorio raíz no encontrado: ' + config.root);
    process.exit(1);
  }

  const apisDir = path.join(config.root, 'apis');
  const layersDir = path.join(config.root, 'layers');
  ensureDir(apisDir);
  ensureDir(layersDir);

  let cloned = 0, skipped = 0, pulled = 0;

  for (const repo of REPOS) {
    const base = repo.type === 'api' ? apisDir : repo.type === 'layer' ? layersDir : config.root;
    const dest = path.join(base, repo.folder);

    if (fs.existsSync(dest)) {
      if (isGitRepo(dest) && config.pullIfExists) {
        console.log('[pull] ' + repo.folder);
        run(`git -C "${dest}" pull origin ${config.branch}`);
        pulled++;
      } else {
        console.log('[skip] ' + repo.folder + ' (ya existe)');
        skipped++;
      }
      continue;
    }

    console.log('[clone] ' + repo.url + ' -> ' + repo.folder);
    run(`git clone -b ${config.branch} "${repo.url}" "${dest}"`);
    cloned++;
  }

  console.log('\nResumen: ' + cloned + ' clonados, ' + pulled + ' actualizados (pull), ' + skipped + ' omitidos.');
}

main();
