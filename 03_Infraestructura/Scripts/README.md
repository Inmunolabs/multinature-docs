# Scripts de Infraestructura

Colección de scripts para gestión, mantenimiento y automatización de tareas en el backend de Multinature.

---

## 📑 Índice

### 🔧 Scripts de Git

- [build-layers.bat](#build-layersbat) - Construir todas las layers
- [commitAndPush-git-repos.bat](#commitandpush-git-reposbat) - Commit y push a múltiples repositorios
- [pull-git-repos.bat](#pull-git-reposbat) - Actualizar todos los repositorios Git
- [status-git-repos.bat](#status-git-reposbat) - Estado de todos los repositorios Git

### 🚀 Scripts de Despliegue

- [deploy-apis-lambdas.bat](#deploy-apis-lambdasbat) - Desplegar todas las APIs Lambda

### 📝 Scripts de Migración de Documentación

- [migrate-docs-structure.js](#migrate-docs-structurejs) - Migrar archivos según matriz de reubicación
- [validate-docs-links.js](#validate-docs-linksjs) - Validar enlaces relativos en archivos .md
- [generate-indexes.js](#generate-indexesjs) - Generar/actualizar archivos índice en carpetas
- [apply-moves.js](#apply-movesjs) - Aplicar movimientos de archivos
- [cleanup-plan.js](#cleanup-planjs) - Generar plan de limpieza
- [fix-broken-links.js](#fix-broken-linksjs) - Corregir enlaces rotos
- [generate-migrations-map.js](#generate-migrations-mapjs) - Generar mapa de migraciones
- [sweep-backend-docs.js](#sweep-backend-docsjs) - Limpiar documentación del backend
- [run-migration.sh](#run-migrationsh) - Script shell para ejecutar migraciones

### 🔍 Scripts de Auditoría y Validación

- [docs-audit.js](#docs-auditjs) - Auditoría general de documentación
- [docs-content-audit.js](#docs-content-auditjs) - Auditoría de contenido
- [docs-privacy-audit.js](#docs-privacy-auditjs) - Auditoría de privacidad
- [docs-verify-and-index.js](#docs-verify-and-indexjs) - Verificar e indexar documentación
- [validate-entities-vs-ddl.js](#validate-entities-vs-ddljs) - Validar entities vs DDL (ver [validation-tools.md](./validation-tools.md))
- [sanitize-docs-security.js](#sanitize-docs-securityjs) - Sanitizar documentación por seguridad

### 📊 Scripts de Índices

- [update-docs-index.ps1](#update-docs-indexps1) - Actualizar índice de documentación (PowerShell)
- [update-docs-index.sh](#update-docs-indexsh) - Actualizar índice de documentación (Bash)
- [update-docs-index.ts](#update-docs-indexts) - Actualizar índice de documentación (TypeScript)
- [update-db-models-index.js](#update-db-models-indexjs) - Actualizar índice de modelos de BD
- [docs-normalize-and-index.js](#docs-normalize-and-indexjs) - Normalizar e indexar documentación

### 🏥 Scripts de Healthcheck

- [healthcheck-runner.js](#healthcheck-runnerjs) - Ejecutar healthchecks automáticamente (ver [healthcheck-runner.md](./healthcheck-runner.md))

### 🗄️ Scripts de Base de Datos

- [export-form-templates.js](#export-form-templatesjs) - Exportar form templates y registros relacionados a SQL

---

## 🔧 Scripts de Git

### build-layers.bat

Construye todas las layers del proyecto ejecutando `npm run build` en cada una.

**Ubicación:** Ejecutar desde `backend/` o usar wrapper `.\build-layers.bat`

**Uso:**

```bash
# Desde backend/
.\build-layers.bat

# O desde la ubicación del script
.\docs\03_Infraestructura\Scripts\build-layers.bat
```

**Funcionalidad:**

- Itera sobre todos los directorios en `layers/`
- Ejecuta `npm run build` en cada layer
- Muestra progreso de cada build

---

### commitAndPush-git-repos.bat

Script interactivo para hacer commit y push a múltiples repositorios Git (APIs y/o Layers).

**Ubicación:** Ejecutar desde `backend/` o usar wrapper `.\commitAndPush-git-repos.bat`

**Uso:**

```bash
# Desde backend/
.\commitAndPush-git-repos.bat
```

**Características:**

- Solicita mensaje de commit interactivamente
- Permite especificar rama origen (source branch) para pull
- Permite especificar rama destino (destination branch) para push
- Opción para procesar solo APIs, solo Layers, o ambos
- Confirmación antes de ejecutar
- Manejo automático de checkout y creación de ramas
- Validación de repositorios Git

**Flujo:**

1. Solicita mensaje de commit
2. Solicita rama origen (default: `develop`)
3. Solicita rama destino (default: igual a origen)
4. Selecciona qué procesar (APIs/Layers/Ambos)
5. Muestra resumen y solicita confirmación
6. Ejecuta checkout, pull, add, commit y push en cada repo

---

### pull-git-repos.bat

Actualiza todos los repositorios Git del workspace haciendo pull desde la rama especificada.

**Ubicación:** Ejecutar desde `backend/` o usar wrapper `.\pull-git-repos.bat`

**Uso:**

```bash
# Actualizar todos los repos con rama por defecto (develop)
.\pull-git-repos.bat

# Especificar rama
.\pull-git-repos.bat --branch=main
.\pull-git-repos.bat -b main

# Con checkout automático antes de pull
.\pull-git-repos.bat --checkout
.\pull-git-repos.bat --branch=feature/new-feature --checkout

# Ayuda
.\pull-git-repos.bat --help
```

**Opciones:**

- `--branch=BRANCH` o `-b BRANCH`: Especificar rama a usar (default: `develop`)
- `--checkout` o `-c`: Hacer checkout a la rama antes de pull
- `--help` o `-h`: Mostrar ayuda

**Funcionalidad:**

- Actualiza Layers (rama especificada)
- Actualiza APIs (rama especificada)
- Actualiza api-collection (siempre `master`)
- Actualiza docs (siempre `master`)
- Muestra resumen con estadísticas
- Salta repositorios con cambios sin commitear

---

### status-git-repos.bat

Muestra el estado detallado de todos los repositorios Git del workspace.

**Ubicación:** Ejecutar desde `backend/` o usar wrapper `.\status-git-repos.bat`

**Uso:**

```bash
# Estado resumido (solo repos con cambios)
.\status-git-repos.bat

# Estado detallado (todos los repos)
.\status-git-repos.bat --detailed
.\status-git-repos.bat -d

# Ayuda
.\status-git-repos.bat --help
```

**Opciones:**

- `--detailed` o `-d`: Mostrar detalles de cambios en cada repo
- `--help` o `-h`: Mostrar ayuda

**Información mostrada:**

- Estado: CLEAN, MODIFIED, AHEAD, BEHIND, DIVERGED
- Rama actual vs remota
- Último commit
- Archivos modificados/staged/untracked (modo detallado)
- Commits no pusheados (modo detallado)
- Commits no pulleados (modo detallado)

**Resumen:**

- Contadores de repos limpios, con cambios, adelantados, atrasados, divergidos
- Lista de repos que necesitan atención

---

## 🚀 Scripts de Despliegue

### deploy-apis-lambdas.bat

Despliega todas las APIs Lambda ejecutando `npm run deploy` en cada una.

**Ubicación:** Ejecutar desde `backend/` o usar wrapper `.\deploy-apis-lambdas.bat`

**Uso:**

```bash
# Desde backend/
.\deploy-apis-lambdas.bat

# O desde la ubicación del script
.\docs\03_Infraestructura\Scripts\deploy-apis-lambdas.bat
```

**Funcionalidad:**

- Itera sobre todos los directorios en `apis/`
- Ejecuta `npm run deploy` en cada API
- Muestra progreso de cada despliegue

**⚠️ Advertencia:** Este script despliega a producción. Asegúrate de revisar los cambios antes de ejecutar.

---

## 📝 Scripts de Migración de Documentación

### migrate-docs-structure.js

Migra archivos según la matriz de reubicación definida en `migrations-map.json`.

**Ubicación:** `docs/03_Infraestructura/Scripts/migration/migrate-docs-structure.js`

**Uso:**

```bash
# Simulación (ver cambios sin aplicar)
node docs/03_Infraestructura/Scripts/migration/migrate-docs-structure.js --dry-run

# Ejecutar migración real
node docs/03_Infraestructura/Scripts/migration/migrate-docs-structure.js --confirm

# Sin backup (no recomendado)
node docs/03_Infraestructura/Scripts/migration/migrate-docs-structure.js --confirm --skip-backup
```

**Requisitos:**

- Archivo `docs/migrations-map.json` con la matriz de movimientos

**Salidas:**

- `logs/migration-YYYYMMDD_HHMMSS.log` - Log completo
- `logs/rollback-YYYYMMDD_HHMMSS.sh` - Script de rollback
- `docs_backup_YYYYMMDD_HHMMSS/` - Backup completo

---

### validate-docs-links.js

Valida que todos los enlaces relativos en archivos .md existan.

**Ubicación:** `docs/03_Infraestructura/Scripts/migration/validate-docs-links.js`

**Uso:**

```bash
# Validar todos los archivos
node docs/03_Infraestructura/Scripts/migration/validate-docs-links.js

# Solo documentación pública
node docs/03_Infraestructura/Scripts/migration/validate-docs-links.js --public-only

# Ver todos los enlaces validados
node docs/03_Infraestructura/Scripts/migration/validate-docs-links.js --verbose

# Con sugerencias de corrección
node docs/03_Infraestructura/Scripts/migration/validate-docs-links.js --fix
```

**Salidas:**

- Reporte en consola
- `logs/broken-links-YYYYMMDD_HHMMSS.json` - Si hay enlaces rotos

**Códigos de salida:**

- `0` - Todo OK
- `1` - Enlaces rotos encontrados

---

### generate-indexes.js

Genera/actualiza archivos `00_README.md` en cada carpeta de documentación.

**Ubicación:** `docs/03_Infraestructura/Scripts/migration/generate-indexes.js`

**Uso:**

```bash
# Simulación
node docs/03_Infraestructura/Scripts/migration/generate-indexes.js --dry-run

# Generar índices
node docs/03_Infraestructura/Scripts/migration/generate-indexes.js

# Sobrescribir índices existentes
node docs/03_Infraestructura/Scripts/migration/generate-indexes.js --overwrite

# Con frontmatter YAML
node docs/03_Infraestructura/Scripts/migration/generate-indexes.js --frontmatter
```

**Características:**

- Lista ordenada alfabéticamente
- Preserva secciones personalizadas entre `<!-- CUSTOM -->` tags
- Genera enlaces a subdirectorios y archivos

---

### apply-moves.js

Aplica movimientos de archivos según un plan de migración.

**Ubicación:** `docs/03_Infraestructura/Scripts/migration/apply-moves.js`

**Uso:**

```bash
node docs/03_Infraestructura/Scripts/migration/apply-moves.js
```

---

### cleanup-plan.js

Genera un plan de limpieza para la documentación.

**Ubicación:** `docs/03_Infraestructura/Scripts/migration/cleanup-plan.js`

**Uso:**

```bash
node docs/03_Infraestructura/Scripts/migration/cleanup-plan.js
```

---

### fix-broken-links.js

Corrige enlaces rotos en la documentación.

**Ubicación:** `docs/03_Infraestructura/Scripts/migration/fix-broken-links.js`

**Uso:**

```bash
node docs/03_Infraestructura/Scripts/migration/fix-broken-links.js
```

---

### generate-migrations-map.js

Genera el mapa de migraciones para la documentación.

**Ubicación:** `docs/03_Infraestructura/Scripts/migration/generate-migrations-map.js`

**Uso:**

```bash
node docs/03_Infraestructura/Scripts/migration/generate-migrations-map.js
```

---

### sweep-backend-docs.js

Limpia y organiza la documentación del backend.

**Ubicación:** `docs/03_Infraestructura/Scripts/migration/sweep-backend-docs.js`

**Uso:**

```bash
node docs/03_Infraestructura/Scripts/migration/sweep-backend-docs.js
```

---

### run-migration.sh

Script shell para ejecutar migraciones completas.

**Ubicación:** `docs/03_Infraestructura/Scripts/migration/run-migration.sh`

**Uso:**

```bash
bash docs/03_Infraestructura/Scripts/migration/run-migration.sh
```

---

## 🔍 Scripts de Auditoría y Validación

### docs-audit.js

Realiza una auditoría general de la documentación.

**Ubicación:** `docs/03_Infraestructura/Scripts/docs-audit.js`

**Uso:**

```bash
node docs/03_Infraestructura/Scripts/docs-audit.js
```

---

### docs-content-audit.js

Realiza una auditoría del contenido de la documentación.

**Ubicación:** `docs/03_Infraestructura/Scripts/docs-content-audit.js`

**Uso:**

```bash
node docs/03_Infraestructura/Scripts/docs-content-audit.js
```

---

### docs-privacy-audit.js

Realiza una auditoría de privacidad en la documentación.

**Ubicación:** `docs/03_Infraestructura/Scripts/docs-privacy-audit.js`

**Uso:**

```bash
node docs/03_Infraestructura/Scripts/docs-privacy-audit.js
```

---

### docs-verify-and-index.js

Verifica e indexa la documentación.

**Ubicación:** `docs/03_Infraestructura/Scripts/docs-verify-and-index.js`

**Uso:**

```bash
node docs/03_Infraestructura/Scripts/docs-verify-and-index.js
```

---

### validate-entities-vs-ddl.js

Valida que las entities en código estén alineadas con los DDL documentados.

**Ubicación:** `docs/03_Infraestructura/Scripts/validate-entities-vs-ddl.js`

**Uso:**

```bash
# Validar todas las entities
node docs/03_Infraestructura/Scripts/validate-entities-vs-ddl.js

# Validar una entity específica
node docs/03_Infraestructura/Scripts/validate-entities-vs-ddl.js --entity=foods

# Modo verbose (más detalles)
node docs/03_Infraestructura/Scripts/validate-entities-vs-ddl.js -v
```

**Documentación completa:** Ver [validation-tools.md](./validation-tools.md)

---

### sanitize-docs-security.js

Sanitiza la documentación removiendo información sensible por seguridad.

**Ubicación:** `docs/03_Infraestructura/Scripts/sanitize-docs-security.js`

**Uso:**

```bash
node docs/03_Infraestructura/Scripts/sanitize-docs-security.js
```

---

## 📊 Scripts de Índices

### update-docs-index.ps1

Actualiza el índice de documentación usando PowerShell.

**Ubicación:** `docs/03_Infraestructura/Scripts/update-docs-index.ps1`

**Uso:**

```powershell
.\docs\03_Infraestructura\Scripts\update-docs-index.ps1
```

---

### update-docs-index.sh

Actualiza el índice de documentación usando Bash.

**Ubicación:** `docs/03_Infraestructura/Scripts/update-docs-index.sh`

**Uso:**

```bash
bash docs/03_Infraestructura/Scripts/update-docs-index.sh
```

---

### update-docs-index.ts

Actualiza el índice de documentación usando TypeScript.

**Ubicación:** `docs/03_Infraestructura/Scripts/update-docs-index.ts`

**Uso:**

```bash
# Requiere compilación previa o ts-node
npx ts-node docs/03_Infraestructura/Scripts/update-docs-index.ts
```

---

### update-db-models-index.js

Actualiza el índice de modelos de base de datos.

**Ubicación:** `docs/03_Infraestructura/Scripts/update-db-models-index.js`

**Uso:**

```bash
node docs/03_Infraestructura/Scripts/update-db-models-index.js
```

---

### docs-normalize-and-index.js

Normaliza e indexa la documentación.

**Ubicación:** `docs/03_Infraestructura/Scripts/docs-normalize-and-index.js`

**Uso:**

```bash
node docs/03_Infraestructura/Scripts/docs-normalize-and-index.js
```

---

## 🏥 Scripts de Healthcheck

### healthcheck-runner.js

Ejecuta automáticamente todas las peticiones HTTP a los endpoints healthcheck de la colección de Bruno.

**Ubicación:** `docs/03_Infraestructura/Scripts/healthcheck-runner.js`

**Uso:**

```bash
# Ejecutar healthchecks usando entorno local (por defecto)
node docs/03_Infraestructura/Scripts/healthcheck-runner.js local

# Ejecutar healthchecks usando entorno dev
node docs/03_Infraestructura/Scripts/healthcheck-runner.js dev

# Ejecutar healthchecks usando entorno prod
node docs/03_Infraestructura/Scripts/healthcheck-runner.js prod
```

**Documentación completa:** Ver [healthcheck-runner.md](./healthcheck-runner.md)

---

## 🗄️ Scripts de Base de Datos

### export-form-templates.js

Genera un archivo SQL con todos los INSERTs de los formularios especificados y sus registros relacionados en las tablas `concepts`, `form_templates` y `form_template_concepts`.

**Ubicación:** `docs/03_Infraestructura/Scripts/export-form-templates.js`

**Uso:**

```bash
# Primero, instalar dependencias (solo la primera vez)
cd docs/03_Infraestructura/Scripts
npm install

# Luego ejecutar el script desde la raíz del proyecto
node docs/03_Infraestructura/Scripts/export-form-templates.js

# O desde la carpeta de scripts
cd docs/03_Infraestructura/Scripts
node export-form-templates.js
```

**Alternativa: Usar queries SQL directamente en MySQL Workbench**

Si prefieres ejecutar los queries directamente en MySQL Workbench sin usar Node.js:

1. Abre el archivo `export-form-templates-queries.sql` en MySQL Workbench
2. Ejecuta cada sección en orden:
   - Paso 1: Crear tabla temporal con IDs
   - Paso 2: Exportar INSERTs de `concepts`
   - Paso 3: Exportar INSERTs de `form_templates`
   - Paso 4: Exportar INSERTs de `form_template_concepts`
3. Copia el resultado de cada SELECT (columna con los INSERTs)
4. Pega los INSERTs en un archivo `.sql` y ejecútalos en la base de datos destino

**Archivo SQL:** `docs/03_Infraestructura/Scripts/export-form-templates-queries.sql`

**Requisitos previos:**

Antes de ejecutar el script, asegúrate de tener instaladas las dependencias:

```bash
cd docs/03_Infraestructura/Scripts
npm install
```

**Requisitos:**

Variables de entorno (usando `.env` o exportadas):

- `DB_HOST` - Host de la base de datos MySQL (default: `localhost`)
- `DB_USER` - Usuario de la base de datos (default: `admin`)
- `DB_PASSWORD` - Contraseña de la base de datos (requerido)
- `DB_DATABASE` - Nombre de la base de datos (default: `multi-dev` o `multi-prod` según `ENV`)
- `DB_PORT` - Puerto de la base de datos (default: `3306`)
- `ENV` - Entorno (`prod` o `dev`, default: `dev`)

**Configuración:**

Los IDs de los templates a exportar están definidos en el array `TEMPLATE_IDS` dentro del script. Para modificar la lista, edita el array:

```javascript
const TEMPLATE_IDS = [
  '1b0ea18d-bd63-42d2-995f-bff9f8094e50',
  '13323607-20d2-46b7-8069-021e72dd9ed1',
  // ... más IDs
];
```

**Salida:**

El script genera un archivo SQL en:

```
docs/03_Infraestructura/Scripts/exported-form-templates.sql
```

**Estructura del archivo generado:**

El archivo SQL contiene:

1. Encabezado con metadatos (fecha, templates exportados)
2. INSERTs para tabla `concepts` (ordenados por nombre)
3. INSERTs para tabla `form_templates` (ordenados por nombre)
4. INSERTs para tabla `form_template_concepts` (ordenados por form_template_id e index)

**Ejemplo de salida:**

```sql
-- ============================================================================
-- Exportación de Form Templates
-- Generado: 2025-01-21T10:30:00.000Z
-- Templates exportados: 11
-- ============================================================================

-- Template IDs:
--   - 1b0ea18d-bd63-42d2-995f-bff9f8094e50
--   - 13323607-20d2-46b7-8069-021e72dd9ed1
-- ...

-- ============================================================================
-- 1. INSERTs para tabla: concepts
-- ============================================================================

INSERT INTO concepts (id, specialist_id, name, default_unit, description) VALUES (...);
-- ... más INSERTs

-- ============================================================================
-- 2. INSERTs para tabla: form_templates
-- ============================================================================

INSERT INTO form_templates (...) VALUES (...);
-- ... más INSERTs

-- ============================================================================
-- 3. INSERTs para tabla: form_template_concepts
-- ============================================================================

INSERT INTO form_template_concepts (...) VALUES (...);
-- ... más INSERTs
```

**Funcionalidad:**

1. Se conecta a la base de datos MySQL usando las credenciales configuradas
2. Crea una tabla temporal con los IDs de los templates a exportar
3. Ejecuta queries de exportación para cada tabla relacionada:
   - `concepts`: Conceptos relacionados con los templates seleccionados
   - `form_templates`: Los templates especificados
   - `form_template_concepts`: Relaciones entre templates y concepts
4. Genera un archivo SQL con todos los INSERTs ordenados y formateados
5. Muestra estadísticas de la exportación (cantidad de registros por tabla)

**Notas:**

- El script solo exporta datos, no realiza ninguna operación de limpieza o eliminación
- Los INSERTs generados son compatibles con MySQL y pueden ejecutarse directamente en otra base de datos
- Los valores `NOW()` en `created_at` y `updated_at` se mantienen como funciones SQL
- Los valores `NULL` se manejan correctamente en los INSERTs

**Solución de problemas de conexión:**

Si encuentras errores de conexión (`ETIMEDOUT`, `ECONNREFUSED`):

1. **Verifica conectividad de red:**
   ```bash
   # Probar conexión al host
   ping multi-proxy-dev.proxy-cktj1ovzcxhe.us-east-1.rds.amazonaws.com
   
   # Probar conexión al puerto (requiere telnet o nc)
   telnet multi-proxy-dev.proxy-cktj1ovzcxhe.us-east-1.rds.amazonaws.com 3306
   ```

2. **Verifica VPN/Acceso de red:**
   - Asegúrate de estar conectado a la VPN si es necesario
   - Verifica que tu IP tenga acceso a la base de datos RDS

3. **Deshabilitar SSL (solo para pruebas):**
   ```bash
   # En Windows CMD
   set DB_SSL=false
   node docs/03_Infraestructura/Scripts/export-form-templates.js
   
   # En PowerShell
   $env:DB_SSL="false"
   node docs/03_Infraestructura/Scripts/export-form-templates.js
   ```

4. **Modo debug (ver más detalles):**
   ```bash
   set DEBUG=true
   node docs/03_Infraestructura/Scripts/export-form-templates.js
   ```

5. **Verifica variables de entorno:**
   ```bash
   # Verificar que las variables estén configuradas
   echo %DB_HOST%
   echo %DB_USER%
   echo %DB_DATABASE%
   ```

**Dependencias:**

Las dependencias están definidas en `package.json` dentro de la carpeta de scripts:
- `mysql2` - Cliente MySQL para Node.js
- `dotenv` - Carga de variables de entorno

**Instalar dependencias:**

```bash
cd docs/03_Infraestructura/Scripts
npm install
```

Las dependencias se instalarán en `docs/03_Infraestructura/Scripts/node_modules/`.

---

## Plan de Ejecución Recomendado para Migraciones

### Fase 1: Preparación

```bash
# 1. Asegurar que existe migrations-map.json
# 2. Revisar el plan en modo dry-run
node docs/03_Infraestructura/Scripts/migration/migrate-docs-structure.js --dry-run

# 3. Revisar el log generado
cat logs/migration-*.log
```

### Fase 2: Migración

```bash
# 4. Ejecutar migración real
node docs/03_Infraestructura/Scripts/migration/migrate-docs-structure.js --confirm

# Si todo salió bien, continuar...
```

### Fase 3: Índices

```bash
# 5. Generar índices locales
node docs/03_Infraestructura/Scripts/migration/generate-indexes.js
```

### Fase 4: Validación

```bash
# 6. Validar solo documentación pública primero
node docs/03_Infraestructura/Scripts/migration/validate-docs-links.js --public-only

# 7. Validar todo
node docs/03_Infraestructura/Scripts/migration/validate-docs-links.js --fix
```

### Fase 5: Corrección (si necesario)

```bash
# 8. Si hay enlaces rotos, revisar el reporte JSON
cat logs/broken-links-*.json

# 9. Corregir enlaces manualmente

# 10. Re-validar
node docs/03_Infraestructura/Scripts/migration/validate-docs-links.js
```

---

## Rollback (En Caso de Problemas)

Si algo sale mal durante la migración:

### Opción 1: Usar Script de Rollback

```bash
# El script de migración genera automáticamente un rollback
bash logs/rollback-YYYYMMDD_HHMMSS.sh
```

**⚠️ ADVERTENCIA:** Revisa el script antes de ejecutarlo!

### Opción 2: Restaurar desde Backup

```bash
# Eliminar docs/ actual
rm -rf docs/

# Restaurar desde backup
cp -r docs_backup_YYYYMMDD_HHMMSS/ docs/
```

### Opción 3: Git Reset (si commiteaste)

```bash
# Ver últimos commits
git log --oneline -5

# Reset al commit anterior a la migración
git reset --hard <commit-hash>

# PRECAUCIÓN: Esto descartará todos los cambios
```

---

## Troubleshooting

### Error: "No se encontró migrations-map.json"

**Solución:** Crea el archivo `docs/migrations-map.json` con la matriz de movimientos.

Ver ejemplo en `docs/migrations-map.example.json`.

### Error: "Permission denied" al mover archivos

**Solución:**

```bash
# Windows: Ejecuta como administrador
# Linux/Mac: Usa sudo o cambia permisos
chmod -R u+w docs/
```

### Enlaces rotos después de migración

**Solución:**

1. Ejecuta `validate-docs-links.js --fix` para ver sugerencias
2. Actualiza enlaces manualmente
3. Re-valida hasta que todo esté OK

### Backup no se creó

**Solución:**

- Verifica espacio en disco
- Ejecuta manualmente: `cp -r docs/ docs_backup_manual/`

---

## Estructura de migrations-map.json

```json
[
  {
    "origen": "ruta/actual/archivo.md",
    "destino": "nueva/ruta/archivo.md",
    "accion": "mover|renombrar|fusionar|eliminar|mantener",
    "sensibilidad": "publico|privado",
    "notas": "Comentario opcional"
  }
]
```

**Acciones soportadas:**

- `mover` - Mover archivo a nueva ubicación
- `renombrar` - Renombrar archivo (alias de mover)
- `fusionar` - Concatenar múltiples archivos en uno
- `eliminar` - Eliminar archivo (con confirmación)
- `mantener` - No hacer nada (documentación)

**Para fusionar:**

```json
{
  "origen": ["archivo1.md", "archivo2.md", "archivo3.md"],
  "destino": "archivo-consolidado.md",
  "accion": "fusionar",
  "titulo": "Título del archivo consolidado"
}
```

---

## Logs y Reportes

Todos los logs se guardan en `logs/`:

- `migration-*.log` - Log detallado de migración
- `rollback-*.sh` - Script de rollback (bash)
- `broken-links-*.json` - Reporte de enlaces rotos

**Retención:** Mantener por 90 días, luego archivar.

---

## Dependencias

Estos scripts requieren:

- Node.js 18+
- Módulo `glob` (para validación de enlaces)

**Instalar dependencias:**

```bash
npm install glob
```

---

## Testing

Antes de ejecutar en producción, prueba en un directorio de test:

```bash
# Crear directorio de prueba
mkdir -p test-docs
cp -r docs/ test-docs/

# Modificar CONFIG.docsPath en los scripts
# Ejecutar scripts apuntando a test-docs/
```

---

## Contribuir

Si encuentras un bug o quieres mejorar estos scripts:

1. Crear issue describiendo el problema/mejora
2. Hacer PR con los cambios
3. Asegurar que pasa validación
4. Documentar cambios en este README

---

## Changelog

| Fecha      | Versión | Cambios                                                                 |
| ---------- | ------- | ----------------------------------------------------------------------- |
| 2025-10-20 | 1.0     | Creación inicial de los 3 scripts                                       |
| 2025-01-XX | 2.0     | Reorganización completa con índice y documentación de todos los scripts |

---

**Creado**: 2025-01-21
**Autor**: AI Agent (Cursor)
**Mantenedor**: Miguel Valdés
**Última actualización:** 2025-11-20
