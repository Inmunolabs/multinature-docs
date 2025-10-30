# menus

## DDL (fuente de verdad)

```sql
CREATE TABLE `menus` (
  `id` char(36) NOT NULL,
  `diet_id` char(36) DEFAULT NULL,
  `specialist_id` char(36) NOT NULL,
  `name` varchar(150) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `notes` text,
  PRIMARY KEY (`id`),
  KEY `fk_menus_specialist` (`specialist_id`),
  KEY `fk_menus_diet` (`diet_id`),
  CONSTRAINT `fk_menus_diet` FOREIGN KEY (`diet_id`) REFERENCES `diets` (`id`) ON DELETE SET NULL,
  CONSTRAINT `fk_menus_specialist` FOREIGN KEY (`specialist_id`) REFERENCES `users` (`id`) ON DELETE RESTRICT
);
```

## Resumen de columnas

```
Table: menus
Columns:
CREATE TABLE `menus` (
id char(36) NOT NULL PK
diet_id char(36)
specialist_id char(36) NOT NULL
name varchar(150) NOT NULL
created_at timestamp NOT NULL
updated_at timestamp NOT NULL
notes text
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
