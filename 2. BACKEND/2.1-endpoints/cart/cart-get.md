# GET /cart/:id

Obtiene el carrito de compras de un usuario.

---

## Método, ruta y autorización
- **Método:** GET
- **Ruta:** `/cart/:id`
- **Autorización:** Bearer token en headers

---

## Explicación funcional
Permite obtener el carrito de compras de un usuario. Incluye todos los productos agregados, cálculos de subtotal, IVA, costo de envío y total. Si el usuario no tiene carrito, devuelve un carrito vacío.

---

## Parámetros de ruta
- `id` (obligatorio): UUID del usuario.

---

## Ejemplo de respuesta exitosa (200 OK)
```json
{
  "id": "uuid",
  "products": [
    {
      "id": "uuid",
      "product": "Producto 4. Prueba Miguel",
      "urlImage": "https://example.com/image.png",
      "price": 299.99,
      "quantity": 2,
      "total": 599.98
    },
    {
      "id": "uuid",
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

---

## Errores comunes
| Código | Mensaje                        | Causa                                 |
|--------|--------------------------------|---------------------------------------|
| 403    | No autorizado                  | Token inválido o sin permisos         |
| 404    | Usuario no encontrado          | El ID del usuario no existe           |
| 500    | Error interno                  | Error inesperado en el servidor       |

---

## Notas útiles para frontend
- **Carrito vacío:** Si el usuario no tiene carrito, se devuelve un carrito vacío.
- **Cálculos:** Los precios se calculan automáticamente con IVA y envío.
- **Productos:** Cada producto incluye precio unitario y total por cantidad.
- **IVA:** Se calcula según las constantes del sistema (16% por defecto).
- **Envío:** El costo de envío se aplica si hay productos físicos.
- **Persistencia:** El carrito se mantiene entre sesiones del usuario.
- **Stock:** Validar disponibilidad antes de mostrar productos. 