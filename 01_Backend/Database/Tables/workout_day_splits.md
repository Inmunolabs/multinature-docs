# workout_day_splits

## DDL (fuente de verdad)

```sql
CREATE TABLE `workout_day_splits` (
  `id` char(36) NOT NULL,
  `workout_id` char(36) NOT NULL,
  `weekday` tinyint unsigned NOT NULL,
  `notes` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_workout_day` (`workout_id`,`weekday`),
  CONSTRAINT `workout_day_splits_ibfk_1` FOREIGN KEY (`workout_id`) REFERENCES `workout_plans` (`id`) ON DELETE CASCADE
);
```

## Resumen de columnas

```
Table: workout_day_splits
Columns:
CREATE TABLE `workout_day_splits` (
id char(36) NOT NULL PK
workout_id char(36) NOT NULL
weekday tinyint unsigned NOT NULL
notes text
created_at timestamp NULL
updated_at timestamp NULL
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
