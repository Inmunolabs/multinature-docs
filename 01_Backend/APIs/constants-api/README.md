# constants-api

Documentación de constants-api.

---

## Secciones

- [Endpoints](./Endpoints/README.md)

---

## Reglas importantes y contexto del proyecto

- Las constantes definen valores importantes del sistema (IVA, costos de envío, etc.).
- Las constantes pueden ser de diferentes tipos (porcentajes, montos, fechas).
- Las constantes afectan cálculos en órdenes, carritos y otros módulos.
- Las constantes se usan para configuraciones del sistema.
- Solo administradores con contraseña especial pueden modificar constantes.
- Las constantes se almacenan en base de datos y se transforman a DTOs.
- Los cambios en constantes afectan inmediatamente todos los cálculos del sistema.

---

## Consideraciones generales para el frontend

- **Cálculos:** Usar constantes para cálculos de precios, impuestos y envíos.
- **Configuración:** Mostrar valores de constantes en configuraciones del sistema.
- **Validaciones:** Validar que los valores de constantes sean razonables.
- **Caché:** Considerar caché de constantes para mejor rendimiento.
- **Actualización:** Las constantes pueden cambiar, validar valores antes de usar.
- **Formato:** Mostrar constantes con formato apropiado (porcentajes, moneda).
- **Seguridad:** Solo administradores pueden modificar constantes del sistema.
- **Impacto:** Los cambios en constantes afectan inmediatamente el sistema.

---

- **Última actualización:** 2025-12-15
- **Total de archivos:** 3
