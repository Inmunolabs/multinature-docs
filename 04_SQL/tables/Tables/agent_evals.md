# agent_evals

## DDL (fuente de verdad)

```sql
CREATE TABLE `agent_evals` (
  `id` varchar(36) NOT NULL,
  `user_id` varchar(36) NOT NULL,
  `specialist_id` varchar(36) NOT NULL,
  `agent_name` varchar(100) NOT NULL DEFAULT 'DietAgent',
  `operation` varchar(100) NOT NULL,
  `diet_id` varchar(36) DEFAULT NULL,
  `trace_id` varchar(36) DEFAULT NULL,
  `macro_deviation_score` decimal(5,2) NOT NULL DEFAULT '0.00',
  `constraint_compliance_score` decimal(5,2) NOT NULL DEFAULT '0.00',
  `diversity_score` decimal(5,2) NOT NULL DEFAULT '0.00',
  `substitution_cost_score` decimal(5,2) NOT NULL DEFAULT '0.00',
  `overall_score` decimal(5,2) NOT NULL DEFAULT '0.00',
  `evaluation_metrics` json DEFAULT NULL,
  `validation_results` json DEFAULT NULL,
  `patient_objective` varchar(255) DEFAULT NULL,
  `evaluation_context` json DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_agent_evals_user_specialist` (`user_id`,`specialist_id`),
  KEY `idx_agent_evals_agent` (`agent_name`),
  KEY `idx_agent_evals_operation` (`operation`),
  KEY `idx_agent_evals_diet` (`diet_id`),
  KEY `idx_agent_evals_trace` (`trace_id`),
  KEY `idx_agent_evals_overall_score` (`overall_score`),
  KEY `idx_agent_evals_objective` (`patient_objective`),
  KEY `idx_agent_evals_created` (`created_at`),
  KEY `specialist_id` (`specialist_id`),
  CONSTRAINT `agent_evals_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `agent_evals_ibfk_2` FOREIGN KEY (`specialist_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `agent_evals_ibfk_3` FOREIGN KEY (`diet_id`) REFERENCES `diets` (`id`) ON DELETE SET NULL,
  CONSTRAINT `agent_evals_ibfk_4` FOREIGN KEY (`trace_id`) REFERENCES `agent_traces` (`id`) ON DELETE SET NULL,
  CONSTRAINT `chk_constraint_compliance_score` CHECK ((`constraint_compliance_score` between 0 and 100)),
  CONSTRAINT `chk_diversity_score` CHECK ((`diversity_score` between 0 and 100)),
  CONSTRAINT `chk_macro_deviation_score` CHECK ((`macro_deviation_score` between 0 and 100)),
  CONSTRAINT `chk_overall_score` CHECK ((`overall_score` between 0 and 100)),
  CONSTRAINT `chk_substitution_cost_score` CHECK ((`substitution_cost_score` between 0 and 100))
);
```

## Resumen de columnas

```
Table: agent_evals
Columns:
CREATE TABLE `agent_evals` (
id varchar(36) NOT NULL PK
user_id varchar(36) NOT NULL
specialist_id varchar(36) NOT NULL
agent_name varchar(100) NOT NULL
operation varchar(100) NOT NULL
diet_id varchar(36)
trace_id varchar(36)
macro_deviation_score decimal(5
constraint_compliance_score decimal(5
diversity_score decimal(5
substitution_cost_score decimal(5
overall_score decimal(5
evaluation_metrics json
validation_results json
patient_objective varchar(255)
evaluation_context json
created_at timestamp NULL
updated_at timestamp NULL
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
