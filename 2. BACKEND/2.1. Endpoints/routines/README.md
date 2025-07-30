# API de Routines

Esta documentación cubre todos los endpoints relacionados con la gestión de rutinas de ejercicios.

## Índice de Endpoints

- [GET /routines/:id - Obtener rutina por ID](./routines-get.md)
- [GET /routines/user/:userId - Rutinas de un usuario](./routines-list-by-user.md)
- [GET /routines/specialist/:specialistId - Rutinas de un especialista](./routines-list-by-specialist.md)
- [GET /routines/exercises/:specialistId - Ejercicios de un especialista](./routines-exercises-by-specialist.md)
- [POST /routines - Crear rutina](./routines-create.md)
- [POST /routines/exercises - Crear ejercicio](./routines-create-exercise.md)
- [PATCH /routines/:id - Actualizar rutina](./routines-update.md)
- [PATCH /routines/exercises/:id - Actualizar ejercicio](./routines-update-exercise.md)
- [DELETE /routines/exercises/:id - Eliminar ejercicio](./routines-delete-exercise.md)
- [GET / - Healthcheck](./routines-healthcheck.md)

---

## Reglas importantes y contexto del proyecto

- Las rutinas son conjuntos de ejercicios diseñados por especialistas.
- Las rutinas pueden ser asignadas a pacientes específicos.
- Las rutinas pueden tener diferentes niveles de dificultad.
- Los ejercicios pueden tener videos, imágenes y descripciones.
- Las rutinas pueden ser activas o inactivas.
- Los ejercicios pueden tener series, repeticiones y descansos.

---

## Consideraciones generales para el frontend

- **Niveles:** Mostrar rutinas según el nivel del usuario.
- **Ejercicios:** Mostrar ejercicios con videos e imágenes explicativas.
- **Progreso:** Permitir seguimiento del progreso del usuario.
- **Asignación:** Mostrar rutinas asignadas por especialistas.
- **Dificultad:** Mostrar indicadores de dificultad de ejercicios.
- **Series:** Mostrar series, repeticiones y tiempos de descanso.
- **Multimedia:** Reproducir videos y mostrar imágenes de ejercicios.
- **Historial:** Mostrar historial de rutinas completadas. 