# Reportes SQL

Este directorio agrupa **definiciones y documentación de reportes** orientados a negocio, operaciones y cumplimiento: consultas pensadas para **exportar, auditar o presentar** datos (no necesariamente las mismas que las utilidades ad hoc en [`../queries/README.md`](../queries/README.md)).

---

## Propósito

- Centralizar reportes **nombrados y versionados** (por archivo o por sección), con contexto de uso y parámetros.
- Separar **reportes** (salida recurrente para equipos o sistemas) de **queries** genéricas de mantenimiento, migración o diagnóstico.
- Mantener referencias cruzadas al DDL en [`../tables/`](../tables/README.md) para que cada columna del reporte sea trazable.

---

## Contenido esperado en cada reporte

Cada documento (o bloque dentro de un mismo archivo) debería incluir, cuando aplique:

- **Objetivo** del reporte y audiencia (finanzas, soporte, producto, etc.).
- **Query SQL** listo para ejecutar (MySQL), con comentarios breves en inglés si se añaden al SQL.
- **Parámetros** configurables (fechas, periodos, IDs, entorno).
- **Fuentes**: tablas y joins principales; enlace a los `.md` de tabla correspondientes.
- **Advertencias** (rendimiento, duplicados, datos sensibles, PII).

---

## Reportes disponibles

| Archivo | Descripción | Uso principal |
| ------- | ----------- | ------------- |
| *(pendiente)* | Añade aquí filas conforme documentes cada reporte en esta carpeta. | — |

**Relacionado en `queries/`:** el informe de comisiones con acreedor, método Cobro y fiscalidad (`tax_type = 'commission'`) está documentado en [`../queries/07_commissions_detail_with_creditor_and_tax.md`](../queries/07_commissions_detail_with_creditor_and_tax.md). Puedes duplicar o mover aquí una variante “oficial de reporte” si el equipo lo define así.

---

## Convenciones sugeridas

- Nombres de archivo: `NN_nombre_descriptivo.md` o `nombre-tema.md`, en minúsculas con guiones si prefieres consistencia con otras carpetas del repo.
- No incluir credenciales ni datos reales; solo placeholders en ejemplos.
- Si un reporte evoluciona, anotar cambios relevantes al final del documento o en el control de versiones del repositorio.

---

- **Última actualización:** 2026-03-28
- **Total de reportes documentados:** 0
