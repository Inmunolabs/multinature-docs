# 04 SQL

Documentación completa de SQL para Multinature, incluyendo estructura de tablas (DDL), queries útiles, migraciones y herramientas de base de datos.

---

## 📑 Secciones

- **[Tables](./tables/README.md)** - Documentación completa de todas las tablas (82+ tablas) con DDL
- **[Queries](./queries/README.md)** - Consultas SQL listas para usar y documentadas
- **[Migrations](./migrations.md)** - Estrategia y guía para migraciones de base de datos

---

## 🗄️ Base de Datos

### Estructura de Tablas

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

Ver [tables/README.md](./tables/README.md) para la lista completa.

---

## 📊 Queries Disponibles

El módulo de queries agrupa consultas SQL listas para usar con documentación completa:

- **Formularios y Templates** - Consultas para gestionar formularios y sus respuestas
- **Auditoría de Datos** - Queries para validar consistencia de datos nutricionales
- **Exportación y Migración** - Scripts para exportar e importar datos específicos
- **Limpieza y Mantenimiento** - Queries para sanitizar y preparar entornos

Ver [queries/README.md](./queries/README.md) para la lista completa de queries disponibles.

---

## 🔧 Herramientas y Validación

### Scripts de Validación

- **[validate-entities-vs-ddl.js](../03_Infraestructura/Scripts/README.md#validate-entities-vs-ddljs)** - Valida que las entities en código estén alineadas con los DDL documentados
- **[update-db-models-index.js](../03_Infraestructura/Scripts/README.md#update-db-models-indexjs)** - Actualiza el índice de modelos de base de datos

### Migraciones

Ver [migrations.md](./migrations.md) para:
- Estrategia de migraciones seguras
- Flujo de desarrollo → producción
- Herramientas y comandos recomendados

---

## 📚 Uso

- **DDL y Estructura:** Consulta [tables/](./tables/) para ver la estructura completa de cada tabla
- **Queries Útiles:** Revisa [queries/](./queries/) para consultas SQL listas para usar
- **Migraciones:** Lee [migrations.md](./migrations.md) antes de hacer cambios en producción

---

- **Última actualización:** 2025-11-24
- **Total de tablas:** 82+
- **Total de queries:** 5+
