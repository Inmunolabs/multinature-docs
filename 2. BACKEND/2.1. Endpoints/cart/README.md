# API de Cart

Esta documentación cubre todos los endpoints relacionados con la gestión del carrito de compras.

## Índice de Endpoints

- [GET /cart/:id - Obtener carrito de un usuario](./cart-get.md)
- [POST /cart/:id - Crear carrito](./cart-create.md)
- [PATCH /cart/:id - Actualizar carrito](./cart-update.md)
- [GET / - Healthcheck](./cart-healthcheck.md)

---

## Reglas importantes y contexto del proyecto

- Cada usuario puede tener un carrito activo.
- El carrito puede contener productos físicos y servicios.
- Los productos en el carrito mantienen su precio al momento de agregarlos.
- El carrito puede tener cupones de descuento aplicados.
- El carrito se puede convertir en una orden de compra.
- Los productos del carrito pueden tener stock limitado.

---

## Consideraciones generales para el frontend

- **Persistencia:** El carrito se mantiene entre sesiones del usuario.
- **Precios:** Mostrar precios actualizados y descuentos aplicados.
- **Stock:** Validar disponibilidad antes de agregar productos.
- **Cupones:** Permitir aplicar y remover cupones de descuento.
- **Cantidades:** Permitir modificar cantidades de productos.
- **Eliminación:** Permitir eliminar productos individuales.
- **Conversión:** Convertir carrito en orden cuando el usuario confirme.
- **Cálculos:** Mostrar subtotal, impuestos, envío y total. 