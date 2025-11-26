# Release Plan v1 – Sprint 1 y Sprint 2

## Objetivo General

Terminar la Beta para validación final con especialista, avanzar hacia la versión 1.0 y dejar bases sólidas para la versión 1.1. Este plan establece el camino desde el estado actual hasta una versión estable y funcional que pueda ser validada por usuarios reales.

**Roadmap:**
- **Beta Final** (Sprint 1) → Validación con especialistas
- **Versión 1.0** (Sprint 2) → Lanzamiento público inicial
- **Versión 1.1** (Futuro) → Mejoras y nuevas funcionalidades

---

# Sprint 1 – Beta Final

## Objetivo del Sprint

Completar todas las funcionalidades críticas necesarias para realizar una beta cerrada con especialistas. El objetivo es tener un sistema funcional y estable que permita validar el concepto y recibir feedback real de usuarios.

## Alcance

### Funcionalidades Core

- **Vista unificada de menús (manual + IA)**
  - Crear interfaz que muestre tanto menús creados manualmente como generados por IA en una sola vista
  - Permitir comparación y transición entre ambos tipos
  - Mejorar navegación y organización

- **Edición de menús generados por IA desde JSON en DB**
  - Implementar capacidad de editar menús generados por IA
  - Modificar platillos, porciones y horarios directamente desde la interfaz
  - Guardar cambios en formato JSON en base de datos manteniendo trazabilidad

- **CRUD completo de platillos**
  - Crear, leer, actualizar y eliminar platillos individuales
  - Validaciones de datos y permisos
  - Integración con SMAE para búsqueda de recetas

- **CRUD de menús**
  - Crear, leer, actualizar y eliminar menús completos
  - Asociación con pacientes y especialistas
  - Gestión de versiones y historial

- **Mejoras en formularios clínicos**
  - Mejorar legibilidad y organización visual
  - Unificar unidades de medida
  - Optimizar flujo de llenado

- **Emails: corrección de contenido + estilo unificado**
  - Corregir campos incorrectos en plantillas de email
  - Unificar estilo y formato de todos los emails
  - Validar datos antes de envío

- **Gitflow + workflows automáticos**
  - Implementar gitflow completo y estricto
  - Configurar workflows de CI/CD
  - Automatizar testing y validaciones

- **Validación de endpoints críticos con Leo**
  - Ejecutar pruebas completas de endpoints críticos
  - Validar casos edge y manejo de errores
  - Documentar resultados y corregir issues encontrados

## Dependencias

- **Diseño y validaciones de Antoine**: Diseños de UI/UX para nuevas funcionalidades deben estar listos antes de desarrollo frontend
- **Endpoints listos por Samuel**: Backend debe estar completo y probado antes de integración frontend

## Riesgos

- **SMAE inconsistente**: Si SMAE sigue presentando problemas, afectará la calidad de las dietas generadas y la búsqueda de platillos
  - *Mitigación*: Priorizar corrección de bugs críticos de SMAE antes del sprint

- **Falta de equivalencias nutricionales precisas**: Sin equivalencias precisas, las dietas pueden tener errores nutricionales
  - *Mitigación*: Validar equivalencias con especialistas y corregir discrepancias

- **Cambios simultáneos en diet_agent**: Si se hacen cambios al agente durante el sprint, puede introducir regresiones
  - *Mitigación*: Freezar cambios al agente durante el sprint o hacerlos en rama separada

## Métricas de Éxito

- **Funcionalidad**: 100% de las funcionalidades del alcance completadas y funcionando
- **Calidad**: 0 bugs críticos conocidos al final del sprint
- **Testing**: 80%+ de cobertura de pruebas en endpoints críticos
- **Performance**: Tiempo de respuesta < 2s para endpoints principales
- **Documentación**: 100% de endpoints nuevos documentados

## Entregables

- Sistema funcional con todas las funcionalidades del alcance
- Documentación actualizada de APIs y flujos
- Reporte de testing con resultados y correcciones aplicadas
- Plan de despliegue para beta

---

# Sprint 2 – Rumbo a Versión 1.0

## Objetivo del Sprint

Avanzar hacia la versión 1.0 implementando funcionalidades clave que diferencien el producto y mejoren la experiencia tanto de especialistas como de pacientes. El objetivo es tener un producto completo y listo para lanzamiento público inicial.

## Alcance

### Funcionalidades Nuevas

- **Rutinas IA (generación + edición)**
  - Implementar generación automática de rutinas de ejercicio usando IA
  - Crear editor visual para modificar rutinas generadas
  - Integrar con sistema de seguimiento en app móvil
  - Validar rutinas con especialistas en ejercicio

- **Flujo citas IA**
  - Implementar asistente IA para agendamiento de citas
  - Sugerencias inteligentes de horarios basadas en disponibilidad
  - Recordatorios automáticos personalizados
  - Optimización de agenda del especialista

- **Chatbot inicial**
  - Implementar chatbot básico para atención inicial de pacientes
  - Respuestas a preguntas frecuentes
  - Derivación a especialista cuando sea necesario
  - Integración con sistema de notificaciones

- **App: implementación de rutinas**
  - Completar funcionalidad de rutinas en app móvil (Pandalatec)
  - Visualización de rutinas asignadas
  - Seguimiento de ejercicios completados
  - Notificaciones de recordatorios
  - Sincronización con backend

- **Primer set de notificaciones**
  - Implementar lambda principal de notificaciones
  - Notificaciones push para app móvil
  - Notificaciones por email
  - Sistema de preferencias de usuario
  - Eventos: citas, recordatorios de dieta, resultados de estudios

- **Documentación de reglas y flujos**
  - Documentar todas las reglas de negocio críticas
  - Crear diagramas de flujo de procesos principales
  - Documentar decisiones arquitectónicas importantes
  - Mantener documentación actualizada

### Mejoras y Refinamientos

- **Mejoras al DietAgent**
  - Mejorar precisión de cálculos GET/AF
  - Clarificar diferencia entre CAF y AF
  - Mejorar justificaciones clínicas
  - Optimizar performance

- **Mejoras a formularios**
  - Completar refinamientos iniciados en Sprint 1
  - Mejorar validaciones
  - Optimizar experiencia de usuario

## Dependencias

- **Definición clara de prompts IA**: Los prompts para rutinas IA y chatbot deben estar definidos y validados antes de desarrollo
- **Endpoints completados en backend**: Backend debe estar completo antes de integración con app móvil
- **Coordinación con Pandalatec**: App móvil requiere coordinación estrecha con proveedor externo

## Riesgos

- **Carga al agente IA**: Agregar rutinas IA y chatbot puede aumentar significativamente la carga en el agente, afectando performance
  - *Mitigación*: Implementar rate limiting, caching y optimización de prompts

- **Ajustes de app con Pandalatec**: Dependencia externa puede introducir retrasos si hay problemas de comunicación o cambios de alcance
  - *Mitigación*: Establecer comunicación frecuente, definir contratos claros y tener plan B

- **Complejidad de integraciones**: Múltiples integraciones nuevas (IA, app, notificaciones) pueden introducir bugs complejos
  - *Mitigación*: Testing exhaustivo, integración incremental y monitoreo continuo

## Métricas de Éxito

- **Funcionalidad**: 100% de funcionalidades del alcance completadas
- **Calidad**: < 5 bugs de severidad media al final del sprint
- **Performance**: Tiempo de respuesta < 3s para endpoints de IA
- **Adopción**: 70%+ de especialistas beta usando nuevas funcionalidades
- **Satisfacción**: Score de satisfacción > 4/5 en feedback de beta testers

## Entregables

- Versión 1.0 funcional con todas las funcionalidades del alcance
- App móvil con rutinas completamente funcional
- Sistema de notificaciones operativo
- Documentación completa de reglas y flujos
- Plan de lanzamiento público
- Reporte de beta testing con aprendizajes y mejoras aplicadas

---

## Consideraciones Generales

### Comunicación

- **Daily standups**: Diarios a las 9:00 AM
- **Sprint planning**: Al inicio de cada sprint
- **Sprint review**: Al final de cada sprint con demos
- **Retrospectiva**: Después de cada sprint para mejorar procesos

### Calidad

- **Code review**: Obligatorio para todo código antes de merge
- **Testing**: Unit tests para lógica crítica, integration tests para endpoints
- **Documentación**: Mantener actualizada durante desarrollo, no después

### Coordinación Externa

- **Pandalatec**: Reuniones semanales de seguimiento, comunicación diaria vía Slack
- **Andrés**: Actualizaciones semanales de progreso, revisión de prioridades según necesidad

### Monitoreo

- **Healthchecks**: Monitoreo continuo de todas las APIs
- **Logs**: Revisión diaria de logs de errores
- **Métricas**: Dashboard de métricas clave (performance, errores, uso)

---

- **Última actualización**: 2025-01-21
- **Responsable**: René (PM) con apoyo de Miguel (CTO)
