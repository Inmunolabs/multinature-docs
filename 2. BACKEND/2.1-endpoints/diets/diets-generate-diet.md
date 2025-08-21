# POST /diets/generate-diet

## Descripción funcional

Genera automáticamente una dieta personalizada basándose en los datos del paciente, objetivos nutricionales y preferencias alimentarias. Utiliza algoritmos de IA para crear planes nutricionales completos con menús organizados por días y tipos de comida.

## Autorización

Requiere token Bearer válido. Solo especialistas autorizados pueden generar dietas.

## Parámetros de ruta

No aplica

## Query parameters

No aplica

## Body del request

```json
{
  "userId": "123e4567-e89b-12d3-a456-426614174000",
  "objectives": ["weight_loss", "muscle_gain"],
  "preferences": ["vegetarian", "low_sodium"],
  "restrictions": ["gluten_free", "dairy_free"],
  "caloriesTarget": 1800,
  "duration": 30
}
```

### Ejemplo de body

```json
{
  "userId": "123e4567-e89b-12d3-a456-426614174000",
  "objectives": ["weight_loss", "muscle_gain"],
  "preferences": ["vegetarian", "low_sodium"],
  "restrictions": ["gluten_free", "dairy_free"],
  "caloriesTarget": 1800,
  "duration": 30
}
```

## Ejemplo de respuesta exitosa (200 OK)

```json
{
  "awsRequestId": "456e7890-e89b-12d3-a456-426614174000",
  "message": "Dieta generada exitosamente",
  "data": {
    "id": "789e0123-e89b-12d3-a456-426614174000",
    "userId": "123e4567-e89b-12d3-a456-426614174000",
    "specialistId": "abc123-e89b-12d3-a456-426614174000",
    "objectives": ["weight_loss", "muscle_gain"],
    "caloriesPerDay": 1800,
    "proteinsPerDay": 135,
    "lipidsPerDay": 60,
    "carbohydratesPerDay": 180,
    "duration": 30,
    "meals": {
      "monday": {
        "breakfast": {
          "id": "def456-e89b-12d3-a456-426614174000",
          "name": "Desayuno proteico vegetariano",
          "description": "Avena con proteína vegetal y frutas"
        },
        "lunch": {
          "id": "ghi789-e89b-12d3-a456-426614174000",
          "name": "Ensalada de quinoa",
          "description": "Quinoa con vegetales y legumbres"
        }
      }
    },
    "createdAt": "2024-01-15T10:30:00Z"
  }
}
```

## Códigos de estado y errores

| Código | Significado | Descripción |
|--------|-------------|-------------|
| 200 | OK | Dieta generada exitosamente |
| 400 | Bad Request | Datos de generación inválidos o faltantes |
| 401 | Unauthorized | Token faltante o inválido |
| 403 | Forbidden | Sin permisos para generar dietas |
| 404 | Not Found | Usuario no encontrado |
| 500 | Internal Server Error | Error del servidor |

## Notas útiles para el frontend

- **Generación automática:** Crea dietas completas sin intervención manual
- **Personalización:** Considera objetivos, preferencias y restricciones del usuario
- **IA:** Utiliza algoritmos inteligentes para optimizar la dieta
- **Objetivos:** Soporta múltiples objetivos nutricionales simultáneos
- **Preferencias:** Respeta preferencias alimentarias del usuario
- **Restricciones:** Considera alergias e intolerancias alimentarias
- **Duración:** Permite especificar duración del plan nutricional
- **Menús completos:** Genera comidas organizadas por días y tipos

## Consideraciones técnicas

- **Estado de producción:** ⚠️ **ENDPOINT NO ACTIVO EN PRODUCCIÓN** - Comentado en el código
- **Servicio:** Implementado en `generateDiet` del servicio `generate.js`
- **IA:** Utiliza algoritmos de generación automática de dietas
- **Validaciones:** Requiere validaciones específicas para generación
- **Base de datos:** Crea dietas completas con menús y equivalencias
- **Personalización:** Considera múltiples factores del usuario
- **Optimización:** Algoritmos para balancear objetivos nutricionales

---

**⚠️ NOTA IMPORTANTE:** Este endpoint está comentado en el código fuente y **NO está activo en producción**. Está documentado para referencia completa de la API.
