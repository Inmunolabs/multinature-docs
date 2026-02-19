# ingredients

## DDL (fuente de verdad)

```sql
CREATE TABLE `ingredients` (
  `id` char(36) NOT NULL DEFAULT (uuid()),
  `name` text NOT NULL,
  `image_key` varchar(255) DEFAULT NULL,
  `image_url` varchar(512) DEFAULT NULL,
  `base_quantity` decimal(6,2) NOT NULL,
  `unit` text NOT NULL,
  `calories` decimal(6,2) DEFAULT NULL,
  `proteins` decimal(6,2) DEFAULT NULL,
  `lipids` decimal(6,2) DEFAULT NULL,
  `carbohydrates` decimal(6,2) DEFAULT NULL,
  `gross_weight_g` decimal(8,2) DEFAULT NULL,
  `net_weight_g` decimal(8,2) DEFAULT NULL,
  `saturated_fats_g` decimal(6,2) DEFAULT NULL,
  `monounsaturated_fats_g` decimal(6,2) DEFAULT NULL,
  `polyunsaturated_fats_g` decimal(6,2) DEFAULT NULL,
  `cholesterol_mg` decimal(6,2) DEFAULT NULL,
  `sugar_g` decimal(6,2) DEFAULT NULL,
  `fiber_g` decimal(6,2) DEFAULT NULL,
  `vitamin_a_ug` decimal(6,2) DEFAULT NULL,
  `vitamin_c_mg` decimal(6,2) DEFAULT NULL,
  `folic_acid_mg` decimal(6,2) DEFAULT NULL,
  `calcium_mg` decimal(6,2) DEFAULT NULL,
  `iron_mg` decimal(6,2) DEFAULT NULL,
  `potassium_mg` decimal(6,2) DEFAULT NULL,
  `sodium_mg` decimal(6,2) DEFAULT NULL,
  `phosphorus_mg` decimal(6,2) DEFAULT NULL,
  `ethanol_g` decimal(6,2) DEFAULT NULL,
  `glycemic_index` varchar(10) DEFAULT NULL,
  `glycemic_load` varchar(10) DEFAULT NULL,
  `equivalences_group_id` varchar(36) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `tags_json` json DEFAULT NULL,
  `tags_version` int NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `equivalences_group_id` (`equivalences_group_id`),
  FULLTEXT KEY `ft_ingredients_name` (`name`),
  CONSTRAINT `ingredients_ibfk_1` FOREIGN KEY (`equivalences_group_id`) REFERENCES `equivalences_groups` (`id`));
```

## Resumen de columnas

```
Table: ingredients
Columns:
id char(36) NOT NULL PK
name text NOT NULL
image_key varchar(255)
image_url varchar(512)
base_quantity decimal(6,2) NOT NULL
unit text NOT NULL
calories decimal(6,2)
proteins decimal(6,2)
lipids decimal(6,2)
carbohydrates decimal(6,2)
gross_weight_g decimal(8,2)
net_weight_g decimal(8,2)
saturated_fats_g decimal(6,2)
monounsaturated_fats_g decimal(6,2)
polyunsaturated_fats_g decimal(6,2)
cholesterol_mg decimal(6,2)
sugar_g decimal(6,2)
fiber_g decimal(6,2)
vitamin_a_ug decimal(6,2)
vitamin_c_mg decimal(6,2)
folic_acid_mg decimal(6,2)
calcium_mg decimal(6,2)
iron_mg decimal(6,2)
potassium_mg decimal(6,2)
sodium_mg decimal(6,2)
phosphorus_mg decimal(6,2)
ethanol_g decimal(6,2)
glycemic_index varchar(10)
glycemic_load varchar(10)
equivalences_group_id varchar(36) NOT NULL
created_at timestamp NULL DEFAULT CURRENT_TIMESTAMP
tags_json json
tags_version int NOT NULL DEFAULT '1'
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
