# POST /diets/diet-calculations/:id

## Descripción funcional

Calcula los valores nutricionales de una dieta basándose en fórmulas específicas y datos del paciente. Permite obtener cálculos personalizados de calorías, macronutrientes y otros valores nutricionales según edad, género, peso, altura y nivel de actividad física del usuario.

## Autorización

Requiere token Bearer válido. Solo especialistas autorizados pueden calcular dietas para sus pacientes.

## Parámetros de ruta

- `id` (UUID, requerido): ID único del paciente

### Ejemplo
```
POST /diets/diet-calculations/123e4567-e89b-12d3-a456-426614174000
```

## Query parameters

No aplica

## Body del request

```json
{
  "formulas": ["harris-benedict", "mifflin-st-jeor"],
  "CAF": 1.55,
  "ETA": 30,
  "AF": 1.2
}
```

### Ejemplo de body

```json
{
  "formulas": ["harris-benedict", "mifflin-st-jeor"],
  "CAF": 1.55,
  "ETA": 30,
  "AF": 1.2
}
```

## Ejemplo de respuesta exitosa (200 OK)

```json
{
  "awsRequestId": "456e7890-e89b-12d3-a456-426614174000",
  "message": "Cálculos de dieta obtenidos exitosamente",
  "data": {
    "harris-benedict": {
      "basal": 1650.5,
      "total": 2558.3,
      "proteins": 191.9,
      "lipids": 85.3,
      "carbohydrates": 255.8
    },
    "mifflin-st-jeor": {
      "basal": 1580.2,
      "total": 2449.3,
      "proteins": 183.7,
      "lipids": 81.6,
      "carbohydrates": 244.9
    },
    "recommended": {
      "calories": 2500,
      "proteins": 188,
      "lipids": 83,
      "carbohydrates": 250
    }
  }
}
```

## Códigos de estado y errores

| Código | Significado | Descripción |
|--------|-------------|-------------|
| 200 | OK | Cálculos de dieta obtenidos exitosamente |
| 400 | Bad Request | Datos de cálculo inválidos o faltantes |
| 401 | Unauthorized | Token faltante o inválido |
| 403 | Forbidden | Sin permisos para calcular dieta para este paciente |
| 404 | Not Found | Paciente no encontrado |
| 500 | Internal Server Error | Error del servidor |

## Notas útiles para el frontend

- **Fórmulas:** Soporta múltiples fórmulas de cálculo nutricional
- **Personalización:** Los cálculos se basan en datos específicos del paciente
- **Resultados:** Incluye valores basales y totales para cada fórmula
- **Recomendaciones:** Proporciona valores recomendados para la dieta
- **Validación:** Solo especialistas pueden calcular dietas para sus pacientes
- **Datos del paciente:** Se obtienen automáticamente del perfil del usuario
- **Fórmulas disponibles:** Harris-Benedict, Mifflin-St Jeor, entre otras
- **Factores:** Considera nivel de actividad física y otros factores

## Consideraciones técnicas

- **Middleware:** Aplica `userBelongsToSpecialist` para validar permisos
- **Validaciones:** Usa `dietCalculationValidation` para validar datos
- **Cálculos:** Implementa múltiples fórmulas nutricionales estándar
- **Datos del paciente:** Obtiene edad, género, peso y altura automáticamente
- **Fórmulas:** Soporta diferentes algoritmos de cálculo nutricional
- **Factores:** Aplica factores de actividad física y otros multiplicadores
- **Resultados:** Retorna cálculos por fórmula y recomendaciones finales
