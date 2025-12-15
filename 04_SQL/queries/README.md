# SQL Queries

Este módulo agrupa consultas SQL listas para usar y documentadas para el proyecto Multinature.

---

## 🎯 Propósito

- Tener un lugar único donde vivirán los _queries_ más usados
- Facilitar su búsqueda e indexación (por nombre, propósito y entidad)
- Servir como referencia rápida para soporte, análisis y producto

---

## 📊 Queries Disponibles

| Archivo                                                                      | Descripción                                                                                                                                            | Uso principal                                                 |
| ---------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------- |
| [01_form_templates_with_questions.md](./01_form_templates_with_questions.md) | Obtiene los **formularios (templates)** con sus preguntas asociadas, en un formato legible tipo JSON, filtrable por id, nombre o especialista.         | Vista tipo "cliente" de los cuestionarios disponibles.        |
| [02_filled_forms_with_responses.md](./02_filled_forms_with_responses.md)     | Obtiene los **formularios llenados** (respuestas de pacientes) a partir del template o filtrando por paciente o especialista, también en formato JSON. | Seguimiento clínico, análisis de casos y soporte a dietAgent. |
| [03_foods_mismatched_nutritional_values.md](./03_foods_mismatched_nutritional_values.md) | Identifica **platillos** con valores nutricionales descuadrados, comparando los totales guardados vs. la suma calculada de sus ingredientes. | Auditoría de calidad y detección de inconsistencias en datos nutricionales. |
| [04_export_form_template_as_inserts.md](./04_export_form_template_as_inserts.md) | Genera los scripts **INSERT** necesarios para replicar un `form_template`, sus conceptos y relaciones manteniendo los IDs originales. | Clonar cuestionarios en otro entorno o realizar migraciones puntuales. |
| [05_clean_keep_selected_forms.md](./05_clean_keep_selected_forms.md) | Conserva solo los templates definidos, exporta sus INSERTs y limpia el resto de la base (forms y respuestas) con un flujo seguro para triggers. | Preparar entornos reducidos o sanitizar data manteniendo formularios específicos. |

---

## 📚 Uso

Cada query incluye:
- **Descripción detallada** del propósito
- **Parámetros configurables** cuando aplica
- **Ejemplos de uso** con casos reales
- **Casos de uso principales** para contexto

---

- **Última actualización:** 2025-12-15
- **Total de archivos:** 5 (incluye subdirectorios)
- **Total de queries:** 5
