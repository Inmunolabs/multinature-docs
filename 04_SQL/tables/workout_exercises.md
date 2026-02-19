# workout_exercises

## DDL (fuente de verdad)

```sql
CREATE TABLE `workout_exercises` (
  `id` char(36) NOT NULL,
  `workout_day_id` char(36) NOT NULL,
  `exercise_id` char(36) NOT NULL,
  `muscle_id` varchar(50) NOT NULL,
  `order_in_day` int NOT NULL,
  `rest_after_exercise_seconds` int DEFAULT '60',
  `notes` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `workout_day_id` (`workout_day_id`),
  KEY `muscle_id` (`muscle_id`),
  KEY `workout_exercises_ibfk_2` (`exercise_id`),
  CONSTRAINT `workout_exercises_ibfk_1` FOREIGN KEY (`workout_day_id`) REFERENCES `workout_days` (`id`) ON DELETE CASCADE,
  CONSTRAINT `workout_exercises_ibfk_2` FOREIGN KEY (`exercise_id`) REFERENCES `exercises` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `workout_exercises_ibfk_3` FOREIGN KEY (`muscle_id`) REFERENCES `muscles` (`id`)
);
```

## Resumen de columnas

```
Table: workout_exercises
Columns:
id char(36) NOT NULL PK
workout_day_id char(36) NOT NULL
exercise_id char(36) NOT NULL
muscle_id varchar(50) NOT NULL
order_in_day int NOT NULL
rest_after_exercise_seconds int DEFAULT '60'
notes text
created_at timestamp NULL DEFAULT CURRENT_TIMESTAMP
updated_at timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
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
