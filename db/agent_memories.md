# agent_memories

## DDL (fuente de verdad)
```sql
CREATE TABLE `agent_memories` (

  `id` varchar(36) NOT NULL,
  `user_id` varchar(36) NOT NULL,
  `specialist_id` varchar(36) NOT NULL,
  `agent_name` varchar(100) NOT NULL DEFAULT 'DietAgent',
  `memory_type` enum('preferences','summary','context','feedback') NOT NULL DEFAULT 'preferences',
  `memory_key` varchar(255) NOT NULL,
  `memory_value` json NOT NULL,
  `context_hash` varchar(32) DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_agent_memories_key` (`user_id`,`specialist_id`,`agent_name`,`memory_key`),
  KEY `idx_agent_memories_user_specialist` (`user_id`,`specialist_id`),
  KEY `idx_agent_memories_key` (`user_id`,`specialist_id`,`memory_key`),
  KEY `idx_agent_memories_agent` (`agent_name`),
  KEY `idx_agent_memories_type` (`memory_type`),
  KEY `idx_agent_memories_expires` (`expires_at`),
  KEY `specialist_id` (`specialist_id`),
  CONSTRAINT `agent_memories_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `agent_memories_ibfk_2` FOREIGN KEY (`specialist_id`) REFERENCES `users` (`id`) ON DELETE CASCADE

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
```

## Resumen de columnas
```
Table: agent_memories
Columns:
CREATE TABLE `agent_memories` (
id varchar(36) NOT NULL PK
user_id varchar(36) NOT NULL
specialist_id varchar(36) NOT NULL
agent_name varchar(100) NOT NULL
memory_type enum('preferences'
memory_key varchar(255) NOT NULL
memory_value json NOT NULL
context_hash varchar(32)
expires_at timestamp NULL
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
