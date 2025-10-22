# GET /addresses/neighborhoods/:zipCode

## Descripción funcional

Obtiene la lista de colonias (neighborhoods) disponibles para un código postal específico. Este endpoint es útil para autocompletar formularios de direcciones y validar códigos postales mexicanos.

## Autorización

No requiere autenticación. Es un endpoint público para consulta de información geográfica.

## Parámetros de ruta

- `zipCode` (string, requerido): Código postal de 4 o 5 dígitos para buscar colonias

### Ejemplo
```
GET /addresses/neighborhoods/03100
```

## Query parameters

No aplica

## Body del request

No aplica

## Ejemplo de respuesta exitosa (200 OK)

```json
[
  {
    "zipCode": "03100",
    "neighborhood": "Del Valle",
    "city": "Ciudad de México",
    "federalEntity": "CDMX"
  },
  {
    "zipCode": "03100",
    "neighborhood": "Del Valle Norte",
    "city": "Ciudad de México",
    "federalEntity": "CDMX"
  },
  {
    "zipCode": "03100",
    "neighborhood": "Del Valle Sur",
    "city": "Ciudad de México",
    "federalEntity": "CDMX"
  }
]
```

## Códigos de estado y errores

| Código | Significado | Descripción |
|--------|-------------|-------------|
| 200 | OK | Lista de colonias obtenida exitosamente |
| 400 | Bad Request | Código postal inválido (debe ser 4-5 dígitos) |
| 500 | Internal Server Error | Error del servidor |

## Notas útiles para el frontend

- **Validación:** El código postal debe tener 4 o 5 dígitos numéricos
- **Lista vacía:** Si no se encuentran colonias para el código postal, se retorna un array vacío `[]`
- **Uso:** Ideal para autocompletar campos de colonia en formularios de direcciones
- **Datos:** La información incluye ciudad y entidad federativa para contexto adicional
- **Caché:** Los datos se leen desde un archivo JSON local, por lo que la respuesta es rápida
- **Formato:** Los códigos postales se validan con regex antes de procesar la consulta

## Consideraciones técnicas

- **Archivo local:** Los datos se leen desde `CPMexico.json` almacenado localmente
- **Validación:** Aplica regex `/\b([0-9]{4,5})\b/` para validar formato de código postal
- **Filtrado:** Búsqueda exacta por código postal en el archivo JSON
- **Sin base de datos:** No requiere consultas a MySQL, solo lectura de archivo
- **Performance:** Respuesta rápida al ser datos estáticos en memoria
