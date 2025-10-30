# users_network

## DDL (fuente de verdad)

```sql
CREATE TABLE `users_network` (
  `id` varchar(36) NOT NULL,
  `user_id` varchar(36) NOT NULL,
  `level` int NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  KEY `id` (`id`),
  KEY `userId` (`user_id`),
  CONSTRAINT `users_network_ibfk_1` FOREIGN KEY (`id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `users_network_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
);
```

## Resumen de columnas

```
Table: users_network
Columns:
CREATE TABLE `users_network` (
id varchar(36) NOT NULL
user_id varchar(36) NOT NULL
level int NOT NULL
created_at datetime NOT NULL
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
