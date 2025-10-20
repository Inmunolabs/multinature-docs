# GET /specialists/patients/:id/summary/week

## Descripción funcional

Obtiene un resumen estadístico de los pacientes asignados a un especialista específico, agrupados por semana específica. Incluye métricas detalladas por semana, distribución de pacientes y rendimiento por período semanal.

## Autorización

Requiere token Bearer válido. Solo el especialista propietario puede consultar el resumen por semana.

## Parámetros de ruta

- `id` (string): ID único del especialista

### Ejemplo
```
GET /specialists/patients/specialist123-e89b-12d3-a456-426614174000/summary/week
```

## Query parameters

- `week` (string, opcional): Semana específica en formato YYYY-WW. Si no se proporciona, usa la semana actual
- `startDate` (string, opcional): Fecha de inicio de la semana en formato ISO (YYYY-MM-DD)
- `endDate` (string, opcional): Fecha de fin de la semana en formato ISO (YYYY-MM-DD)

### Ejemplo
```
GET /specialists/patients/specialist123-e89b-12d3-a456-426614174000/summary/week?week=2024-03
GET /specialists/patients/specialist123-e89b-12d3-a456-426614174000/summary/week?startDate=2024-01-15&endDate=2024-01-21
```

## Body del request

No aplica

## Ejemplo de respuesta exitosa (200 OK)

```json
{
  "awsRequestId": "456e7890-e89b-12d3-a456-426614174000",
  "message": "Resumen por semana del especialista encontrado",
  "data": {
    "specialistId": "specialist123-e89b-12d3-a456-426614174000",
    "week": "2024-03",
    "weekNumber": 3,
    "startDate": "2024-01-15",
    "endDate": "2024-01-21",
    "totalDays": 7,
    "workingDays": 5,
    "totalPatients": 25,
    "activePatients": 20,
    "inactivePatients": 5,
    "newPatientsThisWeek": 3,
    "totalConsultations": 35,
    "consultationsThisWeek": 35,
    "averageConsultationsPerDay": 5.0,
    "averageConsultationsPerPatient": 1.4,
    "consultationsCompleted": 32,
    "consultationsCancelled": 3,
    "consultationsRescheduled": 2,
    "efficiency": 91.4,
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
    "dailyBreakdown": [
      {
        "date": "2024-01-15",
        "dayOfWeek": "monday",
        "isWorkingDay": true,
        "consultations": 8,
        "newPatients": 1,
        "efficiency": 87.5
      },
      {
        "date": "2024-01-16",
        "dayOfWeek": "tuesday",
        "isWorkingDay": true,
        "consultations": 7,
        "newPatients": 1,
        "efficiency": 100.0
      },
      {
        "date": "2024-01-17",
        "dayOfWeek": "wednesday",
        "isWorkingDay": true,
        "consultations": 6,
        "newPatients": 0,
        "efficiency": 83.3
      },
      {
        "date": "2024-01-18",
        "dayOfWeek": "thursday",
        "isWorkingDay": true,
        "consultations": 8,
        "newPatients": 1,
        "efficiency": 87.5
      },
      {
        "date": "2024-01-19",
        "dayOfWeek": "friday",
        "isWorkingDay": true,
        "consultations": 6,
        "newPatients": 0,
        "efficiency": 100.0
      },
      {
        "date": "2024-01-20",
        "dayOfWeek": "saturday",
        "isWorkingDay": false,
        "consultations": 0,
        "newPatients": 0,
        "efficiency": 0.0
      },
      {
        "date": "2024-01-21",
        "dayOfWeek": "sunday",
        "isWorkingDay": false,
        "consultations": 0,
        "newPatients": 0,
        "efficiency": 0.0
      }
    ],
    "weeklyTrends": [
      {
        "week": "2024-02",
        "startDate": "2024-01-08",
        "endDate": "2024-01-14",
        "consultations": 30,
        "newPatients": 2,
        "efficiency": 90.0
      },
      {
        "week": "2024-01",
        "startDate": "2024-01-01",
        "endDate": "2024-01-07",
        "consultations": 28,
        "newPatients": 1,
        "efficiency": 89.3
      }
    ],
    "comparisonWithPreviousWeek": {
      "previousWeek": "2024-02",
      "consultationsGrowth": 16.7,
      "newPatientsGrowth": 50.0,
      "efficiencyGrowth": 1.6
    },
    "weeklyGoals": {
      "targetConsultations": 40,
      "targetNewPatients": 5,
      "targetEfficiency": 90.0,
      "consultationsProgress": 87.5,
      "newPatientsProgress": 60.0,
      "efficiencyProgress": 101.6
    },
    "lastUpdated": "2024-01-15T14:30:00.000Z"
  }
}
```

## Códigos de estado y errores

| Código | Significado           | Descripción                      |
| ------ | --------------------- | -------------------------------- |
| 200    | OK                    | Resumen por semana encontrado    |
| 400    | Bad Request           | ID inválido o parámetros de semana inválidos |
| 400    | Bad Request           | Formato de semana o fechas inválido |
| 401    | Unauthorized          | Token faltante o inválido        |
| 403    | Forbidden             | No tienes permisos para consultar este resumen |
| 404    | Not Found             | Especialista o semana no encontrado |
| 500    | Internal Server Error | Error del servidor               |

## Notas útiles para el frontend

- **Permisos:** Solo el especialista propietario puede consultar el resumen por semana
- **Parámetros opcionales:** Puede usar `week`, `startDate`/`endDate`, o ninguno (semana actual)
- **Formato de semana:** Usar formato YYYY-WW (ej: 2024-03)
- **Desglose diario:** Array con métricas por cada día de la semana
- **Días laborables:** Identificación de días de trabajo vs. fines de semana
- **Tendencias semanales:** Array con métricas de semanas anteriores
- **Metas semanales:** Objetivos y progreso hacia las metas de la semana
- **Comparación:** Métricas comparadas con la semana anterior
- **Distribución completa:** Incluye distribución por todos los criterios demográficos
- **Dashboard semanal:** Ideal para mostrar métricas y tendencias semanales

## Consideraciones técnicas

- **Middleware:** Aplica `idPathParam` y `userOwnResources`
- **Validaciones:** Verificación de permisos y parámetros de semana válidos
- **Servicio:** Utiliza `getPatientsSummaryByWeek` del servicio de especialistas
- **DTO:** Transformación usando `patientsSummaryWeekToDTO` para la respuesta
- **Base de datos:** Consultas agregadas por semana con JOINs
- **Seguridad:** Verificación de propiedad del recurso
- **Cálculos:** Estadísticas calculadas dinámicamente para la semana específica
- **Performance:** Consultas optimizadas con índices de fecha
- **Relaciones:** Incluye datos de especialidades, demografía, planes y estado por semana
- **Agregación:** Métricas calculadas para la semana específica
- **Análisis:** Cálculos de comparación con semanas anteriores y metas semanales
