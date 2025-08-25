# PATCH /specialists/:id

## Descripción funcional

Permite actualizar la información de un especialista existente. Solo el propio especialista puede actualizar sus datos. Incluye validaciones de permisos y datos únicos como email.

## Autorización

Requiere token Bearer válido. Solo el especialista propietario puede actualizar sus datos.

## Parámetros de ruta

- `id` (string): ID único del especialista a actualizar

### Ejemplo
```
PATCH /specialists/specialist123-e89b-12d3-a456-426614174000
```

## Query parameters

No aplica

## Body del request

```json
{
  "firstName": "María Elena",
  "lastName": "García Rodríguez",
  "phone": "+525512345679",
  "email": "maria.garcia.rodriguez@clinic.com",
  "birthdate": "1985-06-15",
  "gender": "female",
  "specialtyIds": ["nutricion", "endocrinologia", "medicina_general"],
  "subspecialtyIds": ["diabetes", "obesidad", "nutricion_clinica", "endocrinologia_pediatrica"]
}
```

### Campos opcionales
- `firstName` (string): Nuevo nombre del especialista
- `lastName` (string): Nuevo apellido del especialista
- `phone` (string): Nuevo número de teléfono
- `email` (string): Nuevo email (debe ser único)
- `birthdate` (string): Nueva fecha de nacimiento en formato ISO
- `gender` (string): Nuevo género (`male`, `female`, `other`)
- `specialtyIds` (array): Nuevas especialidades médicas
- `subspecialtyIds` (array): Nuevas subespecialidades médicas

### Validaciones
- `email`: Si se proporciona, debe ser un email válido y único
- `firstName`, `lastName`: No pueden estar vacíos si se proporcionan
- `phone`: Formato internacional válido si se proporciona
- `specialtyIds`: Debe ser un array válido de especialidades
- `subspecialtyIds`: Debe ser un array válido de subespecialidades

## Ejemplo de respuesta exitosa (200 OK)

```json
{
  "awsRequestId": "456e7890-e89b-12d3-a456-426614174000",
  "message": "Especialista actualizado exitosamente",
  "data": {
    "id": "specialist123-e89b-12d3-a456-426614174000",
    "firstName": "María Elena",
    "lastName": "García Rodríguez",
    "phone": "+525512345679",
    "email": "maria.garcia.rodriguez@clinic.com",
    "birthdate": "1985-06-15",
    "gender": "female",
    "profile": "specialist",
    "openpayUserId": "op_user_123456",
    "balance": 1500.50,
    "recommender": null,
    "specialists": [],
    "specialties": ["nutricion", "endocrinologia", "medicina_general"],
    "subspecialties": ["diabetes", "obesidad", "nutricion_clinica", "endocrinologia_pediatrica"],
    "specialistSettings": {
      "id": "settings123-e89b-12d3-a456-426614174000",
      "consultationPrice": 800.00,
      "consultationDuration": 60,
      "workingHours": {
        "monday": {
          "start": "09:00",
          "end": "17:00",
          "isAvailable": true
        }
      },
      "isAvailable": true
    },
    "antiquity": "2 años",
    "hasPlan": true,
    "isValid": true
  }
}
```

## Códigos de estado y errores

| Código | Significado           | Descripción                      |
| ------ | --------------------- | -------------------------------- |
| 200    | OK                    | Especialista actualizado         |
| 400    | Bad Request           | Datos de actualización inválidos |
| 400    | Bad Request           | Email ya registrado en el sistema |
| 401    | Unauthorized          | Token faltante o inválido        |
| 403    | Forbidden             | No tienes permisos para actualizar este especialista |
| 404    | Not Found             | Especialista no encontrado       |
| 500    | Internal Server Error | Error del servidor               |

## Notas útiles para el frontend

- **Permisos:** Solo el especialista propietario puede actualizar sus datos
- **Validación de email:** Si se cambia el email, verificar que sea único
- **Especialidades:** Al actualizar especialidades, considerar impacto en pacientes existentes
- **Campos opcionales:** Solo enviar los campos que se desean actualizar
- **Confirmación:** Solicitar confirmación antes de actualizar datos críticos
- **Feedback:** Mostrar mensaje de éxito después de la actualización

## Consideraciones técnicas

- **Middleware:** Aplica `idPathParam`, `updateSpecialist` y `userOwnResources`
- **Validaciones:** Verificación de permisos y datos únicos
- **Servicio:** Utiliza `updateSpecialist` del servicio de especialistas
- **DTO:** Transformación usando `specialistToDTO` para la respuesta
- **Base de datos:** Actualización parcial de campos proporcionados
- **Seguridad:** Verificación de propiedad del recurso
- **Auditoría:** Registro de cambios en el sistema
