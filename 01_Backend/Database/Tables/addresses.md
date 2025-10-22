# addresses

## DDL (fuente de verdad)
```sql
CREATE TABLE `addresses` (

  `id` varchar(36) NOT NULL,
  `user_id` varchar(36) NOT NULL,
  `street` varchar(60) NOT NULL,
  `ext_number` int NOT NULL,
  `int_number` int DEFAULT NULL,
  `neighborhood` varchar(100) NOT NULL,
  `city` varchar(60) NOT NULL,
  `zip_code` int NOT NULL,
  `federal_entity` varchar(30) NOT NULL,
  `country` varchar(60) NOT NULL DEFAULT 'México',
  `refer` text,
  `is_shipping_address` tinyint(1) NOT NULL DEFAULT '0',
  `is_clinic` tinyint(1) DEFAULT NULL,
  `is_tax_address` tinyint(1) DEFAULT '0',
  `updated_at` datetime DEFAULT (now()),
  `created_at` datetime DEFAULT (now()),
  PRIMARY KEY (`id`),
  KEY `addresses_ibfk_1` (`user_id`),
  CONSTRAINT `addresses_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
```

## Resumen de columnas
```
Table: addresses
Columns:
CREATE TABLE `addresses` (
id varchar(36) NOT NULL PK
user_id varchar(36) NOT NULL
street varchar(60) NOT NULL
ext_number int NOT NULL
int_number int
neighborhood varchar(100) NOT NULL
city varchar(60) NOT NULL
zip_code int NOT NULL
federal_entity varchar(30) NOT NULL
country varchar(60) NOT NULL
refer text
is_shipping_address tinyint(1) NOT NULL
is_clinic tinyint(1)
is_tax_address tinyint(1)
updated_at datetime
created_at datetime
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
