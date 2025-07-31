# GET /working-hours/:id

Obtiene los horarios de trabajo configurados para un usuario (especialista).

---

## Método, ruta y autorización
- **Método:** GET
- **Ruta:** `/working-hours/:id`
- **Autorización:** Bearer token in headers

---

## Explicación funcional
Permite consultar los horarios de trabajo registrados para un especialista. Es útil para mostrar o editar la disponibilidad semanal del especialista en el frontend.

---

## Parámetros de ruta
- `id` (obligatorio): UUID del usuario (especialista).

---

## Ejemplo de respuesta exitosa (200 OK)
```json
{
  "1": [
    { "startHour": "10:15", "endHour": "11:45" }
  ],
  "2": [
    { "startHour": "10:15", "endHour": "11:45" },
    { "startHour": "11:45", "endHour": "12:45" }
  ]
}
```

---

## Errores comunes
| Código | Mensaje                        | Causa                                 |
|--------|--------------------------------|---------------------------------------|
| 403    | No autorizado                  | Token inválido o sin permisos         |
| 404    | Usuario no encontrado          | El ID no existe                       |
| 500    | Error interno                  | Error inesperado en el servidor       |

---

## Notas útiles para frontend
- Usar este endpoint para mostrar la configuración semanal de horarios en la UI.
- Las claves del objeto son los días de la semana (0 = domingo, 1 = lunes, etc.).
- Cada día puede tener múltiples intervalos de horarios.
- Permite editar o actualizar la disponibilidad desde el frontend.
