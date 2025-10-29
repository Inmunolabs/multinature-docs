# diets

## DDL (fuente de verdad)
```sql
CREATE TABLE `diets` (

  `id` varchar(36) NOT NULL,
  `notes` text NOT NULL,
  `carbohydrates_calories` decimal(8,2) DEFAULT NULL,
  `carbohydrates_grams` decimal(8,2) DEFAULT NULL,
  `proteins_calories` decimal(8,2) DEFAULT NULL,
  `proteins_grams` decimal(8,2) DEFAULT NULL,
  `calories_per_day` decimal(6,2) DEFAULT NULL,
  `lipids_calories` decimal(8,2) DEFAULT NULL,
  `lipids_grams` decimal(8,2) DEFAULT NULL,
  `specialist_id` varchar(36) NOT NULL,
  `user_id` varchar(36) NOT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_diets_user_specialist` (`user_id`,`specialist_id`),
  KEY `specialist_id` (`specialist_id`),
  CONSTRAINT `diets_ibfk_1` FOREIGN KEY (`specialist_id`) REFERENCES `users` (`id`),
  CONSTRAINT `diets_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)

);
```

## Resumen de columnas
```
Table: diets
Columns:
CREATE TABLE `diets` (
id varchar(36) NOT NULL PK
notes text NOT NULL
carbohydrates_calories decimal(8
carbohydrates_grams decimal(8
proteins_calories decimal(8
proteins_grams decimal(8
calories_per_day decimal(6
lipids_calories decimal(8
lipids_grams decimal(8
specialist_id varchar(36) NOT NULL
user_id varchar(36) NOT NULL
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
