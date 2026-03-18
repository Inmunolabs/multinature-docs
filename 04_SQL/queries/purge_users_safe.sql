-- =============================================================================
-- STAGING / QA / LOCAL ONLY — Safe user purge (preview + delete)
--
-- Design goals (based on errors observed in your environment):
-- - Workbench Safe Updates (1175): disable per-session, restore at end.
-- - Temp table reopen (1137): avoid referencing same TEMP table twice in a statement.
-- - Trigger limitation (1442): materialize IDs into temp tables before deleting.
-- - FK ordering (1451): delete children first; users.recommender_id requires leaf->root.
-- - Unknown FKs like working_hours: auto-detect FK columns referencing users via information_schema.
--
-- Comments in English (repo convention). Output/usage in Spanish.
-- =============================================================================

SET NAMES utf8mb4;

-- -----------------------------------------------------------------------------
-- A) INPUT — targets
-- -----------------------------------------------------------------------------
DROP TEMPORARY TABLE IF EXISTS tmp_purge_user_ids;
CREATE TEMPORARY TABLE tmp_purge_user_ids (id VARCHAR(36) PRIMARY KEY);

-- Targets (provided by user)
INSERT IGNORE INTO tmp_purge_user_ids (id) VALUES
('083dd1c5-681b-4c33-bf64-53c7266620a1'),
('148f3369-035b-4859-a004-63f8656dfb1f'),
('14962e53-24ff-40fa-9417-4df13a677e2a'),
('16ac90cd-cd83-4878-9171-87b7386ebc48'),
('23469460-92ec-47ea-baf5-c2a0820981ac'),
('31eecca4-5244-4939-a931-721f3dd04df8'),
('48273c1a-d11e-4c34-a070-96505e9837f4'),
('73466598-b507-4db6-87df-800ef4fae364'),
('a5f2a439-8af5-4bf1-8901-dc2894758c23'),
('b6896465-f1d0-4370-9fe8-a183ae8979a1'),
('bb5581e5-ce73-4f00-be00-e5f4225d780f'),
('cc434337-09d3-434c-878c-c6e47ad99cca'),
('e5670dac-403c-4a10-affa-fcbb75f98e8a'),
('efcf7f6e-00e6-4779-9bcc-21b5d1283878'),
('f4c23eae-0b84-4f33-9f6d-c02559990609'),
('9f59009c-3788-4267-b30e-4b7a41683ba5'),
('9d3253ab-0db9-4fa1-95ce-2c2318473699'),
('05bc5b05-8412-4581-825a-4209d48ab054'),
('2f0f8a35-614b-4ab6-b1f0-1bd9e417a9e0'),
('284edee9-bf48-422c-aea2-00fd2147fdb4'),
('40ff1531-0c54-45e7-9f18-0481692c905e'),
('4fc08d50-e529-4daf-a013-f9931e482907'),
('f67da7bd-a5a1-49b5-9e82-f1b354ff4f3c'),
('ca0d4d47-c0a1-4e2e-886b-79e7c50f8094'),
('c9b5e6a8-9a7a-4de6-ae5c-1dafda46d79e'),
('c92b4255-45ab-49df-a1aa-da66f43638ac'),
('f6d9c8f7-129b-4e59-b167-33509bf08354');

-- Mirrors for multi-reference statements (avoid 1137)
DROP TEMPORARY TABLE IF EXISTS tmp_purge_user_ids_2;
CREATE TEMPORARY TABLE tmp_purge_user_ids_2 (id VARCHAR(36) PRIMARY KEY);
INSERT IGNORE INTO tmp_purge_user_ids_2 (id) SELECT id FROM tmp_purge_user_ids;
DROP TEMPORARY TABLE IF EXISTS tmp_purge_user_ids_3;
CREATE TEMPORARY TABLE tmp_purge_user_ids_3 (id VARCHAR(36) PRIMARY KEY);
INSERT IGNORE INTO tmp_purge_user_ids_3 (id) SELECT id FROM tmp_purge_user_ids;

-- -----------------------------------------------------------------------------
-- B) PREVIEW — users + blockers + FK map
-- -----------------------------------------------------------------------------
SELECT 'targets_found' AS check_name, COUNT(*) AS cnt
FROM users u JOIN tmp_purge_user_ids t ON t.id = u.id;

SELECT u.id, u.email, u.first_name, u.last_name, u.profile, u.recommender_id
FROM users u JOIN tmp_purge_user_ids t ON t.id = u.id
ORDER BY u.created_at DESC;

-- Blockers outside the purge set (must be 0)
SELECT 'external_children_recommender_id' AS check_name, COUNT(*) AS blocking_rows
FROM users child
JOIN tmp_purge_user_ids target ON target.id = child.recommender_id
LEFT JOIN tmp_purge_user_ids_2 also_target ON also_target.id = child.id
WHERE also_target.id IS NULL;

-- FK columns that reference users(id) in this schema (auto-discovery)
SELECT
  kcu.table_name,
  kcu.column_name,
  rc.delete_rule,
  rc.update_rule
FROM information_schema.key_column_usage kcu
JOIN information_schema.referential_constraints rc
  ON rc.constraint_schema = kcu.constraint_schema
 AND rc.constraint_name = kcu.constraint_name
WHERE kcu.constraint_schema = DATABASE()
  AND kcu.referenced_table_name = 'users'
ORDER BY kcu.table_name, kcu.column_name;

-- -----------------------------------------------------------------------------
-- C) DELETE — robust purge (uncomment to execute)
-- -----------------------------------------------------------------------------
-- IMPORTANT: keep this commented until you're ready.
/*
START TRANSACTION;

-- Workbench safe-updates workaround (session-scoped; no preference change needed)
SET @OLD_SQL_SAFE_UPDATES := @@SQL_SAFE_UPDATES;
SET SQL_SAFE_UPDATES = 0;

-- 1) Explicit tables that are known to require ordering beyond simple FK-to-users
-- ----------------------------------------------------------------------------

-- Orders first (many tables cascade via order_id)
DELETE FROM orders WHERE user_id IN (SELECT id FROM tmp_purge_user_ids);

-- Commission transactions from deleted users (order_id cascades as well)
DELETE FROM commission_transactions WHERE from_user_id IN (SELECT id FROM tmp_purge_user_ids);

-- Commissions owned by deleted users (no FK to users in docs)
DELETE FROM commissions
WHERE id IN (
  SELECT id FROM (
    SELECT c.id
    FROM commissions c
    JOIN tmp_purge_user_ids t ON t.id = c.user_id
  ) x
);

-- filled_form_values -> filled_forms -> bookings (avoid 1137: never open tmp_purge_user_ids twice in one statement)
DROP TEMPORARY TABLE IF EXISTS tmp_purge_booking_ids;
CREATE TEMPORARY TABLE tmp_purge_booking_ids (id VARCHAR(36) PRIMARY KEY);
INSERT IGNORE INTO tmp_purge_booking_ids (id)
SELECT b.id
FROM bookings b
WHERE b.user_id IN (SELECT id FROM tmp_purge_user_ids)
   OR b.specialist_id IN (SELECT id FROM tmp_purge_user_ids_2);

DROP TEMPORARY TABLE IF EXISTS tmp_purge_filled_forms;
CREATE TEMPORARY TABLE tmp_purge_filled_forms (id VARCHAR(36) PRIMARY KEY);
INSERT IGNORE INTO tmp_purge_filled_forms (id)
SELECT ff.id
FROM filled_forms ff
WHERE ff.user_id IN (SELECT id FROM tmp_purge_user_ids)
   OR ff.specialist_id IN (SELECT id FROM tmp_purge_user_ids_2)
   OR ff.booking_id IN (SELECT id FROM tmp_purge_booking_ids);

DROP TEMPORARY TABLE IF EXISTS tmp_purge_booking_ids;

DELETE FROM filled_form_values WHERE filled_form_id IN (SELECT id FROM tmp_purge_filled_forms);
DELETE FROM filled_forms WHERE id IN (SELECT id FROM tmp_purge_filled_forms);
DROP TEMPORARY TABLE IF EXISTS tmp_purge_filled_forms;

-- Diet children (FK diet_id -> diets.id)
DROP TEMPORARY TABLE IF EXISTS tmp_purge_diets;
CREATE TEMPORARY TABLE tmp_purge_diets (id VARCHAR(36) PRIMARY KEY);
INSERT IGNORE INTO tmp_purge_diets (id)
SELECT d.id
FROM diets d
WHERE d.user_id IN (SELECT id FROM tmp_purge_user_ids)
   OR d.specialist_id IN (SELECT id FROM tmp_purge_user_ids_2);

DELETE FROM diet_equivalences_groups WHERE diet_id IN (SELECT id FROM tmp_purge_diets);
DELETE FROM diet_menu_weekly WHERE diet_id IN (SELECT id FROM tmp_purge_diets);
DELETE FROM diets WHERE id IN (SELECT id FROM tmp_purge_diets);
DROP TEMPORARY TABLE IF EXISTS tmp_purge_diets;

-- 2) Auto-delete rows in ALL tables that have an FK column to users(id)
-- ----------------------------------------------------------------------------
-- This covers working_hours and any other FK to users that exists in your DB.
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

    -- Build: DELETE FROM `table` WHERE `col` IN (SELECT id FROM tmp_purge_user_ids);
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

-- 3) Delete users leaf-to-root (recommender_id self-FK)
-- ----------------------------------------------------------------------------
DROP TEMPORARY TABLE IF EXISTS tmp_purge_remaining_users;
CREATE TEMPORARY TABLE tmp_purge_remaining_users (id VARCHAR(36) PRIMARY KEY);
INSERT IGNORE INTO tmp_purge_remaining_users (id) SELECT id FROM tmp_purge_user_ids;

DROP TEMPORARY TABLE IF EXISTS tmp_purge_remaining_users_2;
CREATE TEMPORARY TABLE tmp_purge_remaining_users_2 (id VARCHAR(36) PRIMARY KEY);

DROP TEMPORARY TABLE IF EXISTS tmp_purge_leaf_users;
CREATE TEMPORARY TABLE tmp_purge_leaf_users (id VARCHAR(36) PRIMARY KEY);

DROP PROCEDURE IF EXISTS PurgeUsers_DeleteLeafToRoot;
DELIMITER $$
CREATE PROCEDURE PurgeUsers_DeleteLeafToRoot()
BEGIN
  DECLARE v_deleted INT DEFAULT 0;
  DECLARE v_remaining INT DEFAULT 0;
  DECLARE v_guard INT DEFAULT 0;

  leaf_loop: LOOP
    SET v_guard = v_guard + 1;
    IF v_guard > 5000 THEN
      SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Guard exceeded while deleting users leaf-to-root (possible cycle).';
    END IF;

    TRUNCATE TABLE tmp_purge_remaining_users_2;
    INSERT IGNORE INTO tmp_purge_remaining_users_2 (id) SELECT id FROM tmp_purge_remaining_users;

    TRUNCATE TABLE tmp_purge_leaf_users;
    -- Leaf = in remaining AND not referenced as recommender_id by another remaining user
    INSERT IGNORE INTO tmp_purge_leaf_users (id)
    SELECT r.id
    FROM tmp_purge_remaining_users r
    LEFT JOIN users u
      ON u.recommender_id = r.id
     AND u.id IN (SELECT id FROM tmp_purge_remaining_users_2)
    WHERE u.id IS NULL;

    -- Delete leaf users
    DELETE FROM users WHERE id IN (SELECT id FROM tmp_purge_leaf_users);
    SET v_deleted = ROW_COUNT();

    -- Remove actually deleted users from remaining set
    DELETE r FROM tmp_purge_remaining_users r
    LEFT JOIN users u ON u.id = r.id
    WHERE u.id IS NULL;

    SELECT COUNT(*) INTO v_remaining FROM tmp_purge_remaining_users;
    IF v_remaining = 0 THEN LEAVE leaf_loop; END IF;

    IF v_deleted = 0 THEN
      SELECT 'stuck_remaining_users' AS check_name, u.id, u.email, u.recommender_id
      FROM users u JOIN tmp_purge_remaining_users r ON r.id = u.id;
      SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Cannot delete remaining users due to recommender FK dependencies (cycle or missing targets).';
    END IF;
  END LOOP;
END$$
DELIMITER ;

CALL PurgeUsers_DeleteLeafToRoot();

DROP PROCEDURE IF EXISTS PurgeUsers_DeleteLeafToRoot;
DROP TEMPORARY TABLE IF EXISTS tmp_purge_leaf_users;
DROP TEMPORARY TABLE IF EXISTS tmp_purge_remaining_users_2;
DROP TEMPORARY TABLE IF EXISTS tmp_purge_remaining_users;

-- Post-check
SELECT COUNT(*) AS remaining_users FROM users u JOIN tmp_purge_user_ids t ON t.id = u.id;

-- Restore safe-updates setting for this session
SET SQL_SAFE_UPDATES = @OLD_SQL_SAFE_UPDATES;

COMMIT;
*/
