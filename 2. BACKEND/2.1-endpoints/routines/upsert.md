# POST /routines

## Descripción funcional

Crea o actualiza una rutina de ejercicios. Este endpoint implementa lógica de upsert inteligente que determina automáticamente si debe crear una nueva rutina o actualizar una existente. Si la rutina existe y fue creada hace más de 6 días, se crea automáticamente un snapshot histórico antes de actualizar.

## Autorización

Requiere token Bearer válido. Solo especialistas pueden crear/actualizar rutinas para sus pacientes.

## Parámetros de ruta

No aplica

## Query parameters

No aplica

## Body del request

```json
{
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
    "martes": [
      {
        "id": "exercise456-e89b-12d3-a456-426614174000",
        "title": "Flexiones de brazos",
        "description": "Flexiones modificadas para principiantes",
        "repetitions": 8,
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
```

### Campos requeridos
- `userId` (UUID): ID del usuario (paciente) para quien se crea la rutina
- `exercises` (object): Objeto con ejercicios organizados por días de la semana

### Campos opcionales
- `notes` (string): Comentarios o notas del especialista sobre la rutina

### Estructura de ejercicios
- **Días de la semana:** lunes, martes, miércoles, jueves, viernes, sábado, domingo
- **Ejercicios por día:** Array de ejercicios con:
  - `id` (UUID): ID del ejercicio existente
  - `title` (string): Título del ejercicio
  - `description` (string): Descripción del ejercicio
  - `repetitions` (number): Número de repeticiones
  - `index` (number): Orden del ejercicio en el día

## Ejemplo de respuesta exitosa (200 OK)

```json
{
  "awsRequestId": "456e7890-e89b-12d3-a456-426614174000",
  "message": "Rutina creada.",
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
        }
      ],
      "martes": [
        {
          "id": "exercise456-e89b-12d3-a456-426614174000",
          "title": "Flexiones de brazos",
          "description": "Flexiones modificadas para principiantes",
          "repetitions": 8,
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
| 200    | OK                    | Rutina creada o actualizada exitosamente |
| 400    | Bad Request           | Datos de la rutina inválidos     |
| 401    | Unauthorized          | Token faltante o inválido        |
| 403    | Forbidden             | Sin permisos para crear rutinas para este usuario |
| 500    | Internal Server Error | Error del servidor               |

## Notas útiles para el frontend

- **Upsert inteligente:** Un solo endpoint maneja creación y actualización
- **Historial automático:** Se crean snapshots automáticamente para rutinas antiguas
- **Relación especialista-paciente:** Verifica que el especialista tenga relación con el paciente
- **Ejercicios existentes:** Los ejercicios deben existir previamente en el sistema
- **Organización por días:** Estructura clara de ejercicios por día de la semana
- **Orden de ejercicios:** Usar `index` para controlar secuencia de ejercicios
- **Días vacíos:** Algunos días pueden no tener ejercicios asignados

## Consideraciones técnicas

- **Middleware:** Aplica `authorize`, `routinesValidations.upsert` y `userBelongsToSpecialist`
- **Validaciones:** Verifica relación especialista-paciente antes de crear/actualizar
- **Lógica de upsert:** Determina automáticamente si crear o actualizar
- **Snapshots:** Crea versiones históricas para rutinas modificadas después de 6 días
- **Entidades:** Usa `Routine.createEntity` y `RoutineExercise.createEntity`
- **Base de datos:** Operaciones en `RoutinesQueries` y `RoutineExercise`
- **DTO:** Transformación usando `routineToDTO`
- **Historial:** Sistema automático de versionado para auditoría
