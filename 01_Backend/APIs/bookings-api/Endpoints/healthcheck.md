# GET /

## Descripción funcional

Verifica el estado de salud del servicio de bookings. Permite comprobar que el servicio está activo y respondiendo. Útil para monitoreo y pruebas de disponibilidad.

## Autorización

No requiere autenticación. Es un endpoint público para verificación de estado del servicio.

## Parámetros de ruta

No aplica

## Query parameters

No aplica

## Body del request

No aplica

## Ejemplo de respuesta exitosa (200 OK)

```json
{
  "status": "ok"
}
```

## Códigos de estado y errores

| Código | Significado | Descripción |
|--------|-------------|-------------|
| 200 | OK | Servicio funcionando correctamente |
| 500 | Internal Server Error | El servicio no está disponible |

## Notas útiles para el frontend

- **Monitoreo:** Usar este endpoint para verificar que el servicio esté disponible antes de hacer otras llamadas
- **Pruebas:** Útil para pruebas automáticas de disponibilidad
- **Sin autenticación:** No requiere token ni parámetros
- **Respuesta simple:** Retorna solo el estado básico del servicio
