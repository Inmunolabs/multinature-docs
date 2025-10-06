# [19] Notificaciones

Genera un archivo CSV con las siguientes tareas, siguiendo el formato que te pasé antes:

- ✅ [19001] Actualizar y mejorar las plantillas de correos del orders-api

- ✅ [19002] Actualizar y mejorar las plantillas de correos del users-api

- ✅ [19003] Diseñar el envio de notificaciones haciendo uso de patrones de diseño

  Context: El sistema enviará notificaciones por correo, por whatsapp y también lo hara mediante un CRUD de notificaciones, diseñar una funcionalidad para permitir que las notificaciones se puedan enviar por estos tres medios, considerando la posibilidad de que algunas notificaciones podrían ser enviadas solo por uno de los tres medios mencionados.
  De momento toda la funcionalidad del Whatsapp no esta desarrollada ni definida pero tomarlo en cuenta para este diseño, además cabe mencionar que en un futuro se podrían implementar nuevos métodos de comunicación como mensajes SMS o alguna red social como Instagram o Facebook

  Tags: back

  Assignee: Samuel Reveles

- ✅ [19004] Crear la Notificación N2.1 para Especialistas. "Tienes un nuevo paciente"

  Context: El fin de la notificaión es informar al Especialista que un nuevo usuario se agrego a su lista de pacientes, ya sea porque el mismo especialista lo registro o el paciente se autoasigno

  Tags: back

  Assignee: Samuel Reveles

- ✅ [19005] Crear el template de correos de la Notificación N2.1

  Context: Crear el template de correos utilizando la imagen del sistema (paleta de colores, logos, etc.). El fin del correo es notificar al Especialista que un nuevo usuario se agrego a su lista de pacientes, agregar textos alusivos al fin del correo

  Tags: back

  Assignee: Samuel Reveles

- ✅ [19006] Notificar al usuario y al especialista sobre una actualización o cancelación de cita

  Context: El usuario y el especialista deben ser notificados cada que se actualice o se cancele una cita.
  Tomar en cuenta los siguientes únicos y posibles cuatro escenarios:

  - En caso de que el especialista actualice una cita notificar al usuario
  - En caso de que el especialista cancele una cita notificar al usuario
  - En caso de que el usuario actualice una cita notificar al especialista
  - En caso de que el usuario cancele una cita notificar al especialista

  Tags: back

  Assignee: Samuel Reveles

- ✅ [19007] Notificar al usuario y/o al especialista sobre el agendamiento de una nueva cita

  Context: Cuando el usuario y/o el especialista agenden una nueva cita cada uno debe ser notificado, en dicha notificación se debe aclarar que se espera la confirmación de la cita y esta acción deberá de generar dos posibles escenarios:

  - Si el especialista no tiene configurado el cobro de anticipo de confirmación de cita (campo `charge_advance_payment` de la nueva tabla `specialist_settings` igual o menor a 0) el mensaje de la notificación solo mencionará algo como "La cita fue confirmada por ..."
  - Si el especialista tiene configurado el cobro de anticipo de confirmación de cita (campo `charge_advance_payment` mayor a 0) el mensaje de la notificación deberá incluir un mensaje como "Recuerda pagar el anticipo de tu cita para poder confirmarla" (La cita se confirmará desde otra tarea)

  Tomar en cuenta los siguientes únicos y posibles dos escenarios:

  - En caso de que el especialista agende una cita notificar al usuario
  - En caso de que el usuario agende una cita notificar al especialista

  Tags: back

  Assignee: Samuel Reveles

- ✅ [19008] Notificar al usuario y al especialista sobre la confirmación de una nueva cita

  Context: Cuando el usuario y/o el especialista confirmen la asistencia a una nueva cita cada uno debe ser notificado.
  Tomar en cuenta los siguientes escenarios:

  - Si el especialista tiene configurado el cobro de anticipo de confirmación de cita (campo `charge_advance_payment` de la nueva tabla `specialist_settings` mayor a 0) se deberá efectuar primero el cobro del anticpo de la cita (tarea: [03009] Generar una orden de pago para Cobro de confirmación de la cita) y una vez confirmado el pago de la misma (tarea: [03010] Crear webhook del pago de la confirmación de la cita) se deberá notificar al especialista que su paciente hizo el pago de confirmación y que esta listo para atender la nueva cita
  - En caso de que el especialista no tenga seleccionada la opción del cobro de anticipo de confirmación de cita (campo `charge_advance_payment` igual o menor a 0) se deberá notificar al especialista que su paciente confirma la nueva cita una vez que el usuario de click en algún botón de "Confimación de cita" generado desde la tarea [19006] vinculado a la tarea [03011] Crear endpoint para que paciente confirme una cita
  - En caso de que el usuario sea quien agende la cita al especialista, éste es quien deberá confirmar la misma tomando en cuenta los dos anteriores escenearios, donde el usuario es quien paga o no la confirmación de la cita. En este caso es el especialista quien debe confirmar si se llevará a cabo o no la cita

  Tags: back

  Assignee: Samuel Reveles

- ✅ [19009] Crear una tabla en la base de datos para el manejo de las notificaciones

  Context: La tabla deberá tener la siguiente información: id, id del usuario, fecha en que fue creada, un título, el mensaje y un estatus (para identificar si la notificación ya fue leída)

  Tags: back

  Assignee: Samuel Reveles

- ✅ [19010] Crear api para el manejo de las notificaciones

  Context: El objetivo de esta api es informar al usuario, mediante una vista en el frontend sobre sus notificaciones. En dicha vista el usuario podrá marcar como leídas las notificaciones (de una por una o cierta cantidad seleccionada) y es la única acción que el usuario puede hacer. Esto se traduce a dos endpoints, uno para listar las notificaciones por usuario y otro para marcarlas como leídas.

  Tags: back

  Assignee: Samuel Reveles

- ✅ [19011] Integrar WhatsApp como canal de envío para notificaciones del sistema

  Context: Investigar e integrar WhatsApp para enviar notificaciones por ahí

  Tags: back

  Assignee: Samuel Reveles

- ✅ [19012] Definir y desarrollar el envio de los mensajes de notificación por WhatsApp

  Tags: back

  Assignee: Samuel Reveles
