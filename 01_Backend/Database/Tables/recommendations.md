# recommendations

## DDL (fuente de verdad)
```sql
CREATE TABLE `recommendations` (

  `id` varchar(36) NOT NULL,
  `user_id` varchar(36) NOT NULL,
  `specialist_id` varchar(36) NOT NULL,
  `medical_recommendation` varchar(255) DEFAULT NULL,
  `updated_at` datetime DEFAULT (now()),
  `created_at` datetime DEFAULT (now()),
  `is_active` tinyint DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `recommendations_ibfk_1` (`user_id`),
  KEY `recommendations_ibfk_2` (`specialist_id`),
  CONSTRAINT `recommendations_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `recommendations_ibfk_2` FOREIGN KEY (`specialist_id`) REFERENCES `users` (`id`)

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
```

## Resumen de columnas
```
Table: recommendations
Columns:
CREATE TABLE `recommendations` (
id varchar(36) NOT NULL PK
user_id varchar(36) NOT NULL
specialist_id varchar(36) NOT NULL
medical_recommendation varchar(255)
updated_at datetime
created_at datetime
is_active tinyint
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
