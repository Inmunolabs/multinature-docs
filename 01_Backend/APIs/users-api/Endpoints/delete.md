# DELETE /:id

## Descripción funcional

Elimina un usuario del sistema. Solo permite la eliminación al propietario de la cuenta o a administradores. Requiere confirmación mediante contraseña para evitar eliminaciones accidentales.

## Autorización

Requiere token Bearer válido. Solo el propietario del usuario o administradores pueden eliminarlo.

## Parámetros de ruta

- `id` (UUID, requerido): ID único del usuario a eliminar

### Ejemplo
```
DELETE /user123-e89b-12d3-a456-426614174000
```

## Query parameters

No aplica

## Body del request

```json
{
  "password": "Contraseña123!"
}
```

### Campos requeridos
- `password` (string): Contraseña del usuario para confirmar la eliminación

### Validaciones
- `password`: Debe coincidir con la contraseña actual del usuario

## Ejemplo de respuesta exitosa (200 OK)

```json
{
  "awsRequestId": "456e7890-e89b-12d3-a456-426614174000",
  "message": "Usuario eliminado.",
  "data": {
    "id": "user123-e89b-12d3-a456-426614174000",
    "firstName": "Juan",
    "lastName": "Pérez",
    "email": "juan.perez@email.com",
    "deletedAt": "2024-01-25T16:00:00Z"
  }
}
```

## Códigos de estado y errores

| Código | Significado           | Descripción                      |
| ------ | --------------------- | -------------------------------- |
| 200    | OK                    | Usuario eliminado exitosamente   |
| 400    | Bad Request           | ID de usuario inválido           |
| 401    | Unauthorized          | Token faltante o inválido        |
| 401    | Unauthorized          | Contraseña incorrecta            |
| 403    | Forbidden             | Sin permisos para eliminar este usuario |
| 404    | Not Found             | Usuario no encontrado            |
| 500    | Internal Server Error | Error del servidor               |

## Notas útiles para el frontend

- **Confirmación crítica:** Solicitar confirmación explícita antes de eliminar
- **Verificación de contraseña:** Requerir contraseña para confirmar la acción
- **Advertencia:** Mostrar advertencia sobre que la eliminación es permanente
- **Propiedad:** Solo mostrar opción de eliminar para usuarios propios
- **Admin:** Los administradores pueden eliminar cualquier usuario
- **Feedback:** Mostrar mensaje de éxito o error según la respuesta
- **Redirección:** Después de eliminación exitosa, redirigir al logout

## Consideraciones técnicas

- **Middleware:** Aplica `authorize`, `idPathParam`, `passHeader` y `userOwnResources`
- **Validaciones:** Verifica que el usuario exista y que el usuario autenticado tenga permisos
- **Confirmación:** Requiere contraseña para validar la intención de eliminación
- **Propiedad:** Solo el propietario del usuario puede eliminarlo
- **Base de datos:** Eliminación lógica o física según configuración del sistema
- **Seguridad:** Validación estricta de propiedad y contraseña
- **Auditoría:** Registra la eliminación con timestamp
- **Integridad:** Considera dependencias y relaciones antes de eliminar
