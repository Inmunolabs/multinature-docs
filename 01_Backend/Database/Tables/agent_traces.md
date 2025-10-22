# agent_traces

## DDL (fuente de verdad)
```sql
CREATE TABLE `agent_traces` (

  `id` varchar(36) NOT NULL,
  `user_id` varchar(36) NOT NULL,
  `specialist_id` varchar(36) NOT NULL,
  `agent_name` varchar(100) NOT NULL DEFAULT 'DietAgent',
  `operation` varchar(100) NOT NULL,
  `status` enum('started','completed','error','cancelled') NOT NULL DEFAULT 'started',
  `input_summary` json DEFAULT NULL,
  `output_summary` json DEFAULT NULL,
  `error_message` text,
  `execution_time_ms` int unsigned DEFAULT NULL,
  `tokens_used` int unsigned DEFAULT NULL,
  `cost_estimate` decimal(10,6) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_agent_traces_user_specialist` (`user_id`,`specialist_id`),
  KEY `idx_agent_traces_agent` (`agent_name`),
  KEY `idx_agent_traces_operation` (`operation`),
  KEY `idx_agent_traces_status` (`status`),
  KEY `idx_agent_traces_created` (`created_at`),
  KEY `specialist_id` (`specialist_id`),
  CONSTRAINT `agent_traces_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `agent_traces_ibfk_2` FOREIGN KEY (`specialist_id`) REFERENCES `users` (`id`) ON DELETE CASCADE

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
```

## Resumen de columnas
```
Table: agent_traces
Columns:
CREATE TABLE `agent_traces` (
id varchar(36) NOT NULL PK
user_id varchar(36) NOT NULL
specialist_id varchar(36) NOT NULL
agent_name varchar(100) NOT NULL
operation varchar(100) NOT NULL
status enum('started'
input_summary json
output_summary json
error_message text
execution_time_ms int unsigned
tokens_used int unsigned
cost_estimate decimal(10
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
