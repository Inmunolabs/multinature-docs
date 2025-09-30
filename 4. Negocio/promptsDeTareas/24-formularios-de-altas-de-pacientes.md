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

- ✅ [24007] Implementar panel de atención de cita (consulta de paciente) para especialistas en nutrición

  Contexto: Agregar en la vista de consulta un formulario para que el especialista seleccione uno o más de los templates de formularios y capture los datos correspondientes del paciente. Esta vista debe ser accesible por el especialista desde el perfil del usuario o desde la cita asignada.

  Tags: front

  Assignee: Diego Martin Ponce

- ✅ [24008] Agregar validación de edición limitada por tiempo en formularios clí­nicos

  Contexto: Implementar lógica para permitir la edición directa de formularios clí­nicos solo dentro de los primeros 7 días desde su creación.

  En relación con la tarea [24010]

  Tags: back

  Assignee: Samuel Reveles

- ✅ [24009] Agregar opción en frontend para editar formularios clí­nicos

  Contexto: Permitir que el especialista edite los formularios clí­nicos llenados recientemente si están dentro del periodo permitido de edición (7 días).

  Tags: front

  Assignee: Diego Martin Ponce

- ✅ [24010] Crear lógica para duplicar formulario clí­nico vencido y crear uno nuevo editable

  Contexto: Agregar lógica backend para clonar formularios clí­nicos cuando han pasado más de 7 días y crear una nueva instancia editable.

  En relación con la tarea [24008]

  Tags: back

  Assignee: Samuel Reveles

- ✅ [24011] Diseñar y desarrollar vista para mostrar el histórico de formularios llenados en citas del paciente

  Contexto: Diseñar la vista que muestre el historial de formularios llenados en cada cita del paciente con la opción de ver detalles.

  Tags: front

  Assignee: Diego Martin Ponce

- ✅ [24012] Crear CRUD para preguntas personalizadas del template del especialista

  _Tarea creada por Samuel_

- ✅ [24013] Agregar endpoint para listar los formularios que se llenaron de un paciente

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

- ✅ [24016] Agregar campo `is_mandatory` a los `form_template_concepts`

  Contexto: Agregar bandera `is_mandatory` a los `form_template_concepts` (antes `form_template_units`) para que se indique si el campo es obligatorio de llenar en el formulario; esto con el fin de forzar los campos necesarios para el llenado de las fórmulas de los dietocalculos

  Tags: back

  Assignee: Samuel Reveles

- ✅ [24017] Crear formularios de "Valoración inicial (Multinature)" y "Dietocalculos (Multinature)"

  Contexto: Crear los formularios con sus respectivos campos obligatorios

  Tags: negocio

  Assignee: Antoine Ganem

- ✅ [24018] Actualizar el funcionamiento de los `form_template_concepts` y los `concepts` para que sea afín al frontend

  Contexto: Realizar los ajustes acordados durante la videollamada del 15 de abril. La intención que desde el `POST {{formHost}}/forms/template` se creen también los `concepts`

  Tags: back

  Assignee: Samuel Reveles

- ✅ [24019] Al crear un paciente activar su usuario para permitir la actualización de su contraseña

  Contexto: Cuando un especialista crea un nuevo paciente (endpoint `POST /specialists/patient`) activar la cuenta de ese nuevo usuario (`isActive: true`) para permitir la actualización de su contraseña

  Tags: back

  Assignee: Samuel Reveles

- ✅ [24020] Desarrollar la posibilidad de agregar metas a los conceptos gráficables de los formularios

  Contexto: Desarrollar la opción de agregar metas a los conceptos gráficables de los formularios, por ejemplo en el concepto "Peso" un especialista debe poder agregar el peso actual de su paciente y la meta a la que debe llegar para el fin de esa dieta

  Tags: back

  Assignee: Samuel Reveles

- ✅ [24021] Agrupar los formularios que son de "Valoración inicial"

  Contexto: Yo como especialista quiero ver los formularios de "Valoración inicial" agrupados en el select de formularios al desarrollar una consulta y al dar de alta a un nuevo paciente

  Tags: front

  Assignee: Diego Martin Ponce

- ✅ [24022] Migrar users_goals a filled_form_value_id con enum direction

  Contexto: Se actualizó el flujo de guardado de metas del usuario (users_goals) para que en lugar de almacenar el concept_id, utilice el filled_form_value_id, asegurando así un enlace directo al valor específico llenado en un formulario. Además, se dejó de usar valores booleanos para el campo direction y se cambió por un enum (asc | desc). El frontend interpretará esto como booleano para su componente gráfico, manteniendo así compatibilidad sin modificar el diseño visual. Se actualizaron los insert, las queries y la estructura general de la tabla.

  Tags: front

  Assignee: Erick Robles

  _Tarea creada por Erick_

- ✅ [24023] Al crear un formulario siempre agregar los conceptos de la altura y peso

  Contexto: Al crear un template de formulario por default siempre agregar los conceptos de la altura y peso aunque el especialista no los agregue explicitamente a su petición de creación del formulario

  Tags: back

  Assignee: Erick Robles

- ✅ [24024] Categorizar las preguntas de los formularios

  Contexto: Agregar un campo de category que sea un enum de los diferentes tipos de preguntas que pueden existir, con el fin de agruparlas y hacer más sencilla su búsqueda/uso

  Tags: back

  Assignee: Antoine Ganem

- ✅ [24025] Agregar preguntas genericas para los formularios de rutinas y de dietas.

  Contexto: Considerar agregar las siguientes categorías de preguntas para casos de uso del módulo de rutinas:

  - Historial Clínico (Antecedentes familiares, Enfermedades/Cirugías Previas, Enfermedades DX (Enfermedades de diagnóstico), Medicamentos)
  - Ejercicio (¿Cuánto tiempo tienes de sedentario?, ¿Qué tanta disponibilidad de tiempo tienes para realizar tus ejercicios?, etc.)
  - Pruebas físicas, por ejemplo: ¿Cuántas lagartijas puede sacar?, ¿Cuántas sentadillas por minuto puedes hacer? (con el fin de revisar postura, cadera, rodillas, pie plano, etc.), prueba de escalon, etc.
  - Capacidad fisica persivida
  - Nivel sobre conocimientos de fisica, cuerpo y el objetivo del ejercicio.
  - Prescripción de cardio, fatmax (punto de intensidad del ejercicio donde el cuerpo oxida la mayor cantidad de grasa como combustible por unidad de tiempo)
  - Composición corporal, porcentaje de grasa, somototipo.
  - Frecuencia, Observaciones, Molestias, Lesiones,
  - Ginecológico (Frecuencia CM, Flujo CM, Duración Menst., Molestias)
  - Hábitos nocivos (Tabaco, Alcohol, Café, Refresco, Jugos)
  - Nivel de estrés
  - Hábitos de sueño
  - Hábitos Laborales (Tipo, Horario, Comidas, Accesorios)
  - Suplementos deportivos
  - Frecuencia alimentaria (Horario 1, Horario 2, Horario 3)
  - Gastrointestinales (Apetito, Digestión, Evacuaciones)
  - Consumo de agua
  - Alergias
  - Intolerancias
  - Aversiones

  Tags: back

  Assignee: Antoine Ganem

- ✅ [24026] Crear endpoint para traer banco de preguntas globales

  Tags: back

  Assignee: Antoine Ganem

  _Tarea creada por Antoine_

- ✅ [24027] Crear formularios que funcionen como plantillas genericas para los especialistas

  Tags: back

  Assignee: Antoine Ganem

  NOTA: Esta tarea es similar a la tarea _[24017] Crear formularios de "Valoración inicial (Multinature)" y "Dietocalculos (Multinature)"_

- ✅ [24028] Al crear/editar un fomulario permitir agregar/quitar la meta de cualquier concepto

  Contexto: Al crear/editar un fomulario permitir agregar/quitar la meta de cualquier concepto. Al llenar estos formularios en consulta solicitar la meta de manera forzosa y preseleccionar la última meta (este punto puede quedar desde front o desde back, depende como mejor convenga, ya sea que front lo previsualice, lo envie en la req y back lo valide o que back no lo espere y lo registre en automatico en la DB copiando la última meta del concepto)

  Tags: back, front

  Assigne: Samuel Reveles
