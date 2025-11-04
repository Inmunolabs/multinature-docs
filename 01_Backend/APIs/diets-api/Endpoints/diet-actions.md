# POST /diets/:dietId/actions - Orquestador de Pipeline de Dietas

## Descripción

Orquestador lógico del pipeline de generación de dietas **sin persistencia**. Permite ejecutar tramos específicos del pipeline de forma independiente o en conjunto, ideal para ajustes, pruebas y validaciones sin impactar la base de datos.

## Endpoint

```
POST /diets/:dietId/actions
```

## Headers

```
Authorization: Bearer <token>
Content-Type: application/json
```

## Path Parameters

- `dietId` (string, requerido): ID de la dieta existente. Se usa para extraer `userId` y `specialistId`, pero **no se modifica la dieta**.

## Request Body

### Estructura Base

```json
{
  "steps": ["step1", "step2", ...],
  "input": {
    "step1": { ...overrides... },
    "step2": { ...overrides... }
  },
  "options": {
    "startFrom": "step1",
    "includeInternals": false
  }
}
```

### Campos

#### `steps` (array, requerido)

Array de tramos del pipeline a ejecutar. Tramos válidos:

- `computeEnergy`: Calcula GET desde DietCalculator
- `resolveMacros`: Distribuye macronutrientes
- `buildSchedule`: Deriva tiempos de comida
- `applyEquivalences`: Calcula porciones SMAE
- `generateDishes`: Construye platillos desde porciones

**Nota:** El sistema automáticamente incluye dependencias. Por ejemplo, si solicitas `generateDishes`, se ejecutarán también `applyEquivalences` y `buildSchedule`.

#### `input` (object, opcional)

Overrides para cada step. Permite personalizar parámetros específicos de cada tramo.

#### `options` (object, opcional)

- `startFrom` (string): Step desde el cual empezar (para re-ejecución parcial)
- `includeInternals` (boolean): Incluir metadatos de ejecución en respuesta

## Response Format (SIEMPRE)

```json
{
  "success": true,
  "data": {
    "folio": "uuid-del-action",
    "message": "Diet actions executed successfully (N steps)",
    "content": {
      "dietId": "diet-uuid",
      "specialistId": "specialist-uuid",
      "notes": "",
      "patientObjective": "...",
      // ... resultados según steps ejecutados ...
    }
  }
}
```

---

## Ejemplos de Uso

### Ejemplo 1: Pipeline Completo

Ejecuta todos los tramos del pipeline.

**Request:**
```json
{
  "steps": [
    "computeEnergy",
    "resolveMacros",
    "buildSchedule",
    "applyEquivalences",
    "generateDishes"
  ],
  "input": {},
  "options": {
    "includeInternals": false
  }
}
```

**cURL:**
```bash
curl -X POST https://api.multinature.com/diets/550e8400-e29b-41d4-a716-446655440000/actions \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -H "Content-Type: application/json" \
  -d '{
    "steps": ["computeEnergy", "resolveMacros", "buildSchedule", "applyEquivalences", "generateDishes"]
  }'
```

**Response:**
```json
{
  "success": true,
  "data": {
    "folio": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    "message": "Diet actions executed successfully (5 steps)",
    "content": {
      "dietId": "550e8400-e29b-41d4-a716-446655440000",
      "specialistId": "specialist-uuid",
      "notes": "",
      "patientObjective": "Mantener peso y mejorar composición corporal",
      "recommendedGET": {
        "value": 2000,
        "source": "DietCalculator",
        "rationale": "GET calculado mediante Mifflin-St Jeor y Harris Benedict..."
      },
      "macronutrients": {
        "proteinsPerDay": 150,
        "lipidsPerDay": 67,
        "carbohydratesPerDay": 225,
        "justification": "Distribucion 30% proteina..."
      },
      "mealStructure": {
        "days": 7,
        "mealsPerDay": 4,
        "justifications": {
          "daysJustification": "Plan de 7 días para asegurar variedad y adherencia.",
          "mealsJustification": "Estructura de 4 tiempos de comida..."
        }
      },
      "mealTimes": {
        "Desayuno": "07:30",
        "Colacion": "10:30",
        "Comida": "13:30",
        "Cena": "19:30"
      },
      "portionDistribution": {
        "0": [
          {
            "meal": "Desayuno",
            "time": "07:30",
            "items": [
              { "group": "AOA", "portions": 2 },
              { "group": "Cereal", "portions": 2 },
              { "group": "Fruta", "portions": 1 }
            ]
          }
        ],
        "totalPortions": 42
      },
      "menus": [
        {
          "menuId": "",
          "assignedDays": [0],
          "meals": [
            {
              "menuMealId": "uuid",
              "mealTime": "07:30:00",
              "mealType": "Desayuno",
              "dishes": [
                {
                  "id": "uuid",
                  "name": "Huevo revuelto",
                  "type": "food",
                  "foodId": 123,
                  "option": 0,
                  "quantity": 2
                }
              ],
              "equivalences": [],
              "macros": {
                "energyKcal": 450,
                "proteinGrams": 30,
                "carbohydratesGrams": 45,
                "lipidsGrams": 15
              },
              "justification": "Desayuno energizante con proteína..."
            }
          ]
        }
      ]
    }
  }
}
```

---

### Ejemplo 2: Solo Macros

Calcula energía y distribución de macronutrientes únicamente.

**Request:**
```json
{
  "steps": ["computeEnergy", "resolveMacros"],
  "input": {}
}
```

**cURL:**
```bash
curl -X POST https://api.multinature.com/diets/550e8400-e29b-41d4-a716-446655440000/actions \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -H "Content-Type: application/json" \
  -d '{
    "steps": ["resolveMacros"]
  }'
```

**Response:**
```json
{
  "success": true,
  "data": {
    "folio": "uuid",
    "message": "Diet actions executed successfully (2 steps)",
    "content": {
      "dietId": "550e8400-e29b-41d4-a716-446655440000",
      "recommendedGET": {
        "value": 2000,
        "source": "DietCalculator",
        "rationale": "..."
      },
      "macronutrients": {
        "proteinsPerDay": 150,
        "lipidsPerDay": 67,
        "carbohydratesPerDay": 225,
        "justification": "Distribucion 30% proteina (~150 g), 30% grasa (~67 g) y 45% carbohidratos (~225 g)..."
      },
      "calorieCalculations": {
        "source": "DietCalculator",
        "formulaResults": [
          { "step": "Mifflin-St Jeor", "value": 1650 },
          { "step": "Harris Benedict", "value": 1680 },
          { "step": "Promedio basal", "value": 1665 },
          { "step": "ETA (termogenesis)", "value": 166 },
          { "step": "AF (actividad)", "value": 169 }
        ],
        "calculatedGET": 2000,
        "averageCalories": 1665,
        "AFCalories": 169,
        "ETACalories": 166
      }
    }
  }
}
```

---

### Ejemplo 3: Solo Schedule

Deriva únicamente los tiempos de comida y estructura.

**Request:**
```json
{
  "steps": ["buildSchedule"],
  "input": {
    "buildSchedule": {
      "mealTypes": ["Desayuno", "Comida", "Cena"]
    }
  }
}
```

**cURL:**
```bash
curl -X POST https://api.multinature.com/diets/550e8400-e29b-41d4-a716-446655440000/actions \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -H "Content-Type: application/json" \
  -d '{
    "steps": ["buildSchedule"],
    "input": {
      "buildSchedule": {
        "mealTypes": ["Desayuno", "Comida", "Cena"]
      }
    }
  }'
```

**Response:**
```json
{
  "success": true,
  "data": {
    "folio": "uuid",
    "message": "Diet actions executed successfully (1 steps)",
    "content": {
      "dietId": "550e8400-e29b-41d4-a716-446655440000",
      "mealStructure": {
        "days": 7,
        "mealsPerDay": 3,
        "justifications": {
          "daysJustification": "Plan de 7 días para asegurar variedad y adherencia.",
          "mealsJustification": "Estructura de 3 tiempos de comida adaptada al estilo de vida del paciente."
        }
      },
      "mealTimes": {
        "Desayuno": "07:30",
        "Comida": "13:30",
        "Cena": "19:30"
      }
    }
  }
}
```

---

### Ejemplo 4: Solo Equivalences

Calcula porciones SMAE desde macros con override personalizado.

**Request:**
```json
{
  "steps": ["applyEquivalences"],
  "input": {
    "resolveMacros": {
      "proteinsPerDay": 180,
      "lipidsPerDay": 60,
      "carbohydratesPerDay": 200
    }
  }
}
```

**cURL:**
```bash
curl -X POST https://api.multinature.com/diets/550e8400-e29b-41d4-a716-446655440000/actions \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -H "Content-Type: application/json" \
  -d '{
    "steps": ["applyEquivalences"],
    "input": {
      "resolveMacros": {
        "proteinsPerDay": 180,
        "lipidsPerDay": 60,
        "carbohydratesPerDay": 200
      }
    }
  }'
```

**Response:**
```json
{
  "success": true,
  "data": {
    "folio": "uuid",
    "message": "Diet actions executed successfully (4 steps)",
    "content": {
      "dietId": "550e8400-e29b-41d4-a716-446655440000",
      "recommendedGET": { "value": 2120, "source": "DietCalculator" },
      "macronutrients": {
        "proteinsPerDay": 180,
        "lipidsPerDay": 60,
        "carbohydratesPerDay": 200
      },
      "mealStructure": {
        "days": 7,
        "mealsPerDay": 4
      },
      "portionDistribution": {
        "0": [
          {
            "meal": "Desayuno",
            "time": "07:30",
            "items": [
              { "group": "AOA", "portions": 2.5 },
              { "group": "Cereal", "portions": 2 },
              { "group": "Fruta", "portions": 1 },
              { "group": "Grasa", "portions": 1 }
            ],
            "justification": ""
          },
          {
            "meal": "Colacion",
            "time": "10:30",
            "items": [
              { "group": "Fruta", "portions": 1 },
              { "group": "Leche", "portions": 1 }
            ],
            "justification": ""
          }
        ],
        "totalPortions": 48
      }
    }
  }
}
```

---

### Ejemplo 5: Solo Dishes

Genera platillos desde porciones SMAE (incluye dependencias automáticamente).

**Request:**
```json
{
  "steps": ["generateDishes"]
}
```

**cURL:**
```bash
curl -X POST https://api.multinature.com/diets/550e8400-e29b-41d4-a716-446655440000/actions \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -H "Content-Type: application/json" \
  -d '{
    "steps": ["generateDishes"]
  }'
```

**Response:**
```json
{
  "success": true,
  "data": {
    "folio": "uuid",
    "message": "Diet actions executed successfully (5 steps)",
    "content": {
      "dietId": "550e8400-e29b-41d4-a716-446655440000",
      "menus": [
        {
          "menuId": "",
          "menuName": "",
          "assignedDays": [0],
          "meals": [
            {
              "menuMealId": "uuid",
              "mealTime": "07:30:00",
              "mealType": "Desayuno",
              "dishes": [
                {
                  "id": "dish-uuid-1",
                  "name": "Omelette de claras",
                  "type": "food",
                  "foodId": 1023,
                  "option": 0,
                  "quantity": 1,
                  "ingredients": [
                    {
                      "ingredientId": 501,
                      "name": "Clara de huevo",
                      "grams": 100,
                      "unit": "g"
                    }
                  ],
                  "ingredientsTotalGrams": 100
                },
                {
                  "id": "dish-uuid-2",
                  "name": "Avena cocida",
                  "type": "food",
                  "foodId": 2045,
                  "option": 0,
                  "quantity": 1,
                  "ingredients": [
                    {
                      "ingredientId": 601,
                      "name": "Avena en hojuelas",
                      "grams": 40,
                      "unit": "g"
                    }
                  ],
                  "ingredientsTotalGrams": 40
                }
              ],
              "equivalences": [],
              "macros": {
                "energyKcal": 450,
                "proteinGrams": 35,
                "carbohydratesGrams": 50,
                "lipidsGrams": 8
              },
              "justification": "Desayuno equilibrado con proteína de alta calidad desde las claras de huevo y carbohidratos complejos de la avena, ideal para iniciar el día con energía sostenida."
            }
          ]
        }
      ]
    }
  }
}
```

---

## Validaciones

### Reglas de Validación

1. **dietId válido**: Debe existir en la base de datos
2. **userId y height/weight**: Deben existir registros del paciente
3. **steps válidos**: Solo se permiten los 5 tramos del pipeline
4. **Dependencias automáticas**: Se agregan automáticamente steps faltantes según dependencias

### Códigos de Estado

- `200 OK`: Acción ejecutada exitosamente
- `400 Bad Request`: Steps inválidos o datos faltantes
- `404 Not Found`: dietId no existe o paciente no encontrado
- `500 Internal Server Error`: Error durante ejecución del pipeline

---

## Notas Técnicas

### Sin Persistencia

Este endpoint **NO escribe en base de datos**. Es ideal para:

- Validar cambios antes de aplicar
- Probar diferentes configuraciones de macros
- Generar previsualizaciones sin impacto
- Debugging del pipeline

### Dependencias Automáticas

El sistema calcula automáticamente las dependencias. Por ejemplo:

- Si solicitas `generateDishes`, se ejecutan también: `computeEnergy`, `resolveMacros`, `buildSchedule`, `applyEquivalences`
- Si solicitas `applyEquivalences`, se ejecutan también: `computeEnergy`, `resolveMacros`, `buildSchedule`

### Overrides

Puedes personalizar cada step mediante `input`:

```json
{
  "steps": ["resolveMacros"],
  "input": {
    "computeEnergy": {
      "recommendedGet": 2200
    },
    "resolveMacros": {
      "proteinsPerDay": 180
    }
  }
}
```

---

## Ver También

- **Pipeline completo**: `Guides/2.3.2-diet-pipeline-and-actions.md`
- **Formato de respuesta**: `doc/response-actual.json`
- **Generación automática**: `Endpoints/generate-automatic.md`

