# foods

## DDL (fuente de verdad)

```sql
CREATE TABLE `foods` (
  `id` varchar(36) NOT NULL,
  `specialist_id` varchar(36) DEFAULT NULL,
  `name` text NOT NULL,
  `image_key` varchar(255) DEFAULT NULL,
  `image_url` varchar(512) DEFAULT NULL,
  `recipe` text,
  `calories_total` decimal(6,2) DEFAULT NULL,
  `proteins_total` decimal(6,2) DEFAULT NULL,
  `carbohydrates_total` decimal(6,2) DEFAULT NULL,
  `lipids_total` decimal(6,2) DEFAULT NULL,
  `food_type` enum('official','custom','cloned') NOT NULL DEFAULT 'custom',
  `is_global` tinyint(1) DEFAULT '0',
  `ai_generated` tinyint(1) DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `tags_json` json DEFAULT NULL,
  `tags_version` int NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `foods_ibfk_1` (`specialist_id`),
  FULLTEXT KEY `ft_foods_name` (`name`),
  CONSTRAINT `foods_ibfk_1` FOREIGN KEY (`specialist_id`) REFERENCES `users` (`id`));
```

## Resumen de columnas

```
Table: foods
Columns:
id varchar(36) NOT NULL PK
specialist_id varchar(36)
name text NOT NULL
image_key varchar(255)
image_url varchar(512)
recipe text
calories_total decimal(6,2)
proteins_total decimal(6,2)
carbohydrates_total decimal(6,2)
lipids_total decimal(6,2)
food_type enum('official','custom','cloned') NOT NULL DEFAULT 'custom'
is_global tinyint(1) DEFAULT '0'
ai_generated tinyint(1) DEFAULT '0'
created_at timestamp NULL DEFAULT CURRENT_TIMESTAMP
is_active tinyint(1) NOT NULL DEFAULT '1'
tags_json json
tags_version int NOT NULL DEFAULT '1'
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
