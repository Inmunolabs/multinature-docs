# Índice de Logs Históricos

Referencia a logs y reportes importantes almacenados en `backend/logs/`.

**Nota:** Los archivos .log no se mueven a docs/ para evitar duplicación. Se mantienen en `backend/logs/` y se referencian aquí.

---

## 📊 Logs de Auditoría (Raíz del Proyecto)

Ubicación: `backend/`

### Reportes JSON de Auditoría

| Archivo | Descripción | Fecha |
|---------|-------------|-------|
| `docs-audit-report.json` | Validación de estructura y sincronización DB | 2025-10-20 |
| `docs-content-audit-report.json` | Análisis de completitud y TODOs | 2025-10-20 |
| `docs-privacy-audit-report.json` | Escaneo de seguridad (JWT, emails, etc.) | 2025-10-20 |
| `docs-index-report.json` | Reporte de índices generados | 2025-10-20 |

**Contenido:**
- Métricas de calidad de documentación
- Problemas detectados por severidad
- Estadísticas de completitud

---

## 🔄 Logs de Migración

Ubicación: `backend/logs/`

### Migración de Estructura

| Archivo | Descripción | Fecha |
|---------|-------------|-------|
| `migration-2025-10-20T*.log` | Log detallado de migración de 336 archivos | 2025-10-20 |
| `rollback-2025-10-20T*.sh` | Script de rollback (bash) | 2025-10-20 |

**Contenido:**
- Cada movimiento de archivo
- Errores y advertencias
- Timestamp de cada operación
- Comando para deshacer (rollback)

### Enlaces Rotos

| Archivo | Descripción | Fecha |
|---------|-------------|-------|
| `broken-links-2025-10-20T*.json` | Reporte de 185 enlaces rotos post-migración | 2025-10-20 |
| `fix-links-plan-2025-10-20.json` | Plan de reparación (100 automáticos, 85 manuales) | 2025-10-20 |
| `fix-links-summary-2025-10-20.md` | Resumen legible del plan | 2025-10-20 |

**Contenido:**
- Archivo y línea de cada enlace roto
- Sugerencias de corrección
- Nivel de confianza (high/medium/low)

### Barrido de Archivos

| Archivo | Descripción | Fecha |
|---------|-------------|-------|
| `sweep-plan-2025-10-20.json` | Plan de 45 archivos .md fuera de docs/ | 2025-10-20 |
| `sweep-summary-2025-10-20.md` | Resumen de barrido | 2025-10-20 |

**Contenido:**
- Archivos en `.cursor/`, `logs/`, `scripts/`
- Destinos propuestos
- Clasificación por categoría

---

## 📁 Backups

Ubicación: `backend/docs_backup_*/`

### Backup de Migración

| Directorio | Descripción | Fecha |
|------------|-------------|-------|
| `docs_backup_2025-10-20T*` | Backup completo pre-migración (336 archivos) | 2025-10-20 |

**Retención:** 90 días, luego archivar o eliminar.

---

## 🔍 Cómo Usar Este Índice

### Para Consultar un Log:

```bash
# Ver log de migración
type backend\logs\migration-2025-10-20T*.log | more

# Ver enlaces rotos
type backend\logs\fix-links-summary-2025-10-20.md
```

### Para Restaurar desde Backup:

```bash
# Si necesitas revertir la migración
rmdir /s /q docs
xcopy docs_backup_2025-10-20T* docs /E /I
```

### Para Ejecutar Rollback:

```bash
# En Git Bash o WSL
bash backend/logs/rollback-2025-10-20T*.sh
```

---

## 📈 Historial de Cambios

| Fecha | Actividad | Logs Generados |
|-------|-----------|----------------|
| 2025-10-20 | Auditoría inicial | 3 reportes JSON |
| 2025-10-20 | Migración v2 (336 archivos) | migration-*.log, rollback-*.sh |
| 2025-10-20 | Validación de enlaces | broken-links-*.json |
| 2025-10-20 | Plan de reparación | fix-links-plan-*.json |
| 2025-10-20 | Barrido de backend/ | sweep-plan-*.json |

---

## 🎯 Próximas Auditorías

**Frecuencia recomendada:**
- **Mensual:** Ejecutar scripts de auditoría
- **Post-cambio:** Validar enlaces con `validate-docs-links.js`
- **Trimestral:** Revisión manual completa

**Próxima auditoría programada:** 2025-11-20

---

## 📞 Contacto

**Responsables de logs:**
- Auditorías: Tech Lead / QA
- Migraciones: DevOps
- Seguridad: DevSecOps

**Para más información:**
- Ver: `.cursor/reports/INDEX.md`
- Scripts: `scripts/migration/README.md`

---

**Última actualización:** 2025-10-20  
**Mantenido por:** Backend Team

