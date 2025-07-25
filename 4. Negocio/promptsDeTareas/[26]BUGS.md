# [26] BUGS

Genera un archivo CSV con las siguientes tareas, siguiendo el formato que te pasé antes:

- ✅ [26001] El Usuario registrado no esta dado de alta en openpay

  Contexto: Al crear un usuario éste no esta guardando el openpayUserId en la base de datos y se desconoce si esta creando al usuario en Openpay. Revisar el error.
  El error se detecto al crear al usuario 000@multi.com y quere iniciar sesión con el

  Tags: back

  Assignee: Samuel Reveles

- ✅ [26002] Corregir el antiquity de la respuesta al momento de crear un usuario

  Contexto: Al crear un usuario el antiquity que debería aparecer en la respuesta es de 0 'meses', no 'NaN meses'

  Tags: back

  Assignee: Samuel Reveles

- ✅ [26003] Reparar el endpoint para crear pacientes, dejo de existir

  Tags: back

  Assignee: Miguel Angel Valdés García

- ✅ [26004] Ajustar la respuesta de inicio de sesión no valido por falta de confirmación de correo

  Contexto: Ajustar la respuesta de inicio de sesión no valido por falta de confirmación de correo. Agregar un mensaje como `"Tu cuenta no ha sido verificada. Por favor, completa la verificación con el código que enviamos a tu correo, si no cuentas con el código intenta solicitando uno nuevo."` y con un codigo de error `428`

  Tags: back

  Assignee: Miguel Angel Valdés García

- ✅ [26005] Errores al crear y verficar cuentas de usuarios

  Contexto: No se envía el código de verificación en el correo y el token que se envia en la respuesta de la `Verficación de cuenta` esta malformado

  Tags: back

  Assignee: Miguel Angel Valdés García

- ✅ [26006] Asegurarse que se generen los consumos de usuarios

  Contexto: Asegurarse que al completar el pago de una compra se registren los consumos del usuario

  Tags: back

- ✅ [26007] Error al intentar acceder al detalle de un producto desde el [home de un cliente](https://www.multinaturecompany.com/home/F)

  Contexto: folio: "5a4be020-e6dd-48e4-a2ff-d18af000a13f"

  path: `GET /products/2e17cfde-136c-481f-bd33-9e4b16ab5d91`

  Tags: back

- ✅ [26008] Eliminar el endpoint POST {{userHost}}/specialists/config/:id. El PATCH debería ser suficiente

  Contexto: El `PATCH {{userHost}}/specialists/config/:id` debería ser suficiente incluso para crear las configuraciones, a ojos del cliente todo especialista tiene configuraciones, a ojos del servidor el especialista que no tiene configuraciones utiliza las de default y eso nos basta para justificar porque solo debería existir el endpoint `PATCH`. Validar que el PATCH funcione como un `upsert` y renombrar todo lo referente. Eliminar todo lo de `create` validaciones, servicios, rutas, etc. y renombrar lo de `update` por `upsert`. Si no queda claro revisar como referencia la cart-api, para las recomendaciones o el carrito en si

  Tags: back

  Assignee: Samuel Reveles

- ✅ [26009] Error al reingresar a la página, solicitud de inicio de sesión incorrecta

  Contexto: Al reingresar a la página después de un tiempo de haber cerrado la pestaña se solicita inicar sesión de nuevo, pero no muestra el formulario de login y tampoco indica con que cuenta se inicio sesión, si no se ha cerrado la sesión o no se ha vencido el token, entonces que al reingresar a la página, no se solicite un reinicio de sesión

  Tags: front

  Assignee: Diego Martin Ponce

- ✅ [26010] La tabla users_specialies no tiene llaves foraneas

  Contexto: Agregar las FKs para la tabla de users y la specialties

  Tags: back

- ✅ [26011] Renombrar la tabla de `form_template_units` a `form_template_concepts`

  Contexto: Considerar modificar también el código

  Tags: back

  Assignee: Samuel Reveles

- ✅ [26012] Error 500 al editar la tax information de un usuario, implementar un Upsert en lugar de un create/update

  Contexto: Eliminar el endpoint: `POST {{userHost}}/users/tax-info/:userId` y actualizar el endpoint: `PATCH {{userHost}}/users/tax-info/:id` para que funcione como un upsert

  Tags: back

  Assignee: Samuel Reveles

- ✅ [26013] Reparar endpoints de la api de monthly-purchases

  Tags: back

  Assignee: Samuel Reveles

  _Tarea creada por Samuel_

- ✅ [26014] Arreglar la respuesta del upsert en tax info

  Tags: back

  Assignee: Samuel Reveles

  _Tarea creada por Samuel_

- ✅ [26015] Renombrar propiedad 'id' por 'conceptId' de los concepts al ver los templates

  _Tarea creada por Samuel_

- ✅ [26016] Arreglar el paginado del endpoint de listado de especialistas `GET {{userHost}}/specialists/?page=1&limit=10`

  Tags: back

  Assignee: Erick Robles

- ✅ [26017] Cambiar la posición de los tipos de pago de la respuesta del endpoint `GET {{userHost}}/api/config`

  Contexto: En la respuesta del endpoint `GET {{userHost}}/api/config` se agregan los tipos de pago dentro del objeto `orders`, sacarlos de ahí, dejarlos a nivel de `orders` o de `paymentMethods` y nombrarlos como `paymentTypes`

  Tags: back

  Assignee: Erick Robles

- ✅ [26018] Responder con todas las citas del usuario

  Tags: back

  Assignee: Samuel Reveles

  _Tarea creada por Samuel_

- ✅ [26019] Agregar el id de la clínica en los listados de especialistas y el login

  Tags: back

  Assignee: Samuel Reveles

  _Tarea creada por Samuel_

- ✅ [26020] Cambiar de api todo lo referente a la tabla `working_hours` del users-api, pasarlo a la bookings-api

  Contexto: Incluir el cambio de endpoints y actualizar el api-collection

  Tags: back

  Assignee: Samuel Reveles

- ✅ [26021] Cambiar de api todo lo referente a la tabla `working_hours` del users-api, pasarlo a la bookings-api

  Tags: back

  Assignee: Samuel Reveles

  _Tarea creada por Samuel_

- ✅ [26022] Corregir error al obtener órdenes vacías

  Tags: back

  Assignee: Samuel Reveles

  _Tarea creada por Samuel_

- ✅ [26023] Ajuste de permisos en el endpoint Contact Us

  Tags: back

  Assignee: Samuel Reveles

  _Tarea creada por Samuel_

- ✅ [26024] Dividir respuesta de métodos de pago por tipo (cobro/pago)

  Tags: back, front

  Assignee: Samuel Reveles

  _Tarea creada por Samuel_

- ✅ [26025] Añadir la emails layer a la api de notificaciones

  Tags: back

  Assignee: Samuel Reveles

  _Tarea creada por Samuel_

- ✅ [26026] Corregir el mensaje de respuesta de list working hours

  Tags: back

  Assignee: Samuel Reveles

  _Tarea creada por Samuel_

- ✅ [26027] Corregir bug al crear cita sin pago

  Tags: back

  Assignee: Samuel Reveles

  _Tarea creada por Samuel_

- ✅ [26028] Ajustar nombre del endpoint /user-files/s3-upload

  Tags: back

  Assignee: Samuel Reveles

  _Tarea creada por Samuel_

- ✅ [26029] Hacer razón de cancelación de cita opcional

  Tags: back

  Assignee: Samuel Reveles

  _Tarea creada por Samuel_

- ✅ [26030] Cambiar el nombre erroneo del bucket de las reseñas y devolver nombre en el listado

  Tags: back

  Assignee: Samuel Reveles

  _Tarea creada por Samuel_

- ✅ [26031] Error de sintaxis al desasignar especialistas y devolver solo especialistas asignados

  Tags: back

  Assignee: Samuel Reveles

  _Tarea creada por Samuel_

- ✅ [26032] No está la ruta de compra mensual (upsert)

  Tags: back

  Assignee: Samuel Reveles

  _Tarea creada por Samuel_

- ✅ [26033] Evitar que un paciente se agende múltiples veces en el mismo horario

  Tags: back

  Assignee: Samuel Reveles

- ✅ [26034] Excluir la fecha actual en la disponibilidad de horarios del especialista

  Tags: back

  Assignee: Samuel Reveles

- ✅ [26035] Permitir crear reemplazos para cualquier día, sin limitar por fecha de creación

  Tags: back

  Assignee: Erick Robles

- ✅ [26036] Revisar el error 500 al eliminar un producto

  Contexto: Log: [`2025-07-17T18:10:15.772Z 31b2fa98-9266-4a77-a9e1-822e94ca40bd INFO ### DELETE /products/f4498a5a-3fb7-4cd2-af5a-4cb4fe30e0ad`](https://us-east-1.console.aws.amazon.com/cloudwatch/home?region=us-east-1#logsV2:log-groups/log-group/$252Faws$252Flambda$252Fmulti-products-dev-api/log-events/2025$252F07$252F17$252F$255B$2524LATEST$255De8bdb3aa83fc45bca918f9ff3dc263d0)

  Revisar también que al eliminar un producto se responda solo con los productos activos (los que no han sido eliminados lógicamente). En general este tipo de respuesta, con solo los productos activos debe funcionar para toda al API, revisar todos los endpoints, desde las queries (`WHERE is_active = true`) hasta el DTO

  Tags: back

  Assignee: Samuel Reveles

  _Tarea creada por Samuel_

- ✅ [26037] Error al querer crear una compra mensual con un usuario que no ha agregado ninguna tarjeta a su usuario

  Contexto: Log: [`2025-07-17T22:42:47.550Z 2025-07-17T22:42:47.550Z 1baf477d-8a84-4c29-bd9a-a3e90d3923b1 INFO ### PATCH /monthly-purchase/`](https://us-east-1.console.aws.amazon.com/cloudwatch/home?region=us-east-1#logsV2:log-groups/log-group/$252Faws$252Flambda$252Fmulti-monthly-purchase-dev-api/log-events/2025$252F07$252F17$252F$255B$2524LATEST$255De555572cc95148b891fe5d8a51e3b69a$3Fstart$3D2025-07-17T22$253A42$253A47.557Z)

  Desde backend responder con un mensaje de error adecuado (manejo del error), desde el frontend no permitir crear la compra mensual sin antes tener un método de pago de tipo pago (una tarjeta registrada), pedirle al usuario que agregué una tarjeta y después completar la creación de la compra mensual

  Tags: back, front

  Assignee: Samuel Reveles

  _Tarea creada por Samuel_

- ✅ [26038] Al actualizar una cita se responde con un arreglo vacio

  Contexto: Revisar si al actualizar una cita se debe responder con la cita ya actualizada, o con las últimas citas de quien hace la actualización

  Tags: back

  Assignee: Samuel Reveles

  _Tarea creada por Samuel_

- [26039]

- ✅ [26040] No sé pueden eliminar las plantillas de los formularios

  Contexto: El error se presenta porque existen registros en la tabla filled_forms que están referenciando al form_template que estás intentando eliminar. La mejor práctica en estos casos, especialmente si buscamos mantener los filled_forms, es no eliminar físicamente el form_template, sino solo marcarlo como eliminado.

  Agregar la `deleted_at`

  `ALTER TABLE form_templates ADD COLUMN deleted_at DATETIME NULL;`

  Tags: back

  Assignee: Samuel Reveles

- ✅ [26041] El campo `is_graphable` de `filled_form_values` siempre se envia como `false`

  Tags: back

  Assignee: Erick Robles

- ✅ [26042] Hacer el api config público

  Tags: back

  Assignee: Samuel Reveles

  _Tarea creada por Samuel_

- ✅ [26043] Ajustar el api config con las fórmulas y sus datos

  Assignee: Samuel Reveles

  _Tarea creada por Samuel_

- ✅ [26044] El calendario de la vista de clientes dice Enero, aunque está bien puesta la fecha en el calendario

  Assignee: Samuel Reveles

  _Tarea creada por Samuel_

- ✅ [26045] La cita en customers/profile 'Próxima Cita' aparece con un día antes

  Assignee: Samuel Reveles

  _Tarea creada por Samuel_

- ✅ [26046] No sirve el botón de nueva cita en `/your-plan/`

  Assignee: Samuel Reveles

  _Tarea creada por Samuel_

- ✅ [26047] Manda a 401 plan de compensación (home)

  Assignee: Samuel Reveles

  _Tarea creada por Samuel_

- ✅ [26048] En `/marketplace/product/:id` no se pueden hacer las acciones de compra ni agregar al carrito

  Assignee: Samuel Reveles

  _Tarea creada por Samuel_

- ✅ [26049] `/compensation-plan/` tiene errores ortográficos

  Assignee: Samuel Reveles

  _Tarea creada por Samuel_

- ✅ [26050] `/marketplace/` no se agrega a la selección

  Assignee: Samuel Reveles

  _Tarea creada por Samuel_

- ✅ [26051] `/monthly-purchase/your-selection/` no desactiva los botones de guardar y comprar cuando no hay productos

  Assignee: Samuel Reveles

  _Tarea creada por Samuel_

- ✅ [26052] `/monthly-purchase/your-selection/` no cambia la dirección de envío según los botones

  Assignee: Samuel Reveles

  _Tarea creada por Samuel_

- ✅ [26053] `/home/` al reagendar una cita confirmada, aparece seleccionado el día de mañana y no deja reagendar hasta 2 días después

  Assignee: Samuel Reveles

  _Tarea creada por Samuel_

- ✅ [26054] `/home/` al liquidar no deja seleccionar monto a pagar ni ingresar un monto personalizado

  Assignee: Samuel Reveles

  _Tarea creada por Samuel_

- ✅ [26055] `/home/` el botón confirmar y pagar de la cita no funciona

  Assignee: Samuel Reveles

  _Tarea creada por Samuel_

- ✅ [26056] `/customers/profile/:id/` no sirve el botón de agendar

  Assignee: Samuel Reveles

  _Tarea creada por Samuel_

- ✅ [26057] En `/my-specialists/`, al intentar eliminar un especialista, aparece que se desasignó en lugar de eliminarlo

  Assignee: Samuel Reveles

  _Tarea creada por Samuel_

- ✅ [26058] El bucket de S3 de los recibos de pago es incorrecto (store-order-9fe5 en lugar de multi-store-order-dev)

  Assignee: Samuel Reveles

  _Tarea creada por Samuel_

- ✅ [26059] En `/marketplace/` al agregar al carrito, solo se puede agregar un producto (no se acumula)

  Assignee: Samuel Reveles

  _Tarea creada por Samuel_

- ✅ [26060] El botón 'agregar a tu selección' solo funciona desde el carrito

  Assignee: Samuel Reveles

  _Tarea creada por Samuel_

- ✅ [26061] `/customers/profile/:id/` faltan desgloses explicativos de los iconos de Cita y Reemplazo

  Assignee: Samuel Reveles

  _Tarea creada por Samuel_

- ✅ [26062] `/customers/profile/:id/` no coinciden iconos de dieta con las actividades reales

  Assignee: Samuel Reveles

  _Tarea creada por Samuel_

- ✅ [26063] En ocasiones, al ir de `/customers/profile/:id/` a `/compensation-plan/`, aparece error 401 (intermitente)

  Assignee: Samuel Reveles

  _Tarea creada por Samuel_

- ✅ [26064] `/your-plan/` ¿Debería permitir añadir plan en caso de ser especialista?

  Assignee: Samuel Reveles

  _Tarea creada por Samuel_

- ✅ [26065] `/my-specialists/` no se puede seleccionar nuevamente un especialista que ya estaba agregado ni agregar múltiples

  Assignee: Samuel Reveles

  _Tarea creada por Samuel_

- ✅ [26066] /network/ no abre la URL de Copiar tu enlace (manda un 404)

  Assignee: Samuel Reveles

  _Tarea creada por Samuel_

- ✅ [26067] Arreglar el botón de editar usuarios y agregar el teléfono a la tarjeta de usuario

  Assignee: Samuel Reveles

  _Tarea creada por Samuel_

- ✅ [26068] /profile/?=&tab=tax Al editar Información para recibir tus comisiones y guardar, una vez guardado solo se muestran los datos después de que se refresca la pagina

  Assignee: Samuel Reveles

  _Tarea creada por Samuel_

- ✅ [26069] /profile/?=&tab=tax Error en la query al actualizar Información para facturar tus compras y en Información para recibir tus comisiones

  Assignee: Samuel Reveles

  _Tarea creada por Samuel_

- ✅ [26070] /cart/ Cuando se presiona Cambiar método de pago, en Nuevo Método no hace nada el botón Agregar

  Assignee: Samuel Reveles

  _Tarea creada por Samuel_

- ✅ [26071] /cart/ Cuando estamos en Cambiar dirección y queremos agregar una nueva dirección, al presionar el botón truena

  Assignee: Samuel Reveles

  _Tarea creada por Samuel_

- ✅ [26072] /profile/ Cuando se crea el método de pago o se actualiza, no se muestra en el front y se tiene que refrescar la pagina para que se vea

  Assignee: Samuel Reveles

  _Tarea creada por Samuel_

- ✅ [26073] /profile/ En métodos de pago no deja deseleccionar y se crea como predeterminado para compra mensual

  Assignee: Samuel Reveles

  _Tarea creada por Samuel_

- ✅ [26074] /profile/ Está mal el actualizar la dirección, tampoco deja el botón para hacer clínica y tampoco funciona el delete (profile-Direcciones)

  Assignee: Samuel Reveles

  _Tarea creada por Samuel_

- ✅ [26075] /specialist/settings/?tab=certificates el delete de Certificados sale petición no autorizada

  Assignee: Samuel Reveles

  _Tarea creada por Samuel_

- ✅ [26076] /specialist/settings/?tab=supportMaterial el delete de Material de Apoyo sale petición no autorizada

  Assignee: Samuel Reveles

  _Tarea creada por Samuel_

- ✅ [26077] Mostrar solo los productos válidos para la recomendación

  Assignee: Samuel Reveles

  _Tarea creada por Samuel_

- ✅ [26078] Access denied al bucket de templates desde la lambda de orders

  Assignee: Samuel Reveles

  _Tarea creada por Samuel_

- ✅ [26079] Error en vista de configuracion de especialista

  Tags: front

  Assignee: Antoine Ganem

  _Tarea creada por Antoine_

- ✅ [26080] Revisar que en las configuraciones de especialista no se pueda agregar un Anticipo de consulta mayor al precio de la consulta

  Tags: back, front

  Assignee: Antoine Ganem

- ✅ [26081] Compras mensuales, cuando se llega al límite de monto que deja openpay, no muestra el mensaje, solo el error

  _Tarea creada por Samuel_

- ✅ [26082] /customers/profile/:id el agendar cita hace cita para el especialista, no para el usuario

  _Tarea creada por Samuel_

- ✅ [26083] Aparece undefined en el nombre en los detalles de alguien de la red

  _Tarea creada por Samuel_

- ✅ [26084] Agregar sugerencia a la compra mensual -> Al actualizar una compra mensual después de haber borrado un producto se agrega de nuevo

  _Tarea creada por Samuel_

- ✅ [26085] Para liquidar, no se informa el precio que falta, solo el precio total de la cita, puede confundir al cliente /home

  _Tarea creada por Samuel_

- ✅ [26086] No se actualizan las citas cuando ya se hizo una liquidación /home

  _Tarea creada por Samuel_

- ✅ [26087] Configuración de especialidad y mi perfil no cambian con el idioma, el texto de configuración de especialidad está en minúsculas (barra de navegación)

  _Tarea creada por Samuel_

- ✅ [26088] No aparece opción para pagar mensualidad

  _Tarea creada por Samuel_

- ✅ [26089] No se alcanza a leer bien el placeholder de los detalles del día en /customers (modo claro)

  _Tarea creada por Samuel_

- ✅ [26090] Aparecen todas las citas en la sección de próximas citas /home

  _Tarea creada por Samuel_

- ✅ [26091] En confirmar cita, no permite seleccionar ninguna opción /home -> próximas citas -> confirmar (cuando es una cita creada por el especialista)

  _Tarea creada por Samuel_

- ✅ [26092] El costo de la cita está sumando el anticipo, el anticipo es un porcentaje de la cita

  _Tarea creada por Samuel_

- ✅ [26093] No permite liquidar la cita más que cuando se elije pago en línea

  _Tarea creada por Samuel_

- ✅ [26094] Falta indicador de carga de que se está haciendo un pago al liquidar / pagar la cita

  _Tarea creada por Samuel_

- ✅ [26095] No se puede ver el recibo de pago de la cita cuando se pagó la liquidación en tienda

  _Tarea creada por Samuel_

- ✅ [26096] profile/?=&tab=banks cuando se quiere agregar una clave interbancaria no deja, manda Recurso no encontrado (detalles en el Payload y el method)

  Assignee: Samuel Reveles

  _Tarea creada por Samuel_

- ✅ [26097] Reparar nombres de fórmulas de dietocalculo (api-config)

  Tags: back

  Assignee: Miguel Angel Valdés García

- ✅ [26098] Error al importar la entity de diets en get diets

  Assigne: Samuel Reveles

  _Tarea creada por Samuel_

- ✅ [26099] Validar los dias disponibles del especialista

  Assigne: Erick Robles

  _Tarea creada por Erick_

- ✅ [26100] Crear/editar formulario duplica preguntas

  Assigne: Erick Robles

  _Tarea creada por Erick_

- ✅ [26101] Vista "your-plan" errores en vista de Cliente

  Assigne: Erick Robles

  _Tarea creada por Erick_

- ✅ [26102] Bug del Pie chart en el dashboard del admin en mobile

  Assigne: Samuel Reveles

  _Tarea creada por Samuel_

- ✅ [26103] NaN en dashboard

  Assigne: Samuel Reveles

  _Tarea creada por Samuel_

- ✅ [26104] Métodos de pago

  Assigne: Samuel Reveles

  _Tarea creada por Samuel_

- ✅ [26105] Citas

  Assigne: Erick Robles

  _Tarea creada por Samuel_

- ✅ [26106] Órdenes

  Assigne: Samuel Reveles

  _Tarea creada por Samuel_

- ✅ [26107] Admin

  Assigne: Samuel Reveles

  _Tarea creada por Samuel_

- ✅ [26108] Perfil de especialista

  Assigne: Erick Robles

  _Tarea creada por Samuel_

- ✅ [26109] Login

  Assigne: Erick Robles

  _Tarea creada por Samuel_

- ✅ [26110] Home

  Assigne: Erick Robles

  _Tarea creada por Samuel_

- ✅ [26111] Otros

  Assigne: Samuel Reveles

  _Tarea creada por Samuel_

- ✅ [26112] Bugs de responsividad

  Assigne: Samuel Reveles

  _Tarea creada por Samuel_

- ✅ [26113] Se crean pagos en efectivo como pendientes y no se crean objetos de service payments complements

  Assigne: Samuel Reveles

  _Tarea creada por Samuel_

- ✅ [26114] No se manda el amount al crear cita como especialsita y no permite confirmar citas.

  Assigne: Samuel Reveles

  _Tarea creada por Samuel_

- ✅ [26115] No se muestran bien los logs de los buckets y cambio de validación en confirmar cita

  Assigne: Samuel Reveles

  _Tarea creada por Samuel_
