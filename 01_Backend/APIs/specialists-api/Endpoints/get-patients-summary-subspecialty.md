# GET /specialists/patients/:id/summary/subspecialty

## Descripción funcional

Obtiene un resumen estadístico de los pacientes asignados a un especialista específico, agrupados por subespecialidad médica. Incluye métricas detalladas por cada subespecialidad, distribución de pacientes y rendimiento por área específica.

## Autorización

Requiere token Bearer válido. Solo el especialista propietario puede consultar el resumen por subespecialidad.

## Parámetros de ruta

- `id` (string): ID único del especialista

### Ejemplo
```
GET /specialists/patients/specialist123-e89b-12d3-a456-426614174000/summary/subspecialty
```

## Query parameters

- `subspecialtyId` (string, opcional): ID de la subespecialidad específica. Si no se proporciona, devuelve todas las subespecialidades
- `specialtyId` (string, opcional): ID de la especialidad para filtrar subespecialidades

### Ejemplo
```
GET /specialists/patients/specialist123-e89b-12d3-a456-426614174000/summary/subspecialty?subspecialtyId=diabetes
GET /specialists/patients/specialist123-e89b-12d3-a456-426614174000/summary/subspecialty?specialtyId=nutricion
```

## Body del request

No aplica

## Ejemplo de respuesta exitosa (200 OK)

```json
{
  "awsRequestId": "456e7890-e89b-12d3-a456-426614174000",
  "message": "Resumen por subespecialidad del especialista encontrado",
  "data": {
    "specialistId": "specialist123-e89b-12d3-a456-426614174000",
    "totalSubspecialties": 3,
    "subspecialties": [
      {
        "subspecialtyId": "diabetes",
        "subspecialtyName": "Diabetes",
        "specialtyId": "nutricion",
        "specialtyName": "Nutrición",
        "totalPatients": 8,
        "activePatients": 7,
        "inactivePatients": 1,
        "newPatientsThisMonth": 3,
        "patientsWithPlan": 6,
        "patientsWithoutPlan": 2,
        "totalConsultations": 52,
        "consultationsThisMonth": 25,
        "averageConsultationsPerPatient": 6.5,
        "efficiency": 96.2,
        "patientDistribution": {
          "byAge": {
            "18-30": 2,
            "31-45": 3,
            "46-60": 2,
            "60+": 1
          },
          "byGender": {
            "male": 3,
            "female": 5
          }
        },
        "monthlyTrends": [
          {
            "month": "2024-01",
            "consultations": 25,
            "newPatients": 3,
            "efficiency": 96.2
          },
          {
            "month": "2023-12",
            "consultations": 20,
            "newPatients": 2,
            "efficiency": 95.0
          }
        ],
        "growthRate": 25.0
      },
      {
        "subspecialtyId": "obesidad",
        "subspecialtyName": "Obesidad",
        "specialtyId": "nutricion",
        "specialtyName": "Nutrición",
        "totalPatients": 7,
        "activePatients": 5,
        "inactivePatients": 2,
        "newPatientsThisMonth": 2,
        "patientsWithPlan": 5,
        "patientsWithoutPlan": 2,
        "totalConsultations": 43,
        "consultationsThisMonth": 20,
        "averageConsultationsPerPatient": 6.1,
        "efficiency": 93.0,
        "patientDistribution": {
          "byAge": {
            "18-30": 1,
            "31-45": 3,
            "46-60": 2,
            "60+": 1
          },
          "byGender": {
            "male": 2,
            "female": 5
          }
        },
        "monthlyTrends": [
          {
            "month": "2024-01",
            "consultations": 20,
            "newPatients": 2,
            "efficiency": 93.0
          },
          {
            "month": "2023-12",
            "consultations": 18,
            "newPatients": 1,
            "efficiency": 88.9
          }
        ],
        "growthRate": 11.1
      },
      {
        "subspecialtyId": "nutricion_clinica",
        "subspecialtyName": "Nutrición Clínica",
        "specialtyId": "endocrinologia",
        "specialtyName": "Endocrinología",
        "totalPatients": 5,
        "activePatients": 4,
        "inactivePatients": 1,
        "newPatientsThisMonth": 1,
        "patientsWithPlan": 3,
        "patientsWithoutPlan": 2,
        "totalConsultations": 30,
        "consultationsThisMonth": 15,
        "averageConsultationsPerPatient": 6.0,
        "efficiency": 90.0,
        "patientDistribution": {
          "byAge": {
            "18-30": 1,
            "31-45": 2,
            "46-60": 1,
            "60+": 1
          },
          "byGender": {
            "male": 2,
            "female": 3
          }
        },
        "monthlyTrends": [
          {
            "month": "2024-01",
            "consultations": 15,
            "newPatients": 1,
            "efficiency": 90.0
          },
          {
            "month": "2023-12",
            "consultations": 12,
            "newPatients": 0,
            "efficiency": 83.3
          }
        ],
        "growthRate": 25.0
      }
    ],
    "summary": {
      "totalPatients": 20,
      "activePatients": 16,
      "totalConsultations": 125,
      "averageEfficiency": 93.1,
      "mostActiveSubspecialty": "diabetes",
      "fastestGrowingSubspecialty": "diabetes"
    },
    "lastUpdated": "2024-01-15T14:30:00.000Z"
  }
}
```

## Códigos de estado y errores

| Código | Significado           | Descripción                      |
| ------ | --------------------- | -------------------------------- |
| 200    | OK                    | Resumen por subespecialidad encontrado |
| 400    | Bad Request           | ID inválido o subespecialidad inválida |
| 401    | Unauthorized          | Token faltante o inválido        |
| 403    | Forbidden             | No tienes permisos para consultar este resumen |
| 404    | Not Found             | Especialista o subespecialidad no encontrado |
| 500    | Internal Server Error | Error del servidor               |

## Notas útiles para el frontend

- **Permisos:** Solo el especialista propietario puede consultar el resumen por subespecialidad
- **Filtros opcionales:** Puede filtrar por `subspecialtyId` o `specialtyId`
- **Distribución de pacientes:** Incluye distribución por edad y género
- **Tendencias mensuales:** Array con métricas por mes para cada subespecialidad
- **Crecimiento:** Tasa de crecimiento comparada con el mes anterior
- **Eficiencia:** Porcentaje de consultas completadas vs. programadas por subespecialidad
- **Resumen general:** Métricas agregadas de todas las subespecialidades
- **Dashboard granular:** Ideal para mostrar rendimiento por área específica

## Consideraciones técnicas

- **Middleware:** Aplica `idPathParam` y `userOwnResources`
- **Validaciones:** Verificación de permisos y subespecialidad válida
- **Servicio:** Utiliza `getPatientsSummaryBySubspecialty` del servicio de especialistas
- **DTO:** Transformación usando `patientsSummarySubspecialtyToDTO` para la respuesta
- **Base de datos:** Consultas agregadas por subespecialidad con JOINs
- **Seguridad:** Verificación de propiedad del recurso
- **Cálculos:** Estadísticas calculadas dinámicamente por subespecialidad
- **Performance:** Consultas optimizadas con índices de subespecialidad
- **Relaciones:** Incluye datos de especialidad padre y distribución demográfica
- **Agregación:** Métricas calculadas por cada subespecialidad específica
