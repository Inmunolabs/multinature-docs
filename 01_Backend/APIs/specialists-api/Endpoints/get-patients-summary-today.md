# GET /specialists/patients/:id/summary/today

## Descripción funcional

Obtiene un resumen estadístico de los pacientes asignados a un especialista específico para el día actual. Incluye conteos del día, consultas programadas, pacientes nuevos y métricas específicas de la fecha.

## Autorización

Requiere token Bearer válido. Solo el especialista propietario puede consultar el resumen del día.

## Parámetros de ruta

- `id` (string): ID único del especialista

### Ejemplo
```
GET /specialists/patients/specialist123-e89b-12d3-a456-426614174000/summary/today
```

## Query parameters

No aplica

## Body del request

No aplica

## Ejemplo de respuesta exitosa (200 OK)

```json
{
  "awsRequestId": "456e7890-e89b-12d3-a456-426614174000",
  "message": "Resumen del día del especialista encontrado",
  "data": {
    "specialistId": "specialist123-e89b-12d3-a456-426614174000",
    "date": "2024-01-15",
    "dayOfWeek": "monday",
    "totalPatients": 25,
    "activePatients": 20,
    "consultationsToday": 8,
    "consultationsCompleted": 5,
    "consultationsPending": 3,
    "consultationsCancelled": 0,
    "newPatientsToday": 1,
    "patientsWithPlan": 18,
    "patientsWithoutPlan": 7,
    "specialtyDistribution": {
      "nutricion": 15,
      "endocrinologia": 10
    },
    "subspecialtyDistribution": {
      "diabetes": 12,
      "obesidad": 8,
      "nutricion_clinica": 5
    },
    "workingHours": {
      "start": "09:00",
      "end": "17:00",
      "isAvailable": true
    },
    "nextConsultation": "2024-01-15T14:00:00.000Z",
    "lastConsultation": "2024-01-15T13:00:00.000Z",
    "efficiency": 87.5,
    "lastUpdated": "2024-01-15T14:30:00.000Z"
  }
}
```

## Códigos de estado y errores

| Código | Significado           | Descripción                      |
| ------ | --------------------- | -------------------------------- |
| 200    | OK                    | Resumen del día encontrado       |
| 400    | Bad Request           | ID inválido                      |
| 401    | Unauthorized          | Token faltante o inválido        |
| 403    | Forbidden             | No tienes permisos para consultar este resumen |
| 404    | Not Found             | Especialista no encontrado       |
| 500    | Internal Server Error | Error del servidor               |

## Notas útiles para el frontend

- **Permisos:** Solo el especialista propietario puede consultar el resumen del día
- **Fecha actual:** Los datos corresponden específicamente al día de la consulta
- **Consultas:** Estado de las consultas del día (completadas, pendientes, canceladas)
- **Horarios:** Horario de trabajo del especialista para el día
- **Eficiencia:** Porcentaje de consultas completadas vs. programadas
- **Próxima consulta:** Hora de la siguiente consulta programada
- **Última consulta:** Hora de la última consulta realizada
- **Dashboard diario:** Ideal para mostrar métricas del día en curso

## Consideraciones técnicas

- **Middleware:** Aplica `idPathParam` y `userOwnResources`
- **Validaciones:** Verificación de permisos del especialista
- **Servicio:** Utiliza `getPatientsSummaryTodayBySpecialistId` del servicio de especialistas
- **DTO:** Transformación usando `patientsSummaryTodayToDTO` para la respuesta
- **Base de datos:** Consultas filtradas por fecha actual
- **Seguridad:** Verificación de propiedad del recurso
- **Cálculos:** Estadísticas calculadas dinámicamente para el día específico
- **Performance:** Consultas optimizadas con filtros de fecha
- **Timezone:** Considerar zona horaria del servidor para cálculos de fecha
