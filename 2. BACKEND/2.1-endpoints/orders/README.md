# API de Orders

Esta documentación cubre todos los endpoints relacionados con la gestión de órdenes y pedidos del sistema, incluyendo creación, consulta, actualización, cancelación y confirmación de pagos.

## Índice de Endpoints

### Gestión de Órdenes
- [GET /orders - Listar todas las órdenes](./list.md)
- [GET /orders/:id - Obtener orden específica](./get-by-id.md)
- [GET /orders/user/:id - Listar órdenes del usuario](./list-by-user-id.md)
- [GET /orders/logistics - Listar órdenes para logística](./logistics.md)
- [POST /orders/:id - Crear nueva orden](./create.md)
- [PATCH /orders/:id - Actualizar orden](./update.md)
- [PATCH /orders/cancel/:id - Cancelar orden](./cancel.md)
- [PATCH /orders/process-commissions/:openpayId - Procesar comisiones](./process-commissions.md)
- [DELETE /orders/:id - Eliminar orden](./delete.md)
- [DELETE /orders/cleanup - Limpiar órdenes pendientes antiguas](./cleanup.md)

### Confirmación de Pagos
- [POST /confirm - Confirmar pago OpenPay](./confirm-payment-openpay.md)
- [POST /confirm/mercado-pago - Confirmar pago MercadoPago](./confirm-payment-mercadopago.md)

### Sistema
- [GET / - Healthcheck](./healthcheck.md)

---

## Reglas importantes y contexto del proyecto

- Las órdenes pueden ser creadas con diferentes métodos de pago (OpenPay, MercadoPago)
- Para cargos mayores a $6,000 MXN se requiere autenticación 3D Secure de OpenPay
- Las órdenes incluyen productos, dirección de envío, método de pago y estado de entrega
- El sistema calcula automáticamente subtotal, IVA y costo de envío
- Las órdenes pueden tener diferentes estados de entrega (pendiente, en camino, entregada, cancelada)
- Al cancelar una orden, se reembolsa el monto a los créditos del usuario
- El sistema envía notificaciones por email cuando las órdenes cambian de estado
- Las órdenes incluyen información de logística y seguimiento de envío

---

## Consideraciones generales para el frontend

- **Métodos de pago:** Implementar selección entre OpenPay y MercadoPago
- **3D Secure:** Para órdenes grandes, redirigir a autenticación 3D Secure
- **Estados de entrega:** Mostrar progreso visual del estado de la orden
- **Seguimiento:** Incluir información de logística y tracking
- **Cancelación:** Permitir cancelación con confirmación y reembolso
- **Notificaciones:** Mostrar notificaciones de cambios de estado
- **Paginación:** Implementar paginación para listas de órdenes
- **Filtros:** Permitir filtrado por fechas y estado de entrega
- **Comisiones:** Gestionar comisiones para órdenes con 3D Secure
- **Balance:** Mostrar balance actualizado después de operaciones 