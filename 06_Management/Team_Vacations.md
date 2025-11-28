# Vacaciones y Permisos del Equipo – Multinature

Este documento describe **cómo se gestionan y documentan** las vacaciones y permisos del equipo.  
La **fuente de verdad operativa** es el calendario compartido de Google Calendar.

---

## 1. Calendario oficial

- **Calendario:** [`Multinature – Vacaciones y Permisos`](https://calendar.google.com/calendar/u/0/r/settings/calendar/OWFlZDczZDYxYzk2MzI5MmFlMDRjMjJhOTYxY2QyYzg4M2ZmZjZlZmVmNDJkZTFkOGMxMDQ3ODAyMzlmMDkxOEBncm91cC5jYWxlbmRhci5nb29nbGUuY29t)
- **Ubicación:** Cuenta de Google Workspace de Multinature.

### Convenciones de eventos (etiquetas estándar)

Usamos etiquetas claras en español:

- **[VAC]** – Vacaciones
- **[MED]** – Permiso médico
- **[PER]** – Permiso personal
- **[AUS]** – Ausencia general

Ejemplos:

- `[VAC] Diego – Viaje familiar`
- `[MED] Samuel – Consulta cardiológica`
- `[PER] Erick – Trámite personal (mediodía)`
- `[AUS] Cristopher – Asunto personal`

### Reglas de uso

- Toda ausencia mayor a **4 horas** debe registrarse en el calendario.
- Toda ausencia de **día completo** es obligatoria en este calendario.
- René es responsable de que el calendario se mantenga actualizado.

---

## 2. Flujo para solicitar vacaciones o permisos

1. El integrante del equipo notifica a René su solicitud.
2. René valida fechas, impacto en sprint y confirma con Miguel/Andrés si es necesario.
3. René registra o actualiza el evento en el calendario oficial.
4. Si afecta un sprint, René ajusta el sprint backlog en ClickUp.

---

## 3. Tabla resumen (próximos 90 días)

> Esta tabla es un **resumen informativo**.  
> La fuente de verdad es siempre el Google Calendar.
> Se actualiza de forma ligera cuando se hagan cambios relevantes.

| Integrante | Rango de fechas (yyyy-mm-dd) | Tipo       | Estado     | Tiempo hábil | Comentarios                                                                             |
| ---------- | ---------------------------- | ---------- | ---------- | ------------ | --------------------------------------------------------------------------------------- |
| Diego      | 2025-12-19 – 2026-01-04      | Vacaciones | Confirmado | 9 días       | Regresa el lunes 05 de enero (Comentarios de ejemplo: Cubre backlog antes de salir)     |
| Samuel     | 2026-01-07 – 2026-02-09      | Vacaciones | Confirmado | 24 días      | Regresa el martes 10 de febrero (Comentarios de ejemplo: Ajustar revisiones de backend) |
| Erick      | 2025-12-19 – 2026-01-04      | Vacaciones | Confirmado | 9 días       | Regresa el lunes 05 de enero                                                            |
| Cristopher | -                            | -          | -          | -            | -                                                                                       |
| Antoine    | -                            | -          | -          | -            | -                                                                                       |
| Miguel     | 2025-12-19                   | Vacaciones | 😬         | 1 día        | -                                                                                       |
| Miguel     | 2025-12-29 - 2026-12-31      | Vacaciones | 😬         | 3 días       | -                                                                                       |
| Miguel     | 2026-06-12 - 2026-06-17      | Vacaciones | 😬         | 4 días       | Regresa el jueves 18 de junio                                                           |
| Leo        | -                            | -          | -          | -            | -                                                                                       |
| Pandalatec | -                            | -          | N/A        | -            | Se maneja por contrato                                                                  |

_(René actualizará esta tabla conforme haya solicitudes confirmadas.)_

---

## 4. Notas para planificación de sprints (René)

- Revisar el calendario oficial antes de cerrar un sprint.
- Ajustar capacidad según las ausencias confirmadas.
- Cuando un integrante esté fuera:
  - Asegurar que haya **mínimo un reemplazo** en backend y frontend.
  - Confirmar quién toma dudas de IA / DietAgent si Miguel está fuera (normalmente Samuel).
- Notificar al equipo cualquier cambio mayor.

---

## 5. Futuras mejoras del sistema // TODOs

- Usar la API de Google Calendar para generar automáticamente esta tabla en `.md`.
- Asociar ausencias con capacidad del sprint en ClickUp.
- Automatizar alertas semanales en Discord/Slack con próximos permisos.

---

**Fuente de verdad:** `Multinature – Vacaciones y Permisos (Google Calendar)`  
**Documento de referencia:** `Team_Vacations.md`
