# Especificaciones Técnicas: Autenticación con Google (Registro y Login)

## 1. Contexto General
El sistema debe permitir a los usuarios autenticarse mediante una cuenta de Google utilizando un flujo unificado ("Continuar con Google"). Este flujo debe gestionar tanto el inicio de sesión de usuarios existentes como el registro de nuevos usuarios.

Dado que la aplicación requiere datos obligatorios que Google no proporciona (Fecha de Nacimiento y Género) y debe mantener la trazabilidad de referencias (`recommenderId`), el flujo de registro incluye un paso intermedio de "completar perfil".

---

## 2. Definiciones Clave

### ¿Qué es el `google_id`?
Es el identificador único (campo `sub` en el estándar OpenID Connect) que Google asigna a cada cuenta.
* **Características:** Es numérico (representado como String), único, inmutable y permanente.
* **Diferencia con el email:** Un usuario puede cambiar su dirección de correo en Google, pero su `google_id` nunca cambia.
* **Uso:** Se utilizará como la llave foránea principal para identificar al usuario externamente.

---

## 3. Cambios en Base de Datos (Schema)

Se requiere modificar la tabla de `users` (o equivalente) para soportar la autenticación híbrida:

| Campo | Tipo de Dato | Propiedades | Descripción |
| :--- | :--- | :--- | :--- |
| `google_id` | `VARCHAR(255)` | **Unique, Nullable, Indexed** | Almacena el ID único de Google. |
| `password` | `VARCHAR` | **Nullable** | Debe permitir `NULL` para usuarios que solo entran con Google. |

---

## 4. Flujos de Usuario

### 4.1. Flujo Unificado (Login/Registro)
1.  El usuario accede a la URL (posiblemente con un parámetro `?recommenderId=XYZ`).
2.  El sistema detecta el `recommenderId` y lo almacena temporalmente (Cookie/LocalStorage/State).
3.  El usuario hace clic en un único botón: **"Continuar con Google"**.
4.  Se solicita autorización a Google con los scopes: `email`, `profile`, `calendar`.

### 4.2. Lógica del Backend (Callback)
Al recibir la respuesta de Google, el backend evalúa:

* **Caso A: El `google_id` YA existe en la BD.**
    * Se actualizan los tokens de acceso/refresh de calendario.
    * **Acción:** Login Exitoso -> Redirección al Dashboard.
* **Caso B: El `google_id` NO existe, pero el `email` SÍ existe.**
    * Se valida que el email de Google venga verificado (`email_verified: true`).
    * **Acción:** Vinculación de cuenta (se guarda el `google_id` en el registro existente) -> Login Exitoso.
* **Caso C: Ni el ID ni el email existen (Usuario Nuevo).**
    * **Acción:** Redirección a la vista **"Completar Registro"**. Se pasan los datos de Google y el `recommenderId` recuperado al frontend.

### 4.3. Flujo de "Completar Registro" (Solo Usuarios Nuevos)
1.  El usuario aterriza en el formulario de registro.
2.  **Pre-llenado:**
    * `Email`: Lleno con el dato de Google (Bloqueado/Read-only).
    * `Nombre/Apellidos`: Llenos con datos de Google (Bloqueado o Editable, según preferencia).
    * `Recomendado por`: Lleno con el `recommenderId` (Bloqueado).
    * `Password`: Oculto (no se requiere).
3.  **Input Manual:** El usuario debe ingresar obligatoriamente:
    * Fecha de Nacimiento.
    * Género.
4.  **Finalización:** Al dar clic en "Crear Cuenta", se envía todo al backend para la creación final del registro.
5.  **Post-Registro:** El usuario es redirigido al flujo de verificación de identidad (si aplica).

---

## 5. Requerimientos Funcionales (RF)

* **RF1 (Acceso Unificado):** El frontend mostrará un único botón de acción para Google que sirva tanto para registrarse como para iniciar sesión.
* **RF2 (Detección de Cuenta):** El sistema debe ser capaz de discernir automáticamente si un usuario de Google es nuevo o recurrente basándose prioritariamente en el `google_id`.
* **RF3 (Bloqueo de Edición):** En la pantalla de finalización de registro, el campo de correo electrónico debe ser inmutable para asegurar que coincida con la cuenta de Google autenticada.
* **RF4 (Datos Obligatorios):** No se permitirá la creación de la cuenta en la base de datos hasta que el usuario haya proporcionado su fecha de nacimiento y género.
* **RF5 (Persistencia del Recomendador):** El sistema debe garantizar que el `recommenderId` (obtenido de la URL inicial) persista durante todo el ciclo de redirección de OAuth para ser asignado correctamente al nuevo usuario.
* **RF6 (Gestión de Contraseñas):** Los usuarios registrados vía Google tendrán el campo de contraseña vacío/nulo y no podrán acceder vía formulario tradicional a menos que configuren una contraseña posteriormente.

---

## 6. Requerimientos No Funcionales (RNF)

* **RNF1 (Validación Backend):** El backend debe validar independientemente el token de identidad (ID Token) recibido de Google utilizando las librerías oficiales o verificando la firma criptográfica; no se debe confiar únicamente en los datos enviados por el frontend.
* **RNF2 (Seguridad de Tokens):** El `refresh_token` de Google Calendar debe almacenarse de manera cifrada (encrypted at rest) en la base de datos, ya que permite acceso a largo plazo a la agenda del usuario.
* **RNF3 (Integridad de Datos):** La columna `google_id` en la base de datos debe tener una restricción de unicidad (UNIQUE CONSTRAINT) para evitar duplicidad de cuentas enlazadas.
* **RNF4 (Scopes):** La petición de autorización debe incluir explícitamente `access_type=offline` para garantizar la obtención del `refresh_token` necesario para la integración con Calendar.