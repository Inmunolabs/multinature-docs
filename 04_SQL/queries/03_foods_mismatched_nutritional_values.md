# 03 – Platillos con valores nutricionales descuadrados

## Objetivo

Identificar **platillos** (`foods`) cuyos valores nutricionales almacenados no coinciden con la suma calculada de sus ingredientes (`foods_ingredients`).

Esta query es útil para:

- **Detección de inconsistencias** en datos nutricionales.
- **Auditoría de calidad** de información de platillos.
- **Corrección masiva** de registros con diferencias significativas (>1%).
- **Validación** después de migraciones o actualizaciones masivas.

El resultado incluye:
- Valores almacenados en la tabla `foods` (calorías, proteínas, lípidos, carbohidratos).
- Valores calculados sumando los ingredientes.
- Diferencias absolutas y porcentuales para cada macronutriente.

---

## Query principal (MySQL)

```sql
SELECT
  f.id,
  f.name,

  -- Totales guardados en la tabla foods
  f.calories_total         AS calories_food,
  f.proteins_total         AS proteins_food,
  f.lipids_total           AS lipids_food,
  f.carbohydrates_total    AS carbs_food,

  -- Totales calculados desde foods_ingredients
  ROUND(SUM(fi.kcal),      2) AS calories_sum_ing,
  ROUND(SUM(fi.protein_g), 2) AS proteins_sum_ing,
  ROUND(SUM(fi.lipid_g),   2) AS lipids_sum_ing,
  ROUND(SUM(fi.carb_g),    2) AS carbs_sum_ing,

  -- Diferencias absolutas y porcentuales
  ROUND(SUM(fi.kcal)      - f.calories_total,      2) AS delta_kcal,
  ROUND(SUM(fi.protein_g) - f.proteins_total,      2) AS delta_protein_g,
  ROUND(SUM(fi.lipid_g)   - f.lipids_total,        2) AS delta_lipid_g,
  ROUND(SUM(fi.carb_g)    - f.carbohydrates_total, 2) AS delta_carb_g,

  ROUND(
    (ABS(SUM(fi.kcal) - f.calories_total) / NULLIF(f.calories_total, 0)) * 100, 2
  ) AS pct_diff_kcal,
  ROUND(
    (ABS(SUM(fi.protein_g) - f.proteins_total) / NULLIF(f.proteins_total, 0)) * 100, 2
  ) AS pct_diff_protein,
  ROUND(
    (ABS(SUM(fi.lipid_g) - f.lipids_total) / NULLIF(f.lipids_total, 0)) * 100, 2
  ) AS pct_diff_lipid,
  ROUND(
    (ABS(SUM(fi.carb_g) - f.carbohydrates_total) / NULLIF(f.carbohydrates_total, 0)) * 100, 2
  ) AS pct_diff_carb

FROM foods f
JOIN foods_ingredients fi ON fi.food_id = f.id
GROUP BY
  f.id, f.name,
  f.calories_total, f.proteins_total, f.lipids_total, f.carbohydrates_total
HAVING
     pct_diff_kcal    > 1
  OR pct_diff_protein > 1
  OR pct_diff_lipid   > 1
  OR pct_diff_carb    > 1
ORDER BY pct_diff_kcal DESC;
```

> 🔎 Notas:
> - El umbral de diferencia es **1%** en cualquier macronutriente (calorías, proteínas, lípidos o carbohidratos).
> - `NULLIF` evita divisiones por cero cuando el valor almacenado es 0.
> - Los resultados se ordenan por la mayor diferencia porcentual en calorías.
> - Usa `ROUND(..., 2)` para mantener 2 decimales en todos los cálculos.

---

## Ejemplos de uso

### 1. Detectar platillos con diferencias mayores al 5%

```sql
-- Modificar el HAVING para buscar diferencias más significativas
HAVING
     pct_diff_kcal    > 5
  OR pct_diff_protein > 5
  OR pct_diff_lipid   > 5
  OR pct_diff_carb    > 5
```

### 2. Buscar solo platillos con diferencias en calorías

```sql
-- Filtrar únicamente por diferencias en calorías
HAVING pct_diff_kcal > 1
ORDER BY pct_diff_kcal DESC;
```

### 3. Incluir platillos específicos para validación

```sql
-- Agregar filtro WHERE antes del GROUP BY
WHERE f.id IN ('food-id-1', 'food-id-2', 'food-id-3')
GROUP BY ...
```

---

## Ejemplo de resultado

| id | name | calories_food | calories_sum_ing | delta_kcal | pct_diff_kcal |
|----|------|---------------|------------------|------------|---------------|
| abc-123 | Ensalada César | 250.00 | 280.50 | 30.50 | 12.20 |
| def-456 | Pollo a la plancha | 180.00 | 176.80 | -3.20 | 1.78 |
| ghi-789 | Pasta Alfredo | 450.00 | 468.30 | 18.30 | 4.07 |

---

## Posibles extensiones

- **Corrección automática**: Crear un script que actualice `foods` con los valores calculados cuando la diferencia supera cierto umbral.
- **Alertas**: Implementar un job que ejecute este query periódicamente y notifique al equipo de QA.
- **Filtro por fecha**: Agregar `f.created_at` o `f.updated_at` para identificar cuándo se crearon los registros con errores.
- **Auditoría de ingredientes**: Extender la query para mostrar también los ingredientes de cada platillo descuadrado.

