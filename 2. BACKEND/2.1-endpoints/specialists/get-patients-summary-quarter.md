# GET /specialists/patients/:id/summary/quarter

## Descripción funcional

Obtiene un resumen estadístico de los pacientes asignados a un especialista específico, agrupados por trimestre específico. Incluye métricas detalladas por trimestre, distribución de pacientes y rendimiento por período trimestral.

## Autorización

Requiere token Bearer válido. Solo el especialista propietario puede consultar el resumen por trimestre.

## Parámetros de ruta

- `id` (string): ID único del especialista

### Ejemplo
```
GET /specialists/patients/specialist123-e89b-12d3-a456-426614174000/summary/quarter
```

## Query parameters

- `quarter` (string, opcional): Trimestre específico en formato YYYY-Q. Si no se proporciona, usa el trimestre actual
- `startDate` (string, opcional): Fecha de inicio del trimestre en formato ISO (YYYY-MM-DD)
- `endDate` (string, opcional): Fecha de fin del trimestre en formato ISO (YYYY-MM-DD)

### Ejemplo
```
GET /specialists/patients/specialist123-e89b-12d3-a456-426614174000/summary/quarter?quarter=2024-Q1
GET /specialists/patients/specialist123-e89b-12d3-a456-426614174000/summary/quarter?startDate=2024-01-01&endDate=2024-03-31
```

## Body del request

No aplica

## Ejemplo de respuesta exitosa (200 OK)

```json
{
  "awsRequestId": "456e7890-e89b-12d3-a456-426614174000",
  "message": "Resumen por trimestre del especialista encontrado",
  "data": {
    "specialistId": "specialist123-e89b-12d3-a456-426614174000",
    "quarter": "2024-Q1",
    "quarterNumber": 1,
    "startDate": "2024-01-01",
    "endDate": "2024-03-31",
    "totalDays": 91,
    "workingDays": 65,
    "totalPatients": 25,
    "activePatients": 20,
    "inactivePatients": 5,
    "newPatientsThisQuarter": 12,
    "totalConsultations": 150,
    "consultationsThisQuarter": 150,
    "averageConsultationsPerDay": 1.65,
    "averageConsultationsPerPatient": 6.0,
    "consultationsCompleted": 135,
    "consultationsCancelled": 15,
    "consultationsRescheduled": 8,
    "efficiency": 90.0,
    "specialtyDistribution": {
      "nutricion": 15,
      "endocrinologia": 10
    },
    "subspecialtyDistribution": {
      "diabetes": 12,
      "obesidad": 8,
      "nutricion_clinica": 5
    },
    "ageDistribution": {
      "18-30": 6,
      "31-45": 8,
      "46-60": 7,
      "60+": 4
    },
    "genderDistribution": {
      "female": 15,
      "male": 8,
      "other": 2
    },
    "planDistribution": {
      "withPlan": 18,
      "withoutPlan": 7
    },
    "antiquityDistribution": {
      "0-1_months": 4,
      "1-3_months": 6,
      "3-6_months": 8,
      "6-12_months": 5,
      "12+_months": 2
    },
    "statusDistribution": {
      "active": 20,
      "inactive": 5
    },
    "monthlyBreakdown": [
      {
        "month": "2024-01",
        "monthName": "Enero",
        "consultations": 45,
        "newPatients": 4,
        "efficiency": 91.1
      },
      {
        "month": "2024-02",
        "monthName": "Febrero",
        "consultations": 52,
        "newPatients": 5,
        "efficiency": 88.5
      },
      {
        "month": "2024-03",
        "monthName": "Marzo",
        "consultations": 53,
        "newPatients": 3,
        "efficiency": 90.6
      }
    ],
    "weeklyBreakdown": [
      {
        "week": "2024-01",
        "startDate": "2024-01-01",
        "endDate": "2024-01-07",
        "consultations": 25,
        "newPatients": 2,
        "efficiency": 92.0
      },
      {
        "week": "2024-02",
        "startDate": "2024-01-08",
        "endDate": "2024-01-14",
        "consultations": 28,
        "newPatients": 3,
        "efficiency": 89.3
      }
    ],
    "quarterlyTrends": [
      {
        "quarter": "2023-Q4",
        "startDate": "2023-10-01",
        "endDate": "2023-12-31",
        "consultations": 120,
        "newPatients": 8,
        "efficiency": 87.5
      },
      {
        "quarter": "2023-Q3",
        "startDate": "2023-07-01",
        "endDate": "2023-09-30",
        "consultations": 110,
        "newPatients": 6,
        "efficiency": 85.5
      }
    ],
    "comparisonWithPreviousQuarter": {
      "previousQuarter": "2023-Q4",
      "consultationsGrowth": 25.0,
      "newPatientsGrowth": 50.0,
      "efficiencyGrowth": 2.9
    },
    "quarterlyGoals": {
      "targetConsultations": 180,
      "targetNewPatients": 15,
      "targetEfficiency": 88.0,
      "consultationsProgress": 83.3,
      "newPatientsProgress": 80.0,
      "efficiencyProgress": 102.3
    },
    "quarterlyAnalytics": {
      "peakMonth": "2024-03",
      "lowMonth": "2024-01",
      "peakConsultations": 53,
      "lowConsultations": 45,
      "quarterlyVariation": 17.8,
      "averageMonthlyGrowth": 8.9
    },
    "lastUpdated": "2024-01-15T14:30:00.000Z"
  }
}
```

## Códigos de estado y errores

| Código | Significado           | Descripción                      |
| ------ | --------------------- | -------------------------------- |
| 200    | OK                    | Resumen por trimestre encontrado |
| 400    | Bad Request           | ID inválido o parámetros de trimestre inválidos |
| 400    | Bad Request           | Formato de trimestre o fechas inválido |
| 401    | Unauthorized          | Token faltante o inválido        |
| 403    | Forbidden             | No tienes permisos para consultar este resumen |
| 404    | Not Found             | Especialista o trimestre no encontrado |
| 500    | Internal Server Error | Error del servidor               |

## Notas útiles para el frontend

- **Permisos:** Solo el especialista propietario puede consultar el resumen por trimestre
- **Parámetros opcionales:** Puede usar `quarter`, `startDate`/`endDate`, o ninguno (trimestre actual)
- **Formato de trimestre:** Usar formato YYYY-Q (ej: 2024-Q1)
- **Desglose mensual:** Array con métricas por cada mes del trimestre
- **Desglose semanal:** Array con métricas por cada semana del trimestre
- **Tendencias trimestrales:** Array con métricas de trimestres anteriores
- **Metas trimestrales:** Objetivos y progreso hacia las metas del trimestre
- **Comparación:** Métricas comparadas con el trimestre anterior
- **Análisis trimestral:** Identificación de meses pico y bajos
- **Distribución completa:** Incluye distribución por todos los criterios demográficos
- **Dashboard trimestral:** Ideal para mostrar métricas y tendencias trimestrales

## Consideraciones técnicas

- **Middleware:** Aplica `idPathParam` y `userOwnResources`
- **Validaciones:** Verificación de permisos y parámetros de trimestre válidos
- **Servicio:** Utiliza `getPatientsSummaryByQuarter` del servicio de especialistas
- **DTO:** Transformación usando `patientsSummaryQuarterToDTO` para la respuesta
- **Base de datos:** Consultas agregadas por trimestre con JOINs
- **Seguridad:** Verificación de propiedad del recurso
- **Cálculos:** Estadísticas calculadas dinámicamente para el trimestre específico
- **Performance:** Consultas optimizadas con índices de fecha
- **Relaciones:** Incluye datos de especialidades, demografía, planes y estado por trimestre
- **Agregación:** Métricas calculadas para el trimestre específico
- **Análisis:** Cálculos de comparación con trimestres anteriores, metas trimestrales y variación estacional
