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
> Los valores numéricos técnicos se normalizan a 2 decimales; campos de UI como `displayQuantity` usan 1 decimal.
> Las justificaciones se enfocan en la decisión puntual sin repetir la ficha clínica completa.

## Daily Equivalences

### Descripción

`dailyEquivalences` es la **propuesta del DietAgent** para el cuadro dietosintético diario objetivo. Cada elemento del arreglo expone:

- `name`: Nombre completo del grupo SMAE (`Grupo - Subgrupo` cuando aplica).
- `quantity`: Porciones sugeridas para ese grupo, redondeadas al múltiplo de 0.5 más cercano.

### Fuente clínica

**IMPORTANTE**: `dailyEquivalences` NO se calcula sumando equivalencias del menú. Es una propuesta independiente del agente basada en:

- GET recomendado
- Objetivo del paciente
- IMC actual
- Nivel de actividad
- Hábitos relevantes
- Horarios de comida
- Estructura 30/30/40

El agente determina las porciones tomando en cuenta estos factores clínicos. Estas porciones son la base para diseñar tiempos de comida, platillos y cantidades antes de transformar la propuesta a menús concretos.

**Reglas explícitas**:
- NO se suman equivalencias del menú
- NO se incluyen condimentos (impactCategory "free")
- Se usan equivalencias sanitizadas como referencia inicial, no como resultado final
- Todas las cantidades se redondean a múltiplos de 0.5

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

- Se omiten valores `< 0.25` porciones.
- El orden clínico sugerido es: AOA, Cereal, Fruta, Verdura, Grasa, Leguminosas; cualquier otro grupo queda ordenado alfabéticamente.
- Cuando el agente entrega identificadores (`id`), el backend los resuelve contra `equivalences_groups` para exponer el nombre.

## Ingredientes enriquecidos

Cada elemento de `dishes[].ingredients[]` mantiene datos inferidos dinámicamente desde la base SMAE:

- `gramsPerUnit`: conversión calculada desde pesos reales o promedios por grupo/unidad.
- `uncertainWeight`: bandera booleana cuando el peso se ajusta por guardrails o falta de datos.
- `caloriesPerUnit`: estimación calórica por unidad cuando existe información suficiente.
- `impactCategory`: `free` para condimentos o bebidas sin equivalencias, `standard` en caso contrario.
- `equivalenceQuantity`: cantidad de equivalencias SMAE. **Siempre 0 para ingredientes con `impactCategory = "free"`**.

Estas propiedades aportan trazabilidad clínica sin exponer campos obsoletos (`unitOfficial`, `smaeTags`, `freeAdditions`). Se calculan equivalencias exclusivamente con ingredientes reales consultados en la base SMAE, excluyendo condimentos y elementos libres.

## `dataOrigin` en cada platillo

Cada `menus.items[].meals[].dishes[]` incluye:

```json
"dataOrigin": {
  "fromDb": true,
  "agentAdjusted": true,
  "consistencyFlag": true,
  "notes": "Porciones SMAE ajustadas (3 grupos) | Pesos estimados por falta de datos SMAE"
}
```

- `fromDb`: `true` cuando los ingredientes o platillos provienen de registros reales (foods/ingredients).
- `agentAdjusted`: `true` cuando el DietAgent modificó porciones, pesos o sustituciones respecto a lo almacenado.
- `consistencyFlag`: `false` cuando se detectaron anomalías en los datos SMAE (densidad energética irreal, pesos sospechosos, calorías excesivas).
- `notes`: cadena corta opcional que resume el tipo de ajuste aplicado (por ejemplo, uso de SMAE derivado o falta de datos).

Si el platillo se sintetiza por completo (sin `foodId`/`ingredientId`), `fromDb` se marca `false` y se explicita en `notes`.

### Sanity Check de SMAE

El sistema aplica validaciones automáticas a los datos SMAE antes de usarlos:

1. **Densidad energética**: Si `energyDensityKcalPerGram > 12.0`, se marca como sospechoso y no se usa para equivalencias reales.
2. **Pesos anómalos**: Si `gramsPerUnit < 0.5` y `caloriesPerUnit > 10`, se ajusta a un valor mínimo clínico seguro (5 g).
3. **Equivalencias libres**: Los ingredientes con `impactCategory = "free"` siempre tienen `equivalenceQuantity = 0`.
4. **Calorías excesivas**: Si un platillo supera 2000 kcal solo en ingredientes, se marca `consistencyFlag = false`.

## Referencias relacionadas

- `apis/diets-api/src/services/generate.js` — Implementación del armado de la respuesta.
- [Contrato del endpoint](../Endpoints/generate-automatic.md) — Documentación del endpoint que publica este modelo.

---

- **Última actualización:** 2025-11-24
- **API:** diets-api