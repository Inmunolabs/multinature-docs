# GET /specialists

## Descripción funcional

Lista todos los especialistas disponibles en el sistema. Proporciona información básica de los especialistas incluyendo sus especialidades, configuraciones y estado de actividad. Permite a los usuarios explorar y seleccionar especialistas para sus consultas.

## Autorización

Requiere token Bearer válido. Solo usuarios autenticados pueden ver la lista de especialistas.

## Parámetros de ruta

No aplica

## Query parameters

No aplica

## Body del request

No aplica

## Ejemplo de respuesta exitosa (200 OK)

```json
{
  "awsRequestId": "456e7890-e89b-12d3-a456-426614174000",
  "message": "Especialistas encontrados exitosamente",
  "data": [
    {
      "id": "specialist789-e89b-12d3-a456-426614174000",
      "firstName": "María",
      "lastName": "García",
      "email": "maria.garcia@email.com",
      "phone": "+525598765432",
      "profile": "specialist",
      "specialties": ["Nutrición", "Endocrinología"],
      "subspecialties": ["Diabetes", "Obesidad"],
      "specialistSettings": {
        "consultationPrice": 500,
        "consultationDuration": 60,
        "isActive": true,
        "acceptsNewPatients": true
      },
      "clinics": [
        {
          "id": "clinic123-e89b-12d3-a456-426614174000",
          "name": "Clínica Nutricional",
          "address": "Av. Reforma 123, CDMX",
          "phone": "+525512345678"
        }
      ],
      "reviews": [
        {
          "id": "review456-e89b-12d3-a456-426614174000",
          "rating": 5,
          "review": "Excelente atención y profesionalismo",
          "urlImages": [],
          "subspecialtyIds": ["diabetes", "obesidad"]
        }
      ],
      "antiquity": "5 años, 1 mes",
      "isValid": true
    },
    {
      "id": "specialist456-e89b-12d3-a456-426614174000",
      "firstName": "Carlos",
      "lastName": "López",
      "email": "carlos.lopez@email.com",
      "phone": "+525598765433",
      "profile": "specialist",
      "specialties": ["Cardiología", "Medicina Interna"],
      "subspecialties": ["Hipertensión", "Arritmias"],
      "specialistSettings": {
        "consultationPrice": 800,
        "consultationDuration": 45,
        "isActive": true,
        "acceptsNewPatients": false
      },
      "clinics": [
        {
          "id": "clinic456-e89b-12d3-a456-426614174000",
          "name": "Centro Cardiológico",
          "address": "Av. Insurgentes 456, CDMX",
          "phone": "+525512345679"
        }
      ],
      "reviews": [],
      "antiquity": "3 años, 6 meses",
      "isValid": true
    }
  ]
}
```

## Códigos de estado y errores

| Código | Significado           | Descripción                      |
| ------ | --------------------- | -------------------------------- |
| 200    | OK                    | Especialistas encontrados exitosamente |
| 200    | OK                    | Lista vacía si no hay especialistas |
| 401    | Unauthorized          | Token faltante o inválido        |
| 500    | Internal Server Error | Error del servidor               |

## Notas útiles para el frontend

- **Exploración:** Usar para mostrar catálogo de especialistas disponibles
- **Filtros:** Implementar filtros por especialidad, ubicación o precio
- **Información detallada:** Mostrar especialidades, configuraciones y clínicas
- **Reseñas:** Visualizar calificaciones y comentarios de otros usuarios
- **Estado de actividad:** Usar `isActive` para mostrar especialistas disponibles
- **Nuevos pacientes:** Usar `acceptsNewPatients` para indicar disponibilidad
- **Precios:** Mostrar costos de consulta para planificación del usuario

## Consideraciones técnicas

- **Middleware:** Aplica `authorize` para autenticación
- **Base de datos:** Consulta optimizada para obtener especialistas activos
- **DTO:** Transformación usando `specialistsToDTO` con información completa
- **Relaciones:** Incluye especialidades, configuraciones, clínicas y reseñas
- **Performance:** Consulta optimizada para grandes volúmenes de especialistas
- **Seguridad:** Solo usuarios autenticados pueden acceder
- **Filtros:** Considerar implementar filtros por especialidad o ubicación
