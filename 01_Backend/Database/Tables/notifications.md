# notifications

## DDL (fuente de verdad)
```sql
CREATE TABLE `notifications` (

  `id` varchar(36) NOT NULL,
  `user_id` varchar(36) NOT NULL,
  `date` date NOT NULL DEFAULT (now()),
  `title` text NOT NULL,
  `message` text,
  `action_text` text,
  `redirect_url` text,
  `read` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `userId` (`user_id`),
  CONSTRAINT `notifications_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)

);
```

## Resumen de columnas
```
Table: notifications
Columns:
CREATE TABLE `notifications` (
id varchar(36) NOT NULL PK
user_id varchar(36) NOT NULL
date date NOT NULL
title text NOT NULL
message text
action_text text
redirect_url text
read tinyint(1) NOT NULL
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
