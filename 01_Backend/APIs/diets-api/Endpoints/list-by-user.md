# GET /diets/user/:id

## Descripción funcional

Obtiene todas las dietas de un usuario específico. Permite consultar el historial completo de planes nutricionales asignados a un usuario, incluyendo dietas activas e históricas. Útil para mostrar el progreso nutricional del usuario.

## Autorización

Requiere token Bearer válido. Solo usuarios autorizados pueden consultar dietas.

## Parámetros de ruta

- `id` (UUID, requerido): ID único del usuario

### Ejemplo
```
GET /diets/user/123e4567-e89b-12d3-a456-426614174000
```

## Query parameters

No aplica

## Body del request

No aplica

## Ejemplo de respuesta exitosa (200 OK)

```json
[
  {
    "id": "456e7890-e89b-12d3-a456-426614174000",
    "specialistId": "789e0123-e89b-12d3-a456-426614174000",
    "userId": "123e4567-e89b-12d3-a456-426614174000",
    "notes": "Dieta para pérdida de peso - 1500 calorías",
    "caloriesPerDay": 1500.0,
    "proteinsPerDay": 120.0,
    "lipidsPerDay": 50.0,
    "carbohydratesPerDay": 150.0,
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-20T15:45:00Z"
  },
  {
    "id": "abc123-e89b-12d3-a456-426614174000",
    "specialistId": "def456-e89b-12d3-a456-426614174000",
    "userId": "123e4567-e89b-12d3-a456-426614174000",
    "notes": "Dieta de mantenimiento - 2000 calorías",
    "caloriesPerDay": 2000.0,
    "proteinsPerDay": 150.0,
    "lipidsPerDay": 70.0,
    "carbohydratesPerDay": 200.0,
    "createdAt": "2024-01-10T09:15:00Z",
    "updatedAt": "2024-01-10T09:15:00Z"
  }
]
```

## Códigos de estado y errores

| Código | Significado | Descripción |
|--------|-------------|-------------|
| 200 | OK | Dietas del usuario obtenidas exitosamente |
| 401 | Unauthorized | Token faltante o inválido |
| 403 | Forbidden | Sin permisos para consultar dietas de este usuario |
| 404 | Not Found | Usuario no encontrado o sin dietas |
| 500 | Internal Server Error | Error del servidor |

## Notas útiles para el frontend

- **Historial:** Muestra todas las dietas asignadas al usuario
- **Orden:** Las dietas se pueden ordenar por fecha de creación
- **Progreso:** Permite seguimiento del progreso nutricional
- **Especialistas:** Cada dieta está asociada a un especialista
- **Información nutricional:** Incluye calorías y macronutrientes diarios
- **Fechas:** Incluye fechas de creación y actualización
- **Notas:** Cada dieta tiene notas descriptivas del objetivo
- **Estado:** Considerar mostrar dieta activa vs históricas
- **Navegación:** Permitir acceso a dieta específica desde la lista

## Consideraciones técnicas

- **Validaciones:** Usa `validations.idPathParam` para validar el ID del usuario
- **Base de datos:** Consulta usando `DietsQueries.listByUserId`
- **DTO:** La respuesta se transforma usando `itemsToDTO()`
- **Estructura:** Retorna array de dietas con información básica
- **Performance:** Optimizado para consultas por usuario
- **Filtrado:** Solo retorna dietas del usuario especificado
