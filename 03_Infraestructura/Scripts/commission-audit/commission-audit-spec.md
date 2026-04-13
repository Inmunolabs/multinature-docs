# Commission Audit Spec

## Objetivo
Definir de forma explícita las reglas de negocio para auditar órdenes, consumos y comisiones, evitando falsos positivos y permitiendo correcciones consistentes.

---

## 1. Entidades relevantes

### Orden
Una orden representa una compra realizada por un usuario (`buyer`).

Campos relevantes:
- `orders.id`
- `orders.user_id`
- `orders.folio`
- `orders.created_at`
- `orders.purchase_date`
- `orders.delivery_status`
- `orders.subtotal`
- `orders.total`
- `orders.iva`
- `orders.monthly_purchase_id` (enlace a compra recurrente / `monthly_purchases`, si aplica)
- `orders.openpay_subscription_id` (suscripción OpenPay, si aplica)
- `orders.type` (enum; valor `subscription` indica cargo por suscripción)
- `orders.payment_provider` (JSON; campo `mode` igual a `subscription` indica modo suscripción)
- `orders.purchase_type` (opcional; si existe en el esquema, valor `monthly_purchase` indica recurrente)

### Consumos
Los consumos representan los productos registrados para la orden.

Campos relevantes:
- `users_consumption.order_id`
- `users_consumption.user_id`
- `users_consumption.product`
- `users_consumption.total`
- `users_consumption.created_at`

### Comisión
La comisión lógica está representada por:
- `commissions`
- `commission_transactions`

Campos relevantes:
- `commissions.id`
- `commissions.user_id`
- `commissions.period`
- `commissions.created_at`

- `commission_transactions.id`
- `commission_transactions.commission_id`
- `commission_transactions.order_id`
- `commission_transactions.level`
- `commission_transactions.amount`
- `commission_transactions.date`
- `commission_transactions.from_user_id`

### Red de recomendadores
La red se calcula usando `users.recommender_id`.

---

## 2. Estados de orden

### Orden pagada
Una orden se considera pagada si `delivery_status` está en:
- `Preparando el Pedido`
- `Está en camino`
- `Entregado`

### Regla
Solo las órdenes pagadas pueden:
- generar consumos
- generar comisiones

### Consecuencias
- Si una orden no pagada tiene consumos, eso es error.
- Si una orden no pagada tiene comisiones, eso es error.
- Si una orden pagada no tiene consumos, eso es error.
- Si una orden pagada no tiene comisión nivel 1, eso es error.

---

## 3. Regla de red / niveles esperados

### Cadena esperada
- Nivel 1 esperado = `buyer.recommender_id`
- Nivel 2 esperado = `L1.recommender_id`
- Nivel 3 esperado = `L2.recommender_id`

### Auto-referencia (self-reference)
Si el `user_id` esperado de un nivel es **igual** al del nivel inmediatamente anterior en la cadena cruda (`recommender_id`):
- ese nivel se trata como **NOT_APPLICABLE** para auditoría (no se espera comisión ni destinatario en ese nivel duplicado)
- aplica a **cualquier** usuario, no solo administrador
- no deben generarse errores por ausencia de comisión o destinatario en ese nivel (p. ej. no `MISSING_EXPECTED_LEVEL_*` / `MISSING_RECIPIENT_*` por ese motivo)

Comparación:
- L2 no aplica si `expected_level_2_user_id == expected_level_1_user_id`
- L3 no aplica si `expected_level_3_user_id == expected_level_2_user_id` (IDs tal como vienen de BD antes del colapso)

### Reglas de existencia
- L1 siempre debe existir si la orden pagada genera comisiones.
- L2 solo debe existir si el usuario de nivel 1 tiene recommender **y** el nivel no queda descartado por auto-referencia.
- L3 solo debe existir si el usuario de nivel 2 tiene recommender **y** el nivel no queda descartado por auto-referencia.
- No puede existir L3 sin L2.
- Puede faltar L2 por diseño.
- Puede faltar L3 por diseño.

### Regla clave
No se debe marcar como error la ausencia de L2 o L3 si ese nivel no era esperado según la red (incluye niveles colapsados por auto-referencia).

---

## 4. Regla de montos

### Base de cálculo
Primero se obtiene el neto a partir del consumo:

`net_from_consumption = consumption_total_sum / 1.16`

**Compra estándar:** la base sobre la que aplican los porcentajes es `net_from_consumption`.

**Compra recurrente (monthly purchase):** la base es `net_from_consumption * 0.90`.

Una orden se considera **recurrente** (compra ligada a suscripción / monthly purchase) si cumple **cualquiera** de estas señales explícitas (no se infiere por un patrón ~−10%):
- `orders.monthly_purchase_id` tiene valor distinto de `NULL` y distinto de cadena vacía (tras `TRIM`)
- `orders.openpay_subscription_id` tiene valor distinto de `NULL` y distinto de cadena vacía (tras `TRIM`)
- `orders.purchase_type = 'monthly_purchase'` (solo si la columna existe en el esquema)
- `orders.type` (order type) es `subscription` (aceptar también el typo histórico `subcription` en datos viejos)
- `orders.payment_provider.mode` es `subscription` (comparación case-insensitive tras normalizar)

La query SQL puede exponer `is_monthly_purchase_row = 1` cuando cualquiera de las condiciones soportadas en BD se cumple; el script JS recalcula la misma lógica a partir de las columnas de la fila (incl. JSON / Excel).

Si ninguna señal aplica, la orden se trata como **compra estándar** para el cálculo de la base de comisión.

### Porcentajes (sobre la base definida arriba)
- L1 = 25%
- L2 = 10%
- L3 = 5%

### Tolerancia
- ±0.10 MXN

### Regla
- Diferencias dentro de la tolerancia => `ROUNDING_ONLY`
- Diferencias fuera de tolerancia => error real

### Patrón conocido
Puede existir un bug histórico donde el monto fue generado 10% por debajo del esperado **respecto a la base estándar** (sin descuento recurrente).

- **No** se usa el patrón −10% para **inferir** que una orden es recurrente.
- Si `is_monthly_purchase` es verdadero, **no** se emite `KNOWN_PATTERN_MINUS_10_PERCENT` (las comisiones esperadas ya usan base × 0,90). Siguen aplicando `AMOUNT_MISMATCH_*` y `TOTAL_COMMISSION_MISMATCH` solo si la diferencia supera la tolerancia ±0,10 MXN frente a esa base recurrente.

---

## 5. Regla de periodos

### Definición
Los periodos van del día 28 al día 27 del mes siguiente.

Ejemplo:
- periodo `202604` = 2026-03-28 00:00:00 a 2026-04-27 23:59:59

### Formato
- `YYYYMM`

### Fuente de verdad
La fecha ideal para calcular el periodo esperado debería ser la fecha de pago confirmado.

### Restricción actual
Como no está totalmente claro qué fecha histórica usó el sistema, la fecha base para calcular el periodo esperado debe ser configurable.

### Regla de validación
- `commissions.period` debe coincidir con el periodo esperado
- si una misma orden tiene comisiones en más de un periodo, eso es error
- si `commissions.created_at` no es coherente con `commissions.period`, eso es error informativo

---

## 6. Regla de destinatarios

### Destinatario esperado
- L1 => usuario esperado del nivel 1
- L2 => usuario esperado del nivel 2
- L3 => usuario esperado del nivel 3

### Regla
Solo se valida destinatario en niveles esperados o realmente existentes.

### Casos válidos
- Si L2 no era esperado y no existe, no es error
- Si L3 no era esperado y no existe, no es error

### Casos de error
- destinatario incorrecto
- destinatario faltante en nivel esperado/existente
- destinatario inesperado
- múltiples destinatarios en el mismo nivel

---

## 7. Regla de duplicados

### Duplicado real
Más de una `commission_transaction` para el mismo `order_id + level`

### Regla
Siempre es error.

### También debe marcarse
- aunque la suma total parezca correcta
- aunque los destinatarios coincidan

---

## 8. Regla de consumos

### Reglas mínimas
- una orden pagada debe tener consumos
- una orden no pagada no debe tener consumos
- consumos duplicados por producto deben marcarse
- el total de consumos debe usarse como base de cálculo de comisiones
- no asumir que `order_total == consumption_total_sum`, porque `order_total` puede incluir IVA, envío u otros cargos

### Importante
No marcar como error que `consumption_total_sum != order_total` sin una regla más específica.

---

## 9. Clasificación de hallazgos

### OK
No se detectó inconsistencia.

### ROUNDING_ONLY
Solo hay diferencias menores dentro de tolerancia.

### ACTIONABLE_ERROR
Hay error real de negocio o integridad.

### EXCLUDED
La orden no aplica para ciertas validaciones.

### NOT_APPLICABLE
Una validación no aplica, por ejemplo:
- L2 no esperado
- L3 no esperado
- nivel colapsado por auto-referencia (mismo `user_id` que el nivel anterior)

---

## 10. Tipos de error válidos

### Estado / existencia
- ORDER_NOT_PAID_WITH_CONSUMPTION
- ORDER_NOT_PAID_WITH_COMMISSIONS
- PAID_ORDER_WITHOUT_CONSUMPTION
- PAID_ORDER_WITHOUT_LEVEL_1

### Niveles
- MISSING_LEVEL_1
- MISSING_LEVEL_2_WITH_LEVEL_3_PRESENT (no aplica si L2 fue colapsado por auto-referencia con L1)
- UNEXPECTED_LEVEL_2
- UNEXPECTED_LEVEL_3
- MISSING_EXPECTED_LEVEL_2
- MISSING_EXPECTED_LEVEL_3

### Destinatarios
- WRONG_RECIPIENT_L1
- WRONG_RECIPIENT_L2
- WRONG_RECIPIENT_L3
- MISSING_RECIPIENT_L1
- MISSING_RECIPIENT_L2
- MISSING_RECIPIENT_L3
- UNEXPECTED_RECIPIENT_L1
- UNEXPECTED_RECIPIENT_L2
- UNEXPECTED_RECIPIENT_L3
- MULTIPLE_RECIPIENTS_L1
- MULTIPLE_RECIPIENTS_L2
- MULTIPLE_RECIPIENTS_L3

### Montos
- AMOUNT_MISMATCH_L1
- AMOUNT_MISMATCH_L2
- AMOUNT_MISMATCH_L3
- TOTAL_COMMISSION_MISMATCH
- KNOWN_PATTERN_MINUS_10_PERCENT

### Periodos
- PERIOD_MISMATCH
- MULTIPLE_PERIODS_FOUND
- COMMISSION_CREATED_AT_PERIOD_INCONSISTENT
- MISSING_TARGET_COMMISSION_HEADER_L1
- MISSING_TARGET_COMMISSION_HEADER_L2
- MISSING_TARGET_COMMISSION_HEADER_L3

### Duplicados
- DUPLICATE_LEVEL_1
- DUPLICATE_LEVEL_2
- DUPLICATE_LEVEL_3

### Consumos
- CONSUMPTION_DUPLICATES
- INVALID_CONSUMPTION_USER
- PAID_ORDER_WITHOUT_CONSUMPTION

---

## 11. Reglas anti-falsos-positivos

Estas condiciones NO deben producir error:
- ausencia de L2 cuando L2 no era esperado
- ausencia de L3 cuando L3 no era esperado
- ausencia de L2 o L3 cuando el nivel fue marcado NOT_APPLICABLE por auto-referencia
- ausencia de recipient L2 cuando L2 no era esperado o no aplica
- ausencia de recipient L3 cuando L3 no era esperado o no aplica
- `consumption_total_sum != order_total` por sí solo
- montos coherentes con la base **recurrente** (`net * 0.90`) cuando la orden es monthly purchase

---

## 12. Salidas esperadas

### Excel
Hojas:
- `Resumen`
- `Auditoria_por_orden`
- `Movimientos_detalle`
- `Errores`
- `Solo_redondeo`
- `Excluidas`

### Archivos adicionales
- `resultado.json`
- `errores.json`
- `mensaje.txt`

El archivo `errores.csv` **no** forma parte de la salida (los errores siguen en `errores.json` y en la hoja Excel `Errores`).

### Nombre del Excel
Por defecto el archivo Excel usa marca de tiempo para no sobrescribir corridas anteriores:

`auditoria_comisiones_YYYYMMDD_HHmmss.xlsx` (hora local del equipo que ejecuta el script).

---

## 13. Principio rector
Primero calcular:
1. si la orden debía generar movimientos
2. qué niveles eran esperados
3. qué destinatarios eran esperados
4. qué montos eran esperados
5. qué periodo era esperado

Y solo después validar lo real.

Nunca asumir que todos los niveles deben existir.
Nunca asumir que todo faltante es error.