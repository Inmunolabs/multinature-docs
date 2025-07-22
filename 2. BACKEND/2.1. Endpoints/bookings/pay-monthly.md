# POST /monthly-services/

Realiza el pago de una mensualidad de servicios entre un usuario y un especialista.

---

## Método, ruta y autorización

- **Método:** POST
- **Ruta:** `/monthly-services/`
- **Autorización:** Bearer token en headers

---

## Explicación funcional

Permite a un usuario pagar una mensualidad para acceder a servicios recurrentes con un especialista. El endpoint procesa el pago y registra la relación mensual entre usuario y especialista.

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
  "message": "Pago de mensualidad realizado con éxito",
  "monthlyServiceId": "monthly-uuid",
  "status": "Activo"
}
```

---

## Errores comunes

| Código | Mensaje                              | Causa                                |
| ------ | ------------------------------------ | ------------------------------------ |
| 400    | Datos inválidos                      | Faltan campos o formato incorrecto   |
| 403    | No autorizado                        | Token inválido o sin permisos        |
| 404    | Usuario o especialista no encontrado | IDs inválidos o inexistentes         |
| 402    | Pago rechazado                       | Fondos insuficientes o error de pago |
| 500    | Error interno                        | Error inesperado en el servidor      |

---

## Notas útiles para frontend

- Validar que el usuario tenga métodos de pago registrados antes de llamar este endpoint.
- Mostrar mensajes claros de éxito o error tras el pago.
- Actualizar la UI para reflejar el estado de la mensualidad.
