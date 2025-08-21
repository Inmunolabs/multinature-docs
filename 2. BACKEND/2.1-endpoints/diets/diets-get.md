# GET /diets/:id

## Descripción funcional

Obtiene una dieta específica por ID con todos sus alimentos organizados por días de la semana y tipos de comida. La dieta incluye información nutricional detallada como calorías, proteínas, lípidos y carbohidratos. Útil para mostrar el plan nutricional completo de un usuario.

## Autorización

Requiere token Bearer válido. Solo usuarios autorizados pueden consultar dietas.

## Parámetros de ruta

- `id` (UUID, requerido): ID único de la dieta

### Ejemplo
```
GET /diets/123e4567-e89b-12d3-a456-426614174000
```

## Query parameters

No aplica

## Body del request

No aplica

## Ejemplo de respuesta exitosa (200 OK)

```json
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "specialistId": "456e7890-e89b-12d3-a456-426614174000",
  "userId": "789e0123-e89b-12d3-a456-426614174000",
  "notes": "Dieta para pérdida de peso - 1500 calorías",
  "caloriesPerDay": 1500.0,
  "proteinsPerDay": 120.0,
  "lipidsPerDay": 50.0,
  "carbohydratesPerDay": 150.0,
  "meals": {
    "monday": {
      "breakfast": {
        "id": "abc123-e89b-12d3-a456-426614174000",
        "name": "Desayuno proteico",
        "description": "Avena con proteína y frutas"
      },
      "lunch": {
        "id": "def456-e89b-12d3-a456-426614174000",
        "name": "Ensalada de pollo",
        "description": "Ensalada verde con pechuga de pollo"
      },
      "dinner": {
        "id": "ghi789-e89b-12d3-a456-426614174000",
        "name": "Salmón con vegetales",
        "description": "Salmón al horno con brócoli"
      },
      "snack": {
        "id": "jkl012-e89b-12d3-a456-426614174000",
        "name": "Yogurt griego",
        "description": "Yogurt griego con nueces"
      }
    },
    "tuesday": {
      "breakfast": {
        "id": "mno345-e89b-12d3-a456-426614174000",
        "name": "Huevos revueltos",
        "description": "Huevos con espinacas"
      },
      "lunch": {
        "id": "pqr678-e89b-12d3-a456-426614174000",
        "name": "Sopa de lentejas",
        "description": "Sopa de lentejas con vegetales"
      },
      "dinner": {
        "id": "stu901-e89b-12d3-a456-426614174000",
        "name": "Pechuga a la plancha",
        "description": "Pechuga con arroz integral"
      },
      "snack": {
        "id": "vwx234-e89b-12d3-a456-426614174000",
        "name": "Manzana con almendras",
        "description": "Manzana con un puñado de almendras"
      }
    },
    "wednesday": {},
    "thursday": {},
    "friday": {},
    "saturday": {},
    "sunday": {}
  }
}
```

## Códigos de estado y errores

| Código | Significado | Descripción |
|--------|-------------|-------------|
| 200 | OK | Dieta obtenida exitosamente |
| 401 | Unauthorized | Token faltante o inválido |
| 403 | Forbidden | Sin permisos para consultar esta dieta |
| 404 | Not Found | Dieta no encontrada |
| 500 | Internal Server Error | Error del servidor |

## Notas útiles para el frontend

- **Días:** Los alimentos están organizados por días de la semana
- **Tipos de comida:** Cada día puede tener breakfast, lunch, dinner, snack
- **Calorías:** El campo `caloriesPerDay` indica el total de calorías diarias
- **Macronutrientes:** Incluye proteínas, lípidos y carbohidratos por día
- **Especialista:** Cada dieta está asociada a un especialista que la creó
- **Usuario:** Cada dieta está asignada a un usuario específico
- **Notas:** Las notas contienen información adicional sobre la dieta
- **Días vacíos:** Algunos días pueden no tener comidas asignadas
- **Progreso:** Considerar seguimiento del progreso nutricional del usuario
- **Organización:** Los menús se estructuran por día y tipo de comida

## Consideraciones técnicas

- **Middleware:** Aplica `getDietByIdPathParam` para validar y obtener la dieta
- **Validaciones:** Usa `validations.idPathParam` para validar el ID
- **Base de datos:** La dieta se obtiene previamente en el middleware
- **Estructura:** Los menús se organizan por días de la semana
- **Tipos de comida:** breakfast, lunch, dinner, snack para cada día
- **Información nutricional:** Incluye calorías y macronutrientes diarios
- **DTO:** La respuesta se transforma usando `dietToDTO()`
