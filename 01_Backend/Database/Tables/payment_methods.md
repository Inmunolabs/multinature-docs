# payment_methods

## DDL (fuente de verdad)
```sql
CREATE TABLE `payment_methods` (

  `id` varchar(36) NOT NULL,
  `user_id` varchar(36) NOT NULL,
  `alias` varchar(50) DEFAULT NULL,
  `bank` varchar(60) DEFAULT NULL,
  `beneficiary` varchar(50) DEFAULT NULL,
  `card_number` varchar(16) DEFAULT NULL,
  `card_type` varchar(20) DEFAULT NULL,
  `card_use` enum('Pago','Cobro') NOT NULL DEFAULT 'Pago',
  `clabe` varchar(18) DEFAULT NULL,
  `exp_date` varchar(5) DEFAULT NULL,
  `name_on_card` varchar(50) DEFAULT NULL,
  `openpay_bank_accountId` varchar(20) DEFAULT NULL,
  `openpay_card_id` varchar(20) DEFAULT NULL,
  `wire4_account_registration_confirmation_url` text,
  `is_shipping_payment` tinyint(1) NOT NULL DEFAULT '0',
  `is_account_registered_on_wire4` tinyint(1) NOT NULL DEFAULT '0',
  `updated_at` datetime DEFAULT (now()),
  `created_at` datetime DEFAULT (now()),
  PRIMARY KEY (`id`),
  KEY `payment_methods_ibfk_1` (`user_id`),
  CONSTRAINT `payment_methods_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
```

## Resumen de columnas
```
Table: payment_methods
Columns:
CREATE TABLE `payment_methods` (
id varchar(36) NOT NULL PK
user_id varchar(36) NOT NULL
alias varchar(50)
bank varchar(60)
beneficiary varchar(50)
card_number varchar(16)
card_type varchar(20)
card_use enum('Pago'
clabe varchar(18)
exp_date varchar(5)
name_on_card varchar(50)
openpay_bank_accountId varchar(20)
openpay_card_id varchar(20)
wire4_account_registration_confirmation_url text
is_shipping_payment tinyint(1) NOT NULL
is_account_registered_on_wire4 tinyint(1) NOT NULL
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
