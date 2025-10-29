# exercise_bodyParts

## DDL (fuente de verdad)
```sql
CREATE TABLE `exercise_bodyParts` (

  `exercise_id` varchar(36) NOT NULL,
  `bodyPart_id` varchar(50) NOT NULL,
  PRIMARY KEY (`exercise_id`,`bodyPart_id`),
  KEY `bodyPart_id` (`bodyPart_id`),
  CONSTRAINT `exercise_bodyParts_ibfk_1` FOREIGN KEY (`exercise_id`) REFERENCES `exercises2` (`id`),
  CONSTRAINT `exercise_bodyParts_ibfk_2` FOREIGN KEY (`bodyPart_id`) REFERENCES `bodyParts` (`id`)

);
```

## Resumen de columnas
```
Table: exercise_bodyParts
Columns:
CREATE TABLE `exercise_bodyParts` (
exercise_id varchar(36) NOT NULL PK
bodyPart_id varchar(50) NOT NULL PK
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
