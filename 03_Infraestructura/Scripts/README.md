# Scripts de Infraestructura

Colección de scripts para gestión, mantenimiento y automatización de tareas en el backend de Multinature.

---

## 📑 Índice

### 🔧 Scripts de Git y Build

- [build-layers.bat](#build-layersbat) - Construir todas las layers
- [commit-and-push.js](#commit-and-pushjs) - Commit y push a múltiples repositorios (Node.js, multiplataforma)
- [pull-git-repos.bat](#pull-git-reposbat) - Actualizar todos los repositorios Git
- [status-git-repos.bat](#status-git-reposbat) - Estado de todos los repositorios Git
- [create-prs.js](#create-prsjs) - Crear Pull Requests (Node.js, multiplataforma)

### 🚀 Scripts de Despliegue

- [deploy-apis-lambdas.bat](#deploy-apis-lambdasbat) - Desplegar todas las APIs Lambda
- [update-lambda-layers.js](#update-lambda-layersjs) - Actualizar capas (layers) en funciones Lambda (Node.js, multiplataforma)

### 🔍 Scripts de Validación y Auditoría

- [validate-docs-links.js](#validate-docs-linksjs) - Validar enlaces relativos en archivos .md
- [validate-entities-vs-ddl.js](#validate-entities-vs-ddljs) - Validar entities vs DDL (ver [validation-tools.md](./validation-tools.md))

### 🏥 Scripts de Healthcheck

- [healthcheck-runner.js](#healthcheck-runnerjs) - Ejecutar healthchecks automáticamente (ver [healthcheck-runner.md](./healthcheck-runner.md))

### 🔐 Scripts de Seguridad

- [encrypt-decrypt.js](#encrypt-decryptjs) - Encriptar y comparar contraseñas con bcryptjs

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

### commit-and-push.js

Script interactivo y multiplataforma (Node.js) para hacer commit y push a múltiples repositorios Git (APIs y/o Layers).

**Ubicación:** `docs/03_Infraestructura/Scripts/commit-and-push.js`

**Uso:**

```bash
# Modo interactivo (desde backend/)
node docs/03_Infraestructura/Scripts/commit-and-push.js

# Con parámetros (modo no interactivo)
node docs/03_Infraestructura/Scripts/commit-and-push.js -m="Fix bug" --process=apis

# Con exclusiones
node docs/03_Infraestructura/Scripts/commit-and-push.js -m="Update" --process=both --exclude-apis=bookings-api

# Saltar confirmación
node docs/03_Infraestructura/Scripts/commit-and-push.js -m="Release" --process=apis --yes
```

**Opciones:**

| Opción | Descripción |
|--------|-------------|
| `-m, --message=MSG` | Mensaje de commit (requerido, o se pregunta interactivamente) |
| `--pull=BRANCH` | Rama origen para pull (default: `develop`) |
| `--push=BRANCH` | Rama destino para push (default: igual a pull) |
| `--process=TYPE` | Qué procesar: `apis`, `layers`, o `both` |
| `--exclude-apis=REPOS` | APIs a excluir (separadas por coma) |
| `--exclude-layers=REPOS` | Layers a excluir (separadas por coma) |
| `-y, --yes` | Saltar confirmación |
| `--help, -h` | Mostrar ayuda |

**Características:**

- **Multiplataforma**: Funciona en Windows, Linux y macOS
- Solicita mensaje de commit interactivamente (si no se proporciona)
- Permite especificar rama origen (source branch) para pull
- Permite especificar rama destino (destination branch) para push
- Opción para procesar solo APIs, solo Layers, o ambos
- **Permite excluir repositorios específicos** de forma interactiva o por parámetro
- Confirmación antes de ejecutar (omitible con `--yes`)
- Manejo automático de checkout y creación de ramas
- Validación de repositorios Git
- Resumen con estadísticas al finalizar

**Flujo interactivo:**

1. Solicita mensaje de commit
2. Solicita rama origen (default: `develop`)
3. Solicita rama destino (default: igual a origen)
4. Selecciona qué procesar (APIs/Layers/Ambos)
5. Muestra lista de repositorios disponibles y permite excluir algunos
6. Muestra resumen (incluyendo repos excluidos) y solicita confirmación
7. Ejecuta checkout, pull, add, commit y push en cada repo (excepto los excluidos)

**Ejemplo de exclusión interactiva:**

```
================================================================================
Available APIs:
================================================================================
  [1] bookings-api
  [2] commissions-api
  [3] users-api
  ...

Enter the names of APIs to EXCLUDE (comma-separated, or press Enter to include all):
Example: bookings-api,users-api
APIs to exclude: bookings-api
```

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

### create-prs.js

Script multiplataforma (Node.js) para crear Pull Requests automáticamente desde una rama origen hacia una rama destino para todos los repositorios Git del workspace.

**Ubicación:** `docs/03_Infraestructura/Scripts/create-prs.js`

**Uso:**

```bash
# Modo interactivo (desde backend/)
node docs/03_Infraestructura/Scripts/create-prs.js

# Modo dry-run (ver qué se haría sin crear PRs)
node docs/03_Infraestructura/Scripts/create-prs.js --dry-run

# Con título personalizado
node docs/03_Infraestructura/Scripts/create-prs.js --title="v1.2.0"

# Con título y descripción personalizados
node docs/03_Infraestructura/Scripts/create-prs.js --title="Release v1.0.0" --body="Descripción del release"

# Excluyendo repositorios específicos (sin selección interactiva)
node docs/03_Infraestructura/Scripts/create-prs.js --exclude=bookings-api,users-api
# node docs/03_Infraestructura/Scripts/create-prs.js --exclude=api-collection,docs,multi-commons-layer,multi-emails-layer,multi-mysql-layer

# Desde una rama diferente a develop
node docs/03_Infraestructura/Scripts/create-prs.js --source=feature/new-feature --target=develop
# node docs/03_Infraestructura/Scripts/create-prs.js --source=fix-email-esocket-and-security-groups --target=develop

# Ayuda
node docs/03_Infraestructura/Scripts/create-prs.js --help
```

**Opciones:**

| Opción | Descripción |
|--------|-------------|
| `--dry-run` | Muestra qué PRs se crearían sin crearlos realmente |
| `--title=TITLE` | Título personalizado para los PRs (default: "Merge {source} into {target}") |
| `--body=BODY` | Descripción personalizada para los PRs |
| `--source=BRANCH` | Rama origen para los PRs (default: `develop`) |
| `--target=BRANCH` | Rama destino para los PRs (default: `master main`) |
| `--exclude=REPOS` | Lista de repositorios a excluir separados por comas |
| `--help, -h` | Mostrar ayuda |

**Exclusión de repositorios:**

Si no se proporciona el parámetro `--exclude`, el script mostrará una lista interactiva de todos los repositorios disponibles:

```
============================================================================
                    REPOSITORY SELECTION
============================================================================

Available Layers:
--------------------------------------------------------------------------------
  [1] multi-commons-layer
  [2] multi-mysql-layer

Available APIs:
--------------------------------------------------------------------------------
  [3] bookings-api
  [4] commissions-api
  [5] users-api

Other Repositories:
--------------------------------------------------------------------------------
  [6] api-collection
  [7] docs

--------------------------------------------------------------------------------
Enter the names of repositories to EXCLUDE (comma-separated)
Press Enter to include ALL repositories
Example: bookings-api,users-api,multi-commons-layer
--------------------------------------------------------------------------------
Repositories to exclude: bookings-api,users-api
```

**Requisitos:**

1. **GitHub Personal Access Token:**
   - Debe tener permisos para crear PRs en los repositorios (`repo` scope)
   - Configurar como variable de entorno `GITHUB_TOKEN`:
   
   ```bash
   # Windows CMD
   set GITHUB_TOKEN=tu_token_aqui
   
   # Windows PowerShell
   $env:GITHUB_TOKEN="tu_token_aqui"
   
   # Linux/macOS
   export GITHUB_TOKEN=tu_token_aqui
   ```

2. **Node.js** instalado (ya lo tienes si usas este proyecto)

3. **Repositorios Git configurados** con remotes de GitHub válidos

**Funcionalidad:**

1. **Selección de repositorios:**
   - Muestra lista interactiva de todos los repositorios disponibles
   - Permite excluir repositorios específicos antes de procesar
   - Escanea todos los directorios en `apis/` y `layers/`
   - Procesa `api-collection` y `docs` si son repositorios Git

2. **Validaciones:**
   - Verifica que cada directorio sea un repositorio Git
   - Extrae información del repositorio desde el remote `origin`
   - Verifica que la rama origen exista
   - Detecta automáticamente si el repositorio usa `master` o `main` como rama principal
   - Verifica si ya existe un PR abierto con las mismas ramas

3. **Creación de PRs:**
   - Crea un PR desde la rama origen hacia la rama destino especificada
   - Usa la API de GitHub para crear los PRs
   - Muestra el enlace del PR creado

4. **Manejo de errores:**
   - Salta repositorios excluidos por el usuario
   - Salta repositorios que no son de GitHub
   - Salta repositorios sin la rama origen
   - Salta repositorios sin rama destino (master/main)
   - Salta si ya existe un PR abierto con las mismas ramas
   - Muestra errores detallados si falla la creación

**Ejemplo de salida:**

```
============================================================================
                    CREATE PULL REQUESTS
============================================================================
Root Directory: /home/user/backend
Source Branch: develop
Target Branches: master main
Dry Run: false
Excluded Repos: bookings-api, users-api
============================================================================

[1/4] PROCESSING LAYERS...
---------------------------------------------------------------------------

----------------------------------------
multi-commons-layer
----------------------------------------
  Repository: Inmunolabs/multinature-commons-layer
  Branches: develop -> master
  Action: Creating PR...
  Status: [OK] PR created successfully
  URL: https://github.com/Inmunolabs/multinature-commons-layer/pull/123

[2/4] PROCESSING APIs...
---------------------------------------------------------------------------

----------------------------------------
bookings-api
----------------------------------------
  Status: [SKIP] Excluded by user

...

============================================================================
                             SUMMARY
============================================================================
Successful: 13
Failed: 0
Skipped: 5
============================================================================
```

**Notas:**

- **Multiplataforma**: Funciona en Windows, Linux y macOS
- El script usa la API de GitHub directamente (no requiere GitHub CLI)
- Los PRs se crean con estado "open" por defecto
- Si un PR ya existe, el script lo detecta y lo salta automáticamente
- Incluye rate-limiting automático para evitar problemas con la API de GitHub

**Códigos de salida:**

- `0` - Éxito (todos los PRs creados o todos saltados por razones válidas)
- `1` - Error (fallos al crear PRs o problemas de configuración)

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

### update-lambda-layers.js

Script multiplataforma (Node.js) para actualizar las capas (layers) en múltiples funciones Lambda de AWS que comienzan con `multi`.

**Ubicación:** `docs/03_Infraestructura/Scripts/update-lambda-layers.js`

**Uso:**

```bash
# Solo listar funciones y sus capas actuales
node docs/03_Infraestructura/Scripts/update-lambda-layers.js --list-only

# Modo interactivo (pregunta versiones, muestra la última disponible)
node docs/03_Infraestructura/Scripts/update-lambda-layers.js

# Dry-run: ver qué cambios se harían sin ejecutarlos
node docs/03_Infraestructura/Scripts/update-lambda-layers.js --dry-run

# Especificar versiones directamente
node docs/03_Infraestructura/Scripts/update-lambda-layers.js --layers=multi-commons-layer:310,multi-mysql-layer:370

# Filtrar solo funciones de desarrollo
node docs/03_Infraestructura/Scripts/update-lambda-layers.js --filter=dev --layers=multi-commons-layer:310

# Filtrar solo funciones de producción, sin confirmación
node docs/03_Infraestructura/Scripts/update-lambda-layers.js --filter=prod --layers=multi-commons-layer:310 --yes

# Ayuda
node docs/03_Infraestructura/Scripts/update-lambda-layers.js --help
```

**Opciones:**

| Opción | Descripción |
|--------|-------------|
| `--list-only` | Solo listar funciones y sus capas actuales, sin modificar nada |
| `--dry-run` | Mostrar qué cambios se harían sin aplicarlos |
| `--filter=KEYWORD` | Filtrar funciones por palabra clave (e.g. `dev`, `prod`) |
| `--layers=LAYER:VER,...` | Especificar versiones directamente (e.g. `multi-commons-layer:310,multi-mysql-layer:370`) |
| `-y, --yes` | Saltar confirmación |
| `--help, -h` | Mostrar ayuda |

**Características:**

- **Multiplataforma**: Funciona en Windows, Linux y macOS
- **Autodetección**: Lista automáticamente todas las funciones Lambda con prefijo `multi`
- **Versión más reciente**: En modo interactivo, muestra la última versión disponible de cada capa
- **Dry-run**: Previsualiza los cambios sin aplicarlos
- **Filtrado**: Filtra funciones por entorno (`dev`, `prod`) u otro texto
- **Resumen detallado**: Muestra estadísticas de funciones actualizadas, omitidas y con error
- **Rate-limiting**: Incluye delay entre actualizaciones para evitar throttling de AWS

**Capas principales:**

- `multi-mysql-layer` - Capa con entidades y utilidades de MySQL/TypeORM
- `multi-commons-layer` - Capa con utilidades comunes compartidas
- `multi-emails-layer` - Capa con funcionalidades de envío de emails

**Requisitos:**

- AWS CLI configurado con credenciales apropiadas (`aws configure`)
- Permisos IAM: `lambda:ListFunctions`, `lambda:GetFunctionConfiguration`, `lambda:UpdateFunctionConfiguration`, `lambda:ListLayerVersions`, `sts:GetCallerIdentity`

**Ejemplo de salida:**

```
============================================================================
                    UPDATE LAMBDA LAYERS
============================================================================
  Region:          us-east-1
  Function Prefix: multi
  Filter:          dev
  Dry Run:         YES
============================================================================

[1/5] Obteniendo Account ID de AWS...
  Account ID: 123456789012

[2/5] Listando funciones Lambda...
  Filtradas por "dev": 9 funciones

[3/5] Obteniendo capas actuales de cada funcion...

  [1/9] multi-addresses-dev-api
         multi-mysql-layer:369
         multi-commons-layer:308
  [2/9] multi-bookings-dev-api
         multi-commons-layer:308
         multi-mysql-layer:369
         multi-emails-layer:60
  ...

[4/5] Determinando nuevas versiones de capas...
  Versiones especificadas por parametro:
    multi-commons-layer: 310
    multi-mysql-layer: 370

[5/5] Calculando y aplicando cambios...

          CAMBIOS PLANIFICADOS

  Nuevas versiones a aplicar:
    multi-commons-layer -> 310
    multi-mysql-layer -> 370

  multi-addresses-dev-api
    multi-mysql-layer: 369 -> 370
    multi-commons-layer: 308 -> 310
  multi-bookings-dev-api
    multi-commons-layer: 308 -> 310
    multi-mysql-layer: 369 -> 370
  ...

  [DRY-RUN] No se aplicaron cambios.
```

**Códigos de salida:**

- `0` - Éxito (todas las actualizaciones exitosas o sin cambios)
- `1` - Error (al menos una función falló al actualizar)

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

## 🔐 Scripts de Seguridad

### encrypt-decrypt.js

Script interactivo y multiplataforma (Node.js) para encriptar (hash) contraseñas y comparar un texto plano contra un hash existente usando bcryptjs.

**Ubicación:** `docs/03_Infraestructura/Scripts/encrypt-decrypt.js`

**Uso:**

```bash
# Modo interactivo (desde backend/)
node docs/03_Infraestructura/Scripts/encrypt-decrypt.js

# Encriptar una contraseña
node docs/03_Infraestructura/Scripts/encrypt-decrypt.js --encrypt="MiPassword123"

# Encriptar con salt rounds personalizado
node docs/03_Infraestructura/Scripts/encrypt-decrypt.js --encrypt="MiPassword123" --rounds=12

# Comparar contraseña contra hash
node docs/03_Infraestructura/Scripts/encrypt-decrypt.js --compare="MiPassword123" --hash="$2a$10$hashedValue..."

# Ayuda
node docs/03_Infraestructura/Scripts/encrypt-decrypt.js --help
```

**Opciones:**

| Opción | Descripción |
|--------|-------------|
| `--encrypt=TEXT` | Encripta el texto proporcionado |
| `--compare=TEXT` | Texto plano a comparar contra un hash |
| `--hash=HASH` | Hash contra el cual comparar (requiere `--compare`) |
| `--rounds=N` | Salt rounds para encriptación (default: `10`) |
| `--help, -h` | Mostrar ayuda |

**Características:**

- **Multiplataforma**: Funciona en Windows, Linux y macOS
- **Modo interactivo**: Menú guiado para encriptar o comparar
- **Modo CLI**: Parámetros directos para uso en scripts o pipelines
- Soporte para salt rounds configurables
- Validación de parámetros

**Modo interactivo:**

```
================================================================================
  ENCRYPT / COMPARE - Herramienta de contraseñas con bcryptjs
================================================================================

  Selecciona una acción:
    [1] Encriptar texto
    [2] Comparar texto contra hash

  Opción (1/2): 1

  Texto a encriptar: MiPassword123
  Salt rounds (Enter para 10):

----------------------------------------
  ENCRIPTAR
----------------------------------------
  Texto:        MiPassword123
  Salt Rounds:  10
----------------------------------------

  Hash generado:

  $2a$10$N9qo8uLOickgx2ZMRZoMye...

----------------------------------------
```

**Requisitos previos:**

```bash
cd docs/03_Infraestructura/Scripts
npm install
```

**Dependencias:**

- `bcryptjs` - Implementación en JavaScript puro de bcrypt

**Nota:** bcrypt es un algoritmo de hashing unidireccional. No es posible "desencriptar" un hash. Solo se puede comparar un texto plano contra un hash existente para verificar si coinciden.

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

- **Última actualización:** 2026-02-27
- **Total de archivos:** 11 (incluye subdirectorios)
- **Total de scripts:** 13
