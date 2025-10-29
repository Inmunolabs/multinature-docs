# exercises_equivalences

## DDL (fuente de verdad)
```sql
CREATE TABLE `exercises_equivalences` (

  `exercise_id` varchar(36) DEFAULT NULL,
  `equivalent_id` varchar(36) DEFAULT NULL,
  `repetitions` varchar(255) DEFAULT NULL,
  KEY `exerciseId` (`exercise_id`),
  KEY `equivalentId` (`equivalent_id`),
  CONSTRAINT `exercises_equivalences_ibfk_1` FOREIGN KEY (`exercise_id`) REFERENCES `exercises` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `exercises_equivalences_ibfk_2` FOREIGN KEY (`equivalent_id`) REFERENCES `exercises` (`id`) ON DELETE CASCADE ON UPDATE CASCADE

);
```

## Resumen de columnas
```
Table: exercises_equivalences
Columns:
CREATE TABLE `exercises_equivalences` (
exercise_id varchar(36)
equivalent_id varchar(36)
repetitions varchar(255)
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
