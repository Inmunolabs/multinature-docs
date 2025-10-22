# API de Commissions

Esta documentación cubre todos los endpoints relacionados con la gestión de comisiones de especialistas.

## Índice de Endpoints

### Consulta de Comisiones
- [GET /commissions - Listar todas las comisiones](./list.md)
- [GET /commissions/user/:id - Comisiones de un usuario específico](./list-by-user.md)

### Liquidación
- [POST /commissions/liquidate - Liquidar comisiones pendientes](./liquidate.md)

### Sistema
- [GET / - Healthcheck](./healthcheck.md)

---

## Reglas importantes y contexto del proyecto

- Las comisiones se generan por servicios prestados por especialistas.
- Las comisiones pueden estar pendientes, liquidadas o canceladas.
- Las comisiones se calculan según porcentajes configurados por especialidad.
- Las comisiones se liquidan a cuentas bancarias registradas mediante Wire4.
- Las comisiones tienen fechas de corte y liquidación basadas en períodos.
- Solo se incluyen comisiones con monto mayor a 0.
- Los usuarios deben tener cuentas de cobro válidas para recibir liquidaciones.
- El sistema integra con Wire4 para transferencias SPEI.

---

## Consideraciones generales para el frontend

- **Estados:** Mostrar estado actual de las comisiones (confirming, liquidated, pending, cancelled).
- **Cálculos:** Mostrar desglose de comisiones por servicio y período.
- **Liquidación:** La liquidación requiere autenticación especial con contraseña.
- **Filtros:** Implementar filtros por fecha, estado, especialista.
- **Historial:** Mostrar historial de liquidaciones anteriores.
- **Períodos:** Las comisiones se organizan por períodos de corte.
- **Cuentas:** Verificar que los usuarios tengan cuentas de cobro válidas.
- **Montos:** Solo mostrar comisiones con monto mayor a 0.
- **Wire4:** Integración con sistema de transferencias bancarias. 