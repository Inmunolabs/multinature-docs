# DELETE /orders/cleanup

## Descripción funcional

Elimina automáticamente órdenes pendientes antiguas del sistema. Este endpoint se utiliza para limpiar órdenes que han estado en estado pendiente por un período prolongado y ya no son relevantes. La limpieza es automática y ayuda a mantener la base de datos optimizada.

## Autorización

Requiere token Bearer válido. Solo usuarios autorizados pueden ejecutar la limpieza de órdenes.

## Parámetros de ruta

No aplica

## Query parameters

No aplica

## Body del request

No aplica

## Ejemplo de respuesta exitosa (200 OK)

```json
{
  "awsRequestId": "456e7890-e89b-12d3-a456-426614174000",
  "message": "Limpieza de órdenes completada",
  "data": {
    "ordersRemoved": 15,
    "status": "completed",
    "message": "Se han eliminado 15 órdenes pendientes antiguas del sistema",
    "timestamp": "2024-01-15T10:30:00Z"
  }
}
```

## Códigos de estado y errores

| Código | Significado           | Descripción                                    |
| ------ | --------------------- | ---------------------------------------------- |
| 200    | OK                    | Limpieza de órdenes completada exitosamente    |
| 401    | Unauthorized          | Token faltante o inválido                      |
| 403    | Forbidden             | Sin permisos para ejecutar limpieza de órdenes |
| 500    | Internal Server Error | Error del servidor                             |

## Notas útiles para el frontend

- **Mantenimiento:** Este endpoint es principalmente para mantenimiento del sistema
- **Automático:** La limpieza se ejecuta automáticamente según criterios predefinidos
- **Órdenes pendientes:** Solo elimina órdenes en estado pendiente antiguas
- **Conteo:** Retorna el número de órdenes eliminadas
- **Timestamp:** Incluye la fecha y hora de la limpieza
- **Confirmación:** Mostrar resumen de la limpieza ejecutada
- **Permisos:** Verificar que el usuario tenga permisos administrativos

## Consideraciones técnicas

- **Middleware:** Aplica `authorize` para validar autenticación
- **Base de datos:** Ejecuta `removeOldPendingOrders` del servicio
- **Criterios:** Elimina órdenes pendientes basándose en criterios de antigüedad
- **Automático:** Proceso de limpieza automático del sistema
- **Seguridad:** Solo usuarios autorizados pueden ejecutar la limpieza
- **Performance:** Optimizado para eliminación masiva de órdenes antiguas
- **Mantenimiento:** Ayuda a mantener la base de datos optimizada
