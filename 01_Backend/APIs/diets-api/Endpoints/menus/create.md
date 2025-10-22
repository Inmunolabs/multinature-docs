# POST /menus/

## Descripción funcional

Establece los menús completos para una dieta específica. Permite crear y configurar la estructura de comidas organizadas por días de la semana y tipos de comida (desayuno, almuerzo, cena, snack). Incluye la configuración de equivalencias alimentarias para cada menú.

## Autorización

Requiere token Bearer válido. Solo especialistas autorizados pueden establecer menús para sus pacientes.

## Parámetros de ruta

No aplica

## Query parameters

No aplica

## Body del request

```json
{
  "dietId": "123e4567-e89b-12d3-a456-426614174000",
  "menus": {
    "monday": {
      "breakfast": {
        "foodId": "456e7890-e89b-12d3-a456-426614174000",
        "quantity": 150,
        "unit": "g"
      },
      "lunch": {
        "foodId": "789e0123-e89b-12d3-a456-426614174000",
        "quantity": 200,
        "unit": "g"
      },
      "dinner": {
        "foodId": "abc123-e89b-12d3-a456-426614174000",
        "quantity": 180,
        "unit": "g"
      }
    },
    "tuesday": {
      "breakfast": {
        "foodId": "def456-e89b-12d3-a456-426614174000",
        "quantity": 120,
        "unit": "g"
      }
    }
  },
  "equivalences": [
    {
      "groupId": "ghi789-e89b-12d3-a456-426614174000",
      "foodId": "jkl012-e89b-12d3-a456-426614174000",
      "quantity": 100,
      "unit": "g"
    }
  ]
}
```

### Ejemplo de body

```json
{
  "dietId": "123e4567-e89b-12d3-a456-426614174000",
  "menus": {
    "monday": {
      "breakfast": {
        "foodId": "456e7890-e89b-12d3-a456-426614174000",
        "quantity": 150,
        "unit": "g"
      },
      "lunch": {
        "foodId": "789e0123-e89b-12d3-a456-426614174000",
        "quantity": 200,
        "unit": "g"
      },
      "dinner": {
        "foodId": "abc123-e89b-12d3-a456-426614174000",
        "quantity": 180,
        "unit": "g"
      }
    },
    "tuesday": {
      "breakfast": {
        "foodId": "def456-e89b-12d3-a456-426614174000",
        "quantity": 120,
        "unit": "g"
      }
    }
  },
  "equivalences": [
    {
      "groupId": "ghi789-e89b-12d3-a456-426614174000",
      "foodId": "jkl012-e89b-12d3-a456-426614174000",
      "quantity": 100,
      "unit": "g"
    }
  ]
}
```

## Ejemplo de respuesta exitosa (200 OK)

```json
{
  "awsRequestId": "456e7890-e89b-12d3-a456-426614174000",
  "message": "Menús establecidos exitosamente",
  "data": {
    "dietId": "123e4567-e89b-12d3-a456-426614174000",
    "menusCreated": 2,
    "equivalencesSet": 1,
    "totalMeals": 4,
    "createdAt": "2024-01-15T10:30:00Z"
  }
}
```

## Códigos de estado y errores

| Código | Significado           | Descripción                          |
| ------ | --------------------- | ------------------------------------ |
| 200    | OK                    | Menús establecidos exitosamente      |
| 400    | Bad Request           | Datos de menús inválidos o faltantes |
| 401    | Unauthorized          | Token faltante o inválido            |
| 403    | Forbidden             | Sin permisos para establecer menús   |
| 404    | Not Found             | Dieta no encontrada                  |
| 500    | Internal Server Error | Error del servidor                   |

## Notas útiles para el frontend

- **Estructura de menús:** Organiza comidas por días de la semana
- **Tipos de comida:** Soporta breakfast, lunch, dinner, snack
- **Cantidades:** Incluye cantidades específicas para cada alimento
- **Unidades:** Las cantidades están en unidades apropiadas (g, ml, unidades)
- **Equivalencias:** Permite configurar alimentos intercambiables
- **Flexibilidad:** No todos los días necesitan tener todas las comidas
- **Validación:** Solo especialistas pueden modificar menús de sus pacientes
- **Organización:** Los menús se estructuran de forma jerárquica

## Consideraciones técnicas

- **Middleware:** Aplica `getDietByIdPathParam` para validar la dieta
- **Validaciones:** Usa `setMenus` y `equivalences` del servicio
- **Base de datos:** Crea registros de menús y equivalencias
- **Estructura:** Los menús se organizan por día y tipo de comida
- **Relaciones:** Establece conexiones entre dieta, menús y alimentos
- **Transaccional:** Crea menús y equivalencias en una sola operación
- **Validación:** Verifica que la dieta pertenezca al especialista
