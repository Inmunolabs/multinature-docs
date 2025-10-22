# GET /routines/user/:id

## Descripción funcional

Obtiene todas las rutinas asignadas a un usuario específico. Permite a los usuarios ver sus rutinas de ejercicios y a los especialistas ver las rutinas que han creado para sus pacientes.

## Autorización

Requiere token Bearer válido. Los usuarios pueden ver sus propias rutinas, los especialistas pueden ver las rutinas que crearon para sus pacientes.

## Parámetros de ruta

- `id` (UUID, requerido): ID único del usuario

### Ejemplo
```
GET /routines/user/user789-e89b-12d3-a456-426614174000
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
      "specialistId": "specialist789-e89b-12d3-a456-426614174000",
      "userId": "user789-e89b-12d3-a456-426614174000",
      "notes": "Rutina de cardio y resistencia",
      "exercises": {
        "lunes": [],
        "martes": [
          {
            "id": "exercise456-e89b-12d3-a456-426614174000",
            "title": "Burpees",
            "description": "Ejercicio completo de cardio",
            "repetitions": 15,
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
| 400    | Bad Request           | ID de usuario inválido           |
| 401    | Unauthorized          | Token faltante o inválido        |
| 500    | Internal Server Error | Error del servidor               |

## Notas útiles para el frontend

- **Múltiples rutinas:** Un usuario puede tener varias rutinas de diferentes especialistas
- **Organización por días:** Cada rutina tiene ejercicios organizados por días de la semana
- **Especialistas:** Mostrar información del especialista que creó cada rutina
- **Notas:** Mostrar comentarios del especialista para cada rutina
- **Días vacíos:** Algunos días pueden no tener ejercicios asignados
- **Orden de ejercicios:** Usar `index` para mostrar ejercicios en secuencia correcta

## Consideraciones técnicas

- **Middleware:** Aplica `authorize` e `idPathParam`
- **Base de datos:** Consulta a `RoutinesQueries.listByUserId`
- **DTO:** Transformación usando `itemsToDTO` y `routineToDTO`
- **Múltiples rutinas:** Retorna array de todas las rutinas del usuario
- **Seguridad:** Usuarios solo pueden ver sus propias rutinas
- **Performance:** Consulta optimizada para obtener todas las rutinas del usuario
