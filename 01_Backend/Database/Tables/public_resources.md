# public_resources

## DDL (fuente de verdad)
```sql
CREATE TABLE `public_resources` (

  `id` varchar(36) NOT NULL,
  `name` varchar(45) NOT NULL,
  `extension` varchar(10) NOT NULL,
  `page` varchar(45) NOT NULL,
  `display_order` int NOT NULL,
  `display_type` enum('unique','carousel','link','list','logo') NOT NULL DEFAULT 'unique',
  `url` text,
  `is_active` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id`)

);
```

## Resumen de columnas
```
Table: public_resources
Columns:
CREATE TABLE `public_resources` (
id varchar(36) NOT NULL PK
name varchar(45) NOT NULL
extension varchar(10) NOT NULL
page varchar(45) NOT NULL
display_order int NOT NULL
display_type enum('unique'
url text
is_active tinyint(1)
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
