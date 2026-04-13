#!/usr/bin/env node

/**
 * Commission / consumption audit — business rules from commission-audit-spec.md (single source of truth).
 * See docs/00_Overview/AGENTS_GUIDE.md
 */

const fs = require('fs');
const path = require('path');
const ExcelJS = require('exceljs');

function tryRequire(name) {
    try {
        return require(name);
    } catch {
        return null;
    }
}

const mysql = tryRequire('mysql2/promise');

// --- Spec §4 ---
const AMOUNT_TOLERANCE_MXN = 0.1;

// --- Spec §2: paid order = delivery_status in this set (not payment_provider) ---
const PAID_DELIVERY_STATUSES = new Set([
    'Preparando el Pedido',
    'Está en camino',
    'Entregado'
]);

/** @typedef {{ cutoffDay?: number, periodBaseField?: string }} AuditConfig */

function parseArgs(argv) {
    const out = {};
    for (const arg of argv) {
        if (!arg.startsWith('--')) continue;
        const clean = arg.slice(2);
        const eq = clean.indexOf('=');
        if (eq >= 0) out[clean.slice(0, eq)] = clean.slice(eq + 1);
        else out[clean] = true;
    }
    return out;
}

function toNum(v) {
    if (v == null || v === '' || v === 'NULL') return 0;
    const n = Number(v);
    return Number.isFinite(n) ? n : 0;
}

function round(n) {
    return Math.round((Number(n || 0) + Number.EPSILON) * 100) / 100;
}

function normalizeScalar(v) {
    if (v == null) return null;
    const s = String(v).trim();
    if (!s || s === 'NULL') return null;
    return s;
}

function normalizeList(value) {
    if (!value) return [];
    if (Array.isArray(value)) {
        return value.map(normalizeScalar).filter(Boolean);
    }
    return String(value)
        .split('|')
        .map(x => normalizeScalar(x))
        .filter(Boolean);
}

function parseDate(value) {
    if (value == null) return null;
    const d = value instanceof Date ? value : new Date(value);
    return Number.isNaN(d.getTime()) ? null : d;
}

/**
 * Spec §2
 * @param {string|null|undefined} deliveryStatus
 */
function isPaidOrder(deliveryStatus) {
    const s = normalizeScalar(deliveryStatus);
    return s != null && PAID_DELIVERY_STATUSES.has(s);
}

/**
 * Spec §5: configurable base date for period (ideal = payment confirmed; often only created_at is available).
 * @param {object} row
 * @param {AuditConfig} config
 */
function resolvePeriodBaseDate(row, config) {
    const field = config.periodBaseField || 'order_created_at';
    const raw = row[field] ?? row.order_created_at;
    return parseDate(raw);
}

/**
 * Spec §5 — same month labeling as SQL expected_period_sql (day >= cutoff => end month = next calendar month).
 * @param {Date|null} date
 * @param {AuditConfig} config
 */
function calculateExpectedPeriod(date, config) {
    if (!date) return null;
    const cutoffDay = config.cutoffDay ?? 28;
    const y = date.getUTCFullYear();
    const m = date.getUTCMonth() + 1;
    const day = date.getUTCDate();
    let endY = y;
    let endM = m;
    if (day >= cutoffDay) {
        endM = m + 1;
        if (endM > 12) {
            endM = 1;
            endY += 1;
        }
    }
    return `${endY}${String(endM).padStart(2, '0')}`;
}

/** Spec §3 chain */
function calculateExpectedNetwork(row) {
    return {
        l1: normalizeScalar(row.expected_level_1_user_id),
        l2: normalizeScalar(row.expected_level_2_user_id),
        l3: normalizeScalar(row.expected_level_3_user_id)
    };
}

/** Expected level flags — spec §3 */
function calculateExpectedLevels(row) {
    const n = calculateExpectedNetwork(row);
    return {
        expected_l1_exists: n.l1 != null,
        expected_l2_exists: n.l2 != null,
        expected_l3_exists: n.l3 != null,
        recipients: n
    };
}

function calculateExpectedAmounts(row, expectedLevels) {
    const gross = round(toNum(row.consumption_total_sum));
    const net = gross ? round(gross / 1.16) : 0;
    const exp1 = round(net * 0.25);
    const exp2 = round(net * 0.1);
    const exp3 = round(net * 0.05);
    const expectedTotal = round(
        exp1 +
            (expectedLevels.expected_l2_exists ? exp2 : 0) +
            (expectedLevels.expected_l3_exists ? exp3 : 0)
    );
    return {
        gross,
        net,
        exp1,
        exp2,
        exp3,
        expectedTotal
    };
}

function calculateExpectedRecipients(row) {
    return calculateExpectedNetwork(row);
}

/** @returns {{ start: number, end: number }} ms UTC */
function commissionPeriodWindowUtc(periodStr) {
    if (!periodStr || !/^\d{6}$/.test(periodStr)) return null;
    const y = parseInt(periodStr.slice(0, 4), 10);
    const m = parseInt(periodStr.slice(4, 6), 10);
    let sy = y;
    let sm = m - 1;
    if (sm <= 0) {
        sm = 12;
        sy -= 1;
    }
    const start = Date.UTC(sy, sm - 1, 28, 0, 0, 0);
    const end = Date.UTC(y, m - 1, 27, 23, 59, 59, 999);
    return { start, end };
}

function isCreatedAtConsistentWithHeaderPeriod(createdAt, headerPeriod) {
    const d = parseDate(createdAt);
    const p = normalizeScalar(headerPeriod);
    if (!d || !p) return null;
    const w = commissionPeriodWindowUtc(p);
    if (!w) return null;
    const t = d.getTime();
    return t >= w.start && t <= w.end;
}

function actualLevelExists(amount, txCount, userIdsStr, displayStr) {
    const a = round(toNum(amount));
    const txs = toNum(txCount);
    if (txs > 0 || a > AMOUNT_TOLERANCE_MXN) return true;
    if (normalizeList(userIdsStr).length > 0) return true;
    return normalizeScalar(displayStr) != null;
}

function isMinusTenPercentPattern(expected, actual) {
    if (expected <= AMOUNT_TOLERANCE_MXN) return false;
    const ratio = actual / expected;
    return ratio >= 0.89 && ratio <= 0.91;
}

function hasDbColumn(row, name) {
    return Object.prototype.hasOwnProperty.call(row, name);
}

/**
 * Spec §2 consequences
 */
function validateOrderStateVsMovements(row, ctx) {
    const { actionable, applicability } = ctx;
    const paid = ctx.isPaid;
    const hasCons = toNum(row.consumption_line_count) > 0 || toNum(row.consumption_total_sum) > 0;
    const hasCom = toNum(row.commission_transaction_count) > 0;
    const l1exists = ctx.actual.l1;

    if (!paid) {
        applicability.order_paid_checks = 'NOT_APPLICABLE';
        if (hasCons) actionable.push('ORDER_NOT_PAID_WITH_CONSUMPTION');
        if (hasCom) actionable.push('ORDER_NOT_PAID_WITH_COMMISSIONS');
    } else {
        applicability.order_paid_checks = 'APPLIES';
        if (!hasCons) actionable.push('PAID_ORDER_WITHOUT_CONSUMPTION');
        if (hasCons && ctx.expectedLevels.expected_l1_exists && !l1exists) {
            actionable.push('PAID_ORDER_WITHOUT_LEVEL_1');
        }
    }
}

/**
 * Structural level presence vs network — spec §3, §10, §11
 */
function validateLevelExistence(row, expected, ctx) {
    const { actionable, ignoredFalsePositives } = ctx;
    const { expectedLevels, actual } = ctx;
    const exp2 = expectedLevels.expected_l2_exists;
    const exp3 = expectedLevels.expected_l3_exists;

    if (actual.l3 && !actual.l2) {
        actionable.push('MISSING_LEVEL_2_WITH_LEVEL_3_PRESENT');
    }

    if (!exp2 && actual.l2) {
        actionable.push('UNEXPECTED_LEVEL_2');
    } else if (!exp2 && !actual.l2) {
        ignoredFalsePositives.push('L2_ABSENT_NOT_EXPECTED_OK');
    }

    if (!exp3 && actual.l3) {
        actionable.push('UNEXPECTED_LEVEL_3');
    } else if (!exp3 && !actual.l3) {
        ignoredFalsePositives.push('L3_ABSENT_NOT_EXPECTED_OK');
    }

    if (exp2 && ctx.commissionMathScope && !actual.l2) {
        actionable.push('MISSING_EXPECTED_LEVEL_2');
    }
    if (exp3 && ctx.commissionMathScope && !actual.l3) {
        actionable.push('MISSING_EXPECTED_LEVEL_3');
    }
    // L1 absence when required is covered by PAID_ORDER_WITHOUT_LEVEL_1 (spec §2 / §10).
}

/**
 * Per-level recipient existence (only when level expected or actually present) — spec §6
 */
function validateRecipientExistence(row, expected, ctx) {
    validateRecipients(row, expected, ctx);
}

function validateRecipients(row, expected, ctx) {
    const { actionable, ignoredFalsePositives } = ctx;
    const actual = ctx.actual;
    const ids = {
        1: normalizeList(row.actual_level_1_user_ids),
        2: normalizeList(row.actual_level_2_user_ids),
        3: normalizeList(row.actual_level_3_user_ids)
    };

    function runLevel(level, expId, actExists) {
        const list = ids[level];
        const exp = level === 1 ? expected.l1 : level === 2 ? expected.l2 : expected.l3;
        const shouldValidate =
            ctx.commissionMathScope &&
            (level === 1
                ? ctx.expectedLevels.expected_l1_exists
                : level === 2
                  ? ctx.expectedLevels.expected_l2_exists
                  : ctx.expectedLevels.expected_l3_exists);

        // Validate unexpected commissions even when that level was not expected (spec §6).
        const validateBecauseActual = actExists && !shouldValidate;
        if (!shouldValidate && !validateBecauseActual) {
            if (level === 2 && !ctx.expectedLevels.expected_l2_exists) {
                ignoredFalsePositives.push(`RECIPIENT_L${level}_SKIPPED_NOT_EXPECTED`);
            }
            if (level === 3 && !ctx.expectedLevels.expected_l3_exists) {
                ignoredFalsePositives.push(`RECIPIENT_L${level}_SKIPPED_NOT_EXPECTED`);
            }
            return;
        }

        if (!exp && list.length === 0 && !actExists) return;

        if (!exp && (list.length > 0 || actExists)) {
            actionable.push(`UNEXPECTED_RECIPIENT_L${level}`);
            return;
        }

        if (exp && !actExists) {
            actionable.push(`MISSING_RECIPIENT_L${level}`);
            return;
        }

        if (exp && list.length === 0 && actExists) {
            actionable.push(`MISSING_RECIPIENT_L${level}`);
            return;
        }

        if (list.length > 1) {
            actionable.push(`MULTIPLE_RECIPIENTS_L${level}`);
        }

        if (exp && list.length && !list.includes(exp)) {
            actionable.push(`WRONG_RECIPIENT_L${level}`);
        }
    }

    runLevel(1, expected.l1, actual.l1);
    runLevel(2, expected.l2, actual.l2);
    runLevel(3, expected.l3, actual.l3);
}

function validateAmounts(row, expected, ctx) {
    const { actionable, rounding } = ctx;
    if (!ctx.commissionMathScope) {
        ctx.applicability.amounts = 'NOT_APPLICABLE';
        return;
    }
    ctx.applicability.amounts = 'APPLIES';

    const { exp1, exp2, exp3, expectedTotal } = expected;
    const a1 = round(toNum(row.level_1_commission_amount));
    const a2 = round(toNum(row.level_2_commission_amount));
    const a3 = round(toNum(row.level_3_commission_amount));

    function checkLevel(level, exp, act, levelExpected) {
        if (!levelExpected) return;
        const diff = round(act - exp);
        const ad = Math.abs(diff);
        if (ad <= AMOUNT_TOLERANCE_MXN) {
            if (ad > 0) rounding.push(`ROUNDING_TOLERANCE_L${level}`);
            return;
        }
        if (isMinusTenPercentPattern(exp, act)) {
            actionable.push('KNOWN_PATTERN_MINUS_10_PERCENT');
        }
        actionable.push(`AMOUNT_MISMATCH_L${level}`);
    }

    checkLevel(1, exp1, a1, ctx.expectedLevels.expected_l1_exists);
    checkLevel(2, exp2, a2, ctx.expectedLevels.expected_l2_exists);
    checkLevel(3, exp3, a3, ctx.expectedLevels.expected_l3_exists);

    const actualTotal = round(
        a1 +
            (ctx.expectedLevels.expected_l2_exists ? a2 : 0) +
            (ctx.expectedLevels.expected_l3_exists ? a3 : 0)
    );
    const td = round(actualTotal - expectedTotal);
    if (Math.abs(td) > AMOUNT_TOLERANCE_MXN) {
        actionable.push('TOTAL_COMMISSION_MISMATCH');
    }
}

function validatePeriods(row, expectedPeriod, ctx) {
    const { actionable } = ctx;
    if (!ctx.commissionMathScope || !expectedPeriod) {
        ctx.applicability.periods = !expectedPeriod ? 'NOT_AVAILABLE' : 'NOT_APPLICABLE';
        return;
    }

    if (!hasDbColumn(row, 'distinct_commission_periods')) {
        ctx.applicability.periods = 'NOT_AVAILABLE';
        ctx.notAvailable.push('PERIODS_DISTINCT_COLUMN');
        return;
    }

    ctx.applicability.periods = 'APPLIES';

    const raw = normalizeScalar(row.distinct_commission_periods);
    if (!raw) {
        if (toNum(row.commission_transaction_count) > 0) {
            actionable.push('PERIOD_MISMATCH');
        }
        return;
    }

    const periods = raw.split('|').map(p => p.trim()).filter(Boolean);
    if (periods.length > 1) {
        actionable.push('MULTIPLE_PERIODS_FOUND');
    }
    for (const p of periods) {
        if (p !== expectedPeriod) {
            actionable.push('PERIOD_MISMATCH');
            break;
        }
    }

    if (hasDbColumn(row, 'expected_period_sql') && normalizeScalar(row.expected_period_sql)) {
        const sqlP = normalizeScalar(row.expected_period_sql);
        if (sqlP && sqlP !== expectedPeriod) {
            // SQL vs JS mismatch: surface for ops (timezone / cutoff); not always actionable
            ctx.warnings.push(`EXPECTED_PERIOD_JS_${expectedPeriod}_VS_SQL_${sqlP}`);
        }
    }
}

function validateHeaderCreatedAtVsPeriod(row, ctx) {
    if (!ctx.commissionMathScope) {
        ctx.applicability.header_created_vs_period = 'NOT_APPLICABLE';
        return;
    }
    for (let n = 1; n <= 3; n++) {
        if (!hasDbColumn(row, `level_${n}_commission_header_created_at`)) {
            ctx.applicability.header_created_vs_period = 'NOT_AVAILABLE';
            ctx.notAvailable.push('HEADER_CREATED_AT_COLUMNS');
            return;
        }
    }
    const levels = [
        { n: 1, period: row.level_1_commission_periods, created: row.level_1_commission_header_created_at },
        { n: 2, period: row.level_2_commission_periods, created: row.level_2_commission_header_created_at },
        { n: 3, period: row.level_3_commission_periods, created: row.level_3_commission_header_created_at }
    ];
    let anyChecked = false;
    for (const { period, created } of levels) {
        const p = normalizeScalar(period);
        if (!p || created == null) continue;
        anyChecked = true;
        const ok = isCreatedAtConsistentWithHeaderPeriod(created, p);
        if (ok === false) {
            ctx.actionable.push('COMMISSION_CREATED_AT_PERIOD_INCONSISTENT');
            break;
        }
    }
    ctx.applicability.header_created_vs_period = anyChecked ? 'APPLIES' : 'NOT_APPLICABLE';
}

function validateTargetCommissionHeaders(row, expectedPeriod, ctx) {
    if (!ctx.commissionMathScope || !expectedPeriod) {
        ctx.applicability.target_headers = 'NOT_APPLICABLE';
        return;
    }
    const keys = [
        'target_commission_header_found_l1',
        'target_commission_header_found_l2',
        'target_commission_header_found_l3'
    ];
    if (!keys.every(k => hasDbColumn(row, k))) {
        ctx.applicability.target_headers = 'NOT_AVAILABLE';
        ctx.notAvailable.push('TARGET_HEADER_COLUMNS');
        return;
    }
    ctx.applicability.target_headers = 'APPLIES';

    const { actionable } = ctx;
    if (ctx.expectedLevels.expected_l1_exists && !toNum(row.target_commission_header_found_l1)) {
        actionable.push('MISSING_TARGET_COMMISSION_HEADER_L1');
    }
    if (ctx.expectedLevels.expected_l2_exists && !toNum(row.target_commission_header_found_l2)) {
        actionable.push('MISSING_TARGET_COMMISSION_HEADER_L2');
    }
    if (ctx.expectedLevels.expected_l3_exists && !toNum(row.target_commission_header_found_l3)) {
        actionable.push('MISSING_TARGET_COMMISSION_HEADER_L3');
    }
}

function validateDuplicates(row, ctx) {
    const { actionable } = ctx;
    if (toNum(row.consumption_duplicate_row_count) > 0) {
        actionable.push('CONSUMPTION_DUPLICATES');
    }
    if (toNum(row.level_1_transaction_row_count) > 1) actionable.push('DUPLICATE_LEVEL_1');
    if (toNum(row.level_2_transaction_row_count) > 1) actionable.push('DUPLICATE_LEVEL_2');
    if (toNum(row.level_3_transaction_row_count) > 1) actionable.push('DUPLICATE_LEVEL_3');
}

function validateConsumptions(row, ctx) {
    const { actionable } = ctx;
    if (toNum(row.consumption_lines_wrong_user_count) > 0) {
        if (hasDbColumn(row, 'consumption_lines_wrong_user_count')) {
            actionable.push('INVALID_CONSUMPTION_USER');
        }
    }
    // Spec §8: do not flag consumption_total_sum != order_total alone (removed).
}

function classifyOrder(row, config = {}) {
    const isCancelled =
        String(row.delivery_status || '')
            .toLowerCase()
            .includes('cancel');

    if (isCancelled) {
        return buildOutputRow(row, {
            status_group: 'EXCLUDED',
            actionable: [],
            rounding: [],
            applicability: { note: 'EXCLUDED_CANCELLED' },
            ignoredFalsePositives: [],
            notAvailable: [],
            warnings: [],
            expectedPeriod: null,
            amounts: null,
            expectedLevels: null,
            actual: null
        });
    }

    const isPaid = isPaidOrder(row.delivery_status);
    const hasConsumptions = toNum(row.consumption_total_sum) > 0;
    const baseDate = resolvePeriodBaseDate(row, config);
    const expectedPeriod = calculateExpectedPeriod(baseDate, config);
    const expectedLevels = calculateExpectedLevels(row);
    const expectedRecipients = calculateExpectedRecipients(row);
    const amounts = calculateExpectedAmounts(row, expectedLevels);

    const actual = {
        l1: actualLevelExists(
            row.level_1_commission_amount,
            row.level_1_transaction_row_count,
            row.actual_level_1_user_ids,
            row.level_1_commission_user
        ),
        l2: actualLevelExists(
            row.level_2_commission_amount,
            row.level_2_transaction_row_count,
            row.actual_level_2_user_ids,
            row.level_2_commission_user
        ),
        l3: actualLevelExists(
            row.level_3_commission_amount,
            row.level_3_transaction_row_count,
            row.actual_level_3_user_ids,
            row.level_3_commission_user
        )
    };

    const commissionMathScope = isPaid && hasConsumptions;

    const ctx = {
        isPaid,
        isCancelled,
        commissionMathScope,
        expectedLevels,
        actual,
        actionable: [],
        rounding: [],
        applicability: {},
        ignoredFalsePositives: [],
        notAvailable: [],
        warnings: []
    };

    validateOrderStateVsMovements(row, ctx);
    validateLevelExistence(row, expectedRecipients, ctx);
    validateConsumptions(row, ctx);
    validateDuplicates(row, ctx);
    validatePeriods(row, expectedPeriod, ctx);
    validateHeaderCreatedAtVsPeriod(row, ctx);
    validateTargetCommissionHeaders(row, expectedPeriod, ctx);
    validateAmounts(row, amounts, ctx);
    validateRecipientExistence(row, expectedRecipients, ctx);

    const actionableUnique = [...new Set(ctx.actionable)];
    const roundingUnique = [...new Set(ctx.rounding)];

    let status = 'OK';
    if (actionableUnique.length) {
        status = 'ACTIONABLE_ERROR';
    } else if (roundingUnique.length) {
        status = 'ROUNDING_ONLY';
    }

    return buildOutputRow(row, {
        status_group: status,
        actionable: actionableUnique,
        rounding: roundingUnique,
        applicability: ctx.applicability,
        ignoredFalsePositives: ctx.ignoredFalsePositives,
        notAvailable: ctx.notAvailable,
        warnings: ctx.warnings,
        expectedPeriod,
        amounts,
        expectedLevels,
        actual
    });
}

function buildOutputRow(row, payload) {
    const {
        status_group,
        actionable: actionableList,
        rounding,
        applicability,
        ignoredFalsePositives,
        notAvailable,
        warnings,
        expectedPeriod,
        amounts,
        expectedLevels,
        actual
    } = payload;
    const actionable = actionableList || [];

    const missingLevelsReal = [];
    const unexpectedLevelsReal = [];
    if (expectedLevels && actual) {
        if (expectedLevels.expected_l1_exists && !actual.l1) missingLevelsReal.push('L1');
        if (expectedLevels.expected_l2_exists && !actual.l2) missingLevelsReal.push('L2');
        if (expectedLevels.expected_l3_exists && !actual.l3) missingLevelsReal.push('L3');
        if (!expectedLevels.expected_l2_exists && actual.l2) unexpectedLevelsReal.push('L2');
        if (!expectedLevels.expected_l3_exists && actual.l3) unexpectedLevelsReal.push('L3');
    }

    const nonApplicableLevels = [];
    if (expectedLevels) {
        if (!expectedLevels.expected_l2_exists) nonApplicableLevels.push('L2');
        if (!expectedLevels.expected_l3_exists) nonApplicableLevels.push('L3');
    }

    const error_type =
        status_group === 'EXCLUDED'
            ? 'EXCLUDED'
            : actionable.length
              ? actionable.join(' | ')
              : status_group === 'ROUNDING_ONLY'
                ? 'ROUNDING_ONLY'
                : 'OK';

    const a1 = amounts ? round(toNum(row.level_1_commission_amount)) : 0;
    const a2 = amounts ? round(toNum(row.level_2_commission_amount)) : 0;
    const a3 = amounts ? round(toNum(row.level_3_commission_amount)) : 0;

    const expectedTotal = amounts ? amounts.expectedTotal : 0;
    const actualTotal = amounts
        ? round(
              a1 +
                  (expectedLevels.expected_l2_exists ? a2 : 0) +
                  (expectedLevels.expected_l3_exists ? a3 : 0)
          )
        : 0;

    return {
        ...row,
        is_paid_order: isPaidOrder(row.delivery_status),
        net_total: amounts ? amounts.net : 0,
        expected_l1: amounts ? amounts.exp1 : 0,
        expected_l2: amounts ? amounts.exp2 : 0,
        expected_l3: amounts ? amounts.exp3 : 0,
        actual_l1: a1,
        actual_l2: a2,
        actual_l3: a3,
        diff_l1: amounts ? round(a1 - amounts.exp1) : 0,
        diff_l2: amounts ? round(a2 - amounts.exp2) : 0,
        diff_l3: amounts ? round(a3 - amounts.exp3) : 0,
        checked_expected_total: expectedTotal,
        checked_actual_total: actualTotal,
        checked_total_diff: round(actualTotal - expectedTotal),
        expected_l1_exists: expectedLevels ? expectedLevels.expected_l1_exists : false,
        expected_l2_exists: expectedLevels ? expectedLevels.expected_l2_exists : false,
        expected_l3_exists: expectedLevels ? expectedLevels.expected_l3_exists : false,
        actual_l1_exists: actual ? actual.l1 : false,
        actual_l2_exists: actual ? actual.l2 : false,
        actual_l3_exists: actual ? actual.l3 : false,
        missing_levels_real:
            !expectedLevels || !actual ? 'NOT_APPLICABLE' : missingLevelsReal.join(', ') || 'NONE',
        unexpected_levels_real:
            !expectedLevels || !actual ? 'NOT_APPLICABLE' : unexpectedLevelsReal.join(', ') || 'NONE',
        non_applicable_levels: !expectedLevels
            ? 'NOT_APPLICABLE'
            : nonApplicableLevels.join(', ') || 'NONE',
        false_positive_ignored_flags: ignoredFalsePositives.join(' | ') || 'NONE',
        expected_period: expectedPeriod || '',
        actual_periods_found: normalizeScalar(row.distinct_commission_periods) || '',
        target_commission_header_found_l1: hasDbColumn(row, 'target_commission_header_found_l1')
            ? toNum(row.target_commission_header_found_l1)
            : 'NOT_AVAILABLE',
        target_commission_header_found_l2: hasDbColumn(row, 'target_commission_header_found_l2')
            ? toNum(row.target_commission_header_found_l2)
            : 'NOT_AVAILABLE',
        target_commission_header_found_l3: hasDbColumn(row, 'target_commission_header_found_l3')
            ? toNum(row.target_commission_header_found_l3)
            : 'NOT_AVAILABLE',
        missing_target_commission_header_l1: actionable.includes('MISSING_TARGET_COMMISSION_HEADER_L1')
            ? 1
            : 0,
        missing_target_commission_header_l2: actionable.includes('MISSING_TARGET_COMMISSION_HEADER_L2')
            ? 1
            : 0,
        missing_target_commission_header_l3: actionable.includes('MISSING_TARGET_COMMISSION_HEADER_L3')
            ? 1
            : 0,
        validation_applicability_json: JSON.stringify(applicability || {}),
        validation_not_available: (notAvailable || []).join(' | ') || 'NONE',
        validation_warnings: (warnings || []).join(' | ') || 'NONE',
        rounding_detail: rounding.join(' | ') || '',
        status_group,
        error_type
    };
}

function writeCsv(rows, filePath) {
    if (!rows.length) {
        fs.writeFileSync(filePath, 'sin_errores\n', 'utf8');
        return;
    }
    const keys = [...new Set(rows.flatMap(r => Object.keys(r)))];
    const lines = [keys.join(',')];
    for (const row of rows) {
        lines.push(
            keys
                .map(k => {
                    const v = row[k] == null ? '' : String(row[k]);
                    if (/[",\n]/.test(v)) return `"${v.replace(/"/g, '""')}"`;
                    return v;
                })
                .join(',')
        );
    }
    fs.writeFileSync(filePath, lines.join('\n'), 'utf8');
}

function buildMessage(summary, errors) {
    const top = errors
        .slice()
        .sort((a, b) => Math.abs(b.checked_total_diff || 0) - Math.abs(a.checked_total_diff || 0))
        .slice(0, 10);
    const lines = [];
    lines.push('Auditoría de comisiones (commission-audit-spec.md)');
    lines.push('');
    lines.push(`Órdenes analizadas: ${summary.total}`);
    lines.push(`OK: ${summary.ok}`);
    lines.push(`Solo redondeo: ${summary.roundingOnly}`);
    lines.push(`Errores accionables: ${summary.errors}`);
    lines.push(`Excluidas: ${summary.excluded}`);
    lines.push(`Tolerancia montos: ±${AMOUNT_TOLERANCE_MXN} MXN`);
    lines.push('');
    if (!top.length) lines.push('No se detectaron errores accionables.');
    else {
        lines.push('Top errores:');
        for (const e of top) {
            lines.push(
                `- folio=${e.folio || '(sin folio)'} order_id=${e.order_id} buyer=${e.buyer_display || ''} error=${e.error_type} diff_total=${e.checked_total_diff}`
            );
        }
    }
    return lines.join('\n');
}

async function loadExcel(file) {
    const wb = new ExcelJS.Workbook();
    await wb.xlsx.readFile(file);
    const sheet = wb.worksheets[0];
    if (!sheet) throw new Error('El Excel no tiene hojas.');
    const headers = sheet.getRow(1).values.slice(1);
    const rows = [];
    sheet.eachRow((r, i) => {
        if (i === 1) return;
        const obj = {};
        r.values.slice(1).forEach((v, idx) => {
            if (v && typeof v === 'object' && 'text' in v) v = v.text;
            if (v && typeof v === 'object' && 'result' in v) v = v.result;
            obj[headers[idx]] = v;
        });
        rows.push(obj);
    });
    return rows;
}

function readQueryFile(name) {
    const p = path.join(__dirname, name);
    if (!fs.existsSync(p)) {
        throw new Error(`No se encontró ${name} en ${__dirname}`);
    }
    return fs.readFileSync(p, 'utf8').trim();
}

function buildAuditQuery() {
    return readQueryFile('query_auditoria_comisiones.sql');
}

function buildMovementsDetailQuery() {
    return readQueryFile('query_movimientos_detalle.sql');
}

function mysqlSslOption() {
    const host = process.env.DB_HOST || '';
    const isLocal = !host || host === 'localhost' || host === '127.0.0.1';
    const disable = ['0', 'false', 'no'].includes(String(process.env.DB_SSL || '').toLowerCase());
    if (isLocal || disable) return undefined;
    return { minVersion: 'TLSv1.2', rejectUnauthorized: false };
}

async function loadFromDB(startTs, endTs, queryFile) {
    if (!mysql) throw new Error('Falta dependencia mysql2. Instala: npm i mysql2');
    const host = process.env.DB_HOST;
    const port = Number(process.env.DB_PORT || 3306);
    const user = process.env.DB_USER;
    const password = process.env.DB_PASSWORD;
    const database = process.env.DB_NAME;
    if (!host || !user || !database) {
        throw new Error('Faltan variables DB_HOST, DB_USER, DB_NAME y probablemente DB_PASSWORD');
    }
    const query = queryFile ? fs.readFileSync(path.resolve(queryFile), 'utf8') : buildAuditQuery();
    const ssl = mysqlSslOption();
    const conn = await mysql.createConnection({
        host,
        port,
        user,
        password,
        database,
        charset: 'utf8mb4',
        ...(ssl ? { ssl } : {})
    });
    try {
        const [rows] = await conn.execute(query, [startTs, endTs]);
        return rows;
    } finally {
        await conn.end();
    }
}

async function loadMovementsFromDB(startTs, endTs) {
    if (!mysql) return [];
    const host = process.env.DB_HOST;
    const port = Number(process.env.DB_PORT || 3306);
    const user = process.env.DB_USER;
    const password = process.env.DB_PASSWORD;
    const database = process.env.DB_NAME;
    if (!host || !user || !database) return [];
    const ssl = mysqlSslOption();
    const conn = await mysql.createConnection({
        host,
        port,
        user,
        password,
        database,
        charset: 'utf8mb4',
        ...(ssl ? { ssl } : {})
    });
    try {
        const [rows] = await conn.execute(buildMovementsDetailQuery(), [startTs, endTs]);
        return rows;
    } finally {
        await conn.end();
    }
}

function sheetFromObjects(wb, name, rows) {
    const ws = wb.addWorksheet(name);
    if (!rows.length) {
        ws.addRow(['(sin filas)']);
        return;
    }
    const keys = [...new Set(rows.flatMap(r => Object.keys(r)))];
    ws.addRow(keys);
    for (const r of rows) {
        ws.addRow(keys.map(k => r[k]));
    }
    ws.getRow(1).font = { bold: true };
}

const AUDIT_SHEET_COLUMNS = [
    'folio',
    'order_id',
    'order_created_at',
    'delivery_status',
    'is_paid_order',
    'order_type',
    'buyer_display',
    'consumption_total_sum',
    'order_total',
    'commission_transaction_count',
    'expected_period',
    'actual_periods_found',
    'expected_l1_exists',
    'expected_l2_exists',
    'expected_l3_exists',
    'actual_l1_exists',
    'actual_l2_exists',
    'actual_l3_exists',
    'missing_levels_real',
    'unexpected_levels_real',
    'non_applicable_levels',
    'false_positive_ignored_flags',
    'target_commission_header_found_l1',
    'target_commission_header_found_l2',
    'target_commission_header_found_l3',
    'missing_target_commission_header_l1',
    'missing_target_commission_header_l2',
    'missing_target_commission_header_l3',
    'validation_applicability_json',
    'validation_not_available',
    'validation_warnings',
    'rounding_detail',
    'status_group',
    'error_type',
    'checked_total_diff',
    'expected_l1',
    'expected_l2',
    'expected_l3',
    'actual_l1',
    'actual_l2',
    'actual_l3',
    'consumptions_summary',
    'commissions_summary',
    'consumption_duplicate_keys',
    'expected_level_1_user_display',
    'expected_level_2_user_display',
    'expected_level_3_user_display',
    'level_1_commission_user',
    'level_2_commission_user',
    'level_3_commission_user'
];

async function writeExcelWorkbook(outPath, summary, result, errors, roundingOnly, excluded, movements) {
    const wb = new ExcelJS.Workbook();
    wb.creator = 'commission-audit';
    const resumenRows = [
        { metric: 'spec', value: 'commission-audit-spec.md' },
        { metric: 'total_orders', value: summary.total },
        { metric: 'ok', value: summary.ok },
        { metric: 'rounding_only', value: summary.roundingOnly },
        { metric: 'actionable_errors', value: summary.errors },
        { metric: 'excluded', value: summary.excluded },
        { metric: 'amount_tolerance_mxn', value: AMOUNT_TOLERANCE_MXN },
        { metric: 'paid_rule', value: 'delivery_status in (Preparando, En camino, Entregado)' },
        { metric: 'generated_at', value: new Date().toISOString() }
    ];
    sheetFromObjects(wb, 'Resumen', resumenRows);
    const auditRows = result.map(r => {
        const o = {};
        for (const c of AUDIT_SHEET_COLUMNS) o[c] = r[c];
        return o;
    });
    sheetFromObjects(wb, 'Auditoria_por_orden', auditRows);
    sheetFromObjects(wb, 'Movimientos_detalle', movements);
    sheetFromObjects(wb, 'Errores', errors);
    sheetFromObjects(wb, 'Solo_redondeo', roundingOnly);
    sheetFromObjects(wb, 'Excluidas', excluded);
    await wb.xlsx.writeFile(outPath);
}

async function main() {
    try {
        require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
    } catch {
        /* optional */
    }
    try {
        require('dotenv').config();
    } catch {
        /* optional */
    }

    const args = parseArgs(process.argv.slice(2));
    const outDir = args['out-dir'] ? path.resolve(args['out-dir']) : process.cwd();
    const cutoffDay = args['period-cutoff-day'] != null ? Number(args['period-cutoff-day']) : 28;
    const periodBaseField = args['period-base-field'] || 'order_created_at';
    const auditConfig = {
        cutoffDay: Number.isFinite(cutoffDay) ? cutoffDay : 28,
        periodBaseField
    };

    let rows = [];
    let movements = [];

    if (args['input-json']) {
        const raw = fs.readFileSync(path.resolve(args['input-json']), 'utf8');
        rows = JSON.parse(raw);
        if (!Array.isArray(rows)) throw new Error('input-json debe ser un array de órdenes');
    } else if (args.input) {
        rows = await loadExcel(path.resolve(args.input));
    } else if (args['from-db']) {
        if (!args['start-ts'] || !args['end-ts']) {
            throw new Error('Con --from-db debes mandar --start-ts y --end-ts');
        }
        rows = await loadFromDB(args['start-ts'], args['end-ts'], args['query-file']);
        if (!args['skip-movements']) {
            movements = await loadMovementsFromDB(args['start-ts'], args['end-ts']);
        }
    } else {
        console.error(
            'Uso:\n' +
                `  node ${path.basename(__filename)} --input-json=./resultado.json [--out-dir=.]\n` +
                `  node ${path.basename(__filename)} --input=./export.xlsx [--out-dir=.]\n` +
                `  node ${path.basename(__filename)} --from-db --start-ts="..." --end-ts="..." [--query-file=...] [--period-cutoff-day=28] [--period-base-field=order_created_at] [--skip-movements]\n`
        );
        process.exit(1);
    }

    const result = rows.map(r => classifyOrder(r, auditConfig));
    const errors = result.filter(r => r.status_group === 'ACTIONABLE_ERROR');
    const roundingOnly = result.filter(r => r.status_group === 'ROUNDING_ONLY');
    const excluded = result.filter(r => r.status_group === 'EXCLUDED');
    const ok = result.filter(r => r.status_group === 'OK');

    const summary = {
        total: result.length,
        ok: ok.length,
        roundingOnly: roundingOnly.length,
        errors: errors.length,
        excluded: excluded.length
    };

    if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

    const resultadoPath = path.join(outDir, 'resultado.json');
    const erroresJsonPath = path.join(outDir, 'errores.json');
    const erroresCsvPath = path.join(outDir, 'errores.csv');
    const mensajePath = path.join(outDir, 'mensaje.txt');

    fs.writeFileSync(resultadoPath, JSON.stringify(result, null, 2), 'utf8');
    fs.writeFileSync(erroresJsonPath, JSON.stringify(errors, null, 2), 'utf8');
    writeCsv(errors, erroresCsvPath);
    fs.writeFileSync(mensajePath, buildMessage(summary, errors), 'utf8');

    const xlsxName = args['output-xlsx'] || 'auditoria_comisiones.xlsx';
    const xlsxPath = path.join(outDir, xlsxName);
    await writeExcelWorkbook(xlsxPath, summary, result, errors, roundingOnly, excluded, movements);

    console.log(JSON.stringify({ ...summary, outDir, xlsx: xlsxPath }, null, 2));

    if (errors.length > 0) process.exit(2);
}

module.exports = {
    classifyOrder,
    isPaidOrder,
    resolvePeriodBaseDate,
    calculateExpectedPeriod,
    calculateExpectedNetwork,
    calculateExpectedLevels,
    calculateExpectedAmounts,
    calculateExpectedRecipients,
    validateOrderStateVsMovements,
    validateLevelExistence,
    validateRecipientExistence,
    validateRecipients,
    validateAmounts,
    validatePeriods,
    validateHeaderCreatedAtVsPeriod,
    validateTargetCommissionHeaders,
    validateDuplicates,
    validateConsumptions,
    AMOUNT_TOLERANCE_MXN
};

if (require.main === module) {
    main().catch(err => {
        console.error(err.stack || err.message || err);
        process.exit(1);
    });
}
