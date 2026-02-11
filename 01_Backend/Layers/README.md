# Layers

Documentación de las capas (layers) del backend de Multinature, incluyendo arquitectura en capas y organización del código.

---

## 📑 Archivos

- **[Sugerencias de enriquecimiento de contexto](./CONTEXT.md)** - Guía para mejorar el contexto de las layers

---

## 🏗️ Arquitectura en Capas

El backend está organizado en capas independientes y reutilizables:

### Layers Principales

- **multi-mysql-layer** - Capa de acceso a datos MySQL
  - Entities y modelos de base de datos
  - Queries y operaciones CRUD
  - Validaciones de datos

- **multi-commons-layer** - Capa de comunes, autenticación y autorización
  - Manejo de tokens JWT
  - Validación de permisos
  - Middleware de autenticación

---

## 📚 Uso

Cada layer es un módulo independiente que puede ser reutilizado por múltiples APIs. Las layers proporcionan abstracciones sobre servicios comunes como acceso a datos y autenticación.

---

- **Última actualización:** 2026-02-11
- **Total de archivos:** 1
