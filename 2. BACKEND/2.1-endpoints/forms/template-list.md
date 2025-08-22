# GET /forms/template

## Descripción funcional

Obtiene la lista de plantillas de formularios creadas por el especialista autenticado. Las plantillas definen la estructura de los formularios con preguntas personalizables, incluyendo validaciones de obligatoriedad y graficabilidad. Permite consultar el catálogo de plantillas disponibles para crear formularios.

## Autorización

Requiere token Bearer válido. Solo especialistas autorizados pueden consultar sus plantillas.

## Parámetros de ruta

No aplica

## Query parameters

No aplica

## Body del request

No aplica

## Ejemplo de respuesta exitosa (200 OK)

```json
[
  {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "specialtyId": "456e7890-e89b-12d3-a456-426614174000",
    "specialistId": "456e7890-e89b-12d3-a456-426614174000",
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
        "conceptId": "def456-e89b-12d3-a456-426614174000",
        "customName": "Historial familiar",
        "unit": "",
        "description": "Historial de enfermedades cardiovasculares en la familia",
        "isGraphable": false,
        "isMandatory": false
      }
    ]
  },
  {
    "id": "ghi789-e89b-12d3-a456-426614174000",
    "specialtyId": "456e7890-e89b-12d3-a456-426614174000",
    "specialistId": "456e7890-e89b-12d3-a456-426614174000",
    "name": "Seguimiento diabético",
    "description": "Formulario para seguimiento de pacientes diabéticos",
    "isInitialAssessment": false,
    "questions": [
      {
        "conceptId": "jkl012-e89b-12d3-a456-426614174000",
        "customName": "Nivel de glucosa",
        "unit": "mg/dL",
        "description": "Nivel de glucosa en sangre",
        "isGraphable": true,
        "isMandatory": true
      }
    ]
  }
]
```

## Códigos de estado y errores

| Código | Significado | Descripción |
|--------|-------------|-------------|
| 200 | OK | Plantillas obtenidas exitosamente |
| 401 | Unauthorized | Token faltante o inválido |
| 403 | Forbidden | Sin permisos para consultar plantillas |
| 500 | Internal Server Error | Error del servidor |

## Notas útiles para el frontend

- **Catálogo personalizado:** Muestra solo las plantillas del especialista autenticado
- **Preguntas detalladas:** Incluye información completa de cada pregunta
- **Validaciones:** Muestra qué preguntas son obligatorias y graficables
- **Unidades:** Cada pregunta tiene su unidad de medida específica
- **Evaluación inicial:** Identifica plantillas para evaluaciones iniciales
- **Creación de formularios:** Útil para seleccionar plantillas al crear formularios
- **Personalización:** Cada especialista puede tener plantillas específicas
- **Reutilización:** Las plantillas pueden usarse para múltiples pacientes

## Consideraciones técnicas

- **Middleware:** Aplica `authorize` para validar autenticación
- **Filtrado:** Solo retorna plantillas del especialista autenticado
- **DTO:** Usa `templateToDTO` para transformar la respuesta
- **Base de datos:** Consulta usando `listTemplates` del servicio
- **Preguntas:** Incluye conceptos y configuraciones de cada pregunta
- **Performance:** Optimizado para consultas del catálogo personal
- **Relaciones:** Las plantillas se asocian a especialidades y conceptos

