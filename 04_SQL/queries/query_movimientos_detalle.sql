-- Mirror: canonical copy under commission-audit/. Movement lines for commission audit.
-- See docs/03_Infraestructura/Scripts/commission-audit/query_movimientos_detalle.sql

WITH orders_in_period AS (
  SELECT
    o.id AS order_id,
    o.folio,
    o.created_at AS order_created_at,
    o.delivery_status,
    o.user_id AS buyer_id
  FROM orders o
  WHERE o.created_at >= ?
    AND o.created_at < ?
)
SELECT
  oip.order_id,
  oip.folio,
  oip.order_created_at,
  oip.delivery_status,
  'consumption' AS movement_type,
  uc.created_at AS movement_at,
  NULL AS commission_transaction_id,
  NULL AS commission_level,
  NULL AS commission_period,
  uc.user_id AS consumption_user_id,
  oip.buyer_id AS order_buyer_id,
  (uc.user_id <> oip.buyer_id) AS consumption_user_mismatch,
  uc.product AS product_label,
  ROUND(uc.price, 2) AS unit_price,
  ROUND(uc.total, 2) AS line_amount,
  NULL AS commission_id,
  NULL AS creditor_user_id,
  NULL AS creditor_display,
  NULL AS commission_header_created_at
FROM users_consumption uc
INNER JOIN orders_in_period oip ON oip.order_id = uc.order_id
UNION ALL
SELECT
  oip.order_id,
  oip.folio,
  oip.order_created_at,
  oip.delivery_status,
  'commission' AS movement_type,
  ct.date AS movement_at,
  ct.id AS commission_transaction_id,
  ct.level AS commission_level,
  cm.period AS commission_period,
  NULL AS consumption_user_id,
  oip.buyer_id AS order_buyer_id,
  NULL AS consumption_user_mismatch,
  NULL AS product_label,
  NULL AS unit_price,
  ROUND(ct.amount, 2) AS line_amount,
  cm.id AS commission_id,
  cm.user_id AS creditor_user_id,
  COALESCE(
    NULLIF(TRIM(CONCAT_WS(' ', cred.first_name, cred.last_name)), ''),
    NULLIF(TRIM(cred.email), ''),
    NULLIF(TRIM(cred.phone), '')
  ) AS creditor_display,
  cm.created_at AS commission_header_created_at
FROM commission_transactions ct
INNER JOIN orders_in_period oip ON oip.order_id = ct.order_id
LEFT JOIN commissions cm ON cm.id = ct.commission_id
LEFT JOIN users cred ON cred.id = cm.user_id
ORDER BY order_created_at, order_id, movement_type DESC, movement_at, commission_level;
