# POST /forms/template

## Descripción funcional

Crea una nueva plantilla de formulario personalizable para el especialista autenticado. Las plantillas definen la estructura de los formularios con preguntas específicas, incluyendo validaciones de obligatoriedad y graficabilidad. El sistema agrega automáticamente conceptos globales como "estatura" y "peso" si no están incluidos.

## Autorización

Requiere token Bearer válido. Solo especialistas autorizados pueden crear plantillas.

## Parámetros de ruta

No aplica

## Query parameters

No aplica

## Body del request

```json
{
  "specialtyId": "string",
  "name": "string",
  "description": "string",
  "isInitialAssessment": "boolean",
  "questions": [
    {
      "conceptId": "string",
      "customName": "string",
      "unit": "string",
      "description": "string",
      "isGraphable": "boolean",
      "isMandatory": "boolean"
    }
  ]
}
```

### Ejemplo de body

```json
{
  "specialtyId": "456e7890-e89b-12d3-a456-426614174000",
  "name": "Evaluación inicial cardiovascular",
  "description": "Formulario para evaluación inicial de pacientes cardiovasculares",
  "isInitialAssessment": true,
  "questions": [
    {
      "conceptId": "789e0123-e89b-12d3-a456-426614174000",
      "customName": "Presión arterial sistólica",
      "unit": "mmHg",
      "description": "Presión arterial sistólica del paciente",
      "isGraphable": true,
      "isMandatory": true
    },
    {
      "conceptId": "abc123-e89b-12d3-a456-426614174000",
      "customName": "Frecuencia cardíaca",
      "unit": "latidos/min",
      "description": "Frecuencia cardíaca en reposo",
      "isGraphable": true,
      "isMandatory": true
    }
  ]
}
```

## Ejemplo de respuesta exitosa (201 Created)

```json
{
  "awsRequestId": "456e7890-e89b-12d3-a456-426614174000",
  "message": "Plantilla creada exitosamente",
  "data": [
    {
      "id": "123e4567-e89b-12d3-a456-426614174000",
      "specialtyId": "456e7890-e89b-12d3-a456-426614174000",
      "specialistId": "def456-e89b-12d3-a456-426614174000",
      "name": "Evaluación inicial cardiovascular",
      "description": "Formulario para evaluación inicial de pacientes cardiovasculares",
      "isInitialAssessment": true,
      "questions": [
        {
          "conceptId": "789e0123-e89b-12d3-a456-426614174000",
          "customName": "Presión arterial sistólica",
          "unit": "mmHg",
          "description": "Presión arterial sistólica del paciente",
          "isGraphable": true,
          "isMandatory": true
        },
        {
          "conceptId": "abc123-e89b-12d3-a456-426614174000",
          "customName": "Frecuencia cardíaca",
          "unit": "latidos/min",
          "description": "Frecuencia cardíaca en reposo",
          "isGraphable": true,
          "isMandatory": true
        },
        {
          "conceptId": "ghi789-e89b-12d3-a456-426614174000",
          "customName": "Estatura",
          "unit": "cm",
          "description": "Estatura del paciente",
          "isGraphable": true,
          "isMandatory": false
        },
        {
          "conceptId": "jkl012-e89b-12d3-a456-426614174000",
          "customName": "Peso",
          "unit": "kg",
          "description": "Peso del paciente",
          "isGraphable": true,
          "isMandatory": false
        }
      ]
    }
  ]
}
```

## Códigos de estado y errores

| Código | Significado | Descripción |
|--------|-------------|-------------|
| 201 | Created | Plantilla creada exitosamente |
| 400 | Bad Request | Datos de la plantilla inválidos o faltantes |
| 401 | Unauthorized | Token faltante o inválido |
| 403 | Forbidden | Sin permisos para crear plantillas |
| 500 | Internal Server Error | Error del servidor |

## Notas útiles para el frontend

- **Validaciones:** Implementar validaciones para nombre, descripción y preguntas
- **Preguntas:** Permitir agregar múltiples preguntas con configuraciones específicas
- **Conceptos:** Usar conceptos existentes o crear nuevos automáticamente
- **Conceptos globales:** El sistema agrega "estatura" y "peso" automáticamente
- **Graficabilidad:** Marcar preguntas que pueden mostrarse en gráficos temporales
- **Obligatoriedad:** Definir qué preguntas son obligatorias para el paciente
- **Unidades:** Especificar unidades de medida para cada pregunta
- **Actualización automática:** La lista se actualiza automáticamente después de crear

## Consideraciones técnicas

- **Middleware:** Aplica `authorize` y `formsValidations.createTemplate`
- **Validaciones:** Usa validaciones específicas para creación de plantillas
- **Base de datos:** Crea plantilla y conceptos usando transacciones
- **Conceptos globales:** Agrega automáticamente "estatura" y "peso" si faltan
- **Respuesta:** Retorna lista completa actualizada de plantillas
- **DTO:** Usa `templateToDTO` para transformar la respuesta
- **Especialista:** Asocia automáticamente la plantilla al especialista autenticado
- **Transaccional:** Crea plantilla, conceptos y relaciones en una sola operación

