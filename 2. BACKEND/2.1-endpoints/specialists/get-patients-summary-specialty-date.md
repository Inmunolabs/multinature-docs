# GET /specialists/patients/:id/summary/specialty-date

## Descripción funcional

Obtiene un resumen estadístico de los pacientes asignados a un especialista específico, agrupados por especialidad y fecha específica. Incluye métricas detalladas por especialidad para una fecha particular, distribución de pacientes y rendimiento por área médica en un día específico.

## Autorización

Requiere token Bearer válido. Solo el especialista propietario puede consultar el resumen por especialidad y fecha.

## Parámetros de ruta

- `id` (string): ID único del especialista

### Ejemplo
```
GET /specialists/patients/specialist123-e89b-12d3-a456-426614174000/summary/specialty-date
```

## Query parameters

- `specialtyId` (string, opcional): ID de la especialidad específica para filtrar
- `date` (string, opcional): Fecha específica en formato ISO (YYYY-MM-DD). Si no se proporciona, usa la fecha actual

### Ejemplo
```
GET /specialists/patients/specialist123-e89b-12d3-a456-426614174000/summary/specialty-date?specialtyId=nutricion
GET /specialists/patients/specialist123-e89b-12d3-a456-426614174000/summary/specialty-date?date=2024-01-15
GET /specialists/patients/specialist123-e89b-12d3-a456-426614174000/summary/specialty-date?specialtyId=nutricion&date=2024-01-15
```

## Body del request

No aplica

## Ejemplo de respuesta exitosa (200 OK)

```json
{
  "awsRequestId": "456e7890-e89b-12d3-a456-426614174000",
  "message": "Resumen por especialidad y fecha del especialista encontrado",
  "data": {
    "specialistId": "specialist123-e89b-12d3-a456-426614174000",
    "date": "2024-01-15",
    "dayOfWeek": "monday",
    "isWorkingDay": true,
    "workingHours": {
      "start": "09:00",
      "end": "17:00",
      "isAvailable": true
    },
    "totalSpecialties": 2,
    "specialties": [
      {
        "specialtyId": "nutricion",
        "specialtyName": "Nutrición",
        "totalPatients": 15,
        "activePatients": 12,
        "inactivePatients": 3,
        "newPatientsToday": 1,
        "totalConsultations": 5,
        "consultationsCompleted": 4,
        "consultationsPending": 1,
        "consultationsCancelled": 0,
        "efficiency": 80.0,
        "subspecialtyDistribution": {
          "diabetes": 3,
          "obesidad": 2
        },
        "ageDistribution": {
          "18-30": 2,
          "31-45": 4,
          "46-60": 3,
          "60+": 2
        },
        "genderDistribution": {
          "female": 9,
          "male": 4,
          "other": 2
        },
        "planDistribution": {
          "withPlan": 11,
          "withoutPlan": 4
        },
        "antiquityDistribution": {
          "0-1_months": 2,
          "1-3_months": 3,
          "3-6_months": 5,
          "6-12_months": 3,
          "12+_months": 2
        },
        "statusDistribution": {
          "active": 12,
          "inactive": 3
        },
        "consultationSchedule": [
          {
            "time": "09:00",
            "patientId": "patient123-e89b-12d3-a456-426614174000",
            "patientName": "Ana López",
            "subspecialty": "diabetes",
            "status": "completed",
            "duration": 60
          },
          {
            "time": "10:00",
            "patientId": "patient456-e89b-12d3-a456-426614174000",
            "patientName": "Carlos Martínez",
            "subspecialty": "obesidad",
            "status": "completed",
            "duration": 60
          },
          {
            "time": "11:00",
            "patientId": "patient789-e89b-12d3-a456-426614174000",
            "patientName": "María García",
            "subspecialty": "diabetes",
            "status": "completed",
            "duration": 60
          },
          {
            "time": "14:00",
            "patientId": "patient012-e89b-12d3-a456-426614174000",
            "patientName": "Luis Rodríguez",
            "subspecialty": "diabetes",
            "status": "completed",
            "duration": 60
          },
          {
            "time": "15:00",
            "patientId": "patient345-e89b-12d3-a456-426614174000",
            "patientName": "Elena Sánchez",
            "subspecialty": "obesidad",
            "status": "pending",
            "duration": 60
          }
        ],
        "dailyMetrics": {
          "totalConsultationTime": 300,
          "averageConsultationDuration": 60,
          "consultationDensity": "1 por hora",
          "breakTime": 60,
          "utilizationRate": 83.3
        }
      },
      {
        "specialtyId": "endocrinologia",
        "specialtyName": "Endocrinología",
        "totalPatients": 10,
        "activePatients": 8,
        "inactivePatients": 2,
        "newPatientsToday": 0,
        "totalConsultations": 3,
        "consultationsCompleted": 2,
        "consultationsPending": 1,
        "consultationsCancelled": 0,
        "efficiency": 66.7,
        "subspecialtyDistribution": {
          "nutricion_clinica": 3
        },
        "ageDistribution": {
          "18-30": 1,
          "31-45": 2,
          "46-60": 2,
          "60+": 1
        },
        "genderDistribution": {
          "female": 6,
          "male": 4,
          "other": 0
        },
        "planDistribution": {
          "withPlan": 7,
          "withoutPlan": 3
        },
        "antiquityDistribution": {
          "0-1_months": 2,
          "1-3_months": 3,
          "3-6_months": 3,
          "6-12_months": 2,
          "12+_months": 0
        },
        "statusDistribution": {
          "active": 8,
          "inactive": 2
        },
        "consultationSchedule": [
          {
            "time": "11:00",
            "patientId": "patient789-e89b-12d3-a456-426614174000",
            "patientName": "María García",
            "subspecialty": "nutricion_clinica",
            "status": "completed",
            "duration": 60
          },
          {
            "time": "16:00",
            "patientId": "patient678-e89b-12d3-a456-426614174000",
            "patientName": "Roberto Torres",
            "subspecialty": "nutricion_clinica",
            "status": "completed",
            "duration": 60
          },
          {
            "time": "17:00",
            "patientId": "patient234-e89b-12d3-a456-426614174000",
            "patientName": "Javier Moreno",
            "subspecialty": "nutricion_clinica",
            "status": "pending",
            "duration": 60
          }
        ],
        "dailyMetrics": {
          "totalConsultationTime": 180,
          "averageConsultationDuration": 60,
          "consultationDensity": "1 por 2 horas",
          "breakTime": 0,
          "utilizationRate": 100.0
        }
      }
    ],
    "summary": {
      "totalPatients": 25,
      "activePatients": 20,
      "totalConsultations": 8,
      "averageEfficiency": 75.0,
      "mostActiveSpecialty": "nutricion",
      "fastestGrowingSpecialty": "nutricion"
    },
    "specialtyDateAnalytics": {
      "specialtyEfficiencyComparison": {
        "nutricion": 80.0,
        "endocrinologia": 66.7
      },
      "specialtyUtilizationComparison": {
        "nutricion": 83.3,
        "endocrinologia": 100.0
      },
      "specialtyPatientDistribution": {
        "nutricion": "60%",
        "endocrinologia": "40%"
      }
    },
    "lastUpdated": "2024-01-15T14:30:00.000Z"
  }
}
```

## Códigos de estado y errores

| Código | Significado           | Descripción                      |
| ------ | --------------------- | -------------------------------- |
| 200    | OK                    | Resumen por especialidad y fecha encontrado |
| 400    | Bad Request           | ID inválido o parámetros inválidos |
| 400    | Bad Request           | Formato de fecha inválido        |
| 401    | Unauthorized          | Token faltante o inválido        |
| 403    | Forbidden             | No tienes permisos para consultar este resumen |
| 404    | Not Found             | Especialista, especialidad o fecha no encontrado |
| 500    | Internal Server Error | Error del servidor               |

## Notas útiles para el frontend

- **Permisos:** Solo el especialista propietario puede consultar el resumen por especialidad y fecha
- **Parámetros opcionales:** Puede usar `specialtyId`, `date`, ambos, o ninguno
- **Formato de fecha:** Usar formato ISO (YYYY-MM-DD)
- **Horario de trabajo:** Incluye horarios configurados para la fecha específica
- **Agenda por especialidad:** Array con consultas programadas organizadas por especialidad
- **Métricas por especialidad:** Estadísticas específicas del día para cada especialidad
- **Comparación entre especialidades:** Eficiencia y utilización comparadas
- **Distribución completa:** Cada especialidad incluye distribución por todos los criterios demográficos
- **Estado de consultas:** Conteo de consultas por especialidad (completadas, pendientes, canceladas)
- **Dashboard especializado por fecha:** Ideal para mostrar rendimiento por especialidad en un día específico

## Consideraciones técnicas

- **Middleware:** Aplica `idPathParam` y `userOwnResources`
- **Validaciones:** Verificación de permisos y parámetros válidos
- **Servicio:** Utiliza `getPatientsSummaryBySpecialtyDate` del servicio de especialistas
- **DTO:** Transformación usando `patientsSummarySpecialtyDateToDTO` para la respuesta
- **Base de datos:** Consultas agregadas por especialidad y fecha con JOINs
- **Seguridad:** Verificación de propiedad del recurso
- **Cálculos:** Estadísticas calculadas dinámicamente por especialidad para la fecha específica
- **Performance:** Consultas optimizadas con índices de especialidad y fecha
- **Relaciones:** Incluye datos demográficos, planes, estado y antigüedad por especialidad y fecha
- **Agregación:** Métricas calculadas para cada especialidad en la fecha específica
- **Análisis:** Cálculos de comparación entre especialidades y métricas de utilización
