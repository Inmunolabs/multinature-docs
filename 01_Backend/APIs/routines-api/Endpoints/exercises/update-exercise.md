# PATCH /routines/exercise/:id

## Descripción funcional

Actualiza un ejercicio existente. Solo el especialista que creó el ejercicio o un administrador pueden modificarlo. Permite actualizar tanto el título como la descripción del ejercicio.

## Autorización

Requiere token Bearer válido. Solo el propietario del ejercicio o administradores pueden actualizarlo.

## Parámetros de ruta

- `id` (UUID, requerido): ID único del ejercicio a actualizar

### Ejemplo
```
PATCH /routines/exercise/exercise123-e89b-12d3-a456-426614174000
```

## Query parameters

No aplica

## Body del request

```json
{
  "title": "Sentadillas con peso corporal",
  "description": "Sentadillas básicas para fortalecer piernas y glúteos. Mantener la espalda recta y bajar hasta que los muslos estén paralelos al suelo."
}
```

### Campos opcionales (actualizar solo los que se deseen cambiar)
- `title` (string): Nuevo título o nombre del ejercicio
- `description` (string): Nueva descripción detallada del ejercicio

### Validaciones
- `title`: Debe ser una cadena de texto válida
- `description`: Debe ser una cadena de texto válida

## Ejemplo de respuesta exitosa (200 OK)

```json
{
  "awsRequestId": "456e7890-e89b-12d3-a456-426614174000",
  "message": "Ejercicio actualizado.",
  "data": [
    {
      "id": "exercise123-e89b-12d3-a456-426614174000",
      "specialistId": "specialist456-e89b-12d3-a456-426614174000",
      "title": "Sentadillas con peso corporal",
      "description": "Sentadillas básicas para fortalecer piernas y glúteos. Mantener la espalda recta y bajar hasta que los muslos estén paralelos al suelo."
    },
    {
      "id": "exercise456-e89b-12d3-a456-426614174000",
      "specialistId": "specialist456-e89b-12d3-a456-426614174000",
      "title": "Flexiones de brazos",
      "description": "Flexiones modificadas para principiantes, apoyando rodillas"
    }
  ]
}
```

## Códigos de estado y errores

| Código | Significado           | Descripción                      |
| ------ | --------------------- | -------------------------------- |
| 200    | OK                    | Ejercicio actualizado exitosamente |
| 400    | Bad Request           | ID de ejercicio inválido o datos incorrectos |
| 401    | Unauthorized          | Token faltante o inválido        |
| 403    | Forbidden             | Sin permisos para actualizar este ejercicio |
| 404    | Not Found             | Ejercicio no encontrado          |
| 500    | Internal Server Error | Error del servidor               |

## Notas útiles para el frontend

- **Propiedad:** Solo mostrar opción de editar para ejercicios propios
- **Admin:** Los administradores pueden editar cualquier ejercicio
- **Validaciones:** Implementar validaciones del lado del cliente
- **Confirmación:** Solicitar confirmación antes de actualizar
- **Feedback:** Mostrar mensaje de éxito o error según la respuesta
- **Respuesta completa:** Retorna lista actualizada de todos los ejercicios
- **Estado:** Deshabilitar edición para ejercicios no propios

## Consideraciones técnicas

- **Middleware:** Aplica `authorize`, `idPathParam`, `routinesValidations.updateExercise` y `ownExerciseValidation`
- **Validaciones:** Verifica que el ejercicio exista y que el usuario tenga permisos
- **Propiedad:** Solo el propietario del ejercicio puede editarlo
- **Admin:** Los administradores tienen acceso completo a todos los ejercicios
- **Base de datos:** Actualiza en `RoutinesQueries.updateExercise`
- **Respuesta:** Retorna lista completa actualizada usando `listExercises`
- **Seguridad:** Validación estricta de propiedad del ejercicio
- **DTO:** Transformación automática usando `exerciseToDTO`
