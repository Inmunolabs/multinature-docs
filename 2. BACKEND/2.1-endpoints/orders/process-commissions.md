# PATCH /orders/process-commissions/:openpayId

## Descripción funcional

Procesa las comisiones para una orden con autenticación 3D Secure de OpenPay. Este endpoint se utiliza para manejar las comisiones de órdenes que requirieron autenticación adicional por ser de monto alto (mayor a $6,000 MXN). Permite liquidar las comisiones pendientes una vez que la orden ha sido confirmada.

## Autorización

Requiere token Bearer válido. Solo usuarios autorizados pueden procesar comisiones de órdenes que les pertenezcan.

## Parámetros de ruta

- `openpayId` (string, requerido): ID de la transacción de OpenPay

### Ejemplo
```
PATCH /orders/process-commissions/ch_123456789
```

## Query parameters

No aplica

## Body del request

No aplica

## Ejemplo de respuesta exitosa (200 OK)

```json
{
  "awsRequestId": "456e7890-e89b-12d3-a456-426614174000",
  "message": "Comisiones procesadas exitosamente",
  "data": {
    "orderId": "789e0123-e89b-12d3-a456-426614174000",
    "openpayId": "ch_123456789",
    "commissionAmount": 136.80,
    "status": "processed",
    "message": "Las comisiones han sido procesadas y liquidadas correctamente"
  }
}
```

## Códigos de estado y errores

| Código | Significado | Descripción |
|--------|-------------|-------------|
| 200 | OK | Comisiones procesadas exitosamente |
| 400 | Bad Request | ID de OpenPay inválido |
| 401 | Unauthorized | Token faltante o inválido |
| 403 | Forbidden | Sin permisos para procesar comisiones de esta orden |
| 404 | Not Found | Orden o comisiones no encontradas |
| 500 | Internal Server Error | Error del servidor |

## Notas útiles para el frontend

- **3D Secure:** Solo aplica a órdenes que requirieron autenticación 3D Secure
- **Monto alto:** Para órdenes mayores a $6,000 MXN
- **Comisiones:** Permite liquidar comisiones pendientes de la orden
- **OpenPay ID:** Usar el ID de transacción de OpenPay para identificar la orden
- **Propiedad:** Solo se pueden procesar comisiones de órdenes propias
- **Liquidación:** Las comisiones se marcan como procesadas y liquidadas
- **Confirmación:** Mostrar mensaje de confirmación del procesamiento

## Consideraciones técnicas

- **Middleware:** Aplica `authorize` y `ownOrderValidation`
- **Validaciones:** Verifica que el usuario solo pueda procesar comisiones de sus propias órdenes
- **Base de datos:** Procesa comisiones usando `CommissionQueries` específicas
- **3D Secure:** Maneja comisiones de órdenes con autenticación adicional
- **OpenPay:** Usa el ID de transacción de OpenPay para identificación
- **Liquidación:** Marca las comisiones como procesadas y liquidadas
- **Seguridad:** Solo permite procesar comisiones de órdenes propias del usuario
- **Performance:** Optimizado para procesamiento de comisiones de órdenes específicas
