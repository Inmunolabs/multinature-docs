# POST /bookings/liquidate/:id

Realiza el pago de liquidación de una cita específica.

---

## Método, ruta y autorización

- **Método:** POST
- **Ruta:** `/bookings/liquidate/:id`
- **Autorización:** Bearer token en headers

---

## Explicación funcional

Permite al usuario liquidar el pago pendiente de una cita. Se utiliza cuando la cita requiere pago posterior a la creación (por ejemplo, liquidación de saldo o pago total antes de la consulta). El endpoint procesa el pago usando el método seleccionado.

---

## Parámetros de ruta

- `id` (obligatorio): UUID de la cita a liquidar.

---

## Body esperado (JSON)

```json
{
  "type": "openpayCard", // (obligatorio) Tipo de método de pago
  "deviceSessionId": "string", // (obligatorio si el type seleccionado es `openpayCard` (tarjeta)) ID de sesión del dispositivo
  "paymentMethodId": "uuid", // (obligatorio si el type seleccionado es `openpayCard` (tarjeta)) ID del método de pago
  "cvv": "123", // (obligatorio si el type seleccionado es `openpayCard` (tarjeta))
  "description": "Pago de liquidación de consulta" // (opcional) Descripción
}
```

---

## Ejemplo de respuesta exitosa (200 OK)

```json
[
  {
    "id": "booking-uuid",
    "user": {
      "id": "uuid",
      "name": "Samuel Cliente"
    },
    "specialist": {
      "id": "uuid",
      "name": "Ejemplo Prueba de update 2"
    },
    "specialty": "Nutricionista",
    "address": "",
    "videoCallUrl": "https://meet.google.com/xfd-vcfc-pjt",
    "status": "Confirmada",
    "date": "2025-12-09T00:00:00.000Z",
    "startHour": "15:00:00",
    "endHour": "15:30:00",
    "notes": "Todo cool jaja",
    "isPaid": true,
    "advancePayment": {},
    "liquidationPayment": {}
  },
  {
    "id": "booking-uuid",
    "user": {
      "id": "uuid",
      "name": "Samuel Cliente"
    },
    "specialist": {
      "id": "uuid",
      "name": "Samuel Reveles Especialista"
    },
    "specialty": "Nutricionista",
    "address": "",
    "videoCallUrl": "https://meet.google.com/xfd-vcfc-pjt",
    "status": "Confirmada",
    "date": "2025-12-03T00:00:00.000Z",
    "startHour": "18:00:00",
    "endHour": "18:30:00",
    "notes": "Cita agendada por el cliente",
    "isPaid": false,
    "advancePayment": {
      "id": "advancePayment-uuid",
      "iva": 39.2,
      "subtotal": 205.8,
      "total": 245,
      "type": "openpayStore",
      "name": "Anticipo de consulta",
      "status": "Confirmando el Pago",
      "paymentMethod": "https://multi-store-order-dev.s3.us-east-1.amazonaws.com/payment-receipt/bookings/f0d8e32b-e4bb-4e08-ae48-6c9b96a3a98f/1010102061935396.pdf",
      "folio": "202507080011",
      "purchaseDate": "2025-07-08"
    },
    "liquidationPayment": {
      "id": "liquidationPayment-uuid",
      "iva": 24.8,
      "subtotal": 130.2,
      "total": 155,
      "type": "openpayStore",
      "status": "Confirmando el Pago",
      "paymentMethod": "https://multi-store-order-dev.s3.us-east-1.amazonaws.com/payment-receipt/bookings/f0d8e32b-e4bb-4e08-ae48-6c9b96a3a98f/1010102061935396.pdf",
      "updatedAt": "2025-07-09",
      "createdAt": "2025-07-09"
    }
  }
]
```

---

## Errores comunes

| Código | Mensaje                 | Causa                                |
| ------ | ----------------------- | ------------------------------------ |
| 400    | Datos de pago inválidos | Faltan campos o formato incorrecto   |
| 403    | No autorizado           | Token inválido o sin permisos        |
| 404    | Cita no encontrada      | El ID no existe o ya fue pagada      |
| 402    | Pago rechazado          | Fondos insuficientes o error de pago |
| 500    | Error interno           | Error inesperado en el servidor      |

---

## Notas útiles para frontend

- Si se quiere pagar con tarjeta validar que el usuario tenga métodos de pago registrados antes de llamar este endpoint.
- Mostrar mensajes claros de éxito o error tras el pago.
- Actualizar el estado de la cita en la UI tras el pago exitoso.
