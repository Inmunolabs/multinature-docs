# GET /specialists/patients/:id/summary/year

## Descripción funcional

Obtiene un resumen estadístico de los pacientes asignados a un especialista específico, agrupados por año específico. Incluye métricas detalladas por año, distribución de pacientes y rendimiento por período anual.

## Autorización

Requiere token Bearer válido. Solo el especialista propietario puede consultar el resumen por año.

## Parámetros de ruta

- `id` (string): ID único del especialista

### Ejemplo
```
GET /specialists/patients/specialist123-e89b-12d3-a456-426614174000/summary/year
```

## Query parameters

- `year` (string, opcional): Año específico en formato YYYY. Si no se proporciona, usa el año actual
- `startDate` (string, opcional): Fecha de inicio del año en formato ISO (YYYY-MM-DD)
- `endDate` (string, opcional): Fecha de fin del año en formato ISO (YYYY-MM-DD)

### Ejemplo
```
GET /specialists/patients/specialist123-e89b-12d3-a456-426614174000/summary/year?year=2024
GET /specialists/patients/specialist123-e89b-12d3-a456-426614174000/summary/year?startDate=2024-01-01&endDate=2024-12-31
```

## Body del request

No aplica

## Ejemplo de respuesta exitosa (200 OK)

```json
{
  "awsRequestId": "456e7890-e89b-12d3-a456-426614174000",
  "message": "Resumen por año del especialista encontrado",
  "data": {
    "specialistId": "specialist123-e89b-12d3-a456-426614174000",
    "year": 2024,
    "startDate": "2024-01-01",
    "endDate": "2024-12-31",
    "totalDays": 366,
    "workingDays": 261,
    "totalPatients": 25,
    "activePatients": 20,
    "inactivePatients": 5,
    "newPatientsThisYear": 25,
    "totalConsultations": 600,
    "consultationsThisYear": 600,
    "averageConsultationsPerDay": 1.64,
    "averageConsultationsPerPatient": 24.0,
    "consultationsCompleted": 540,
    "consultationsCancelled": 60,
    "consultationsRescheduled": 30,
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
      },
      {
        "month": "2024-04",
        "monthName": "Abril",
        "consultations": 48,
        "newPatients": 2,
        "efficiency": 89.6
      },
      {
        "month": "2024-05",
        "monthName": "Mayo",
        "consultations": 55,
        "newPatients": 4,
        "efficiency": 92.7
      },
      {
        "month": "2024-06",
        "monthName": "Junio",
        "consultations": 50,
        "newPatients": 3,
        "efficiency": 90.0
      },
      {
        "month": "2024-07",
        "monthName": "Julio",
        "consultations": 47,
        "newPatients": 2,
        "efficiency": 89.4
      },
      {
        "month": "2024-08",
        "monthName": "Agosto",
        "consultations": 43,
        "newPatients": 1,
        "efficiency": 88.4
      },
      {
        "month": "2024-09",
        "monthName": "Septiembre",
        "consultations": 51,
        "newPatients": 3,
        "efficiency": 90.2
      },
      {
        "month": "2024-10",
        "monthName": "Octubre",
        "consultations": 54,
        "newPatients": 4,
        "efficiency": 92.6
      },
      {
        "month": "2024-11",
        "monthName": "Noviembre",
        "consultations": 52,
        "newPatients": 3,
        "efficiency": 90.4
      },
      {
        "month": "2024-12",
        "monthName": "Diciembre",
        "consultations": 40,
        "newPatients": 1,
        "efficiency": 87.5
      }
    ],
    "quarterlyBreakdown": [
      {
        "quarter": "Q1",
        "startDate": "2024-01-01",
        "endDate": "2024-03-31",
        "consultations": 150,
        "newPatients": 12,
        "efficiency": 90.0
      },
      {
        "quarter": "Q2",
        "startDate": "2024-04-01",
        "endDate": "2024-06-30",
        "consultations": 153,
        "newPatients": 9,
        "efficiency": 90.8
      },
      {
        "quarter": "Q3",
        "startDate": "2024-07-01",
        "endDate": "2024-09-30",
        "consultations": 141,
        "newPatients": 6,
        "efficiency": 89.4
      },
      {
        "quarter": "Q4",
        "startDate": "2024-10-01",
        "endDate": "2024-12-31",
        "consultations": 156,
        "newPatients": 8,
        "efficiency": 90.4
      }
    ],
    "yearlyTrends": [
      {
        "year": 2023,
        "startDate": "2023-01-01",
        "endDate": "2023-12-31",
        "consultations": 480,
        "newPatients": 18,
        "efficiency": 87.5
      },
      {
        "year": 2022,
        "startDate": "2022-01-01",
        "endDate": "2022-12-31",
        "consultations": 420,
        "newPatients": 15,
        "efficiency": 85.7
      }
    ],
    "comparisonWithPreviousYear": {
      "previousYear": 2023,
      "consultationsGrowth": 25.0,
      "newPatientsGrowth": 38.9,
      "efficiencyGrowth": 2.9
    },
    "yearlyGoals": {
      "targetConsultations": 720,
      "targetNewPatients": 30,
      "targetEfficiency": 88.0,
      "consultationsProgress": 83.3,
      "newPatientsProgress": 83.3,
      "efficiencyProgress": 102.3
    },
    "yearlyAnalytics": {
      "peakMonth": "2024-05",
      "lowMonth": "2024-12",
      "peakConsultations": 55,
      "lowConsultations": 40,
      "yearlyVariation": 37.5,
      "averageMonthlyGrowth": 1.2,
      "seasonalPatterns": {
        "spring": "peak",
        "summer": "low",
        "fall": "peak",
        "winter": "low"
      }
    },
    "lastUpdated": "2024-01-15T14:30:00.000Z"
  }
}
```

## Códigos de estado y errores

| Código | Significado           | Descripción                      |
| ------ | --------------------- | -------------------------------- |
| 200    | OK                    | Resumen por año encontrado       |
| 400    | Bad Request           | ID inválido o parámetros de año inválidos |
| 400    | Bad Request           | Formato de año o fechas inválido |
| 401    | Unauthorized          | Token faltante o inválido        |
| 403    | Forbidden             | No tienes permisos para consultar este resumen |
| 404    | Not Found             | Especialista o año no encontrado |
| 500    | Internal Server Error | Error del servidor               |

## Notas útiles para el frontend

- **Permisos:** Solo el especialista propietario puede consultar el resumen por año
- **Parámetros opcionales:** Puede usar `year`, `startDate`/`endDate`, o ninguno (año actual)
- **Formato de año:** Usar formato YYYY (ej: 2024)
- **Desglose mensual:** Array con métricas por cada mes del año
- **Desglose trimestral:** Array con métricas por cada trimestre del año
- **Tendencias anuales:** Array con métricas de años anteriores
- **Metas anuales:** Objetivos y progreso hacia las metas del año
- **Comparación:** Métricas comparadas con el año anterior
- **Análisis anual:** Identificación de meses pico y bajos, patrones estacionales
- **Distribución completa:** Incluye distribución por todos los criterios demográficos
- **Dashboard anual:** Ideal para mostrar métricas y tendencias anuales

## Consideraciones técnicas

- **Middleware:** Aplica `idPathParam` y `userOwnResources`
- **Validaciones:** Verificación de permisos y parámetros de año válidos
- **Servicio:** Utiliza `getPatientsSummaryByYear` del servicio de especialistas
- **DTO:** Transformación usando `patientsSummaryYearToDTO` para la respuesta
- **Base de datos:** Consultas agregadas por año con JOINs
- **Seguridad:** Verificación de propiedad del recurso
- **Cálculos:** Estadísticas calculadas dinámicamente para el año específico
- **Performance:** Consultas optimizadas con índices de fecha
- **Relaciones:** Incluye datos de especialidades, demografía, planes y estado por año
- **Agregación:** Métricas calculadas para el año específico
- **Análisis:** Cálculos de comparación con años anteriores, metas anuales, patrones estacionales y variación anual
