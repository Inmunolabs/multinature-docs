# DietAgent Response (`dietResponse`)

## Resumen

Modelo canónico que describe el objeto `content` entregado por DietAgent al generar una dieta automática de 7 días. Consolida información clínica, metas energéticas, macros, cuadro dietosintético promedio y menús con sus equivalencias. Todas las secciones mantienen coherencia entre sí y conservan trazabilidad mediante justificaciones breves.

## Estructura general

| Campo                 | Tipo            | Descripción breve                                                             | Obligatorio |
| --------------------- | --------------- | ----------------------------------------------------------------------------- | ----------- |
| `dietId`              | string (UUID)   | Identificador interno de la dieta recién generada.                            | Sí          |
| `specialistId`        | string (UUID)   | Especialista asignado al plan.                                                | Sí          |
| `notes`               | string          | Notas adicionales (vacío por defecto).                                        | Sí          |
| `patientContext`      | object          | Resumen clínico (sexo, edad, IMC, objetivo, parámetros energéticos).          | Sí          |
| `recommendedGET`      | object          | GET recomendado diario con fuente y justificación.                            | Sí          |
| `macronutrients`      | object          | Gramos, distribución porcentual y calorías por macro con justificación.       | Sí          |
| `dailyEquivalences`   | array<object>   | Cuadro dietosintético promedio diario agrupado por equivalencia SMAE.         | Sí          |
| `mealStructure`       | object          | Días, comidas por día, horarios representativos y justificación.              | Sí          |
| `calorieCalculations` | object          | Desglose de cálculos energéticos intermedios (basal, ETA, AF, ajustes).       | Sí          |
| `menus`               | object          | Menús consolidados con meals, dishes e `equivalences` por día.                | Sí          |

> Todas las justificaciones deben mantenerse ≤ 240 caracteres siguiendo la regla clínica global del proyecto.

## Daily Equivalences

### Descripción

`dailyEquivalences` representa el cuadro dietosintético diario (promedio de los 7 días planificados). Cada elemento del arreglo expone:

- `name`: Nombre completo del grupo SMAE (`Grupo - Subgrupo` cuando aplica).
- `quantity`: Suma diaria promedio de porciones, redondeada al múltiplo de 0.5 más cercano.

### Fuente de datos y cálculo

1. Se recorren todos los menús (`menus.items`) y sus tiempos de comida.
2. Se suman las equivalencias de cada meal (`meals[].equivalences`) identificadas por ID o nombre.
3. Cuando las equivalencias están en formato `{ id, quantity }`, se resuelven a nombre usando el catálogo `equivalences_groups`.
4. Las cantidades se multiplican por los días asignados al menú (`assignedDays`) y se promedian contra los 7 días obligatorios de la dieta.
5. Se redondea cada total a pasos de 0.5 porción y se descartan resultados `< 0.25`.
6. El arreglo final se ordena según la jerarquía sugerida: AOA, Cereal, Fruta, Verdura, Grasa, Leguminosas, Libre; valores fuera del catálogo quedan alfabéticamente al final.

Este cálculo garantiza consistencia con las metas de macronutrientes y con las equivalencias expuestas en cada meal.

### Ejemplo

```json
[
  { "name": "AOA - Bajo en grasa", "quantity": 3 },
  { "name": "Cereal - Sin grasa", "quantity": 2 },
  { "name": "Fruta", "quantity": 1 },
  { "name": "Verdura", "quantity": 2 },
  { "name": "Grasa - Sin proteína", "quantity": 2 },
  { "name": "Leguminosas", "quantity": 1 }
]
```

### Consideraciones

- Siempre existen 7 entradas o menos; no se generan porciones nulas.
- Los nombres siguen la capitalización oficial del catálogo SMAE.
- Se debe validar coherencia con `macronutrients` cuando se ajustan porciones manualmente.
- `dailyEquivalences` es idempotente ante reordenamientos de menús: regenerar la dieta sin cambios en equivalencias produce el mismo resultado promedio.

## Free Additions

Colección paralela que expone ingredientes de impacto energético insignificante (habitualmente clasificados como "Libre").

- `name`: Nombre del ingrediente o preparación libre.
- `unit`: Unidad oficial inferida dinámicamente (ej. `pieza`, `taza`).
- `gramsPerUnit`: Conversión a gramos por unidad calculada desde datos reales o promedios por grupo.
- `averageQuantityPerDay`: Promedio diario (7 días) expresado con un decimal.
- `averageGramsPerDay`: Promedio diario en gramos, ideal para trazabilidad clínica.
- `caloriesPerUnit`: Estimación energética por unidad cuando existe información.
- `occurrences`: Veces que aparece a lo largo de los menús (considerando días asignados).

Este arreglo se construye exclusivamente desde los ingredientes reales servidos en meals. Ningún elemento de `freeAdditions` aporta equivalencias al cuadro dietosintético, pero sí mantiene legibilidad para personal clínico.

## Ingredientes enriquecidos

Cada `ingredient` dentro de `dishes` expone metadata adicional derivada dinámicamente:

- `unitOfficial`: unidad normalizada según catálogo SMAE y promedios de la base de datos.
- `gramsPerUnit`: conversión numérica calculada desde pesos reales o promedios por grupo/unidad.
- `uncertainWeight`: bandera booleana que indica cuando el peso fue ajustado por guardrails (e.g. >250 g) o por falta de datos.
- `caloriesPerUnit`: estimación calórica por unidad cuando existe información suficiente.
- `impactCategory`: `free` para ingredientes sin equivalencias, `standard` en caso contrario.

Estos campos permiten auditoría nutricional, evitan hardcodes y alinean las equivalencias con las porciones reales consumidas.

## Referencias relacionadas

- `apis/diets-api/src/services/generate.js` — Implementación del cálculo y agregado del cuadro dietosintético.
- `docs/01_Backend/APIs/diets-api/Endpoints/generate-automatic.md` — Especificación del endpoint que expone esta respuesta.

