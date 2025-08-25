# API de Notifications

Esta documentación cubre todos los endpoints relacionados con la gestión de notificaciones del sistema, incluyendo notificaciones por email, base de datos y WhatsApp.

## Índice de Endpoints

### Gestión de Notificaciones

- [GET /notifications/:id - Listar notificaciones del usuario](./get-by-user-id.md)
- [POST /notifications - Crear notificaciones masivas](./create.md)
- [PATCH /notifications/:id/read - Marcar notificaciones como leídas](./mark-as-read.md)

### Sistema

- [GET / - Healthcheck](./healthcheck.md)

---

## Reglas importantes y contexto del proyecto

- Las notificaciones pueden ser enviadas por múltiples canales: email, base de datos y WhatsApp
- El sistema permite filtros avanzados para seleccionar usuarios destinatarios
- Las notificaciones se pueden enviar de forma masiva a grupos de usuarios
- Las notificaciones en base de datos se pueden marcar como leídas individual o masivamente
- El sistema soporta filtros por perfil de usuario, especialidades, edad, fechas y más
- Las notificaciones incluyen título, mensaje, URL de redirección y texto de acción
- El sistema integra con el sistema de emails para envío automático

---

## Consideraciones generales para el frontend

- **Filtros avanzados:** Implementar interfaz para los múltiples filtros de usuarios disponibles
- **Notificaciones masivas:** Permitir envío de notificaciones a grupos de usuarios
- **Canales múltiples:** Distinguir entre notificaciones por email, base de datos y WhatsApp
- **Estado de lectura:** Mostrar y gestionar el estado de lectura de las notificaciones
- **Marcado masivo:** Permitir marcar todas las notificaciones como leídas
- **Filtros de usuario:** Implementar filtros complejos para selección de destinatarios
- **URLs de redirección:** Manejar enlaces para navegación desde notificaciones
- **Texto de acción:** Mostrar botones de acción personalizables
- **Historial:** Mantener historial de notificaciones enviadas y recibidas
