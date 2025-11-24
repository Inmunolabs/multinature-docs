# workout_muscle_targets

## DDL (fuente de verdad)

```sql
CREATE TABLE `workout_muscle_targets` (
  `workout_id` char(36) NOT NULL,
  `muscle_id` varchar(50) NOT NULL,
  `series` int NOT NULL,
  PRIMARY KEY (`workout_id`,`muscle_id`),
  KEY `muscle_id` (`muscle_id`),
  CONSTRAINT `workout_muscle_targets_ibfk_1` FOREIGN KEY (`workout_id`) REFERENCES `workout_plans` (`id`),
  CONSTRAINT `workout_muscle_targets_ibfk_2` FOREIGN KEY (`muscle_id`) REFERENCES `muscles` (`id`)
);
```

## Resumen de columnas

```
Table: workout_muscle_targets
Columns:
CREATE TABLE `workout_muscle_targets` (
workout_id char(36) NOT NULL PK
muscle_id varchar(50) NOT NULL PK
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
