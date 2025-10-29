# specialist_certificates

## DDL (fuente de verdad)
```sql
CREATE TABLE `specialist_certificates` (

  `id` varchar(36) NOT NULL,
  `specialist_id` varchar(36) NOT NULL,
  `name` varchar(60) NOT NULL,
  `url` text NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `specialist_id` (`specialist_id`),
  CONSTRAINT `specialist_certificates_ibfk_1` FOREIGN KEY (`specialist_id`) REFERENCES `users` (`id`) ON DELETE CASCADE

);
```

## Resumen de columnas
```
Table: specialist_certificates
Columns:
CREATE TABLE `specialist_certificates` (
id varchar(36) NOT NULL PK
specialist_id varchar(36) NOT NULL
name varchar(60) NOT NULL
url text NOT NULL
created_at timestamp NULL
updated_at timestamp NULL
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
