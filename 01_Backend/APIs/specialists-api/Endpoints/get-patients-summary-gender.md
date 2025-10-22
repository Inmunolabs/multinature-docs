# GET /specialists/patients/:id/summary/gender

## Descripción funcional

Obtiene un resumen estadístico de los pacientes asignados a un especialista específico, agrupados por género. Incluye métricas detalladas por cada género, distribución demográfica y rendimiento por segmento de género.

## Autorización

Requiere token Bearer válido. Solo el especialista propietario puede consultar el resumen por género.

## Parámetros de ruta

- `id` (string): ID único del especialista

### Ejemplo
```
GET /specialists/patients/specialist123-e89b-12d3-a456-426614174000/summary/gender
```

## Query parameters

- `gender` (string, opcional): Género específico. Si no se proporciona, devuelve todos los géneros
- `specialtyId` (string, opcional): ID de la especialidad para filtrar por género y especialidad

### Ejemplo
```
GET /specialists/patients/specialist123-e89b-12d3-a456-426614174000/summary/gender?gender=female
GET /specialists/patients/specialist123-e89b-12d3-a456-426614174000/summary/gender?specialtyId=nutricion
```

## Body del request

No aplica

## Ejemplo de respuesta exitosa (200 OK)

```json
{
  "awsRequestId": "456e7890-e89b-12d3-a456-426614174000",
  "message": "Resumen por género del especialista encontrado",
  "data": {
    "specialistId": "specialist123-e89b-12d3-a456-426614174000",
    "totalGenders": 3,
    "genders": [
      {
        "gender": "female",
        "genderName": "Femenino",
        "totalPatients": 15,
        "activePatients": 12,
        "inactivePatients": 3,
        "newPatientsThisMonth": 5,
        "patientsWithPlan": 11,
        "patientsWithoutPlan": 4,
        "totalConsultations": 95,
        "consultationsThisMonth": 45,
        "averageConsultationsPerPatient": 6.3,
        "efficiency": 94.7,
        "specialtyDistribution": {
          "nutricion": 9,
          "endocrinologia": 6
        },
        "subspecialtyDistribution": {
          "diabetes": 7,
          "obesidad": 5,
          "nutricion_clinica": 3
        },
        "ageDistribution": {
          "18-30": 4,
          "31-45": 5,
          "46-60": 4,
          "60+": 2
        },
        "monthlyTrends": [
          {
            "month": "2024-01",
            "consultations": 45,
            "newPatients": 5,
            "efficiency": 94.7
          },
          {
            "month": "2023-12",
            "consultations": 38,
            "newPatients": 3,
            "efficiency": 92.1
          }
        ],
        "growthRate": 18.4
      },
      {
        "gender": "male",
        "genderName": "Masculino",
        "totalPatients": 8,
        "activePatients": 6,
        "inactivePatients": 2,
        "newPatientsThisMonth": 2,
        "patientsWithPlan": 5,
        "patientsWithoutPlan": 3,
        "totalConsultations": 48,
        "consultationsThisMonth": 22,
        "averageConsultationsPerPatient": 6.0,
        "efficiency": 87.5,
        "specialtyDistribution": {
          "nutricion": 5,
          "endocrinologia": 3
        },
        "subspecialtyDistribution": {
          "diabetes": 4,
          "obesidad": 2,
          "nutricion_clinica": 2
        },
        "ageDistribution": {
          "18-30": 2,
          "31-45": 3,
          "46-60": 2,
          "60+": 1
        },
        "monthlyTrends": [
          {
            "month": "2024-01",
            "consultations": 22,
            "newPatients": 2,
            "efficiency": 87.5
          },
          {
            "month": "2023-12",
            "consultations": 18,
            "newPatients": 1,
            "efficiency": 83.3
          }
        ],
        "growthRate": 22.2
      },
      {
        "gender": "other",
        "genderName": "Otro",
        "totalPatients": 2,
        "activePatients": 2,
        "inactivePatients": 0,
        "newPatientsThisMonth": 1,
        "patientsWithPlan": 2,
        "patientsWithoutPlan": 0,
        "totalConsultations": 12,
        "consultationsThisMonth": 6,
        "averageConsultationsPerPatient": 6.0,
        "efficiency": 100.0,
        "specialtyDistribution": {
          "nutricion": 1,
          "endocrinologia": 1
        },
        "subspecialtyDistribution": {
          "diabetes": 1,
          "obesidad": 1
        },
        "ageDistribution": {
          "18-30": 0,
          "31-45": 1,
          "46-60": 1,
          "60+": 0
        },
        "monthlyTrends": [
          {
            "month": "2024-01",
            "consultations": 6,
            "newPatients": 1,
            "efficiency": 100.0
          },
          {
            "month": "2023-12",
            "consultations": 4,
            "newPatients": 0,
            "efficiency": 100.0
          }
        ],
        "growthRate": 50.0
      }
    ],
    "summary": {
      "totalPatients": 25,
      "activePatients": 20,
      "totalConsultations": 155,
      "averageEfficiency": 92.1,
      "mostActiveGender": "female",
      "fastestGrowingGender": "other"
    },
    "demographics": {
      "genderDistribution": {
        "female": "60%",
        "male": "32%",
        "other": "8%"
      },
      "genderEfficiencyComparison": {
        "female": 94.7,
        "male": 87.5,
        "other": 100.0
      }
    },
    "lastUpdated": "2024-01-15T14:30:00.000Z"
  }
}
```

## Códigos de estado y errores

| Código | Significado           | Descripción                      |
| ------ | --------------------- | -------------------------------- |
| 200    | OK                    | Resumen por género encontrado    |
| 400    | Bad Request           | ID inválido o género inválido    |
| 401    | Unauthorized          | Token faltante o inválido        |
| 403    | Forbidden             | No tienes permisos para consultar este resumen |
| 404    | Not Found             | Especialista o género no encontrado |
| 500    | Internal Server Error | Error del servidor               |

## Notas útiles para el frontend

- **Permisos:** Solo el especialista propietario puede consultar el resumen por género
- **Filtros opcionales:** Puede filtrar por `gender` o `specialtyId`
- **Géneros:** Valores estándar: `female`, `male`, `other`
- **Distribución demográfica:** Porcentajes y estadísticas por género
- **Distribución por edad:** Cada género incluye distribución por rangos de edad
- **Tendencias mensuales:** Array con métricas por mes para cada género
- **Crecimiento:** Tasa de crecimiento comparada con el mes anterior
- **Eficiencia:** Porcentaje de consultas completadas vs. programadas por género
- **Resumen general:** Métricas agregadas de todos los géneros
- **Dashboard de género:** Ideal para mostrar rendimiento por segmento de género

## Consideraciones técnicas

- **Middleware:** Aplica `idPathParam` y `userOwnResources`
- **Validaciones:** Verificación de permisos y género válido
- **Servicio:** Utiliza `getPatientsSummaryByGender` del servicio de especialistas
- **DTO:** Transformación usando `patientsSummaryGenderToDTO` para la respuesta
- **Base de datos:** Consultas agregadas por género con JOINs
- **Seguridad:** Verificación de propiedad del recurso
- **Cálculos:** Estadísticas calculadas dinámicamente por género
- **Performance:** Consultas optimizadas con índices de género
- **Relaciones:** Incluye datos de especialidades, subespecialidades y edad por género
- **Agregación:** Métricas calculadas por cada género específico
- **Demografía:** Cálculos de distribución porcentual y comparación de eficiencia
