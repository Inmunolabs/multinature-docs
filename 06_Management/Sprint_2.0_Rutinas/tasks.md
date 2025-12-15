# [_(Exploratorio / Por confirmar)_ S2-04 Registro de Métricas y Tiempos del Paciente](../3.0_App_Rutinas_Seguimiento.md#exploratorio--por-confirmar-14-registro-de-métricas-y-tiempos-del-paciente)

- **Context:**  
  Este módulo está en fase exploratoria. La intención es permitir registrar métricas como pesos, tiempos, descansos y desempeño por serie/ejercicio, con miras a progresión automática futura.

En este sprint **NO se implementa el sistema completo**, solo se define:

- alcance,
- modelo base,
- diseño técnico mínimo viable.

## TAREAS

### ✅ S2-04.1 Revisar y confirmar alcance de métricas con dirección

- **Context:**

  Definir junto con Andrés:

  - si el módulo se implementa,
  - qué métricas reales se capturarán,
  - si aplica solo a rutinas IA, manuales o ambas.

- **Estimación:** 3h

- **Assignee:** Miguel Angel Valdes

- **Tags:** ops

### ❄️ S2-04.2 Diseñar modelo de datos base para métricas de entrenamiento

- **Context:**  
   Proponer entidades mínimas (sessions, sets, metrics) y su relación con:
  rutina, día, ejercicio, paciente y especialista.

- **Estimación:** 4h

- **Assignee:** Erick Robles

- **Tags:** back

### ❄️ S2-04.3 Definir endpoints mínimos para registro y consulta de métricas

- **Context:**  
  Boceto de endpoints para:

- iniciar sesión,
- registrar métricas,
- consultar resumen por paciente.

- **Estimación:** 4h

- **Assignee:** Samuel Reveles

- **Tags:** back

### ❄️ S2-04.4 Wireframe conceptual de visualización de métricas para especialista

- **Context:**  
  Diseñar cómo vería el especialista el progreso del paciente (resumen simple, no dashboard completo).

- **Estimación:** 3h

- **Assignee:** Antoine Ganem

- **Tags:** ux

---

## [_(Por confirmar)_ 1.5 Entrenamiento Guiado (APP / posible Web)](../3.0_App_Rutinas_Seguimiento.md#por-confirmar-15-entrenamiento-guiado-app--posible-web)

- **Context:**  
  El entrenamiento guiado se desarrollará principalmente en la APP por Pandalatec.  
  Este sprint debe dejar **reglas claras, flujos y contratos técnicos**, no la implementación visual.

## TAREAS

### ❄️ S2-05.1 Diseñar endpoints para entrenamiento guiado (APP)

- **Context:**  
  Propuesta de endpoints:

- iniciar sesión,
- iniciar/finalizar serie,
- marcar completado,
- sustituir ejercicio.

- **Estimación:** 5h

- **Assignee:** Samuel Reveles

- **Tags:** back

### ❄️ S2-05.2 Documento técnico de integración para Pandalatec

- **Context:**  
  Documento con:

- endpoints,
- payloads,
- reglas que la app no puede romper,
- notas para futuras métricas.

- **Estimación:** 4h

- **Assignee:** Miguel Angel Valdes

- **Tags:** ops, back

---

# [S2-06 RoutinesAgent (Generación + Edición)](../3.0_App_Rutinas_Seguimiento.md#16-routinesagent-generación--edición)

- **Context:**  
  Se requiere un agente IA capaz de generar rutinas coherentes por objetivo y permitir edición granular.  
  El objetivo de este sprint es dejar **un esqueleto funcional serio**, no el agente definitivo.

## TAREAS

### ✅ S2-06.1 Diseñar modelo conceptual del RoutinesAgent

**Context:**

- Definir inputs, outputs, limitaciones iniciales y supuestos clínicos.
- Diseño por Samuel Reveles
- Validación requerida por Miguel Angel Valdes

- **Estimación:** 4h

- **Assignee:** Samuel Reveles, Miguel Angel Valdes

- **Tags:** back, ia

### ✅ S2-06.2 Definir esquema JSON estándar para rutinas IA

- **Context:**  
  Schema único para backend, IA y APP: días, ejercicios, series, reps, descansos.

- **Estimación:** 4h

- **Assignee:** Samuel Reveles

- **Tags:** back

### ✅ S2-06.3 Implementar endpoint de generación automática de rutinas

- **Context:**  
  Endpoint que reciba datos del paciente y devuelva la rutina generada por IA.

- **Estimación:** 6h

- **Assignee:** Samuel Reveles

- **Tags:** back, ia

### ✅ S2-06.4 Definir modelo de acciones para edición granular de rutinas

- **Context:**  
  Especificar acciones: agregar/quitar ejercicio, mover, cambiar series, descansos.

- **Estimación:** 4h

- **Assignee:** Miguel Angel Valdes

- **Tags:** back, ia

### ✅ S2-06.5 Implementar endpoint de acciones para edición de rutinas

- **Context:**  
  Endpoint que aplique `actions` sobre una rutina existente, con validaciones.

- **Estimación:** 6h

- **Assignee:** Samuel Reveles

- **Tags:** back

### ✅ S2-06.6 Boceto UX del editor de rutinas (conceptual)

- **Context:**  
  Diseño base del editor visual para que frontend lo ejecute en siguientes sprints.

- **Estimación:** 4h

- **Assignee:** Diego Martin Ponce

- **Tags:** ux

### ✅ S2-06.7 Desarrollar el editor de rutinas

**Context:** Desarrollar el editor visual en frontend para que el especialista pueda actualizar las rutinas ya sea desde la creación del flujo automatico con el RoutinesAgent o desde una Rutina ya creada en la base de datos

- **Estimación:** 4h

- **Assignee:** Diego Martin Ponce

- **Tags:** ux

### ✅ S2-06.8 QA inicial del flujo mínimo del RoutinesAgent

- **Context:**  
  Probar: generación → edición → validación estructural de rutina.

- **Estimación:** 4h

- **Assignee:** Leo

- **Tags:** qa