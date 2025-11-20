# POST /diets/recommend-formulas

## Descripción funcional

Este endpoint recibe las respuestas del formulario base de nutrición (templateId = `1b0ea18d-bd63-42d2-995f-bff9f8094e50`) y devuelve únicamente una **lista de fórmulas recomendadas** para el cálculo de GEB/GET, basadas en el contexto clínico del paciente.

**Importante:** Este endpoint **NO genera dieta**. Solo interpreta el formulario y recomienda fórmulas apropiadas según el contexto clínico del paciente.

## Autorización

Requiere token Bearer válido.

## Parámetros de ruta

No aplica

## Query parameters

No aplica

## Body del request

El body debe contener un arreglo `answers` con las respuestas del formulario. Cada respuesta debe incluir:

- `conceptId` (UUID, requerido): ID del concepto/pregunta respondida
- `value` (string/number, requerido): Valor de la respuesta
- `question` (string, opcional): Texto de la pregunta
- `conceptName` (string, opcional): Nombre del concepto
- `unit` (string, opcional): Unidad de medida
- `observation` (string, opcional): Observaciones adicionales

### Estructura del body

```json
{
  "answers": [
    {
      "conceptId": "uuid-del-concepto-1",
      "value": "75.5",
      "question": "¿Cuál es su peso actual?",
      "unit": "kg"
    },
    {
      "conceptId": "uuid-del-concepto-2",
      "value": "170",
      "question": "¿Cuál es su estatura?",
      "unit": "cm"
    },
    {
      "conceptId": "uuid-del-concepto-3",
      "value": "30",
      "question": "¿Cuál es su edad?",
      "unit": "años"
    }
  ]
}
```

### Validación de preguntas obligatorias

El endpoint valida dinámicamente que **todas las preguntas obligatorias** (`isMandatory = 1`) del template estén presentes en el body. Esta validación es dinámica, consultando la tabla de templates, por lo que si el formulario cambia en el futuro, el endpoint seguirá funcionando correctamente.

Si falta alguna pregunta obligatoria, el endpoint retornará un error 400 con la lista de `conceptId` faltantes.

## Ejemplo de respuesta exitosa (200 OK)

```json
{
  "awsRequestId": "456e7890-e89b-12d3-a456-426614174000",
  "message": "Fórmulas recomendadas exitosamente",
  "data": {
    "formulas": [
      "harrisBenedict",
      "mifflinStJeor",
      "IOM",
      "FAO"
    ]
  }
}
```

## Fórmulas disponibles

El sistema puede recomendar las siguientes fórmulas (según el contexto clínico):

- `harrisBenedict` - Harris Benedict
- `IOM` - Institute of Medicine
- `mifflinStJeor` - Mifflin-St Jeor
- `AGA` - American Gastroenterological Association
- `FAO` - FAO/OMS/UNU
- `healthCanada` - Health Canada
- `cunningham` - Cunningham
- `cunninghamAdjusted` - Cunningham Ajustado
- `catchMcArdle` - Catch-McArdle Equation
- `catchMcArdleSpecific` - Catch-McArdle Equation Specific
- `owenGeneral` - Owen General
- `owenSpecific` - Owen Specific

## Códigos de estado y errores

| Código | Significado           | Descripción                                                      |
| ------ | -------------------- | ---------------------------------------------------------------- |
| 200    | OK                   | Fórmulas recomendadas exitosamente                              |
| 400    | Bad Request          | Body inválido o faltan preguntas obligatorias                   |
| 401    | Unauthorized         | Token faltante o inválido                                        |
| 500    | Internal Server Error | Error del servidor                                              |

### Ejemplo de error por preguntas obligatorias faltantes (400)

```json
{
  "awsRequestId": "456e7890-e89b-12d3-a456-426614174000",
  "message": "Missing mandatory questions",
  "data": {
    "missing": [
      "uuid-concepto-obligatorio-1",
      "uuid-concepto-obligatorio-2"
    ]
  }
}
```

## Construcción del contexto clínico

El contexto clínico se construye **exclusivamente** con las respuestas del body. El endpoint **NO usa userId** ni busca información del paciente en otras tablas.

El contexto incluye:

- **Objetivo nutricional** - Extraído de preguntas sobre objetivos/metas
- **Peso y estatura** - Para cálculo de IMC y fórmulas
- **Alergias / Intolerancias** - Para considerar restricciones
- **Antecedentes clínicos y gastrointestinales** - Para ajustar recomendaciones
- **Medicamentos y suplementos** - Para considerar interacciones
- **Horarios** - Trabajo, comida, sueño
- **Consumo de agua** - Para hidratación
- **Síntomas** - Para contexto clínico
- **Energía diaria** - Si está disponible
- **Nivel de estrés** - Para ajustes metabólicos
- **Consumo de sustancias** - Tabaco, alcohol, etc.
- **Actividad física** - Preguntas 15, 16, 17 (días/semana, duración, tipo)

## Lógica de recomendación

El endpoint utiliza la lógica de `formulaPicker` que selecciona fórmulas basándose en:

1. **Fórmulas estándar** - Siempre incluye Harris-Benedict y Mifflin-St Jeor (robustas en población general)
2. **Composición corporal** - Si hay datos de grasa corporal o masa magra, recomienda Cunningham, Catch-McArdle
3. **IMC extremo o condiciones clínicas** - Si IMC < 18.5 o ≥ 30, o hay condiciones metabólicas, recomienda IOM, AGA, FAO, Health Canada
4. **Datos básicos** - Si no hay datos de composición corporal, incluye Owen General/Specific según género

## Notas útiles para el frontend

- **Validación dinámica:** Las preguntas obligatorias se obtienen dinámicamente del template, no están hardcodeadas
- **Sin generación de dieta:** Este endpoint solo recomienda fórmulas, no genera dietas
- **Contexto desde body:** Todo el contexto se construye desde las respuestas del formulario
- **Fórmulas disponibles:** La lista de fórmulas disponibles está definida en `DietCalculator`
- **Integración:** Este endpoint puede usarse antes de llamar a `/diets/diet-calculations/:id` para obtener las fórmulas recomendadas

## Consideraciones técnicas

- **Middleware:** No requiere middleware adicional, solo validación de body
- **Validaciones:** Valida estructura del body y presencia de preguntas obligatorias
- **Template ID:** Usa el template ID `1b0ea18d-bd63-42d2-995f-bff9f8094e50` para obtener preguntas obligatorias
- **Contexto clínico:** Se construye desde las respuestas usando procesamiento de texto y extracción de datos
- **Recomendación:** Utiliza `pickFormulasForProfile` para seleccionar fórmulas apropiadas
- **Sin persistencia:** No guarda nada en la base de datos, solo procesa y recomienda

## Ejemplo de uso completo

```bash
POST /diets/recommend-formulas
Authorization: Bearer <token>
Content-Type: application/json

{
  "answers": [
    {
      "conceptId": "uuid-peso",
      "value": "75.5",
      "question": "¿Cuál es su peso actual?",
      "unit": "kg"
    },
    {
      "conceptId": "uuid-estatura",
      "value": "170",
      "question": "¿Cuál es su estatura?",
      "unit": "cm"
    },
    {
      "conceptId": "uuid-edad",
      "value": "30",
      "question": "¿Cuál es su edad?",
      "unit": "años"
    },
    {
      "conceptId": "uuid-sexo",
      "value": "Masculino",
      "question": "¿Cuál es su sexo?"
    },
    {
      "conceptId": "uuid-objetivo",
      "value": "Pérdida de peso",
      "question": "¿Cuál es su objetivo nutricional?"
    }
  ]
}
```

**Respuesta:**

```json
{
  "awsRequestId": "456e7890-e89b-12d3-a456-426614174000",
  "message": "Fórmulas recomendadas exitosamente",
  "data": {
    "formulas": [
      "harrisBenedict",
      "mifflinStJeor",
      "IOM",
      "FAO"
    ]
  }
}
```

---

- **Última actualización:** 2025-01-27
- **Endpoint independiente:** No modifica `/diets/generate-automatic`

