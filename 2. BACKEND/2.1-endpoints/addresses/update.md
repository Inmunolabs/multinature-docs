# PATCH /addresses/:id

## Descripción funcional

Actualiza una dirección existente. Permite modificar campos específicos de la dirección manteniendo los valores existentes para los campos no enviados. Solo se pueden actualizar direcciones propias.

## Autorización

Requiere token Bearer válido. El usuario solo puede actualizar sus propias direcciones, a menos que sea administrador.

## Parámetros de ruta

- `id` (UUID, requerido): ID único de la dirección a actualizar

### Ejemplo
```
PATCH /addresses/123e4567-e89b-12d3-a456-426614174000
```

## Query parameters

No aplica

## Body del request

Campos opcionales para actualizar. Solo se actualizan los campos enviados.

```json
{
  "street": "string",
  "extNumber": "string",
  "intNumber": "string",
  "neighborhood": "string",
  "city": "string",
  "federalEntity": "string",
  "zipCode": "string",
  "country": "string",
  "refer": "string",
  "isClinic": "boolean"
}
```

### Ejemplo de body

```json
{
  "street": "Av. Insurgentes Sur Actualizada",
  "extNumber": "1234",
  "neighborhood": "Del Valle Norte",
  "isClinic": true
}
```

## Ejemplo de respuesta exitosa (200 OK)

```json
[
  {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "userId": "123e4567-e89b-12d3-a456-426614174000",
    "street": "Av. Insurgentes Sur Actualizada",
    "extNumber": "1234",
    "intNumber": "A",
    "neighborhood": "Del Valle Norte",
    "city": "Ciudad de México",
    "federalEntity": "CDMX",
    "zipCode": "03100",
    "country": "México",
    "refer": "Frente al parque",
    "isShippingAddress": true,
    "isClinic": true
  }
]
```

## Códigos de estado y errores

| Código | Significado | Descripción |
|--------|-------------|-------------|
| 200 | OK | Dirección actualizada exitosamente |
| 400 | Bad Request | Datos de validación incorrectos |
| 401 | Unauthorized | Token faltante o inválido |
| 403 | Forbidden | Sin permisos para actualizar esta dirección |
| 404 | Not Found | Dirección no encontrada |
| 500 | Internal Server Error | Error del servidor |

## Notas útiles para el frontend

- **Actualización parcial:** Solo se actualizan los campos enviados en el body
- **Validación:** Los campos enviados deben pasar las validaciones de `addressesValidations.updateAddress`
- **Respuesta:** Se retorna la lista completa de direcciones del usuario después de la actualización
- **Campos booleanos:** `isClinic` se puede enviar como string "true"/"false" o boolean
- **Código postal:** Debe cumplir el formato de 4-5 dígitos numéricos
- **Seguridad:** No se puede cambiar el propietario de la dirección (`userId`)
- **Uso:** Ideal para formularios de edición de direcciones existentes

## Consideraciones técnicas

- **Middleware:** Aplica `ownAddressValidation` para validar permisos y existencia
- **Validaciones:** Usa `addressesValidations.updateAddress` para validar campos
- **Campos actualizables:** Solo permite actualizar campos específicos, no todos
- **Transformación:** Convierte campos camelCase a snake_case para la base de datos
- **Respuesta:** Retorna lista completa de direcciones para mantener sincronización del frontend
- **Base de datos:** Usa `AddressesQueries.update` para la actualización
