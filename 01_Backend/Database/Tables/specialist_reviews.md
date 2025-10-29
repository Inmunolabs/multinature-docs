# specialist_reviews

## DDL (fuente de verdad)
```sql
CREATE TABLE `specialist_reviews` (

  `id` varchar(36) NOT NULL,
  `user_id` varchar(36) NOT NULL,
  `specialist_id` varchar(36) NOT NULL,
  `rating` tinyint unsigned NOT NULL,
  `review` text,
  `url_images` json DEFAULT NULL,
  `subspecialty_ids` json DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_user` (`user_id`),
  KEY `fk_specialist` (`specialist_id`),
  CONSTRAINT `fk_specialist` FOREIGN KEY (`specialist_id`) REFERENCES `users` (`id`),
  CONSTRAINT `fk_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `specialist_reviews_chk_1` CHECK ((`rating` between 1 and 5))

);
```

## Resumen de columnas
```
Table: specialist_reviews
Columns:
CREATE TABLE `specialist_reviews` (
id varchar(36) NOT NULL PK
user_id varchar(36) NOT NULL
specialist_id varchar(36) NOT NULL
rating tinyint unsigned NOT NULL
review text
url_images json
subspecialty_ids json
created_at timestamp NULL
updated_at timestamp NULL
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
