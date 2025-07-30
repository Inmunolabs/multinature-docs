# API de Public Resources

Esta documentación cubre todos los endpoints relacionados con la gestión de recursos públicos del sistema.

## Índice de Endpoints

- [GET /public-resources - Listar recursos públicos](./public-resources-list.md)
- [GET / - Healthcheck](./public-resources-healthcheck.md)

---

## Reglas importantes y contexto del proyecto

- Los recursos públicos son archivos, imágenes o documentos accesibles sin autenticación.
- Los recursos públicos pueden ser estáticos o generados dinámicamente.
- Los recursos públicos pueden tener diferentes tipos (imágenes, documentos, videos).
- Los recursos públicos pueden estar organizados por categorías o tags.
- Los recursos públicos pueden tener metadatos asociados.

---

## Consideraciones generales para el frontend

- **Acceso público:** Los recursos no requieren autenticación para acceder.
- **Tipos:** Mostrar diferentes controles según el tipo de recurso.
- **Categorías:** Organizar recursos por categorías para mejor navegación.
- **Búsqueda:** Implementar búsqueda por nombre, tipo o categoría.
- **Filtros:** Permitir filtrar por tipo de archivo, tamaño, fecha.
- **Previsualización:** Mostrar previsualizaciones para imágenes y documentos.
- **Descarga:** Permitir descarga directa de recursos.
- **Metadatos:** Mostrar información adicional como tamaño, fecha de creación. 