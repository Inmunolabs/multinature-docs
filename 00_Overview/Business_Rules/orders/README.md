# Pedidos (orders) — reglas de negocio

Documentación de reglas de negocio del dominio **pedidos / órdenes** (tienda). El código vive principalmente en `apis/orders-api` y capas compartidas (`multi-commons-layer`, `multi-mysql-layer`).

---

## Documentos en esta carpeta

| Documento | Contenido |
|-----------|-----------|
| [Actualización de estatus (PATCH /orders/:id)](./patch-order-status.md) | Perfiles, transiciones permitidas, payload, contraseña de operación, pipeline real y notas de refactor |

## Relacionado (otras carpetas de docs)

| Recurso | Enlace |
|---------|--------|
| Flujo SQL pagos → comisiones → consumos | [04_SQL/flows/orders_commissions_and_consumption.md](../../../04_SQL/flows/orders_commissions_and_consumption.md) |
| Endpoint PATCH (contrato HTTP) | [01_Backend/APIs/orders-api/Endpoints/update.md](../../../01_Backend/APIs/orders-api/Endpoints/update.md) |
| Guía técnica patrones de órdenes | [01_Backend/APIs/orders-api/Guides/2.6.1-orders-patterns.md](../../../01_Backend/APIs/orders-api/Guides/2.6.1-orders-patterns.md) |
| Diagramas PATCH estatus (Mermaid) | [2.6.2-patch-order-status-flow.md](../../../01_Backend/APIs/orders-api/Guides/2.6.2-patch-order-status-flow.md) → enlaza a este doc como canónico |

---

- **Última actualización:** 2026-04-15
