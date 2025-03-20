# [BACKLOG]

Genera un archivo CSV con las siguientes tareas, siguiendo el formato que te pasé antes:

- ✅ [001] Modificar menus de navegación

  Contexto: Revisar con Andrés no es prioridad

- ✅ [002] Hacer que las validaciones comunes sean globales (agregarlas a alguna layer multiproyecto)

- ✅ [003] Evaluar la opción de crear un endpoint para enviar las configuraciones de vistas de especialistas por sus especialidades

  Tags: back

- ✅ [004] CRUD de Configuraciones o Ajustes de vistas por especialista ([003])

  Contexto: ¿Qué componentes quiere ver el especialista?, ¿Las gráficas de sus pacientes con que filtros por default aparecen?, ¿Que fórmulas de dietocálculo utilizan?, etc.

  Tags: back

- ✅ [005] Agregar el número de teléfono de contacto a las constantes del sistema

  Tags: back

- ✅ [006] Actualizar el diagrama de agendamiento de citas (`agendarCita.excalidraw`)

  Contexto: Hasta hoy falta agregar cuales son los campos que un `admin` puede/debe utilizar para agendar una cita y cuales son los campos que un `Usuario` puede/debe utilizar.
  [ChatGPT - Excalidraw Diagrama Asistencia](https://chatgpt.com/share/67cf4acd-cbd8-8000-a4a7-31c75b59e458)
  Incluye modificar el _Flujo_ de _Agendar una cita_ del archivo `citas.md`

  Tags: negocio

  Assignee: Miguel Angel Valdés García

- [007] Eliminar el endpoint {{userHost}}/specialists/config/:id

  Contexto: Endpoint creado en la tarea [[17007] Crear endpoint para la obtención de las configuraciones de especialista](https://app.clickup.com/t/868cwep57), ya no será utilizado ya que esa información se obtiene desde el login de cada usuario

  Tags: back

- [008] Cambiar todo lo referente a specialities/speciality por specialties/specialty

  Contexto: La palabra correcta en inglés es **"specialty"**. La forma **"speciality"** también existe, pero es más común en el inglés británico. En inglés americano, **"specialty"** es la forma estándar.

  Considerar todos los cambios de la base de datos (`SPECIALITIES_TABLE specialities`) y del backend.

  Tags: back

- [009] Actualizar los nombres de las columnas de las tablas de la base de datos 
  
  Contexto: Utilizar snake_case en lugar de camelCase y reemplazar created_at y updated_at en lugar de created y updated

  Tags: back

- [010] Crear un Bitwarden para todas las credenciales de Inmunolabs

  Contexto: Crear un Bitwarden para todas las credenciales de Inmunolabs, agregar credenciales de las cuentas de Google (Gmail), GitHub, Vercel, ClickUp, Mercado Pago, Openpay, Neubox, etc.

  Tags: negocio

  Assignee: Miguel Angel Valdés García