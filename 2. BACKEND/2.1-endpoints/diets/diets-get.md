# GET /diets/:id

Obtiene una dieta específica por ID.

---

## Método, ruta y autorización
- **Método:** GET
- **Ruta:** `/diets/:id`
- **Autorización:** Bearer token en headers

---

## Explicación funcional
Permite obtener una dieta específica con todos sus alimentos organizados por días de la semana y tipos de comida. La dieta incluye información nutricional detallada como calorías, proteínas, lípidos y carbohidratos.

---

## Parámetros de ruta
- `id` (obligatorio): UUID de la dieta.

---

## Ejemplo de respuesta exitosa (200 OK)
```json
{
  "id": "uuid",
  "specialistId": "uuid",
  "userId": "uuid",
  "notes": "Dieta para pérdida de peso - 1500 calorías",
  "caloriesPerDay": 1500.0,
  "proteinsPerDay": 120.0,
  "lipidsPerDay": 50.0,
  "carbohydratesPerDay": 150.0,
  "meals": {
    "monday": {
      "breakfast": {
        "id": "uuid",
        "name": "Desayuno proteico",
        "description": "Avena con proteína y frutas"
      },
      "lunch": {
        "id": "uuid",
        "name": "Ensalada de pollo",
        "description": "Ensalada verde con pechuga de pollo"
      },
      "dinner": {
        "id": "uuid",
        "name": "Salmón con vegetales",
        "description": "Salmón al horno con brócoli"
      },
      "snack": {
        "id": "uuid",
        "name": "Yogurt griego",
        "description": "Yogurt griego con nueces"
      }
    },
    "tuesday": {
      "breakfast": {
        "id": "uuid",
        "name": "Huevos revueltos",
        "description": "Huevos con espinacas"
      },
      "lunch": {
        "id": "uuid",
        "name": "Sopa de lentejas",
        "description": "Sopa de lentejas con vegetales"
      },
      "dinner": {
        "id": "uuid",
        "name": "Pechuga a la plancha",
        "description": "Pechuga con arroz integral"
      },
      "snack": {
        "id": "uuid",
        "name": "Manzana con almendras",
        "description": "Manzana con un puñado de almendras"
      }
    },
    "wednesday": {},
    "thursday": {},
    "friday": {},
    "saturday": {},
    "sunday": {}
  }
}
```

---

## Errores comunes
| Código | Mensaje                        | Causa                                 |
|--------|--------------------------------|---------------------------------------|
| 403    | No autorizado                  | Token inválido o sin permisos         |
| 404    | Dieta no encontrada            | El ID de la dieta no existe           |
| 500    | Error interno                  | Error inesperado en el servidor       |

---

## Notas útiles para frontend
- **Días:** Los alimentos están organizados por días de la semana.
- **Tipos de comida:** Cada día puede tener breakfast, lunch, dinner, snack.
- **Calorías:** El campo `caloriesPerDay` indica el total de calorías diarias.
- **Macronutrientes:** Incluye proteínas, lípidos y carbohidratos por día.
- **Especialista:** Cada dieta está asociada a un especialista que la creó.
- **Usuario:** Cada dieta está asignada a un usuario específico.
- **Notas:** Las notas contienen información adicional sobre la dieta.
- **Días vacíos:** Algunos días pueden no tener comidas asignadas.
- **Progreso:** Considerar seguimiento del progreso nutricional del usuario. 