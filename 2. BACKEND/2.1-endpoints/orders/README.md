# API de Orders

Esta documentación cubre todos los endpoints relacionados con la gestión de órdenes y pedidos.

## Índice de Endpoints

- [GET /orders - Listar órdenes](./orders-list.md)
- [GET /orders/:id - Obtener orden por ID](./orders-get.md)
- [GET /orders/user/:userId - Órdenes de un usuario](./orders-list-by-user.md)
- [GET /orders/logistics - Listar logística](./orders-logistics.md)
- [POST /orders - Crear orden](./orders-create.md)
- [PATCH /orders/:id - Actualizar orden](./orders-update.md)
- [DELETE /orders/:id - Eliminar orden](./orders-delete.md)
- [DELETE /orders/:id/cancel - Cancelar orden](./orders-cancel.md)
- [DELETE /orders/old/remove - Eliminar órdenes antiguas](./orders-old-remove.md)
- [GET / - Healthcheck](./orders-healthcheck.md)

---

## Reglas importantes y contexto del proyecto

- Las órdenes pueden ser de productos físicos o servicios.
- Las órdenes tienen estados: pendiente, confirmada, enviada, entregada, cancelada.
- Las órdenes pueden tener diferentes métodos de pago.
- Las órdenes de productos requieren dirección de envío.
- Las órdenes de servicios pueden ser virtuales o presenciales.
- Las órdenes antiguas se pueden eliminar automáticamente.

---

## Consideraciones generales para el frontend

- **Estados:** Mostrar el estado actual de la orden y acciones disponibles.
- **Pagos:** Validar método de pago antes de crear la orden.
- **Envíos:** Las órdenes de productos requieren dirección de envío válida.
- **Seguimiento:** Implementar seguimiento de órdenes en tiempo real.
- **Cancelación:** Permitir cancelación solo en estados permitidos.
- **Notificaciones:** Mostrar notificaciones de cambios de estado.
- **Historial:** Mantener historial de órdenes del usuario.
- **Filtros:** Implementar filtros por estado, fecha, tipo de orden. 