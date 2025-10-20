# [02] Direcciones

Genera un archivo CSV con las siguientes tareas, siguiendo el formato que te pasé antes:

- ✅ [20001] Modificar el emails-layer para que sea independiente de cualquier proyecto

  Context: Podemos reutilizar la emails-layer de Inmuno para utilizarla en Multi, readaptarla para que su uso sea generico independientemente del proyecto.

  Las opciones para llegar al objetivo pueden ser varias, pero yo sugiero que la layer se mantenga y que cada api sea la que determine la configuración para el envio de correos, que determine los remitentes y los receptores, así como el Asunto y el cuerpo de los correos. Los cuerpos de los correos deberían ser plantillas y el contenido debería ser dinámico dependiendo de los parametros configurados

- ✅ [20002] Cambiar los nombres de las tablas en MySQL. Utilizar snake_case en lugar de camelCase

- ✅ [02003] Reemplazar el campo "colony" por "neighborhood" en todo lo relacionado al manejo de direcciones

  Context: Incluye el consumo de todos los endpoints, validaciones, vistas y formularios. Ojo en el endpoint `GET /neighborhoods/:zipCode`, en ninguna parte del proyecto se debe utilizar la palabra "colony"

  Tags: front

  Assignee: Diego Martin Ponce

- ✅ [02004] Reemplazar el campo "colony" por "neighborhood" en toda el addresses-api

  Context: Incluye modificar la base de datos, los endpoints y sus validaciones. Ojo en el endpoint `GET /neighborhoods/:zipCode`, en ninguna parte del proyecto se debe utilizar la palabra "colony"

  Tags: back

  Assignee: Erick Robles

- ✅ [02005] Actualizar las direcciones para indicar si la dirección corresponde a una clínica

  Context: Agregar el check que pemita a los especialistas determinar que su domicilio es de una clinica `isClinic`
  Aprovechar la tarea para eliminar lo relacionado al viejo campo eliminado `isTaxAddress` (o algo así se llamaba)

  Tags: front

  Assignee: Diego Martin Ponce
