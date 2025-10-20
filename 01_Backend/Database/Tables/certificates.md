# certificates

## DDL (fuente de verdad)
```sql
CREATE TABLE `certificates` (

  `id` varchar(36) NOT NULL,
  `user_id` varchar(36) NOT NULL,
  `url` text NOT NULL,
  `status` enum('En revisión','Aprobado','Rechazado') NOT NULL DEFAULT 'En revisión',
  `name` varchar(255) DEFAULT NULL,
  `s3_key` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT (now()),
  `updated_at` datetime DEFAULT (now()),
  PRIMARY KEY (`id`),
  KEY `certificates_ibfk_1` (`user_id`),
  CONSTRAINT `certificates_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
```

## Resumen de columnas
```
Table: certificates
Columns:
CREATE TABLE `certificates` (
id varchar(36) NOT NULL PK
user_id varchar(36) NOT NULL
url text NOT NULL
status enum('En revisión'
name varchar(255)
s3_key varchar(255)
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
