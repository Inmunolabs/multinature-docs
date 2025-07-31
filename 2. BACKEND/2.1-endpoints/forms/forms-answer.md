# PUT /forms/fill

Responde un formulario con las respuestas del usuario.

---

## Método, ruta y autorización
- **Método:** PUT
- **Ruta:** `/forms/fill`
- **Autorización:** Bearer token en headers

---

## Explicación funcional
Permite a un usuario responder un formulario basado en una plantilla. Si el usuario ya ha respondido el formulario recientemente, se actualiza la respuesta existente. Si es la primera vez o han pasado más de 30 días, se crea una nueva respuesta. Se puede crear automáticamente una cita si no se proporciona un bookingId.

---

## Body esperado (JSON)
```json
{
  "specialistId": "eb003fcf-fcf1-4da0-b003-35afd7198844",    // (obligatorio) ID del especialista
  "userId": "f0d8e32b-e4bb-4e08-ae48-6c9b96a3a98f",         // (obligatorio) ID del usuario
  "templateId": "46fe03b0-d50b-4762-9b7c-6bd1b891a9e4",      // (obligatorio) ID de la plantilla
  "bookingId": "uuid",                                        // (opcional) ID de la cita asociada
  "answers": [                                                 // (obligatorio) Array de respuestas
    {
      "conceptId": "4b1b2c82-9685-405e-abcf-d811e49c231a",   // (obligatorio) ID del concepto
      "value": "85",                                          // (obligatorio) Valor de la respuesta
      "observation": "Bajo de peso considerable sin rutina",  // (opcional) Observación adicional
      "goal": 79,                                             // (opcional) Meta para conceptos graficables
      "direction": "decrease"                                 // (opcional) Dirección de la meta (increase/decrease)
    },
    {
      "conceptId": "72f03164-ce78-4147-9999-9824afb3f6a7",
      "value": "Sí, pero no le dio seguimiento"
    }
  ]
}
```

---

## Ejemplo de respuesta exitosa (200 OK)
```json
{
  "id": "uuid",
  "bookingId": "uuid",
  "formTemplateId": "46fe03b0-d50b-4762-9b7c-6bd1b891a9e4",
  "specialistId": "eb003fcf-fcf1-4da0-b003-35afd7198844",
  "userId": "f0d8e32b-e4bb-4e08-ae48-6c9b96a3a98f",
  "answers": [
    {
      "conceptName": "Peso",
      "unit": "kg",
      "observation": "Bajo de peso considerable sin rutina",
      "value": "85",
      "isGraphable": true
    },
    {
      "conceptName": "¿Ha seguido dieta anteriormente?",
      "unit": "",
      "observation": "",
      "value": "Sí, pero no le dio seguimiento",
      "isGraphable": false
    }
  ],
  "updated": "2024-01-15T10:30:00Z",
  "created": "2024-01-15T10:30:00Z"
}
```

---

## Errores comunes
| Código | Mensaje                        | Causa                                 |
|--------|--------------------------------|---------------------------------------|
| 400    | Datos inválidos                | Faltan campos obligatorios            |
| 400    | Respuestas obligatorias faltantes | No se respondieron todas las preguntas obligatorias |
| 400    | Respuestas graficables inválidas | Valores no válidos para conceptos graficables |
| 403    | No autorizado                  | Token inválido o sin permisos         |
| 404    | Plantilla no encontrada        | El templateId no existe               |
| 404    | Usuario no encontrado          | El userId no existe                   |
| 500    | Error interno                  | Error inesperado en el servidor       |

---

## Notas útiles para frontend
- **Actualización:** Si el usuario ya respondió recientemente (< 30 días), se actualiza la respuesta.
- **Cita automática:** Si no se proporciona bookingId, se crea automáticamente una cita.
- **Conceptos graficables:** Los conceptos marcados como graficables pueden tener metas y direcciones.
- **Validaciones:** Validar respuestas obligatorias y tipos de datos según la plantilla.
- **Observaciones:** Permitir observaciones adicionales para cada respuesta.
- **Metas:** Para conceptos graficables, permitir establecer metas con dirección.
- **Historial:** Mostrar respuestas anteriores para comparación.
- **Progreso:** Mostrar progreso de completado del formulario. 