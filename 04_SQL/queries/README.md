# SQL Queries

Este módulo agrupa consultas SQL listas para usar.

La intención es:

- Tener un lugar único donde vivirán los _queries_ más usados.
- Facilitar su búsqueda e indexación (por nombre, propósito y entidad).
- Servir como referencia rápida para soporte, análisis y producto.

| Archivo                                                                      | Descripción                                                                                                                                            | Uso principal                                                 |
| ---------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------- |
| [01_form_templates_with_questions.md](./01_form_templates_with_questions.md) | Obtiene los **formularios (templates)** con sus preguntas asociadas, en un formato legible tipo JSON, filtrable por id, nombre o especialista.         | Vista tipo “cliente” de los cuestionarios disponibles.        |
| [02_filled_forms_with_responses.md](./02_filled_forms_with_responses.md)     | Obtiene los **formularios llenados** (respuestas de pacientes) a partir del template o filtrando por paciente o especialista, también en formato JSON. | Seguimiento clínico, análisis de casos y soporte a dietAgent. |
