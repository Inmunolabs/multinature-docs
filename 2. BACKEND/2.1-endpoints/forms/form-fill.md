# PUT /forms/fill

## Descripción funcional

Completa o actualiza un formulario con las respuestas del paciente. Permite capturar respuestas a preguntas específicas de una plantilla, incluyendo valores, unidades y observaciones. El sistema valida que se completen las preguntas obligatorias y aplica las reglas de graficabilidad. Si no existe una cita asociada, se crea automáticamente.

## Autorización

Requiere token Bearer válido. Solo especialistas autorizados pueden completar formularios para sus pacientes.

## Parámetros de ruta

No aplica

## Query parameters

No aplica

## Body del request

```json
{
  "templateId": "string",
  "answers": [
    {
      "conceptId": "string",
      "value": "string",
      "unit": "string",
      "observation": "string"
    }
  ],
  "bookingId": "string",
  "userId": "string",
  "specialistId": "string"
}
```

### Ejemplo de body

```json
{
  "templateId": "123e4567-e89b-12d3-a456-426614174000",
  "answers": [
    {
      "conceptId": "456e7890-e89b-12d3-a456-426614174000",
      "value": "120",
      "unit": "mmHg",
      "observation": "Medida en reposo"
    },
    {
      "conceptId": "789e0123-e89b-12d3-a456-426614174000",
      "value": "72",
      "unit": "latidos/min",
      "observation": "En reposo"
    },
    {
      "conceptId": "abc123-e89b-12d3-a456-426614174000",
      "value": "Sí",
      "unit": "",
      "observation": "Padre con hipertensión"
    }
  ],
  "bookingId": "def456-e89b-12d3-a456-426614174000",
  "userId": "ghi789-e89b-12d3-a456-426614174000",
  "specialistId": "jkl012-e89b-12d3-a456-426614174000"
}
```

## Ejemplo de respuesta exitosa (200 OK)

```json
{
  "awsRequestId": "456e7890-e89b-12d3-a456-426614174000",
  "message": "Formulario completado exitosamente",
  "data": {
    "id": "mno345-e89b-12d3-a456-426614174000",
    "bookingId": "def456-e89b-12d3-a456-426614174000",
    "formTemplateId": "123e4567-e89b-12d3-a456-426614174000",
    "specialistId": "jkl012-e89b-12d3-a456-426614174000",
    "userId": "ghi789-e89b-12d3-a456-426614174000",
    "answers": [
      {
        "conceptName": "Presión arterial sistólica",
        "unit": "mmHg",
        "observation": "Medida en reposo",
        "value": "120",
        "isGraphable": true
      },
      {
        "conceptName": "Frecuencia cardíaca",
        "unit": "latidos/min",
        "observation": "En reposo",
        "value": "72",
        "isGraphable": true
      },
      {
        "conceptName": "Historial familiar",
        "unit": "",
        "observation": "Padre con hipertensión",
        "value": "Sí",
        "isGraphable": false
      }
    ],
    "updated": "2024-01-15T10:30:00Z",
    "created": "2024-01-15T10:30:00Z"
  }
}
```

## Códigos de estado y errores

| Código | Significado | Descripción |
|--------|-------------|-------------|
| 200 | OK | Formulario completado exitosamente |
| 400 | Bad Request | Datos del formulario inválidos o faltantes |
| 401 | Unauthorized | Token faltante o inválido |
| 403 | Forbidden | Sin permisos para completar formularios |
| 404 | Not Found | Plantilla no encontrada |
| 428 | Precondition Required | Preguntas obligatorias no completadas |
| 500 | Internal Server Error | Error del servidor |

## Notas útiles para el frontend

- **Validaciones:** Implementar validaciones para preguntas obligatorias
- **Graficabilidad:** Identificar respuestas que pueden mostrarse en gráficos
- **Unidades:** Mostrar unidades apropiadas para cada concepto
- **Observaciones:** Permitir agregar notas adicionales a las respuestas
- **Citas automáticas:** El sistema crea citas si no existe una asociada
- **Actualización:** Si el formulario ya existe, se actualiza en lugar de crear
- **Historial:** Las respuestas se mantienen para seguimiento temporal
- **Permisos:** Solo especialistas pueden completar formularios para sus pacientes

## Consideraciones técnicas

- **Middleware:** Aplica múltiples validaciones incluyendo `userBelongsToSpecialist`
- **Validaciones:** Usa `fillForm`, `ownTemplateValidation`, `validateGraphableAnswers`, `validateMandatoryAnswers`
- **Base de datos:** Crea o actualiza usando `upsertAnswer` del servicio
- **Citas:** Crea automáticamente citas si no existe `bookingId`
- **Transaccional:** Maneja creación/actualización de formularios y respuestas
- **DTO:** Usa `filledFormToDTO` para transformar la respuesta
- **Permisos:** Verifica que el especialista tenga acceso a la plantilla y paciente
- **Historial:** Mantiene respuestas anteriores para análisis temporal

