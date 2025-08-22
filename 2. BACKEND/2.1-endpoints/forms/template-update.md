# PUT /forms/template/:id

## Descripción funcional

Actualiza una plantilla de formulario existente del especialista autenticado. Permite modificar el nombre, descripción, tipo de evaluación y preguntas de la plantilla. Solo se pueden actualizar plantillas que pertenezcan al especialista autenticado.

## Autorización

Requiere token Bearer válido. Solo especialistas autorizados pueden actualizar sus plantillas.

## Parámetros de ruta

- `id` (UUID, requerido): ID único de la plantilla a actualizar

### Ejemplo
```
PUT /forms/template/123e4567-e89b-12d3-a456-426614174000
```

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
  "name": "Evaluación inicial cardiovascular actualizada",
  "description": "Formulario actualizado para evaluación inicial de pacientes cardiovasculares",
  "isInitialAssessment": true,
  "questions": [
    {
      "conceptId": "789e0123-e89b-12d3-a456-426614174000",
      "customName": "Presión arterial sistólica",
      "unit": "mmHg",
      "description": "Presión arterial sistólica del paciente en reposo",
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

## Ejemplo de respuesta exitosa (200 OK)

```json
{
  "awsRequestId": "456e7890-e89b-12d3-a456-426614174000",
  "message": "Plantilla actualizada exitosamente",
  "data": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "specialtyId": "456e7890-e89b-12d3-a456-426614174000",
    "specialistId": "def456-e89b-12d3-a456-426614174000",
    "name": "Evaluación inicial cardiovascular actualizada",
    "description": "Formulario actualizado para evaluación inicial de pacientes cardiovasculares",
    "isInitialAssessment": true,
    "questions": [
      {
        "conceptId": "789e0123-e89b-12d3-a456-426614174000",
        "customName": "Presión arterial sistólica",
        "unit": "mmHg",
        "description": "Presión arterial sistólica del paciente en reposo",
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
}
```

## Códigos de estado y errores

| Código | Significado | Descripción |
|--------|-------------|-------------|
| 200 | OK | Plantilla actualizada exitosamente |
| 400 | Bad Request | Datos de la plantilla inválidos o faltantes |
| 401 | Unauthorized | Token faltante o inválido |
| 403 | Forbidden | Sin permisos para actualizar esta plantilla |
| 404 | Not Found | Plantilla no encontrada |
| 500 | Internal Server Error | Error del servidor |

## Notas útiles para el frontend

- **Validaciones:** Implementar validaciones para todos los campos de la plantilla
- **Preguntas:** Permitir modificar, agregar o eliminar preguntas existentes
- **Conceptos:** Verificar que los conceptos referenciados existan
- **Graficabilidad:** Mantener configuración de preguntas graficables
- **Obligatoriedad:** Preservar configuración de preguntas obligatorias
- **Permisos:** Verificar que la plantilla pertenezca al especialista
- **Impacto:** Informar sobre el impacto de cambios en formularios existentes

## Consideraciones técnicas

- **Middleware:** Aplica `authorize`, `idPathParam`, `formsValidations.updateTemplate`, `ownTemplateValidation`
- **Validaciones:** Usa validaciones específicas para actualización de plantillas
- **Permisos:** Verifica que la plantilla pertenezca al especialista autenticado
- **Base de datos:** Actualiza plantilla y preguntas usando `updateTemplate` del servicio
- **DTO:** Usa `templateToDTO` para transformar la respuesta
- **Seguridad:** Solo permite actualizar plantillas propias del especialista
- **Transaccional:** Actualiza la plantilla, preguntas y relaciones en una sola operación

