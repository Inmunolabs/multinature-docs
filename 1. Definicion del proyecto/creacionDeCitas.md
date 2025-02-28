# Creación de citas

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

## Validaciones generales

- Estructura de la Request
  - Token (Validación de jwt token)
    - requestUser existe
  - Estructura del body
    - ```body.date``` formato de fecha (```isISO8601()```)
    - ```body.date > new Date()```
    - ```body.specialistId``` y ```body.userId``` son ```isUUID()```
    - Formato de las horas (HH:MM)
    - ```body.notes``` es opcional, puede ser vacio y es string
- Cita única
  - El especialista tiene disponibilidad en ese horario
  - El usuario tiene disponibilidad en ese horario
- Si el `requestUser.id` es diferente al ```body.userId``` y al ```body.specialistId``` no se puede agendar una cita. (TODO: Al menos hasta trabajar el control parental)

## Validaciones particulares

- Si el especialista es quien agenda la cita
  - El usuario pertenece a su lista de pacientes
- Si el usuario es quien agenda la cita
  - El especialista lo tiene asignado
