# POST /products/:id/reviews

## Descripción funcional

Crea una nueva reseña para un producto específico. Solo usuarios que han comprado el producto pueden crear reseñas, y solo se permite una reseña por usuario por producto. El sistema valida automáticamente que el usuario haya consumido el producto antes de permitir la creación.

## Autorización

Requiere token Bearer válido. Solo usuarios que han comprado el producto pueden crear reseñas.

## Parámetros de ruta

- `id` (UUID, requerido): ID único del producto

### Ejemplo

```
POST /products/789e0123-e89b-12d3-a456-426614174000/reviews
```

## Query parameters

No aplica

## Body del request

```json
{
  "rating": 5,
  "comment": "Excelente producto, muy buena calidad y sabor"
}
```

### Campos requeridos

- `rating` (number): Calificación del 1 al 5 estrellas
- `comment` (string): Comentario o reseña del producto

### Validaciones

- `rating`: Debe ser un número entero entre 1 y 5
- `comment`: Debe ser una cadena de texto válida

## Ejemplo de respuesta exitosa (201 Created)

```json
{
  "awsRequestId": "456e7890-e89b-12d3-a456-426614174000",
  "message": "Reseña creada exitosamente",
  "data": {}
}
```

## Códigos de estado y errores

| Código | Significado           | Descripción                                                |
| ------ | --------------------- | ---------------------------------------------------------- |
| 201    | Created               | Reseña creada exitosamente                                 |
| 400    | Bad Request           | Datos de la reseña inválidos                               |
| 401    | Unauthorized          | Token faltante o inválido                                  |
| 403    | Forbidden             | Usuario no puede crear reseña (no ha comprado o ya reseñó) |
| 404    | Not Found             | Producto no encontrado                                     |
| 500    | Internal Server Error | Error del servidor                                         |

## Notas útiles para el frontend

- **Validación previa:** Verificar que el usuario haya comprado el producto
- **Reseña única:** Solo permitir una reseña por usuario por producto
- **Rating:** Implementar selector de estrellas del 1 al 5
- **Comentario:** Campo de texto para reseña detallada
- **Confirmación:** Solicitar confirmación antes de enviar la reseña
- **Feedback:** Mostrar mensaje de éxito o error según la respuesta
- **Redirección:** Después de crear, redirigir a la lista de reseñas
- **Estado:** Deshabilitar botón si el usuario ya reseñó el producto

## Consideraciones técnicas

- **Middleware:** Aplica `productsValidations.createReview`, `validateProductExists`, `validateProductConsumption` y `validateFirstReview`
- **Validaciones:** Verifica que el producto exista y que el usuario lo haya comprado
- **Unicidad:** Previene múltiples reseñas del mismo usuario para el mismo producto
- **Entidad:** Crea entidad ProductReview usando `ProductReview.createEntity`
- **Base de datos:** Inserta en `ProductsReviewsQueries.add`
- **Consumo:** Verifica historial de compras del usuario
- **Seguridad:** Solo usuarios que han consumido el producto pueden reseñar
- **Admin:** Los administradores pueden crear reseñas sin restricciones
