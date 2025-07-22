# POST /bookings

Crea una nueva cita entre un paciente y un especialista.

---

## Método, ruta y autorización
- **Método:** POST
- **Ruta:** `/bookings`
- **Autorización:** Bearer token en headers

---

## Explicación funcional
Permite a un paciente agendar una cita con un especialista para una fecha y hora específicas. Valida disponibilidad, verifica si se requiere pago anticipado y genera la cita en estado "Confirmada" o "Por confirmar" según la configuración del especialista. Si la cita es virtual y no se especifica dirección, se genera un enlace de videollamada. Se envían notificaciones por correo y, si aplica, se crea una orden de pago.

---

## Body esperado (JSON)
```json
{
  "specialistId": "uuid",        // (obligatorio) ID del especialista
  "userId": "uuid",              // (obligatorio) ID del paciente
  "specialtyId": "uuid",         // (obligatorio) ID de la especialidad
  "addressId": "uuid",           // (opcional) ID de la dirección física (si es presencial)
  "videoCallUrl": "string",      // (opcional) Enlace personalizado de videollamada (si es virtual)
  "date": "YYYY-MM-DD",          // (obligatorio) Fecha de la cita
  "startHour": "HH:MM",          // (obligatorio) Hora de inicio (24h)
  "endHour": "HH:MM",            // (obligatorio) Hora de fin (24h)
  "notes": "string",             // (opcional) Notas del paciente para el especialista
  "amount": 250                   // (obligatorio si requiere pago) Monto total o anticipo
}
```

**Ejemplo:**
```json
{
  "specialistId": "a1b2c3d4-5678-90ab-cdef-1234567890ab",
  "userId": "b2c3d4e5-6789-01bc-defa-2345678901bc",
  "specialtyId": "c3d4e5f6-7890-12cd-efab-3456789012cd",
  "date": "2025-07-25",
  "startHour": "11:00",
  "endHour": "11:30",
  "notes": "Quiero hablar sobre mi dieta keto",
  "amount": 250
}
```

---

## Respuesta exitosa (200 OK)
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
  "address": "Calle 123, Int. 4, Guadalajara, Jalisco", // Solo si es presencial
  "videoCallUrl": "https://meet.google.com/xfd-vcfc-pjt", // Solo si es virtual
  "status": "Por confirmar", // O "Confirmada"
  "date": "2025-07-25",
  "startHour": "11:00",
  "endHour": "11:30",
  "notes": "Quiero hablar sobre mi dieta keto",
  "isPaid": false, // true si ya está pagada
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
| Código | Mensaje                                              | Causa                                                        |
|--------|------------------------------------------------------|--------------------------------------------------------------|
| 400    | Fecha u horario inválido                             | El especialista o paciente ya tiene cita en ese horario      |
| 400    | Dirección inválida o no pertenece al especialista    | `addressId` inválido o no corresponde al especialista        |
| 403    | No autorizado                                        | El usuario no tiene permisos o el token es inválido          |
| 403    | No puede confirmar sin anticipo                      | Se requiere pago previo para confirmar la cita               |
| 404    | Paciente o especialista no encontrados               | IDs inválidos o inexistentes                                 |
| 500    | Error interno                                        | Error inesperado en el servidor o base de datos              |

---

## Notas útiles para frontend
- **Mostrar enlace de videollamada:** Solo si la cita es virtual (`addressId` no enviado o nulo).
- **Validar método de pago:** Si el especialista requiere anticipo y si se quiere pagar con tarjeta asegúrate de que el paciente tenga método de pago válido antes de crear la cita.
- **Estado de la cita:** Si `status` es `"Confirmada"`, la cita ya está lista. Si es `"Por confirmar"`, el usuario debe completar el pago.
- **Botón de pago:** Mostrar solo si `isPaid` es `false` y la cita requiere pago.
- **Notificaciones:** El backend envía correos automáticos al paciente y especialista con los detalles de la cita y el pago.
- **Campos importantes para UI:** `status`, `isPaid`, `advancePayment.status`, `videoCallUrl`. 