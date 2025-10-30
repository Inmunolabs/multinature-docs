# foods

## DDL (fuente de verdad)

```sql
CREATE TABLE `foods` (
  `id` varchar(36) NOT NULL,
  `name` text NOT NULL,
  `image_key` varchar(255) DEFAULT NULL,
  `image_url` varchar(512) DEFAULT NULL,
  `recipe` text,
  `calories_total` decimal(6,2) DEFAULT NULL,
  `proteins_total` decimal(6,2) DEFAULT NULL,
  `carbohydrates_total` decimal(6,2) DEFAULT NULL,
  `lipids_total` decimal(6,2) DEFAULT NULL,
  `ai_generated` tinyint(1) DEFAULT '0',
  `specialist_id` varchar(36) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `specialist_id` (`specialist_id`),
  CONSTRAINT `foods_ibfk_1` FOREIGN KEY (`specialist_id`) REFERENCES `users` (`id`));
```

## Resumen de columnas

```
Table: foods
Columns:
CREATE TABLE `foods` (
id varchar(36) NOT NULL PK
name text NOT NULL
image_key varchar(255)
image_url varchar(512)
recipe text
calories_total decimal(6
proteins_total decimal(6
carbohydrates_total decimal(6
lipids_total decimal(6
ai_generated tinyint(1)
specialist_id varchar(36)
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
