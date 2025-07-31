# POST /products

Crea un nuevo producto en el catálogo.

---

## Método, ruta y autorización
- **Método:** POST
- **Ruta:** `/products`
- **Autorización:** Bearer token en headers + password en headers

---

## Explicación funcional
Permite crear un nuevo producto en el catálogo. Requiere autenticación de admin con password específico. El producto puede incluir imágenes, beneficios, estudios y reseñas. Se devuelve la lista completa de productos actualizada.

---

## Headers requeridos
- `Authorization`: Bearer token
- `password`: Contraseña de admin de productos

---

## Body esperado (JSON)
```json
{
  "product": "Producto 4. Prueba Miguel",           // (obligatorio) Nombre del producto
  "urlImages": [                                    // (opcional) Array de URLs de imágenes
    "https://multi-products.s3.amazonaws.com/Complejo+B+Rutina/140e2a31-987a-45be-bceb-3a5b73a1396c.png"
  ],
  "ingredients": "Aceite de Salmon De la corteza: grenetina, agua purificada, glicerina.",  // (obligatorio) Ingredientes
  "otherIngredients": "Other Ingredients",          // (opcional) Otros ingredientes
  "content": "3 con todo",                          // (obligatorio) Contenido del producto
  "price": 299.99,                                  // (obligatorio) Precio del producto
  "stock": 100,                                     // (obligatorio) Stock disponible
  "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",  // (opcional) Descripción
  "benefits": [                                     // (opcional) Array de beneficios
    {
      "title": "Beneficio 1",                       // (obligatorio) Título del beneficio
      "detail": "Detalles del Beneficio 1"          // (obligatorio) Detalles del beneficio
    }
  ],
  "studies": [                                      // (opcional) Array de estudios
    {
      "title": "a2",                                // (obligatorio) Título del estudio
      "pageName": "b2",                             // (obligatorio) Nombre de la página
      "url": "c2"                                   // (obligatorio) URL del estudio
    }
  ]
}
```

---

## Ejemplo de respuesta exitosa (201 Created)
```json
[
  {
    "id": "uuid",
    "product": "Producto 4. Prueba Miguel",
    "specialties": [],
    "urlImage": "https://multi-products.s3.amazonaws.com/Complejo+B+Rutina/140e2a31-987a-45be-bceb-3a5b73a1396c.png",
    "ingredients": "Aceite de Salmon De la corteza: grenetina, agua purificada, glicerina.",
    "content": "3 con todo",
    "price": 299.99,
    "stock": 100
  }
]
```

---

## Errores comunes
| Código | Mensaje                        | Causa                                 |
|--------|--------------------------------|---------------------------------------|
| 400    | Datos inválidos                | Faltan campos obligatorios            |
| 401    | Credenciales inválidas          | Password de admin incorrecto          |
| 403    | No autorizado                  | Token inválido o sin permisos         |
| 500    | Error interno                  | Error inesperado en el servidor       |

---

## Notas útiles para frontend
- **Autenticación:** Requiere password específico de admin de productos.
- **Imágenes:** Las imágenes se almacenan en S3, usar endpoint de presigned URL.
- **Stock:** Validar disponibilidad antes de permitir compra.
- **Precios:** Los precios se manejan como números decimales.
- **Especialidades:** Los productos pueden estar asociados a especialidades médicas.
- **Beneficios:** Mostrar beneficios destacados en la ficha del producto.
- **Estudios:** Los estudios pueden incluir enlaces a investigaciones científicas. 