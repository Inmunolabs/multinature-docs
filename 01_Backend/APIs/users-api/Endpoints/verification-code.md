# POST /verification-code

## Descripción funcional

Genera y envía un código de verificación por email para un usuario registrado. Este endpoint es útil cuando un usuario necesita verificar su cuenta o solicitar un nuevo código de verificación. El código tiene tiempo de expiración y se envía automáticamente por email.

## Autorización

No requiere token Bearer. Endpoint público para solicitar códigos de verificación.

## Parámetros de ruta

No aplica

## Query parameters

No aplica

## Body del request

```json
{
  "email": "juan.perez@email.com"
}
```

### Campos requeridos
- `email` (string): Email del usuario registrado

### Validaciones
- `email`: Debe ser un email válido registrado en el sistema

## Ejemplo de respuesta exitosa (200 OK)

```json
{
  "awsRequestId": "456e7890-e89b-12d3-a456-426614174000",
  "message": "Código de verificación de cuenta enviado.",
  "data": {
    "email": "juan.perez@email.com",
    "message": "Se ha enviado un código de verificación a tu correo electrónico",
    "expirationTime": 3600
  }
}
```

## Códigos de estado y errores

| Código | Significado           | Descripción                      |
| ------ | --------------------- | -------------------------------- |
| 200    | OK                    | Código de verificación enviado exitosamente |
| 400    | Bad Request           | Email no encontrado en el sistema |
| 400    | Bad Request           | Cuenta ya verificada previamente |
| 500    | Internal Server Error | Error del servidor               |

## Notas útiles para el frontend

- **Verificación de cuenta:** Usar para usuarios que no han verificado su cuenta
- **Reenvío de códigos:** Permitir solicitar nuevo código si el anterior expiró
- **Tiempo de expiración:** Informar al usuario sobre el tiempo límite del código
- **Mensajes informativos:** Mostrar confirmación del enví del código
- **Estado de cuenta:** Verificar si la cuenta ya está validada antes de solicitar
- **Redirección:** Después del enví, redirigir a la pantalla de verificación

## Consideraciones técnicas

- **Middleware:** Aplica `generateExpirationCode` y `getUserByBodysEmail`
- **Validaciones:** Verifica que el email exista y la cuenta no esté ya verificada
- **Generación:** Crea código único con tiempo de expiración
- **Email:** Enví automático del código por email
- **Base de datos:** Almacena el código generado con timestamp
- **Seguridad:** No expone el código en la respuesta
- **Expiración:** Códigos válidos por tiempo limitado (1 hora por defecto)
- **Prevención:** Evita generar códigos para cuentas ya verificadas
