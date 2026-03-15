# Pagos de citas en bookings-api y variable PAYMENTS_ENABLED

**Versión:** 1.0  
**Fecha:** 2026-03-15  
**API:** bookings-api (Multinature)

---

## 1. Resumen

En la **bookings-api** la gestión de pagos de citas (creación de `service_payments`, liquidación, confirmación condicionada al pago y suscripción mensual) puede activarse o desactivarse de forma global mediante la variable de entorno **`PAYMENTS_ENABLED`**. Con pagos desactivados, especialistas y pacientes pueden agendar citas sin generar cobros.

---

## 2. Variable de entorno PAYMENTS_ENABLED

| Valor        | Efecto |
|-------------|--------|
| `'true'` o no definida | Comportamiento normal: se validan y crean pagos según la configuración del especialista (`chargePerConsultation`, `chargeAdvancePayment`). |
| `'false'`   | Toda la gestión de pagos queda desactivada: no se crea `service_payment`, no se exige `amount` ni `type` de pago; las citas se crean y pueden confirmarse sin cobro. Los endpoints **liquidar** y **suscripción mensual** responden **503** con el mensaje *La gestión de pagos está desactivada.* |

**Dónde se define:** En la configuración de la API (p. ej. `serverless.yml`, `configDeploy/serverless*.yaml`). Documentación específica: `apis/bookings-api/docs/README.md`.

---

## 3. Tipos de pago (ServicePaymentNames)

Definidos en `multi-mysql-layer` (entidad `servicePayment`). En bookings-api se usan así:

| Nombre (valor en BD)   | Uso |
|------------------------|-----|
| **Anticipo de consulta** | Al crear cita con monto menor al precio de la consulta; o al liquidar cuando ya existe un anticipo pagado (se crea complemento). |
| **Consulta**           | Al crear cita con monto igual al precio de la consulta (pago completo); o al liquidar sin pago previo con monto = precio. |
| **Mensualidad**        | Solo en el flujo de **suscripción mensual** (POST/DELETE `/monthly-subscription/`), no asociado a una cita concreta. |

Estados de pago: *Confirmando el Pago*, *Pagado*, *Cancelado*. Tipos de método: `openpayCard`, `openpayStore`, `mercadoPago`, `cash`.

---

## 4. Flujos que tocan pagos (cuando PAYMENTS_ENABLED = true)

- **POST /bookings**  
  Si el especialista tiene cobro configurado, se valida `amount` y tipo de pago; se crea `service_payment` (Consulta o Anticipo de consulta). Si no hay cobro o quien crea es el paciente sin cobro, la cita puede quedar confirmada sin pago.

- **POST /bookings/liquidate/:id**  
  Permite crear el primer pago de la cita (si no existía) o un **complemento** de liquidación cuando ya hay un anticipo pagado. Validaciones: `amount` entre anticipo y precio completo; usuario con `openpayUserId` si aplica; no permitir liquidar si ya está todo pagado o ya hay complemento solicitado.

- **PATCH /bookings/:id** (confirmar cita)  
  Para que un no-especialista pueda poner la cita en estado *Confirmada*, debe existir un `service_payment` con estado *Pagado* (salvo cuando PAYMENTS_ENABLED = false, que no se exige pago).

- **POST /monthly-subscription**  
  Crea un `service_payment` de tipo *Mensualidad* (OpenPay). Requiere `monthlyCharge > 0` en la configuración del especialista.

- **Webhooks (OpenPay / MercadoPago)**  
  Actualizan el estado del pago a *Pagado* y, si corresponde, confirman la cita y envían notificaciones.

Con **PAYMENTS_ENABLED = false**, no se crean pagos en POST /bookings; liquidate y monthly-subscription responden 503; confirmar cita no exige pago pagado.

---

## 5. Validaciones destacadas (bookings-api)

- **Crear cita:** `amount` entre anticipo y precio de consulta; tipo de pago válido; método de pago perteneciente al usuario (si no es efectivo); especialista solo puede registrar efectivo.
- **Liquidar:** `amount` coherente con precios; anticipo ya pagado si existe; no existir ya complemento de liquidación; usuario con OpenPay si aplica.
- **Confirmar:** Si pagos activos y quien confirma no es el especialista, debe existir un pago en estado Pagado.

Constantes de mensajes (multi-commons-layer): `NOT_LIQUIDATED`, `ALREADY_PAID`, `CANNOT_LIQUIDATE_WITHOUT_ADVANCE`, `LIQUIDATION_ALREADY_REQUIRED`, `CANNOT_CONFIRM_WITHOUT_ADVANCE`, `PAYMENTS_DISABLED`.

---

## 6. Referencias

- [Reglas de negocio — Sistema de Citas](../reglas-de-negocio.md#-sistema-de-citas)
- [Agendar una cita](./agendarCita.md)
- Tabla `service_payments`: `docs/04_SQL/tables/service_payments.md`
- Documentación interna bookings-api: `apis/bookings-api/docs/README.md`
