# PATCH /addresses/shippingAddress/:id

## Descripción funcional

Actualiza la dirección de envío principal de un usuario. Solo una dirección puede ser marcada como dirección de envío a la vez. Al marcar una dirección como shipping, automáticamente se desmarca la anterior.

## Autorización

Requiere token Bearer válido. El usuario solo puede actualizar sus propias direcciones de envío, a menos que sea administrador.

## Parámetros de ruta

- `id` (UUID, requerido): ID único de la dirección que se marcará como dirección de envío

### Ejemplo
```
PATCH /addresses/shippingAddress/123e4567-e89b-12d3-a456-426614174000
```

## Query parameters

No aplica

## Body del request

No aplica. Este endpoint no requiere body, solo el ID de la dirección en la ruta.

## Ejemplo de respuesta exitosa (200 OK)

```json
[
  {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "userId": "123e4567-e89b-12d3-a456-426614174000",
    "street": "Av. Insurgentes Sur",
    "extNumber": "1234",
    "intNumber": "A",
    "neighborhood": "Del Valle",
    "city": "Ciudad de México",
    "federalEntity": "CDMX",
    "zipCode": "03100",
    "country": "México",
    "refer": "Frente al parque",
    "isShippingAddress": true,
    "isClinic": false
  },
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
    "isShippingAddress": false,
    "isClinic": true
  }
]
```

## Códigos de estado y errores

| Código | Significado | Descripción |
|--------|-------------|-------------|
| 200 | OK | Dirección de envío actualizada exitosamente |
| 400 | Bad Request | ID de dirección inválido |
| 401 | Unauthorized | Token faltante o inválido |
| 403 | Forbidden | Sin permisos para actualizar esta dirección |
| 404 | Not Found | Dirección no encontrada |
| 500 | Internal Server Error | Error del servidor |

## Notas útiles para el frontend

- **Una sola dirección:** Solo una dirección puede ser marcada como dirección de envío a la vez
- **Cambio automático:** Al marcar una nueva dirección como shipping, la anterior se desmarca automáticamente
- **Respuesta completa:** Se retorna la lista completa de direcciones del usuario con el estado actualizado
- **Uso:** Ideal para permitir al usuario seleccionar su dirección principal de envío
- **Indicador visual:** Usar el campo `isShippingAddress` para mostrar cuál es la dirección principal
- **Formularios:** Útil para checkboxes o botones de selección de dirección de envío

## Consideraciones técnicas

- **Middleware:** Aplica `ownAddressValidation` para validar permisos y existencia
- **Lógica de negocio:** Actualiza todas las direcciones del usuario (una como shipping, resto como false)
- **Transaccional:** Usa `Promise.all` para actualizar múltiples direcciones simultáneamente
- **Base de datos:** Usa `AddressesQueries.updateShippingAddress` para cada dirección
- **Respuesta:** Retorna lista completa para mantener sincronización del frontend
- **Performance:** Actualiza todas las direcciones en paralelo para eficiencia
