#!/usr/bin/env node

/**
 * Generador Automático de migrations-map.json
 * 
 * Genera el archivo migrations-map.json completo con todas las migraciones
 * basado en las reglas de la reestructuración v2.
 * 
 * Uso:
 *   node scripts/migration/generate-migrations-map.js
 * 
 * Salida:
 *   docs/migrations-map.json (334+ entradas)
 */

const fs = require('fs');
const path = require('path');

// ============================================================================
// REGLAS DE MAPEO
// ============================================================================

const MAPPING_RULES = {
  // Archivos raíz
  root: {
    'README.md': '00_Overview/00_README.md',
    'AGENTS.md': '00_Overview/AGENTS_GUIDE.md',
    'DB_MODELS.md': '01_Backend/Database/00_INDEX.md',
    'ESTRUCTURA_PROYECTO.md': '00_Overview/PROJECT_STRUCTURE.md',
    'LAYER_CONTEXT_REPORT.md': '01_Backend/Layers/CONTEXT.md',
    'REORGANIZACION_COMPLETADA.md': '05_Privado/Refactors/REORGANIZACION_COMPLETADA.md'
  },
  
  // Patrones de mapeo por carpeta
  patterns: [
    // 1. Definicion del proyecto → 00_Overview/Business_Rules/
    {
      from: /^1\. Definicion del proyecto\//,
      to: '00_Overview/Business_Rules/',
      sensibilidad: 'publico'
    },
    
    // 2. BACKEND/2.1-endpoints → 01_Backend/APIs/
    {
      from: /^2\. BACKEND\/2\.1-endpoints\/([^/]+)\//,
      to: (match) => `01_Backend/APIs/${match[1]}-api/Endpoints/`,
      sensibilidad: 'publico'
    },
    
    // 2. BACKEND/2.2-users → 01_Backend/APIs/users-api/Guides/
    {
      from: /^2\. BACKEND\/2\.2-users\//,
      to: '01_Backend/APIs/users-api/Guides/',
      sensibilidad: 'publico'
    },
    
    // 2. BACKEND/2.3-diets → 01_Backend/APIs/diets-api/Guides/
    {
      from: /^2\. BACKEND\/2\.3-diets\//,
      to: '01_Backend/APIs/diets-api/Guides/',
      sensibilidad: 'publico'
    },
    
    // 2. BACKEND/2.4-monthly-purchases → 01_Backend/APIs/monthly-purchases-api/Guides/
    {
      from: /^2\. BACKEND\/2\.4-monthly-purchases\//,
      to: '01_Backend/APIs/monthly-purchases-api/Guides/',
      sensibilidad: 'publico'
    },
    
    // 2. BACKEND/2.5-notifications → 01_Backend/APIs/notifications-api/Guides/
    {
      from: /^2\. BACKEND\/2\.5-notifications\//,
      to: '01_Backend/APIs/notifications-api/Guides/',
      sensibilidad: 'publico'
    },
    
    // 2. BACKEND/2.6-orders → 01_Backend/APIs/orders-api/Guides/
    {
      from: /^2\. BACKEND\/2\.6-orders\//,
      to: '01_Backend/APIs/orders-api/Guides/',
      sensibilidad: 'publico'
    },
    
    // 2. BACKEND/2.7-chatbot → 01_Backend/APIs/chatbot/
    {
      from: /^2\. BACKEND\/2\.7-chatbot\//,
      to: '01_Backend/APIs/chatbot/',
      sensibilidad: 'publico'
    },
    
    // 2. BACKEND (otros archivos) → 01_Backend/
    {
      from: /^2\. BACKEND\//,
      to: '01_Backend/',
      sensibilidad: 'publico'
    },
    
    // db/ → 01_Backend/Database/Tables/
    {
      from: /^db\//,
      to: '01_Backend/Database/Tables/',
      sensibilidad: 'publico'
    },
    
    // 3. FRONTEND → 02_Frontend/
    {
      from: /^3\. FRONTEND\//,
      to: '02_Frontend/',
      sensibilidad: 'publico'
    },
    
    // scripts/ → 03_Infraestructura/Scripts/
    {
      from: /^scripts\//,
      to: '03_Infraestructura/Scripts/',
      sensibilidad: 'publico'
    },
    
    // 4. Negocio/promptsDeTareas → 04_Negocio/Tareas/
    {
      from: /^4\. Negocio\/promptsDeTareas\//,
      to: '04_Negocio/Tareas/',
      sensibilidad: 'publico'
    },
    
    // 4. Negocio/pendientes → 04_Negocio/Pendientes/
    {
      from: /^4\. Negocio\/pendientes\//,
      to: '04_Negocio/Pendientes/',
      sensibilidad: 'publico'
    },
    
    // 4. Negocio (otros) → 04_Negocio/
    {
      from: /^4\. Negocio\//,
      to: '04_Negocio/',
      sensibilidad: 'publico'
    },
    
    // 5. PRUEBAS → 05_Privado/Testing/
    {
      from: /^5\. PRUEBAS\//,
      to: '05_Privado/Testing/',
      sensibilidad: 'privado'
    },
    
    // reports/ → 05_Privado/Reportes/
    {
      from: /^reports\//,
      to: '05_Privado/Reportes/',
      sensibilidad: 'privado'
    },
    
    // refactors/ → 05_Privado/Refactors/
    {
      from: /^refactors\//,
      to: '05_Privado/Refactors/',
      sensibilidad: 'privado'
    }
  ]
};

// Mapeos especiales para archivos específicos
const SPECIAL_MAPPINGS = {
  '2. BACKEND/2.1-endpoints/README-RULES.md': {
    destino: '01_Backend/APIs/CONVENTIONS.md',
    notas: 'Renombrado para claridad'
  },
  '2. BACKEND/2.1-endpoints/PROJECT-DOCS-RULES.md': {
    destino: '01_Backend/APIs/DOCUMENTATION_GUIDE.md',
    notas: 'Renombrado para claridad'
  },
  '2. BACKEND/2.1-endpoints/ENDPOINT-TEMPLATE.md': {
    destino: '01_Backend/APIs/_TEMPLATES/endpoint-template.md',
    notas: 'Movido a carpeta de templates'
  },
  '2. BACKEND/2.0-proposed-routes-guide.md': {
    destino: '01_Backend/APIs/ROUTES_GUIDE.md',
    notas: 'Guía de rutas consolidada'
  },
  '2. BACKEND/2.01-propuesta-migraciones-de-bd.md': {
    destino: '01_Backend/Database/MIGRATIONS.md',
    notas: 'Guía de migraciones de BD'
  },
  'db/TEMPLATE_TABLE.md': {
    destino: '01_Backend/Database/_TEMPLATES/table-template.md',
    notas: 'Template de tabla movido a _TEMPLATES'
  }
};

// Carpetas especiales para trabajar-hours
const WORKING_HOURS_FILES = [
  'working-hours-availability.md',
  'working-hours-get-by-user-id.md',
  'working-hours-update.md'
];

// Carpetas especiales para recommendations
const RECOMMENDATIONS_FILES = [
  'recommendations-get-patient.md',
  'recommendations-list.md',
  'recommendations-upsert.md'
];

// ============================================================================
// GENERACIÓN DE MAPEOS
// ============================================================================

function normalizeRelativePath(absolutePath) {
  const docsPath = path.join(__dirname, '..', '..', 'docs');
  return path.relative(docsPath, absolutePath).replace(/\\/g, '/');
}

function applyMappingRules(relativePath) {
  const fileName = path.basename(relativePath);
  
  // Verificar mapeos especiales primero
  if (SPECIAL_MAPPINGS[relativePath]) {
    return {
      destino: SPECIAL_MAPPINGS[relativePath].destino,
      notas: SPECIAL_MAPPINGS[relativePath].notas
    };
  }
  
  // Archivos raíz
  if (MAPPING_RULES.root[relativePath]) {
    return {
      destino: MAPPING_RULES.root[relativePath],
      notas: 'Movido a nueva estructura raíz'
    };
  }
  
  // Aplicar patrones
  for (const rule of MAPPING_RULES.patterns) {
    const match = relativePath.match(rule.from);
    
    if (match) {
      let destino;
      
      if (typeof rule.to === 'function') {
        destino = rule.to(match) + fileName;
      } else {
        const remainder = relativePath.replace(rule.from, '');
        destino = rule.to + remainder;
      }
      
      // Casos especiales para subcarpetas
      if (relativePath.includes('working-hours') && WORKING_HOURS_FILES.includes(fileName)) {
        destino = destino.replace(/\/([^/]+)$/, '/working-hours/$1');
      }
      
      if (relativePath.includes('recommendations') && RECOMMENDATIONS_FILES.includes(fileName)) {
        destino = destino.replace(/\/([^/]+)$/, '/recommendations/$1');
      }
      
      // Subcarpetas de specialists y teamworks en users-api
      if (relativePath.includes('2. BACKEND/2.1-endpoints/users/specialists/')) {
        destino = destino.replace('/Endpoints/', '/Endpoints/specialists/');
      }
      
      if (relativePath.includes('2. BACKEND/2.1-endpoints/users/teamworks/')) {
        destino = destino.replace('/Endpoints/', '/Endpoints/teamworks/');
      }
      
      if (relativePath.includes('2. BACKEND/2.1-endpoints/users/summary-')) {
        destino = destino.replace('/Endpoints/', '/Endpoints/summary/');
      }
      
      // Subcarpetas de forms
      if (relativePath.includes('2. BACKEND/2.1-endpoints/forms/concept-')) {
        destino = destino.replace('/Endpoints/', '/Endpoints/concepts/');
      }
      
      if (relativePath.includes('2. BACKEND/2.1-endpoints/forms/template-')) {
        destino = destino.replace('/Endpoints/', '/Endpoints/templates/');
      }
      
      // Subcarpetas de products
      if (relativePath.includes('2. BACKEND/2.1-endpoints/products/') && fileName.includes('review')) {
        destino = destino.replace('/Endpoints/', '/Endpoints/reviews/');
      }
      
      // Subcarpetas de routines
      if (relativePath.includes('2. BACKEND/2.1-endpoints/routines/') && 
          (fileName.includes('exercise') && fileName !== 'healthcheck.md')) {
        destino = destino.replace('/Endpoints/', '/Endpoints/exercises/');
      }
      
      // Eliminar duplicados de nombres (ej: diets-diets-get → diet-calculations)
      destino = destino
        .replace('/diets-diet-calculations.md', '/diet-calculations.md')
        .replace('/diets-equivalences-group.md', '/equivalences-group.md')
        .replace('/diets-foods.md', '/foods.md')
        .replace('/diets-generate-automatic.md', '/generate-automatic.md')
        .replace('/diets-get.md', '/get.md')
        .replace('/diets-ingredients-by-food.md', '/ingredients-by-food.md')
        .replace('/diets-ingredients.md', '/ingredients.md')
        .replace('/diets-list-by-specialist.md', '/list-by-specialist.md')
        .replace('/diets-list-by-user.md', '/list-by-user.md')
        .replace('/menus-create.md', '/menus/create.md')
        .replace('/routines-get.md', '/get.md')
        .replace('/products-create.md', '/create.md')
        .replace('/public-resources-list.md', '/list.md')
        .replace('/payment-methods-create.md', '/create.md')
        .replace('/users-create.md', '/create.md')
        .replace('/users-login.md', '/login.md');
      
      // Determinar notas según contexto
      let notas = 'Migrado según reestructuración v2';
      if (fileName === 'README.md') {
        notas = 'README movido a nueva estructura';
      } else if (fileName === 'healthcheck.md') {
        notas = 'Endpoint de healthcheck';
      }
      
      return {
        destino,
        sensibilidad: rule.sensibilidad || 'publico',
        notas
      };
    }
  }
  
  // Si no coincide con ninguna regla, mantener
  return {
    destino: relativePath,
    sensibilidad: 'publico',
    notas: 'Mantener en ubicación actual (no coincide con reglas)'
  };
}

function findAllMarkdownFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const filePath = path.join(dir, file);
    
    try {
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory()) {
        // Ignorar carpetas especiales
        if (!file.startsWith('.') && file !== 'node_modules') {
          findAllMarkdownFiles(filePath, fileList);
        }
      } else if (file.endsWith('.md')) {
        fileList.push(filePath);
      }
    } catch (error) {
      // Ignorar errores de acceso
    }
  }
  
  return fileList;
}

function generateMigrations() {
  const docsPath = path.join(__dirname, '..', '..', 'docs');
  
  // Encontrar todos los archivos .md recursivamente
  const files = findAllMarkdownFiles(docsPath);
  
  console.log(`📁 Encontrados ${files.length} archivos .md\n`);
  
  const migrations = [];
  
  for (const file of files) {
    const relativePath = normalizeRelativePath(file);
    
    // Ignorar migrations-map
    if (relativePath.includes('migrations-map')) {
      continue;
    }
    
    const mapping = applyMappingRules(relativePath);
    
    migrations.push({
      origen: relativePath,
      destino: mapping.destino,
      accion: relativePath === mapping.destino ? 'mantener' : 'mover',
      sensibilidad: mapping.sensibilidad,
      notas: mapping.notas
    });
  }
  
  // Ordenar por acción (mover primero, mantener al final)
  migrations.sort((a, b) => {
    const order = { mover: 0, renombrar: 1, mantener: 2 };
    return (order[a.accion] || 9) - (order[b.accion] || 9);
  });
  
  return migrations;
}

// ============================================================================
// MAIN
// ============================================================================

function main() {
  console.log('╔' + '═'.repeat(68) + '╗');
  console.log('║' + ' '.repeat(15) + 'GENERADOR DE MIGRATIONS-MAP.JSON' + ' '.repeat(20) + '║');
  console.log('╚' + '═'.repeat(68) + '╝\n');
  
  console.log('🔍 Escaneando archivos...\n');
  
  const migrations = generateMigrations();
  
  // Estadísticas
  const stats = {
    mover: migrations.filter(m => m.accion === 'mover').length,
    renombrar: migrations.filter(m => m.accion === 'renombrar').length,
    mantener: migrations.filter(m => m.accion === 'mantener').length,
    publico: migrations.filter(m => m.sensibilidad === 'publico').length,
    privado: migrations.filter(m => m.sensibilidad === 'privado').length
  };
  
  console.log('📊 Estadísticas:\n');
  console.log(`   Total de archivos:  ${migrations.length}`);
  console.log(`   A mover:            ${stats.mover}`);
  console.log(`   A renombrar:        ${stats.renombrar}`);
  console.log(`   Mantener:           ${stats.mantener}`);
  console.log(`   Públicos:           ${stats.publico}`);
  console.log(`   Privados:           ${stats.privado}`);
  console.log('');
  
  // Guardar archivo
  const outputPath = path.join(__dirname, '..', '..', 'docs', 'migrations-map.json');
  fs.writeFileSync(outputPath, JSON.stringify(migrations, null, 2), 'utf8');
  
  console.log(`✓ Generado: ${outputPath}`);
  console.log(`\n📝 Total de migraciones: ${migrations.length}\n`);
  
  // Mostrar ejemplos
  console.log('📄 Ejemplos de migraciones:\n');
  console.log('Primeras 5:');
  migrations.slice(0, 5).forEach((m, i) => {
    console.log(`  ${i + 1}. ${m.origen} → ${m.destino}`);
  });
  
  console.log('\nÚltimas 5:');
  migrations.slice(-5).forEach((m, i) => {
    console.log(`  ${migrations.length - 4 + i}. ${m.origen} → ${m.destino}`);
  });
  
  console.log('\n' + '='.repeat(70));
  console.log('✅ migrations-map.json generado exitosamente');
  console.log('='.repeat(70) + '\n');
  
  console.log('Próximos pasos:');
  console.log('  1. Revisar docs/migrations-map.json');
  console.log('  2. Ajustar manualmente si es necesario');
  console.log('  3. Ejecutar: node scripts/migration/migrate-docs-structure.js --dry-run');
  console.log('');
}

// Ejecutar
if (require.main === module) {
  main();
}

module.exports = { generateMigrations, applyMappingRules };

