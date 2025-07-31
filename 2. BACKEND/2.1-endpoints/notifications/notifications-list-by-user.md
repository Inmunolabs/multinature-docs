# GET /notifications/:id

Obtiene las notificaciones de un usuario.

---

## Método, ruta y autorización
- **Método:** GET
- **Ruta:** `/notifications/:id`
- **Autorización:** Bearer token en headers

---

## Explicación funcional
Permite obtener todas las notificaciones de un usuario. Las notificaciones se devuelven ordenadas por fecha de creación (más recientes primero). Incluye información sobre si han sido leídas o no.

---

## Parámetros de ruta
- `id` (obligatorio): UUID del usuario.

---

## Ejemplo de respuesta exitosa (200 OK)
```json
[
  {
    "id": "uuid",
    "userId": "uuid",
    "date": "2024-01-15T10:30:00Z",
    "title": "Cita confirmada",
    "message": "Tu cita con el Dr. García ha sido confirmada para mañana a las 10:00 AM.",
    "read": false
  },
  {
    "id": "uuid",
    "userId": "uuid",
    "date": "2024-01-14T15:45:00Z",
    "title": "Pago exitoso",
    "message": "Tu pago de $299.99 ha sido procesado exitosamente.",
    "read": true
  },
  {
    "id": "uuid",
    "userId": "uuid",
    "date": "2024-01-13T09:20:00Z",
    "title": "Producto enviado",
    "message": "Tu pedido #ORD-2024-001 ha sido enviado y llegará en 2-3 días hábiles.",
    "read": true
  }
]
```

---

## Errores comunes
| Código | Mensaje                        | Causa                                 |
|--------|--------------------------------|---------------------------------------|
| 403    | No autorizado                  | Token inválido o sin permisos         |
| 404    | Usuario no encontrado          | El ID del usuario no existe           |
| 500    | Error interno                  | Error inesperado en el servidor       |

---

## Notas útiles para frontend
- **Orden:** Las notificaciones se devuelven ordenadas por fecha (más recientes primero).
- **Estados:** Usar el campo `read` para mostrar indicadores visuales.
- **Badges:** Mostrar contador de notificaciones no leídas.
- **Filtros:** Implementar filtros por estado (leídas/no leídas) y fecha.
- **Paginación:** Considerar paginación para usuarios con muchas notificaciones.
- **Tiempo real:** Considerar actualizaciones en tiempo real para nuevas notificaciones.
- **Acciones:** Permitir marcar como leída desde la lista.
- **Tipos:** Mostrar iconos diferentes según el tipo de notificación (cita, pago, envío, etc.). 