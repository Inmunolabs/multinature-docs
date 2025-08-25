# GET /orders/user/:id

## Descripción funcional

Lista todas las órdenes de un usuario específico con paginación. Permite consultar el historial completo de órdenes del usuario autenticado, incluyendo información detallada de productos, pagos, envíos y estados de entrega.

## Autorización

Requiere token Bearer válido. Solo usuarios autorizados pueden consultar sus propias órdenes.

## Parámetros de ruta

- `id` (UUID, requerido): ID único del usuario

### Ejemplo

```
GET /orders/user/abc123-e89b-12d3-a456-426614174000
```

## Query parameters

- `page` (number, opcional): Número de página para paginación (por defecto: 1)
- `limit` (number, opcional): Número de elementos por página (por defecto: 10)

### Ejemplo

```
GET /orders/user/abc123-e89b-12d3-a456-426614174000?page=1&limit=20
```

## Body del request

No aplica

## Ejemplo de respuesta exitosa (200 OK)

```json
{
  "awsRequestId": "456e7890-e89b-12d3-a456-426614174000",
  "message": "Órdenes del usuario encontradas",
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
        "shipment": {
          "id": "ship_123",
          "company": "FedEx",
          "trackingUrl": "https://fedex.com/track/123456789"
        },
        "products": [
          {
            "id": "prod_001",
            "product": "Suplemento vitamínico",
            "urlImage": "https://example.com/vitaminas.jpg",
            "price": 299.99,
            "quantity": 2,
            "total": 599.98
          }
        ],
        "subtotal": 599.98,
        "iva": 95.99,
        "shippingCost": 150.0,
        "total": 845.97,
        "deliveryStatus": "En camino",
        "purchaseDate": "2024-01-15",
        "deliveryEstimateDate": "2024-01-20",
        "deliveryDate": null,
        "receiptUrl": "https://example.com/receipts/123.pdf",
        "type": "openpay",
        "paymentProvider": {
          "id": "ch_123456789",
          "status": "succeeded"
        },
        "balanceAmount": 0
      },
      {
        "id": "def456-e89b-12d3-a456-426614174000",
        "userId": "abc123-e89b-12d3-a456-426614174000",
        "userName": "Carlos García",
        "userEmail": "carlos.garcia@example.com",
        "address": {
          "street": "Calle Secundaria 456",
          "extNumber": "B",
          "intNumber": "10",
          "neighborhood": "Norte",
          "city": "Guadalajara",
          "federalEntity": "Jalisco",
          "zipCode": "44100",
          "country": "México",
          "refer": "Cerca del centro comercial"
        },
        "folio": "ORD-2024-002",
        "paymentMethod": "Tarjeta Mastercard terminada en 5678",
        "shipment": {
          "id": "ship_456",
          "company": "DHL",
          "trackingUrl": "https://dhl.com/track/987654321"
        },
        "products": [
          {
            "id": "prod_002",
            "product": "Proteína en polvo",
            "urlImage": "https://example.com/proteina.jpg",
            "price": 450.0,
            "quantity": 1,
            "total": 450.0
          }
        ],
        "subtotal": 450.0,
        "iva": 72.0,
        "shippingCost": 150.0,
        "total": 672.0,
        "deliveryStatus": "Entregada",
        "purchaseDate": "2024-01-10",
        "deliveryEstimateDate": "2024-01-15",
        "deliveryDate": "2024-01-14",
        "receiptUrl": "https://example.com/receipts/456.pdf",
        "type": "mercadopago",
        "paymentProvider": {
          "id": "mp_987654321",
          "status": "approved"
        },
        "balanceAmount": 0
      }
    ],
    "meta": {
      "total": 25,
      "page": 1,
      "limit": 20,
      "totalPages": 2
    }
  }
}
```

## Códigos de estado y errores

| Código | Significado           | Descripción                                         |
| ------ | --------------------- | --------------------------------------------------- |
| 200    | OK                    | Órdenes del usuario obtenidas exitosamente          |
| 400    | Bad Request           | ID de usuario inválido                              |
| 401    | Unauthorized          | Token faltante o inválido                           |
| 403    | Forbidden             | Sin permisos para consultar órdenes de este usuario |
| 500    | Internal Server Error | Error del servidor                                  |

## Notas útiles para el frontend

- **Usuario único:** Solo se pueden consultar las órdenes del usuario autenticado
- **Paginación:** Implementar paginación para usuarios con muchas órdenes
- **Historial completo:** Incluye todas las órdenes del usuario con diferentes estados
- **Estados de entrega:** Mostrar progreso visual del estado de cada orden
- **Folios únicos:** Usar folios para identificación amigable de órdenes
- **Tracking:** Incluir enlaces de seguimiento cuando estén disponibles
- **Métodos de pago:** Mostrar información del método de pago utilizado
- **Comprobantes:** Incluir enlaces a comprobantes de pago
- **Direcciones:** Mostrar dirección completa de envío de cada orden

## Consideraciones técnicas

- **Middleware:** Aplica `authorize`, `idPathParam` y `userOwnResources`
- **Validaciones:** Verifica que el usuario solo pueda acceder a sus propias órdenes
- **Base de datos:** Consulta usando `OrdersQueries.listByUserId` y `OrdersQueries.countByUserId`
- **DTO:** Usa `ordersToDTO` para transformar la respuesta
- **Paginación:** Implementa paginación estándar con metadata
- **Seguridad:** Solo permite consultar órdenes propias del usuario autenticado
- **Performance:** Optimizado para consultas de órdenes por usuario con paginación
- **Relaciones:** Incluye información completa de usuario, productos y dirección
