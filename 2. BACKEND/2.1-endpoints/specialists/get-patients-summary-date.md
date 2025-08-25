# GET /specialists/patients/:id/summary/date

## Descripción funcional

Obtiene un resumen estadístico de los pacientes asignados a un especialista específico, agrupados por fecha específica. Incluye métricas detalladas por fecha, distribución de pacientes y rendimiento por día específico.

## Autorización

Requiere token Bearer válido. Solo el especialista propietario puede consultar el resumen por fecha.

## Parámetros de ruta

- `id` (string): ID único del especialista

### Ejemplo
```
GET /specialists/patients/specialist123-e89b-12d3-a456-426614174000/summary/date
```

## Query parameters

- `date` (string, opcional): Fecha específica en formato ISO (YYYY-MM-DD). Si no se proporciona, usa la fecha actual

### Ejemplo
```
GET /specialists/patients/specialist123-e89b-12d3-a456-426614174000/summary/date?date=2024-01-15
```

## Body del request

No aplica

## Ejemplo de respuesta exitosa (200 OK)

```json
{
  "awsRequestId": "456e7890-e89b-12d3-a456-426614174000",
  "message": "Resumen por fecha del especialista encontrado",
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
    "totalPatients": 25,
    "activePatients": 20,
    "inactivePatients": 5,
    "newPatientsToday": 1,
    "totalConsultations": 8,
    "consultationsCompleted": 6,
    "consultationsPending": 2,
    "consultationsCancelled": 0,
    "efficiency": 75.0,
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
    "consultationSchedule": [
      {
        "time": "09:00",
        "patientId": "patient123-e89b-12d3-a456-426614174000",
        "patientName": "Ana López",
        "specialty": "nutricion",
        "subspecialty": "diabetes",
        "status": "completed",
        "duration": 60
      },
      {
        "time": "10:00",
        "patientId": "patient456-e89b-12d3-a456-426614174000",
        "patientName": "Carlos Martínez",
        "specialty": "nutricion",
        "subspecialty": "obesidad",
        "status": "completed",
        "duration": 60
      },
      {
        "time": "11:00",
        "patientId": "patient789-e89b-12d3-a456-426614174000",
        "patientName": "María García",
        "specialty": "endocrinologia",
        "subspecialty": "nutricion_clinica",
        "status": "completed",
        "duration": 60
      },
      {
        "time": "14:00",
        "patientId": "patient012-e89b-12d3-a456-426614174000",
        "patientName": "Luis Rodríguez",
        "specialty": "nutricion",
        "subspecialty": "diabetes",
        "status": "completed",
        "duration": 60
      },
      {
        "time": "15:00",
        "patientId": "patient345-e89b-12d3-a456-426614174000",
        "patientName": "Elena Sánchez",
        "specialty": "nutricion",
        "subspecialty": "obesidad",
        "status": "completed",
        "duration": 60
      },
      {
        "time": "16:00",
        "patientId": "patient678-e89b-12d3-a456-426614174000",
        "patientName": "Roberto Torres",
        "specialty": "endocrinologia",
        "subspecialty": "nutricion_clinica",
        "status": "completed",
        "duration": 60
      },
      {
        "time": "13:00",
        "patientId": "patient901-e89b-12d3-a456-426614174000",
        "patientName": "Carmen Ruiz",
        "specialty": "nutricion",
        "subspecialty": "diabetes",
        "status": "pending",
        "duration": 60
      },
      {
        "time": "17:00",
        "patientId": "patient234-e89b-12d3-a456-426614174000",
        "patientName": "Javier Moreno",
        "specialty": "nutricion",
        "subspecialty": "obesidad",
        "status": "pending",
        "duration": 60
      }
    ],
    "dailyMetrics": {
      "totalConsultationTime": 480,
      "averageConsultationDuration": 60,
      "consultationDensity": "1 por hora",
      "breakTime": 60,
      "utilizationRate": 85.7
    },
    "comparisonWithPreviousDay": {
      "previousDate": "2024-01-12",
      "consultationsGrowth": 14.3,
      "efficiencyGrowth": 5.0,
      "newPatientsGrowth": 0.0
    },
    "lastUpdated": "2024-01-15T14:30:00.000Z"
  }
}
```

## Códigos de estado y errores

| Código | Significado           | Descripción                      |
| ------ | --------------------- | -------------------------------- |
| 200    | OK                    | Resumen por fecha encontrado     |
| 400    | Bad Request           | ID inválido o fecha inválida     |
| 400    | Bad Request           | Formato de fecha inválido        |
| 401    | Unauthorized          | Token faltante o inválido        |
| 403    | Forbidden             | No tienes permisos para consultar este resumen |
| 404    | Not Found             | Especialista o fecha no encontrado |
| 500    | Internal Server Error | Error del servidor               |

## Notas útiles para el frontend

- **Permisos:** Solo el especialista propietario puede consultar el resumen por fecha
- **Fecha opcional:** Si no se proporciona `date`, usa la fecha actual
- **Formato de fecha:** Usar formato ISO (YYYY-MM-DD)
- **Horario de trabajo:** Incluye horarios configurados para la fecha específica
- **Agenda detallada:** Array con todas las consultas programadas para la fecha
- **Métricas diarias:** Estadísticas específicas del día (duración, densidad, utilización)
- **Comparación:** Métricas comparadas con el día anterior
- **Distribución completa:** Incluye distribución por todos los criterios demográficos
- **Estado de consultas:** Conteo de consultas completadas, pendientes y canceladas
- **Dashboard diario:** Ideal para mostrar métricas específicas de un día

## Consideraciones técnicas

- **Middleware:** Aplica `idPathParam` y `userOwnResources`
- **Validaciones:** Verificación de permisos y formato de fecha válido
- **Servicio:** Utiliza `getPatientsSummaryByDate` del servicio de especialistas
- **DTO:** Transformación usando `patientsSummaryDateToDTO` para la respuesta
- **Base de datos:** Consultas agregadas por fecha específica con JOINs
- **Seguridad:** Verificación de propiedad del recurso
- **Cálculos:** Estadísticas calculadas dinámicamente para la fecha específica
- **Performance:** Consultas optimizadas con índices de fecha
- **Relaciones:** Incluye datos de especialidades, demografía, planes y estado por fecha
- **Agregación:** Métricas calculadas para la fecha específica
- **Análisis:** Cálculos de comparación con días anteriores y métricas de utilización
