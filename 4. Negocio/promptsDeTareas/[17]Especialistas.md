# [17] Especialistas

Genera un archivo CSV con las siguientes tareas, siguiendo el formato que te pasé antes:

- ✅ [17001] Actualizar el Home de Especialistas

  Contexto: El home de especialistas debe contener:

  1. Lista con dos columnas, el nombre de usuarios y su teléfono (que sea un botón que llame automáticamente al paciente). Considerar agregar algún otro dato que ayude al especialista a identificar al paciente. Cada fila (cada usuario) debe redirigir a los detalles de ese usuario
  2. Citas, con un botón para seleccionar las citas del día o las citas de la semana (esta configuración debe ser respetada para cada especialista, es decir, cada que inicie sesión esta configuración debe aparecer seleccionada por defecto). Cada cita debe mostrar toda su información (lugar de la cita: hora; paciente; notas; si hay liga de videollamada; agregarla), además el botón para llamar al paciente y para actualizar/cancelar la cita
  3. Botón de Alta de cliente
  4. Si se agrega el carrusel de "Nuevos Productos" (por solicitud de Andrés) este debería estar en la parte superior de la página y cada producto debe tener los "Call to action": "recomendar a paciente", "ver más" y "agregar al carrito"

- ✅ [17002] Actualizar la relación entre los usuarios y sus especialistas y los usuarios y sus especialidades

  Contexto: Utilizar las tablas (previamente creadas) de `specialities` y `users_specialities`

  Entender cómo funciona la relación entre las tablas `specialities` y `users_specialities`, entender cómo con la nueva estructura de la base de datos se debería modificar el código para readaptar las funciones que relacionen a un usuario y sus especialidades
  Si las actualizaciones requieren modificar el api de orders esperar ahí, pero si modificar el resto de apis y layers.
  Revisar que users_specialities tiene el userId y que sea un Foreign Key apuntando a la tabla users y a su columna `id`

- ✅ [17003] Ajustar los permisos a las vistas a partir de los nuevos perfiles (Nueva relación de especialidades)

- ✅ [17004] Modificar la ubicación de los templates de dietas y rutinas de Google Sheets

- ✅ [17005] Crear la tabla de configuraciones de especialista

  Contexto:
  **Nombre de la Tabla**: `specialist_settings`
  **Nombres de las Columnas**:
  | Nombre en Español | Nombre en Inglés | Tipo de Dato | Valor por Defecto |
  |-----------------------------------|--------------------------------|-------------------|-------------------|
  | Cobro de anticipo de consulta | `charge_advance_payment` | `DOUBLE` | `FALSE` |
  | Cobro de consulta | `charge_per_consultation` | `BOOLEAN` | `FALSE` |
  | Cobro mensual | `monthly_charge` | `BOOLEAN` | `FALSE` |
  | Recibir correos | `receive_emails` | `BOOLEAN` | `TRUE` |
  **Posible Código SQL para Crear la Tabla**:
  Verificarlo bien

  ```sql
  CREATE TABLE specialist_settings (
      specialist_id VARVHAR(36) PRIMARY KEY,
      charge_advance_payment DOUBLE DEFAULT 0.0,
      charge_per_consultation BOOLEAN DEFAULT FALSE,
      monthly_charge BOOLEAN DEFAULT FALSE,
      receive_emails BOOLEAN DEFAULT TRUE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      FOREIGN KEY (specialist_id) REFERENCES users(id) ON DELETE CASCADE
  );
  ```

  **Explicación de la Estructura**:

  1. `specialist_id`: Relación con la tabla `specialists` (asumiendo que existe).
  2. `charge_advance_payment`: Define si se cobra un anticipo para la confirmación de citas (mayor a 0) y cuánto se cobrará.
  3. `charge_per_consultation`: Define si se cobra por consulta desde el sistema.
  4. `monthly_charge`: Indica si hay un cobro mensual por paciente.
  5. `receive_emails`: Indica si el especialista recibe o deja de recibir correos.

  Tags: back

  Assignee: Samuel Reveles

- ✅ [17006] Crear endpoint para la creación de configuraciones de especialista

  Contexto: El endpoint `POST {{usersHost}}/specialists/config` debe crearse desde el users-api desde un nuevo router `specialists.js` y debe permitir la creación de configuraciones de especialista persistiendolas en la base de datos, tabla: `specialist_settings`.
  La creación del nuevo router (`specialists.js`) requiere cambiar el nombre del viejo router a `users.js` y que se cree un index (archivo `index.js`) de routers donde se exporten esos dos routers. El archivo server tendrá que hacer uso del index de routers. Solo el perfil de especialista y admin pueden ingresar a este endpoint

  Tags: back

  Assignee: Samuel Reveles

- ✅ [17007] Crear endpoint para la obtención de las configuraciones de especialista

  Contexto: El endpoint `GET {{usersHost}}/specialists/config` debe crearse desde el users-api desde el nuevo router `specialists.js` y debe permitir la obteción de las configuraciones del especialista conseguidas desde la base de datos, tabla: `specialist_settings`. Solo el perfil de especialista y admin pueden ingresar a este endpoint

  Tags: back

  Assignee: Samuel Reveles

- ✅ [17008] Crear endpoint para la actualización de las configuraciones de especialista

  Contexto: El endpoint `PATCH {{usersHost}}/specialists/config` debe crearse desde el users-api desde el nuevo router `specialists.js` y debe permitir la actualización de configuraciones de especialista persistiendo los cambios en la base de datos, tabla: `specialist_settings`. Solo el perfil de especialista y admin pueden ingresar a este endpoint

  Tags: back

  Assignee: Samuel Reveles

- ✅ [17009] Crear flujo para actualización de perfil de usuario a especialista

  Contexto: El **Flujo para actualizar a un usuario como especialista** conlleva varios puntos que se pueden dividir seis pasos:

  1. **Seleccionar especialidades** (Entrenador y/o Nutricionista). Seleccionador con las especialidades que se cuentan en el sistema. (El desarrollo de la funcionalidad se hara en una nueva tarea)
  2. **Cargar Constancia de Conocimiento** (Cédula, Certificados, etc.). (Opcional) (El desarrollo de la funcionalidad se hara en una nueva tarea)
  3. **Formulario de Alta de Pacientes**. (Opcional) (backend pendiente) (El desarrollo de la funcionalidad se hara en una nueva tarea)
  4. **Formulario de Configuraciones del especialista**.
  5. Subir **Material de apoyo**. La intención de este punto es permitir al especialista subir archivos como fotografías, documentes como pdf, word, etc. (Opcional) (El desarrollo de la funcionalidad se hara en una nueva tarea)
  6. **Solicitud de datos fiscales y cuentas bancarias**. (Opcional) (backend pendiente)

  **Esta tarea se compone de dos puntos:**

  1. La creación visual del flujo de seis pasos, tal como el flujo similar de registro de usuarios en Inmuno, donde cada paso es una nueva pestaña. Para este caso los pasos que son opcionales deberán contener un botón de "Omitir" para brincarse el paso.
  2. Y el desarrollo funcional de los pasos 4 y 6.
     1. El paso 4 radica en el consumo del endpoint `POST {{usersHost}}/specialists/config` de la tarea _[17006] Crear endpoint para la creación de configuraciones de especialista_
        El formulario deberá contener los siguientes puntos:
        - Cobro de anticipo de consulta. `charge_advance_payment`: Define si se cobra un anticipo para la confirmación de citas (mayor a 0) y cuánto se cobrará.
        - Cobro de consulta. `charge_per_consultation`: Define si se cobra por consulta desde el sistema.
        - Cobro mensual. `monthly_charge`: Indica si hay un cobro mensual por paciente.
        - Recibir correos. `receive_emails`: Indica si el especialista recibe o deja de recibir correos.
          Este punto incluye el maquetado del formulario y el consumo del endpoint `POST {{usersHost}}/specialists/config`
     2. En el paso 6 se deberán copiar los formularios y el funcionamiento de Inmuno para completar la solicitud de datos fiscales y cuentas bancarias

  Tags: front

  Assignee: Diego Martin Ponce

- ✅ [17010] Crear vista y formulario para actualizar las Configuraciones del especialista

  Contexto: El objetivo de esta vista es permitir al especialista actualizar sus configuraciones agregadas en el **Formulario de Configuraciones del especialista**, paso 4 del **Flujo para actualizar a un usuario como especialista**.
  La vista debe tener la opción para actualizar las siguientes configuraciones:

  - Cobro de anticipo de consulta. `charge_advance_payment`: Define si se cobra un anticipo para la confirmación de citas (mayor a 0) y cuánto se cobrará.
  - Cobro de consulta. `charge_per_consultation`: Define si se cobra por consulta desde el sistema.
  - Cobro mensual. `monthly_charge`: Indica si hay un cobro mensual por paciente.
  - Recibir correos. `receive_emails`: Indica si el especialista recibe o deja de recibir correos.
    Esta tarea incluye el acceso a este formulario, el maquetado del mismo y el consumo del endpoint `PATCH {{usersHost}}/specialists/config`

  Tags: front

  Assignee: Diego Martin Ponce

- ✅ [17011] Crear endpoint para la obtención de configuraciones del sistema

  Contexto: El objetivo de este endpoint es enviar las configuraciones del sistema. En esta primera entrega se deberán entregar todos los enums y constantes que tenemos en la base de datos, por ejemplo se deberán enviar:

  1. Todos los registros de la tabla `specialities` como:

  ```js
  specialities: [
    {
      id: '...',
      name: '...',
    },
    {...}
  ],
  ```

  2. Diferentes enum que admite la base de datos, como el enum del campo: - `genre` de la tabla `users`. - `profile` de la tabla `users`. IMPORTANTE, esta respuesta no deberá incluir los perfiles de administradores - `reason` de la tabla `bookings`. - `status` de la tabla `bookings`. - etc.

  ```js
  users:
    {
      genres: ['Mujer','Hombre','Otro'],
      profiles: ['Especialista','Usuario'],
    },
  bookings:
    {
      reason: ['Nutriólogo','Entrenamiento','Nutriólogo y Entrenamiento'],
      status: ['Por confirmar','Confirmada','Cancelada','Actualizada','Atendida'],
    }
  ```

  1. Etc.

  Cualquiera puede hacer esta consulta, no importa el token.
  Mostrar la respuesta a Miguel en espera de confirmación, una vez confirmada agregarla a la documentación.

  Tags: back

  Assignee: Samuel Reveles

- ✅ [17012] Consumir endpoint para obtener las configuraciones del sistema

  Contexto: El objetivo de este endpoint es para recibir las configuraciones del sistema. En esta primera entrega se deberán obtener todos los enums y constantes que tenemos en la base de datos y con ellos se pretende que sean utilizados en todos los "selects" del sistema, es decir se esperan recibir todas las configuraciones opcionales del sistema
  Endpoint a consultar: `GET {{usersHost}}/api/config`

  Tags: front

  Assignee: Diego Martin Ponce

- ✅ [17013] Consumir endpoint para asignar especialidades a un especialista

  Contexto: Del primer paso del **Flujo para actualizar a un usuario como especialista**.
  Asignar una especialidad a un especialista consultando el endpoint `POST {{usersHost}}/specialists/specialty/:id` (:id = specialtyId) del users-api.
  Para obtener las opciones de especialidades que el usuario puede seleccionar se deben consultar el endpoint `GET {{usersHost}}/api/config` previamente

  Tags: front

  Assignee: Diego Martin Ponce

- ✅ [17014] Crear tabla de Certificados de Especialistas

  Contexto:
  **Nombre de la Tabla**: `specialist_certificates`
  **Nombres de las Columnas**:
  | Nombre en Español | Nombre en Inglés | Tipo de Dato | Valor por Defecto |
  | ---------------------- | ----------------- | ------------- | ----------------------------------------------- |
  | ID de la relación | `id` | `VARCHAR(36)` | UUID (PRIMARY KEY) |
  | ID del usuario | `specialist_id` | `VARCHAR(36)` | - (FOREIGN KEY) |
  | Nombre del certificado | `name` | `VARCHAR(60)` | - |
  | URL del certificado | `url` | `TEXT` | - |
  | Fecha de creación | `created_at` | `TIMESTAMP` | `CURRENT_TIMESTAMP` |

  **Posible Código SQL para Crear la Tabla**:
  Verificarlo bien

  ```sql
  CREATE TABLE specialist_certificates (
      id VARCHAR(36) PRIMARY KEY,
      specialist_id VARCHAR(36) NOT NULL,
      name VARCHAR(60) NOT NULL,
      url TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      FOREIGN KEY (specialist_id) REFERENCES users(id) ON DELETE CASCADE
  );
  ```

  **Explicación de la Estructura**:

  1. **`id`**: Clave primaria de la tabla, un identificador único para cada relación.
  2. **`specialist_id`**: Relaciona cada certificado con un usuario de la tabla `users`. Es una clave foránea (`FOREIGN KEY`) que se elimina en cascada (`ON DELETE CASCADE`).
  3. **`name`**: Almacena el nombre que el especialista le dio a su certificado.
  4. **`url`**: Almacena la URL del certificado, donde se encuentra alojado.
  5. **`created_at`**: Fecha en la que se registró la relación en la tabla.

  Tags: back

  Assignee: Antoine Ganem

- ✅ [17015] Crear los Buckets de Constancias y Material de Apoyo en S3

  Contexto: Crear los siguientes dos [Buckets](https://us-east-1.console.aws.amazon.com/s3/home?region=us-east-1) en AWS

  1. specialist-certificates: para almacenar los certificados de los especialistas, cada especialista (usuario) deberá ser dueño de una carpeta dentro del bucket, y cada carpeta deberá ser nombrada con el id del especialista
  2. specialist-support-material: para almacenar el material de apoyo que los especialistas brindan a sus pacientes (o clientes), cada especialista (usuario) deberá ser dueño de una carpeta dentro del bucket, y cada carpeta deberá ser nombrada con el id del especialista

  Ambos Buckets deben ser publicos, y configurados para permitir su acceso libre desde internet, para eso revisar y aplicar las siguientes configuraciones como en el bucket [products-images-9fe5](https://us-east-1.console.aws.amazon.com/s3/buckets/products-images-9fe5?region=us-east-1&bucketType=general&tab=permissions):

  1. Block public access (bucket settings),
  2. Bucket policy y
  3. Cross-origin resource sharing (CORS)

  Tags: back

  Assignee: Antoine Ganem

- ✅ [17016] Carga de Constancias de Conocimientos

  Contexto: Para permitir cargar las constancias de conocimientos de los especialistas se deberá crear el endpoint `POST {{usersHost}}/specialists/certificates`. Debe crearse desde el users-api en el router `specialists.js`, este endpoint es el encargado de persistir la url de los certificados y la relación del usuario en la nueva tabla `specialist_certificates` de la base de datos.
  La carga de las constancias se debe hacer directamente a S3. Para esto revisar como funciona el flujo para subir imagenes de los productos (products-api) ya que el flujo deberá ser el mismo. (No estoy seguro si la subida de imagenes de productos funcina en MULTI pero en INMUNO seguro funciona), revisar todo lo referente a las urls prefirmadas de AWS (`presignedUrl`)

  Tags: back

  Assignee: Antoine Ganem

- ✅ [17017] Crear tabla de Material de apoyo de especialistas

  Contexto:
  **Nombre de la Tabla**: `specialist_support_material`
  **Nombres de las Columnas**:
  | Nombre en Español | Nombre en Inglés | Tipo de Dato | Valor por Defecto |
  | ------------------- | ---------------- | ------------- | ------------------- |
  | ID de la relación | `id` | `VARCHAR(36)` | UUID (PRIMARY KEY) |
  | ID del especialista | `specialist_id` | `VARCHAR(36)` | - (FOREIGN KEY) |
  | Nombre del material | `name` | `VARCHAR(60)` | - |
  | Notas | `notes` | `TEXT` | `NULL` |
  | URL del material | `url` | `TEXT` | - |
  | Fecha de creación | `created_at` | `TIMESTAMP` | `CURRENT_TIMESTAMP` |
  **Código SQL para Crear la Tabla**:

  ```sql
  CREATE TABLE specialist_support_material (
      id VARCHAR(36) PRIMARY KEY,
      specialist_id VARCHAR(36) NOT NULL,
      name VARCHAR(60) NOT NULL,
      notes TEXT DEFAULT NULL,
      url TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (specialist_id) REFERENCES users(id) ON DELETE CASCADE
  );
  ```

  **Explicación de la Estructura**:

  1. **`id`** → Clave primaria única para cada registro.
  2. **`specialist_id`** → Relación con la tabla `users` (asumiendo que `specialist_id` está en `users`). `ON DELETE CASCADE`: Si el especialista es eliminado, su material de apoyo también se eliminará.
  3. **`name`** → Nombre del material de apoyo (límite de 60 caracteres).
  4. **`notes`** → Notas adicionales (puede ser `NULL`).
  5. **`url`** → Enlace al material de apoyo.
  6. **`created_at`** → Se llena automáticamente con la fecha y hora de creación.

  Tags: back

  Assignee: Antoine Ganem

- ✅ [17018] Carga de Material de apoyo de especialistas

  Contexto: Para permitir cargar el material de apoyo de los especialistas se deberá crear el endpoint `POST {{usersHost}}/specialists/support-material`. Debe crearse desde el users-api en el router `specialists.js`, este endpoint es el encargado de persistir la url del material de apoyo y la relación del especialista dueño del mismo en la nueva tabla `specialist_support_material` de la base de datos.
  La carga de los archivos (como material de apoyo) se debe hacer directamente a S3. Para esto revisar como funciona el flujo para subir imagenes de los productos (products-api) ya que el flujo deberá ser el mismo. (No estoy seguro si la subida de imagenes de productos funcina en MULTI pero en INMUNO seguro funciona), revisar todo lo referente a las urls prefirmadas de AWS (`presignedUrl`)

  Tags: back

  Assignee: Antoine Ganem

- ✅ [17019] Eliminación de Constancias de Conocimientos

  Contexto: Para permitir eliminar las constancias de conocimientos de los especialistas se deberá crear el endpoint `DELETE {{usersHost}}/specialists/certificates/:id`. Debe crearse desde el users-api en el router `specialists.js`, este endpoint es el encargado de elimninar el registro del certificados y la relación del usuario en la nueva tabla `specialist_certificates` de la base de datos.
  También debe eliminar las constancias de S3.

  Tags: back

  Assignee: Antoine Ganem

- ✅ [17020] Eliminación de Material de apoyo de especialistas

  Contexto: Para permitir eliminar el material de apoyo de los especialistas se deberá crear el endpoint `DELETE {{usersHost}}/specialists/support-material/:id`. Debe crearse desde el users-api en el router `specialists.js`, este endpoint es el encargado de elimninar el registro del material de apoyo y la relación del especialista dueño del mismo en la nueva tabla `specialist_support_material` de la base de datos.
  También debe eliminar los archivos (como material de apoyo) de S3.

  Tags: back

  Assignee: Antoine Ganem

- ✅ [17021] Modificar las configuraciones chargePerConsultation y monthlyCharge

  Contexto: En specialist_settings modificar las configuraciones chargePerConsultation y monthlyCharge para que sean doubles, si en algún flujo ya son utilizadas como banderas, modificar las validaciones para que en lugar de que sea `true` pase a ser `> 0` (mayor a cero)

  Tags: back

  Assignee: Samuel Reveles

- ✅ [17022] Crear endpoint para asignar especialidades a un especialista

  Contexto: Del primer paso del **Flujo para actualizar a un usuario como especialista**.
  Crear el endpoint `POST {{usersHost}}/specialists/specialty/:id` (:id = specialtyId) en el users-api para asignar una especialidad a un especialista.

  Tags: back

  Assignee: Miguel Angel Valdés García

- ✅ [17023] Desarrollar la lógica para administración de horarios de los especialistas

  Contexto: Desarrollar la funcionalidad para agregar los horarios de los especialistas con el fin de poder obtener su disponibilidad.

  Esta tarea incluye el desarrollo de los endpoints POST y PATCH para que un especialist pueda agregar los horarios de una semana de trabajo (de lunes a domingo en bloques default por hora)

  Tags: back

  Assignee: Samuel Reveles

- ✅ [17024] Crear endpoint para obtener la disponibilidad de horarios de un especialista

  Contexto: Considerar el horario de cada especialista y las citas que tenga creadas, el frontend solo debe recibir los espacios disponibles, el endpoint debe tener un formato útil para el cliente (negociarlo con frontend) así como un páginado y/o filtrado de dicha información.

  Tags: back

  Assignee: Samuel Reveles

- ✅ [17025] Agregar funcionalidad para la administración de horarios de los especialistas

  Contexto: Desarrollar la funcionalidad para permitir que un especialista pueda agregar y actualizar sus horarios de trabajo con el fin de más adelante poder obtener su disponibilidad.

  Tags: front

  Assignee: Diego Martin Ponce

- ✅ [17026] Agregar la disponibilidad de horarios de un especialista al agendamiento de citas

  Contexto: Consumir el endpoint creado en la tarea [17024] para obtener la disponibilidad de horario de un especialista y en el calendario para seleccionar los horarios durante el agendamiento o actualización de una cita bloquear los espacios no disponibles del especialista. Considerar el páginado y/o filtrado del endpoint.

  Tags: front

  Assignee: Diego Martin Ponce

- ✅ [17027] Crear un endpoint para que un especialista pueda tranferir a uno de sus pacientes a otro especialista.

  Contexto: Yo como especialista quiero poder tranferir a uno de mis pacientes a otro especialista.

  Este endpoint requerirá de tres propiedades en el `body` de la `request` para poder completarse, el `id del nuevo especialista` que atenderá al paciente, el `id del usuario` (identificador del paciente) y el `id de la especialidad`

  Tags: back

  Assignee: Samuel Reveles

- ✅ [17028] Agregar funcionalidad para que un especialista pueda tranferir a uno de sus pacientes a otro especialista.

  Contexto: Yo como especialista quiero poder tranferir a uno de mis pacientes a otro especialista.

  Consumir el endpoint de la tarea [17026]. Este endpoint requerirá de tres propiedades en el `body` de la `request` para poder completarse, el `id del nuevo especialista` que atenderá al paciente, el `id del usuario` (identificador del paciente) y el `id de la especialidad`

  Tags: front

  Assignee: Diego Martin Ponce

- ✅ [17029] Habilitar acciones cruzadas entre especialistas que comparten pacientes

  Contexto: Implementar un sistema de permisos o acciones compartidas. Específicamente: Si dos especialistas (A y B) comparten un paciente, entonces el especialista A debería poder realizar también las acciones que normalmente solo B podría hacer con ese paciente.

  Cada tipo de especialista (nutricional, entrenamiento, etc.) tiene distintos permisos, y si comparten un paciente, se busca extender el alcance de acciones entre ellos.

  En resumen: Extender permisos entre especialistas que comparten un paciente

  Considerar modificar la lógica de permisos

  Tags: back

  Assignee: Samuel Reveles

- ✅ [17030] Agregar indicadores visuales para pacientes compartidos entre especialistas

  Contexto: Yo como especialista quiero saber cuando estoy trabajando con un pacientes compartido con otro especialista; quiero saber si lo compartí yo (siendo yo el "Especialista Base") o si lo compartieron conmigo (siendo yo el "Especialista Secundario").

  También quiero saber que cosas asigno el otro especialista a nuestro paciente compartido

  Tags: front

  Assignee: Diego Martin Ponce

- ✅ [17031] Crear vista para graficar evolución de conceptos clí­nicos graficables por paciente

  Contexto: Diseñar y mostrar una gráfica de evolución por concepto clí­nico (ej. peso, cintura) con base en los valores registrados en citas pasadas.

  Tags: front

- [17032] Crear vista para mostrar la lista de pacientes de un especialista

  Contexto: Esta vista debe ser una lista con datos básicos de los pacientes. El endpoint a consultar es el `GET {{userHost}}/specialists/:specialistId/patients`.

  Cada fila o tarjeta con la información de los pacientes debe redireccionar a una vista con toda la información y plan del paciente. Esta tarea no incluye el desarrollo de esa vista o dashboard

  Tags: front

  Assignee: Diego Martin Ponce
