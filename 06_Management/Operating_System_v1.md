# Multinature Operating System v1

> ARCHIVO EN REVISIÓN

## 1. Visión del Producto

Multinature es un ecosistema integral para especialistas en salud que unifica IA, nutrición, rutinas, evolución clínica, app móvil y herramientas administrativas. La meta es reducir carga a especialistas, mejorar precisión de planes y ofrecer seguimiento real al paciente.

El sistema está diseñado para ser modular, escalable y centrado en la experiencia tanto del especialista como del paciente, facilitando la gestión clínica completa desde un solo lugar.

## 2. Mapa del Sistema

### Módulos Core

- **Dietas IA (DietAgent)**: Generación automática de planes nutricionales usando IA, con capacidad de edición y personalización. Incluye cálculos de GET (Gasto Energético Total), equivalencias nutricionales y justificaciones clínicas.

- **Dietas Manuales**: Creación y edición manual de planes nutricionales por parte del especialista, con control total sobre menús y platillos.

- **Platillos y Menús**: Gestión completa de platillos individuales y menús compuestos, con integración a SMAE para búsqueda de recetas.

- **Plantillas de Menús Reutilizables**: Sistema de plantillas que permite a especialistas crear y reutilizar estructuras de menús para diferentes pacientes.

- **Formularios Clínicos**: Sistema de formularios dinámicos para recopilar información del paciente, con soporte para diferentes tipos de preguntas, validaciones y flujos condicionales.

- **Historial del Paciente**: Vista unificada del historial clínico, nutricional y de rutinas del paciente, con capacidad de seguimiento longitudinal.

- **App Móvil**: Aplicación iOS/Android desarrollada por Pandalatec que incluye seguimiento de dietas, gráficas de progreso y rutinas de ejercicio.

- **Pagos & Órdenes**: Sistema de pagos integrado con Openpay y Mercado Pago, gestión de órdenes de productos y servicios, suscripciones mensuales y comisiones.

- **Notificaciones**: Sistema de notificaciones push y por email para mantener a pacientes y especialistas informados sobre eventos relevantes.

- **Citas**: Sistema de agendamiento de citas con especialistas, gestión de horarios de trabajo y pagos asociados.

- **Login con Google**: Autenticación OAuth con Google para facilitar el acceso de usuarios.

- **PDF Generator**: Generación de documentos PDF personalizados (planes de dieta, recetas médicas, etc.) con información del especialista y paciente.

- **Integración con SMAE**: Integración con el Sistema de Menús y Alimentos Equivalentes para búsqueda y cálculo de equivalencias nutricionales.

### Módulos Futuros

- **Médicos Generales**: Línea de producto futura para médicos generales con funcionalidades de recetas médicas, historial clínico completo y gestión de estudios.

## 3. Reglas del Juego

### Flujo de Desarrollo

- **Toda funcionalidad pasa por**: Requerimiento → Diseño → Aprobación → Desarrollo → Testing → Deploy.
- **Ningún cambio de arquitectura** sin aprobación de Miguel.
- **René es dueño** del proceso operativo, sprints, comunicación y backlog.
- **Gitflow estricto**: No force push, no push directo a main ni dev. Todas las ramas deben pasar por PR.
- **Cada sprint** debe tener entregables demostrables y medibles.

### Comunicación y Coordinación

- **René coordina** con Andrés (stakeholder externo) y Pandalatec (proveedor de app móvil).
- **Miguel** toma decisiones sobre prioridades, visión del producto y arquitectura crítica.
- **Samuel** lidera decisiones técnicas de backend y microservicios.
- **Diego** lidera decisiones de frontend, UI y estándares de código.

### Calidad y Testing

- **Leo** es responsable de QA, matrices de prueba y automatización con Selenium.
- Todos los endpoints críticos deben ser validados antes de deploy.
- Las APIs deben tener healthchecks funcionales.

## 4. Estado Actual

### Módulos Funcionales

- **Dietas IA**: Funcional y en producción. Necesita mejoras en edición de menús generados, justificaciones clínicas más robustas y precisión en cálculos GET/AF (Gasto Energético Total / Actividad Física).

- **Formularios Clínicos**: Funcional con formulario base de nutrición. Falta refinamiento en unificación de unidades, mejor legibilidad y estructuración del historial clínico.

- **Pagos**: Microservicio `payments-api` creado y funcional. Integración con Openpay y Mercado Pago operativa. Falta completar flujo unificado y validación de credenciales.

- **App Móvil**: Seguimiento de dietas y gráficas implementado. Rutinas de ejercicio pendientes de implementación.

### Módulos en Desarrollo

- **Recetario / Menús**: CRUD de platillos y menús pendiente de completar. Vista unificada de menús (manual + IA) en desarrollo.

- **Notificaciones**: Lambda principal pendiente. Estructura base creada pero falta implementación completa.

- **Rutinas IA**: Generación automática de rutinas de ejercicio pendiente. Editor de rutinas en desarrollo.

### Módulos Planificados

- **Médicos Generales**: Línea de producto futura. Documentación de reglas de negocio existente, desarrollo pendiente.

- **Chatbot**: Chatbot inicial planificado para Sprint 2.

## 5. Decisiones por Rol

### Miguel – CTO / Product Owner

- **Prioridades**: Define qué se construye y en qué orden.
- **Visión**: Define la dirección del producto y nuevas funcionalidades.
- **Arquitectura Crítica**: Aprueba cambios arquitectónicos significativos junto con Samuel.
- **IA**: Toma decisiones sobre prompts, modelos y mejoras al DietAgent.

### René – PM / Scrum Master

- **Procesos**: Define y mantiene procesos operativos del equipo.
- **Backlog**: Es dueño del backlog, lo organiza y prioriza según dirección de Miguel.
- **Sprints**: Maneja la planificación y ejecución de sprints.
- **Logística**: Coordina compras, suscripciones, equipamiento del equipo.
- **Coordinación Externa**: Punto de contacto con Andrés y Pandalatec.

### Samuel – Backend / Arquitectura

- **Microservicios**: Diseña y desarrolla la arquitectura de microservicios.
- **Pagos**: Lidera el desarrollo del sistema de pagos y sus integraciones.
- **Notificaciones**: Diseña e implementa el sistema de notificaciones.
- **DietAgent Cálculos**: Mejora y mantiene los cálculos críticos del agente de dietas.

### Diego – Frontend Lead

- **Code Review**: Revisa código frontend y mantiene estándares.
- **Diseño Técnico Frontend**: Define arquitectura y patrones del frontend.
- **i18n**: Gestiona internacionalización y traducciones.
- **Estándares UI**: Mantiene consistencia en la interfaz de usuario.

### Antoine – UX Especialista / IA

- **Flujos del Especialista**: Diseña la experiencia de uso para especialistas.
- **Prompts IA**: Mejora y optimiza los prompts del DietAgent.
- **Diseño Clínico**: Asegura que los formularios y flujos cumplan con necesidades clínicas.

### Leo – QA / Tester

- **Pruebas**: Ejecuta pruebas manuales y automatizadas.
- **Selenium**: Desarrolla y mantiene automatización de pruebas.
- **Matrices**: Crea y mantiene matrices de prueba para funcionalidades críticas.

### Erick y Cristopher – Full Stack Junior

- **Tareas Asignadas**: Trabajan en tareas asignadas por René según prioridades del sprint.
- **Soporte General**: Apoyan en desarrollo frontend y backend según necesidad.
