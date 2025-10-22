# POST (WEBHOOK) /service-payment/confirm

## Descripción funcional

Confirma el pago de un servicio recibido desde el proveedor de pagos (webhook). Este endpoint es utilizado por el proveedor de pagos (ej. OpenPay) para notificar al backend que un pago ha sido realizado exitosamente. El backend valida y actualiza el estado del pago y la cita correspondiente.

## Autorización

No requiere autenticación. Es un webhook del proveedor de pagos.

## Parámetros de ruta

No aplica

## Query parameters

No aplica

## Body del request

```json
{
  "type": "string",
  "event_date": "string",
  "transaction": {
    "id": "string",
    "authorization": "string",
    "operation_type": "string",
    "transaction_type": "string",
    "status": "string",
    "amount": "number",
    "currency": "string",
    "method": "string"
  }
}
```

### Ejemplo de body

```json
{
  "type": "charge.succeeded",
  "event_date": "2024-12-11T23:09:40-06:00",
  "transaction": {
    "id": "trqvxnfnoujd2pksfvfn",
    "authorization": "380860",
    "operation_type": "in",
    "transaction_type": "charge",
    "status": "completed",
    "amount": 10,
    "currency": "MXN",
    "method": "card"
  }
}
```

## Ejemplo de respuesta exitosa (200 OK)

```json
{
  "message": "Pago confirmado"
}
```

## Códigos de estado y errores

| Código | Significado | Descripción |
|--------|-------------|-------------|
| 200 | OK | Pago confirmado exitosamente |
| 400 | Bad Request | Faltan campos o formato incorrecto |
| 404 | Not Found | Transacción no encontrada |
| 500 | Internal Server Error | Error del servidor |

## Notas útiles para el frontend

- **Webhook:** Este endpoint es consumido por el proveedor de pagos, no por el frontend
- **Sin autenticación:** No requiere token ni credenciales
- **Estado del pago:** El frontend puede consultar el estado del pago a través de los endpoints de bookings
- **Notificaciones:** El backend envía notificaciones automáticas cuando se confirma un pago
- **Sincronización:** Los cambios se reflejan automáticamente en los endpoints de consulta

## Consideraciones técnicas

- **Webhook:** Endpoint público para recibir notificaciones del proveedor de pagos
- **Validación:** El backend valida la autenticidad del webhook antes de procesar
- **Transaccional:** Actualiza tanto el estado del pago como el de la cita relacionada
- **Notificaciones:** Envía emails automáticos de confirmación
- **Seguridad:** Implementa validaciones para prevenir webhooks maliciosos
