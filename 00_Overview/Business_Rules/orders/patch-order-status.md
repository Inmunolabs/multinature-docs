# PATCH /orders/:id — reglas de actualización de estatus

**Ámbito:** actualización manual del estatus de entrega (y datos logísticos asociados) vía `PATCH /orders/:id` en **orders-api**.  
**Fuente de verdad en código:** `apis/orders-api/src/services/orderPatchBusinessRules.js`, middleware `loadOrderForPatch`, `applyOrderPatchBusinessRules`, validador `ordersValidations.patchOrderUpdate` en `multi-commons-layer`.

---

## 1. Estatus válidos (texto exacto en BD y API)

Los valores deben coincidir con `STATUS_SP` en `multi-commons-layer` (y columnas `delivery_status` en MySQL):

| Clave interna | Texto almacenado / API |
|---------------|-------------------------|
| confirmingPayment | `Confirmando el Pago` |
| preparingOrder | `Preparando el Pedido` |
| onWay | `Está en camino` |
| delivered | `Entregado` |
| cancelled | `Cancelado` |

---

## 2. Flujo “ideal” de negocio (referencia)

En operación normal, el pedido avanza en este orden:

```mermaid
flowchart LR
  C[Confirmando_el_Pago]
  P[Preparando_el_Pedido]
  O[Esta_en_camino]
  E[Entregado]
  C --> P
  P --> O
  O --> E
```

**Cancelado:** cualquier estatus puede pasar a `Cancelado` según reglas de negocio y permisos (ver abajo).

---

## 3. Quién puede llamar a PATCH /orders/:id

- **Token JWT obligatorio** (`authorize` en `multi-commons-layer`).
- Ruta registrada en permisos; **Administrador General** y **Administrador de Logística** son los perfiles previstos para operar este endpoint (no el usuario final típico).
- **`userOwnResources`:** el `:id` de la ruta es el **id de la orden** (no del usuario). Solo admin o logística pueden actuar sobre órdenes de terceros de esta forma.

---

## 4. Reglas por perfil

### 4.1 Administrador de Logística (`LOGISTICS_ADMIN`)

- Solo puede mover el pedido en dos transiciones, **según el estatus actual en base de datos**:
  - De **Preparando el Pedido** → **Está en camino**
  - De **Está en camino** → **Entregado**
- No puede saltar pasos (p. ej. de Preparando a Entregado sin pasar por En camino).
- No aplica matriz “libre” para otros destinos (p. ej. cancelar o confirmar pago) por este endpoint con este perfil.

**Error típico:** `403` con mensaje de transición no permitida para logística (`ORDER_PATCH_LOGISTICS_TRANSITION_FORBIDDEN`).

### 4.2 Administrador General (`ADMIN`)

- **No** está sujeto a la matriz estricta logística: puede establecer cualquier estatus válido para **correcciones operativas** (saltos o retrocesos), siempre que:
  - el **payload** cumpla las reglas del **estatus destino** (envío, fecha, etc.), y
  - para pasar a **Preparando el Pedido** se envíe la **contraseña de operación** en el header `password` y coincida con `ORDERS_ADMIN_PASS` (bcrypt en servidor).

### 4.3 Cancelado

- Poner el pedido en **Cancelado** desde PATCH con las reglas anteriores corresponde al **admin** en el modelo documentado; la **cancelación con reembolso** del flujo de usuario es otro endpoint: `PATCH /orders/cancel/:id` (ver documentación de ese endpoint).

---

## 5. Reglas de payload por estatus destino

| Estatus destino | Obligatorio / notas |
|-----------------|---------------------|
| **Está en camino** | `shipment.id`, `shipment.company` (DHL \| FEDEX \| Estafeta), `shipment.trackingUrl` (URL HTTP/S válida). La fecha de entrega no es obligatoria en este paso. |
| **Entregado** | `deliveryDate` (fecha válida, p. ej. ISO). No se exigen campos de envío para marcar entregado. |
| **Preparando el Pedido** (solo admin) | Header `password` con contraseña de operación válida. |
| Otros (confirmando, cancelado, etc.) | No se exigen campos logísticos ni fecha; el sistema **no borra** datos históricos de envío/fecha salvo que se actualicen explícitamente según lógica actual del servicio. |

**Compatibilidad:** si no se envía `deliveryStatus` pero el body trae un **envío completo** (id, company, trackingUrl), el backend puede inferir destino **Está en camino** (comportamiento legado).

---

## 6. Validación en capas (orden real del request)

1. **`authorize`** — JWT y ruta permitida.
2. **`idPathParam`** — UUID en `:id`.
3. **`preserveCallerProfile`** — guarda el perfil del token en `req.callerProfile` (antes de que otros middlewares alteren `req.requestUser`).
4. **`userOwnResources`** — acceso admin/logística a la orden por id.
5. **`loadOrderForPatch`** — carga la orden; **404** si no existe; `req.patchOrder`.
6. **`patchOrderUpdate`** (express-validator) — validación de forma del body (URLs, fechas condicionales, etc.).
7. **`applyOrderPatchBusinessRules`** — reglas de negocio (transiciones, contraseña, payload por destino).
8. **`update`** (servicio) — persistencia, notificaciones, comisiones si aplica (p. ej. admin confirma pago → preparando).

---

## 7. Variables de entorno relevantes

- **`ORDERS_ADMIN_PASS`:** hash bcrypt de la contraseña de operación; solo se usa cuando el destino es **Preparando el Pedido** y el actor es admin.

---

## 8. Realidad del flujo y posible refactor

**Qué hay hoy**

- La lógica está repartida entre: permisos de ruta (`authorize`), **ownership** especial para órdenes (`userOwnResources`), **carga de orden**, **express-validator**, **reglas de negocio** y **servicio** (notificaciones, comisiones). Es **correcto en capas**, pero **difícil de seguir** para quien no recorrió el código: hay que leer varios archivos para ver un solo PATCH.
- `userOwnResources` con perfil admin tiene un comportamiento especial con `params.id` (orden vs usuario) que puede confundir; el handler de PATCH no depende de `req.requestUser` sustituido para la orden, pero el middleware sigue siendo un punto de fricción conceptual.

**Riesgos**

- Cualquier cambio en el orden de middlewares puede romper `callerProfile` o la carga de orden.
- Duplicación conceptual entre “qué puede el perfil” en `authorize` / rutas y “qué puede hacer en esta transición” en `orderPatchBusinessRules`.

**Refactor razonable (sin obligar a hacerlo ya)**

- Un único **caso de uso** o **servicio de aplicación** `OrderPatchService.patchOrder({ req })` que orqueste: cargar orden → validar → persistir, dejando los middlewares solo para auth y parsing.  
- O una **política explícita** (`OrderPatchPolicy`) con tabla de transiciones y tests de matriz, en lugar de dispersar reglas.

**Cuándo vale la pena:** si el equipo sigue añadiendo reglas (estados intermedios, integraciones 3PL, auditoría). Mientras el cambio sea poco frecuente, documentar (este archivo) + tests en `orderPatchBusinessRules.test.js` suele bastar.

---

## 9. Referencias cruzadas

- **Diagramas (pipeline y estados):** [orders-api Guides — 2.6.2](../../../01_Backend/APIs/orders-api/Guides/2.6.2-patch-order-status-flow.md) — solo figuras; las reglas detalladas siguen siendo este documento.
- Índice de reglas de negocio: [../README.md](../README.md)
- Registro global (legacy, resumen): [../reglas-de-negocio.md](../reglas-de-negocio.md) — sección “Compras y Órdenes” enlaza aquí para detalle de PATCH.
- Endpoint HTTP: [../../../01_Backend/APIs/orders-api/Endpoints/update.md](../../../01_Backend/APIs/orders-api/Endpoints/update.md)

---

- **Última actualización:** 2026-04-15
