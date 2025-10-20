# GET /specialists/patients/:id/summary

## Descripción funcional

Obtiene un resumen estadístico de los pacientes asignados a un especialista específico. Incluye conteos totales, pacientes activos, inactivos, con planes y estadísticas de consultas.

## Autorización

Requiere token Bearer válido. Solo el especialista propietario puede consultar el resumen de sus pacientes.

## Parámetros de ruta

- `id` (string): ID único del especialista

### Ejemplo
```
GET /specialists/patients/specialist123-e89b-12d3-a456-426614174000/summary
```

## Query parameters

No aplica

## Body del request

No aplica

## Ejemplo de respuesta exitosa (200 OK)

```json
{
  "awsRequestId": "456e7890-e89b-12d3-a456-426614174000",
  "message": "Resumen de pacientes del especialista encontrado",
  "data": {
    "specialistId": "specialist123-e89b-12d3-a456-426614174000",
    "totalPatients": 25,
    "activePatients": 20,
    "inactivePatients": 5,
    "patientsWithPlan": 18,
    "patientsWithoutPlan": 7,
    "newPatientsThisMonth": 3,
    "patientsWithConsultationsThisMonth": 15,
    "averageConsultationsPerPatient": 6.2,
    "totalConsultations": 155,
    "consultationsThisMonth": 45,
    "consultationsLastMonth": 38,
    "growthRate": 18.4,
    "specialtyDistribution": {
      "nutricion": 15,
      "endocrinologia": 10
    },
    "subspecialtyDistribution": {
      "diabetes": 12,
      "obesidad": 8,
      "nutricion_clinica": 5
    },
    "lastUpdated": "2024-01-15T14:30:00.000Z"
  }
}
```

## Códigos de estado y errores

| Código | Significado           | Descripción                      |
| ------ | --------------------- | -------------------------------- |
| 200    | OK                    | Resumen encontrado               |
| 400    | Bad Request           | ID inválido                      |
| 401    | Unauthorized          | Token faltante o inválido        |
| 403    | Forbidden             | No tienes permisos para consultar este resumen |
| 404    | Not Found             | Especialista no encontrado       |
| 500    | Internal Server Error | Error del servidor               |

## Notas útiles para el frontend

- **Permisos:** Solo el especialista propietario puede consultar el resumen
- **Estadísticas:** Conteos totales y porcentajes de pacientes
- **Crecimiento:** Comparación con el mes anterior para métricas de crecimiento
- **Distribución:** Conteo de pacientes por especialidad y subespecialidad
- **Planes:** Diferenciación entre pacientes con y sin planes activos
- **Consultas:** Estadísticas de consultas totales y por período
- **Actualización:** Timestamp de la última actualización de datos
- **Dashboard:** Ideal para mostrar métricas en paneles de control

## Consideraciones técnicas

- **Middleware:** Aplica `idPathParam` y `userOwnResources`
- **Validaciones:** Verificación de permisos del especialista
- **Servicio:** Utiliza `getPatientsSummaryBySpecialistId` del servicio de especialistas
- **DTO:** Transformación usando `patientsSummaryToDTO` para la respuesta
- **Base de datos:** Consultas agregadas con COUNT, AVG y GROUP BY
- **Seguridad:** Verificación de propiedad del recurso
- **Cálculos:** Estadísticas calculadas dinámicamente desde la base de datos
- **Performance:** Consultas optimizadas para datos agregados
- **Cache:** Los datos pueden ser cacheados para mejorar rendimiento
