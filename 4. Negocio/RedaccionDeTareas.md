# Redacción de tareas y generación de CSV

## Prompt de redacción de tareas y generación de CSV en ChatGPT

    Hola Chat, buen día, necesito que me ayudes a redactar tareas con base en su título **y** a generar un archivo CSV descargable con los campos `Task Name`, `Description`, `Priority` y `Status`.

    Por favor, sigue estas indicaciones:

    ### **1️⃣ Respuestas con mi estilo de escritura**
    - Redacta las tareas en español con mi estilo de escritura.
    - Si el título no es suficiente para inferir detalles clave, pregúntame antes de continuar.

    ### **2️⃣ Estructura de la tarea en Markdown**
    Cada tarea debe contener los siguientes bloques, con el formato exacto que se indica:

    	```
    	## Descripción
    	[Texto de la descripción, alineado con el objetivo y contexto de la tarea]

    	## Pasos a seguir
    	1. **[Acción general]**
    			- [ ]  [Subpaso específico]
    			- [ ]  [Subpaso específico]
    	2. **[Acción general]**
    			- [ ]  [Subpaso específico]
    			- [ ]  [Subpaso específico]

    	## Criterios de aceptación
    	- [ ]  [Condición que debe cumplirse]
    	- [ ]  [Condición que debe cumplirse]
    	- [ ]  [Condición que debe cumplirse]```
    	```

    #### **Reglas de formato**
    - **No uses saltos de línea extra** después de los encabezados (`##`), el texto debe ir inmediatamente después de los dos puntos (`:`).
    - **Los subpuntos dentro de los pasos deben estar en checklist (`[ ]`).**
    - **Usa listas numeradas para pasos generales y listas con checklists para subpasos.**
    - **Mantén el orden lógico**: análisis → diseño → implementación → pruebas.
    - Si se requiere información adicional, como un link de referencia, agrégalo dentro de la **descripción**.

    ### **3️⃣ CSV con formato específico**
    - La salida final debe ser **un archivo CSV descargable** con la cabecera y las filas correspondientes.
    - **Columnas:** `Task Name`, `Description`, `Priority`, `Status`.
    - **Valores por defecto:**
    	- `"Priority"` siempre será `"Normal"`.
    	- `"Status"` siempre será `"Open"`.
    - **Reglas de formato:**
    	- Utiliza **UTF-8** para que los acentos se vean correctamente.
    	- Cada celda (Task Name, Description, etc.) debe estar entre **comillas** (`""`).
    	- Mantén el **ID del título** en `Task Name` (ejemplo: `[01071] Dashboard...`).
    	- **No muestres las tareas en pantalla, solo genera el CSV para descargar.**

    ### **4️⃣ Precisión y claridad**
    - **No agregues información innecesaria o suposiciones sin consultar.**
    - **Si el título no especifica un contexto claro, pídele al usuario que aclare antes de continuar.**
    - **Si la tarea involucra interfaces gráficas, menciona gráficos, tablas o filtros cuando sea relevante.**

    📌 **Una vez entendido**, por favor espera a que te envíe los títulos antes de generar el CSV. No necesito que me muestres todas las tareas en pantalla, solo quiero el archivo listo para descargar.

## 02.12.2025 - Propmts

### Tareas: [17001], [17002], [18001], [18002]

    - Hola chat, Tienes claras tus intrucciones?
    - En que formato redactarías la descripción de las tareas?
    - Ayudame con las siguientes 4 nuevas tareas por favor

    * [18001] Actualizar la Landing Page
    Contexto: La nueva Landing Page debe tener un icono que invite a dar scroll hacía abajo, su contenido son 4 secciones: "¿Quiénes somos?", "Nuestras Herramientas de especialistas", "Comienza en cinco sencillos pasos", "Listo para potenciar tu negocio"

    * [18002] Actualizar la Página de Socios
    Contexto: Página de descripción del esquema de negocio de los socios, de manera clara, precisa y amigable para los usuarios; evitar dar a entender que es un esquema piramidal.
    Agregar funcionalidad de convertir en socio (Botón de convertirte en socio)

    * [17001] Actualizar el Home de Especialistas
    Contexto: El home de especialistas debe contener:
    1. Lista con dos columnas, el nombre de usuarios y su teléfono (que sea un botón que llame automáticamente al paciente). Considerar agregar algún otro dato que ayude al especialista a identificar al paciente. Cada fila (cada usuario) debe redirigir a los detalles de ese usuario
    2. Citas, con un botón para seleccionar las citas del día o las citas de la semana (esta configuración debe ser respetada para cada especialista, es decir, cada que inicie sesión esta configuración debe aparecer seleccionada por defecto). Cada cita debe mostrar toda su información (lugar de la cita: hora; paciente; notas; si hay liga de videollamada; agregarla), además el botón para llamar al paciente y para actualizar/cancelar la cita
    3. Botón de Alta de cliente
    4. Si se agrega el carrusel de "Nuevos Productos" (por solicitud de Andrés) este debería estar en la parte superior de la página y cada producto debe tener los "Call to action": "recomendar a paciente", "ver más" y "agregar al carrito"

    * [17002] Actualizar la relación entre los usuarios y sus especialidades
    Contexto: Utilizar las tablas (previamente creadas) de ```specialities``` y ```users_specialities```
    Entender cómo funciona la relación entre las tablas ```specialities``` y ```users_specialities```, entender cómo con la nueva estructura de la base de datos se debería modificar el código para readaptar las funciones que relacionen a un usuario y sus especialidades
    Si las actualizaciones requieren modificar el api de orders esperar ahí, pero si modificar el resto de apis y layers.
    Revisar que users_specialities tiene el userId y que sea un Foreign Key apuntando a la tabla users y a su columna ```id```
