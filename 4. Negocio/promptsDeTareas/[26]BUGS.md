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

- [26010] La tabla users_specialies no tiene llaves foraneas

  Contexto: Agregar las FKs para la tabla de users y la specialties

  Tags: back

- [26011] Renombrar la tabla de `form_template_units` a `form_template_concepts`

  Contexto: Considerar modificar también el código

  Tags: back

  Assignee: Samuel Reveles

- [26012] Error 500 al editar la tax information de un usuario, implementar un Upsert en lugar de un create/update

  Contexto: Eliminar el endpoint: `POST {{userHost}}/users/tax-info/:userId` y actualizar el endpoint: `PATCH {{userHost}}/users/tax-info/:id` para que funcione como un upsert

  Tags: back

  Assignee: Samuel Reveles
