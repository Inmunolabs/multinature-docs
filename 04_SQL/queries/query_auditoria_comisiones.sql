-- Order-level commission audit feed (aligned with commission-audit-spec.md).
-- Params: start_ts, end_ts
-- Expected period uses calendar rule: day >= 28 => label month = next month (YYYYMM end month).
-- Note: MySQL DAY() uses session timezone; align DB session with app or use CONVERT_TZ if needed.

WITH orders_in_period AS (
  SELECT
    o.id AS order_id,
    o.folio,
    o.created_at AS order_created_at,
    o.delivery_status,
    o.purchase_date,
    o.type AS order_type,
    o.payment_provider,
    ROUND(o.subtotal, 2) AS order_subtotal,
    ROUND(o.total, 2) AS order_total,
    ROUND(o.iva, 2) AS order_iva,
    o.user_id AS buyer_id
  FROM orders o
  WHERE o.created_at >= ?
    AND o.created_at < ?
),

buyer_chain AS (
  SELECT
    oip.order_id,
    oip.buyer_id,

    b.recommender_id AS expected_level_1_user_id,
    l1.recommender_id AS expected_level_2_user_id,
    l2.recommender_id AS expected_level_3_user_id,

    COALESCE(
      NULLIF(TRIM(CONCAT_WS(' ', b.first_name, b.last_name)), ''),
      NULLIF(TRIM(b.email), ''),
      NULLIF(TRIM(b.phone), '')
    ) AS buyer_display,

    COALESCE(
      NULLIF(TRIM(CONCAT_WS(' ', rec.first_name, rec.last_name)), ''),
      NULLIF(TRIM(rec.email), ''),
      NULLIF(TRIM(rec.phone), '')
    ) AS recommender_display,

    COALESCE(
      NULLIF(TRIM(CONCAT_WS(' ', l1.first_name, l1.last_name)), ''),
      NULLIF(TRIM(l1.email), ''),
      NULLIF(TRIM(l1.phone), '')
    ) AS expected_level_1_user_display,

    COALESCE(
      NULLIF(TRIM(CONCAT_WS(' ', l2.first_name, l2.last_name)), ''),
      NULLIF(TRIM(l2.email), ''),
      NULLIF(TRIM(l2.phone), '')
    ) AS expected_level_2_user_display,

    COALESCE(
      NULLIF(TRIM(CONCAT_WS(' ', l3.first_name, l3.last_name)), ''),
      NULLIF(TRIM(l3.email), ''),
      NULLIF(TRIM(l3.phone), '')
    ) AS expected_level_3_user_display
  FROM orders_in_period oip
  LEFT JOIN users b ON b.id = oip.buyer_id
  LEFT JOIN users rec ON rec.id = b.recommender_id
  LEFT JOIN users l1 ON l1.id = b.recommender_id
  LEFT JOIN users l2 ON l2.id = l1.recommender_id
  LEFT JOIN users l3 ON l3.id = l2.recommender_id
),

order_expected_period AS (
  SELECT
    oip.order_id,
    CASE
      WHEN DAY(oip.order_created_at) >= 28
        THEN DATE_FORMAT(DATE_ADD(oip.order_created_at, INTERVAL 1 MONTH), '%Y%m')
      ELSE DATE_FORMAT(oip.order_created_at, '%Y%m')
    END AS expected_period_sql
  FROM orders_in_period oip
),

target_headers AS (
  SELECT
    oip.order_id,
    oep.expected_period_sql,
    CASE WHEN th1.id IS NOT NULL THEN 1 ELSE 0 END AS target_commission_header_found_l1,
    CASE WHEN th2.id IS NOT NULL THEN 1 ELSE 0 END AS target_commission_header_found_l2,
    CASE WHEN th3.id IS NOT NULL THEN 1 ELSE 0 END AS target_commission_header_found_l3
  FROM orders_in_period oip
  INNER JOIN order_expected_period oep ON oep.order_id = oip.order_id
  LEFT JOIN buyer_chain bc ON bc.order_id = oip.order_id
  LEFT JOIN commissions th1
    ON th1.user_id = bc.expected_level_1_user_id
   AND th1.period = oep.expected_period_sql
  LEFT JOIN commissions th2
    ON th2.user_id = bc.expected_level_2_user_id
   AND th2.period = oep.expected_period_sql
  LEFT JOIN commissions th3
    ON th3.user_id = bc.expected_level_3_user_id
   AND th3.period = oep.expected_period_sql
),

consumption_grouped AS (
  SELECT
    uc.order_id,
    COALESCE(NULLIF(TRIM(uc.product), ''), 'Producto sin nombre') AS product_label,
    COUNT(*) AS product_qty,
    ROUND(SUM(uc.total), 2) AS product_total
  FROM users_consumption uc
  INNER JOIN orders_in_period oip ON oip.order_id = uc.order_id
  GROUP BY uc.order_id, COALESCE(NULLIF(TRIM(uc.product), ''), 'Producto sin nombre')
),

consumption_summary AS (
  SELECT
    cg.order_id,
    COALESCE(SUM(cg.product_qty), 0) AS consumption_line_count,
    ROUND(COALESCE(SUM(cg.product_total), 0), 2) AS consumption_total_sum,
    GROUP_CONCAT(
      CONCAT(cg.product_label, ' x', cg.product_qty, ' = ', ROUND(cg.product_total, 2))
      ORDER BY cg.product_label
      SEPARATOR ' | '
    ) AS consumptions_summary
  FROM consumption_grouped cg
  GROUP BY cg.order_id
),

consumption_dup_flags AS (
  SELECT
    x.order_id,
    GROUP_CONCAT(
      CONCAT(x.product_id, ' x', x.cnt)
      ORDER BY x.product_id
      SEPARATOR ' | '
    ) AS consumption_duplicate_keys,
    SUM(x.cnt) AS consumption_duplicate_row_count
  FROM (
    SELECT
      uc.order_id,
      uc.product_id,
      COUNT(*) AS cnt
    FROM users_consumption uc
    INNER JOIN orders_in_period oip ON oip.order_id = uc.order_id
    GROUP BY uc.order_id, uc.product_id
    HAVING COUNT(*) > 1
  ) x
  GROUP BY x.order_id
),

consumption_user_check AS (
  SELECT
    uc.order_id,
    SUM(CASE WHEN uc.user_id <> oip.buyer_id THEN 1 ELSE 0 END) AS consumption_lines_wrong_user_count
  FROM users_consumption uc
  INNER JOIN orders_in_period oip ON oip.order_id = uc.order_id
  GROUP BY uc.order_id
),

commission_transactions_enriched AS (
  SELECT
    ct.order_id,
    ct.id AS commission_transaction_id,
    ct.level AS ct_level,
    ct.amount,
    ct.date AS commission_tx_date,
    cm.period AS commission_header_period,
    cm.user_id AS creditor_user_id,
    cm.created_at AS commission_header_created_at,
    COALESCE(
      NULLIF(TRIM(CONCAT_WS(' ', cred.first_name, cred.last_name)), ''),
      NULLIF(TRIM(cred.email), ''),
      NULLIF(TRIM(cred.phone), '')
    ) AS creditor_user_display
  FROM commission_transactions ct
  INNER JOIN orders_in_period oip ON oip.order_id = ct.order_id
  LEFT JOIN commissions cm ON cm.id = ct.commission_id
  LEFT JOIN users cred ON cred.id = cm.user_id
),

order_commission_periods AS (
  SELECT
    cte.order_id,
    GROUP_CONCAT(DISTINCT NULLIF(TRIM(cte.commission_header_period), '') ORDER BY cte.commission_header_period SEPARATOR '|') AS distinct_commission_periods,
    COUNT(DISTINCT NULLIF(TRIM(cte.commission_header_period), '')) AS distinct_commission_period_count
  FROM commission_transactions_enriched cte
  WHERE cte.commission_header_period IS NOT NULL AND TRIM(cte.commission_header_period) <> ''
  GROUP BY cte.order_id
),

commission_grouped AS (
  SELECT
    cte.order_id,
    cte.ct_level,
    ROUND(SUM(cte.amount), 2) AS level_amount,
    COUNT(*) AS level_transaction_row_count,
    MAX(cte.commission_header_created_at) AS level_header_created_at_max,
    GROUP_CONCAT(DISTINCT NULLIF(TRIM(cte.commission_header_period), '') ORDER BY cte.commission_header_period SEPARATOR '|') AS level_commission_periods,
    GROUP_CONCAT(DISTINCT cte.creditor_user_id ORDER BY cte.creditor_user_id SEPARATOR '|') AS actual_level_user_ids,
    GROUP_CONCAT(DISTINCT cte.creditor_user_display ORDER BY cte.creditor_user_display SEPARATOR ' | ') AS actual_level_user_displays
  FROM commission_transactions_enriched cte
  GROUP BY cte.order_id, cte.ct_level
),

commission_summary AS (
  SELECT
    cg.order_id,
    SUM(cg.level_transaction_row_count) AS commission_transaction_count,
    ROUND(SUM(cg.level_amount), 2) AS commission_amount_sum,

    ROUND(SUM(CASE WHEN cg.ct_level = 1 THEN cg.level_amount ELSE 0 END), 2) AS level_1_commission_amount,
    MAX(CASE WHEN cg.ct_level = 1 THEN cg.level_transaction_row_count END) AS level_1_transaction_row_count,
    MAX(CASE WHEN cg.ct_level = 1 THEN cg.actual_level_user_ids END) AS actual_level_1_user_ids,
    MAX(CASE WHEN cg.ct_level = 1 THEN cg.actual_level_user_displays END) AS level_1_commission_user,
    MAX(CASE WHEN cg.ct_level = 1 THEN cg.level_commission_periods END) AS level_1_commission_periods,
    MAX(CASE WHEN cg.ct_level = 1 THEN cg.level_header_created_at_max END) AS level_1_commission_header_created_at,

    ROUND(SUM(CASE WHEN cg.ct_level = 2 THEN cg.level_amount ELSE 0 END), 2) AS level_2_commission_amount,
    MAX(CASE WHEN cg.ct_level = 2 THEN cg.level_transaction_row_count END) AS level_2_transaction_row_count,
    MAX(CASE WHEN cg.ct_level = 2 THEN cg.actual_level_user_ids END) AS actual_level_2_user_ids,
    MAX(CASE WHEN cg.ct_level = 2 THEN cg.actual_level_user_displays END) AS level_2_commission_user,
    MAX(CASE WHEN cg.ct_level = 2 THEN cg.level_commission_periods END) AS level_2_commission_periods,
    MAX(CASE WHEN cg.ct_level = 2 THEN cg.level_header_created_at_max END) AS level_2_commission_header_created_at,

    ROUND(SUM(CASE WHEN cg.ct_level = 3 THEN cg.level_amount ELSE 0 END), 2) AS level_3_commission_amount,
    MAX(CASE WHEN cg.ct_level = 3 THEN cg.level_transaction_row_count END) AS level_3_transaction_row_count,
    MAX(CASE WHEN cg.ct_level = 3 THEN cg.actual_level_user_ids END) AS actual_level_3_user_ids,
    MAX(CASE WHEN cg.ct_level = 3 THEN cg.actual_level_user_displays END) AS level_3_commission_user,
    MAX(CASE WHEN cg.ct_level = 3 THEN cg.level_commission_periods END) AS level_3_commission_periods,
    MAX(CASE WHEN cg.ct_level = 3 THEN cg.level_header_created_at_max END) AS level_3_commission_header_created_at,

    GROUP_CONCAT(
      CONCAT('L', cg.ct_level, ': ', cg.actual_level_user_displays, ' = ', ROUND(cg.level_amount, 2))
      ORDER BY cg.ct_level
      SEPARATOR ' | '
    ) AS commissions_summary
  FROM commission_grouped cg
  GROUP BY cg.order_id
)

SELECT
  oip.order_id,
  oip.folio,
  oip.order_created_at,
  oip.delivery_status,
  oip.purchase_date,
  oip.order_type,
  oip.payment_provider,
  oip.order_subtotal,
  oip.order_total,
  oip.order_iva,

  bc.buyer_id,
  bc.buyer_display,
  bc.recommender_display,

  bc.expected_level_1_user_id,
  bc.expected_level_1_user_display,
  bc.expected_level_2_user_id,
  bc.expected_level_2_user_display,
  bc.expected_level_3_user_id,
  bc.expected_level_3_user_display,

  oep.expected_period_sql AS expected_period_sql,

  COALESCE(th.target_commission_header_found_l1, 0) AS target_commission_header_found_l1,
  COALESCE(th.target_commission_header_found_l2, 0) AS target_commission_header_found_l2,
  COALESCE(th.target_commission_header_found_l3, 0) AS target_commission_header_found_l3,

  COALESCE(cs.consumption_line_count, 0) AS consumption_line_count,
  ROUND(COALESCE(cs.consumption_total_sum, 0), 2) AS consumption_total_sum,
  cs.consumptions_summary,
  cdf.consumption_duplicate_keys,
  COALESCE(cdf.consumption_duplicate_row_count, 0) AS consumption_duplicate_row_count,
  COALESCE(cuc.consumption_lines_wrong_user_count, 0) AS consumption_lines_wrong_user_count,

  ocp.distinct_commission_periods,
  COALESCE(ocp.distinct_commission_period_count, 0) AS distinct_commission_period_count,

  COALESCE(coms.commission_transaction_count, 0) AS commission_transaction_count,
  ROUND(COALESCE(coms.commission_amount_sum, 0), 2) AS commission_amount_sum,

  ROUND(COALESCE(coms.level_1_commission_amount, 0), 2) AS level_1_commission_amount,
  COALESCE(coms.level_1_transaction_row_count, 0) AS level_1_transaction_row_count,
  coms.actual_level_1_user_ids,
  coms.level_1_commission_user,
  coms.level_1_commission_periods,
  coms.level_1_commission_header_created_at,

  ROUND(COALESCE(coms.level_2_commission_amount, 0), 2) AS level_2_commission_amount,
  COALESCE(coms.level_2_transaction_row_count, 0) AS level_2_transaction_row_count,
  coms.actual_level_2_user_ids,
  coms.level_2_commission_user,
  coms.level_2_commission_periods,
  coms.level_2_commission_header_created_at,

  ROUND(COALESCE(coms.level_3_commission_amount, 0), 2) AS level_3_commission_amount,
  COALESCE(coms.level_3_transaction_row_count, 0) AS level_3_transaction_row_count,
  coms.actual_level_3_user_ids,
  coms.level_3_commission_user,
  coms.level_3_commission_periods,
  coms.level_3_commission_header_created_at,

  coms.commissions_summary

FROM orders_in_period oip
LEFT JOIN buyer_chain bc ON bc.order_id = oip.order_id
LEFT JOIN order_expected_period oep ON oep.order_id = oip.order_id
LEFT JOIN target_headers th ON th.order_id = oip.order_id
LEFT JOIN consumption_summary cs ON cs.order_id = oip.order_id
LEFT JOIN consumption_dup_flags cdf ON cdf.order_id = oip.order_id
LEFT JOIN consumption_user_check cuc ON cuc.order_id = oip.order_id
LEFT JOIN order_commission_periods ocp ON ocp.order_id = oip.order_id
LEFT JOIN commission_summary coms ON coms.order_id = oip.order_id
ORDER BY oip.order_created_at, oip.order_id;
