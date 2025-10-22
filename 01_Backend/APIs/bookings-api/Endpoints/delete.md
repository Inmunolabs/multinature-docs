# DELETE /bookings/:id

## Descripción funcional

Elimina una cita previamente agendada. Solo usuarios autorizados pueden realizar esta acción. Es útil para permitir al paciente o especialista eliminar una cita antes de que ocurra.

## Autorización

Requiere token Bearer válido. Solo usuarios autorizados pueden eliminar citas.

## Parámetros de ruta

- `id` (UUID, requerido): ID único de la cita a eliminar

### Ejemplo
```
DELETE /bookings/123e4567-e89b-12d3-a456-426614174000
```

## Query parameters

No aplica

## Body del request

No aplica

## Ejemplo de respuesta exitosa (200 OK)

```json
{
  "message": "Cita eliminada correctamente"
}
```

## Códigos de estado y errores

| Código | Significado | Descripción |
|--------|-------------|-------------|
| 200 | OK | Cita eliminada exitosamente |
| 401 | Unauthorized | Token faltante o inválido |
| 403 | Forbidden | Sin permisos para eliminar esta cita |
| 404 | Not Found | Cita no encontrada o ya eliminada |
| 500 | Internal Server Error | Error del servidor |

## Notas útiles para el frontend

- **Confirmación:** Mostrar diálogo de confirmación antes de eliminar la cita
- **Actualización UI:** Refrescar la lista de citas después de la eliminación
- **Mensajes:** Mostrar mensajes claros de éxito o error al usuario
- **Permisos:** Verificar que el usuario tenga permisos para eliminar la cita específica
- **Estados:** Considerar el estado actual de la cita antes de permitir la eliminación
