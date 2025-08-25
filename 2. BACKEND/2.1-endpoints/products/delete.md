# DELETE /products/:id

## Descripción funcional

Elimina un producto específico del catálogo. Este endpoint está restringido solo para administradores y requiere contraseña especial en el header. Después de eliminar el producto, retorna la lista completa actualizada de todos los productos restantes.

## Autorización

Requiere token Bearer válido y contraseña de administrador en header `password`. Solo usuarios con credenciales de administrador pueden eliminar productos.

## Parámetros de ruta

- `id` (UUID, requerido): ID único del producto a eliminar

### Ejemplo

```
DELETE /products/789e0123-e89b-12d3-a456-426614174000
```

## Query parameters

No aplica

## Body del request

No aplica

## Ejemplo de respuesta exitosa (200 OK)

```json
{
  "awsRequestId": "456e7890-e89b-12d3-a456-426614174000",
  "message": "Producto eliminado exitosamente",
  "data": [
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
      "stock": 85,
      "averageRating": "4.85"
    }
  ]
}
```

## Códigos de estado y errores

| Código | Significado           | Descripción                                           |
| ------ | --------------------- | ----------------------------------------------------- |
| 200    | OK                    | Producto eliminado exitosamente                       |
| 400    | Bad Request           | ID de producto inválido                               |
| 401    | Unauthorized          | Token faltante o contraseña de administrador inválida |
| 404    | Not Found             | Producto no encontrado                                |
| 500    | Internal Server Error | Error del servidor                                    |

## Notas útiles para el frontend

- **Solo administradores:** Ocultar este endpoint para usuarios regulares
- **Contraseña requerida:** Incluir campo de contraseña en formulario de eliminación
- **Confirmación crítica:** Solicitar confirmación explícita antes de eliminar
- **Respuesta completa:** Retorna lista actualizada de productos restantes
- **Advertencia:** Mostrar advertencia sobre que la eliminación es permanente
- **Historial:** Considerar mantener registro de productos eliminados
- **Dependencias:** Verificar si el producto tiene reseñas o está en carritos activos

## Consideraciones técnicas

- **Middleware:** Aplica `authorize`, `idPathParam` y `passHeader`
- **Validaciones:** Verificación de contraseña de administrador con bcrypt
- **Existencia:** Verifica que el producto exista antes de eliminar
- **Base de datos:** Elimina de `ProductsQueries.delete`
- **Respuesta:** Retorna lista completa actualizada usando `getProducts`
- **Seguridad:** Contraseña de administrador almacenada en variables de entorno
- **DTO:** Transformación automática usando `productsToDTO`
- **Integridad:** Considerar impacto en reseñas y carritos de compra
- **Auditoría:** Mantener registro de productos eliminados para auditoría
