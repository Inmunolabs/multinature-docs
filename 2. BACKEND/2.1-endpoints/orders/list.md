# GET /orders

## Descripción funcional

Lista todas las órdenes del sistema con paginación y filtros de fecha. Permite consultar el historial completo de órdenes con información detallada de productos, pagos, envíos y estados de entrega. Por defecto filtra por el último trimestre.

## Autorización

Requiere token Bearer válido. Solo usuarios autorizados pueden consultar la lista de órdenes.

## Parámetros de ruta

No aplica

## Query parameters

- `startDate` (string, opcional): Fecha de inicio para filtrar (formato: YYYY-MM-DD)
- `endDate` (string, opcional): Fecha de fin para filtrar (formato: YYYY-MM-DD)
- `page` (number, opcional): Número de página para paginación (por defecto: 1)
- `limit` (number, opcional): Número de elementos por página (por defecto: 10)

### Ejemplo
```
GET /orders?startDate=2024-01-01&endDate=2024-03-31&page=1&limit=20
```

## Body del request

No aplica

## Ejemplo de respuesta exitosa (200 OK)

```json
{
  "awsRequestId": "456e7890-e89b-12d3-a456-426614174000",
  "message": "Órdenes encontradas",
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
      "deliveryDate": null,
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
    "total": 150,
    "page": 1,
    "limit": 20,
    "totalPages": 8
  }
}
```

## Códigos de estado y errores

| Código | Significado | Descripción |
|--------|-------------|-------------|
| 200 | OK | Órdenes obtenidas exitosamente |
| 400 | Bad Request | Parámetros de fecha inválidos |
| 401 | Unauthorized | Token faltante o inválido |
| 403 | Forbidden | Sin permisos para consultar órdenes |
| 500 | Internal Server Error | Error del servidor |

## Notas útiles para el frontend

- **Filtros de fecha:** Por defecto muestra el último trimestre si no se especifican fechas
- **Paginación:** Implementar paginación para listas largas de órdenes
- **Estados de entrega:** Mostrar indicadores visuales del estado de cada orden
- **Información completa:** Cada orden incluye productos, dirección, envío y pagos
- **Folios únicos:** Usar folios para identificación amigable de órdenes
- **Tracking:** Incluir enlaces de seguimiento cuando estén disponibles
- **Métodos de pago:** Mostrar información del método de pago utilizado
- **Comprobantes:** Incluir enlaces a comprobantes de pago

## Consideraciones técnicas

- **Middleware:** Aplica `authorize` para validar autenticación
- **Validaciones:** Usa `queryDates` y `validateDateFilter` con fecha por defecto del último trimestre
- **Base de datos:** Consulta usando `OrdersQueries.list` y `OrdersQueries.count`
- **DTO:** Usa `ordersToDTO` para transformar la respuesta
- **Paginación:** Implementa paginación estándar con metadata
- **Filtros:** Filtra por rango de fechas especificado
- **Performance:** Optimizado para consultas con paginación y filtros de fecha
