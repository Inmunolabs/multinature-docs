# GET /users/summary/detail/:id

## Descripción funcional

Obtiene información detallada de las actividades de un usuario para un día específico. Incluye todos los detalles de consultas, comidas, ejercicios, reemplazos de alimentos y métricas del día, con información granular para análisis detallado.

## Autorización

Requiere token Bearer válido. Solo el usuario propietario o su especialista asignado puede consultar el detalle del día.

## Parámetros de ruta

- `id` (string): ID único del usuario

### Ejemplo
```
GET /users/summary/detail/user123-e89b-12d3-a456-426614174000
```

## Query parameters

- `date` (string, requerido): Fecha específica en formato ISO (YYYY-MM-DD)

### Ejemplo
```
GET /users/summary/detail/user123-e89b-12d3-a456-426614174000?date=2024-01-15
```

## Body del request

No aplica

## Ejemplo de respuesta exitosa (200 OK)

```json
{
  "awsRequestId": "456e7890-e89b-12d3-a456-426614174000",
  "message": "Detalle del día encontrado",
  "data": {
    "userId": "user123-e89b-12d3-a456-426614174000",
    "userName": "María González",
    "date": "2024-01-15",
    "dayOfWeek": "Lunes",
    "weekNumber": 3,
    "month": "Enero",
    "year": 2024,
    "detail": {
      "consultations": {
        "total": 2,
        "details": [
          {
            "consultationId": "consultation123-e89b-12d3-a456-426614174000",
            "time": "09:00",
            "duration": 45,
            "type": "presencial",
            "status": "completed",
            "specialist": {
              "id": "specialist123-e89b-12d3-a456-426614174000",
              "name": "Dr. Carlos López",
              "specialty": "nutricion",
              "subspecialty": "diabetes"
            },
            "location": "Consultorio 5",
            "notes": "Consulta de seguimiento nutricional",
            "diagnosis": "Diabetes tipo 2 controlada",
            "recommendations": [
              "Mantener dieta baja en carbohidratos",
              "Continuar ejercicio regular",
              "Monitorear glucosa diariamente"
            ],
            "nextFollowUp": "2024-01-29",
            "prescriptions": [
              {
                "medication": "Metformina",
                "dosage": "500mg",
                "frequency": "2 veces al día",
                "duration": "30 días"
              }
            ]
          },
          {
            "consultationId": "consultation456-e89b-12d3-a456-426614174000",
            "time": "15:00",
            "duration": 30,
            "type": "virtual",
            "status": "pending",
            "specialist": {
              "id": "specialist456-e89b-12d3-a456-426614174000",
              "name": "Dr. Ana Martínez",
              "specialty": "endocrinologia",
              "subspecialty": "diabetes"
            },
            "platform": "Zoom",
            "meetingLink": "https://zoom.us/j/123456789",
            "notes": "Consulta endocrinológica de control",
            "preparation": [
              "Tener resultados de laboratorio a mano",
              "Preparar preguntas sobre medicación",
              "Medir glucosa antes de la consulta"
            ]
          }
        ],
        "summary": {
          "totalDuration": 75,
          "completedDuration": 45,
          "pendingDuration": 30,
          "attendanceRate": 50.0
        }
      },
      "diet": {
        "totalMeals": 5,
        "totalCalories": 1750,
        "caloriesTarget": 1800,
        "caloriesRemaining": 50,
        "waterIntake": 2.2,
        "waterTarget": 2.0,
        "waterExcess": 0.2,
        "meals": [
          {
            "mealId": "meal123-e89b-12d3-a456-426614174000",
            "mealType": "desayuno",
            "mealName": "Desayuno",
            "scheduledTime": "08:00",
            "actualTime": "08:15",
            "status": "completed",
            "calories": 350,
            "proteins": 15,
            "carbohydrates": 45,
            "fats": 12,
            "fiber": 8,
            "sugar": 20,
            "sodium": 300,
            "foods": [
              {
                "foodId": "food123-e89b-12d3-a456-426614174000",
                "foodName": "Avena integral",
                "portion": "1 taza",
                "calories": 150,
                "proteins": 6,
                "carbohydrates": 27,
                "fats": 3,
                "fiber": 4,
                "brand": "Quaker",
                "notes": "Sin azúcar agregada"
              },
              {
                "foodId": "food456-e89b-12d3-a456-426614174000",
                "foodName": "Fresas",
                "portion": "1/2 taza",
                "calories": 40,
                "proteins": 1,
                "carbohydrates": 10,
                "fats": 0,
                "fiber": 2,
                "sugar": 7,
                "notes": "Orgánicas, frescas"
              },
              {
                "foodId": "food789-e89b-12d3-a456-426614174000",
                "foodName": "Yogur griego natural",
                "portion": "1 taza",
                "calories": 160,
                "proteins": 8,
                "carbohydrates": 8,
                "fats": 9,
                "notes": "Sin azúcar, alto en proteína"
              }
            ],
            "notes": "Desayuno equilibrado con proteínas y fibra",
            "compliance": "excellent"
          },
          {
            "mealId": "meal456-e89b-12d3-a456-426614174000",
            "mealType": "almuerzo",
            "mealName": "Almuerzo",
            "scheduledTime": "13:00",
            "actualTime": "13:00",
            "status": "completed",
            "calories": 450,
            "proteins": 35,
            "carbohydrates": 30,
            "fats": 18,
            "fiber": 8,
            "sugar": 5,
            "sodium": 600,
            "foods": [
              {
                "foodId": "food101-e89b-12d3-a456-426614174000",
                "foodName": "Pecho de pollo a la plancha",
                "portion": "150g",
                "calories": 250,
                "proteins": 45,
                "carbohydrates": 0,
                "fats": 6,
                "notes": "Sin piel, sin aceite"
              },
              {
                "foodId": "food102-e89b-12d3-a456-426614174000",
                "foodName": "Arroz integral",
                "portion": "1/2 taza",
                "calories": 100,
                "proteins": 2,
                "carbohydrates": 22,
                "fats": 1,
                "fiber": 2,
                "notes": "Cocido, sin sal"
              },
              {
                "foodId": "food103-e89b-12d3-a456-426614174000",
                "foodName": "Ensalada mixta",
                "portion": "1 plato",
                "calories": 100,
                "proteins": 3,
                "carbohydrates": 8,
                "fats": 11,
                "fiber": 6,
                "notes": "Lechuga, tomate, aguacate, aceite de oliva"
              }
            ],
            "notes": "Almuerzo proteico con carbohidratos complejos",
            "compliance": "good"
          }
        ],
        "snacks": [
          {
            "snackId": "snack123-e89b-12d3-a456-426614174000",
            "time": "10:30",
            "food": "Manzana",
            "calories": 80,
            "notes": "Snack de media mañana"
          },
          {
            "snackId": "snack456-e89b-12d3-a456-426614174000",
            "time": "16:00",
            "food": "Nueces mixtas",
            "calories": 120,
            "notes": "Snack de media tarde"
          }
        ],
        "summary": {
          "macronutrients": {
            "proteins": {
              "total": 53,
              "target": 60,
              "achievement": 88.3
            },
            "carbohydrates": {
              "total": 103,
              "target": 180,
              "achievement": 57.2
            },
            "fats": {
              "total": 40,
              "target": 60,
              "achievement": 66.7
            }
          },
          "micronutrients": {
            "fiber": {
              "total": 16,
              "target": 25,
              "achievement": 64.0
            },
            "sodium": {
              "total": 900,
              "target": 2300,
              "achievement": 39.1
            }
          }
        }
      },
      "routines": {
        "totalExercises": 6,
        "totalDuration": 60,
        "durationTarget": 60,
        "durationAchievement": 100.0,
        "totalCaloriesBurned": 300,
        "caloriesTarget": 300,
        "caloriesAchievement": 100.0,
        "exercises": [
          {
            "exerciseId": "exercise123-e89b-12d3-a456-426614174000",
            "exerciseName": "Caminata matutina",
            "type": "cardio",
            "scheduledTime": "07:00",
            "actualTime": "07:00",
            "status": "completed",
            "duration": 30,
            "caloriesBurned": 150,
            "distance": 3.2,
            "pace": "9:22",
            "heartRate": {
              "average": 120,
              "max": 140,
              "zone": "zona_quema_grasa"
            },
            "location": "Parque del Retiro",
            "weather": "Soleado, 18°C",
            "notes": "Caminata a buen ritmo, terreno plano",
            "compliance": "excellent"
          },
          {
            "exerciseId": "exercise456-e89b-12d3-a456-426614174000",
            "exerciseName": "Yoga suave",
            "type": "flexibilidad",
            "scheduledTime": "18:00",
            "actualTime": "18:00",
            "status": "completed",
            "duration": 30,
            "caloriesBurned": 60,
            "style": "Hatha",
            "focus": "Flexibilidad y relajación",
            "location": "Casa",
            "equipment": ["Mat de yoga", "Bloques"],
            "notes": "Sesión de estiramientos y respiración",
            "compliance": "excellent"
          }
        ],
        "summary": {
          "byType": {
            "cardio": {
              "sessions": 1,
              "duration": 30,
              "caloriesBurned": 150
            },
            "flexibilidad": {
              "sessions": 1,
              "duration": 30,
              "caloriesBurned": 60
            }
          },
          "intensity": "moderada",
          "recovery": "adecuada"
        }
      },
      "replacements": {
        "total": 2,
        "approved": 1,
        "pending": 1,
        "details": [
          {
            "replacementId": "replacement123-e89b-12d3-a456-426614174000",
            "originalFood": "Leche de vaca",
            "replacementFood": "Leche de almendras",
            "status": "approved",
            "reason": "intolerancia_lactosa",
            "requestedBy": "usuario",
            "approvedBy": "Dr. Carlos López",
            "approvalDate": "2024-01-15T10:00:00.000Z",
            "caloriesDifference": -20,
            "nutritionalImpact": {
              "proteins": -2,
              "carbohydrates": -1,
              "fats": -1,
              "calcium": -50
            },
            "notes": "Reemplazo aprobado por intolerancia confirmada"
          },
          {
            "replacementId": "replacement456-e89b-12d3-a456-426614174000",
            "originalFood": "Pan blanco",
            "replacementFood": "Pan integral",
            "status": "pending",
            "reason": "preferencia_saludable",
            "requestedBy": "usuario",
            "requestDate": "2024-01-15T14:00:00.000Z",
            "caloriesDifference": 15,
            "nutritionalImpact": {
              "proteins": 1,
              "carbohydrates": 2,
              "fats": 0,
              "fiber": 3
            },
            "notes": "Solicitud de cambio a opción más saludable"
          }
        ]
      },
      "metrics": {
        "weight": {
          "morning": 68.2,
          "evening": 68.5,
          "change": 0.3,
          "trend": "stable"
        },
        "glucose": {
          "fasting": 95,
          "postBreakfast": 120,
          "postLunch": 110,
          "postDinner": 105,
          "average": 107.5,
          "target": "<140",
          "status": "normal"
        },
        "bloodPressure": {
          "morning": "120/80",
          "evening": "118/78",
          "status": "normal"
        },
        "steps": {
          "total": 8500,
          "target": 10000,
          "achievement": 85.0,
          "sources": {
            "walking": 6500,
            "dailyActivities": 2000
          }
        },
        "sleep": {
          "duration": 7.5,
          "target": 8.0,
          "quality": "good",
          "deepSleep": 2.0,
            "remSleep": 1.5
        }
      },
      "goals": {
        "dailyGoals": [
          {
            "goalId": "goal123-e89b-12d3-a456-426614174000",
            "description": "Completar 5 comidas del día",
            "status": "achieved",
            "progress": 100,
            "notes": "Todas las comidas completadas exitosamente"
          },
          {
            "goalId": "goal456-e89b-12d3-a456-426614174000",
            "description": "Ejercicio por 60 minutos",
            "status": "achieved",
            "progress": 100,
            "notes": "Caminata + yoga completados"
          },
          {
            "goalId": "goal789-e89b-12d3-a456-426614174000",
            "description": "Beber 2L de agua",
            "status": "achieved",
            "progress": 110,
            "notes": "2.2L consumidos"
          }
        ],
        "summary": {
          "total": 3,
          "achieved": 3,
          "achievementRate": 100.0,
          "overallScore": "excellent"
        }
      },
      "notes": {
        "userNotes": "Día muy productivo, me siento con mucha energía",
        "specialistNotes": "Excelente cumplimiento del plan nutricional y de ejercicio",
        "systemNotes": "Usuario cumplió con todos los objetivos del día"
      }
    },
    "lastUpdated": "2024-01-15T23:59:59.000Z"
  }
}
```

## Códigos de estado y errores

| Código | Descripción | Causa común |
|--------|-------------|-------------|
| 200 | OK | Detalle del día encontrado |
| 400 | Bad Request | Fecha inválida o formato incorrecto |
| 401 | Unauthorized | Token faltante o inválido |
| 403 | Forbidden | No es el usuario propietario o especialista asignado |
| 404 | Not Found | Usuario no encontrado o sin datos para la fecha |
| 500 | Internal Server Error | Error del servidor |

## Notas útiles para el frontend

- **Fecha**: La fecha debe estar en formato ISO (YYYY-MM-DD)
- **Validación**: Solo se pueden consultar fechas del último año
- **Detalle completo**: Se incluye toda la información granular del día
- **Métricas**: Se muestran mediciones de salud y actividad física
- **Cumplimiento**: Se evalúa el cumplimiento de metas y objetivos
- **Notas**: Se incluyen comentarios del usuario y especialista

## Consideraciones técnicas

- **Middleware**: `userBelongsToSpecialist` permite que el especialista asignado consulte el detalle
- **Validación**: `validateSingleDay` verifica que la fecha sea válida y accesible
- **Performance**: Los datos se obtienen de múltiples servicios y se consolidan
- **Cache**: El detalle del día se cachea para mejorar el rendimiento
- **Integración**: Combina datos de consultas, dietas, rutinas, reemplazos y métricas
