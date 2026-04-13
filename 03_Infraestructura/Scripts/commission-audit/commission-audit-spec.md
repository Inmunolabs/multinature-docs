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

### Excepción
- El administrador general puede ser recomendador de sí mismo.

### Reglas de existencia
- L1 siempre debe existir si la orden pagada genera comisiones.
- L2 solo debe existir si el usuario de nivel 1 tiene recommender.
- L3 solo debe existir si el usuario de nivel 2 tiene recommender.
- No puede existir L3 sin L2.
- Puede faltar L2 por diseño.
- Puede faltar L3 por diseño.

### Regla clave
No se debe marcar como error la ausencia de L2 o L3 si ese nivel no era esperado según la red.

---

## 4. Regla de montos

### Base de cálculo
La comisión se calcula sobre el total neto de la orden:

`net_total = consumption_total_sum / 1.16`

### Porcentajes
- L1 = 25%
- L2 = 10%
- L3 = 5%

### Tolerancia
- ±0.10 MXN

### Regla
- Diferencias dentro de la tolerancia => `ROUNDING_ONLY`
- Diferencias fuera de tolerancia => error real

### Patrón conocido
Puede existir un bug histórico donde el monto fue generado 10% por debajo del esperado.

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

---

## 10. Tipos de error válidos

### Estado / existencia
- ORDER_NOT_PAID_WITH_CONSUMPTION
- ORDER_NOT_PAID_WITH_COMMISSIONS
- PAID_ORDER_WITHOUT_CONSUMPTION
- PAID_ORDER_WITHOUT_LEVEL_1

### Niveles
- MISSING_LEVEL_1
- MISSING_LEVEL_2_WITH_LEVEL_3_PRESENT
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
- ausencia de recipient L2 cuando L2 no era esperado
- ausencia de recipient L3 cuando L3 no era esperado
- `consumption_total_sum != order_total` por sí solo

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
- `errores.csv`
- `mensaje.txt`

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