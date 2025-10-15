# workout_exercise_details

## DDL (fuente de verdad)
```sql
CREATE TABLE `workout_exercise_details` (

  `id` char(36) NOT NULL,
  `workout_exercise_id` char(36) NOT NULL,
  `set_number` int NOT NULL,
  `reps` int DEFAULT NULL,
  `time_seconds` int DEFAULT NULL,
  `weight` decimal(6,2) DEFAULT NULL,
  `rest_between_series_seconds` int DEFAULT NULL,
  `tempo` varchar(20) DEFAULT NULL,
  `notes` text,
  PRIMARY KEY (`id`),
  KEY `workout_exercise_id` (`workout_exercise_id`),
  CONSTRAINT `workout_exercise_details_ibfk_1` FOREIGN KEY (`workout_exercise_id`) REFERENCES `workout_exercises` (`id`)

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
```

## Resumen de columnas
```
Table: workout_exercise_details
Columns:
CREATE TABLE `workout_exercise_details` (
id char(36) NOT NULL PK
workout_exercise_id char(36) NOT NULL
set_number int NOT NULL
reps int
time_seconds int
weight decimal(6
rest_between_series_seconds int
tempo varchar(20)
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
