# POST /specialists/settings

## Descripción funcional

Permite a un especialista crear o actualizar su configuración de trabajo, incluyendo horarios, precios de consulta, duración y disponibilidad. Si la configuración ya existe, se actualiza; si no existe, se crea.

## Autorización

Requiere token Bearer válido. Solo especialistas pueden crear/actualizar su configuración.

## Parámetros de ruta

No aplica

## Query parameters

No aplica

## Body del request

```json
{
  "specialistId": "specialist123-e89b-12d3-a456-426614174000",
  "consultationPrice": 800.00,
  "consultationDuration": 60,
  "workingHours": {
    "monday": {
      "start": "09:00",
      "end": "17:00",
      "isAvailable": true
    },
    "tuesday": {
      "start": "09:00",
      "end": "17:00",
      "isAvailable": true
    },
    "wednesday": {
      "start": "09:00",
      "end": "17:00",
      "isAvailable": true
    },
    "thursday": {
      "start": "09:00",
      "end": "17:00",
      "isAvailable": true
    },
    "friday": {
      "start": "09:00",
      "end": "17:00",
      "isAvailable": true
    },
    "saturday": {
      "start": "09:00",
      "end": "14:00",
      "isAvailable": true
    },
    "sunday": {
      "start": "00:00",
      "end": "00:00",
      "isAvailable": false
    }
  },
  "isAvailable": true
}
```

### Campos requeridos
- `specialistId` (string): ID del especialista
- `consultationPrice` (number): Precio de la consulta en pesos mexicanos
- `consultationDuration` (number): Duración de la consulta en minutos
- `workingHours` (object): Horarios de trabajo por día de la semana
- `isAvailable` (boolean): Estado de disponibilidad del especialista

### Estructura de workingHours
Cada día debe incluir:
- `start` (string): Hora de inicio en formato HH:MM (24 horas)
- `end` (string): Hora de fin en formato HH:MM (24 horas)
- `isAvailable` (boolean): Si el día está disponible

### Validaciones
- `consultationPrice`: Debe ser un número positivo
- `consultationDuration`: Debe ser un número positivo mayor a 0
- `workingHours`: Debe incluir todos los días de la semana
- `start` y `end`: Formato de hora válido (HH:MM)
- `specialistId`: Debe ser un ID válido de especialista existente

## Ejemplo de respuesta exitosa (201 Created / 200 OK)

```json
{
  "awsRequestId": "456e7890-e89b-12d3-a456-426614174000",
  "message": "Configuración del especialista guardada exitosamente",
  "data": {
    "id": "settings123-e89b-12d3-a456-426614174000",
    "specialistId": "specialist123-e89b-12d3-a456-426614174000",
    "consultationPrice": 800.00,
    "consultationDuration": 60,
    "workingHours": {
      "monday": {
        "start": "09:00",
        "end": "17:00",
        "isAvailable": true
      },
      "tuesday": {
        "start": "09:00",
        "end": "17:00",
        "isAvailable": true
      },
      "wednesday": {
        "start": "09:00",
        "end": "17:00",
        "isAvailable": true
      },
      "thursday": {
        "start": "09:00",
        "end": "17:00",
        "isAvailable": true
      },
      "friday": {
        "start": "09:00",
        "end": "17:00",
        "isAvailable": true
      },
      "saturday": {
        "start": "09:00",
        "end": "14:00",
        "isAvailable": true
      },
      "sunday": {
        "start": "00:00",
        "end": "00:00",
        "isAvailable": false
      }
    },
    "isAvailable": true,
    "createdAt": "2023-01-15T10:00:00.000Z",
    "updatedAt": "2024-01-15T14:30:00.000Z"
  }
}
```

## Códigos de estado y errores

| Código | Significado           | Descripción                      |
| ------ | --------------------- | -------------------------------- |
| 201    | Created               | Configuración creada exitosamente |
| 200    | OK                    | Configuración actualizada        |
| 400    | Bad Request           | Datos de configuración inválidos |
| 400    | Bad Request           | Especialista no encontrado       |
| 401    | Unauthorized          | Token faltante o inválido        |
| 500    | Internal Server Error | Error del servidor               |

## Notas útiles para el frontend

- **Upsert:** El endpoint crea o actualiza automáticamente según si existe la configuración
- **Horarios:** Incluir todos los días de la semana, incluso los no disponibles
- **Formato de hora:** Usar formato de 24 horas (HH:MM)
- **Precios:** En pesos mexicanos (MXN)
- **Duración:** En minutos
- **Validación:** Verificar que el especialista exista antes de enviar
- **Feedback:** Mostrar mensaje apropiado según si se crea o actualiza

## Consideraciones técnicas

- **Middleware:** Aplica `upsertSpecialistSettings` y `validateSpecialistSettings`
- **Validaciones:** Verificación de datos de entrada y existencia del especialista
- **Servicio:** Utiliza `upsertSpecialistSettings` del servicio de especialistas
- **DTO:** Transformación usando `specialistSettingsToDTO` para la respuesta
- **Base de datos:** Operación INSERT o UPDATE según existencia
- **Lógica:** Si existe configuración, actualiza; si no, crea nueva
- **Auditoría:** Registro de fechas de creación y actualización
