# POST /login

## Descripción funcional

Autentica a un usuario en el sistema usando su email y contraseña. Retorna un token Bearer válido que debe ser usado para acceder a endpoints protegidos. Solo usuarios con cuentas verificadas pueden iniciar sesión.

## Autorización

No requiere token Bearer. Endpoint público para autenticación.

## Parámetros de ruta

No aplica

## Query parameters

No aplica

## Body del request

```json
{
  "email": "juan.perez@email.com",
  "password": "Contraseña123!"
}
```

### Campos requeridos
- `email` (string): Email del usuario registrado
- `password` (string): Contraseña del usuario

### Validaciones
- `email`: Debe ser un email válido registrado en el sistema
- `password`: Debe coincidir con la contraseña almacenada

## Ejemplo de respuesta exitosa (200 OK)

```json
{
  "awsRequestId": "456e7890-e89b-12d3-a456-426614174000",
  "message": "Inicio de sesión exitoso.",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InVzZXIxMjMtZTg5Yi0xMmQzLWE0NTYtNDI2NjE0MTc0MDAwIiwiaWF0IjoxNzA2MjE5ODAwLCJleHAiOjE3MDYzMDU4MDB9.signature",
    "user": {
      "id": "user123-e89b-12d3-a456-426614174000",
      "firstName": "Juan",
      "lastName": "Pérez",
      "email": "juan.perez@email.com",
      "profile": "user",
      "isValid": true,
      "hasPlan": true
    },
    "expiresIn": 86400
  }
}
```

## Códigos de estado y errores

| Código | Significado           | Descripción                      |
| ------ | --------------------- | -------------------------------- |
| 200    | OK                    | Login exitoso                    |
| 400    | Bad Request           | Email o contraseña incorrectos   |
| 400    | Bad Request           | Cuenta no verificada            |
| 400    | Bad Request           | Usuario no encontrado            |
| 500    | Internal Server Error | Error del servidor               |

## Notas útiles para el frontend

- **Token Bearer:** Almacenar el token para usar en requests posteriores
- **Expiración:** El token tiene tiempo de expiración (24 horas por defecto)
- **Verificación requerida:** Solo cuentas verificadas pueden hacer login
- **Mensajes de error:** Mostrar mensajes específicos para cada tipo de error
- **Redirección:** Después de login exitoso, redirigir al dashboard
- **Almacenamiento seguro:** Guardar token en localStorage o sessionStorage
- **Renovación:** Implementar renovación automática del token antes de expirar

## Consideraciones técnicas

- **Middleware:** Aplica `login` y `getUserByBodysEmail`
- **Validaciones:** Verifica que el email exista y la contraseña sea correcta
- **Verificación:** Solo permite login a usuarios con `isValid: true`
- **Token JWT:** Genera token JWT con información del usuario
- **Encriptación:** Compara contraseña encriptada con la almacenada
- **Seguridad:** No expone información sensible en la respuesta
- **Base de datos:** Consulta a `UsersQueries.getByEmail`
- **DTO:** Transformación usando `userToDTO` para información básica
