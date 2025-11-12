# users_specialties

## DDL (fuente de verdad)

```sql
CREATE TABLE `users_specialties` (
  `user_id` varchar(36) NOT NULL,
  `specialty_id` varchar(45) NOT NULL,
  KEY `userId` (`user_id`),
  KEY `specialtyId` (`specialty_id`),
  CONSTRAINT `users_specialties_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `users_specialties_ibfk_2` FOREIGN KEY (`specialty_id`) REFERENCES `specialties` (`id`)
);
```

## Resumen de columnas

```
Table: users_specialties
Columns:
CREATE TABLE `users_specialties` (
user_id varchar(36) NOT NULL
specialty_id varchar(45) NOT NULL
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
