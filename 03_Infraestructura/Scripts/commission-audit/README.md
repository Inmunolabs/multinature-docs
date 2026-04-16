# Auditoría de comisiones (`commission-audit`)

Herramienta Node.js para auditar órdenes pagadas, consumos (`users_consumption`) y comisiones (`commissions` / `commission_transactions`) según **[commission-audit-spec.md](./commission-audit-spec.md)**.

**Ubicación del script:** `docs/03_Infraestructura/Scripts/commission-audit/auditoria_comisiones_diaria.js`  
**Queries:** `query_auditoria_comisiones.sql`, `query_movimientos_detalle.sql`

---

## Dependencias

Desde `docs/03_Infraestructura/Scripts` (donde está el `package.json` de scripts):

```bash
npm install
```

Requiere al menos: `exceljs`, `mysql2`, `dotenv` (opcional).

---

## Uso

Variables de entorno para modo `--from-db`: `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`. En RDS suele hacer falta TLS; el script activa SSL salvo `DB_SSL=0` o host local.

### 1. Contra MySQL (recomendado)

```bash
# Desde la raíz del workspace backend/
node docs/03_Infraestructura/Scripts/commission-audit/auditoria_comisiones_diaria.js --from-db --start-ts="2026-03-01 00:00:00" --end-ts="2026-04-01 00:00:00" --out-dir=./docs/03_Infraestructura/Scripts/commission-audit/salida_auditoria
```

- Por defecto el Excel se guarda como `auditoria_comisiones_YYYYMMDD_HHmmss.xlsx` (no sobrescribe corridas anteriores).
- Ruta fija: `--output-xlsx=C:\ruta\mi_archivo.xlsx`
- Query alternativa: `--query-file=ruta\query.sql`
- Periodo contable: `--period-cutoff-day=28` (por defecto 28)
- Fecha base del periodo: `--period-base-field=order_created_at`
- Omitir hoja de movimientos: `--skip-movements`

### 2. Desde JSON (reprocesar un `resultado.json`)

```bash
node docs/03_Infraestructura/Scripts/commission-audit/auditoria_comisiones_diaria.js --input-json=./resultado.json --out-dir=./salida
```

### 3. Desde Excel (primera hoja = mismas columnas que exporte la query)

```bash
node docs/03_Infraestructura/Scripts/commission-audit/auditoria_comisiones_diaria.js --input=./export.xlsx --out-dir=./salida
```

---

## Salidas

| Archivo | Descripción |
|--------|-------------|
| `resultado.json` | Todas las órdenes con columnas de auditoría |
| `errores.json` | Solo `ACTIONABLE_ERROR` |
| `mensaje.txt` | Resumen legible |
| Excel (timestamp) | Hojas: Resumen, Auditoria_por_orden, Movimientos_detalle, Errores, Solo_redondeo, Excluidas |

Código de salida: `0` OK, `2` si hay errores accionables, `1` error de ejecución.

---

## Órdenes recurrentes

Una orden es **recurrente** si se cumple **cualquiera** de estas señales en datos reales (ver spec §4):

- `monthly_purchase_id` u `openpay_subscription_id` no vacíos
- `order_type` / `orders.type` = `subscription` (y typo `subcription` en datos antiguos)
- `payment_provider.mode` = `subscription` (objeto JSON o string JSON en export)
- `purchase_type` = `monthly_purchase` **solo si** la columna existe en el origen
- `is_monthly_purchase_row = 1` cuando la query SQL ya consolidó lo anterior

La base de comisión es `(consumption_total_sum / 1.16) * 0.90` en ese caso. El Excel incluye `recurring_detection_signals` y `payment_provider_mode` para trazabilidad.
