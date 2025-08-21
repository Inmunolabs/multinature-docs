# GET /working-hours/availability/:id

## Descripción funcional

Obtiene la disponibilidad de horarios de un especialista para agendar citas. Permite consultar los horarios disponibles de un especialista en un rango de fechas. Es útil para mostrar en el frontend los días y horas en los que se pueden agendar citas. La respuesta incluye solo los horarios disponibles (excluyendo los que ya tienen citas agendadas).

## Autorización

Requiere token Bearer válido. Acceso público para consultar disponibilidad de especialistas.

## Parámetros de ruta

- `id` (UUID, requerido): ID único del especialista

### Ejemplo
```
GET /working-hours/availability/123e4567-e89b-12d3-a456-426614174000
```

## Query parameters

- `startDate` (string, opcional): Fecha de inicio del rango en formato YYYY-MM-DD
- `endDate` (string, opcional): Fecha de fin del rango en formato YYYY-MM-DD

### Ejemplo
```
GET /working-hours/availability/123e4567-e89b-12d3-a456-426614174000?startDate=2025-04-01&endDate=2025-04-07
```

## Body del request

No aplica

## Ejemplo de respuesta exitosa (200 OK)

```json
{
  "2025-04-01": {
    "workingHours": [
      { "startHour": "10:00", "endHour": "11:00" },
      { "startHour": "11:00", "endHour": "12:00" }
    ]
  },
  "2025-04-02": {
    "workingHours": [
      { "startHour": "09:00", "endHour": "10:00" }
    ]
  }
}
```

## Códigos de estado y errores

| Código | Significado | Descripción |
|--------|-------------|-------------|
| 200 | OK | Disponibilidad obtenida exitosamente |
| 400 | Bad Request | Formato incorrecto de fechas |
| 404 | Not Found | Especialista no encontrado |
| 500 | Internal Server Error | Error del servidor |

## Notas útiles para el frontend

- **Agenda disponible:** Usar este endpoint para mostrar la agenda disponible al seleccionar un especialista
- **Filtrado por fechas:** Permite filtrar por rango de fechas para optimizar la carga de datos
- **Horarios filtrados:** Los horarios devueltos ya excluyen las citas ya agendadas
- **Formato de respuesta:** Las claves del objeto son fechas en formato YYYY-MM-DD
- **Intervalos:** Cada fecha contiene un arreglo de intervalos disponibles de 1 hora
- **Optimización:** Usar los parámetros de fecha para cargar solo el período necesario
- **Cache:** Considerar cachear la disponibilidad para mejorar la experiencia del usuario

## Consideraciones técnicas

- **Formato de fechas:** Las fechas deben estar en formato YYYY-MM-DD
- **Intervalos:** Los horarios se devuelven en intervalos de 1 hora
- **Filtrado:** La respuesta excluye automáticamente horarios ocupados por citas existentes
- **Performance:** El endpoint está optimizado para consultas de rango de fechas
