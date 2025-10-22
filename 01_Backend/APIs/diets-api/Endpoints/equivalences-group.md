# GET /diets/equivalences/group

## Descripción funcional

Obtiene los grupos de equivalencias alimentarias disponibles en el sistema. Permite consultar las categorías de alimentos que pueden intercambiarse entre sí manteniendo valores nutricionales similares. Útil para crear dietas flexibles y permitir sustituciones de alimentos.

## Autorización

Requiere token Bearer válido. Solo usuarios autorizados pueden consultar equivalencias.

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
    "name": "Proteínas",
    "description": "Alimentos ricos en proteínas",
    "equivalences": [
      {
        "id": "456e7890-e89b-12d3-a456-426614174000",
        "name": "Pechuga de pollo",
        "quantity": 100.0,
        "unit": "g",
        "calories": 165,
        "proteins": 31.0
      },
      {
        "id": "789e0123-e89b-12d3-a456-426614174000",
        "name": "Salmón",
        "quantity": 100.0,
        "unit": "g",
        "calories": 208,
        "proteins": 25.0
      },
      {
        "id": "abc123-e89b-12d3-a456-426614174000",
        "name": "Huevos",
        "quantity": 2.0,
        "unit": "unidades",
        "calories": 140,
        "proteins": 12.0
      }
    ]
  },
  {
    "id": "def456-e89b-12d3-a456-426614174000",
    "name": "Carbohidratos",
    "description": "Alimentos ricos en carbohidratos",
    "equivalences": [
      {
        "id": "ghi789-e89b-12d3-a456-426614174000",
        "name": "Arroz integral",
        "quantity": 100.0,
        "unit": "g",
        "calories": 111,
        "carbohydrates": 23.0
      },
      {
        "id": "jkl012-e89b-12d3-a456-426614174000",
        "name": "Avena",
        "quantity": 100.0,
        "unit": "g",
        "calories": 389,
        "carbohydrates": 66.3
      }
    ]
  }
]
```

## Códigos de estado y errores

| Código | Significado | Descripción |
|--------|-------------|-------------|
| 200 | OK | Grupos de equivalencias obtenidos exitosamente |
| 401 | Unauthorized | Token faltante o inválido |
| 403 | Forbidden | Sin permisos para consultar equivalencias |
| 500 | Internal Server Error | Error del servidor |

## Notas útiles para el frontend

- **Intercambios:** Permite sustituir alimentos manteniendo valores nutricionales
- **Flexibilidad:** Los usuarios pueden personalizar sus dietas
- **Categorías:** Los alimentos están agrupados por tipo nutricional
- **Cantidades:** Incluye cantidades equivalentes para cada alimento
- **Información nutricional:** Valores nutricionales por equivalencia
- **Sustituciones:** Útil para usuarios con restricciones alimentarias
- **Variedad:** Permite diversificar la dieta sin perder control nutricional
- **Educación:** Ayuda a entender equivalencias nutricionales

## Consideraciones técnicas

- **Base de datos:** Consulta usando `listEquivalencesGroup` del servicio
- **Estructura:** Retorna grupos con alimentos equivalentes
- **Caché:** Aplica middleware `equiByGroupCache` para optimización
- **Performance:** Optimizado para consultas frecuentes de equivalencias
- **Relaciones:** Consulta grupos de alimentos nutricionalmente equivalentes
- **Cantidades:** Los alimentos están normalizados por cantidades equivalentes
