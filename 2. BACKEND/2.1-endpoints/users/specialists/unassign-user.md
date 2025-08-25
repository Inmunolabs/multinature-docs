# PATCH /specialists/unassign-transfer

## Descripción funcional

Desasigna un usuario de un especialista o equipo de trabajo. Permite remover la relación entre un paciente y su especialista, ya sea para transferirlo a otro especialista o para finalizar la atención.

## Autorización

Requiere token Bearer válido. Solo especialistas propietarios o administradores pueden desasignar usuarios.

## Parámetros de ruta

No aplica

## Query parameters

No aplica

## Body del request

```json
{
  "userId": "user123-e89b-12d3-a456-426614174000",
  "specialistId": "specialist123-e89b-12d3-a456-426614174000",
  "teamworkId": "teamwork456-e89b-12d3-a456-426614174000",
  "unassignmentType": "transfer",
  "unassignmentReason": "cambio_especialidad",
  "unassignmentNotes": "Paciente requiere atención en endocrinología",
  "effectiveDate": "2024-01-20",
  "maintainHistory": true,
  "notifyPatient": true,
  "notifySpecialist": true,
  "notifyTeamwork": true,
  "transferToSpecialistId": "specialist789-e89b-12d3-a456-426614174000",
  "transferToTeamworkId": null,
  "scheduleFollowUp": true,
  "followUpDate": "2024-01-25"
}
```

## Ejemplo de respuesta exitosa (200 OK)

```json
{
  "awsRequestId": "456e7890-e89b-12d3-a456-426614174000",
  "message": "Usuario desasignado exitosamente",
  "data": {
    "unassignmentId": "unassignment789-e89b-12d3-a456-426614174000",
    "userId": "user123-e89b-12d3-a456-426614174000",
    "userName": "María González",
    "userEmail": "maria.gonzalez@email.com",
    "specialistId": "specialist123-e89b-12d3-a456-426614174000",
    "specialistName": "Dr. Carlos López",
    "teamworkId": "teamwork456-e89b-12d3-a456-426614174000",
    "teamworkName": "Equipo Nutrición",
    "unassignmentType": "transfer",
    "unassignmentReason": "cambio_especialidad",
    "unassignmentNotes": "Paciente requiere atención en endocrinología",
    "effectiveDate": "2024-01-20",
    "status": "completed",
    "unassignmentDate": "2024-01-15T14:30:00.000Z",
    "maintainHistory": true,
    "transferDetails": {
      "transferToSpecialistId": "specialist789-e89b-12d3-a456-426614174000",
      "transferToSpecialistName": "Dr. Ana Martínez",
      "transferToTeamworkId": null,
      "transferToTeamworkName": null,
      "transferStatus": "pending",
      "transferDate": "2024-01-20"
    },
    "followUp": {
      "scheduled": true,
      "followUpDate": "2024-01-25",
      "followUpType": "consulta_seguimiento",
      "followUpNotes": "Primera consulta con nuevo especialista"
    },
    "notifications": {
      "patientNotified": true,
      "specialistNotified": true,
      "teamworkNotified": true,
      "newSpecialistNotified": true
    },
    "summary": {
      "consultationsCompleted": 15,
      "prescriptionsIssued": 8,
      "labResultsProcessed": 12,
      "notesCreated": 25,
      "totalConsultations": 15,
      "lastConsultationDate": "2024-01-10"
    }
  }
}
```

## Códigos de estado y errores

| Código | Descripción | Causa común |
|--------|-------------|-------------|
| 200 | OK | Usuario desasignado exitosamente |
| 400 | Bad Request | Datos de desasignación inválidos |
| 401 | Unauthorized | Token faltante o inválido |
| 403 | Forbidden | Sin permisos para desasignar usuarios |
| 404 | Not Found | Usuario, especialista o equipo no encontrado |
| 409 | Conflict | Usuario no está asignado al especialista |
| 500 | Internal Server Error | Error del servidor |

## Notas útiles para el frontend

- **Tipo de desasignación**: `transfer`, `discharge`, `temporary` - afecta el comportamiento del sistema
- **Fecha efectiva**: La desasignación puede programarse para una fecha futura
- **Transferencia**: Si es transferencia, se debe especificar el nuevo especialista o equipo
- **Historial**: Por defecto se mantiene todo el historial médico del paciente
- **Seguimiento**: Se puede programar automáticamente una consulta de seguimiento
- **Notificaciones**: Se pueden configurar qué tipos de notificaciones enviar
- **Estado**: Verifica el estado de la desasignación antes de proceder con operaciones

## Consideraciones técnicas

- **Validación**: Se aplican validaciones de `unassignedSpecialist` y `checkTeamOwnership`
- **Transaccional**: La desasignación es atómica - si falla una parte, se revierte todo
- **Historial**: Se mantiene la integridad referencial de todos los datos del paciente
- **Transferencia**: Si es transferencia, se valida que el nuevo especialista esté disponible
- **Notificaciones**: Se envían notificaciones automáticas a todas las partes involucradas
- **Auditoría**: Se registra toda la información de desasignación para auditoría
- **Cache**: La desasignación se refleja inmediatamente en las consultas de pacientes
