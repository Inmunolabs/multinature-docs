# GET /constants

Obtiene todas las constantes del sistema.

---

## Método, ruta y autorización
- **Método:** GET
- **Ruta:** `/constants`
- **Autorización:** Bearer token en headers

---

## Explicación funcional
Permite obtener todas las constantes del sistema que definen valores importantes como IVA, costos de envío, montos mínimos de compra, etc. Estas constantes se usan en cálculos de precios, impuestos y configuraciones del sistema.

---

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

---

## Errores comunes
| Código | Mensaje                        | Causa                                 |
|--------|--------------------------------|---------------------------------------|
| 403    | No autorizado                  | Token inválido o sin permisos         |
| 500    | Error interno                  | Error inesperado en el servidor       |

---

## Notas útiles para frontend
- **IVA:** Porcentaje de impuesto al valor agregado (16% por defecto).
- **Envío:** Costo fijo de envío para productos físicos ($150 por defecto).
- **Monto mínimo:** Cantidad mínima para realizar una compra ($500 por defecto).
- **Día de corte:** Día del mes para cortes de facturación (28 por defecto).
- **Métodos de pago:** Límite de métodos de pago por usuario (3 por defecto).
- **Histórico:** Días para generar datos históricos (30 por defecto).
- **Comisión:** Porcentaje de comisión por defecto para especialistas (10% por defecto).
- **Cálculos:** Usar estas constantes para cálculos de precios y validaciones.
- **Caché:** Considerar caché de constantes para mejor rendimiento. 