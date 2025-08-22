# GET /orders/:id

## Descripción funcional

Obtiene una orden específica por su ID. Retorna información completa de la orden incluyendo productos, dirección de envío, método de pago, estado de entrega y detalles de logística. Solo se puede consultar la orden si pertenece al usuario autenticado.

## Autorización

Requiere token Bearer válido. Solo usuarios autorizados pueden consultar órdenes que les pertenezcan.

## Parámetros de ruta

- `id` (UUID, requerido): ID único de la orden

### Ejemplo
```
GET /orders/789e0123-e89b-12d3-a456-426614174000
```

## Query parameters

No aplica

## Body del request

No aplica

## Ejemplo de respuesta exitosa (200 OK)

```json
{
  "awsRequestId": "456e7890-e89b-12d3-a456-426614174000",
  "message": "Orden encontrada",
  "data": {
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
      },
      {
        "id": "prod_002",
        "product": "Proteína en polvo",
        "urlImage": "https://example.com/proteina.jpg",
        "price": 450.00,
        "quantity": 1,
        "total": 450.00
      }
    ],
    "subtotal": 1049.98,
    "iva": 167.99,
    "shippingCost": 150.00,
    "total": 1367.97,
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
}
```

## Códigos de estado y errores

| Código | Significado | Descripción |
|--------|-------------|-------------|
| 200 | OK | Orden obtenida exitosamente |
| 400 | Bad Request | ID de orden inválido |
| 401 | Unauthorized | Token faltante o inválido |
| 403 | Forbidden | Sin permisos para consultar esta orden |
| 404 | Not Found | Orden no encontrada |
| 500 | Internal Server Error | Error del servidor |

## Notas útiles para el frontend

- **Propiedad:** Solo se pueden consultar órdenes propias del usuario autenticado
- **Información completa:** Incluye todos los detalles de productos, envío y pagos
- **Estado de entrega:** Mostrar progreso visual del estado actual
- **Tracking:** Incluir enlace de seguimiento si está disponible
- **Productos:** Mostrar lista completa con precios y cantidades
- **Cálculos:** Verificar subtotal, IVA y total calculados
- **Comprobante:** Incluir enlace al comprobante de pago
- **Dirección:** Mostrar dirección completa de envío
- **Método de pago:** Mostrar información del método utilizado

## Consideraciones técnicas

- **Middleware:** Aplica `authorize` e `idPathParam` para validar autenticación
- **Validaciones:** Usa `ownOrderValidation` para verificar propiedad de la orden
- **Base de datos:** Consulta usando `OrdersQueries.getById`
- **DTO:** Usa `orderToDTO` para transformar la respuesta
- **Seguridad:** Solo permite consultar órdenes propias del usuario autenticado
- **Performance:** Optimizado para consultas individuales por ID
- **Relaciones:** Incluye información de usuario, productos y dirección
