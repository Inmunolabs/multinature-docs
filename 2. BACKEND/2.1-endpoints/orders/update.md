# PATCH /orders/:id

## Descripción funcional

Actualiza una orden existente del usuario autenticado. Permite modificar información de envío, estado de entrega y fecha de entrega. Cuando se actualiza el estado a "En camino", el sistema envía automáticamente una notificación por email al usuario con los detalles del envío.

## Autorización

Requiere token Bearer válido. Solo usuarios autorizados pueden actualizar sus propias órdenes.

## Parámetros de ruta

- `id` (UUID, requerido): ID único de la orden

### Ejemplo
```
PATCH /orders/789e0123-e89b-12d3-a456-426614174000
```

## Query parameters

- `page` (number, opcional): Número de página para la respuesta (por defecto: 1)
- `limit` (number, opcional): Número de elementos por página (por defecto: 10)

## Body del request

```json
{
  "shipment": {
    "id": "string",
    "company": "string",
    "trackingUrl": "string"
  },
  "deliveryStatus": "string",
  "deliveryDate": "string"
}
```

### Ejemplo de body

```json
{
  "shipment": {
    "id": "ship_123",
    "company": "FedEx",
    "trackingUrl": "https://fedex.com/track/123456789"
  },
  "deliveryStatus": "En camino",
  "deliveryDate": "2024-01-20"
}
```

## Ejemplo de respuesta exitosa (200 OK)

```json
{
  "awsRequestId": "456e7890-e89b-12d3-a456-426614174000",
  "message": "Orden actualizada exitosamente",
  "data": [
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
      "shippingCost": 150.00,
      "total": 845.97,
      "deliveryStatus": "En camino",
      "purchaseDate": "2024-01-15",
      "deliveryEstimateDate": "2024-01-20",
      "deliveryDate": "2024-01-20",
      "receiptUrl": "https://example.com/receipts/123.pdf",
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
  }
}
```

## Códigos de estado y errores

| Código | Significado | Descripción |
|--------|-------------|-------------|
| 200 | OK | Orden actualizada exitosamente |
| 400 | Bad Request | Datos de actualización inválidos |
| 401 | Unauthorized | Token faltante o inválido |
| 403 | Forbidden | Sin permisos para actualizar esta orden |
| 404 | Not Found | Orden no encontrada |
| 500 | Internal Server Error | Error del servidor |

## Notas útiles para el frontend

- **Propiedad:** Solo se pueden actualizar órdenes propias del usuario autenticado
- **Notificaciones:** Al cambiar estado a "En camino", se envía email automáticamente
- **Envío:** Incluir información completa de la empresa de envío y tracking
- **Estados:** Los estados de entrega se pueden actualizar según el flujo del negocio
- **Fechas:** La fecha de entrega se puede establecer manualmente
- **Respuesta:** Retorna la lista completa de órdenes del usuario actualizada
- **Paginación:** La respuesta incluye metadata de paginación
- **Tracking:** Incluir URL de seguimiento para facilitar el tracking

## Consideraciones técnicas

- **Middleware:** Aplica `authorize`, `idPathParam`, `userOwnResources` y `ordersValidations.update`
- **Validaciones:** Verifica que el usuario solo pueda actualizar sus propias órdenes
- **Base de datos:** Actualiza la orden usando `OrdersQueries.update`
- **Notificaciones:** Envía email automático cuando el estado cambia a "En camino"
- **DTO:** Usa `getOrdersByUserId` para retornar la lista actualizada
- **Envío:** Actualiza información de envío, estado y fecha de entrega
- **Email:** Usa `EmailsNotifications.EmailNotificationStrategy` para notificaciones
- **Paginación:** Incluye metadata de paginación en la respuesta
- **Performance:** Optimizado para actualizaciones con notificaciones automáticas
