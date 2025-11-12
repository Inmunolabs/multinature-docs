# GET /diets/equivalences/group

## Descripción funcional

Obtiene los grupos de equivalencias alimentarias disponibles en el sistema. Permite consultar las categorías autorizadas por SMAE que pueden intercambiarse entre sí manteniendo valores nutricionales similares. El catálogo se encuentra cerrado: solo se devuelven los grupos listados abajo, con `Libre` como sustituto universal cuando antes se usaba `"Otro"`.

## Autorización

Requiere token Bearer válido. Solo usuarios autorizados pueden consultar equivalencias.

## Parámetros de ruta

No aplica

## Query parameters

No aplica

## Body del request

No aplica

## Ejemplo de respuesta exitosa (200 OK)

```json
[
  { "id": "db480987-640e-11f0-8618-1290daed9e2f", "name": "AOA", "subgroup": "Muy bajo en grasa" },
  { "id": "db487ac0-640e-11f0-8618-1290daed9e2f", "name": "AOA", "subgroup": "Bajo en grasa" },
  { "id": "db48979e-640e-11f0-8618-1290daed9e2f", "name": "AOA", "subgroup": "Moderado en grasa" },
  { "id": "db489993-640e-11f0-8618-1290daed9e2f", "name": "AOA", "subgroup": "Alto en grasa" },
  { "id": "db4899fc-640e-11f0-8618-1290daed9e2f", "name": "Cereal", "subgroup": "Con grasa" },
  { "id": "db489a4f-640e-11f0-8618-1290daed9e2f", "name": "Cereal", "subgroup": "Sin grasa" },
  { "id": "db48b6cf-640e-11f0-8618-1290daed9e2f", "name": "Verdura", "subgroup": null },
  { "id": "db48d736-640e-11f0-8618-1290daed9e2f", "name": "Fruta", "subgroup": null },
  { "id": "db48d84d-640e-11f0-8618-1290daed9e2f", "name": "Leche", "subgroup": "Descremada" },
  { "id": "db48d8c3-640e-11f0-8618-1290daed9e2f", "name": "Leche", "subgroup": "Semidescremada" },
  { "id": "db48d92e-640e-11f0-8618-1290daed9e2f", "name": "Leche", "subgroup": "Entera" },
  { "id": "db48d992-640e-11f0-8618-1290daed9e2f", "name": "Leche", "subgroup": "Con azúcar" },
  { "id": "db48da09-640e-11f0-8618-1290daed9e2f", "name": "Grasa", "subgroup": "Sin proteína" },
  { "id": "db48da6b-640e-11f0-8618-1290daed9e2f", "name": "Grasa", "subgroup": "Con proteína" },
  { "id": "db48dac7-640e-11f0-8618-1290daed9e2f", "name": "Azúcar", "subgroup": "Sin grasa" },
  { "id": "db48db24-640e-11f0-8618-1290daed9e2f", "name": "Azúcar", "subgroup": "Con grasa" },
  { "id": "db48db93-640e-11f0-8618-1290daed9e2f", "name": "Leguminosas", "subgroup": null },
  { "id": "db48dc14-640e-11f0-8618-1290daed9e2f", "name": "Libre", "subgroup": null }
]
```

> El endpoint nunca devuelve `"Otro"` como grupo válido; cualquier dato histórico se mapea a `Libre`.

## Códigos de estado y errores

| Código | Significado           | Descripción                                    |
| ------ | --------------------- | ---------------------------------------------- |
| 200    | OK                    | Grupos de equivalencias obtenidos exitosamente |
| 401    | Unauthorized          | Token faltante o inválido                      |
| 403    | Forbidden             | Sin permisos para consultar equivalencias      |
| 500    | Internal Server Error | Error del servidor                             |

## Notas útiles para el frontend

- **Intercambios:** Permite sustituir alimentos manteniendo valores nutricionales
- **Flexibilidad:** Los usuarios pueden personalizar sus dietas
- **Categorías:** Los alimentos están agrupados por tipo nutricional
- **Cantidades:** Incluye cantidades equivalentes para cada alimento
- **Información nutricional:** Valores nutricionales por equivalencia
- **Sustituciones:** Útil para usuarios con restricciones alimentarias
- **Variedad:** Permite diversificar la dieta sin perder control nutricional
- **Educación:** Ayuda a entender equivalencias nutricionales

## Consideraciones técnicas

- **Base de datos:** Consulta usando `listEquivalencesGroup` del servicio
- **Estructura:** Retorna grupos con alimentos equivalentes
- **Caché:** Aplica middleware `equiByGroupCache` para optimización
- **Performance:** Optimizado para consultas frecuentes de equivalencias
- **Relaciones:** Consulta grupos de alimentos nutricionalmente equivalentes
- **Cantidades:** Los alimentos están normalizados por cantidades equivalentes
