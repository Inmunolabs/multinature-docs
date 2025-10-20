# PATCH /payment-methods/:id

## Descripción funcional

Actualiza un método de pago existente del usuario autenticado. Permite modificar campos específicos como alias, fecha de expiración, nombre en la tarjeta y banco. Solo se pueden actualizar métodos de pago que pertenezcan al usuario autenticado y que no sean cuentas bancarias (tipo Cobro).

## Autorización

Requiere token Bearer válido. Solo usuarios autorizados pueden actualizar sus propios métodos de pago.

## Parámetros de ruta

- `id` (UUID, requerido): ID único del método de pago

### Ejemplo

```
PATCH /payment-methods/789e0123-e89b-12d3-a456-426614174000
```

## Query parameters

No aplica

## Body del request

```json
{
  "alias": "string",
  "expDate": "string",
  "nameOnCard": "string",
  "bank": "string",
  "shippingPayment": "boolean"
}
```

### Ejemplo de body

```json
{
  "alias": "Mi tarjeta actualizada",
  "expDate": "12/26",
  "nameOnCard": "Carlos García López",
  "bank": "Banamex",
  "shippingPayment": false
}
```

## Ejemplo de respuesta exitosa (200 OK)

```json
{
  "awsRequestId": "456e7890-e89b-12d3-a456-426614174000",
  "message": "Método de pago actualizado exitosamente",
  "data": {
    "payments": [
      {
        "id": "789e0123-e89b-12d3-a456-426614174000",
        "userId": "abc123-e89b-12d3-a456-426614174000",
        "cardUse": "Pago",
        "alias": "Mi tarjeta actualizada",
        "cardType": "visa",
        "nameOnCard": "Carlos García López",
        "cardNumber": "**** **** **** 1234",
        "expDate": "12/26",
        "bank": "Banamex",
        "openpayCardId": "kptknm6jdklnvo6",
        "isShippingPayment": false
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

| Código | Significado           | Descripción                                                   |
| ------ | --------------------- | ------------------------------------------------------------- |
| 200    | OK                    | Método de pago actualizado exitosamente                       |
| 400    | Bad Request           | Datos de actualización inválidos o método de pago no editable |
| 401    | Unauthorized          | Token faltante o inválido                                     |
| 403    | Forbidden             | Sin permisos para actualizar este método de pago              |
| 404    | Not Found             | Método de pago no encontrado                                  |
| 500    | Internal Server Error | Error del servidor                                            |

## Notas útiles para el frontend

- **Propiedad:** Solo se pueden actualizar métodos de pago propios del usuario autenticado
- **Restricciones:** No se pueden actualizar cuentas bancarias (tipo Cobro)
- **Campos editables:** Solo se pueden modificar alias, fecha de expiración, nombre en tarjeta y banco
- **Método de envío:** Al marcar `shippingPayment: true`, se desmarcan automáticamente otros métodos
- **Respuesta:** Retorna la lista completa actualizada de métodos del usuario
- **Validaciones:** Verificar que el método de pago sea editable antes de permitir actualización
- **Sincronización:** Los cambios se reflejan inmediatamente en la base de datos

## Consideraciones técnicas

- **Middleware:** Aplica `authorize`, `idPathParam`, `ownPaymentMethodValidation`, `paymentMethodsValidations.update` e `isNotBankAccount`
- **Validaciones:** Verifica que el usuario solo pueda actualizar sus propios métodos de pago
- **Restricciones:** No permite actualizar cuentas bancarias (tipo Cobro)
- **Base de datos:** Actualiza el método de pago usando `PaymentMethodQueries.update`
- **Método de envío:** Al marcar un método como método de envío, se desmarcan automáticamente otros
- **DTO:** Retorna la lista completa actualizada usando `getPaymentMethodsByUserId`
- **Campos:** Solo permite actualizar campos específicos: alias, expDate, nameOnCard y bank
- **Performance:** Optimizado para actualizaciones con validaciones y sincronización de método de envío
