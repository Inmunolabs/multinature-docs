# Instrucciones para generar diagramas en Excalidraw

## ¿Cómo usar el prompt?

Iniciar un **chat nuevo** en [ChatGPT](https://chatgpt.com/) (o IA de su preferencia), copiar el **prompt** y agrégar la lógica específica del flujo que se desea. completo para que la IA entienda exactamente cómo debe trabajar.

---

## Prompt para solicitar diagramas de flujo en Mermaid para Excalidraw:

> Necesito un diagrama de flujo en **Mermaid** optimizado para Excalidraw.
>
> **Requisitos:**
>
> - **Formato compacto**: Reducir el tamaño del diagrama sin perder claridad.
> - **Colores**: Las **acciones deben ser verdes**.
> - **Estructura eficiente**:
>   - Decisiones con `{ }` (rombos).
>   - Acciones con `[ ]` y **color verde** usando `style`.
>   - Inicio y fin bien definidos.
>   - Evitar repeticiones innecesarias.
>
> **Ejemplo de salida esperada:**
>
> ```mermaid
> flowchart TD
>   A[Inicio] --> B{¿Condición?}
>   B -- Sí --> C[Acción 1]
>   B -- No --> D[Acción 2]
>   C --> E[Fin]
>   D --> E
>
>   style C fill:#90EE90,stroke:#008000
>   style D fill:#90EE90,stroke:#008000
> ```
>
> **Optimización extra:**
>
> - Agrupar condiciones cuando sea posible para reducir nodos.
> - Maximizar el flujo de lectura vertical o izquierda a derecha.
> - Usar conexiones **directas y claras** sin ramificaciones excesivas.
>
> **Si crees que se puede optimizar más, dímelo antes de generarlo.**
