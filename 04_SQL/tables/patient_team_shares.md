# patient_team_shares

## DDL (fuente de verdad)

```sql
CREATE TABLE `patient_team_shares` (
  `id` varchar(36) NOT NULL,
  `from_specialist_id` varchar(36) NOT NULL,
  `patient_id` varchar(36) NOT NULL,
  `teamwork_id` varchar(36) NOT NULL,
  `shared_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `is_active` tinyint(1) DEFAULT '1',
  `revoked_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uniq_patient_team_share` (`patient_id`,`teamwork_id`,`from_specialist_id`),
  KEY `from_specialist_id` (`from_specialist_id`),
  KEY `teamwork_id` (`teamwork_id`),
  CONSTRAINT `patient_team_shares_ibfk_1` FOREIGN KEY (`from_specialist_id`) REFERENCES `users` (`id`),
  CONSTRAINT `patient_team_shares_ibfk_2` FOREIGN KEY (`patient_id`) REFERENCES `users` (`id`),
  CONSTRAINT `patient_team_shares_ibfk_3` FOREIGN KEY (`teamwork_id`) REFERENCES `teamworks` (`id`)
);
```

## Resumen de columnas

```
Table: patient_team_shares
Columns:
id varchar(36) NOT NULL PK
from_specialist_id varchar(36) NOT NULL
patient_id varchar(36) NOT NULL
teamwork_id varchar(36) NOT NULL
shared_at timestamp NULL DEFAULT CURRENT_TIMESTAMP
is_active tinyint(1) DEFAULT '1'
revoked_at timestamp NULL
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
