# 03 Infraestructura

Documentación de infraestructura, scripts, herramientas y automatización del backend de Multinature.

---

## 📑 Secciones

- **[Scripts](./Scripts/README.md)** - Colección completa de scripts de infraestructura

---

## 🔧 Scripts Disponibles

### Scripts de Git
- `build-layers.bat` - Construir todas las layers
- `commitAndPush-git-repos.bat` - Commit y push a múltiples repositorios
- `pull-git-repos.bat` - Actualizar todos los repositorios Git
- `status-git-repos.bat` - Estado de todos los repositorios Git

### Scripts de Despliegue
- `deploy-apis-lambdas.bat` - Desplegar todas las APIs Lambda

### Scripts de Auditoría y Validación
- `docs-audit.js` - Auditoría general de documentación
- `docs-content-audit.js` - Auditoría de contenido
- `docs-privacy-audit.js` - Auditoría de privacidad y seguridad
- `docs-verify-and-index.js` - Verificar e indexar documentación
- `validate-entities-vs-ddl.js` - Validar entities vs DDL
- `sanitize-docs-security.js` - Sanitizar documentación por seguridad

### Scripts de Migración de Documentación
- `migrate-docs-structure.js` - Migrar estructura de documentación
- `validate-docs-links.js` - Validar enlaces en documentación
- `generate-indexes.js` - Generar índices locales
- `fix-broken-links.js` - Corregir enlaces rotos
- `generate-migrations-map.js` - Generar mapa de migraciones

### Scripts de Índices
- `update-docs-index.ts` - Actualizar índices de documentación (TypeScript)
- `update-docs-index.ps1` - Wrapper PowerShell
- `update-docs-index.sh` - Wrapper Bash
- `update-db-models-index.js` - Actualizar índice de modelos de BD
- `docs-normalize-and-index.js` - Normalizar e indexar documentación

### Scripts de Healthcheck
- `healthcheck-runner.js` - Ejecutar healthchecks automáticamente

### Scripts de Base de Datos
- `export-form-templates.js` - Exportar form templates a SQL

---

## 📖 Documentación Completa

Para información detallada sobre cada script, incluyendo uso, opciones, ejemplos y troubleshooting, consulta:

**[📚 Scripts/README.md](./Scripts/README.md)**

---

- **Última actualización:** 2025-11-24
- **Total de scripts:** 25+
