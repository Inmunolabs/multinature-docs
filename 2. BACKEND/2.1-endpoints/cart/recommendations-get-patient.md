# GET /recommendations/patient/:id

## Descripción funcional

Obtiene las recomendaciones de un paciente específico. Permite a un especialista consultar las recomendaciones que ha creado para un paciente en particular, incluyendo productos recomendados y cálculos de precios.

## Autorización

Requiere token Bearer válido. Solo especialistas autorizados pueden consultar recomendaciones de sus pacientes.

## Parámetros de ruta

- `id` (UUID, requerido): ID único del paciente

### Ejemplo
```
GET /recommendations/patient/123e4567-e89b-12d3-a456-426614174000
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
        "quantity": 1,
        "total": 150.00
      },
      {
        "id": "def456-e89b-12d3-a456-426614174000",
        "product": "Vitamina D3",
        "urlImage": "https://example.com/image2.png",
        "price": 200.00,
        "quantity": 2,
        "total": 400.00
      }
    ],
    "subtotal": 474.14,
    "ivaPorcentaje": 0.16,
    "iva": 75.86,
    "shippingCost": 150.00,
    "total": 700.00,
    "createdAt": "2025-01-15T10:30:00.000Z",
    "updatedAt": "2025-01-15T10:30:00.000Z"
  }
]
```

## Códigos de estado y errores

| Código | Significado | Descripción |
|--------|-------------|-------------|
| 200 | OK | Recomendaciones del paciente obtenidas exitosamente |
| 401 | Unauthorized | Token faltante o inválido |
| 403 | Forbidden | Sin permisos para consultar recomendaciones de este paciente |
| 404 | Not Found | Paciente no encontrado |
| 500 | Internal Server Error | Error del servidor |

## Notas útiles para el frontend

- **Permisos:** Solo especialistas pueden consultar recomendaciones de sus pacientes
- **Relación:** El especialista debe tener una relación establecida con el paciente
- **Productos:** Cada recomendación incluye lista completa de productos recomendados
- **Cálculos:** Los precios incluyen IVA y costo de envío calculados automáticamente
- **Historial:** Se muestran tanto recomendaciones activas como históricas
- **Especialidades:** Los productos deben ser compatibles con las especialidades del especialista
- **Fechas:** Las recomendaciones incluyen fechas de creación y actualización

## Consideraciones técnicas

- **Middleware:** Aplica `userBelongsToSpecialist` para validar la relación especialista-paciente
- **DTO:** La respuesta se transforma usando `recommendationsToDTO()` para consistencia
- **Validación:** Verifica que el especialista tenga permisos para acceder al paciente
- **Base de datos:** Consulta usando `RecommendationsQueries.getByUserAndSpecialist`
- **Constantes:** Usa `dbConstants` para IVA y costo de envío
- **Cálculos:** Los cálculos de precios se realizan automáticamente en el backend
- **Seguridad:** Solo permite acceso a pacientes que pertenecen al especialista autenticado
