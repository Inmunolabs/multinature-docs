# PATCH /monthly-purchase/shipping-address/:id

## Descripción funcional

Actualiza la dirección de envío de una compra mensual existente. Permite cambiar la dirección donde se enviarán los productos de la suscripción mensual. La nueva dirección debe pertenecer al usuario autenticado.

## Autorización

Requiere token Bearer válido. Solo usuarios autorizados pueden actualizar la dirección de envío de sus compras mensuales.

## Parámetros de ruta

- `id` (UUID, requerido): ID único del usuario (mismo que el ID de la compra mensual)

### Ejemplo

```
PATCH /monthly-purchase/shipping-address/123e4567-e89b-12d3-a456-426614174000
```

## Query parameters

No aplica

## Body del request

```json
{
  "addressId": "string"
}
```

### Ejemplo de body

```json
{
  "addressId": "ghi789-e89b-12d3-a456-426614174000"
}
```

## Ejemplo de respuesta exitosa (200 OK)

```json
{
  "awsRequestId": "456e7890-e89b-12d3-a456-426614174000",
  "message": "Dirección de envío actualizada exitosamente",
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
      "id": "ghi789-e89b-12d3-a456-426614174000",
      "street": "Calle Secundaria 456",
      "city": "Guadalajara",
      "state": "Jalisco",
      "zipCode": "44100"
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

| Código | Significado           | Descripción                                      |
| ------ | --------------------- | ------------------------------------------------ |
| 200    | OK                    | Dirección de envío actualizada exitosamente      |
| 400    | Bad Request           | ID de dirección inválido o faltante              |
| 401    | Unauthorized          | Token faltante o inválido                        |
| 403    | Forbidden             | Sin permisos para actualizar esta compra mensual |
| 404    | Not Found             | Compra mensual o dirección no encontrada         |
| 500    | Internal Server Error | Error del servidor                               |

## Notas útiles para el frontend

- **Dirección válida:** Verificar que la dirección pertenezca al usuario autenticado
- **ID requerido:** Enviar solo el `addressId` en el body
- **Validación:** El sistema verifica que la dirección exista y pertenezca al usuario
- **Actualización:** Solo se modifica la dirección de envío, no otros datos
- **Respuesta:** Retorna la compra mensual completa con la nueva dirección
- **Permisos:** Solo se puede cambiar la dirección de la propia compra mensual
- **Suscripción:** La dirección se aplica a todos los envíos futuros

## Consideraciones técnicas

- **Middleware:** Aplica `authorize`, `idPathParam`, `monthlyPurchaseValidations.updateShippingAddress`, `monthlyPurchaseExistanceValidation`
- **Validaciones:** Verifica existencia de la compra mensual y validez de la dirección
- **Base de datos:** Actualiza solo la dirección de envío en la compra mensual
- **Permisos:** Verifica que la dirección pertenezca al usuario autenticado
- **DTO:** Usa `monthlyPurchaseToDTO` para transformar la respuesta
- **Transaccional:** Actualiza la dirección y retorna la compra mensual completa
- **Seguridad:** Solo permite cambiar dirección de compras propias del usuario
