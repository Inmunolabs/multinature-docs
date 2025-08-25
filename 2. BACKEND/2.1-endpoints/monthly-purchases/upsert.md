# PATCH /monthly-purchase

## Descripción funcional

Crea o actualiza una compra mensual para el usuario autenticado. Permite configurar productos, dirección de envío y tipo de compra (suscripción o compra única). Si es una suscripción, se integra con OpenPay para pagos automáticos mensuales. Solo se permite una suscripción activa por usuario.

## Autorización

Requiere token Bearer válido. Solo usuarios autorizados pueden crear/actualizar sus compras mensuales.

## Parámetros de ruta

No aplica

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
  ],
  "isSubscriptionPurchase": "boolean",
  "addressId": "string"
}
```

### Ejemplo de body

```json
{
  "products": [
    {
      "id": "789e0123-e89b-12d3-a456-426614174000",
      "quantity": 1
    },
    {
      "id": "abc123-e89b-12d3-a456-426614174000",
      "quantity": 2
    }
  ],
  "isSubscriptionPurchase": true,
  "addressId": "def456-e89b-12d3-a456-426614174000"
}
```

## Ejemplo de respuesta exitosa (201 Created)

```json
{
  "awsRequestId": "456e7890-e89b-12d3-a456-426614174000",
  "message": "Compra mensual creada exitosamente",
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
        "price": 450.0,
        "quantity": 2,
        "total": 900.0
      }
    ],
    "subtotal": 1034.48,
    "ivaPorcentaje": 16,
    "iva": 165.52,
    "shippingCost": 150.0,
    "total": 1350.0,
    "shippingAddress": {
      "id": "def456-e89b-12d3-a456-426614174000",
      "street": "Av. Principal 123",
      "city": "Ciudad de México",
      "state": "CDMX",
      "zipCode": "01000"
    },
    "openpayPlanId": "pln_123456789",
    "openpaySubscriptionId": "sub_987654321",
    "nextPayDate": "2024-02-15",
    "openpayCardId": "card_456789123",
    "isCancelled": false
  }
}
```

## Códigos de estado y errores

| Código | Significado           | Descripción                                       |
| ------ | --------------------- | ------------------------------------------------- |
| 201    | Created               | Compra mensual creada exitosamente                |
| 200    | OK                    | Compra mensual actualizada exitosamente           |
| 400    | Bad Request           | Datos inválidos o requisitos no cumplidos         |
| 401    | Unauthorized          | Token faltante o inválido                         |
| 403    | Forbidden             | Sin permisos para crear/actualizar compra mensual |
| 404    | Not Found             | Dirección de envío no encontrada                  |
| 500    | Internal Server Error | Error del servidor                                |

## Notas útiles para el frontend

- **Validaciones:** Verificar que el usuario tenga dirección de envío y método de pago
- **Suscripción única:** Solo se permite una suscripción activa por usuario
- **Productos:** Enviar array de productos con ID y cantidad
- **Dirección:** Especificar ID de dirección de envío válida
- **Tipo de compra:** Distinguir entre suscripción y compra única
- **Requisitos:** Las suscripciones requieren dirección y método de pago
- **Actualización:** Si ya existe, se actualiza en lugar de crear
- **OpenPay:** Las suscripciones se integran automáticamente con OpenPay

## Consideraciones técnicas

- **Middleware:** Aplica `authorize` y `monthlyPurchaseValidations.monthlyPurchaseProducts`
- **Validaciones:** Usa `minimalAmountOfPurchaseValidation` para verificar monto mínimo
- **Base de datos:** Crea o actualiza usando `upsert` del servicio
- **OpenPay:** Integra con OpenPay para crear planes y suscripciones
- **Dirección:** Verifica que la dirección pertenezca al usuario
- **Método de pago:** Obtiene método de pago configurado del usuario
- **Transaccional:** Crea compra mensual y actualiza fecha de suscripción
- **DTO:** Usa `monthlyPurchaseToDTO` para transformar la respuesta
