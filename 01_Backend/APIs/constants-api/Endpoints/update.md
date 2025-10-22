# PATCH /constants/:constantId

## Descripción funcional

Actualiza el valor de una constante específica del sistema. Permite a administradores modificar valores de configuración como IVA, costos de envío, montos mínimos, etc. Solo administradores con contraseña especial pueden realizar esta operación. Los cambios afectan inmediatamente todos los cálculos del sistema.

## Autorización

Requiere token Bearer válido y contraseña especial en header `password`. Solo administradores con permisos especiales pueden modificar constantes del sistema.

## Parámetros de ruta

- `constantId` (string, requerido): Identificador único de la constante a actualizar

### Ejemplo
```
PATCH /constants/iva
```

## Query parameters

No aplica

## Body del request

```json
{
  "value": "string"
}
```

### Ejemplo de body

```json
{
  "value": "18"
}
```

## Ejemplo de respuesta exitosa (200 OK)

```json
{
  "awsRequestId": "123e4567-e89b-12d3-a456-426614174000",
  "message": "Constante actualizada exitosamente",
  "data": {
    "iva": "18",
    "shippingCost": "150",
    "minimalAmountOfPurchase": "500",
    "cutoffDay": "28",
    "maxPaymentMethodsPerUser": "3",
    "daysToGenerateHistorical": "30",
    "defaultCommissionPercentage": "10"
  }
}
```

## Códigos de estado y errores

| Código | Significado | Descripción |
|--------|-------------|-------------|
| 200 | OK | Constante actualizada exitosamente |
| 400 | Bad Request | Valor de constante inválido o faltante |
| 401 | Unauthorized | Token faltante/inválido o contraseña incorrecta |
| 403 | Forbidden | Sin permisos para modificar constantes |
| 404 | Not Found | Constante no encontrada |
| 500 | Internal Server Error | Error del servidor |

## Notas útiles para el frontend

- **Seguridad:** Requiere contraseña especial adicional al token Bearer
- **Permisos:** Solo administradores pueden modificar constantes
- **Impacto:** Los cambios afectan inmediatamente todos los cálculos del sistema
- **Validación:** El valor debe ser válido para el tipo de constante
- **Respuesta:** Se retornan todas las constantes actualizadas
- **Auditoría:** Los cambios quedan registrados en el sistema
- **Caché:** Considerar invalidar caché después de cambios
- **Notificaciones:** Informar a usuarios sobre cambios importantes

## Consideraciones técnicas

- **Middleware:** Aplica `validations.passHeader` y `constantsValidations.constants`
- **Autenticación:** Usa `bcrypt.compareSync()` para verificar contraseña hash
- **Validaciones:** Aplica validaciones específicas para constantes
- **Base de datos:** Usa `ConstantsQueries.update` para modificar la constante
- **Transaccional:** Actualiza la constante y retorna todas las constantes
- **DTO:** Retorna todas las constantes transformadas con `constantsToDTO()`
- **Seguridad:** Usa variable de entorno `CONSTANTS_ADMIN_PASS`
- **Impacto:** Los cambios afectan inmediatamente cálculos en otros módulos
