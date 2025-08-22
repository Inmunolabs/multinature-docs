# DELETE /orders/:id

## Descripción funcional

Elimina permanentemente una orden específica del sistema. Este endpoint permite remover órdenes que ya no son necesarias mantener en la base de datos. La eliminación es permanente y no se puede revertir.

## Autorización

Requiere token Bearer válido. Solo usuarios autorizados pueden eliminar órdenes.

## Parámetros de ruta

- `id` (UUID, requerido): ID único de la orden

### Ejemplo
```
DELETE /orders/789e0123-e89b-12d3-a456-426614174000
```

## Query parameters

No aplica

## Body del request

No aplica

## Ejemplo de respuesta exitosa (200 OK)

```json
{
  "awsRequestId": "456e7890-e89b-12d3-a456-426614174000",
  "message": "Orden eliminada exitosamente",
  "data": {
    "orderId": "789e0123-e89b-12d3-a456-426614174000",
    "folio": "ORD-2024-001",
    "status": "deleted",
    "message": "La orden ha sido eliminada permanentemente del sistema"
  }
}
```

## Códigos de estado y errores

| Código | Significado | Descripción |
|--------|-------------|-------------|
| 200 | OK | Orden eliminada exitosamente |
| 400 | Bad Request | ID de orden inválido |
| 401 | Unauthorized | Token faltante o inválido |
| 403 | Forbidden | Sin permisos para eliminar esta orden |
| 404 | Not Found | Orden no encontrada |
| 500 | Internal Server Error | Error del servidor |

## Notas útiles para el frontend

- **Confirmación:** Solicitar confirmación antes de eliminar la orden
- **Permanente:** La eliminación no se puede revertir
- **Historial:** La orden se elimina completamente del historial
- **Folio:** Incluir el folio de la orden en la confirmación
- **Advertencia:** Mostrar advertencia sobre la naturaleza permanente de la acción
- **Permisos:** Verificar que el usuario tenga permisos para eliminar
- **Auditoría:** Considerar mantener registro de órdenes eliminadas

## Consideraciones técnicas

- **Middleware:** Aplica `authorize` e `idPathParam` para validar autenticación
- **Validaciones:** Verifica que el ID de la orden sea válido
- **Base de datos:** Elimina la orden usando `OrdersQueries.remove`
- **Permanente:** La eliminación es irreversible
- **Seguridad:** Solo usuarios autorizados pueden eliminar órdenes
- **Performance:** Optimizado para eliminación individual de órdenes
- **Auditoría:** No mantiene registro de la orden eliminada
