# GET /bookings/:id

## Descripción funcional

Obtiene la información detallada de una cita específica por su ID. Permite consultar todos los datos de una cita agendada, incluyendo información del paciente, especialista, horarios, estado, pagos y notas. Es útil para mostrar el detalle de la cita en el frontend.

## Autorización

Requiere token Bearer válido. Solo usuarios autorizados pueden consultar citas.

## Parámetros de ruta

- `id` (UUID, requerido): ID único de la cita a consultar

### Ejemplo
```
GET /bookings/123e4567-e89b-12d3-a456-426614174000
```

## Query parameters

No aplica

## Body del request

No aplica

## Ejemplo de respuesta exitosa (200 OK)

```json
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "user": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "name": "Juan Pérez"
  },
  "specialist": {
    "id": "456e7890-e89b-12d3-a456-426614174000",
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
    "id": "789e0123-e89b-12d3-a456-426614174000",
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

## Códigos de estado y errores

| Código | Significado | Descripción |
|--------|-------------|-------------|
| 200 | OK | Cita obtenida exitosamente |
| 401 | Unauthorized | Token faltante o inválido |
| 403 | Forbidden | Sin permisos para consultar esta cita |
| 404 | Not Found | Cita no encontrada |
| 500 | Internal Server Error | Error del servidor |

## Notas útiles para el frontend

- **Estado visual:** Usar el campo `status` para mostrar el estado visual de la cita
- **Videollamada:** Mostrar el enlace de videollamada solo si la cita es virtual (`addressId` nulo)
- **Pagos:** Revisar el campo `isPaid` para mostrar opciones de pago si aplica
- **Detalles:** Mostrar notas y detalles relevantes para el usuario y especialista
- **Permisos:** Verificar que el usuario tenga acceso a la cita específica
- **UI:** Adaptar la interfaz según el estado de la cita y permisos del usuario 