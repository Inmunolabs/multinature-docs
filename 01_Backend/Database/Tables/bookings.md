# bookings

## DDL (fuente de verdad)
```sql
CREATE TABLE `bookings` (

  `id` varchar(36) NOT NULL,
  `specialist_id` varchar(36) NOT NULL,
  `user_id` varchar(36) NOT NULL,
  `address` text,
  `video_call_url` varchar(255) DEFAULT NULL,
  `specialty_id` varchar(36) NOT NULL,
  `calendar_event_id` text NOT NULL,
  `status` enum('Por confirmar','Confirmada','Cancelada','Actualizada','Atendida') NOT NULL DEFAULT 'Por confirmar',
  `date` date NOT NULL,
  `start_hour` time DEFAULT NULL,
  `end_hour` time DEFAULT NULL,
  `notes` text,
  `updated_at` datetime DEFAULT (now()),
  `created_at` datetime DEFAULT (now()),
  PRIMARY KEY (`id`),
  KEY `bookings_ibfk_1` (`specialist_id`),
  KEY `bookings_ibfk_2` (`user_id`),
  KEY `specialtyId` (`specialty_id`),
  CONSTRAINT `bookings_ibfk_1` FOREIGN KEY (`specialist_id`) REFERENCES `users` (`id`),
  CONSTRAINT `bookings_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `bookings_ibfk_4` FOREIGN KEY (`specialty_id`) REFERENCES `specialties` (`id`)

);
```

## Resumen de columnas
```
Table: bookings
Columns:
CREATE TABLE `bookings` (
id varchar(36) NOT NULL PK
specialist_id varchar(36) NOT NULL
user_id varchar(36) NOT NULL
address text
video_call_url varchar(255)
specialty_id varchar(36) NOT NULL
calendar_event_id text NOT NULL
status enum('Por confirmar'
date date NOT NULL
start_hour time
end_hour time
notes text
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
