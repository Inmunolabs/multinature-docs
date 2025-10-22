# PATCH /bookings/:id

Actualiza los datos de una cita existente.

---

## Método, ruta y autorización

- **Método:** PATCH
- **Ruta:** `/bookings/:id`
- **Autorización:** Bearer token en headers

---

## Explicación funcional

Permite modificar la fecha, hora, notas o enlace de videollamada de una cita ya creada. Solo usuarios autorizados pueden actualizar la cita. Es útil para reagendar o actualizar detalles antes de la consulta. No se puede editar una cita ya cancelada o finalizada.

---

## Parámetros de ruta

- `id` (obligatorio): UUID de la cita a actualizar.

---

## Body esperado (JSON)

```json
{
  "date": "2025-12-09", // (opcional) Nueva fecha de la cita (formato ISO 8601 y ser una fecha futura)
  "startHour": "15:00", // (opcional) Nueva hora de inicio (formato HH:MM)
  "endHour": "15:30", // (opcional) Nueva hora de fin (formato HH:MM y debe ser mayor que startHour)
  "notes": "Todo cool", // (opcional) Nuevas notas para el especialista
  "videoCallUrl": "https://zoom.us/j/987654321", // (opcional) Nuevo enlace de videollamada
  "addressId": "address-uuid", // (opcional) Nueva dirección del consultorio de atención
  "status": "Cancelada" // (opcional) Nuevo estatus de la cita. Si se cambia el status a "Cancelada", debe incluirse la razón de cancelación en notes.
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

| Código | Mensaje            | Causa                                 |
| ------ | ------------------ | ------------------------------------- |
| 400    | Datos inválidos    | Formato incorrecto o campos faltantes |
| 403    | No autorizado      | Token inválido o sin permisos         |
| 404    | Cita no encontrada | El ID no existe o fue eliminada       |
| 500    | Error interno      | Error inesperado en el servidor       |

---

## Notas útiles para frontend

- Solo usuarios autorizados pueden actualizar la cita.
- Validar que los nuevos horarios no se crucen con otras citas.
- Si se actualiza el enlace de videollamada, mostrar el nuevo enlace en la UI.
