# GET /routines/specialist/:id

## Descripción funcional

Obtiene todas las rutinas creadas por un especialista específico. Permite a los especialistas ver todas las rutinas que han diseñado para sus pacientes.

## Autorización

Requiere token Bearer válido. Los especialistas pueden ver sus propias rutinas creadas.

## Parámetros de ruta

- `id` (UUID, requerido): ID único del especialista

### Ejemplo
```
GET /routines/specialist/specialist456-e89b-12d3-a456-426614174000
```

## Query parameters

No aplica

## Body del request

No aplica

## Ejemplo de respuesta exitosa (200 OK)

```json
{
  "awsRequestId": "456e7890-e89b-12d3-a456-426614174000",
  "message": "Rutina encontrada.",
  "data": [
    {
      "id": "789e0123-e89b-12d3-a456-426614174000",
      "specialistId": "specialist456-e89b-12d3-a456-426614174000",
      "userId": "user789-e89b-12d3-a456-426614174000",
      "notes": "Rutina de fortalecimiento muscular para principiantes",
      "exercises": {
        "lunes": [
          {
            "id": "exercise123-e89b-12d3-a456-426614174000",
            "title": "Sentadillas",
            "description": "Sentadillas básicas para fortalecer piernas",
            "repetitions": 10,
            "index": 1
          }
        ],
        "martes": [],
        "miércoles": [],
        "jueves": [],
        "viernes": [],
        "sábado": [],
        "domingo": []
      }
    },
    {
      "id": "def456-e89b-12d3-a456-426614174000",
      "specialistId": "specialist456-e89b-12d3-a456-426614174000",
      "userId": "user123-e89b-12d3-a456-426614174000",
      "notes": "Rutina de rehabilitación post-lesión",
      "exercises": {
        "lunes": [],
        "martes": [
          {
            "id": "exercise456-e89b-12d3-a456-426614174000",
            "title": "Estiramientos suaves",
            "description": "Estiramientos para recuperación muscular",
            "repetitions": 5,
            "index": 1
          }
        ],
        "miércoles": [],
        "jueves": [],
        "viernes": [],
        "sábado": [],
        "domingo": []
      }
    }
  ]
}
```

## Códigos de estado y errores

| Código | Significado           | Descripción                      |
| ------ | --------------------- | -------------------------------- |
| 200    | OK                    | Rutinas encontradas exitosamente |
| 200    | OK                    | Lista vacía si no hay rutinas (con mensaje "Rutina no encontrada") |
| 400    | Bad Request           | ID de especialista inválido      |
| 401    | Unauthorized          | Token faltante o inválido        |
| 500    | Internal Server Error | Error del servidor               |

## Notas útiles para el frontend

- **Múltiples pacientes:** Un especialista puede tener rutinas para varios pacientes
- **Organización por días:** Cada rutina tiene ejercicios organizados por días de la semana
- **Pacientes:** Mostrar información del paciente asignado a cada rutina
- **Notas:** Mostrar comentarios del especialista para cada rutina
- **Días vacíos:** Algunos días pueden no tener ejercicios asignados
- **Orden de ejercicios:** Usar `index` para mostrar ejercicios en secuencia correcta

## Consideraciones técnicas

- **Middleware:** Aplica `authorize` e `idPathParam`
- **Base de datos:** Consulta a `RoutinesQueries.listBySpecialistId`
- **DTO:** Transformación usando `itemsToDTO` y `routineToDTO`
- **Múltiples rutinas:** Retorna array de todas las rutinas del especialista
- **Seguridad:** Especialistas solo pueden ver sus propias rutinas creadas
- **Performance:** Consulta optimizada para obtener todas las rutinas del especialista
