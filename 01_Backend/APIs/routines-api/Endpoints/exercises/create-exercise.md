# POST /routines/exercise

## Descripción funcional

Crea un nuevo ejercicio personalizado. Solo los especialistas pueden crear ejercicios, y estos se asocian automáticamente al especialista autenticado. Después de crear el ejercicio, retorna la lista completa actualizada de ejercicios del especialista.

## Autorización

Requiere token Bearer válido. Solo especialistas pueden crear ejercicios.

## Parámetros de ruta

No aplica

## Query parameters

No aplica

## Body del request

```json
{
  "title": "Sentadillas con peso",
  "description": "Sentadillas con mancuernas para aumentar la intensidad del ejercicio"
}
```

### Campos requeridos
- `title` (string): Título o nombre del ejercicio
- `description` (string): Descripción detallada del ejercicio y técnica

### Validaciones
- `title`: Debe ser una cadena de texto válida
- `description`: Debe ser una cadena de texto válida

## Ejemplo de respuesta exitosa (201 Created)

```json
{
  "awsRequestId": "456e7890-e89b-12d3-a456-426614174000",
  "message": "Ejercicio creado.",
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
      "title": "Sentadillas con peso",
      "description": "Sentadillas con mancuernas para aumentar la intensidad del ejercicio"
    }
  ]
}
```

## Códigos de estado y errores

| Código | Significado           | Descripción                      |
| ------ | --------------------- | -------------------------------- |
| 201    | Created               | Ejercicio creado exitosamente    |
| 400    | Bad Request           | Datos del ejercicio inválidos    |
| 401    | Unauthorized          | Token faltante o inválido        |
| 500    | Internal Server Error | Error del servidor               |

## Notas útiles para el frontend

- **Solo especialistas:** Ocultar este endpoint para usuarios regulares
- **Títulos descriptivos:** Usar títulos claros y específicos para identificar ejercicios
- **Descripciones detalladas:** Incluir técnica, músculos trabajados y variaciones
- **Respuesta completa:** Retorna lista actualizada de todos los ejercicios del especialista
- **Validaciones:** Implementar validaciones del lado del cliente antes de enviar
- **Feedback:** Mostrar mensaje de éxito después de crear el ejercicio

## Consideraciones técnicas

- **Middleware:** Aplica `authorize` y `routinesValidations.createExercise`
- **Validaciones:** Verificación de datos del ejercicio antes de crear
- **Entidad:** Crea entidad Exercise usando `Exercise.createEntity`
- **Especialista:** Asocia automáticamente el ejercicio al especialista autenticado
- **Base de datos:** Inserta en `RoutinesQueries.addExercise`
- **Respuesta:** Retorna lista completa actualizada usando `listExercises`
- **DTO:** Transformación automática usando `exerciseToDTO`
- **Seguridad:** Solo especialistas pueden crear ejercicios
