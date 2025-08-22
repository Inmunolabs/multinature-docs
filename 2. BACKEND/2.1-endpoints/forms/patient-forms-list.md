# GET /forms/:id

## Descripción funcional

Obtiene la lista de formularios completados por un paciente específico, filtrados por fechas. Permite consultar el historial de respuestas a formularios de un paciente, incluyendo todas las respuestas con sus valores, unidades y observaciones. Útil para seguimiento médico y análisis de progreso.

## Autorización

Requiere token Bearer válido. Solo especialistas autorizados pueden consultar formularios de sus pacientes.

## Parámetros de ruta

- `id` (UUID, requerido): ID único del paciente

### Ejemplo
```
GET /forms/123e4567-e89b-12d3-a456-426614174000
```

## Query parameters

- `startDate` (string, opcional): Fecha de inicio para filtrar (formato: YYYY-MM-DD)
- `endDate` (string, opcional): Fecha de fin para filtrar (formato: YYYY-MM-DD)
- `page` (number, opcional): Número de página para paginación (por defecto: 1)
- `limit` (number, opcional): Número de elementos por página (por defecto: 10)

### Ejemplo
```
GET /forms/123e4567-e89b-12d3-a456-426614174000?startDate=2024-01-01&endDate=2024-12-31&page=1&limit=20
```

## Body del request

No aplica

## Ejemplo de respuesta exitosa (200 OK)

```json
{
  "awsRequestId": "456e7890-e89b-12d3-a456-426614174000",
  "message": "Formularios encontrados",
  "data": [
    {
      "id": "789e0123-e89b-12d3-a456-426614174000",
      "bookingId": "abc123-e89b-12d3-a456-426614174000",
      "formTemplateId": "def456-e89b-12d3-a456-426614174000",
      "specialistId": "ghi789-e89b-12d3-a456-426614174000",
      "userId": "123e4567-e89b-12d3-a456-426614174000",
      "answers": [
        {
          "conceptName": "Presión arterial sistólica",
          "unit": "mmHg",
          "observation": "Medida en reposo",
          "value": "120",
          "isGraphable": true
        },
        {
          "conceptName": "Frecuencia cardíaca",
          "unit": "latidos/min",
          "observation": "En reposo",
          "value": "72",
          "isGraphable": true
        },
        {
          "conceptName": "Historial familiar",
          "unit": "",
          "observation": "Padre con hipertensión",
          "value": "Sí",
          "isGraphable": false
        }
      ],
      "updated": "2024-01-15T10:30:00Z",
      "created": "2024-01-15T10:30:00Z"
    }
  ],
  "meta": {
    "total": 1,
    "page": 1,
    "limit": 10,
    "totalPages": 1
  }
}
```

## Códigos de estado y errores

| Código | Significado | Descripción |
|--------|-------------|-------------|
| 200 | OK | Formularios obtenidos exitosamente |
| 400 | Bad Request | Parámetros de fecha inválidos |
| 401 | Unauthorized | Token faltante o inválido |
| 403 | Forbidden | Sin permisos para consultar formularios de este paciente |
| 404 | Not Found | Paciente no encontrado |
| 500 | Internal Server Error | Error del servidor |

## Notas útiles para el frontend

- **Filtros de fecha:** Permite filtrar por rangos de fechas específicos
- **Paginación:** Implementa paginación para listas largas de formularios
- **Respuestas detalladas:** Incluye valores, unidades y observaciones
- **Graficabilidad:** Identifica respuestas que pueden mostrarse en gráficos
- **Historial completo:** Muestra todos los formularios completados del paciente
- **Fechas de creación:** Incluye fechas de creación y última actualización
- **Asociación a citas:** Los formularios están vinculados a citas específicas
- **Validación de permisos:** Solo especialistas pueden ver formularios de sus pacientes

## Consideraciones técnicas

- **Middleware:** Aplica `userBelongsToSpecialist` para validar permisos
- **Validaciones:** Usa `idPathParam`, `queryDates` y `validateDateFilter`
- **Filtros:** Fecha por defecto: año actual si no se especifica
- **Paginación:** Implementa paginación estándar con metadata
- **Base de datos:** Consulta usando `getFormAnswersByUserId`
- **DTO:** Usa `filledFormToDTO` para transformar la respuesta
- **Permisos:** Verifica que el especialista tenga acceso al paciente
- **Performance:** Optimizado para consultas con filtros de fecha

