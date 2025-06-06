# Endpoints de Bookings

Esta documentación cubre los endpoints principales para la gestión de citas (bookings): creación y liquidación

---

## 1. Crear Booking

### Endpoint

```
POST /bookings/
```

### Descripción

Crea una nueva cita entre un usuario y un especialista. Si la cita requiere pago, se procesa el pago correspondiente. Al finalizar, retorna todas las citas del usuario o especialista.

### Parámetros obligatorios (body)

- `specialistId` (string, UUID): ID del especialista. **Obligatorio**
- `userId` (string, UUID): ID del usuario. **Obligatorio**
- `specialtyId` (string, UUID): ID de la especialidad. **Obligatorio**
- `date` (string, ISO 8601): Fecha de la cita (YYYY-MM-DD). **Obligatorio**
- `startHour` (string, HH:MM): Hora de inicio. **Obligatorio**
- `endHour` (string, HH:MM): Hora de fin. **Obligatorio**
- `amount` (number): Monto a pagar (anticipo o total). **Obligatorio si el especialista requiere pago**
- `type` (string): Tipo de pago (`card`, `cash`, etc). **Obligatorio si el especialista requiere pago**

### Parámetros opcionales (body)

- `addressId` (string, UUID): ID de la dirección.
- `videoCallUrl` (string, URL): Enlace de videollamada.
- `notes` (string): Notas adicionales.

### Validaciones principales

- Todos los IDs deben ser UUID válidos.
- `date` debe estar en formato ISO 8601 y ser una fecha futura.
- `startHour` y `endHour` deben estar en formato HH:MM y `endHour` debe ser mayor que `startHour`.
- Si se requiere pago, `amount` debe estar entre el anticipo y el precio de la consulta definidos por el especialista.
- El tipo de pago debe ser válido según los métodos soportados.

### Ejemplo de petición

```json
{
  "specialistId": "eb003fcf-fcf1-4da0-b003-35afd7198844",
  "userId": "f0d8e32b-e4bb-4e08-ae48-6c9b96a3a98f",
  "specialtyId": "123456",
  "date": "2025-12-08",
  "startHour": "16:00",
  "endHour": "17:30",
  "notes": "Cita agendada por el especialista",
  "type": "card",
  "amount": 500,
  "addressId": "opcional"
}
```

### Ejemplo de respuesta

```json
{
  "folio": "a57fffa4-f4be-4fef-bb13-bb7ed13c92f4",
  "message": "Cita creada.",
  "content": [
    {
      "id": "074b388a-7632-4829-8fc5-5e9ea913929f",
      "specialistId": "eb003fcf-fcf1-4da0-b003-35afd7198844",
      "userId": "f0d8e32b-e4bb-4e08-ae48-6c9b96a3a98f",
      "specialty": "Nutricionista",
      "address": "",
      "videoCallUrl": "",
      "status": "Cancelada",
      "date": "2025-12-09T00:00:00.000Z",
      "startHour": "15:00:00",
      "endHour": "15:30:00",
      "notes": "Cancelada jaja. CITA CANCELADA POR: Samuel rename Update. DEBIDO A: No voy a poder asistir"
    }
    // ...más citas
  ]
}
```

---

## 2. Liquidar Booking

### Endpoint

```
POST /bookings/liquidate/:id
```

### Descripción

Permite liquidar el pago pendiente de una cita ya creada. Al liquidar, retorna todas las citas del usuario o especialista.
El amount solo se pone si el pago es de anticipo de la cita, si es pago de liquidación, se ignorará el amount y se cobrará el faltante.

### Parámetros obligatorios (body)

- `type` (string): Tipo de pago (`card`, `cash`, etc). **Obligatorio**

### Ejemplo de petición

```json
{
  "type": "openpayCard",
  "deviceSessionId": "YYXX1Ku4zPv0e1i07jmfryyMr10PU0ja",
  "paymentMethodId": "7900836f-a416-4ac0-a839-9ab4bb15cc96",
  "description": "Pago de liquidación de consulta",
  "cvv": "123"
  //"amount": 250
}
```

### Ejemplo de respuesta

Igual que en el endpoint de creación, retorna el listado de bookings actualizado.

---
