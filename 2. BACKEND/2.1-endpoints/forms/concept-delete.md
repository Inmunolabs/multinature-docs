# DELETE /forms/concept/:id

## Descripción funcional

Elimina un concepto personalizado del especialista autenticado. Solo se pueden eliminar conceptos que pertenezcan al especialista autenticado. La eliminación de un concepto puede afectar las plantillas que lo utilicen.

## Autorización

Requiere token Bearer válido. Solo especialistas autorizados pueden eliminar sus conceptos.

## Parámetros de ruta

- `id` (UUID, requerido): ID único del concepto a eliminar

### Ejemplo
```
DELETE /forms/concept/123e4567-e89b-12d3-a456-426614174000
```

## Query parameters

No aplica

## Body del request

No aplica

## Ejemplo de respuesta exitosa (200 OK)

```json
{
  "awsRequestId": "456e7890-e89b-12d3-a456-426614174000",
  "message": "Concepto eliminado exitosamente",
  "data": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "specialistId": "789e0123-e89b-12d3-a456-426614174000",
    "name": "Presión arterial sistólica",
    "defaultUnit": "mmHg",
    "description": "Presión arterial sistólica del paciente en reposo"
  }
}
```

## Códigos de estado y errores

| Código | Significado | Descripción |
|--------|-------------|-------------|
| 200 | OK | Concepto eliminado exitosamente |
| 401 | Unauthorized | Token faltante o inválido |
| 403 | Forbidden | Sin permisos para eliminar este concepto |
| 404 | Not Found | Concepto no encontrado |
| 500 | Internal Server Error | Error del servidor |

## Notas útiles para el frontend

- **Confirmación:** Solicitar confirmación antes de eliminar conceptos
- **Dependencias:** Verificar si el concepto está siendo usado en plantillas
- **Permisos:** Verificar que el concepto pertenezca al especialista
- **Impacto:** Informar al usuario sobre el impacto de la eliminación
- **Alternativas:** Sugerir alternativas antes de eliminar conceptos importantes
- **Historial:** Considerar mantener un historial de conceptos eliminados

## Consideraciones técnicas

- **Middleware:** Aplica `authorize`, `idPathParam`, `ownConceptValidation`
- **Permisos:** Verifica que el concepto pertenezca al especialista autenticado
- **Base de datos:** Elimina registro usando `removeConcept` del servicio
- **DTO:** Usa `conceptToDTO` para transformar la respuesta
- **Seguridad:** Solo permite eliminar conceptos propios del especialista
- **Dependencias:** Verifica relaciones con plantillas antes de eliminar
- **Transaccional:** Elimina el concepto y retorna la información eliminada

