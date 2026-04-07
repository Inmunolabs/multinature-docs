# 09 — Eliminar órdenes por folio y limpiar comisiones asociadas

## Objetivo

Dado uno o varios **folios de orden** (`orders.folio`), eliminar de forma controlada:

1. Las **transacciones de comisión** (`commission_transactions`) vinculadas a esas órdenes (`order_id`).
2. El **consumo ligado al pedido** (`users_consumption`): filas cuyo `order_id` sea una de esas órdenes (el script las borra **explícitamente**; en el DDL documentado también aplicaría **ON DELETE CASCADE** al eliminar la orden).
3. Las **filas de orden** (`orders`) correspondientes.
4. De forma **opcional pero recomendada** en el mismo flujo: los **encabezados de comisión** (`commissions`) que, tras borrar esas transacciones, **no tengan ninguna** fila restante en `commission_transactions` (evita dejar comisiones “vacías”).

⚠️ **Advertencias**

- Son **DELETE físicos**. Ejecuta primero la sección de **previsualización** y revisa conteos antes del `COMMIT`.
- El **`folio` en `commissions`** es el folio del **lote / periodo de comisión**, no el folio de la orden. La relación orden ↔ comisión pasa por **`commission_transactions.order_id`** y **`commission_transactions.commission_id`**.

**Tablas de referencia:**

- [orders.md](../tables/orders.md)
- [commission_transactions.md](../tables/commission_transactions.md)
- [commissions.md](../tables/commissions.md)
- [users_consumption.md](../tables/users_consumption.md)

---

## Relación resumida (órdenes y comisiones)

| Tabla | Rol |
|-------|-----|
| `orders` | Pedido; clave operativa por negocio: `folio` (no es UNIQUE en DDL: puede haber más de una fila con el mismo folio si el dato se duplicó). |
| `commission_transactions` | Líneas de monto por comisión; enlazan `commission_id` → `commissions.id` y `order_id` → `orders.id`. |
| `commissions` | Encabezado por acreedor y periodo (`user_id`, `period` únicos); agrupa muchas transacciones. Solo debe borrarse el encabezado si **ya no queda ninguna** transacción. |
| `users_consumption` | Consumo de productos asociado al usuario y a la orden (`order_id` → `orders.id`). Debe quedar alineado al quitar el pedido. |

---

## Entrada

Edita los `INSERT` en `tmp_order_folios` con los folios a borrar (mismo formato que en `orders.folio`, hasta 12 caracteres según DDL).

```sql
-- Ejemplo: ajusta la lista
INSERT INTO tmp_order_folios (folio) VALUES
('ABC123456789'),
('XYZ000000001');
```

---

## Previsualización (sin borrar)

Ejecuta solo este bloque (o el script completo hasta los `SELECT` de preview, **sin** los `DELETE` y **sin** `COMMIT`) para ver qué filas se verían afectadas.

```sql
SET SESSION group_concat_max_len = 1024 * 1024;

DROP TEMPORARY TABLE IF EXISTS tmp_order_folios;
CREATE TEMPORARY TABLE tmp_order_folios (
  folio VARCHAR(12) NOT NULL PRIMARY KEY
) ENGINE=Memory;

INSERT INTO tmp_order_folios (folio) VALUES
('REEMPLAZA_FOLIO_1'),
('REEMPLAZA_FOLIO_2');

DROP TEMPORARY TABLE IF EXISTS tmp_orders_to_delete;
CREATE TEMPORARY TABLE tmp_orders_to_delete (
  id CHAR(36) NOT NULL PRIMARY KEY,
  folio VARCHAR(12) NOT NULL
) ENGINE=Memory;

INSERT INTO tmp_orders_to_delete (id, folio)
SELECT o.id, o.folio
FROM orders o
INNER JOIN tmp_order_folios f ON f.folio = o.folio;

DROP TEMPORARY TABLE IF EXISTS tmp_commissions_touched;
CREATE TEMPORARY TABLE tmp_commissions_touched (
  id CHAR(36) NOT NULL PRIMARY KEY
) ENGINE=Memory;

INSERT INTO tmp_commissions_touched (id)
SELECT DISTINCT ct.commission_id
FROM commission_transactions ct
INNER JOIN tmp_orders_to_delete t ON t.id = ct.order_id;

SELECT COUNT(*) AS orders_matched FROM tmp_orders_to_delete;

SELECT o.id, o.folio, o.user_id, o.total, o.purchase_date, o.delivery_status
FROM orders o
INNER JOIN tmp_orders_to_delete t ON t.id = o.id;

SELECT COUNT(*) AS commission_transactions_to_delete
FROM commission_transactions ct
INNER JOIN tmp_orders_to_delete t ON t.id = ct.order_id;

SELECT ct.id, ct.commission_id, ct.order_id, ct.amount, ct.date, ct.level
FROM commission_transactions ct
INNER JOIN tmp_orders_to_delete t ON t.id = ct.order_id;

SELECT c.id, c.user_id, c.period, c.folio AS commission_folio, c.status, c.is_paid
FROM commissions c
INNER JOIN tmp_commissions_touched x ON x.id = c.id;

SELECT COUNT(*) AS users_consumption_rows_to_delete
FROM users_consumption uc
INNER JOIN tmp_orders_to_delete t ON t.id = uc.order_id;

SELECT uc.user_id, uc.product_id, uc.order_id, uc.product, uc.price, uc.total, uc.created_at
FROM users_consumption uc
INNER JOIN tmp_orders_to_delete t ON t.id = uc.order_id;

-- Comisiones tocadas que quedarían sin ninguna transacción tras borrar las de tmp_orders_to_delete
-- (incluye el caso de transacciones con order_id NULL, que no se borran y mantienen el encabezado).
SELECT COUNT(*) AS commissions_that_would_be_orphaned
FROM commissions c
INNER JOIN tmp_commissions_touched x ON x.id = c.id
WHERE NOT EXISTS (
  SELECT 1
  FROM commission_transactions ct
  WHERE ct.commission_id = c.id
  AND (ct.order_id IS NULL OR ct.order_id NOT IN (SELECT id FROM tmp_orders_to_delete))
);
```

---

## Script completo (transacción)

Orden lógico:

1. Registrar folios y resolver `orders.id`.
2. Registrar `commission_id` afectados **antes** de borrar transacciones.
3. Borrar `commission_transactions` por `order_id` (explícito; deja claro el alcance).
4. Borrar `users_consumption` por `order_id` (explícito; equivalente en la práctica a confiar en CASCADE al borrar la orden, pero deja el alcance visible en el script y en la previsualización).
5. Borrar `orders`.
6. Borrar `commissions` huérfanas: estaban en `tmp_commissions_touched` y ya no tienen transacciones.

```sql
SET SESSION group_concat_max_len = 1024 * 1024;

DROP TEMPORARY TABLE IF EXISTS tmp_order_folios;
CREATE TEMPORARY TABLE tmp_order_folios (
  folio VARCHAR(12) NOT NULL PRIMARY KEY
) ENGINE=Memory;

INSERT INTO tmp_order_folios (folio) VALUES
('REEMPLAZA_FOLIO_1'),
('REEMPLAZA_FOLIO_2');

DROP TEMPORARY TABLE IF EXISTS tmp_orders_to_delete;
CREATE TEMPORARY TABLE tmp_orders_to_delete (
  id CHAR(36) NOT NULL PRIMARY KEY,
  folio VARCHAR(12) NOT NULL
) ENGINE=Memory;

INSERT INTO tmp_orders_to_delete (id, folio)
SELECT o.id, o.folio
FROM orders o
INNER JOIN tmp_order_folios f ON f.folio = o.folio;

DROP TEMPORARY TABLE IF EXISTS tmp_commissions_touched;
CREATE TEMPORARY TABLE tmp_commissions_touched (
  id CHAR(36) NOT NULL PRIMARY KEY
) ENGINE=Memory;

INSERT INTO tmp_commissions_touched (id)
SELECT DISTINCT ct.commission_id
FROM commission_transactions ct
INNER JOIN tmp_orders_to_delete t ON t.id = ct.order_id;

START TRANSACTION;

SELECT COUNT(*) AS orders_to_delete FROM tmp_orders_to_delete;
SELECT COUNT(*) AS commission_transactions_to_delete
FROM commission_transactions ct
INNER JOIN tmp_orders_to_delete t ON t.id = ct.order_id;
SELECT COUNT(*) AS users_consumption_rows_to_delete
FROM users_consumption uc
INNER JOIN tmp_orders_to_delete t ON t.id = uc.order_id;

DELETE ct
FROM commission_transactions ct
INNER JOIN tmp_orders_to_delete t ON t.id = ct.order_id;

DELETE uc
FROM users_consumption uc
INNER JOIN tmp_orders_to_delete t ON t.id = uc.order_id;

DELETE o
FROM orders o
INNER JOIN tmp_orders_to_delete t ON t.id = o.id;

DELETE c
FROM commissions c
INNER JOIN tmp_commissions_touched x ON x.id = c.id
LEFT JOIN commission_transactions ct ON ct.commission_id = c.id
WHERE ct.id IS NULL;

SELECT ROW_COUNT() AS commissions_deleted_as_orphans;

COMMIT;
```

---

## Variante: confiar solo en CASCADE al borrar la orden

Si prefieres no borrar `commission_transactions` ni `users_consumption` en pasos aparte, puedes **omitir** esos `DELETE` y dejar únicamente el `DELETE` de `orders`: en el DDL documentado, `commission_transactions_ibfk_3` y `users_consumption_ibfk_3` usan **ON DELETE CASCADE** hacia `orders`, así que esas filas se eliminan al borrar la orden. El paso final que borra `commissions` huérfanas sigue siendo válido **después** de eliminar las órdenes.

---

## Casos de uso

- Quitar pedidos de prueba o duplicados en **staging / QA / local** junto con su huella en comisiones.
- Corrección puntual cuando un folio no debió generar comisión y hay que alinear BD con negocio.

---

## Notas

- Si necesitas borrar **solo** transacciones de comisión pero **conservar** la orden, no uses este script: borra solo `commission_transactions` filtrando por `order_id` y valora impacto en totales de `commissions` y reportes.
- Para consultas analíticas de comisiones (sin borrar), ver [07_commissions_detail_with_creditor_and_tax.md](./07_commissions_detail_with_creditor_and_tax.md).
