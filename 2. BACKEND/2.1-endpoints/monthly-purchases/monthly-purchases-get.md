# GET /monthly-purchase/:id

Obtiene la compra mensual de un usuario.

---

## Método, ruta y autorización
- **Método:** GET
- **Ruta:** `/monthly-purchase/:id`
- **Autorización:** Bearer token en headers

---

## Explicación funcional
Permite obtener la compra mensual activa de un usuario. Incluye todos los productos suscritos, cálculos de precios, dirección de envío y información de la suscripción. Si el usuario no tiene una compra mensual activa, devuelve un objeto vacío.

---

## Parámetros de ruta
- `id` (obligatorio): UUID del usuario.

---

## Ejemplo de respuesta exitosa (200 OK)
```json
{
  "userId": "uuid",
  "products": [
    {
      "id": "uuid",
      "product": "Complejo B + Rutina",
      "urlImage": "https://example.com/image.png",
      "price": 299.99,
      "quantity": 1,
      "total": 299.99
    },
    {
      "id": "uuid",
      "product": "Omega 3 Premium",
      "urlImage": "https://example.com/image2.png",
      "price": 450.00,
      "quantity": 2,
      "total": 900.00
    }
  ],
  "subtotal": 1034.48,
  "ivaPorcentaje": 16,
  "iva": 165.52,
  "shippingCost": 150.00,
  "total": 1350.00,
  "shippingAddress": {
    "street": "Calle de Miguel",
    "extNumber": "456",
    "neighborhood": "El Secreto",
    "city": "Zapopan",
    "federalEntity": "Jalisco",
    "zipCode": "45138",
    "country": "México"
  },
  "openpayPlanId": "plan_openpay_id",
  "openpaySubscriptionId": "subscription_openpay_id",
  "nextPayDate": "2024-02-15",
  "openpayCardId": "card_openpay_id",
  "isCancelled": false
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
- **Suscripción activa:** Si el usuario no tiene suscripción activa, se devuelve un objeto vacío.
- **Productos:** Los productos incluyen precio unitario y total por cantidad.
- **Cálculos:** Los precios se calculan con IVA y costo de envío.
- **Envío:** La dirección de envío se usa para productos físicos.
- **Próximo pago:** La fecha del próximo pago se calcula automáticamente.
- **Cancelación:** El campo `isCancelled` indica si la suscripción está cancelada.
- **OpenPay:** Los IDs de OpenPay se usan para gestionar la suscripción.
- **Renovación:** La suscripción se renueva automáticamente según la frecuencia.
- **Productos:** Validar disponibilidad de productos antes de mostrar. 