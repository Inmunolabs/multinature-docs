# 📝 Minuta – Diagnóstico y recomendaciones del DietAgent (by Axel)

**Fecha:** 2026-01-20  
**Hora:** 15:05 - ≈ 16:30  
**Participantes:** Daira, Alejandro, Andrés, Antoine y Miguel  
**Área / Contexto:** Soporte  
**Objetivo de la reunión:** Revisar el diagnóstico y las recomendaciones del DietAgent propuestas por Axel, resolver nuestras inquietudes y definir acciones  

---

## 🔎 Resumen Ejecutivo

Se revisó el diagnóstico actual de nuestro Agente de Dietas y las recomendaciones propuestas por Axel para el mismo; y se resolvieron algunas preguntas. Mis preguntas y las respuestas quedaron docuemntadas en la tarea [Revisar diagnóstico y recomendaciones del DietAgent (by Axel) y definir acciones](https://app.clickup.com/t/868h2pvye)

---

## ✅ Decisiones

Decisiones tomadas que **impactan el rumbo del proyecto, negocio u operación**.

- **[DEC-001]** Considerar casos y ejemplos clinicos reales con especialistas nutriólogos que nos ayuden a validar los resultados de nuesto agente.
  Impacto: Alto  

- **[DEC-002]** Los evals pueden ejecutarse como pruebas unitarias a nivel de fases (Pipeline de AI | Pasos Atómicos). Son sugeridas podrían apoyar pero no son obligatorias. En el Show Case son los archivos con `.eval.ts` (Por ej. `backend/src/evals/find-faqs.eval.ts`). Con los score se decide como evaluar una parte del sistema, básicamente se determina una salida esperada a partir de una entrada dada.
  Impacto: Medio

- **[DEC-003]** Uso de base de datos determinista (consultas SQL estructuradas), no vectorial. Las bases de datos vectoriales están diseñadas para la similitud (ej. "¿qué alimento se siente como una manzana?"), no para el cumplimiento estricto de parámetros (ej. "¿qué alimento tiene exactamente entre 15 y 20 g de proteína?").
  Impacto: Alto

---

## 🧩 Acciones

Acciones concretas derivadas de la reunión.

- **[ACT-001]** Empezar a estructurar las siguientes actividades que deben aplicarse al Agente de Dietas a partir de las recomendaciones dadas por Axel 
  Owner: Miguel Angel Valdés
  Prioridad: Media

---

## ⚠️ Riesgos / Bloqueos

---

## 🗒️ Notas (No accionables)

* Open Router es un proxy, no recomendable para producción. Proxy que agrupa todos los modelos de los diferentes proveedores. Recomendado solo para uso experimental.
* Hemos pensado en ir almacenado todas las actualizaciones que los especialistas hagan a las recomendaciones del agente para utilizarlas como feedback para el mismo Agente y buscar la manera de que este vaya aprendiendo las preferencias de los especialistas hacia con sus usuarios en especifico. Axel comento que puede valer mucho la pena y que incluso este feedback podría funcionar como una especie si fueran Evals.
