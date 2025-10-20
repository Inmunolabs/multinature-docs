# menu_meal_item_food_overrides

## DDL (fuente de verdad)
```sql
CREATE TABLE `menu_meal_item_food_overrides` (

  `id` char(36) NOT NULL,
  `menu_meal_item_id` char(36) NOT NULL,
  `food_id` char(36) NOT NULL,
  `ingredient_id` char(36) NOT NULL,
  `quantity` decimal(10,3) NOT NULL,
  `unit` varchar(32) DEFAULT NULL,
  `notes` text,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_override_item_fooding` (`menu_meal_item_id`),
  KEY `ix_override_item` (`menu_meal_item_id`),
  CONSTRAINT `fk_override_item` FOREIGN KEY (`menu_meal_item_id`) REFERENCES `menu_meal_items` (`id`) ON DELETE CASCADE,
  CONSTRAINT `chk_override_qty` CHECK ((`quantity` > 0))

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
```

## Resumen de columnas
```
Table: menu_meal_item_food_overrides
Columns:
CREATE TABLE `menu_meal_item_food_overrides` (
id char(36) NOT NULL PK
menu_meal_item_id char(36) NOT NULL
food_id char(36) NOT NULL
ingredient_id char(36) NOT NULL
quantity decimal(10
unit varchar(32)
notes text
created_at timestamp NOT NULL
updated_at timestamp NOT NULL
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
