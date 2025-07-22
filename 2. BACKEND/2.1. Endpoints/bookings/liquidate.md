# POST /bookings/liquidate/:id

Realiza el pago de liquidación de una cita específica.

---

## Método, ruta y autorización

- **Método:** POST
- **Ruta:** `/bookings/liquidate/:id`
- **Autorización:** Bearer token en headers

---

## Explicación funcional

Permite al usuario liquidar el pago pendiente de una cita. Se utiliza cuando la cita requiere pago posterior a la creación (por ejemplo, liquidación de saldo o pago total antes de la consulta). El endpoint procesa el pago usando el método seleccionado.

---

## Parámetros de ruta

- `id` (obligatorio): UUID de la cita a liquidar.

---

## Body esperado (JSON)

```json
{
  "type": "openpayCard", // (obligatorio) Tipo de método de pago
  "deviceSessionId": "string", // (obligatorio) ID de sesión del dispositivo
  "paymentMethodId": "uuid", // (obligatorio) ID del método de pago
  "description": "Pago de liquidación de consulta", // (opcional) Descripción
  "cvv": "123" // (obligatorio si es tarjeta)
}
```

---

## Ejemplo de respuesta exitosa (200 OK)

```json
{
  "message": "Pago realizado con éxito",
  "paymentId": "payment-uuid",
  "status": "Pagado"
}
```

---

## Errores comunes

| Código | Mensaje                 | Causa                                |
| ------ | ----------------------- | ------------------------------------ |
| 400    | Datos de pago inválidos | Faltan campos o formato incorrecto   |
| 403    | No autorizado           | Token inválido o sin permisos        |
| 404    | Cita no encontrada      | El ID no existe o ya fue pagada      |
| 402    | Pago rechazado          | Fondos insuficientes o error de pago |
| 500    | Error interno           | Error inesperado en el servidor      |

---

## Notas útiles para frontend

- Validar que el usuario tenga métodos de pago registrados antes de llamar este endpoint.
- Mostrar mensajes claros de éxito o error tras el pago.
- Actualizar el estado de la cita en la UI tras el pago exitoso.
