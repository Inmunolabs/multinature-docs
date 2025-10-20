# 🔧 Scripts de Validación y Mantenimiento

Este directorio contiene scripts para validar y mantener la alineación entre las entities de código y los DDL de la base de datos.

---

## 📋 Scripts Disponibles

### 1. **validate-entities-vs-ddl.js**

Valida que las entities en `multi-mysql-layer/src/entities/` estén alineadas con los DDL documentados en `docs/db/*.md`.

#### Uso:

```bash
# Validar todas las entities
node scripts/validate-entities-vs-ddl.js

# Validar una entity específica
node scripts/validate-entities-vs-ddl.js --entity=foods

# Modo verbose (más detalles)
node scripts/validate-entities-vs-ddl.js -v
```

#### Salida:

```
📊 REPORTE DE VALIDACIÓN: Entities vs DDL
================================================================================

📈 RESUMEN:
   Total entities: 31
   ✅ Correctas: 25
   ⚠️  Con diferencias: 5
   ❌ Sin DDL: 1

⚠️  ENTITIES CON DIFERENCIAS:

   📄 foods (Food)
      ❌ Campos faltantes (2):
         - image_key
         - image_url
      ⚠️  Campos obsoletos (3):
         - description
         - quantity
         - unit
      💡 Sugerencias:
         Agregar campos: image_key, image_url
         ⚠️  Campos obsoletos (no en DDL): description, quantity, unit
```

El script también genera un archivo `ENTITY_VALIDATION_REPORT.md` con los detalles completos.

---

### 2. **generate-entity-from-ddl.js** (Por crear)

Genera automáticamente el código de una entity a partir de su DDL.

#### Uso:

```bash
# Generar entity para una tabla
node scripts/generate-entity-from-ddl.js --table=foods

# Generar entity con createEntity() method
node scripts/generate-entity-from-ddl.js --table=foods --with-methods

# Preview sin escribir archivo
node scripts/generate-entity-from-ddl.js --table=foods --dry-run
```

---

## 🎯 Flujo de Trabajo Recomendado

### Cuando agregas una nueva tabla:

1. **Documenta el DDL**:
   ```bash
   # Crear archivo DDL
   cp docs/db/TEMPLATE_TABLE.md docs/db/nueva_tabla.md
   # Editar y agregar el DDL real
   ```

2. **Generar entity** (opcional, si necesitas manipular datos):
   ```bash
   node scripts/generate-entity-from-ddl.js --table=nueva_tabla
   ```

3. **Validar**:
   ```bash
   node scripts/validate-entities-vs-ddl.js --entity=nueva_tabla
   ```

### Cuando modificas una tabla existente:

1. **Actualizar DDL**:
   ```bash
   # Editar docs/db/tabla.md con los cambios
   ```

2. **Validar diferencias**:
   ```bash
   node scripts/validate-entities-vs-ddl.js --entity=tabla
   ```

3. **Actualizar entity manualmente** siguiendo las sugerencias del script

4. **Re-validar**:
   ```bash
   node scripts/validate-entities-vs-ddl.js --entity=tabla
   # Debe mostrar ✅ Correcta
   ```

### Mantenimiento periódico:

```bash
# Validar todo el sistema cada mes
node scripts/validate-entities-vs-ddl.js

# Si hay diferencias, revisar el reporte
cat ENTITY_VALIDATION_REPORT.md

# Actualizar entities según sea necesario
```

---

## 🔍 Integración con CI/CD

Puedes agregar la validación a tu pipeline:

```yaml
# .github/workflows/validate-entities.yml
name: Validate Entities vs DDL

on: [push, pull_request]

jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      
      - name: Validate entities
        run: node scripts/validate-entities-vs-ddl.js
        
      - name: Upload report
        if: failure()
        uses: actions/upload-artifact@v2
        with:
          name: validation-report
          path: ENTITY_VALIDATION_REPORT.md
```

---

## 📚 Convenciones de Mapeo

El script sigue estas convenciones:

### SQL → JavaScript

```
SQL (snake_case)    →    JS (snake_case en entity)
─────────────────────────────────────────────────
first_name          →    first_name
user_id             →    user_id
is_active           →    is_active
created_at          →    created_at
```

### Tipos de Datos

```
SQL Type            →    JS Type
────────────────────────────────
VARCHAR/TEXT        →    string
INT/BIGINT          →    number
DECIMAL/NUMERIC     →    number
TINYINT(1)          →    boolean
DATE/DATETIME       →    Date
TIMESTAMP           →    Date
JSON                →    string (JSON.stringify)
```

### En createEntity()

```javascript
// Mapeo camelCase → snake_case
static createEntity(data) {
  const entity = new Entity();
  entity.id = uuidv4();
  entity.user_id = data.userId;        // camelCase input
  entity.first_name = data.firstName;  // → snake_case entity
  entity.is_active = data.isActive ?? true;
  return entity;
}
```

---

## 🚨 Casos Especiales

### Tablas sin Entity

No todas las tablas necesitan una entity. **Está OK no tener entity** para:

- Tablas de relación many-to-many simples
- Tablas de configuración solo-lectura
- Tablas que nunca se modifican desde código
- Tablas auxiliares con < 3 campos

**Ejemplo**: Una tabla `users_specialties` que solo relaciona IDs no necesita entity.

### Múltiples Entities por Archivo

Algunos archivos tienen varias entities relacionadas:

```javascript
// routine.js
export class Routine { ... }
export class RoutineExercise { ... }
export class RoutineSnapshot { ... }
```

El script valida **cada clase export** por separado.

### Campos Calculados

Campos que se calculan en runtime pero NO están en BD:

```javascript
export class User {
  // Campos de BD
  first_name;
  last_name;
  
  // ⚠️ Campo calculado (no en DDL)
  get fullName() {
    return `${this.first_name} ${this.last_name}`;
  }
}
```

**Solución**: Usa getters (no properties) para campos calculados.

---

## 🐛 Troubleshooting

### Error: "No se encontró DDL para X"

**Causa**: La entity existe en código pero no hay `docs/db/X.md`

**Solución**:
1. Crear el archivo DDL correspondiente
2. O eliminar la entity si ya no se usa

### Error: "Campos obsoletos detectados"

**Causa**: La entity tiene campos que no existen en el DDL actual

**Solución**:
1. Verificar si el DDL está actualizado
2. Si el DDL es correcto, eliminar los campos obsoletos de la entity
3. Buscar globalmente dónde se usan esos campos y actualizar

### Warning: "Campos faltantes"

**Causa**: El DDL tiene columnas que no están en la entity

**Solución**:
1. Agregar los campos a la entity
2. Actualizar el método `createEntity()` para mapearlos
3. Re-validar

---

## 📖 Referencias

- [Guía de Agentes](../../00_Overview/AGENTS_GUIDE.md)
- [Modelos de BD](../../01_Backend/Database/00_INDEX.md)
- [Reporte de Refactor Completo](../COMPLETE_REFACTOR_REPORT.md)

---

## 💡 Tips

1. **Ejecuta el script antes de cada PR** para detectar desalineaciones temprano

2. **Usa el reporte MD generado** como checklist de tareas

3. **Automatiza en CI** para prevenir regressions

4. **Mantén los DDL actualizados** como fuente de verdad única

---

**Creado**: 2025-10-15  
**Autor**: AI Agent (Cursor/Claude)  
**Mantenedor**: Miguel Valdés

