# workout_exercises

## DDL (fuente de verdad)
```sql
CREATE TABLE `workout_exercises` (

  `id` char(36) NOT NULL,
  `day_split_id` char(36) NOT NULL,
  `exercise_id` char(36) NOT NULL,
  `muscle_id` varchar(50) NOT NULL,
  `order_in_day` int NOT NULL,
  `rest_after_exercise_seconds` int DEFAULT '60',
  `notes` text,
  PRIMARY KEY (`id`),
  KEY `day_split_id` (`day_split_id`),
  KEY `exercise_id` (`exercise_id`),
  KEY `muscle_id` (`muscle_id`),
  CONSTRAINT `workout_exercises_ibfk_1` FOREIGN KEY (`day_split_id`) REFERENCES `workout_day_splits` (`id`),
  CONSTRAINT `workout_exercises_ibfk_2` FOREIGN KEY (`exercise_id`) REFERENCES `exercises2` (`id`),
  CONSTRAINT `workout_exercises_ibfk_3` FOREIGN KEY (`muscle_id`) REFERENCES `muscles` (`id`)

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
```

## Resumen de columnas
```
Table: workout_exercises
Columns:
CREATE TABLE `workout_exercises` (
id char(36) NOT NULL PK
day_split_id char(36) NOT NULL
exercise_id char(36) NOT NULL
muscle_id varchar(50) NOT NULL
order_in_day int NOT NULL
rest_after_exercise_seconds int
notes text
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
