# menu_meals

## DDL (fuente de verdad)
```sql
CREATE TABLE `menu_meals` (

  `id` char(36) NOT NULL,
  `menu_id` char(36) NOT NULL,
  `meal_type` enum('desayuno','colacion','comida','cena') NOT NULL,
  `meal_time` time DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `ix_meals_menu` (`menu_id`,`meal_type`),
  CONSTRAINT `fk_menu_meals_menu` FOREIGN KEY (`menu_id`) REFERENCES `menus` (`id`) ON DELETE CASCADE

);
```

## Resumen de columnas
```
Table: menu_meals
Columns:
CREATE TABLE `menu_meals` (
id char(36) NOT NULL PK
menu_id char(36) NOT NULL
meal_type enum('desayuno'
meal_time time
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
