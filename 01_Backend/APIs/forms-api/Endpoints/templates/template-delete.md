# DELETE /forms/template/:id

## Descripción funcional

Elimina una plantilla de formulario del especialista autenticado. Solo se pueden eliminar plantillas que pertenezcan al especialista autenticado. La eliminación de una plantilla puede afectar los formularios ya completados que la utilicen.

## Autorización

Requiere token Bearer válido. Solo especialistas autorizados pueden eliminar sus plantillas.

## Parámetros de ruta

- `id` (UUID, requerido): ID único de la plantilla a eliminar

### Ejemplo

```
DELETE /forms/template/123e4567-e89b-12d3-a456-426614174000
```

## Query parameters

No aplica

## Body del request

No aplica

## Ejemplo de respuesta exitosa (200 OK)

```json
{
  "awsRequestId": "456e7890-e89b-12d3-a456-426614174000",
  "message": "Plantilla eliminada exitosamente",
  "data": {
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
      }
    ]
  }
}
```

## Códigos de estado y errores

| Código | Significado           | Descripción                               |
| ------ | --------------------- | ----------------------------------------- |
| 200    | OK                    | Plantilla eliminada exitosamente          |
| 401    | Unauthorized          | Token faltante o inválido                 |
| 403    | Forbidden             | Sin permisos para eliminar esta plantilla |
| 404    | Not Found             | Plantilla no encontrada                   |
| 500    | Internal Server Error | Error del servidor                        |

## Notas útiles para el frontend

- **Confirmación:** Solicitar confirmación antes de eliminar plantillas
- **Dependencias:** Verificar si la plantilla está siendo usada en formularios
- **Permisos:** Verificar que la plantilla pertenezca al especialista
- **Impacto:** Informar al usuario sobre el impacto de la eliminación
- **Alternativas:** Sugerir alternativas antes de eliminar plantillas importantes
- **Historial:** Considerar mantener un historial de plantillas eliminadas
- **Formularios existentes:** Informar sobre el estado de formularios ya completados

## Consideraciones técnicas

- **Middleware:** Aplica `authorize`, `idPathParam`, `ownTemplateValidation`
- **Permisos:** Verifica que la plantilla pertenezca al especialista autenticado
- **Base de datos:** Elimina plantilla y preguntas usando `removeTemplate` del servicio
- **DTO:** Usa `templateToDTO` para transformar la respuesta
- **Seguridad:** Solo permite eliminar plantillas propias del especialista
- **Dependencias:** Verifica relaciones con formularios antes de eliminar
- **Transaccional:** Elimina la plantilla, preguntas y relaciones en una sola operación
