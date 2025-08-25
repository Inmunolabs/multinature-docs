# DELETE /payment-methods/:id

## Descripción funcional

Elimina un método de pago específico del usuario autenticado. Permite eliminar tanto tarjetas como cuentas bancarias. Antes de eliminar, valida que el método no esté siendo utilizado en compras mensuales activas y que no sea el método de pago de envío principal. Para tarjetas, también elimina la tarjeta de OpenPay.

## Autorización

Requiere token Bearer válido. Solo usuarios autorizados pueden eliminar sus propios métodos de pago.

## Parámetros de ruta

- `id` (UUID, requerido): ID único del método de pago a eliminar

### Ejemplo

```
DELETE /payment-methods/789e0123-e89b-12d3-a456-426614174000
```

## Query parameters

No aplica

## Body del request

No aplica

## Ejemplo de respuesta exitosa (200 OK)

```json
{
  "awsRequestId": "456e7890-e89b-12d3-a456-426614174000",
  "message": "Método de pago eliminado exitosamente",
  "data": {
    "payments": [
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
        "isShippingPayment": true
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

| Código | Significado           | Descripción                                                         |
| ------ | --------------------- | ------------------------------------------------------------------- |
| 200    | OK                    | Método de pago eliminado exitosamente                               |
| 400    | Bad Request           | ID de método de pago inválido o método no eliminable                |
| 401    | Unauthorized          | Token faltante o inválido                                           |
| 403    | Forbidden             | Sin permisos para eliminar este método de pago                      |
| 404    | Not Found             | Método de pago no encontrado                                        |
| 428    | Precondition Failed   | Método de pago no puede ser eliminado (en uso o es método de envío) |
| 500    | Internal Server Error | Error del servidor                                                  |

## Notas útiles para el frontend

- **Propiedad:** Solo se pueden eliminar métodos de pago propios del usuario autenticado
- **Restricciones:** No se pueden eliminar métodos que estén en compras mensuales activas
- **Método de envío:** No se puede eliminar el método marcado como método de pago de envío
- **Confirmación:** Solicitar confirmación antes de eliminar métodos de pago
- **Validaciones:** Verificar que el método sea eliminable antes de mostrar opción de eliminar
- **Respuesta:** Retorna la lista actualizada de métodos del usuario
- **Interfaz:** Ocultar botón de eliminar para métodos no eliminables
- **Feedback:** Mostrar mensaje claro sobre por qué no se puede eliminar un método

## Consideraciones técnicas

- **Middleware:** Aplica `authorize`, `idPathParam`, `ownPaymentMethodValidation` e `isNotInMonthlyPurchase`
- **Validaciones:** Verifica que el usuario solo pueda eliminar sus propios métodos de pago
- **Restricciones:** Previene eliminación de métodos en compras mensuales activas
- **Método de envío:** Previene eliminación del método marcado como método de pago de envío
- **Base de datos:** Elimina el método usando `PaymentMethodQueries.delete`
- **OpenPay:** Para tarjetas, elimina también la tarjeta de OpenPay usando `deleteCard`
- **DTO:** Retorna la lista actualizada usando `getPaymentMethodsByUserId`
- **Transaccional:** Proceso que elimina tanto de base de datos como de OpenPay
- **Validaciones de negocio:** Verifica estado de compras mensuales antes de permitir eliminación
