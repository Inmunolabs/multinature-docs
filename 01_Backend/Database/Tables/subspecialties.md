# subspecialties

## DDL (fuente de verdad)
```sql
CREATE TABLE `subspecialties` (

  `id` varchar(36) NOT NULL,
  `name` varchar(100) NOT NULL,
  `created_by` varchar(36) DEFAULT NULL,
  `specialty_id` varchar(36) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_subspecialty_name` (`name`),
  KEY `fk_subspecialty_created_by` (`created_by`),
  KEY `fk_subspecialties_specialty` (`specialty_id`),
  CONSTRAINT `fk_subspecialties_specialty` FOREIGN KEY (`specialty_id`) REFERENCES `specialties` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `fk_subspecialty_created_by` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`)

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
```

## Resumen de columnas
```
Table: subspecialties
Columns:
CREATE TABLE `subspecialties` (
id varchar(36) NOT NULL PK
name varchar(100) NOT NULL
created_by varchar(36)
specialty_id varchar(36)
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
