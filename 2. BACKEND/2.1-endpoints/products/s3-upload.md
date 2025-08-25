# GET /products/s3Upload

## Descripción funcional

Genera una URL pre-firmada de S3 para permitir la subida directa de imágenes de productos desde el frontend. Este endpoint es útil para implementar funcionalidad de drag & drop o selección de archivos para subir imágenes de productos al bucket de S3.

## Autorización

Requiere token Bearer válido. Solo usuarios autorizados pueden generar URLs de subida.

## Parámetros de ruta

No aplica

## Query parameters

- `folder` (string, requerido): Carpeta de destino en S3 donde se guardará la imagen

### Ejemplo

```
GET /products/s3Upload?folder=whey-protein
```

## Headers requeridos

- `filetype` (string, requerido): Tipo MIME del archivo (ej: `image/png`, `image/jpeg`)

### Ejemplo

```
filetype: image/png
```

## Body del request

No aplica

## Ejemplo de respuesta exitosa (201 Created)

```json
{
  "awsRequestId": "456e7890-e89b-12d3-a456-426614174000",
  "message": "URL pre-firmada creada exitosamente",
  "data": {
    "url": "https://products-bucket.s3.amazonaws.com/whey-protein/abc123-def456-ghi789.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=..."
  }
}
```

## Códigos de estado y errores

| Código | Significado           | Descripción                           |
| ------ | --------------------- | ------------------------------------- |
| 201    | Created               | URL pre-firmada generada exitosamente |
| 400    | Bad Request           | Folder o filetype faltante o inválido |
| 401    | Unauthorized          | Token faltante o inválido             |
| 500    | Internal Server Error | Error del servidor                    |

## Notas útiles para el frontend

- **Subida directa:** Usar la URL retornada para subir archivos directamente a S3
- **Tipos de archivo:** Asegurar que el `filetype` sea válido (ej: `image/png`, `image/jpeg`)
- **Carpeta:** Especificar carpeta organizativa para las imágenes
- **Validación:** Verificar tipo y tamaño de archivo antes de subir
- **Feedback:** Mostrar progreso de subida al usuario
- **Nombres únicos:** El sistema genera nombres únicos automáticamente
- **Seguridad:** La URL tiene tiempo de expiración limitado

## Consideraciones técnicas

- **Middleware:** Aplica `authorize` para autenticación
- **Validaciones:** Verifica que `folder` y `filetype` estén presentes
- **Filetype:** Valida formato MIME correcto (ej: `image/png`)
- **UUID:** Genera nombre único para el archivo usando `uuidv4`
- **S3:** Crea URL pre-firmada usando `presignedUrl.create`
- **Bucket:** Usa variable de entorno `PRODUCTS_BUCKET`
- **Expiración:** La URL tiene tiempo de vida limitado para seguridad
- **Formato:** Construye nombre de archivo como `{folder}/{uuid}.{extension}`
