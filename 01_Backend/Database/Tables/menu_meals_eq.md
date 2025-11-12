# menu_meals_eq

## DDL (fuente de verdad)

```sql
CREATE TABLE `menu_meals_eq` (
  `id` char(36) NOT NULL,
  `menu_meal_id` char(36) NOT NULL,
  `equivalence_group_id` char(36) DEFAULT NULL,
  `quantity` decimal(10,3) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_meal_group` (`menu_meal_id`,`equivalence_group_id`),
  KEY `fk_mmeq_group` (`equivalence_group_id`),
  KEY `ix_mmeq_meal` (`menu_meal_id`),
  CONSTRAINT `fk_mmeq_group` FOREIGN KEY (`equivalence_group_id`) REFERENCES `equivalences_groups` (`id`) ON DELETE RESTRICT,
  CONSTRAINT `fk_mmeq_meal` FOREIGN KEY (`menu_meal_id`) REFERENCES `menu_meals` (`id`) ON DELETE CASCADE
);
```

## Resumen de columnas

```
Table: menu_meals_eq
Columns:
CREATE TABLE `menu_meals_eq` (
id char(36) NOT NULL PK
menu_meal_id char(36) NOT NULL
equivalence_group_id char(36)
quantity decimal(10
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
