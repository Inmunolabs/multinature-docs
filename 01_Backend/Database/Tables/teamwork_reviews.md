# teamwork_reviews

## DDL (fuente de verdad)
```sql
CREATE TABLE `teamwork_reviews` (

  `id` varchar(36) NOT NULL,
  `user_id` varchar(36) NOT NULL,
  `teamwork_id` varchar(36) NOT NULL,
  `rating` tinyint unsigned NOT NULL,
  `review` text,
  `url_images` json DEFAULT NULL,
  `created_at` date NOT NULL DEFAULT (now()),
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `teamwork_id` (`teamwork_id`),
  CONSTRAINT `teamwork_reviews_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `teamwork_reviews_ibfk_2` FOREIGN KEY (`teamwork_id`) REFERENCES `teamworks` (`id`)

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
```

## Resumen de columnas
```
Table: teamwork_reviews
Columns:
CREATE TABLE `teamwork_reviews` (
id varchar(36) NOT NULL PK
user_id varchar(36) NOT NULL
teamwork_id varchar(36) NOT NULL
rating tinyint unsigned NOT NULL
review text
url_images json
created_at date NOT NULL
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
