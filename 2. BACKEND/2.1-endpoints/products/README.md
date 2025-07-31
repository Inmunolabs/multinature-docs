# API de Products

Esta documentación cubre todos los endpoints relacionados con la gestión de productos del catálogo.

## Índice de Endpoints

- [GET /products - Listar productos](./products-list.md)
- [GET /products/:id - Obtener producto por ID](./products-get.md)
- [POST /products - Crear producto](./products-create.md)
- [PATCH /products/:id - Actualizar producto](./products-update.md)
- [DELETE /products/:id - Eliminar producto](./products-delete.md)
- [POST /products/presigned-url - URL de subida](./products-presigned-url.md)
- [GET / - Healthcheck](./products-healthcheck.md)

---

## Reglas importantes y contexto del proyecto

- Los productos pueden tener imágenes almacenadas en S3.
- Los productos pueden estar activos o inactivos.
- Los productos pueden tener diferentes categorías y tags.
- Las imágenes se suben mediante URLs presignadas de S3.
- Los productos pueden tener stock limitado o ilimitado.

---

## Consideraciones generales para el frontend

- **Imágenes:** Usar el endpoint de presigned URL para subir imágenes a S3.
- **Categorías:** Los productos pueden pertenecer a múltiples categorías.
- **Stock:** Validar disponibilidad antes de permitir agregar al carrito.
- **Precios:** Los precios pueden variar según configuraciones de descuento.
- **Filtros:** Implementar filtros por categoría, precio, disponibilidad.
- **Búsqueda:** Considerar búsqueda por nombre, descripción y tags.
- **Paginación:** Los listados pueden requerir paginación para grandes catálogos. 