# Editar Booking (Actualizar Cita)

Este endpoint permite actualizar los datos de una cita existente. Solo pueden editar la cita el usuario o el especialista involucrado.

---

## Endpoint

```
PATCH /bookings/:id
```

## Descripción

Actualiza los datos de una cita existente. Permite modificar fecha, hora, notas, dirección, enlace de videollamada y otros campos permitidos. No se puede editar una cita ya cancelada o finalizada.

## Parámetros obligatorios

- `id` (string, UUID): ID de la cita a editar (en la URL).

## Parámetros permitidos en el body

- `date` (string, ISO 8601): Nueva fecha de la cita (YYYY-MM-DD).
- `startHour` (string, HH:MM): Nueva hora de inicio.
- `endHour` (string, HH:MM): Nueva hora de fin.
- `addressId` (string, UUID): Nuevo ID de dirección.
- `videoCallUrl` (string, URL): Nuevo enlace de videollamada.
- `notes` (string): Nuevas notas.
- `status` (string): Nuevo estatus de la cita (solo ciertos valores permitidos, por ejemplo: "Por confirmar", "Confirmada", "Cancelada").

## Validaciones principales

- El `id` debe ser un UUID válido.
- Si se envía `date`, debe estar en formato ISO 8601 y ser una fecha futura.
- Si se envía `startHour` o `endHour`, deben estar en formato HH:MM y `endHour` debe ser mayor que `startHour`.
- Si se envía `addressId`, debe ser un UUID válido.
- Si se envía `videoCallUrl`, debe ser una URL válida.
- Si se cambia el `status` a "Cancelada", debe incluirse la razón de cancelación en `notes`.

## Ejemplo de petición

```json
{
  "date": "2025-12-10",
  "startHour": "14:00",
  "endHour": "15:00",
  "addressId": "c1b2a3d4-e5f6-7890-abcd-1234567890ef",
  "videoCallUrl": "https://meet.example.com/abc123",
  "notes": "Cambio de horario por disponibilidad",
  "status": "Por confirmar"
}
```

## Ejemplo de respuesta

```json
{
  "folio": "b12fffa4-f4be-4fef-bb13-bb7ed13c92f4",
  "message": "Cita actualizada.",
  "content": [
    {
      "id": "074b388a-7632-4829-8fc5-5e9ea913929f",
      "specialistId": "eb003fcf-fcf1-4da0-b003-35afd7198844",
      "userId": "f0d8e32b-e4bb-4e08-ae48-6c9b96a3a98f",
      "specialty": "Nutricionista",
      "address": "",
      "videoCallUrl": "https://meet.example.com/abc123",
      "status": "Por confirmar",
      "date": "2025-12-10T00:00:00.000Z",
      "startHour": "14:00:00",
      "endHour": "15:00:00",
      "notes": "Cambio de horario por disponibilidad"
    }
    // ...más citas si aplica
  ]
}
```

---

## Notas

- Solo el usuario o especialista involucrado pueden editar la cita.
- No se puede editar una cita ya cancelada o finalizada.
- El campo `folio` es un identificador único de la operación.
- El campo `message` describe el resultado de la operación.