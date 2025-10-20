# POST /products

## Descripción funcional

Crea un nuevo producto en el catálogo. Este endpoint está restringido solo para administradores y requiere contraseña especial en el header. Después de crear el producto, retorna la lista completa actualizada de todos los productos.

## Autorización

Requiere token Bearer válido y contraseña de administrador en header `password`. Solo usuarios con credenciales de administrador pueden crear productos.

## Parámetros de ruta

No aplica

## Query parameters

No aplica

## Body del request

```json
{
  "product": "Nombre del producto",
  "specialties": ["especialidad1", "especialidad2"],
  "ingredients": "Lista de ingredientes del producto",
  "content": "Contenido nutricional por porción",
  "price": 899.99,
  "stock": 100,
  "description": "Descripción detallada del producto",
  "benefits": ["beneficio1", "beneficio2"],
  "studies": ["estudio1", "estudio2"]
}
```

### Campos requeridos

- `product` (string): Nombre del producto
- `price` (number): Precio en MXN
- `stock` (number): Cantidad disponible

### Campos opcionales

- `specialties` (array): Array de especialidades/categorías
- `ingredients` (string): Lista de ingredientes
- `content` (string): Información nutricional
- `description` (string): Descripción completa
- `benefits` (array): Array de beneficios
- `studies` (array): Array de estudios científicos

## Ejemplo de request

```json
{
  "product": "Proteína Whey Isolada Premium",
  "specialties": ["deportistas", "musculación", "recuperación"],
  "ingredients": "Proteína de suero de leche aislada, edulcorantes naturales",
  "content": "30g de proteína por porción",
  "price": 899.99,
  "stock": 50,
  "description": "Proteína de alta calidad para deportistas",
  "benefits": ["Recuperación muscular", "Ganancia de masa magra"],
  "studies": ["Estudio clínico sobre recuperación muscular"]
}
```

## Ejemplo de respuesta exitosa (201 Created)

```json
{
  "awsRequestId": "456e7890-e89b-12d3-a456-426614174000",
  "message": "Producto creado exitosamente",
  "data": [
    {
      "id": "789e0123-e89b-12d3-a456-426614174000",
      "product": "Proteína Whey Isolada Premium",
      "specialties": ["deportistas", "musculación", "recuperación"],
      "urlImage": "",
      "ingredients": "Proteína de suero de leche aislada, edulcorantes naturales",
      "content": "30g de proteína por porción",
      "price": 899.99,
      "stock": 50,
      "averageRating": "0.00"
    }
  ]
}
```

## Códigos de estado y errores

| Código | Significado           | Descripción                                           |
| ------ | --------------------- | ----------------------------------------------------- |
| 201    | Created               | Producto creado exitosamente                          |
| 400    | Bad Request           | Datos del producto inválidos                          |
| 401    | Unauthorized          | Token faltante o contraseña de administrador inválida |
| 500    | Internal Server Error | Error del servidor                                    |

## Notas útiles para el frontend

- **Solo administradores:** Ocultar este endpoint para usuarios regulares
- **Contraseña requerida:** Incluir campo de contraseña en formulario de creación
- **Validaciones:** Implementar validaciones del lado del cliente antes de enviar
- **Respuesta completa:** Retorna lista actualizada de todos los productos
- **Imágenes:** Las imágenes se gestionan por separado con el endpoint de S3
- **Campos obligatorios:** Marcar claramente los campos requeridos
- **Formato de precio:** Asegurar que el precio sea un número válido

## Consideraciones técnicas

- **Middleware:** Aplica `authorize`, `passHeader` y `productsValidations.createProduct`
- **Validaciones:** Verificación de contraseña de administrador con bcrypt
- **Entidad:** Crea entidad Product usando `Products.createEntity`
- **Base de datos:** Inserta en `ProductsQueries.add`
- **Respuesta:** Retorna lista completa actualizada usando `getProducts`
- **Seguridad:** Contraseña de administrador almacenada en variables de entorno
- **DTO:** Transformación automática usando `productsToDTO`
