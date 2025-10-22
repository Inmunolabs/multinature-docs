# GET /specialists/patients/:id/summary/plan

## Descripción funcional

Obtiene un resumen estadístico de los pacientes asignados a un especialista específico, agrupados por estado de plan (con plan activo vs. sin plan). Incluye métricas detalladas por cada grupo, distribución de planes y rendimiento por segmento de planificación.

## Autorización

Requiere token Bearer válido. Solo el especialista propietario puede consultar el resumen por plan.

## Parámetros de ruta

- `id` (string): ID único del especialista

### Ejemplo
```
GET /specialists/patients/specialist123-e89b-12d3-a456-426614174000/summary/plan
```

## Query parameters

- `hasPlan` (boolean, opcional): Estado del plan específico. Si no se proporciona, devuelve ambos estados
- `specialtyId` (string, opcional): ID de la especialidad para filtrar por plan y especialidad

### Ejemplo
```
GET /specialists/patients/specialist123-e89b-12d3-a456-426614174000/summary/plan?hasPlan=true
GET /specialists/patients/specialist123-e89b-12d3-a456-426614174000/summary/plan?specialtyId=nutricion
```

## Body del request

No aplica

## Ejemplo de respuesta exitosa (200 OK)

```json
{
  "awsRequestId": "456e7890-e89b-12d3-a456-426614174000",
  "message": "Resumen por plan del especialista encontrado",
  "data": {
    "specialistId": "specialist123-e89b-12d3-a456-426614174000",
    "totalPlanGroups": 2,
    "planGroups": [
      {
        "hasPlan": true,
        "planStatus": "Con Plan Activo",
        "totalPatients": 18,
        "activePatients": 15,
        "inactivePatients": 3,
        "newPatientsThisMonth": 6,
        "totalConsultations": 120,
        "consultationsThisMonth": 58,
        "averageConsultationsPerPatient": 6.7,
        "efficiency": 95.8,
        "specialtyDistribution": {
          "nutricion": 11,
          "endocrinologia": 7
        },
        "subspecialtyDistribution": {
          "diabetes": 8,
          "obesidad": 6,
          "nutricion_clinica": 4
        },
        "ageDistribution": {
          "18-30": 4,
          "31-45": 6,
          "46-60": 5,
          "60+": 3
        },
        "genderDistribution": {
          "female": 11,
          "male": 5,
          "other": 2
        },
        "planTypes": {
          "mensual": 12,
          "trimestral": 4,
          "anual": 2
        },
        "monthlyTrends": [
          {
            "month": "2024-01",
            "consultations": 58,
            "newPatients": 6,
            "efficiency": 95.8
          },
          {
            "month": "2023-12",
            "consultations": 48,
            "newPatients": 4,
            "efficiency": 93.8
          }
        ],
        "growthRate": 20.8
      },
      {
        "hasPlan": false,
        "planStatus": "Sin Plan Activo",
        "totalPatients": 7,
        "activePatients": 5,
        "inactivePatients": 2,
        "newPatientsThisMonth": 2,
        "totalConsultations": 35,
        "consultationsThisMonth": 17,
        "averageConsultationsPerPatient": 5.0,
        "efficiency": 82.9,
        "specialtyDistribution": {
          "nutricion": 4,
          "endocrinologia": 3
        },
        "subspecialtyDistribution": {
          "diabetes": 3,
          "obesidad": 2,
          "nutricion_clinica": 2
        },
        "ageDistribution": {
          "18-30": 2,
          "31-45": 2,
          "46-60": 2,
          "60+": 1
        },
        "genderDistribution": {
          "female": 4,
          "male": 3,
          "other": 0
        },
        "planTypes": {
          "mensual": 0,
          "trimestral": 0,
          "anual": 0
        },
        "monthlyTrends": [
          {
            "month": "2024-01",
            "consultations": 17,
            "newPatients": 2,
            "efficiency": 82.9
          },
          {
            "month": "2023-12",
            "consultations": 15,
            "newPatients": 1,
            "efficiency": 80.0
          }
        ],
        "growthRate": 13.3
      }
    ],
    "summary": {
      "totalPatients": 25,
      "activePatients": 20,
      "totalConsultations": 155,
      "averageEfficiency": 92.1,
      "patientsWithPlanPercentage": 72.0,
      "patientsWithoutPlanPercentage": 28.0,
      "planEfficiencyGap": 12.9
    },
    "planAnalytics": {
      "planRetentionRate": 83.3,
      "averagePlanDuration": 4.2,
      "planConversionRate": 25.0,
      "mostPopularPlanType": "mensual",
      "planEfficiencyCorrelation": 0.78
    },
    "lastUpdated": "2024-01-15T14:30:00.000Z"
  }
}
```

## Códigos de estado y errores

| Código | Significado           | Descripción                      |
| ------ | --------------------- | -------------------------------- |
| 200    | OK                    | Resumen por plan encontrado      |
| 400    | Bad Request           | ID inválido o estado de plan inválido |
| 401    | Unauthorized          | Token faltante o inválido        |
| 403    | Forbidden             | No tienes permisos para consultar este resumen |
| 404    | Not Found             | Especialista o estado de plan no encontrado |
| 500    | Internal Server Error | Error del servidor               |

## Notas útiles para el frontend

- **Permisos:** Solo el especialista propietario puede consultar el resumen por plan
- **Filtros opcionales:** Puede filtrar por `hasPlan` o `specialtyId`
- **Estados de plan:** `true` (con plan activo) y `false` (sin plan activo)
- **Distribución demográfica:** Cada grupo incluye distribución por edad y género
- **Tipos de plan:** Distribución por duración del plan (mensual, trimestral, anual)
- **Tendencias mensuales:** Array con métricas por mes para cada grupo de plan
- **Crecimiento:** Tasa de crecimiento comparada con el mes anterior
- **Eficiencia:** Porcentaje de consultas completadas vs. programadas por grupo de plan
- **Análisis de planes:** Métricas de retención, conversión y correlación
- **Dashboard de planes:** Ideal para mostrar rendimiento por segmento de planificación

## Consideraciones técnicas

- **Middleware:** Aplica `idPathParam` y `userOwnResources`
- **Validaciones:** Verificación de permisos y estado de plan válido
- **Servicio:** Utiliza `getPatientsSummaryByPlan` del servicio de especialistas
- **DTO:** Transformación usando `patientsSummaryPlanToDTO` para la respuesta
- **Base de datos:** Consultas agregadas por estado de plan con JOINs
- **Seguridad:** Verificación de propiedad del recurso
- **Cálculos:** Estadísticas calculadas dinámicamente por grupo de plan
- **Performance:** Consultas optimizadas con índices de plan
- **Relaciones:** Incluye datos de especialidades, demografía y tipos de plan
- **Agregación:** Métricas calculadas por cada estado de plan específico
- **Análisis:** Cálculos de retención, conversión y correlación de eficiencia
