# PATCH /products/:id

## Descripción funcional

Actualiza un producto existente en el catálogo. Este endpoint está restringido solo para administradores y requiere contraseña especial en el header. Permite modificar cualquier campo del producto y retorna la lista completa actualizada de todos los productos.

## Autorización

Requiere token Bearer válido y contraseña de administrador en header `password`. Solo usuarios con credenciales de administrador pueden actualizar productos.

## Parámetros de ruta

- `id` (UUID, requerido): ID único del producto a actualizar

### Ejemplo

```
PATCH /products/789e0123-e89b-12d3-a456-426614174000
```

## Query parameters

No aplica

## Body del request

```json
{
  "product": "Nuevo nombre del producto",
  "specialties": ["nueva-especialidad1", "nueva-especialidad2"],
  "ingredients": "Nueva lista de ingredientes",
  "content": "Nuevo contenido nutricional",
  "price": 999.99,
  "stock": 75,
  "description": "Nueva descripción del producto",
  "benefits": ["nuevo-beneficio1", "nuevo-beneficio2"],
  "studies": ["nuevo-estudio1", "nuevo-estudio2"]
}
```

### Campos opcionales (actualizar solo los que se deseen cambiar)

- `product` (string): Nombre del producto
- `specialties` (array): Array de especialidades/categorías
- `ingredients` (string): Lista de ingredientes
- `content` (string): Información nutricional
- `price` (number): Precio en MXN
- `stock` (number): Cantidad disponible
- `description` (string): Descripción completa
- `benefits` (array): Array de beneficios
- `studies` (array): Array de estudios científicos

## Ejemplo de request

```json
{
  "price": 999.99,
  "stock": 75,
  "description": "Proteína de suero de leche premium con mejorada absorción y sabor"
}
```

## Ejemplo de respuesta exitosa (200 OK)

```json
{
  "awsRequestId": "456e7890-e89b-12d3-a456-426614174000",
  "message": "Producto actualizado exitosamente",
  "data": [
    {
      "id": "789e0123-e89b-12d3-a456-426614174000",
      "product": "Proteína Whey Isolada Premium",
      "specialties": ["deportistas", "musculación", "recuperación"],
      "urlImage": "https://s3.amazonaws.com/products/whey-protein.jpg",
      "ingredients": "Proteína de suero de leche aislada, edulcorantes naturales",
      "content": "30g de proteína por porción",
      "price": 999.99,
      "stock": 75,
      "averageRating": "4.75"
    }
  ]
}
```

## Códigos de estado y errores

| Código | Significado           | Descripción                                           |
| ------ | --------------------- | ----------------------------------------------------- |
| 200    | OK                    | Producto actualizado exitosamente                     |
| 400    | Bad Request           | ID de producto inválido o datos incorrectos           |
| 401    | Unauthorized          | Token faltante o contraseña de administrador inválida |
| 404    | Not Found             | Producto no encontrado                                |
| 500    | Internal Server Error | Error del servidor                                    |

## Notas útiles para el frontend

- **Solo administradores:** Ocultar este endpoint para usuarios regulares
- **Contraseña requerida:** Incluir campo de contraseña en formulario de actualización
- **Actualización parcial:** Solo enviar los campos que se deseen cambiar
- **Respuesta completa:** Retorna lista actualizada de todos los productos
- **Validaciones:** Implementar validaciones del lado del cliente antes de enviar
- **Confirmación:** Solicitar confirmación antes de actualizar productos
- **Historial:** Considerar mantener historial de cambios importantes

## Consideraciones técnicas

- **Middleware:** Aplica `authorize`, `idPathParam`, `passHeader` y `productsValidations.updateProduct`
- **Validaciones:** Verificación de contraseña de administrador con bcrypt
- **Existencia:** Verifica que el producto exista antes de actualizar
- **Base de datos:** Actualiza en `ProductsQueries.update`
- **Respuesta:** Retorna lista completa actualizada usando `getProducts`
- **Seguridad:** Contraseña de administrador almacenada en variables de entorno
- **DTO:** Transformación automática usando `productsToDTO`
- **Parcial:** Permite actualización de campos individuales sin afectar otros
