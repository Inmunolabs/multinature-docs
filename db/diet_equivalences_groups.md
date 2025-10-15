# diet_equivalences_groups

## DDL (fuente de verdad)
```sql
CREATE TABLE `diet_equivalences_groups` (

  `diet_id` varchar(36) NOT NULL,
  `equivalences_group_id` varchar(36) NOT NULL,
  `quantity` decimal(6,2) NOT NULL,
  PRIMARY KEY (`diet_id`,`equivalences_group_id`),
  KEY `equivalences_group_id` (`equivalences_group_id`),
  CONSTRAINT `diet_equivalences_groups_ibfk_1` FOREIGN KEY (`diet_id`) REFERENCES `diets` (`id`),
  CONSTRAINT `diet_equivalences_groups_ibfk_2` FOREIGN KEY (`equivalences_group_id`) REFERENCES `equivalences_groups` (`id`)

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
```

## Resumen de columnas
```
Table: diet_equivalences_groups
Columns:
CREATE TABLE `diet_equivalences_groups` (
diet_id varchar(36) NOT NULL PK
equivalences_group_id varchar(36) NOT NULL PK
quantity decimal(6
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
