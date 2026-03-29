# 07 – Comisiones: transacciones, acreedor, método Cobro y fiscalidad (`commission`)

## Objetivo

Consulta de soporte/análisis que une:

- Cada **transacción de comisión** (`commission_transactions`) con su **comisión** (`commissions`).
- **Total acumulado** y conteo de transacciones por comisión.
- **Usuario acreedor** (`commissions.user_id`): nombre, apellido, correo y teléfono (`users`).
- **Método de pago de cobro** (`payment_methods.card_use = 'Cobro'`), incluyendo **CLABE** y campos relevantes del registro; si el usuario tiene varios métodos Cobro, se toma el **más reciente** por `created_at`.
- **Datos fiscales para comisiones** (`tax_information` con `tax_type = 'commission'`): `curp`, `rfc`, `address_id` (hay como máximo un registro por usuario y tipo, ver `unique_user_taxType` en la tabla).

Tablas de referencia: `docs/04_SQL/tables/commissions.md`, `commission_transactions.md`, `users.md`, `payment_methods.md`, `tax_information.md`.

---

## Query 1 – Detalle por transacción (con total por comisión)

```sql
SELECT
  c.id AS commission_id,
  c.period,
  c.folio,
  c.status,
  c.is_paid,
  c.request_id,
  commission_totals.total_amount AS commission_total_amount,
  commission_totals.tx_count AS commission_transaction_count,

  ct.id AS commission_transaction_id,
  ct.amount AS transaction_amount,
  ct.date AS transaction_date,
  ct.from_user_id,
  ct.order_id,
  ct.level,

  u.id AS creditor_user_id,
  u.first_name,
  u.last_name,
  u.email,
  u.phone,

  ti.id AS tax_information_id,
  ti.address_id AS tax_address_id,
  ti.curp AS tax_curp,
  ti.rfc AS tax_rfc,
  ti.tax_type AS tax_type,

  pm.id AS cobro_payment_method_id,
  pm.alias,
  pm.bank,
  pm.beneficiary,
  pm.clabe,
  pm.card_number,
  pm.card_type,
  pm.name_on_card,
  pm.openpay_bank_accountId,
  pm.openpay_card_id,
  pm.is_shipping_payment,
  pm.is_account_registered_on_wire4,
  pm.wire4_account_registration_confirmation_url,
  pm.created_at AS payment_method_created_at,
  pm.updated_at AS payment_method_updated_at
FROM commission_transactions ct
INNER JOIN commissions c ON c.id = ct.commission_id
INNER JOIN users u ON u.id = c.user_id
LEFT JOIN tax_information ti
  ON ti.user_id = c.user_id
  AND ti.tax_type = 'commission'
INNER JOIN (
  SELECT commission_id, SUM(amount) AS total_amount, COUNT(*) AS tx_count
  FROM commission_transactions
  GROUP BY commission_id
) AS commission_totals ON commission_totals.commission_id = c.id
LEFT JOIN payment_methods pm
  ON pm.user_id = c.user_id
  AND pm.card_use = 'Cobro'
  AND pm.id = (
    SELECT pm2.id
    FROM payment_methods pm2
    WHERE pm2.user_id = c.user_id
      AND pm2.card_use = 'Cobro'
    ORDER BY pm2.created_at DESC
    LIMIT 1
  )
ORDER BY c.period DESC, c.id, ct.date;
```

---

## Query 2 – Resumen por comisión (sin una fila por transacción)

```sql
SELECT
  c.id AS commission_id,
  c.user_id AS creditor_user_id,
  c.period,
  c.folio,
  c.status,
  c.is_paid,
  SUM(ct.amount) AS total_amount,
  COUNT(ct.id) AS transaction_count,
  u.first_name,
  u.last_name,
  u.email,
  u.phone,
  ti.id AS tax_information_id,
  ti.address_id AS tax_address_id,
  ti.curp AS tax_curp,
  ti.rfc AS tax_rfc,
  pm.id AS cobro_payment_method_id,
  pm.clabe,
  pm.bank,
  pm.alias,
  pm.beneficiary,
  pm.openpay_bank_accountId
FROM commissions c
INNER JOIN users u ON u.id = c.user_id
LEFT JOIN tax_information ti
  ON ti.user_id = c.user_id
  AND ti.tax_type = 'commission'
LEFT JOIN commission_transactions ct ON ct.commission_id = c.id
LEFT JOIN payment_methods pm
  ON pm.user_id = c.user_id
  AND pm.card_use = 'Cobro'
  AND pm.id = (
    SELECT pm2.id
    FROM payment_methods pm2
    WHERE pm2.user_id = c.user_id
      AND pm2.card_use = 'Cobro'
    ORDER BY pm2.created_at DESC
    LIMIT 1
  )
GROUP BY
  c.id, c.user_id, c.period, c.folio, c.status, c.is_paid,
  u.first_name, u.last_name, u.email, u.phone,
  ti.id, ti.address_id, ti.curp, ti.rfc,
  pm.id, pm.clabe, pm.bank, pm.alias, pm.beneficiary, pm.openpay_bank_accountId
ORDER BY c.period DESC, c.id;
```

---

## Parámetros opcionales

- Filtrar por periodo: añade `WHERE c.period = 'YYYYMM'` (ajusta al formato real de `period`, `char(6)`).
- Filtrar por comisión: `WHERE c.id = '...'`.

---

## Notas

- **`from_user_id`** en `commission_transactions` es el origen en red; el acreedor de la comisión es **`commissions.user_id`**.
- Si el acreedor no tiene `tax_information` para `commission`, las columnas `ti.*` salen `NULL`.
- Varios métodos `Cobro`: el subquery con `ORDER BY created_at DESC LIMIT 1` evita duplicar filas; cámbialo si el negocio define otra regla (por ejemplo `alias` o `is_account_registered_on_wire4`).
