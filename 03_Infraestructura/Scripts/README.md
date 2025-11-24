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

Migra archivos de documentación según la matriz de reubicación definida en `migrations-map.json`, soportando múltiples acciones como mover, renombrar, fusionar y eliminar.

**Ubicación:** `docs/03_Infraestructura/Scripts/migrate-docs-structure.js`

**Uso:**

```bash
# Simulación (ver cambios sin aplicar)
node docs/03_Infraestructura/Scripts/migrate-docs-structure.js --dry-run

# Ejecutar migración real
node docs/03_Infraestructura/Scripts/migrate-docs-structure.js --confirm

# Sin backup (no recomendado)
node docs/03_Infraestructura/Scripts/migrate-docs-structure.js --confirm --skip-backup
```

**Acciones soportadas:**

- `mover` - Mover archivo a nueva ubicación
- `renombrar` - Renombrar archivo (alias de mover)
- `fusionar` - Concatenar múltiples archivos en uno
- `eliminar` - Eliminar archivo (con confirmación)
- `mantener` - No hacer nada (documentación)

**Requisitos:**

- Archivo `docs/migrations-map.json` con la matriz de movimientos

**Salidas:**

- `logs/migration-YYYYMMDD_HHMMSS.log` - Log completo de operaciones
- `logs/rollback-YYYYMMDD_HHMMSS.sh` - Script de rollback automático
- `docs_backup_YYYYMMDD_HHMMSS/` - Backup completo antes de migración

**Funcionalidad:**

1. Crea backup completo de `docs/` (a menos que se use `--skip-backup`)
2. Valida existencia de archivos origen
3. Crea directorios destino si no existen
4. Ejecuta acciones según tipo:
   - **Mover/Renombrar:** Mueve archivo y actualiza referencias
   - **Fusionar:** Concatena múltiples archivos con separadores
   - **Eliminar:** Solicita confirmación antes de eliminar
5. Genera script de rollback para revertir cambios

---

### validate-docs-links.js

Valida que todos los enlaces relativos en archivos `.md` existan y apunten a archivos válidos.

**Ubicación:** `docs/03_Infraestructura/Scripts/validate-docs-links.js`

**Uso:**

```bash
# Validar todos los archivos
node docs/03_Infraestructura/Scripts/validate-docs-links.js

# Solo documentación pública (ignora 99_Privado/)
node docs/03_Infraestructura/Scripts/validate-docs-links.js --public-only

# Ver todos los enlaces validados
node docs/03_Infraestructura/Scripts/validate-docs-links.js --verbose

# Con sugerencias de corrección
node docs/03_Infraestructura/Scripts/validate-docs-links.js --fix
```

**Funcionalidad:**

1. Escanea todos los archivos `.md` en `docs/`
2. Extrae enlaces relativos (ignora `http://`, `https://`, `mailto:`, `#`)
3. Resuelve rutas relativas desde el archivo origen
4. Valida existencia del archivo destino
5. Genera sugerencias de corrección si se usa `--fix`

**Salidas:**

- Reporte en consola con enlaces rotos encontrados
- `logs/broken-links-YYYYMMDD_HHMMSS.json` - Reporte JSON con detalles

**Códigos de salida:**

- `0` - Todo OK, sin enlaces rotos
- `1` - Enlaces rotos encontrados

**Opciones:**

- `--public-only`: Ignora carpeta `99_Privado/`
- `--verbose`: Muestra todos los enlaces validados (no solo rotos)
- `--fix`: Genera sugerencias de corrección basadas en nombres de archivos similares

---

### generate-indexes.js

Genera/actualiza archivos `00_README.md` o `00_INDEX.md` en cada carpeta de documentación con listas ordenadas de archivos y subdirectorios.

**Ubicación:** `docs/03_Infraestructura/Scripts/generate-indexes.js`

**Uso:**

```bash
# Simulación (ver qué se generaría)
node docs/03_Infraestructura/Scripts/generate-indexes.js --dry-run

# Generar índices (preserva contenido personalizado)
node docs/03_Infraestructura/Scripts/generate-indexes.js

# Sobrescribir índices existentes completamente
node docs/03_Infraestructura/Scripts/generate-indexes.js --overwrite

# Con frontmatter YAML
node docs/03_Infraestructura/Scripts/generate-indexes.js --frontmatter
```

**Características:**

- Lista ordenada alfabéticamente de archivos `.md`
- Lista de subdirectorios con enlaces
- Preserva secciones personalizadas entre `<!-- CUSTOM -->` tags
- Genera enlaces relativos correctos
- Extrae títulos principales de archivos cuando es posible

**Funcionalidad:**

1. Recorre recursivamente `docs/`
2. Identifica archivos índice existentes (`00_README.md`, `00_INDEX.md`)
3. Analiza contenido de cada directorio
4. Genera índice con:
   - Lista de subdirectorios
   - Lista de archivos `.md` (excluyendo índices)
   - Preserva secciones personalizadas marcadas

---

### fix-broken-links.js

Corrige enlaces rotos en la documentación analizando el reporte de `validate-docs-links.js` y generando un plan de reparación basado en `migrations-map.json`.

**Ubicación:** `docs/03_Infraestructura/Scripts/fix-broken-links.js`

**Uso:**

```bash
# Generar plan de corrección (sin aplicar)
node docs/03_Infraestructura/Scripts/fix-broken-links.js

# Aplicar correcciones automáticamente
node docs/03_Infraestructura/Scripts/fix-broken-links.js --apply
```

**Funcionalidad:**

1. Busca el reporte más reciente de `validate-docs-links.js`
2. Carga `migrations-map.json` para mapear rutas antiguas → nuevas
3. Analiza cada enlace roto y genera sugerencias:
   - Busca en migrations-map por nombre de archivo
   - Busca archivos similares por nombre
   - Sugiere correcciones basadas en estructura de directorios
4. Genera plan de corrección con cambios propuestos
5. Si se usa `--apply`, modifica archivos automáticamente

**Salidas:**

- `logs/fix-links-plan-YYYYMMDD.json` - Plan de corrección detallado
- `logs/fix-links-summary.md` - Resumen en Markdown

**⚠️ Advertencia:** Usa `--apply` solo después de revisar el plan generado.

---

### generate-migrations-map.js

Genera automáticamente el archivo `migrations-map.json` completo con todas las migraciones basado en reglas de reestructuración.

**Ubicación:** `docs/03_Infraestructura/Scripts/generate-migrations-map.js`

**Uso:**

```bash
# Generar migrations-map.json
node docs/03_Infraestructura/Scripts/generate-migrations-map.js
```

**Funcionalidad:**

1. Define reglas de mapeo por patrones de carpetas
2. Escanea estructura actual de `docs/`
3. Aplica reglas para generar rutas destino
4. Genera archivo JSON con todas las migraciones

**Reglas de mapeo:**

- Archivos raíz → `00_Overview/`
- `2. BACKEND/2.1-endpoints/` → `01_Backend/APIs/{api}-api/Endpoints/`
- `2. BACKEND/2.2-users/` → `01_Backend/APIs/users-api/Guides/`
- `db/` → `01_Backend/Database/Tables/`
- Y muchas más...

**Salida:**

- `docs/migrations-map.json` - Archivo con todas las migraciones (334+ entradas)

---

### sweep-backend-docs.js

Detecta archivos `.md` fuera de `docs/` y propone su ubicación en la nueva estructura de documentación.

**Ubicación:** `docs/03_Infraestructura/Scripts/sweep-backend-docs.js`

**Uso:**

```bash
# Escanear y generar plan de migración
node docs/03_Infraestructura/Scripts/sweep-backend-docs.js
```

**Funcionalidad:**

1. Escanea todo el backend buscando archivos `.md` fuera de `docs/`
2. Excluye directorios comunes (`node_modules`, `.git`, `dist`, `build`, `coverage`)
3. Analiza cada archivo y propone ubicación según estructura nueva
4. Genera plan de migración con sugerencias

**Salidas:**

- `logs/sweep-plan-YYYYMMDD.json` - Plan de migración detallado
- `logs/sweep-summary.md` - Resumen en Markdown

---

### run-migration.sh

Script shell para ejecutar migraciones completas de documentación en el orden correcto.

**Ubicación:** `docs/03_Infraestructura/Scripts/run-migration.sh`

**Uso:**

```bash
# Ejecutar migración completa
bash docs/03_Infraestructura/Scripts/run-migration.sh
```

**Flujo de ejecución:**

1. Validar estructura y enlaces
2. Generar migrations-map si no existe
3. Ejecutar migración de estructura
4. Generar índices locales
5. Validar enlaces después de migración
6. Corregir enlaces rotos si es necesario

---

## 🔍 Scripts de Auditoría y Validación

### docs-audit.js

Realiza una auditoría general de la documentación verificando estructura, enlaces, sincronización entre entities y DDL, y formato de archivos.

**Ubicación:** `docs/03_Infraestructura/Scripts/docs-audit.js`

**Uso:**

```bash
# Ejecutar auditoría completa
node docs/03_Infraestructura/Scripts/docs-audit.js
```

**Funcionalidad:**

1. **Validación de estructura:**
   - Verifica existencia de directorios clave (`docs/db/`, `docs/DB_MODELS.md`)
   - Valida presencia de directorio de entities

2. **Análisis de tablas documentadas:**
   - Compara archivos en `docs/db/` con enlaces en `DB_MODELS.md`
   - Detecta archivos sin indexar y enlaces rotos

3. **Validación de entities vs documentación:**
   - Compara entities en `layers/multi-mysql-layer/src/entities/` con DDL documentados
   - Genera variaciones de nombres para matching flexible
   - Identifica entities sin documentación correspondiente

4. **Validación de enlaces internos:**
   - Verifica enlaces en archivos principales (`README.md`, `DB_MODELS.md`, `AGENTS.md`, `ESTRUCTURA_PROYECTO.md`)
   - Detecta enlaces rotos y rutas inválidas

5. **Validación de formato DDL:**
   - Verifica que archivos DDL tengan `CREATE TABLE`
   - Valida presencia de sección `## DDL`
   - Comprueba existencia de resumen de columnas

**Salidas:**

- Reporte en consola con resumen de problemas
- Archivo JSON: `docs-audit-report.json` con detalles completos

**Códigos de salida:**

- `0` - Todo OK, sin problemas críticos
- `1` - Se encontraron problemas que requieren atención

---

### docs-content-audit.js

Realiza una auditoría del contenido de la documentación identificando archivos vacíos, incompletos o con TODOs pendientes.

**Ubicación:** `docs/03_Infraestructura/Scripts/docs-content-audit.js`

**Uso:**

```bash
# Ejecutar auditoría de contenido
node docs/03_Infraestructura/Scripts/docs-content-audit.js
```

**Funcionalidad:**

1. **Detección de archivos vacíos:**
   - Identifica archivos `.md` completamente vacíos

2. **Detección de contenido incompleto:**
   - Archivos con menos de 200 caracteres (configurable)
   - Archivos con contenido mínimo insuficiente

3. **Detección de TODOs/PENDIENTES:**
   - Busca patrones: `TODO`, `PENDIENTE`, `WIP`, `COMPLETAR`, `AGREGAR`, `FALTA`, `FIXME`, `XXX`
   - Cuenta cantidad de TODOs por archivo

4. **Cálculo de salud general:**
   - Porcentaje de archivos completos
   - Identificación de archivos que necesitan trabajo

**Salidas:**

- Reporte en consola con estadísticas y recomendaciones
- Archivo JSON: `docs-content-audit-report.json` con detalles

**Códigos de salida:**

- `0` - Salud de documentación ≥ 70%
- `1` - Salud de documentación < 70%

**Recomendaciones:**

El script genera recomendaciones automáticas basadas en los hallazgos:
- Prioridad ALTA: Completar archivos vacíos
- Prioridad MEDIA: Expandir archivos con contenido mínimo
- Prioridad BAJA: Resolver TODOs pendientes

---

### docs-privacy-audit.js

Realiza una auditoría de privacidad y seguridad en la documentación buscando información sensible como credenciales, datos personales, tokens, etc.

**Ubicación:** `docs/03_Infraestructura/Scripts/docs-privacy-audit.js`

**Uso:**

```bash
# Ejecutar auditoría de privacidad
node docs/03_Infraestructura/Scripts/docs-privacy-audit.js
```

**Patrones detectados:**

**CRÍTICO:**
- Contraseñas en texto plano (`password=...`)
- API Keys (`api_key=...`, `api-key=...`)
- AWS Access Keys (`AKIA...`)
- Claves privadas (`-----BEGIN PRIVATE KEY-----`)
- JWT Tokens (excluyendo ejemplos marcados)

**ALTA:**
- Emails reales (excluyendo dominios de ejemplo)
- Números telefónicos (10 dígitos mexicanos)
- RFC/CURP mexicanos
- Session IDs
- Información médica personal

**MEDIA:**
- URLs de producción (`multinature.com`, `multinature.mx`)
- Direcciones IP públicas (excluyendo localhost/privadas)

**Funcionalidad:**

1. Escanea todos los archivos `.md` en `docs/`
2. Aplica patrones regex para detectar información sensible
3. Valida exclusiones (ejemplos, placeholders, datos de prueba)
4. Clasifica hallazgos por severidad
5. Genera reporte detallado con ubicación exacta

**Salidas:**

- Reporte en consola con problemas encontrados por severidad
- Archivo JSON: `docs-privacy-audit-report.json` con detalles completos

**Códigos de salida:**

- `0` - Solo problemas menores (MEDIA/BAJA)
- `1` - Problemas de alta prioridad encontrados
- `2` - Problemas críticos de seguridad encontrados

**Recomendaciones:**

- **CRÍTICO:** Rotar credenciales expuestas inmediatamente
- **ALTA:** Anonimizar datos reales de usuarios
- **MEDIA:** Validar URLs e IPs de producción

---

### docs-verify-and-index.js

Verifica la estructura de la documentación y genera un índice maestro completo con estadísticas y navegación.

**Ubicación:** `docs/03_Infraestructura/Scripts/docs-verify-and-index.js`

**Uso:**

```bash
# Verificar e indexar documentación
node docs/03_Infraestructura/Scripts/docs-verify-and-index.js
```

**Funcionalidad:**

1. **Escaneo completo:**
   - Recorre todos los archivos `.md` en `docs/`
   - Calcula tamaños y estadísticas
   - Extrae títulos principales de cada archivo

2. **Clasificación por tipo:**
   - DDL/Database
   - API Endpoints
   - Backend Docs
   - Frontend Docs
   - Negocio
   - Definición
   - Testing
   - Refactors

3. **Generación de índice maestro:**
   - Resumen ejecutivo con estadísticas
   - Documentación agrupada por tipo
   - Documentación por directorio
   - Índice alfabético
   - Guías de navegación por rol

**Salidas:**

- Archivo Markdown: `DOCUMENTATION_INDEX.md` - Índice maestro completo
- Archivo JSON: `docs-index-report.json` - Datos estructurados

**Estructura del índice generado:**

- Tabla de contenido
- Resumen ejecutivo (total de documentos, tamaño, categorías)
- Top 5 documentos más extensos
- Documentación por tipo con agrupación por API
- Documentación por directorio
- Índice alfabético (primeros 100)
- Estadísticas detalladas (por tipo, distribución por tamaño)
- Guías de navegación (por rol, por dominio)

---

### validate-entities-vs-ddl.js

Valida que las entities definidas en código estén alineadas con los DDL documentados, detectando discrepancias en columnas, tipos y estructura.

**Ubicación:** `docs/03_Infraestructura/Scripts/validate-entities-vs-ddl.js`

**Uso:**

```bash
# Validar todas las entities
node docs/03_Infraestructura/Scripts/validate-entities-vs-ddl.js

# Validar una entity específica
node docs/03_Infraestructura/Scripts/validate-entities-vs-ddl.js --entity=foods

# Modo verbose (más detalles)
node docs/03_Infraestructura/Scripts/validate-entities-vs-ddl.js -v

# Modo auto-fix (requiere confirmación)
node docs/03_Infraestructura/Scripts/validate-entities-vs-ddl.js --fix
```

**Funcionalidad:**

1. **Extracción de columnas DDL:**
   - Parsea archivos `.md` en `docs/db/`
   - Extrae columnas del bloque `CREATE TABLE`
   - Ignora constraints, keys y comentarios

2. **Extracción de campos de entities:**
   - Parsea archivos `.js` en `layers/multi-mysql-layer/src/entities/`
   - Extrae propiedades de decoradores `@Column`
   - Identifica tipos y restricciones

3. **Comparación:**
   - Columnas en DDL pero no en entity
   - Columnas en entity pero no en DDL
   - Discrepancias de tipos
   - Columnas con nombres diferentes

**Opciones:**

- `--entity=NAME`: Validar solo una entity específica
- `--fix`: Modo auto-fix (requiere confirmación manual)
- `--verbose` o `-v`: Mostrar detalles adicionales

**Documentación completa:** Ver [validation-tools.md](./validation-tools.md)

---

### sanitize-docs-security.js

Sanitiza la documentación removiendo información sensible por seguridad, reemplazándola con placeholders seguros.

**Ubicación:** `docs/03_Infraestructura/Scripts/sanitize-docs-security.js`

**Uso:**

```bash
# Modo simulación (ver cambios sin aplicar)
node docs/03_Infraestructura/Scripts/sanitize-docs-security.js --dry-run

# Aplicar sanitización con backup
node docs/03_Infraestructura/Scripts/sanitize-docs-security.js --backup

# Aplicar sanitización sin backup (no recomendado)
node docs/03_Infraestructura/Scripts/sanitize-docs-security.js
```

**Reemplazos realizados:**

1. **JWT Tokens:**
   - Reemplaza tokens reales por `eyJ...EXAMPLE_TOKEN_PLACEHOLDER_DO_NOT_USE`

2. **Emails reales:**
   - Reemplaza emails específicos por dominios `.multinature.local`
   - Ejemplos: `mvaldes988@gmail.com` → `admin.ejemplo@multinature.local`

3. **Números telefónicos:**
   - Reemplaza números reales por patrones estándar (`+525550001000`)

4. **URLs de producción:**
   - Reemplaza URLs reales por placeholders

**Opciones:**

- `--dry-run`: Muestra cambios sin aplicarlos
- `--backup`: Crea backup de archivos antes de modificar

**⚠️ Advertencia:** Este script modifica archivos permanentemente. Siempre usa `--dry-run` primero y `--backup` en producción.

---

## 📊 Scripts de Índices

### update-docs-index.ts

Script principal en TypeScript para actualizar índices de README.md en múltiples ubicaciones de documentación.

**Ubicación:** `docs/03_Infraestructura/Scripts/update-docs-index.ts`

**Uso:**

```bash
# Ejecutar actualización (requiere tsx o ts-node)
npx tsx docs/03_Infraestructura/Scripts/update-docs-index.ts

# Modo simulación
npx tsx docs/03_Infraestructura/Scripts/update-docs-index.ts --dry-run

# Modo verbose
npx tsx docs/03_Infraestructura/Scripts/update-docs-index.ts --verbose
```

**Funcionalidad:**

1. Actualiza múltiples archivos README.md en ubicaciones específicas:
   - `docs/README.md`
   - `docs/00_Overview/README.md`
   - `docs/01_Backend/README.md`
   - `docs/02_Frontend/README.md`
   - `docs/05_Negocio/README.md`
   - `docs/99_Privado/README.md`

2. Genera listas ordenadas de archivos y directorios
3. Preserva secciones personalizadas
4. Maneja prefijos numéricos en nombres de archivos

**Opciones:**

- `--dry-run`: Muestra cambios sin aplicarlos
- `--verbose`: Muestra información detallada de procesamiento

---

### update-docs-index.ps1

Wrapper PowerShell para ejecutar `update-docs-index.ts`. Detecta automáticamente `tsx`, `ts-node` o `node` disponible.

**Ubicación:** `docs/03_Infraestructura/Scripts/update-docs-index.ps1`

**Uso:**

```powershell
# Ejecutar actualización
.\docs\03_Infraestructura\Scripts\update-docs-index.ps1

# Con opciones
.\docs\03_Infraestructura\Scripts\update-docs-index.ps1 -DryRun
.\docs\03_Infraestructura\Scripts\update-docs-index.ps1 -Verbose
```

**Funcionalidad:**

- Detecta automáticamente herramienta disponible (`tsx` > `ts-node` > `node`)
- Pasa argumentos al script TypeScript principal
- Maneja errores si no hay herramientas disponibles

---

### update-docs-index.sh

Wrapper Bash/POSIX para ejecutar `update-docs-index.ts`. Detecta automáticamente `tsx`, `ts-node` o `node` disponible.

**Ubicación:** `docs/03_Infraestructura/Scripts/update-docs-index.sh`

**Uso:**

```bash
# Ejecutar actualización
bash docs/03_Infraestructura/Scripts/update-docs-index.sh

# Con opciones
bash docs/03_Infraestructura/Scripts/update-docs-index.sh --dry-run
bash docs/03_Infraestructura/Scripts/update-docs-index.sh --verbose
```

**Funcionalidad:**

- Compatible con shells POSIX (bash, zsh, sh)
- Detecta automáticamente herramienta disponible
- Pasa argumentos al script TypeScript principal

---

### update-db-models-index.js

Actualiza el archivo `DB_MODELS.md` con una lista completa de todas las tablas documentadas en `docs/db/`.

**Ubicación:** `docs/03_Infraestructura/Scripts/update-db-models-index.js`

**Uso:**

```bash
# Actualizar índice de modelos de BD
node docs/03_Infraestructura/Scripts/update-db-models-index.js
```

**Funcionalidad:**

1. Escanea `docs/db/` buscando archivos `.md`
2. Excluye `TEMPLATE_TABLE.md`
3. Ordena alfabéticamente
4. Genera enlaces en formato Markdown
5. Actualiza `docs/DB_MODELS.md` solo si hay cambios

**Salida:**

- Actualiza `docs/DB_MODELS.md` con lista completa de tablas
- Muestra cantidad de tablas indexadas

**Nota:** El script solo actualiza si hay cambios, evitando commits innecesarios.

---

### docs-normalize-and-index.js

Normaliza formato de archivos Markdown y ejecuta scripts de indexación en secuencia.

**Ubicación:** `docs/03_Infraestructura/Scripts/docs-normalize-and-index.js`

**Uso:**

```bash
# Normalizar e indexar documentación
node docs/03_Infraestructura/Scripts/docs-normalize-and-index.js
```

**Funcionalidad:**

1. **Normalización de Markdown:**
   - Asegura heading principal en cada archivo
   - Normaliza saltos de línea al final
   - Elimina múltiples líneas vacías consecutivas
   - Elimina espacios al final de líneas
   - Normaliza formato de headings (`#` seguido de espacio)
   - Normaliza formato de listas

2. **Ejecución de scripts de indexación:**
   - Ejecuta `docs-verify-and-index.js`
   - Ejecuta `update-db-models-index.js`

**Estadísticas:**

- Archivos escaneados
- Archivos normalizados
- Cambios realizados por archivo

**Salidas:**

- Archivos modificados con formato normalizado
- Índices actualizados automáticamente

---

## 🏥 Scripts de Healthcheck

### healthcheck-runner.js

Ejecuta automáticamente todas las peticiones HTTP a los endpoints healthcheck de la colección de Bruno, validando el estado de todas las APIs.

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

**Funcionalidad:**

1. **Parseo de archivos Bruno:**
   - Lee archivos `.bru` de la colección de Bruno
   - Extrae método HTTP y URL de cada request
   - Parsea variables de entorno desde archivos `.bru.env`

2. **Ejecución de healthchecks:**
   - Ejecuta requests HTTP/HTTPS a cada endpoint healthcheck
   - Maneja timeouts y errores de conexión
   - Valida códigos de estado HTTP

3. **Reporte de resultados:**
   - Muestra estado de cada API (✅ OK, ❌ ERROR)
   - Resumen de APIs saludables vs con problemas
   - Tiempo de respuesta de cada endpoint

**Requisitos:**

- Colección de Bruno con archivos `.bru` en estructura estándar
- Archivos de entorno `.bru.env` para cada ambiente

**Salidas:**

- Reporte en consola con estado de cada API
- Códigos de color para fácil identificación (verde=OK, rojo=ERROR)

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
-- Generado: 2025-11-24T10:30:00.000Z
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

**Creado**: 2025-11-24
**Autor**: AI Agent (Cursor)
**Mantenedor**: Miguel Valdés
**Última actualización:** 2025-11-20
