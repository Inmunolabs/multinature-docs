#!/usr/bin/env node
// ============================================================================
// Script: commit-and-push.js
// Description: Commit and push changes to multiple Git repositories (APIs and/or Layers)
// Usage: node commit-and-push.js [options]
// ============================================================================

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const readline = require('readline');

// ============================================================================
// Configuration
// ============================================================================

// Parse command line arguments
const args = process.argv.slice(2);
const config = {
    message: getArgValue('--message') || getArgValue('-m') || '',
    pullBranch: getArgValue('--pull') || 'develop',
    pushBranch: getArgValue('--push') || '',
    process: getArgValue('--process') || '', // apis, layers, both
    excludeApis: (getArgValue('--exclude-apis') || '').split(',').filter(r => r.trim()).map(r => r.trim()),
    excludeLayers: (getArgValue('--exclude-layers') || '').split(',').filter(r => r.trim()).map(r => r.trim()),
    yes: args.includes('--yes') || args.includes('-y'),
    help: args.includes('--help') || args.includes('-h')
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
    white: '\x1b[37m'
};

function log(message, color = 'white') {
    console.log(`${colors[color] || colors.white}${message}${colors.reset}`);
}

// ============================================================================
// Statistics
// ============================================================================
let successCount = 0;
let failCount = 0;
let skippedCount = 0;
let noChangesCount = 0;

// ============================================================================
// Helper Functions
// ============================================================================

function showHelp() {
    console.log(`
============================================================================
                    GIT COMMIT AND PUSH SCRIPT
============================================================================

USAGE:
  node commit-and-push.js [OPTIONS]

OPTIONS:
  -m, --message=MSG            Commit message (required, or will prompt)

  --pull=BRANCH                Source branch to pull from (default: develop)

  --push=BRANCH                Destination branch to push to (default: same as pull)

  --process=TYPE               What to process: apis, layers, or both
                               If not provided, will prompt interactively

  --exclude-apis=REPOS         Comma-separated list of APIs to exclude
                               Example: --exclude-apis=bookings-api,users-api

  --exclude-layers=REPOS       Comma-separated list of Layers to exclude
                               Example: --exclude-layers=multi-commons-layer

  -y, --yes                    Skip confirmation prompt

  --help, -h                   Show this help message

EXAMPLES:
  node commit-and-push.js
    Interactive mode - prompts for all options

  node commit-and-push.js -m="Fix bug" --process=apis
    Commit and push to all APIs with message "Fix bug"

  node commit-and-push.js -m="Update" --process=both --exclude-apis=bookings-api
    Process both APIs and Layers, excluding bookings-api

  node commit-and-push.js -m="Release" --pull=develop --push=main --yes
    Non-interactive mode with custom branches

============================================================================
`);
}

function findBackendRoot() {
    let currentDir = __dirname;
    
    // Go up from docs/03_Infraestructura/Scripts to backend root
    for (let i = 0; i < 5; i++) {
        if (fs.existsSync(path.join(currentDir, 'apis')) || fs.existsSync(path.join(currentDir, 'layers'))) {
            return currentDir;
        }
        currentDir = path.dirname(currentDir);
    }
    
    return process.cwd();
}

function getDirectories(dirPath) {
    if (!fs.existsSync(dirPath)) return [];
    return fs.readdirSync(dirPath, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name);
}

function execGit(command, cwd, silent = false) {
    try {
        return { 
            success: true, 
            output: execSync(command, { cwd, encoding: 'utf8', stdio: silent ? ['pipe', 'pipe', 'pipe'] : 'inherit' })
        };
    } catch (error) {
        return { 
            success: false, 
            error: error.message,
            output: error.stdout || error.stderr || ''
        };
    }
}

function execGitSilent(command, cwd) {
    try {
        return execSync(command, { cwd, encoding: 'utf8', stdio: ['pipe', 'pipe', 'pipe'] }).trim();
    } catch (error) {
        return null;
    }
}

function isRepoExcluded(repoName, excludeList) {
    return excludeList.some(excluded => excluded.toLowerCase() === repoName.toLowerCase());
}

// ============================================================================
// Interactive Input
// ============================================================================

function createReadlineInterface() {
    return readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
}

function askQuestion(rl, question) {
    return new Promise(resolve => {
        rl.question(question, answer => resolve(answer));
    });
}

async function interactiveConfig(backendRoot) {
    const rl = createReadlineInterface();
    
    log('\n================================================================================', 'cyan');
    log('                    Git Commit and Push Script', 'cyan');
    log('================================================================================\n', 'cyan');
    
    // Commit message
    if (!config.message) {
        config.message = await askQuestion(rl, 'Enter commit message: ');
        if (!config.message.trim()) {
            log('Error: Commit message cannot be empty.', 'red');
            rl.close();
            process.exit(1);
        }
    }
    
    // Pull branch
    if (!getArgValue('--pull')) {
        const pullInput = await askQuestion(rl, 'Enter source branch (pull branch) (default: develop): ');
        config.pullBranch = pullInput.trim() || 'develop';
    }
    
    // Push branch
    if (!config.pushBranch) {
        const pushInput = await askQuestion(rl, `Enter destination branch (push branch) (default: ${config.pullBranch}): `);
        config.pushBranch = pushInput.trim() || config.pullBranch;
    }
    
    // What to process
    if (!config.process) {
        log('\nWhat do you want to process?', 'white');
        log('[1] APIs only', 'white');
        log('[2] Layers only', 'white');
        log('[3] Both APIs and Layers', 'white');
        const choiceInput = await askQuestion(rl, 'Enter your choice (1-3, default: 1): ');
        const choice = choiceInput.trim() || '1';
        
        if (choice === '2') {
            config.process = 'layers';
        } else if (choice === '3') {
            config.process = 'both';
        } else {
            config.process = 'apis';
        }
    }
    
    // Exclusion selection for APIs
    if ((config.process === 'apis' || config.process === 'both') && config.excludeApis.length === 0) {
        log('\n================================================================================', 'cyan');
        log('Available APIs:', 'cyan');
        log('================================================================================', 'cyan');
        
        const apisPath = path.join(backendRoot, 'apis');
        const apis = getDirectories(apisPath);
        apis.forEach((api, index) => {
            log(`  [${index + 1}] ${api}`, 'white');
        });
        
        log('\nEnter the names of APIs to EXCLUDE (comma-separated, or press Enter to include all):', 'yellow');
        log('Example: bookings-api,users-api', 'gray');
        const excludeInput = await askQuestion(rl, 'APIs to exclude: ');
        
        if (excludeInput.trim()) {
            config.excludeApis = excludeInput.split(',').map(r => r.trim()).filter(r => r);
        }
    }
    
    // Exclusion selection for Layers
    if ((config.process === 'layers' || config.process === 'both') && config.excludeLayers.length === 0) {
        log('\n================================================================================', 'cyan');
        log('Available Layers:', 'cyan');
        log('================================================================================', 'cyan');
        
        const layersPath = path.join(backendRoot, 'layers');
        const layers = getDirectories(layersPath);
        layers.forEach((layer, index) => {
            log(`  [${index + 1}] ${layer}`, 'white');
        });
        
        log('\nEnter the names of Layers to EXCLUDE (comma-separated, or press Enter to include all):', 'yellow');
        log('Example: multi-commons-layer,multi-mysql-layer', 'gray');
        const excludeInput = await askQuestion(rl, 'Layers to exclude: ');
        
        if (excludeInput.trim()) {
            config.excludeLayers = excludeInput.split(',').map(r => r.trim()).filter(r => r);
        }
    }
    
    // Show configuration
    log('\n================================================================================', 'cyan');
    log('Configuration:', 'cyan');
    log(`  Commit message: ${config.message}`, 'white');
    log(`  Source branch:  ${config.pullBranch}`, 'white');
    log(`  Destination branch: ${config.pushBranch}`, 'white');
    log(`  Remote: origin`, 'white');
    log(`  Process:`, 'white');
    if (config.process === 'apis') log('    - APIs only', 'white');
    if (config.process === 'layers') log('    - Layers only', 'white');
    if (config.process === 'both') log('    - Both APIs and Layers', 'white');
    if (config.excludeApis.length > 0) log(`  Excluded APIs: ${config.excludeApis.join(', ')}`, 'yellow');
    if (config.excludeLayers.length > 0) log(`  Excluded Layers: ${config.excludeLayers.join(', ')}`, 'yellow');
    log('================================================================================\n', 'cyan');
    
    // Confirmation
    if (!config.yes) {
        const confirm = await askQuestion(rl, 'Do you want to proceed? (Y/N, default: N): ');
        if (confirm.toLowerCase() !== 'y') {
            log('Operation cancelled.', 'yellow');
            rl.close();
            process.exit(0);
        }
    }
    
    rl.close();
}

// ============================================================================
// Process Repository
// ============================================================================

function processRepository(repoPath, repoName) {
    log(`\n=============================== Updating ${repoName} ===============================`, 'cyan');
    
    // Check if it's a git repository
    if (!fs.existsSync(path.join(repoPath, '.git'))) {
        log(`Warning: ${repoName} is not a git repository, skipping...`, 'yellow');
        skippedCount++;
        return;
    }
    
    // Checkout branch
    log(`  Checking out ${config.pushBranch}...`, 'gray');
    let result = execGitSilent(`git checkout ${config.pushBranch}`, repoPath);
    if (result === null) {
        // Try to create the branch
        log(`  Branch doesn't exist, creating ${config.pushBranch}...`, 'gray');
        execGitSilent(`git checkout -b ${config.pushBranch}`, repoPath);
    }
    
    // Pull from remote
    log(`  Pulling from origin/${config.pullBranch}...`, 'gray');
    execGitSilent(`git pull origin ${config.pullBranch}`, repoPath);
    
    // Add all changes
    log(`  Staging changes...`, 'gray');
    execGitSilent('git add .', repoPath);
    
    // Commit
    log(`  Committing...`, 'gray');
    result = execGitSilent(`git commit -m "${config.message.replace(/"/g, '\\"')}"`, repoPath);
    
    if (result === null) {
        // Check if there were changes to commit
        const status = execGitSilent('git status --porcelain', repoPath);
        if (!status || status.trim() === '') {
            log(`  No changes to commit in ${repoName}`, 'yellow');
            noChangesCount++;
            return;
        } else {
            log(`  Commit failed for ${repoName}`, 'red');
            failCount++;
            return;
        }
    }
    
    // Push
    log(`  Pushing to origin/${config.pushBranch}...`, 'gray');
    const pushResult = execGit(`git push origin ${config.pushBranch}`, repoPath, true);
    
    if (pushResult.success) {
        log(`  Successfully updated ${repoName}`, 'green');
        successCount++;
    } else {
        log(`  Push failed for ${repoName}: ${pushResult.error}`, 'red');
        failCount++;
    }
}

// ============================================================================
// Main Execution
// ============================================================================

async function main() {
    // Show help if requested
    if (config.help) {
        showHelp();
        process.exit(0);
    }
    
    // Find backend root
    const backendRoot = findBackendRoot();
    
    // Interactive configuration if needed
    await interactiveConfig(backendRoot);
    
    log('\nStarting process...\n', 'cyan');
    
    // Process Layers
    if (config.process === 'layers' || config.process === 'both') {
        log('::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::', 'cyan');
        log('::::::::::::::::::::::::::::::: Updating Layers ::::::::::::::::::::::::::::::::', 'cyan');
        log('::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::', 'cyan');
        
        const layersPath = path.join(backendRoot, 'layers');
        if (fs.existsSync(layersPath)) {
            for (const layer of getDirectories(layersPath)) {
                if (isRepoExcluded(layer, config.excludeLayers)) {
                    log(`\n=============================== SKIPPING ${layer} ===============================`, 'gray');
                    log('  (Excluded by user)', 'yellow');
                    skippedCount++;
                } else {
                    processRepository(path.join(layersPath, layer), layer);
                }
            }
        } else {
            log('[WARNING] layers directory not found!', 'yellow');
        }
    }
    
    // Process APIs
    if (config.process === 'apis' || config.process === 'both') {
        log('\n::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::', 'cyan');
        log(':::::::::::::::::::::::::::::::: Updating APIs :::::::::::::::::::::::::::::::::', 'cyan');
        log('::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::', 'cyan');
        
        const apisPath = path.join(backendRoot, 'apis');
        if (fs.existsSync(apisPath)) {
            for (const api of getDirectories(apisPath)) {
                if (isRepoExcluded(api, config.excludeApis)) {
                    log(`\n=============================== SKIPPING ${api} ===============================`, 'gray');
                    log('  (Excluded by user)', 'yellow');
                    skippedCount++;
                } else {
                    processRepository(path.join(apisPath, api), api);
                }
            }
        } else {
            log('[WARNING] apis directory not found!', 'yellow');
        }
    }
    
    // Summary
    log('\n================================================================================', 'cyan');
    log('                             SUMMARY', 'cyan');
    log('================================================================================', 'cyan');
    log(`Successful: ${successCount}`, 'green');
    log(`Failed: ${failCount}`, failCount > 0 ? 'red' : 'gray');
    log(`Skipped: ${skippedCount}`, skippedCount > 0 ? 'yellow' : 'gray');
    log(`No changes: ${noChangesCount}`, noChangesCount > 0 ? 'yellow' : 'gray');
    log('================================================================================', 'cyan');
    log('Process completed!', 'green');
    
    if (failCount > 0) {
        process.exit(1);
    }
}

main().catch(error => {
    log(`[ERROR] ${error.message}`, 'red');
    process.exit(1);
});
