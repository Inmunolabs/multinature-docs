# API de Forms

Esta documentación cubre todos los endpoints relacionados con la gestión de formularios, plantillas y conceptos.

## Índice de Endpoints

### Formularios
- [GET /forms/patient-fills/:userId - Formularios completados por paciente](./forms-patient-fills.md)
- [POST /forms/answer - Responder formulario](./forms-answer.md)

### Plantillas
- [GET /forms/templates - Listar plantillas](./forms-templates-list.md)
- [POST /forms/templates - Crear plantilla](./forms-templates-create.md)
- [PATCH /forms/templates/:id - Actualizar plantilla](./forms-templates-update.md)
- [DELETE /forms/templates/:id - Eliminar plantilla](./forms-templates-delete.md)

### Conceptos
- [GET /forms/concepts - Listar conceptos](./forms-concepts-list.md)
- [POST /forms/concepts - Crear concepto](./forms-concepts-create.md)
- [PATCH /forms/concepts/:id - Actualizar concepto](./forms-concepts-update.md)
- [DELETE /forms/concepts/:id - Eliminar concepto](./forms-concepts-delete.md)

---

## Reglas importantes y contexto del proyecto

- Los formularios se basan en plantillas que definen la estructura.
- Los conceptos son categorías que agrupan formularios relacionados.
- Los formularios pueden ser respondidos por pacientes o especialistas.
- Las plantillas pueden tener diferentes tipos de preguntas (texto, opción múltiple, etc.).
- Los formularios pueden ser obligatorios o opcionales.
- Los formularios pueden tener validaciones específicas.

---

## Consideraciones generales para el frontend

- **Plantillas:** Usar plantillas para crear formularios dinámicos.
- **Conceptos:** Agrupar formularios por conceptos para mejor organización.
- **Validaciones:** Implementar validaciones en frontend según las reglas de la plantilla.
- **Tipos de pregunta:** Mostrar controles apropiados según el tipo de pregunta.
- **Respuestas:** Guardar respuestas de forma estructurada.
- **Historial:** Mostrar formularios completados anteriormente.
- **Obligatorios:** Marcar claramente los campos obligatorios.
- **Progreso:** Mostrar progreso de completado en formularios largos. 