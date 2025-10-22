# PATCH /:id

## Descripción funcional

Actualiza la información de un usuario existente. Solo permite actualizar campos específicos del perfil y requiere que el usuario autenticado sea el propietario de la cuenta o tenga permisos de administrador.

## Autorización

Requiere token Bearer válido. Solo el propietario del usuario puede actualizar su información.

## Parámetros de ruta

- `id` (UUID, requerido): ID único del usuario a actualizar

### Ejemplo
```
PATCH /user123-e89b-12d3-a456-426614174000
```

## Query parameters

No aplica

## Body del request

```json
{
  "firstName": "Juan Carlos",
  "lastName": "Pérez González",
  "phone": "+525512345679",
  "birthdate": "1990-05-15",
  "gender": "male"
}
```

### Campos opcionales (actualizar solo los que se deseen cambiar)
- `firstName` (string): Nuevo nombre del usuario
- `lastName` (string): Nuevo apellido del usuario
- `phone` (string): Nuevo número de teléfono
- `birthdate` (string): Nueva fecha de nacimiento en formato ISO (YYYY-MM-DD)
- `gender` (string): Nuevo género del usuario

### Validaciones
- `firstName`, `lastName`: No pueden estar vacíos si se proporcionan
- `phone`: Formato internacional válido
- `birthdate`: Formato ISO válido
- `gender`: Valores permitidos: `male`, `female`, `other`

## Ejemplo de respuesta exitosa (200 OK)

```json
{
  "awsRequestId": "456e7890-e89b-12d3-a456-426614174000",
  "message": "Usuario actualizado.",
  "data": {
    "id": "user123-e89b-12d3-a456-426614174000",
    "firstName": "Juan Carlos",
    "lastName": "Pérez González",
    "phone": "+525512345679",
    "email": "juan.perez@email.com",
    "birthdate": "1990-05-15",
    "gender": "male",
    "profile": "user",
    "openpayUserId": "op_user_123",
    "balance": 150.50,
    "recommender": "user456-e89b-12d3-a456-426614174000",
    "specialists": [
      {
        "id": "specialist789-e89b-12d3-a456-426614174000",
        "name": "Dr. María García",
        "specialties": ["Nutrición", "Endocrinología"]
      }
    ],
    "antiquity": "2 años, 3 meses",
    "hasPlan": true,
    "isValid": true
  }
}
```

## Códigos de estado y errores

| Código | Significado           | Descripción                      |
| ------ | --------------------- | -------------------------------- |
| 200    | OK                    | Usuario actualizado exitosamente |
| 400    | Bad Request           | ID de usuario inválido o datos incorrectos |
| 401    | Unauthorized          | Token faltante o inválido        |
| 403    | Forbidden             | Sin permisos para actualizar este usuario |
| 404    | Not Found             | Usuario no encontrado            |
| 500    | Internal Server Error | Error del servidor               |

## Notas útiles para el frontend

- **Propiedad:** Solo mostrar opción de editar para usuarios propios
- **Validaciones:** Implementar validaciones del lado del cliente antes de enviar
- **Confirmación:** Solicitar confirmación antes de actualizar
- **Feedback:** Mostrar mensaje de éxito o error según la respuesta
- **Campos opcionales:** Permitir actualizar solo los campos que se deseen cambiar
- **Estado:** Deshabilitar edición para usuarios no propios
- **Redirección:** Después de actualización exitosa, refrescar la información

## Consideraciones técnicas

- **Middleware:** Aplica `authorize`, `idPathParam` y `userOwnResources`
- **Validaciones:** Verifica que el usuario exista y que el usuario autenticado tenga permisos
- **Propiedad:** Solo el propietario del usuario puede editarlo
- **Base de datos:** Actualiza solo los campos proporcionados
- **Seguridad:** Validación estricta de propiedad del usuario
- **DTO:** Transformación usando `userToDTO` para la respuesta
- **Auditoría:** Registra cambios en la información del usuario
