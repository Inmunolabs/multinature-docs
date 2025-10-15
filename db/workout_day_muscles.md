# workout_day_muscles

## DDL (fuente de verdad)
```sql
CREATE TABLE `workout_day_muscles` (

  `id` char(36) NOT NULL,
  `day_split_id` char(36) NOT NULL,
  `muscle_id` varchar(50) NOT NULL,
  `series` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `day_split_id` (`day_split_id`),
  KEY `muscle_id` (`muscle_id`),
  CONSTRAINT `workout_day_muscles_ibfk_1` FOREIGN KEY (`day_split_id`) REFERENCES `workout_day_splits` (`id`) ON DELETE CASCADE,
  CONSTRAINT `workout_day_muscles_ibfk_2` FOREIGN KEY (`muscle_id`) REFERENCES `muscles` (`id`)

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
```

## Resumen de columnas
```
Table: workout_day_muscles
Columns:
CREATE TABLE `workout_day_muscles` (
id char(36) NOT NULL PK
day_split_id char(36) NOT NULL
muscle_id varchar(50) NOT NULL
series int NOT NULL
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
