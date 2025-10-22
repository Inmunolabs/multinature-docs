# GET /specialists/patients/:id/summary/range

## Descripción funcional

Obtiene un resumen estadístico de los pacientes asignados a un especialista específico dentro de un rango de fechas. Incluye métricas agregadas, tendencias y comparaciones entre períodos.

## Autorización

Requiere token Bearer válido. Solo el especialista propietario puede consultar el resumen por rango de fechas.

## Parámetros de ruta

- `id` (string): ID único del especialista

### Ejemplo
```
GET /specialists/patients/specialist123-e89b-12d3-a456-426614174000/summary/range
```

## Query parameters

- `startDate` (string): Fecha de inicio en formato ISO (YYYY-MM-DD)
- `endDate` (string): Fecha de fin en formato ISO (YYYY-MM-DD)

### Ejemplo
```
GET /specialists/patients/specialist123-e89b-12d3-a456-426614174000/summary/range?startDate=2024-01-01&endDate=2024-01-31
```

## Body del request

No aplica

## Ejemplo de respuesta exitosa (200 OK)

```json
{
  "awsRequestId": "456e7890-e89b-12d3-a456-426614174000",
  "message": "Resumen por rango de fechas del especialista encontrado",
  "data": {
    "specialistId": "specialist123-e89b-12d3-a456-426614174000",
    "startDate": "2024-01-01",
    "endDate": "2024-01-31",
    "totalDays": 31,
    "workingDays": 22,
    "totalPatients": 25,
    "activePatients": 20,
    "inactivePatients": 5,
    "newPatientsInRange": 8,
    "patientsWithPlan": 18,
    "patientsWithoutPlan": 7,
    "totalConsultations": 155,
    "consultationsInRange": 89,
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
    "dailyTrends": [
      {
        "date": "2024-01-01",
        "consultations": 3,
        "newPatients": 1,
        "efficiency": 100.0
      },
      {
        "date": "2024-01-02",
        "consultations": 5,
        "newPatients": 0,
        "efficiency": 80.0
      }
    ],
    "comparisonWithPreviousPeriod": {
      "previousStartDate": "2023-12-01",
      "previousEndDate": "2023-12-31",
      "consultationsGrowth": 12.5,
      "patientsGrowth": 8.0,
      "efficiencyGrowth": 2.1
    },
    "lastUpdated": "2024-01-15T14:30:00.000Z"
  }
}
```

## Códigos de estado y errores

| Código | Significado           | Descripción                      |
| ------ | --------------------- | -------------------------------- |
| 200    | OK                    | Resumen por rango encontrado     |
| 400    | Bad Request           | ID inválido o fechas inválidas   |
| 400    | Bad Request           | Rango de fechas inválido         |
| 401    | Unauthorized          | Token faltante o inválido        |
| 403    | Forbidden             | No tienes permisos para consultar este resumen |
| 404    | Not Found             | Especialista no encontrado       |
| 500    | Internal Server Error | Error del servidor               |

## Notas útiles para el frontend

- **Permisos:** Solo el especialista propietario puede consultar el resumen por rango
- **Fechas requeridas:** Ambos parámetros `startDate` y `endDate` son obligatorios
- **Formato de fecha:** Usar formato ISO (YYYY-MM-DD)
- **Rango válido:** La fecha de inicio debe ser anterior o igual a la fecha de fin
- **Tendencias diarias:** Array con métricas por cada día del rango
- **Comparación:** Métricas comparadas con el período anterior del mismo tamaño
- **Crecimiento:** Porcentajes de crecimiento entre períodos
- **Dashboard:** Ideal para mostrar métricas históricas y tendencias

## Consideraciones técnicas

- **Middleware:** Aplica `idPathParam`, `userOwnResources` y `queryDates`
- **Validaciones:** Verificación de permisos y rango de fechas válido
- **Servicio:** Utiliza `getPatientsSummaryByDateRange` del servicio de especialistas
- **DTO:** Transformación usando `patientsSummaryRangeToDTO` para la respuesta
- **Base de datos:** Consultas agregadas con filtros de fecha
- **Seguridad:** Verificación de propiedad del recurso
- **Cálculos:** Estadísticas calculadas dinámicamente para el rango específico
- **Performance:** Consultas optimizadas con índices de fecha
- **Timezone:** Considerar zona horaria del servidor para cálculos de fecha
- **Límites:** Validar que el rango no sea demasiado amplio para evitar sobrecarga
