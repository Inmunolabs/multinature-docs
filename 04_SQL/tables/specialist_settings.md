# specialist_settings

## DDL (fuente de verdad)

```sql
CREATE TABLE `specialist_settings` (
  `specialist_id` varchar(36) NOT NULL,
  `charge_advance_payment` double DEFAULT '0',
  `charge_per_consultation` double NOT NULL DEFAULT '0',
  `monthly_charge` double NOT NULL DEFAULT '0',
  `receive_emails` tinyint(1) DEFAULT '1',
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `specialty_id` varchar(36) NOT NULL,
  PRIMARY KEY (`specialist_id`,`specialty_id`),
  CONSTRAINT `specialist_settings_ibfk_1` FOREIGN KEY (`specialist_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
);
```

## Resumen de columnas

```
Table: specialist_settings
Columns:
specialist_id varchar(36) NOT NULL PK
charge_advance_payment double DEFAULT '0'
charge_per_consultation double NOT NULL DEFAULT '0'
monthly_charge double NOT NULL DEFAULT '0'
receive_emails tinyint(1) DEFAULT '1'
updated_at timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
created_at timestamp NULL DEFAULT CURRENT_TIMESTAMP
specialty_id varchar(36) NOT NULL PK
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
