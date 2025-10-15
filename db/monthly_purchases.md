# monthly_purchases

## DDL (fuente de verdad)
```sql
CREATE TABLE `monthly_purchases` (

  `user_id` varchar(36) NOT NULL,
  `shipping_address` varchar(36) NOT NULL,
  `products` json NOT NULL,
  `openpay_plan_id` varchar(20) DEFAULT NULL,
  `amount` double NOT NULL,
  `openpay_subscription_id` varchar(20) DEFAULT NULL,
  `openpay_card_id` varchar(20) DEFAULT NULL,
  `is_cancelled` tinyint(1) NOT NULL DEFAULT '0',
  `updated_at` datetime DEFAULT (now()),
  `created_at` datetime DEFAULT (now()),
  PRIMARY KEY (`user_id`),
  KEY `monthlyPurchase_ibfk_1` (`user_id`),
  KEY `monthlyPurchase_ibfk_2` (`shipping_address`),
  CONSTRAINT `monthlyPurchase_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `monthlyPurchase_ibfk_2` FOREIGN KEY (`shipping_address`) REFERENCES `addresses` (`id`)

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
```

## Resumen de columnas
```
Table: monthly_purchases
Columns:
CREATE TABLE `monthly_purchases` (
user_id varchar(36) NOT NULL PK
shipping_address varchar(36) NOT NULL
products json NOT NULL
openpay_plan_id varchar(20)
amount double NOT NULL
openpay_subscription_id varchar(20)
openpay_card_id varchar(20)
is_cancelled tinyint(1) NOT NULL
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
