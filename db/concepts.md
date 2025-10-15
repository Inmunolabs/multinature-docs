# concepts

## DDL (fuente de verdad)
```sql
CREATE TABLE `concepts` (

  `id` varchar(36) NOT NULL,
  `specialist_id` varchar(36) DEFAULT NULL,
  `name` varchar(100) NOT NULL,
  `default_unit` varchar(20) DEFAULT NULL,
  `description` text,
  PRIMARY KEY (`id`)

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
```

## Resumen de columnas
```
Table: concepts
Columns:
CREATE TABLE `concepts` (
id varchar(36) NOT NULL PK
specialist_id varchar(36)
name varchar(100) NOT NULL
default_unit varchar(20)
description text
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
