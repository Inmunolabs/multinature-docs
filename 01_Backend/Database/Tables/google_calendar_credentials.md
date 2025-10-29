# google_calendar_credentials

## DDL (fuente de verdad)
```sql
CREATE TABLE `google_calendar_credentials` (

  `user_id` varchar(36) NOT NULL,
  `refresh_token` text NOT NULL,
  `email` text NOT NULL,
  KEY `user_id` (`user_id`),
  CONSTRAINT `google_calendar_credentials_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)

);
```

## Resumen de columnas
```
Table: google_calendar_credentials
Columns:
CREATE TABLE `google_calendar_credentials` (
user_id varchar(36) NOT NULL
refresh_token text NOT NULL
email text NOT NULL
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
