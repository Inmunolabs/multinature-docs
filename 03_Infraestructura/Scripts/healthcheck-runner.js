#!/usr/bin/env node

/**
 * Script to run all healthcheck endpoints from Bruno collection files
 * Usage: node healthcheck-runner.js [environment]
 * Example: node healthcheck-runner.js local
 *          node healthcheck-runner.js dev
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  gray: '\x1b[90m',
};

/**
 * Parse environment variables from Bruno environment file
 */
function parseEnvironmentFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const vars = {};
  
  // Extract vars section - improved to handle nested braces
  const varsStart = content.indexOf('vars {');
  if (varsStart === -1) {
    return vars;
  }
  
  // Find the matching closing brace
  let braceCount = 0;
  let varsEnd = varsStart;
  for (let i = varsStart; i < content.length; i++) {
    if (content[i] === '{') braceCount++;
    if (content[i] === '}') {
      braceCount--;
      if (braceCount === 0) {
        varsEnd = i;
        break;
      }
    }
  }
  
  const varsContent = content.substring(varsStart + 6, varsEnd); // +6 for "vars {"
  const lines = varsContent.split('\n');
  
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('//')) {
      // Match key: value (value can be empty)
      const match = trimmed.match(/(\w+):\s*(.*)/);
      if (match) {
        const [, key, value] = match;
        vars[key] = value.trim();
      }
    }
  }
  
  return vars;
}

/**
 * Parse Bruno .bru file to extract HTTP method and URL
 */
function parseBrunoFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  
  // Extract method (get, post, etc.) - improved to handle nested braces
  const methodMatch = content.match(/(get|post|put|delete|patch)\s*\{/s);
  if (!methodMatch) {
    return null;
  }
  
  const method = methodMatch[1].toUpperCase();
  const methodStart = methodMatch.index + methodMatch[0].length;
  
  // Find the matching closing brace for the method block
  let braceCount = 1;
  let methodEnd = methodStart;
  for (let i = methodStart; i < content.length && braceCount > 0; i++) {
    if (content[i] === '{') braceCount++;
    if (content[i] === '}') braceCount--;
    if (braceCount === 0) {
      methodEnd = i;
      break;
    }
  }
  
  if (braceCount !== 0) {
    // Didn't find matching closing brace
    return null;
  }
  
  const methodContent = content.substring(methodStart, methodEnd);
  
  // Extract URL - find the line that starts with "url:" and capture everything after it
  const lines = methodContent.split(/\r?\n/);
  let url = null;
  
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith('url:')) {
      // Extract everything after "url:"
      const urlMatch = trimmed.match(/url:\s*(.+)/);
      if (urlMatch) {
        url = urlMatch[1].trim();
        break;
      }
    }
  }
  
  if (!url) {
    return null;
  }
  
  return { method, url };
}

/**
 * Replace environment variables in URL
 */
function replaceVariables(url, envVars) {
  let result = url;
  const variableRegex = /\{\{(\w+)\}\}/g;
  
  result = result.replace(variableRegex, (match, varName) => {
    if (envVars[varName]) {
      return envVars[varName];
    }
    return match; // Keep original if variable not found
  });
  
  return result;
}

/**
 * Make HTTP request
 */
function makeRequest(url, method = 'GET', timeout = 5000) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const protocol = urlObj.protocol === 'https:' ? https : http;
    
    const options = {
      hostname: urlObj.hostname,
      port: urlObj.port || (urlObj.protocol === 'https:' ? 443 : 80),
      path: urlObj.pathname + urlObj.search,
      method: method,
      timeout: timeout,
      headers: {
        'User-Agent': 'Healthcheck-Runner/1.0',
      },
    };
    
    const req = protocol.request(options, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          statusMessage: res.statusMessage,
          headers: res.headers,
          body: data,
          success: res.statusCode >= 200 && res.statusCode < 300,
        });
      });
    });
    
    req.on('error', (error) => {
      reject(error);
    });
    
    req.on('timeout', () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });
    
    req.end();
  });
}

/**
 * Find all healthcheck files recursively
 */
function findHealthcheckFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      findHealthcheckFiles(filePath, fileList);
    } else if (file.match(/.*[Hh]ealthcheck.*\.bru$/)) {
      fileList.push(filePath);
    }
  }
  
  return fileList;
}

/**
 * Format service name from file path
 */
function getServiceName(filePath, collectionRoot) {
  const relativePath = path.relative(collectionRoot, filePath);
  const parts = relativePath.split(path.sep);
  // Get the folder name (usually the service name)
  const folderIndex = parts.findIndex(p => p.includes('Healthcheck') || p.includes('healthcheck'));
  if (folderIndex > 0) {
    return parts[folderIndex - 1];
  }
  return path.basename(filePath, '.bru');
}

/**
 * Find api-collection root directory
 * Works from docs/ or from api-collection/scripts/
 */
function findCollectionRoot() {
  let currentDir = __dirname;
  
  // If we're in docs/03_Infraestructura/Scripts/, go up to backend root
  if (path.basename(currentDir) === 'Scripts') {
    // Go up: Scripts -> 03_Infraestructura -> docs -> backend
    const backendRoot = path.join(currentDir, '..', '..', '..');
    const apiCollectionPath = path.join(backendRoot, 'api-collection');
    if (fs.existsSync(path.join(apiCollectionPath, 'bruno.json'))) {
      return apiCollectionPath;
    }
  }
  
  // If we're in scripts folder (api-collection/scripts), go up one level
  if (path.basename(currentDir) === 'scripts') {
    return path.join(currentDir, '..');
  }
  
  // Otherwise, try to find api-collection folder
  while (currentDir !== path.dirname(currentDir)) {
    const brunoJson = path.join(currentDir, 'bruno.json');
    if (fs.existsSync(brunoJson)) {
      return currentDir;
    }
    currentDir = path.dirname(currentDir);
  }
  
  // Fallback: try relative to backend root
  const backendRoot = path.join(__dirname, '..', '..', '..');
  const apiCollectionPath = path.join(backendRoot, 'api-collection');
  if (fs.existsSync(path.join(apiCollectionPath, 'bruno.json'))) {
    return apiCollectionPath;
  }
  
  // Last fallback
  return path.join(__dirname, '..', '..', '..', 'api-collection');
}

/**
 * Main function
 */
async function main() {
  const environment = process.argv[2] || 'local';
  const collectionPath = findCollectionRoot();
  const envFile = path.join(collectionPath, 'environments', `multi-${environment}.bru`);
  
  // Check if environment file exists
  if (!fs.existsSync(envFile)) {
    console.error(`${colors.red}Error: Environment file not found: ${envFile}${colors.reset}`);
    console.log(`${colors.yellow}Available environments: local, dev, prod${colors.reset}`);
    process.exit(1);
  }
  
  // Load environment variables
  console.log(`${colors.cyan}Loading environment: ${environment}${colors.reset}`);
  const envVars = parseEnvironmentFile(envFile);
  const loadedCount = Object.keys(envVars).length;
  const emptyVars = Object.entries(envVars).filter(([key, value]) => !value || value.trim() === '').map(([key]) => key);
  
  console.log(`${colors.gray}Loaded ${loadedCount} environment variables${colors.reset}`);
  if (emptyVars.length > 0) {
    console.log(`${colors.yellow}Warning: ${emptyVars.length} empty variable(s): ${emptyVars.join(', ')}${colors.reset}`);
  }
  console.log(); // Empty line
  
  // Find all healthcheck files
  const healthcheckFiles = findHealthcheckFiles(collectionPath);
  
  if (healthcheckFiles.length === 0) {
    console.error(`${colors.red}No healthcheck files found${colors.reset}`);
    process.exit(1);
  }
  
  console.log(`${colors.blue}Found ${healthcheckFiles.length} healthcheck endpoints${colors.reset}\n`);
  console.log(`${colors.cyan}${'='.repeat(80)}${colors.reset}`);
  
  const results = [];
  
  // Process each healthcheck file
  for (const filePath of healthcheckFiles) {
    const serviceName = getServiceName(filePath, collectionPath);
    const parsed = parseBrunoFile(filePath);
    
    if (!parsed) {
      console.log(`${colors.yellow}⚠  ${serviceName.padEnd(30)} ${colors.gray}Failed to parse file${colors.reset}`);
      results.push({
        service: serviceName,
        status: 'ERROR',
        message: 'Failed to parse file',
      });
      continue;
    }
    
    const url = replaceVariables(parsed.url, envVars);
    
    // Check for unresolved variables (including partial ones)
    if (url.includes('{{') || url.match(/\{\{[^}]+\}/)) {
      // Find which variables are missing
      const missingVars = [];
      const variableRegex = /\{\{(\w+)\}\}/g;
      let match;
      while ((match = variableRegex.exec(parsed.url)) !== null) {
        if (!envVars[match[1]] || envVars[match[1]].trim() === '') {
          missingVars.push(match[1]);
        }
      }
      
      const missingMsg = missingVars.length > 0 
        ? `Missing variables: ${missingVars.join(', ')}` 
        : 'Missing or empty environment variables';
      
      console.log(`${colors.yellow}⚠  ${serviceName.padEnd(30)} ${colors.gray}${missingMsg} - URL: ${parsed.url}${colors.reset}`);
      results.push({
        service: serviceName,
        status: 'ERROR',
        message: missingMsg,
        url: parsed.url,
      });
      continue;
    }
    
    try {
      process.stdout.write(`${colors.cyan}→  ${serviceName.padEnd(30)} ${colors.gray}${url}${colors.reset} ... `);
      
      const response = await makeRequest(url, parsed.method);
      
      if (response.success) {
        console.log(`${colors.green}✓ OK (${response.statusCode})${colors.reset}`);
        results.push({
          service: serviceName,
          status: 'SUCCESS',
          statusCode: response.statusCode,
          url: url,
        });
      } else {
        console.log(`${colors.yellow}⚠ ${response.statusCode} ${response.statusMessage}${colors.reset}`);
        results.push({
          service: serviceName,
          status: 'WARNING',
          statusCode: response.statusCode,
          url: url,
        });
      }
    } catch (error) {
      console.log(`${colors.red}✗ ERROR: ${error.message}${colors.reset}`);
      results.push({
        service: serviceName,
        status: 'ERROR',
        message: error.message,
        url: url,
      });
    }
  }
  
  // Summary
  console.log(`${colors.cyan}${'='.repeat(80)}${colors.reset}\n`);
  console.log(`${colors.blue}Summary:${colors.reset}`);
  
  const successCount = results.filter(r => r.status === 'SUCCESS').length;
  const warningCount = results.filter(r => r.status === 'WARNING').length;
  const errorCount = results.filter(r => r.status === 'ERROR').length;
  
  console.log(`${colors.green}  ✓ Success: ${successCount}${colors.reset}`);
  console.log(`${colors.yellow}  ⚠ Warnings: ${warningCount}${colors.reset}`);
  console.log(`${colors.red}  ✗ Errors: ${errorCount}${colors.reset}`);
  
  // Exit with error code if there are failures
  if (errorCount > 0 || warningCount > 0) {
    process.exit(1);
  }
}

// Run the script
main().catch((error) => {
  console.error(`${colors.red}Unexpected error: ${error.message}${colors.reset}`);
  process.exit(1);
});

