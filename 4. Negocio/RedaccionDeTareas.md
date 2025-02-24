# Redacción de tareas y generación de CSV

## ¿Cómo usar el prompt?

Iniciar un **chat nuevo** en [ChatGPT](https://chatgpt.com/) (o IA de su preferencia), copiar y pegar el **prompt** completo para que la IA entienda exactamente cómo debe trabajar.

Una vez que ya se dio el prompt, se puede pedir un CSV con tareas de la siguiente manera:

> **"Genera un archivo CSV con las siguientes tareas, siguiendo el formato que te pasé antes:"**
>
> - **[YYXXX] Desarrollar...**  
>   Contexto: Debe ser similar a...
>
> - **[YYXXX] Actualizar...**
>
> - **[YYXXX] Estructurar...**  
>   Contexto: Considerar ...
>
> - **[YYXXX] Crear...**  

### **¿Qué pasa si en un nuevo chat no recuerda el prompt completo?**

Si no se cuenta con el prompt, se podría decir algo como:

> **"Recuerda que siempre debes entregarme un CSV descargable con la descripción de las tareas en formato Markdown, siguiendo la estructura exacta que te he indicado antes. No me muestres las tareas en pantalla, solo genera el archivo CSV para descargar."**

Así se refuerzan las reglas clave sin tener que pegar el prompt completo.

Con esto, **cualquier nuevo chat** debería seguir el mismo flujo sin desviaciones.

---

## Prompt de redacción de tareas y generación de CSV en ChatGPT

Hola Chat, buen día. Este es el prompt que debes seguir para todas mis solicitudes de redacción de tareas y generación de CSV. Léelo bien y confírmame que lo entendiste antes de continuar.

Por favor, sigue estas indicaciones para todas las solicitudes de tareas y archivos CSV:

1️⃣ Respuestas con mi estilo de escritura

- Redacta las tareas en español con mi estilo de escritura.
- Si el título no es suficiente para inferir detalles clave, pregúntame antes de continuar.
2️⃣ Estructura de la tarea en Markdown

Cada tarea debe contener los siguientes bloques, con el formato exacto que se indica:

```
## Descripción
[Texto de la descripción, alineado con el objetivo y contexto de la tarea]

## Pasos a seguir
1. **[Acción general]**
    - [ ] [Subpaso específico]
    - [ ] [Subpaso específico]
2. **[Acción general]**
    - [ ] [Subpaso específico]
    - [ ] [Subpaso específico]

## Criterios de aceptación
- [ ] [Condición que debe cumplirse]
- [ ] [Condición que debe cumplirse]
- [ ] [Condición que debe cumplirse]
```

📌 Reglas de formato

- No uses saltos de línea extra después de los encabezados (##), el texto debe ir inmediatamente después de los dos puntos (:).
- Los subpuntos dentro de los pasos deben estar en checklist (`[ ]`).
- Usa listas numeradas para pasos generales y listas con checklists (`[ ]`) para subpasos.
- Mantén el orden lógico: análisis → diseño → implementación → pruebas.
- Si la tarea incluye cambios en código, agrega referencias específicas (archivos, variables, estructuras de código).
Si la tarea involucra interfaces gráficas, menciona gráficos, tablas o filtros cuando sea relevante.

3️⃣ CSV con formato específico

Siempre que te pida tareas, tu única respuesta debe ser un CSV descargable donde la columna 'Description' esté en formato Markdown, siguiendo exactamente la estructura especificada en el punto 2️⃣.

📌 Formato del CSV:

- La salida final debe ser un archivo CSV descargable con la cabecera y las filas correspondientes.
- Columnas: "Task Name", "Description", "Priority", "Status", "Tags", "Task assignee(s)".
- Valores por defecto:
  - "Priority" siempre será "Normal".
  - "Status" siempre será "Open".
  - "Tags" quedará vacío si no se especifica.
  - "Task assignee(s)" quedará vacío si no se especifica.
- Reglas de formato:
- Utiliza UTF-8 para que los acentos se vean correctamente.
- Cada celda (Task Name, Description, etc.) debe estar entre comillas ("").
- Mantén el ID del título en Task Name (ejemplo: [01071] Dashboard...).
- Si la tarea implica cambios en código, la descripción debe mencionar archivos, nombres de variables o estructuras clave.
- No muestres las tareas en pantalla, solo genera el CSV para descargar.

📌 Ejemplo exacto de una fila en el CSV:

| Task Name | Description | Priority | Status | Tags | Task assignee(s) |
|-----------|-------------|----------|--------|------|------------------|
| [003] Evaluar la opción de crear un endpoint para enviar las configuraciones de vistas de especialistas por sus especialidades | "## Descripción\nEvaluar la viabilidad de crear un endpoint que permita enviar las configuraciones de vistas de especialistas en función de sus especialidades. Esto facilitará la personalización de la interfaz y la visualización de datos relevantes para cada tipo de especialista.\n\n## Pasos a seguir\n1. **Analizar los requerimientos**\n - [ ] Revisar qué configuraciones necesitan los especialistas según su especialidad.\n - [ ] Determinar si se requiere almacenamiento adicional en base de datos.\n2. **Definir la estructura del endpoint**\n - [ ] Especificar los parámetros de entrada y salida.\n - [ ] Evaluar el impacto en la seguridad y permisos de acceso.\n3. **Elaborar una propuesta**\n - [ ] Documentar la viabilidad técnica y las posibles soluciones.\n - [ ] Presentar la propuesta para su validación.\n\n## Criterios de aceptación\n- [ ] Se ha evaluado la viabilidad técnica del endpoint.\n- [ ] Se ha definido la estructura de datos y permisos.\n- [ ] Se ha documentado la propuesta y está lista para revisión." | "Normal" | "Open" | "back" | "Erick Robles" |

4️⃣ Precisión y claridad
- No agregues información innecesaria o suposiciones sin consultar.
- Si el título no especifica un contexto claro, pídele al usuario que aclare antes de continuar.
- Si la tarea involucra interfaces gráficas, menciona gráficos, tablas o filtros cuando sea relevante.

📌 Flujo de trabajo:

1. Espera a que te envíe los títulos con Tags y assignee antes de generar el CSV.
2. Si el contexto no es claro, pregunta antes de generar la descripción.
3. Genera el archivo CSV sin mostrar las tareas en pantalla.
