# 📚 Documentación del Backend - Multinature

Bienvenido a la documentación completa del backend del sistema Multinature.

---

## 🗂️ Estructura de la Documentación

```
docs/
├── README.md                    # Este archivo (índice principal)
├── AGENTS.md                    # Guía para trabajar con el monorepo
├── DB_MODELS.md                 # Índice de todas las tablas
├── ESTRUCTURA_PROYECTO.md       # Vista completa de la estructura
│
├── 1. Definicion del proyecto/  # Arquitectura y diseño
├── 2. BACKEND/                  # Documentación técnica del backend
├── 3. FRONTEND/                 # Documentación del frontend
├── 4. Negocio/                  # Reglas de negocio y procesos
├── 5. PRUEBAS/                  # Estrategias de testing
│
├── db/                          # DDL de todas las tablas (87 archivos)
│   ├── foods.md
│   ├── users.md
│   ├── diets.md
│   └── ... (84 más)
│
├── refactors/                   # Histórico de refactors importantes
│   ├── README.md                # Índice de refactors
│   └── 2025-10-15-*.md          # Refactors documentados
│
└── scripts/                     # Documentación de scripts
    ├── README.md                # Guía completa de scripts
    └── validation-tools.md      # Herramientas de validación
```

---

## 🚀 Inicio Rápido

### Para Nuevos Desarrolladores

1. **Entiende la estructura**: [ESTRUCTURA_PROYECTO.md](./ESTRUCTURA_PROYECTO.md) ⭐
   - Vista completa del monorepo
   - Navegación por carpetas
   - Archivos clave por tarea

2. **Lee la guía principal**: [AGENTS.md](./AGENTS.md)
   - Estructura del proyecto
   - Convenciones de código
   - Flujos de trabajo

3. **Revisa la base de datos**: [DB_MODELS.md](./DB_MODELS.md)
   - 87 tablas documentadas
   - DDL completo de cada tabla
   - Reglas de mapeo SQL ↔ JS

4. **Familiarízate con los scripts**: [scripts/README.md](./scripts/README.md)
   - Scripts de validación
   - Scripts de build y deploy
   - Flujos de trabajo comunes

---

## 📋 Guías por Rol

### Desarrollador Backend

**Lectura obligatoria**:
- ✅ [AGENTS.md](./AGENTS.md) - Guía completa del monorepo
- ✅ [DB_MODELS.md](./DB_MODELS.md) - Base de datos
- ✅ [scripts/README.md](./scripts/README.md) - Scripts disponibles

**Carpetas relevantes**:
- `2. BACKEND/` - Documentación técnica
- `db/` - DDL de tablas
- `refactors/` - Histórico de cambios

### Especialista en Base de Datos

**Lectura obligatoria**:
- ✅ [DB_MODELS.md](./DB_MODELS.md)
- ✅ `db/*.md` - DDL de cada tabla

**Herramientas**:
- [validate-entities-vs-ddl.js](./scripts/README.md#validate-entities-vs-ddljs) - Validar alineación

### DevOps / SRE

**Lectura obligatoria**:
- ✅ [AGENTS.md - Sección Serverless/AWS](./AGENTS.md#7-serverlessaws)
- ✅ [scripts/README.md](./scripts/README.md) - Scripts de deploy

**Scripts relevantes**:
- `build-layers.bat` - Construir layers
- `deploy-apis-lambdas.bat` - Deploy a AWS

### Product Owner / QA

**Lectura recomendada**:
- ✅ `4. Negocio/` - Reglas de negocio
- ✅ `5. PRUEBAS/` - Estrategias de testing
- ✅ [refactors/](./refactors/README.md) - Cambios recientes

---

## 🔍 Búsqueda Rápida

### Por Dominio

| Dominio | Documentación Principal |
|---------|------------------------|
| **Usuarios** | `db/users.md` |
| **Dietas** | `db/diets.md`, `db/foods.md`, `db/ingredients.md` |
| **Rutinas** | `db/routines.md`, `db/exercises.md` |
| **Menús** | `db/menus.md`, `db/menu_meals.md` |
| **Productos** | `db/products.md`, `db/orders.md` |
| **Pagos** | `db/payment_methods.md`, `db/service_payments.md` |
| **Citas** | `db/bookings.md`, `db/working_hours.md` |

### Por API

Cada API tiene su carpeta en `apis/*/`:
- `diets-api` → Dietas, alimentos, ingredientes, menús
- `users-api` → Usuarios, autenticación, perfiles
- `routines-api` → Rutinas de ejercicio
- `products-api` → Catálogo de productos
- `orders-api` → Órdenes y logística
- `bookings-api` → Citas y calendarios
- (Ver lista completa en [AGENTS.md](./AGENTS.md#17-estructura-detectada-del-monorepo-depth-2))

---

## 🛠️ Herramientas y Scripts

### Validación de Código

```bash
# Validar que entities coincidan con DDL
node scripts/validate-entities-vs-ddl.js

# Validar una tabla específica
node scripts/validate-entities-vs-ddl.js --entity=foods
```

**Documentación**: [scripts/README.md#validate-entities-vs-ddl](./scripts/README.md#validate-entities-vs-ddljs)

### Build y Deploy

```bash
# Construir layers
scripts\build-layers.bat

# Deploy a AWS
scripts\deploy-apis-lambdas.bat dev
```

**Documentación**: [scripts/README.md#build-y-empaquetado](./scripts/README.md#-build-y-empaquetado)

### Actualizar Documentación

```bash
# Actualizar índice de tablas
npx ts-node scripts/update-docs-index.ts
```

---

## 📖 Documentación Detallada

### Base de Datos

- **[DB_MODELS.md](./DB_MODELS.md)** - Índice de las 87 tablas
- **`db/*.md`** - DDL completo de cada tabla
  - Estructura SQL
  - Resumen de columnas
  - Reglas de mapeo
  - Queries sugeridos

### APIs

Documentación en cada API:
- `apis/diets-api/README.md`
- `apis/users-api/README.md`
- (etc.)

### Layers Compartidas

- `layers/multi-mysql-layer` - Queries y entities
- `layers/multi-commons-layer` - Utilidades comunes
- `layers/multi-emails-layer` - Plantillas de email

---

## 🔄 Histórico de Cambios

### Refactors Importantes

Ver [refactors/README.md](./refactors/README.md) para historial completo.

**Último refactor**: 2025-10-15
- Alineación completa de entities vs DDL
- 6 entities refactorizadas
- 7 archivos modificados
- 0 errores post-deploy

---

## 🤝 Contribuir a la Documentación

### Agregar Nueva Tabla

1. Crear `docs/db/nueva-tabla.md` usando `TEMPLATE_TABLE.md`
2. Incluir DDL completo
3. Ejecutar `npx ts-node scripts/update-docs-index.ts`
4. Commit con mensaje: `docs: add nueva-tabla DDL`

### Documentar Refactor

1. Crear `docs/refactors/YYYY-MM-DD-descripcion.md`
2. Usar template de `refactors/README.md`
3. Actualizar índice en `refactors/README.md`
4. Commit con mensaje: `docs: refactor descripcion`

### Agregar Script

1. Crear script en `scripts/`
2. Documentar en `docs/scripts/README.md`
3. Incluir: propósito, uso, ejemplos, troubleshooting
4. Commit con mensaje: `feat: add script-name`

---

## 📊 Convenciones

### Nombres de Archivos

- Tablas DDL: `kebab-case.md` (ej: `menu_meals.md`)
- Refactors: `YYYY-MM-DD-descripcion.md`
- Scripts: `kebab-case.js/bat/ps1`

### Formato de Commits

```
tipo: descripción breve

- Detalle 1
- Detalle 2
```

**Tipos**: `feat`, `fix`, `docs`, `refactor`, `test`, `chore`

### Mapeo SQL ↔ JavaScript

```
SQL (snake_case)    →    JS (snake_case en entity)
─────────────────────────────────────────────────
first_name          →    first_name
user_id             →    user_id
is_active           →    is_active
```

En `createEntity()` se mapea desde camelCase:

```javascript
entity.first_name = data.firstName;  // camelCase → snake_case
```

---

## 🔗 Enlaces Externos

- **Repositorio**: (agregar URL)
- **Confluence**: (agregar URL si existe)
- **Jira**: (agregar URL si existe)
- **Slack**: (agregar canal)

---

## 📞 Contacto

**Mantenedor**: Miguel Valdés  
**Equipo**: Backend Multinature  
**Última actualización**: 2025-10-15

---

## ⭐ Recursos Destacados

### Más Consultados

1. [AGENTS.md](./AGENTS.md) - Guía completa
2. [DB_MODELS.md](./DB_MODELS.md) - Índice de tablas
3. [scripts/README.md](./scripts/README.md) - Scripts disponibles
4. [refactors/](./refactors/README.md) - Histórico de cambios

### Más Útiles

- [validate-entities-vs-ddl](./scripts/README.md#validate-entities-vs-ddljs) - Validación automática
- [db/foods.md](./db/foods.md) - Tabla crítica del sistema
- [db/users.md](./db/users.md) - Usuarios del sistema
- [db/diets.md](./db/diets.md) - Dietas nutricionales

---

**¡Happy coding! 🚀**
