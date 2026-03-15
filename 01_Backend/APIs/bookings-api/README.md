# bookings-api

Documentación de bookings-api (sistema de citas y reservas).

---

## Secciones

- [Endpoints](./Endpoints/README.md)
- **Reglas de negocio (citas y pagos):** [docs/00_Overview/Business_Rules/citas/](../../../00_Overview/Business_Rules/citas/README.md) — Agendamiento, [Pagos de citas y PAYMENTS_ENABLED](../../../00_Overview/Business_Rules/citas/pagos-citas-y-PAYMENTS_ENABLED.md)

---

## Variable de entorno: PAYMENTS_ENABLED

Interruptor global de la gestión de pagos en esta API:

- **`true`** (o no definida): Comportamiento normal; se exigen y crean pagos según la configuración del especialista (anticipo, consulta, liquidación, mensualidad).
- **`false`**: Toda la gestión de pagos queda desactivada: no se crea `service_payment`, no se exige `amount` ni tipo de pago; especialistas y pacientes pueden agendar citas sin cobros. Los endpoints de liquidación y suscripción mensual responden **503** (*La gestión de pagos está desactivada*).

Definida en `serverless.yml` y en `configDeploy/serverless*.yaml`. Detalle en [Pagos de citas y PAYMENTS_ENABLED](../../../00_Overview/Business_Rules/citas/pagos-citas-y-PAYMENTS_ENABLED.md).

---

## Reglas importantes y contexto del proyecto

- El paciente puede agendar con cualquier especialista disponible y asignado a él.
- Si **PAYMENTS_ENABLED = false**, las citas se crean sin cobro y pueden confirmarse sin pago; liquidación y suscripción mensual responden 503.
- Si el especialista tiene configurado que la cita **no requiere pago** (`chargePerConsultation = 0` y `chargeAdvancePayment = 0`) y la cita es agendada por el paciente, esta queda **confirmada** automáticamente.
- Si se requiere pago (y PAYMENTS_ENABLED = true), se crea una orden de servicio (`service_payment`) que debe liquidarse (OpenPay tarjeta/tienda, MercadoPago o efectivo).
- Si la cita es virtual y no se asigna dirección, se genera un enlace de videollamada genérico.
- Se envían notificaciones por correo con datos de la cita y del pago cuando aplica.

---

## Consideraciones generales para el frontend

- **Autenticación:** La mayoría de los endpoints requieren un token Bearer válido. Asegúrate de manejar expiración y renovación de tokens.
- **Estados de cita:** Usa los campos `status` e `isPaid` para mostrar el estado visual y las acciones disponibles (pago, reagendar, cancelar, etc.).
- **Pagos:** Antes de crear o liquidar una cita, valida que el usuario tenga métodos de pago registrados si el especialista requiere anticipo o pago total y si la cita será pagada con tarjeta.
- **Videollamadas:** Muestra el enlace de videollamada solo si la cita es virtual (`addressId` nulo o vacío).
- **Errores:** Muestra mensajes claros al usuario según los códigos y mensajes de error documentados.
- **Horarios:** Usa los endpoints de working-hours para mostrar y editar la disponibilidad de los especialistas.
- **Notificaciones:** El backend envía correos automáticos, pero el frontend debe guiar al usuario en los flujos de pago, confirmación y recordatorios.
- **Validaciones:** Valida en frontend los datos antes de enviarlos (fechas, horas, UUIDs, etc.) para evitar errores 400.
- **Accesibilidad:** Asegúrate de que los flujos de agendado, pago y cancelación sean claros y accesibles para todos los usuarios.

---

- **Última actualización:** 2026-03-15
- **Total de archivos:** 13+
