# API de Constants

Esta documentación cubre todos los endpoints relacionados con la gestión de constantes del sistema.

## Índice de Endpoints

- [GET /constants - Listar constantes](./constants-list.md)
- [PATCH /constants/:id - Actualizar constante](./constants-update.md)
- [GET / - Healthcheck](./constants-healthcheck.md)

---

## Reglas importantes y contexto del proyecto

- Las constantes definen valores importantes del sistema (IVA, costos de envío, etc.).
- Las constantes pueden ser de diferentes tipos (porcentajes, montos, fechas).
- Las constantes afectan cálculos en órdenes, carritos y otros módulos.
- Las constantes pueden tener diferentes contextos (global, por especialidad).
- Las constantes se usan para configuraciones del sistema.

---

## Consideraciones generales para el frontend

- **Cálculos:** Usar constantes para cálculos de precios, impuestos y envíos.
- **Configuración:** Mostrar valores de constantes en configuraciones del sistema.
- **Validaciones:** Validar que los valores de constantes sean razonables.
- **Caché:** Considerar caché de constantes para mejor rendimiento.
- **Actualización:** Las constantes pueden cambiar, validar valores antes de usar.
- **Formato:** Mostrar constantes con formato apropiado (porcentajes, moneda).
- **Contexto:** Algunas constantes pueden ser específicas por especialidad. 