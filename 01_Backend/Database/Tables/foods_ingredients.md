# foods_ingredients

## DDL (fuente de verdad)
```sql
CREATE TABLE `foods_ingredients` (

  `food_id` varchar(36) NOT NULL,
  `ingredient_id` varchar(36) NOT NULL,
  `quantity` decimal(6,2) NOT NULL,
  `equivalence_quantity` decimal(6,2) NOT NULL DEFAULT '0.00',
  PRIMARY KEY (`food_id`,`ingredient_id`),
  KEY `foods_ingredients_ibfk_2` (`ingredient_id`),
  CONSTRAINT `foods_ingredients_ibfk_1` FOREIGN KEY (`food_id`) REFERENCES `foods` (`id`),
  CONSTRAINT `foods_ingredients_ibfk_2` FOREIGN KEY (`ingredient_id`) REFERENCES `ingredients` (`id`) ON DELETE CASCADE

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
```

## Resumen de columnas
```
Table: foods_ingredients
Columns:
CREATE TABLE `foods_ingredients` (
food_id varchar(36) NOT NULL PK
ingredient_id varchar(36) NOT NULL PK
quantity decimal(6
equivalence_quantity decimal(6
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
