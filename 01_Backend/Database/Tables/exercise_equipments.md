# exercise_equipments

## DDL (fuente de verdad)

```sql
CREATE TABLE `exercise_equipments` (
  `exercise_id` varchar(36) NOT NULL,
  `equipment_id` varchar(50) NOT NULL,
  PRIMARY KEY (`exercise_id`,`equipment_id`),
  KEY `equipment_id` (`equipment_id`),
  CONSTRAINT `exercise_equipments_ibfk_1` FOREIGN KEY (`exercise_id`) REFERENCES `exercises2` (`id`),
  CONSTRAINT `exercise_equipments_ibfk_2` FOREIGN KEY (`equipment_id`) REFERENCES `equipments` (`id`)
);
```

## Resumen de columnas

```
Table: exercise_equipments
Columns:
CREATE TABLE `exercise_equipments` (
exercise_id varchar(36) NOT NULL PK
equipment_id varchar(50) NOT NULL PK
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
