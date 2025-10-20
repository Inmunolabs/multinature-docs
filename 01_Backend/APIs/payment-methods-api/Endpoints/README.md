# API de Payment Methods

Esta documentación cubre todos los endpoints relacionados con la gestión de métodos de pago del sistema, incluyendo tarjetas de crédito/débito para pagos y cuentas bancarias para cobros.

## Índice de Endpoints

### Gestión de Métodos de Pago

- [GET /payment-methods/user/:id - Listar métodos de pago del usuario](./list-by-user-id.md)
- [GET /payment-methods/:id - Obtener método de pago específico](./get-by-id.md)
- [POST /payment-methods/:id - Crear nuevo método de pago](./create.md)
- [PATCH /payment-methods/:id - Actualizar método de pago](./update.md)
- [PATCH /payment-methods/shippingPayment/:id - Actualizar método de pago de envío](./update-shipping-payment.md)
- [DELETE /payment-methods/:id - Eliminar método de pago](./delete.md)

### Sistema

- [GET / - Healthcheck](./healthcheck.md)

---

## Reglas importantes y contexto del proyecto

- Los métodos de pago se dividen en dos tipos: **Pago** (tarjetas) y **Cobro** (cuentas bancarias)
- Solo se permite un método de pago de envío por usuario (isShippingPayment = true)
- El primer método de pago creado se establece automáticamente como método de envío
- Las tarjetas se almacenan en OpenPay y se sincronizan con la base de datos local
- No se pueden eliminar métodos de pago que estén siendo utilizados en compras mensuales
- No se pueden eliminar métodos de pago marcados como método de envío
- Las cuentas bancarias (tipo Cobro) no pueden ser marcadas como método de envío
- Existe un límite máximo de métodos de pago por usuario

---

## Consideraciones generales para el frontend

- **Tipos de métodos:** Distinguir entre métodos de Pago (tarjetas) y Cobro (cuentas bancarias)
- **Método de envío:** Solo un método puede ser marcado como método de envío
- **Validaciones:** Verificar límites de métodos de pago antes de crear nuevos
- **Eliminación:** No permitir eliminar métodos de envío o en uso
- **OpenPay:** Las tarjetas se procesan a través de OpenPay con tokens
- **Sincronización:** Mantener sincronizados los datos locales con OpenPay
- **Interfaz:** Mostrar claramente qué método es el de envío actual
- **Restricciones:** Aplicar validaciones según el tipo de método de pago
