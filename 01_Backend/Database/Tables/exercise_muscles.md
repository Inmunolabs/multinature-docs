# exercise_muscles

## DDL (fuente de verdad)
```sql
CREATE TABLE `exercise_muscles` (

  `exercise_id` varchar(36) NOT NULL,
  `muscle_id` varchar(50) NOT NULL,
  `type` varchar(20) NOT NULL,
  PRIMARY KEY (`exercise_id`,`muscle_id`,`type`),
  KEY `muscle_id` (`muscle_id`),
  CONSTRAINT `exercise_muscles_ibfk_1` FOREIGN KEY (`exercise_id`) REFERENCES `exercises2` (`id`),
  CONSTRAINT `exercise_muscles_ibfk_2` FOREIGN KEY (`muscle_id`) REFERENCES `muscles` (`id`),
  CONSTRAINT `exercise_muscles_chk_1` CHECK ((`type` in (_utf8mb4'primary',_utf8mb4'secondary')))

);
```

## Resumen de columnas
```
Table: exercise_muscles
Columns:
CREATE TABLE `exercise_muscles` (
exercise_id varchar(36) NOT NULL PK
muscle_id varchar(50) NOT NULL PK
type varchar(20) NOT NULL PK
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
