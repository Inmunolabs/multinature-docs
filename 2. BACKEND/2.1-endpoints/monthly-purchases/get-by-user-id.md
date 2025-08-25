# GET /monthly-purchase/:id

## Descripción funcional

Obtiene la compra mensual de un usuario específico. Retorna información completa de la suscripción incluyendo productos, precios, dirección de envío, estado de la suscripción y próxima fecha de pago. Si el usuario no tiene compra mensual, retorna un objeto vacío.

## Autorización

Requiere token Bearer válido. Solo usuarios autorizados pueden consultar sus propias compras mensuales.

## Parámetros de ruta

- `id` (UUID, requerido): ID único del usuario

### Ejemplo

```
GET /monthly-purchase/123e4567-e89b-12d3-a456-426614174000
```

## Query parameters

No aplica

## Body del request

No aplica

## Ejemplo de respuesta exitosa (200 OK)

```json
{
  "awsRequestId": "456e7890-e89b-12d3-a456-426614174000",
  "message": "Compra mensual encontrada",
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

| Código | Significado           | Descripción                                     |
| ------ | --------------------- | ----------------------------------------------- |
| 200    | OK                    | Compra mensual obtenida exitosamente            |
| 400    | Bad Request           | ID de usuario inválido                          |
| 401    | Unauthorized          | Token faltante o inválido                       |
| 403    | Forbidden             | Sin permisos para consultar esta compra mensual |
| 500    | Internal Server Error | Error del servidor                              |

## Notas útiles para el frontend

- **Usuario único:** El ID del usuario es el mismo que el ID de la compra mensual
- **Productos:** Incluye información completa de productos con precios y cantidades
- **Cálculos:** Muestra desglose completo de subtotal, IVA y costo de envío
- **Dirección:** Incluye dirección de envío configurada
- **Suscripción:** Muestra IDs de OpenPay para plan y suscripción
- **Próximo pago:** Indica la fecha del próximo pago automático
- **Estado:** Indica si la suscripción está activa o cancelada
- **Sin compra:** Si no hay compra mensual, retorna objeto vacío

## Consideraciones técnicas

- **Middleware:** Aplica `authorize` y `idPathParam` para validar autenticación
- **Validaciones:** Usa validaciones estándar para parámetros de ruta
- **Base de datos:** Consulta usando `getByUserId` del servicio
- **DTO:** Usa `monthlyPurchaseToDTO` para transformar la respuesta
- **Cálculos:** Calcula automáticamente subtotal, IVA y total con envío
- **Constantes:** Usa constantes de base de datos para IVA y costo de envío
- **Productos:** Obtiene información de productos desde la base de datos
- **Fechas:** Calcula próxima fecha de pago basada en la fecha de suscripción
