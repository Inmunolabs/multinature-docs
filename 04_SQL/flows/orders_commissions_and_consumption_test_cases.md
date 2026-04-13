# Casos de prueba: órdenes → consumos y comisiones

Documento orientado a QA y a pruebas automatizadas. Complementa [orders_commissions_and_consumption.md](./orders_commissions_and_consumption.md).

**Alcance:** `orders-api` (pagos completados, admin, cancelación), datos en `users_consumption`, `commission_transactions`, encabezados `commissions`, y constantes / red en `users_network`.

---

## Convenciones

- **Precondiciones:** usuario comprador, productos, constantes `cutoffDay`, `PERCENTAJE_LEVEL_*` (y mayoreo si aplica), filas en `users_network` coherentes con el escenario.
- **Verificación SQL típica:**  
  `SELECT * FROM users_consumption WHERE order_id = ?`;  
  `SELECT COUNT(*), SUM(amount) FROM commission_transactions WHERE order_id = ?`;  
  `SELECT * FROM commissions c JOIN commission_transactions ct ON ct.commission_id = c.id WHERE ct.order_id = ?`.

---

## 1. Caminos felices

| ID | Escenario | Pasos | Resultado esperado |
|----|-----------|--------|-------------------|
| TC-H1 | Pago tarjeta OpenPay completado | Completar pago hasta `payment_provider.status = completed`; disparar flujo que llama `safeProccessConsumptionsAndCommissions`. | Una fila en `users_consumption` por producto; N filas en `commission_transactions` (N = tamaño de `getNetworkChain`); orden pasa a “Preparando el Pedido”. |
| TC-H2 | Pago Mercado Pago acreditado | Mismo flujo con `status = accredited`. | Igual que TC-H1. |
| TC-H3 | Pago PayPal | `status = COMPLETED`. | Igual que TC-H1. |
| TC-H4 | Pago con saldo (`balance`) | Orden tipo saldo sin depender de proveedor externo. | Comisiones y consumos generados según reglas; orden avanza a preparación tras `processOrderCommissions`. |
| TC-H5 | Mayoreo | Orden con `isWholesale` verdadero y constantes `WHOLESALE_PERCENTAJE_LEVEL_*` distintas al retail. | Montos en `commission_transactions` = subtotal × porcentaje mayoreo por nivel. |
| TC-H6 | Varias líneas en el carrito | Orden con 3 productos distintos. | 3 inserts en `users_consumption` con mismo `order_id`. |
| TC-H7 | Mismo acreedor, mismo periodo, dos órdenes | Dos compras del mismo downline en el mismo mes (según `cutoffDay`). | Mismo `commission_id` para ese acreedor/periodo; dos filas en `commission_transactions` (distintos `order_id`). |

---

## 2. Red y porcentajes

| ID | Escenario | Resultado esperado |
|----|-----------|-------------------|
| TC-R1 | Comprador sin uplines (`getNetworkChain` vacío) | No hay filas en `commission_transactions`; consumos sí (si el flujo de consumo corre); orden puede pasar a preparación si `processOrderCommissions` no falla por cadena vacía (hoy solo itera cero veces). |
| TC-R2 | Un solo nivel en red | Una sola transacción de comisión; `level` coincide con fila en `users_network`. |
| TC-R3 | Niveles 1, 2 y 3 con porcentajes distintos | Cada fila con `amount` = subtotal × % del nivel; verificar redondeo a 2 decimales en aplicación. |
| TC-R4 | Falta clave de porcentaje para un `level` presente en red | Comportamiento actual: `Number(undefined)` → NaN en monto; documentar como bug o esperar fallo/NaN en BD. **Edge case crítico para prueba de regresión.** |

---

## 3. Idempotencia y duplicados

| ID | Escenario | Resultado esperado |
|----|-----------|-------------------|
| TC-I1 | Doble webhook / doble llamada a `safeProccessConsumptionsAndCommissions` | Riesgo: **doble** `users_consumption` si no hay idempotencia; comisiones pueden duplicarse si no existe guarda. Registrar comportamiento real y alinear con política deseada. |
| TC-I2 | `processCommissionsIfMissing` con comisiones ya existentes | No nuevas filas en `commission_transactions` para esa orden. |
| TC-I3 | `processOrderCommissionsIfMissing` cuando ya hay transacciones | Retorna sin ejecutar; conteo inalterado. |
| TC-I4 | Admin confirma pago dos veces (mismo cambio de estado) | Segunda vez: `processCommissionsIfMissing` debe saltar si ya hay transacciones. |

---

## 4. Estados de pago y flujos negativos

| ID | Escenario | Resultado esperado |
|----|-----------|-------------------|
| TC-N1 | `payment_provider.status` pendiente / fallido (tarjeta) | `processOrderCommissions` lanza error; no comisiones; consumos dependen de si se llamó la función paralela (hoy pueden insertarse si se invocó `safeProccess…` — **edge case de inconsistencia**). |
| TC-N2 | Mercado Pago sin `accredited` | Sin comisiones (error en `processOrderCommissions`). |
| TC-N3 | Orden inexistente en `processCommissionsOfThreeDSecureOrder` | Error controlado / 500 según manejo actual. |

---

## 5. Periodo y fecha (`cutoffDay`)

| ID | Escenario | Resultado esperado |
|----|-----------|-------------------|
| TC-P1 | Compra el día **anterior** al `cutoffDay` del mes | `period` asignado según `getCurrentPeriod` (verificar `YYYYMM` esperado con fecha fija en prueba). |
| TC-P2 | Compra el día **cutoffDay** o posterior | Periodo puede cambiar al “siguiente” mes lógico según implementación. |
| TC-P3 | Cambio de año (diciembre / enero) con cutoff | `period` y `getPeriod` sin desbordar; encabezado `commissions` con `period` correcto. |

---

## 6. Cancelación

| ID | Escenario | Resultado esperado |
|----|-----------|-------------------|
| TC-C1 | Cancelar orden con comisiones ya generadas | `commission_transactions` para ese `order_id` eliminadas; consumos **no** se borran con el mismo paso de cancelación descrito en código actual (verificar si negocio exige borrar `users_consumption` manualmente). |
| TC-C2 | Cancelar sin comisiones previas | Sin error; stock / balance según flujo actual. |

---

## 7. Carga, concurrencia y datos límite

| ID | Escenario | Resultado esperado |
|----|-----------|-------------------|
| TC-L1 | Dos hilos insertan comisión misma orden (muy raro) | SP + transacción; posible deadlock; aplicación reintenta; resultado final sin duplicados **solo si** hay restricción o idempotencia — hoy verificar empíricamente. |
| TC-L2 | `subtotal = 0` | Montos de comisión 0 o filas con amount 0; definir si negocio debe omitir inserts. |
| TC-L3 | `products = []` | Cero filas de consumo; comisiones según subtotal (posible 0). |
| TC-L4 | JSON `products` como string en runtime | Código en `distributeCommissions` parsea para email; consumos asumen array — validar coherencia con órdenes leídas de BD. |

---

## 8 | Notificaciones y fiscal (complementarios)

| ID | Escenario | Resultado esperado |
|----|-----------|-------------------|
| TC-X1 | Acreedor sin `tax_information` tipo commission | Email / push de aviso fiscal (según `distributeCommissions`). |
| TC-X2 | Acreedor con datos fiscales | Sin push de “registra información fiscal”. |

---

## 9. Sugerencia de datos de prueba mínimos

1. Usuario **A** comprador; usuarios **B**, **C** en `users_network` con `user_id = A` y `level` 1 y 2.
2. Constantes `PERCENTAJE_LEVEL_1`, `PERCENTAJE_LEVEL_2` conocidas (ej. 0.05 y 0.03).
3. Orden con `subtotal` fijo (ej. 1000.00) y dos productos.
4. `cutoffDay` fijo para pruebas de periodo.

---

- **Última actualización:** 2026-04-08
