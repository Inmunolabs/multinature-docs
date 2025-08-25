# PATCH /orders/cancel/:id

## Descripción funcional

Cancela una orden existente del usuario autenticado. Al cancelar la orden, se reembolsa el monto total (incluyendo el balance utilizado) a los créditos del usuario. Se eliminan las comisiones asociadas a la orden y se envía una notificación por email confirmando la cancelación.

## Autorización

Requiere token Bearer válido. Solo usuarios autorizados pueden cancelar sus propias órdenes.

## Parámetros de ruta

- `id` (UUID, requerido): ID único de la orden

### Ejemplo
```
PATCH /orders/cancel/789e0123-e89b-12d3-a456-426614174000
```

## Query parameters

No aplica

## Body del request

No aplica

## Ejemplo de respuesta exitosa (200 OK)

```json
{
  "awsRequestId": "456e7890-e89b-12d3-a456-426614174000",
  "message": "Orden cancelada exitosamente",
  "data": {
    "orderId": "789e0123-e89b-12d3-a456-426614174000",
    "folio": "ORD-2024-001",
    "refundAmount": 1367.97,
    "userBalance": 3867.97,
    "message": "Tu orden ORD-2024-001 ha sido cancelada y el monto ha sido reembolsado a tus créditos. ¡Puedes usarlos en futuras compras y seguir disfrutando de nuestros productos!"
  }
}
```

## Códigos de estado y errores

| Código | Significado | Descripción |
|--------|-------------|-------------|
| 200 | OK | Orden cancelada exitosamente |
| 400 | Bad Request | ID de orden inválido |
| 401 | Unauthorized | Token faltante o inválido |
| 403 | Forbidden | Sin permisos para cancelar esta orden |
| 404 | Not Found | Orden no encontrada |
| 500 | Internal Server Error | Error del servidor |

## Notas útiles para el frontend

- **Propiedad:** Solo se pueden cancelar órdenes propias del usuario autenticado
- **Confirmación:** Solicitar confirmación antes de cancelar la orden
- **Reembolso:** El monto total se reembolsa a los créditos del usuario
- **Balance:** Mostrar el balance actualizado después de la cancelación
- **Notificación:** Se envía email automático confirmando la cancelación
- **Comisiones:** Se eliminan automáticamente las comisiones asociadas
- **Estado:** La orden se marca como cancelada en el sistema
- **Folio:** Incluir el folio de la orden en la confirmación

## Consideraciones técnicas

- **Middleware:** Aplica `authorize`, `idPathParam`, `ownOrderValidation` y `cancelOrderValidation`
- **Validaciones:** Verifica que el usuario solo pueda cancelar sus propias órdenes
- **Base de datos:** Actualiza el estado de la orden y el balance del usuario
- **Reembolso:** Calcula el monto total incluyendo balance utilizado
- **Comisiones:** Elimina comisiones asociadas usando `CommissionQueries.removeOrderCommissions`
- **Balance:** Actualiza el balance del usuario con el monto reembolsado
- **Notificaciones:** Crea notificación en base de datos y envía email
- **Email:** Usa `EmailsNotifications.EmailNotificationStrategy` para notificaciones
- **Transaccional:** Proceso que incluye cancelación, reembolso y notificaciones
- **Seguridad:** Solo permite cancelar órdenes propias del usuario autenticado

