# PUT /working-hours/:userId

Actualiza los horarios de trabajo de un usuario (especialista).

---

## Método, ruta y autorización

- **Método:** PUT
- **Ruta:** `/working-hours/:userId`
- **Autorización:** Bearer token en headers

---

## Explicación funcional

Permite modificar la configuración semanal de horarios de un especialista. Es útil para que el especialista gestione su disponibilidad desde el frontend.

---

## Parámetros de ruta

- `userId` (obligatorio): UUID del usuario (especialista).

---

## Body esperado (JSON)

```json
[
  { "dayOfWeek": 1, "startHour": "10:15", "endHour": "11:45" },
  { "dayOfWeek": 2, "startHour": "10:15", "endHour": "11:45" },
  { "dayOfWeek": 2, "startHour": "11:45", "endHour": "12:45" }
]
```

---

## Ejemplo de respuesta exitosa (200 OK)

```json
{
  "message": "Horarios actualizados correctamente"
}
```

---

## Errores comunes

| Código | Mensaje               | Causa                                 |
| ------ | --------------------- | ------------------------------------- |
| 400    | Datos inválidos       | Formato incorrecto o campos faltantes |
| 403    | No autorizado         | Token inválido o sin permisos         |
| 404    | Usuario no encontrado | El ID no existe                       |
| 500    | Error interno         | Error inesperado en el servidor       |

---

## Notas útiles para frontend

- Validar que los horarios no se crucen entre sí.
- Permitir al especialista editar su disponibilidad fácilmente desde la UI.
- Mostrar mensajes claros de éxito o error tras la actualización.
