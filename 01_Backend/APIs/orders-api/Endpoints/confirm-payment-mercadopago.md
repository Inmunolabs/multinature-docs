# POST /confirm/mercado-pago

## Descripción funcional

Confirma el pago de una orden procesada a través de MercadoPago. Este endpoint se utiliza para confirmar que el pago se ha completado exitosamente y actualizar el estado de la orden correspondiente. Es parte del flujo de confirmación de pagos de MercadoPago.

## Autorización

No requiere token Bearer. Este endpoint es público y es llamado por MercadoPago para confirmar pagos.

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
    "payer": {
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
  "type": "payment",
  "data": {
    "id": "mp_987654321",
    "status": "approved",
    "amount": 67200,
    "currency": "MXN",
    "created": "2024-01-15T10:30:00.000-06:00",
    "payer": {
      "name": "Ana Martínez",
      "email": "ana.martinez@example.com"
    },
    "payment_method": {
      "type": "credit_card",
      "card": {
        "brand": "mastercard",
        "last4": "5678"
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
    "orderId": "def456-e89b-12d3-a456-426614174000",
    "mercadopagoId": "mp_987654321",
    "status": "confirmed",
    "amount": 672.0,
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

- **Webhook:** Este endpoint es llamado por MercadoPago como webhook
- **Público:** No requiere autenticación del usuario
- **Confirmación:** Confirma que el pago se ha completado exitosamente
- **Estado:** Actualiza el estado de la orden correspondiente
- **MercadoPago:** Específico para pagos procesados a través de MercadoPago
- **Webhook:** Maneja notificaciones automáticas de MercadoPago
- **Validación:** Valida la autenticidad de la notificación de MercadoPago

## Consideraciones técnicas

- **Middleware:** Aplica `paymentValidation('mercadopago')` para validar la notificación
- **Webhook:** Endpoint público para recibir notificaciones de MercadoPago
- **Validación:** Verifica la autenticidad de la notificación de MercadoPago
- **Confirmación:** Llama a `confirmPayment('mercadopago')` del servicio
- **Base de datos:** Actualiza el estado de la orden correspondiente
- **Seguridad:** Valida la firma de la notificación de MercadoPago
- **Performance:** Optimizado para confirmaciones rápidas de pagos
- **Webhook:** Maneja notificaciones automáticas de MercadoPago
