# carts

## DDL (fuente de verdad)
```sql
CREATE TABLE `carts` (

  `user_id` varchar(36) NOT NULL,
  `product_id` varchar(36) NOT NULL,
  `quantity` int NOT NULL,
  `updated_at` datetime DEFAULT (now()),
  `created_at` datetime DEFAULT (now()),
  PRIMARY KEY (`user_id`,`product_id`),
  KEY `carts_ibfk_2` (`product_id`),
  CONSTRAINT `carts_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `carts_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`)

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
```

## Resumen de columnas
```
Table: carts
Columns:
CREATE TABLE `carts` (
user_id varchar(36) NOT NULL PK
product_id varchar(36) NOT NULL PK
quantity int NOT NULL
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
