# PATCH /payment-methods/shippingPayment/:id

## Descripción funcional

Actualiza el método de pago de envío para el usuario autenticado. Permite cambiar qué método de pago se utilizará para pagos automáticos de envío. Al marcar un método como método de envío, se desmarcan automáticamente todos los demás métodos. Solo se pueden marcar métodos de pago (tarjetas), no cuentas bancarias.

## Autorización

Requiere token Bearer válido. Solo usuarios autorizados pueden actualizar sus propios métodos de pago de envío.

## Parámetros de ruta

- `id` (UUID, requerido): ID único del método de pago

### Ejemplo

```
PATCH /payment-methods/shippingPayment/789e0123-e89b-12d3-a456-426614174000
```

## Query parameters

No aplica

## Body del request

No aplica

## Ejemplo de respuesta exitosa (200 OK)

```json
{
  "awsRequestId": "456e7890-e89b-12d3-a456-426614174000",
  "message": "Método de pago de envío actualizado exitosamente",
  "data": {
    "payments": [
      {
        "id": "789e0123-e89b-12d3-a456-426614174000",
        "userId": "abc123-e89b-12d3-a456-426614174000",
        "cardUse": "Pago",
        "alias": "Mi tarjeta principal",
        "cardType": "visa",
        "nameOnCard": "Carlos García",
        "cardNumber": "**** **** **** 1234",
        "expDate": "12/25",
        "bank": "Banamex",
        "openpayCardId": "kptknm6jdklnvo6",
        "isShippingPayment": true
      },
      {
        "id": "def456-e89b-12d3-a456-426614174000",
        "userId": "abc123-e89b-12d3-a456-426614174000",
        "cardUse": "Pago",
        "alias": "Tarjeta de respaldo",
        "cardType": "mastercard",
        "nameOnCard": "Carlos García",
        "cardNumber": "**** **** **** 5678",
        "expDate": "08/26",
        "bank": "Banorte",
        "openpayCardId": "kptknm6jdklnvo7",
        "isShippingPayment": false
      }
    ],
    "payout": {
      "id": "ghi789-e89b-12d3-a456-426614174000",
      "userId": "abc123-e89b-12d3-a456-426614174000",
      "cardUse": "Cobro",
      "clabe": "012345678901234567",
      "beneficiary": "Carlos García",
      "bank": "Banamex",
      "openpayBankAccountId": "kptknm6jdklnvo8"
    }
  }
}
```

## Códigos de estado y errores

| Código | Significado           | Descripción                                        |
| ------ | --------------------- | -------------------------------------------------- |
| 200    | OK                    | Método de pago de envío actualizado exitosamente   |
| 400    | Bad Request           | ID de método de pago inválido o método no editable |
| 401    | Unauthorized          | Token faltante o inválido                          |
| 403    | Forbidden             | Sin permisos para actualizar este método de pago   |
| 404    | Not Found             | Método de pago no encontrado                       |
| 500    | Internal Server Error | Error del servidor                                 |

## Notas útiles para el frontend

- **Propiedad:** Solo se pueden actualizar métodos de pago propios del usuario autenticado
- **Restricciones:** No se pueden marcar cuentas bancarias como método de envío
- **Exclusividad:** Solo un método puede ser marcado como método de envío a la vez
- **Automático:** Al marcar un método como método de envío, se desmarcan automáticamente otros
- **Respuesta:** Retorna la lista completa actualizada de métodos del usuario
- **Validaciones:** Verificar que el método de pago sea editable antes de permitir cambio
- **Interfaz:** Mostrar claramente qué método es el de envío actual

## Consideraciones técnicas

- **Middleware:** Aplica `authorize`, `idPathParam`, `ownPaymentMethodValidation` e `isNotBankAccount`
- **Validaciones:** Verifica que el usuario solo pueda actualizar sus propios métodos de pago
- **Restricciones:** No permite marcar cuentas bancarias como método de envío
- **Base de datos:** Actualiza todos los métodos de pago del usuario usando `PaymentMethodQueries.updateShippingPayment`
- **Exclusividad:** Al marcar un método como método de envío, se desmarcan automáticamente todos los demás
- **DTO:** Retorna la lista completa actualizada usando `getPaymentMethodsByUserId`
- **Performance:** Optimizado para actualizaciones masivas de estado de método de envío
- **Transaccional:** Proceso que actualiza múltiples métodos de pago simultáneamente
