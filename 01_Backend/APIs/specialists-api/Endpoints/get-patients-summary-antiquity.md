# GET /specialists/patients/:id/summary/antiquity

## Descripción funcional

Obtiene un resumen estadístico de los pacientes asignados a un especialista específico, agrupados por antigüedad (tiempo desde el registro). Incluye métricas detalladas por cada grupo de antigüedad, distribución temporal y rendimiento por segmento de veteranía.

## Autorización

Requiere token Bearer válido. Solo el especialista propietario puede consultar el resumen por antigüedad.

## Parámetros de ruta

- `id` (string): ID único del especialista

### Ejemplo
```
GET /specialists/patients/specialist123-e89b-12d3-a456-426614174000/summary/antiquity
```

## Query parameters

- `antiquityRange` (string, opcional): Rango de antigüedad específico. Si no se proporciona, devuelve todos los rangos
- `specialtyId` (string, opcional): ID de la especialidad para filtrar por antigüedad y especialidad

### Ejemplo
```
GET /specialists/patients/specialist123-e89b-12d3-a456-426614174000/summary/antiquity?antiquityRange=6-12_months
GET /specialists/patients/specialist123-e89b-12d3-a456-426614174000/summary/antiquity?specialtyId=nutricion
```

## Body del request

No aplica

## Ejemplo de respuesta exitosa (200 OK)

```json
{
  "awsRequestId": "456e7890-e89b-12d3-a456-426614174000",
  "message": "Resumen por antigüedad del especialista encontrado",
  "data": {
    "specialistId": "specialist123-e89b-12d3-a456-426614174000",
    "totalAntiquityRanges": 5,
    "antiquityRanges": [
      {
        "antiquityRange": "0-1_months",
        "antiquityRangeName": "0-1 meses",
        "totalPatients": 4,
        "activePatients": 4,
        "inactivePatients": 0,
        "newPatientsThisMonth": 4,
        "totalConsultations": 20,
        "consultationsThisMonth": 20,
        "averageConsultationsPerPatient": 5.0,
        "efficiency": 90.0,
        "specialtyDistribution": {
          "nutricion": 3,
          "endocrinologia": 1
        },
        "subspecialtyDistribution": {
          "diabetes": 2,
          "obesidad": 1,
          "nutricion_clinica": 1
        },
        "ageDistribution": {
          "18-30": 1,
          "31-45": 2,
          "46-60": 1,
          "60+": 0
        },
        "genderDistribution": {
          "female": 3,
          "male": 1,
          "other": 0
        },
        "monthlyTrends": [
          {
            "month": "2024-01",
            "consultations": 20,
            "newPatients": 4,
            "efficiency": 90.0
          }
        ],
        "growthRate": 100.0
      },
      {
        "antiquityRange": "1-3_months",
        "antiquityRangeName": "1-3 meses",
        "totalPatients": 6,
        "activePatients": 5,
        "inactivePatients": 1,
        "newPatientsThisMonth": 2,
        "totalConsultations": 35,
        "consultationsThisMonth": 18,
        "averageConsultationsPerPatient": 5.8,
        "efficiency": 94.3,
        "specialtyDistribution": {
          "nutricion": 4,
          "endocrinologia": 2
        },
        "subspecialtyDistribution": {
          "diabetes": 3,
          "obesidad": 2,
          "nutricion_clinica": 1
        },
        "ageDistribution": {
          "18-30": 2,
          "31-45": 2,
          "46-60": 1,
          "60+": 1
        },
        "genderDistribution": {
          "female": 4,
          "male": 2,
          "other": 0
        },
        "monthlyTrends": [
          {
            "month": "2024-01",
            "consultations": 18,
            "newPatients": 2,
            "efficiency": 94.3
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
        "antiquityRange": "3-6_months",
        "antiquityRangeName": "3-6 meses",
        "totalPatients": 8,
        "activePatients": 6,
        "inactivePatients": 2,
        "newPatientsThisMonth": 1,
        "totalConsultations": 48,
        "consultationsThisMonth": 22,
        "averageConsultationsPerPatient": 6.0,
        "efficiency": 91.7,
        "specialtyDistribution": {
          "nutricion": 5,
          "endocrinologia": 3
        },
        "subspecialtyDistribution": {
          "diabetes": 4,
          "obesidad": 3,
          "nutricion_clinica": 1
        },
        "ageDistribution": {
          "18-30": 2,
          "31-45": 3,
          "46-60": 2,
          "60+": 1
        },
        "genderDistribution": {
          "female": 5,
          "male": 2,
          "other": 1
        },
        "monthlyTrends": [
          {
            "month": "2024-01",
            "consultations": 22,
            "newPatients": 1,
            "efficiency": 91.7
          },
          {
            "month": "2023-12",
            "consultations": 18,
            "newPatients": 0,
            "efficiency": 88.9
          }
        ],
        "growthRate": 22.2
      },
      {
        "antiquityRange": "6-12_months",
        "antiquityRangeName": "6-12 meses",
        "totalPatients": 5,
        "activePatients": 4,
        "inactivePatients": 1,
        "newPatientsThisMonth": 0,
        "totalConsultations": 32,
        "consultationsThisMonth": 15,
        "averageConsultationsPerPatient": 6.4,
        "efficiency": 93.8,
        "specialtyDistribution": {
          "nutricion": 3,
          "endocrinologia": 2
        },
        "subspecialtyDistribution": {
          "diabetes": 2,
          "obesidad": 2,
          "nutricion_clinica": 1
        },
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
        "monthlyTrends": [
          {
            "month": "2024-01",
            "consultations": 15,
            "newPatients": 0,
            "efficiency": 93.8
          },
          {
            "month": "2023-12",
            "consultations": 12,
            "newPatients": 0,
            "efficiency": 91.7
          }
        ],
        "growthRate": 25.0
      },
      {
        "antiquityRange": "12+_months",
        "antiquityRangeName": "12+ meses",
        "totalPatients": 2,
        "activePatients": 1,
        "inactivePatients": 1,
        "newPatientsThisMonth": 0,
        "totalConsultations": 20,
        "consultationsThisMonth": 10,
        "averageConsultationsPerPatient": 10.0,
        "efficiency": 95.0,
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
        "genderDistribution": {
          "female": 1,
          "male": 1,
          "other": 0
        },
        "monthlyTrends": [
          {
            "month": "2024-01",
            "consultations": 10,
            "newPatients": 0,
            "efficiency": 95.0
          },
          {
            "month": "2023-12",
            "consultations": 8,
            "newPatients": 0,
            "efficiency": 100.0
          }
        ],
        "growthRate": 25.0
      }
    ],
    "summary": {
      "totalPatients": 25,
      "activePatients": 20,
      "totalConsultations": 155,
      "averageEfficiency": 92.1,
      "mostActiveAntiquityRange": "3-6 meses",
      "fastestGrowingAntiquityRange": "0-1 meses"
    },
    "antiquityAnalytics": {
      "averageAntiquity": "4.2 meses",
      "medianAntiquity": "3.5 meses",
      "antiquityDistribution": {
        "0-1_months": "16%",
        "1-3_months": "24%",
        "3-6_months": "32%",
        "6-12_months": "20%",
        "12+_months": "8%"
      },
      "retentionByAntiquity": {
        "0-1_months": 100.0,
        "1-3_months": 83.3,
        "3-6_months": 75.0,
        "6-12_months": 80.0,
        "12+_months": 50.0
      }
    },
    "lastUpdated": "2024-01-15T14:30:00.000Z"
  }
}
```

## Códigos de estado y errores

| Código | Significado           | Descripción                      |
| ------ | --------------------- | -------------------------------- |
| 200    | OK                    | Resumen por antigüedad encontrado |
| 400    | Bad Request           | ID inválido o rango de antigüedad inválido |
| 401    | Unauthorized          | Token faltante o inválido        |
| 403    | Forbidden             | No tienes permisos para consultar este resumen |
| 404    | Not Found             | Especialista o rango de antigüedad no encontrado |
| 500    | Internal Server Error | Error del servidor               |

## Notas útiles para el frontend

- **Permisos:** Solo el especialista propietario puede consultar el resumen por antigüedad
- **Filtros opcionales:** Puede filtrar por `antiquityRange` o `specialtyId`
- **Rangos de antigüedad:** Grupos predefinidos: 0-1 meses, 1-3 meses, 3-6 meses, 6-12 meses, 12+ meses
- **Distribución demográfica:** Cada grupo incluye distribución por edad y género
- **Tendencias mensuales:** Array con métricas por mes para cada rango de antigüedad
- **Crecimiento:** Tasa de crecimiento comparada con el mes anterior
- **Eficiencia:** Porcentaje de consultas completadas vs. programadas por antigüedad
- **Análisis de retención:** Tasa de retención por rango de antigüedad
- **Resumen general:** Métricas agregadas de todos los rangos de antigüedad
- **Dashboard de veteranía:** Ideal para mostrar rendimiento por segmento de antigüedad

## Consideraciones técnicas

- **Middleware:** Aplica `idPathParam` y `userOwnResources`
- **Validaciones:** Verificación de permisos y rango de antigüedad válido
- **Servicio:** Utiliza `getPatientsSummaryByAntiquity` del servicio de especialistas
- **DTO:** Transformación usando `patientsSummaryAntiquityToDTO` para la respuesta
- **Base de datos:** Consultas agregadas por antigüedad con JOINs
- **Seguridad:** Verificación de propiedad del recurso
- **Cálculos:** Estadísticas calculadas dinámicamente por rango de antigüedad
- **Performance:** Consultas optimizadas con índices de fecha de registro
- **Relaciones:** Incluye datos de especialidades, demografía y tendencias por antigüedad
- **Agregación:** Métricas calculadas por cada rango de antigüedad específico
- **Análisis:** Cálculos de retención, distribución porcentual y correlación temporal
