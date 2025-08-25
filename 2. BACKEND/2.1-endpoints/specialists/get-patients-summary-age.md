# GET /specialists/patients/:id/summary/age

## Descripción funcional

Obtiene un resumen estadístico de los pacientes asignados a un especialista específico, agrupados por rangos de edad. Incluye métricas detalladas por cada grupo etario, distribución demográfica y rendimiento por segmento de edad.

## Autorización

Requiere token Bearer válido. Solo el especialista propietario puede consultar el resumen por edad.

## Parámetros de ruta

- `id` (string): ID único del especialista

### Ejemplo
```
GET /specialists/patients/specialist123-e89b-12d3-a456-426614174000/summary/age
```

## Query parameters

- `ageRange` (string, opcional): Rango de edad específico. Si no se proporciona, devuelve todos los rangos
- `specialtyId` (string, opcional): ID de la especialidad para filtrar por edad y especialidad

### Ejemplo
```
GET /specialists/patients/specialist123-e89b-12d3-a456-426614174000/summary/age?ageRange=31-45
GET /specialists/patients/specialist123-e89b-12d3-a456-426614174000/summary/age?specialtyId=nutricion
```

## Body del request

No aplica

## Ejemplo de respuesta exitosa (200 OK)

```json
{
  "awsRequestId": "456e7890-e89b-12d3-a456-426614174000",
  "message": "Resumen por edad del especialista encontrado",
  "data": {
    "specialistId": "specialist123-e89b-12d3-a456-426614174000",
    "totalAgeRanges": 4,
    "ageRanges": [
      {
        "ageRange": "18-30",
        "ageRangeName": "18-30 años",
        "totalPatients": 6,
        "activePatients": 5,
        "inactivePatients": 1,
        "newPatientsThisMonth": 2,
        "patientsWithPlan": 4,
        "patientsWithoutPlan": 2,
        "totalConsultations": 38,
        "consultationsThisMonth": 18,
        "averageConsultationsPerPatient": 6.3,
        "efficiency": 94.7,
        "specialtyDistribution": {
          "nutricion": 4,
          "endocrinologia": 2
        },
        "subspecialtyDistribution": {
          "diabetes": 3,
          "obesidad": 2,
          "nutricion_clinica": 1
        },
        "monthlyTrends": [
          {
            "month": "2024-01",
            "consultations": 18,
            "newPatients": 2,
            "efficiency": 94.7
          },
          {
            "month": "2023-12",
            "consultations": 15,
            "newPatients": 1,
            "efficiency": 93.3
          }
        ],
        "growthRate": 20.0
      },
      {
        "ageRange": "31-45",
        "ageRangeName": "31-45 años",
        "totalPatients": 8,
        "activePatients": 7,
        "inactivePatients": 1,
        "newPatientsThisMonth": 3,
        "patientsWithPlan": 6,
        "patientsWithoutPlan": 2,
        "totalConsultations": 52,
        "consultationsThisMonth": 25,
        "averageConsultationsPerPatient": 6.5,
        "efficiency": 96.2,
        "specialtyDistribution": {
          "nutricion": 5,
          "endocrinologia": 3
        },
        "subspecialtyDistribution": {
          "diabetes": 4,
          "obesidad": 3,
          "nutricion_clinica": 1
        },
        "monthlyTrends": [
          {
            "month": "2024-01",
            "consultations": 25,
            "newPatients": 3,
            "efficiency": 96.2
          },
          {
            "month": "2023-12",
            "consultations": 20,
            "newPatients": 2,
            "efficiency": 95.0
          }
        ],
        "growthRate": 25.0
      },
      {
        "ageRange": "46-60",
        "ageRangeName": "46-60 años",
        "totalPatients": 7,
        "activePatients": 5,
        "inactivePatients": 2,
        "newPatientsThisMonth": 2,
        "patientsWithPlan": 5,
        "patientsWithoutPlan": 2,
        "totalConsultations": 45,
        "consultationsThisMonth": 22,
        "averageConsultationsPerPatient": 6.4,
        "efficiency": 91.1,
        "specialtyDistribution": {
          "nutricion": 4,
          "endocrinologia": 3
        },
        "subspecialtyDistribution": {
          "diabetes": 3,
          "obesidad": 2,
          "nutricion_clinica": 2
        },
        "monthlyTrends": [
          {
            "month": "2024-01",
            "consultations": 22,
            "newPatients": 2,
            "efficiency": 91.1
          },
          {
            "month": "2023-12",
            "consultations": 18,
            "newPatients": 1,
            "efficiency": 88.9
          }
        ],
        "growthRate": 22.2
      },
      {
        "ageRange": "60+",
        "ageRangeName": "60+ años",
        "totalPatients": 4,
        "activePatients": 3,
        "inactivePatients": 1,
        "newPatientsThisMonth": 1,
        "patientsWithPlan": 2,
        "patientsWithoutPlan": 2,
        "totalConsultations": 20,
        "consultationsThisMonth": 10,
        "averageConsultationsPerPatient": 5.0,
        "efficiency": 85.0,
        "specialtyDistribution": {
          "nutricion": 2,
          "endocrinologia": 2
        },
        "subspecialtyDistribution": {
          "diabetes": 2,
          "obesidad": 1,
          "nutricion_clinica": 1
        },
        "monthlyTrends": [
          {
            "month": "2024-01",
            "consultations": 10,
            "newPatients": 1,
            "efficiency": 85.0
          },
          {
            "month": "2023-12",
            "consultations": 8,
            "newPatients": 0,
            "efficiency": 75.0
          }
        ],
        "growthRate": 25.0
      }
    ],
    "summary": {
      "totalPatients": 25,
      "activePatients": 20,
      "totalConsultations": 155,
      "averageEfficiency": 91.8,
      "mostActiveAgeRange": "31-45",
      "fastestGrowingAgeRange": "31-45"
    },
    "demographics": {
      "averageAge": 38.4,
      "medianAge": 35,
      "ageDistribution": {
        "18-30": "24%",
        "31-45": "32%",
        "46-60": "28%",
        "60+": "16%"
      }
    },
    "lastUpdated": "2024-01-15T14:30:00.000Z"
  }
}
```

## Códigos de estado y errores

| Código | Significado           | Descripción                      |
| ------ | --------------------- | -------------------------------- |
| 200    | OK                    | Resumen por edad encontrado      |
| 400    | Bad Request           | ID inválido o rango de edad inválido |
| 401    | Unauthorized          | Token faltante o inválido        |
| 403    | Forbidden             | No tienes permisos para consultar este resumen |
| 404    | Not Found             | Especialista o rango de edad no encontrado |
| 500    | Internal Server Error | Error del servidor               |

## Notas útiles para el frontend

- **Permisos:** Solo el especialista propietario puede consultar el resumen por edad
- **Filtros opcionales:** Puede filtrar por `ageRange` o `specialtyId`
- **Rangos de edad:** Grupos predefinidos: 18-30, 31-45, 46-60, 60+
- **Distribución demográfica:** Porcentajes y estadísticas de edad
- **Tendencias mensuales:** Array con métricas por mes para cada rango de edad
- **Crecimiento:** Tasa de crecimiento comparada con el mes anterior
- **Eficiencia:** Porcentaje de consultas completadas vs. programadas por edad
- **Resumen general:** Métricas agregadas de todos los rangos de edad
- **Dashboard demográfico:** Ideal para mostrar rendimiento por segmento de edad

## Consideraciones técnicas

- **Middleware:** Aplica `idPathParam` y `userOwnResources`
- **Validaciones:** Verificación de permisos y rango de edad válido
- **Servicio:** Utiliza `getPatientsSummaryByAge` del servicio de especialistas
- **DTO:** Transformación usando `patientsSummaryAgeToDTO` para la respuesta
- **Base de datos:** Consultas agregadas por rango de edad con JOINs
- **Seguridad:** Verificación de propiedad del recurso
- **Cálculos:** Estadísticas calculadas dinámicamente por rango de edad
- **Performance:** Consultas optimizadas con índices de fecha de nacimiento
- **Relaciones:** Incluye datos de especialidades y subespecialidades por edad
- **Agregación:** Métricas calculadas por cada rango de edad específico
- **Demografía:** Cálculos de edad promedio, mediana y distribución porcentual
