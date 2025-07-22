# GET /bookings/:id

Obtiene la información detallada de una cita específica por su ID.

---

## Método, ruta y autorización
- **Método:** GET
- **Ruta:** `/bookings/:id`
- **Autorización:** Bearer token en headers

---

## Explicación funcional
Permite consultar todos los datos de una cita agendada, incluyendo información del paciente, especialista, horarios, estado, pagos y notas. Es útil para mostrar el detalle de la cita en el frontend.

---

## Parámetros de ruta
- `id` (obligatorio): UUID de la cita a consultar.

---

## Ejemplo de respuesta exitosa (200 OK)
```json
{
  "id": "booking-uuid",
  "user": {
    "id": "uuid",
    "name": "Juan Pérez"
  },
  "specialist": {
    "id": "uuid",
    "name": "Dra. López"
  },
  "specialty": "Nutrición",
  "address": "Calle 123, Int. 4, Guadalajara, Jalisco",
  "videoCallUrl": "https://meet.google.com/xfd-vcfc-pjt",
  "status": "Por confirmar",
  "date": "2025-07-25",
  "startHour": "11:00",
  "endHour": "11:30",
  "notes": "Quiero hablar sobre mi dieta keto",
  "isPaid": false,
  "advancePayment": {
    "id": "payment-uuid",
    "type": "openpayCard",
    "name": "Anticipo de consulta",
    "status": "Pendiente",
    "total": 250,
    "iva": 40,
    "subtotal": 210
  },
  "liquidationPayment": {}
}
```

---

## Errores comunes
| Código | Mensaje                        | Causa                                 |
|--------|--------------------------------|---------------------------------------|
| 403    | No autorizado                  | Token inválido o sin permisos         |
| 404    | Cita no encontrada             | El ID no existe o fue eliminada       |
| 500    | Error interno                  | Error inesperado en el servidor       |

---

## Notas útiles para frontend
- Usar el campo `status` para mostrar el estado visual de la cita.
- Mostrar el enlace de videollamada solo si la cita es virtual (`addressId` nulo).
- Revisar el campo `isPaid` para mostrar opciones de pago si aplica.
- Mostrar notas y detalles relevantes para el usuario y especialista. 