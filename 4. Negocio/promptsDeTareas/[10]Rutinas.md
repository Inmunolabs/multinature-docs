# [10] Rutinas

Genera un archivo CSV con las siguientes tareas, siguiendo el formato que te pasé antes:

- ✅ [10001] Actualizar el routines-api para que tenga una estructura similar al diets-api

  Contexto: La tarea abarca los siguientes puntos:

  1. Actualizar el routines-api para que tenga una estructura similar al diets-api.
  2. Intentar duplicar la estructura de los datos para que ambas apis tengan una estructura similar.
  3. Eliminar el endpoint `DELETE /routines`, y todo lo relacionado con el.
  4. No crear el endpoint `GET /routines/today/:id` ya que esta funcionalidad pertenecerá a otro endpoint
  5. Ignorar los endpoints `GET /routines/user/:id` y `GET /routines/specialist/:id` ya que podrían ser eliminados (Tarea [015] del BACKLOG)

  Tags: back

  Assignee: Samuel Reveles

- [10002] Refactorizar estructura de routines_snapshots y actualizar su uso en el sistema

  Contexto: Agregar las siguientes columnas a la tabla de `routines_snapshots`

  `startDate` date NOT NULL,
  `endDate` date NOT NULL,

  Que representan de que periodo a que periodo abarca el snapshot, y debería ser desde la última rutina registrada hasta el día de su creación, o desde la creación de la rutina vigente hasta el día de hoy

  Tags: back

  Assignee: Erick Robles