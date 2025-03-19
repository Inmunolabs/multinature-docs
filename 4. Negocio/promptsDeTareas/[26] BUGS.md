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
