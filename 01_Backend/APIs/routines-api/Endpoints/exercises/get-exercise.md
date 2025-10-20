# GET /routines/exercise/:id

## Descripción funcional

Obtiene un ejercicio específico por su ID. Solo permite acceso al especialista que creó el ejercicio o a administradores. Retorna información detallada del ejercicio incluyendo título y descripción.

## Autorización

Requiere token Bearer válido. Solo el especialista creador del ejercicio o administradores pueden acceder.

## Parámetros de ruta

- `id` (UUID, requerido): ID único del ejercicio

### Ejemplo
```
GET /routines/exercise/exercise123-e89b-12d3-a456-426614174000
```

## Query parameters

No aplica

## Body del request

No aplica

## Ejemplo de respuesta exitosa (200 OK)

```json
{
  "awsRequestId": "456e7890-e89b-12d3-a456-426614174000",
  "message": "Ejercicio encontrado.",
  "data": {
    "id": "exercise123-e89b-12d3-a456-426614174000",
    "specialistId": "specialist456-e89b-12d3-a456-426614174000",
    "title": "Sentadillas",
    "description": "Sentadillas básicas para fortalecer piernas y glúteos. Mantener la espalda recta y bajar hasta que los muslos estén paralelos al suelo."
  }
}
```

## Códigos de estado y errores

| Código | Significado           | Descripción                      |
| ------ | --------------------- | -------------------------------- |
| 200    | OK                    | Ejercicio encontrado exitosamente |
| 400    | Bad Request           | ID de ejercicio inválido         |
| 401    | Unauthorized          | Token faltante o inválido        |
| 403    | Forbidden             | Sin permisos para acceder a este ejercicio |
| 404    | Not Found             | Ejercicio no encontrado          |
| 500    | Internal Server Error | Error del servidor               |

## Notas útiles para el frontend

- **Acceso restringido:** Solo mostrar ejercicios propios del especialista
- **Información detallada:** Usar título y descripción para mostrar el ejercicio
- **Edición:** Solo permitir edición para ejercicios propios
- **Eliminación:** Solo permitir eliminación para ejercicios propios
- **Seguridad:** Verificar permisos antes de mostrar opciones de edición

## Consideraciones técnicas

- **Middleware:** Aplica `authorize`, `idPathParam` y `ownExerciseValidation`
- **Validaciones:** Verifica que el ejercicio exista y que el usuario tenga permisos
- **Propiedad:** Solo el especialista creador o administradores pueden acceder
- **DTO:** Transformación usando `exerciseToDTO`
- **Base de datos:** Consulta a `RoutinesQueries.getExerciseById`
- **Seguridad:** Validación estricta de propiedad del ejercicio
- **Admin:** Los administradores tienen acceso completo a todos los ejercicios
