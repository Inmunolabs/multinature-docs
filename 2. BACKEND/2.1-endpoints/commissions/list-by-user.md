# GET /commissions/user/:id

## Descripción funcional

Obtiene las comisiones de un usuario específico en un rango de fechas. Incluye detalles de las transacciones asociadas a cada comisión. Solo se incluyen comisiones con monto mayor a 0. Útil para que especialistas consulten sus propias comisiones.

## Autorización

Requiere token Bearer válido. Solo usuarios autorizados pueden consultar sus propias comisiones.

## Parámetros de ruta

- `id` (UUID, requerido): ID único del usuario

### Ejemplo
```
GET /commissions/user/123e4567-e89b-12d3-a456-426614174000
```

## Query parameters

- `startDate` (string, opcional): Fecha de inicio del rango en formato YYYY-MM-DD
- `endDate` (string, opcional): Fecha de fin del rango en formato YYYY-MM-DD

### Ejemplo
```
GET /commissions/user/123e4567-e89b-12d3-a456-426614174000?startDate=2024-01-01&endDate=2024-01-31
```

## Body del request

No aplica

## Ejemplo de respuesta exitosa (200 OK)

```json
[
  {
    "userId": "123e4567-e89b-12d3-a456-426614174000",
    "userEmail": "especialista@ejemplo.com",
    "amount": 1250.50,
    "transactions": [
      {
        "id": "456e7890-e89b-12d3-a456-426614174000",
        "amount": 400.00,
        "concept": "Consulta de nutrición",
        "date": "2024-01-15T10:30:00Z"
      },
      {
        "id": "789e0123-e89b-12d3-a456-426614174000",
        "amount": 850.50,
        "concept": "Plan nutricional personalizado",
        "date": "2024-01-14T15:45:00Z"
      }
    ],
    "status": "confirming",
    "createdAt": "2024-01-15T10:30:00Z"
  }
]
```

## Códigos de estado y errores

| Código | Significado | Descripción |
|--------|-------------|-------------|
| 200 | OK | Comisiones del usuario obtenidas exitosamente |
| 400 | Bad Request | Formato incorrecto de fechas |
| 401 | Unauthorized | Token faltante o inválido |
| 403 | Forbidden | Sin permisos para consultar comisiones de este usuario |
| 404 | Not Found | Usuario no encontrado o sin comisiones en el rango |
| 500 | Internal Server Error | Error del servidor |

## Notas útiles para el frontend

- **Permisos:** Solo usuarios pueden consultar sus propias comisiones
- **Transacciones:** Cada comisión incluye el detalle de transacciones que la componen
- **Filtros:** Usar parámetros de fecha para filtrar por período específico
- **Estados:** Los estados pueden ser: pending, confirming, liquidated, cancelled
- **Montos:** Solo se incluyen comisiones con monto mayor a 0
- **Detalles:** Las transacciones muestran el origen de cada comisión
- **Historial:** Permite ver el historial completo de comisiones del usuario
- **Período:** Si no se especifican fechas, muestra todas las comisiones del usuario

## Consideraciones técnicas

- **Middleware:** Aplica `userOwnResources` para validar que el usuario solo acceda a sus propias comisiones
- **Validaciones:** Usa `validations.idPathParam` y `validations.queryDates`
- **DTO:** La respuesta se transforma usando `commissionsToDTO()` y `commissionToUserDTO()`
- **Base de datos:** Consulta usando `CommissionQueries.getByUserId`
- **Filtrado:** Aplica filtros de fecha opcionales
- **Performance:** Optimizado para consultas por usuario y rango de fechas
