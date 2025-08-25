# POST /orders/:id

## Descripción funcional

Crea una nueva orden para el usuario autenticado. Permite crear órdenes con diferentes métodos de pago (OpenPay, MercadoPago) y productos seleccionados. Para cargos mayores a $6,000 MXN se requiere autenticación 3D Secure de OpenPay. El sistema calcula automáticamente subtotal, IVA y costo de envío.

## Autorización

Requiere token Bearer válido. Solo usuarios autorizados pueden crear órdenes.

## Parámetros de ruta

- `id` (UUID, requerido): ID único del usuario (debe coincidir con el usuario autenticado)

### Ejemplo

```
POST /orders/abc123-e89b-12d3-a456-426614174000
```

## Query parameters

- `page` (number, opcional): Número de página para la respuesta (por defecto: 1)
- `limit` (number, opcional): Número de elementos por página (por defecto: 10)

## Body del request

```json
{
  "type": "string",
  "products": [
    {
      "id": "string",
      "quantity": "number"
    }
  ],
  "addressId": "string",
  "paymentMethodId": "string"
}
```

### Ejemplo de body

```json
{
  "type": "openpay",
  "products": [
    {
      "id": "prod_001",
      "quantity": 2
    },
    {
      "id": "prod_002",
      "quantity": 1
    }
  ],
  "addressId": "addr_123",
  "paymentMethodId": "pm_456"
}
```

## Ejemplo de respuesta exitosa (201 Created)

```json
{
  "awsRequestId": "456e7890-e89b-12d3-a456-426614174000",
  "message": "Orden creada exitosamente",
  "data": {
    "orders": [
      {
        "id": "789e0123-e89b-12d3-a456-426614174000",
        "userId": "abc123-e89b-12d3-a456-426614174000",
        "userName": "Carlos García",
        "userEmail": "carlos.garcia@example.com",
        "address": {
          "street": "Av. Principal 123",
          "extNumber": "A",
          "intNumber": "5",
          "neighborhood": "Centro",
          "city": "Ciudad de México",
          "federalEntity": "CDMX",
          "zipCode": "01000",
          "country": "México",
          "refer": "Frente al parque"
        },
        "folio": "ORD-2024-001",
        "paymentMethod": "Tarjeta Visa terminada en 1234",
        "shipment": {},
        "products": [
          {
            "id": "prod_001",
            "product": "Suplemento vitamínico",
            "urlImage": "https://example.com/vitaminas.jpg",
            "price": 299.99,
            "quantity": 2,
            "total": 599.98
          },
          {
            "id": "prod_002",
            "product": "Proteína en polvo",
            "urlImage": "https://example.com/proteina.jpg",
            "price": 450.0,
            "quantity": 1,
            "total": 450.0
          }
        ],
        "subtotal": 1049.98,
        "iva": 167.99,
        "shippingCost": 150.0,
        "total": 1367.97,
        "deliveryStatus": "Pendiente",
        "purchaseDate": "2024-01-15",
        "deliveryEstimateDate": "2024-01-20",
        "deliveryDate": null,
        "receiptUrl": null,
        "type": "openpay",
        "paymentProvider": {
          "id": "ch_123456789",
          "status": "succeeded"
        },
        "balanceAmount": 0
      }
    ],
    "meta": {
      "total": 1,
      "page": 1,
      "limit": 10,
      "totalPages": 1
    },
    "userBalance": 2500.0
  }
}
```

## Códigos de estado y errores

| Código | Significado           | Descripción                                         |
| ------ | --------------------- | --------------------------------------------------- |
| 201    | Created               | Orden creada exitosamente                           |
| 400    | Bad Request           | Datos de orden inválidos o productos no disponibles |
| 401    | Unauthorized          | Token faltante o inválido                           |
| 403    | Forbidden             | Sin permisos para crear órdenes                     |
| 404    | Not Found             | Usuario, dirección o método de pago no encontrado   |
| 500    | Internal Server Error | Error del servidor                                  |

## Notas útiles para el frontend

- **3D Secure:** Para órdenes mayores a $6,000 MXN, redirigir a autenticación 3D Secure
- **Validaciones:** Verificar que el usuario tenga dirección y método de pago válidos
- **Productos:** Enviar array de productos con ID y cantidad
- **Cálculos:** El sistema calcula automáticamente subtotal, IVA y total
- **Balance:** La respuesta incluye el balance actualizado del usuario
- **Folio:** Cada orden recibe un folio único para identificación
- **Estado inicial:** Las órdenes se crean con estado "Pendiente"
- **Métodos de pago:** Soportados: OpenPay y MercadoPago
- **Respuesta:** Incluye la lista completa de órdenes del usuario

## Consideraciones técnicas

- **Middleware:** Aplica `authorize`, `idPathParam`, `userOwnResources`, `ordersValidations.create` y `createOrderValidation`
- **Validaciones:** Verifica que el usuario solo pueda crear órdenes para sí mismo
- **Factory Pattern:** Usa `OrderFactory` para crear órdenes según el tipo especificado
- **3D Secure:** Para cargos grandes, implementa autenticación 3D Secure de OpenPay
- **Base de datos:** Crea la orden y actualiza el balance del usuario
- **DTO:** Usa `getOrdersByUserId` para retornar la lista actualizada
- **Transaccional:** Proceso que incluye creación de orden y actualización de balance
- **Precios:** Calcula automáticamente subtotal, IVA y costo de envío
- **Performance:** Optimizado para creación de órdenes con validaciones completas
