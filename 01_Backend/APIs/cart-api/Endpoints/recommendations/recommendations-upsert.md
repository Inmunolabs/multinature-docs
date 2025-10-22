# PATCH /recommendations/:id

## Descripción funcional

Crea o actualiza una recomendación de productos para un paciente. Permite a un especialista crear nuevas recomendaciones o actualizar las existentes. Si la recomendación tiene menos de 7 días, se actualiza; si tiene más de 7 días, se crea una nueva y la anterior se marca como inactiva.

## Autorización

Requiere token Bearer válido. Solo especialistas autorizados pueden crear/actualizar recomendaciones para sus pacientes.

## Parámetros de ruta

- `id` (UUID, requerido): ID único del paciente

### Ejemplo
```
PATCH /recommendations/123e4567-e89b-12d3-a456-426614174000
```

## Query parameters

No aplica

## Body del request

```json
[
  {
    "id": "string",
    "quantity": "number"
  }
]
```

### Ejemplo de body

```json
[
  {
    "id": "abc123-e89b-12d3-a456-426614174000",
    "quantity": 2
  },
  {
    "id": "def456-e89b-12d3-a456-426614174000",
    "quantity": 1
  }
]
```

## Ejemplo de respuesta exitosa (201 Created)

```json
{
  "id": "456e7890-e89b-12d3-a456-426614174000",
  "userId": "123e4567-e89b-12d3-a456-426614174000",
  "specialistId": "789e0123-e89b-12d3-a456-426614174000",
  "patientName": "Juan Pérez",
  "specialistName": "Dra. María López",
  "specialties": "Nutrición, Medicina General",
  "products": [
    {
      "id": "abc123-e89b-12d3-a456-426614174000",
      "product": "Complejo B + Rutina",
      "urlImage": "https://example.com/image.png",
      "price": 150.00,
      "quantity": 2,
      "total": 300.00
    },
    {
      "id": "def456-e89b-12d3-a456-426614174000",
      "product": "Vitamina D3",
      "urlImage": "https://example.com/image2.png",
      "price": 200.00,
      "quantity": 1,
      "total": 200.00
    }
  ],
  "subtotal": 431.03,
  "ivaPorcentaje": 0.16,
  "iva": 68.97,
  "shippingCost": 150.00,
  "total": 650.00,
  "createdAt": "2025-01-15T10:30:00.000Z",
  "updatedAt": "2025-01-15T10:30:00.000Z"
}
```

## Códigos de estado y errores

| Código | Significado | Descripción |
|--------|-------------|-------------|
| 201 | Created | Recomendación creada exitosamente |
| 400 | Bad Request | Datos de validación incorrectos o campos faltantes |
| 401 | Unauthorized | Token faltante o inválido |
| 403 | Forbidden | Sin permisos para crear/actualizar recomendaciones para este paciente |
| 404 | Not Found | Paciente no encontrado |
| 500 | Internal Server Error | Error del servidor |

## Notas útiles para el frontend

- **Permisos:** Solo especialistas pueden crear recomendaciones para sus pacientes
- **Validación:** Los productos deben ser compatibles con las especialidades del especialista
- **Lógica de fechas:** Si la recomendación tiene menos de 7 días, se actualiza; si no, se crea una nueva
- **Productos:** El body debe ser un array de productos con ID y cantidad
- **Cantidades:** Las cantidades deben ser números enteros mayores o iguales a 0
- **Respuesta:** Se retorna la recomendación completa con productos y cálculos
- **Historial:** Las recomendaciones antiguas se mantienen para historial

## Consideraciones técnicas

- **Middleware:** Aplica `userBelongsToSpecialist` y `validateSpecialtyCompatibility`
- **Validaciones:** Usa `cartValidations.upsertRecommendation` para validar campos
- **Lógica de negocio:** Verifica antigüedad de recomendaciones existentes (7 días)
- **Compatibilidad:** Valida que los productos sean compatibles con las especialidades del especialista
- **Base de datos:** Usa `RecommendationsQueries.getActiveByUserAndSpecialist` para verificar existencia
- **Transaccional:** Las operaciones son atómicas para mantener consistencia
- **DTO:** Retorna la recomendación transformada con `recommendationToDTO()`
- **Stock:** Valida existencia y disponibilidad de productos antes de crear la recomendación
