# 01_Operación

## Propósito
Backlog maestro y ejecución diaria. Aquí vive todo el trabajo normal: features, bugs no críticos y tech-debt. Debe ser visible, priorizable y accionable.

## Quién usa
- Leads (BE + FE) — gobernanza y priorización.
- Devs (DRI) — ejecución y cierre.
- QA — define casos y crea validaciones si aplica.
- Product / Soporte — crear items.

## Estados (orden)
1. BACKLOG  (tareas sin prioridad)
2. OPEN      (tareas base)
3. EN_CURSO    (Tareas WIP)
4. IN_REVIEW    (Tareas en PR)
5. TO_DEPLOY    (Tareas Merged en dev)
6. IN_PROD_VALIDATION (pr a prod o testing)
7. in_PROD (en prod)
8. CANCELED
9. BLOCKED (deja un comentario sobre lo que te bloquea)

## Flujo operativo (regla breve)
- Crear → BACKLOG si no se tiene prioridad espesificada.
- Si cumple **DoR mínima** → pasar a OPEN.
- DRI toma → EN_CURSO (2 ticket por persona).
- PR abierto → IN_REVIEW.
- PR aprobado/merge → TO_DEPLOY / MERGED → deploy → IN_PROD_VALIDATION.
- QA valida → DONE.

## DoR mínima (obligatoria antes de EN_CURSO)
- Objetivo (1 línea)
- 1–2 Criterios de aceptación verificables
- QA cases: happy + 1 edge
- DRI asignado (assignee) (SOLO PUEDE HABER 1 POR TAREA)
- Estimación o slice (<=2h / >2h)  (opcional)
- Area/module/nature (tags)
- Dependencias (si aplica)
- Pistas de implementación (si aplica)

## DoD (para cerrar)
- Criterios de aceptación cumplidos
- PR mergeado (o release aplicado)
- Evidencia adjunta (screens/logs/steps)
- QA validó en prod (IN_PROD_VALIDATION)
- No errores relevantes en logs
- Notas de release si aplica
- Tests añadidos o justificación

## Quick fixes
- Condición: ≤2h, sin dependencias, sin impacto en prod.  
- Proceso: DRI toma → EN_CURSO → commit → cerrar con evidencia.  
- Si QA detecta regresión → nuevo bug formal en BACKLOG.

## Backlog hygiene
- Leads revisan BACKLOG 1 vez/semana (10–15 min): asignar/archivar/convertir.  
- Política de stale: 14d sin actividad → tag `stale` + notificación; 28d → archivar o decidir.

## Tags
- Tags:
        area:
            front|back|qa
        module:
            adresses
            bookings
            cart
            commissions
            constants
            diets
            forms
            monthly-purchases
            notifications
            orders
            payments
        nature:
            feature|bug|tech-debt.

## WIP y SLAs
- EN_CURSO: 1 por persona.  
- IN_REVIEW: máx. 3 equipo. SLA: <24h.  
- IN_PROD_VALIDATION: 1–2 simultáneos.

## Automatizaciones sugeridas
- PR Link agregado → mover a IN_REVIEW + notificar reviewers.  
- IN_REVIEW >24h → notificar reviewer(s)/lead.  
- BACKLOG last_updated ≥14d → tag `stale` + notificar lead.  
- BACKLOG last_updated ≥28d & `stale` → mover a `Cold/Archive` o notificar para cerrar.

## Tableros y vistas recomendadas
- Backlog — Todas (Status = BACKLOG)  
- Backlog — Sin assignee  
- Backlog — Stale  
- Board Kanban por estados  
- Board por module (opcional)

## Reglas prácticas y ejemplos
- Título claro: `[BE][module:foods] Implementar GET /foods (paginado)`  
- Al mover a EN_CURSO: DRI debe actualizar estimate y abrir branch/PR.  
- Si bloqueado >24h → comentar causa y notificar leads.

