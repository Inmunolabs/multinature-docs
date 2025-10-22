# diet_menu_weekly

## DDL (fuente de verdad)
```sql
CREATE TABLE `diet_menu_weekly` (

  `id` char(36) NOT NULL,
  `diet_id` char(36) DEFAULT NULL,
  `menu_id` char(36) NOT NULL,
  `weekday` tinyint unsigned NOT NULL,
  `notes` text,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_diet_weekday` (`diet_id`,`weekday`),
  KEY `ix_dmw_menu` (`menu_id`,`weekday`),
  KEY `ix_dmw_diet` (`diet_id`),
  CONSTRAINT `fk_dmw_diet` FOREIGN KEY (`diet_id`) REFERENCES `diets` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_dmw_menu` FOREIGN KEY (`menu_id`) REFERENCES `menus` (`id`) ON DELETE CASCADE

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
```

## Resumen de columnas
```
Table: diet_menu_weekly
Columns:
CREATE TABLE `diet_menu_weekly` (
id char(36) NOT NULL PK
diet_id char(36)
menu_id char(36) NOT NULL
weekday tinyint unsigned NOT NULL
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
