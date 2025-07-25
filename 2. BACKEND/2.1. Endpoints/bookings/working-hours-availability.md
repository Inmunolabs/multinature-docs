# GET /working-hours/availability/:id

Obtiene la disponibilidad de horarios de un especialista para agendar citas.

---

## Método, ruta y autorización
- **Método:** GET
- **Ruta:** `/working-hours/availability/:id?startDate=YYYY-MM-DD&endDate=YYYY-MM-DD`
- **Autorización:** Bearer token en headers (o hereda del contexto)

---

## Explicación funcional
Permite consultar los horarios disponibles de un especialista en un rango de fechas. Es útil para mostrar en el frontend los días y horas en los que se pueden agendar citas. La respuesta incluye solo los horarios disponibles (excluyendo los que ya tienen citas agendadas).

---

## Parámetros de ruta y query
- `id` (obligatorio): UUID del especialista.
- `startDate` (opcional, query): Fecha de inicio del rango (YYYY-MM-DD).
- `endDate` (opcional, query): Fecha de fin del rango (YYYY-MM-DD).

---

## Ejemplo de respuesta exitosa (200 OK)
```json
{
  "2025-04-01": {
    "workingHours": [
      { "startHour": "10:00", "endHour": "11:00" },
      { "startHour": "11:00", "endHour": "12:00" }
    ]
  },
  "2025-04-02": {
    "workingHours": [
      { "startHour": "09:00", "endHour": "10:00" }
    ]
  }
}
```

---

## Errores comunes
| Código | Mensaje                        | Causa                                 |
|--------|--------------------------------|---------------------------------------|
| 400    | Fechas inválidas               | Formato incorrecto de fechas          |
| 403    | No autorizado                  | Token inválido o sin permisos         |
| 404    | Especialista no encontrado     | El ID no existe                       |
| 500    | Error interno                  | Error inesperado en el servidor       |

---

## Notas útiles para frontend
- Usar este endpoint para mostrar la agenda disponible al seleccionar un especialista.
- Permite filtrar por rango de fechas para optimizar la carga de datos.
- Los horarios devueltos ya excluyen las citas ya agendadas.
- Las claves del objeto son fechas en formato YYYY-MM-DD.
- Cada fecha contiene un arreglo de intervalos disponibles de 1 hora.
