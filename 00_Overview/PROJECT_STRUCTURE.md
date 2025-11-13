# 📁 Estructura del Proyecto Backend

**Última actualización**: 2025-10-15

---

## 🗂️ Vista General

```
backend/
│
├── 📜 package.json                    # Dependencias raíz (si existe)
│
├── 📂 apis/                           # 16 APIs del sistema
│   ├── addresses-api/
│   ├── bookings-api/
│   ├── cart-api/
│   ├── commissions-api/
│   ├── constants-api/
│   ├── diets-api/                     ⭐ API más compleja
│   ├── forms-api/
│   ├── monthly-purchases-api/
│   ├── notifications-api/
│   ├── orders-api/
│   ├── payment-methods-api/
│   ├── payments-api/
│   ├── products-api/
│   ├── public-resources-api/
│   ├── routines-api/
│   └── users-api/                     ⭐ API crítica
│
├── 📂 layers/                         # Capas compartidas
│   ├── multi-commons-layer/           # Utilidades comunes
│   ├── multi-emails-layer/            # Plantillas de email
│   └── multi-mysql-layer/             ⭐ Queries y entities
│       ├── src/
│       │   ├── entities/              # 31 entities
│       │   │   ├── foods.js           ✅ Refactorizado
│       │   │   ├── user.js            ✅ Actualizado
│       │   │   ├── address.js         ✅ Actualizado
│       │   │   ├── booking.js         ✅ Actualizado
│       │   │   ├── routine.js         ✅ Actualizado
│       │   │   ├── diet.js
│       │   │   └── ... (26 más)
│       │   │
│       │   └── queries/               # Queries SQL
│       │       ├── foods.js
│       │       ├── users.js
│       │       └── ... (30+ archivos)
│       │
│       └── package.json
│
├── 📂 scripts/                        # ⭐ Scripts ejecutables
│   ├── validate-entities-vs-ddl.js    # 🔍 Validación entities vs DDL
│   ├── update-docs-index.ts           # 📚 Actualiza índices de docs
│   ├── update-docs-index.ps1
│   ├── build-layers.bat               # 🏗️ Construir layers
│   ├── deploy-apis-lambdas.bat        # 🚀 Deploy a AWS
│   ├── commitAndPush-git-repos.bat    # 🔄 Git commit/push masivo
│   └── pull-git-repos.bat             # 🔄 Git pull masivo
│
├── 📂 docs/                           # ⭐ Documentación completa
│   │
│   ├── 📄 README.md                   # 📖 Índice principal de docs
│   ├── 📄 AGENTS.md                   # 🤖 Guía para agentes/devs
│   ├── 📄 DB_MODELS.md                # 🗄️ Índice de 87 tablas
│   ├── 📄 ESTRUCTURA_PROYECTO.md      # 📁 Este archivo
│   │
│   ├── 📂 db/                         # 🗄️ DDL de todas las tablas (87)
│   │   ├── addresses.md
│   │   ├── bookings.md
│   │   ├── diets.md
│   │   ├── foods.md
│   │   ├── ingredients.md
│   │   ├── users.md
│   │   └── ... (81 más)
│   │
│   ├── 📂 refactors/                  # 📚 Histórico de refactors
│   │   ├── README.md                  # Índice de refactors
│   │   ├── 2025-10-15-foods-refactor.md
│   │   ├── 2025-10-15-full-analysis.md
│   │   └── 2025-10-15-complete-refactor.md
│   │
│   ├── 📂 scripts/                    # 📖 Documentación de scripts
│   │   ├── README.md                  # ⭐ Guía completa de scripts
│   │   └── validation-tools.md        # Guía detallada de validación
│   │
│   ├── 📂 1. Definicion del proyecto/ # Arquitectura y diseño
│   ├── 📂 2. BACKEND/                 # Documentación técnica backend
│   ├── 📂 3. FRONTEND/                # Documentación frontend
│   ├── 📂 4. Negocio/                 # Reglas de negocio
│   └── 📂 5. PRUEBAS/                 # Estrategias de testing
│
├── 📂 api-collection/                 # Colecciones Bruno/Postman
│   └── ... (endpoints documentados)
│
└── 📂 tools/                          # Herramientas adicionales
    └── reports/
```

---

## 🎯 Archivos Clave por Tarea

### Para Desarrollo

```
📋 Antes de empezar:
   └── docs/AGENTS.md                  # Lee esto primero

🔍 Durante desarrollo:
   ├── docs/DB_MODELS.md               # Buscar tablas
   ├── docs/db/[tabla].md              # Ver DDL específico
   └── layers/multi-mysql-layer/       # Entities y queries

✅ Antes de commit:
   └── scripts/validate-entities-vs-ddl.js  # Validar cambios
```

### Para Deploy

```
🏗️ Build:
   └── scripts/build-layers.bat

🚀 Deploy:
   └── scripts/deploy-apis-lambdas.bat

📖 Guía:
   └── docs/scripts/README.md
```

### Para Documentación

```
📝 Crear docs:
   ├── docs/db/TEMPLATE_TABLE.md       # Template para DDL
   └── docs/refactors/README.md        # Template para refactors

🔄 Actualizar índices:
   └── scripts/update-docs-index.ts
```

---

## 📊 Estadísticas del Proyecto

### Base de Datos

- **Tablas totales**: 87
- **Tablas documentadas**: 87 (100%)
- **Entities en código**: 31 (36%)
- **Queries documentados**: 30+

### APIs

- **Total de APIs**: 16
- **Lambdas desplegadas**: ~16-20
- **Layers compartidas**: 3

### Documentación

- **Archivos en docs/**: 100+
- **DDL documentados**: 87
- **Refactors documentados**: 1 serie (3 docs)
- **Scripts documentados**: 6

### Scripts

- **Scripts ejecutables**: 6
- **Scripts de validación**: 1
- **Scripts de build/deploy**: 2
- **Scripts de git**: 2
- **Scripts de docs**: 1

---

## 🔍 Navegación Rápida

### Por Dominio de Negocio

| Dominio        | Ubicación Principal                                                 |
| -------------- | ------------------------------------------------------------------- |
| **Nutrición**  | `apis/diets-api/`, `docs/db/foods.md`, `docs/db/diets.md`           |
| **Ejercicio**  | `apis/routines-api/`, `docs/db/routines.md`, `docs/db/exercises.md` |
| **E-commerce** | `apis/products-api/`, `apis/orders-api/`, `apis/cart-api/`          |
| **Usuarios**   | `apis/users-api/`, `docs/db/users.md`                               |
| **Citas**      | `apis/bookings-api/`, `docs/db/bookings.md`                         |
| **Pagos**      | `apis/payments-api/`, `apis/payment-methods-api/`                   |

### Por Tipo de Archivo

| Tipo              | Ubicación                                 |
| ----------------- | ----------------------------------------- |
| **Código fuente** | `apis/*/src/`, `layers/*/src/`            |
| **Tests**         | `apis/*/tests/`                           |
| **Configuración** | `apis/*/serverless.yml`, `*/package.json` |
| **Documentación** | `docs/`, `*/README.md`                    |
| **Scripts**       | `scripts/`                                |
| **DDL**           | `docs/db/*.md`                            |

---

## 🎨 Convenciones de Organización

### Nombres de Carpetas

- APIs: `kebab-case-api/`
- Layers: `multi-nombre-layer/`
- Docs: `lowercase/` o `PascalCase/` según sección

### Nombres de Archivos

- JavaScript: `camelCase.js` o `PascalCase.js`
- Scripts: `kebab-case.bat/ps1/sh`
- Docs: `kebab-case.md` o `UPPERCASE.md`
- DDL: `table_name.md` (snake_case)

### Estructura de API

```
nombre-api/
├── src/
│   ├── api/           # Handlers/controllers
│   ├── services/      # Lógica de negocio
│   ├── db/
│   │   └── repos/     # Repositorios
│   ├── dto/           # Data Transfer Objects
│   ├── middleware/    # Middlewares
│   └── routes/        # Definición de rutas
├── tests/             # Tests unitarios/integración
├── serverless.yml     # Configuración Serverless
├── package.json
└── README.md
```

---

## 🔗 Links de Navegación

### Documentación Principal

- [📖 Índice General](Business_Rules/README.md)
- [🤖 Guía de Agentes](AGENTS_GUIDE.md)
- [🗄️ Modelos de BD](../01_Backend/Database/00_INDEX.md)

### Guías Específicas

- [🔧 Scripts y Herramientas](Business_Rules/README.md)
- [📚 Histórico de Refactors](Business_Rules/README.md)
- [🔍 Validación de Entities](../03_Infraestructura/Scripts/validation-tools.md)

### Tablas Más Usadas

- [users](../01_Backend/Database/Tables/users.md)
- [diets](../01_Backend/Database/Tables/diets.md)
- [foods](../01_Backend/Database/Tables/foods.md)
- [ingredients](../01_Backend/Database/Tables/ingredients.md)
- [routines](../01_Backend/Database/Tables//routines.md)
- [bookings](../01_Backend/Database/Tables/bookings.md)
- [orders](../01_Backend/Database/Tables/orders.md)
- [products](../01_Backend/Database/Tables/products.md)

---

## 💡 Tips de Navegación

### En VS Code

```
Ctrl+P             # Buscar archivo por nombre
Ctrl+Shift+F       # Buscar en todos los archivos
Ctrl+Click         # Ir a definición
Alt+Left/Right     # Navegar historial
```

### En Terminal

```bash
# Buscar archivo
find . -name "foods.js"

# Buscar en contenido
grep -r "Food.createEntity" .

# Listar estructura
tree -L 2 docs/
```

### En Documentación

- Usa el índice en `docs/README.md`
- Busca por dominio en `docs/DB_MODELS.md`
- Sigue los enlaces internos (están todos conectados)

---

**Última actualización**: 2025-10-15  
**Mantenedor**: Miguel Valdés
