# users_consumption

## DDL (fuente de verdad)

```sql
CREATE TABLE `users_consumption` (
  `user_id` varchar(36) NOT NULL,
  `product_id` varchar(36) NOT NULL,
  `order_id` varchar(36) NOT NULL,
  `product` varchar(45) NOT NULL,
  `price` decimal(6,2) NOT NULL,
  `total` decimal(8,2) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  KEY `userId` (`user_id`),
  KEY `productId` (`product_id`),
  KEY `orderId` (`order_id`),
  CONSTRAINT `users_consumption_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `users_consumption_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `users_consumption_ibfk_3` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
);
```

## Resumen de columnas

```
Table: users_consumption
Columns:
CREATE TABLE `users_consumption` (
user_id varchar(36) NOT NULL
product_id varchar(36) NOT NULL
order_id varchar(36) NOT NULL
product varchar(45) NOT NULL
price decimal(6
total decimal(8
created_at datetime NOT NULL
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
