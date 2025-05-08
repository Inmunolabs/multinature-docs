# [03] Citas

Genera un archivo CSV con las siguientes tareas, siguiendo el formato que te pasé antes:

- ✅ [03001] Validar que no se pueda crear bookings antes de la fecha actual

- ✅ [03002] Validar que no se pueda crear dos bookings iguales

- ✅ [03003] Validar la perspectiva del usuario o especialista que crea la cita

  _Tarea creada por Erick_

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

- ✅ [03005] Actualizar el bookings-api para implementar la nueva lógica de perfiles y especialidades

  Contexto: Trabajar desde el PR https://github.com/Inmunolabs/multinature-bookings-api/pull/3/files revisar como se implemento esta actualización en el api y corregirla para implementar correctamente la nueva lógica de perfiles y especialidades

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

- ✅ [03013] Crear endpoint para liquidar el pago de una cita

  Tags: back

  Assignee: Samuel Reveles

  _Tarea creada por Samuel_

- ✅ [03014] Actualizar el funcionamiento de agendamiento de las citas

  Contexto: Un usuario y un especialista deben ser capaces de agendarse citas respectivamente. **Revisar los detalles de esta tarea en la [documentación](https://github.com/Inmunolabs/multinature-docs/blob/master/4.%20Negocio/promptsDeTareas/%5B03%5D%20Citas.md)**

  - Cuando un **usuario** agenda una cita debe poder agregar:

    1. Al especialista (desde un select de sus especialistas asignados, si solo tiene un especialista por default seleccionarlo)
    2. La especialidad (desde un select de las especialidades asignadas de sus especialistaas asignados, si solo se tiene una especialidad por default seleccionarla)
    3. La fecha (mayor o igual al día en curso)
    4. La hora de inicio (el horario al igual que la fecha dependen de la disponibilidad del especialista, pero de momento no considerarlo en el alcance de esta tarea)

  - Cuando un **especialista** agenda una cita debe poder agregar:
    1. Al usuario (desde un select de sus usuarios asignados, si se agenda la cita desde el perfil del paciente o si solo tiene un paciente por default este debe ser seleccionado)
    2. La especialidad (desde un select de sus especialidades asignadas, si solo se tiene una especialidad por default seleccionarla)
    3. La fecha (mayor o igual al día en curso)
    4. La hora de inicio (el horario al igual que la fecha dependen de la disponibilidad del especialista, pero de momento no considerarlo en el alcance de esta tarea)
    5. La hora de fin (en un futuro se plantea que este campo pueda ser por default desde configuraciones del especialista, de momento "preseleccionar" la hora de fin sumando una hora a la hora de inicio, pero que el especialista siempre tenga la opción de modificarla)
    6. La dirección donde se antenderá la cita (select con las direcciones que el especialista tiene como `isClinic` en `true`, si el especialista solo tiene una dirección con esta condición, seleccionarla por defecto)
    7. Agregar la url de la videollamada (Validar que sea una liga https) (campo opcional)
    8. Notas de la cita (campo en blanco para agregar cualquier texto) (campo opcional)

  La intención es que los formularios sean muy parecidos a la creación de "Eventos" de _Google Calendar_

  Tags: front

  Assignee: Diego Martin Ponce

- ✅ [03015] Desarrollar opción y formularios para la actualización y cancelación de una cita

  Contexto: Un usuario y un especialista deben ser capaces de actualizar y cancelar citas respectivamente. **Revisar los detalles de esta tarea en la [documentación](https://github.com/Inmunolabs/multinature-docs/blob/master/4.%20Negocio/promptsDeTareas/%5B03%5D%20Citas.md)**.

  Alinearse a las indicaciones de la tarea [03014]

  Tags: front

  Assignee: Diego Martin Ponce

- ✅ [03016] Desarrollar el funcionamiento de confirmación de citas

  Contexto: Apoyarse de las indicaciones de Samuel, si hay dudas revisarlas con el. El flujo es cambiante dependiendo de las configuraciones del especialista, si cobra anticipo o no y si cobra consulta o no; dependiendo de esto se generará un pago para la cita (y de ser necesario un complemento de ese pago). Considerar también que un especialista cuando confirme una cita debe seleccionar la dirección y tener la opción de actualizarla, modificando el horario, las notas y la url de videollamada. **Revisar los detalles de esta tarea en la [documentación](https://github.com/Inmunolabs/multinature-docs/blob/master/4.%20Negocio/promptsDeTareas/%5B03%5D%20Citas.md)**.

  Alinearse a las indicaciones de la tarea [03014]

  Tags: front

  Assignee: Diego Martin Ponce

- ✅ [03017] Agregar pago domiciliado de los especialistas (mensualidad (`monthlyCharge`))

  Tags: back

  Assignee: Samuel Reveles

  _Tarea creada por Samuel_

- ✅ [03018] Validar que haya un domicilio al agendar/actualizar una citar o crear una url de videollamada automáticamente

  Contexto: Si al agendar o actualizar una cita no se tiene un domicilio agregado, crear una url de videollamada en Meet para atender la cita desde ahí. Revisar si esta funcionalidad solo será habilitada a los usuarios que tengan correo Gmail o si puede aplicar para todos.

  Tags: back

  Assignee: Samuel Reveles

- ✅ [03019] Integrar nuestras citas a Google Calendar

  Contexto: Esta funcionalidad solo sera habilitada a los usuarios que tengan correo Gmail. El objetivo es que puedan visualizar las citas de nuestro sistema desde sus Google Calendar

  Tags: back

  Assignee: Samuel Reveles

- [03020] Eliminar el estatus "Actualizada" de las citas

  Contexto: Eliminar el estatus "Actualizada" de las citas y actualizar todas las funcionalidades relacionadas con este estatus. Si hay alguna duda durante la tarea consultarla con Miguel

  Tags: back

  Assignee: Erick Robles
