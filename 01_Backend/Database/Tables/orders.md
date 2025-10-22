# orders

## DDL (fuente de verdad)
```sql
CREATE TABLE `orders` (

  `id` varchar(36) NOT NULL,
  `user_id` varchar(36) NOT NULL,
  `user_name` varchar(50) NOT NULL,
  `user_phone` varchar(10) NOT NULL,
  `user_email` varchar(50) NOT NULL,
  `folio` varchar(12) NOT NULL,
  `address` json NOT NULL,
  `payment_method` json NOT NULL,
  `type` enum('openpayCard','openpayStore','mercadoPago','subscription','balance') DEFAULT NULL,
  `delivery_date` date DEFAULT NULL,
  `delivery_estimate_date` varchar(20) NOT NULL,
  `delivery_status` enum('Confirmando el Pago','Preparando el Pedido','Está en camino','Entregado','Cancelado') NOT NULL DEFAULT 'Confirmando el Pago',
  `products` json NOT NULL,
  `description` varchar(60) NOT NULL,
  `purchase_date` varchar(30) NOT NULL,
  `shipment` json NOT NULL,
  `iva` double NOT NULL DEFAULT '0',
  `shipping_cost` double NOT NULL DEFAULT '0',
  `subtotal` double NOT NULL DEFAULT '0',
  `total` double NOT NULL DEFAULT '0',
  `payment_provider` json NOT NULL,
  `balance_amount` double NOT NULL DEFAULT '0',
  `updated_at` datetime DEFAULT (now()),
  `created_at` datetime DEFAULT (now()),
  PRIMARY KEY (`id`),
  KEY `orders_ibfk_1` (`user_id`),
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
```

## Resumen de columnas
```
Table: orders
Columns:
CREATE TABLE `orders` (
id varchar(36) NOT NULL PK
user_id varchar(36) NOT NULL
user_name varchar(50) NOT NULL
user_phone varchar(10) NOT NULL
user_email varchar(50) NOT NULL
folio varchar(12) NOT NULL
address json NOT NULL
payment_method json NOT NULL
type enum('openpayCard'
delivery_date date
delivery_estimate_date varchar(20) NOT NULL
delivery_status enum('Confirmando el Pago'
products json NOT NULL
description varchar(60) NOT NULL
purchase_date varchar(30) NOT NULL
shipment json NOT NULL
iva double NOT NULL
shipping_cost double NOT NULL
subtotal double NOT NULL
total double NOT NULL
payment_provider json NOT NULL
balance_amount double NOT NULL
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
