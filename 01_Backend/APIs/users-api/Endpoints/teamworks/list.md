# GET /teamworks

## Descripción funcional

Obtiene una lista de todos los equipos de trabajo (teamworks) disponibles en el sistema. Permite a los usuarios y especialistas explorar los equipos existentes, sus especialidades y miembros.

## Autorización

Requiere token Bearer válido. Acceso público para usuarios autenticados.

## Parámetros de ruta

No aplica

## Query parameters

- `page` (number, opcional): Número de página para paginación. Por defecto: 1
- `limit` (number, opcional): Número de elementos por página. Por defecto: 10, máximo: 100
- `specialty` (string, opcional): Filtrar por especialidad médica
- `subspecialty` (string, opcional): Filtrar por subespecialidad
- `status` (string, opcional): Filtrar por estado del equipo (`active`, `inactive`, `pending`)
- `search` (string, opcional): Búsqueda por nombre del equipo o especialistas
- `sortBy` (string, opcional): Campo para ordenar (`name`, `createdAt`, `memberCount`, `specialty`)
- `sortOrder` (string, opcional): Orden de clasificación (`ASC`, `DESC`). Por defecto: `ASC`

### Ejemplo
```
GET /teamworks?page=1&limit=20&specialty=nutricion&status=active&sortBy=name&sortOrder=ASC
```

## Body del request

No aplica

## Ejemplo de respuesta exitosa (200 OK)

```json
{
  "awsRequestId": "456e7890-e89b-12d3-a456-426614174000",
  "message": "Equipos de trabajo encontrados",
  "data": {
    "teamworks": [
      {
        "teamworkId": "teamwork123-e89b-12d3-a456-426614174000",
        "name": "Equipo Nutrición y Diabetes",
        "description": "Equipo especializado en el tratamiento integral de pacientes con diabetes tipo 1 y 2, enfocado en nutrición, ejercicio y control metabólico",
        "specialty": "nutricion",
        "subspecialty": "diabetes",
        "status": "active",
        "createdAt": "2023-01-15T10:00:00.000Z",
        "updatedAt": "2024-01-15T14:30:00.000Z",
        "members": {
          "total": 8,
          "specialists": 5,
          "assistants": 2,
          "students": 1,
          "leadSpecialist": {
            "id": "specialist123-e89b-12d3-a456-426614174000",
            "name": "Dr. Carlos López",
            "email": "carlos.lopez@clinica.com",
            "specialty": "nutricion",
            "subspecialty": "diabetes",
            "role": "team_leader"
          }
        },
        "statistics": {
          "totalPatients": 150,
          "activePatients": 120,
          "totalConsultations": 1200,
          "consultationsThisMonth": 85,
          "averageRating": 4.8,
          "totalReviews": 45
        },
        "services": [
          "consulta_nutricional",
          "plan_alimentacion",
          "seguimiento_diabetico",
          "educacion_paciente",
          "grupo_apoyo"
        ],
        "locations": [
          {
            "name": "Consultorio Principal",
            "address": "Av. Principal 123, Ciudad",
            "coordinates": {
              "latitude": -33.4489,
              "longitude": -70.6693
            }
          },
          {
            "name": "Centro de Diabetes",
            "address": "Calle Secundaria 456, Ciudad",
            "coordinates": {
              "latitude": -33.4500,
              "longitude": -70.6700
            }
          }
        ],
        "schedule": {
          "workingDays": ["monday", "tuesday", "wednesday", "thursday", "friday"],
          "workingHours": "08:00 - 18:00",
          "emergencyAvailable": true,
          "weekendConsultations": false
        },
        "contact": {
          "phone": "+56912345678",
          "email": "equipo.nutricion@clinica.com",
          "website": "https://clinica.com/equipo-nutricion",
          "whatsapp": "+56987654321"
        }
      },
      {
        "teamworkId": "teamwork456-e89b-12d3-a456-426614174000",
        "name": "Equipo Endocrinología Integral",
        "description": "Equipo multidisciplinario especializado en trastornos endocrinos, incluyendo diabetes, tiroides, obesidad y trastornos metabólicos",
        "specialty": "endocrinologia",
        "subspecialty": "diabetes",
        "status": "active",
        "createdAt": "2023-03-20T14:00:00.000Z",
        "updatedAt": "2024-01-10T09:15:00.000Z",
        "members": {
          "total": 12,
          "specialists": 8,
          "assistants": 3,
          "students": 1,
          "leadSpecialist": {
            "id": "specialist456-e89b-12d3-a456-426614174000",
            "name": "Dra. Ana Martínez",
            "email": "ana.martinez@clinica.com",
            "specialty": "endocrinologia",
            "subspecialty": "diabetes",
            "role": "team_leader"
          }
        },
        "statistics": {
          "totalPatients": 220,
          "activePatients": 180,
          "totalConsultations": 1800,
          "consultationsThisMonth": 120,
          "averageRating": 4.9,
          "totalReviews": 78
        },
        "services": [
          "consulta_endocrinologica",
          "control_diabetico",
          "tratamiento_tiroideo",
          "manejo_obesidad",
          "estudios_metabolicos"
        ],
        "locations": [
          {
            "name": "Centro Endocrinológico",
            "address": "Av. Especializada 789, Ciudad",
            "coordinates": {
              "latitude": -33.4520,
              "longitude": -70.6710
            }
          }
        ],
        "schedule": {
          "workingDays": ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday"],
          "workingHours": "07:00 - 19:00",
          "emergencyAvailable": true,
          "weekendConsultations": true
        },
        "contact": {
          "phone": "+56923456789",
          "email": "equipo.endocrinologia@clinica.com",
          "website": "https://clinica.com/equipo-endocrinologia",
          "whatsapp": "+56976543210"
        }
      }
    ],
    "pagination": {
      "total": 15,
      "page": 1,
      "totalPages": 1,
      "itemsPerPage": 20,
      "hasNextPage": false,
      "hasPrevPage": false
    },
    "filters": {
      "applied": {
        "specialty": "nutricion",
        "status": "active",
        "sortBy": "name",
        "sortOrder": "ASC"
      },
      "available": {
        "specialties": ["nutricion", "endocrinologia", "medicina_interna", "psicologia"],
        "statuses": ["active", "inactive", "pending"],
        "sortFields": ["name", "createdAt", "memberCount", "specialty", "rating"]
      }
    },
    "summary": {
      "totalTeamworks": 15,
      "activeTeamworks": 12,
      "totalSpecialists": 85,
      "totalPatients": 1200,
      "averageRating": 4.7
    }
  }
}
```

## Códigos de estado y errores

| Código | Descripción | Causa común |
|--------|-------------|-------------|
| 200 | OK | Equipos de trabajo encontrados |
| 400 | Bad Request | Parámetros de consulta inválidos |
| 401 | Unauthorized | Token faltante o inválido |
| 500 | Internal Server Error | Error del servidor |

## Notas útiles para el frontend

- **Paginación**: Implementa paginación estándar con `page` y `limit`
- **Filtros**: Usa los filtros disponibles para refinar la búsqueda
- **Ordenamiento**: Permite ordenar por diferentes campos
- **Búsqueda**: El parámetro `search` busca en nombres de equipos y especialistas
- **Estados**: Los equipos pueden estar `active`, `inactive` o `pending`
- **Estadísticas**: Cada equipo incluye métricas de pacientes y consultas
- **Ubicaciones**: Se muestran las ubicaciones físicas de cada equipo

## Consideraciones técnicas

- **Middleware**: No requiere middlewares especiales de autorización
- **Filtros**: Los filtros se aplican a nivel de base de datos para optimizar el rendimiento
- **Paginación**: Se implementa paginación eficiente con límites configurables
- **Búsqueda**: La búsqueda es case-insensitive y busca en múltiples campos
- **Cache**: Los resultados se cachean para mejorar el rendimiento en consultas repetidas
- **Ordenamiento**: El ordenamiento por defecto es alfabético por nombre
