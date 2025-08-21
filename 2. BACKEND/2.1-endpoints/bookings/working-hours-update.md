# PUT /working-hours/:userId

## Descripción funcional

Actualiza los horarios de trabajo de un usuario (especialista). Permite modificar la configuración semanal de horarios de un especialista. Es útil para que el especialista gestione su disponibilidad desde el frontend.

## Autorización

Requiere token Bearer válido. Solo usuarios autorizados pueden actualizar sus propios horarios de trabajo.

## Parámetros de ruta

- `userId` (UUID, requerido): ID único del usuario (especialista)

### Ejemplo
```
PUT /working-hours/123e4567-e89b-12d3-a456-426614174000
```

## Query parameters

No aplica

## Body del request

```json
[
  {
    "dayOfWeek": "number",
    "startHour": "string",
    "endHour": "string"
  }
]
```

### Ejemplo de body

```json
[
  { "dayOfWeek": 1, "startHour": "10:15", "endHour": "11:45" },
  { "dayOfWeek": 2, "startHour": "10:15", "endHour": "11:45" },
  { "dayOfWeek": 2, "startHour": "11:45", "endHour": "12:45" }
]
```

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
| 200 | OK | Horarios de trabajo actualizados exitosamente |
| 400 | Bad Request | Formato incorrecto o campos faltantes |
| 401 | Unauthorized | Token faltante o inválido |
| 403 | Forbidden | Sin permisos para actualizar estos horarios |
| 404 | Not Found | Usuario no encontrado |
| 500 | Internal Server Error | Error del servidor |

## Notas útiles para el frontend

- **Validación:** Validar que los horarios no se crucen entre sí antes de enviar
- **Mapeo de días:** Las claves del objeto de respuesta son los días de la semana (0 = domingo, 1 = lunes, etc.)
- **Múltiples intervalos:** Cada día puede tener múltiples intervalos de horarios
- **Edición fácil:** Permitir al especialista editar su disponibilidad fácilmente desde la UI
- **Mensajes:** Mostrar mensajes claros de éxito o error tras la actualización
- **Formato de horas:** Las horas deben estar en formato HH:MM (24 horas)
- **Validación frontend:** Verificar formato y lógica antes de enviar al backend

## Consideraciones técnicas

- **Formato de entrada:** El body es un array de objetos con `dayOfWeek`, `startHour` y `endHour`
- **Formato de respuesta:** Los días se representan como números (0-6, donde 0 es domingo)
- **Validación:** El backend valida que los horarios no se superpongan
- **Permisos:** Solo se pueden actualizar horarios propios
- **Formato de horas:** Las horas deben estar en formato HH:MM
