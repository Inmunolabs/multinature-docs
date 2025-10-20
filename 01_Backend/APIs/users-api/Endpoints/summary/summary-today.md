# GET /users/:id/summary/today

## Descripción funcional

Obtiene un resumen de las actividades del día actual para un usuario específico. Incluye información sobre consultas programadas, actividades de dieta y rutinas, reemplazos de alimentos, y estadísticas del día.

## Autorización

Requiere token Bearer válido. Solo el usuario propietario puede consultar su resumen del día.

## Parámetros de ruta

- `id` (string): ID único del usuario

### Ejemplo
```
GET /users/user123-e89b-12d3-a456-426614174000/summary/today
```

## Query parameters

No aplica

## Body del request

No aplica

## Ejemplo de respuesta exitosa (200 OK)

```json
{
  "awsRequestId": "456e7890-e89b-12d3-a456-426614174000",
  "message": "Resumen del día encontrado",
  "data": {
    "userId": "user123-e89b-12d3-a456-426614174000",
    "userName": "María González",
    "date": "2024-01-15",
    "dayOfWeek": "Lunes",
    "summary": {
      "consultations": {
        "total": 2,
        "completed": 1,
        "pending": 1,
        "cancelled": 0,
        "rescheduled": 0,
        "nextConsultation": {
          "time": "15:00",
          "specialist": "Dr. Carlos López",
          "type": "presencial",
          "status": "confirmed"
        }
      },
      "diet": {
        "totalMeals": 5,
        "completedMeals": 3,
        "pendingMeals": 2,
        "caloriesConsumed": 1200,
        "caloriesTarget": 1800,
        "caloriesRemaining": 600,
        "waterIntake": 1.5,
        "waterTarget": 2.0,
        "waterRemaining": 0.5,
        "meals": [
          {
            "mealType": "desayuno",
            "mealName": "Desayuno",
            "status": "completed",
            "time": "08:00",
            "calories": 350,
            "foods": [
              {
                "foodName": "Avena con frutas",
                "calories": 200,
                "portion": "1 taza"
              },
              {
                "foodName": "Yogur griego",
                "calories": 150,
                "portion": "1 taza"
              }
            ]
          },
          {
            "mealType": "almuerzo",
            "mealName": "Almuerzo",
            "status": "pending",
            "time": "13:00",
            "calories": 450,
            "foods": [
              {
                "foodName": "Pollo a la plancha",
                "calories": 250,
                "portion": "150g"
              },
              {
                "foodName": "Ensalada mixta",
                "calories": 200,
                "portion": "1 plato"
              }
            ]
          }
        ]
      },
      "routines": {
        "totalExercises": 6,
        "completedExercises": 4,
        "pendingExercises": 2,
        "caloriesBurned": 180,
        "caloriesTarget": 300,
        "caloriesRemaining": 120,
        "duration": 45,
        "durationTarget": 60,
        "durationRemaining": 15,
        "exercises": [
          {
            "exerciseName": "Caminata",
            "status": "completed",
            "duration": 30,
            "caloriesBurned": 120,
            "time": "07:00"
          },
          {
            "exerciseName": "Yoga",
            "status": "pending",
            "duration": 30,
            "caloriesBurned": 60,
            "time": "18:00"
          }
        ]
      },
      "replacements": {
        "total": 2,
        "approved": 1,
        "pending": 1,
        "rejected": 0,
        "replacements": [
          {
            "originalFood": "Leche de vaca",
            "replacementFood": "Leche de almendras",
            "status": "approved",
            "reason": "intolerancia_lactosa",
            "caloriesDifference": -20
          },
          {
            "originalFood": "Pan blanco",
            "replacementFood": "Pan integral",
            "status": "pending",
            "reason": "preferencia_saludable",
            "caloriesDifference": 15
          }
        ]
      },
      "goals": {
        "dailyGoal": "mantener_peso",
        "progress": 75,
        "achieved": true,
        "notes": "Excelente progreso en la dieta y ejercicio"
      },
      "notifications": {
        "total": 3,
        "unread": 1,
        "notifications": [
          {
            "type": "meal_reminder",
            "message": "Es hora de tu almuerzo",
            "time": "12:45",
            "read": false
          },
          {
            "type": "exercise_reminder",
            "message": "Recuerda tu sesión de yoga",
            "time": "17:30",
            "read": true
          }
        ]
      }
    },
    "lastUpdated": "2024-01-15T14:30:00.000Z"
  }
}
```

## Códigos de estado y errores

| Código | Descripción | Causa común |
|--------|-------------|-------------|
| 200 | OK | Resumen del día encontrado |
| 401 | Unauthorized | Token faltante o inválido |
| 403 | Forbidden | No es el usuario propietario |
| 404 | Not Found | Usuario no encontrado |
| 500 | Internal Server Error | Error del servidor |

## Notas útiles para el frontend

- **Fecha**: El resumen se genera automáticamente para la fecha actual del sistema
- **Estado de actividades**: `completed`, `pending`, `cancelled`, `rescheduled` para consultas
- **Progreso**: Los porcentajes se calculan automáticamente basados en las metas del día
- **Notificaciones**: Se muestran las notificaciones no leídas primero
- **Metas**: El progreso se actualiza en tiempo real según las actividades completadas
- **Reemplazos**: Se muestran los cambios de alimentos aprobados y pendientes

## Consideraciones técnicas

- **Middleware**: `userOwnResources` asegura que solo el usuario propietario pueda consultar su resumen
- **Cache**: El resumen se actualiza en tiempo real según las actividades del día
- **Cálculos**: Las calorías y duraciones se calculan automáticamente desde las entidades relacionadas
- **Notificaciones**: Se incluyen recordatorios y alertas relevantes para el día
- **Integración**: Combina datos de múltiples servicios (consultas, dietas, rutinas, reemplazos)
