# GET /specialists/patients/:id/summary/consultation

## Descripción funcional

Obtiene un resumen estadístico de los pacientes asignados a un especialista específico, agrupados por estado de consulta (completadas, pendientes, canceladas). Incluye métricas detalladas por cada estado de consulta, distribución de pacientes y rendimiento por segmento de consulta.

## Autorización

Requiere token Bearer válido. Solo el especialista propietario puede consultar el resumen por consulta.

## Parámetros de ruta

- `id` (string): ID único del especialista

### Ejemplo
```
GET /specialists/patients/specialist123-e89b-12d3-a456-426614174000/summary/consultation
```

## Query parameters

- `consultationStatus` (string, opcional): Estado de consulta específico. Si no se proporciona, devuelve todos los estados
- `specialtyId` (string, opcional): ID de la especialidad para filtrar por consulta y especialidad

### Ejemplo
```
GET /specialists/patients/specialist123-e89b-12d3-a456-426614174000/summary/consultation?consultationStatus=completed
GET /specialists/patients/specialist123-e89b-12d3-a456-426614174000/summary/consultation?specialtyId=nutricion
```

## Body del request

No aplica

## Ejemplo de respuesta exitosa (200 OK)

```json
{
  "awsRequestId": "456e7890-e89b-12d3-a456-426614174000",
  "message": "Resumen por consulta del especialista encontrado",
  "data": {
    "specialistId": "specialist123-e89b-12d3-a456-426614174000",
    "totalConsultationStatusGroups": 3,
    "consultationStatusGroups": [
      {
        "consultationStatus": "completed",
        "statusName": "Completadas",
        "totalConsultations": 142,
        "consultationsThisMonth": 68,
        "totalPatients": 22,
        "activePatients": 18,
        "inactivePatients": 4,
        "efficiency": 100.0,
        "specialtyDistribution": {
          "nutricion": 13,
          "endocrinologia": 9
        },
        "subspecialtyDistribution": {
          "diabetes": 10,
          "obesidad": 8,
          "nutricion_clinica": 4
        },
        "ageDistribution": {
          "18-30": 5,
          "31-45": 7,
          "46-60": 6,
          "60+": 4
        },
        "genderDistribution": {
          "female": 13,
          "male": 7,
          "other": 2
        },
        "planDistribution": {
          "withPlan": 16,
          "withoutPlan": 6
        },
        "antiquityDistribution": {
          "0-1_months": 4,
          "1-3_months": 5,
          "3-6_months": 6,
          "6-12_months": 4,
          "12+_months": 3
        },
        "monthlyTrends": [
          {
            "month": "2024-01",
            "consultations": 68,
            "patients": 22,
            "efficiency": 100.0
          },
          {
            "month": "2023-12",
            "consultations": 58,
            "patients": 20,
            "efficiency": 100.0
          }
        ],
        "growthRate": 17.2
      },
      {
        "consultationStatus": "pending",
        "statusName": "Pendientes",
        "totalConsultations": 8,
        "consultationsThisMonth": 8,
        "totalPatients": 6,
        "activePatients": 6,
        "inactivePatients": 0,
        "efficiency": 0.0,
        "specialtyDistribution": {
          "nutricion": 4,
          "endocrinologia": 2
        },
        "subspecialtyDistribution": {
          "diabetes": 3,
          "obesidad": 2,
          "nutricion_clinica": 1
        },
        "ageDistribution": {
          "18-30": 1,
          "31-45": 2,
          "46-60": 2,
          "60+": 1
        },
        "genderDistribution": {
          "female": 4,
          "male": 2,
          "other": 0
        },
        "planDistribution": {
          "withPlan": 4,
          "withoutPlan": 2
        },
        "antiquityDistribution": {
          "0-1_months": 1,
          "1-3_months": 2,
          "3-6_months": 2,
          "6-12_months": 1,
          "12+_months": 0
        },
        "monthlyTrends": [
          {
            "month": "2024-01",
            "consultations": 8,
            "patients": 6,
            "efficiency": 0.0
          },
          {
            "month": "2023-12",
            "consultations": 5,
            "patients": 4,
            "efficiency": 0.0
          }
        ],
        "growthRate": 60.0
      },
      {
        "consultationStatus": "cancelled",
        "statusName": "Canceladas",
        "totalConsultations": 5,
        "consultationsThisMonth": 2,
        "totalPatients": 3,
        "activePatients": 2,
        "inactivePatients": 1,
        "efficiency": 0.0,
        "specialtyDistribution": {
          "nutricion": 2,
          "endocrinologia": 1
        },
        "subspecialtyDistribution": {
          "diabetes": 1,
          "obesidad": 1,
          "nutricion_clinica": 1
        },
        "ageDistribution": {
          "18-30": 0,
          "31-45": 1,
          "46-60": 1,
          "60+": 1
        },
        "genderDistribution": {
          "female": 2,
          "male": 1,
          "other": 0
        },
        "planDistribution": {
          "withPlan": 2,
          "withoutPlan": 1
        },
        "antiquityDistribution": {
          "0-1_months": 0,
          "1-3_months": 1,
          "3-6_months": 1,
          "6-12_months": 1,
          "12+_months": 0
        },
        "monthlyTrends": [
          {
            "month": "2024-01",
            "consultations": 2,
            "patients": 3,
            "efficiency": 0.0
          },
          {
            "month": "2023-12",
            "consultations": 3,
            "patients": 2,
            "efficiency": 0.0
          }
        ],
        "growthRate": -33.3
      }
    ],
    "summary": {
      "totalConsultations": 155,
      "totalPatients": 25,
      "averageEfficiency": 91.6,
      "completedConsultationsPercentage": 91.6,
      "pendingConsultationsPercentage": 5.2,
      "cancelledConsultationsPercentage": 3.2
    },
    "consultationAnalytics": {
      "consultationStatusDistribution": {
        "completed": "91.6%",
        "pending": "5.2%",
        "cancelled": "3.2%"
      },
      "consultationEfficiencyByStatus": {
        "completed": 100.0,
        "pending": 0.0,
        "cancelled": 0.0
      },
      "consultationTrends": {
        "completionRate": 91.6,
        "cancellationRate": 3.2,
        "reschedulingRate": 5.2
      },
      "consultationQuality": {
        "averageConsultationDuration": 58.5,
        "consultationsPerPatient": 6.2,
        "consultationFrequency": "semanal"
      }
    },
    "lastUpdated": "2024-01-15T14:30:00.000Z"
  }
}
```

## Códigos de estado y errores

| Código | Significado           | Descripción                      |
| ------ | --------------------- | -------------------------------- |
| 200    | OK                    | Resumen por consulta encontrado  |
| 400    | Bad Request           | ID inválido o estado de consulta inválido |
| 401    | Unauthorized          | Token faltante o inválido        |
| 403    | Forbidden             | No tienes permisos para consultar este resumen |
| 404    | Not Found             | Especialista o estado de consulta no encontrado |
| 500    | Internal Server Error | Error del servidor               |

## Notas útiles para el frontend

- **Permisos:** Solo el especialista propietario puede consultar el resumen por consulta
- **Filtros opcionales:** Puede filtrar por `consultationStatus` o `specialtyId`
- **Estados de consulta:** Valores estándar: `completed` (completadas), `pending` (pendientes), `cancelled` (canceladas)
- **Distribución demográfica:** Cada estado incluye distribución por edad, género y antigüedad
- **Distribución de planes:** Cada estado incluye distribución por estado de plan
- **Tendencias mensuales:** Array con métricas por mes para cada estado de consulta
- **Crecimiento:** Tasa de crecimiento comparada con el mes anterior
- **Eficiencia:** Porcentaje de consultas completadas vs. programadas por estado
- **Análisis de consultas:** Métricas de calidad, frecuencia y tendencias
- **Resumen general:** Métricas agregadas de todos los estados de consulta
- **Dashboard de consultas:** Ideal para mostrar rendimiento por segmento de consulta

## Consideraciones técnicas

- **Middleware:** Aplica `idPathParam` y `userOwnResources`
- **Validaciones:** Verificación de permisos y estado de consulta válido
- **Servicio:** Utiliza `getPatientsSummaryByConsultation` del servicio de especialistas
- **DTO:** Transformación usando `patientsSummaryConsultationToDTO` para la respuesta
- **Base de datos:** Consultas agregadas por estado de consulta con JOINs
- **Seguridad:** Verificación de propiedad del recurso
- **Cálculos:** Estadísticas calculadas dinámicamente por estado de consulta
- **Performance:** Consultas optimizadas con índices de estado de consulta
- **Relaciones:** Incluye datos de especialidades, demografía, planes y antigüedad por estado de consulta
- **Agregación:** Métricas calculadas por cada estado de consulta específico
- **Análisis:** Cálculos de calidad, frecuencia y tendencias de consultas
