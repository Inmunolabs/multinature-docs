# GET /specialists/patients/:id/summary/month

## Descripción funcional

Obtiene un resumen estadístico mensual de los pacientes asignados a un especialista específico. Incluye métricas del mes actual, comparación con meses anteriores y tendencias de crecimiento.

## Autorización

Requiere token Bearer válido. Solo el especialista propietario puede consultar el resumen mensual.

## Parámetros de ruta

- `id` (string): ID único del especialista

### Ejemplo
```
GET /specialists/patients/specialist123-e89b-12d3-a456-426614174000/summary/month
```

## Query parameters

- `month` (string, opcional): Mes en formato YYYY-MM. Si no se proporciona, usa el mes actual

### Ejemplo
```
GET /specialists/patients/specialist123-e89b-12d3-a456-426614174000/summary/month?month=2024-01
```

## Body del request

No aplica

## Ejemplo de respuesta exitosa (200 OK)

```json
{
  "awsRequestId": "456e7890-e89b-12d3-a456-426614174000",
  "message": "Resumen mensual del especialista encontrado",
  "data": {
    "specialistId": "specialist123-e89b-12d3-a456-426614174000",
    "month": "2024-01",
    "year": 2024,
    "monthName": "Enero",
    "totalDays": 31,
    "workingDays": 22,
    "totalPatients": 25,
    "activePatients": 20,
    "inactivePatients": 5,
    "newPatientsThisMonth": 8,
    "patientsWithPlan": 18,
    "patientsWithoutPlan": 7,
    "totalConsultations": 155,
    "consultationsThisMonth": 89,
    "averageConsultationsPerDay": 4.05,
    "averageConsultationsPerPatient": 6.2,
    "consultationsCompleted": 82,
    "consultationsCancelled": 7,
    "consultationsRescheduled": 12,
    "efficiency": 92.1,
    "specialtyDistribution": {
      "nutricion": 15,
      "endocrinologia": 10
    },
    "subspecialtyDistribution": {
      "diabetes": 12,
      "obesidad": 8,
      "nutricion_clinica": 5
    },
    "weeklyTrends": [
      {
        "week": 1,
        "startDate": "2024-01-01",
        "endDate": "2024-01-07",
        "consultations": 25,
        "newPatients": 3,
        "efficiency": 92.0
      },
      {
        "week": 2,
        "startDate": "2024-01-08",
        "endDate": "2024-01-14",
        "consultations": 28,
        "newPatients": 2,
        "efficiency": 89.3
      }
    ],
    "comparisonWithPreviousMonth": {
      "previousMonth": "2023-12",
      "consultationsGrowth": 12.5,
      "patientsGrowth": 8.0,
      "efficiencyGrowth": 2.1,
      "newPatientsGrowth": 15.0
    },
    "monthlyGoals": {
      "targetConsultations": 100,
      "targetNewPatients": 10,
      "targetEfficiency": 90.0,
      "consultationsProgress": 89.0,
      "newPatientsProgress": 80.0,
      "efficiencyProgress": 102.3
    },
    "lastUpdated": "2024-01-15T14:30:00.000Z"
  }
}
```

## Códigos de estado y errores

| Código | Significado           | Descripción                      |
| ------ | --------------------- | -------------------------------- |
| 200    | OK                    | Resumen mensual encontrado       |
| 400    | Bad Request           | ID inválido o mes inválido       |
| 400    | Bad Request           | Formato de mes inválido          |
| 401    | Unauthorized          | Token faltante o inválido        |
| 403    | Forbidden             | No tienes permisos para consultar este resumen |
| 404    | Not Found             | Especialista no encontrado       |
| 500    | Internal Server Error | Error del servidor               |

## Notas útiles para el frontend

- **Permisos:** Solo el especialista propietario puede consultar el resumen mensual
- **Mes opcional:** Si no se proporciona `month`, usa el mes actual
- **Formato de mes:** Usar formato YYYY-MM (ej: 2024-01)
- **Tendencias semanales:** Array con métricas por cada semana del mes
- **Comparación:** Métricas comparadas con el mes anterior
- **Metas mensuales:** Objetivos y progreso hacia las metas del mes
- **Progreso:** Porcentajes de progreso hacia las metas establecidas
- **Dashboard mensual:** Ideal para mostrar métricas mensuales y objetivos

## Consideraciones técnicas

- **Middleware:** Aplica `idPathParam` y `userOwnResources`
- **Validaciones:** Verificación de permisos y formato de mes válido
- **Servicio:** Utiliza `getPatientsSummaryByMonth` del servicio de especialistas
- **DTO:** Transformación usando `patientsSummaryMonthToDTO` para la respuesta
- **Base de datos:** Consultas agregadas por mes con filtros de fecha
- **Seguridad:** Verificación de propiedad del recurso
- **Cálculos:** Estadísticas calculadas dinámicamente para el mes específico
- **Performance:** Consultas optimizadas con índices de fecha
- **Timezone:** Considerar zona horaria del servidor para cálculos de mes
- **Metas:** Sistema de objetivos mensuales configurados por especialista
