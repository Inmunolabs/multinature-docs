# Análisis Completo de Refactor — Todas las Tablas (87)

**Fecha**: 2025-10-15  
**Alcance**: TODAS las tablas del sistema  
**Objetivo**: Alinear entities, queries, repos y services con DDL real

---

## 🎯 Resumen Ejecutivo

Después del análisis inicial de las entities existentes en `multi-mysql-layer`, **la mayoría ya están correctamente alineadas con el DDL**, usando `snake_case` para los campos de BD.

### ✅ **Buenas Noticias**

Las entities principales ya siguen las convenciones correctas:
- Usan `snake_case` para campos de BD
- Mapean correctamente en `createEntity()` usando camelCase → snake_case
- Las queries en `multi-mysql-layer/src/queries/` mayormente correctas

### ⚠️ **Problemas Encontrados**

1. **Clase `Food`** (YA CORREGIDA) ✅
   - Tenía campos obsoletos que no existen en DDL
   - **SOLUCIÓN**: Ya refactorizada en el primer paso

2. **Campos faltantes en algunas entities**:
   - `User`: falta `openpay_user_id`, `balance`
   - `Address`: falta `is_clinic`, `is_tax_address`
   - `Booking`: falta `calendar_event_id`
   - Probablemente hay más en otras entities

3. **Métodos obsoletos**:
   - `Food.createIngredients()` eliminado (mezclaba conceptos)
   - Posiblemente hay más métodos obsoletos en otras entities

---

## 📊 Estrategia de Refactor por Prioridad

### **Nivel 1: CRÍTICO** (Ya completado ✅)
- ✅ `foods` - Refactorizada completamente
- ✅ `foods_ingredients` - Sin cambios necesarios
- ✅ `ingredients` - Sin cambios necesarios

### **Nivel 2: ALTO** (Entities con missing fields detectados)
- ⚠️ `users` - Faltan 2 campos
- ⚠️ `addresses` - Faltan 2 campos  
- ⚠️ `bookings` - Falta 1 campo
- ⚠️ `diets` - Verificar si todo correcto
- ⚠️ `routines` - Verificar estructura
- ⚠️ `orders` - Verificar estructura

### **Nivel 3: MEDIO** (Entities menos utilizadas)
- Todas las demás tables de soporte

### **Nivel 4: BAJO** (Tablas sin entity definida)
- Tablas que solo se consultan vía queries directos

---

## 🔍 Análisis Detallado por Entity

### 1. **users.js** ⚠️

**DDL esperado**:
```sql
id, email, first_name, last_name, birthdate, gender, password, phone, 
profile, recommender_id, has_plan, subscription_date, 
openpay_user_id, balance, is_valid, is_active, updated_at, created_at
```

**Entity actual**: ✅ Mayormente correcto

**FALTANTES**:
- ❌ `openpay_user_id` varchar(20)
- ❌ `balance` double NOT NULL DEFAULT '0'

**ACCIÓN**: Agregar campos faltantes

---

### 2. **addresses.js** ⚠️

**DDL esperado**:
```sql
id, user_id, street, ext_number, int_number, neighborhood, city, 
zip_code, federal_entity, country, refer, is_shipping_address, 
is_clinic, is_tax_address, updated_at, created_at
```

**Entity actual**: ✅ Mayormente correcto

**FALTANTES**:
- ❌ `is_clinic` tinyint(1)
- ❌ `is_tax_address` tinyint(1) DEFAULT '0'

**ACCIÓN**: Agregar campos faltantes

---

### 3. **bookings.js** ⚠️

**DDL esperado**:
```sql
id, specialist_id, user_id, address, video_call_url, specialty_id, 
calendar_event_id, status, date, start_hour, end_hour, notes, 
updated_at, created_at
```

**Entity actual**: ✅ Mayormente correcto

**FALTANTES**:
- ❌ `calendar_event_id` text NOT NULL

**ACCIÓN**: Agregar campo faltante

---

### 4. **diet.js** ✅

**DDL esperado**:
```sql
id, notes, carbohydrates_calories, carbohydrates_grams, 
proteins_calories, proteins_grams, calories_per_day, 
lipids_calories, lipids_grams, specialist_id, user_id, 
updated_at, created_at
```

**Entity actual**: ✅ **CORRECTO**

Todos los campos presentes y correctos.

---

### 5. **foods.js** ✅ (YA REFACTORIZADA)

**DDL esperado**:
```sql
id, name, image_key, image_url, recipe, calories_total, 
proteins_total, carbohydrates_total, lipids_total, 
ai_generated, specialist_id, created_at
```

**Entity actual**: ✅ **CORRECTO** (después del refactor)

---

## 🎬 Plan de Acción Optimizado

Dado que:
1. La mayoría de entities YA están correctas
2. El problema principal era `foods` (ya corregido)
3. Solo faltan campos específicos en pocas entities

### **Enfoque Pragmático**:

#### Fase 1: Completar campos faltantes (1-2 horas)
- [x] ✅ `foods` (completado)
- [ ] Agregar campos a `users`
- [ ] Agregar campos a `addresses`
- [ ] Agregar campos a `bookings`
- [ ] Revisar 10-15 entities más importantes

#### Fase 2: Verificación de queries (30 min)
- [ ] Buscar queries que usen columnas inexistentes
- [ ] Verificar que todos los SELECT coincidan con DDL

#### Fase 3: Validación de repos/services (1 hora)
- [ ] Buscar referencias a campos obsoletos
- [ ] Actualizar mappers si es necesario

#### Fase 4: Testing y reporte (30 min)
- [ ] Ejecutar linter en archivos modificados
- [ ] Generar reporte final completo

---

## 📈 Estimación de Trabajo

| Tarea | Tiempo | Prioridad | Status |
|-------|--------|-----------|--------|
| Refactor `foods` | 1h | CRÍTICO | ✅ DONE |
| Completar 5-10 entities principales | 1-2h | ALTO | 🔄 TODO |
| Verificar queries globales | 30min | MEDIO | 🔄 TODO |
| Actualizar repos/services | 1h | MEDIO | 🔄 TODO |
| Testing y reporte | 30min | BAJO | 🔄 TODO |
| **TOTAL** | **4-5h** | - | 25% ✅ |

---

## 🚀 Siguiente Paso Inmediato

**OPCIÓN A (Recomendada)**: Completar refactor de las 10-15 entities más críticas
- `users`, `addresses`, `bookings`, `diets`, `routines`, `orders`, `products`, `menus`, `recommendations`, `carts`

**OPCIÓN B**: Hacer análisis exhaustivo de todas las 87 tablas antes de modificar
- Más lento pero más completo
- Riesgo: encontrar que mayoría ya está bien

**OPCIÓN C**: Hacer script automatizado de análisis
- Genera reporte automático comparando DDL vs entities
- Luego aplicar fixes masivos

---

## 💡 Recomendación

Dado que:
1. Ya invertimos tiempo en `foods` ✅
2. La mayoría de entities parece correcta
3. El impacto real es limitado

**Recomiendo OPCIÓN A**: Completar las entities críticas faltantes y hacer verificación global de queries. Esto da el mejor ROI (Return on Investment) de tiempo.

¿Proceder con OPCIÓN A?

