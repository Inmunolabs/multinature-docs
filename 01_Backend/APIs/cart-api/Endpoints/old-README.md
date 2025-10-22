# API de Cart

Esta documentación cubre todos los endpoints relacionados con la gestión del carrito de compras y recomendaciones de productos.

## Índice de Endpoints

### Carrito de Compras
- [GET /cart/:id - Obtener carrito de un usuario](./get.md)
- [PATCH /cart/:id - Actualizar carrito](./update.md)

### Recomendaciones
- [GET /recommendations/user/:id - Listar recomendaciones activas de un usuario](recommendations/recommendations-list.md)
- [GET /recommendations/patient/:id - Obtener recomendaciones de un paciente](recommendations/recommendations-get-patient.md)
- [PATCH /recommendations/:id - Crear/actualizar recomendación](recommendations/recommendations-upsert.md)

### Sistema
- [GET / - Healthcheck](./healthcheck.md)

---

