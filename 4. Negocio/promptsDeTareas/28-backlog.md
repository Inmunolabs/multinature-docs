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

- ✅ [007] Eliminar el endpoint {{userHost}}/specialists/config/:id

  Contexto: Endpoint creado en la tarea [[17007] Crear endpoint para la obtención de las configuraciones de especialista](https://app.clickup.com/t/868cwep57), ya no será utilizado ya que esa información se obtiene desde el login de cada usuario

  Tags: back

- ✅ [008] Cambiar todo lo referente a specialities/speciality por specialties/specialty

  Contexto: La palabra correcta en inglés es **"specialty"**. La forma **"speciality"** también existe, pero es más común en el inglés británico. En inglés americano, **"specialty"** es la forma estándar.

  Considerar todos los cambios de la base de datos (`SPECIALITIES_TABLE specialities`) y del backend.

  Tags: back

- ✅ [009] Actualizar los nombres de las columnas de las tablas y agregar ON UPDATE a las tablas de la base de datos

  Contexto: Utilizar snake_case en lugar de camelCase; reemplazar created_at y updated_at en lugar de created y updated y agregar ON UPDATE CURRENT_TIMESTAMP a todas las tablas para automatizar la actualización de la columna updated_at de la base de datos.

  Considerar que los nombres de las columnas en DB son en snake_case pero las variables en todo el backend deben ser nombradas en camelCase, incluidos los DTOs

  Cambiar también los nombres de los campos:

  - shippingAddress a is_shipping_address del addresses-api
  - shippingPayment a is_shipping_payment del payment-methods-api

  Tags: back

- ✅ [010] Crear un Bitwarden para todas las credenciales de Inmunolabs

  Contexto: Crear un Bitwarden para todas las credenciales de Inmunolabs, agregar credenciales de las cuentas de Google (Gmail), GitHub, Vercel, ClickUp, Mercado Pago, Openpay, Neubox, etc.

  Tags: negocio

  Assignee: Miguel Angel Valdés García

- ✅ [011] Mejorar el manejo de la sesión de usuario

  Contexto: Modificar el endpoint de `get-data-user` para que solo refresque el token, en lugar de solo enviar la información del usuario (como hace actualmente)

  Tags: back

- ✅ [012] Mejorar el manejo de la sesión de usuario

  Contexto: La información del usuaria obtenida en el login se almacenará en el navegador.

  Tags: front

- ✅ [013] Mejorar el método `listUsers` del `users-api` para disminuir las consultas que se hacen a la base de datos

  Contexto: Mejorar el flujo del método `listUsers` para por lo menmos evitar tener que hacer dos consultas por usuario en `userToDashboardDTO`

  Tags: back

- ✅ [014] Implementar Linter para tener manejo de errores en tiempo de escritura

  Tags: back

- ✅ [015] Eliminar los endpoints en desuso del routines-api y del diets-api

  Contexto: Antes de eliminar los endpoints asegurarse con frontend que de verdad no esten en uso.

  Los endpoints a eliminar son: `GET /routines/user/:id`, `GET /routines/specialist/:id`, `GET /diets/user/:id`, `GET /diets/specialist/:id`, `GET /diets/today/:id` (No eliminar este último endpoint hasta no completar la tarea [11020])

  Tags: back

- ✅ [016] Crear un API para administrar los archivos de los usuarios

  Contexto: Esta nueva api (tal vez `user-files-api`) debería absorver los siguientes endpoints del `users-api`: `GET /specialists/certificates/:id`, `GET /specialists/support-material/:id`, `GET /specialists/s3-upload`, `POST /specialists/certificates/`, `POST /specialists/support-material/`, `DELETE /specialists/certificates/:id`, `DELETE /specialists/support-material/:id`.

  Actualizar también el `api-collection`

  Tags: back

- ✅ [017] Crear un nuevo endpoint para devolver la información del usuario además del token

  Contexto: Actualmente el endpoint de login (`POST /users/login`) devuelve información del usuario además del token. Esta tarea busca refactorizar dicha lógica para que el login solo retorne el token y el perfil del usuario, y se cree un nuevo endpoint `GET users/me` que devuelva la información completa del usuario autenticado.

  Renombrar también el endpoint del login, de `POST /users/login` a `POST /auth/login`

  Tags: back

- ✅ [018] Actualizar las rutas de los endpoints refactorizados

  Contexto: Debido a la creación de la nueva api que busca liberar el `users-api` cambiar el host o base de los siguientes endpoints del `users-api`: `GET /specialists/certificates/:id`, `GET /specialists/support-material/:id`, `GET /specialists/s3-upload`, `POST /specialists/certificates/`, `POST /specialists/support-material/`, `DELETE /specialists/certificates/:id`, `DELETE /specialists/support-material/:id`. (Tarea [016](https://app.clickup.com/t/868dcy1pq))

  Considerar también los cambios de la tarea [017], que consiste en la actualización del endpoint `POST /users/login` y la creación del endpoit `GET users/me`

  Revisar con Backend cuál es el nuevo host y confirmar los diferentes endpoints

  Tags: front

- ✅ [019] Crear vista para CRUD de conceptos (solo admins)

  Contexto: Crear vista para el manejo del CRUD de los conceptos de los templates de formularios

  Considerar si el DELETE también debe de quedar visible para los especialistas, ya que es posible que alguien ponga una pregunta que no sabía que tenía registrada y ahora le aparezca doble o que alguien apenas esté aprendiendo a usar la plataforma y no se haya dado cuenta que había preguntas por defecto o cosas por el estilo.

  Tags: front

- ✅ [020] Evaluar la posibilidad de eliminar los endpoints `GET {{dietsHost}}/diets/user/{{userId}}` y `GET {{routinesHost}}/routines/user/{{userId}}`

  Contexto: Revisar con frontend si los endpoints `GET {{dietsHost}}/diets/user/{{userId}}` y `GET {{routinesHost}}/routines/user/{{userId}}` son o serán utilizados en algún apartado del sistema, si no se utilizarán eliminiarlos junto con todo lo que tenga que ver con ellos, validaciones, constanstes, MW, servicios, rutas, etc.

  Nota: Recordar a Miguel que si no se eliminan estos endpoints deberá crear las respectivas tareas para actualizar estos endpoints a como se especifican en las tareas 11024 y 11025

  Tags: back

- ✅ [021] Cambiar la ruta `{{userHost}}/users/today/:id` por `{{userHost}}/users/:id/summary/today`

  Tags: back

- ✅ [022] Cambiar la ruta `{{userHost}}/users/today/:id` por `{{userHost}}/users/:id/summary/today`

  Tags: front

- ✅ [023] Actualizar las credenciales de Google por las de la cuenta de multinature.mx@gmail.com

  Tags: back

  Assignee: Miguel Angel Valdés García

- ✅ [024] Desarrollar funcionalidad para que el admin pueda crear notificaciones para dar avisos a los usuarios

  Contexto: Considerar que puede haber notificaciones generales para todos los usuarios, o para usuarios en especifico, usuarios con cierto perfil, con cierta especialidad o incluso usuarios con un correo electrónico en especifico

  Tags: back

- ✅ [025] Desarrollar funcionalidad para que el admin pueda crear notificaciones para dar avisos a los usuarios

  Contexto: Considerar que puede haber notificaciones generales para todos los usuarios, o para usuarios en especifico, usuarios con cierto perfil, con cierta especialidad o incluso usuarios con un correo electrónico en especifico

  Tags: back

- ✅ [026] Desarrollar un rollback en los despliegues automáticos de las APIs al presentarse errores

  Contexto: Asegurar rollback ante fallos

  Tags: back

- ✅ [027] Agregar espacio en el flujo de Crear cuenta de especialista para permitir agregar el horario del especialista

  Tags: front

- ✅ [028] Cambiar el consumo de los endpoints relacionados con la administración de archivos de los usuarios

  Contexto: La nueva api (tal vez `user-files-api`) absorvió los siguientes endpoints del `users-api`: `GET /specialists/certificates/:id`, `GET /specialists/support-material/:id`, `GET /specialists/s3-upload`, `POST /specialists/certificates/`, `POST /specialists/support-material/`, `DELETE /specialists/certificates/:id`, `DELETE /specialists/support-material/:id`. Actualizar la ruta de los mismos

  Tags: front

- ✅ [029] Crear un endpoint para listar las reseñas de un especialista

  Contexto: El endpoint donde se listan los especialistas (`GET {{userHost}}/specialists/?page=1&limit=10`) responde con un listado de las últimas 5 reseñas por especialista; este endpoint nuevo busca responder con el resto de especialidades que puede tener un especialista. Paginar el endpoint y agregar las respectivas validaciones (todos los usuarios pueden ver las reseñas de un especialista)

  Tarea ligada _17037_

  Tags: back

  Assignee: Erick Robles

- ✅ [030] Implementar el consumo del nuevo endpoint paginado de reseñas de especialistas

  Contexto: Desarrollar o reciclar interfaz para mostrar a los usuarios las diferentes reseñas de los especialistas, páginar esta interfaz para poder navegar entre las distintas reseñas

  Tarea ligada _17037_ y _17038_

  Tags: back

  Assignee: Erick Robles

- ✅ [031] Crear Hook de reducers

  _Tarea creada por Erick_

- ✅ [032] Eliminar thunks y archivos que ya no se utilizan

  _Tarea creada por Samuel_

- [033] Agregar alguna variable de entorno que apague todo lo que tiene que ver con pagos a openpay y monex

  Tags: back

  Assignee: Samuel Reveles

- [034] Error: Too many connections

  Contexto: Error: Too many connections

  ```
  (λ: api) RequestId: ad46a815-09d6-4364-bbaa-a45670042388  Duration: 6297.20 ms  Billed Duration: 6298 ms
  🇷​​​​​🇪​​​​​🇸​​​​​ 🡪 [response] ❌ ERROR: {"folio":"ad46a815-09d6-4364-bbaa-a45670042388","message":"Servicio no disponible.","content":{"details":{"code":"ER_CON_COUNT_ERROR","errno":1040,"sqlState":"08004","sqlMesssage":"Too many connections"}}}
  ```

  Tags: back
