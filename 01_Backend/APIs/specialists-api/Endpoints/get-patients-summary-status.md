# GET /specialists/patients/:id/summary/status

## Descripción funcional

Obtiene un resumen estadístico de los pacientes asignados a un especialista específico, agrupados por estado (activo vs. inactivo). Incluye métricas detalladas por cada estado, distribución de pacientes y rendimiento por segmento de actividad.

## Autorización

Requiere token Bearer válido. Solo el especialista propietario puede consultar el resumen por estado.

## Parámetros de ruta

- `id` (string): ID único del especialista

### Ejemplo
```
GET /specialists/patients/specialist123-e89b-12d3-a456-426614174000/summary/status
```

## Query parameters

- `status` (string, opcional): Estado específico. Si no se proporciona, devuelve ambos estados
- `specialtyId` (string, opcional): ID de la especialidad para filtrar por estado y especialidad

### Ejemplo
```
GET /specialists/patients/specialist123-e89b-12d3-a456-426614174000/summary/status?status=active
GET /specialists/patients/specialist123-e89b-12d3-a456-426614174000/summary/status?specialtyId=nutricion
```

## Body del request

No aplica

## Ejemplo de respuesta exitosa (200 OK)

```json
{
  "awsRequestId": "456e7890-e89b-12d3-a456-426614174000",
  "message": "Resumen por estado del especialista encontrado",
  "data": {
    "specialistId": "specialist123-e89b-12d3-a456-426614174000",
    "totalStatusGroups": 2,
    "statusGroups": [
      {
        "status": "active",
        "statusName": "Activo",
        "totalPatients": 20,
        "newPatientsThisMonth": 8,
        "totalConsultations": 130,
        "consultationsThisMonth": 62,
        "averageConsultationsPerPatient": 6.5,
        "efficiency": 95.4,
        "specialtyDistribution": {
          "nutricion": 12,
          "endocrinologia": 8
        },
        "subspecialtyDistribution": {
          "diabetes": 9,
          "obesidad": 7,
          "nutricion_clinica": 4
        },
        "ageDistribution": {
          "18-30": 5,
          "31-45": 7,
          "46-60": 5,
          "60+": 3
        },
        "genderDistribution": {
          "female": 12,
          "male": 6,
          "other": 2
        },
        "planDistribution": {
          "withPlan": 15,
          "withoutPlan": 5
        },
        "antiquityDistribution": {
          "0-1_months": 4,
          "1-3_months": 5,
          "3-6_months": 6,
          "6-12_months": 3,
          "12+_months": 2
        },
        "monthlyTrends": [
          {
            "month": "2024-01",
            "consultations": 62,
            "newPatients": 8,
            "efficiency": 95.4
          },
          {
            "month": "2023-12",
            "consultations": 52,
            "newPatients": 6,
            "efficiency": 94.2
          }
        ],
        "growthRate": 19.2
      },
      {
        "status": "inactive",
        "statusName": "Inactivo",
        "totalPatients": 5,
        "newPatientsThisMonth": 0,
        "totalConsultations": 25,
        "consultationsThisMonth": 0,
        "averageConsultationsPerPatient": 5.0,
        "efficiency": 80.0,
        "specialtyDistribution": {
          "nutricion": 3,
          "endocrinologia": 2
        },
        "subspecialtyDistribution": {
          "diabetes": 2,
          "obesidad": 2,
          "nutricion_clinica": 1
        },
        "ageDistribution": {
          "18-30": 1,
          "31-45": 1,
          "46-60": 2,
          "60+": 1
        },
        "genderDistribution": {
          "female": 3,
          "male": 2,
          "other": 0
        },
        "planDistribution": {
          "withPlan": 3,
          "withoutPlan": 2
        },
        "antiquityDistribution": {
          "0-1_months": 0,
          "1-3_months": 1,
          "3-6_months": 2,
          "6-12_months": 2,
          "12+_months": 0
        },
        "monthlyTrends": [
          {
            "month": "2024-01",
            "consultations": 0,
            "newPatients": 0,
            "efficiency": 0.0
          },
          {
            "month": "2023-12",
            "consultations": 8,
            "newPatients": 0,
            "efficiency": 75.0
          }
        ],
        "growthRate": -100.0
      }
    ],
    "summary": {
      "totalPatients": 25,
      "totalConsultations": 155,
      "averageEfficiency": 92.1,
      "activePatientsPercentage": 80.0,
      "inactivePatientsPercentage": 20.0,
      "statusEfficiencyGap": 15.4
    },
    "statusAnalytics": {
      "statusDistribution": {
        "active": "80%",
        "inactive": "20%"
      },
      "statusEfficiencyComparison": {
        "active": 95.4,
        "inactive": 80.0
      },
      "statusRetentionRate": {
        "active": 100.0,
        "inactive": 0.0
      },
      "statusConversionRate": {
        "inactiveToActive": 15.0,
        "activeToInactive": 5.0
      }
    },
    "lastUpdated": "2024-01-15T14:30:00.000Z"
  }
}
```

## Códigos de estado y errores

| Código | Significado           | Descripción                      |
| ------ | --------------------- | -------------------------------- |
| 200    | OK                    | Resumen por estado encontrado    |
| 400    | Bad Request           | ID inválido o estado inválido    |
| 401    | Unauthorized          | Token faltante o inválido        |
| 403    | Forbidden             | No tienes permisos para consultar este resumen |
| 404    | Not Found             | Especialista o estado no encontrado |
| 500    | Internal Server Error | Error del servidor               |

## Notas útiles para el frontend

- **Permisos:** Solo el especialista propietario puede consultar el resumen por estado
- **Filtros opcionales:** Puede filtrar por `status` o `specialtyId`
- **Estados:** Valores estándar: `active` (activo) y `inactive` (inactivo)
- **Distribución demográfica:** Cada estado incluye distribución por edad, género y antigüedad
- **Distribución de planes:** Cada estado incluye distribución por estado de plan
- **Tendencias mensuales:** Array con métricas por mes para cada estado
- **Crecimiento:** Tasa de crecimiento comparada con el mes anterior
- **Eficiencia:** Porcentaje de consultas completadas vs. programadas por estado
- **Análisis de estado:** Métricas de retención, conversión y comparación de eficiencia
- **Resumen general:** Métricas agregadas de todos los estados
- **Dashboard de estado:** Ideal para mostrar rendimiento por segmento de actividad

## Consideraciones técnicas

- **Middleware:** Aplica `idPathParam` y `userOwnResources`
- **Validaciones:** Verificación de permisos y estado válido
- **Servicio:** Utiliza `getPatientsSummaryByStatus` del servicio de especialistas
- **DTO:** Transformación usando `patientsSummaryStatusToDTO` para la respuesta
- **Base de datos:** Consultas agregadas por estado con JOINs
- **Seguridad:** Verificación de propiedad del recurso
- **Cálculos:** Estadísticas calculadas dinámicamente por estado
- **Performance:** Consultas optimizadas con índices de estado
- **Relaciones:** Incluye datos de especialidades, demografía, planes y antigüedad por estado
- **Agregación:** Métricas calculadas por cada estado específico
- **Análisis:** Cálculos de retención, conversión y comparación de eficiencia entre estados
