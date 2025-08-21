# PATCH /cart/:id

## Descripción funcional

Actualiza el carrito de compras de un usuario. Permite agregar productos, modificar cantidades o eliminar productos del carrito. Si se envía cantidad 0, el producto se elimina del carrito. Si el producto no existe en el carrito y la cantidad es mayor a 0, se agrega.

## Autorización

Requiere token Bearer válido. Solo usuarios autorizados pueden actualizar su propio carrito.

## Parámetros de ruta

- `id` (UUID, requerido): ID único del usuario

### Ejemplo
```
PATCH /cart/123e4567-e89b-12d3-a456-426614174000
```

## Query parameters

No aplica

## Body del request

```json
{
  "id": "string",
  "quantity": "number"
}
```

### Ejemplo de body

```json
{
  "id": "456e7890-e89b-12d3-a456-426614174000",
  "quantity": 2
}
```

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
    }
  ],
  "subtotal": 517.22,
  "ivaPorcentaje": 0.16,
  "iva": 82.76,
  "shippingCost": 150.00,
  "total": 750.00
}
```

## Códigos de estado y errores

| Código | Significado | Descripción |
|--------|-------------|-------------|
| 200 | OK | Carrito actualizado exitosamente |
| 400 | Bad Request | Datos de validación incorrectos o campos faltantes |
| 401 | Unauthorized | Token faltante o inválido |
| 403 | Forbidden | Sin permisos para actualizar este carrito |
| 404 | Not Found | Usuario no encontrado |
| 500 | Internal Server Error | Error del servidor |

## Notas útiles para el frontend

- **Agregar producto:** Enviar cantidad > 0 para productos nuevos
- **Modificar cantidad:** Enviar nueva cantidad para productos existentes
- **Eliminar producto:** Enviar cantidad = 0 para eliminar productos
- **Validación:** El ID del producto debe ser un UUID válido
- **Cantidad:** La cantidad debe ser un número entero mayor o igual a 0
- **Respuesta:** Se retorna el carrito completo actualizado
- **Cálculos:** Los precios se recalculan automáticamente
- **Stock:** Verificar disponibilidad antes de agregar productos

## Consideraciones técnicas

- **Middleware:** Aplica `userOwnResources` para validar permisos
- **Validaciones:** Usa `cartValidations.upsertCart` para validar campos
- **Lógica de negocio:** Si cantidad = 0, elimina el producto; si > 0, agrega/actualiza
- **Base de datos:** Usa `CartsQueries.getByUserIdAndProductId` para verificar existencia
- **Transaccional:** Las operaciones son atómicas para mantener consistencia
- **DTO:** Retorna el carrito completo transformado con `cartToDTO()`
- **Constantes:** Usa `commonsConstants.ZERO` para comparaciones de cantidad
