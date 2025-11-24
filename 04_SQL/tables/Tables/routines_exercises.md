# routines_exercises

## DDL (fuente de verdad)

```sql
CREATE TABLE `routines_exercises` (
  `id` varchar(36) NOT NULL,
  `routine_id` varchar(36) NOT NULL,
  `exercise_id` varchar(36) NOT NULL,
  `day_of_week` int DEFAULT NULL,
  `repetitions` text,
  `index` int DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
);
```

## Resumen de columnas

```
Table: routines_exercises
Columns:
CREATE TABLE `routines_exercises` (
id varchar(36) NOT NULL PK
routine_id varchar(36) NOT NULL
exercise_id varchar(36) NOT NULL
day_of_week int
repetitions text
index int
updated_at timestamp NULL
created_at timestamp NULL
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
