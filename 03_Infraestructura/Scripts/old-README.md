# 🔧 Scripts del Proyecto

Documentación completa de todos los scripts disponibles en el monorepo.

---

## 📋 Índice Rápido

| Script                                                     | Tipo          | Propósito                        | Documentación                               |
| ---------------------------------------------------------- | ------------- | -------------------------------- | ------------------------------------------- |
| [docs-audit.js](#docs-auditjs)                             | **Auditoría** | Valida salud de la documentación | [📖 Ver abajo](#docs-auditjs)               |
| [validate-entities-vs-ddl.js](#validate-entities-vs-ddljs) | Validación    | Compara entities vs DDL          | [📖 Guía completa](./validation-tools.md)   |
| [update-docs-index](#update-docs-index)                    | Documentación | Actualiza índices de docs        | [📖 Ver abajo](#update-docs-index)          |
| [build-layers.bat](#build-layersbat)                       | Build         | Construye layers compartidas     | [📖 Ver abajo](#build-layersbat)            |
| [deploy-apis-lambdas.bat](#deploy-apis-lambdasbat)         | Deploy        | Despliega APIs a AWS             | [📖 Ver abajo](#deploy-apis-lambdasbat)     |
| [commitAndPush-git-repos.bat](#commitandpush-git-reposbat) | Git           | Commit en múltiples repos        | [📖 Ver abajo](#commitandpush-git-reposbat) |
| [pull-git-repos.bat](#pull-git-reposbat)                   | Git           | Pull en múltiples repos          | [📖 Ver abajo](#pull-git-reposbat)          |

---

## 🔍 Validación y Mantenimiento

### **docs-audit.js**

**Ubicación**: `scripts/docs-audit.js`  
**Tipo**: Node.js  
**Propósito**: Auditoría automatizada de la salud de la documentación

#### Uso:

```bash
# Ejecutar auditoría completa
node scripts/docs-audit.js
```

#### Salida:

Genera un reporte en terminal con colores y un archivo JSON detallado.

```
🔍 AUDITORÍA DE DOCUMENTACIÓN - MULTINATURE BACKEND
======================================================================
📊 RESUMEN DE AUDITORÍA
✅ Información: 5
⚠️  Advertencias: 15
❌ Problemas críticos: 0
```

**Archivos generados**:

- `docs-audit-report.json` - Reporte JSON detallado con todas las validaciones

#### Qué valida:

- ✅ Estructura de directorios (`docs/db/`, `entities/`)
- ✅ Sincronización entre `DB_MODELS.md` y archivos en `docs/db/`
- ✅ Mapeo entre entities JS y documentación de tablas
- ✅ Enlaces internos válidos en documentos principales
- ✅ Formato DDL correcto en todos los archivos de tablas
- ✅ Archivos huérfanos sin referenciar

#### Cuándo usar:

- ✅ Antes de crear PR que modifique documentación
- ✅ Después de agregar/modificar tablas en la BD
- ✅ Periódicamente para verificar salud de la docs
- ✅ Como parte de CI/CD (integración continua)

#### Exit codes:

- `0` - Todo OK (sin problemas críticos)
- `1` - Problemas encontrados (revisar warnings/errores)

#### Ver también:

- [Plan de Auditoría](../../99_Privado/Reportes/docs-audit-plan.md) - Reporte completo y plan de acción
- [Reporte JSON](../../docs-audit-report.json) - Última ejecución

---

### **validate-entities-vs-ddl.js**

**Ubicación**: `scripts/validate-entities-vs-ddl.js`  
**Tipo**: Node.js  
**Propósito**: Validar alineación entre entities de código y DDL de base de datos

#### Uso:

```bash
# Validar todas las entities
node scripts/validate-entities-vs-ddl.js

# Validar una entity específica
node scripts/validate-entities-vs-ddl.js --entity=foods

# Modo verbose
node scripts/validate-entities-vs-ddl.js -v
```

#### Salida:

Genera un reporte en terminal y opcionalmente un archivo `ENTITY_VALIDATION_REPORT.md` si hay problemas.

```
📊 REPORTE DE VALIDACIÓN: Entities vs DDL
================================================================================

📈 RESUMEN:
   Total entities: 31
   ✅ Correctas: 25
   ⚠️  Con diferencias: 5
   ❌ Sin DDL: 1
```

#### Cuándo usar:

- ✅ Antes de cada PR (para detectar desalineaciones)
- ✅ Después de modificar DDL en `docs/db/*.md`
- ✅ Después de modificar entities en `layers/multi-mysql-layer/src/entities/`
- ✅ Como parte de CI/CD (integración continua)

#### Documentación completa:

Ver [validation-tools.md](./validation-tools.md) para guía detallada, ejemplos y troubleshooting.

---

## 📚 Documentación

### **update-docs-index**

**Ubicaciones**:

- `scripts/update-docs-index.ts` (TypeScript)
- `scripts/update-docs-index.ps1` (PowerShell)
- `scripts/update-docs-index.sh` (Bash) - Si existe

**Propósito**: Actualizar índices automáticos en la documentación

#### Uso (TypeScript):

```bash
# Ejecutar con ts-node
npx ts-node scripts/update-docs-index.ts

# O compilar primero
tsc scripts/update-docs-index.ts
node scripts/update-docs-index.js
```

#### Uso (PowerShell):

```powershell
# Ejecutar en PowerShell
.\scripts\update-docs-index.ps1
```

#### Qué hace:

- 🔄 Escanea archivos en `docs/db/*.md`
- 📝 Actualiza `docs/DB_MODELS.md` con enlaces
- ✅ Mantiene sincronizados los índices

#### Cuándo usar:

- Después de agregar nuevas tablas en `docs/db/`
- Después de renombrar tablas
- Para verificar que todos los DDL estén indexados

---

## 🏗️ Build y Empaquetado

### **build-layers.bat**

**Ubicación**: `scripts/build-layers.bat`  
**Tipo**: Windows Batch  
**Propósito**: Construir y empaquetar layers compartidas para AWS Lambda

#### Uso:

```batch
REM Desde la raíz del proyecto
scripts\build-layers.bat

REM O desde la carpeta scripts
cd scripts
build-layers.bat
```

#### Qué hace:

1. Instala dependencias en cada layer (`multi-mysql-layer`, `multi-commons-layer`, etc.)
2. Copia archivos necesarios
3. Empaqueta en formato compatible con AWS Lambda
4. Genera archivos `.zip` listos para deploy

#### Estructura esperada:

```
layers/
├── multi-mysql-layer/
│   ├── nodejs/
│   │   └── node_modules/
│   └── package.json
├── multi-commons-layer/
└── multi-emails-layer/
```

#### Cuándo usar:

- ✅ Antes de desplegar APIs que usan layers
- ✅ Después de actualizar dependencias en layers
- ✅ Después de modificar código en layers

#### Notas:

- Requiere Node.js y npm instalados
- Ejecutar desde Windows o WSL

---

## 🚀 Deployment

### **deploy-apis-lambdas.bat**

**Ubicación**: `scripts/deploy-apis-lambdas.bat`  
**Tipo**: Windows Batch  
**Propósito**: Desplegar todas las APIs como funciones Lambda a AWS

#### Uso:

```batch
REM Deploy todas las APIs
scripts\deploy-apis-lambdas.bat

REM Deploy a un stage específico (si soportado)
scripts\deploy-apis-lambdas.bat dev
scripts\deploy-apis-lambdas.bat prod
```

#### Qué hace:

1. Recorre cada API en `apis/*/`
2. Ejecuta `serverless deploy` en cada una
3. Sube layers si es necesario
4. Configura variables de entorno

#### Pre-requisitos:

- ✅ AWS CLI configurado con credenciales
- ✅ Serverless Framework instalado (`npm i -g serverless`)
- ✅ Variables de entorno configuradas
- ✅ Layers construidas previamente (`build-layers.bat`)

#### Cuándo usar:

- 🚀 Deploy completo a staging/producción
- 🔄 Después de cambios en múltiples APIs
- ⚠️ **NO usar** para deploys individuales (usa `serverless deploy` directo)

#### Seguridad:

⚠️ **IMPORTANTE**: Este script despliega TODAS las APIs. Para deploy individual:

```bash
cd apis/diets-api
serverless deploy --stage dev
```

---

## 🔄 Git Workflows

### **commitAndPush-git-repos.bat**

**Ubicación**: `scripts/commitAndPush-git-repos.bat`  
**Tipo**: Windows Batch  
**Propósito**: Hacer commit y push en múltiples repositorios simultáneamente

#### Uso:

```batch
REM El script solicitará el mensaje de commit
scripts\commitAndPush-git-repos.bat
```

#### Qué hace:

1. Recorre cada API (si son repos independientes)
2. Ejecuta `git add .`
3. Hace commit con el mensaje proporcionado
4. Hace push al remote

#### Estructura esperada:

```
apis/
├── diets-api/.git
├── users-api/.git
├── products-api/.git
└── ...
```

#### Cuándo usar:

- 📦 Cambios que afectan múltiples APIs
- 🔄 Sincronización rápida de cambios menores
- ⚠️ **NO usar** para cambios críticos (revisar cada repo individualmente)

#### Advertencias:

⚠️ **CUIDADO**: Este script NO crea PRs ni ejecuta hooks de pre-commit.  
👉 Para cambios importantes, hacer commit/push manual por repo.

---

### **pull-git-repos.bat**

**Ubicación**: `scripts/pull-git-repos.bat`  
**Tipo**: Windows Batch  
**Propósito**: Hacer pull en múltiples repositorios simultáneamente

#### Uso:

```batch
REM Pull en todos los repos
scripts\pull-git-repos.bat
```

#### Qué hace:

1. Recorre cada API (si son repos independientes)
2. Ejecuta `git pull` en cada una
3. Muestra resumen de cambios

#### Cuándo usar:

- 🔄 Sincronizar workspace después de cambios remotos
- 👥 Al inicio del día (para obtener cambios del equipo)
- 🔀 Antes de empezar a trabajar en una feature

#### Notas:

- Requiere que no haya cambios sin commitear (stash primero si es necesario)

---

## 🎯 Flujos de Trabajo Comunes

### **Desarrollo de Nueva Feature**

```bash
# 1. Sincronizar repos
scripts\pull-git-repos.bat

# 2. Crear feature branch (manual por API)
cd apis/diets-api
git checkout -b feat/nueva-feature

# 3. Desarrollar...

# 4. Validar entities si modificaste BD
node scripts/validate-entities-vs-ddl.js

# 5. Commit y push
cd ../..
scripts\commitAndPush-git-repos.bat
```

---

### **Deploy a Staging**

```bash
# 1. Asegurar que layers estén actualizadas
scripts\build-layers.bat

# 2. Deploy todas las APIs
scripts\deploy-apis-lambdas.bat dev

# 3. Verificar endpoints
# (pruebas manuales o automatizadas)
```

---

### **Modificación de DDL**

```bash
# 1. Actualizar DDL en docs/db/tabla.md
# (edición manual)

# 2. Actualizar entity si existe
# (edición manual en layers/multi-mysql-layer/src/entities/)

# 3. Validar alineación
node scripts/validate-entities-vs-ddl.js --entity=tabla

# 4. Si hay problemas, corregir y re-validar
node scripts/validate-entities-vs-ddl.js --entity=tabla

# 5. Actualizar índice de documentación
npx ts-node scripts/update-docs-index.ts
```

---

## 🔗 Referencias

- [Validación de Entities (Guía completa)](./validation-tools.md)
- [Guía de Agentes](../../00_Overview/AGENTS_GUIDE.md)
- [Modelos de Base de Datos](../../01_Backend/Database/00_INDEX.md)
- [Histórico de Refactors](../../00_Overview/Business_Rules/README.md)

---

## 💡 Tips y Mejores Prácticas

### Para Scripts de Validación

1. **Ejecuta antes de cada commit** que modifique entities o DDL
2. **Integra en CI/CD** para prevenir regressions
3. **Lee el reporte completo** cuando haya diferencias

### Para Scripts de Build

1. **Siempre construye layers** antes de deployar APIs
2. **Verifica logs de build** para errores de dependencias
3. **Prueba localmente** con Serverless Offline cuando sea posible

### Para Scripts de Deploy

1. **Deploy individual primero** a staging para probar
2. **No hagas deploy masivo** sin probar cambios
3. **Ten plan de rollback** listo antes de deploy a prod

### Para Scripts de Git

1. **Revisa cambios** antes de usar scripts masivos
2. **Usa PRs** para cambios importantes (no push directo)
3. **Mantén mensajes de commit** descriptivos

---

## 🐛 Troubleshooting

### Error: "No se encuentra node/npm"

**Solución**: Instala Node.js LTS desde [nodejs.org](https://nodejs.org/)

### Error: "AWS credentials not configured"

**Solución**:

```bash
aws configure
# Ingresar AWS_ACCESS_KEY_ID y AWS_SECRET_ACCESS_KEY
```

### Error: "Serverless command not found"

**Solución**:

```bash
npm install -g serverless
```

### Error en validate-entities: "No se encontró DDL"

**Solución**: Verifica que exista `docs/db/[tabla].md` para esa entity

### Error en build-layers: "ENOENT"

**Solución**: Ejecuta desde la raíz del proyecto (`backend/`)

---

## 📊 Estadísticas

- **Total de scripts**: 7
- **Scripts de auditoría**: 1
- **Scripts de validación**: 1
- **Scripts de build**: 1
- **Scripts de deploy**: 1
- **Scripts de git**: 2
- **Scripts de docs**: 1

---

## ✨ Contribuir

### Agregar un nuevo script:

1. Crea el script en `scripts/`
2. Agrega documentación aquí en este README
3. Incluye:
   - Propósito claro
   - Ejemplos de uso
   - Pre-requisitos
   - Cuándo usarlo
   - Troubleshooting común

### Formato de documentación:

```markdown
### **nombre-script.ext**

**Ubicación**: `scripts/nombre-script.ext`  
**Tipo**: [Node.js/Bash/PowerShell/Batch]  
**Propósito**: [Descripción breve]

#### Uso:

[Ejemplos de comandos]

#### Qué hace:

[Lista numerada]

#### Cuándo usar:

[Lista con checkmarks]
```

---

**Última actualización**: 2025-10-16  
**Mantenedor**: Miguel Valdés  
**Contribuidores**: AI Agent (Cursor/Claude)

---

## 🆕 Nuevo - Auditoría de Documentación

Se agregó el script **`docs-audit.js`** para validación automatizada de la salud de la documentación. Ver detalles arriba o ejecutar:

```bash
node scripts/docs-audit.js
```

Ver plan completo en: [docs-audit-plan.md](../../99_Privado/Reportes/docs-audit-plan.md)
