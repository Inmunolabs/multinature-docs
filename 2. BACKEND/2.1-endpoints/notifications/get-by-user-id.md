# GET /notifications/:id

## Descripción funcional

Obtiene la lista de notificaciones de un usuario específico. Retorna todas las notificaciones asociadas al usuario, incluyendo su estado de lectura, título, mensaje y metadatos. Las notificaciones se ordenan por fecha de creación.

## Autorización

Requiere token Bearer válido. Solo usuarios autorizados pueden consultar sus propias notificaciones.

## Parámetros de ruta

- `id` (UUID, requerido): ID único del usuario

### Ejemplo
```
GET /notifications/123e4567-e89b-12d3-a456-426614174000
```

## Query parameters

No aplica

## Body del request

No aplica

## Ejemplo de respuesta exitosa (200 OK)

```json
{
  "awsRequestId": "456e7890-e89b-12d3-a456-426614174000",
  "message": "Notificaciones encontradas",
  "data": [
    {
      "id": "789e0123-e89b-12d3-a456-426614174000",
      "userId": "123e4567-e89b-12d3-a456-426614174000",
      "date": "2024-01-15",
      "title": "Nueva cita programada",
      "message": "Tu cita con el Dr. García ha sido programada para el 20 de enero a las 10:00 AM",
      "redirectUrl": "/bookings/abc123-e89b-12d3-a456-426614174000",
      "actionText": "Ver cita",
      "read": false
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
      "read": false
    }
  ]
}
```

## Códigos de estado y errores

| Código | Significado | Descripción |
|--------|-------------|-------------|
| 200 | OK | Notificaciones obtenidas exitosamente |
| 400 | Bad Request | ID de usuario inválido |
| 401 | Unauthorized | Token faltante o inválido |
| 403 | Forbidden | Sin permisos para consultar notificaciones de este usuario |
| 500 | Internal Server Error | Error del servidor |

## Notas útiles para el frontend

- **Usuario único:** Solo se pueden consultar las notificaciones del usuario autenticado
- **Estado de lectura:** Mostrar indicador visual para notificaciones no leídas
- **Ordenamiento:** Las notificaciones se ordenan por fecha (más recientes primero)
- **URLs de redirección:** Usar para navegación directa desde la notificación
- **Texto de acción:** Mostrar botones con el texto personalizado
- **Contador:** Implementar badge con número de notificaciones no leídas
- **Filtros:** Considerar filtros por estado de lectura y fecha
- **Paginación:** Para usuarios con muchas notificaciones

## Consideraciones técnicas

- **Middleware:** Aplica `authorize`, `getConstants`, `idPathParam` y `userOwnResources`
- **Validaciones:** Verifica que el usuario solo pueda acceder a sus propias notificaciones
- **Base de datos:** Consulta usando `listByUserId` del servicio
- **DTO:** Usa `notificationsToDTO` para transformar la respuesta
- **Seguridad:** Solo permite consultar notificaciones propias del usuario autenticado
- **Performance:** Optimizado para consultas de notificaciones por usuario
- **Ordenamiento:** Las notificaciones se ordenan por fecha de creación
