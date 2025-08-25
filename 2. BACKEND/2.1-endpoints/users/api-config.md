# GET /api/config

## Descripción funcional

Obtiene la configuración general de la API de usuarios. Proporciona información sobre configuraciones del sistema, constantes y parámetros que pueden ser utilizados por el frontend para configurar la interfaz y validaciones.

## Autorización

Requiere token Bearer válido. Solo usuarios autenticados pueden acceder a la configuración.

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
  "message": "Configuración obtenida exitosamente",
  "data": {
    "networkLevels": ["0", "1", "2", "3"],
    "defaultSettingsId": "5b8b8743-ee39-11ef-bd0a-1290daed9e2f",
    "userProfiles": {
      "user": "Usuario regular",
      "specialist": "Especialista médico",
      "admin": "Administrador del sistema"
    },
    "validationSettings": {
      "emailRequired": true,
      "passwordMinLength": 8,
      "verificationCodeExpiration": 3600
    }
  }
}
```

## Códigos de estado y errores

| Código | Significado           | Descripción                      |
| ------ | --------------------- | -------------------------------- |
| 200    | OK                    | Configuración obtenida exitosamente |
| 401    | Unauthorized          | Token faltante o inválido        |
| 500    | Internal Server Error | Error del servidor               |

## Notas útiles para el frontend

- **Configuración inicial:** Usar para configurar validaciones y parámetros del frontend
- **Niveles de red:** Los niveles disponibles para el sistema de referidos
- **Perfiles de usuario:** Tipos de usuario disponibles en el sistema
- **Validaciones:** Parámetros para validaciones del lado del cliente
- **Configuración dinámica:** Permite actualizar configuraciones sin cambios en el frontend

## Consideraciones técnicas

- **Middleware:** Aplica `authorize` para autenticación
- **Configuración:** Obtiene configuraciones desde `getAPISettings`
- **Constantes:** Incluye constantes del sistema como `NETWORK_LEVELS`
- **Seguridad:** Solo usuarios autenticados pueden acceder
- **Performance:** Configuración cacheable para optimizar rendimiento
