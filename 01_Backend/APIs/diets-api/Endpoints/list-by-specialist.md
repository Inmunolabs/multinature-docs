# GET /diets/specialist/:id

## Descripción funcional

Obtiene todas las dietas creadas por un especialista específico. Permite consultar el historial completo de planes nutricionales diseñados por un especialista, incluyendo dietas activas e históricas. Útil para que especialistas revisen su trabajo.

## Autorización

Requiere token Bearer válido. Solo usuarios autorizados pueden consultar dietas.

## Parámetros de ruta

- `id` (UUID, requerido): ID único del especialista

### Ejemplo

```
GET /diets/specialist/456e7890-e89b-12d3-a456-426614174000
```

## Query parameters

No aplica

## Body del request

No aplica

## Ejemplo de respuesta exitosa (200 OK)

```json
[
  {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "specialistId": "456e7890-e89b-12d3-a456-426614174000",
    "userId": "789e0123-e89b-12d3-a456-426614174000",
    "notes": "Dieta para pérdida de peso - 1500 calorías",
    "caloriesPerDay": 1500.0,
    "proteinsPerDay": 120.0,
    "lipidsPerDay": 50.0,
    "carbohydratesPerDay": 150.0,
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-20T15:45:00Z"
  },
  {
    "id": "def456-e89b-12d3-a456-426614174000",
    "specialistId": "456e7890-e89b-12d3-a456-426614174000",
    "userId": "abc123-e89b-12d3-a456-426614174000",
    "notes": "Dieta deportiva - 2500 calorías",
    "caloriesPerDay": 2500.0,
    "proteinsPerDay": 180.0,
    "lipidsPerDay": 80.0,
    "carbohydratesPerDay": 250.0,
    "createdAt": "2024-01-12T14:20:00Z",
    "updatedAt": "2024-01-18T11:30:00Z"
  }
]
```

## Códigos de estado y errores

| Código | Significado           | Descripción                                             |
| ------ | --------------------- | ------------------------------------------------------- |
| 200    | OK                    | Dietas del especialista obtenidas exitosamente          |
| 401    | Unauthorized          | Token faltante o inválido                               |
| 403    | Forbidden             | Sin permisos para consultar dietas de este especialista |
| 404    | Not Found             | Especialista no encontrado o sin dietas                 |
| 500    | Internal Server Error | Error del servidor                                      |

## Notas útiles para el frontend

- **Portafolio:** Muestra todas las dietas creadas por el especialista
- **Orden:** Las dietas se pueden ordenar por fecha de creación
- **Pacientes:** Cada dieta está asociada a un usuario específico
- **Información nutricional:** Incluye calorías y macronutrientes diarios
- **Fechas:** Incluye fechas de creación y actualización
- **Notas:** Cada dieta tiene notas descriptivas del objetivo
- **Estadísticas:** Útil para mostrar métricas del especialista
- **Navegación:** Permitir acceso a dieta específica desde la lista
- **Filtros:** Considerar filtros por tipo de dieta o objetivo

## Consideraciones técnicas

- **Validaciones:** Usa `validations.idPathParam` para validar el ID del especialista
- **Base de datos:** Consulta usando `DietsQueries.listBySpecialistId`
- **DTO:** La respuesta se transforma usando `itemsToDTO()`
- **Estructura:** Retorna array de dietas con información básica
- **Performance:** Optimizado para consultas por especialista
- **Filtrado:** Solo retorna dietas del especialista especificado
