# Impacto: usuario sin email (solo teléfono)

Documento para Product Owner: por qué **no** se puede ofrecer registro/login solo con teléfono en una hora. Lista de **funcionalidades** afectadas, no de métodos técnicos.

---

## Resumen ejecutivo

Hoy el sistema trata el **correo electrónico como identificador único del usuario** en registro, login, recuperación de contraseña y en casi todas las notificaciones y flujos de negocio. Permitir usuarios “solo con teléfono” implica tocar muchas funcionalidades de producto, no solo “cambiar un campo en la base de datos”.

---

## 1. Acceso e identidad

| Funcionalidad | Impacto si el usuario no tiene email |
|---------------|--------------------------------------|
| **Registro de nuevos usuarios** | El formulario y la base de datos exigen email obligatorio. Sin email no se puede crear la cuenta con las reglas actuales. |
| **Inicio de sesión (login)** | Hoy se entra con email + contraseña. Sin email no hay forma de identificar al usuario para darle acceso. |
| **Recuperación de contraseña** | El código de recuperación se envía por correo. Sin email no hay forma de enviar ese código. |
| **Verificación de cuenta (activación)** | El enlace o código de activación se envía por correo. Sin email el usuario no podría activar la cuenta. |

---

## 2. Comunicación con el usuario

Todas estas notificaciones van **al correo del usuario**. Si no tiene email, no llegan.

| Funcionalidad | Impacto |
|---------------|---------|
| **Confirmación de pedido** | El cliente no recibiría el correo de confirmación al comprar. |
| **Copia de orden de compra** | No se podría enviar la orden por correo al usuario. |
| **Avisos de envío / seguimiento de pedido** | Los avisos de logística van por email; el usuario no los recibiría. |
| **Mensajes del equipo (soporte / especialistas)** | “Enviar mensaje al usuario” usa el correo; no habría destino. |
| **Notificaciones in-app por email** | Notificaciones de “nuevo usuario en tu red”, “usuario de tu red hizo un pedido”, “comisiones enviadas”, etc. no se podrían enviar por email. |
| **Recordatorios o notificaciones masivas** | Cualquier envío por email (notifications-api, etc.) no tendría destinatario. |

---

## 3. Pedidos y pagos

| Funcionalidad | Impacto |
|---------------|---------|
| **Crear pedido** | En el sistema el pedido guarda obligatoriamente un “email del usuario”. Sin email habría que decidir qué guardar (vacío, placeholder o teléfono) y adaptar reglas de negocio y facturación. |
| **Comprobantes y facturación** | Los comprobantes y comunicaciones de pago se envían o asocian al email del usuario; sin email el flujo actual se rompe. |
| **Pagos con tarjeta / pasarela** | OpenPay (u otra pasarela) recibe el email del usuario; es un dato que suelen exigir. Sin email habría que validar si aceptan solo teléfono. |

---

## 4. Citas y servicios (bookings / pagos de servicio)

| Funcionalidad | Impacto |
|---------------|---------|
| **Confirmación de cita** | Se notifica por correo al paciente y al especialista. Sin email del paciente no se podría enviar esa confirmación. |
| **Recordatorios de cita** | Si se envían por email, el usuario sin email no los recibiría. |
| **Pagos de consulta / servicio** | El pago de servicio guarda y usa “email del usuario”; sin email habría que definir cómo se identifica y notifica al usuario. |

---

## 5. Red de referidos y recomendador

| Funcionalidad | Impacto |
|---------------|---------|
| **Registro con “quién te recomendó”** | Hoy se identifica al recomendador por **correo** (recommenderEmail). Si el nuevo usuario solo tiene teléfono, el flujo sigue igual; pero si el **recomendador** no tiene email, no se podría buscar ni asignar correctamente. |
| **Asignar paciente a especialista** | Los especialistas asignan pacientes por **email** (assign-user por email). Si el paciente no tiene email, no se podría usar ese flujo. |
| **Invitaciones a teamwork** | Se invita a especialistas por **email**. Usuarios sin email no podrían ser invitados por ese canal. |
| **Enlaces de referido (producto o especialista)** | Los links de referido se resuelven con el email del recomendador; si en el futuro el recomendador puede ser “solo teléfono”, habría que añadir otra forma de identificación (ej. por teléfono o por ID en el link). |

---

## 6. Especialistas y equipos

| Funcionalidad | Impacto |
|---------------|---------|
| **Buscar paciente por email** | “Encontrar paciente por email” (imports, asignación) no funcionaría para usuarios sin email; haría falta “buscar por teléfono” o por otro dato. |
| **Compartir hojas de cálculo (Google Sheets)** | Se dan permisos por correo (lector/escritor). Sin email del usuario no se podría invitar a la hoja. |
| **Integración con calendario (Google Calendar)** | Los eventos incluyen al usuario como asistente por email; sin email el calendario no podría mostrar correctamente al paciente. |

---

## 7. Comisiones y reportes

| Funcionalidad | Impacto |
|---------------|---------|
| **Liquidación de comisiones** | El aviso de “comisión liquidada” se envía por correo al especialista/usuario. Sin email no se enviaría. |
| **Reportes y auditoría** | Algunos reportes y auditorías (p. ej. auditoría de peticiones HTTP) guardan “email del usuario”; sin email habría que definir qué se guarda y cómo se consulta. |

---

## 8. Integraciones externas

| Funcionalidad | Impacto |
|---------------|---------|
| **OpenPay** | La creación de usuario en la pasarela usa email (y nombre). Sin email habría que revisar si la pasarela lo permite y cómo. |
| **Wire4 (pagos SPEI/CLABE)** | Se usa el email del usuario en el flujo de cuentas; sin email ese flujo tendría que adaptarse. |

---

## Conclusión para el Product Owner

- **No es un cambio de “una hora”** porque:
  - El **registro**, **login**, **recuperación de contraseña** y **verificación de cuenta** dependen del email.
  - **Todas las notificaciones por correo** (pedidos, citas, comisiones, mensajes, red) dejarían de llegar a usuarios sin email.
  - **Pedidos, pagos y citas** guardan y usan el email del usuario; hay que definir reglas y cambios en varios módulos.
  - **Asignación de pacientes, referidos y red** usan el email para identificar a usuarios y recomendadores.
  - **Integraciones** (OpenPay, Wire4, Google) asumen o exigen email.

- Para soportar **“usuario solo con teléfono”** hace falta:
  - Definir **qué funcionalidades** se ofrecen sin email (p. ej. solo registro/login por teléfono + SMS) y cuáles exigen email.
  - Introducir **canal SMS (o similar)** para códigos y avisos críticos.
  - Ajustar **base de datos**, **APIs** y **flujos de negocio** en varias áreas (usuarios, pedidos, citas, comisiones, notificaciones).
  - Revisar **pasarelas e integraciones** para ver qué permiten sin email.

Este documento resume el **impacto en funcionalidades**; la implementación técnica implica varios equipos/APIs y un diseño previo de producto y negocio.
