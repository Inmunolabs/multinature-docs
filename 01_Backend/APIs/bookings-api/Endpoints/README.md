# API de Bookings

Esta documentación cubre todos los endpoints relacionados con la gestión de citas (bookings) entre pacientes y especialistas.

## Índice de Endpoints

- [GET / - Healthcheck](./healthcheck.md)

- [POST /bookings - Crear cita](./create.md)
- [GET /bookings/:id - Obtener cita por ID](./get.md)
- [PATCH /bookings/:id - Actualizar cita](./update.md)
- [DELETE /bookings/:id - Eliminar cita](./delete.md)
- [GET /bookings/user/:userId - Citas de un usuario](./get-by-user-id.md)
- [POST /bookings/liquidate/:id - Liquidar pago de cita](./liquidate.md)

- [POST /monthly-services/ - Pagar mensualidad](./pay-monthly.md)
- [DELETE /monthly-services/ - Cancelar mensualidad](./cancel-monthly.md)

- [POST (WEBHOOK) /service-payment/confirm - Confirmar pago de servicio](./service-payment-confirm.md)

- [GET /working-hours/availability/:id - Disponibilidad de especialista](working-hours/working-hours-availability.md)
- [GET /working-hours/:id - Horarios de trabajo por usuario](working-hours/working-hours-get-by-user-id.md)
- [PUT /working-hours/:userId - Actualizar horarios de trabajo](working-hours/working-hours-update.md)

---

## Reglas importantes y contexto del proyecto

- El paciente puede agendar con cualquier especialista disponible y asignado a el.
- Si el especialista tiene configurado que la cita **no requiere pago anticipado**, y la cita es agendada por el paciente, esta queda **confirmada** automáticamente.
- Si se requiere pago, se crea una orden de servicio que debe liquidarse (OpenPay (pago con tarjeta o pago en tienda) / MercadoPago).
- Si la cita es virtual y no se asigna dirección, se genera un enlace de videollamada genérico.
- Se envían notificaciones por correo con datos de la cita y del pago.

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
