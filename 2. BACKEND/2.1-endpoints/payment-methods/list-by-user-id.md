# GET /payment-methods/user/:id

## Descripción funcional

Lista todos los métodos de pago de un usuario específico. Retorna tanto métodos de pago (tarjetas) como métodos de cobro (cuentas bancarias) organizados en una estructura separada. Solo se pueden consultar los métodos de pago del usuario autenticado.

## Autorización

Requiere token Bearer válido. Solo usuarios autorizados pueden consultar sus propios métodos de pago.

## Parámetros de ruta

- `id` (UUID, requerido): ID único del usuario

### Ejemplo

```
GET /payment-methods/user/abc123-e89b-12d3-a456-426614174000
```

## Query parameters

No aplica

## Body del request

No aplica

## Ejemplo de respuesta exitosa (200 OK)

```json
{
  "awsRequestId": "456e7890-e89b-12d3-a456-426614174000",
  "message": "Métodos de pago encontrados",
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

| Código | Significado           | Descripción                                                 |
| ------ | --------------------- | ----------------------------------------------------------- |
| 200    | OK                    | Métodos de pago obtenidos exitosamente                      |
| 400    | Bad Request           | ID de usuario inválido                                      |
| 401    | Unauthorized          | Token faltante o inválido                                   |
| 403    | Forbidden             | Sin permisos para consultar métodos de pago de este usuario |
| 500    | Internal Server Error | Error del servidor                                          |

## Notas útiles para el frontend

- **Usuario único:** Solo se pueden consultar los métodos de pago del usuario autenticado
- **Estructura separada:** Los métodos se dividen en `payments` (tarjetas) y `payout` (cuenta bancaria)
- **Método de envío:** Solo un método de pago puede tener `isShippingPayment: true`
- **Tarjetas:** Mostrar iconos según el tipo de tarjeta (visa, mastercard, etc.)
- **Números de tarjeta:** Solo se muestran los últimos 4 dígitos por seguridad
- **Fechas:** Formato MM/YY para fechas de expiración
- **OpenPay:** Los IDs de OpenPay se usan para sincronización con el proveedor
- **Cuenta bancaria:** Solo se permite una cuenta bancaria para cobros por usuario

## Consideraciones técnicas

- **Middleware:** Aplica `authorize`, `idPathParam` y `userOwnResources`
- **Validaciones:** Verifica que el usuario solo pueda acceder a sus propios métodos de pago
- **Base de datos:** Consulta usando `PaymentMethodQueries.listByUserId`
- **DTO:** Usa `paymentMethodsToDTO` para separar métodos de pago y cobro
- **Seguridad:** Solo permite consultar métodos de pago propios del usuario autenticado
- **Performance:** Optimizado para consultas de métodos de pago por usuario
- **Estructura:** Organiza la respuesta en dos categorías: payments y payout
