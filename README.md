# 📚 Documentación Multinature

Documentación completa de Multinature, incluyendo APIs, base de datos, infraestructura, reglas de negocio y guías de desarrollo.

---

## 📑 Secciones Principales

- **[00 Overview](./00_Overview/README.md)** - Visión general, reglas de negocio y estructura del proyecto
- **[01 Backend](./01_Backend/README.md)** - Documentación técnica del backend (APIs, Database, Layers)
- **[02 Frontend](./02_Frontend/README.md)** - Documentación del frontend
- **[03 Infraestructura](./03_Infraestructura/README.md)** - Scripts, herramientas y configuración de infraestructura
- **[04 SQL](./04_SQL/README.md)** - DDL de tablas, queries documentados, reportes SQL y migraciones
- **[05 Negocio](./05_Negocio/README.md)** - Decisiones de negocio, pendientes y recursos
- **[06 Management](./06_Management/README.md)** - Gestión del proyecto, épicas, roadmap, equipo y minutas
- **[PM](./PM/)** - Plantillas de ClickUp y políticas operativas
- **[99 Privado](./99_Privado/README.md)** - Documentación privada (testing)
- **[CHANGELOG](./CHANGELOG.md)** - Registro de cambios

---

## 🚀 Inicio Rápido

### Para Nuevos Desarrolladores

1. **[AGENTS.md](./00_Overview/AGENTS_GUIDE.md)** - Guía completa para trabajar con el monorepo
2. **[Estructura del Proyecto](./00_Overview/PROJECT_STRUCTURE.md)** - Entiende la organización del código
3. **[SQL y Base de Datos](./04_SQL/README.md)** - Tablas (DDL), queries, carpeta de reportes y migraciones
4. **[Scripts](./03_Infraestructura/Scripts/README.md)** - Aprende a usar las herramientas de infraestructura
5. **[Auditoría de comisiones](./03_Infraestructura/Scripts/commission-audit/README.md)** - Validar consumos y comisiones contra la spec de negocio

### Por Rol

**Backend Developer:**

- [APIs](./01_Backend/APIs/README.md) - Documentación de todas las APIs
- [SQL](./04_SQL/README.md) - DDL, queries, [reportes](./04_SQL/reportes/README.md) y migraciones
- [Layers](./01_Backend/Layers/README.md) - Arquitectura en capas

**DevOps/SRE:**

- [Scripts de Infraestructura](./03_Infraestructura/Scripts/README.md) - Herramientas de automatización
- [Healthchecks](./03_Infraestructura/Scripts/healthcheck-runner.md) - Monitoreo de APIs

**Product Owner/Business:**

- [Reglas de Negocio](./00_Overview/Business_Rules/README.md) - Lógica de negocio
- [Pedidos / PATCH estatus](./00_Overview/Business_Rules/orders/patch-order-status.md) - Transiciones, logística vs admin, cancelación vs flujo ideal
- [Citas y pagos (bookings-api)](./00_Overview/Business_Rules/citas/README.md) - Agendamiento, pagos por cita y variable **PAYMENTS_ENABLED**
- [Decisiones de Negocio](./05_Negocio/decision-records.md) - Registro de decisiones

---

## 🔧 Herramientas y Scripts

### Scripts de Infraestructura

Todos los scripts están documentados en: **[Scripts/README.md](./03_Infraestructura/Scripts/README.md)**

**Scripts principales:**

- `clone-workspace-repos.js` - Clonar repos del workspace (onboarding)
- `validate-entities-vs-ddl.js` - Validar alineación código vs DDL
- `validate-docs-links.js` - Validar enlaces en documentación
- `healthcheck-runner.js` - Ejecutar healthchecks de todas las APIs
- `export-form-templates.js` - Exportar templates de formularios a SQL
- [Auditoría de comisiones](./03_Infraestructura/Scripts/commission-audit/README.md) - `commission-audit` / `auditoria_comisiones_diaria.js`

---

## 📊 Estadísticas

- **Total de APIs documentadas:** 18+
- **Total de tablas en BD:** 82+
- **Scripts de infraestructura:** 15+

---

- **Última actualización:** 2026-04-13
- **Total de archivos:** ~440 (incluye subdirectorios)
- **Mantenedor:** Miguel Valdés
