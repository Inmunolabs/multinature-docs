# addresses-api

Documentación de addresses-api.

---

## Secciones

- [Endpoints](./Endpoints/README.md)

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

---

- **Última actualización:** 2025-10-22
- **Total de archivos:** 0
