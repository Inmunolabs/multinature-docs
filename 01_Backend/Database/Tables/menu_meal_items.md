# menu_meal_items

## DDL (fuente de verdad)
```sql
CREATE TABLE `menu_meal_items` (

  `id` char(36) NOT NULL,
  `menu_meal_id` char(36) NOT NULL,
  `ingredient_id` char(36) DEFAULT NULL,
  `food_id` char(36) DEFAULT NULL,
  `quantity` decimal(10,3) NOT NULL DEFAULT '1.000',
  `position` int unsigned NOT NULL DEFAULT '1',
  `type` enum('food','ingredient') NOT NULL DEFAULT 'food',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `ix_mmi_meal` (`menu_meal_id`,`position`),
  KEY `ix_mmi_ing` (`ingredient_id`),
  KEY `ix_mmi_food` (`food_id`),
  CONSTRAINT `fk_mmi_food` FOREIGN KEY (`food_id`) REFERENCES `foods` (`id`) ON DELETE RESTRICT,
  CONSTRAINT `fk_mmi_ing` FOREIGN KEY (`ingredient_id`) REFERENCES `ingredients` (`id`) ON DELETE RESTRICT,
  CONSTRAINT `fk_mmi_meal` FOREIGN KEY (`menu_meal_id`) REFERENCES `menu_meals` (`id`) ON DELETE CASCADE,
  CONSTRAINT `chk_mmi_qty` CHECK ((`quantity` > 0)),
  CONSTRAINT `chk_mmi_xor` CHECK ((((`ingredient_id` is not null) and (`food_id` is null)) or ((`ingredient_id` is null) and (`food_id` is not null))))

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
```

## Resumen de columnas
```
Table: menu_meal_items
Columns:
CREATE TABLE `menu_meal_items` (
id char(36) NOT NULL PK
menu_meal_id char(36) NOT NULL
ingredient_id char(36)
food_id char(36)
quantity decimal(10
position int unsigned NOT NULL
type enum('food'
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
