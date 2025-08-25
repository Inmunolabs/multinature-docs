# GET /:id

## Descripción funcional

Obtiene un usuario específico por su ID. Solo permite acceso al propietario del usuario o a usuarios autorizados. Retorna información completa del perfil incluyendo datos personales, especialistas asignados, información de red y configuraciones.

## Autorización

Requiere token Bearer válido. Solo el propietario del usuario o usuarios autorizados pueden acceder.

## Parámetros de ruta

- `id` (UUID, requerido): ID único del usuario

### Ejemplo
```
GET /user123-e89b-12d3-a456-426614174000
```

## Query parameters

No aplica

## Body del request

No aplica

## Ejemplo de respuesta exitosa (200 OK)

```json
{
  "awsRequestId": "456e7890-e89b-12d3-a456-426614174000",
  "message": "Usuario encontrado.",
  "data": {
    "id": "user123-e89b-12d3-a456-426614174000",
    "firstName": "Juan",
    "lastName": "Pérez",
    "phone": "+525512345678",
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
        "email": "maria.garcia@email.com",
        "specialties": ["Nutrición", "Endocrinología"],
        "settings": {
          "consultationPrice": 500,
          "consultationDuration": 60,
          "isActive": true
        },
        "clinics": [
          {
            "id": "clinic123-e89b-12d3-a456-426614174000",
            "name": "Clínica Nutricional",
            "address": "Av. Reforma 123, CDMX"
          }
        ],
        "reviews": [
          {
            "id": "review456-e89b-12d3-a456-426614174000",
            "rating": 5,
            "review": "Excelente atención y profesionalismo",
            "urlImages": [],
            "subspecialtyIds": ["diabetes", "obesidad"]
          }
        ]
      }
    ],
    "specialties": [],
    "subspecialties": [],
    "specialistSettings": null,
    "antiquity": "2 años, 3 meses",
    "hasPlan": true,
    "isValid": true,
    "network": {
      "level": 1,
      "totalUsers": 5,
      "activeUsers": 3,
      "commissionEarned": 75.00,
      "referrals": [
        {
          "id": "user789-e89b-12d3-a456-426614174000",
          "firstName": "Ana",
          "lastName": "López",
          "level": 2,
          "isActive": true,
          "joinDate": "2024-01-15T00:00:00Z"
        }
      ]
    }
  }
}
```

## Códigos de estado y errores

| Código | Significado           | Descripción                      |
| ------ | --------------------- | -------------------------------- |
| 200    | OK                    | Usuario encontrado exitosamente  |
| 200    | OK                    | Usuario no encontrado (con mensaje específico) |
| 400    | Bad Request           | ID de usuario inválido           |
| 401    | Unauthorized          | Token faltante o inválido        |
| 403    | Forbidden             | Sin permisos para acceder a este usuario |
| 500    | Internal Server Error | Error del servidor               |

## Notas útiles para el frontend

- **Acceso restringido:** Solo mostrar información de usuarios propios o autorizados
- **Datos completos:** Usar para llenar formularios de perfil y configuraciones
- **Especialistas asignados:** Mostrar lista de especialistas con información detallada
- **Información de red:** Visualizar nivel actual y referidos activos
- **Estado de cuenta:** Usar `isValid` para mostrar estado de verificación
- **Planes activos:** Usar `hasPlan` para mostrar funcionalidades premium
- **Balance:** Mostrar saldo actual del usuario

## Consideraciones técnicas

- **Middleware:** Aplica `authorize`, `idPathParam` y `userOwnResources`
- **Validaciones:** Verifica que el usuario exista y que el usuario autenticado tenga acceso
- **Propiedad:** Solo el propietario del usuario puede acceder a sus datos
- **DTO:** Transformación usando `userToDTO` con información completa
- **Relaciones:** Incluye especialistas, configuraciones y red de referidos
- **Base de datos:** Consulta a `UsersQueries.getById`
- **Seguridad:** Validación estricta de propiedad del usuario
