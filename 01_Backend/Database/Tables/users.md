# users

## DDL (fuente de verdad)

```sql
CREATE TABLE `users` (
  `id` varchar(36) NOT NULL,
  `email` varchar(50) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `birthdate` date DEFAULT NULL,
  `gender` enum('Hombre','Mujer') NOT NULL DEFAULT 'Hombre',
  `password` text,
  `phone` varchar(10) DEFAULT NULL,
  `profile` enum('Administrador General','Administrador de Productos','Administrador de Logística','Especialista','Usuario') DEFAULT NULL,
  `recommender_id` varchar(36) NOT NULL,
  `has_plan` tinyint(1) DEFAULT '0',
  `subscription_date` date DEFAULT NULL,
  `openpay_user_id` varchar(20) DEFAULT NULL,
  `balance` double NOT NULL DEFAULT '0',
  `is_valid` tinyint(1) DEFAULT '0',
  `is_active` tinyint(1) DEFAULT '1',
  `updated_at` datetime DEFAULT (now()),
  `created_at` datetime DEFAULT (now()),
  PRIMARY KEY (`id`),
  KEY `fk_recommenderId` (`recommender_id`),
  CONSTRAINT `fk_recommenderId` FOREIGN KEY (`recommender_id`) REFERENCES `users` (`id`)
);
```

## Resumen de columnas

```
Table: users
Columns:
CREATE TABLE `users` (
id varchar(36) NOT NULL PK
email varchar(50) NOT NULL
first_name varchar(50) NOT NULL
last_name varchar(50) NOT NULL
birthdate date
gender enum('Hombre'
password text
phone varchar(10)
profile enum('Administrador General'
recommender_id varchar(36) NOT NULL
has_plan tinyint(1)
subscription_date date
openpay_user_id varchar(20)
balance double NOT NULL
is_valid tinyint(1)
is_active tinyint(1)
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
