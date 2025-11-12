# filled_forms

## DDL (fuente de verdad)

```sql
CREATE TABLE `filled_forms` (
  `id` varchar(36) NOT NULL,
  `booking_id` varchar(36) DEFAULT NULL,
  `form_template_id` varchar(36) NOT NULL,
  `user_id` varchar(36) NOT NULL,
  `specialist_id` varchar(36) NOT NULL,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `bookingId` (`booking_id`),
  KEY `formTemplateId` (`form_template_id`),
  KEY `userId` (`user_id`),
  KEY `specialistId` (`specialist_id`),
  CONSTRAINT `filled_forms_ibfk_1` FOREIGN KEY (`booking_id`) REFERENCES `bookings` (`id`),
  CONSTRAINT `filled_forms_ibfk_2` FOREIGN KEY (`form_template_id`) REFERENCES `form_templates` (`id`),
  CONSTRAINT `filled_forms_ibfk_3` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `filled_forms_ibfk_4` FOREIGN KEY (`specialist_id`) REFERENCES `users` (`id`));
```

## Resumen de columnas

```
Table: filled_forms
Columns:
CREATE TABLE `filled_forms` (
id varchar(36) NOT NULL PK
booking_id varchar(36)
form_template_id varchar(36) NOT NULL
user_id varchar(36) NOT NULL
specialist_id varchar(36) NOT NULL
updated_at datetime
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
