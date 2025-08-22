# PATCH /monthly-purchase/:id

## Descripción funcional

Actualiza una compra mensual existente del usuario autenticado. Permite modificar los productos de la suscripción, lo que automáticamente actualiza el plan y la suscripción en OpenPay. El sistema elimina el plan anterior y crea uno nuevo con los productos actualizados.

## Autorización

Requiere token Bearer válido. Solo usuarios autorizados pueden actualizar sus compras mensuales.

## Parámetros de ruta

- `id` (UUID, requerido): ID único del usuario (mismo que el ID de la compra mensual)

### Ejemplo
```
PATCH /monthly-purchase/123e4567-e89b-12d3-a456-426614174000
```

## Query parameters

No aplica

## Body del request

```json
{
  "products": [
    {
      "id": "string",
      "quantity": "number"
    }
  ]
}
```

### Ejemplo de body

```json
{
  "products": [
    {
      "id": "789e0123-e89b-12d3-a456-426614174000",
      "quantity": 2
    },
    {
      "id": "abc123-e89b-12d3-a456-426614174000",
      "quantity": 1
    },
    {
      "id": "ghi789-e89b-12d3-a456-426614174000",
      "quantity": 3
    }
  ]
}
```

## Ejemplo de respuesta exitosa (200 OK)

```json
{
  "awsRequestId": "456e7890-e89b-12d3-a456-426614174000",
  "message": "Compra mensual actualizada exitosamente",
  "data": {
    "userId": "123e4567-e89b-12d3-a456-426614174000",
    "products": [
      {
        "id": "789e0123-e89b-12d3-a456-426614174000",
        "product": "Suplemento vitamínico mensual",
        "urlImage": "https://example.com/vitaminas.jpg",
        "price": 299.99,
        "quantity": 2,
        "total": 599.98
      },
      {
        "id": "abc123-e89b-12d3-a456-426614174000",
        "product": "Proteína en polvo",
        "urlImage": "https://example.com/proteina.jpg",
        "price": 450.00,
        "quantity": 1,
        "total": 450.00
      },
      {
        "id": "ghi789-e89b-12d3-a456-426614174000",
        "product": "Omega 3",
        "urlImage": "https://example.com/omega3.jpg",
        "price": 350.00,
        "quantity": 3,
        "total": 1050.00
      }
    ],
    "subtotal": 1810.33,
    "ivaPorcentaje": 16,
    "iva": 289.65,
    "shippingCost": 150.00,
    "total": 2250.00,
    "shippingAddress": {
      "id": "def456-e89b-12d3-a456-426614174000",
      "street": "Av. Principal 123",
      "city": "Ciudad de México",
      "state": "CDMX",
      "zipCode": "01000"
    },
    "openpayPlanId": "pln_987654321",
    "openpaySubscriptionId": "sub_123456789",
    "nextPayDate": "2024-02-15",
    "openpayCardId": "card_456789123",
    "isCancelled": false
  }
}
```

## Códigos de estado y errores

| Código | Significado | Descripción |
|--------|-------------|-------------|
| 200 | OK | Compra mensual actualizada exitosamente |
| 400 | Bad Request | Datos de productos inválidos o monto mínimo no cumplido |
| 401 | Unauthorized | Token faltante o inválido |
| 403 | Forbidden | Sin permisos para actualizar esta compra mensual |
| 404 | Not Found | Compra mensual no encontrada |
| 500 | Internal Server Error | Error del servidor |

## Notas útiles para el frontend

- **Productos:** Solo enviar array de productos con ID y cantidad
- **Validaciones:** Verificar monto mínimo de compra
- **OpenPay:** La actualización modifica automáticamente el plan en OpenPay
- **Plan anterior:** El sistema elimina el plan anterior antes de crear uno nuevo
- **Suscripción:** Se mantiene la misma suscripción pero con productos actualizados
- **Cálculos:** Los precios se recalculan automáticamente
- **Estado:** La suscripción se marca como no cancelada
- **Fechas:** Se mantiene la fecha de próxima renovación

## Consideraciones técnicas

- **Middleware:** Aplica `authorize`, `idPathParam`, `monthlyPurchaseValidations.monthlyPurchaseProducts`, `monthlyPurchaseExistanceValidation`, `minimalAmountOfPurchaseValidation`
- **Validaciones:** Verifica existencia de la compra mensual y monto mínimo
- **OpenPay:** Elimina plan anterior y crea uno nuevo con productos actualizados
- **Base de datos:** Actualiza productos y reinicia estado de cancelación
- **Transaccional:** Actualiza tanto la base de datos como OpenPay
- **DTO:** Usa `monthlyPurchaseToDTO` para transformar la respuesta
- **Productos:** Mapea productos a formato requerido por la base de datos
- **Suscripción:** Mantiene la misma suscripción de OpenPay
