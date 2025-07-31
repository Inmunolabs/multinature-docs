# POST /payment-methods/:id

Crea un nuevo método de pago para un usuario.

---

## Método, ruta y autorización
- **Método:** POST
- **Ruta:** `/payment-methods/:id`
- **Autorización:** Bearer token en headers

---

## Explicación funcional
Permite crear un nuevo método de pago para un usuario. Puede ser una tarjeta de crédito/débito (para pagos) o una cuenta bancaria (para cobros). Si es el primer método de pago del usuario, se marca automáticamente como método de envío (isShippingPayment = true).

---

## Parámetros de ruta
- `id` (obligatorio): UUID del usuario que tendrá el método de pago.

---

## Body esperado (JSON)

### Para tarjetas de crédito/débito (Pago):
```json
{
  "cardUse": "Pago",                                    // (obligatorio) Tipo de uso
  "alias": "Mi tarjeta principal",                      // (opcional) Alias del método
  "deviceSessionId": "n2dE7tieK04KU6xgRkdoi2NE00PN5mS1", // (obligatorio) ID de sesión del dispositivo
  "tokenId": "kroqjbkglfueodwyqii5"                    // (obligatorio) Token de OpenPay
}
```

### Para cuentas bancarias (Cobro):
```json
{
  "cardUse": "Cobro",                                  // (obligatorio) Tipo de uso
  "bank": "Banco Azteca",                              // (obligatorio) Nombre del banco
  "beneficiary": "Juan Pérez",                         // (obligatorio) Nombre del beneficiario
  "clabe": "646180109400423323"                        // (obligatorio) CLABE de la cuenta
}
```

---

## Ejemplo de respuesta exitosa (201 Created)
```json
{
  "payments": [
    {
      "id": "uuid",
      "userId": "uuid",
      "cardUse": "Pago",
      "alias": "Mi tarjeta principal",
      "cardType": "visa",
      "nameOnCard": "Juan Pérez",
      "cardNumber": "****1234",
      "expDate": "12/25",
      "bank": "Banco Azteca",
      "openpayCardId": "openpay-card-id",
      "isShippingPayment": true
    }
  ],
  "payout": {
    "id": "uuid",
    "userId": "uuid",
    "cardUse": "Cobro",
    "clabe": "646180109400423323",
    "beneficiary": "Juan Pérez",
    "bank": "Banco Azteca",
    "openpayBankAccountId": "openpay-bank-account-id"
  }
}
```

---

## Errores comunes
| Código | Mensaje                        | Causa                                 |
|--------|--------------------------------|---------------------------------------|
| 400    | Datos inválidos                | Faltan campos obligatorios            |
| 400    | Límite de métodos excedido     | Usuario tiene demasiados métodos      |
| 400    | Token inválido                 | Token de OpenPay no válido            |
| 403    | No autorizado                  | Token inválido o sin permisos         |
| 404    | Usuario no encontrado          | El ID del usuario no existe           |
| 500    | Error interno                  | Error inesperado en el servidor       |

---

## Notas útiles para frontend
- **Tipos:** Distinguir entre métodos de pago (Pago) y cobro (Cobro).
- **Primer método:** Si es el primer método de pago, se marca como envío automático.
- **OpenPay:** Los métodos se crean primero en OpenPay y luego en la base de datos.
- **Tarjetas:** Para tarjetas se requiere deviceSessionId y tokenId de OpenPay.
- **Cuentas:** Para cuentas bancarias se requiere CLABE y datos del beneficiario.
- **Seguridad:** Los datos sensibles se manejan a través de OpenPay.
- **Límites:** Cada usuario tiene un límite de métodos de pago.
- **Predeterminado:** Solo un método puede ser de envío por usuario. 