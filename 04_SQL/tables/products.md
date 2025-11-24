# products

## DDL (fuente de verdad)

```sql
CREATE TABLE `products` (
  `id` varchar(36) NOT NULL,
  `product` varchar(45) NOT NULL,
  `specialties` json DEFAULT NULL,
  `url_images` json NOT NULL,
  `ingredients` text,
  `other_ingredients` text,
  `content` text NOT NULL,
  `price` decimal(6,2) NOT NULL,
  `stock` int NOT NULL,
  `description` longtext NOT NULL,
  `benefits` json NOT NULL,
  `studies` json DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `is_active` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
);
```

## Resumen de columnas

```
Table: products
Columns:
CREATE TABLE `products` (
id varchar(36) NOT NULL PK
product varchar(45) NOT NULL
specialties json
url_images json NOT NULL
ingredients text
other_ingredients text
content text NOT NULL
price decimal(6
stock int NOT NULL
description longtext NOT NULL
benefits json NOT NULL
studies json
created_at datetime NOT NULL
updated_at datetime NOT NULL
is_active tinyint(1) NOT NULL
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
