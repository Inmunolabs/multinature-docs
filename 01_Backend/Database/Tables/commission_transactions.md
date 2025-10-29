# commission_transactions

## DDL (fuente de verdad)
```sql
CREATE TABLE `commission_transactions` (

  `id` varchar(36) NOT NULL,
  `commission_id` varchar(36) NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `date` datetime NOT NULL,
  `from_user_id` varchar(36) NOT NULL,
  `order_id` varchar(36) DEFAULT NULL,
  `level` tinyint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `commissionId` (`commission_id`),
  KEY `fromUserId` (`from_user_id`),
  KEY `commissionTransactions_ibfk_3` (`order_id`),
  CONSTRAINT `commission_transactions_ibfk_1` FOREIGN KEY (`commission_id`) REFERENCES `commissions` (`id`) ON DELETE CASCADE,
  CONSTRAINT `commission_transactions_ibfk_2` FOREIGN KEY (`from_user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `commission_transactions_ibfk_3` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE

);
```

## Resumen de columnas
```
Table: commission_transactions
Columns:
CREATE TABLE `commission_transactions` (
id varchar(36) NOT NULL PK
commission_id varchar(36) NOT NULL
amount decimal(10
date datetime NOT NULL
from_user_id varchar(36) NOT NULL
order_id varchar(36)
level tinyint NOT NULL
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
