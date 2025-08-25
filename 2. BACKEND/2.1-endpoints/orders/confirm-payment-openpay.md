# POST /confirm

## Descripción funcional

Confirma el pago de una orden procesada a través de OpenPay. Este endpoint se utiliza para confirmar que el pago se ha completado exitosamente y actualizar el estado de la orden correspondiente. Es parte del flujo de confirmación de pagos de OpenPay.

## Autorización

No requiere token Bearer. Este endpoint es público y es llamado por OpenPay para confirmar pagos.

## Parámetros de ruta

No aplica

## Query parameters

No aplica

## Body del request

```json
{
  "type": "string",
  "data": {
    "id": "string",
    "status": "string",
    "amount": "number",
    "currency": "string",
    "created": "number",
    "customer": {
      "name": "string",
      "email": "string"
    },
    "payment_method": {
      "type": "string",
      "card": {
        "brand": "string",
        "last4": "string"
      }
    }
  }
}
```

### Ejemplo de body

```json
{
  "type": "charge.succeeded",
  "data": {
    "id": "ch_123456789",
    "status": "succeeded",
    "amount": 136797,
    "currency": "mxn",
    "created": 1705312800,
    "customer": {
      "name": "Carlos García",
      "email": "carlos.garcia@example.com"
    },
    "payment_method": {
      "type": "card",
      "card": {
        "brand": "visa",
        "last4": "1234"
      }
    }
  }
}
```

## Ejemplo de respuesta exitosa (200 OK)

```json
{
  "awsRequestId": "456e7890-e89b-12d3-a456-426614174000",
  "message": "Pago confirmado exitosamente",
  "data": {
    "orderId": "789e0123-e89b-12d3-a456-426614174000",
    "openpayId": "ch_123456789",
    "status": "confirmed",
    "amount": 1367.97,
    "message": "El pago ha sido confirmado y la orden ha sido procesada"
  }
}
```

## Códigos de estado y errores

| Código | Significado           | Descripción                     |
| ------ | --------------------- | ------------------------------- |
| 200    | OK                    | Pago confirmado exitosamente    |
| 400    | Bad Request           | Datos de confirmación inválidos |
| 500    | Internal Server Error | Error del servidor              |

## Notas útiles para el frontend

- **Webhook:** Este endpoint es llamado por OpenPay como webhook
- **Público:** No requiere autenticación del usuario
- **Confirmación:** Confirma que el pago se ha completado exitosamente
- **Estado:** Actualiza el estado de la orden correspondiente
- **OpenPay:** Específico para pagos procesados a través de OpenPay
- **Webhook:** Maneja notificaciones automáticas de OpenPay
- **Validación:** Valida la autenticidad de la notificación de OpenPay

## Consideraciones técnicas

- **Middleware:** Aplica `paymentValidation('openpay')` para validar la notificación
- **Webhook:** Endpoint público para recibir notificaciones de OpenPay
- **Validación:** Verifica la autenticidad de la notificación de OpenPay
- **Confirmación:** Llama a `confirmPayment('openpay')` del servicio
- **Base de datos:** Actualiza el estado de la orden correspondiente
- **Seguridad:** Valida la firma de la notificación de OpenPay
- **Performance:** Optimizado para confirmaciones rápidas de pagos
- **Webhook:** Maneja notificaciones automáticas de OpenPay
