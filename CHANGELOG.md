# Changelog

## 2025-12-01 - 2025-12-03

### Actualización de Documentación - Management y READMEs

- [Added] Agregado `docs/06_Management/Master_Project_Summary.md` - Resumen maestro del proyecto con estado general, módulos completados y riesgos mayores
- [Added] Agregado `docs/06_Management/Executive_Dashboard_Andres.md` - Dashboard ejecutivo con estado actual de módulos, riesgos críticos y fechas clave
- [Added] Agregado `docs/06_Management/ReleasePlan_Sprint7_8_9.md` - Plan de release para Sprint 7, Sprint 8 y Sprint 9 con alcance y entregables hacia Release 1.1
- [Added] Agregado `docs/06_Management/Sprint_1.0_Estabilidad_Nutricional/tasks.md` - Tareas detalladas del Sprint 1.0 con épicas, contextos, estimaciones y asignaciones
- [Updated] Actualizado `docs/06_Management/README.md` - Integrados nuevos archivos ejecutivos y de planificación:
  - Agregada sección de "Master Project Summary" y "Executive Dashboard" en Visión y Planificación Estratégica
  - Agregado "Release Plan Sprints 7, 8 y 9" en Planificación
  - Agregado "Sprint 1.0 Estabilidad Nutricional – Tareas" en Planificación
  - Agregado "Guía Clickup" en Planificación
  - Actualizadas secciones de uso para Project Managers y Product Owners
  - Actualizado conteo de archivos a 22 (incluye subdirectorios)

## 2025-11-27

### Actualización de Documentación - Management

- [Updated] Actualizado `docs/06_Management/ReleasePlan_Sprints.md` - Integradas funcionalidades de Rutinas en Sprint 2:
  - Generar PDFs de rutinas para los pacientes
  - CRUD Rutina por semana
  - Migración de sistema antiguo a nuevo
  - Agregadas dependencias, riesgos y métricas relacionadas
- [Updated] Reorganizado `docs/06_Management/Backlog_Refinado.md` - Estructura completamente reorganizada por sprints:
  - Backlog ahora organizado por Sprint 1, Sprint 2, Sprint 3, Sprint 4 y Backlog General
  - Cada sprint mantiene categorías: Bugs, Mejora, Funcionalidad Nueva, Débito Técnico, Experiencia del Paciente, Experiencia del Especialista, IA – Diet Agent
  - Todas las funcionalidades del Release Plan mapeadas al backlog correspondiente
  - Ítems sin sprint asignado conservados en sección "Backlog General"
- [Docs] Actualizado `docs/06_Management/README.md` - Referencias actualizadas a ReleasePlan_Sprints.md, descripción del Backlog Refinado mejorada para reflejar organización por sprints

## 2025-11-26

### Actualización de Documentación - Management

- [Added] Agregado `docs/06_Management/Management_Calendar.md` - Documentación del calendario de dirección para planeación estratégica y toma de decisiones
- [Added] Agregado `docs/06_Management/Team_Vacations.md` - Documentación de gestión de vacaciones y permisos del equipo
- [Added] Agregado `docs/06_Management/Team_Capacity_and_Availability.md` - Documentación de capacidad real, modalidad de trabajo, restricciones y disponibilidad semanal del equipo
- [Removed] Eliminado `docs/06_Management/Team_Cards.md` (archivo obsoleto)
- [Removed] Eliminado `docs/06_Management/Onboarding_Rene_Professional.md` (archivo obsoleto)
- [Docs] Actualizado `docs/06_Management/README.md` - Reorganizada estructura para reflejar archivos actuales, agregada sección de "Calendarios y Coordinación", agregada referencia a Team Capacity and Availability en sección de Equipo, actualizado conteo de archivos (8 archivos)

## 2025-11-24

### Reorganización de Documentación

- [Moved] Movida carpeta `docs/01_Backend/Database/` → `docs/04_SQL/tables/` para centralizar toda la documentación SQL
- [Moved] Movido `MIGRATIONS.md` → `docs/04_SQL/migrations.md`
- [Moved] Movido `docs/models/dietResponse.md` → `docs/01_Backend/APIs/diets-api/Models/dietResponse.md`
- [Removed] Eliminadas carpetas `docs/99_Privado/Reportes/` y `docs/99_Privado/Refactors/` (contenido obsoleto)
- [Removed] Eliminada carpeta `docs/models/` (vacía después de mover dietResponse.md)
- [Removed] Eliminados scripts obsoletos de `docs/03_Infraestructura/Scripts/` (migración de documentación, auditorías, índices)

### Actualización de Documentación

- [Docs] Actualización completa de todos los README.md en `docs/` con formato consistente
- [Docs] Reorganización y limpieza de `docs/03_Infraestructura/Scripts/README.md` - Solo scripts activos documentados (9 scripts)
- [Docs] Actualización de README principales: `docs/README.md`, `docs/00_Overview/README.md`, `docs/01_Backend/README.md`, `docs/02_Frontend/README.md`, `docs/03_Infraestructura/README.md`
- [Docs] Actualización de README de secciones: `docs/04_SQL/README.md`, `docs/05_Negocio/README.md`, `docs/99_Privado/README.md`
- [Docs] Mejora de documentación de APIs, Database y Layers en `docs/01_Backend/`
- [Docs] Consolidación de README.md en `docs/02_Frontend/` (eliminado old-README.md)
- [Docs] Creado `docs/01_Backend/APIs/ENDPOINTS_INDEX.md` - Índice centralizado de todos los endpoints (150+ endpoints)
- [Docs] Creado `docs/01_Backend/Database/README.md` → Movido a `docs/04_SQL/README.md`
- [Docs] Creado `docs/01_Backend/APIs/diets-api/Models/` - Carpeta para modelos de datos de APIs
- [Docs] Formato consistente aplicado a todos los README con secciones organizadas, descripciones claras y metadatos actualizados

### Actualización de Enlaces y Referencias

- [Fixed] Actualizados todos los enlaces de `01_Backend/Database/` → `04_SQL/tables/` en toda la documentación
- [Fixed] Actualizados enlaces en `docs/README.md`, `docs/00_Overview/`, `docs/01_Backend/`, `docs/03_Infraestructura/Scripts/`
- [Fixed] Actualizada referencia en `docs/01_Backend/APIs/diets-api/Endpoints/generate-automatic.md` al nuevo path del modelo
- [Fixed] Actualizados README de `docs/99_Privado/` para reflejar solo la sección Testing (eliminadas referencias a Reportes y Refactors)
- [Fixed] Actualizadas rutas en scripts: `validate-entities-vs-ddl.js` ahora apunta a `docs/04_SQL/tables/`
- [Fixed] Actualizadas referencias en `docs/00_Overview/AGENTS_GUIDE.md` y `docs/00_Overview/PROJECT_STRUCTURE.md`
- [Fixed] Actualizada documentación en `docs/03_Infraestructura/Scripts/validation-tools.md` con nuevas rutas
- [Fixed] Actualizados índices principales para reflejar solo scripts activos (9 scripts en lugar de 25+)

## 2025-11-14

- [Added] Cada `dish` expone `dataOrigin` (`fromDb`, `agentAdjusted`, `notes`) para trazar si la información proviene directo de la BD o de ajustes del agente.
- [Changed] `dailyEquivalences` confía exclusivamente en la propuesta del DietAgent; se eliminó el fallback que sumaba equivalencias desde los menús.
- [Changed] La normalización centralizada elimina `unitOfficial`, `freeAdditions`, `smaeTags` y cualquier `value` que solo refleje `items.length`.
- [Docs] Se documentó el nuevo campo `dataOrigin`, los redondeos y la depuración de campos en el contrato del endpoint y el modelo.

## 2025-11-13

- [Updated] `dailyEquivalences` ahora proviene de la propuesta del agente; solo se conserva como fallback el cálculo desde ingredientes.
- [Removed] Campos `freeAdditions`, `menus.value`, `unitOfficial` y `smaeTags` de la respuesta pública.
- [Updated] Equivalencias de cada meal se obtienen únicamente con ingredientes reales (sin usar portionDistribution como respaldo).
- [Updated] Se normalizan los valores numéricos (2 decimales técnicos, 1 decimal en `displayQuantity`) antes de responder.
- [Docs] Se alinearon los modelos y endpoints con el nuevo contrato simplificado.

## 2025-11-12

- [Added] Campo `dailyEquivalences` al objeto de respuesta del DietAgent (cuadro dietosintético diario).
- [Updated] Documentación de endpoints y modelos para reflejar este cambio.

