# GET /verify-account

## Descripción funcional

Verifica la cuenta de un usuario usando un código de verificación. Este endpoint permite validar la cuenta de un usuario que previamente solicitó un código de verificación por email. La verificación es necesaria para activar completamente la cuenta y acceder a todas las funcionalidades del sistema.

## Autorización

No requiere token Bearer. Endpoint público para verificación de cuentas.

## Parámetros de ruta

No aplica

## Query parameters

- `email` (string, requerido): Email del usuario a verificar
- `verificationCode` (string, requerido): Código de verificación enviado por email

### Ejemplo
```
GET /verify-account?email=juan.perez@email.com&verificationCode=ABC123
```

## Body del request

No aplica

## Ejemplo de respuesta exitosa (200 OK)

```json
{
  "awsRequestId": "456e7890-e89b-12d3-a456-426614174000",
  "message": "Cuenta validada con éxito.",
  "data": {
    "id": "user123-e89b-12d3-a456-426614174000",
    "email": "juan.perez@email.com",
    "isValid": true,
    "verificationDate": "2024-01-25T15:30:00Z"
  }
}
```

## Códigos de estado y errores

| Código | Significado           | Descripción                      |
| ------ | --------------------- | -------------------------------- |
| 200    | OK                    | Cuenta verificada exitosamente   |
| 200    | OK                    | Cuenta ya validada previamente   |
| 400    | Bad Request           | Código de verificación inválido  |
| 400    | Bad Request           | Email no encontrado              |
| 400    | Bad Request           | Código de verificación expirado  |
| 500    | Internal Server Error | Error del servidor               |

## Notas útiles para el frontend

- **Verificación requerida:** Mostrar mensaje claro sobre la necesidad de verificar la cuenta
- **Códigos temporales:** Informar que los códigos tienen tiempo de expiración
- **Estado de cuenta:** Usar `isValid` para mostrar estado de verificación
- **Redirección:** Después de verificación exitosa, redirigir al login o dashboard
- **Mensajes de error:** Mostrar mensajes específicos para cada tipo de error
- **Reenvío de código:** Proporcionar opción para solicitar nuevo código si expiró

## Consideraciones técnicas

- **Middleware:** Aplica `verificationCode` y `getUserByBodysEmail`
- **Validaciones:** Verifica que el email exista y el código sea válido
- **Expiración:** Los códigos de verificación tienen tiempo límite
- **Base de datos:** Actualiza el campo `isValid` del usuario
- **Seguridad:** No requiere autenticación para permitir verificación inicial
- **Estado:** Cambia el estado de la cuenta de no verificada a verificada
- **Auditoría:** Registra la fecha de verificación
