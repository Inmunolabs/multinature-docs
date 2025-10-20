# filled_form_values

## DDL (fuente de verdad)
```sql
CREATE TABLE `filled_form_values` (

  `id` varchar(36) NOT NULL,
  `filled_form_id` varchar(36) NOT NULL,
  `concept_id` varchar(36) NOT NULL,
  `concept_name` varchar(100) DEFAULT NULL,
  `value` text,
  `unit` varchar(20) DEFAULT NULL,
  `observation` text,
  `is_graphable` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `filledFormId` (`filled_form_id`),
  KEY `conceptId` (`concept_id`),
  CONSTRAINT `filled_form_values_ibfk_1` FOREIGN KEY (`filled_form_id`) REFERENCES `filled_forms` (`id`),
  CONSTRAINT `filled_form_values_ibfk_2` FOREIGN KEY (`concept_id`) REFERENCES `concepts` (`id`)

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
```

## Resumen de columnas
```
Table: filled_form_values
Columns:
CREATE TABLE `filled_form_values` (
id varchar(36) NOT NULL PK
filled_form_id varchar(36) NOT NULL
concept_id varchar(36) NOT NULL
concept_name varchar(100)
value text
unit varchar(20)
observation text
is_graphable tinyint(1)
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
