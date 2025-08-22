# PATCH /notifications/:id/read

## Descripción funcional

Marca notificaciones como leídas para un usuario específico. Permite marcar notificaciones individuales o todas las notificaciones del usuario como leídas. Retorna la lista actualizada de notificaciones con su estado de lectura actualizado.

## Autorización

Requiere token Bearer válido. Solo usuarios autorizados pueden marcar sus propias notificaciones como leídas.

## Parámetros de ruta

- `id` (UUID, requerido): ID único del usuario

### Ejemplo
```
PATCH /notifications/123e4567-e89b-12d3-a456-426614174000/read
```

## Query parameters

- `all` (boolean, opcional): Si es `true`, marca todas las notificaciones como leídas

### Ejemplo
```
PATCH /notifications/123e4567-e89b-12d3-a456-426614174000/read?all=true
```

## Body del request

### Para notificaciones individuales
```json
[
  "789e0123-e89b-12d3-a456-426614174000",
  "abc123-e89b-12d3-a456-426614174000"
]
```

### Para marcar todas como leídas
No requiere body cuando se usa `?all=true`

## Ejemplo de respuesta exitosa (200 OK)

```json
{
  "awsRequestId": "456e7890-e89b-12d3-a456-426614174000",
  "message": "Notificaciones actualizadas exitosamente",
  "data": [
    {
      "id": "789e0123-e89b-12d3-a456-426614174000",
      "userId": "123e4567-e89b-12d3-a456-426614174000",
      "date": "2024-01-15",
      "title": "Nueva cita programada",
      "message": "Tu cita con el Dr. García ha sido programada para el 20 de enero a las 10:00 AM",
      "redirectUrl": "/bookings/abc123-e89b-12d3-a456-426614174000",
      "actionText": "Ver cita",
      "read": true
    },
    {
      "id": "abc123-e89b-12d3-a456-426614174000",
      "userId": "123e4567-e89b-12d3-a456-426614174000",
      "date": "2024-01-14",
      "title": "Recordatorio de medicamento",
      "message": "No olvides tomar tu medicamento de las 8:00 PM",
      "redirectUrl": "/medications/def456-e89b-12d3-a456-426614174000",
      "actionText": "Ver medicamentos",
      "read": true
    },
    {
      "id": "ghi789-e89b-12d3-a456-426614174000",
      "userId": "123e4567-e89b-12d3-a456-426614174000",
      "date": "2024-01-13",
      "title": "Resultados de laboratorio",
      "message": "Tus resultados de laboratorio están listos para revisión",
      "redirectUrl": "/lab-results/jkl012-e89b-12d3-a456-426614174000",
      "actionText": "Ver resultados",
      "read": true
    }
  ]
}
```

## Códigos de estado y errores

| Código | Significado | Descripción |
|--------|-------------|-------------|
| 200 | OK | Notificaciones marcadas como leídas exitosamente |
| 400 | Bad Request | IDs de notificación inválidos o faltantes |
| 401 | Unauthorized | Token faltante o inválido |
| 403 | Forbidden | Sin permisos para marcar notificaciones de este usuario |
| 500 | Internal Server Error | Error del servidor |

## Notas útiles para el frontend

- **Marcado individual:** Enviar array de IDs de notificaciones específicas
- **Marcado masivo:** Usar `?all=true` para marcar todas como leídas
- **Actualización automática:** La respuesta incluye la lista completa actualizada
- **Estado visual:** Actualizar indicadores de notificaciones no leídas
- **Contador:** Actualizar badge con número de notificaciones no leídas
- **Confirmación:** Considerar confirmación para marcado masivo
- **Sincronización:** Mantener sincronizado el estado de lectura
- **Performance:** Para usuarios con muchas notificaciones, usar marcado masivo

## Consideraciones técnicas

- **Middleware:** Aplica `authorize`, `getConstants`, `idPathParam`, `notificationsValidations.read` y `userOwnResources`
- **Validaciones:** Verifica que el usuario solo pueda marcar sus propias notificaciones
- **Base de datos:** Usa `read` o `readAll` según el parámetro `all`
- **DTO:** Usa `getUserNotifications` para obtener la lista actualizada
- **Seguridad:** Solo permite marcar notificaciones propias del usuario autenticado
- **Transaccional:** Actualiza el estado de lectura y retorna la lista completa
- **Performance:** Optimizado para actualizaciones individuales y masivas
- **Query parameter:** El parámetro `all` determina el comportamiento del endpoint
