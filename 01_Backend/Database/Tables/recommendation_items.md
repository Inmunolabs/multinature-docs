# recommendation_items

## DDL (fuente de verdad)
```sql
CREATE TABLE `recommendation_items` (

  `recommendation_id` varchar(36) NOT NULL,
  `product_id` varchar(36) NOT NULL,
  `quantity` int NOT NULL,
  `dayli_dose` varchar(255) DEFAULT NULL,
  `take_until` datetime DEFAULT NULL,
  PRIMARY KEY (`recommendation_id`,`product_id`),
  KEY `recommendationItems_ibfk_2` (`product_id`),
  CONSTRAINT `recommendation_items_ibfk_1` FOREIGN KEY (`recommendation_id`) REFERENCES `recommendations` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `recommendation_items_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON UPDATE CASCADE

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
```

## Resumen de columnas
```
Table: recommendation_items
Columns:
CREATE TABLE `recommendation_items` (
recommendation_id varchar(36) NOT NULL PK
product_id varchar(36) NOT NULL PK
quantity int NOT NULL
dayli_dose varchar(255)
take_until datetime
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
