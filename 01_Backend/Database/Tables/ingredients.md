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
  PRIMARY KEY (`id`),
  KEY `equivalences_group_id` (`equivalences_group_id`),
  CONSTRAINT `ingredients_ibfk_1` FOREIGN KEY (`equivalences_group_id`) REFERENCES `equivalences_groups` (`id`)

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
```

## Resumen de columnas
```
Table: ingredients
Columns:
CREATE TABLE `ingredients` (
id char(36) NOT NULL PK
name text NOT NULL
image_key varchar(255)
image_url varchar(512)
base_quantity decimal(6
unit text NOT NULL
calories decimal(6
proteins decimal(6
lipids decimal(6
carbohydrates decimal(6
gross_weight_g decimal(8
net_weight_g decimal(8
saturated_fats_g decimal(6
monounsaturated_fats_g decimal(6
polyunsaturated_fats_g decimal(6
cholesterol_mg decimal(6
sugar_g decimal(6
fiber_g decimal(6
vitamin_a_ug decimal(6
vitamin_c_mg decimal(6
folic_acid_mg decimal(6
calcium_mg decimal(6
iron_mg decimal(6
potassium_mg decimal(6
sodium_mg decimal(6
phosphorus_mg decimal(6
ethanol_g decimal(6
glycemic_index varchar(10)
glycemic_load varchar(10)
equivalences_group_id varchar(36) NOT NULL
created_at timestamp NULL
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
