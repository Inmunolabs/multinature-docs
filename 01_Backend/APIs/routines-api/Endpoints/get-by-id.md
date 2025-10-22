# GET /routines/:id

## Descripción funcional

Obtiene una rutina específica por su ID. Solo permite acceso a usuarios que sean propietarios de la rutina o al especialista que la creó. La rutina incluye todos los ejercicios organizados por días de la semana con su orden y repeticiones.

## Autorización

Requiere token Bearer válido. Solo el propietario de la rutina o el especialista que la creó pueden acceder.

## Parámetros de ruta

- `id` (UUID, requerido): ID único de la rutina

### Ejemplo
```
GET /routines/789e0123-e89b-12d3-a456-426614174000
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
  "data": {
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
        },
        {
          "id": "exercise456-e89b-12d3-a456-426614174000",
          "title": "Flexiones de brazos",
          "description": "Flexiones modificadas para principiantes",
          "repetitions": 8,
          "index": 2
        }
      ],
      "martes": [
        {
          "id": "exercise789-e89b-12d3-a456-426614174000",
          "title": "Plancha",
          "description": "Plancha isométrica para core",
          "repetitions": 30,
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
}
```

## Códigos de estado y errores

| Código | Significado           | Descripción                      |
| ------ | --------------------- | -------------------------------- |
| 200    | OK                    | Rutina encontrada exitosamente   |
| 200    | OK                    | Rutina no encontrada (con mensaje específico) |
| 400    | Bad Request           | ID de rutina inválido            |
| 401    | Unauthorized          | Token faltante o inválido        |
| 500    | Internal Server Error | Error del servidor               |

## Notas útiles para el frontend

- **Acceso restringido:** Solo mostrar rutinas propias o creadas por el especialista
- **Organización por días:** Usar `exercises` para mostrar ejercicios por día de la semana
- **Orden de ejercicios:** Usar `index` para mostrar ejercicios en secuencia correcta
- **Repeticiones:** Mostrar número de repeticiones para cada ejercicio
- **Días vacíos:** Algunos días pueden no tener ejercicios asignados
- **Notas del especialista:** Mostrar comentarios en sección de información

## Consideraciones técnicas

- **Middleware:** Aplica `authorize`, `idPathParam` y `getRoutineByIdPathParam`
- **Validaciones:** Verifica que la rutina exista y que el usuario tenga acceso
- **Propiedad:** Solo propietario o especialista creador pueden acceder
- **DTO:** Transformación usando `routineToDTO`
- **Ejercicios:** Organizados por días de la semana con orden y repeticiones
- **Seguridad:** Validación estricta de propiedad de la rutina
- **Base de datos:** Consulta a `RoutinesQueries.getById`
