# routines

## DDL (fuente de verdad)

```sql
CREATE TABLE `routines` (
  `id` char(36) NOT NULL,
  `specialist_id` char(36) NOT NULL,
  `user_id` char(36) NOT NULL,
  `notes` text,
  `is_ai` tinyint(1) NOT NULL DEFAULT '0',
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_routines2_user_specialist` (`user_id`,`specialist_id`),
  KEY `specialist_id` (`specialist_id`),
  CONSTRAINT `routines_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `routines_ibfk_2` FOREIGN KEY (`specialist_id`) REFERENCES `users` (`id`)
);
```

## Resumen de columnas

```
Table: routines
Columns:
id char(36) NOT NULL PK
specialist_id char(36) NOT NULL
user_id char(36) NOT NULL
notes text
is_ai tinyint(1) NOT NULL DEFAULT '0'
updated_at timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
created_at timestamp NULL DEFAULT CURRENT_TIMESTAMP
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
