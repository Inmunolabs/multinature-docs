# GET /products

## Descripción funcional

Lista todos los productos disponibles en el catálogo. Retorna información resumida de cada producto incluyendo nombre, precio, stock, rating promedio y especialidades. Este endpoint es público y no requiere autenticación para ver los productos.

## Autorización

No requiere autorización. Endpoint público para visualización de productos.

## Parámetros de ruta

No aplica

## Query parameters

No aplica

## Body del request

No aplica

## Ejemplo de respuesta exitosa (200 OK)

```json
{
  "awsRequestId": "456e7890-e89b-12d3-a456-426614174000",
  "message": "Productos encontrados",
  "data": [
    {
      "id": "789e0123-e89b-12d3-a456-426614174000",
      "product": "Proteína Whey Isolada",
      "specialties": ["deportistas", "musculación"],
      "urlImage": "https://s3.amazonaws.com/products/whey-protein.jpg",
      "ingredients": "Proteína de suero de leche, edulcorantes naturales",
      "content": "30g por porción",
      "price": 899.99,
      "stock": 45,
      "averageRating": "4.75"
    },
    {
      "id": "def456-e89b-12d3-a456-426614174000",
      "product": "Omega 3 Premium",
      "specialties": ["salud cardiovascular", "antiinflamatorio"],
      "urlImage": "https://s3.amazonaws.com/products/omega3.jpg",
      "ingredients": "Aceite de pescado, vitamina E",
      "content": "1000mg por cápsula",
      "price": 599.99,
      "stock": 120,
      "averageRating": "4.60"
    },
    {
      "id": "ghi789-e89b-12d3-a456-426614174000",
      "product": "Multivitamínico Completo",
      "specialties": ["bienestar general", "energía"],
      "urlImage": "https://s3.amazonaws.com/products/multivitamin.jpg",
      "ingredients": "Vitaminas A, C, D, E, B-Complex, minerales",
      "content": "1 tableta por día",
      "price": 399.99,
      "stock": 0,
      "averageRating": "4.85"
    }
  ]
}
```

## Códigos de estado y errores

| Código | Significado           | Descripción                                                              |
| ------ | --------------------- | ------------------------------------------------------------------------ |
| 200    | OK                    | Productos encontrados exitosamente                                       |
| 200    | OK                    | Lista vacía si no hay productos (con mensaje "Productos no encontrados") |
| 500    | Internal Server Error | Error del servidor                                                       |

## Notas útiles para el frontend

- **Catálogo público:** No requiere login para ver productos
- **Imagen principal:** Usar `urlImage` para mostrar imagen destacada del producto
- **Stock:** Mostrar indicador visual cuando `stock` sea 0
- **Rating:** Usar `averageRating` para mostrar estrellas (formato decimal)
- **Especialidades:** Usar `specialties` para filtros y etiquetas
- **Precio:** Formato de moneda mexicana (MXN)
- **Contenido:** Información nutricional por porción
- **Filtros:** Implementar filtros por especialidad, precio, rating y disponibilidad

## Consideraciones técnicas

- **Middleware:** No aplica middleware de autorización
- **Base de datos:** Consulta directa a `ProductsQueries.list`
- **DTO:** Transformación automática usando `productsToDTO`
- **Performance:** Consulta optimizada sin paginación (todos los productos)
- **Cache:** Considerar implementar cache para catálogo estático
- **Imágenes:** URLs de S3 para acceso directo a imágenes
- **Rating:** Cálculo automático del promedio de reseñas
