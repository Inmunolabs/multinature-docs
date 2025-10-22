# GET /routines/exercise/

## Descripción funcional

Lista todos los ejercicios creados por el especialista autenticado. Permite a los especialistas ver su biblioteca de ejercicios disponibles para crear rutinas personalizadas.

## Autorización

Requiere token Bearer válido. Solo especialistas pueden ver sus ejercicios creados.

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
  "message": "Ejercicios encontrados.",
  "data": [
    {
      "id": "exercise123-e89b-12d3-a456-426614174000",
      "specialistId": "specialist456-e89b-12d3-a456-426614174000",
      "title": "Sentadillas",
      "description": "Sentadillas básicas para fortalecer piernas y glúteos"
    },
    {
      "id": "exercise456-e89b-12d3-a456-426614174000",
      "specialistId": "specialist456-e89b-12d3-a456-426614174000",
      "title": "Flexiones de brazos",
      "description": "Flexiones modificadas para principiantes, apoyando rodillas"
    },
    {
      "id": "exercise789-e89b-12d3-a456-426614174000",
      "specialistId": "specialist456-e89b-12d3-a456-426614174000",
      "title": "Plancha",
      "description": "Plancha isométrica para fortalecer el core y estabilidad"
    },
    {
      "id": "exercise012-e89b-12d3-a456-426614174000",
      "specialistId": "specialist456-e89b-12d3-a456-426614174000",
      "title": "Burpees",
      "description": "Ejercicio completo de cardio que combina sentadilla, flexión y salto"
    }
  ]
}
```

## Códigos de estado y errores

| Código | Significado           | Descripción                      |
| ------ | --------------------- | -------------------------------- |
| 200    | OK                    | Ejercicios encontrados exitosamente |
| 200    | OK                    | Lista vacía si no hay ejercicios (con mensaje "Ejercicios no encontrados") |
| 401    | Unauthorized          | Token faltante o inválido        |
| 500    | Internal Server Error | Error del servidor               |

## Notas útiles para el frontend

- **Biblioteca personal:** Cada especialista tiene su propia biblioteca de ejercicios
- **Creación de rutinas:** Usar estos ejercicios para crear rutinas personalizadas
- **Títulos descriptivos:** Mostrar títulos claros para identificación rápida
- **Descripciones detalladas:** Usar descripciones para explicar la técnica del ejercicio
- **Sin paginación:** Todos los ejercicios se retornan en una sola respuesta
- **Orden:** Los ejercicios se muestran en el orden almacenado en la base de datos

## Consideraciones técnicas

- **Middleware:** Aplica `authorize` para autenticación
- **Base de datos:** Consulta a `RoutinesQueries.listExercisesBySpecialistId`
- **DTO:** Transformación usando `exerciseToDTO`
- **Especialista:** Identifica automáticamente al especialista desde el token
- **Seguridad:** Solo especialistas pueden ver sus propios ejercicios
- **Performance:** Consulta optimizada sin paginación
- **Estructura:** Respuesta directa de la base de datos transformada por DTO
