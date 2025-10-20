# form_template_concepts

## DDL (fuente de verdad)
```sql
CREATE TABLE `form_template_concepts` (

  `id` varchar(36) NOT NULL,
  `form_template_id` varchar(36) NOT NULL,
  `concept_id` varchar(36) NOT NULL,
  `custom_name` varchar(100) DEFAULT NULL,
  `unit` varchar(20) DEFAULT NULL,
  `index` int NOT NULL DEFAULT '0',
  `is_graphable` tinyint(1) DEFAULT '0',
  `is_mandatory` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `conceptId` (`concept_id`),
  KEY `form_template_units_ibfk_1` (`form_template_id`),
  CONSTRAINT `form_template_concepts_ibfk_1` FOREIGN KEY (`form_template_id`) REFERENCES `form_templates` (`id`) ON DELETE CASCADE,
  CONSTRAINT `form_template_concepts_ibfk_2` FOREIGN KEY (`concept_id`) REFERENCES `concepts` (`id`)

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
```

## Resumen de columnas
```
Table: form_template_concepts
Columns:
CREATE TABLE `form_template_concepts` (
id varchar(36) NOT NULL PK
form_template_id varchar(36) NOT NULL
concept_id varchar(36) NOT NULL
custom_name varchar(100)
unit varchar(20)
index int NOT NULL
is_graphable tinyint(1)
is_mandatory tinyint(1) NOT NULL
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
