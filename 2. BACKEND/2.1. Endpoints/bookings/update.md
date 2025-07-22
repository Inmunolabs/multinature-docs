# PATCH /bookings/:id

Actualiza los datos de una cita existente.

---

## Método, ruta y autorización

- **Método:** PATCH
- **Ruta:** `/bookings/:id`
- **Autorización:** Bearer token en headers

---

## Explicación funcional

Permite modificar la fecha, hora, notas o enlace de videollamada de una cita ya creada. Solo usuarios autorizados pueden actualizar la cita. Es útil para reagendar o actualizar detalles antes de la consulta.

---

## Parámetros de ruta

- `id` (obligatorio): UUID de la cita a actualizar.

---

## Body esperado (JSON)

```json
{
  "date": "2025-12-09", // (opcional) Nueva fecha de la cita
  "startHour": "15:00", // (opcional) Nueva hora de inicio
  "endHour": "15:30", // (opcional) Nueva hora de fin
  "notes": "Todo cool", // (opcional) Nuevas notas para el especialista
  "videoCallUrl": "https://zoom.us/j/987654321" // (opcional) Nuevo enlace de videollamada
}
```

---

## Ejemplo de respuesta exitosa (200 OK)

```json
{
  "id": "booking-uuid",
  "date": "2025-12-09",
  "startHour": "15:00",
  "endHour": "15:30",
  "notes": "Todo cool",
  "videoCallUrl": "https://zoom.us/j/987654321",
  "status": "Confirmada"
}
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
