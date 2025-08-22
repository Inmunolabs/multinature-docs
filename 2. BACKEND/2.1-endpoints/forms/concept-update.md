# PATCH /forms/concept/:id

## Descripción funcional

Actualiza un concepto existente del especialista autenticado. Permite modificar el nombre, unidad por defecto y descripción de un concepto personalizado. Solo se pueden actualizar conceptos que pertenezcan al especialista autenticado.

## Autorización

Requiere token Bearer válido. Solo especialistas autorizados pueden actualizar sus conceptos.

## Parámetros de ruta

- `id` (UUID, requerido): ID único del concepto a actualizar

### Ejemplo
```
PATCH /forms/concept/123e4567-e89b-12d3-a456-426614174000
```

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
  "name": "Presión arterial sistólica actualizada",
  "defaultUnit": "mmHg",
  "description": "Presión arterial sistólica del paciente en reposo - versión actualizada"
}
```

## Ejemplo de respuesta exitosa (200 OK)

```json
{
  "awsRequestId": "456e7890-e89b-12d3-a456-426614174000",
  "message": "Concepto actualizado exitosamente",
  "data": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "specialistId": "789e0123-e89b-12d3-a456-426614174000",
    "name": "Presión arterial sistólica actualizada",
    "defaultUnit": "mmHg",
    "description": "Presión arterial sistólica del paciente en reposo - versión actualizada"
  }
}
```

## Códigos de estado y errores

| Código | Significado | Descripción |
|--------|-------------|-------------|
| 200 | OK | Concepto actualizado exitosamente |
| 400 | Bad Request | Datos del concepto inválidos o faltantes |
| 401 | Unauthorized | Token faltante o inválido |
| 403 | Forbidden | Sin permisos para actualizar este concepto |
| 404 | Not Found | Concepto no encontrado |
| 500 | Internal Server Error | Error del servidor |

## Notas útiles para el frontend

- **Validaciones:** Implementar validaciones para los campos a actualizar
- **Campos opcionales:** Solo enviar los campos que se desean modificar
- **Permisos:** Verificar que el concepto pertenezca al especialista
- **Unidades estándar:** Sugerir unidades comunes para el campo `defaultUnit`
- **Nombres únicos:** Verificar que el nuevo nombre no duplique otro concepto
- **Descripción clara:** Ayudar al usuario a escribir descripciones útiles
- **Actualización parcial:** Solo se modifican los campos enviados en el body

## Consideraciones técnicas

- **Middleware:** Aplica `authorize`, `idPathParam`, `formsValidations.updateConcept`, `ownConceptValidation`
- **Validaciones:** Usa validaciones específicas para actualización de conceptos
- **Permisos:** Verifica que el concepto pertenezca al especialista autenticado
- **Base de datos:** Actualiza registro usando `updateConcept` del servicio
- **DTO:** Usa `conceptToDTO` para transformar la respuesta
- **Seguridad:** Solo permite actualizar conceptos propios del especialista
- **Transaccional:** Actualiza el concepto y retorna la información actualizada

