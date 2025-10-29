# commissions

## DDL (fuente de verdad)
```sql
CREATE TABLE `commissions` (

  `id` varchar(36) NOT NULL,
  `user_id` varchar(36) NOT NULL,
  `period` char(6) NOT NULL,
  `folio` varchar(20) NOT NULL,
  `status` varchar(36) NOT NULL,
  `request_id` varchar(50) DEFAULT NULL,
  `is_paid` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `userId` (`user_id`,`period`)

);
```

## Resumen de columnas
```
Table: commissions
Columns:
CREATE TABLE `commissions` (
id varchar(36) NOT NULL PK
user_id varchar(36) NOT NULL
period char(6) NOT NULL
folio varchar(20) NOT NULL
status varchar(36) NOT NULL
request_id varchar(50)
is_paid tinyint(1) NOT NULL
created_at datetime
updated_at datetime
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
