# foods_ingredients

## DDL (fuente de verdad)

```sql
CREATE TABLE `foods_ingredients` (
  `food_id` varchar(36) NOT NULL,
  `ingredient_id` varchar(36) NOT NULL,
  `quantity` decimal(6,2) NOT NULL,
  `equivalence_quantity` decimal(6,2) NOT NULL DEFAULT '0.00',
  `net_g` decimal(10,2) DEFAULT NULL,
  `kcal` decimal(10,2) DEFAULT NULL,
  `protein_g` decimal(10,2) DEFAULT NULL,
  `lipid_g` decimal(10,2) DEFAULT NULL,
  `carb_g` decimal(10,2) DEFAULT NULL,
  `computed_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`food_id`,`ingredient_id`),
  KEY `foods_ingredients_ibfk_2` (`ingredient_id`),
  CONSTRAINT `foods_ingredients_ibfk_1` FOREIGN KEY (`food_id`) REFERENCES `foods` (`id`),
  CONSTRAINT `foods_ingredients_ibfk_2` FOREIGN KEY (`ingredient_id`) REFERENCES `ingredients` (`id`) ON DELETE CASCADE);
```

## Resumen de columnas

```
Table: foods_ingredients
Columns:
food_id varchar(36) NOT NULL PK
ingredient_id varchar(36) NOT NULL PK
quantity decimal(6,2) NOT NULL
equivalence_quantity decimal(6,2) NOT NULL DEFAULT '0.00'
net_g decimal(10,2)
kcal decimal(10,2)
protein_g decimal(10,2)
lipid_g decimal(10,2)
carb_g decimal(10,2)
computed_at timestamp NULL DEFAULT CURRENT_TIMESTAMP
```

## Reglas de mapeo

- SQL `snake_case` ↔ JS `camelCase` 1:1.
- Tipos DECIMAL/NUMERIC → `number` en JS. `TINYINT(1)` ↔ `boolean`.
- Evitar alias de columnas inexistentes; si no está en DDL, no va en entity/DTO.

## Queries estándar sugeridos

- SELECT por `id`
- LIST con filtros comunes y paginación
- INSERT validando NOT NULL
- UPDATE parcial por `id`
- DELETE por `id` (si aplica)

## Notas

- Documenta claves foráneas, índices y `ORDER BY` por defecto si aplica.
