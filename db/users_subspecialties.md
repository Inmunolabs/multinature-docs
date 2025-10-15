# users_subspecialties

## DDL (fuente de verdad)
```sql
CREATE TABLE `users_subspecialties` (

  `user_id` varchar(36) NOT NULL,
  `subspecialty_id` varchar(36) NOT NULL,
  PRIMARY KEY (`user_id`,`subspecialty_id`),
  KEY `subspecialty_id` (`subspecialty_id`),
  CONSTRAINT `users_subspecialties_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `users_subspecialties_ibfk_2` FOREIGN KEY (`subspecialty_id`) REFERENCES `subspecialties` (`id`) ON DELETE CASCADE

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
```

## Resumen de columnas
```
Table: users_subspecialties
Columns:
CREATE TABLE `users_subspecialties` (
user_id varchar(36) NOT NULL PK
subspecialty_id varchar(36) NOT NULL PK
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
