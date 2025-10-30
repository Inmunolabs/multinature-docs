# diets_snapshots

## DDL (fuente de verdad)

```sql
CREATE TABLE `diets_snapshots` (
  `id` varchar(36) NOT NULL,
  `specialist_id` varchar(36) DEFAULT NULL,
  `user_id` varchar(36) DEFAULT NULL,
  `weekly_meals` json NOT NULL,
  `calories_per_day` decimal(6,2) NOT NULL,
  `carbohydrates_calories` decimal(8,2) NOT NULL,
  `carbohydrates_grams` decimal(8,2) NOT NULL,
  `proteins_calories` decimal(8,2) NOT NULL,
  `proteins_grams` decimal(8,2) NOT NULL,
  `lipids_calories` decimal(8,2) NOT NULL,
  `lipids_grams` decimal(8,2) NOT NULL,
  `notes` text,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `specialistId` (`specialist_id`),
  KEY `userId` (`user_id`),
  CONSTRAINT `diets_snapshots_ibfk_1` FOREIGN KEY (`specialist_id`) REFERENCES `users` (`id`),
  CONSTRAINT `diets_snapshots_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
);
```

## Resumen de columnas

```
Table: diets_snapshots
Columns:
CREATE TABLE `diets_snapshots` (
id varchar(36) NOT NULL PK
specialist_id varchar(36)
user_id varchar(36)
weekly_meals json NOT NULL
calories_per_day decimal(6
carbohydrates_calories decimal(8
carbohydrates_grams decimal(8
proteins_calories decimal(8
proteins_grams decimal(8
lipids_calories decimal(8
lipids_grams decimal(8
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
