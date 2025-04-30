# [07] Pedidos

Genera un archivo CSV con las siguientes tareas, siguiendo el formato que te pasé antes:

- ✅ [07003] Crear una nueva tabla consumos y modificar los flujos correspondientes

  Contexto: Modificar todos los funcionamientos y flujos para que el sistema siga trabajando de manera correcta con la nueva tabla de consumos, considerar relacionar la tabla de ordenes, productos y usuarios. Considerar la creación del trigger

- ✅ [07004] Actualizar el orders-api para implementar la nueva lógica de perfiles y especialidades

  Contexto: Revisar toda el api, ya que por ejemplo el archivo _src/classes/OrderTemplate.js_ utiliza código como este:

  ```
    const partners = [
      usersConstants.FIRST_LEVEL_USER_PROFILES.partnerWithSpecialist,
      usersConstants.FIRST_LEVEL_USER_PROFILES.partnerWithSpecialist,
    ];
  ```

  FIRST_LEVEL_USER_PROFILES ya no debería ser utilizadoF

- ✅ [07005] Analizar nueva lógica para generar cobros por servicios

  Contexto: Revisar cual es nuestra mejor opción para generar cobros por los diferentes servicios que brindaremos, tener muy en cuenta la lógica los cobros de los pedidos.
  Hasta el momento los servicios que tenemos mapeados son tres: Cobro por anticipo de consulta, cobro de consulta y cobro de mensualidad. Los tres son servicios aplicables para nuestras dos especialidades actuales 'Entrenador' y 'Nutricionista'

  Tags: back

  Assignee: Samuel Reveles

- ✅ [07006] Centralizar templates de correos por proyecto en buckets S3 dedicados

  Tags: back

- ✅ [07007] Controlar el envío del correo de Orden de compra hasta confirmar el pago

  Tags: back

- ✅ [07008] Mostrar leyenda de falta de pago en correo de Confirmación de compra

  Tags: back

- ✅ [07009] Quitar la visibilidad de la propiedad paymentProvider

  Tags: back

  Assignee: Samuel Reveles

  _Tarea creada por Samuel_
