# GET /

## Descripción funcional

Lista usuarios del sistema con filtros de fecha. Permite obtener una lista paginada de usuarios con información básica, aplicando filtros por período de tiempo. Por defecto filtra por el último trimestre.

## Autorización

Requiere token Bearer válido. Solo usuarios autenticados pueden acceder a la lista.

## Parámetros de ruta

No aplica

## Query parameters

- `startDate` (string, opcional): Fecha de inicio en formato ISO (YYYY-MM-DD)
- `endDate` (string, opcional): Fecha de fin en formato ISO (YYYY-MM-DD)
- `page` (number, opcional): Número de página para paginación (por defecto: 1)
- `limit` (number, opcional): Número de elementos por página (por defecto: 10)

### Ejemplo
```
GET /?startDate=2024-01-01&endDate=2024-03-31&page=1&limit=20
```

## Body del request

No aplica

## Ejemplo de respuesta exitosa (200 OK)

```json
{
  "awsRequestId": "456e7890-e89b-12d3-a456-426614174000",
  "message": "Usuarios encontrados.",
  "data": [
    {
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
          "specialties": ["Nutrición", "Endocrinología"]
        }
      ],
      "antiquity": "2 años, 3 meses",
      "hasPlan": true,
      "isValid": true
    },
    {
      "id": "user456-e89b-12d3-a456-426614174000",
      "firstName": "María",
      "lastName": "García",
      "phone": "+525598765432",
      "email": "maria.garcia@email.com",
      "birthdate": "1985-08-22",
      "gender": "female",
      "profile": "specialist",
      "openpayUserId": "op_specialist_456",
      "balance": 0,
      "specialties": ["Nutrición", "Endocrinología"],
      "subspecialties": ["Diabetes", "Obesidad"],
      "specialistSettings": {
        "consultationPrice": 500,
        "consultationDuration": 60,
        "isActive": true
      },
      "antiquity": "5 años, 1 mes",
      "hasPlan": false,
      "isValid": true
    }
  ],
  "pagination": {
    "total": 150,
    "page": 1,
    "totalPages": 8,
    "itemsPerPage": 20
  }
}
```

## Códigos de estado y errores

| Código | Significado           | Descripción                      |
| ------ | --------------------- | -------------------------------- |
| 200    | OK                    | Usuarios encontrados exitosamente |
| 200    | OK                    | Lista vacía si no hay usuarios (con mensaje "Usuarios no encontrados") |
| 400    | Bad Request           | Fechas inválidas o parámetros incorrectos |
| 401    | Unauthorized          | Token faltante o inválido        |
| 500    | Internal Server Error | Error del servidor               |

## Notas útiles para el frontend

- **Filtros por fecha:** Por defecto filtra por el último trimestre
- **Paginación:** Implementar controles de paginación usando la información del response
- **Perfiles diferentes:** Mostrar información específica según el perfil del usuario
- **Especialistas:** Incluir información de especialidades y configuraciones
- **Estado de cuenta:** Usar `isValid` para mostrar estado de verificación
- **Planes activos:** Usar `hasPlan` para mostrar funcionalidades premium

## Consideraciones técnicas

- **Middleware:** Aplica `authorize` y `validateDateFilter`
- **Filtros por defecto:** Fecha de inicio por defecto: `last-quarter`
- **Base de datos:** Consulta optimizada con filtros de fecha
- **DTO:** Transformación usando `usersToDTO` con información completa
- **Paginación:** Sistema estándar de paginación con metadatos
- **Performance:** Consulta optimizada para grandes volúmenes de usuarios
- **Seguridad:** Solo usuarios autenticados pueden acceder
