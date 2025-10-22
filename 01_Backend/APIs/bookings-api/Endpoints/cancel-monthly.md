# DELETE /monthly-services/

## Descripción funcional

Cancela una mensualidad activa entre un usuario y un especialista. Permite a un usuario cancelar una suscripción mensual activa con un especialista. El endpoint elimina la relación mensual y detiene los servicios recurrentes.

## Autorización

Requiere token Bearer válido. Solo usuarios autorizados pueden cancelar sus mensualidades.

## Parámetros de ruta

No aplica

## Query parameters

No aplica

## Body del request

```json
{
  "userId": "string",
  "specialistId": "string"
}
```

### Ejemplo de body

```json
{
  "userId": "123e4567-e89b-12d3-a456-426614174000",
  "specialistId": "456e7890-e89b-12d3-a456-426614174000"
}
```

## Ejemplo de respuesta exitosa (200 OK)

```json
[
  {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "user": {
      "id": "123e4567-e89b-12d3-a456-426614174000",
      "name": "Samuel Cliente"
    },
    "specialist": {
      "id": "456e7890-e89b-12d3-a456-426614174000",
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
  }
]
```

## Códigos de estado y errores

| Código | Significado | Descripción |
|--------|-------------|-------------|
| 200 | OK | Mensualidad cancelada exitosamente |
| 400 | Bad Request | Faltan campos o formato incorrecto |
| 401 | Unauthorized | Token faltante o inválido |
| 403 | Forbidden | Sin permisos para cancelar esta mensualidad |
| 404 | Not Found | Mensualidad no encontrada o no existe relación activa |
| 500 | Internal Server Error | Error del servidor |

## Notas útiles para el frontend

- **Confirmación:** Confirmar con el usuario antes de cancelar la mensualidad
- **Actualización UI:** Actualizar la interfaz para reflejar el estado cancelado
- **Mensajes:** Mostrar mensajes claros de éxito o error al usuario
- **Validación:** Verificar que el usuario tenga permisos para cancelar la mensualidad específica
- **Estado:** Considerar el estado actual de la mensualidad antes de permitir la cancelación
- **Notificaciones:** El backend puede enviar notificaciones automáticas de cancelación

## Consideraciones técnicas

- **Relación:** Se elimina la relación mensual entre usuario y especialista
- **Servicios:** Se detienen los servicios recurrentes asociados
- **Respuesta:** Retorna la lista actualizada de citas del usuario
- **Transaccional:** La operación es atómica para mantener consistencia de datos
- **Auditoría:** Se registra la cancelación para fines de auditoría
