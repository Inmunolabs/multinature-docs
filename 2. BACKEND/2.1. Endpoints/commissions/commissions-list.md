# GET /commissions

Obtiene todas las comisiones del sistema en un rango de fechas.

---

## Método, ruta y autorización
- **Método:** GET
- **Ruta:** `/commissions?startDate=YYYY-MM-DD&endDate=YYYY-MM-DD`
- **Autorización:** Bearer token en headers

---

## Explicación funcional
Permite obtener todas las comisiones del sistema en un rango de fechas específico. Las comisiones se devuelven ordenadas por fecha de creación. Solo se incluyen comisiones con monto mayor a 0.

---

## Parámetros de query
- `startDate` (opcional): Fecha de inicio del rango (YYYY-MM-DD). Por defecto: período de corte.
- `endDate` (opcional): Fecha de fin del rango (YYYY-MM-DD). Por defecto: fecha actual.

---

## Ejemplo de respuesta exitosa (200 OK)
```json
[
  {
    "userId": "uuid",
    "userEmail": "especialista@ejemplo.com",
    "amount": 1250.50,
    "status": "confirming",
    "createdAt": "2024-01-15T10:30:00Z"
  },
  {
    "userId": "uuid",
    "userEmail": "nutriologo@ejemplo.com",
    "amount": 890.75,
    "status": "liquidated",
    "createdAt": "2024-01-14T15:45:00Z"
  },
  {
    "userId": "uuid",
    "userEmail": "fisioterapeuta@ejemplo.com",
    "amount": 2100.00,
    "status": "pending",
    "createdAt": "2024-01-13T09:20:00Z"
  }
]
```

---

## Errores comunes
| Código | Mensaje                        | Causa                                 |
|--------|--------------------------------|---------------------------------------|
| 400    | Fechas inválidas               | Formato incorrecto de fechas          |
| 403    | No autorizado                  | Token inválido o sin permisos         |
| 404    | No se encontraron comisiones   | No hay comisiones en el rango         |
| 500    | Error interno                  | Error inesperado en el servidor       |

---

## Notas útiles para frontend
- **Filtros:** Usar parámetros de fecha para filtrar comisiones por período.
- **Estados:** Los estados pueden ser: pending, confirming, liquidated, cancelled.
- **Montos:** Solo se incluyen comisiones con monto mayor a 0.
- **Orden:** Las comisiones se devuelven ordenadas por fecha de creación.
- **Usuarios:** Cada comisión está asociada a un especialista por userId.
- **Liquidación:** Las comisiones liquidadas tienen estado "liquidated".
- **Paginación:** Considerar paginación para grandes volúmenes de datos.
- **Exportación:** Permitir exportar comisiones a diferentes formatos. 