# Scripts de Infraestructura

Colección de scripts para gestión, mantenimiento y automatización de tareas en el backend de Multinature.

---

## 📑 Índice

### 🔧 Scripts de Git y Build

- [build-layers.bat](#build-layersbat) - Construir todas las layers
- [commitAndPush-git-repos.bat](#commitandpush-git-reposbat) - Commit y push a múltiples repositorios
- [pull-git-repos.bat](#pull-git-reposbat) - Actualizar todos los repositorios Git
- [status-git-repos.bat](#status-git-reposbat) - Estado de todos los repositorios Git

### 🚀 Scripts de Despliegue

- [deploy-apis-lambdas.bat](#deploy-apis-lambdasbat) - Desplegar todas las APIs Lambda

### 🔍 Scripts de Validación y Auditoría

- [validate-docs-links.js](#validate-docs-linksjs) - Validar enlaces relativos en archivos .md
- [validate-entities-vs-ddl.js](#validate-entities-vs-ddljs) - Validar entities vs DDL (ver [validation-tools.md](./validation-tools.md))

### 🏥 Scripts de Healthcheck

- [healthcheck-runner.js](#healthcheck-runnerjs) - Ejecutar healthchecks automáticamente (ver [healthcheck-runner.md](./healthcheck-runner.md))

### 🗄️ Scripts de Base de Datos

- [export-form-templates.js](#export-form-templatesjs) - Exportar form templates y registros relacionados a SQL

---

## 🔧 Scripts de Git y Build

### build-layers.bat

Construye todas las layers del proyecto ejecutando `npm run build` en cada una.

**Ubicación:** `docs/03_Infraestructura/Scripts/build-layers.bat`

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

**Ubicación:** `docs/03_Infraestructura/Scripts/commitAndPush-git-repos.bat`

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

**Ubicación:** `docs/03_Infraestructura/Scripts/pull-git-repos.bat`

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

**Ubicación:** `docs/03_Infraestructura/Scripts/status-git-repos.bat`

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

**Ubicación:** `docs/03_Infraestructura/Scripts/deploy-apis-lambdas.bat`

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

## 🔍 Scripts de Validación y Auditoría

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
   - Parsea archivos `.md` en `docs/04_SQL/tables/`
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

## 📚 Documentación Adicional

- **[validation-tools.md](./validation-tools.md)** - Guía completa de herramientas de validación
- **[healthcheck-runner.md](./healthcheck-runner.md)** - Documentación detallada del healthcheck runner

---

## 🔗 Enlaces Relacionados

- **[04_SQL](../../04_SQL/README.md)** - Documentación de base de datos y DDL
- **[APIs](../../01_Backend/APIs/README.md)** - Documentación de todas las APIs

---

- **Última actualización:** 2025-12-15
- **Total de archivos:** 7 (incluye subdirectorios)
- **Total de scripts:** 9
