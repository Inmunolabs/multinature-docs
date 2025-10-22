# GET /commissions

## Descripción funcional

Obtiene todas las comisiones del sistema en un rango de fechas específico. Las comisiones se devuelven ordenadas por fecha de creación. Solo se incluyen comisiones con monto mayor a 0. Útil para administradores que necesitan ver el estado general de comisiones.

## Autorización

Requiere token Bearer válido. Solo usuarios autorizados pueden consultar todas las comisiones del sistema.

## Parámetros de ruta

No aplica

## Query parameters

- `startDate` (string, opcional): Fecha de inicio del rango en formato YYYY-MM-DD. Por defecto: período de corte
- `endDate` (string, opcional): Fecha de fin del rango en formato YYYY-MM-DD. Por defecto: fecha actual

### Ejemplo

```
GET /commissions?startDate=2024-01-01&endDate=2024-01-31
```

## Body del request

No aplica

## Ejemplo de respuesta exitosa (200 OK)

```json
[
  {
    "userId": "123e4567-e89b-12d3-a456-426614174000",
    "userEmail": "especialista@ejemplo.com",
    "amount": 1250.5,
    "status": "confirming",
    "createdAt": "2024-01-15T10:30:00Z"
  },
  {
    "userId": "456e7890-e89b-12d3-a456-426614174000",
    "userEmail": "nutriologo@ejemplo.com",
    "amount": 890.75,
    "status": "liquidated",
    "createdAt": "2024-01-14T15:45:00Z"
  },
  {
    "userId": "789e0123-e89b-12d3-a456-426614174000",
    "userEmail": "fisioterapeuta@ejemplo.com",
    "amount": 2100.0,
    "status": "pending",
    "createdAt": "2024-01-13T09:20:00Z"
  }
]
```

## Códigos de estado y errores

| Código | Significado           | Descripción                              |
| ------ | --------------------- | ---------------------------------------- |
| 200    | OK                    | Comisiones obtenidas exitosamente        |
| 400    | Bad Request           | Formato incorrecto de fechas             |
| 401    | Unauthorized          | Token faltante o inválido                |
| 403    | Forbidden             | Sin permisos para consultar comisiones   |
| 404    | Not Found             | No se encontraron comisiones en el rango |
| 500    | Internal Server Error | Error del servidor                       |

## Notas útiles para el frontend

- **Filtros:** Usar parámetros de fecha para filtrar comisiones por período
- **Estados:** Los estados pueden ser: pending, confirming, liquidated, cancelled
- **Montos:** Solo se incluyen comisiones con monto mayor a 0
- **Orden:** Las comisiones se devuelven ordenadas por fecha de creación
- **Usuarios:** Cada comisión está asociada a un especialista por userId
- **Liquidación:** Las comisiones liquidadas tienen estado "liquidated"
- **Paginación:** Considerar paginación para grandes volúmenes de datos
- **Exportación:** Permitir exportar comisiones a diferentes formatos
- **Período por defecto:** Si no se especifican fechas, usa el período de corte actual

## Consideraciones técnicas

- **Middleware:** Aplica validaciones de fecha y filtros automáticos
- **Filtrado:** Usa `validateDateFilter` con período de corte por defecto
- **DTO:** La respuesta se transforma usando `commissionsToDTO()` y `commissionToDTO()`
- **Base de datos:** Consulta usando `CommissionQueries.list`
- **Fechas:** Valida formato YYYY-MM-DD para startDate y endDate
- **Performance:** Optimizado para consultas por rango de fechas
