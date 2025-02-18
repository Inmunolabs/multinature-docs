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
