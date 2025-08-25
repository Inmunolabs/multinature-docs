# GET /users/summary/:id

## Descripción funcional

Obtiene un resumen de las actividades de un usuario en un rango de fechas específico. Incluye estadísticas detalladas sobre consultas, dietas, rutinas, reemplazos de alimentos y progreso general en el período especificado.

## Autorización

Requiere token Bearer válido. Solo el usuario propietario o su especialista asignado puede consultar el resumen.

## Parámetros de ruta

- `id` (string): ID único del usuario

### Ejemplo
```
GET /users/summary/user123-e89b-12d3-a456-426614174000
```

## Query parameters

- `startDate` (string, requerido): Fecha de inicio en formato ISO (YYYY-MM-DD)
- `endDate` (string, requerido): Fecha de fin en formato ISO (YYYY-MM-DD)

### Ejemplo
```
GET /users/summary/user123-e89b-12d3-a456-426614174000?startDate=2024-01-01&endDate=2024-01-31
```

## Body del request

No aplica

## Ejemplo de respuesta exitosa (200 OK)

```json
{
  "awsRequestId": "456e7890-e89b-12d3-a456-426614174000",
  "message": "Resumen por rango encontrado",
  "data": {
    "userId": "user123-e89b-12d3-a456-426614174000",
    "userName": "María González",
    "dateRange": {
      "startDate": "2024-01-01",
      "endDate": "2024-01-31",
      "totalDays": 31,
      "workingDays": 22,
      "weekends": 9
    },
    "summary": {
      "consultations": {
        "total": 8,
        "completed": 7,
        "cancelled": 1,
        "rescheduled": 0,
        "attendanceRate": 87.5,
        "averageDuration": 45,
        "totalDuration": 360,
        "bySpecialist": [
          {
            "specialistId": "specialist123-e89b-12d3-a456-426614174000",
            "specialistName": "Dr. Carlos López",
            "consultations": 6,
            "specialty": "nutricion"
          },
          {
            "specialistId": "specialist456-e89b-12d3-a456-426614174000",
            "specialistName": "Dr. Ana Martínez",
            "consultations": 2,
            "specialty": "endocrinologia"
          }
        ],
        "byType": [
          {
            "type": "presencial",
            "count": 5,
            "percentage": 62.5
          },
          {
            "type": "virtual",
            "count": 3,
            "percentage": 37.5
          }
        ]
      },
      "diet": {
        "totalDays": 31,
        "daysWithDiet": 28,
        "complianceRate": 90.3,
        "totalMeals": 140,
        "completedMeals": 126,
        "skippedMeals": 14,
        "averageCaloriesPerDay": 1750,
        "caloriesTarget": 1800,
        "caloriesAchievement": 97.2,
        "waterIntake": {
          "totalLiters": 62.0,
          "averagePerDay": 2.0,
          "targetPerDay": 2.0,
          "achievement": 100.0
        },
        "mealCompliance": [
          {
            "mealType": "desayuno",
            "compliance": 96.8,
            "total": 31,
            "completed": 30
          },
          {
            "mealType": "almuerzo",
            "compliance": 93.5,
            "total": 31,
            "completed": 29
          },
          {
            "mealType": "cena",
            "compliance": 87.1,
            "total": 31,
            "completed": 27
          }
        ],
        "topFoods": [
          {
            "foodName": "Avena",
            "frequency": 25,
            "calories": 5000
          },
          {
            "foodName": "Pollo",
            "frequency": 20,
            "calories": 4000
          },
          {
            "foodName": "Ensalada",
            "frequency": 18,
            "calories": 900
          }
        ]
      },
      "routines": {
        "totalDays": 31,
        "daysWithExercise": 25,
        "complianceRate": 80.6,
        "totalExercises": 150,
        "completedExercises": 125,
        "skippedExercises": 25,
        "totalDuration": 1875,
        "durationTarget": 1800,
        "durationAchievement": 104.2,
        "totalCaloriesBurned": 3750,
        "caloriesTarget": 3600,
        "caloriesAchievement": 104.2,
        "exerciseTypes": [
          {
            "type": "cardio",
            "sessions": 15,
            "duration": 750,
            "caloriesBurned": 1500
          },
          {
            "type": "fuerza",
            "sessions": 8,
            "duration": 400,
            "caloriesBurned": 800
          },
          {
            "type": "flexibilidad",
            "sessions": 12,
            "duration": 360,
            "caloriesBurned": 720
          }
        ],
        "topExercises": [
          {
            "exerciseName": "Caminata",
            "frequency": 20,
            "duration": 1000,
            "caloriesBurned": 2000
          },
          {
            "exerciseName": "Yoga",
            "frequency": 15,
            "duration": 450,
            "caloriesBurned": 450
          }
        ]
      },
      "replacements": {
        "total": 12,
        "approved": 10,
        "pending": 2,
        "rejected": 0,
        "approvalRate": 83.3,
        "byReason": [
          {
            "reason": "intolerancia_lactosa",
            "count": 5,
            "percentage": 41.7
          },
          {
            "reason": "preferencia_saludable",
            "count": 4,
            "percentage": 33.3
          },
          {
            "reason": "disponibilidad",
            "count": 3,
            "percentage": 25.0
          }
        ],
        "caloriesImpact": {
          "totalSaved": -150,
          "averagePerReplacement": -12.5
        }
      },
      "progress": {
        "weight": {
          "start": 70.5,
          "end": 68.2,
          "change": -2.3,
          "target": -3.0,
          "achievement": 76.7
        },
        "bodyFat": {
          "start": 25.0,
          "end": 23.5,
          "change": -1.5,
          "target": -2.0,
          "achievement": 75.0
        },
        "muscleMass": {
          "start": 45.0,
          "end": 46.2,
          "change": 1.2,
          "target": 1.0,
          "achievement": 120.0
        }
      },
      "goals": {
        "dailyGoals": {
          "total": 31,
          "achieved": 26,
          "achievementRate": 83.9
        },
        "weeklyGoals": {
          "total": 5,
          "achieved": 4,
          "achievementRate": 80.0
        },
        "monthlyGoals": {
          "total": 1,
          "achieved": 1,
          "achievementRate": 100.0
        }
      },
      "trends": {
        "weightTrend": "decreasing",
        "exerciseTrend": "increasing",
        "dietComplianceTrend": "stable",
        "consultationAttendanceTrend": "improving"
      }
    },
    "lastUpdated": "2024-01-31T23:59:59.000Z"
  }
}
```

## Códigos de estado y errores

| Código | Descripción | Causa común |
|--------|-------------|-------------|
| 200 | OK | Resumen por rango encontrado |
| 400 | Bad Request | Fechas inválidas o rango muy amplio |
| 401 | Unauthorized | Token faltante o inválido |
| 403 | Forbidden | No es el usuario propietario o especialista asignado |
| 404 | Not Found | Usuario no encontrado |
| 500 | Internal Server Error | Error del servidor |

## Notas útiles para el frontend

- **Rango de fechas**: Las fechas deben estar en formato ISO (YYYY-MM-DD)
- **Validación**: El rango máximo permitido es de 12 meses
- **Cálculos**: Los porcentajes y promedios se calculan automáticamente
- **Tendencias**: Se muestran las tendencias generales del período
- **Metas**: Se incluyen las metas diarias, semanales y mensuales
- **Progreso**: Se muestran los cambios en peso, grasa corporal y masa muscular

## Consideraciones técnicas

- **Middleware**: `userBelongsToSpecialist` permite que el especialista asignado consulte el resumen
- **Validación**: `validateRangeDates` verifica que el rango de fechas sea válido
- **Agregación**: Los datos se agregan por día, semana y mes según el rango solicitado
- **Performance**: Para rangos largos, se aplican optimizaciones de consulta
- **Cache**: Los resúmenes se cachean para mejorar el rendimiento en consultas repetidas
