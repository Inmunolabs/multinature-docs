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

- [26006] Asegurarse que se generen los consumos de usuarios

  Contexto: Asegurarse que al completar el pago de una compra se registren los consumos del usuario

  Tags: back

- [26007] Error al intentar acceder al detalle de un producto desde el [home de un cliente](https://www.multinaturecompany.com/home/F)

  Contexto: folio: "5a4be020-e6dd-48e4-a2ff-d18af000a13f"

  path: `GET /products/2e17cfde-136c-481f-bd33-9e4b16ab5d91`

  Tags: back
