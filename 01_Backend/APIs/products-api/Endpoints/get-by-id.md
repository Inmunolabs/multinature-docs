# GET /products/:id

## Descripción funcional

Obtiene los detalles completos de un producto específico por su ID. Retorna información detallada incluyendo todas las imágenes, beneficios, estudios, descripción completa y si el usuario autenticado ha comprado el producto (para determinar si puede crear reseñas).

## Autorización

Requiere token Bearer válido. Solo usuarios autorizados pueden acceder a los detalles completos del producto.

## Parámetros de ruta

- `id` (UUID, requerido): ID único del producto

### Ejemplo

```
GET /products/789e0123-e89b-12d3-a456-426614174000
```

## Query parameters

No aplica

## Body del request

No aplica

## Ejemplo de respuesta exitosa (200 OK)

```json
{
  "awsRequestId": "456e7890-e89b-12d3-a456-426614174000",
  "message": "Producto encontrado",
  "data": {
    "id": "789e0123-e89b-12d3-a456-426614174000",
    "product": "Proteína Whey Isolada Premium",
    "specialties": ["deportistas", "musculación", "recuperación muscular"],
    "urlImages": [
      "https://s3.amazonaws.com/products/whey-protein-front.jpg",
      "https://s3.amazonaws.com/products/whey-protein-back.jpg",
      "https://s3.amazonaws.com/products/whey-protein-nutrition.jpg"
    ],
    "ingredients": "Proteína de suero de leche aislada, edulcorantes naturales (stevia), saborizantes naturales, antiaglomerantes",
    "content": "30g de proteína por porción (1 scoop)",
    "price": 899.99,
    "stock": 45,
    "description": "Proteína de suero de leche de alta calidad, ideal para deportistas que buscan maximizar su recuperación muscular y ganancia de masa magra.",
    "benefits": [
      "Recuperación muscular acelerada",
      "Aumento de masa magra",
      "Alto valor biológico",
      "Baja en lactosa",
      "Fácil digestión"
    ],
    "studies": [
      "Estudio clínico sobre recuperación muscular post-ejercicio",
      "Investigación sobre absorción de proteínas en atletas",
      "Meta-análisis de suplementación proteica en deportistas"
    ],
    "averageRating": "4.75",
    "userHasPurchased": true
  }
}
```

## Códigos de estado y errores

| Código | Significado           | Descripción                      |
| ------ | --------------------- | -------------------------------- |
| 200    | OK                    | Producto encontrado exitosamente |
| 400    | Bad Request           | ID de producto inválido          |
| 401    | Unauthorized          | Token faltante o inválido        |
| 404    | Not Found             | Producto no encontrado           |
| 500    | Internal Server Error | Error del servidor               |

## Notas útiles para el frontend

- **Detalles completos:** Usar para pantallas de producto individual
- **Galería de imágenes:** `urlImages` es un array para carrusel/galería
- **Beneficios:** Lista para mostrar ventajas del producto
- **Estudios:** Información científica para credibilidad
- **Consumo previo:** `userHasPurchased` determina si mostrar botón de reseña
- **Stock:** Mostrar disponibilidad y botón de compra
- **Especialidades:** Usar para etiquetas y filtros relacionados
- **Descripción:** Texto completo para sección de detalles

## Consideraciones técnicas

- **Middleware:** Aplica `authorize`, `idPathParam` y `validateProductExists`
- **Validaciones:** Verifica que el producto exista antes de retornar datos
- **DTO:** Usa `productToDetailsDTO` para información completa
- **Consumo:** Verifica si el usuario ha comprado el producto para `userHasPurchased`
- **Base de datos:** Consulta a `ProductsQueries.getById`
- **Imágenes:** Array completo de URLs de S3 para galería
- **Performance:** Consulta optimizada con validación de existencia
