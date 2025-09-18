# Flujos de Rutinas (Instrucciones para Pandalatec)

En este documento se describen los requisitos de UI/UX y la lógica de interacción para el desarrollo del flujo de **creación de rutinas por especialistas** y **ejecución de rutinas por usuarios** en la app móvil de Multinature.

Este README se centra en la experiencia del usuario final y en el flujo que Pandalatec debe maquetar.

---

## Flujo 1: Creación de Rutinas (Especialistas)

Los especialistas deben poder:

- Seleccionar ejercicios de una lista existente o crear nuevos.
- Definir para cada ejercicio:
  - **Series** y **repeticiones**.
  - **Descansos entre repeticiones** y **descansos entre series** (cronómetro con alarma).
  - Clasificación por **lugar de entrenamiento** (gimnasio, casa, parque, etc.).
  - Clasificación por **parte del cuerpo** (bíceps, tríceps, pecho, etc.).
  - Accesorios necesarios, descripción, imágenes.
  - GIFs o videos cortos demostrativos.
- Crear **agrupaciones** de ejercicios:
  - Superseries.
  - Circuitos.
  - Ejercicios equivalentes (sugerencias para sustituciones).
- Asignar las rutinas a usuarios específicos y agregar notas.
- Previsualizar la rutina como la verá el usuario.
- Permitir duplicar o reutilizar rutinas previas (snapshots).
- Opción para marcar ciertos ejercicios como opcionales.

### Propuestas adicionales

- Sugerir tiempos de descanso estándar según tipo de ejercicio.

---

## Flujo 2: Ejecución de Rutinas (Usuarios)

Los usuarios deben poder:

- Ver su rutina diaria en un formato claro y ordenado por día y grupo muscular.
- Iniciar y finalizar manualmente cada serie o ejercicio.
- Si hay un descanso programado:
  - El cronómetro inicia automáticamente al marcar el fin del ejercicio/serie.
  - Alarma/alerta al terminar el descanso.
- Marcar un ejercicio como completado sin cronómetro si es necesario (por ejemplo, por ocupación del gimnasio).
- Visualizar descripción, accesorios, imágenes y videos para cada ejercicio.
- Posibilidad de sustituir un ejercicio por una equivalencia sugerida.
- Registrar automáticamente los tiempos de ejecución y descanso en la base de datos.
- Modo “Manual” para usuarios que no pueden seguir los tiempos.

### Propuestas adicionales

- Mostrar progreso diario (ejercicios completados vs pendientes).

---

## Clasificación y Medios

- Imágenes: PNG/JPG.
- Videos: MP4 o GIF.

### Propuestas adicionales

- Mostrar previsualizaciones optimizadas en la app para ahorrar datos.

---

## Consideraciones Finales

- La interacción debe ser intuitiva y accesible.
- Toda la lógica de cronómetro y registro de tiempos debe ser clara y visual.
- Las funciones deben funcionar también en modo manual.
- Se agradecen propuestas de mejora por parte de Pandalatec.
