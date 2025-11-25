# Multinature Operating System v1

## 1. Visión del Producto
Multinature es un ecosistema integral para especialistas en salud que unifica IA, nutrición, rutinas, evolución clínica, app móvil y herramientas administrativas. La meta es reducir carga a especialistas, mejorar precisión de planes y ofrecer seguimiento real al paciente.

## 2. Mapa del Sistema
- Dietas IA (agente)
- Dietas manuales
- CRUD platillos y menús
- Plantillas de menús reutilizables
- Formularios clínicos
- Historial del paciente
- App móvil: seguimiento, gráficas, rutinas
- Pagos & órdenes
- Notificaciones
- Citas
- Login con Google
- PDF Generator
- Integración con SMAE

## 3. Reglas del Juego
- Toda funcionalidad pasa por requerimiento → diseño → aprobación → desarrollo.
- Ningún cambio de arquitectura sin Miguel + Samuel.
- René es dueño del proceso operativo, sprints, comunicación y backlog.
- Gitflow estricto: no force, no push directo a main ni dev.
- Cada sprint debe tener entregables demostrables y medibles.

## 4. Estado Actual
- **Dietas IA**: funcional, necesita mejorar edición, justificaciones, cálculos GET/AF.
- **Formularios clínicos**: funcional, falta refinamiento y unificación unidades.
- **Recetario / Menús**: CRUD pendiente.
- **App**: seguimiento listo, rutinas pendientes.
- **Pagos**: requiere microservicio y flujo unificado.
- **Notificaciones**: pendiente lambda principal.

## 5. Decisiones por Rol
- **Miguel**: prioridades, visión, arquitectura crítica, IA.
- **René**: procesos, backlog, sprints, logística, coordinación externa.
- **Samuel**: backend, microservicios, cálculos críticos.
- **Diego**: frontend, UI, i18n, gitflow.
- **Antoine**: UX clínico, prompts IA, experiencia especialista.
- **Leo**: QA, matrices de prueba, automatización Selenium.
