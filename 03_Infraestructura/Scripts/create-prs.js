#!/usr/bin/env node
// ============================================================================
// Script: create-prs.js
// Description: Creates Pull Requests from one branch to another for all Git repositories
// Usage: node create-prs.js [options]
// ============================================================================

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const https = require('https');
const readline = require('readline');

// ============================================================================
// Configuration
// ============================================================================
const GITHUB_API_BASE = 'api.github.com';

// Parse command line arguments
const args = process.argv.slice(2);
const config = {
    dryRun: args.includes('--dry-run'),
    sourceBranch: getArgValue('--source') || 'develop',
    targetBranches: (getArgValue('--target') || 'master main').split(/\s+/),
    title: getArgValue('--title') || '',
    body: getArgValue('--body') || '',
    excludeRepos: (getArgValue('--exclude') || '').split(',').filter(r => r.trim()).map(r => r.trim()),
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
const failedRepos = [];

// ============================================================================
// Helper Functions
// ============================================================================

function showHelp() {
    console.log(`
============================================================================
                    CREATE PULL REQUESTS
============================================================================

USAGE:
  node create-prs.js [OPTIONS]

OPTIONS:
  --dry-run                    Show what would be done without creating PRs

  --title=TITLE                Custom title for the PRs
                               (default: "Merge {source} into {target}")

  --body=BODY                  Custom body/description for the PRs
                               (default: "Automated PR from {source} branch")

  --source=BRANCH              Source branch for the PRs (default: develop)

  --target=BRANCH              Target branch for the PRs (default: master main)

  --exclude=REPOS              Comma-separated list of repositories to exclude
                               If not provided, will prompt interactively
                               Example: --exclude=bookings-api,users-api

  --help, -h                   Show this help message

EXAMPLES:
  node create-prs.js
    Creates PRs from develop to master/main (with interactive exclusion)

  node create-prs.js --dry-run
    Shows what would be done without actually creating PRs

  node create-prs.js --title="Release v1.0.0"
    Creates PRs with custom title

  node create-prs.js --exclude=bookings-api,users-api
    Creates PRs excluding bookings-api and users-api

  node create-prs.js --source=feature/new --target=develop
    Creates PRs from feature/new branch to develop

REQUIREMENTS:
  - GitHub Personal Access Token (GITHUB_TOKEN environment variable)
  - Git repositories configured with GitHub remotes

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

function execGit(command, cwd) {
    try {
        return execSync(command, { cwd, encoding: 'utf8', stdio: ['pipe', 'pipe', 'pipe'] }).trim();
    } catch (error) {
        return null;
    }
}

function getGitHubRepoInfo(repoPath) {
    const remoteUrl = execGit('git remote get-url origin', repoPath);
    if (!remoteUrl) return null;
    
    // Handle both SSH and HTTPS URLs
    // SSH: git@github.com:owner/repo.git
    // HTTPS: https://github.com/owner/repo.git
    const match = remoteUrl.match(/github\.com[:/]([^/]+)\/([^/]+?)(?:\.git)?$/);
    if (match) {
        return { owner: match[1], repo: match[2] };
    }
    return null;
}

function branchExists(repoPath, branchName) {
    const result = execGit(`git rev-parse --verify origin/${branchName}`, repoPath);
    return result !== null;
}

function getTargetBranch(repoPath) {
    for (const branch of config.targetBranches) {
        if (branchExists(repoPath, branch)) {
            return branch;
        }
    }
    return null;
}

function isRepoExcluded(repoName) {
    return config.excludeRepos.some(excluded => excluded.toLowerCase() === repoName.toLowerCase());
}

// ============================================================================
// GitHub API Functions
// ============================================================================

function githubRequest(method, endpoint, data = null) {
    return new Promise((resolve, reject) => {
        const token = process.env.GITHUB_TOKEN;
        
        const options = {
            hostname: GITHUB_API_BASE,
            path: endpoint,
            method: method,
            headers: {
                'Authorization': `token ${token}`,
                'Accept': 'application/vnd.github.v3+json',
                'User-Agent': 'create-prs-script',
                'Content-Type': 'application/json'
            }
        };
        
        const req = https.request(options, (res) => {
            let body = '';
            res.on('data', chunk => body += chunk);
            res.on('end', () => {
                try {
                    const parsed = body ? JSON.parse(body) : {};
                    if (res.statusCode >= 200 && res.statusCode < 300) {
                        resolve({ success: true, data: parsed, statusCode: res.statusCode });
                    } else {
                        resolve({ success: false, error: parsed.message || 'Unknown error', errors: parsed.errors, statusCode: res.statusCode });
                    }
                } catch (e) {
                    resolve({ success: false, error: body || 'Parse error', statusCode: res.statusCode });
                }
            });
        });
        
        req.on('error', (e) => reject(e));
        
        if (data) {
            req.write(JSON.stringify(data));
        }
        req.end();
    });
}

async function checkPRExists(owner, repo, sourceBranch, targetBranch) {
    const endpoint = `/repos/${owner}/${repo}/pulls?head=${owner}:${sourceBranch}&base=${targetBranch}&state=open`;
    const result = await githubRequest('GET', endpoint);
    
    if (result.success && Array.isArray(result.data)) {
        return result.data.length > 0;
    }
    return false;
}

async function createPR(owner, repo, sourceBranch, targetBranch, title, body) {
    const endpoint = `/repos/${owner}/${repo}/pulls`;
    const data = {
        title: title,
        body: body,
        head: sourceBranch,
        base: targetBranch
    };
    
    // Small delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return await githubRequest('POST', endpoint, data);
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

async function interactiveExclusionSelection(backendRoot) {
    const rl = createReadlineInterface();
    
    log('\n============================================================================', 'cyan');
    log('                    REPOSITORY SELECTION', 'cyan');
    log('============================================================================', 'cyan');
    
    const allRepos = [];
    let index = 1;
    
    // List Layers
    log('\nAvailable Layers:', 'yellow');
    log('--------------------------------------------------------------------------------', 'gray');
    const layersPath = path.join(backendRoot, 'layers');
    for (const layer of getDirectories(layersPath)) {
        log(`  [${index}] ${layer}`, 'white');
        allRepos.push(layer);
        index++;
    }
    
    // List APIs
    log('\nAvailable APIs:', 'yellow');
    log('--------------------------------------------------------------------------------', 'gray');
    const apisPath = path.join(backendRoot, 'apis');
    for (const api of getDirectories(apisPath)) {
        log(`  [${index}] ${api}`, 'white');
        allRepos.push(api);
        index++;
    }
    
    // List other repos
    log('\nOther Repositories:', 'yellow');
    log('--------------------------------------------------------------------------------', 'gray');
    if (fs.existsSync(path.join(backendRoot, 'api-collection'))) {
        log(`  [${index}] api-collection`, 'white');
        allRepos.push('api-collection');
        index++;
    }
    if (fs.existsSync(path.join(backendRoot, 'docs'))) {
        log(`  [${index}] docs`, 'white');
        allRepos.push('docs');
        index++;
    }
    
    log('\n--------------------------------------------------------------------------------', 'gray');
    log('Enter the names of repositories to EXCLUDE (comma-separated)', 'yellow');
    log('Press Enter to include ALL repositories', 'gray');
    log('Example: bookings-api,users-api,multi-commons-layer', 'gray');
    log('--------------------------------------------------------------------------------', 'gray');
    
    const excludeInput = await askQuestion(rl, 'Repositories to exclude: ');
    rl.close();
    
    if (excludeInput && excludeInput.trim()) {
        return excludeInput.split(',').map(r => r.trim()).filter(r => r);
    }
    return [];
}

// ============================================================================
// Process Repository
// ============================================================================

async function processRepository(repoPath, repoName) {
    log(`\n----------------------------------------`, 'cyan');
    log(repoName, 'cyan');
    log('----------------------------------------', 'cyan');
    
    // Check if it's a git repository
    if (!fs.existsSync(path.join(repoPath, '.git'))) {
        log('  Status: [SKIP] Not a git repository', 'yellow');
        skippedCount++;
        return;
    }
    
    // Get GitHub repo info
    const repoInfo = getGitHubRepoInfo(repoPath);
    if (!repoInfo) {
        log('  Status: [SKIP] Could not determine GitHub repository', 'yellow');
        skippedCount++;
        return;
    }
    
    log(`  Repository: ${repoInfo.owner}/${repoInfo.repo}`, 'gray');
    
    // Check if source branch exists
    if (!branchExists(repoPath, config.sourceBranch)) {
        log(`  Status: [SKIP] Source branch '${config.sourceBranch}' does not exist`, 'yellow');
        skippedCount++;
        return;
    }
    
    // Get target branch
    const targetBranch = getTargetBranch(repoPath);
    if (!targetBranch) {
        log('  Status: [SKIP] No target branch (master/main) found', 'yellow');
        skippedCount++;
        return;
    }
    
    log(`  Branches: ${config.sourceBranch} -> ${targetBranch}`, 'gray');
    
    // Check if PR already exists
    const prExists = await checkPRExists(repoInfo.owner, repoInfo.repo, config.sourceBranch, targetBranch);
    if (prExists) {
        log('  Status: [SKIP] PR already exists', 'yellow');
        skippedCount++;
        return;
    }
    
    // Generate PR title and body
    const prTitle = config.title || `Merge ${config.sourceBranch} into ${targetBranch}`;
    const prBody = config.body || `Automated PR from ${config.sourceBranch} branch\n\nCreated by create-prs.js script.`;
    
    if (config.dryRun) {
        log('  Status: [DRY-RUN] Would create PR:', 'yellow');
        log(`    Title: ${prTitle}`, 'gray');
        log(`    Body: ${prBody}`, 'gray');
        successCount++;
        return;
    }
    
    // Create PR
    log('  Action: Creating PR...', 'gray');
    const result = await createPR(repoInfo.owner, repoInfo.repo, config.sourceBranch, targetBranch, prTitle, prBody);
    
    if (result.success) {
        log('  Status: [OK] PR created successfully', 'green');
        log(`  URL: ${result.data.html_url}`, 'gray');
        successCount++;
    } else {
        log('  Status: [ERROR] Failed to create PR', 'red');
        log(`  HTTP Status: ${result.statusCode}`, 'red');
        log(`  Error: ${result.error}`, 'red');
        if (result.errors) {
            result.errors.forEach(err => {
                log(`  Detail: ${err.message || err.code}`, 'red');
            });
        }
        failCount++;
        failedRepos.push(`${repoName} (${result.error})`);
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
    
    // Check for GitHub token
    if (!process.env.GITHUB_TOKEN) {
        log('[ERROR] GITHUB_TOKEN environment variable is not set.', 'red');
        log('Please set it with:', 'yellow');
        log('  Windows CMD: set GITHUB_TOKEN=your_token_here', 'yellow');
        log('  Windows PowerShell: $env:GITHUB_TOKEN="your_token_here"', 'yellow');
        log('  Linux/macOS: export GITHUB_TOKEN=your_token_here', 'yellow');
        log('', 'white');
        log('The token must be a GitHub Personal Access Token with "repo" scope.', 'yellow');
        log('Create one at: https://github.com/settings/tokens', 'yellow');
        process.exit(1);
    }
    
    // Validate token format
    const token = process.env.GITHUB_TOKEN;
    if (!token.match(/^gh[pours]_/) && !token.match(/^github_pat_/)) {
        log('[WARNING] Token format doesn\'t look like a valid GitHub token.', 'yellow');
        log('GitHub tokens typically start with "ghp_" for classic tokens.', 'yellow');
    }
    
    // Find backend root
    const backendRoot = findBackendRoot();
    
    // Interactive exclusion selection if not provided
    if (config.excludeRepos.length === 0) {
        config.excludeRepos = await interactiveExclusionSelection(backendRoot);
    }
    
    // Show configuration
    log('\n============================================================================', 'cyan');
    log('                    CREATE PULL REQUESTS', 'cyan');
    log('============================================================================', 'cyan');
    log(`Root Directory: ${backendRoot}`, 'gray');
    log(`Source Branch: ${config.sourceBranch}`, 'gray');
    log(`Target Branches: ${config.targetBranches.join(' ')}`, 'gray');
    log(`Dry Run: ${config.dryRun}`, 'gray');
    if (config.excludeRepos.length > 0) {
        log(`Excluded Repos: ${config.excludeRepos.join(', ')}`, 'yellow');
    }
    log('============================================================================', 'cyan');
    
    // Process Layers
    log('\n[1/4] PROCESSING LAYERS...', 'cyan');
    log('---------------------------------------------------------------------------', 'cyan');
    const layersPath = path.join(backendRoot, 'layers');
    if (fs.existsSync(layersPath)) {
        for (const layer of getDirectories(layersPath)) {
            if (isRepoExcluded(layer)) {
                log(`\n----------------------------------------`, 'gray');
                log(layer, 'gray');
                log('----------------------------------------', 'gray');
                log('  Status: [SKIP] Excluded by user', 'yellow');
                skippedCount++;
            } else {
                await processRepository(path.join(layersPath, layer), layer);
            }
        }
    } else {
        log('[WARNING] layers directory not found!', 'yellow');
    }
    
    // Process APIs
    log('\n[2/4] PROCESSING APIs...', 'cyan');
    log('---------------------------------------------------------------------------', 'cyan');
    const apisPath = path.join(backendRoot, 'apis');
    if (fs.existsSync(apisPath)) {
        for (const api of getDirectories(apisPath)) {
            if (isRepoExcluded(api)) {
                log(`\n----------------------------------------`, 'gray');
                log(api, 'gray');
                log('----------------------------------------', 'gray');
                log('  Status: [SKIP] Excluded by user', 'yellow');
                skippedCount++;
            } else {
                await processRepository(path.join(apisPath, api), api);
            }
        }
    } else {
        log('[WARNING] apis directory not found!', 'yellow');
    }
    
    // Process api-collection
    log('\n[3/4] PROCESSING OTHER REPOSITORIES...', 'cyan');
    log('---------------------------------------------------------------------------', 'cyan');
    const apiCollectionPath = path.join(backendRoot, 'api-collection');
    if (fs.existsSync(apiCollectionPath)) {
        if (isRepoExcluded('api-collection')) {
            log(`\n----------------------------------------`, 'gray');
            log('api-collection', 'gray');
            log('----------------------------------------', 'gray');
            log('  Status: [SKIP] Excluded by user', 'yellow');
            skippedCount++;
        } else {
            await processRepository(apiCollectionPath, 'api-collection');
        }
    } else {
        log('[WARNING] api-collection directory not found!', 'yellow');
    }
    
    // Process docs
    log('\n[4/4] PROCESSING DOCS...', 'cyan');
    log('---------------------------------------------------------------------------', 'cyan');
    const docsPath = path.join(backendRoot, 'docs');
    if (fs.existsSync(docsPath)) {
        if (isRepoExcluded('docs')) {
            log(`\n----------------------------------------`, 'gray');
            log('docs', 'gray');
            log('----------------------------------------', 'gray');
            log('  Status: [SKIP] Excluded by user', 'yellow');
            skippedCount++;
        } else {
            await processRepository(docsPath, 'docs');
        }
    } else {
        log('[WARNING] docs directory not found!', 'yellow');
    }
    
    // Summary
    log('\n============================================================================', 'cyan');
    log('                             SUMMARY', 'cyan');
    log('============================================================================', 'cyan');
    log(`Successful: ${successCount}`, 'green');
    log(`Failed: ${failCount}`, failCount > 0 ? 'red' : 'gray');
    log(`Skipped: ${skippedCount}`, 'yellow');
    log('============================================================================', 'cyan');
    
    if (failCount > 0) {
        log('\n[!] Failed repositories:', 'red');
        failedRepos.forEach(repo => log(`  - ${repo}`, 'red'));
        process.exit(1);
    }
    
    if (successCount === 0 && skippedCount > 0) {
        log('\n[INFO] No PRs were created. All repositories were skipped.', 'yellow');
        log('Possible reasons:', 'yellow');
        log('  - PRs already exist', 'gray');
        log('  - Source or target branches don\'t exist', 'gray');
        log('  - Repository is not a GitHub repository', 'gray');
    }
}

main().catch(error => {
    log(`[ERROR] ${error.message}`, 'red');
    process.exit(1);
});
