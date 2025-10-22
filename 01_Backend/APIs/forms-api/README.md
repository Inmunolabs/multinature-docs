# forms-api

Documentación de forms-api.

---

## Secciones

- [Endpoints](./Endpoints/README.md)

---

## Reglas importantes y contexto del proyecto

- Los formularios son plantillas personalizables creadas por especialistas médicos.
- Los conceptos son unidades de medida y categorías para las preguntas del formulario.
- Las plantillas incluyen preguntas con validaciones de obligatoriedad y graficabilidad.
- Los formularios completados se asocian a citas (bookings) específicas.
- El sistema incluye conceptos globales como "estatura" y "peso" que se agregan automáticamente.
- Los formularios pueden tener respuestas graficables para seguimiento temporal.
- Las respuestas se validan según las reglas de la plantilla (obligatorias, graficables).
- El sistema crea automáticamente citas si no existe una asociada al formulario.

---

## Consideraciones generales para el frontend

- **Conceptos:** Mostrar conceptos disponibles para crear preguntas personalizadas.
- **Plantillas:** Permitir crear formularios con preguntas personalizables.
- **Validaciones:** Implementar validaciones según las reglas de la plantilla.
- **Respuestas:** Capturar respuestas con unidades y observaciones.
- **Graficabilidad:** Identificar respuestas que pueden mostrarse en gráficos temporales.
- **Obligatoriedad:** Validar que se completen todas las preguntas obligatorias.
- **Historial:** Mostrar formularios completados anteriormente del paciente.
- **Filtros:** Permitir filtrar formularios por fechas específicas.
- **Paginación:** Implementar paginación para listas de formularios.
- **Unidades:** Mostrar unidades apropiadas para cada tipo de concepto.
- **Observaciones:** Permitir agregar notas adicionales a las respuestas.

---

- **Última actualización:** 2025-10-22
- **Total de archivos:** 0
