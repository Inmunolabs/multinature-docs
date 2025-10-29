# users_specialists

## DDL (fuente de verdad)
```sql
CREATE TABLE `users_specialists` (

  `user_id` varchar(36) NOT NULL,
  `specialist_id` varchar(36) NOT NULL,
  `specialty_id` varchar(36) NOT NULL,
  `is_current` tinyint(1) NOT NULL DEFAULT '1',
  UNIQUE KEY `unique_user_specialist` (`user_id`,`specialist_id`,`specialty_id`),
  KEY `userId` (`user_id`),
  KEY `specialistId` (`user_id`),
  KEY `users_specialists_ibfk_2` (`specialist_id`),
  KEY `specialtyId` (`specialty_id`),
  CONSTRAINT `users_specialists_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `users_specialists_ibfk_2` FOREIGN KEY (`specialist_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `users_specialists_ibfk_3` FOREIGN KEY (`specialty_id`) REFERENCES `specialties` (`id`)

);
```

## Resumen de columnas
```
Table: users_specialists
Columns:
CREATE TABLE `users_specialists` (
user_id varchar(36) NOT NULL
specialist_id varchar(36) NOT NULL
specialty_id varchar(36) NOT NULL
is_current tinyint(1) NOT NULL
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
