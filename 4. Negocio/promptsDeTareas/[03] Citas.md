# [03] Citas

Genera un archivo CSV con las siguientes tareas, siguiendo el formato que te pasé antes:

- ✅ [03004] Completar el agendamiento de citas, de especialista a usuario y de usuario a especialista

  Contexto: Complemento de las tareas "[03002] Validar que no se pueda crear dos bookings iguales" y "[03003] Validar la perspectiva del usuario o especialista que crea la cita"

  - Un solo endpoint para la creación de citas (`POST {{bookingsHost}}/bookings`)
  - El token determina quien esta agendando la cita.
    - Del token se obtiene el `requestUser`
  - Body Request:

  ```js
  	{
  		specialistId: "a01528ca-4be4-4cae-bd2c-ebf6449e457c", // Especialista que llevará la cita
  		userId: "a4895fc8-d662-4ebf-ba9f-a9ace2a74d6a", // Usuario que será atendido en la cita
  		date: "2024-08-07",
  		startHour: "14:00",
  		endHour: "14:30",
  		notes: "Todo cool, es solo una prueba"
    }
  ```

  - Si specialistId es igual al `requestUser.id` un especilista esta agendando la cita a un usuario
  - Si userId es igual al `requestUser.id` un usuario esta agendando la cita a un especialista
    **Validaciones generales**
  - Estructura de la Request
    - Token (Validación de jwt token)
      - requestUser existe
    - Estructura del body
      - `body.date` formato de fecha (`isISO8601()`)
      - `body.date > new Date()`
      - `body.specialistId` y `body.userId` son `isUUID()`
      - Formato de las horas (HH:MM)
      - `body.notes` es opcional, puede ser vacio y es string
  - Cita única
    - El especialista tiene disponibilidad en ese horario
    - El usuario tiene disponibilidad en ese horario
  - Si el `requestUser.id` es diferente al `body.userId` y al `body.specialistId` no se puede agendar una cita. (TODO: Al menos hasta trabajar el control parental)
    **Validaciones particulares**
  - Si el especialista es quien agenda la cita
    - El usuario pertenece a su lista de pacientes
  - Si el usuario es quien agenda la cita - El especialista lo tiene asignado
    Si se tienen dudas acercarse con Miguel
    Tags: back
    Assignee: Erick Robles

- ✅ [03006] Agregar el id de la dirección y la url de videollamada y cambiar el reason por el id de la especialidad

  Contexto: Modificar la tabla de la base de datos, y el bookings-api, ojo en los endpoints `POST {{bookingsHost}}/bookings` y `PATCH /bookings/:id`
  Tags: back
  Assignee: Erick Robles

- ✅ [03007] Validar funcionalidad de actualización de cita

  Contexto: El especialista y el usuario involucrados en la cita deben ser capaces de modificarla, ya sea el horario, el lugar, la url de videollamada, o las notas.
  El endpoint ya existe (`PATCH /bookings/:id`), verificar que el funcionamiento sea el adecuado, de lo contrario corregirlo
  Tags: back
  Assignee: Erick Robles

- ✅ [03008] Crear endpoint para cancelación de cita

  Contexto: El especialista y el usuario involucrados en la cita deben ser capaces de cancelar la cita. No queremos borrar la cita de la base de datos, sino marcarla como cancelada y guardar un motivo en el campo `notes` concatenando las posibles notas que la cita tenga, por ejemplo: notes: "El paciente padece de hipertencion. CITA CANCELADA POR: {nombreDeQuienCancelo}. DEBIDO A: {razón} (Ej: Razón: No puedo asistir)"
  El endpoint no existe crearlo como `PATCH /bookings/:id/cancel`
  Tags: back
  Assignee: Erick Robles

- ✅ [02002] Agregar bandera para definir si la dirección es un consultorio de especialista

  Contexto: Modificar la base de datos y los endpoints
  Tags: back
  Assignee: Erick Robles

Genera un archivo CSV con las siguientes tareas, siguiendo el formato que te pasé antes:

- ✅ [03009] Generar una orden de pago para Cobro de confirmación de la cita

  Contexto: Al agendar una cita si el especialista citado tiene configurado el cobro de anticipo de confirmación de cita (campo `charge_advance_payment` de la nueva tabla `specialist_settings` mayor a 0) generar una orden de pago para confirmar la cita del usuario a partir de los parametros de la cita y el valor del campo `charge_advance_payment`.
  Tags: back
  Assignee: Samuel Reveles

- ✅ [03010] Crear webhook del pago de la confirmación de la cita

  Contexto: Una vez que el usaurio efectue el pago de la confirmación de la cita se deberá notificar al usuario y al especialista la confirmación de la misma ([19007] Notificar al usuario y al especialista sobre la confirmación de una nueva cita). El objetivo de la tarear es crear el webhook que permitirá operar esta lógica.
  Tags: back
  Assignee: Samuel Reveles

- ✅ [03011] Crear endpoint para confirmación de cita

  Contexto: Al agendar una cita si el especialista citado no tiene configurado el cobro de anticipo de confirmación de cita (campo `charge_advance_payment` de la nueva tabla `specialist_settings` igual o menor a 0), el usuario citado o el especialista (depende quien creo la cita) deberá poder confirmar su cita. El objetivo de esta tarea es crear el endpoint `GET {{bookingsHost}}/bookings/confirm/:id` en el bookings-api para permitir esa confirmación. El endpoint deberá contar con valiaciónes de relaciones entre los dos citados, de que la constante `charge_advance_payment` de la tabla `specialist_settings` sea igual o menor a 0, etc.
  Después de esto se deberá notificar la confirmación de cita al usuario y al especialista ([19007] Notificar al usuario y al especialista sobre la confirmación de una nueva cita).
  Tags: back
  Assignee: Samuel Reveles

- ✅ [03012] Confirmación de cita para especialistas 
  
  Contexto: Cuando un usuario agende una cita, el especialista la confirma seleccionando el lugar de la cita. La lógica deberá quedar en el endpoint `PATCH /bookings/:id`. Tomar en cuenta validaciones como que los domicilios tengan la bandera `isClinic` en `true` y que las direcciones sean direcciones del especialista
  Tags: back
  Assignee: Erick Robles

- [03013] Crear endpoint para liquidar el pago de una cita

  Tags: back
  Assignee: Erick Robles
