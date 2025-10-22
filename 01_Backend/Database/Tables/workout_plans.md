# workout_plans

## DDL (fuente de verdad)
```sql
CREATE TABLE `workout_plans` (

  `id` char(36) NOT NULL,
  `notes` text,
  `total_series` int DEFAULT NULL,
  `user_id` char(36) NOT NULL,
  `specialist_id` char(36) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_workout_user_specialist` (`user_id`,`specialist_id`),
  KEY `specialist_id` (`specialist_id`),
  CONSTRAINT `workout_plans_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `workout_plans_ibfk_2` FOREIGN KEY (`specialist_id`) REFERENCES `users` (`id`)

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
```

## Resumen de columnas
```
Table: workout_plans
Columns:
CREATE TABLE `workout_plans` (
id char(36) NOT NULL PK
notes text
total_series int
user_id char(36) NOT NULL
specialist_id char(36) NOT NULL
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
