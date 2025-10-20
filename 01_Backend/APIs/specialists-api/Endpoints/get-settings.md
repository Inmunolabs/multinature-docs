# GET /specialists/settings/:id

## Descripción funcional

Obtiene la configuración específica de un especialista, incluyendo horarios de trabajo, precios de consulta, duración y disponibilidad. Solo el especialista propietario puede consultar su configuración.

## Autorización

Requiere token Bearer válido. Solo el especialista propietario puede consultar su configuración.

## Parámetros de ruta

- `id` (string): ID único del especialista

### Ejemplo
```
GET /specialists/settings/specialist123-e89b-12d3-a456-426614174000
```

## Query parameters

No aplica

## Body del request

No aplica

## Ejemplo de respuesta exitosa (200 OK)

```json
{
  "awsRequestId": "456e7890-e89b-12d3-a456-426614174000",
  "message": "Configuración del especialista encontrada",
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
| 200    | OK                    | Configuración encontrada         |
| 400    | Bad Request           | ID inválido                      |
| 401    | Unauthorized          | Token faltante o inválido        |
| 403    | Forbidden             | No tienes permisos para consultar esta configuración |
| 404    | Not Found             | Configuración no encontrada      |
| 500    | Internal Server Error | Error del servidor               |

## Notas útiles para el frontend

- **Permisos:** Solo el especialista propietario puede consultar su configuración
- **Horarios:** Formato de 24 horas (HH:MM) para inicio y fin
- **Disponibilidad:** Campo `isAvailable` indica si el especialista está activo
- **Días de la semana:** Incluye todos los días con estado de disponibilidad
- **Precios:** Precio en pesos mexicanos (MXN)
- **Duración:** Duración de consulta en minutos
- **Validación:** Verificar que la configuración exista antes de mostrar

## Consideraciones técnicas

- **Middleware:** Aplica `idPathParam` y `userOwnResources`
- **Validaciones:** Verificación de permisos del especialista
- **Servicio:** Utiliza `getSpecialistSettings` del servicio de especialistas
- **DTO:** Transformación usando `specialistSettingsToDTO` para la respuesta
- **Base de datos:** Consulta a la tabla `specialist_settings`
- **Seguridad:** Verificación de propiedad del recurso
- **Formato:** Horarios en formato ISO 8601 para fechas
