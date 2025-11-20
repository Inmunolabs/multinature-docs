#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const DOCS_DIR = path.join(__dirname, '..', 'docs');
const OUTPUT_INDEX = path.join(__dirname, '..', 'DOCUMENTATION_INDEX.md');

const results = {
  totalFiles: 0,
  byDirectory: {},
  byType: {},
  allFiles: []
};

function shouldIgnore(name) {
  const ignore = ['.excalidraw', '.crswap', '.png', '.jpg', '.jpeg', '.gif', 'node_modules'];
  return ignore.some(pattern => name.includes(pattern));
}

function getFileSize(filePath) {
  try {
    const stats = fs.statSync(filePath);
    return stats.size;
  } catch {
    return 0;
  }
}

function getFirstHeading(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const match = content.match(/^#\s+(.+)$/m);
    return match ? match[1] : null;
  } catch {
    return null;
  }
}

function scanDirectory(dirPath, relativePath = '') {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  const dirName = relativePath || 'root';
  
  if (!results.byDirectory[dirName]) {
    results.byDirectory[dirName] = {
      files: [],
      subdirs: [],
      totalSize: 0
    };
  }

  for (const entry of entries) {
    if (shouldIgnore(entry.name)) continue;

    const fullPath = path.join(dirPath, entry.name);
    const relPath = path.join(relativePath, entry.name);

    if (entry.isDirectory()) {
      results.byDirectory[dirName].subdirs.push(entry.name);
      scanDirectory(fullPath, relPath);
    } else if (entry.name.endsWith('.md')) {
      const size = getFileSize(fullPath);
      const heading = getFileSize(fullPath) > 0 ? getFirstHeading(fullPath) : null;
      
      const fileInfo = {
        name: entry.name,
        path: relPath.replace(/\\/g, '/'),
        directory: dirName,
        size,
        heading
      };

      results.totalFiles++;
      results.byDirectory[dirName].files.push(fileInfo);
      results.byDirectory[dirName].totalSize += size;
      results.allFiles.push(fileInfo);

      // Clasificar por tipo de documento
      let type = 'Otros';
      if (relPath.includes('db\\') || relPath.includes('db/')) type = 'DDL/Database';
      else if (relPath.includes('endpoints')) type = 'API Endpoints';
      else if (relPath.includes('Negocio')) type = 'Negocio';
      else if (relPath.includes('BACKEND')) type = 'Backend Docs';
      else if (relPath.includes('FRONTEND')) type = 'Frontend Docs';
      else if (relPath.includes('Definicion')) type = 'Definición';
      else if (relPath.includes('PRUEBAS')) type = 'Testing';
      else if (relPath.includes('refactors')) type = 'Refactors';

      if (!results.byType[type]) {
        results.byType[type] = [];
      }
      results.byType[type].push(fileInfo);
    }
  }
}

function formatBytes(bytes) {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}

function generateMarkdownIndex() {
  const lines = [];
  
  lines.push('# 📚 Índice Maestro de Documentación - Multinature Backend');
  lines.push('');
  lines.push('**Generado**: ' + new Date().toISOString().split('T')[0]);
  lines.push('**Total de documentos**: ' + results.totalFiles);
  lines.push('');
  lines.push('---');
  lines.push('');

  // Tabla de contenido
  lines.push('## 📋 Tabla de Contenido');
  lines.push('');
  lines.push('1. [Resumen Ejecutivo](#-resumen-ejecutivo)');
  lines.push('2. [Documentación por Tipo](#-documentación-por-tipo)');
  lines.push('3. [Documentación por Directorio](#-documentación-por-directorio)');
  lines.push('4. [Índice Alfabético](#-índice-alfabético)');
  lines.push('5. [Estadísticas](#-estadísticas)');
  lines.push('6. [Guías de Navegación](#-guías-de-navegación)');
  lines.push('');
  lines.push('---');
  lines.push('');

  // Resumen ejecutivo
  lines.push('## 📊 Resumen Ejecutivo');
  lines.push('');
  
  const totalSize = results.allFiles.reduce((sum, f) => sum + f.size, 0);
  lines.push(`- **Total de documentos Markdown**: ${results.totalFiles}`);
  lines.push(`- **Tamaño total**: ${formatBytes(totalSize)}`);
  lines.push(`- **Categorías principales**: ${Object.keys(results.byType).length}`);
  lines.push(`- **Directorios documentados**: ${Object.keys(results.byDirectory).length}`);
  lines.push('');

  // Top documentos por tamaño
  const topBySize = [...results.allFiles]
    .sort((a, b) => b.size - a.size)
    .slice(0, 5);
  
  lines.push('### 📈 Top 5 Documentos Más Extensos');
  lines.push('');
  topBySize.forEach((file, i) => {
    lines.push(`${i + 1}. [${file.name}](./docs/${file.path}) - ${formatBytes(file.size)}`);
  });
  lines.push('');
  lines.push('---');
  lines.push('');

  // Documentación por tipo
  lines.push('## 📂 Documentación por Tipo');
  lines.push('');

  const typeOrder = [
    'DDL/Database',
    'API Endpoints',
    'Backend Docs',
    'Frontend Docs',
    'Negocio',
    'Definición',
    'Testing',
    'Refactors',
    'Otros'
  ];

  typeOrder.forEach(type => {
    if (!results.byType[type]) return;
    
    const files = results.byType[type];
    const typeSize = files.reduce((sum, f) => sum + f.size, 0);
    
    lines.push(`### ${type} (${files.length} documentos, ${formatBytes(typeSize)})`);
    lines.push('');

    if (type === 'DDL/Database') {
      lines.push('**Tablas de Base de Datos**');
      lines.push('');
      lines.push('Ver [DB_MODELS.md](./docs/DB_MODELS.md) para el índice completo de 82 tablas.');
      lines.push('');
      lines.push('<details>');
      lines.push('<summary>Ver lista completa de archivos DDL</summary>');
      lines.push('');
      files.slice(0, 20).forEach(file => {
        lines.push(`- [${file.name}](./docs/${file.path})`);
      });
      if (files.length > 20) {
        lines.push(`- ... y ${files.length - 20} archivos más`);
      }
      lines.push('');
      lines.push('</details>');
    } else if (type === 'API Endpoints') {
      lines.push('**Endpoints de API**');
      lines.push('');
      
      // Agrupar por API
      const byApi = {};
      files.forEach(file => {
        const apiMatch = file.path.match(/endpoints[\\\/]([^\\\/]+)/);
        const api = apiMatch ? apiMatch[1] : 'otros';
        if (!byApi[api]) byApi[api] = [];
        byApi[api].push(file);
      });

      lines.push('<details>');
      lines.push('<summary>Ver por API</summary>');
      lines.push('');
      
      Object.keys(byApi).sort().forEach(api => {
        lines.push(`**${api}** (${byApi[api].length} endpoints)`);
        byApi[api].slice(0, 10).forEach(file => {
          const title = file.heading || file.name.replace('.md', '');
          lines.push(`  - [${title}](./docs/${file.path})`);
        });
        if (byApi[api].length > 10) {
          lines.push(`  - ... y ${byApi[api].length - 10} más`);
        }
        lines.push('');
      });
      
      lines.push('</details>');
    } else {
      files.slice(0, 15).forEach(file => {
        const title = file.heading || file.name.replace('.md', '');
        lines.push(`- [${title}](./docs/${file.path}) ${file.size < 500 ? '⚠️' : ''}`);
      });
      if (files.length > 15) {
        lines.push(`- ... y ${files.length - 15} archivos más`);
      }
    }
    
    lines.push('');
  });

  lines.push('---');
  lines.push('');

  // Documentación por directorio (principales)
  lines.push('## 🗂️ Documentación por Directorio');
  lines.push('');

  const mainDirs = Object.keys(results.byDirectory)
    .filter(dir => !dir.includes('\\') && !dir.includes('/'))
    .sort();

  mainDirs.forEach(dir => {
    const dirInfo = results.byDirectory[dir];
    if (dirInfo.files.length === 0 && dirInfo.subdirs.length === 0) return;

    lines.push(`### 📁 ${dir}`);
    lines.push('');
    lines.push(`- **Archivos**: ${dirInfo.files.length}`);
    lines.push(`- **Subdirectorios**: ${dirInfo.subdirs.length}`);
    lines.push(`- **Tamaño**: ${formatBytes(dirInfo.totalSize)}`);
    lines.push('');

    if (dirInfo.files.length > 0 && dirInfo.files.length <= 10) {
      dirInfo.files.forEach(file => {
        const title = file.heading || file.name.replace('.md', '');
        lines.push(`- [${title}](./docs/${file.path})`);
      });
      lines.push('');
    }

    if (dirInfo.subdirs.length > 0) {
      lines.push('**Subdirectorios**: ' + dirInfo.subdirs.join(', '));
      lines.push('');
    }
  });

  lines.push('---');
  lines.push('');

  // Índice alfabético (primeros 50)
  lines.push('## 🔤 Índice Alfabético');
  lines.push('');
  lines.push('<details>');
  lines.push('<summary>Ver índice completo (click para expandir)</summary>');
  lines.push('');

  const sorted = [...results.allFiles].sort((a, b) => a.name.localeCompare(b.name));
  sorted.slice(0, 100).forEach(file => {
    const title = file.heading || file.name.replace('.md', '');
    lines.push(`- [${file.name}](./docs/${file.path}) - ${title}`);
  });
  
  if (sorted.length > 100) {
    lines.push(`- ... y ${sorted.length - 100} archivos más`);
  }

  lines.push('');
  lines.push('</details>');
  lines.push('');
  lines.push('---');
  lines.push('');

  // Estadísticas
  lines.push('## 📊 Estadísticas');
  lines.push('');

  lines.push('### Por Tipo de Contenido');
  lines.push('');
  lines.push('| Tipo | Documentos | Tamaño | % Total |');
  lines.push('|------|------------|--------|---------|');
  
  Object.entries(results.byType)
    .sort((a, b) => b[1].length - a[1].length)
    .forEach(([type, files]) => {
      const typeSize = files.reduce((sum, f) => sum + f.size, 0);
      const percentage = ((files.length / results.totalFiles) * 100).toFixed(1);
      lines.push(`| ${type} | ${files.length} | ${formatBytes(typeSize)} | ${percentage}% |`);
    });

  lines.push('');

  // Distribución de tamaños
  lines.push('### Distribución por Tamaño');
  lines.push('');
  
  const tiny = results.allFiles.filter(f => f.size < 500).length;
  const small = results.allFiles.filter(f => f.size >= 500 && f.size < 2000).length;
  const medium = results.allFiles.filter(f => f.size >= 2000 && f.size < 10000).length;
  const large = results.allFiles.filter(f => f.size >= 10000).length;

  lines.push('| Tamaño | Rango | Cantidad | % |');
  lines.push('|--------|-------|----------|---|');
  lines.push(`| Muy pequeño ⚠️ | < 500 B | ${tiny} | ${((tiny/results.totalFiles)*100).toFixed(1)}% |`);
  lines.push(`| Pequeño | 500 B - 2 KB | ${small} | ${((small/results.totalFiles)*100).toFixed(1)}% |`);
  lines.push(`| Mediano | 2 KB - 10 KB | ${medium} | ${((medium/results.totalFiles)*100).toFixed(1)}% |`);
  lines.push(`| Grande | > 10 KB | ${large} | ${((large/results.totalFiles)*100).toFixed(1)}% |`);

  lines.push('');
  lines.push('---');
  lines.push('');

  // Guías de navegación
  lines.push('## 🧭 Guías de Navegación');
  lines.push('');

  lines.push('### Para Nuevos Desarrolladores');
  lines.push('');
  lines.push('**Lectura obligatoria** (en orden):');
  lines.push('');
  lines.push('1. [📖 README Principal](./docs/README.md)');
  lines.push('2. [🔧 AGENTS.md](./docs/AGENTS.md) - Guía completa del monorepo');
  lines.push('3. [📊 DB_MODELS.md](./docs/DB_MODELS.md) - Índice de 82 tablas');
  lines.push('4. [🏗️ ESTRUCTURA_PROYECTO.md](./docs/ESTRUCTURA_PROYECTO.md)');
  lines.push('');

  lines.push('### Por Rol');
  lines.push('');
  
  lines.push('**Backend Developer**:');
  lines.push('- [Backend Documentation](./docs/2.%20BACKEND/)');
  lines.push('- [API Endpoints](./docs/2.%20BACKEND/2.1-endpoints/)');
  lines.push('- [Database DDL](./docs/db/)');
  lines.push('- [Scripts & Tools](./docs/scripts/)');
  lines.push('');

  lines.push('**Frontend Developer**:');
  lines.push('- [Frontend Documentation](./docs/3.%20FRONTEND/)');
  lines.push('- [API Endpoints Reference](./docs/2.%20BACKEND/2.1-endpoints/)');
  lines.push('');

  lines.push('**Product Owner / Business**:');
  lines.push('- [Business Rules](./docs/1.%20Definicion%20del%20proyecto/reglas-de-negocio.md)');
  lines.push('- [Business Documentation](./docs/4.%20Negocio/)');
  lines.push('- [Task Prompts](./docs/4.%20Negocio/promptsDeTareas/)');
  lines.push('');

  lines.push('**DevOps / SRE**:');
  lines.push('- [Scripts Documentation](./docs/scripts/)');
  lines.push('- [Refactors History](./docs/refactors/)');
  lines.push('');

  lines.push('### Documentos Clave por Dominio');
  lines.push('');
  
  lines.push('| Dominio | Documentos Principales |');
  lines.push('|---------|------------------------|');
  lines.push('| **Usuarios** | [users.md](./docs/db/users.md), [Users API](./docs/2.%20BACKEND/2.1-endpoints/users/) |');
  lines.push('| **Dietas** | [diets.md](./docs/db/diets.md), [foods.md](./docs/db/foods.md), [Diets API](./docs/2.%20BACKEND/2.1-endpoints/diets/) |');
  lines.push('| **Rutinas** | [routines.md](./docs/db/routines.md), [exercises.md](./docs/db/exercises.md) |');
  lines.push('| **Productos** | [products.md](./docs/db/products.md), [orders.md](./docs/db/orders.md) |');
  lines.push('| **Pagos** | [payment_methods.md](./docs/db/payment_methods.md), [service_payments.md](./docs/db/service_payments.md) |');
  lines.push('| **Citas** | [bookings.md](./docs/db/bookings.md), [working_hours.md](./docs/db/working_hours.md) |');
  lines.push('');

  lines.push('---');
  lines.push('');

  // Footer
  lines.push('## 🔄 Mantenimiento');
  lines.push('');
  lines.push('Este índice se genera automáticamente ejecutando:');
  lines.push('');
  lines.push('```bash');
  lines.push('node scripts/docs-verify-and-index.js');
  lines.push('```');
  lines.push('');
  lines.push('**Última actualización**: ' + new Date().toLocaleString('es-MX'));
  lines.push('');
  lines.push('---');
  lines.push('');
  lines.push('**Generado por**: `docs-verify-and-index.js`');
  lines.push('');

  return lines.join('\n');
}

console.log('📚 VERIFICACIÓN E INDEXACIÓN DE DOCUMENTACIÓN\n');
console.log('='.repeat(70));
console.log('\n🔍 Escaneando documentación...\n');

scanDirectory(DOCS_DIR);

console.log('✅ Escaneo completado\n');
console.log('='.repeat(70));
console.log('\n📊 RESUMEN\n');

console.log(`📁 Total de documentos: ${results.totalFiles}`);
console.log(`📂 Directorios: ${Object.keys(results.byDirectory).length}`);

const totalSize = results.allFiles.reduce((sum, f) => sum + f.size, 0);
console.log(`💾 Tamaño total: ${formatBytes(totalSize)}\n`);

console.log('📂 Por tipo de contenido:\n');
Object.entries(results.byType)
  .sort((a, b) => b[1].length - a[1].length)
  .forEach(([type, files]) => {
    console.log(`   ${type.padEnd(20)} ${files.length.toString().padStart(3)} docs`);
  });

console.log('\n' + '='.repeat(70));
console.log('\n📝 Generando índice maestro...\n');

const markdown = generateMarkdownIndex();
fs.writeFileSync(OUTPUT_INDEX, markdown);

console.log(`✅ Índice generado: ${path.basename(OUTPUT_INDEX)}`);
console.log(`   Ubicación: ${OUTPUT_INDEX}\n`);

// Generar también reporte JSON
const jsonReport = {
  generated: new Date().toISOString(),
  summary: {
    totalFiles: results.totalFiles,
    totalSize: totalSize,
    totalDirectories: Object.keys(results.byDirectory).length
  },
  byType: Object.fromEntries(
    Object.entries(results.byType).map(([type, files]) => [
      type,
      {
        count: files.length,
        size: files.reduce((sum, f) => sum + f.size, 0)
      }
    ])
  ),
  allFiles: results.allFiles
};

const jsonPath = path.join(__dirname, '..', 'docs-index-report.json');
fs.writeFileSync(jsonPath, JSON.stringify(jsonReport, null, 2));

console.log(`📄 Reporte JSON: docs-index-report.json\n`);

console.log('='.repeat(70));
console.log('\n✅ Verificación e indexación completada con éxito\n');

process.exit(0);

