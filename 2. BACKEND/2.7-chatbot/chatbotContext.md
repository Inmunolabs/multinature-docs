# Chatbot Context

## 📋 Descripción básica

Estará dentro de la página un asistente de inteligencia artificial (IA) que pueda ayudar con operaciones que se hacen dentro de la página, pero desde el asistente. El asistente será una conexión con la API de OpenAI para que ChatGPT sea el encargado de tomar las decisiones del chatbot.

### 🎯 Funcionalidades principales

- **Modificar una cita** (status, fecha, dirección, etc)
- **Cancelar una cita**
- **Agregar productos al carrito**
- **Cambiar datos de perfil**
- **Preguntar por disponibilidad de un especialista**
- **Analizar los datos del dashboard** (solo admin)
- **Hacer una dieta**
- **Hacer una rutina**

---

## 🏗️ Infraestructura

Se tendrá un servidor en EC2 con una imagen con el backend que se estará exponiendo a la IP pública del servidor con una conexión por medio de sockets para tener respuestas del chatbot y que se mencioné qué se está haciendo. Las herramientas que se usarán será:

### 🛠️ Stack tecnológico

- **S3** para almacenar la imagen del backend
- **GitHub Actions** para actualizar el código de la imagen en S3
- **EC2** para hostear el servidor de sockets
- **Express.js** para hacer el servidor

---

## 💬 Flujos general del chat

El usuario mandará un mensaje por medio del servidor de sockets y el socket server mandará una respuesta, confirmación de una acción para ejecutar en el mismo backend o incluso una acción para ejecutar en el frontend.

---

## 🔄 Flujos específicos para cada acción

Para cada flujo específico de una acción en concreto, se va a partir desde que chat detecta la intensión de que se quiere hacer dicha acción. Durante todo el proceso de recolección de datos para la IA, se responderá al usuario con el mensaje de qué se está haciendo. Dentro de las operaciones hechas con IA, se tendrá una impodency key que hará función de identificar las acciones con IA.

### 📅 Modificar una cita (evento `edit_booking`)

#### 1. **IA → Backend**: consulta contexto
- List bookings
- Get availability
    
    *"🔎 Consultando tus citas y disponibilidad…"*
    
#### 2. **Desambiguación y (opcional) confirmación**
- Si ya se identifica la cita: *"¿Confirmas mover la cita del 20/09 10:00–10:30?"*
- Si no, pregunta cuál de las citas quiere modificar.
- Propón *slots* válidos si falta horario: *"🧭 Disponibles: 11:00–11:30, 12:00–12:30"*.

#### 3. **Ejecución**
1. La IA identifica acción **`edit_booking`** y recopila: `booking_id`, `starts_at`, `ends_at`, `notes`, `location`, `idempotency_key`.
2. El backend llama al **método editBooking** (endpoint lambda de edición).
3. El método devuelve la respuesta y la IA redacta al usuario: *"✅ Cita reagendada …"*.

### ❌ Cancelar una cita (evento `cancel_booking`)

#### 1. **IA → Backend**: verifica elegibilidad y contexto
- Revisa políticas de cancelación/hora límite.
    
    *"🔎 Revisando tu cita y políticas de cancelación…"*
    
#### 2. **Desambiguación (si hay varias)**
- Pide elegir la cita a cancelar si hay más de una candidata.
- (Opcional) solicita motivo breve.

#### 3. **Ejecución**
1. La IA identifica **`cancel_booking`** con: `booking_id`, `reason?`, `idempotency_key`.
2. El backend llama al **método cancelBooking** (endpoint lambda de cancelación).
3. Respuesta al usuario: *"🗑️ Cita cancelada (id …). Envié confirmación por correo."*.

### 🛒 Agregar productos al carrito (evento `add_to_cart`)

#### 1. **IA → Backend**: valida datos mínimos
- Verifica `product_id` y `quantity` (nueva cantidad total).
    
    *"🧺 Actualizando tu carrito…"*
    
#### 2. **Desambiguación (si falta algo)**
- Si falta cantidad o hay varias presentaciones, pregunta.

#### 3. **Ejecución**
1. La IA identifica **`add_to_cart`** con: `product_id`, `quantity`, `idempotency_key`.
2. El backend llama a **POST /cart**.
3. Respuesta al usuario: *"✅ Carrito actualizado. Total: $… (items …)."*.

### 👤 Cambiar datos de perfil (evento `update_profile`)

#### 1. **IA → Backend**: recolecta campos a modificar
- `name`, `last_name`, `phone`, `birth_date` (solo los presentes).
    
    *"🪪 Actualizando tu perfil…"*
    
#### 2. **Validaciones**
- Formato de teléfono y fecha de nacimiento.

#### 3. **Ejecución**
1. La IA identifica **`update_profile`** con: campos a actualizar + `idempotency_key`.
2. El backend llama a **PATCH /profile**.
3. Respuesta: *"✅ Perfil actualizado."*.

### 🗓️ Disponibilidad de un especialista (evento `get_availability`)

#### 1. **IA → Backend**: obtiene disponibilidad
- `specialist_id` y rango `from/to`.
    
    *"🗓️ Consultando disponibilidad…"*
    
#### 2. **Presentación**
- Lista de *slots* ordenados por fecha.
- Si el usuario ya dio una fecha objetivo, filtra.

#### 3. **Devolver los datos al usuario**

### 📊 Analizar datos del dashboard (evento `analyze_dashboard`, solo admin)

#### 1. **IA → Backend**: verifica rol admin y recupera datos
- Llama a **GET /admin/dashboard** (con rango/ métricas si se pide).
    
    *"📊 Recuperando datos del dashboard…"*
    
#### 2. **Interpretación**
- La IA resume tendencias, outliers, KPIs y compara contra periodos previos.
- Señala causas probables y recomendaciones accionables.

#### 3. **Entrega**
- Resumen claro + bullets y, si aplica, *"Siguiente paso sugerido: …"*.
- Si no es admin: *"Esta función es solo para administradores."*.