# routines

## DDL (fuente de verdad)
```sql
CREATE TABLE `routines` (

  `id` varchar(36) NOT NULL,
  `specialist_id` varchar(36) NOT NULL,
  `user_id` varchar(36) NOT NULL,
  `notes` text,
  `is_ai` tinyint(1) NOT NULL DEFAULT '0',
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `userId` (`user_id`),
  KEY `specialistId` (`specialist_id`),
  CONSTRAINT `routines_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `routines_ibfk_2` FOREIGN KEY (`specialist_id`) REFERENCES `users` (`id`)

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
```

## Resumen de columnas
```
Table: routines
Columns:
CREATE TABLE `routines` (
id varchar(36) NOT NULL PK
specialist_id varchar(36) NOT NULL
user_id varchar(36) NOT NULL
notes text
is_ai tinyint(1) NOT NULL
updated_at timestamp NULL
created_at timestamp NULL
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
