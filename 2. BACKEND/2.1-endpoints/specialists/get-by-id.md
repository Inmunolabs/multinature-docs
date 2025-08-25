# GET /specialists/:id

## Descripción funcional

Obtiene la información detallada de un especialista específico por su ID. Incluye datos personales, especialidades, configuración, pacientes asignados y estadísticas de trabajo.

## Autorización

Requiere token Bearer válido. Cualquier usuario autenticado puede consultar información de especialistas.

## Parámetros de ruta

- `id` (string): ID único del especialista

### Ejemplo
```
GET /specialists/specialist123-e89b-12d3-a456-426614174000
```

## Query parameters

No aplica

## Body del request

No aplica

## Ejemplo de respuesta exitosa (200 OK)

```json
{
  "awsRequestId": "456e7890-e89b-12d3-a456-426614174000",
  "message": "Especialista encontrado",
  "data": {
    "id": "specialist123-e89b-12d3-a456-426614174000",
    "firstName": "María",
    "lastName": "García",
    "phone": "+525512345678",
    "email": "maria.garcia@clinic.com",
    "birthdate": "1985-06-15",
    "gender": "female",
    "profile": "specialist",
    "openpayUserId": "op_user_123456",
    "balance": 1500.50,
    "recommender": null,
    "specialists": [],
    "specialties": ["nutricion", "endocrinologia"],
    "subspecialties": ["diabetes", "obesidad", "nutricion_clinica"],
    "specialistSettings": {
      "id": "settings123-e89b-12d3-a456-426614174000",
      "consultationPrice": 800.00,
      "consultationDuration": 60,
      "workingHours": {
        "monday": {
          "start": "09:00",
          "end": "17:00",
          "isAvailable": true
        },
        "tuesday": {
          "start": "09:00",
          "end": "17:00",
          "isAvailable": true
        }
      },
      "isAvailable": true
    },
    "patients": [
      {
        "id": "patient123-e89b-12d3-a456-426614174000",
        "firstName": "Ana",
        "lastName": "López",
        "email": "ana.lopez@email.com"
      }
    ],
    "antiquity": "2 años",
    "hasPlan": true,
    "isValid": true,
    "totalPatients": 25,
    "activePatients": 20,
    "totalConsultations": 150,
    "averageRating": 4.8
  }
}
```

## Códigos de estado y errores

| Código | Significado           | Descripción                      |
| ------ | --------------------- | -------------------------------- |
| 200    | OK                    | Especialista encontrado          |
| 400    | Bad Request           | ID inválido                      |
| 404    | Not Found             | Especialista no encontrado       |
| 401    | Unauthorized          | Token faltante o inválido        |
| 500    | Internal Server Error | Error del servidor               |

## Notas útiles para el frontend

- **Datos completos:** Incluye información personal, especialidades y configuración
- **Pacientes:** Lista de pacientes asignados al especialista
- **Horarios:** Configuración de horarios de trabajo por día
- **Precios:** Precio de consulta y duración configurados
- **Estadísticas:** Total de pacientes, consultas y calificación promedio
- **Disponibilidad:** Estado de disponibilidad del especialista
- **Validación:** Verificar que el especialista esté activo antes de mostrar

## Consideraciones técnicas

- **Middleware:** Aplica `idPathParam` para validación del ID
- **Servicio:** Utiliza `getSpecialistById` del servicio de especialistas
- **DTO:** Transformación usando `specialistToDTO` para la respuesta
- **Relaciones:** Incluye datos de pacientes, especialidades y configuración
- **Cálculos:** Estadísticas calculadas dinámicamente
- **Validaciones:** Verificación de existencia del especialista
- **Base de datos:** Consultas optimizadas con JOINs para datos relacionados
