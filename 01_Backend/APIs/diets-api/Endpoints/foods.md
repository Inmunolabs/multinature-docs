# GET /diets/foods

## Descripción funcional

Obtiene la lista de todos los alimentos disponibles en el sistema. Permite consultar el catálogo completo de alimentos con información nutricional para la creación de dietas. Útil para que especialistas seleccionen alimentos al diseñar planes nutricionales.

## Autorización

Requiere token Bearer válido. Solo usuarios autorizados pueden consultar alimentos.

## Parámetros de ruta

No aplica

## Query parameters

No aplica

## Body del request

No aplica

## Ejemplo de respuesta exitosa (200 OK)

```json
[
  {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "name": "Pechuga de pollo",
    "description": "Pechuga de pollo sin piel, cocida",
    "calories": 165,
    "proteins": 31.0,
    "lipids": 3.6,
    "carbohydrates": 0.0,
    "fiber": 0.0,
    "sodium": 74,
    "category": "Proteínas",
    "unit": "100g"
  },
  {
    "id": "456e7890-e89b-12d3-a456-426614174000",
    "name": "Avena",
    "description": "Avena integral cruda",
    "calories": 389,
    "proteins": 16.9,
    "lipids": 6.9,
    "carbohydrates": 66.3,
    "fiber": 10.6,
    "sodium": 2,
    "category": "Cereales",
    "unit": "100g"
  },
  {
    "id": "789e0123-e89b-12d3-a456-426614174000",
    "name": "Brócoli",
    "description": "Brócoli crudo",
    "calories": 34,
    "proteins": 2.8,
    "lipids": 0.4,
    "carbohydrates": 7.0,
    "fiber": 2.6,
    "sodium": 33,
    "category": "Verduras",
    "unit": "100g"
  }
]
```

## Códigos de estado y errores

| Código | Significado           | Descripción                           |
| ------ | --------------------- | ------------------------------------- |
| 200    | OK                    | Alimentos obtenidos exitosamente      |
| 401    | Unauthorized          | Token faltante o inválido             |
| 403    | Forbidden             | Sin permisos para consultar alimentos |
| 500    | Internal Server Error | Error del servidor                    |

## Notas útiles para el frontend

- **Catálogo:** Muestra todos los alimentos disponibles en el sistema
- **Información nutricional:** Incluye calorías, proteínas, lípidos y carbohidratos
- **Categorías:** Los alimentos están organizados por categorías
- **Unidades:** Los valores nutricionales están por 100g por defecto
- **Búsqueda:** Considerar implementar búsqueda por nombre o categoría
- **Filtros:** Permitir filtrar por categoría o valor nutricional
- **Selección:** Útil para crear dietas y menús personalizados
- **Comparación:** Permitir comparar valores nutricionales entre alimentos

## Consideraciones técnicas

- **Base de datos:** Consulta usando `FoodsQueries.getPlatillos`
- **Estructura:** Retorna array de alimentos con información nutricional completa
- **Performance:** Optimizado para consultas del catálogo completo
- **Caché:** Ideal para implementar caché de alimentos
- **Categorización:** Los alimentos están organizados por grupos nutricionales
- **Unidades:** Valores nutricionales estandarizados por 100g
