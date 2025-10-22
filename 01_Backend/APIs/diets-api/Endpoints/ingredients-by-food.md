# GET /diets/ingredients/:id

## Descripción funcional

Obtiene todos los ingredientes de un alimento específico. Permite consultar la lista detallada de ingredientes que componen un platillo o alimento, incluyendo cantidades y información nutricional. Útil para mostrar recetas completas y análisis nutricional detallado.

## Autorización

Requiere token Bearer válido. Solo usuarios autorizados pueden consultar ingredientes.

## Parámetros de ruta

- `id` (UUID, requerido): ID único del alimento/platillo

### Ejemplo

```
GET /diets/ingredients/123e4567-e89b-12d3-a456-426614174000
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
    "name": "Pechuga de pollo",
    "description": "Pechuga de pollo sin piel",
    "quantity": 150.0,
    "unit": "g",
    "calories": 247.5,
    "proteins": 46.5,
    "lipids": 5.4,
    "carbohydrates": 0.0
  },
  {
    "id": "789e0123-e89b-12d3-a456-426614174000",
    "name": "Arroz integral",
    "description": "Arroz integral cocido",
    "quantity": 100.0,
    "unit": "g",
    "calories": 111.0,
    "proteins": 2.6,
    "lipids": 0.9,
    "carbohydrates": 23.0
  },
  {
    "id": "abc123-e89b-12d3-a456-426614174000",
    "name": "Brócoli",
    "description": "Brócoli al vapor",
    "quantity": 75.0,
    "unit": "g",
    "calories": 25.5,
    "proteins": 2.1,
    "lipids": 0.3,
    "carbohydrates": 5.25
  }
]
```

## Códigos de estado y errores

| Código | Significado           | Descripción                                      |
| ------ | --------------------- | ------------------------------------------------ |
| 200    | OK                    | Ingredientes del alimento obtenidos exitosamente |
| 401    | Unauthorized          | Token faltante o inválido                        |
| 403    | Forbidden             | Sin permisos para consultar ingredientes         |
| 404    | Not Found             | Alimento no encontrado                           |
| 500    | Internal Server Error | Error del servidor                               |

## Notas útiles para el frontend

- **Receta completa:** Muestra todos los ingredientes de un alimento específico
- **Cantidades:** Incluye cantidades específicas de cada ingrediente
- **Unidades:** Las cantidades están en unidades apropiadas (g, ml, etc.)
- **Información nutricional:** Valores nutricionales por ingrediente
- **Cálculos:** Útil para calcular valores nutricionales totales del platillo
- **Lista de compras:** Puede generar listas de ingredientes necesarios
- **Alergias:** Mostrar ingredientes para usuarios con restricciones alimentarias
- **Sustituciones:** Permitir intercambios de ingredientes equivalentes

## Consideraciones técnicas

- **Base de datos:** Consulta usando `listIngredientsByFood` del servicio
- **Parámetro:** El ID en la ruta se refiere al alimento, no al ingrediente
- **Estructura:** Retorna array de ingredientes con cantidades y valores nutricionales
- **Performance:** Optimizado para consultas por alimento específico
- **Relaciones:** Consulta la relación alimento-ingrediente en la base de datos
- **Cálculos:** Los valores nutricionales están por la cantidad especificada
