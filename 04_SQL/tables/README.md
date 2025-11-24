# Database

Documentación completa de la base de datos de Multinature, incluyendo estructura de tablas, DDL, migraciones y herramientas de validación.

---

## 📑 Secciones

- **[Lista de Tablas](#-tablas-documentadas)** - Documentación completa de todas las tablas (82 tablas)
- **[Migrations](../migrations.md)** - Estrategia y guía para migraciones de base de datos

---

## 🗄️ Base de Datos

### Estructura

La base de datos de Multinature contiene **82+ tablas** organizadas por dominio:

- **Usuarios y Autenticación** - `users`, `users_specialists`, `verification_codes`
- **Dietas y Nutrición** - `diets`, `menus`, `foods`, `ingredients`, `diet_equivalences_groups`
- **Productos y Pedidos** - `products`, `orders`, `carts`, `recommendations`
- **Citas y Reservas** - `bookings`, `working_hours`, `service_payments`
- **Especialistas** - `specialists`, `specialties`, `subspecialties`, `teamworks`
- **Rutinas y Ejercicios** - `routines`, `exercises`, `workout_plans`
- **Formularios** - `form_templates`, `filled_forms`, `concepts`
- **Notificaciones** - `notifications`
- **Comisiones** - `commissions`, `commission_transactions`
- **Y más...**

### Documentación de Tablas

Cada tabla incluye:
- **DDL completo** - Script CREATE TABLE
- **Estructura de columnas** - Tipos, restricciones y descripciones
- **Relaciones** - Foreign keys y dependencias
- **Índices** - Claves primarias y secundarias

Ver la lista completa de tablas más abajo.

---

## 🔧 Herramientas y Validación

### Scripts de Validación

- **[validate-entities-vs-ddl.js](../../03_Infraestructura/Scripts/README.md#validate-entities-vs-ddljs)** - Valida que las entities en código estén alineadas con los DDL documentados
- **[update-db-models-index.js](../../03_Infraestructura/Scripts/README.md#update-db-models-indexjs)** - Actualiza el índice de modelos de base de datos

### Migraciones

Ver [migrations.md](../migrations.md) para:
- Estrategia de migraciones seguras
- Flujo de desarrollo → producción
- Herramientas y comandos recomendados

---

## 📚 Recursos Adicionales

- **[Índice Principal](../README.md)** - Índice completo de SQL (tablas, queries, migraciones)
- **[Queries SQL](../queries/README.md)** - Consultas SQL útiles y documentadas

---

- **Última actualización:** 2025-11-24
- **Total de tablas:** 82+

