# DELETE /monthly-services/

Cancela una mensualidad activa entre un usuario y un especialista.

---

## Método, ruta y autorización

- **Método:** DELETE
- **Ruta:** `/monthly-services/`
- **Autorización:** Bearer token en headers

---

## Explicación funcional

Permite a un usuario cancelar una suscripción mensual activa con un especialista. El endpoint elimina la relación mensual y detiene los servicios recurrentes.

---

## Body esperado (JSON)

```json
{
  "userId": "uuid", // (obligatorio) ID del usuario (paciente)
  "specialistId": "uuid" // (obligatorio) ID del especialista
}
```

---

## Ejemplo de respuesta exitosa (200 OK)

```json
{
  "message": "Mensualidad cancelada correctamente",
  "status": "Cancelado"
}
```

---

## Errores comunes

| Código | Mensaje                   | Causa                              |
| ------ | ------------------------- | ---------------------------------- |
| 400    | Datos inválidos           | Faltan campos o formato incorrecto |
| 403    | No autorizado             | Token inválido o sin permisos      |
| 404    | Mensualidad no encontrada | No existe relación activa          |
| 500    | Error interno             | Error inesperado en el servidor    |

---

## Notas útiles para frontend

- Confirmar con el usuario antes de cancelar la mensualidad.
- Actualizar la UI para reflejar el estado cancelado.
- Mostrar mensajes claros de éxito o error al usuario.
