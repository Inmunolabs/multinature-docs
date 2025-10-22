# GET /specialists/patients/:id/summary/specialty

## Descripción funcional

Obtiene un resumen estadístico de los pacientes asignados a un especialista específico, agrupados por especialidad médica. Incluye métricas detalladas por cada especialidad, distribución de pacientes y rendimiento por área.

## Autorización

Requiere token Bearer válido. Solo el especialista propietario puede consultar el resumen por especialidad.

## Parámetros de ruta

- `id` (string): ID único del especialista

### Ejemplo
```
GET /specialists/patients/specialist123-e89b-12d3-a456-426614174000/summary/specialty
```

## Query parameters

- `specialtyId` (string, opcional): ID de la especialidad específica. Si no se proporciona, devuelve todas las especialidades

### Ejemplo
```
GET /specialists/patients/specialist123-e89b-12d3-a456-426614174000/summary/specialty?specialtyId=nutricion
```

## Body del request

No aplica

## Ejemplo de respuesta exitosa (200 OK)

```json
{
  "awsRequestId": "456e7890-e89b-12d3-a456-426614174000",
  "message": "Resumen por especialidad del especialista encontrado",
  "data": {
    "specialistId": "specialist123-e89b-12d3-a456-426614174000",
    "totalSpecialties": 2,
    "specialties": [
      {
        "specialtyId": "nutricion",
        "specialtyName": "Nutrición",
        "totalPatients": 15,
        "activePatients": 12,
        "inactivePatients": 3,
        "newPatientsThisMonth": 5,
        "patientsWithPlan": 11,
        "patientsWithoutPlan": 4,
        "totalConsultations": 95,
        "consultationsThisMonth": 45,
        "averageConsultationsPerPatient": 6.3,
        "efficiency": 94.7,
        "subspecialties": [
          {
            "subspecialtyId": "diabetes",
            "subspecialtyName": "Diabetes",
            "patients": 8,
            "consultations": 52,
            "efficiency": 96.2
          },
          {
            "subspecialtyId": "obesidad",
            "subspecialtyName": "Obesidad",
            "patients": 7,
            "consultations": 43,
            "efficiency": 93.0
          }
        ],
        "monthlyTrends": [
          {
            "month": "2024-01",
            "consultations": 45,
            "newPatients": 5,
            "efficiency": 94.7
          },
          {
            "month": "2023-12",
            "consultations": 38,
            "newPatients": 3,
            "efficiency": 92.1
          }
        ],
        "growthRate": 18.4
      },
      {
        "specialtyId": "endocrinologia",
        "specialtyName": "Endocrinología",
        "totalPatients": 10,
        "activePatients": 8,
        "inactivePatients": 2,
        "newPatientsThisMonth": 3,
        "patientsWithPlan": 7,
        "patientsWithoutPlan": 3,
        "totalConsultations": 60,
        "consultationsThisMonth": 44,
        "averageConsultationsPerPatient": 6.0,
        "efficiency": 88.3,
        "subspecialties": [
          {
            "subspecialtyId": "nutricion_clinica",
            "subspecialtyName": "Nutrición Clínica",
            "patients": 5,
            "consultations": 30,
            "efficiency": 90.0
          }
        ],
        "monthlyTrends": [
          {
            "month": "2024-01",
            "consultations": 44,
            "newPatients": 3,
            "efficiency": 88.3
          },
          {
            "month": "2023-12",
            "consultations": 35,
            "newPatients": 2,
            "efficiency": 85.7
          }
        ],
        "growthRate": 25.7
      }
    ],
    "summary": {
      "totalPatients": 25,
      "activePatients": 20,
      "totalConsultations": 155,
      "averageEfficiency": 92.1,
      "mostActiveSpecialty": "nutricion",
      "fastestGrowingSpecialty": "endocrinologia"
    },
    "lastUpdated": "2024-01-15T14:30:00.000Z"
  }
}
```

## Códigos de estado y errores

| Código | Significado           | Descripción                      |
| ------ | --------------------- | -------------------------------- |
| 200    | OK                    | Resumen por especialidad encontrado |
| 400    | Bad Request           | ID inválido o especialidad inválida |
| 401    | Unauthorized          | Token faltante o inválido        |
| 403    | Forbidden             | No tienes permisos para consultar este resumen |
| 404    | Not Found             | Especialista o especialidad no encontrado |
| 500    | Internal Server Error | Error del servidor               |

## Notas útiles para el frontend

- **Permisos:** Solo el especialista propietario puede consultar el resumen por especialidad
- **Especialidad opcional:** Si no se proporciona `specialtyId`, devuelve todas las especialidades
- **Subespecialidades:** Cada especialidad incluye sus subespecialidades con métricas
- **Tendencias mensuales:** Array con métricas por mes para cada especialidad
- **Crecimiento:** Tasa de crecimiento comparada con el mes anterior
- **Eficiencia:** Porcentaje de consultas completadas vs. programadas por especialidad
- **Resumen general:** Métricas agregadas de todas las especialidades
- **Dashboard especializado:** Ideal para mostrar rendimiento por área médica

## Consideraciones técnicas

- **Middleware:** Aplica `idPathParam` y `userOwnResources`
- **Validaciones:** Verificación de permisos y especialidad válida
- **Servicio:** Utiliza `getPatientsSummaryBySpecialty` del servicio de especialistas
- **DTO:** Transformación usando `patientsSummarySpecialtyToDTO` para la respuesta
- **Base de datos:** Consultas agregadas por especialidad con JOINs
- **Seguridad:** Verificación de propiedad del recurso
- **Cálculos:** Estadísticas calculadas dinámicamente por especialidad
- **Performance:** Consultas optimizadas con índices de especialidad
- **Relaciones:** Incluye datos de subespecialidades y tendencias
- **Agregación:** Métricas calculadas por cada nivel de especialización
