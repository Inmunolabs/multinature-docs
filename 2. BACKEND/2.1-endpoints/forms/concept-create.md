# POST /forms/concept

## Descripción funcional

Crea un nuevo concepto personalizado para el especialista autenticado. Los conceptos son unidades de medida y categorías que se utilizan para crear preguntas en las plantillas de formularios. Permite personalizar el catálogo de conceptos según las necesidades específicas de cada especialidad.

## Autorización

Requiere token Bearer válido. Solo especialistas autorizados pueden crear conceptos.

## Parámetros de ruta

No aplica

## Query parameters

No aplica

## Body del request

```json
{
  "name": "string",
  "defaultUnit": "string",
  "description": "string"
}
```

### Ejemplo de body

```json
{
  "name": "Presión arterial sistólica",
  "defaultUnit": "mmHg",
  "description": "Presión arterial sistólica del paciente en reposo"
}
```

## Ejemplo de respuesta exitosa (201 Created)

```json
{
  "awsRequestId": "456e7890-e89b-12d3-a456-426614174000",
  "message": "Concepto creado exitosamente",
  "data": [
    {
      "id": "123e4567-e89b-12d3-a456-426614174000",
      "specialistId": "456e7890-e89b-12d3-a456-426614174000",
      "name": "Presión arterial sistólica",
      "defaultUnit": "mmHg",
      "description": "Presión arterial sistólica del paciente en reposo"
    },
    {
      "id": "789e0123-e89b-12d3-a456-426614174000",
      "specialistId": "456e7890-e89b-12d3-a456-426614174000",
      "name": "Frecuencia cardíaca",
      "defaultUnit": "latidos/min",
      "description": "Frecuencia cardíaca en reposo"
    }
  ]
}
```

## Códigos de estado y errores

| Código | Significado | Descripción |
|--------|-------------|-------------|
| 201 | Created | Concepto creado exitosamente |
| 400 | Bad Request | Datos del concepto inválidos o faltantes |
| 401 | Unauthorized | Token faltante o inválido |
| 403 | Forbidden | Sin permisos para crear conceptos |
| 500 | Internal Server Error | Error del servidor |

## Notas útiles para el frontend

- **Validaciones:** Implementar validaciones para nombre, unidad y descripción
- **Unidades estándar:** Sugerir unidades comunes (mmHg, mg/dL, latidos/min, etc.)
- **Nombres únicos:** Verificar que no existan conceptos con el mismo nombre
- **Descripción clara:** Ayudar al usuario a escribir descripciones útiles
- **Actualización automática:** La lista se actualiza automáticamente después de crear
- **Reutilización:** Los conceptos creados pueden usarse en múltiples plantillas
- **Personalización:** Cada especialista puede tener su catálogo personalizado

## Consideraciones técnicas

- **Middleware:** Aplica `authorize` y `formsValidations.createConcept`
- **Validaciones:** Usa validaciones específicas para creación de conceptos
- **Base de datos:** Crea registro usando `FormsQueries.addConcept`
- **Respuesta:** Retorna lista completa actualizada de conceptos
- **DTO:** Usa `conceptToDTO` para transformar la respuesta
- **Especialista:** Asocia automáticamente el concepto al especialista autenticado
- **Transaccional:** Crea el concepto y retorna la lista actualizada

