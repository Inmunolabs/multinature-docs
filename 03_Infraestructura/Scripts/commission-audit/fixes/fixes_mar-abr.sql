START TRANSACTION;

-- CASO: FALTA NIVEL 2 (202603120007)

INSERT INTO commission_transactions (
  id,
  commission_id,
  order_id,
  amount,
  date,
  level,
  from_user_id
)
SELECT
  UUID(),
  c.id,
  o.id,
  ROUND((SUM(uc.total)/1.16) * 0.10, 2),
  o.created_at,
  2,
  o.user_id
FROM orders o
JOIN users_consumption uc ON uc.order_id = o.id
JOIN users buyer ON buyer.id = o.user_id
JOIN users l1 ON l1.id = buyer.recommender_id
JOIN users l2 ON l2.id = l1.recommender_id
JOIN commissions c 
  ON c.user_id = l2.id 
 AND c.period = '202603'
WHERE o.folio = '202603120007'
GROUP BY o.id
HAVING NOT EXISTS (
  SELECT 1 FROM commission_transactions ct
  WHERE ct.order_id = o.id AND ct.level = 2
);

-- PERIODO INCORRECTO (210014 y 270021)
-- 🚨 PROBLEMA REAL:
-- L2 y L3 sí tienen header en 202603
-- L1 NO tiene header en 202603

INSERT INTO commissions (
  id,
  user_id,
  period,
  status,
  is_paid,
  created_at,
  updated_at
)
SELECT
  UUID(),
  c_bad.user_id,
  '202603',
  c_bad.status,
  c_bad.is_paid,
  NOW(),
  NOW()
FROM commission_transactions ct
JOIN commissions c_bad ON c_bad.id = ct.commission_id
JOIN orders o ON o.id = ct.order_id
LEFT JOIN commissions c_good
  ON c_good.user_id = c_bad.user_id
 AND c_good.period = '202603'
WHERE o.folio IN ('202603210014','202603270021')
  AND ct.level = 1
  AND c_good.id IS NULL;
  
UPDATE commission_transactions ct
JOIN commissions c_bad ON c_bad.id = ct.commission_id
JOIN orders o ON o.id = ct.order_id
JOIN commissions c_good
  ON c_good.user_id = c_bad.user_id
 AND c_good.period = '202603'
SET ct.commission_id = c_good.id
WHERE o.folio IN ('202603210014','202603270021')
  AND c_bad.period = '202604';
  
-- MONTOS INCORRECTOS (202603210014)

UPDATE commission_transactions ct
JOIN orders o ON o.id = ct.order_id
JOIN (
  SELECT
    order_id,
    ROUND(SUM(total)/1.16,2) as net_total
  FROM users_consumption
  GROUP BY order_id
) cons ON cons.order_id = ct.order_id

SET ct.amount =
  CASE
    WHEN ct.level = 1 THEN ROUND(cons.net_total * 0.25, 2)
    WHEN ct.level = 2 THEN ROUND(cons.net_total * 0.10, 2)
    WHEN ct.level = 3 THEN ROUND(cons.net_total * 0.05, 2)
  END

WHERE o.folio = '202603210014';

-- LIMPIAR HEADERS HUÉRFANOS

DELETE c
FROM commissions c
LEFT JOIN commission_transactions ct
  ON ct.commission_id = c.id
WHERE ct.id IS NULL
  AND c.period IN ('202603','202604');
  
-- VALIDACIÓN FINAL

SELECT
  o.folio,
  ct.level,
  ct.amount,
  ct.date,
  c.period,
  c.user_id
FROM commission_transactions ct
JOIN commissions c ON c.id = ct.commission_id
JOIN orders o ON o.id = ct.order_id
WHERE o.folio IN ('202603120007','202603210014','202603270021')
ORDER BY o.folio, ct.level;

-- Últimos ajustes

UPDATE `multi-prod`.`commission_transactions` SET `date` = '2026-03-27 02:24:39' WHERE (`id` = '373bad0b-32e2-11f1-a54d-0225a15deb6d');
UPDATE `multi-prod`.`commission_transactions` SET `date` = '2026-03-27 02:24:39' WHERE (`id` = '373daee0-32e2-11f1-a54d-0225a15deb6d');
UPDATE `multi-prod`.`commission_transactions` SET `date` = '2026-03-27 02:24:39' WHERE (`id` = '373fdb90-32e2-11f1-a54d-0225a15deb6d');

UPDATE `multi-prod`.`commission_transactions` SET `date` = '2026-03-21 02:22:04' WHERE (`id` = '718c20a2-32e2-11f1-a54d-0225a15deb6d');
UPDATE `multi-prod`.`commission_transactions` SET `date` = '2026-03-21 02:22:04' WHERE (`id` = '718e5a53-32e2-11f1-a54d-0225a15deb6d');
UPDATE `multi-prod`.`commission_transactions` SET `date` = '2026-03-21 02:22:04' WHERE (`id` = '71901a28-32e2-11f1-a54d-0225a15deb6d');

COMMIT;
