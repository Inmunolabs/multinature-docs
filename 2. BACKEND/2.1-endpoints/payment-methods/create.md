# POST /payment-methods/:id

## Descripción funcional

Crea un nuevo método de pago para el usuario autenticado. Permite crear tanto tarjetas de crédito/débito (tipo Pago) como cuentas bancarias (tipo Cobro). Las tarjetas se procesan a través de OpenPay y se sincronizan con la base de datos local. El primer método de pago creado se establece automáticamente como método de envío.

## Autorización

Requiere token Bearer válido. Solo usuarios autorizados pueden crear métodos de pago para sí mismos.

## Parámetros de ruta

- `id` (UUID, requerido): ID único del usuario (debe coincidir con el usuario autenticado)

### Ejemplo
```
POST /payment-methods/abc123-e89b-12d3-a456-426614174000
```

## Query parameters

No aplica

## Body del request

### Para método de pago (tarjeta)
```json
{
  "cardUse": "Pago",
  "alias": "string",
  "tokenId": "string",
  "deviceSessionId": "string",
  "nameOnCard": "string"
}
```

### Para método de cobro (cuenta bancaria)
```json
{
  "cardUse": "Cobro",
  "bank": "string",
  "beneficiary": "string",
  "clabe": "string"
}
```

### Ejemplo de body para tarjeta
```json
{
  "cardUse": "Pago",
  "alias": "Mi tarjeta principal",
  "tokenId": "kptknm6jdklnvo6",
  "deviceSessionId": "device_session_123",
  "nameOnCard": "Carlos García"
}
```

### Ejemplo de body para cuenta bancaria
```json
{
  "cardUse": "Cobro",
  "bank": "Banamex",
  "beneficiary": "Carlos García",
  "clabe": "012345678901234567"
}
```

## Ejemplo de respuesta exitosa (201 Created)

```json
{
  "awsRequestId": "456e7890-e89b-12d3-a456-426614174000",
  "message": "Método de pago creado exitosamente",
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
      }
    ],
    "payout": {}
  }
}
```

## Códigos de estado y errores

| Código | Significado | Descripción |
|--------|-------------|-------------|
| 201 | Created | Método de pago creado exitosamente |
| 400 | Bad Request | Datos del método de pago inválidos o límite excedido |
| 401 | Unauthorized | Token faltante o inválido |
| 403 | Forbidden | Sin permisos para crear métodos de pago |
| 404 | Not Found | Usuario no encontrado |
| 500 | Internal Server Error | Error del servidor |

## Notas útiles para el frontend

- **Tipos:** Distinguir claramente entre métodos de Pago y Cobro
- **Límites:** Verificar que no se exceda el límite máximo de métodos por usuario
- **OpenPay:** Para tarjetas, se requiere `tokenId` y `deviceSessionId` de OpenPay
- **Método de envío:** El primer método de pago se establece automáticamente como método de envío
- **Validaciones:** Verificar que el usuario tenga permisos para crear métodos de pago
- **Respuesta:** La respuesta incluye la lista completa actualizada de métodos del usuario
- **Sincronización:** Las tarjetas se sincronizan automáticamente con OpenPay

## Consideraciones técnicas

- **Middleware:** Aplica `authorize`, `idPathParam`, `userOwnResources`, `validateMaxPaymentMethodsPerUser` y `paymentMethodsValidations.create`
- **Validaciones:** Verifica que el usuario solo pueda crear métodos de pago para sí mismo
- **Límites:** Valida que no se exceda el límite máximo de métodos por usuario
- **OpenPay:** Para tarjetas, crea la tarjeta en OpenPay antes de guardar en la base de datos
- **Base de datos:** Crea el método de pago usando `PaymentMethodQueries.add`
- **DTO:** Retorna la lista completa actualizada usando `getPaymentMethodsByUserId`
- **Método de envío:** El primer método de pago se marca automáticamente como `isShippingPayment: true`
- **Tipos:** Maneja diferentes lógicas según el tipo de método (Pago vs Cobro)
- **Performance:** Optimizado para creación con validaciones completas y sincronización con OpenPay
