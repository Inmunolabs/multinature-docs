# DELETE /monthly-purchase/cancel/:id

## Descripción funcional

Cancela una compra mensual existente del usuario autenticado. Elimina tanto el plan como la suscripción en OpenPay, y marca la compra mensual como cancelada en la base de datos. La cancelación es permanente y no se puede revertir.

## Autorización

Requiere token Bearer válido. Solo usuarios autorizados pueden cancelar sus compras mensuales.

## Parámetros de ruta

- `id` (UUID, requerido): ID único del usuario (mismo que el ID de la compra mensual)

### Ejemplo
```
DELETE /monthly-purchase/cancel/123e4567-e89b-12d3-a456-426614174000
```

## Query parameters

No aplica

## Body del request

No aplica

## Ejemplo de respuesta exitosa (200 OK)

```json
{
  "awsRequestId": "456e7890-e89b-12d3-a456-426614174000",
  "message": "Compra mensual cancelada exitosamente",
  "data": {
    "userId": "123e4567-e89b-12d3-a456-426614174000",
    "products": [
      {
        "id": "789e0123-e89b-12d3-a456-426614174000",
        "product": "Suplemento vitamínico mensual",
        "urlImage": "https://example.com/vitaminas.jpg",
        "price": 299.99,
        "quantity": 1,
        "total": 299.99
      },
      {
        "id": "abc123-e89b-12d3-a456-426614174000",
        "product": "Proteína en polvo",
        "urlImage": "https://example.com/proteina.jpg",
        "price": 450.00,
        "quantity": 2,
        "total": 900.00
      }
    ],
    "subtotal": 1034.48,
    "ivaPorcentaje": 16,
    "iva": 165.52,
    "shippingCost": 150.00,
    "total": 1350.00,
    "shippingAddress": {
      "id": "def456-e89b-12d3-a456-426614174000",
      "street": "Av. Principal 123",
      "city": "Ciudad de México",
      "state": "CDMX",
      "zipCode": "01000"
    },
    "openpayPlanId": "",
    "openpaySubscriptionId": "",
    "nextPayDate": "",
    "openpayCardId": "",
    "isCancelled": true
  }
}
```

## Códigos de estado y errores

| Código | Significado | Descripción |
|--------|-------------|-------------|
| 200 | OK | Compra mensual cancelada exitosamente |
| 401 | Unauthorized | Token faltante o inválido |
| 403 | Forbidden | Sin permisos para cancelar esta compra mensual |
| 404 | Not Found | Compra mensual no encontrada |
| 500 | Internal Server Error | Error del servidor |

## Notas útiles para el frontend

- **Confirmación:** Solicitar confirmación antes de cancelar la suscripción
- **Permanente:** La cancelación no se puede revertir
- **OpenPay:** Se eliminan automáticamente plan y suscripción en OpenPay
- **Estado:** La compra se marca como cancelada
- **Productos:** Los productos se mantienen en el historial
- **Fechas:** Se eliminan las fechas de próximo pago
- **IDs de OpenPay:** Se limpian los IDs de plan y suscripción
- **Permisos:** Solo se puede cancelar la propia compra mensual

## Consideraciones técnicas

- **Middleware:** Aplica `authorize` y `monthlyPurchaseExistanceValidation`
- **Validaciones:** Verifica existencia de la compra mensual
- **OpenPay:** Elimina plan y suscripción usando `deletePlanAndSubscription`
- **Base de datos:** Marca la compra mensual como cancelada
- **DTO:** Usa `monthlyPurchaseToDTO` para transformar la respuesta
- **Transaccional:** Cancela tanto en OpenPay como en la base de datos
- **Seguridad:** Solo permite cancelar compras propias del usuario
- **Permanente:** La cancelación no es reversible
