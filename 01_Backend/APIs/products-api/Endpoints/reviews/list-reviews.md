# GET /products/reviews/:id

## Descripción funcional

Lista todas las reseñas de un producto específico con sistema de paginación. Incluye la reseña del usuario autenticado (si existe), todas las reseñas del producto, y estadísticas de ratings. Si el usuario no está autenticado, solo se muestran las reseñas públicas.

## Autorización

Requiere token Bearer válido. Solo usuarios autorizados pueden acceder a las reseñas completas.

## Parámetros de ruta

- `id` (UUID, requerido): ID único del producto

### Ejemplo

```
GET /products/reviews/789e0123-e89b-12d3-a456-426614174000
```

## Query parameters

- `page` (number, opcional): Número de página (default: 1)
- `limit` (number, opcional): Elementos por página (default: 20, máximo: 100)

### Ejemplo

```
GET /products/reviews/789e0123-e89b-12d3-a456-426614174000?page=1&limit=10
```

## Body del request

No aplica

## Ejemplo de respuesta exitosa (200 OK)

```json
{
  "awsRequestId": "456e7890-e89b-12d3-a456-426614174000",
  "message": "Reseñas encontradas",
  "data": {
    "ownReview": {
      "id": "abc123-e89b-12d3-a456-426614174000",
      "productId": "789e0123-e89b-12d3-a456-426614174000",
      "userId": "user456-e89b-12d3-a456-426614174000",
      "rating": 5,
      "comment": "Excelente producto, muy buena calidad",
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    },
    "productReviews": [
      {
        "id": "abc123-e89b-12d3-a456-426614174000",
        "productId": "789e0123-e89b-12d3-a456-426614174000",
        "userId": "user456-e89b-12d3-a456-426614174000",
        "rating": 5,
        "comment": "Excelente producto, muy buena calidad",
        "createdAt": "2024-01-15T10:30:00.000Z",
        "updatedAt": "2024-01-15T10:30:00.000Z"
      },
      {
        "id": "def456-e89b-12d3-a456-426614174000",
        "productId": "789e0123-e89b-12d3-a456-426614174000",
        "userId": "user789-e89b-12d3-a456-426614174000",
        "rating": 4,
        "comment": "Buen producto, cumple lo prometido",
        "createdAt": "2024-01-10T14:20:00.000Z",
        "updatedAt": "2024-01-10T14:20:00.000Z"
      }
    ],
    "totalReviews": {
      "1": 0,
      "2": 0,
      "3": 0,
      "4": 1,
      "5": 1
    }
  },
  "meta": {
    "total": 2,
    "page": 1,
    "totalPages": 1,
    "limit": 20
  }
}
```

## Códigos de estado y errores

| Código | Significado           | Descripción                      |
| ------ | --------------------- | -------------------------------- |
| 200    | OK                    | Reseñas encontradas exitosamente |
| 400    | Bad Request           | ID de producto inválido          |
| 401    | Unauthorized          | Token faltante o inválido        |
| 500    | Internal Server Error | Error del servidor               |

## Notas útiles para el frontend

- **Paginación:** Implementar controles de navegación usando metadatos
- **Reseña propia:** Mostrar `ownReview` de forma destacada si existe
- **Estadísticas:** Usar `totalReviews` para mostrar distribución de ratings
- **Sin reseña:** Si `ownReview` es null, mostrar botón para crear reseña
- **Límites:** Respetar máximo de 100 elementos por página
- **Orden:** Las reseñas se muestran en orden cronológico
- **Usuario:** Mostrar información del usuario que hizo cada reseña

## Consideraciones técnicas

- **Middleware:** Aplica `authorize` para autenticación
- **Paginación:** Sistema estándar con `page` y `limit`
- **Base de datos:** Consultas a `ProductsReviewsQueries`
- **Estadísticas:** Cálculo automático de distribución de ratings
- **Usuario:** Identificación de reseña propia del usuario autenticado
- **DTO:** Transformación usando `totalReviewsDTO`
- **Performance:** Consultas optimizadas con LIMIT y OFFSET
- **Metadatos:** Incluye información completa de paginación
