# DELETE /addresses/:id

## Descripción funcional

Elimina una dirección específica del usuario. No se pueden eliminar direcciones marcadas como dirección de envío principal. Solo se pueden eliminar direcciones propias.

## Autorización

Requiere token Bearer válido. El usuario solo puede eliminar sus propias direcciones, a menos que sea administrador.

## Parámetros de ruta

- `id` (UUID, requerido): ID único de la dirección a eliminar

### Ejemplo
```
DELETE /addresses/123e4567-e89b-12d3-a456-426614174000
```

## Query parameters

No aplica

## Body del request

No aplica

## Ejemplo de respuesta exitosa (200 OK)

```json
[
  {
    "id": "456e7890-e89b-12d3-a456-426614174000",
    "userId": "123e4567-e89b-12d3-a456-426614174000",
    "street": "Calle Reforma",
    "extNumber": "567",
    "intNumber": "",
    "neighborhood": "Centro",
    "city": "Ciudad de México",
    "federalEntity": "CDMX",
    "zipCode": "06000",
    "country": "México",
    "refer": "Edificio azul",
    "isShippingAddress": true,
    "isClinic": true
  }
]
```

## Códigos de estado y errores

| Código | Significado | Descripción |
|--------|-------------|-------------|
| 200 | OK | Dirección eliminada exitosamente |
| 400 | Bad Request | No se puede eliminar la dirección de envío principal |
| 401 | Unauthorized | Token faltante o inválido |
| 403 | Forbidden | Sin permisos para eliminar esta dirección |
| 404 | Not Found | Dirección no encontrada |
| 500 | Internal Server Error | Error del servidor |

## Notas útiles para el frontend

- **Dirección de envío:** No se puede eliminar una dirección marcada como `isShippingAddress: true`
- **Validación:** Verificar el campo `isShippingAddress` antes de mostrar el botón de eliminar
- **Confirmación:** Mostrar mensaje de confirmación antes de eliminar
- **Respuesta:** Se retorna la lista actualizada de direcciones del usuario
- **UI:** Deshabilitar botón de eliminar para direcciones de envío principales
- **Mensaje de error:** Mostrar mensaje claro cuando no se puede eliminar la dirección de envío
- **Actualización:** La lista se actualiza automáticamente después de la eliminación

## Consideraciones técnicas

- **Middleware:** Aplica `ownAddressValidation` para validar permisos y existencia
- **Validación de negocio:** Verifica que la dirección no sea de envío antes de eliminar
- **Base de datos:** Usa `AddressesQueries.remove` para la eliminación
- **Respuesta:** Retorna lista completa de direcciones restantes para sincronización
- **Seguridad:** Solo permite eliminar direcciones propias
- **Error específico:** Retorna error 400 con mensaje claro cuando no se puede eliminar
