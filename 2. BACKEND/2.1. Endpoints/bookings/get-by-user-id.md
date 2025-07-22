# GET /bookings/user/:userId

Obtiene todas las citas asociadas a un usuario (paciente).

---

## Método, ruta y autorización

- **Método:** GET
- **Ruta:** `/bookings/user/:userId?startDate=YYYY-MM-DD`
- **Autorización:** Bearer token en headers

---

## Explicación funcional

Permite al frontend obtener el historial o próximas citas de un paciente, filtrando opcionalmente por fecha de inicio. Útil para mostrar la agenda o historial de citas del usuario.

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
    "date": "2025-07-25",
    "startHour": "11:00",
    "endHour": "11:30",
    "status": "Confirmada",
    "specialist": {
      "id": "uuid",
      "name": "Dra. López"
    },
    "specialty": "Nutrición",
    "isPaid": true
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
