# POST /orders/:id

Crea una nueva orden para un usuario.

---

## Método, ruta y autorización
- **Método:** POST
- **Ruta:** `/orders/:id`
- **Autorización:** Bearer token en headers

---

## Explicación funcional
Permite crear una nueva orden para un usuario. La orden puede incluir productos físicos o servicios. Se procesa el pago según el método especificado y se actualiza el stock de productos. Para cargos mayores a $6,000 MXN se requiere 3D Secure de OpenPay.

---

## Parámetros de ruta
- `id` (obligatorio): UUID del usuario que crea la orden.

---

## Body esperado (JSON)
```json
{
  "idAddress": "426aedd9-0d30-4282-8e41-d64bba433553",    // (obligatorio) ID de la dirección de envío
  "paymentMethodId": "7900836f-a416-4ac0-a839-9ab4bb15cc96", // (obligatorio) ID del método de pago
  "cvv": "333",                                             // (obligatorio) Código de seguridad
  "type": "openpayCard",                                    // (obligatorio) Tipo de método de pago
  "deviceSessionId": "YYXX1Ku4zPv0e1i07jmfryyMr10PU0ja",   // (opcional) ID de sesión del dispositivo
  "products": [                                             // (obligatorio) Array de productos
    {
      "id": "6ce7ac2a-fe27-47cd-a696-8bdf1a9a1b3f",       // (obligatorio) ID del producto
      "quantity": 5                                         // (obligatorio) Cantidad
    }
  ]
}
```

---

## Ejemplo de respuesta exitosa (201 Created)
```json
{
  "orders": [
    {
      "id": "uuid",
      "userId": "uuid",
      "userName": "Juan Pérez",
      "userEmail": "juan@ejemplo.com",
      "address": {
        "street": "Calle de Miguel",
        "extNumber": "456",
        "intNumber": "02",
        "neighborhood": "El Secreto",
        "city": "Zapopan",
        "federalEntity": "Jalisco",
        "zipCode": "45138",
        "country": "México",
        "refer": "Referencias"
      },
      "folio": "ORD-2024-001",
      "paymentMethod": "Visa ****1234",
      "shipment": {
        "trackingNumber": "TRK123456789",
        "carrier": "FedEx",
        "status": "En tránsito"
      },
      "products": [
        {
          "id": "uuid",
          "product": "Producto 4. Prueba Miguel",
          "urlImage": "https://example.com/image.png",
          "price": 299.99,
          "quantity": 5,
          "total": 1499.95
        }
      ],
      "subtotal": 1499.95,
      "iva": 239.99,
      "shippingCost": 150.00,
      "total": 1889.94,
      "deliveryStatus": "En proceso",
      "purchaseDate": "2024-01-15T10:30:00Z",
      "deliveryEstimateDate": "2024-01-20T10:30:00Z",
      "deliveryDate": null,
      "receiptUrl": "https://example.com/receipt.pdf",
      "type": "openpayCard",
      "paymentProvider": {
        "transactionId": "txn_123456789",
        "status": "approved"
      }
    }
  ],
  "meta": {
    "currentPage": 1,
    "totalPages": 1,
    "totalItems": 1,
    "itemsPerPage": 10
  }
}
```

---

## Errores comunes
| Código | Mensaje                        | Causa                                 |
|--------|--------------------------------|---------------------------------------|
| 400    | Datos inválidos                | Faltan campos obligatorios            |
| 400    | Stock insuficiente             | No hay suficiente stock del producto  |
| 400    | Dirección inválida             | La dirección no existe o es inválida  |
| 400    | Método de pago inválido        | El método de pago no existe           |
| 403    | No autorizado                  | Token inválido o sin permisos         |
| 404    | Usuario no encontrado          | El ID del usuario no existe           |
| 500    | Error interno                  | Error inesperado en el servidor       |

---

## Notas útiles para frontend
- **3D Secure:** Para cargos > $6,000 MXN se requiere autenticación 3D Secure.
- **Stock:** Validar disponibilidad antes de crear la orden.
- **Dirección:** La dirección debe ser válida y del usuario.
- **Pago:** El método de pago debe estar activo y pertenecer al usuario.
- **Productos:** Los productos deben existir y estar activos.
- **IVA:** Se calcula automáticamente según las constantes del sistema.
- **Envío:** El costo de envío se calcula según la dirección y productos.
- **Seguimiento:** Usar el folio para seguimiento de la orden. 