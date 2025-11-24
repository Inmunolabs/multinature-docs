# GET /diets/generate-automatic/:userId - Generar Dieta Automática

## Descripción

Genera una dieta automática completa de **7 días** basada en el último formulario del usuario. Selecciona automáticamente las fórmulas de cálculo dietético, parámetros energéticos y datos clínicos más apropiados. Utiliza el **pipeline unificado** para crear recomendaciones personalizadas de GET, distribución de macronutrientes, porciones SMAE y platillos específicos.

## Endpoint (Recomendado)

```
GET /diets/generate-automatic/:userId
```

**Nota:** También existe compatibilidad con `POST /diets/generate-automatic` (legacy) que requiere body con fórmulas explícitas. Se recomienda usar el método GET para simplicidad.

## Headers

```
Authorization: Bearer <token>
```

## Path Parameters

- `userId` (string, requerido): ID del usuario/paciente para quien se genera la dieta

## Request Body

**Para GET:** No requiere body. Todos los parámetros se derivan automáticamente del último formulario del usuario.

**Para POST (legacy):** Ver sección "Compatibilidad POST" al final de este documento.

## Selección Automática

El endpoint GET selecciona automáticamente:

- **Fórmulas energéticas**: Basadas en perfil del paciente (edad, género, IMC, objetivo)
- **CAF, ETA, AF**: Derivados del formulario clínico del usuario
- **Tiempos de comida**: Adaptados al estilo de vida (ocupación, horarios de trabajo)
- **Porciones SMAE**: Calculadas desde macronutrientes objetivo

### Formularios utilizados como contexto

- Se consideran únicamente plantillas con `is_dietagent_intake = 1`.
- Se ordenan por prioridad **A/B/C**:
  - **A** → plantillas Intake (`is_dietagent_intake = 1`).
  - **B** → valoraciones iniciales (`is_initial_assessment = 1`).
  - **C** → formularios regulares más recientes.
- Dentro de cada prioridad se prioriza (`is_initial_assessment = 1` → fecha más reciente).  
  Se incluyen como máximo **3 A**, **2 B** y **1 C**, garantizando el formulario C más reciente.
- `formsContext.forms[]` expone `priority`, `isInitialAssessment`, `createdAt` y `specialistId` para trazabilidad.

## Pipeline Unificado

El endpoint ejecuta los siguientes tramos en secuencia:

1. **computeEnergy**: Calcula GET desde DietCalculator con fórmulas seleccionadas automáticamente
2. **resolveMacros**: Distribuye macronutrientes según objetivo del paciente
3. **buildSchedule**: Deriva tiempos de comida desde contexto del paciente
4. **applyEquivalences**: Calcula porciones SMAE desde macros
5. **generateDishes**: Construye platillos multi-dish desde porciones (consulta DB real)

Ver detalles del pipeline en: `Guides/2.3.2-diet-pipeline-and-actions.md`

## Ejemplo de Request (GET)

```bash
curl -X GET https://api.multinature.com/diets/generate-automatic/550e8400-e29b-41d4-a716-446655440000 \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

## Ejemplo de Request (POST - Legacy)

```json
{
  "formulas": ["mifflinStJeor", "harrisBenedict", "IOM"],
  "userId": "123e4567-e89b-12d3-a456-426614174000",
  "CAF": 1.4,
  "ETA": 10,
  "AF": 0
}
```

## Response

### Success Response (200)

```json
{
  "folio": "aws-request-id",
  "message": "Automatic diet generated successfully by DietAgent",
  "content": {
    "dietId": "9d5f8c83-93d3-4d10-8c27-0a4d91a2df3d",
    "specialistId": "specialist-uuid",
    "patientContext": {
      "sex": "Femenino",
      "age": 36,
      "weightKg": 78,
      "heightCm": 162,
      "BMI": 29.7,
      "objective": "Perder grasa corporal",
      "activityFactor": 1.10,
      "activityLabel": "ligeramente activo",
      "activityPercent": 10,
      "caf": 1.3,
      "eta": 10,
      "lifestyle": "oficina",
      "workSchedule": "09:00-18:00"
    },
    "recommendedGET": {
      "value": 1545,
      "source": "DietCalculator",
      "justification": "Paciente mujer de 36 años, 78 kg y 162 cm (IMC 29.7) orientado a \"Perder grasa corporal\" y actividad ligeramente activa (factor 1.1). El GET basal de 1817 kcal proviene del promedio Harris Benedict y Mifflin-St Jeor con medidas actuales. Se añaden 165 kcal por termogénesis inducida y 0 kcal adicionales porque la actividad ligera registrada no demanda más energía. El ajuste -15% (-272 kcal) calibra la recomendación hacia el objetivo sin comprometer masa magra. La recomendación final queda en 1545 kcal/día equilibrando adherencia y déficit clínico."
    },
    "macronutrients": {
      "proteinsPerDay": 116,
      "lipidsPerDay": 43,
      "carbohydratesPerDay": 174,
      "distribution": { "protein": 30, "fat": 25, "carbs": 45 },
      "calories": { "protein": 464, "fat": 387, "carbs": 696 },
      "justification": "Paciente mujer de 36 años, 78 kg y 162 cm (IMC 29.7) orientado a \"Perder grasa corporal\" y actividad ligeramente activa (factor 1.1). La energía de 1545 kcal/día se reparte en 30% proteína (~116 g), 25% grasa (~43 g) y 45% carbohidratos (~174 g). El reparto prioriza el objetivo y el IMC 29.7 para sostener masa magra y controlar apetito. Los carbohidratos cubren la actividad ligera reportada (factor 1.1) mientras la proteína corrige déficits previos. La grasa saludable se mantiene moderada para mejorar perfil cardiometabólico."
    },
    "dailyEquivalences": [
      { "name": "AOA - Bajo en grasa", "quantity": 3 },
      { "name": "Cereal - Sin grasa", "quantity": 2 },
      { "name": "Fruta", "quantity": 1 },
      { "name": "Verdura", "quantity": 2 },
      { "name": "Grasa - Sin proteína", "quantity": 2 },
      { "name": "Leguminosas", "quantity": 1 }
    ],
    "mealStructure": {
      "days": 7,
      "mealsPerDay": 5,
      "mealTimes": {
        "Desayuno": "07:30",
        "Colacion 1": "11:00",
        "Comida": "14:00",
        "Colacion 2": "17:30",
        "Cena": "20:00"
      },
      "justification": "Paciente mujer de 36 años, 78 kg y 162 cm (IMC 29.7) orientado a \"Perder grasa corporal\" y actividad ligeramente activa (factor 1.1). Se organizan 5 tiempos (07:30, 11:00, 14:00, 17:30, 20:00) para estabilizar apetito durante la jornada 09:00-18:00. La secuencia respeta el horario de oficina evitando ayunos prolongados previos a reuniones. Se integran colaciones dobles para reducir atracones nocturnos y manejar el estrés laboral. La cadencia sostiene el objetivo sin interferir con digestión ni descanso."
    },
    "calorieCalculations": {
      "value": 1545,
      "baseGet": 1817,
      "calculatedGET": 1817,
      "averageCalories": 1628,
      "etaCalories": 165,
      "activityCalories": 0,
      "adjustment": { "percent": -15, "kcal": -272 },
      "activityFactor": 1.10,
      "activityLabel": "ligeramente activo",
      "source": "DietCalculator",
      "formulaResults": [
        { "step": "Mifflin-St Jeor", "value": 1650 },
        { "step": "Harris Benedict", "value": 1605 },
        { "step": "ETA (termogenesis)", "value": 165 },
        { "step": "AF (actividad)", "value": 0 },
        { "step": "Ajuste por deficit objetivo", "value": -272 }
      ],
      "justification": "Paciente mujer de 36 años, 78 kg y 162 cm (IMC 29.7) orientado a \"Perder grasa corporal\" y actividad ligeramente activa (factor 1.1). El análisis energético promedia Mifflin-St Jeor (1650 kcal) y Harris Benedict (1605 kcal) para fijar un basal integrado de 1817 kcal. Se suman 165 kcal por termogénesis inducida y 0 kcal adicionales porque la actividad ligera no demanda ajustes extra. El ajuste -15% (-272 kcal) alinea la recomendación con el objetivo manteniendo seguridad metabólica. Así se documenta la transición hasta las 1545 kcal finales que estructuran el resto del plan."
    },
    "menus": {
      "justification": "Paciente mujer de 36 años, 78 kg y 162 cm (IMC 29.7) orientado a \"Perder grasa corporal\" y actividad ligeramente activa (factor 1.1). Se rota un plan de 7 días con 5 tiempos diarios y 18 platillos para evitar monotonía semanal. Cada menú mantiene 1545 kcal/día y macros ~116 g P / 174 g C / 43 g G respaldando masa magra y control glucémico. Los platillos priorizan preparaciones sencillas compatibles con rutina de oficina y déficit moderado. Se alternan opciones vegetales y animales para reforzar saciedad y facilidad de preparación.",
      "items": [
        {
          "menuId": "menu-uuid",
          "assignedDays": [0],
          "meals": [
            {
              "menuMealId": "uuid",
              "mealType": "Desayuno",
              "mealTime": "07:30:00",
              "dishes": [
                {
                  "id": "96d2afda-a4fb-4061-8c8b-711363fcc4ba",
                  "name": "Omelette de espinaca",
                  "type": "food",
                  "energyKcal": 320,
                  "ingredients": [
                    { "ingredientId": "ing-1", "ingredientName": "Clara de huevo", "unit": "pieza", "displayQuantity": "3.000 pieza", "totalGrams": 150 },
                    { "ingredientId": "ing-2", "ingredientName": "Espinaca fresca", "unit": "taza", "displayQuantity": "1.000 taza", "totalGrams": 30 },
                    { "ingredientId": "ing-3", "ingredientName": "Aceite de oliva", "unit": "cda", "displayQuantity": "0.500 cda", "totalGrams": 7 }
                  ],
                  "ingredientsTotalGrams": 187,
                  "dataOrigin": {
                    "fromDb": true,
                    "agentAdjusted": true,
                    "notes": "Porciones SMAE ajustadas (3 grupos)"
                  }
                }
              ],
              "equivalences": [
                { "id": "db487ac0-640e-11f0-8618-1290daed9e2f", "quantity": 2 },
                { "id": "db48b6cf-640e-11f0-8618-1290daed9e2f", "quantity": 1 },
                { "id": "db48da09-640e-11f0-8618-1290daed9e2f", "quantity": 1 }
              ],
              "macros": { "energyKcal": 320, "proteinGrams": 24, "carbohydratesGrams": 6, "lipidsGrams": 20 }
            }
          ]
        }
      ]
    }
  }
}
```

> La respuesta completa (incluyendo estructuras anidadas) se documenta en [Models/dietResponse.md](../Models/dietResponse.md).

- `content` devuelve un único objeto de dieta (sin arreglo intermedio) con IDs tipo UUID generados on-the-fly.
- `patientContext` concentra sexo, edad, peso, talla, IMC, objetivo y parámetros energéticos; las justificaciones deben referirse a este contexto sin repetir toda la ficha clínica.
- `macronutrients` y `calorieCalculations` mantienen los cálculos técnicos, normalizados a 2 decimales.
- `dailyEquivalences` proviene directamente de la propuesta del agente (NO se suma del menú); los valores se redondean a múltiplos de 0.5 y se omiten cantidades `< 0.25`.
- `menus[].meals[].equivalences` se calculan exclusivamente desde los ingredientes reales, sin usar `smaeTags` ni promedios por platillo. Los ingredientes con `impactCategory = "free"` siempre tienen `equivalenceQuantity = 0`.
- Se eliminaron campos obsoletos (`menus.value`, `unitOfficial`, `freeAdditions`, `smaeTags`).
- `menus[].meals[].dishes[]` expone `dataOrigin` (`fromDb`, `agentAdjusted`, `consistencyFlag`, `notes`) para trazar la procedencia de cada platillo y detectar anomalías SMAE.
- El sistema aplica sanity checks automáticos a los datos SMAE: densidad energética irreal (>12 kcal/g), pesos anómalos, y calorías excesivas (>2000 kcal por platillo).
- Las justificaciones incluyen solo variables relevantes (IMC, objetivo, AF) sin repetir la ficha clínica completa en cada sección.

### Propiedades de `content`

| Campo                 | Tipo            | Descripción                                                                | Notas clave                                                                                           |
| --------------------- | --------------- | -------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| `dietId`              | string (UUID)   | Identificador único de la dieta generada.                                  | Generado on-the-fly en cada solicitud.                                                                |
| `specialistId`        | string (UUID)   | Identificador del especialista asignado.                                   | Puede ser cadena vacía si no se proporcionó.                                                          |
| `patientContext`      | object          | Datos clínicos resumidos del paciente.                                     | Base para todas las justificaciones; no repetir ficha completa.                                       |
| `recommendedGET`      | object          | GET recomendado diario con fuente y justificación.                         | Valor redondeado; fuente habitual `DietCalculator`.                                                   |
| `macronutrients`      | object          | Gramos, distribución y calorías por macronutriente.                        | Incluye justificación alineada con el objetivo clínico.                                               |
| `dailyEquivalences`   | array<object>   | Cuadro dietosintético promedio diario agrupado por equivalencia.           | Propuesta del agente, redondeada a múltiplos de 0.5 y sin valores `< 0.25`. |
| `mealStructure`       | object          | Días, tiempos de comida y justificación de la estructura.                  | `days` fijo en 7; sincroniza representaciones de horarios entre secciones.                            |
| `calorieCalculations` | object          | Resumen de cálculos energéticos para transparencia clínica.                | Documenta pasos del pipeline energético y ajustes aplicados.                                          |
| `menus`               | object          | Colección de menús con meals, dishes e equivalences por día.               | `items` contiene 7 menús; cada meal incluye equivalences ya consolidados (`name`, `quantity`).        |

- Cada `menus.items[].meals[].dishes[]` agrega `dataOrigin` con los flags `fromDb`/`agentAdjusted`/`consistencyFlag` y una nota opcional para auditoría clínica.
- Las unidades en `ingredients.displayQuantity` se normalizan a un catálogo controlado (`gramos`, `kg`, `ml`, `l`, `cdita`, `cda`, `taza`, `pieza`, `rebanada`, `rodaja`, `diente`, `porcion`).
- Los ingredientes con `impactCategory = "free"` siempre tienen `equivalenceQuantity = 0` y no se incluyen en el cálculo de equivalencias del meal.

#### Unidades soportadas en `ingredients.displayQuantity`

| Unidad  | Descripción breve                  |
|---------|------------------------------------|
| `gramos`| Peso directo en gramos             |
| `kg`    | Kilogramos (1 kg = 1000 g)         |
| `ml`    | Mililitros                          |
| `l`     | Litros (1 l = 1000 ml)             |
| `cdita` | Cucharadita (≈5 ml)                |
| `cda`   | Cucharada (≈15 ml)                 |
| `taza`  | Taza estándar (≈240 ml)            |
| `pieza` | Unidad individual (peso referencial por ingrediente) |
| `rebanada` | Porción cortada (panes, quesos) |
| `rodaja`   | Corte circular (frutas, verduras) |
| `diente`   | Unidad de ajo                   |
| `porcion`  | Porción SMAE genérica           |

### Grupos de equivalencias admitidos

| ID | Nombre |
|----|--------|
| `db480987-640e-11f0-8618-1290daed9e2f` | AOA / Muy bajo en grasa |
| `db487ac0-640e-11f0-8618-1290daed9e2f` | AOA / Bajo en grasa |
| `db48979e-640e-11f0-8618-1290daed9e2f` | AOA / Moderado en grasa |
| `db489993-640e-11f0-8618-1290daed9e2f` | AOA / Alto en grasa |
| `db4899fc-640e-11f0-8618-1290daed9e2f` | Cereal / Con grasa |
| `db489a4f-640e-11f0-8618-1290daed9e2f` | Cereal / Sin grasa |
| `db48b6cf-640e-11f0-8618-1290daed9e2f` | Verdura |
| `db48d736-640e-11f0-8618-1290daed9e2f` | Fruta |
| `db48d84d-640e-11f0-8618-1290daed9e2f` | Leche / Descremada |
| `db48d8c3-640e-11f0-8618-1290daed9e2f` | Leche / Semidescremada |
| `db48d92e-640e-11f0-8618-1290daed9e2f`