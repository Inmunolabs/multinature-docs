# GET /addresses/:id

## Descripción funcional

Obtiene una dirección específica por su ID. Este endpoint permite consultar los detalles completos de una dirección, incluyendo si es de envío o clínica.

## Autorización

Requiere token Bearer válido. El usuario solo puede acceder a sus propias direcciones, a menos que sea administrador.

## Parámetros de ruta

- `id` (UUID, requerido): ID único de la dirección a consultar

### Ejemplo
```
GET /addresses/123e4567-e89b-12d3-a456-426614174000
```

## Query parameters

No aplica

## Body del request

No aplica

## Ejemplo de respuesta exitosa (200 OK)

```json
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
}
```

## Códigos de estado y errores

| Código | Significado | Descripción |
|--------|-------------|-------------|
| 200 | OK | Dirección obtenida exitosamente |
| 400 | Bad Request | ID de dirección inválido |
| 401 | Unauthorized | Token faltante o inválido |
| 403 | Forbidden | Sin permisos para acceder a esta dirección |
| 404 | Not Found | Dirección no encontrada |
| 500 | Internal Server Error | Error del servidor |

## Notas útiles para el frontend

- **Permisos:** Solo se puede acceder a direcciones propias, a menos que el usuario sea administrador
- **Validación:** El ID debe ser un UUID válido
- **Campos booleanos:** `isShippingAddress` e `isClinic` se retornan como booleanos (true/false)
- **Campos opcionales:** `intNumber` y `refer` pueden estar vacíos
- **País por defecto:** Si no se especifica, el país se establece como "México"
- **Uso:** Ideal para mostrar detalles de una dirección específica o pre-llenar formularios de edición

## Consideraciones técnicas

- **Middleware:** Aplica `ownAddressValidation` para validar permisos y existencia de la dirección
- **DTO:** La respuesta se transforma usando `addressToDTO()` para consistencia
- **Base de datos:** Consulta usando `AddressesQueries.getById`
- **Seguridad:** Validación de propiedad de la dirección antes de retornar los datos
- **Cache:** La dirección se obtiene del middleware de validación (`req.requestAddress`)
