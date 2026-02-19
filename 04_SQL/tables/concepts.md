# concepts

## DDL (fuente de verdad)

```sql
CREATE TABLE `concepts` (
  `id` varchar(36) NOT NULL,
  `specialist_id` varchar(36) DEFAULT NULL,
  `name` varchar(100) NOT NULL,
  `default_unit` varchar(20) DEFAULT NULL,
  `field_type` varchar(30) NOT NULL DEFAULT 'text',
  `description` text,
  `is_clinical` tinyint(1) NOT NULL DEFAULT '0',
  `clinical_domain` varchar(50) DEFAULT NULL,
  `clinical_group` varchar(50) DEFAULT NULL,
  `standard` varchar(20) DEFAULT NULL,
  `kind` varchar(20) DEFAULT NULL,
  `value_type` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_concetp_name_per_specialists` (`specialist_id`,`name`));
```

## Resumen de columnas

```
Table: concepts
Columns:
id varchar(36) NOT NULL PK
specialist_id varchar(36)
name varchar(100) NOT NULL
default_unit varchar(20)
field_type varchar(30) NOT NULL DEFAULT 'text'
description text
is_clinical tinyint(1) NOT NULL DEFAULT '0'
clinical_domain varchar(50)
clinical_group varchar(50)
standard varchar(20)
kind varchar(20)
value_type varchar(20)
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
