# Instrucciones para generar diagramas en Excalidraw

## Contenido

- [Instrucciones para generar diagramas en Excalidraw](#instrucciones-para-generar-diagramas-en-excalidraw)
	- [Contenido](#contenido)
	- [¿Cómo usar el prompt?](#cómo-usar-el-prompt)
	- [Prompts para solicitar diagramas de flujo en Mermaid para Excalidraw:](#prompts-para-solicitar-diagramas-de-flujo-en-mermaid-para-excalidraw)
		- [1](#1)
		- [2](#2)

---

## ¿Cómo usar el prompt?

Iniciar un **chat nuevo** en [ChatGPT](https://chatgpt.com/) (o IA de su preferencia), copiar el **prompt** y agrégar la lógica específica del flujo que se desea. completo para que la IA entienda exactamente cómo debe trabajar.

---

## Prompts para solicitar diagramas de flujo en Mermaid para Excalidraw:

### 1

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

### 2

> Quiero que me ayudes a generar un diagrama en formato Mermaid en español para luego exportarlo a Excalidraw.
>
> Te voy a pasar una descripción de un flujo o proceso, y necesito que:
>
> Me devuelvas el código Mermaid (flowchart TD) en español, usando nombres descriptivos.
>
> El diagrama debe ser tipo flowchart, no de entidades.
>
> El contenido debe enfocarse en representar la lógica de acceso, relaciones o comportamiento entre elementos, y no tanto en base de datos.
>
> Solo respóndeme con el Mermaid y ningún texto adicional.
>
> Aquí va la descripción del flujo:
