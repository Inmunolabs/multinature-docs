# Backlog de mejoras: órdenes, consumos y comisiones

Tareas sugeridas para el flujo descrito en [orders_commissions_and_consumption.md](./orders_commissions_and_consumption.md). Prioriza según riesgo de negocio y esfuerzo en tu equipo.

---

## P0 — Consistencia e idempotencia

1. **Unidad transaccional consumos + comisiones (o compensación explícita).**  
   Hoy `safeProccessConsumptionsAndCommissions` ejecuta ambos en paralelo: uno puede fallar y el otro no. Definir si el negocio exige todo-o-nada, o colas de reintento con estado de orden.

2. **Idempotencia por `order_id`.**  
   Evitar dobles `users_consumption` y dobles `commission_transactions` ante webhooks duplicados: clave única lógica (ej. `order_id` + `product_id` en consumo) o tabla de “procesamiento completado” por orden.

3. **Alinear admin con el flujo estándar.**  
   `processCommissionsIfMissing` evita duplicar comisiones pero no protege consumos duplicados si el admin repite acciones. Misma estrategia de idempotencia que en el punto 2.

---

## P1 — Robustez de reglas y datos

4. **Validar porcentajes por nivel.**  
   Si `getNetworkChain` devuelve un `level` sin entrada en el JSON de constantes, fallar de forma clara o usar 0 documentado; nunca persistir `NaN`.

5. **Renombrar o completar `updateUserConsumptionsAndValidStatus`.**  
   El nombre implica actualización de “estado válido” del usuario; el cuerpo solo inserta consumos. Implementar la lógica faltante o renombrar para evitar confusiones.

6. **Revisar `getCurrentPeriod` / zonas horarias.**  
   Mezcla de `getUTCDate` con `getFullYear`/`getMonth` locales puede desplazar el `period` en bordes de día. Unificar criterio (todo UTC o todo local de negocio) y documentar.

7. **Documentar el DDL del SP en `docs/04_SQL/tables`.**  
   Añadir sección “Procedimientos” o enlazar la migración desde [commission_transactions](../tables/commission_transactions.md) / [commissions](../tables/commissions.md) para que la doc coincida con la verdad en BD.

---

## P2 — Observabilidad y operación

8. **Métricas y logs estructurados.**  
   Contadores: comisiones generadas por orden, reintentos por deadlock, fallos solo-consumo vs solo-comisión; correlación con `awsRequestId` ya presente en correos de error.

9. **Tarea programada o script para `commissions` huérfanas.**  
   Tras cancelaciones o borrados parciales, encabezados sin transacciones pueden quedar; el doc de limpieza [09_…](../queries/09_delete_orders_by_folio_and_commission_cleanup.md) ya lo menciona — automatizar o alertar.

10. **Estado por línea en `commission_transactions` (opcional).**  
    Si el negocio requiere ciclo de vida distinto al encabezado, valorar columna `status` en transacciones; hoy el SP solo setea `status` al crear el encabezado nuevo.

---

## P3 — Tests y calidad

11. **Tests de integración contra MySQL (o contenedor)** que ejecuten `InsertCommissionTransaction` con dos órdenes mismo periodo y mismo acreedor y verifiquen un solo `commission_id`.

12. **Tests unitarios** para mapeo de porcentajes, periodo con `cutoffDay`, y matriz de “orden completada” por `type` de pago.

13. **Contrato de `order.products`**  
    Validar forma del JSON al crear consumos (campos obligatorios, tipos) para fallar antes del INSERT.

---

## P4 — Producto y UX

14. **Mensajes de error al usuario vs soporte.**  
    Revisar plantillas ya usadas en `safeProccessConsumptionsAndCommissions` y asegurar que el usuario reciba acción concreta cuando solo falló un brazo del proceso.

15. **Dashboard / reportes**  
    Alinear definición de “consumo de red” en queries tipo `getNetworkConsumeCommission` con la regla oficial de estados de orden excluidos (cancelado / confirmando pago, etc.) y documentar cualquier discrepancia con el flujo de comisiones.

---

## Cómo usar esta lista

- Marcar cada ítem con responsable y estimación en tu herramienta de proyecto.
- Tras implementar un ítem, actualizar [orders_commissions_and_consumption.md](./orders_commissions_and_consumption.md) y los casos en [orders_commissions_and_consumption_test_cases.md](./orders_commissions_and_consumption_test_cases.md).

---

- **Última actualización:** 2026-04-08
