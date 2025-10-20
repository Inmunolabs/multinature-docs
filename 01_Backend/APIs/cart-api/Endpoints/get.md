# GET /cart/:id

## Descripción funcional

Obtiene el carrito de compras de un usuario. Incluye todos los productos agregados, cálculos de subtotal, IVA, costo de envío y total. Si el usuario no tiene carrito, devuelve un carrito vacío.

## Autorización

Requiere token Bearer válido. Solo usuarios autorizados pueden acceder a su propio carrito.

## Parámetros de ruta

- `id` (UUID, requerido): ID único del usuario

### Ejemplo
```
GET /cart/123e4567-e89b-12d3-a456-426614174000
```

## Query parameters

No aplica

## Body del request

No aplica

## Ejemplo de respuesta exitosa (200 OK)

```json
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "products": [
    {
      "id": "456e7890-e89b-12d3-a456-426614174000",
      "product": "Producto 4. Prueba Miguel",
      "urlImage": "https://example.com/image.png",
      "price": 299.99,
      "quantity": 2,
      "total": 599.98
    },
    {
      "id": "789e0123-e89b-12d3-a456-426614174000",
      "product": "Complejo B + Rutina",
      "urlImage": "https://example.com/image2.png",
      "price": 150.00,
      "quantity": 1,
      "total": 150.00
    }
  ],
  "subtotal": 682.71,
  "ivaPorcentaje": 0.16,
  "iva": 109.23,
  "shippingCost": 150.00,
  "total": 942.94
}
```

## Códigos de estado y errores

| Código | Significado | Descripción |
|--------|-------------|-------------|
| 200 | OK | Carrito obtenido exitosamente |
| 401 | Unauthorized | Token faltante o inválido |
| 403 | Forbidden | Sin permisos para acceder a este carrito |
| 404 | Not Found | Usuario no encontrado |
| 500 | Internal Server Error | Error del servidor |

## Notas útiles para el frontend

- **Carrito vacío:** Si el usuario no tiene carrito, se devuelve un carrito vacío
- **Cálculos:** Los precios se calculan automáticamente con IVA y envío
- **Productos:** Cada producto incluye precio unitario y total por cantidad
- **IVA:** Se calcula según las constantes del sistema (16% por defecto)
- **Envío:** El costo de envío se aplica si hay productos físicos
- **Persistencia:** El carrito se mantiene entre sesiones del usuario
- **Stock:** Validar disponibilidad antes de mostrar productos
- **Permisos:** Solo se puede acceder al carrito propio
- **Actualización:** Los precios se mantienen al momento de agregar al carrito

## Consideraciones técnicas

- **Middleware:** Aplica `userOwnResources` para validar que el usuario solo acceda a su propio carrito
- **DTO:** La respuesta se transforma usando `cartToDTO()` para consistencia con el frontend
- **Constantes:** Usa `dbConstants` para IVA y costo de envío
- **Base de datos:** Consulta usando `CartsQueries.listByUserId`
- **Cálculos:** Los cálculos de IVA y total se realizan automáticamente en el backend
