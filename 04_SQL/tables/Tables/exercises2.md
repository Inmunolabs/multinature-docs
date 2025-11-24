# exercises2

## DDL (fuente de verdad)

```sql
CREATE TABLE `exercises2` (
  `id` varchar(36) NOT NULL,
  `exercisedbapi_id` varchar(36) DEFAULT NULL,
  `name` text NOT NULL,
  `gif_url` text,
  `instructions` json DEFAULT NULL,
  PRIMARY KEY (`id`)
);
```

## Resumen de columnas

```
Table: exercises2
Columns:
CREATE TABLE `exercises2` (
id varchar(36) NOT NULL PK
exercisedbapi_id varchar(36)
name text NOT NULLF
gif_url text
instructions json
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
