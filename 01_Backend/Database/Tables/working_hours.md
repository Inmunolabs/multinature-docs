# working_hours

## DDL (fuente de verdad)
```sql
CREATE TABLE `working_hours` (

  `id` varchar(36) NOT NULL,
  `specialist_id` varchar(36) NOT NULL,
  `day_of_week` int NOT NULL,
  `start_hour` time NOT NULL,
  `end_hour` time NOT NULL,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `specialistId` (`specialist_id`),
  CONSTRAINT `working_hours_ibfk_1` FOREIGN KEY (`specialist_id`) REFERENCES `users` (`id`)

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
```

## Resumen de columnas
```
Table: working_hours
Columns:
CREATE TABLE `working_hours` (
id varchar(36) NOT NULL PK
specialist_id varchar(36) NOT NULL
day_of_week int NOT NULL
start_hour time NOT NULL
end_hour time NOT NULL
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
