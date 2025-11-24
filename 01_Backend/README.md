# 01 Backend

Documentación técnica completa del backend de Multinature, incluyendo APIs, base de datos, arquitectura en capas y guías de desarrollo.

---

## 📑 Secciones

- **[APIs](./APIs/README.md)** - Documentación de todas las APIs del backend
- **[Database](./Database/00_INDEX.md)** - DDL, estructura de tablas y modelos de base de datos
- **[Layers](./Layers/README.md)** - Arquitectura en capas y organización del código

---

## 🏗️ Arquitectura

El backend está organizado en **capas (layers)** y **APIs** independientes:

### Layers
- `multi-mysql-layer` - Capa de acceso a datos MySQL
- `multi-auth-layer` - Capa de autenticación y autorización
- Otras layers especializadas

### APIs
Cada API es un servicio Lambda independiente con su propia documentación:
- `users-api` - Gestión de usuarios
- `diets-api` - Gestión de dietas
- `products-api` - Catálogo de productos
- `orders-api` - Gestión de pedidos
- Y 16+ APIs más...

---

## 🗄️ Base de Datos

- **Total de tablas:** 82+
- **Índice completo:** [Database/00_INDEX.md](./Database/00_INDEX.md)
- **DDL de cada tabla:** [Database/Tables/](./Database/Tables/)

---

## 📚 Documentación por API

Cada API incluye:
- Guías de uso y ejemplos
- Documentación completa de endpoints
- Modelos de datos
- Casos de uso comunes

Ver [APIs/README.md](./APIs/README.md) para la lista completa.

---

- **Última actualización:** 2025-11-24
