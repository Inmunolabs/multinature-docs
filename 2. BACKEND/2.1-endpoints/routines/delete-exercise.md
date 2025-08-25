# DELETE /routines/exercise/:id

## Descripción funcional

Elimina un ejercicio específico. Solo el especialista que creó el ejercicio o un administrador pueden eliminarlo. Después de eliminar el ejercicio, retorna la lista completa actualizada de ejercicios del especialista.

## Autorización

Requiere token Bearer válido. Solo el propietario del ejercicio o administradores pueden eliminarlo.

## Parámetros de ruta

- `id` (UUID, requerido): ID único del ejercicio a eliminar

### Ejemplo
```
DELETE /routines/exercise/exercise123-e89b-12d3-a456-426614174000
```

## Query parameters

No aplica

## Body del request

No aplica

## Ejemplo de respuesta exitosa (200 OK)

```json
{
  "awsRequestId": "456e7890-e89b-12d3-a456-426614174000",
  "message": "Ejercicio eliminado.",
  "data": [
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
    }
  ]
}
```

## Códigos de estado y errores

| Código | Significado           | Descripción                      |
| ------ | --------------------- | -------------------------------- |
| 200    | OK                    | Ejercicio eliminado exitosamente |
| 400    | Bad Request           | ID de ejercicio inválido         |
| 401    | Unauthorized          | Token faltante o inválido        |
| 403    | Forbidden             | Sin permisos para eliminar este ejercicio |
| 404    | Not Found             | Ejercicio no encontrado          |
| 500    | Internal Server Error | Error del servidor               |

## Notas útiles para el frontend

- **Propiedad:** Solo mostrar opción de eliminar para ejercicios propios
- **Admin:** Los administradores pueden eliminar cualquier ejercicio
- **Confirmación crítica:** Solicitar confirmación explícita antes de eliminar
- **Advertencia:** Mostrar advertencia sobre que la eliminación es permanente
- **Respuesta completa:** Retorna lista actualizada de ejercicios restantes
- **Estado:** Deshabilitar eliminación para ejercicios no propios
- **Dependencias:** Verificar si el ejercicio está siendo usado en rutinas activas

## Consideraciones técnicas

- **Middleware:** Aplica `authorize`, `idPathParam` y `ownExerciseValidation`
- **Validaciones:** Verifica que el ejercicio exista y que el usuario tenga permisos
- **Propiedad:** Solo el propietario del ejercicio puede eliminarlo
- **Admin:** Los administradores tienen acceso completo a todos los ejercicios
- **Base de datos:** Elimina de `RoutinesQueries.removeExercise`
- **Respuesta:** Retorna lista completa actualizada usando `listExercises`
- **Seguridad:** Validación estricta de propiedad del ejercicio
- **DTO:** Transformación automática usando `exerciseToDTO`
- **Integridad:** Considerar impacto en rutinas que usen este ejercicio
- **Auditoría:** Mantener registro de ejercicios eliminados para auditoría
