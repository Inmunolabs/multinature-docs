# GET /recommendations/user/:id

## Descripción funcional

Obtiene las recomendaciones activas de un usuario. Lista todas las recomendaciones de productos que están activas para un usuario específico, incluyendo información del especialista que las creó, productos recomendados y cálculos de precios.

## Autorización

Requiere token Bearer válido. Solo usuarios autorizados pueden consultar sus propias recomendaciones.

## Parámetros de ruta

- `id` (UUID, requerido): ID único del usuario

### Ejemplo
```
GET /recommendations/user/123e4567-e89b-12d3-a456-426614174000
```

## Query parameters

No aplica

## Body del request

No aplica

## Ejemplo de respuesta exitosa (200 OK)

```json
[
  {
    "id": "456e7890-e89b-12d3-a456-426614174000",
    "userId": "123e4567-e89b-12d3-a456-426614174000",
    "specialistId": "789e0123-e89b-12d3-a456-426614174000",
    "patientName": "Juan Pérez",
    "specialistName": "Dra. María López",
    "specialties": "Nutrición, Medicina General",
    "products": [
      {
        "id": "abc123-e89b-12d3-a456-426614174000",
        "product": "Complejo B + Rutina",
        "urlImage": "https://example.com/image.png",
        "price": 150.00,
        "quantity": 1,
        "total": 150.00
      }
    ],
    "subtotal": 129.31,
    "ivaPorcentaje": 0.16,
    "iva": 20.69,
    "shippingCost": 150.00,
    "total": 300.00,
    "createdAt": "2025-01-15T10:30:00.000Z",
    "updatedAt": "2025-01-15T10:30:00.000Z"
  }
]
```

## Códigos de estado y errores

| Código | Significado | Descripción |
|--------|-------------|-------------|
| 200 | OK | Recomendaciones obtenidas exitosamente |
| 401 | Unauthorized | Token faltante o inválido |
| 403 | Forbidden | Sin permisos para consultar estas recomendaciones |
| 404 | Not Found | Usuario no encontrado |
| 500 | Internal Server Error | Error del servidor |

## Notas útiles para el frontend

- **Recomendaciones activas:** Solo se muestran recomendaciones que no han expirado (menos de 7 días)
- **Productos:** Cada recomendación incluye lista de productos con precios y cantidades
- **Especialista:** Se muestra información del especialista que creó la recomendación
- **Cálculos:** Los precios incluyen IVA y costo de envío calculados automáticamente
- **Fechas:** Las recomendaciones tienen fechas de creación y actualización
- **Permisos:** Solo se pueden ver las recomendaciones propias
- **Validez:** Las recomendaciones expiran después de 7 días

## Consideraciones técnicas

- **Middleware:** Aplica `userOwnResources` para validar que el usuario solo acceda a sus propias recomendaciones
- **DTO:** La respuesta se transforma usando `recommendationsToDTO()` para consistencia
- **Filtrado:** Solo retorna recomendaciones activas (menos de 7 días de antigüedad)
- **Base de datos:** Consulta usando `RecommendationsQueries.getActiveByUserId`
- **Constantes:** Usa `dbConstants` para IVA y costo de envío
- **Cálculos:** Los cálculos de precios se realizan automáticamente en el backend
