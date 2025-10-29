# equipments

## DDL (fuente de verdad)
```sql
CREATE TABLE `equipments` (

  `id` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)

);
```

## Resumen de columnas
```
Table: equipments
Columns:
CREATE TABLE `equipments` (
id varchar(50) NOT NULL PK
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
