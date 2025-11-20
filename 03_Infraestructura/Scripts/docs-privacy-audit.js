#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const DOCS_DIR = path.join(__dirname, '..', 'docs');
const IGNORE_PATTERNS = [
  '.excalidraw',
  '.png',
  '.jpg',
  '.jpeg',
  '.gif',
  '.crswap',
  'node_modules'
];

// Patrones de información sensible
const PATTERNS = {
  // Credenciales y secretos
  passwords: {
    regex: /password[\s]*[=:]\s*["']?([^"'\s]+)["']?/gi,
    severity: 'CRÍTICO',
    description: 'Contraseña en texto plano'
  },
  apiKeys: {
    regex: /api[_\-]?key[\s]*[=:]\s*["']?([A-Za-z0-9\-_]{20,})["']?/gi,
    severity: 'CRÍTICO',
    description: 'API Key expuesta'
  },
  awsKeys: {
    regex: /AKIA[0-9A-Z]{16}/g,
    severity: 'CRÍTICO',
    description: 'AWS Access Key ID'
  },
  privateKeys: {
    regex: /-----BEGIN (RSA |EC )?PRIVATE KEY-----/g,
    severity: 'CRÍTICO',
    description: 'Clave privada'
  },
  jwtTokens: {
    regex: /eyJ[A-Za-z0-9\-_]+\.eyJ[A-Za-z0-9\-_]+\.[A-Za-z0-9\-_]+/g,
    severity: 'CRÍTICO',
    description: 'JWT Token',
    exclude: ['EXAMPLE', 'example', 'DO_NOT_USE', 'DEMO', 'TEST']
  },

  // Información personal identificable (PII)
  emails: {
    regex: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g,
    severity: 'ALTA',
    description: 'Dirección de email',
    exclude: ['example.com', 'test.com', 'domain.com', 'email.com', 'correo.com', 'ejemplo.com', 'demo.com']
  },
  phones: {
    regex: /\b(\+?52\s?)?\d{10}\b/g,
    severity: 'ALTA',
    description: 'Número telefónico (10 dígitos)',
    exclude: ['1234567890', '0000000000', '9999999999', '1111111111']
  },
  mexicanIds: {
    regex: /\b[A-Z]{4}\d{6}[A-Z0-9]{3}\b/g,
    severity: 'ALTA',
    description: 'RFC/CURP mexicano'
  },

  // URLs y dominios reales
  productionUrls: {
    regex: /https?:\/\/(api\.|www\.)?multinature\.(com|mx|net)/gi,
    severity: 'MEDIA',
    description: 'URL de producción'
  },
  ipAddresses: {
    regex: /\b(?:[0-9]{1,3}\.){3}[0-9]{1,3}\b/g,
    severity: 'MEDIA',
    description: 'Dirección IP',
    exclude: ['127.0.0.1', '0.0.0.0', '255.255.255.255', '192.168.', '10.0.', '172.16.']
  },

  // Tokens y sesiones
  sessionIds: {
    regex: /session[_\-]?id[\s]*[=:]\s*["']?([a-f0-9]{32,})["']?/gi,
    severity: 'ALTA',
    description: 'Session ID'
  },
  
  // Información médica sensible (ejemplos reales)
  medicalData: {
    regex: /(paciente|patient)[\s]+[A-Z][a-z]+\s+[A-Z][a-z]+\s+(peso|peso:|diagnóstico|sufre de)/gi,
    severity: 'ALTA',
    description: 'Posible información médica personal'
  }
};

const results = {
  critical: [],
  high: [],
  medium: [],
  low: [],
  totalIssues: 0,
  filesScanned: 0
};

function shouldIgnore(filePath) {
  return IGNORE_PATTERNS.some(pattern => filePath.includes(pattern));
}

function isExcluded(match, excludeList, context) {
  if (!excludeList) return false;
  
  // Verificar exclusiones directas
  if (excludeList.some(excluded => match.toLowerCase().includes(excluded.toLowerCase()))) {
    return true;
  }
  
  // Números en URLs (falso positivo común)
  if (context && /https?:\/\/[^\s]+\d{9,}/i.test(context)) {
    return true;
  }
  
  // Timestamps (números largos que parecen teléfonos)
  if (/created|timestamp|date|time/i.test(context) && match.length > 10) {
    return true;
  }
  
  return false;
}

function analyzeFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const relativePath = path.relative(DOCS_DIR, filePath);
    results.filesScanned++;
    
    const fileIssues = [];

    for (const [patternName, patternConfig] of Object.entries(PATTERNS)) {
      const matches = content.matchAll(patternConfig.regex);
      
      for (const match of matches) {
        const matchedText = match[0];
        
        // Obtener contexto temprano para validación
        const beforeMatch = content.substring(0, match.index);
        const lineNumber = beforeMatch.split('\n').length;
        const lines = content.split('\n');
        const contextLine = lines[lineNumber - 1];
        
        // Excluir matches en lista de exclusión
        if (patternConfig.exclude && isExcluded(matchedText, patternConfig.exclude, contextLine)) {
          continue;
        }

        const issue = {
          file: relativePath,
          line: lineNumber,
          type: patternName,
          severity: patternConfig.severity,
          description: patternConfig.description,
          match: matchedText,
          context: contextLine.trim().substring(0, 100) // Primeros 100 chars
        };

        fileIssues.push(issue);
        results.totalIssues++;

        // Clasificar por severidad
        switch (patternConfig.severity) {
          case 'CRÍTICO':
            results.critical.push(issue);
            break;
          case 'ALTA':
            results.high.push(issue);
            break;
          case 'MEDIA':
            results.medium.push(issue);
            break;
          case 'BAJA':
            results.low.push(issue);
            break;
        }
      }
    }

    return fileIssues;
  } catch (error) {
    console.error(`Error procesando ${filePath}: ${error.message}`);
    return [];
  }
}

function scanDirectory(dirPath) {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    
    if (shouldIgnore(fullPath)) {
      continue;
    }
    
    if (entry.isDirectory()) {
      scanDirectory(fullPath);
    } else if (entry.name.endsWith('.md')) {
      analyzeFile(fullPath);
    }
  }
}

console.log('🔒 AUDITORÍA DE PRIVACIDAD Y SEGURIDAD EN DOCUMENTACIÓN\n');
console.log('='.repeat(70));
console.log('\n🔍 Escaneando documentación en busca de información sensible...\n');

scanDirectory(DOCS_DIR);

console.log('\n' + '='.repeat(70));
console.log('\n📊 RESULTADOS\n');

console.log(`📁 Archivos escaneados: ${results.filesScanned}\n`);
console.log(`⚠️  Total de problemas encontrados: ${results.totalIssues}\n`);

// Problemas CRÍTICOS
if (results.critical.length > 0) {
  console.log(`🚨 PROBLEMAS CRÍTICOS (${results.critical.length}):\n`);
  results.critical.forEach((issue, index) => {
    console.log(`   ${index + 1}. ${issue.description}`);
    console.log(`      📄 Archivo: ${issue.file}:${issue.line}`);
    console.log(`      🔍 Tipo: ${issue.type}`);
    console.log(`      📝 Contexto: ${issue.context}`);
    console.log('');
  });
}

// Problemas ALTA prioridad
if (results.high.length > 0) {
  console.log(`⚠️  PROBLEMAS DE ALTA PRIORIDAD (${results.high.length}):\n`);
  results.high.slice(0, 10).forEach((issue, index) => {
    console.log(`   ${index + 1}. ${issue.description}`);
    console.log(`      📄 ${issue.file}:${issue.line}`);
    console.log(`      📝 ${issue.context.substring(0, 60)}...`);
    console.log('');
  });
  if (results.high.length > 10) {
    console.log(`   ... y ${results.high.length - 10} problemas más\n`);
  }
}

// Problemas MEDIA prioridad
if (results.medium.length > 0) {
  console.log(`ℹ️  PROBLEMAS DE MEDIA PRIORIDAD (${results.medium.length}):\n`);
  results.medium.slice(0, 5).forEach((issue, index) => {
    console.log(`   ${index + 1}. ${issue.description} en ${issue.file}:${issue.line}`);
  });
  if (results.medium.length > 5) {
    console.log(`   ... y ${results.medium.length - 5} problemas más\n`);
  }
}

// Resumen por severidad
console.log('='.repeat(70));
console.log('\n📈 RESUMEN POR SEVERIDAD\n');

console.log(`   🚨 CRÍTICO: ${results.critical.length.toString().padStart(3)}`);
console.log(`   ⚠️  ALTA:    ${results.high.length.toString().padStart(3)}`);
console.log(`   ℹ️  MEDIA:   ${results.medium.length.toString().padStart(3)}`);
console.log(`   ✅ BAJA:    ${results.low.length.toString().padStart(3)}\n`);

// Recomendaciones
console.log('='.repeat(70));
console.log('\n💡 RECOMENDACIONES\n');

if (results.critical.length > 0) {
  console.log(`   🚨 URGENTE: Remover ${results.critical.length} credenciales/secretos inmediatamente`);
  console.log('      - Rotar todas las credenciales expuestas');
  console.log('      - Usar variables de entorno en su lugar');
  console.log('      - Agregar archivos con secretos a .gitignore\n');
}

if (results.high.length > 0) {
  console.log(`   ⚠️  ALTA: Revisar ${results.high.length} casos de información personal`);
  console.log('      - Anonimizar datos reales de usuarios');
  console.log('      - Usar datos de ejemplo ficticios');
  console.log('      - Revisar cumplimiento GDPR/LFPDPPP\n');
}

if (results.medium.length > 0) {
  console.log(`   ℹ️  MEDIA: Validar ${results.medium.length} URLs e IPs de producción`);
  console.log('      - Confirmar que URLs públicas estén correctas');
  console.log('      - Remover IPs internas si existen\n');
}

if (results.totalIssues === 0) {
  console.log('   ✅ No se encontraron problemas de privacidad o seguridad');
  console.log('   ✅ La documentación está limpia de información sensible\n');
}

// Guardar reporte JSON
const report = {
  timestamp: new Date().toISOString(),
  filesScanned: results.filesScanned,
  summary: {
    total: results.totalIssues,
    critical: results.critical.length,
    high: results.high.length,
    medium: results.medium.length,
    low: results.low.length
  },
  issues: {
    critical: results.critical,
    high: results.high,
    medium: results.medium,
    low: results.low
  }
};

const reportPath = path.join(__dirname, '..', 'docs-privacy-audit-report.json');
fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
console.log(`📄 Reporte detallado guardado en: docs-privacy-audit-report.json\n`);

console.log('='.repeat(70));
console.log('\n');

// Exit code según severidad
if (results.critical.length > 0) {
  console.log('🚨 FALLO: Problemas críticos de seguridad encontrados\n');
  process.exit(2);
} else if (results.high.length > 0) {
  console.log('⚠️  ADVERTENCIA: Problemas de alta prioridad encontrados\n');
  process.exit(1);
} else if (results.medium.length > 0) {
  console.log('ℹ️  INFO: Problemas menores encontrados para revisión\n');
  process.exit(0);
} else {
  console.log('✅ ÉXITO: Documentación limpia de información sensible\n');
  process.exit(0);
}

