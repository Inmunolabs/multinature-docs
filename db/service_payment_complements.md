# service_payment_complements

## DDL (fuente de verdad)
```sql
CREATE TABLE `service_payment_complements` (

  `id` varchar(36) NOT NULL,
  `service_payment_id` varchar(36) NOT NULL,
  `payment_method` json NOT NULL,
  `iva` double NOT NULL DEFAULT '0',
  `subtotal` double NOT NULL DEFAULT '0',
  `total` double NOT NULL DEFAULT '0',
  `payment_provider` json NOT NULL,
  `type` enum('openpayCard','openpayStore','mercadoPago','cash') NOT NULL,
  `status` enum('Confirmando el Pago','Pagado','Cancelado') DEFAULT NULL,
  `updated_at` datetime DEFAULT (now()),
  `created_at` datetime DEFAULT (now()),
  PRIMARY KEY (`id`),
  KEY `service_payment_complements_ibfk_1` (`service_payment_id`),
  CONSTRAINT `service_payment_complements_ibfk_1` FOREIGN KEY (`service_payment_id`) REFERENCES `service_payments` (`id`)

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
```

## Resumen de columnas
```
Table: service_payment_complements
Columns:
CREATE TABLE `service_payment_complements` (
id varchar(36) NOT NULL PK
service_payment_id varchar(36) NOT NULL
payment_method json NOT NULL
iva double NOT NULL
subtotal double NOT NULL
total double NOT NULL
payment_provider json NOT NULL
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
