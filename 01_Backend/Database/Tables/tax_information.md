# tax_information

## DDL (fuente de verdad)
```sql
CREATE TABLE `tax_information` (

  `id` varchar(36) NOT NULL,
  `user_id` varchar(36) NOT NULL,
  `address_id` varchar(36) DEFAULT NULL,
  `curp` varchar(18) NOT NULL,
  `rfc` varchar(13) NOT NULL,
  `tax_type` enum('commission','invoice') NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_user_taxType` (`user_id`,`tax_type`),
  KEY `taxInformation_ibfk_1` (`user_id`),
  CONSTRAINT `tax_information_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)

);
```

## Resumen de columnas
```
Table: tax_information
Columns:
CREATE TABLE `tax_information` (
id varchar(36) NOT NULL PK
user_id varchar(36) NOT NULL
address_id varchar(36)
curp varchar(18) NOT NULL
rfc varchar(13) NOT NULL
tax_type enum('commission'
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
