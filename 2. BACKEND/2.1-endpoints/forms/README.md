# API de Forms

Esta documentación cubre todos los endpoints relacionados con la gestión de formularios, plantillas y conceptos médicos.

## Índice de Endpoints

### Gestión de Conceptos
- [GET /forms/concept - Listar conceptos del especialista](./concept-list.md)
- [POST /forms/concept - Crear concepto](./concept-create.md)
- [PATCH /forms/concept/:id - Actualizar concepto](./concept-update.md)
- [DELETE /forms/concept/:id - Eliminar concepto](./concept-delete.md)

### Gestión de Plantillas
- [GET /forms/template - Listar plantillas del especialista](./template-list.md)
- [POST /forms/template - Crear plantilla](./template-create.md)
- [PUT /forms/template/:id - Actualizar plantilla](./template-update.md)
- [DELETE /forms/template/:id - Eliminar plantilla](./template-delete.md)

### Formularios Completados
- [GET /forms/:id - Listar formularios completados del paciente](./patient-forms-list.md)
- [PUT /forms/fill - Completar/actualizar formulario](./form-fill.md)

### Sistema
- [GET / - Healthcheck](./healthcheck.md)

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