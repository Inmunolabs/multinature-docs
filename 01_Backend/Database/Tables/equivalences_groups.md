# equivalences_groups

## DDL (fuente de verdad)

```sql
CREATE TABLE `equivalences_groups` (
  `id` varchar(36) NOT NULL,
  `name` text NOT NULL,
  `subgroup` text,
  `description` text,
  `calories` decimal(6,2) DEFAULT NULL,
  `proteins` decimal(6,2) DEFAULT NULL,
  `lipids` decimal(6,2) DEFAULT NULL,
  `carbohydrates` decimal(6,2) DEFAULT NULL,
  PRIMARY KEY (`id`));
```

## Resumen de columnas

```
Table: equivalences_groups
Columns:
CREATE TABLE `equivalences_groups` (
id varchar(36) NOT NULL PK
name text NOT NULL
subgroup text
description text
calories decimal(6
proteins decimal(6
lipids decimal(6
carbohydrates decimal(6
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
- Catálogo cerrado: solo se admiten los IDs de la lista oficial utilizada por DietAgent (AOA, Cereal, Verdura, Fruta, Leche, Grasa, Azúcar, Leguminosas, Libre). El grupo histórico `"Otro"` fue deprecado y se normaliza siempre a `Libre`.
