# DELETE /bookings/:id

Elimina una cita existente por su ID.

---

## Método, ruta y autorización

- **Método:** DELETE
- **Ruta:** `/bookings/:id`
- **Autorización:** Bearer token en headers

---

## Explicación funcional

Elimina una cita previamente agendada. Solo usuarios autorizados pueden realizar esta acción. Es útil para permitir al paciente o especialista eliminar una cita antes de que ocurra.

---

## Parámetros de ruta

- `id` (obligatorio): UUID de la cita a eliminar.

---

## Ejemplo de respuesta exitosa (200 OK)

```json
{
  "message": "Cita eliminada correctamente"
}
```

---

## Errores comunes

| Código | Mensaje            | Causa                              |
| ------ | ------------------ | ---------------------------------- |
| 403    | No autorizado      | Token inválido o sin permisos      |
| 404    | Cita no encontrada | El ID no existe o ya fue eliminada |
| 500    | Error interno      | Error inesperado en el servidor    |

---

## Notas útiles para frontend

- Confirmar con el usuario antes de eliminar la cita.
- Actualizar la UI para reflejar la eliminación.
- Mostrar mensajes claros de éxito o error al usuario.
