# POST /commissions/liquidate

## Descripción funcional

Liquida las comisiones pendientes del período actual. Procesa todas las comisiones confirmadas y genera transferencias bancarias mediante Wire4. Solo procesa comisiones con monto mayor a $0.01 y usuarios con cuentas de cobro válidas. Envía notificaciones por email a usuarios sin cuenta de cobro.

## Autorización

Requiere token Bearer válido y contraseña especial en header `password`. Solo administradores con permisos especiales pueden liquidar comisiones.

## Parámetros de ruta

No aplica

## Query parameters

No aplica

## Body del request

No aplica

## Ejemplo de respuesta exitosa (200 OK)

```json
{
  "awsRequestId": "123e4567-e89b-12d3-a456-426614174000",
  "message": "Listo",
  "data": "Listo"
}
```

## Códigos de estado y errores

| Código | Significado | Descripción |
|--------|-------------|-------------|
| 200 | OK | Liquidación procesada exitosamente |
| 401 | Unauthorized | Token faltante/inválido o contraseña incorrecta |
| 500 | Internal Server Error | Error del servidor o en Wire4 |

## Notas útiles para el frontend

- **Seguridad:** Requiere contraseña especial adicional al token Bearer
- **Período:** Procesa comisiones del período de corte actual
- **Validaciones:** Solo procesa comisiones con monto mayor a $0.01
- **Cuentas:** Los usuarios deben tener cuentas de cobro válidas registradas
- **Notificaciones:** Envía emails automáticos a usuarios sin cuenta de cobro
- **Wire4:** Integra con sistema de transferencias bancarias SPEI
- **Proceso:** Es un proceso batch que puede tomar tiempo en completarse
- **Estados:** Actualiza el estado de las comisiones procesadas

## Consideraciones técnicas

- **Middleware:** Aplica `validations.passHeader` para validar contraseña especial
- **Autenticación:** Usa `bcrypt.compareSync()` para verificar contraseña hash
- **Período:** Calcula automáticamente el período de corte usando `dateTools.getCurrentPeriod()`
- **Wire4:** Integra con Wire4 API para transferencias SPEI
- **Validaciones:** Verifica cuentas de cobro y usuarios válidos
- **Notificaciones:** Usa `EmailsNotifications` para enviar emails automáticos
- **Transaccional:** Procesa comisiones de forma batch con manejo de errores
- **Constantes:** Usa variables de entorno para configuración de Wire4
- **Logging:** Registra detalladamente el proceso de liquidación
