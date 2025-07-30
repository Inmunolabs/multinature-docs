# API de Notifications

Esta documentación cubre todos los endpoints relacionados con la gestión de notificaciones de usuarios.

## Índice de Endpoints

- [GET /notifications/user/:userId - Notificaciones de un usuario](./notifications-list-by-user.md)
- [POST /notifications - Crear notificación](./notifications-create.md)
- [PATCH /notifications/:id/read - Marcar como leída](./notifications-read.md)
- [GET / - Healthcheck](./notifications-healthcheck.md)

---

## Reglas importantes y contexto del proyecto

- Las notificaciones pueden ser de diferentes tipos (email, push, SMS).
- Las notificaciones pueden estar leídas o no leídas.
- Las notificaciones se crean automáticamente por eventos del sistema.
- Las notificaciones pueden tener diferentes niveles de prioridad.
- Las notificaciones pueden incluir datos adicionales (links, imágenes).
- Las notificaciones pueden ser programadas para envío futuro.

---

## Consideraciones generales para el frontend

- **Estados:** Mostrar indicador visual de notificaciones no leídas.
- **Tipos:** Mostrar iconos diferentes según el tipo de notificación.
- **Prioridad:** Usar colores o estilos para notificaciones importantes.
- **Acciones:** Permitir marcar como leída y eliminar notificaciones.
- **Filtros:** Implementar filtros por tipo, fecha, estado.
- **Paginación:** Las notificaciones pueden requerir paginación.
- **Tiempo real:** Considerar actualizaciones en tiempo real.
- **Badges:** Mostrar contador de notificaciones no leídas. 