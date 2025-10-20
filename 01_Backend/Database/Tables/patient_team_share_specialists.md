# patient_team_share_specialists

## DDL (fuente de verdad)
```sql
CREATE TABLE `patient_team_share_specialists` (

  `share_id` varchar(36) NOT NULL,
  `to_specialist_id` varchar(36) NOT NULL,
  PRIMARY KEY (`share_id`,`to_specialist_id`),
  KEY `to_specialist_id` (`to_specialist_id`),
  CONSTRAINT `patient_team_share_specialists_ibfk_1` FOREIGN KEY (`share_id`) REFERENCES `patient_team_shares` (`id`),
  CONSTRAINT `patient_team_share_specialists_ibfk_2` FOREIGN KEY (`to_specialist_id`) REFERENCES `users` (`id`)

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
```

## Resumen de columnas
```
Table: patient_team_share_specialists
Columns:
CREATE TABLE `patient_team_share_specialists` (
share_id varchar(36) NOT NULL PK
to_specialist_id varchar(36) NOT NULL PK
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
