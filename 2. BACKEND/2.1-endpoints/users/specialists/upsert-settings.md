# PATCH /specialists/config/:id

## Descripción funcional

Actualiza o crea la configuración de un especialista específico. Permite configurar horarios de trabajo, especialidades, configuraciones de consulta y preferencias del especialista.

## Autorización

Requiere token Bearer válido. Solo el especialista propietario puede modificar su configuración.

## Parámetros de ruta

- `id` (string): ID único del especialista

### Ejemplo
```
PATCH /specialists/config/specialist123-e89b-12d3-a456-426614174000
```

## Query parameters

No aplica

## Body del request

```json
{
  "workingHours": {
    "monday": {
      "isWorking": true,
      "startTime": "09:00",
      "endTime": "17:00",
      "breakStart": "12:00",
      "breakEnd": "13:00"
    },
    "tuesday": {
      "isWorking": true,
      "startTime": "09:00",
      "endTime": "17:00",
      "breakStart": "12:00",
      "breakEnd": "13:00"
    },
    "wednesday": {
      "isWorking": false
    },
    "thursday": {
      "isWorking": true,
      "startTime": "09:00",
      "endTime": "17:00",
      "breakStart": "12:00",
      "breakEnd": "13:00"
    },
    "friday": {
      "isWorking": true,
      "startTime": "09:00",
      "endTime": "17:00",
      "breakStart": "12:00",
      "breakEnd": "13:00"
    },
    "saturday": {
      "isWorking": false
    },
    "sunday": {
      "isWorking": false
    }
  },
  "specialties": [
    {
      "specialty": "nutricion",
      "subspecialties": ["diabetes", "obesidad"]
    },
    {
      "specialty": "endocrinologia",
      "subspecialties": ["diabetes", "tiroides"]
    }
  ],
  "consultationSettings": {
    "duration": 30,
    "maxPatientsPerDay": 20,
    "allowOverbooking": false,
    "autoConfirm": true
  },
  "notifications": {
    "emailNotifications": true,
    "smsNotifications": false,
    "whatsappNotifications": true,
    "reminderTime": 24
  },
  "availability": {
    "advanceBookingDays": 30,
    "sameDayBooking": true,
    "emergencySlots": 2
  }
}
```

## Ejemplo de respuesta exitosa (200 OK)

```json
{
  "awsRequestId": "456e7890-e89b-12d3-a456-426614174000",
  "message": "Configuración del especialista actualizada exitosamente",
  "data": {
    "specialistId": "specialist123-e89b-12d3-a456-426614174000",
    "workingHours": {
      "monday": {
        "isWorking": true,
        "startTime": "09:00",
        "endTime": "17:00",
        "breakStart": "12:00",
        "breakEnd": "13:00"
      },
      "tuesday": {
        "isWorking": true,
        "startTime": "09:00",
        "endTime": "17:00",
        "breakStart": "12:00",
        "breakEnd": "13:00"
      },
      "wednesday": {
        "isWorking": false
      },
      "thursday": {
        "isWorking": true,
        "startTime": "09:00",
        "endTime": "17:00",
        "breakStart": "12:00",
        "breakEnd": "13:00"
      },
      "friday": {
        "isWorking": true,
        "startTime": "09:00",
        "endTime": "17:00",
        "breakStart": "12:00",
        "breakEnd": "13:00"
      },
      "saturday": {
        "isWorking": false
      },
      "sunday": {
        "isWorking": false
      }
    },
    "specialties": [
      {
        "specialty": "nutricion",
        "subspecialties": ["diabetes", "obesidad"]
      },
      {
        "specialty": "endocrinologia",
        "subspecialties": ["diabetes", "tiroides"]
      }
    ],
    "consultationSettings": {
      "duration": 30,
      "maxPatientsPerDay": 20,
      "allowOverbooking": false,
      "autoConfirm": true
    },
    "notifications": {
      "emailNotifications": true,
      "smsNotifications": false,
      "whatsappNotifications": true,
      "reminderTime": 24
    },
    "availability": {
      "advanceBookingDays": 30,
      "sameDayBooking": true,
      "emergencySlots": 2
    },
    "lastUpdated": "2024-01-15T14:30:00.000Z"
  }
}
```

## Códigos de estado y errores

| Código | Descripción | Causa común |
|--------|-------------|-------------|
| 200 | OK | Configuración actualizada exitosamente |
| 400 | Bad Request | Datos de configuración inválidos |
| 401 | Unauthorized | Token faltante o inválido |
| 403 | Forbidden | No es el especialista propietario |
| 404 | Not Found | Especialista no encontrado |
| 500 | Internal Server Error | Error del servidor |

## Notas útiles para el frontend

- **Validación de horarios**: Asegúrate de que `endTime` sea posterior a `startTime` y que `breakStart` esté entre `startTime` y `endTime`
- **Especialidades**: Las especialidades deben existir en el sistema. Valida antes de enviar
- **Configuración de consultas**: La duración se maneja en minutos
- **Notificaciones**: El tiempo de recordatorio se maneja en horas antes de la consulta
- **Disponibilidad**: Los días de reserva anticipada se cuentan desde la fecha actual

## Consideraciones técnicas

- **Validación**: Se aplican validaciones de `specialistSettingsValidations.upsert` y `validateSpecialistSettings`
- **Middleware**: `userOwnResources` asegura que solo el especialista propietario pueda modificar su configuración
- **Transaccional**: La operación es atómica - si falla una parte, se revierte todo
- **Cache**: La configuración se actualiza en tiempo real y se refleja inmediatamente en las consultas de disponibilidad
