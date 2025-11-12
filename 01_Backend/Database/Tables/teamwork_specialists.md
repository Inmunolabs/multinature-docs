# teamwork_specialists

## DDL (fuente de verdad)

```sql
CREATE TABLE `teamwork_specialists` (
  `teamwork_id` varchar(36) NOT NULL,
  `specialist_id` varchar(36) NOT NULL,
  `created_at` date NOT NULL DEFAULT (now()),
  `deleted_at` date DEFAULT NULL,
  UNIQUE KEY `unique_teamwork_specialist` (`teamwork_id`,`specialist_id`),
  KEY `teamwork_id` (`teamwork_id`),
  KEY `specialist_id` (`specialist_id`),
  CONSTRAINT `teamwork_specialists_ibfk_1` FOREIGN KEY (`teamwork_id`) REFERENCES `teamworks` (`id`),
  CONSTRAINT `teamwork_specialists_ibfk_2` FOREIGN KEY (`specialist_id`) REFERENCES `users` (`id`)
);
```

## Resumen de columnas

```
Table: teamwork_specialists
Columns:
CREATE TABLE `teamwork_specialists` (
teamwork_id varchar(36) NOT NULL
specialist_id varchar(36) NOT NULL
created_at date NOT NULL
deleted_at date
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
