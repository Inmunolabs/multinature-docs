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

- ✅ [10002] Refactorizar estructura de routines_snapshots y actualizar su uso en el sistema

  Contexto: Agregar las siguientes columnas a la tabla de `routines_snapshots`

  `startDate` date NOT NULL,
  `endDate` date NOT NULL,

  Que representan de que periodo a que periodo abarca el snapshot, y debería ser desde la última rutina registrada hasta el día de su creación, o desde la creación de la rutina vigente hasta el día de hoy

  Tags: back

  Assignee: Erick Robles

- ✅ [10003] Actualizar getDayDetail para agrupar ejercicios por rutina y ajustar reemplazos a nivel de rutina

  Contexto: Actualizar el endpoint `getDayDetail` para que los ejercicios se agrupen por `routineId`, tanto para rutinas activas como para rutinas cargadas desde snapshot. Esta estructura agrupada es necesaria para mostrar correctamente los datos en el frontend, donde cada rutina representa un acordeón con sus ejercicios y equivalencias.
  Los reemplazos de ejercicios deben ser a nivel de rutina, no de ejercicio, modificar el ENUM `type` de la tabla `user_action_replacements` de `enum('meal','exercise')` a `enum('meal','routine')` y todo lo que tenga relación en las APIs.
  La descripción de cada rutina (en las actividades de los usuarios) debe ser un concatenado de los nombres de los ejercicios con sus `repetitions` y ordenados ascendentemente (de 1 a "n").

  Tags: back, front

  Assignee: Erick Robles

- ✅ [10004] Vista para crear rutinas

  Tags: back, front

  Assignee: Erick Robles

  _Tarea creada por Erick_

- ✅ [10005] Cambio en rutinas segun recomendaciones de David

  Tags: back, front

  Assignee: Erick Robles

  _Tarea creada por Erick_

- ✅ [10006] Buscar una base de datos para los ejercicios de rutinas

  Contexto: Considerar agregar rutinas basicas/genericas para facilitar el uso del sistema

  Tags: back

  Assignee: Antoine Ganem

- ✅ [10007] Permitir mover los ejercicios (drag & drop) en el calendario semanal para faciliar la asignación de rutina

  Tags: back

  Assignee: Erick Robles

- ✅ [10008] Crear una manera diferente para manejar las Estadísticas y Metas de rutinas.

  Contexto: La tabla `users_goals` actual puede quedarse corta para registrar datos de rendimiento detallado. Se sugiere:

  - Crear una tabla adicional `user_workout_stats` para registrar:
    - `user_id`, `routine_id`, `exercise_id`.
    - Duración real vs programada.
    - Series completadas y repeticiones logradas.
    - Fecha/hora de cada acción.

  Tags: back

  Assignee: Antoine Ganem
