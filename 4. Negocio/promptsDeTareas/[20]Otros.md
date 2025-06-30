# [20] Otros

Genera un archivo CSV con las siguientes tareas, siguiendo el formato que te pasé antes:

- ✅ [20004] Implementación de constantes del sistema (configuraciones del sistema)

  Contexto: Implementar las constantes del sistema, asegurando que los campos reflejen la respuesta del endpoint GET {{usersHost}}/api/config.

  Tags: front

  Assignee: Diego Martin Ponce

- ✅ [20005] Refactorización del Frontend

  Contexto: Modularizar todo el código; refactorizar los services (llamadas a apis) y el redux toolkit de los diferentes modulos y organizar los archivos y folders para facilitar el trabajo.

  Modulos de Redux:

  - orders
  - notifications
  - monthypurchase
  - dasshboard
  - contactus
  - constanst
  - commissisonss
  - cart
  - billing
  - addresss
  - register
  - users
  - session
  - products

  Tags: front

  Assignee: Diego Martin Ponce

- ✅ [20006] Ignorar en Git los cambios en el meta.seq de todo el api-collection

  Contexto: Investigar como igonorar cambios especificos en campos de un JSON en archivos .bru y aplicarlos a toda el api-collection

  Tags: negocio

  Assignee: Miguel Angel Valdés García

- ✅ [20007] Investigación de mercado para encontrar API de alimentos, ingredientes y calorias

  Tags: back

  Assignee: Antoine Ganem

- ✅ [20008] Agregar las unidades de los conceptos al endpoint `GET {{userHost}}/api/config`

  Contexto: Agregar un arreglo con las unidades posibles que pueden tener los conceptos, como kilogramos, centrimetros, etc.

  Tags: back

  Assignee: Samuel Reveles

- ✅ [20009] Enviar como objeto los estatus de las bookings en `GET {{userHost}}/api/config`

  Tags: back

  Assignee: Samuel Reveles

  _Tarea creada por Samuel_

- ✅ [20010] Crear páginas sobre temas de políticas

  Tags: back

  Assignee: Samuel Reveles

  _Tarea creada por Samuel_

- ✅ [20011] Dar seguimiento a la vista "Plan de compensación"

  Contexto: Revisar con Andrés que pasará con esa vista, se quito del sistema pero al final si es requerida, no? Recuerdo que iba a quedar algo así como la que se tiene en Inmnuosalud.

  Tags: negocio

  Assignee: Miguel Angel Valdés García

- ✅ [20012] Probar alta de un paciente y creación de usuario

  Contexto: Revisar los flujo de creaciones de cuentas, alta de un paciente y registro propio.
  Durante la creación de usuario el api-config no puede traer la lista de genero (esto por un typo en el Frontend)

  Tags: negocio

  Assignee: Miguel Angel Valdés García

- ✅ [20013] Actualizar las credenciales de mercadoPago

  Tags: negocio

  Assignee: Miguel Angel Valdés García

- ✅ [20014] Mostrar en el listado de pacientes la especialidad con la que el especialista atiende a cada uno

  Tags: negocio

  Assignee: Miguel Angel Valdés García

- ✅ [20015] Preseleccionar opción en selects con una sola alternativa disponible

  Tags: front

- ✅ [20016] Agregar opción “Ver tu plan” en el menú lateral

  Tags: front

- ✅ [20017] Agregar opción “Ver tu perfil de especialista” en el menú lateral (solo especialistas)

  Tags: front

- ✅ [20018] Modificar el objeto de formulas de la respuesta del endpoint api-config

  Contexto: Modificar el objeto `formulas` de la respuesta del endpoint api-config, debe ser un arreglo de objetos con las propiedades:

  - `name` que no es más que el nombre de la fórmula,
  - `constansts` debe agrupar en un arreglo las constantes que deben ser ingresadas por especialista para poder utilizar la fórmula (Coeficiente de actividad física (CAF), el Efecto térmico de los alimentos (ETA) y la Actividad física (AF))
  - `conceptIds` debe agrupar en un arreglo los identificadores de los conceptos que son necesarios para el cálculo de la fórmula, por ejemplo el identificador del concepto `Peso`

  Tags: back

  Assignee: Samuel Reveles

