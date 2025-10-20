# API Products

## Descripción general

La API de Products gestiona el catálogo de productos nutricionales, incluyendo su creación, actualización, eliminación, consulta y sistema de reseñas. Permite a los usuarios ver productos, crear reseñas (solo si han comprado el producto) y a los administradores gestionar el catálogo completo.

## Endpoints disponibles

### Gestión de Productos

- **[GET /products](list.md)** - Listar todos los productos disponibles
- **[GET /products/:id](get-by-id.md)** - Obtener detalles de un producto específico
- **[POST /products](create.md)** - Crear nuevo producto (solo administradores)
- **[PATCH /products/:id](update.md)** - Actualizar producto existente (solo administradores)
- **[DELETE /products/:id](delete.md)** - Eliminar producto (solo administradores)

### Sistema de Reseñas

- **[GET /products/reviews/:id](list-reviews.md)** - Listar reseñas de un producto
- **[POST /products/:id/reviews](create-review.md)** - Crear reseña para un producto
- **[PATCH /products/reviews/:id](update-review.md)** - Actualizar reseña existente

### Utilidades

- **[GET /products/s3Upload](s3-upload.md)** - Generar URL pre-firmada para subir imágenes

## Reglas importantes del proyecto

### Autenticación y Autorización

- **Todos los endpoints** requieren token Bearer válido
- **Crear/Actualizar/Eliminar productos** requiere contraseña de administrador en header `password`
- **Crear reseñas** solo para usuarios que han comprado el producto
- **Actualizar reseñas** solo para propietario de la reseña o administradores

### Validaciones de Negocio

- **Reseñas únicas:** Un usuario solo puede crear una reseña por producto
- **Consumo previo:** Solo usuarios que han comprado el producto pueden reseñarlo
- **Existencia de producto:** Validación automática antes de operaciones
- **Propiedad de reseña:** Usuarios solo pueden editar sus propias reseñas

### Estructura de Respuesta

- **Productos básicos:** Lista con información resumida (nombre, precio, stock, rating)
- **Productos detallados:** Información completa incluyendo imágenes, beneficios, estudios
- **Reseñas:** Sistema de paginación con reseña propia del usuario si existe
- **Ratings:** Promedio calculado y distribución por estrellas

### Consideraciones Técnicas

- **Imágenes:** Almacenamiento en S3 con URLs pre-firmadas para subida
- **Paginación:** Sistema estándar para listados de reseñas
- **DTOs:** Transformación automática de entidades a respuestas frontend-friendly
- **Validaciones:** Middleware personalizado para reglas de negocio específicas

## Notas para el equipo frontend

### Campos clave para UI

- **`userHasPurchased`:** Indica si el usuario puede crear reseñas
- **`averageRating`:** Rating promedio para mostrar estrellas
- **`stock`:** Para mostrar disponibilidad del producto
- **`urlImages`:** Array de imágenes para galería
- **`specialties`:** Array de especialidades para filtros

### Estados de autorización

- **Sin token:** Solo puede ver productos (no reseñas)
- **Con token:** Puede ver reseñas y crear si ha comprado
- **Admin:** Acceso completo a gestión de productos

### Manejo de errores

- **403:** Usuario no puede crear reseña (no ha comprado o ya reseñó)
- **404:** Producto no encontrado
- **401:** Credenciales de administrador inválidas
- **400:** Validaciones de entrada fallidas

### Paginación

- **Reseñas:** 20 por página por defecto
- **Máximo:** 100 por página
- **Metadatos:** Incluye total, página actual y total de páginas
