# GET /working-hours/:id

## Descripción funcional

Obtiene los horarios de trabajo configurados para un usuario (especialista). Permite consultar los horarios de trabajo registrados para un especialista. Es útil para mostrar o editar la disponibilidad semanal del especialista en el frontend.

## Autorización

Requiere token Bearer válido. Solo usuarios autorizados pueden consultar horarios de trabajo.

## Parámetros de ruta

- `id` (UUID, requerido): ID único del usuario (especialista)

### Ejemplo
```
GET /working-hours/123e4567-e89b-12d3-a456-426614174000
```

## Query parameters

No aplica

## Body del request

No aplica

## Ejemplo de respuesta exitosa (200 OK)

```json
{
  "1": [
    { "startHour": "10:15", "endHour": "11:45" }
  ],
  "2": [
    { "startHour": "10:15", "endHour": "11:45" },
    { "startHour": "11:45", "endHour": "12:45" }
  ]
}
```

## Códigos de estado y errores

| Código | Significado | Descripción |
|--------|-------------|-------------|
| 200 | OK | Horarios de trabajo obtenidos exitosamente |
| 401 | Unauthorized | Token faltante o inválido |
| 403 | Forbidden | Sin permisos para consultar estos horarios |
| 404 | Not Found | Usuario no encontrado |
| 500 | Internal Server Error | Error del servidor |

## Notas útiles para el frontend

- **Configuración semanal:** Usar este endpoint para mostrar la configuración semanal de horarios en la UI
- **Mapeo de días:** Las claves del objeto son los días de la semana (0 = domingo, 1 = lunes, etc.)
- **Múltiples intervalos:** Cada día puede tener múltiples intervalos de horarios
- **Edición:** Permite editar o actualizar la disponibilidad desde el frontend
- **Formato de horas:** Las horas están en formato HH:MM (24 horas)
- **Validación:** Verificar que el usuario tenga permisos para ver estos horarios
- **Cache:** Considerar cachear los horarios para mejorar la experiencia del usuario

## Consideraciones técnicas

- **Formato de respuesta:** Los días se representan como números (0-6, donde 0 es domingo)
- **Intervalos flexibles:** Cada día puede tener múltiples intervalos de tiempo
- **Formato de horas:** Las horas se devuelven en formato HH:MM
- **Permisos:** Solo se pueden consultar horarios propios o de especialistas autorizados
