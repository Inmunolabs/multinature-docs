# 📝 Minuta – Seguimiento a Agentes de Ventas I

**Fecha:** 2026-02-04  
**Hora:** 16:55 - 17:55
**Participantes:** Alejandro, Andrés, Antoine, Miguel, Daira (_17:30 - 17:55_)  
**Área / Contexto:** Ventas  
**Objetivo de la reunión:** Feedback de Alejandro y Daira  

---

## 🔎 Resumen Ejecutivo

**Observaciones**

1. Critico. El miércoles 04 de febrero Alejandro reportó por WhatsApp intermitencias al momento de calcular equivalencias (grupos equivalentes - distribución de cuadro dietosintetico) basadas en los macronutrientes.
2. Asignar Rutinas ya debe funcionar.
3. Aplicar migraciones. Revisar si Nutrimind permite exportar pacientes y su información para importarlos a Multinature
4. Especialista que tiene pacientes renales solicita migración de pacientes, ella utiliza Avena
5. Si el Diet Agent falla mantener el formulario lleno en el frontend para que el especialista no tenga que volver a llenarlo
   1. Andrés comentó: Si el robot tarda más de tres minutos agregar una función de reintentar que reinicie el Agente
6. Rellenado automatico en formularios a partir de filled-forms-values contestados en el pasado (tomar el último filled-form-value ingresado en el sistema)
7. Que menus digan cantidades en gramos, unidades, ml, etc. en lugar de en "porciones". Por ejemplo, que no diga "2 porciones de tacos de pollo" si no que diga "Tacos de pollo, 4 tortillas, 150gr de pollo, 15gr de queso, etc."

---

## ✅ Decisiones

Decisiones tomadas que **impactan el rumbo del proyecto, negocio u operación**.

- **[DEC-001]** Hacer funcional asignación de rutinas
  Impacto: Alto 

---

## 🧩 Acciones

Acciones concretas derivadas de la reunión.

- **[ACT-001]** Revisar el endpoint `POST /equivalences/solve` (Resolver equivalencias nutricionales).
  Owner:  
  Prioridad: Alta

- **[ACT-002]** Reparar rutinas.
  Owner:  
  Prioridad: Alta

---

## ⚠️ Riesgos / Bloqueos

- 

---

## 🗒️ Notas (No accionables)

* Alejandro ha visto a 21 personas pero solo se han registrado 8

**Los NOs que han recibido los agentes de ventas:**

* NO porque tengo manera de importar mis usuarios desde [nutrimind](https://www.nutrimind.net/)