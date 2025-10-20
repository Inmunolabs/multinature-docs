# POST /specialists/patient

## Descripción funcional

Permite a un especialista crear un nuevo paciente en el sistema. El paciente creado se asigna automáticamente al especialista que lo crea. Incluye validaciones de email único y asignación automática de especialidades.

## Autorización

Requiere token Bearer válido. Solo especialistas pueden crear pacientes.

## Parámetros de ruta

No aplica

## Query parameters

No aplica

## Body del request

```json
{
  "firstName": "Ana",
  "lastName": "López",
  "phone": "+525512345680",
  "email": "ana.lopez@email.com",
  "password": "Contraseña123!",
  "birthdate": "1995-03-20",
  "gender": "female",
  "profile": "user",
  "specialtyIds": ["nutricion", "endocrinologia"],
  "subspecialtyIds": ["diabetes", "obesidad"]
}
```

### Campos requeridos
- `firstName` (string): Nombre del paciente
- `lastName` (string): Apellido del paciente
- `email` (string): Email único del paciente
- `password` (string): Contraseña del paciente (mínimo 8 caracteres)

### Campos opcionales
- `phone` (string): Número de teléfono del paciente
- `birthdate` (string): Fecha de nacimiento en formato ISO (YYYY-MM-DD)
- `gender` (string): Género del paciente (`male`, `female`, `other`)
- `profile` (string): Perfil del paciente (por defecto: `user`)
- `specialtyIds` (array): IDs de las especialidades médicas
- `subspecialtyIds` (array): IDs de las subespecialidades médicas

### Validaciones
- `email`: Debe ser un email válido y único en el sistema
- `password`: Mínimo 8 caracteres con mayúsculas, minúsculas y números
- `firstName`, `lastName`: No pueden estar vacíos
- `phone`: Formato internacional válido
- `specialtyIds`: Debe coincidir con las especialidades del especialista

## Ejemplo de respuesta exitosa (201 Created)

```json
{
  "awsRequestId": "456e7890-e89b-12d3-a456-426614174000",
  "message": "Paciente creado exitosamente",
  "data": {
    "id": "patient789-e89b-12d3-a456-426614174000",
    "firstName": "Ana",
    "lastName": "López",
    "phone": "+525512345680",
    "email": "ana.lopez@email.com",
    "birthdate": "1995-03-20",
    "gender": "female",
    "profile": "user",
    "openpayUserId": "",
    "balance": 0,
    "recommender": null,
    "specialists": [
      {
        "id": "specialist789-e89b-12d3-a456-426614174000",
        "name": "Dr. María García",
        "specialties": ["Nutrición", "Endocrinología"]
      }
    ],
    "specialties": ["nutricion", "endocrinologia"],
    "subspecialties": ["diabetes", "obesidad"],
    "specialistSettings": null,
    "antiquity": "0 días",
    "hasPlan": false,
    "isValid": false
  }
}
```

## Códigos de estado y errores

| Código | Significado           | Descripción                      |
| ------ | --------------------- | -------------------------------- |
| 201    | Created               | Paciente creado exitosamente     |
| 400    | Bad Request           | Datos del paciente inválidos     |
| 400    | Bad Request           | Email ya registrado en el sistema |
| 400    | Bad Request           | Especialidades no válidas para el especialista |
| 401    | Unauthorized          | Token faltante o inválido        |
| 500    | Internal Server Error | Error del servidor               |

## Notas útiles para el frontend

- **Especialista requerido:** Solo especialistas pueden crear pacientes
- **Asignación automática:** El paciente se asigna automáticamente al especialista creador
- **Verificación requerida:** Después de crear la cuenta, el paciente debe verificar su email
- **Especialidades:** Seleccionar solo especialidades válidas para el especialista
- **Validaciones:** Implementar validaciones del lado del cliente antes de enviar
- **Mensajes de éxito:** Informar sobre la creación exitosa y enví del código de verificación

## Consideraciones técnicas

- **Middleware:** Aplica `createPatient`, `uniqueEmailValidation` y `validateSpecialtyAssignBySpecialist`
- **Validaciones:** Verificación de email único y especialidades válidas
- **Asignación:** Asignación automática del paciente al especialista creador
- **Encriptación:** La contraseña se encripta antes de almacenar
- **Verificación:** Se genera y envía código de verificación automáticamente
- **Base de datos:** Crea entidad User y asigna especialidades
- **Seguridad:** Validaciones estrictas de datos de entrada y permisos
- **DTO:** Transformación usando `userToDTO` para la respuesta
