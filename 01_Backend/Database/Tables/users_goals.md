# users_goals

## DDL (fuente de verdad)
```sql
CREATE TABLE `users_goals` (

  `user_id` varchar(36) NOT NULL,
  `filled_form_value_id` varchar(36) NOT NULL,
  `goal` double NOT NULL,
  `direction` enum('asc','desc') NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  KEY `userId` (`user_id`),
  KEY `filledFormValueId` (`filled_form_value_id`),
  CONSTRAINT `users_goals_ibfk_3` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `users_goals_ibfk_4` FOREIGN KEY (`filled_form_value_id`) REFERENCES `filled_form_values` (`id`) ON DELETE CASCADE ON UPDATE CASCADE

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
```

## Resumen de columnas
```
Table: users_goals
Columns:
CREATE TABLE `users_goals` (
user_id varchar(36) NOT NULL
filled_form_value_id varchar(36) NOT NULL
goal double NOT NULL
direction enum('asc'
created_at datetime
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
