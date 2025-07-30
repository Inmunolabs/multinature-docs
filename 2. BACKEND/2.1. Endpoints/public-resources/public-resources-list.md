# GET /public-resources

Obtiene todos los recursos públicos del sistema.

---

## Método, ruta y autorización
- **Método:** GET
- **Ruta:** `/public-resources`
- **Autorización:** Bearer token en headers

---

## Explicación funcional
Permite obtener todos los recursos públicos del sistema. Estos recursos pueden incluir imágenes, documentos, videos y otros archivos que están disponibles para todos los usuarios sin necesidad de autenticación específica.

---

## Ejemplo de respuesta exitosa (200 OK)
```json
[
  {
    "id": "uuid",
    "name": "Logo Principal",
    "type": "image",
    "url": "https://example.com/images/logo.png",
    "description": "Logo oficial de la plataforma",
    "category": "branding",
    "size": 24576,
    "format": "png",
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-15T10:30:00Z"
  },
  {
    "id": "uuid",
    "name": "Manual de Usuario",
    "type": "document",
    "url": "https://example.com/documents/manual.pdf",
    "description": "Guía completa de uso de la plataforma",
    "category": "documentation",
    "size": 1048576,
    "format": "pdf",
    "createdAt": "2024-01-14T15:45:00Z",
    "updatedAt": "2024-01-14T15:45:00Z"
  },
  {
    "id": "uuid",
    "name": "Video Tutorial",
    "type": "video",
    "url": "https://example.com/videos/tutorial.mp4",
    "description": "Tutorial paso a paso de la plataforma",
    "category": "tutorials",
    "size": 52428800,
    "format": "mp4",
    "createdAt": "2024-01-13T09:20:00Z",
    "updatedAt": "2024-01-13T09:20:00Z"
  }
]
```

---

## Errores comunes
| Código | Mensaje                        | Causa                                 |
|--------|--------------------------------|---------------------------------------|
| 403    | No autorizado                  | Token inválido o sin permisos         |
| 404    | No se encontraron recursos     | No hay recursos públicos disponibles  |
| 500    | Error interno                  | Error inesperado en el servidor       |

---

## Notas útiles para frontend
- **Acceso público:** Los recursos no requieren autenticación específica para acceder.
- **Tipos:** Los recursos pueden ser de diferentes tipos (image, document, video, etc.).
- **Categorías:** Usar categorías para organizar y filtrar recursos.
- **Tamaños:** Mostrar tamaños de archivo para información del usuario.
- **Formatos:** Mostrar formatos de archivo para compatibilidad.
- **URLs:** Las URLs son directas y accesibles públicamente.
- **Metadatos:** Usar descripción y fechas para información adicional.
- **Previsualización:** Mostrar previsualizaciones según el tipo de archivo.
- **Descarga:** Permitir descarga directa de recursos. 