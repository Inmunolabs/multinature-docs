# GET /payment-methods/:id

## Descripción funcional

Obtiene un método de pago específico por su ID. Retorna información detallada del método de pago, ya sea una tarjeta o una cuenta bancaria. Solo se puede consultar el método de pago si pertenece al usuario autenticado.

## Autorización

Requiere token Bearer válido. Solo usuarios autorizados pueden consultar métodos de pago que les pertenezcan.

## Parámetros de ruta

- `id` (UUID, requerido): ID único del método de pago

### Ejemplo

```
GET /payment-methods/789e0123-e89b-12d3-a456-426614174000
```

## Query parameters

No aplica

## Body del request

No aplica

## Ejemplo de respuesta exitosa (200 OK)

### Para método de pago (tarjeta)

```json
{
  "awsRequestId": "456e7890-e89b-12d3-a456-426614174000",
  "message": "Método de pago encontrado",
  "data": {
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
}
```

### Para método de cobro (cuenta bancaria)

```json
{
  "awsRequestId": "456e7890-e89b-12d3-a456-426614174000",
  "message": "Método de pago encontrado",
  "data": {
    "id": "ghi789-e89b-12d3-a456-426614174000",
    "userId": "abc123-e89b-12d3-a456-426614174000",
    "cardUse": "Cobro",
    "clabe": "012345678901234567",
    "beneficiary": "Carlos García",
    "bank": "Banamex",
    "openpayBankAccountId": "kptknm6jdklnvo8"
  }
}
```

## Códigos de estado y errores

| Código | Significado           | Descripción                                     |
| ------ | --------------------- | ----------------------------------------------- |
| 200    | OK                    | Método de pago obtenido exitosamente            |
| 400    | Bad Request           | ID de método de pago inválido                   |
| 401    | Unauthorized          | Token faltante o inválido                       |
| 403    | Forbidden             | Sin permisos para consultar este método de pago |
| 404    | Not Found             | Método de pago no encontrado                    |
| 500    | Internal Server Error | Error del servidor                              |

## Notas útiles para el frontend

- **Propiedad:** Solo se pueden consultar métodos de pago propios del usuario autenticado
- **Tipos:** Distinguir entre métodos de Pago (tarjetas) y Cobro (cuentas bancarias)
- **Información completa:** Incluye todos los detalles del método de pago
- **Seguridad:** Los números de tarjeta se muestran enmascarados
- **OpenPay:** Los IDs de OpenPay se usan para sincronización
- **Método de envío:** El campo `isShippingPayment` indica si es el método predeterminado
- **Validación:** Verificar que el usuario tenga permisos para acceder al método

## Consideraciones técnicas

- **Middleware:** Aplica `authorize`, `idPathParam` y `ownPaymentMethodValidation`
- **Validaciones:** Verifica que el usuario solo pueda consultar sus propios métodos de pago
- **Base de datos:** Consulta usando `PaymentMethodQueries.getById`
- **DTO:** Usa `paymentToDTO` o `payoutToDTO` según el tipo de método
- **Seguridad:** Solo permite consultar métodos de pago propios del usuario autenticado
- **Performance:** Optimizado para consultas individuales por ID
- **Tipos:** Maneja diferentes estructuras de respuesta según el tipo de método
