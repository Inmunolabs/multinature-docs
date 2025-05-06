# Documentación del Endpoint para Envío de Notificaciones

Este endpoint permite enviar notificaciones a los usuarios a través de diferentes canales: correo electrónico, WhatsApp o base de datos.

## URL

`POST /notifications`

## Parámetros

### Query Parameters (Opcionales)

- **email**: `string` (Formato de correo electrónico). Filtro para buscar usuarios por su correo electrónico.
- **profile**: `string` (Valores posibles: `userProfiles`). Filtro para buscar usuarios por su perfil.
- **specialtyId**: `string` (UUID). Filtro para buscar usuarios por su ID de especialidad.
- **minAge**: `integer` (Valor numérico entre 0 y 120). Filtro para establecer la edad mínima de los usuarios.
- **maxAge**: `integer` (Valor numérico entre 0 y 120). Filtro para establecer la edad máxima de los usuarios.
- **createdFrom**: `string` (Formato ISO8601). Fecha de inicio para filtrar usuarios creados desde esta fecha.
- **createdTo**: `string` (Formato ISO8601). Fecha de fin para filtrar usuarios creados hasta esta fecha.
- **hasDiet**: `boolean` (true/false). Filtro para buscar usuarios con dieta activa.
- **hasRoutine**: `boolean` (true/false). Filtro para buscar usuarios con rutina activa.
- **hasSpecialist**: `boolean` (true/false). Filtro para buscar usuarios que tienen un especialista asignado.
- **specialistWithPatients**: `boolean` (true/false). Filtro para encontrar especialistas que tienen pacientes asignados.
- **withCommissions**: `boolean` (true/false). Filtro para buscar usuarios con comisiones activas.
- **ordersInProgress**: `boolean` (true/false). Filtro para encontrar usuarios con órdenes en progreso.
- **noPurchases**: `boolean` (true/false). Filtro para encontrar usuarios que no han realizado compras.
- **noRecommendations**: `boolean` (true/false). Filtro para encontrar usuarios sin recomendaciones.

### Body Parameters

- **type**: `string` (Requerido). El tipo de notificación que se enviará. Puede ser uno de los siguientes:
  - `email`: Enviar una notificación por correo electrónico.
  - `whatsapp`: Enviar una notificación por WhatsApp (AÚN NO ESTÁ LISTO).
  - `database`: Enviar una notificación que se almacenará en la base de datos.

Dependiendo del tipo de notificación, el cuerpo de la solicitud variará.

#### Notificaciones por Email (`type: 'email'`)

- **subject**: `string` (Requerido). El asunto del correo electrónico.
- **title**: `string` (Requerido). El título principal del correo electrónico.
- **subtitle**: `string` (Opcional). Un subtítulo para el correo electrónico.
- **notificationDetails**: `string` (Requerido). Detalles principales de la notificación en el correo.
- **footer**: `string` (Opcional). Un pie de página para el correo electrónico.

#### Notificaciones por WhatsApp (`type: 'whatsapp'`)

- **AÚN NO ESTÁ LISTO**

#### Notificaciones a la Base de Datos (`type: 'database'`)

- **title**: `string` (Requerido). El título de la notificación.
- **message**: `string` (Requerido). El mensaje principal de la notificación que será guardado en la base de datos.

## Respuesta

- **200 OK**: Si la notificación fue enviada correctamente se devuelven los usuarios a los que se les envio la notificación.

  ```json
  {
    "folio": "folio",
    "message": "Usuario(s) encontrado(s).",
    "content": [
      {
        "id": "eb003fcf-fcf1-4da0-b003-35afd7198844",
        "name": "Samuel Prueba de update",
        "phone": "",
        "email": "sabyreveles@gmail.com"
      },
      {
        "id": "f0d8e32b-e4bb-4e08-ae48-6c9b96a3a98f",
        "name": "Samuel Usuario",
        "phone": "",
        "email": "samu.sandbox@gmail.com"
      }
    ]
  }
  ```

- **400 Bad Request**: Si los parámetros enviados no son válidos o faltan campos requeridos.
  ```json
  {
    "folio": "folio",
    "message": "Mensaje de error",
    "content": {
      "details": {
        "errors": {
          "body": [
            {
              "type": "campo",
              "value": "valor",
              "msg": "Mensaje de error",
              "path": "campo",
              "location": "query / body"
            }
          ]
        }
      }
    }
  }
  ```

## Validaciones

- **Correo Electrónico**: Se verifica que el campo `email` sea un correo electrónico válido.
- **Perfil**: Se verifica que el `profile` sea uno de los valores definidos en `userProfiles`.
- **Especialidad ID**: Se verifica que `specialtyId` sea un UUID válido.
- **Edad**: Se verifica que `minAge` y `maxAge` sean enteros entre 0 y 120.
- **Fechas**: Se verifica que `createdFrom` y `createdTo` estén en formato ISO8601.
- **Campos de Notificación**: Según el tipo de notificación, se verifican los campos requeridos como `subject`, `title`, `notificationDetails`, etc.

## Ejemplo de Uso

### Solicitud para enviar una notificación por correo electrónico

```json
{
  "type": "email",
  "notificationDetails": "<div class=\"notification\" style=\"background-color: #fff; border-left: 5px solid #007bff; padding: 20px 25px; box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1); border-radius: 4px; max-width: 400px; text-align: left;\"><p class=\"notification-title\" style=\"font-size: 18px; font-weight: bold; margin: 0; color: #333;\">🔔 Notificación</p><p class=\"notification-body\" style=\"font-size: 14px; color: #555; margin-top: 10px;\">Prueba de notificación</p></div>",
  "subject": "Asunto aquí",
  "title": "Título de notificación",
  "subtitle": "Esto es un subtitulo"
}
```

### Solicitud para enviar una notificación por WhatsApp

```json
{
  "type": "whatsapp",
  "message": "¡Hola! Aún no se soporta este tipo de notificación"
}
```

### Solicitud para enviar una notificación a la base de datos

```json
{
  "type": "database",
  "title": "Nueva notificación",
  "message": "Tienes una nueva cita pendiente."
}
```
