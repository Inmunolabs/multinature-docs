# specialist_support_material

## DDL (fuente de verdad)
```sql
CREATE TABLE `specialist_support_material` (

  `id` varchar(36) NOT NULL,
  `specialist_id` varchar(36) NOT NULL,
  `name` varchar(60) NOT NULL,
  `notes` text,
  `url` text NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `s3_key` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `specialist_id` (`specialist_id`),
  CONSTRAINT `specialist_support_material_ibfk_1` FOREIGN KEY (`specialist_id`) REFERENCES `users` (`id`) ON DELETE CASCADE

);
```

## Resumen de columnas
```
Table: specialist_support_material
Columns:
CREATE TABLE `specialist_support_material` (
id varchar(36) NOT NULL PK
specialist_id varchar(36) NOT NULL
name varchar(60) NOT NULL
notes text
url text NOT NULL
created_at timestamp NULL
s3_key varchar(255)
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
