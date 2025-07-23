# GET /bookings/user/:userId

Obtiene todas las citas asociadas a un usuario (paciente o especialista).

---

## Método, ruta y autorización

- **Método:** GET
- **Ruta:** `/bookings/user/:userId?startDate=YYYY-MM-DD`
- **Autorización:** Bearer token en headers

---

## Explicación funcional

Permite al frontend obtener el historial o próximas citas de un usuario, filtrando opcionalmente por fecha de inicio. Útil para mostrar la agenda o historial de citas del usuario.

---

## Parámetros de ruta y query

- `userId` (obligatorio): UUID del usuario (paciente).
- `startDate` (opcional, query): Fecha desde la cual buscar citas (formato YYYY-MM-DD).

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

| Código | Mensaje               | Causa                           |
| ------ | --------------------- | ------------------------------- |
| 403    | No autorizado         | Token inválido o sin permisos   |
| 404    | Usuario no encontrado | El ID no existe                 |
| 500    | Error interno         | Error inesperado en el servidor |

---

## Notas útiles para frontend

- Usar el parámetro `startDate` para paginar o filtrar resultados.
- Mostrar el estado y pago de cada cita en la lista.
- Permitir al usuario seleccionar una cita para ver el detalle.
