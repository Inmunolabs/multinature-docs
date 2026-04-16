# PATCH /orders/:id

## Descripción funcional

Actualiza el **estatus de entrega** de una orden y, según el caso, datos de **envío** (`shipment`) o **fecha de entrega** (`deliveryDate`). Puede disparar notificaciones por email y push cuando cambia el estatus.

**Reglas de negocio completas (transiciones, perfiles, contraseña, pipeline):**  
[docs/00_Overview/Business_Rules/orders/patch-order-status.md](../../../../00_Overview/Business_Rules/orders/patch-order-status.md)

---

## Autorización

- **Bearer** obligatorio.
- Operación pensada para **Administrador General** o **Administrador de Logística** (ruta y `userOwnResources` con `:id` = id de la **orden**).

---

## Parámetros de ruta

- `id` (UUID, requerido): id de la orden

### Ejemplo

```
PATCH /orders/789e0123-e89b-12d3-a456-426614174000
```

## Query parameters

- `page` (number, opcional): paginación de la respuesta (lista de órdenes del usuario dueño)
- `limit` (number, opcional)

## Body del request

```json
{
  "shipment": {
    "id": "string",
    "company": "DHL | FEDEX | Estafeta",
    "trackingUrl": "https://..."
  },
  "deliveryStatus": "string",
  "deliveryDate": "YYYY-MM-DD o ISO8601"
}
```

- Si no envías `deliveryStatus` pero envías **envío completo** (id, company, trackingUrl), el backend puede inferir **Está en camino** (compatibilidad).

### Header opcional

- `password`: contraseña de operación en claro; **obligatoria** solo cuando el estatus destino es **Preparando el Pedido** y el actor es **Administrador General** (validación contra `ORDERS_ADMIN_PASS`).

---

## Respuesta exitosa (200)

Devuelve la lista paginada de órdenes del **usuario dueño** de la orden actualizada (mismo criterio que otros listados de pedidos).

---

## Códigos de estado y errores

| Código | Uso típico |
| ------ | ---------- |
| 200 | OK (mensaje de negocio puede usar el patrón existente de la API) |
| 400 | Body inválido (express-validator o reglas de negocio) |
| 401 | Contraseña de operación faltante o incorrecta (Preparando + admin) |
| 403 | Perfil no autorizado o transición no permitida (p. ej. logística) |
| 404 | Orden no encontrada |
| 500 | Error de servidor |

---

## Consideraciones técnicas (resumen)

- **Middlewares (orden):** `authorize` → `idPathParam` → `preserveCallerProfile` → `userOwnResources` → `loadOrderForPatch` → `patchOrderUpdate` → `applyOrderPatchBusinessRules` → handler `update`.
- **BD:** `OrdersQueries.update`; la orden se carga una vez en `loadOrderForPatch` (`req.patchOrder`).
- **Negocio:** `orderPatchBusinessRules.js` (transiciones logística vs admin, payload por destino).

---

## Referencias

- [Reglas de negocio PATCH (canónico)](../../../../00_Overview/Business_Rules/orders/patch-order-status.md)
- [Índice Endpoints orders-api](./README.md)

---

- **Última actualización:** 2026-04-15
