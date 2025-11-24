# 📚 Documentación Multinature

Documentación completa de Multinature, incluyendo APIs, base de datos, infraestructura, reglas de negocio y guías de desarrollo.

---

## 📑 Secciones Principales

- **[00 Overview](./00_Overview/README.md)** - Visión general, reglas de negocio y estructura del proyecto
- **[01 Backend](./01_Backend/README.md)** - Documentación técnica del backend (APIs, Database, Layers)
- **[02 Frontend](./02_Frontend/README.md)** - Documentación del frontend
- **[03 Infraestructura](./03_Infraestructura/README.md)** - Scripts, herramientas y configuración de infraestructura
- **[04 SQL](./04_SQL/README.md)** - Queries SQL y documentación de base de datos
- **[05 Negocio](./05_Negocio/README.md)** - Tareas, pendientes y documentación de negocio
- **[99 Privado](./99_Privado/README.md)** - Documentación privada (testing)

---

## 🚀 Inicio Rápido

### Para Nuevos Desarrolladores

1. **[AGENTS.md](./00_Overview/AGENTS_GUIDE.md)** - Guía completa para trabajar con el monorepo
2. **[Estructura del Proyecto](./00_Overview/PROJECT_STRUCTURE.md)** - Entiende la organización del código
3. **[SQL y Base de Datos](./04_SQL/README.md)** - Conoce las 82+ tablas de la base de datos
4. **[Scripts](./03_Infraestructura/Scripts/README.md)** - Aprende a usar las herramientas de infraestructura

### Por Rol

**Backend Developer:**
- [APIs](./01_Backend/APIs/README.md) - Documentación de todas las APIs
- [SQL](./04_SQL/README.md) - DDL, queries y migraciones de base de datos
- [Layers](./01_Backend/Layers/README.md) - Arquitectura en capas

**DevOps/SRE:**
- [Scripts de Infraestructura](./03_Infraestructura/Scripts/README.md) - Herramientas de automatización
- [Healthchecks](./03_Infraestructura/Scripts/healthcheck-runner.md) - Monitoreo de APIs

**Product Owner/Business:**
- [Reglas de Negocio](./00_Overview/Business_Rules/README.md) - Lógica de negocio
- [Tareas](./05_Negocio/Tareas/README.md) - Gestión de tareas y features

---

## 🔧 Herramientas y Scripts

### Scripts de Infraestructura

Todos los scripts están documentados en: **[Scripts/README.md](./03_Infraestructura/Scripts/README.md)**

**Scripts principales:**
- `validate-entities-vs-ddl.js` - Validar alineación código vs DDL
- `validate-docs-links.js` - Validar enlaces en documentación
- `healthcheck-runner.js` - Ejecutar healthchecks de todas las APIs
- `export-form-templates.js` - Exportar templates de formularios a SQL

---

## 📊 Estadísticas

- **Total de APIs documentadas:** 20+
- **Total de tablas en BD:** 82+
- **Scripts de infraestructura:** 9

---

- **Última actualización:** 2025-11-24
- **Mantenedor:** Miguel Valdés
