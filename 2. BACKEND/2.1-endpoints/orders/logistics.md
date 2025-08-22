# GET /orders/logistics

## Descripción funcional

Lista todas las órdenes del sistema con información específica para logística y seguimiento de envíos. Incluye datos relevantes para el equipo de logística como estado de entrega, información de envío, dirección del usuario y fechas estimadas. Por defecto filtra por el último trimestre.

## Autorización

Requiere token Bearer válido. Solo usuarios autorizados pueden consultar la información de logística.

## Parámetros de ruta

No aplica

## Query parameters

- `startDate` (string, opcional): Fecha de inicio para filtrar (formato: YYYY-MM-DD)
- `endDate` (string, opcional): Fecha de fin para filtrar (formato: YYYY-MM-DD)
- `page` (number, opcional): Número de página para paginación (por defecto: 1)
- `limit` (number, opcional): Número de elementos por página (por defecto: 10)

### Ejemplo
```
GET /orders/logistics?startDate=2024-01-01&endDate=2024-03-31&page=1&limit=20
```

## Body del request

No aplica

## Ejemplo de respuesta exitosa (200 OK)

```json
{
  "awsRequestId": "456e7890-e89b-12d3-a456-426614174000",
  "message": "Información de logística obtenida",
  "data": [
    {
      "id": "789e0123-e89b-12d3-a456-426614174000",
      "folio": "ORD-2024-001",
      "deliveryStatus": "En camino",
      "purchaseDate": "2024-01-15",
      "shipment": {
        "id": "ship_123",
        "company": "FedEx",
        "trackingUrl": "https://fedex.com/track/123456789"
      },
      "description": "Suplemento vitamínico x2, Proteína en polvo x1",
      "user": {
        "id": "abc123-e89b-12d3-a456-426614174000",
        "name": "Carlos García",
        "phone": "+52 55 1234 5678",
        "email": "carlos.garcia@example.com"
      },
      "address": {
        "streetAndNumber": "Av. Principal 123, A, 5",
        "neighborhood": "Centro",
        "city": "Ciudad de México",
        "zipCode": "01000",
        "federalEntity": "CDMX",
        "refer": "Frente al parque"
      }
    },
    {
      "id": "def456-e89b-12d3-a456-426614174000",
      "folio": "ORD-2024-002",
      "deliveryStatus": "Pendiente",
      "purchaseDate": "2024-01-16",
      "shipment": {},
      "description": "Omega 3 x3, Vitamina D x1",
      "user": {
        "id": "ghi789-e89b-12d3-a456-426614174000",
        "name": "Ana Martínez",
        "phone": "+52 33 9876 5432",
        "email": "ana.martinez@example.com"
      },
      "address": {
        "streetAndNumber": "Calle Secundaria 456, B, 10",
        "neighborhood": "Norte",
        "city": "Guadalajara",
        "zipCode": "44100",
        "federalEntity": "Jalisco",
        "refer": "Cerca del centro comercial"
      }
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
| 200 | OK | Información de logística obtenida exitosamente |
| 400 | Bad Request | Parámetros de fecha inválidos |
| 401 | Unauthorized | Token faltante o inválido |
| 403 | Forbidden | Sin permisos para consultar información de logística |
| 500 | Internal Server Error | Error del servidor |

## Notas útiles para el frontend

- **Vista logística:** Optimizada para mostrar información relevante para el equipo de logística
- **Estados de entrega:** Mostrar claramente el estado actual de cada orden
- **Información de contacto:** Incluir datos del usuario para coordinación de entrega
- **Direcciones:** Formato simplificado para facilitar la navegación
- **Tracking:** Incluir enlaces de seguimiento cuando estén disponibles
- **Descripción de productos:** Resumen de productos para identificación rápida
- **Filtros de fecha:** Por defecto muestra el último trimestre
- **Paginación:** Implementar paginación para listas largas

## Consideraciones técnicas

- **Middleware:** Aplica `authorize` para validar autenticación
- **Validaciones:** Usa `queryDates` y `validateDateFilter` con fecha por defecto del último trimestre
- **Base de datos:** Consulta usando `OrdersQueries.list` con filtros de fecha
- **DTO:** Usa `logisticsToDTO` para transformar la respuesta específica para logística
- **Paginación:** Implementa paginación estándar con metadata
- **Filtros:** Filtra por rango de fechas especificado
- **Performance:** Optimizado para consultas de logística con información esencial
- **Formato:** Respuesta simplificada enfocada en necesidades de logística
