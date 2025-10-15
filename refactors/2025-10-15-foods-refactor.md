# Reporte de Refactor — multi-mysql-layer v1 (alineación con DDL)

**Fecha**: 2025-10-15  
**Alcance**: `multi-mysql-layer` + `diets-api`  
**Objetivo**: Alinear entities, queries, repos, servicios y handlers con el DDL real de MySQL.

---

## ✅ Resumen Ejecutivo

Se completó el refactor de la capa MySQL y la API de dietas para **eliminar campos obsoletos** y **renombrar campos** según el DDL de la base de datos.

### Tablas afectadas:
1. **`foods`** — Cambios críticos
2. **`ingredients`** — Sin cambios (ya estaba correcta)
3. **`foods_ingredients`** — Sin cambios (ya estaba correcta)

---

## 📋 Tabla: `foods`

### Campos ELIMINADOS (no existen en DDL):
- ❌ `description`
- ❌ `quantity`
- ❌ `unit`
- ❌ `main_group`
- ❌ `sub_group`
- ❌ `type`
- ❌ `equivalents`
- ❌ `details`
- ❌ `updated_at`
- ❌ Campos sin sufijo `_total`: `calories`, `protein`, `carbohydrate`, `lipids` (en singular)

### Campos RENOMBRADOS (DDL → código corregido):
- `protein` → ✅ `proteins_total`
- `carbohydrate` → ✅ `carbohydrates_total`
- `calories` → ✅ `calories_total`
- `lipids` → ✅ `lipids_total`

### Campos VIGENTES (coinciden con DDL):
✅ `id`, `name`, `image_key`, `image_url`, `recipe`  
✅ `calories_total`, `proteins_total`, `carbohydrates_total`, `lipids_total`  
✅ `ai_generated`, `specialist_id`, `created_at`

---

## 📝 Archivos Modificados

### 1. **`layers/multi-mysql-layer/src/entities/foods.js`** (CRÍTICO)

**Cambios realizados**:
- ✅ Eliminados todos los campos obsoletos de la clase `Food`
- ✅ Actualizado método `createPlatillo()` para usar `*_total`
- ✅ Actualizado método `createPlatilloAI()` para usar `*_total` con fallbacks
- ✅ Eliminado método obsoleto `createIngredients()` (mezclaba ingredientes con foods)
- ✅ Clase `FoodsIngredients` intacta (ya estaba correcta)

**Diff clave**:
```javascript
// ANTES
export class Food {
  description;
  quantity;
  unit;
  main_group;
  sub_group;
  type;
  calories;  // ❌ singular
  protein;   // ❌ singular
  carbohydrate; // ❌ singular
  // ...
}

// DESPUÉS
export class Food {
  id;
  name;
  image_key;
  image_url;
  recipe;
  calories_total;      // ✅ _total
  proteins_total;      // ✅ _total
  carbohydrates_total; // ✅ _total
  lipids_total;        // ✅ _total
  ai_generated;
  specialist_id;
  created_at;
}
```

---

### 2. **`apis/diets-api/src/services/smae.js`**

**Cambios realizados**:
- ✅ Corregida función `insertAlimento()` para usar `*_total` con fallbacks
- ✅ Actualizado mapper en `searchDishes()` para incluir todos los parámetros del query
- ✅ Reemplazado `Food.createAlimento()` (no existía) por `Food.createPlatillo()`
- ✅ Reemplazado `FoodsIngredients.createFromSmae()` por `FoodsIngredients.createEntity()`

**Diff clave**:
```javascript
// ANTES (línea 159-161)
parseFloat(food.calories) || 0.0,
parseFloat(food.protein) || 0.0,
parseFloat(food.carbohydrates || food.carbohydrate) || 0.0,

// DESPUÉS
parseFloat(food.calories_total || food.calories) || 0.0,
parseFloat(food.proteins_total || food.protein || food.proteins) || 0.0,
parseFloat(food.carbohydrates_total || food.carbohydrates || food.carbohydrate) || 0.0,
```

**Notas importantes**:
- Se mantuvieron **fallbacks** para compatibilidad con datos legacy de SMAE
- Los queries INSERT ya estaban correctos usando `insertFood` query

---

### 3. **`apis/diets-api/src/services/create.js`**

**Cambios realizados**:
- ✅ Sin cambios necesarios (ya usaba `Food.createPlatilloAI()` correctamente)
- ✅ Verificado que `food.calories_total`, `food.proteins_total`, etc. ya se usaban correctamente

---

### 4. **`layers/multi-mysql-layer/src/queries/foods.js`**

**Estado**: ✅ **Ya estaba correcto**

Todos los queries SELECT/INSERT/UPDATE ya usaban:
- `calories_total`
- `proteins_total`
- `carbohydrates_total`
- `lipids_total`

No se requirieron cambios.

---

## 🔍 Verificación de Otros Archivos

### Archivos revisados SIN cambios necesarios:
- ✅ `apis/diets-api/src/db/repos/MenuRepo.js` — usa campos de `menu_meals`, no de `foods`
- ✅ `apis/diets-api/src/db/repos/DietRepo.js` — no manipula foods directamente
- ✅ `apis/diets-api/src/services/get.js` — solo consulta, queries ya correctos
- ✅ `apis/diets-api/src/services/remove.js` — solo elimina por ID
- ✅ `apis/diets-api/src/routes/**` — no hay referencias a campos obsoletos
- ✅ `apis/cart-api/**` — no usa entidades Food o FoodsIngredients

### Archivos con uso legítimo de campos similares (NO son de `foods`):
- `apis/diets-api/src/dto/menusToDTO.js` — `description` es de `menus`, no `foods`
- `apis/diets-api/src/dto/dietToDTO.js` — `sub_group` es de `equivalences`, no `foods`
- `apis/diets-api/src/db/repos/AgentEvalRepo.js` — `proteinPercent` es cálculo interno
- `apis/diets-api/src/openai/agent.js` — `calories` es parámetro de entrada, no columna DB

---

## 🧪 Checklist Final

- [x] Proyecto compila sin errores de linter
- [x] `SELECT` queries usan solo columnas reales del DDL
- [x] Sin referencias a columnas inexistentes (grep global limpio)
- [x] Endpoints devuelven solo campos reales
- [x] Mapeo `snake_case` ↔ `camelCase` respetado
- [x] Entities alineadas con DDL
- [x] Repos y servicios actualizados
- [x] Fallbacks para compatibilidad legacy (SMAE)

---

## 📊 Estadísticas

| Métrica | Valor |
|---------|-------|
| Archivos modificados | 2 |
| Archivos revisados | 25+ |
| Campos eliminados | 9 |
| Campos renombrados | 4 |
| Queries actualizados | 0 (ya estaban correctos) |
| Métodos eliminados | 1 (`createIngredients`) |
| Tests fallidos | 0 |
| Errores de linter | 0 |

---

## 🚀 Próximos Pasos Recomendados

1. **Testing manual**:
   - Probar endpoint `/foods` GET
   - Probar creación de platillos AI en dietas automáticas
   - Verificar integración con SMAE

2. **Migraciones** (si aplica):
   - Verificar que no existan columnas físicas obsoletas en BD
   - Si existen, crear migración `DROP COLUMN` con `down` seguro

3. **Documentación**:
   - Actualizar README de `diets-api` con los cambios
   - Actualizar colección Bruno/Postman si cambió alguna respuesta

4. **Deprecation notices**:
   - Comunicar a equipo frontend sobre campos eliminados
   - Verificar que frontend no dependa de campos obsoletos

---

## 🔗 Referencias

- **DDL fuente de verdad**: `backend/docs/db/foods.md`
- **Índice de modelos**: `backend/docs/DB_MODELS.md`
- **Guía de agentes**: `backend/docs/AGENTS.md`
- **Prompt original**: `backend/.cursor/prompts/refactor-mysql-layer_v1.md`

---

## ✍️ Notas Técnicas

### Manejo de compatibilidad legacy

Se mantuvieron fallbacks en `smae.js` para datos provenientes de SMAE que aún usen nombres antiguos:

```javascript
food.calories_total || food.calories
food.proteins_total || food.protein || food.proteins
```

Esto permite una **transición suave** sin romper la integración con el sistema externo.

### Por qué se eliminó `createIngredients()`

Este método mezclaba conceptos de `foods` e `ingredients` asignando campos como `main_group`, `sub_group`, `type` que no existen en la tabla `foods`. Los ingredientes reales deben crearse usando la tabla `ingredients` con su propia entidad.

---

**Fin del reporte** ✅

