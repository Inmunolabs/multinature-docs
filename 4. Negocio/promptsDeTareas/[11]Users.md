# [11] Users

Genera un archivo CSV con las siguientes tareas, siguiendo el formato que te pasé antes:

- ✅ [11003] Modificar el manejo de la red usuarios aprovechando los beneficios de MySQL

  Contexto: El funcionamiento actual de las redes de usuario esta diseñado para funcionar con DynamoDB (NoSQL), aprovechando la base de datos de Multinature (MySQL) podemos readaptar y refactorizar todas las funcionalidades de las redes de usuario para hacer más mantenibles estos funcionamientos

- ✅ [11004] Crear constante para los Niveles de red de usuarios

- ✅ [11005] Desarrollar el Dashboard General de administradores

  Contexto: debe ser similar al de Inmuno, y agregar también la información de cuantos especialistas existen en el sistema y que especialidades tienen, así como el número general de usuarios con especialistas asignados y el número especifico por especialidad. Revisar que otra información del sistema puede ser importante medir y considerar agregarla

- ✅ [11006] Crear vista para presentar el catálogo de especialistas

  Contexto: La lista de especialistas se debe consultar desde el endpoint `GET {{usersHost}}/users/specialists`.
  El acceso a esta lista debe ser desde un botón en algún apartado de "Mis Especialistas"

  Tags: front

  Assignee: Diego Martin Ponce

- ✅ [11007] Permitir asignar o desasignar especialista
  Cobtexto: La nueva asignación o actualización debe ser desde la vista de la tarea [11006]. Se permiten múltiples especialistas por usuario, es decir, un usuario podría tener más de un Nutriólogo asignado

  Tags: front

  Assignee: Diego Martin Ponce

- ✅ [11008] Crear endpoint para enviar lista de especialistas

  Contexto: El endpoint `GET {{usersHost}}/users/specialists` debe crearse desde el users-api y debe listar a todos los especialistas del sistema.
  Los especialistas (users) deben ser agrupados por especialidad, la respuesta debería tener un `content` como este:

  ```
    "content": [
      "Entrenador": [...userWithSpecialityName=Entrenador],
      "Nutricionista": [...userWithSpecialityName=Nutricionista]
    ]
  ```

  Donde cada propiedad del arreglo de `content` es el name de cada especialidad de nuestra tabla `specialities` de nuestra base de datos. (`SELECT * FROM specialities;`)
  Los especialistas se deben order alfabéticamente por su `firstName`
  El endpoint debe contener un páginado y por default se deben enviar los primeros 20 especialistas de cada especialidad

  Tags: back

  Assignee: Erick Robles

- ✅ [11009] Crear endpoint para asignar un nuevo especialista

  Contexto: El endpoint `POST {{usersHost}}/users/specialists/{{specialistId}}` debe crearse desde el users-api y debe encargarse de asignar a un especialista, creando la relación "usuario - especialista" en la base de datos (Tabla `users_specialists`)

  Tags: back

  Assignee: Erick Robles

- ✅ [11010] Crear endpoint para reemplazar a un especialista

  Contexto: El endpoint `PUT {{usersHost}}/users/specialists/{{oldSpecialistId}}/to/{{newSpecialistId}}` debe crearse desde el users-api y debe encargarse de eliminar la relación del viejo especialista y asignar al nuevo especialista.
  Eliminando y creando las relaciones "usuario - especialista" en la base de datos (Tabla `users_specialists`)

  Tags: back

  Assignee: Erick Robles

- ✅ [11011] Crear endpoint para desasignar a un especialista

  Contexto: El endpoint `DELETE {{usersHost}}/users/specialists/{{specialistId}}` debe crearse desde el users-api y debe encargarse de eliminar la relación del especialista asignado.
  Eliminar la relación "usuario - especialista" en la base de datos (Tabla `users_specialists`)

  Tags: back

  Assignee: Erick Robles

- ✅ [11012] Crear endpoint para que un especialista de de alta a un usuario

  Contexto: De momento esta funcionalidad solo incluye la creación de un nuevo usuario

  Tags: back

  Assignee: Samuel Reveles

- ✅ [11013] Revisar todos los endpoints del users-api

  Contexto: Asegurarse de que todos los endpoints del users-api funcionan. Si se encuentran errores agregarlos en los mensajes de esta tarea taggeando a @Miguel y corregirlos desde la rama con nombre de esta tarea

  Tags: back

  Assignee: Samuel Reveles

- ✅ [11014] Crear red de usuarios de prueba desde ambiente de desarrollo

  Contexto: Crear diferentes usuarios para "tejer" una red de usuarios con una estructura definida para diferentes pruebas.
  Hacerlo desde Bruno desde el ambiente de desarrollo.
  La red de usuarios debe ser tal cual como la de la [documentación](https://github.com/Inmunolabs/multinature-docs/blob/master/4.%20Negocio/redDeUsuariosDePrueba.png)
  Los usuarios deben ser creados con datos como los del 000@multi.com

  ```js
  {
    "email": "000@multi.com",
    "password": "12345678",
    "firstName": "000 Prueba",
    "lastName": "Multinature",
    ...
  }
  ```

  Tags: back

  Assignee: Erick Robles

- ✅ [11015] Agregar los especialistas y las especialidades del usuario a la respuesta del login.

  Contexto: Actualmente el `content` la respuesta del login tiene una estructura como esta:

  ```js
  {
    user: {
      id: "5b8b8743-ee39-11ef-bd0a-1290daed9e2f",
      ...
    },
    token: "ey...J9.ey...fQ.Cf...nM"
  }
  ```

  Para completar esta tarea es necesario agregar los siguientes las siguientes dos propiedades al objeto `user` del content de la repuesta:

  1. `user.specialists`. Agregar los especialistas que tiene asignados el usuario en un arreglo donde cada objeto del arreglo tenga el siguiente formato:

  ```js
  {
    id: specialist.id,
    firstName: specialist.firstName,
    lastName: specialist.lastName,
    email: specialist.email,
    phone: specialist.phone,
    profile: specialist.profile,
  }
  ```

  2. `user.specialties`. Agregar las especialidades que tiene asignadas el usuario en un arreglo donde cada objeto del arreglo tenga el siguiente formato:

  ```js
  {
    id: '7c99a650-eafc-11ef-bd0a-1290daed9e2f',
    name: 'Entrenador',
  }
  ```

  Revisar el prompt de esta tarea en la [documentación](https://github.com/Inmunolabs/multinature-docs/blob/master/4.%20Negocio/promptsDeTareas/%5B11%5D%20Users.md) para ver los objetos sugeridos ya que en la tarea de Clickup no suelen aparecer estas sugerencias.
  En relación con la tarea: [11006] Crear vista para presentar el catálogo de especialistas

  Tags: back

  Assignee: Erick Robles

- ✅ [11016] Maquetado de Home de Clientes

  Tags: front

  Assignee: Diego Martin Ponce

- ✅ [11017] Desarrollar el Home de Clientes

  Tags: front

  Assignee: Diego Martin Ponce

- ✅ [11018] Compartir especialistas de recomendador al crear cuenta

  Contexto: Al crear una nueva cuenta, se debe preguntar al nuevo usuario si desea compartir los mismos especialistas que la persona que lo recomendo. Esto no ocurre al crear paciente, solo ocurre cuando un usuario se registra por si mismo. Para esto se debe integrar el campo `specialists` durante el registro del usuario (endpoint `POST {{userHost}}/users/`). El nuevo campo `specialists` debe ser un arreglo de objetos con las propiedades `id ` y `specialtyId`.

  Tags: back

  Assignee: Erick Robles

- ✅ [11019] Compartir especialistas de recomendador al crear cuenta

  Contexto: Al crear una nueva cuenta, se debe preguntar al nuevo usuario si desea compartir los mismos especialistas que la persona que lo recomendo. Esto no ocurre al crear paciente, solo ocurre cuando un usuario se registra por si mismo. Para esto se debe integrar un checkbox durante el registro del usuario y de ser seleccionado se debe agregar el id del o los especialistas en el body de la solicitud del endpoint `POST {{userHost}}/users/`

  Tags: front

  Assignee: Diego Martin Ponce

- ✅ [11020] Crear un endpoint para obtener la información del día del usuario, sus citas, platillos, rutinas y gráficas (Dashboard de usuarios)

  Contexto: Crear un endpoint para obtener la información del día del usuario, la dieta de hoy, su rutina para hoy, sus citas de hoy y las gráficas de su progreso. Endpoint `GET /users/:id/dashboard/daily` (el path param `:id` representa el user id).

  Esta tarea debe incluir la funcionalidad del endpoint `GET {{dietsHost}}/diets/today/:id` y si aún existe dicho endpoint eliminarlo ([015])

  Tags: back

- ✅ [11021] Crear tabla `user_action_replacements` para registrar acciones de reemplazo de ejercicios y alimentos diarios de los usuarios

  Contexto:
  **Nombre de la Tabla**: `user_action_replacements`
  **Nombres de las Columnas**:

  ```
    id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36) NOT NULL,
    date DATETIME NOT NULL, -- fecha y hora del evento
    type ENUM('meal', 'exercise') NOT NULL, -- tipo de acción
    reference_id INT NOT NULL, -- ID de diet_meals o routine_exercises
    replacement_text TEXT, -- texto libre en caso de reemplazo
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
  ```

  Tags: back

  Assignee: Erick Robles

- ✅ [11022] Crear endpoint para registrar "Reemplazo" en ejercicios o alimentos en `user_action_replacements`

  Contexto: Validar si ya existe una acción previa del usuario para evitar duplicados

  Tags: back

  Assignee: Erick Robles

- ✅ [11023] Crear endpoint para actualizar "reemplazo" existente en `user_action_replacements`

  Tags: back

  Assignee: Erick Robles

- ✅ [11024] Reemplazar los alimentos de una dieta por los respectivos reemplazos

  Contexto: En el endpoint `GET {{dietsHost}}/diets/user/{{userId}}` reemplazar los `meals` que tengan un "equivalente" en `user_action_replacements` (referenciado con el campo `reference_id`)

  Tags: back

  Assignee: Erick Robles

- ✅ [11025] Reemplazar los ejercicios de una rutina por los respectivos reemplazos

  Contexto: En el endpoint `GET {{routinesHost}}/routines/user/{{userId}}` reemplazar los `exercises` que tengan un "equivalente" en `user_action_replacements` (referenciado con el campo `reference_id`)

  Tags: back

  Assignee: Erick Robles

- ✅ [11026] Agregar botones de acción "Hecho" y "Hice otra cosa" en cada ítem de dieta o rutina diaria

  Contexto: Cuando el usuario seleccione "Hice otra cosa" se deberá generar un `user_action_replacement` que representa el reemplazo de un ejercicio o alimento diario. Mostrar mensajes de éxito/error al guardar acción del usuario

  Tags: front

  Assignee: Diego Martin Ponce

- ✅ [11027] Permitir edición de acciones de reemplazo ya registradas

  Tags: front

  Assignee: Diego Martin Ponce

- ✅ [11028] Resaltar en el calendario de actividades las acciones que fueron reemplazadas

  Contexto: Con algún color diferente, resaltar en el calendario de actividades las acciones que fueron reemplazadas por el usuario. Este calendario lo verán el paciente y el especialista

  Tags: front

  Assignee: Diego Martin Ponce

- ✅ [11029] Hacer el campo de gender como obligatorio

  Tags: back

  Assignee: Samuel Reveles

  _Tarea creada por Samuel_
