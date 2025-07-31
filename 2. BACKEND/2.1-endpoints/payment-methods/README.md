# API de Payment Methods

Esta documentación cubre todos los endpoints relacionados con la gestión de métodos de pago de usuarios.

## Índice de Endpoints

- [GET /payment-methods/:id - Obtener método de pago por ID](./payment-methods-get.md)
- [GET /payment-methods/user/:userId - Métodos de pago de un usuario](./payment-methods-list-by-user.md)
- [POST /payment-methods - Crear método de pago](./payment-methods-create.md)
- [PATCH /payment-methods/:id - Actualizar método de pago](./payment-methods-update.md)
- [PATCH /payment-methods/:id/shipping - Actualizar método de envío](./payment-methods-shipping-update.md)
- [DELETE /payment-methods/:id - Eliminar método de pago](./payment-methods-delete.md)
- [GET / - Healthcheck](./payment-methods-healthcheck.md)

---

## Reglas importantes y contexto del proyecto

- Los métodos de pago pueden ser tarjetas de crédito/débito o cuentas bancarias.
- Los métodos de pago están asociados a OpenPay/MercadoPago.
- Los métodos de pago pueden ser marcados como predeterminados.
- Los métodos de pago pueden ser usados para envíos automáticos.
- Los métodos de pago requieren validación de seguridad (CVV).
- Los métodos de pago pueden tener diferentes tipos (Visa, MasterCard, etc.).

---

## Consideraciones generales para el frontend

- **Validación:** Validar datos de tarjeta antes de enviar al servidor.
- **Seguridad:** Nunca almacenar CVV en el frontend.
- **Tipos:** Mostrar iconos según el tipo de tarjeta detectado.
- **Predeterminado:** Permitir marcar un método como predeterminado.
- **Envíos:** Los métodos marcados para envío se usan para pagos automáticos.
- **Máscara:** Mostrar solo los últimos 4 dígitos de la tarjeta.
- **Expiración:** Validar formato de fecha de expiración (MM/YY).
- **Límites:** Algunos métodos pueden tener límites de monto. 