# routines_snapshots

## DDL (fuente de verdad)
```sql
CREATE TABLE `routines_snapshots` (

  `id` varchar(36) NOT NULL,
  `specialist_id` varchar(36) DEFAULT NULL,
  `user_id` varchar(36) DEFAULT NULL,
  `exercises` json NOT NULL,
  `notes` text,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `specialistId` (`specialist_id`),
  KEY `userId` (`user_id`),
  CONSTRAINT `routines_snapshots_ibfk_1` FOREIGN KEY (`specialist_id`) REFERENCES `users` (`id`),
  CONSTRAINT `routines_snapshots_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)

);
```

## Resumen de columnas
```
Table: routines_snapshots
Columns:
CREATE TABLE `routines_snapshots` (
id varchar(36) NOT NULL PK
specialist_id varchar(36)
user_id varchar(36)
exercises json NOT NULL
notes text
start_date date NOT NULL
end_date date NOT NULL
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
