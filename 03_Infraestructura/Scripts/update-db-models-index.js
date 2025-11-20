#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const DB_DIR = path.join(__dirname, '..', 'docs', 'db');
const DB_MODELS_FILE = path.join(__dirname, '..', 'docs', 'DB_MODELS.md');

console.log('🔄 Actualizando DB_MODELS.md...\n');

try {
  const files = fs.readdirSync(DB_DIR)
    .filter(file => file.endsWith('.md') && file !== 'TEMPLATE_TABLE.md')
    .sort((a, b) => a.localeCompare(b));

  console.log(`📊 Encontradas ${files.length} tablas documentadas\n`);

  const tableLinks = files.map(file => {
    const tableName = file.replace('.md', '');
    return `- [${tableName}](./db/${file})`;
  }).join('\n');

  const header = `# Base de datos — Modelos (Índice)

Este índice referencia el DDL fuente de verdad de cada tabla.

## 🔗 Enlaces Rápidos

- [📚 Histórico de Refactors](./refactors/README.md) - Documentación de cambios importantes
- [🔧 Scripts de Validación](./scripts/README.md) - Herramientas para mantener alineación DDL vs Código
- [📖 Guía de Agentes](./AGENTS.md) - Cómo trabajar con el monorepo

## Tablas
`;

  const newContent = header + tableLinks;

  if (fs.existsSync(DB_MODELS_FILE)) {
    const currentContent = fs.readFileSync(DB_MODELS_FILE, 'utf8');
    if (currentContent === newContent) {
      console.log('✅ DB_MODELS.md ya está actualizado (sin cambios)\n');
      process.exit(0);
    }
  }

  fs.writeFileSync(DB_MODELS_FILE, newContent, 'utf8');
  console.log('✅ DB_MODELS.md actualizado correctamente\n');
  console.log(`   ${files.length} tablas indexadas\n`);

} catch (error) {
  console.error('❌ Error actualizando DB_MODELS.md:', error.message);
  process.exit(1);
}

