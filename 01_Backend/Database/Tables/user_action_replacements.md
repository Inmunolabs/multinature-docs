# user_action_replacements

## DDL (fuente de verdad)

```sql
CREATE TABLE `user_action_replacements` (
  `id` varchar(36) NOT NULL,
  `user_id` varchar(36) NOT NULL,
  `date` datetime NOT NULL,
  `type` enum('meal','routine') NOT NULL,
  `reference_id` varchar(36) NOT NULL,
  `replacement_text` text,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_user_action_replacements2_user_id` (`user_id`),
  CONSTRAINT `fk_user_action_replacements2_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
);
```

## Resumen de columnas

```
Table: user_action_replacements
Columns:
CREATE TABLE `user_action_replacements` (
id varchar(36) NOT NULL PK
user_id varchar(36) NOT NULL
date datetime NOT NULL
type enum('meal'
reference_id varchar(36) NOT NULL
replacement_text text
created_at datetime
updated_at datetime
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
