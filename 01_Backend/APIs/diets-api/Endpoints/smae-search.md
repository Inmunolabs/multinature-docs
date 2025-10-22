# GET /smae/dishes/search

## Descripción funcional

Busca platillos y recetas en el sistema SMAE (Sistema de Manejo de Alimentos y Equivalencias). Permite encontrar platillos específicos basándose en criterios de búsqueda como nombre, ingredientes, categoría o valores nutricionales. Útil para especialistas que necesitan encontrar platillos específicos para incluir en dietas.

## Autorización

Requiere token Bearer válido. Solo usuarios autorizados pueden buscar platillos.

## Parámetros de ruta

No aplica

## Query parameters

- `q` (string, opcional): Término de búsqueda
- `category` (string, opcional): Categoría del platillo
- `ingredients` (string, opcional): Ingredientes específicos
- `maxCalories` (number, opcional): Calorías máximas
- `minProteins` (number, opcional): Proteínas mínimas

### Ejemplo
```
GET /smae/dishes/search?q=pollo&category=proteínas&maxCalories=300
```

## Body del request

No aplica

## Ejemplo de respuesta exitosa (200 OK)

```json
[
  {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "name": "Pechuga de pollo a la plancha",
    "description": "Pechuga de pollo sin piel cocinada a la plancha con especias",
    "category": "Proteínas",
    "calories": 165,
    "proteins": 31.0,
    "lipids": 3.6,
    "carbohydrates": 0.0,
    "ingredients": [
      {
        "id": "456e7890-e89b-12d3-a456-426614174000",
        "name": "Pechuga de pollo",
        "quantity": 100,
        "unit": "g"
      },
      {
        "id": "789e0123-e89b-12d3-a456-426614174000",
        "name": "Aceite de oliva",
        "quantity": 5,
        "unit": "ml"
      }
    ],
    "preparationTime": 20,
    "difficulty": "Fácil",
    "tags": ["proteico", "bajo en grasa", "sin carbohidratos"]
  },
  {
    "id": "abc123-e89b-12d3-a456-426614174000",
    "name": "Ensalada de pollo",
    "description": "Ensalada verde con pechuga de pollo desmenuzada",
    "category": "Ensaladas",
    "calories": 180,
    "proteins": 25.0,
    "lipids": 8.0,
    "carbohydrates": 5.0,
    "ingredients": [
      {
        "id": "456e7890-e89b-12d3-a456-426614174000",
        "name": "Pechuga de pollo",
        "quantity": 80,
        "unit": "g"
      },
      {
        "id": "def456-e89b-12d3-a456-426614174000",
        "name": "Lechuga",
        "quantity": 50,
        "unit": "g"
      }
    ],
    "preparationTime": 15,
    "difficulty": "Fácil",
    "tags": ["ensalada", "proteico", "fresco"]
  }
]
```

## Códigos de estado y errores

| Código | Significado | Descripción |
|--------|-------------|-------------|
| 200 | OK | Búsqueda de platillos realizada exitosamente |
| 400 | Bad Request | Parámetros de búsqueda inválidos |
| 401 | Unauthorized | Token faltante o inválido |
| 403 | Forbidden | Sin permisos para buscar platillos |
| 500 | Internal Server Error | Error del servidor |

## Notas útiles para el frontend

- **Búsqueda avanzada:** Soporta múltiples criterios de búsqueda
- **Filtros:** Permite filtrar por categoría, calorías, proteínas, etc.
- **Ingredientes:** Muestra ingredientes detallados de cada platillo
- **Información nutricional:** Incluye valores nutricionales completos
- **Tiempo de preparación:** Indica duración estimada de preparación
- **Dificultad:** Nivel de dificultad para preparar el platillo
- **Tags:** Etiquetas descriptivas para facilitar la búsqueda
- **Categorías:** Organización por tipos de platillos

## Consideraciones técnicas

- **Estado de producción:** ⚠️ **ENDPOINT NO ACTIVO EN PRODUCCIÓN** - Router comentado en código
- **Servicio:** Implementado en `searchDishes` del servicio `smae.js`
- **Búsqueda:** Algoritmos de búsqueda por múltiples criterios
- **Filtros:** Aplicación de filtros en tiempo real
- **Base de datos:** Consulta optimizada para búsquedas de platillos
- **Ingredientes:** Incluye información detallada de ingredientes
- **Performance:** Optimizado para búsquedas rápidas y eficientes

---

**⚠️ NOTA IMPORTANTE:** Este endpoint pertenece al router `/smae/` que está comentado en el código fuente y **NO está activo en producción**. Está documentado para referencia completa de la API.
