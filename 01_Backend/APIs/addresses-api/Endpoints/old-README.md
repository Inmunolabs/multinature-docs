# API de Addresses

Esta documentación cubre todos los endpoints relacionados con la gestión de direcciones de usuarios y especialistas.

## Índice de Endpoints

- [GET /addresses/user/:id - Direcciones de un usuario](./list-by-user.md)
- [GET /addresses/neighborhoods/:zipCode - Listar colonias por código postal](./neighborhoods.md)
- [GET /addresses/:id - Obtener dirección por ID](./get.md)
- [POST /addresses/:id - Crear dirección](./create.md)
- [PATCH /addresses/:id - Actualizar dirección](./update.md)
- [PATCH /addresses/shippingAddress/:id - Actualizar dirección de envío](./shipping-update.md)
- [DELETE /addresses/:id - Eliminar dirección](./delete.md)

---

## Reglas importantes y contexto del proyecto

- Las direcciones pueden ser residenciales o clínicas (isClinic).
- Solo los especialistas pueden tener direcciones marcadas como clínicas.
- Las direcciones de envío se usan para productos físicos.
- Las direcciones de clínicas se usan para citas presenciales.
- Cada usuario puede tener múltiples direcciones.

---

## Consideraciones generales para el frontend

- **Validación:** Las direcciones deben tener campos obligatorios completos.
- **Tipos:** Distinguir entre direcciones residenciales y clínicas.
- **Especialistas:** Solo mostrar opción de clínica para especialistas.
- **Envíos:** Usar direcciones marcadas como shipping para productos.
- **Citas:** Usar direcciones de clínicas para citas presenciales.
- **Formato:** Validar formato de códigos postales y números telefónicos.
- **Geolocalización:** Considerar integración con mapas para validación. 