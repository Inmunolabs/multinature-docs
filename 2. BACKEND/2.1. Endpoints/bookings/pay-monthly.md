# POST /monthly-services/

Realiza el pago de una mensualidad de servicios entre un usuario y un especialista.

---

## Método, ruta y autorización

- **Método:** POST
- **Ruta:** `/monthly-services/`
- **Autorización:** Bearer token en headers

---

## Explicación funcional

Permite a un usuario pagar una mensualidad para acceder a servicios recurrentes con un especialista, algo así como una suscripción al especialista. El endpoint procesa el pago y registra la relación mensual entre usuario y especialista.

---

## Body esperado (JSON)

```json
{
  "userId": "uuid", // (obligatorio) ID del usuario (paciente)
  "specialistId": "uuid" // (obligatorio) ID del especialista
}
```

---

## Ejemplo de respuesta exitosa (200 OK)

// TODO Esta raro que responda con las citas del usuario, pero por el momento así funciona

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

| Código | Mensaje                              | Causa                                |
| ------ | ------------------------------------ | ------------------------------------ |
| 400    | Datos inválidos                      | Faltan campos o formato incorrecto   |
| 403    | No autorizado                        | Token inválido o sin permisos        |
| 404    | Usuario o especialista no encontrado | IDs inválidos o inexistentes         |
| 402    | Pago rechazado                       | Fondos insuficientes o error de pago |
| 500    | Error interno                        | Error inesperado en el servidor      |

---

## Notas útiles para frontend

- Validar que el usuario tenga métodos de pago registrados antes de llamar este endpoint.
- Mostrar mensajes claros de éxito o error tras el pago.
- Actualizar la UI para reflejar el estado de la mensualidad.
