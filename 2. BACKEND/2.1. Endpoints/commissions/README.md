# API de Commissions

Esta documentación cubre todos los endpoints relacionados con la gestión de comisiones de especialistas.

## Índice de Endpoints

- [GET /commissions - Listar comisiones](./commissions-list.md)
- [GET /commissions/user/:userId - Comisiones de un usuario](./commissions-list-by-user.md)
- [POST /commissions/liquidate/:id - Liquidar comisión](./commissions-liquidate.md)
- [DELETE /commissions/:id - Eliminar comisión](./commissions-delete.md)
- [GET / - Healthcheck](./commissions-healthcheck.md)

---

## Reglas importantes y contexto del proyecto

- Las comisiones se generan por servicios prestados por especialistas.
- Las comisiones pueden estar pendientes, liquidadas o canceladas.
- Las comisiones se calculan según porcentajes configurados por especialidad.
- Las comisiones pueden ser individuales o por equipo de trabajo.
- Las comisiones se liquidan a cuentas bancarias registradas.
- Las comisiones tienen fechas de corte y liquidación.

---

## Consideraciones generales para el frontend

- **Estados:** Mostrar estado actual de las comisiones (pendiente, liquidada, cancelada).
- **Cálculos:** Mostrar desglose de comisiones por servicio y período.
- **Liquidación:** Permitir liquidación de comisiones pendientes.
- **Filtros:** Implementar filtros por fecha, estado, especialista.
- **Historial:** Mostrar historial de liquidaciones anteriores.
- **Porcentajes:** Mostrar porcentajes de comisión por especialidad.
- **Equipos:** Distinguir entre comisiones individuales y de equipo.
- **Fechas:** Mostrar fechas de corte y liquidación. 