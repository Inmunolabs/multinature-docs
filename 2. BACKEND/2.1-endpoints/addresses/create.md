# POST /addresses/:id

## Descripción funcional

Crea una nueva dirección para un usuario. Si es la primera dirección del usuario, se marca automáticamente como dirección de envío (isShippingAddress = true). Las direcciones pueden ser residenciales o clínicas según el tipo de usuario.

## Autorización

Requiere token Bearer válido. El usuario solo puede crear direcciones para su propia cuenta.

## Parámetros de ruta

- `id` (UUID, requerido): ID del usuario que tendrá la dirección

### Ejemplo
```
POST /addresses/123e4567-e89b-12d3-a456-426614174000
```

## Query parameters

No aplica

## Body del request

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
  "street": "Calle de Miguel",
  "extNumber": "456",
  "intNumber": "02",
  "neighborhood": "El Secreto",
  "city": "Zapopan",
  "federalEntity": "Jalisco",
  "zipCode": "45138",
  "country": "México",
  "refer": "2da dirección ingresada",
  "isClinic": false
}
```

## Ejemplo de respuesta exitosa (201 Created)

```json
[
  {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "userId": "123e4567-e89b-12d3-a456-426614174000",
    "street": "Calle de Miguel",
    "extNumber": "456",
    "intNumber": "02",
    "neighborhood": "El Secreto",
    "city": "Zapopan",
    "federalEntity": "Jalisco",
    "zipCode": "45138",
    "country": "México",
    "refer": "2da dirección ingresada",
    "isShippingAddress": true,
    "isClinic": false
  }
]
```

## Códigos de estado y errores

| Código | Significado | Descripción |
|--------|-------------|-------------|
| 201 | Created | Dirección creada exitosamente |
| 400 | Bad Request | Datos de validación incorrectos o campos obligatorios faltantes |
| 401 | Unauthorized | Token faltante o inválido |
| 403 | Forbidden | Sin permisos para crear dirección para otro usuario |
| 404 | Not Found | Usuario no encontrado |
| 500 | Internal Server Error | Error del servidor |

## Notas útiles para el frontend

- **Primera dirección:** Si es la primera dirección del usuario, se marca automáticamente como dirección de envío
- **Campos obligatorios:** `street`, `extNumber`, `neighborhood`, `city`, `federalEntity`, `zipCode` son requeridos
- **Campos opcionales:** `intNumber`, `refer`, `country`, `isClinic` son opcionales
- **Código postal:** Debe cumplir el formato de 4-5 dígitos numéricos
- **País por defecto:** Si no se especifica, se establece como "México"
- **Validación:** Usar el endpoint de colonias para autocompletar según código postal
- **Tipos:** Las direcciones pueden ser residenciales o clínicas según el perfil del usuario
- **Respuesta:** Se retorna la lista completa de direcciones del usuario después de la creación

## Consideraciones técnicas

- **Middleware:** Aplica `userOwnResources` para validar que el usuario solo cree direcciones para sí mismo
- **Validaciones:** Usa `addressesValidations.createAddress` para validar campos obligatorios y formato
- **Lógica de negocio:** Marca automáticamente la primera dirección como dirección de envío
- **Entidad:** Usa `Address.createEntity()` para crear la entidad con UUID generado
- **Base de datos:** Usa `AddressesQueries.add` para insertar la nueva dirección
- **Respuesta:** Retorna lista completa de direcciones para mantener sincronización del frontend 