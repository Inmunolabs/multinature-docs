# PATCH /specialists/assign-user

## Descripción funcional

Asigna un usuario existente a un especialista mediante su dirección de email. Permite que los especialistas agreguen pacientes a su lista de atención sin necesidad de crear nuevas cuentas.

## Autorización

Requiere token Bearer válido. Solo especialistas autorizados pueden asignar usuarios.

## Parámetros de ruta

No aplica

## Query parameters

No aplica

## Body del request

```json
{
  "userEmail": "maria.gonzalez@email.com",
  "specialistId": "specialist123-e89b-12d3-a456-426614174000",
  "assignmentType": "patient",
  "assignmentReason": "consulta_nutricional",
  "assignmentNotes": "Paciente referido por médico general",
  "effectiveDate": "2024-01-20",
  "autoSchedule": true,
  "sendWelcomeEmail": true,
  "sendWelcomeSMS": false,
  "specialty": "nutricion",
  "subspecialty": "diabetes",
  "priority": "normal",
  "referralSource": "medico_general"
}
```

## Ejemplo de respuesta exitosa (200 OK)

```json
{
  "awsRequestId": "456e7890-e89b-12d3-a456-426614174000",
  "message": "Usuario asignado al especialista exitosamente",
  "data": {
    "assignmentId": "assignment789-e89b-12d3-a456-426614174000",
    "userId": "user123-e89b-12d3-a456-426614174000",
    "userEmail": "maria.gonzalez@email.com",
    "userName": "María González",
    "userPhone": "+56912345678",
    "specialistId": "specialist123-e89b-12d3-a456-426614174000",
    "specialistName": "Dr. Carlos López",
    "specialistEmail": "carlos.lopez@clinica.com",
    "assignmentType": "patient",
    "assignmentReason": "consulta_nutricional",
    "assignmentNotes": "Paciente referido por médico general",
    "effectiveDate": "2024-01-20",
    "status": "active",
    "assignmentDate": "2024-01-15T14:30:00.000Z",
    "specialty": {
      "specialty": "nutricion",
      "specialtyName": "Nutrición"
    },
    "subspecialty": {
      "subspecialty": "diabetes",
      "subspecialtyName": "Diabetes"
    },
    "priority": "normal",
    "referralSource": "medico_general",
    "notifications": {
      "welcomeEmailSent": true,
      "welcomeSMSSent": false,
      "specialistNotified": true,
      "userNotified": true
    },
    "nextSteps": {
      "autoSchedule": true,
      "suggestedConsultationDate": "2024-01-25",
      "suggestedConsultationTime": "10:00",
      "consultationType": "presencial"
    }
  }
}
```

## Códigos de estado y errores

| Código | Descripción | Causa común |
|--------|-------------|-------------|
| 200 | OK | Usuario asignado exitosamente |
| 400 | Bad Request | Datos de asignación inválidos |
| 401 | Unauthorized | Token faltante o inválido |
| 403 | Forbidden | Sin permisos para asignar usuarios |
| 404 | Not Found | Usuario o especialista no encontrado |
| 409 | Conflict | Usuario ya asignado al especialista |
| 422 | Unprocessable Entity | Usuario no pertenece al especialista (validación fallida) |
| 500 | Internal Server Error | Error del servidor |

## Notas útiles para el frontend

- **Validación de email**: El email debe corresponder a un usuario existente en el sistema
- **Tipo de asignación**: `patient`, `student`, `assistant` - afecta los permisos y funcionalidades
- **Fecha efectiva**: La asignación puede programarse para una fecha futura
- **Auto-programación**: Si está habilitado, se sugiere automáticamente una fecha de consulta
- **Notificaciones**: Se pueden configurar qué tipos de notificaciones enviar
- **Especialidad**: Se asigna automáticamente la especialidad del especialista
- **Prioridad**: `low`, `normal`, `high`, `urgent` - afecta el orden de atención

## Consideraciones técnicas

- **Validación**: Se aplican validaciones de `validateUserByEmail` y `userNotBelongsToSpecialist`
- **Transaccional**: La asignación es atómica - si falla una parte, se revierte todo
- **Notificaciones**: Se envían notificaciones automáticas a todas las partes involucradas
- **Auditoría**: Se registra toda la información de asignación para auditoría
- **Conflictos**: Se verifica que el usuario no esté ya asignado a otro especialista
- **Cache**: La asignación se refleja inmediatamente en las consultas de pacientes
