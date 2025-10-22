# POST /diets/generate-automatic - Generar Dieta Automática

## Descripción

Genera una dieta automática completa basada en fórmulas de cálculo dietético, datos clínicos del usuario y objetivos nutricionales. Utiliza IA para crear recomendaciones personalizadas de GET, distribución de macronutrientes, porciones y platillos específicos del SMAE.

## Endpoint

```
POST /diets/generate-automatic
```

## Headers

```
Authorization: Bearer <token>
Content-Type: application/json
```

## Request Body

### Campos Requeridos

- `formulas` (array): Array de fórmulas de cálculo dietético a utilizar
- `userId` (string): ID del usuario/paciente para quien se genera la dieta

### Campos Opcionales

- `CAF` (number): Factor de actividad física (default: 1.2)
- `ETA` (number): Efecto térmico de los alimentos en % (default: 10, rango: 0-100)
- `AF` (number): Factor adicional (default: 0)

### Fórmulas Válidas

- `harrisBenedict`: Ecuación Harris-Benedict (1919)
- `IOM`: Institute of Medicine
- `mifflinStJeor`: Ecuación Mifflin-St Jeor (1990)
- `AGA`: American Gastroenterological Association
- `FAO`: Food and Agriculture Organization
- `healthCanada`: Health Canada
- `cunningham`: Ecuación Cunningham (1991)
- `cunninghamAdjusted`: Cunningham Ajustada
- `catchMcArdle`: Ecuación Catch-McArdle
- `catchMcArdleSpecific`: Catch-McArdle Específica
- `owenGeneral`: Owen General
- `owenSpecific`: Owen Específica

### Ejemplo de Request

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
  "success": true,
  "message": "Automatic diet generated successfully",
  "data": {
    "patientObjective": "Perder peso de manera saludable manteniendo masa muscular",
    "calorieCalculations": {
      "formulaResults": [
        {
          "name": "Mifflin-St Jeor",
          "result": 1650.5
        },
        {
          "name": "Harris Benedict",
          "result": 1680.2
        },
        {
          "name": "IOM",
          "result": 1625.8
        }
      ],
      "averageCalories": 1652.17,
      "calculatedGET": 1817.39,
      "ETACalories": 165.22,
      "AFCalories": 0
    },
    "recommendedGET": {
      "value": 1545,
      "justification": "Se recomienda un GET de 1545 kcal/día, reduciendo 15% del GET calculado para promover una pérdida de peso saludable de 0.5-1 kg por semana. Esta reducción es apropiada considerando el objetivo del paciente y sus características físicas, manteniendo un déficit calórico moderado que preserve la masa muscular."
    },
    "macronutrients": {
      "proteinsPerDay": 116,
      "lipidsPerDay": 43,
      "carbohydratesPerDay": 174,
      "justification": "Distribución de macronutrientes optimizada para pérdida de peso: 30% proteínas (116g) para preservar masa muscular y aumentar saciedad, 25% lípidos (43g) para funciones hormonales esenciales, y 45% carbohidratos (174g) para energía y rendimiento. Esta distribución es saludable y sostenible a largo plazo."
    },
    "mealStructure": {
      "days": 7,
      "mealsPerDay": ["Desayuno", "Colación 1", "Comida", "Colación 2", "Cena"],
      "justifications": {
        "daysJustification": "Se recomienda un plan de 7 días para establecer una rutina alimentaria completa que permita variedad nutricional y adherencia sostenible al objetivo de pérdida de peso.",
        "mealsJustification": "Se recomiendan 5 tiempos de comida para mantener niveles estables de glucosa, optimizar el metabolismo y controlar la saciedad durante el proceso de pérdida de peso."
      }
    },
    "portionDistribution": {
      "totalPortions": {
        "AOA Muy bajo en grasa": 4,
        "AOA Bajo en grasa": 5,
        "AOA Moderado en grasa": 4,
        "AOA Alto en grasa": 3,
        "Cereal Sin grasa": 7,
        "Cereal Con grasa": 2,
        "Verdura": 5,
        "Fruta": 3,
        "Leche Descremada": 2,
        "Leche Semidescremada": 0,
        "Leche Entera": 0,
        "Leche Con azucar": 0,
        "Grasa Sin proteina": 6,
        "Grasa Con proteina": 3,
        "Azucar Sin grasa": 0,
        "Azucar Con grasa": 0,
        "Leguminosas": 2,
        "Libre": 0
      },
      "dailyDistribution": {
        "0": {
          "Desayuno": {
            "AOA Bajo en grasa": 1,
            "Cereal Sin grasa": 2,
            "Fruta": 1,
            "Leche Descremada": 1
          },
          "Colación 1": {
            "Fruta": 1
          },
          "Comida": {
            "AOA Muy bajo en grasa": 2,
            "Cereal Sin grasa": 2,
            "Verdura": 2,
            "Grasa Sin proteina": 1
          },
          "Colación 2": {
            "Leche Descremada": 1
          },
          "Cena": {
            "AOA Bajo en grasa": 1,
            "Verdura": 2,
            "Grasa Sin proteina": 1
          }
        }
        // ... días 1-6 con distribuciones similares
      },
      "justifications": {
        "totalPortionsJustification": "Distribución calculada basada en objetivo de pérdida de peso. Se priorizaron alimentos de origen animal magros, cereales integrales sin grasa, y abundantes verduras.",
        "distributionJustification": "Las porciones se distribuyeron priorizando proteínas en comidas principales, carbohidratos en desayuno y pre-entreno, y verduras en todas las comidas para optimizar saciedad y adherencia."
      }
    },
    "mealRecommendations": {
      "mealPlan": {
        "0": {
          "Desayuno": {
            "foods": [
              {
                "id": "smae-001",
                "name": "Avena cocida",
                "quantity": 1,
                "unit": "taza",
                "main_group": "Cereal",
                "calories": 150,
                "protein": 5,
                "lipids": 3,
                "carbohydrates": 27,
                "justification": "Cereal integral rico en fibra"
              },
              {
                "id": "smae-045",
                "name": "Fresas",
                "quantity": 1,
                "unit": "taza",
                "main_group": "Frutas",
                "calories": 50,
                "protein": 1,
                "lipids": 0,
                "carbohydrates": 12
              }
            ],
            "totalCalories": 200,
            "totalProtein": 6,
            "totalLipids": 3,
            "totalCarbohydrates": 39
          },
          "Colación 1": {
            "foods": [
              {
                "id": "smae-078",
                "name": "Yogurt griego natural",
                "quantity": 150,
                "unit": "gramos",
                "main_group": "Leche",
                "calories": 100,
                "protein": 15,
                "lipids": 0,
                "carbohydrates": 6
              }
            ],
            "totalCalories": 100,
            "totalProtein": 15,
            "totalLipids": 0,
            "totalCarbohydrates": 6,
            "portionValidation": "Los alimentos seleccionados corresponden exactamente a: 1 Leche Descremada según la distribución de porciones asignada"
          }
          // ... más comidas para el día 0
        }
        // ... días 1-6
      },
      "nutritionalSummary": {
        "averageDailyCalories": 1545,
        "averageDailyProteins": 116,
        "averageDailyLipids": 43,
        "averageDailyCarbohydrates": 174
      },
      "coherenceValidation": "Todos los platillos recomendados coinciden exactamente con la distribución de porciones especificada para cada día y tiempo de comida",
      "generalJustification": "Plan de alimentación de 7 días diseñado específicamente para pérdida de peso saludable. Se seleccionaron alimentos del SMAE que corresponden exactamente a las porciones asignadas, garantizando coherencia nutricional. La distribución de comidas optimiza la saciedad y el metabolismo a lo largo del día."
    },
    "savedDiet": {
      "id": "diet-uuid-here",
      "userId": "123e4567-e89b-12d3-a456-426614174000",
      "specialistId": "specialist-uuid-here",
      "caloriesPerDay": 1545,
      "proteinsGrams": 116,
      "lipidsGrams": 43,
      "carbohydratesGrams": 174,
      "notes": "Dieta automática generada. GET recomendado: 1545 kcal. Se redujo el GET en 15% para promover la pérdida de peso de manera saludable (0.5-1 kg por semana).",
      "created": "2024-01-15T10:30:00Z",
      "updated": "2024-01-15T10:30:00Z"
    }
  }
}
```

### Error Responses

#### 400 - Bad Request

```json
{
  "success": false,
  "message": "Formulas array is required and must not be empty",
  "data": {}
}
```

#### 404 - Patient Not Found

```json
{
  "success": false,
  "message": "Patient not found",
  "data": {}
}
```

#### 400 - Missing Clinical Data

```json
{
  "success": false,
  "message": "Altura del usuario no encontrada",
  "data": {}
}
```

#### 500 - Server Error

```json
{
  "success": false,
  "message": "Error generating automatic diet",
  "data": {
    "error": "Detailed error message"
  }
}
```

## Validaciones

### Middleware Aplicado

- `validateAutomaticDietGeneration`: Valida el request body y obtiene datos del paciente

### Validaciones Específicas

1. **Formulas**: Debe ser un array no vacío con fórmulas válidas
2. **UserId**: Debe ser un string válido
3. **CAF**: Si se proporciona, debe ser un número positivo
4. **ETA**: Si se proporciona, debe estar entre 0 y 100
5. **AF**: Si se proporciona, debe ser un número no negativo
6. **Datos del paciente**: Debe existir el usuario con altura y peso registrados

## Flujo del Proceso

1. **Validación**: Se validan los parámetros de entrada (fórmulas, userId, etc.)
2. **Datos clínicos**: Se obtienen los datos clínicos del usuario desde `getAllFilledFormValuesByUserId`
3. **Extracción de objetivo**: Se toma el concept más reciente con name = "Objetivo" como texto plano
4. **Cálculo de GET promedio**: Se calculan las calorías usando las fórmulas seleccionadas y se obtiene el promedio
5. **GET recomendado con IA**: La IA analiza el objetivo y datos del paciente para recomendar un GET específico con justificación
6. **Distribución de macronutrientes con IA**: La IA calcula proteínas, lípidos y carbohidratos en gramos enteros con justificación
7. **Estructura de comidas con IA**: La IA determina dinámicamente el número de días y tiempos de comida basado en datos clínicos
8. **Distribución de porciones con IA**: La IA genera el cuadro dietosintético completo Y su distribución por día/tiempo de comida
9. **Recomendaciones de menús con IA**: La IA selecciona alimentos específicos del SMAE que coincidan EXACTAMENTE con las porciones asignadas
10. **Guardado en BD**: Se almacena toda la información usando la misma lógica de snapshots que las dietas manuales
11. **Respuesta**: Se devuelve la dieta completa con estructura dinámica, coherencia entre porciones y platillos, y todas las justificaciones

## Consideraciones Técnicas

### Datos Clínicos Requeridos

- El usuario debe tener formularios completados con datos clínicos
- Se requieren registros de altura y peso
- Los objetivos se extraen automáticamente de conceptos como "objetivo", "goal", "meta"

### Integración con IA

- Utiliza OpenAI GPT-4o para todas las recomendaciones nutricionales
- **Prompts configurables**: Los prompts están en `apis/diets-api/src/config/diet-prompts.js` para fácil modificación sin redeploy
- **Flujo dinámico**: La IA determina estructura de comidas basada en datos clínicos del paciente
- **Coherencia garantizada**: Los platillos coinciden exactamente con las porciones asignadas
- Incluye fallbacks robustos si la IA falla en cualquier paso
- Se basa en alimentos específicos del Sistema Mexicano de Alimentos Equivalentes (SMAE)
- Temperatura baja (0.3) para respuestas consistentes y profesionales
- Validación estricta de respuestas JSON de la IA
- **4 llamadas secuenciales a IA**: Estructura → Macronutrientes → Porciones → Platillos

### Almacenamiento

- Se guarda la dieta principal en la tabla `diets`
- Se mantiene historial automático (snapshots cada 6 días)
- Los platillos generados se marcan como `ai_generated = 1`

## Casos de Uso

### Caso 1: Pérdida de Peso

```json
{
  "formulas": ["mifflinStJeor", "harrisBenedict"],
  "userId": "user-id",
  "CAF": 1.2
}
```

- GET se reduce 15%
- Mayor proporción de proteínas (30%)
- Menor proporción de grasas y azúcares

### Caso 2: Aumento de Peso

```json
{
  "formulas": ["mifflinStJeor", "IOM", "FAO"],
  "userId": "user-id",
  "CAF": 1.6
}
```

- GET se aumenta 15%
- Mayor densidad calórica
- Más grasas saludables (30%)

### Caso 3: Mantenimiento

```json
{
  "formulas": ["mifflinStJeor"],
  "userId": "user-id",
  "CAF": 1.4
}
```

- GET se mantiene calculado
- Distribución balanceada estándar
- Enfoque en variedad nutricional

## Notas Importantes

- El endpoint requiere autenticación de especialista
- Los cálculos se basan en evidencia científica nutricional
- La IA genera recomendaciones pero siempre con supervisión profesional
- Se mantiene trazabilidad completa de todos los cálculos
- El sistema es compatible con el flujo manual existente
