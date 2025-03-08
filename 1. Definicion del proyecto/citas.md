# Citas

## Agendar una cita

Un usuario o un especialista pueden agendarse una cita entre si. (**El token determina quien esta agendando la cita.**)

- Si specialistId es igual al `requestUser.id` un especilista esta agendando la cita a un usuario
- Si userId es igual al `requestUser.id` un usuario esta agendando la cita a un especialista

1. El usuario necesita pertenecer a la lista de pacientes/clientes del especialista
2. El usuario necesita tener disponibilidad de horario en la fecha (`date`) y hora (`starDate` & `endDate`) de la nueva cita
3. El especialista necesita tener disponibilidad de horario en la fecha (`date`) y hora (`starDate` & `endDate`) de la nueva cita
4. La fecha de la cita debe ser después del día en curso. Formato de fecha (`isISO8601()`)
5. La hora de finalización (`endDate`) de la cita debe ser mayor a la hora de inicio de la cita (`starDate`)
6. Si la cita será fisica, la dirección (`addressId`) debe pertenecer al especialista
7. La dirección de la cita debe ser la dirección de un consultorio del especialista (`address.isClinic === true`)
8. Si el especialista tiene `chargePerConsultation > 0` se debe generar un servicio (orden de pago para el cliente (`service_payments`)) por la cantidad que el especialista tenga configurada
9. Si el especialista tiene `chargeAdvancePayment > 0` a ese `service_payment` se le genera un pago por anticipo como complemento del servicio (`Consulta`) (`service_payment_complements`).
10. Si el especialista tiene `chargePerConsultation = 0` y `chargeAdvancePayment > 0` solo se genera un `service_payment` `Anticipo de consulta`
11. Si el especialista tiene `chargePerConsultation = 0` y `chargeAdvancePayment = 0` no se genera ningún `service_payment`

Notas clave:

- Un Anticipo de un consulta (un `service_payment_complements`) puede llegar a ser el pago completo del servicio (`service_payments`).
  - Para este caso el `service_payments` estará compuesto de los siguientes campos:
    - `paymentMethod` y el `paymentProvider` serán objetos vacios (`{}`) y
    - `status` será `Pagado`
- Un `service_payments` puede o no complemetarse de uno o más `service_payment_complements`
- Si el `service_payments` es una `Consulta` y esta compuesto de un `service_payment_complements` (como Anticipo de consulta)
  - El sistema siempre tendrá la opción de liquidar el pago pendiente de la consulta a partir de la información del `service_payments` y considerando el pago del `service_payment_complements`,
  - El especialista se podrá poner de acuerdo con el cliente para completar el pago del `service_payments`
  - Si el usuario liquida la `Consulta` en efectivo (fuera del alcance del sistema), el especialista deberá actualizar el estado `service_payments`.

A[Agendar cita] --> B1{¿Usuario pertenece a la lista de pacientes?}
B1 -- Sí --> B2{¿Usuario tiene disponibilidad?}
B1 -- No --> Z[Fin]
B2 -- Sí --> B3{¿Especialista tiene disponibilidad?}
B2 -- No --> Z
B3 -- Sí --> B4{¿Fecha de la cita > hoy?}
B3 -- No --> Z
B4 -- Sí --> B5{¿Hora de fin > Hora de inicio?}
B4 -- No --> Z
B5 -- Sí --> B6{¿Cita física?}
B5 -- No --> Z
B6 -- Sí --> B7{¿Dirección pertenece al especialista?}
B6 -- No --> C1[Validación exitosa]
B7 -- Sí --> B8{¿Dirección es un consultorio?}
B7 -- No --> Z
B8 -- Sí --> C1
B8 -- No --> Z
C1 --> D1{¿chargePerConsultation > 0?}
D1 -- Sí --> D2[Generar servicio: Consulta]
D1 -- No --> E1{¿chargePerConsultation = 0 y chargeAdvancePayment > 0?}
D2 --> D3{¿chargeAdvancePayment > 0?}
D3 -- Sí --> D4[Agregar pago por anticipo]
D3 -- No --> Z
D4 --> Z
E1 -- Sí --> E2[Generar servicio: Anticipo de consulta]
E1 -- No --> F1{¿chargePerConsultation = 0 y chargeAdvancePayment = 0?}
E2 --> Z
F1 -- Sí --> Z
