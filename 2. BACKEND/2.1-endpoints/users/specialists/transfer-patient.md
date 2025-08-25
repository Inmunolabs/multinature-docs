# PATCH /specialists/transfer

## Descripción funcional

Transfiere un paciente de un especialista a otro. Permite reasignar pacientes entre especialistas del sistema, manteniendo el historial médico y las configuraciones del paciente.

## Autorización

Requiere token Bearer válido. Solo especialistas autorizados pueden transferir pacientes.

## Parámetros de ruta

No aplica

## Query parameters

No aplica

## Body del request

```json
{
  "patientId": "patient123-e89b-12d3-a456-426614174000",
  "currentSpecialistId": "specialist123-e89b-12d3-a456-426614174000",
  "newSpecialistId": "specialist456-e89b-12d3-a456-426614174000",
  "transferReason": "cambio_especialidad",
  "transferNotes": "Paciente requiere atención en endocrinología",
  "effectiveDate": "2024-01-20",
  "transferType": "permanent",
  "maintainHistory": true,
  "notifyPatient": true,
  "notifySpecialists": true
}
```

## Ejemplo de respuesta exitosa (200 OK)

```json
{
  "awsRequestId": "456e7890-e89b-12d3-a456-426614174000",
  "message": "Paciente transferido exitosamente",
  "data": {
    "transferId": "transfer789-e89b-12d3-a456-426614174000",
    "patientId": "patient123-e89b-12d3-a456-426614174000",
    "patientName": "María González",
    "currentSpecialistId": "specialist123-e89b-12d3-a456-426614174000",
    "currentSpecialistName": "Dr. Carlos López",
    "newSpecialistId": "specialist456-e89b-12d3-a456-426614174000",
    "newSpecialistName": "Dr. Ana Martínez",
    "transferReason": "cambio_especialidad",
    "transferNotes": "Paciente requiere atención en endocrinología",
    "effectiveDate": "2024-01-20",
    "transferType": "permanent",
    "maintainHistory": true,
    "status": "completed",
    "transferDate": "2024-01-15T14:30:00.000Z",
    "notifications": {
      "patientNotified": true,
      "currentSpecialistNotified": true,
      "newSpecialistNotified": true
    },
    "history": {
      "consultationsTransferred": 15,
      "prescriptionsTransferred": 8,
      "labResultsTransferred": 12,
      "notesTransferred": 25
    }
  }
}
```

## Códigos de estado y errores

| Código | Descripción | Causa común |
|--------|-------------|-------------|
| 200 | OK | Paciente transferido exitosamente |
| 400 | Bad Request | Datos de transferencia inválidos |
| 401 | Unauthorized | Token faltante o inválido |
| 403 | Forbidden | Sin permisos para transferir pacientes |
| 404 | Not Found | Paciente o especialista no encontrado |
| 409 | Conflict | Paciente ya asignado al especialista destino |
| 500 | Internal Server Error | Error del servidor |

## Notas útiles para el frontend

- **Validación de especialistas**: Ambos especialistas deben existir y estar activos en el sistema
- **Fecha efectiva**: La transferencia puede programarse para una fecha futura
- **Tipo de transferencia**: `permanent` o `temporary` - afecta el comportamiento del sistema
- **Historial**: Por defecto se mantiene todo el historial médico del paciente
- **Notificaciones**: Se pueden configurar qué notificaciones enviar durante la transferencia
- **Estado**: Verifica el estado de la transferencia antes de proceder con operaciones del paciente

## Consideraciones técnicas

- **Validación**: Se aplican validaciones de `assignedSpecialist` y `transferPatientValidation`
- **Transaccional**: La transferencia es atómica - si falla una parte, se revierte todo
- **Historial**: Se mantiene la integridad referencial de todos los datos del paciente
- **Notificaciones**: Se envían notificaciones automáticas a todas las partes involucradas
- **Auditoría**: Se registra toda la información de la transferencia para auditoría
- **Conflictos**: Se valida que no haya conflictos de horarios o especialidades
