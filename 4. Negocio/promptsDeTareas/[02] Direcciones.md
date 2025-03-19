# [02] Direcciones

- Hola chat, Tienes claras tus intrucciones? En que formato redactarías la descripción de las tareas?
- Ayudame con las siguientes nuevas tareas por favor

- ✅ [20001] Modificar el emails-layer para que sea independiente de cualquier proyecto

  Contexto: Podemos reutilizar la emails-layer de Inmuno para utilizarla en Multi, readaptarla para que su uso sea generico independientemente del proyecto.

  Las opciones para llegar al objetivo pueden ser varias, pero yo sugiero que la layer se mantenga y que cada api sea la que determine la configuración para el envio de correos, que determine los remitentes y los receptores, así como el Asunto y el cuerpo de los correos. Los cuerpos de los correos deberían ser plantillas y el contenido debería ser dinámico dependiendo de los parametros configurados

- ✅ [20002] Cambiar los nombres de las tablas en MySQL. Utilizar snake_case en lugar de camelCase

---

- ✅ [02003] Reemplazar el campo "colony" por "neighborhood" en todo lo relacionado al manejo de direcciones

  Contexto: Incluye el consumo de todos los endpoints, validaciones, vistas y formularios. Ojo en el endpoint `GET /neighborhoods/:zipCode`, en ninguna parte del proyecto se debe utilizar la palabra "colony"

  Tags: front

  Assignee: Diego Martin Ponce

- ✅ [02004] Reemplazar el campo "colony" por "neighborhood" en toda el addresses-api

  Contexto: Incluye modificar la base de datos, los endpoints y sus validaciones. Ojo en el endpoint `GET /neighborhoods/:zipCode`, en ninguna parte del proyecto se debe utilizar la palabra "colony"

  Tags: back

  Assignee: Erick Robles
