# agent_feedback

## DDL (fuente de verdad)
```sql
CREATE TABLE `agent_feedback` (

  `id` varchar(36) NOT NULL,
  `user_id` varchar(36) NOT NULL,
  `specialist_id` varchar(36) NOT NULL,
  `agent_name` varchar(100) NOT NULL DEFAULT 'DietAgent',
  `diet_id` varchar(36) DEFAULT NULL,
  `eval_id` varchar(36) DEFAULT NULL,
  `satisfaction_score` tinyint unsigned DEFAULT NULL,
  `accuracy_score` tinyint unsigned DEFAULT NULL,
  `usefulness_score` tinyint unsigned DEFAULT NULL,
  `feedback_text` text,
  `improvement_suggestions` text,
  `feedback_type` enum('specialist','patient','system') NOT NULL DEFAULT 'specialist',
  `feedback_category` enum('general','nutritional','practical','technical') NOT NULL DEFAULT 'general',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_agent_feedback_user_specialist` (`user_id`,`specialist_id`),
  KEY `idx_agent_feedback_agent` (`agent_name`),
  KEY `idx_agent_feedback_diet` (`diet_id`),
  KEY `idx_agent_feedback_eval` (`eval_id`),
  KEY `idx_agent_feedback_type` (`feedback_type`),
  KEY `idx_agent_feedback_category` (`feedback_category`),
  KEY `idx_agent_feedback_satisfaction` (`satisfaction_score`),
  KEY `idx_agent_feedback_created` (`created_at`),
  KEY `specialist_id` (`specialist_id`),
  CONSTRAINT `agent_feedback_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `agent_feedback_ibfk_2` FOREIGN KEY (`specialist_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `agent_feedback_ibfk_3` FOREIGN KEY (`diet_id`) REFERENCES `diets` (`id`) ON DELETE SET NULL,
  CONSTRAINT `agent_feedback_ibfk_4` FOREIGN KEY (`eval_id`) REFERENCES `agent_evals` (`id`) ON DELETE SET NULL,
  CONSTRAINT `chk_accuracy_score` CHECK ((`accuracy_score` between 1 and 5)),
  CONSTRAINT `chk_satisfaction_score` CHECK ((`satisfaction_score` between 1 and 5)),
  CONSTRAINT `chk_usefulness_score` CHECK ((`usefulness_score` between 1 and 5))

);
```

## Resumen de columnas
```
Table: agent_feedback
Columns:
CREATE TABLE `agent_feedback` (
id varchar(36) NOT NULL PK
user_id varchar(36) NOT NULL
specialist_id varchar(36) NOT NULL
agent_name varchar(100) NOT NULL
diet_id varchar(36)
eval_id varchar(36)
satisfaction_score tinyint unsigned
accuracy_score tinyint unsigned
usefulness_score tinyint unsigned
feedback_text text
improvement_suggestions text
feedback_type enum('specialist'
feedback_category enum('general'
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
