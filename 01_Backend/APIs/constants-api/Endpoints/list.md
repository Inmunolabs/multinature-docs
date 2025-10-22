# GET /constants

## Descripción funcional

Obtiene todas las constantes del sistema que definen valores importantes como IVA, costos de envío, montos mínimos de compra, etc. Estas constantes se usan en cálculos de precios, impuestos y configuraciones del sistema. Útil para obtener valores de configuración necesarios para operaciones del frontend.

## Autorización

Requiere token Bearer válido. Solo usuarios autorizados pueden consultar las constantes del sistema.

## Parámetros de ruta

No aplica

## Query parameters

No aplica

## Body del request

No aplica

## Ejemplo de respuesta exitosa (200 OK)

```json
{
  "iva": "16",
  "shippingCost": "150",
  "minimalAmountOfPurchase": "500",
  "cutoffDay": "28",
  "maxPaymentMethodsPerUser": "3",
  "daysToGenerateHistorical": "30",
  "defaultCommissionPercentage": "10"
}
```

## Códigos de estado y errores

| Código | Significado | Descripción |
|--------|-------------|-------------|
| 200 | OK | Constantes obtenidas exitosamente |
| 401 | Unauthorized | Token faltante o inválido |
| 403 | Forbidden | Sin permisos para consultar constantes |
| 500 | Internal Server Error | Error del servidor |

## Notas útiles para el frontend

- **IVA:** Porcentaje de impuesto al valor agregado (16% por defecto)
- **Envío:** Costo fijo de envío para productos físicos ($150 por defecto)
- **Monto mínimo:** Cantidad mínima para realizar una compra ($500 por defecto)
- **Día de corte:** Día del mes para cortes de facturación (28 por defecto)
- **Métodos de pago:** Límite de métodos de pago por usuario (3 por defecto)
- **Histórico:** Días para generar datos históricos (30 por defecto)
- **Comisión:** Porcentaje de comisión por defecto para especialistas (10% por defecto)
- **Cálculos:** Usar estas constantes para cálculos de precios y validaciones
- **Caché:** Considerar caché de constantes para mejor rendimiento
- **Configuración:** Las constantes se usan en múltiples módulos del sistema

## Consideraciones técnicas

- **Middleware:** Aplica `authorize` para validar token Bearer
- **DTO:** La respuesta se transforma usando `constantsToDTO()` para convertir array a objeto
- **Base de datos:** Consulta usando `ConstantsQueries.list`
- **Estructura:** Las constantes se devuelven como objeto con clave-valor
- **Performance:** Optimizado para consultas frecuentes de configuración
- **Caché:** Ideal para implementar caché en el frontend
