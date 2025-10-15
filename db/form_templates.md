# form_templates

## DDL (fuente de verdad)
```sql
CREATE TABLE `form_templates` (

  `id` varchar(36) NOT NULL,
  `specialty_id` varchar(36) DEFAULT NULL,
  `specialist_id` varchar(36) DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL,
  `description` text,
  `is_initial_assessment` tinyint(1) NOT NULL DEFAULT '0',
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `deleted_at` datetime DEFAULT NULL,
  `base_template_id` char(36) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `specialistId` (`specialist_id`),
  KEY `fk_form_templates_base` (`base_template_id`),
  CONSTRAINT `fk_form_templates_base` FOREIGN KEY (`base_template_id`) REFERENCES `form_templates` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `form_templates_ibfk_1` FOREIGN KEY (`specialist_id`) REFERENCES `users` (`id`)

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
```

## Resumen de columnas
```
Table: form_templates
Columns:
CREATE TABLE `form_templates` (
id varchar(36) NOT NULL PK
specialty_id varchar(36)
specialist_id varchar(36)
name varchar(100)
description text
is_initial_assessment tinyint(1) NOT NULL
updated_at datetime
created_at datetime
deleted_at datetime
base_template_id char(36)
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
