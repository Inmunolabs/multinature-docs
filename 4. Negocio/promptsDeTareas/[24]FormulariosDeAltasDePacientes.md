# [24] Formularios de Altas de Pacientes

Genera un archivo CSV con las siguientes tareas, siguiendo el formato que te pasé antes:

Task Name Description Priority Status tags

- ✅ [24001] Crear las tablas en la base de datos para completar el flujo de Formularios de Altas de Pacientes

  Contexto: Diseñar y crear las tablas necesarias para soportar los templates de formularios, conceptos, formularios llenados y sus valores capturados.

  Tags: back

  Assignee: Samuel Reveles

- ✅ [24002] Crear la nueva API para completar el flujo de Formularios de Altas de Pacientes

  Contexto: crear la nueva API para soportar los templates de formularios, conceptos, formularios llenados y sus valores capturados.

  Tags: back

  Assignee: Samuel Reveles

- ✅ [24003] Crear endpoint para registro de templates de formulario por especialista

  Contexto: Agregar un endpoint que permita a un especialista crear un nuevo formulario tipo plantilla con una lista personalizada de conceptos y configuraciones.

  Tags: back

  Assignee: Samuel Reveles

- ✅ [24004] Crear endpoint para obtención de templates de formulario disponibles

  Contexto: Desarrollar el endpoint que retorne los formularios tipo plantilla disponibles para un especialista, incluyendo los generales del sistema y los propios.

  Tags: back

  Assignee: Samuel Reveles

- ✅ [24005] Crear formulario para registrar un nuevo template desde el panel del especialista

  Contexto: Diseñar una vista que permita a los especialistas crear un nuevo template de formulario y configurar sus conceptos, unidades, y si son graficables.

  Tags: front

  Assignee: Diego Martin Ponce

- ✅ [24006] Crear endpoint para guardar formulario clí­nico capturado durante una cita

  Contexto: Generar un endpoint para guardar un formulario lleno basado en un template y vinculado a una cita existente, incluyendo cada valor registrado.

  Tags: back

  Assignee: Samuel Reveles

- ✅ [24007] Crear formulario en la vista de cita para que el especialista capture datos clí­nicos

  Contexto: Agregar en la vista de detalles de cita una sección donde el especialista pueda seleccionar un template y llenar los datos clí­nicos correspondientes.

  Tags: front

  Assignee: Diego Martin Ponce

- ✅ [24008] Agregar validación de edición limitada por tiempo en formularios clí­nicos

  Contexto: Implementar lógica para permitir la edición directa de formularios clí­nicos solo dentro de los primeros 7 días desde su creación.

  En relación con la tarea [24010]

  Tags: back

  Assignee: Samuel Reveles

- ✅ [24009] Agregar opción en frontend para editar formularios clí­nicos

  Contexto: Permitir que el especialista edite los formularios clí­nicos llenados recientemente si están dentro del periodo permitido de edición.

  Tags: front

  Assignee: Diego Martin Ponce

- ✅ [24010] Crear lógica para duplicar formulario clí­nico vencido y crear uno nuevo editable

  Contexto: Agregar lógica backend para clonar formularios clí­nicos cuando han pasado más de 7 días y crear una nueva instancia editable.

  En relación con la tarea [24008]

  Tags: back

  Assignee: Samuel Reveles

- ✅ [24011] Mostrar listado de formularios clí­nicos por cita en el frontend

  Contexto: Diseñar la vista que muestre el historial de formularios llenados en cada cita del paciente con la opción de ver detalles.

  Tags: front

  Assignee: Diego Martin Ponce

- ✅ [24012] Crear CRUD para preguntas personalizadas del template del especialista

  _Tarea creada por Samuel_

- ✅ [24013] Agregar endpoint para listar los formularios que se llenaron de un pacienteF

  _Tarea creada por Samuel_

- ✅ [24014] Agregar una bandera a los templates para identificarlos como una "Valoración inicial"

  Contexto: Agregar una bandera a los formularios clí­nicos para indicar que el formulario es una "Valoración inicial" esto para complementar el registro o alta de un nuevo paciente. El especialista puede tener más de un template para "Valoraciones iniciales"

  Tags: back

  Assignee: Samuel Reveles

- ✅ [24015] Desarrollar el flujo para dar de Alta a un paciente

  Contexto: Este flujo de alta de paciente consiste en dos formularios uno para para llenar los datos de registro de un paciente (ENDPOINT: `POST {{userHost}}/specialists/patient`) y el otro para llenar el formulario de "Valoración inicial" esto para complementar el registro de un nuevo paciente.

  El formulario de valoración inicial no tiene una estructura bien definida ya que cada especialista puede crear su propio formulario, por este motivo, este segundo paso del alta de pacientes debe ser dinámico

  Tags: front

  Assignee: Diego Martin Ponce
