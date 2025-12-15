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

### ✅ S_Infra_Pagos_Deuda_Tecnica-04.1 Crear las tablas de ejercicios para rutinas en español

- **Context:** Actualmente solo se tienen los ejercicios y todos sus registros relacionados con rutinas en inglés, traducir todos estos registros y crear las tablas en base de datos de los mismos pero en español

- **Estimación:** 4h

- **Assignee:** Erick Robles

- **Tags:** back

### ✅ S_Infra_Pagos_Deuda_Tecnica-04.2 Implementar soporte de idioma (i18n) EN/ES para api de rutinas

- **Context:** Actualmente el sistema no tiene una forma estándar de distinguir el idioma (EN/ES) en los contenidos y respuestas. Se requiere definir un mecanismo en backend para:

  - Identificar el idioma deseado por usuario/cliente (preferencia configurable),
  - Responder consistentemente en ese idioma desde los endpoints,
  - Preparar la base para manejar catálogos multi-idioma (ej. ejercicios, descripciones, instrucciones) sin duplicar lógica ni romper compatibilidad con lo existente.

- **Estimación:** 6h

- **Assignee:** Erick Robles

- **Tags:** back

### ✅ SN-06.5 Terminar el desarrollo del endpoint de edición de propuestas de dietas del Agente de Dietas (DietAgent Actions)

- **Context:**

  - Terminar el desarrollo del endpoint actions de dietas, este endpoint se encarga de orquestar el pipeline de dietas, es decir, es el encargado de ejecutar los pasos del pipeline de dietas de manera independiente o en conjunto, ideal para ajustes, pruebas y validaciones por parte del especialista sin impactar la base de datos.

- **Estimación:** 6h

- **Assignee:** Samuel Reveles

- **Tags:** back

### ✅ SN-08.3 Crear vista para permitir a los especialistas agregar su logo a los PDFs

- **Context:** Permitir que cada especialista pueda agregar su logo por especialidad para que sea visible en los PDFs que resumen las dietas

- **Estimación:** 4h

- **Assignee:** Diego Martin Ponce

- **Tags:** back

### ✅ BUG-001 Error al crear alimentos desde el POST de una dieta propuesta por el DietAgent

- **Context:** Al crear una dieta desde la propuesta de dieta del Agente de Dietas falla la creación de nuevos alimentos

- **Estimación:** 5h

- **Assignee:** Antoine Ganem

- **Tags:** back

### ✅ SN-01.2 Aplicar Data Analyst con Pandas a los foods de SMAE para su exploración y limpieza

- **Context:** Aplicar Data Analyst con Pandas a los foods de la base de datos para mejorar la limpieza de los mismos

- **Estimación:** 5h

- **Assignee:** Antoine Ganem

- **Tags:** back

### ✅ S_Infra_Pagos_Deuda_Tecnica-04.3 Implementación en backend de inventario de productos

- **Context:**

  - Alertar a los administradores sobre futura escases de productos.
  - Limitar a los usuarios el número de productos comprados a solo lo permitido por el inventario.
  - Correcto manejo del inventario, considerar devoluciones y cancelaciones en el sistema.
  - NOTA del creador de la tarea: Esta tarea podría desarrollar tareas diferentes por la duración de la misma

- **Estimación:** 6h

- **Assignee:** Cristopher Reveles

- **Tags:** back

### ✅ S_Infra_Pagos_Deuda_Tecnica-04.4 Implementación en frontend de inventario de productos

- **Context:**

  - Alertar a los administradores sobre futura escases de productos.
  - Limitar a los usuarios el número de productos comprados a solo lo permitido por el inventario.
  - Correcto manejo del inventario, considerar devoluciones y cancelaciones en el sistema.
  - NOTA del creador de la tarea: Esta tarea podría desarrollar tareas diferentes por la duración de la misma

- **Estimación:** 6h

- **Assignee:** Diego Martin Ponce

- **Tags:** front

### ✅ SN-09.7 Preparación de pitch de ventas de Multinature

- **Context:** El pitch de venta para nutriologos y entrenadores de gimnasio debe dejar claro a los vendedores para que ellos cubran los siguientes puntos:

  - Presentar Multinature a nutriólogos y entrenadores de gimnasio.
  - Realizar sesiones uno a uno (presenciales o virtuales).
  - Entender las necesidades del especialista antes de ofrecer la solución.
  - Explicar claramente el funcionamiento del sistema y su valor.
  - Acompañar al especialista en su proceso inicial de adopción.
  - Retroalimentar al equipo sobre objeciones, dudas y mejoras detectadas.
  - Mantener registros básicos de seguimiento comercial.

- **Estimación:** 6h

- **Assignee:** Antoine Ganem, Miguel Angel Valdes

- **Tags:** ops

### ✅ SN-09.8 Onboarding para ventas de Multinature

- **Context:** Capacitar a los vendedores para que ellos cubran los siguientes puntos:

  - Presentar Multinature a nutriólogos y entrenadores de gimnasio.
  - Realizar sesiones uno a uno (presenciales o virtuales).
  - Entender las necesidades del especialista antes de ofrecer la solución.
  - Explicar claramente el funcionamiento del sistema y su valor.
  - Acompañar al especialista en su proceso inicial de adopción.
  - Retroalimentar al equipo sobre objeciones, dudas y mejoras detectadas.
  - Mantener registros básicos de seguimiento comercial.

- **Estimación:** 6h

- **Assignee:** Miguel Angel Valdes

- **Tags:** ops

### ✅ S_Infra_Pagos_Deuda_Tecnica-04.5 Quitar "specialistSettings" de la respuesta del login

- **Context:**

  - Quitar "specialistSettings" de la respuesta del login y dejar solo las "settingsBySpecialty".
  - Notificar a Pandalatec el nuevo cambio o considerar con negocio aplicar el cambio directamente en la applicación mobil.

- **Estimación:** 4h

- **Assignee:** Cristopher Reveles

- **Tags:** back

### ✅ S_Infra_Pagos_Deuda_Tecnica-04.6 Dejar de utilizar "specialistSettings" desde la respuesta del login y consultarlo de manera individual

- **Context:**

  - Dejar de utilizar "specialistSettings" desde la respuesta del login y consultarlo de manera individual en cada apartado donde sea necesario.
  - Mantener en el estado global del cliente las "specialistSettings", si en alguna vista las settings son necesarias y no se cuenta con ellas se debe consultar al backend, si ya se tiene dicha información en el estado global (o local) del cliente, no consultar al backend de nuevo.
  - Estas configuraciones de especialista deben ser atomicas por usuario y specialidad.
  - Estructura:
    ```
    "specialistSettings": {
      "chargeAdvancePayment": 32,
      "chargePerConsultation": 201,
      "monthlyCharge": 103,
      "receiveEmails": false
    }
    ```

- **Estimación:** 4h

- **Assignee:** Diego Martin Ponce

- **Tags:** back

### ✅ BUG-002 Error de timed out durante envio de correos

- **Context:**

  Error:

  ```
  2025-12-10T19:34:41.049Z d6f0fee0-ca2e-41e2-b83a-cdf37cbfc3df ERROR 📩 🡪 [emails-layer],[sendEmailsByNodemailerTransport()] ❌ Nodemailer SendEmail failed: Error: connect ETIMEDOUT 142.250.31.109:587 at TCPConnectWrap.afterConnect [as oncomplete] (node:net:1637:16) {
    errno: -110,
    code: 'ESOCKET',
    syscall: 'connect',
    address: '142.250.31.109',
    port: 587,
    command: 'CONN'
  }
  ```

  - Apoyarse de Samuel Reveles para cualquier tema relacionado con la VPN, las subnets, o todo lo que tenga que ver con la infraestructura del proyecto

- **Estimación:** 6h

- **Assignee:** Antoine Ganem

- **Tags:** back

### ✅ SN-09.9 Permitir a los usuarios desactivar su cuenta

- **Context:** Por petición de Pandalatec se agrego esta funcionalidad que permite al usuario eliminar su propia cuenta. El eliminado debe ser un eliminado lógico (desactivación de la cuenta)

  Mensaje de Liliana Monserrath de Pandalatec: _"Para la aplicación en iOS dependemos que nos apoyen con el botón de eliminar cuenta para poder subir la app ya que nos lo pide como requisito. Me gustaria que nos den una fecha aproximada para que lo tengan al igual que con la parte de notificaciones"_

- **Estimación:** 4h

- **Assignee:** Miguel Angel Valdes

- **Tags:** back

### ✅ S_Infra_Pagos_Deuda_Tecnica-04.7 Limpieza de endpoints sin utilizar y del api-collection de Bruno

- **Context:**

  - Actualmente las apis tiene vigentes endpoints que actualmente estan en desuso, eliminarlos para mantener el código limpio.
  - Al igual que los endpoints de cada api, el api-collection de Bruno esta desactualizado, hay falta de endpoints o inclusive falta agregar algunos endpoints, encargarse de limpiar toda el api-collection para permitir que todos los endpoints del sistema puedan ser consultados desde el api-collection de Bruno

- **Estimación:** 4h

- **Assignee:** Cristopher Reveles

- **Tags:** back

### ✅ SN-09.10 Registro de consultas de usuarios en base de datos (Auditoria de consultas)

- **Context:** Crear un auditLogger para registrar en base de datos las consultas que cada usuario ha realizado al sistema

- **Estimación:** 4h

- **Assignee:** Miguel Angel Valdes

- **Tags:** back

### ✅ OP-001 Monitoreo diario del estado real del sprint

- **Context:**

  - Descripción:
    Revisar todas las tareas activas del sprint y asegurarse de que su estado refleje el progreso real.
    Detectar tareas estancadas y escalar a Miguel cuando sea necesario.

  - Checklist:

    - Revisar To Do
    - Revisar In Progress
    - Revisar In Review
    - Revisar Blocked
    - Escalar tareas trabadas por 24h+
    - Notificar inconsistencias de estado
    - Criterios de aceptación:
    - Ninguna tarea queda con estado incorrecto
    - Los responsables reciben recordatorio cuando no actualizan estado
    - Miguel recibe reporte si hay riesgos en el sprint

### ✅ OP-002 Supervisión operativa de la columna In Review

- **Context:**

  - Descripción:
    Asegurar que cada tarea en In Review tenga:

    - un revisor asignado,
    - criterios claros de qué validar,
    - y un tiempo límite para revisión.

  - Checklist:
    - Verificar que toda tarea en In Review tiene revisor
    - Asegurar que tenga criterios de revisión
    - Notificar al revisor cuando esté atrasado
    - Escalar casos donde se acumulen más de 3 tareas
    - Criterios de aceptación:
    - Ninguna tarea permanece en In Review más de 48h sin revisión
    - El revisor confirma Done o regresa la tarea con comentarios

### ✅ OP-003 Depuración del Sprint (limpieza continua)

- **Context:**

  - Descripción:
    Mantener el sprint libre de tareas duplicadas, mal priorizadas o que no correspondan al alcance del sprint actual.

  - Checklist:

    - Identificar tareas que no deberían estar en el sprint
    - Sugerir moverlas al Backlog
    - Validar carga de trabajo equilibrada por persona
    - Escalar tareas mal definidas
    - Criterios de aceptación:
    - Sprint con solo tareas alineadas al objetivo del sprint
    - Carga de trabajo equivalente entre miembros
    - No hay tareas ambiguas en estado activo

### ✅ OP-004 Reporte de avance del sprint (2–3 veces por semana)

- **Context:**

  - Descripción:
    Generar un resumen ejecutivo de 3–5 líneas sobre el estado del sprint, cubriendo:

    - avance,
    - riesgos,
    - bloqueos,
    - acciones sugeridas.

  - Checklist:
    - Generar reporte
    - Compartir a Miguel
    - Registrar riesgos recurrentes
    - Sugerir ajustes
    - Criterios de aceptación:
    - Reporte puntual
    - Miguel tiene claridad de riesgos sin revisar todo el tablero
    - Se detectan patrones de bloqueo
