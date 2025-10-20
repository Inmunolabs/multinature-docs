# GET /dashboard

## Descripción funcional

Obtiene el dashboard personalizado del usuario autenticado. Proporciona información resumida y estadísticas relevantes para el usuario, incluyendo métricas de actividad, resúmenes de citas, información financiera y estado de la cuenta. Por defecto filtra por el período de corte.

## Autorización

Requiere token Bearer válido. Solo usuarios autenticados pueden acceder a su dashboard personal.

## Parámetros de ruta

No aplica

## Query parameters

- `startDate` (string, opcional): Fecha de inicio en formato ISO (YYYY-MM-DD)
- `endDate` (string, opcional): Fecha de fin en formato ISO (YYYY-MM-DD)
- `page` (number, opcional): Número de página para paginación (por defecto: 1)
- `limit` (number, opcional): Número de elementos por página (por defecto: 10)

### Ejemplo
```
GET /dashboard?startDate=2024-01-01&endDate=2024-01-31
```

## Body del request

No aplica

## Ejemplo de respuesta exitosa (200 OK)

```json
{
  "awsRequestId": "456e7890-e89b-12d3-a456-426614174000",
  "message": "Dashboard obtenido exitosamente",
  "data": {
    "userInfo": {
      "id": "user123-e89b-12d3-a456-426614174000",
      "firstName": "Juan",
      "lastName": "Pérez",
      "profile": "user",
      "isValid": true,
      "hasPlan": true,
      "antiquity": "2 años, 3 meses"
    },
    "summary": {
      "totalAppointments": 24,
      "completedAppointments": 22,
      "cancelledAppointments": 2,
      "upcomingAppointments": 3,
      "totalSpent": 1200.00,
      "averageRating": 4.8
    },
    "recentActivity": [
      {
        "id": "appointment789-e89b-12d3-a456-426614174000",
        "type": "appointment",
        "date": "2024-01-25T10:00:00Z",
        "status": "completed",
        "specialist": "Dr. María García",
        "specialty": "Nutrición"
      },
      {
        "id": "review456-e89b-12d3-a456-426614174000",
        "type": "review",
        "date": "2024-01-24T15:30:00Z",
        "rating": 5,
        "specialist": "Dr. Carlos López"
      }
    ],
    "financial": {
      "balance": 150.50,
      "totalSpent": 1200.00,
      "pendingPayments": 0,
      "lastTransaction": "2024-01-25T10:00:00Z"
    },
    "network": {
      "level": 1,
      "totalReferrals": 5,
      "activeReferrals": 3,
      "commissionEarned": 75.00
    },
    "specialists": [
      {
        "id": "specialist789-e89b-12d3-a456-426614174000",
        "name": "Dr. María García",
        "specialty": "Nutrición",
        "nextAppointment": "2024-02-01T14:00:00Z",
        "totalAppointments": 15
      }
    ]
  }
}
```

## Códigos de estado y errores

| Código | Significado           | Descripción                      |
| ------ | --------------------- | -------------------------------- |
| 200    | OK                    | Dashboard obtenido exitosamente  |
| 400    | Bad Request           | Fechas inválidas o parámetros incorrectos |
| 401    | Unauthorized          | Token faltante o inválido        |
| 500    | Internal Server Error | Error del servidor               |

## Notas útiles para el frontend

- **Dashboard personalizado:** Mostrar información específica del usuario autenticado
- **Filtros por fecha:** Por defecto filtra por el período de corte
- **Métricas clave:** Resaltar estadísticas importantes como citas completadas y gastos
- **Actividad reciente:** Mostrar las últimas acciones del usuario
- **Estado financiero:** Visualizar balance y transacciones
- **Red de referidos:** Mostrar nivel actual y comisiones ganadas
- **Próximas citas:** Destacar citas programadas

## Consideraciones técnicas

- **Middleware:** Aplica `authorize` y `validateDateFilter`
- **Filtros por defecto:** Fecha de inicio por defecto: `cutoff-period`
- **Base de datos:** Consultas optimizadas para obtener información del dashboard
- **DTO:** Transformación personalizada para información del dashboard
- **Performance:** Consultas optimizadas para respuesta rápida
- **Seguridad:** Solo usuarios autenticados pueden acceder a su propio dashboard
- **Datos agregados:** Cálculos de estadísticas y métricas en tiempo real
