# 08 — Purga dura de usuarios por lista de IDs (staging / QA / local)

## Objetivo

Eliminar de forma **física** un conjunto de usuarios (`users.id`) y las filas de otras tablas que los referencian, respetando el orden de **claves foráneas** y casos conocidos del esquema (órdenes, compras mensuales, recomendaciones, formularios, dietas, auto-descubrimiento de FK a `users`, y `users.recommender_id`).

El script está pensado para **entornos no productivos** donde se necesita borrar cuentas de prueba o lotes controlados de usuarios.

⚠️ **No usar en producción** sin revisión explícita de impacto, backups y cumplimiento.

---

## Entrada

1. Edita el bloque `INSERT IGNORE INTO tmp_purge_user_ids (id) VALUES (...)` en el script siguiente con los UUID a purgar.
2. Ejecuta el bloque completo en una sesión MySQL / MySQL Workbench (incluye `DELIMITER` para el procedimiento dinámico).

No hay variables `@`; la lista de IDs es el único parámetro.

---

## Comportamiento resumido

| Fase | Qué hace |
|------|-----------|
| Temp tables | `tmp_purge_user_ids` (objetivos) y `tmp_purge_user_ids_2` (espejo para evitar error **1137**). |
| Transacción | `START TRANSACTION` … `COMMIT`. Desactiva `SQL_SAFE_UPDATES` solo en la sesión y lo restaura al final. |
| Recomendadores omitidos | Lista en resultado `skipped_recommenders_not_purged` a quienes **otro usuario** sigue teniendo como `recommender_id`. Esos IDs se **eliminan de la lista** y **no se borran** (ni sus datos asociados en este script). |
| Resync espejo | Tras el filtrado, se vuelve a llenar `tmp_purge_user_ids_2` desde `tmp_purge_user_ids`. |
| Deletes explícitos | `orders`, `monthly_purchases`, `recommendation_items` + `recommendations`, `commission_transactions`, `commissions`, cadena `bookings` → `filled_forms` → `filled_form_values`, `diets` e hijos. |
| Auto-FK | Procedimiento `PurgeUsers_DeleteAllUserFKRows`: recorre `information_schema` y ejecuta `DELETE` en cada tabla (excepto `users`) con columna FK a `users(id)`. |
| `recommender_id` | (1) Usuarios **fuera** del purge que apuntaban a un id del purge: `recommender_id = NULL`. (2) Usuarios **dentro** del purge cuyo recomendador también está en el purge: se anula la arista. Usa `tmp_purge_user_ids` + `tmp_purge_user_ids_2` en el primer `UPDATE` para no abrir la misma tabla temporal dos veces (**1137**). |
| Cierre | `DELETE` de filas en `users` para los ids que siguen en `tmp_purge_user_ids`. Comprueba `remaining_purge_targets_in_users` (esperado **0** si todo lo borrable se eliminó). |

---

## Errores y restricciones conocidas

- **1137 — Can't reopen table:** no referenciar la misma `TEMPORARY TABLE` dos veces en una sola sentencia; el script usa dos temps con el mismo contenido cuando hace falta.
- **1451 — Foreign key:** el orden explícito + el bucle dinámico cubren la mayoría de FK a `users`; si el esquema añade tablas nuevas, el bucle las incorpora salvo dependencias **no** hacia `users` (como `recommendation_items` → `recommendations`), ya cubiertas arriba.
- **`recommender_id` NOT NULL:** si la columna no admite `NULL`, usa un `users.id` “superviviente” en los `UPDATE` en lugar de `NULL` (ajusta los `SET` en el script siguiente).

---

## Script completo

```sql
-- STAGING / QA / LOCAL — hard purge by user ids (MySQL).
-- Same temp table twice in one statement causes 1137; use tmp_purge_user_ids + tmp_purge_user_ids_2.
-- recommender_id must allow NULL (or change NULL to a survivor users.id below).

SET NAMES utf8mb4;

DROP TEMPORARY TABLE IF EXISTS tmp_purge_user_ids;
CREATE TEMPORARY TABLE tmp_purge_user_ids (id VARCHAR(36) PRIMARY KEY);
INSERT IGNORE INTO tmp_purge_user_ids (id) VALUES
('4280b73e-2984-49d1-bb34-bead2d72c111'),
('0eeb910f-965c-4f62-b7ad-337e1027550b'),
('6acf0a10-fe9d-4146-84a1-148983ecb9f0'),
('170bcfee-d748-491e-a528-673307901975'),
('159a356d-7985-4337-b081-47c2b09197b3');

DROP TEMPORARY TABLE IF EXISTS tmp_purge_user_ids_2;
CREATE TEMPORARY TABLE tmp_purge_user_ids_2 (id VARCHAR(36) PRIMARY KEY);
INSERT IGNORE INTO tmp_purge_user_ids_2 (id) SELECT id FROM tmp_purge_user_ids;

START TRANSACTION;

SET @OLD_SQL_SAFE_UPDATES := @@SQL_SAFE_UPDATES;
SET SQL_SAFE_UPDATES = 0;

SELECT 'skipped_recommenders_not_purged' AS outcome, u.id, u.email, u.first_name, u.last_name,
  (SELECT COUNT(*) FROM users c WHERE c.recommender_id = u.id AND c.id <> u.id) AS referred_by_count
FROM users u
JOIN tmp_purge_user_ids t ON t.id = u.id
WHERE EXISTS (SELECT 1 FROM users c WHERE c.recommender_id = u.id AND c.id <> u.id);

DELETE t FROM tmp_purge_user_ids t
WHERE EXISTS (SELECT 1 FROM users c WHERE c.recommender_id = t.id AND c.id <> t.id);

DELETE FROM tmp_purge_user_ids_2;
INSERT IGNORE INTO tmp_purge_user_ids_2 (id) SELECT id FROM tmp_purge_user_ids;

DELETE FROM orders WHERE user_id IN (SELECT id FROM tmp_purge_user_ids);
DELETE FROM monthly_purchases WHERE user_id IN (SELECT id FROM tmp_purge_user_ids);

DELETE ri FROM recommendation_items ri
JOIN recommendations r ON r.id = ri.recommendation_id
WHERE r.user_id IN (SELECT id FROM tmp_purge_user_ids)
   OR r.specialist_id IN (SELECT id FROM tmp_purge_user_ids_2);

DELETE FROM commission_transactions WHERE from_user_id IN (SELECT id FROM tmp_purge_user_ids);

DELETE c FROM commissions c
JOIN tmp_purge_user_ids t ON t.id = c.user_id;

DROP TEMPORARY TABLE IF EXISTS tmp_purge_booking_ids;
CREATE TEMPORARY TABLE tmp_purge_booking_ids (id VARCHAR(36) PRIMARY KEY);
INSERT IGNORE INTO tmp_purge_booking_ids (id)
SELECT b.id FROM bookings b
WHERE b.user_id IN (SELECT id FROM tmp_purge_user_ids)
   OR b.specialist_id IN (SELECT id FROM tmp_purge_user_ids_2);

DROP TEMPORARY TABLE IF EXISTS tmp_purge_filled_forms;
CREATE TEMPORARY TABLE tmp_purge_filled_forms (id VARCHAR(36) PRIMARY KEY);
INSERT IGNORE INTO tmp_purge_filled_forms (id)
SELECT ff.id FROM filled_forms ff
WHERE ff.user_id IN (SELECT id FROM tmp_purge_user_ids)
   OR ff.specialist_id IN (SELECT id FROM tmp_purge_user_ids_2)
   OR ff.booking_id IN (SELECT id FROM tmp_purge_booking_ids);

DROP TEMPORARY TABLE IF EXISTS tmp_purge_booking_ids;

DELETE FROM filled_form_values WHERE filled_form_id IN (SELECT id FROM tmp_purge_filled_forms);
DELETE FROM filled_forms WHERE id IN (SELECT id FROM tmp_purge_filled_forms);
DROP TEMPORARY TABLE IF EXISTS tmp_purge_filled_forms;

DROP TEMPORARY TABLE IF EXISTS tmp_purge_diets;
CREATE TEMPORARY TABLE tmp_purge_diets (id VARCHAR(36) PRIMARY KEY);
INSERT IGNORE INTO tmp_purge_diets (id)
SELECT d.id FROM diets d
WHERE d.user_id IN (SELECT id FROM tmp_purge_user_ids)
   OR d.specialist_id IN (SELECT id FROM tmp_purge_user_ids_2);

DELETE FROM diet_equivalences_groups WHERE diet_id IN (SELECT id FROM tmp_purge_diets);
DELETE FROM diet_menu_weekly WHERE diet_id IN (SELECT id FROM tmp_purge_diets);
DELETE FROM diets WHERE id IN (SELECT id FROM tmp_purge_diets);
DROP TEMPORARY TABLE IF EXISTS tmp_purge_diets;

DROP PROCEDURE IF EXISTS PurgeUsers_DeleteAllUserFKRows;
DELIMITER $$
CREATE PROCEDURE PurgeUsers_DeleteAllUserFKRows()
BEGIN
  DECLARE v_table VARCHAR(64);
  DECLARE v_col   VARCHAR(64);
  DECLARE v_done  INT DEFAULT 0;
  DECLARE cur CURSOR FOR
    SELECT kcu.table_name, kcu.column_name
    FROM information_schema.key_column_usage kcu
    WHERE kcu.constraint_schema = DATABASE()
      AND kcu.referenced_table_name = 'users'
      AND kcu.table_name <> 'users'
    ORDER BY kcu.table_name, kcu.column_name;
  DECLARE CONTINUE HANDLER FOR NOT FOUND SET v_done = 1;
  OPEN cur;
  loop_fk: LOOP
    FETCH cur INTO v_table, v_col;
    IF v_done = 1 THEN LEAVE loop_fk; END IF;
    SET @sql := CONCAT('DELETE FROM `', v_table, '` WHERE `', v_col, '` IN (SELECT id FROM tmp_purge_user_ids);');
    PREPARE stmt FROM @sql;
    EXECUTE stmt;
    DEALLOCATE PREPARE stmt;
  END LOOP;
  CLOSE cur;
END$$
DELIMITER ;

CALL PurgeUsers_DeleteAllUserFKRows();
DROP PROCEDURE IF EXISTS PurgeUsers_DeleteAllUserFKRows;

-- External children: dead=tmp, membership check must use tmp_2 (not tmp twice — 1137)
UPDATE users u
INNER JOIN tmp_purge_user_ids dead ON dead.id = u.recommender_id
LEFT JOIN tmp_purge_user_ids_2 self ON self.id = u.id
SET u.recommender_id = NULL
WHERE self.id IS NULL;

UPDATE users u
INNER JOIN tmp_purge_user_ids t ON t.id = u.id
INNER JOIN tmp_purge_user_ids_2 r ON r.id = u.recommender_id
SET u.recommender_id = NULL;

DELETE u FROM users u INNER JOIN tmp_purge_user_ids t ON t.id = u.id;

SELECT COUNT(*) AS remaining_purge_targets_in_users FROM users u JOIN tmp_purge_user_ids t ON t.id = u.id;

SET SQL_SAFE_UPDATES = @OLD_SQL_SAFE_UPDATES;
COMMIT;
```

---

## Relación con código

En `layers/multi-mysql-layer` existen queries de purga por usuario (`src/queries/userPurge.js`) con intención similar para borrados controlados desde aplicación. Este documento es la variante **SQL ad-hoc** para operadores en BD.

---

## Referencias de tablas

- [users](../tables/users.md) — `recommender_id`, FKs entrantes.
- [orders](../tables/orders.md), [monthly_purchases](../tables/monthly_purchases.md), [recommendations](../tables/recommendations.md), [recommendation_items](../tables/recommendation_items.md), [bookings](../tables/bookings.md), [filled_forms](../tables/filled_forms.md), [diets](../tables/diets.md), [commissions](../tables/commissions.md), [commission_transactions](../tables/commission_transactions.md).

---

- **Última revisión de documentación:** 2026-04-03
