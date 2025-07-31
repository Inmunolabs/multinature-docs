# POST (WEBHOOK) /service-payment/confirm

Confirma el pago de un servicio recibido desde el proveedor de pagos (webhook).

---

## Método, ruta y autorización

- **Método:** POST
- **Ruta:** `/service-payment/confirm`
- **Autorización:** No requiere autenticación

---

## Explicación funcional

Este endpoint es utilizado por el proveedor de pagos (ej. OpenPay) para notificar al backend que un pago ha sido realizado exitosamente. El backend valida y actualiza el estado del pago y la cita correspondiente.

---

## Body esperado (JSON)

```json
{
  "type": "charge.succeeded", // (obligatorio) Tipo de evento
  "event_date": "2024-12-11T23:09:40-06:00", // (obligatorio) Fecha del evento
  "transaction": {
    // (obligatorio) Detalles de la transacción
    "id": "trqvxnfnoujd2pksfvfn",
    "authorization": "380860",
    "operation_type": "in",
    "transaction_type": "charge",
    "status": "completed",
    "amount": 10,
    "currency": "MXN",
    "method": "card"
    // ...otros campos relevantes
  }
}
```

---

## Ejemplo de respuesta exitosa (200 OK)

```json
{
  "message": "Pago confirmado"
}
```

---

## Errores comunes

| Código | Mensaje                   | Causa                              |
| ------ | ------------------------- | ---------------------------------- |
| 400    | Datos inválidos           | Faltan campos o formato incorrecto |
| 404    | Transacción no encontrada | El ID no existe                    |
| 500    | Error interno             | Error inesperado en el servidor    |

---

## Notas útiles para frontend

- Este endpoint es consumido por el proveedor de pagos, no por el frontend.
- No requiere autenticación.
- El frontend puede consultar el estado del pago a través de los endpoints de bookings.
