# GET /routines/:id

Obtiene una rutina específica por ID.

---

## Método, ruta y autorización
- **Método:** GET
- **Ruta:** `/routines/:id`
- **Autorización:** Bearer token en headers

---

## Explicación funcional
Permite obtener una rutina específica con todos sus ejercicios organizados por días de la semana. La rutina incluye ejercicios asignados para cada día con sus repeticiones y orden de ejecución.

---

## Parámetros de ruta
- `id` (obligatorio): UUID de la rutina.

---

## Ejemplo de respuesta exitosa (200 OK)
```json
{
  "id": "uuid",
  "specialistId": "uuid",
  "userId": "uuid",
  "notes": "Rutina de fortalecimiento para principiantes",
  "exercises": {
    "monday": [
      {
        "id": "uuid",
        "title": "Flexiones de pecho",
        "description": "3 series de 10 repeticiones",
        "repetitions": 10,
        "index": 0
      },
      {
        "id": "uuid",
        "title": "Sentadillas",
        "description": "3 series de 15 repeticiones",
        "repetitions": 15,
        "index": 1
      }
    ],
    "tuesday": [
      {
        "id": "uuid",
        "title": "Plancha",
        "description": "3 series de 30 segundos",
        "repetitions": 30,
        "index": 0
      }
    ],
    "wednesday": [],
    "thursday": [
      {
        "id": "uuid",
        "title": "Burpees",
        "description": "3 series de 8 repeticiones",
        "repetitions": 8,
        "index": 0
      }
    ],
    "friday": [],
    "saturday": [],
    "sunday": []
  }
}
```

---

## Errores comunes
| Código | Mensaje                        | Causa                                 |
|--------|--------------------------------|---------------------------------------|
| 403    | No autorizado                  | Token inválido o sin permisos         |
| 404    | Rutina no encontrada           | El ID de la rutina no existe          |
| 500    | Error interno                  | Error inesperado en el servidor       |

---

## Notas útiles para frontend
- **Días:** Los ejercicios están organizados por días de la semana.
- **Orden:** Los ejercicios se ordenan por el campo `index` dentro de cada día.
- **Repeticiones:** El campo `repetitions` indica el número de repeticiones o duración.
- **Especialista:** Cada rutina está asociada a un especialista que la creó.
- **Usuario:** Cada rutina está asignada a un usuario específico.
- **Notas:** Las notas contienen información adicional sobre la rutina.
- **Días vacíos:** Algunos días pueden no tener ejercicios asignados.
- **Progreso:** Considerar seguimiento del progreso del usuario en cada ejercicio. 