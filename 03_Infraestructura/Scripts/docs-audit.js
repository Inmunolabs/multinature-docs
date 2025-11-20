#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const DOCS_DB_DIR = path.join(__dirname, '..', 'docs', 'db');
const DB_MODELS_FILE = path.join(__dirname, '..', 'docs', 'DB_MODELS.md');
const ENTITIES_DIR = path.join(__dirname, '..', 'layers', 'multi-mysql-layer', 'src', 'entities');

const issues = [];
const warnings = [];
const info = [];

console.log('🔍 AUDITORÍA DE DOCUMENTACIÓN - MULTINATURE BACKEND\n');
console.log('='.repeat(70));

function checkFileExists(filePath) {
  return fs.existsSync(filePath);
}

function readFile(filePath) {
  try {
    return fs.readFileSync(filePath, 'utf8');
  } catch (err) {
    return null;
  }
}

function listFiles(dirPath, extension = '.md') {
  try {
    return fs
      .readdirSync(dirPath)
      .filter((file) => file.endsWith(extension))
      .filter((file) => file !== 'TEMPLATE_TABLE.md');
  } catch (err) {
    return [];
  }
}

console.log('\n📊 1. VALIDACIÓN DE ESTRUCTURA DE DOCUMENTACIÓN\n');

if (!checkFileExists(DOCS_DB_DIR)) {
  issues.push('❌ Directorio docs/db/ NO existe');
} else {
  info.push('✅ Directorio docs/db/ existe');
}

if (!checkFileExists(DB_MODELS_FILE)) {
  issues.push('❌ Archivo docs/DB_MODELS.md NO existe');
} else {
  info.push('✅ Archivo docs/DB_MODELS.md existe');
}

if (!checkFileExists(ENTITIES_DIR)) {
  warnings.push('⚠️  Directorio de entities NO encontrado en multi-mysql-layer');
} else {
  info.push('✅ Directorio de entities existe');
}

console.log('\n📋 2. ANÁLISIS DE TABLAS DOCUMENTADAS\n');

const dbDocsFiles = listFiles(DOCS_DB_DIR);
const dbModelsContent = readFile(DB_MODELS_FILE);

console.log(`   Total de archivos .md en docs/db/: ${dbDocsFiles.length}`);

if (dbModelsContent) {
  const linkPattern = /- \[([^\]]+)\]\(\.\/db\/([^\)]+)\.md\)/g;
  const linksInDbModels = [];
  let match;

  while ((match = linkPattern.exec(dbModelsContent)) !== null) {
    linksInDbModels.push({
      name: match[1],
      file: match[2] + '.md',
    });
  }

  console.log(`   Total de enlaces en DB_MODELS.md: ${linksInDbModels.length}\n`);

  const filesSet = new Set(dbDocsFiles);
  const linksSet = new Set(linksInDbModels.map((l) => l.file));

  const filesNotInIndex = dbDocsFiles.filter((file) => !linksSet.has(file));
  const linksNotInFiles = linksInDbModels.filter((link) => !filesSet.has(link.file));

  if (filesNotInIndex.length > 0) {
    console.log('   📄 Archivos en docs/db/ NO listados en DB_MODELS.md:');
    filesNotInIndex.forEach((file) => {
      warnings.push(`⚠️  Archivo ${file} no está en DB_MODELS.md`);
      console.log(`      - ${file}`);
    });
  }

  if (linksNotInFiles.length > 0) {
    console.log('\n   🔗 Enlaces en DB_MODELS.md que NO tienen archivo:');
    linksNotInFiles.forEach((link) => {
      issues.push(`❌ Enlace roto: ${link.name} → ${link.file}`);
      console.log(`      - ${link.name} → ${link.file}`);
    });
  }

  if (filesNotInIndex.length === 0 && linksNotInFiles.length === 0) {
    info.push('✅ DB_MODELS.md está sincronizado con docs/db/');
    console.log('   ✅ DB_MODELS.md está sincronizado con docs/db/');
  }
}

function camelToSnakeCase(str) {
  return str
    .replace(/([A-Z])/g, '_$1')
    .toLowerCase()
    .replace(/^_/, '');
}

function pluralize(str) {
  if (str.endsWith('y')) {
    return str.slice(0, -1) + 'ies';
  }
  if (str.endsWith('s') || str.endsWith('x') || str.endsWith('ch')) {
    return str + 'es';
  }
  return str + 's';
}

function generateDocVariations(entityFile) {
  const baseName = entityFile.replace('.js', '');
  const snakeCaseBase = camelToSnakeCase(baseName);

  const variations = [
    `${baseName}.md`,
    `${baseName}s.md`,
    pluralize(baseName) + '.md',
    `${snakeCaseBase}.md`,
    `${snakeCaseBase}s.md`,
    pluralize(snakeCaseBase) + '.md',
    `${baseName.replace(/_/g, '')}.md`,
    `${baseName.toLowerCase()}.md`,
  ];

  const specialMappings = {
    'address.js': 'addresses.md',
    'monthlyPurchase.js': 'monthly_purchases.md',
    'paymentMethod.js': 'payment_methods.md',
    'productReview.js': 'products_reviews.md',
    'servicePayment.js': 'service_payments.md',
    'specialistReview.js': 'specialist_reviews.md',
    'specialistSettings.js': 'specialist_settings.md',
    'supportMaterial.js': 'specialist_support_material.md',
    'taxInformation.js': 'tax_information.md',
    'teamworkReviews.js': 'teamwork_reviews.md',
    'userActionReplacement.js': 'user_action_replacements.md',
    'verficationCode.js': 'verification_codes.md',
    'verificationCode.js': 'verification_codes.md',
    'workingHours.js': 'working_hours.md',
  };

  if (specialMappings[entityFile]) {
    variations.unshift(specialMappings[entityFile]);
  }

  return [...new Set(variations)];
}

console.log('\n📦 3. VALIDACIÓN DE ENTITIES vs DOCUMENTACIÓN\n');

if (checkFileExists(ENTITIES_DIR)) {
  const entityFiles = listFiles(ENTITIES_DIR, '.js');
  console.log(`   Total de entities en multi-mysql-layer: ${entityFiles.length}\n`);

  const entitiesWithoutDocs = [];
  const entitiesWithDocs = [];
  const multiTableEntities = ['forms.js', 'equivalences.js', 'menus.js'];

  entityFiles.forEach((entityFile) => {
    const variations = generateDocVariations(entityFile);
    const foundDoc = variations.find((v) => dbDocsFiles.includes(v));

    if (foundDoc) {
      entitiesWithDocs.push({ entity: entityFile, doc: foundDoc });
    } else if (multiTableEntities.includes(entityFile)) {
      info.push(`ℹ️  Entity ${entityFile} mapea a múltiples tablas (excepcional)`);
    } else {
      entitiesWithoutDocs.push(entityFile);
    }
  });

  if (entityFiles.length > 0) {
    console.log(`   ✅ Entities con documentación: ${entitiesWithDocs.length}/${entityFiles.length}`);
    console.log(`   ℹ️  Entities multi-tabla: ${multiTableEntities.filter((e) => entityFiles.includes(e)).length}`);
    console.log(`   ⚠️  Sin mapeo claro: ${entitiesWithoutDocs.length}\n`);
  }

  if (entitiesWithoutDocs.length > 0) {
    console.log('   ⚠️  Entities SIN documentación clara:');
    entitiesWithoutDocs.forEach((entity) => {
      warnings.push(`⚠️  Entity ${entity} no tiene documentación clara`);
      console.log(`      - ${entity}`);
    });
    console.log('');
  }

  if (entitiesWithoutDocs.length === 0 && multiTableEntities.length > 0) {
    info.push('✅ Todas las entities tienen documentación o son excepciones válidas');
    console.log('   ✅ Todas las entities tienen documentación o son excepciones válidas');
  }
}

console.log('\n🔗 4. VALIDACIÓN DE ENLACES INTERNOS\n');

const docsToCheck = ['docs/README.md', 'docs/DB_MODELS.md', 'docs/AGENTS.md', 'docs/ESTRUCTURA_PROYECTO.md'];

const brokenLinks = [];

docsToCheck.forEach((docPath) => {
  const fullPath = path.join(__dirname, '..', docPath);
  const content = readFile(fullPath);

  if (!content) {
    warnings.push(`⚠️  No se pudo leer ${docPath}`);
    return;
  }

  const linkPattern = /\[([^\]]+)\]\(([^\)]+)\)/g;
  let match;

  while ((match = linkPattern.exec(content)) !== null) {
    const linkText = match[1];
    const linkUrl = match[2];

    if (linkUrl.startsWith('http') || linkUrl.startsWith('#')) {
      continue;
    }

    const linkPath = path.join(path.dirname(fullPath), linkUrl.split('#')[0]);

    if (!checkFileExists(linkPath)) {
      brokenLinks.push({
        doc: docPath,
        linkText,
        linkUrl,
        resolvedPath: linkPath,
      });
    }
  }
});

if (brokenLinks.length > 0) {
  console.log('   🔗 Enlaces rotos encontrados:\n');
  brokenLinks.forEach((link) => {
    issues.push(`❌ Enlace roto en ${link.doc}: ${link.linkText}`);
    console.log(`      En: ${link.doc}`);
    console.log(`      Enlace: [${link.linkText}](${link.linkUrl})`);
    console.log(`      Ruta resuelta: ${link.resolvedPath}\n`);
  });
} else {
  info.push('✅ Todos los enlaces internos están válidos');
  console.log('   ✅ Todos los enlaces internos principales están válidos');
}

console.log('\n📝 5. VALIDACIÓN DE FORMATO DE ARCHIVOS DDL\n');

const invalidDDLFiles = [];
const validDDLFiles = [];

dbDocsFiles.forEach((file) => {
  const filePath = path.join(DOCS_DB_DIR, file);
  const content = readFile(filePath);

  if (!content) {
    warnings.push(`⚠️  No se pudo leer ${file}`);
    return;
  }

  const hasCreateTable = content.includes('CREATE TABLE');
  const hasDDLSection = content.includes('## DDL');
  const hasColumnsSummary = content.includes('## Resumen de columnas') || content.includes('## Columns');

  if (!hasCreateTable || !hasDDLSection) {
    invalidDDLFiles.push({
      file,
      hasCreateTable,
      hasDDLSection,
      hasColumnsSummary,
    });
  } else {
    validDDLFiles.push(file);
  }
});

console.log(`   Archivos DDL válidos: ${validDDLFiles.length}/${dbDocsFiles.length}`);

if (invalidDDLFiles.length > 0) {
  console.log('\n   ⚠️  Archivos con formato incompleto:\n');
  invalidDDLFiles.forEach((item) => {
    warnings.push(`⚠️  ${item.file} tiene formato incompleto`);
    console.log(`      - ${item.file}`);
    console.log(`        CREATE TABLE: ${item.hasCreateTable ? '✓' : '✗'}`);
    console.log(`        Sección DDL: ${item.hasDDLSection ? '✓' : '✗'}`);
    console.log(`        Resumen columnas: ${item.hasColumnsSummary ? '✓' : '✗'}\n`);
  });
}

console.log('\n' + '='.repeat(70));
console.log('\n📊 RESUMEN DE AUDITORÍA\n');

console.log(`✅ Información: ${info.length}`);
console.log(`⚠️  Advertencias: ${warnings.length}`);
console.log(`❌ Problemas críticos: ${issues.length}\n`);

if (issues.length > 0) {
  console.log('❌ PROBLEMAS CRÍTICOS:\n');
  issues.forEach((issue) => console.log(`   ${issue}`));
  console.log('');
}

if (warnings.length > 0) {
  console.log('⚠️  ADVERTENCIAS:\n');
  warnings.slice(0, 10).forEach((warning) => console.log(`   ${warning}`));
  if (warnings.length > 10) {
    console.log(`   ... y ${warnings.length - 10} advertencias más\n`);
  } else {
    console.log('');
  }
}

console.log('='.repeat(70));

const exitCode = issues.length > 0 ? 1 : 0;

if (exitCode === 0) {
  console.log('\n✅ Auditoría completada: La documentación está en buen estado\n');
} else {
  console.log('\n⚠️  Auditoría completada: Se encontraron problemas que requieren atención\n');
}

const report = {
  timestamp: new Date().toISOString(),
  summary: {
    info: info.length,
    warnings: warnings.length,
    issues: issues.length,
  },
  details: {
    info,
    warnings,
    issues,
  },
};

const reportPath = path.join(__dirname, '..', 'docs-audit-report.json');
fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
console.log(`📄 Reporte detallado guardado en: docs-audit-report.json\n`);

process.exit(exitCode);
