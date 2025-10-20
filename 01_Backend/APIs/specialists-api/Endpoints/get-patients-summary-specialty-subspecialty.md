# GET /specialists/patients/:id/summary/specialty-subspecialty

## Descripción funcional

Obtiene un resumen estadístico detallado de los pacientes asignados a un especialista específico, agrupados por combinación de especialidad y subespecialidad. Incluye métricas granulares por cada combinación, distribución de pacientes y rendimiento por área específica de especialización.

## Autorización

Requiere token Bearer válido. Solo el especialista propietario puede consultar el resumen por especialidad-subespecialidad.

## Parámetros de ruta

- `id` (string): ID único del especialista

### Ejemplo
```
GET /specialists/patients/specialist123-e89b-12d3-a456-426614174000/summary/specialty-subspecialty
```

## Query parameters

- `specialtyId` (string, opcional): ID de la especialidad específica para filtrar
- `subspecialtyId` (string, opcional): ID de la subespecialidad específica para filtrar

### Ejemplo
```
GET /specialists/patients/specialist123-e89b-12d3-a456-426614174000/summary/specialty-subspecialty?specialtyId=nutricion
GET /specialists/patients/specialist123-e89b-12d3-a456-426614174000/summary/specialty-subspecialty?subspecialtyId=diabetes
```

## Body del request

No aplica

## Ejemplo de respuesta exitosa (200 OK)

```json
{
  "awsRequestId": "456e7890-e89b-12d3-a456-426614174000",
  "message": "Resumen por especialidad-subespecialidad del especialista encontrado",
  "data": {
    "specialistId": "specialist123-e89b-12d3-a456-426614174000",
    "totalSpecialtySubspecialtyCombinations": 3,
    "specialtySubspecialtyCombinations": [
      {
        "specialtyId": "nutricion",
        "specialtyName": "Nutrición",
        "subspecialtyId": "diabetes",
        "subspecialtyName": "Diabetes",
        "totalPatients": 12,
        "activePatients": 10,
        "inactivePatients": 2,
        "newPatientsThisMonth": 4,
        "totalConsultations": 72,
        "consultationsThisMonth": 35,
        "averageConsultationsPerPatient": 6.0,
        "efficiency": 94.4,
        "ageDistribution": {
          "18-30": 2,
          "31-45": 4,
          "46-60": 4,
          "60+": 2
        },
        "genderDistribution": {
          "female": 8,
          "male": 4,
          "other": 0
        },
        "planDistribution": {
          "withPlan": 9,
          "withoutPlan": 3
        },
        "antiquityDistribution": {
          "0-1_months": 2,
          "1-3_months": 3,
          "3-6_months": 4,
          "6-12_months": 2,
          "12+_months": 1
        },
        "statusDistribution": {
          "active": 10,
          "inactive": 2
        },
        "monthlyTrends": [
          {
            "month": "2024-01",
            "consultations": 35,
            "newPatients": 4,
            "efficiency": 94.4
          },
          {
            "month": "2023-12",
            "consultations": 28,
            "newPatients": 2,
            "efficiency": 92.9
          }
        ],
        "growthRate": 25.0
      },
      {
        "specialtyId": "nutricion",
        "specialtyName": "Nutrición",
        "subspecialtyId": "obesidad",
        "subspecialtyName": "Obesidad",
        "totalPatients": 8,
        "activePatients": 6,
        "inactivePatients": 2,
        "newPatientsThisMonth": 2,
        "totalConsultations": 48,
        "consultationsThisMonth": 23,
        "averageConsultationsPerPatient": 6.0,
        "efficiency": 91.7,
        "ageDistribution": {
          "18-30": 1,
          "31-45": 3,
          "46-60": 3,
          "60+": 1
        },
        "genderDistribution": {
          "female": 5,
          "male": 3,
          "other": 0
        },
        "planDistribution": {
          "withPlan": 6,
          "withoutPlan": 2
        },
        "antiquityDistribution": {
          "0-1_months": 1,
          "1-3_months": 2,
          "3-6_months": 3,
          "6-12_months": 1,
          "12+_months": 1
        },
        "statusDistribution": {
          "active": 6,
          "inactive": 2
        },
        "monthlyTrends": [
          {
            "month": "2024-01",
            "consultations": 23,
            "newPatients": 2,
            "efficiency": 91.7
          },
          {
            "month": "2023-12",
            "consultations": 20,
            "newPatients": 1,
            "efficiency": 90.0
          }
        ],
        "growthRate": 15.0
      },
      {
        "specialtyId": "endocrinologia",
        "specialtyName": "Endocrinología",
        "subspecialtyId": "nutricion_clinica",
        "subspecialtyName": "Nutrición Clínica",
        "totalPatients": 5,
        "activePatients": 4,
        "inactivePatients": 1,
        "newPatientsThisMonth": 1,
        "totalConsultations": 30,
        "consultationsThisMonth": 15,
        "averageConsultationsPerPatient": 6.0,
        "efficiency": 90.0,
        "ageDistribution": {
          "18-30": 1,
          "31-45": 2,
          "46-60": 1,
          "60+": 1
        },
        "genderDistribution": {
          "female": 3,
          "male": 2,
          "other": 0
        },
        "planDistribution": {
          "withPlan": 3,
          "withoutPlan": 2
        },
        "antiquityDistribution": {
          "0-1_months": 0,
          "1-3_months": 1,
          "3-6_months": 2,
          "6-12_months": 1,
          "12+_months": 1
        },
        "statusDistribution": {
          "active": 4,
          "inactive": 1
        },
        "monthlyTrends": [
          {
            "month": "2024-01",
            "consultations": 15,
            "newPatients": 1,
            "efficiency": 90.0
          },
          {
            "month": "2023-12",
            "consultations": 12,
            "newPatients": 0,
            "efficiency": 83.3
          }
        ],
        "growthRate": 25.0
      }
    ],
    "summary": {
      "totalPatients": 25,
      "activePatients": 20,
      "totalConsultations": 150,
      "averageEfficiency": 92.0,
      "mostActiveCombination": "nutricion-diabetes",
      "fastestGrowingCombination": "nutricion-diabetes"
    },
    "specialtySubspecialtyAnalytics": {
      "specialtyDistribution": {
        "nutricion": "80%",
        "endocrinologia": "20%"
      },
      "subspecialtyDistribution": {
        "diabetes": "48%",
        "obesidad": "32%",
        "nutricion_clinica": "20%"
      },
      "efficiencyByCombination": {
        "nutricion-diabetes": 94.4,
        "nutricion-obesidad": 91.7,
        "endocrinologia-nutricion_clinica": 90.0
      },
      "growthByCombination": {
        "nutricion-diabetes": 25.0,
        "nutricion-obesidad": 15.0,
        "endocrinologia-nutricion_clinica": 25.0
      }
    },
    "lastUpdated": "2024-01-15T14:30:00.000Z"
  }
}
```

## Códigos de estado y errores

| Código | Significado           | Descripción                      |
| ------ | --------------------- | -------------------------------- |
| 200    | OK                    | Resumen por especialidad-subespecialidad encontrado |
| 400    | Bad Request           | ID inválido o filtros inválidos  |
| 401    | Unauthorized          | Token faltante o inválido        |
| 403    | Forbidden             | No tienes permisos para consultar este resumen |
| 404    | Not Found             | Especialista o combinación no encontrado |
| 500    | Internal Server Error | Error del servidor               |

## Notas útiles para el frontend

- **Permisos:** Solo el especialista propietario puede consultar el resumen por especialidad-subespecialidad
- **Filtros opcionales:** Puede filtrar por `specialtyId` o `subspecialtyId`
- **Combinaciones:** Cada combinación incluye métricas específicas de especialidad y subespecialidad
- **Distribución demográfica:** Cada combinación incluye distribución por edad, género y antigüedad
- **Distribución de planes y estado:** Cada combinación incluye distribución por plan y estado
- **Tendencias mensuales:** Array con métricas por mes para cada combinación
- **Crecimiento:** Tasa de crecimiento comparada con el mes anterior
- **Eficiencia:** Porcentaje de consultas completadas vs. programadas por combinación
- **Análisis granular:** Métricas específicas por cada combinación de especialización
- **Resumen general:** Métricas agregadas de todas las combinaciones
- **Dashboard especializado:** Ideal para mostrar rendimiento por área específica de especialización

## Consideraciones técnicas

- **Middleware:** Aplica `idPathParam` y `userOwnResources`
- **Validaciones:** Verificación de permisos y filtros válidos
- **Servicio:** Utiliza `getPatientsSummaryBySpecialtySubspecialty` del servicio de especialistas
- **DTO:** Transformación usando `patientsSummarySpecialtySubspecialtyToDTO` para la respuesta
- **Base de datos:** Consultas agregadas por combinación de especialidad-subespecialidad con JOINs
- **Seguridad:** Verificación de propiedad del recurso
- **Cálculos:** Estadísticas calculadas dinámicamente por cada combinación
- **Performance:** Consultas optimizadas con índices de especialidad y subespecialidad
- **Relaciones:** Incluye datos demográficos, planes, estado y antigüedad por combinación
- **Agregación:** Métricas calculadas por cada combinación específica
- **Análisis:** Cálculos de distribución, eficiencia y crecimiento por combinación
