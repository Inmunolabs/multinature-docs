# GET /addresses/user/:id

## Descripción funcional

Obtiene todas las direcciones asociadas a un usuario específico. Este endpoint permite listar tanto direcciones residenciales como clínicas del usuario autenticado.

## Autorización

Requiere token Bearer válido. El usuario solo puede acceder a sus propias direcciones, a menos que sea administrador.

## Parámetros de ruta

- `id` (UUID, requerido): ID del usuario cuyas direcciones se quieren obtener

### Ejemplo
```
GET /addresses/user/123e4567-e89b-12d3-a456-426614174000
```

## Query parameters

No aplica

## Body del request

No aplica

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
| 200 | OK | Lista de direcciones obtenida exitosamente |
| 400 | Bad Request | ID de usuario inválido |
| 401 | Unauthorized | Token faltante o inválido |
| 403 | Forbidden | Sin permisos para acceder a las direcciones de otro usuario |
| 500 | Internal Server Error | Error del servidor |

## Notas útiles para el frontend

- **Lista vacía:** Si el usuario no tiene direcciones, se retorna un array vacío `[]`
- **Filtrado:** Usa el campo `isShippingAddress` para identificar la dirección principal de envío
- **Clínicas:** Usa el campo `isClinic` para distinguir entre direcciones residenciales y clínicas
- **Primera dirección:** La primera dirección creada por un usuario se marca automáticamente como dirección de envío
- **Permisos:** Solo se pueden ver las direcciones propias, a menos que el usuario sea administrador
- **Actualización:** La lista se actualiza en tiempo real, incluyendo cambios recientes

## Consideraciones técnicas

- **Middleware:** Aplica `userOwnResources` para validar que el usuario solo acceda a sus propios recursos
- **DTO:** La respuesta se transforma usando `addressesToDTO()` para consistencia con el frontend
- **Base de datos:** Consulta optimizada usando `AddressesQueries.listByUserId`
- **Seguridad:** Validación de permisos a nivel de middleware antes de ejecutar la consulta
