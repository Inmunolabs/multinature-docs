# service_payments

## DDL (fuente de verdad)
```sql
CREATE TABLE `service_payments` (

  `id` varchar(36) NOT NULL,
  `user_id` varchar(36) NOT NULL,
  `specialist_id` varchar(36) NOT NULL,
  `booking_id` varchar(36) DEFAULT NULL,
  `name` enum('Anticipo de consulta','Consulta','Mensualidad') NOT NULL,
  `description` text NOT NULL,
  `user_name` varchar(50) NOT NULL,
  `user_phone` varchar(10) NOT NULL,
  `user_email` varchar(50) NOT NULL,
  `payment_method` json DEFAULT NULL,
  `purchase_date` varchar(30) NOT NULL,
  `iva` double NOT NULL DEFAULT '0',
  `subtotal` double NOT NULL DEFAULT '0',
  `total` double NOT NULL DEFAULT '0',
  `payment_provider` json DEFAULT NULL,
  `folio` varchar(12) NOT NULL,
  `type` enum('openpayCard','openpayStore','mercadoPago','cash') DEFAULT NULL,
  `status` enum('Confirmando el Pago','Pagado','Cancelado') DEFAULT NULL,
  `updated_at` datetime DEFAULT (now()),
  `created_at` datetime DEFAULT (now()),
  PRIMARY KEY (`id`),
  KEY `services_ibfk_1` (`user_id`),
  KEY `services_ibfk_2` (`specialist_id`),
  CONSTRAINT `services_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `services_ibfk_2` FOREIGN KEY (`specialist_id`) REFERENCES `users` (`id`)

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
```

## Resumen de columnas
```
Table: service_payments
Columns:
CREATE TABLE `service_payments` (
id varchar(36) NOT NULL PK
user_id varchar(36) NOT NULL
specialist_id varchar(36) NOT NULL
booking_id varchar(36)
name enum('Anticipo de consulta'
description text NOT NULL
user_name varchar(50) NOT NULL
user_phone varchar(10) NOT NULL
user_email varchar(50) NOT NULL
payment_method json
purchase_date varchar(30) NOT NULL
iva double NOT NULL
subtotal double NOT NULL
total double NOT NULL
payment_provider json
folio varchar(12) NOT NULL
type enum('openpayCard'
status enum('Confirmando el Pago'
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
