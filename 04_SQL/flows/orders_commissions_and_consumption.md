# Flujo: órdenes pagadas → consumos de usuario y comisiones de red

Este documento describe cómo una orden completada genera filas en **`users_consumption`** y en **`commission_transactions`** (vía encabezados **`commissions`**), alineado con el código en `apis/orders-api` y las queries/procedimientos en `layers/multi-mysql-layer`.

**Tablas involucradas (DDL):** [orders](../tables/orders.md), [users_consumption](../tables/users_consumption.md), [users_network](../tables/users_network.md), [commissions](../tables/commissions.md), [commission_transactions](../tables/commission_transactions.md), [constants](../tables/constants.md).

**Procedimiento almacenado:** `InsertCommissionTransaction` (definido en migraciones Knex del paquete `multi-mysql-layer`; ver migración `20260317225232_update_commission_folio_and_procedure_InsertCommissionTransaction.js`).

**Scripts SQL relacionados:** [07_commissions_detail_with_creditor_and_tax.md](../queries/07_commissions_detail_with_creditor_and_tax.md), [09_delete_orders_by_folio_and_commission_cleanup.md](../queries/09_delete_orders_by_folio_and_commission_cleanup.md).

---

## 1. Objetivo de negocio

1. **Consumo:** registrar qué productos compró el usuario y a qué precio, **por orden**, para reportes y trazabilidad.
2. **Comisiones:** cuando un miembro de la red compra, repartir un porcentaje del **subtotal** de la orden entre los usuarios “arriba” en su red (`users_network`), agrupando los movimientos por **acreedor** y **periodo contable** (`YYYYMM`).

---

## 2. Modelo de datos (resumen)

### 2.1 `orders`

Cabecera del pedido. Campos relevantes para este flujo:

- `user_id`: comprador.
- `subtotal`: base numérica para el cálculo de comisiones (no incluye IVA ni envío en la fórmula actual).
- `products`: JSON con líneas (cada ítem debe exponer al menos `id`, `product`, `price`, `total` para el insert de consumo).
- `type` y `payment_provider` / estado: determinan si la orden se considera “pagada” para disparar comisiones.
- `isWholesale` (cuando exista en el objeto de orden en runtime): elige tabla de porcentajes (mayoreo vs retail).

### 2.2 `users_consumption`

Una fila por **línea de producto** asociada al comprador:

- `user_id`, `product_id`, `order_id`, `product`, `price`, `total`, `created_at`.
- FK a `orders`, `users`, `products` (ver DDL).

### 2.3 `users_network`

Define la relación “este usuario está en la red de aquel, a nivel N”:

- `id`: usuario **acreedor** (upline).
- `user_id`: miembro **abajo** en la red (en el flujo de compra, coincide con el comprador para las filas que importan).
- `level`: nivel usado como clave en el mapa de porcentajes (`PERCENTAJE_LEVEL_*` o `WHOLESALE_PERCENTAJE_LEVEL_*`).

La query `NetworkQueries.getNetworkChain` devuelve, para un comprador, todos los `(userId, level, …)` donde `user_id` del registro es el comprador.

### 2.4 `commissions` y `commission_transactions`

- **`commissions`:** encabezado **único por** `(user_id, period)` con `period` tipo `CHAR(6)` (`YYYYMM`). Tiene `folio` propio del **lote de comisiones** (no el folio del pedido), `status`, `is_paid`, etc.
- **`commission_transactions`:** líneas de detalle: `amount`, `date`, `from_user_id` (comprador que originó la venta), `order_id`, `level`, `commission_id`.

La orden se enlaza solo en **`commission_transactions.order_id`**. El folio de la tabla `orders` no identifica el lote en `commissions`.

---

## 3. Qué hace la base de datos: `InsertCommissionTransaction`

La API no inserta directamente en `commissions` / `commission_transactions` con SQL plano; ejecuta:

`CALL InsertCommissionTransaction(amount, date, from_user_id, order_id, level, user_id, period, status)`.

Dentro de una transacción SQL típica:

1. Bloquea / localiza si ya existe un encabezado `commissions` para `(p_user_id, p_period)`.
2. Si **no** existe: calcula un secuencial de folios en ese `period`, genera `v_commission_id`, e inserta el encabezado con `status = p_status` (la aplicación envía el estado inicial tipo “Confirmando comisión”).
3. Inserta la fila en `commission_transactions` apuntando a ese `commission_id`, con `from_user_id` = comprador y `order_id` = orden.

Si el encabezado ya existía, solo agrega otra línea en `commission_transactions`; el `status` del encabezado **no** se recalcula en ese mismo procedimiento para el caso “ya existía”.

---

## 4. Lógica en aplicación (`orders-api`)

### 4.1 Periodo `YYYYMM`

- Se lee la constante `cutoffDay`.
- `dateTools.getCurrentPeriod(cutoffDay)` ajusta año/mes según el día de corte.
- `dateTools.getPeriod(year, month)` produce el string `period` pasado al SP.

### 4.2 Monto por nivel

- `orderAmount = subtotal` (dos decimales).
- Por cada fila de la cadena de red:  
  `amount = orderAmount * commissionPercentajePerLevel[level]`.
- Los porcentajes vienen de `constants`: agregación JSON de `PERCENTAJE_LEVEL_%` o `WHOLESALE_PERCENTAJE_LEVEL_%` según `order.isWholesale`.

### 4.3 “Orden completada” para comisiones

En `processOrderCommissions` la condición depende de `order.type`:

- OpenPay tarjeta / tienda / suscripción → `payment_provider.status === 'completed'`.
- Mercado Pago → `'accredited'`.
- PayPal → `'COMPLETED'`.
- Tipo saldo (`balance`) → tratada como completada sin depender de esos estados.

Si no cumple, **no** se reparten comisiones (error).

### 4.4 Consumos

`updateUserConsumptionsAndValidStatus` (en `services/create.js`) hace un `INSERT` por producto en `users_consumption`. El nombre del método sugiere más lógica; el cuerpo actual se limita a esos inserts (ver backlog de mejoras).

### 4.5 Orquestación

- **`safeProccessConsumptionsAndCommissions`:** lanza en **paralelo** consumos y `processOrderCommissions`; errores en uno no detienen el otro; hay envío de correos de error.
- Tras repartir comisiones con éxito, **`processOrderCommissions`** actualiza la orden a estado de preparación (**“Preparando el Pedido”**).
- **Confirmación manual admin** (cambio de estado a preparación): `processCommissionsIfMissing` — si ya hay filas en `commission_transactions` para esa `order_id`, **no** hace nada; si no, reparte comisiones y consumos juntos.
- **Reintento:** `processOrderCommissionsIfMissing` si el pago ya está completado pero faltan transacciones.
- **3DS:** endpoint dedicado que vuelve a ejecutar `processOrderCommissions`.
- **Cancelación:** se borran transacciones de comisión por `order_id` (`removeOrderCommissions`); los encabezados `commissions` pueden quedar con menos líneas (mantenimiento / scripts aparte).

### 4.6 Concurrencia

El servicio envuelve la llamada al SP en reintentos ante **deadlock** MySQL (errno 1213).

---

## 5. Reglas de negocio (lista corta)

1. Las comisiones usan **subtotal** de la orden, no el total con impuestos/envío.
2. Los acreedores son los registros de **`users_network`** cuyo `user_id` es el comprador; el **`level`** elige el porcentaje.
3. Cada acreedor acumula movimientos en **un encabezado por periodo** `YYYYMM` (según `cutoffDay`).
4. Cada venta genera una **`commission_transactions`** por nivel (upline) con `from_user_id` = comprador.
5. Los consumos se registran **por línea de producto** para el comprador y la orden.
6. Evitar duplicar comisiones por la misma orden: comprobación por conteo de `commission_transactions` donde `order_id` = … (flujos admin / reintento).
7. Al cancelar pedido, se eliminan las transacciones de comisión ligadas a esa orden.

---

## 6. Dónde está el código (referencia rápida)

| Pieza | Ubicación típica |
|--------|------------------|
| Reparto y validación de pago | `apis/orders-api/src/services/commissions.js` |
| Inserts de consumo | `apis/orders-api/src/services/create.js` (`updateUserConsumptionsAndValidStatus`) |
| Estrategias de pago / webhooks | `apis/orders-api/src/classes/PaymentMethodsStrategies.js`, `OrderMethods.js` |
| Admin / estado | `apis/orders-api/src/services/update.js` |
| Órdenes recurrentes | `apis/orders-api/src/services/recurringOrders.js` |
| Query cadena de red | `layers/multi-mysql-layer/src/queries/network.js` (`getNetworkChain`) |
| SP y conteos | `layers/multi-mysql-layer/src/queries/commission.js`, migraciones Knex |

---

- **Última actualización:** 2026-04-08
