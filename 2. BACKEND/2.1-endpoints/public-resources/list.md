# GET /public-resources

## Descripción funcional

Lista todos los recursos públicos activos del sistema. Retorna información sobre archivos, documentos, imágenes y otros contenidos que están disponibles para los usuarios autenticados. Los recursos se ordenan por su orden de visualización y solo se muestran aquellos marcados como activos.

## Autorización

Requiere token Bearer válido. Solo usuarios autenticados pueden acceder a los recursos públicos.

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
  "message": "Recurso público encontrado.",
  "data": [
    {
      "id": 1,
      "name": "Términos y Condiciones",
      "extension": "pdf",
      "page": "legal",
      "displayOrder": 1,
      "displayType": "document",
      "url": "https://s3.amazonaws.com/public-resources/terms-conditions.pdf",
      "isActive": true
    },
    {
      "id": 2,
      "name": "Política de Privacidad",
      "extension": "pdf",
      "page": "legal",
      "displayOrder": 2,
      "displayType": "document",
      "url": "https://s3.amazonaws.com/public-resources/privacy-policy.pdf",
      "isActive": true
    },
    {
      "id": 3,
      "name": "Logo Principal",
      "extension": "png",
      "page": "header",
      "displayOrder": 1,
      "displayType": "image",
      "url": "https://s3.amazonaws.com/public-resources/logo-main.png",
      "isActive": true
    },
    {
      "id": 4,
      "name": "Manual de Usuario",
      "extension": "pdf",
      "page": "help",
      "displayOrder": 1,
      "displayType": "document",
      "url": "https://s3.amazonaws.com/public-resources/user-manual.pdf",
      "isActive": true
    },
    {
      "id": 5,
      "name": "Banner Promocional",
      "extension": "jpg",
      "page": "home",
      "displayOrder": 1,
      "displayType": "image",
      "url": "https://s3.amazonaws.com/public-resources/promo-banner.jpg",
      "isActive": true
    }
  ]
}
```

## Códigos de estado y errores

| Código | Significado           | Descripción                                                              |
| ------ | --------------------- | ------------------------------------------------------------------------ |
| 200    | OK                    | Recursos públicos encontrados exitosamente                               |
| 200    | OK                    | Lista vacía si no hay recursos (con mensaje "Recurso público no encontrado") |
| 401    | Unauthorized          | Token faltante o inválido                                                |
| 500    | Internal Server Error | Error del servidor                                                       |

## Notas útiles para el frontend

- **Orden de visualización:** Usar `displayOrder` para ordenar recursos en la interfaz
- **Tipos de contenido:** Usar `displayType` para determinar el componente de visualización
- **Filtrado por página:** Usar `page` para mostrar recursos específicos de cada sección
- **Extensiones de archivo:** Usar `extension` para mostrar iconos apropiados
- **URLs directas:** Usar `url` para acceder o descargar el contenido
- **Estado activo:** Todos los recursos retornados están activos (`isActive: true`)
- **Sin paginación:** Todos los recursos se retornan en una sola respuesta

## Consideraciones técnicas

- **Middleware:** Aplica `authorize` para autenticación
- **Base de datos:** Consulta directa a `PublicResourcesQueries.list`
- **Filtrado:** Solo recursos con `is_active = true`
- **Sin DTO:** Respuesta directa de la base de datos
- **Performance:** Consulta optimizada sin paginación
- **Ordenamiento:** Los recursos se ordenan por `displayOrder` en la base de datos
- **Estructura:** Campos mapeados directamente desde la tabla `public_resources`
