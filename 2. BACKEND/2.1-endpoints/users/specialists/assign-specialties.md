# PATCH /specialists/specialties

## Descripción funcional

Asigna o actualiza las especialidades y subespecialidades de un especialista. Permite configurar las áreas de expertise del especialista para que los pacientes puedan encontrarlo según sus necesidades médicas.

## Autorización

Requiere token Bearer válido. Solo especialistas autorizados pueden modificar sus especialidades.

## Parámetros de ruta

No aplica

## Query parameters

No aplica

## Body del request

```json
{
  "specialistId": "specialist123-e89b-12d3-a456-426614174000",
  "specialties": [
    {
      "specialty": "nutricion",
      "subspecialties": ["diabetes", "obesidad", "nutricion_clinica"],
      "certification": "certificado_nutricion",
      "experienceYears": 8,
      "isPrimary": true
    },
    {
      "specialty": "endocrinologia",
      "subspecialties": ["diabetes", "tiroides", "metabolismo"],
      "certification": "certificado_endocrinologia",
      "experienceYears": 5,
      "isPrimary": false
    },
    {
      "specialty": "medicina_interna",
      "subspecialties": ["medicina_general"],
      "certification": "certificado_medicina_interna",
      "experienceYears": 10,
      "isPrimary": false
    }
  ],
  "updateType": "replace",
  "validateCertifications": true,
  "notifyAdmin": false
}
```

## Ejemplo de respuesta exitosa (200 OK)

```json
{
  "awsRequestId": "456e7890-e89b-12d3-a456-426614174000",
  "message": "Especialidades asignadas exitosamente",
  "data": {
    "specialistId": "specialist123-e89b-12d3-a456-426614174000",
    "specialistName": "Dr. Carlos López",
    "specialties": [
      {
        "specialty": "nutricion",
        "specialtyName": "Nutrición",
        "subspecialties": [
          {
            "subspecialty": "diabetes",
            "subspecialtyName": "Diabetes",
            "isActive": true
          },
          {
            "subspecialty": "obesidad",
            "subspecialtyName": "Obesidad",
            "isActive": true
          },
          {
            "subspecialty": "nutricion_clinica",
            "subspecialtyName": "Nutrición Clínica",
            "isActive": true
          }
        ],
        "certification": "certificado_nutricion",
        "certificationStatus": "validated",
        "experienceYears": 8,
        "isPrimary": true,
        "assignedDate": "2024-01-15T14:30:00.000Z"
      },
      {
        "specialty": "endocrinologia",
        "specialtyName": "Endocrinología",
        "subspecialties": [
          {
            "subspecialty": "diabetes",
            "subspecialtyName": "Diabetes",
            "isActive": true
          },
          {
            "subspecialty": "tiroides",
            "subspecialtyName": "Tiroides",
            "isActive": true
          },
          {
            "subspecialty": "metabolismo",
            "subspecialtyName": "Metabolismo",
            "isActive": true
          }
        ],
        "certification": "certificado_endocrinologia",
        "certificationStatus": "pending",
        "experienceYears": 5,
        "isPrimary": false,
        "assignedDate": "2024-01-15T14:30:00.000Z"
      },
      {
        "specialty": "medicina_interna",
        "specialtyName": "Medicina Interna",
        "subspecialties": [
          {
            "subspecialty": "medicina_general",
            "subspecialtyName": "Medicina General",
            "isActive": true
          }
        ],
        "certification": "certificado_medicina_interna",
        "certificationStatus": "validated",
        "experienceYears": 10,
        "isPrimary": false,
        "assignedDate": "2024-01-15T14:30:00.000Z"
      }
    ],
    "summary": {
      "totalSpecialties": 3,
      "totalSubspecialties": 8,
      "primarySpecialty": "nutricion",
      "validatedCertifications": 2,
      "pendingCertifications": 1
    },
    "lastUpdated": "2024-01-15T14:30:00.000Z"
  }
}
```

## Códigos de estado y errores

| Código | Descripción | Causa común |
|--------|-------------|-------------|
| 200 | OK | Especialidades asignadas exitosamente |
| 400 | Bad Request | Datos de especialidades inválidos |
| 401 | Unauthorized | Token faltante o inválido |
| 403 | Forbidden | Sin permisos para asignar especialidades |
| 404 | Not Found | Especialista no encontrado |
| 409 | Conflict | Especialidad ya asignada o conflicto de certificaciones |
| 500 | Internal Server Error | Error del servidor |

## Notas útiles para el frontend

- **Validación de especialidades**: Las especialidades y subespecialidades deben existir en el sistema
- **Certificaciones**: Algunas especialidades requieren certificaciones validadas
- **Especialidad primaria**: Solo puede haber una especialidad marcada como `isPrimary: true`
- **Tipo de actualización**: `replace` sobrescribe todas las especialidades, `add` agrega nuevas
- **Años de experiencia**: Se valida que sean números positivos
- **Estado de certificación**: `pending`, `validated`, `rejected` - afecta la visibilidad del especialista

## Consideraciones técnicas

- **Validación**: Se aplican validaciones de `assignSpecialtiesValidation` y `validateSpecialtiesAssignment`
- **Transaccional**: La asignación es atómica - si falla una parte, se revierte todo
- **Certificaciones**: Se valida la existencia y estado de las certificaciones antes de asignar
- **Conflictos**: Se verifica que no haya conflictos entre especialidades incompatibles
- **Auditoría**: Se registra toda la información de asignación para auditoría
- **Cache**: Las especialidades se actualizan en tiempo real en las búsquedas de especialistas
