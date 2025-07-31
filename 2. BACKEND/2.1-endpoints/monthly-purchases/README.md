# API de Monthly Purchases

Esta documentación cubre todos los endpoints relacionados con la gestión de compras mensuales y suscripciones.

## Índice de Endpoints

- [GET /monthly-purchases/:id - Obtener compra mensual](./monthly-purchases-get.md)
- [POST /monthly-purchases - Crear compra mensual](./monthly-purchases-create.md)
- [PATCH /monthly-purchases/:id - Actualizar compra mensual](./monthly-purchases-update.md)
- [PATCH /monthly-purchases/:id/shipping - Actualizar dirección de envío](./monthly-purchases-shipping-update.md)
- [DELETE /monthly-purchases/:id - Cancelar compra mensual](./monthly-purchases-cancel.md)
- [GET / - Healthcheck](./monthly-purchases-healthcheck.md)

---

## Reglas importantes y contexto del proyecto

- Las compras mensuales son suscripciones recurrentes de productos o servicios.
- Las compras mensuales pueden tener diferentes frecuencias (mensual, trimestral, anual).
- Las compras mensuales pueden ser canceladas en cualquier momento.
- Las compras mensuales pueden tener direcciones de envío específicas.
- Las compras mensuales se procesan automáticamente según la frecuencia.
- Las compras mensuales pueden tener descuentos por volumen o duración.

---

## Consideraciones generales para el frontend

- **Frecuencias:** Mostrar diferentes opciones de frecuencia (mensual, trimestral, anual).
- **Precios:** Mostrar precios con descuentos aplicados por frecuencia.
- **Cancelación:** Permitir cancelación con confirmación del usuario.
- **Envíos:** Gestionar direcciones de envío para productos físicos.
- **Renovación:** Mostrar fechas de renovación automática.
- **Historial:** Mostrar historial de compras y pagos.
- **Descuentos:** Mostrar descuentos aplicados por volumen o duración.
- **Notificaciones:** Alertar sobre renovaciones próximas. 