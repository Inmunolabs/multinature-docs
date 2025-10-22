# POST /teamworks

## Descripción funcional

Crea un nuevo equipo de trabajo (teamwork) en el sistema. Permite a especialistas autorizados formar equipos multidisciplinarios para el tratamiento integral de pacientes con necesidades médicas específicas.

## Autorización

Requiere token Bearer válido. Solo especialistas autorizados pueden crear equipos de trabajo.

## Parámetros de ruta

No aplica

## Query parameters

No aplica

## Body del request

```json
{
  "name": "Equipo Nutrición y Diabetes",
  "description": "Equipo especializado en el tratamiento integral de pacientes con diabetes tipo 1 y 2, enfocado en nutrición, ejercicio y control metabólico",
  "specialty": "nutricion",
  "subspecialty": "diabetes",
  "leadSpecialistId": "specialist123-e89b-12d3-a456-426614174000",
  "members": [
    {
      "specialistId": "specialist123-e89b-12d3-a456-426614174000",
      "role": "team_leader",
      "permissions": ["manage_team", "add_members", "remove_members", "view_patients", "edit_patients"]
    },
    {
      "specialistId": "specialist456-e89b-12d3-a456-426614174000",
      "role": "specialist",
      "permissions": ["view_patients", "edit_patients", "view_team"]
    },
    {
      "specialistId": "specialist789-e89b-12d3-a456-426614174000",
      "role": "assistant",
      "permissions": ["view_patients", "view_team"]
    }
  ],
  "services": [
    "consulta_nutricional",
    "plan_alimentacion",
    "seguimiento_diabetico",
    "educacion_paciente",
    "grupo_apoyo"
  ],
  "locations": [
    {
      "name": "Consultorio Principal",
      "address": "Av. Principal 123, Ciudad",
      "coordinates": {
        "latitude": -33.4489,
        "longitude": -70.6693
      },
      "isPrimary": true
    },
    {
      "name": "Centro de Diabetes",
      "address": "Calle Secundaria 456, Ciudad",
      "coordinates": {
        "latitude": -33.4500,
        "longitude": -70.6700
      },
      "isPrimary": false
    }
  ],
  "schedule": {
    "workingDays": ["monday", "tuesday", "wednesday", "thursday", "friday"],
    "workingHours": "08:00 - 18:00",
    "emergencyAvailable": true,
    "weekendConsultations": false,
    "holidaySchedule": "by_appointment"
  },
  "contact": {
    "phone": "+56912345678",
    "email": "equipo.nutricion@clinica.com",
    "website": "https://clinica.com/equipo-nutricion",
    "whatsapp": "+56987654321"
  },
  "settings": {
    "autoAssignPatients": true,
    "requireApprovalForNewMembers": true,
    "allowPatientTransfers": true,
    "notificationPreferences": {
      "email": true,
      "sms": false,
      "whatsapp": true,
      "inApp": true
    }
  },
  "metadata": {
    "tags": ["diabetes", "nutricion", "ejercicio", "control_metabolico"],
    "targetAudience": ["adultos", "adolescentes", "diabeticos_tipo1", "diabeticos_tipo2"],
    "specialRequirements": ["monitoreo_glucosa", "plan_alimentacion_personalizado"]
  }
}
```

## Ejemplo de respuesta exitosa (201 Created)

```json
{
  "awsRequestId": "456e7890-e89b-12d3-a456-426614174000",
  "message": "Equipo de trabajo creado exitosamente",
  "data": {
    "teamworkId": "teamwork789-e89b-12d3-a456-426614174000",
    "name": "Equipo Nutrición y Diabetes",
    "description": "Equipo especializado en el tratamiento integral de pacientes con diabetes tipo 1 y 2, enfocado en nutrición, ejercicio y control metabólico",
    "specialty": "nutricion",
    "subspecialty": "diabetes",
    "status": "active",
    "createdAt": "2024-01-15T14:30:00.000Z",
    "updatedAt": "2024-01-15T14:30:00.000Z",
    "leadSpecialist": {
      "id": "specialist123-e89b-12d3-a456-426614174000",
      "name": "Dr. Carlos López",
      "email": "carlos.lopez@clinica.com",
      "specialty": "nutricion",
      "subspecialty": "diabetes",
      "role": "team_leader"
    },
    "members": [
      {
        "specialistId": "specialist123-e89b-12d3-a456-426614174000",
        "specialistName": "Dr. Carlos López",
        "specialistEmail": "carlos.lopez@clinica.com",
        "role": "team_leader",
        "permissions": ["manage_team", "add_members", "remove_members", "view_patients", "edit_patients"],
        "joinedAt": "2024-01-15T14:30:00.000Z",
        "status": "active"
      },
      {
        "specialistId": "specialist456-e89b-12d3-a456-426614174000",
        "specialistName": "Dra. Ana Martínez",
        "specialistEmail": "ana.martinez@clinica.com",
        "role": "specialist",
        "permissions": ["view_patients", "edit_patients", "view_team"],
        "joinedAt": "2024-01-15T14:30:00.000Z",
        "status": "active"
      },
      {
        "specialistId": "specialist789-e89b-12d3-a456-426614174000",
        "specialistName": "Lic. María González",
        "specialistEmail": "maria.gonzalez@clinica.com",
        "role": "assistant",
        "permissions": ["view_patients", "view_team"],
        "joinedAt": "2024-01-15T14:30:00.000Z",
        "status": "active"
      }
    ],
    "services": [
      "consulta_nutricional",
      "plan_alimentacion",
      "seguimiento_diabetico",
      "educacion_paciente",
      "grupo_apoyo"
    ],
    "locations": [
      {
        "locationId": "location123-e89b-12d3-a456-426614174000",
        "name": "Consultorio Principal",
        "address": "Av. Principal 123, Ciudad",
        "coordinates": {
          "latitude": -33.4489,
          "longitude": -70.6693
        },
        "isPrimary": true,
        "status": "active"
      },
      {
        "locationId": "location456-e89b-12d3-a456-426614174000",
        "name": "Centro de Diabetes",
        "address": "Calle Secundaria 456, Ciudad",
        "coordinates": {
          "latitude": -33.4500,
          "longitude": -70.6700
        },
        "isPrimary": false,
        "status": "active"
      }
    ],
    "schedule": {
      "workingDays": ["monday", "tuesday", "wednesday", "thursday", "friday"],
      "workingHours": "08:00 - 18:00",
      "emergencyAvailable": true,
      "weekendConsultations": false,
      "holidaySchedule": "by_appointment"
    },
    "contact": {
      "phone": "+56912345678",
      "email": "equipo.nutricion@clinica.com",
      "website": "https://clinica.com/equipo-nutricion",
      "whatsapp": "+56987654321"
    },
    "settings": {
      "autoAssignPatients": true,
      "requireApprovalForNewMembers": true,
      "allowPatientTransfers": true,
      "notificationPreferences": {
        "email": true,
        "sms": false,
        "whatsapp": true,
        "inApp": true
      }
    },
    "metadata": {
      "tags": ["diabetes", "nutricion", "ejercicio", "control_metabolico"],
      "targetAudience": ["adultos", "adolescentes", "diabeticos_tipo1", "diabeticos_tipo2"],
      "specialRequirements": ["monitoreo_glucosa", "plan_alimentacion_personalizado"]
    },
    "statistics": {
      "totalMembers": 3,
      "totalSpecialists": 2,
      "totalAssistants": 1,
      "totalPatients": 0,
      "totalConsultations": 0
    },
    "notifications": {
      "membersNotified": true,
      "adminNotified": true,
      "welcomeEmailsSent": 3
    }
  }
}
```

## Códigos de estado y errores

| Código | Descripción | Causa común |
|--------|-------------|-------------|
| 201 | Created | Equipo de trabajo creado exitosamente |
| 400 | Bad Request | Datos del equipo inválidos o incompletos |
| 401 | Unauthorized | Token faltante o inválido |
| 403 | Forbidden | Sin permisos para crear equipos de trabajo |
| 409 | Conflict | Nombre del equipo ya existe o especialista ya pertenece a otro equipo |
| 422 | Unprocessable Entity | Validación de datos fallida |
| 500 | Internal Server Error | Error del servidor |

## Notas útiles para el frontend

- **Validación de nombre**: El nombre del equipo debe ser único en el sistema
- **Especialista líder**: Solo puede haber un especialista líder por equipo
- **Permisos**: Los permisos se asignan automáticamente según el rol
- **Ubicaciones**: Al menos una ubicación debe marcarse como primaria
- **Horarios**: Los días laborables deben incluir al menos un día de la semana
- **Notificaciones**: Se envían automáticamente a todos los miembros del equipo
- **Configuración**: Las configuraciones afectan el comportamiento del equipo

## Consideraciones técnicas

- **Validación**: Se aplican validaciones de `teamworkNameValidation`
- **Transaccional**: La creación es atómica - si falla una parte, se revierte todo
- **Permisos**: Se asignan automáticamente según el rol del especialista
- **Notificaciones**: Se envían notificaciones automáticas a todos los miembros
- **Auditoría**: Se registra toda la información de creación para auditoría
- **Cache**: El equipo se crea inmediatamente y está disponible para consultas
