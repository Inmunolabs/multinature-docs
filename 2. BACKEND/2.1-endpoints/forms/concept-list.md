# GET /forms/concept

## Descripción funcional

Obtiene la lista de conceptos creados por el especialista autenticado. Los conceptos son unidades de medida y categorías que se utilizan para crear preguntas en las plantillas de formularios. Permite consultar el catálogo personalizado de conceptos del especialista.

## Autorización

Requiere token Bearer válido. Solo especialistas autorizados pueden consultar sus conceptos.

## Parámetros de ruta

No aplica

## Query parameters

No aplica

## Body del request

No aplica

## Ejemplo de respuesta exitosa (200 OK)

```json
[
  {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "specialistId": "456e7890-e89b-12d3-a456-426614174000",
    "name": "Presión arterial sistólica",
    "defaultUnit": "mmHg",
    "description": "Presión arterial sistólica del paciente"
  },
  {
    "id": "789e0123-e89b-12d3-a456-426614174000",
    "specialistId": "456e7890-e89b-12d3-a456-426614174000",
    "name": "Frecuencia cardíaca",
    "defaultUnit": "latidos/min",
    "description": "Frecuencia cardíaca en reposo"
  },
  {
    "id": "abc123-e89b-12d3-a456-426614174000",
    "specialistId": "456e7890-e89b-12d3-a456-426614174000",
    "name": "Nivel de glucosa",
    "defaultUnit": "mg/dL",
    "description": "Nivel de glucosa en sangre"
  }
]
```

## Códigos de estado y errores

| Código | Significado           | Descripción                           |
| ------ | --------------------- | ------------------------------------- |
| 200    | OK                    | Conceptos obtenidos exitosamente      |
| 401    | Unauthorized          | Token faltante o inválido             |
| 403    | Forbidden             | Sin permisos para consultar conceptos |
| 500    | Internal Server Error | Error del servidor                    |

## Notas útiles para el frontend

- **Catálogo personalizado:** Muestra solo los conceptos del especialista autenticado
- **Unidades por defecto:** Cada concepto tiene una unidad de medida predefinida
- **Descripciones:** Incluye descripciones explicativas de cada concepto
- **Creación de plantillas:** Útil para seleccionar conceptos al crear plantillas
- **Reutilización:** Los conceptos pueden usarse en múltiples plantillas
- **Personalización:** Permite crear conceptos específicos para cada especialidad
- **Organización:** Ayuda a mantener consistencia en la nomenclatura

## Consideraciones técnicas

- **Middleware:** Aplica `authorize` para validar autenticación
- **Filtrado:** Solo retorna conceptos del especialista autenticado
- **DTO:** Usa `conceptToDTO` para transformar la respuesta
- **Base de datos:** Consulta usando `listConcepts` del servicio
- **Performance:** Optimizado para consultas del catálogo personal
- **Relaciones:** Los conceptos se asocian a plantillas y respuestas
