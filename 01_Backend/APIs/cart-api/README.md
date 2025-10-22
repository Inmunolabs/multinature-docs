# cart-api

Documentación de cart-api.

---

## Secciones

- [Endpoints](./Endpoints/README.md)

---

## Reglas importantes y contexto del proyecto

- Cada usuario puede tener un carrito activo.
- El carrito puede contener productos físicos y servicios.
- Los productos en el carrito mantienen su precio al momento de agregarlos.
- El carrito puede tener cupones de descuento aplicados.
- El carrito se puede convertir en una orden de compra.
- Los productos del carrito pueden tener stock limitado.
- Los especialistas pueden crear recomendaciones de productos para sus pacientes.
- Las recomendaciones tienen validez de 7 días antes de considerarse inactivas.

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
- **Recomendaciones:** Los especialistas pueden gestionar recomendaciones para sus pacientes.
- **Validación:** Los productos recomendados deben ser compatibles con las especialidades del especialista.

---

- **Última actualización:** 2025-10-22
- **Total de archivos:** 0
