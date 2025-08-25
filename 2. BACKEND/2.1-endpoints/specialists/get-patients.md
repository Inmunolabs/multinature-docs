# GET /specialists/patients/:id

## Descripción funcional

Obtiene la lista de pacientes asignados a un especialista específico. Incluye información básica de cada paciente, estado de la relación y datos relevantes para el seguimiento médico.

## Autorización

Requiere token Bearer válido. Solo el especialista propietario puede consultar su lista de pacientes.

## Parámetros de ruta

- `id` (string): ID único del especialista

### Ejemplo
```
GET /specialists/patients/specialist123-e89b-12d3-a456-426614174000
```

## Query parameters

No aplica

## Body del request

No aplica

## Ejemplo de respuesta exitosa (200 OK)

```json
{
  "awsRequestId": "456e7890-e89b-12d3-a456-426614174000",
  "message": "Pacientes del especialista encontrados",
  "data": [
    {
      "id": "patient123-e89b-12d3-a456-426614174000",
      "firstName": "Ana",
      "lastName": "López",
      "phone": "+525512345680",
      "email": "ana.lopez@email.com",
      "birthdate": "1995-03-20",
      "gender": "female",
      "profile": "user",
      "openpayUserId": "op_user_789",
      "balance": 150.00,
      "recommender": null,
      "specialists": [
        {
          "id": "specialist123-e89b-12d3-a456-426614174000",
          "name": "Dr. María García",
          "specialties": ["Nutrición", "Endocrinología"]
        }
      ],
      "specialties": ["nutricion", "endocrinologia"],
      "subspecialties": ["diabetes", "obesidad"],
      "specialistSettings": null,
      "antiquity": "6 meses",
      "hasPlan": true,
      "isValid": true,
      "lastConsultation": "2024-01-10T14:00:00.000Z",
      "nextConsultation": "2024-01-25T10:00:00.000Z",
      "totalConsultations": 8,
      "status": "active"
    },
    {
      "id": "patient456-e89b-12d3-a456-426614174000",
      "firstName": "Carlos",
      "lastName": "Martínez",
      "phone": "+525512345681",
      "email": "carlos.martinez@email.com",
      "birthdate": "1988-07-12",
      "gender": "male",
      "profile": "user",
      "openpayUserId": "op_user_790",
      "balance": 0.00,
      "recommender": null,
      "specialists": [
        {
          "id": "specialist123-e89b-12d3-a456-426614174000",
          "name": "Dr. María García",
          "specialties": ["Nutrición", "Endocrinología"]
        }
      ],
      "specialties": ["nutricion"],
      "subspecialties": ["obesidad"],
      "specialistSettings": null,
      "antiquity": "3 meses",
      "hasPlan": false,
      "isValid": true,
      "lastConsultation": "2024-01-05T16:00:00.000Z",
      "nextConsultation": null,
      "totalConsultations": 3,
      "status": "inactive"
    }
  ]
}
```

## Códigos de estado y errores

| Código | Significado           | Descripción                      |
| ------ | --------------------- | -------------------------------- |
| 200    | OK                    | Pacientes encontrados            |
| 400    | Bad Request           | ID inválido                      |
| 401    | Unauthorized          | Token faltante o inválido        |
| 403    | Forbidden             | No tienes permisos para consultar estos pacientes |
| 404    | Not Found             | Especialista no encontrado       |
| 500    | Internal Server Error | Error del servidor               |

## Notas útiles para el frontend

- **Permisos:** Solo el especialista propietario puede consultar su lista de pacientes
- **Estado del paciente:** Campo `status` indica si está activo o inactivo
- **Consultas:** Información de última y próxima consulta programada
- **Planes:** Campo `hasPlan` indica si el paciente tiene plan activo
- **Antigüedad:** Tiempo desde que el paciente se registró con el especialista
- **Especialidades:** Especialidades y subespecialidades asignadas al paciente
- **Balance:** Saldo actual del paciente en el sistema
- **Validación:** Verificar que el especialista exista antes de consultar

## Consideraciones técnicas

- **Middleware:** Aplica `idPathParam` y `userOwnResources`
- **Validaciones:** Verificación de permisos del especialista
- **Servicio:** Utiliza `getPatientsBySpecialistId` del servicio de especialistas
- **DTO:** Transformación usando `patientsToDTO` para la respuesta
- **Base de datos:** Consulta con JOINs para obtener datos relacionados
- **Seguridad:** Verificación de propiedad del recurso
- **Relaciones:** Incluye datos de especialidades y configuraciones
- **Cálculos:** Estadísticas de consultas y antigüedad calculadas dinámicamente
