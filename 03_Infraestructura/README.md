# 03 Infraestructura

Documentación de infraestructura, scripts, herramientas y automatización del backend de Multinature.

---

## 📑 Secciones

- **[Scripts](./Scripts/README.md)** - Colección completa de scripts de infraestructura

---

## 🔧 Scripts Disponibles

### Scripts de Git y Build

- `build-layers.bat` - Construir todas las layers
- `commit-and-push.js` - Commit y push a múltiples repositorios (Node.js, multiplataforma)
- `create-prs.js` - Crear Pull Requests automáticamente (Node.js, multiplataforma)
- `pull-git-repos.bat` - Actualizar todos los repositorios Git
- `status-git-repos.bat` - Estado de todos los repositorios Git

### Scripts de Despliegue

- `deploy-apis-lambdas.bat` - Desplegar todas las APIs Lambda

### Scripts de Validación y Diagnóstico

- `validate-docs-links.js` - Validar enlaces en documentación
- `validate-entities-vs-ddl.js` - Validar entities vs DDL
- `diagnose-pr-errors.ps1` - Diagnosticar errores en Pull Requests
- `test-github-token.ps1` - Verificar token de GitHub

### Scripts de Healthcheck

- `healthcheck-runner.js` - Ejecutar healthchecks automáticamente

### Scripts de Base de Datos

- `export-form-templates.js` - Exportar form templates (Plantillas de Formularios de Pacientes) de SQL
- `export-form-templates-queries.sql` - Queries SQL para exportar form templates directamente en MySQL Workbench

---

## 📖 Documentación Completa

Para información detallada sobre cada script, incluyendo uso, opciones, ejemplos y troubleshooting, consulta:

**[📚 Scripts/README.md](./Scripts/README.md)**

---

- **Última actualización:** 2026-02-11
- **Total de archivos:** 19 (incluye subdirectorios)
- **Total de scripts:** 13
