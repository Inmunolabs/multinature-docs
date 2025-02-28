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

- [0300?] Crear endpoint para que paciente confirme una cita
  // TODO
