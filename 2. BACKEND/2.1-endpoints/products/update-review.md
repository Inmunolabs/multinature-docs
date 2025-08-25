# PATCH /products/reviews/:id

## Descripción funcional

Actualiza una reseña existente de un producto. Solo el propietario de la reseña o un administrador pueden modificar la reseña. Permite actualizar tanto la calificación como el comentario de la reseña.

## Autorización

Requiere token Bearer válido. Solo el propietario de la reseña o administradores pueden actualizarla.

## Parámetros de ruta

- `id` (UUID, requerido): ID único de la reseña a actualizar

### Ejemplo

```
PATCH /products/reviews/abc123-e89b-12d3-a456-426614174000
```

## Query parameters

No aplica

## Body del request

```json
{
  "rating": 4,
  "comment": "Producto muy bueno, aunque podría mejorar el sabor"
}
```

### Campos opcionales (actualizar solo los que se deseen cambiar)

- `rating` (number): Nueva calificación del 1 al 5 estrellas
- `comment` (string): Nuevo comentario o reseña del producto

### Validaciones

- `rating`: Debe ser un número entero entre 1 y 5
- `comment`: Debe ser una cadena de texto válida

## Ejemplo de respuesta exitosa (200 OK)

```json
{
  "awsRequestId": "456e7890-e89b-12d3-a456-426614174000",
  "message": "Reseña actualizada exitosamente",
  "data": {}
}
```

## Códigos de estado y errores

| Código | Significado           | Descripción                              |
| ------ | --------------------- | ---------------------------------------- |
| 200    | OK                    | Reseña actualizada exitosamente          |
| 400    | Bad Request           | Datos de la reseña inválidos             |
| 401    | Unauthorized          | Token faltante o inválido                |
| 403    | Forbidden             | Sin permisos para actualizar esta reseña |
| 404    | Not Found             | Reseña no encontrada                     |
| 500    | Internal Server Error | Error del servidor                       |

## Notas útiles para el frontend

- **Propiedad:** Solo mostrar opción de editar para reseñas propias
- **Admin:** Los administradores pueden editar cualquier reseña
- **Validaciones:** Implementar validaciones del lado del cliente
- **Confirmación:** Solicitar confirmación antes de actualizar
- **Feedback:** Mostrar mensaje de éxito o error según la respuesta
- **Estado:** Deshabilitar edición para reseñas no propias
- **Historial:** Considerar mostrar historial de cambios de la reseña
- **Permisos:** Verificar permisos antes de mostrar botón de editar

## Consideraciones técnicas

- **Middleware:** Aplica `productsValidations.updateReview` y `validateReviewOwnershipOrAdmin`
- **Validaciones:** Verifica que la reseña exista y que el usuario tenga permisos
- **Propiedad:** Solo el propietario de la reseña puede editarla
- **Admin:** Los administradores tienen acceso completo a todas las reseñas
- **Base de datos:** Actualiza en `ProductsReviewsQueries.update`
- **Seguridad:** Validación estricta de propiedad de la reseña
- **Auditoría:** Mantener registro de cambios en reseñas
- **Integridad:** Preservar datos originales de la reseña
