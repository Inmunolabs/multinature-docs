# POST /

## Descripción funcional

Crea un nuevo usuario en el sistema. Permite registrar usuarios con diferentes perfiles (usuario regular, especialista, administrador). Incluye validaciones de email único y enví automático de código de verificación por email.

## Autorización

No requiere token Bearer. Endpoint público para registro de usuarios.

## Parámetros de ruta

No aplica

## Query parameters

No aplica

## Body del request

```json
{
  "firstName": "Juan",
  "lastName": "Pérez",
  "phone": "+525512345678",
  "email": "juan.perez@email.com",
  "password": "Contraseña123!",
  "birthdate": "1990-05-15",
  "gender": "male",
  "profile": "user",
  "recommender": "user456-e89b-12d3-a456-426614174000"
}
```

### Campos requeridos
- `firstName` (string): Nombre del usuario
- `lastName` (string): Apellido del usuario
- `email` (string): Email único del usuario
- `password` (string): Contraseña del usuario (mínimo 8 caracteres)

### Campos opcionales
- `phone` (string): Número de teléfono del usuario
- `birthdate` (string): Fecha de nacimiento en formato ISO (YYYY-MM-DD)
- `gender` (string): Género del usuario (`male`, `female`, `other`)
- `profile` (string): Perfil del usuario (`user`, `specialist`, `admin`)
- `recommender` (UUID): ID del usuario que lo refirió al sistema

### Validaciones
- `email`: Debe ser un email válido y único en el sistema
- `password`: Mínimo 8 caracteres con mayúsculas, minúsculas y números
- `firstName`, `lastName`: No pueden estar vacíos
- `phone`: Formato internacional válido

## Ejemplo de respuesta exitosa (201 Created)

```json
{
  "awsRequestId": "456e7890-e89b-12d3-a456-426614174000",
  "message": "Usuario creado.",
  "data": {
    "id": "user123-e89b-12d3-a456-426614174000",
    "firstName": "Juan",
    "lastName": "Pérez",
    "phone": "+525512345678",
    "email": "juan.perez@email.com",
    "birthdate": "1990-05-15",
    "gender": "male",
    "profile": "user",
    "openpayUserId": "",
    "balance": 0,
    "recommender": "user456-e89b-12d3-a456-426614174000",
    "specialists": [],
    "specialties": [],
    "subspecialties": [],
    "specialistSettings": null,
    "antiquity": "0 días",
    "hasPlan": false,
    "isValid": false
  }
}
```

## Códigos de estado y errores

| Código | Significado           | Descripción                      |
| ------ | --------------------- | -------------------------------- |
| 201    | Created               | Usuario creado exitosamente      |
| 400    | Bad Request           | Datos del usuario inválidos      |
| 400    | Bad Request           | Email ya registrado en el sistema |
| 500    | Internal Server Error | Error del servidor               |

## Notas útiles para el frontend

- **Verificación requerida:** Después de crear la cuenta, el usuario debe verificar su email
- **Código de verificación:** Se envía automáticamente por email
- **Estado inicial:** La cuenta se crea con `isValid: false`
- **Perfiles:** Seleccionar perfil apropiado según el tipo de usuario
- **Referidos:** Incluir ID del usuario que refirió si aplica
- **Validaciones:** Implementar validaciones del lado del cliente antes de enviar
- **Mensajes de éxito:** Informar sobre el enví del código de verificación

## Consideraciones técnicas

- **Middleware:** Aplica `createUser` y `uniqueEmailValidation`
- **Validaciones:** Verificación de email único y formato de datos
- **Encriptación:** La contraseña se encripta antes de almacenar
- **Verificación:** Se genera y envía código de verificación automáticamente
- **Base de datos:** Crea entidad User usando `User.createEntity`
- **Email:** Enví automático de código de verificación
- **Seguridad:** Validaciones estrictas de datos de entrada
- **DTO:** Transformación usando `userToDTO` para la respuesta
