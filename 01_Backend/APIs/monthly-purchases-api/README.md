# monthly-purchases-api

Documentación de monthly-purchases-api.

---

## Secciones

- [Endpoints](./Endpoints/README.md)
- [Guides](./Guides/README.md)

---

## Reglas importantes y contexto del proyecto

- Las compras mensuales son suscripciones automáticas que se renuevan mensualmente.
- Cada usuario puede tener una sola compra mensual activa.
- Las compras mensuales se integran con OpenPay para pagos automáticos.
- Los productos se envían mensualmente a la dirección de envío configurada.
- El sistema calcula automáticamente subtotal, IVA y costo de envío.
- Las suscripciones requieren dirección de envío y método de pago válidos.
- Al cancelar, se eliminan tanto el plan como la suscripción en OpenPay.
- Las compras mensuales pueden ser de suscripción o compras únicas.

---

## Consideraciones generales para el frontend

- **Suscripciones:** Verificar si el usuario ya tiene una suscripción activa antes de crear una nueva
- **Productos:** Mostrar productos disponibles para suscripción mensual
- **Dirección de envío:** Verificar que el usuario tenga una dirección de envío válida
- **Método de pago:** Verificar que el usuario tenga un método de pago configurado
- **Cálculos:** Mostrar desglose de subtotal, IVA y costo de envío
- **Fechas de pago:** Mostrar próxima fecha de pago automático
- **Estado:** Indicar si la suscripción está activa o cancelada
- **Cancelación:** Permitir cancelar suscripciones con confirmación
- **Actualización:** Permitir modificar productos de la suscripción
- **Dirección:** Permitir cambiar la dirección de envío

---

- **Última actualización:** 2025-12-15
- **Total de archivos:** 6
