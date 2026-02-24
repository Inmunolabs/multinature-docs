#!/usr/bin/env node
// ============================================================================
// Script: update-lambda-layers.js
// Description: Updates layers on multiple Lambda functions starting with "multi"
// Usage: node update-lambda-layers.js [options]
// ============================================================================

const { execSync } = require('child_process');
const readline = require('readline');

// ============================================================================
// Configuration
// ============================================================================
const REGION = 'us-east-1';
const FUNCTION_PREFIX = 'multi';
// const KNOWN_LAYERS = ['multi-mysql-layer', 'multi-commons-layer', 'multi-emails-layer'];

const args = process.argv.slice(2);
const config = {
    dryRun: args.includes('--dry-run'),
    filter: getArgValue('--filter') || '',
    layers: getArgValue('--layers') || '',
    yes: args.includes('--yes') || args.includes('-y'),
    help: args.includes('--help') || args.includes('-h'),
    listOnly: args.includes('--list-only')
};

function getArgValue(argName) {
    const arg = args.find(a => a.startsWith(`${argName}=`));
    return arg ? arg.split('=').slice(1).join('=') : null;
}

// ============================================================================
// Colors for console output
// ============================================================================
const colors = {
    reset: '\x1b[0m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    cyan: '\x1b[36m',
    gray: '\x1b[90m',
    white: '\x1b[37m',
    bold: '\x1b[1m'
};

function log(message, color = 'white') {
    console.log(`${colors[color] || colors.white}${message}${colors.reset}`);
}

function logBold(message, color = 'white') {
    console.log(`${colors.bold}${colors[color] || colors.white}${message}${colors.reset}`);
}

// ============================================================================
// Statistics
// ============================================================================
let successCount = 0;
let failCount = 0;
let skippedCount = 0;
let noChangeCount = 0;
const failedFunctions = [];
const updatedFunctions = [];

// ============================================================================
// Help
// ============================================================================
function showHelp() {
    console.log(`
============================================================================
                UPDATE LAMBDA LAYERS
============================================================================

DESCRIPTION:
  Updates layers on all Lambda functions starting with "${FUNCTION_PREFIX}"
  in region ${REGION}. Lists current layer versions and allows you to
  specify the new versions to apply.

USAGE:
  node update-lambda-layers.js [OPTIONS]

OPTIONS:
  --dry-run                    Show what changes would be made without applying
  --list-only                  Only list functions and their current layers
  --filter=KEYWORD             Filter functions by keyword (e.g. "dev", "prod")
  --layers=LAYER:VER,...       Specify new layer versions directly
                               Example: --layers=multi-commons-layer:310,multi-mysql-layer:370
  -y, --yes                    Skip confirmation prompt
  --help, -h                   Show this help message

EXAMPLES:
  node update-lambda-layers.js --list-only
    List all "multi" Lambda functions and their current layers

  node update-lambda-layers.js --dry-run
    Interactive mode: prompts for new versions, shows planned changes

  node update-lambda-layers.js --layers=multi-commons-layer:310,multi-mysql-layer:370
    Update commons and mysql layers to specific versions on all functions

  node update-lambda-layers.js --filter=dev --layers=multi-commons-layer:310
    Update only dev functions

  node update-lambda-layers.js --filter=prod --dry-run
    Dry-run for production functions only

REQUIREMENTS:
  - AWS CLI configured with appropriate credentials
  - Permissions: lambda:ListFunctions, lambda:GetFunction,
    lambda:UpdateFunctionConfiguration, lambda:ListLayerVersions

============================================================================
`);
}

// ============================================================================
// AWS CLI Helpers
// ============================================================================

function awsCli(command) {
    try {
        const result = execSync(`aws ${command} --region ${REGION} --output json`, {
            encoding: 'utf8',
            stdio: ['pipe', 'pipe', 'pipe'],
            timeout: 30000
        });
        return JSON.parse(result);
    } catch (error) {
        const stderr = error.stderr ? error.stderr.toString().trim() : '';
        throw new Error(stderr || error.message);
    }
}

function awsCliRaw(command) {
    try {
        return execSync(`aws ${command} --region ${REGION} --output json`, {
            encoding: 'utf8',
            stdio: ['pipe', 'pipe', 'pipe'],
            timeout: 30000
        }).trim();
    } catch (error) {
        const stderr = error.stderr ? error.stderr.toString().trim() : '';
        throw new Error(stderr || error.message);
    }
}

// ============================================================================
// Readline Helper
// ============================================================================

function createReadlineInterface() {
    return readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
}

function askQuestion(rl, question) {
    return new Promise(resolve => {
        rl.question(question, answer => resolve(answer.trim()));
    });
}

// ============================================================================
// Core Functions
// ============================================================================

function getAccountId() {
    try {
        const result = awsCli('sts get-caller-identity');
        return result.Account;
    } catch (error) {
        throw new Error(`No se pudo obtener el Account ID. Verifica tu configuración de AWS CLI.\n  ${error.message}`);
    }
}

function listLambdaFunctions() {
    const allFunctions = [];
    let marker = null;

    do {
        const markerParam = marker ? `--marker "${marker}"` : '';
        const result = awsCli(`lambda list-functions --max-items 200 ${markerParam}`);
        const functions = (result.Functions || [])
            .filter(fn => fn.FunctionName.startsWith(FUNCTION_PREFIX))
            .map(fn => fn.FunctionName);
        allFunctions.push(...functions);
        marker = result.NextMarker || null;
    } while (marker);

    return allFunctions.sort();
}

function getFunctionLayers(functionName) {
    try {
        const result = awsCli(`lambda get-function-configuration --function-name "${functionName}"`);
        return (result.Layers || []).map(layer => {
            const arnParts = layer.Arn.split(':');
            const version = parseInt(arnParts[arnParts.length - 1], 10);
            const layerName = arnParts[arnParts.length - 2];
            return { arn: layer.Arn, name: layerName, version, codeSize: layer.CodeSize };
        });
    } catch (error) {
        log(`  Error obteniendo capas de ${functionName}: ${error.message}`, 'red');
        return [];
    }
}

function getLatestLayerVersion(layerName) {
    try {
        const result = awsCli(`lambda list-layer-versions --layer-name "${layerName}" --max-items 1`);
        if (result.LayerVersions && result.LayerVersions.length > 0) {
            return result.LayerVersions[0].Version;
        }
        return null;
    } catch {
        return null;
    }
}

function buildLayerArn(accountId, layerName, version) {
    return `arn:aws:lambda:${REGION}:${accountId}:layer:${layerName}:${version}`;
}

function updateFunctionLayers(functionName, layerArns) {
    const arnsStr = layerArns.map(a => `"${a}"`).join(' ');
    try {
        awsCliRaw(`lambda update-function-configuration --function-name "${functionName}" --layers ${arnsStr}`);
        return { success: true };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

// ============================================================================
// Display Functions
// ============================================================================

function printHeader() {
    console.log('');
    log('============================================================================', 'cyan');
    log('                    UPDATE LAMBDA LAYERS', 'cyan');
    log('============================================================================', 'cyan');
    log(`  Region:          ${REGION}`, 'white');
    log(`  Function Prefix: ${FUNCTION_PREFIX}`, 'white');
    if (config.filter) log(`  Filter:          ${config.filter}`, 'white');
    log(`  Dry Run:         ${config.dryRun ? 'YES' : 'NO'}`, config.dryRun ? 'yellow' : 'white');
    log('============================================================================', 'cyan');
    console.log('');
}

function printFunctionLayers(functionName, layers, index, total) {
    log(`  [${index}/${total}] ${functionName}`, 'cyan');
    if (layers.length === 0) {
        log('         (sin capas)', 'gray');
    } else {
        for (const layer of layers) {
            log(`         ${layer.name}:${layer.version}`, 'white');
        }
    }
}

function printSummary() {
    console.log('');
    log('============================================================================', 'cyan');
    log('                             RESUMEN', 'cyan');
    log('============================================================================', 'cyan');
    log(`  Actualizadas:    ${successCount}`, successCount > 0 ? 'green' : 'white');
    log(`  Sin cambios:     ${noChangeCount}`, 'white');
    log(`  Omitidas:        ${skippedCount}`, skippedCount > 0 ? 'yellow' : 'white');
    log(`  Fallidas:        ${failCount}`, failCount > 0 ? 'red' : 'white');

    if (updatedFunctions.length > 0) {
        console.log('');
        log('  Funciones actualizadas:', 'green');
        for (const fn of updatedFunctions) {
            log(`    - ${fn}`, 'green');
        }
    }

    if (failedFunctions.length > 0) {
        console.log('');
        log('  Funciones con error:', 'red');
        for (const { name, error } of failedFunctions) {
            log(`    - ${name}: ${error}`, 'red');
        }
    }

    log('============================================================================', 'cyan');
    console.log('');
}

// ============================================================================
// Interactive Layer Version Input
// ============================================================================

async function promptNewLayerVersions(discoveredLayers) {
    const rl = createReadlineInterface();
    const newVersions = {};

    console.log('');
    log('============================================================================', 'yellow');
    log('          ESPECIFICAR NUEVAS VERSIONES DE CAPAS', 'yellow');
    log('============================================================================', 'yellow');
    console.log('');

    log('Capas detectadas en las funciones:', 'white');
    console.log('');

    const layerNames = [...new Set(discoveredLayers)].sort();

    for (const layerName of layerNames) {
        const latestVersion = getLatestLayerVersion(layerName);
        const latestStr = latestVersion !== null ? ` (ultima disponible: ${latestVersion})` : '';

        const answer = await askQuestion(rl,
            `${colors.cyan}  ${layerName}${colors.gray}${latestStr}${colors.reset}\n` +
            `${colors.gray}  Nueva version (Enter para omitir): ${colors.reset}`
        );

        if (answer && !isNaN(parseInt(answer, 10))) {
            newVersions[layerName] = parseInt(answer, 10);
        }
        console.log('');
    }

    rl.close();
    return newVersions;
}

function parseLayersArg(layersStr) {
    const newVersions = {};
    const pairs = layersStr.split(',').filter(p => p.trim());
    for (const pair of pairs) {
        const [name, versionStr] = pair.split(':');
        if (name && versionStr && !isNaN(parseInt(versionStr, 10))) {
            newVersions[name.trim()] = parseInt(versionStr.trim(), 10);
        }
    }
    return newVersions;
}

// ============================================================================
// Confirmation
// ============================================================================

async function confirmExecution(functionsToUpdate, newVersions) {
    console.log('');
    log('============================================================================', 'yellow');
    log('          CAMBIOS PLANIFICADOS', 'yellow');
    log('============================================================================', 'yellow');
    console.log('');

    log('  Nuevas versiones a aplicar:', 'white');
    for (const [layerName, version] of Object.entries(newVersions)) {
        log(`    ${layerName} -> ${version}`, 'green');
    }
    console.log('');

    let changeCount = 0;
    for (const { functionName, currentLayers, newLayerArns, changes } of functionsToUpdate) {
        if (changes.length === 0) continue;
        changeCount++;
        log(`  ${functionName}`, 'cyan');
        for (const change of changes) {
            log(`    ${change.layerName}: ${change.oldVersion} -> ${change.newVersion}`, 'yellow');
        }
    }

    if (changeCount === 0) {
        log('  No hay cambios que aplicar. Todas las funciones ya tienen las versiones especificadas.', 'green');
        return false;
    }

    console.log('');
    log(`  Total de funciones a actualizar: ${changeCount}`, 'white');
    console.log('');

    if (config.dryRun) {
        log('  [DRY-RUN] No se aplicaron cambios.', 'yellow');
        return false;
    }

    if (config.yes) return true;

    const rl = createReadlineInterface();
    const answer = await askQuestion(rl,
        `${colors.yellow}  ¿Deseas continuar con la actualizacion? (s/N): ${colors.reset}`
    );
    rl.close();

    return answer.toLowerCase() === 's' || answer.toLowerCase() === 'si' || answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes';
}

// ============================================================================
// Main
// ============================================================================

async function main() {
    if (config.help) {
        showHelp();
        process.exit(0);
    }

    printHeader();

    // Step 1: Get AWS Account ID
    log('[1/5] Obteniendo Account ID de AWS...', 'blue');
    let accountId;
    try {
        accountId = getAccountId();
        log(`  Account ID: ${accountId}`, 'green');
    } catch (error) {
        log(`  ${error.message}`, 'red');
        process.exit(1);
    }
    console.log('');

    // Step 2: List Lambda functions
    log('[2/5] Listando funciones Lambda...', 'blue');
    let functions;
    try {
        functions = listLambdaFunctions();
    } catch (error) {
        log(`  Error listando funciones: ${error.message}`, 'red');
        process.exit(1);
    }

    if (config.filter) {
        functions = functions.filter(fn => fn.toLowerCase().includes(config.filter.toLowerCase()));
        log(`  Filtradas por "${config.filter}": ${functions.length} funciones`, 'yellow');
    } else {
        log(`  Total de funciones encontradas: ${functions.length}`, 'green');
    }

    if (functions.length === 0) {
        log('  No se encontraron funciones Lambda.', 'yellow');
        process.exit(0);
    }
    console.log('');

    // Step 3: Get current layers for each function
    log('[3/5] Obteniendo capas actuales de cada funcion...', 'blue');
    console.log('');

    const functionsData = [];
    const allDiscoveredLayers = [];

    for (let i = 0; i < functions.length; i++) {
        const functionName = functions[i];
        const layers = getFunctionLayers(functionName);
        functionsData.push({ functionName, layers });
        for (const layer of layers) {
            if (!allDiscoveredLayers.includes(layer.name)) {
                allDiscoveredLayers.push(layer.name);
            }
        }
        printFunctionLayers(functionName, layers, i + 1, functions.length);
    }

    console.log('');
    log('----------------------------------------------------------------------------', 'gray');
    log(`  Capas unicas encontradas: ${allDiscoveredLayers.sort().join(', ')}`, 'white');
    log('----------------------------------------------------------------------------', 'gray');

    if (config.listOnly) {
        console.log('');
        log('  [LIST-ONLY] Finalizando sin realizar cambios.', 'yellow');
        console.log('');
        process.exit(0);
    }

    // Step 4: Get new layer versions
    log('', 'white');
    log('[4/5] Determinando nuevas versiones de capas...', 'blue');

    let newVersions;
    if (config.layers) {
        newVersions = parseLayersArg(config.layers);
        log('  Versiones especificadas por parametro:', 'white');
        for (const [name, ver] of Object.entries(newVersions)) {
            log(`    ${name}: ${ver}`, 'green');
        }
    } else {
        newVersions = await promptNewLayerVersions(allDiscoveredLayers);
    }

    if (Object.keys(newVersions).length === 0) {
        log('  No se especificaron nuevas versiones. Saliendo.', 'yellow');
        process.exit(0);
    }

    // Step 5: Calculate changes and update
    log('', 'white');
    log('[5/5] Calculando y aplicando cambios...', 'blue');
    console.log('');

    const functionsToUpdate = functionsData.map(({ functionName, layers }) => {
        const changes = [];
        const newLayerArns = layers.map(layer => {
            if (newVersions[layer.name] !== undefined && newVersions[layer.name] !== layer.version) {
                changes.push({
                    layerName: layer.name,
                    oldVersion: layer.version,
                    newVersion: newVersions[layer.name]
                });
                return buildLayerArn(accountId, layer.name, newVersions[layer.name]);
            }
            return layer.arn;
        });

        return { functionName, currentLayers: layers, newLayerArns, changes };
    });

    const shouldProceed = await confirmExecution(functionsToUpdate, newVersions);

    if (!shouldProceed) {
        if (!config.dryRun) {
            log('  Operacion cancelada por el usuario.', 'yellow');
        }
        console.log('');
        process.exit(0);
    }

    // Execute updates
    console.log('');
    log('============================================================================', 'green');
    log('          EJECUTANDO ACTUALIZACIONES', 'green');
    log('============================================================================', 'green');
    console.log('');

    for (let i = 0; i < functionsToUpdate.length; i++) {
        const { functionName, currentLayers, newLayerArns, changes } = functionsToUpdate[i];

        if (changes.length === 0) {
            log(`  [${i + 1}/${functionsToUpdate.length}] ${functionName} - Sin cambios`, 'gray');
            noChangeCount++;
            continue;
        }

        if (currentLayers.length === 0) {
            log(`  [${i + 1}/${functionsToUpdate.length}] ${functionName} - Sin capas, omitida`, 'gray');
            skippedCount++;
            continue;
        }

        log(`  [${i + 1}/${functionsToUpdate.length}] ${functionName}`, 'cyan');
        for (const change of changes) {
            log(`    ${change.layerName}: ${change.oldVersion} -> ${change.newVersion}`, 'yellow');
        }

        const result = updateFunctionLayers(functionName, newLayerArns);
        if (result.success) {
            log(`    [OK] Actualizada correctamente`, 'green');
            successCount++;
            updatedFunctions.push(functionName);
        } else {
            log(`    [ERROR] ${result.error}`, 'red');
            failCount++;
            failedFunctions.push({ name: functionName, error: result.error });
        }

        // Small delay to avoid throttling
        if (i < functionsToUpdate.length - 1) {
            await new Promise(resolve => setTimeout(resolve, 300));
        }
    }

    printSummary();

    process.exit(failCount > 0 ? 1 : 0);
}

// ============================================================================
// Entry Point
// ============================================================================

main().catch(error => {
    log(`\nError inesperado: ${error.message}`, 'red');
    process.exit(1);
});
