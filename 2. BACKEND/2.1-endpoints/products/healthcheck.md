# GET /

## Descripción funcional

Endpoint de verificación de estado de la API de productos. Proporciona información básica sobre el servicio y confirma que está funcionando correctamente.

## Autorización

No requiere autorización. Endpoint público para verificación de estado.

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
  "message": "OK",
  "data": "Created with ❤ by inmunolabs"
}
```

## Códigos de estado y errores

| Código | Significado | Descripción                   |
| ------ | ----------- | ----------------------------- |
| 200    | OK          | API funcionando correctamente |

## Notas útiles para el frontend

- **Monitoreo:** Usar para verificar que la API esté disponible antes de hacer requests
- **Health check:** Ideal para implementar en pantallas de carga o verificación de conectividad
- **Sin autenticación:** No requiere token ni credenciales
- **Respuesta simple:** Mensaje fijo que confirma el estado del servicio

## Consideraciones técnicas

- **Middleware:** No aplica middleware de autorización
- **Respuesta:** Mensaje estático de confirmación de funcionamiento
- **AWS:** Incluye `awsRequestId` para trazabilidad en logs
- **Performance:** Endpoint optimizado para respuesta rápida
