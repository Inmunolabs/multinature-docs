# GET /

Verifica el estado de salud del servicio de bookings.

---

## Método, ruta y autorización

- **Método:** GET
- **Ruta:** `/`
- **Autorización:** No requiere autenticación

---

## Explicación funcional

Permite comprobar que el servicio de bookings está activo y respondiendo. Útil para monitoreo y pruebas de disponibilidad.

---

## Ejemplo de respuesta exitosa (200 OK)

```json
{
  "status": "ok"
}
```

---

## Errores comunes

| Código | Mensaje       | Causa                          |
| ------ | ------------- | ------------------------------ |
| 500    | Error interno | El servicio no está disponible |

---

## Notas útiles para frontend

- Usar este endpoint para monitoreo o pruebas automáticas.
- No requiere autenticación ni parámetros.
