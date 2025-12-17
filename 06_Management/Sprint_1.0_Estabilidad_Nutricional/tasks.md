# [SN-01 SMAE – Auditoría y Corrección](../1.0_Estabilidad_Nutricional.md#11-smae--auditoría-y-corrección)

**Context:** El catálogo SMAE tiene datos corruptos, recipes incompletas, unidades incorrectas y equivalentes mal definidos. Este bloque sienta la base para porciones IA, GET y la edición de menús.

## TAREAS

### ✅ SN-01.1 Reparación manual de SMAE

- **Context:**

  - Corregir platillos detectados en auditoría.
  - Normalizar densidades, corregir recetas incompletas, validar que equivalentes sumen correctamente.
  - Correcciones estéticas/finales: etiquetas, orden, nombres duplicados, descripción estándar.
  - Validar que todos los platillos estén dentro de los grupos aprobados, y que no existan categorías custom fuera del estándar nutricional.

- **Estimación:** 6h

- **Assignee:** Antoine Ganem

- **Tags:** back

#### ✅ _(Nice-to-have)_ SN-01.2 Construir SMAE Cache (estructura final)

- **Context:** Mapear SMAE en un objeto optimizado para DietAgent: accesos O(1), normalizado, validado, sin valores rotos.

- **Estimación:** 6h

- **Assignee:** Miguel

- **Tags:** back

# [SN-02 MealTimes – Normalización Global](../1.0_Estabilidad_Nutricional.md#12-mealtimes--normalización-global)

**Context:**  
Los horarios de comida están inconsistentes entre módulos (IA, manual, DTOs, base de datos). La IA genera horarios incorrectos (cena 13:30). Se requiere un estándar único, validaciones automáticas y sincronización entre backend, frontend y DietAgent.

## TAREAS

### ✅ SN-02.1 Fundamentos de OpenAI Agent Kit y creación de un agente mínimo funcional

- **Context:** Entender cómo se estructura un agente, cómo se conectan los recursos, como se produce un agente mínimo funcional + comprensión del framework

- **Estimación:** 6h

- **Assignee:** Samuel Reveles

- **Tags:** back

### ✅ SN-02.2 Análisis estructural del DietAgent y documentación de su arquitectura interna

- **Context:** Tener una disección técnica del DietAgent y su funcionamiento.

- **Estimación:** 6h

- **Assignee:** Samuel Reveles

- **Tags:** back

### ✅ SN-02.3 Crear validador universal de MealTimes (backend)

- **Context:**

  - Validador que asegure el orden correcto.
  - Detectar overlaps, horas fuera de rango, saltos incoherentes.
  - Reutilizable para menús IA y manuales.

- **Estimación:** 6h

- **Assignee:** Samuel Reveles

- **Tags:** back

### ✅ SN-02.4 Ajustar transformadores IA para usar MealTimes estándar

- **Context:**

  - Normalizar horarios generados por la IA
  - Garantizar que DietAgent nunca genere horarios “rotos”

- **Estimación:** 6h

- **Assignee:** Samuel Reveles

- **Tags:** back

### ✅ SN-02.5 QA – Validación integral de MealTimes

- **Context:**

  - Revisar: creación de menús, edición, IA, DTOs
  - Matriz especial de casos rotos (horarios fuera de orden)
  - Garantizar que frontend y backend reflejan mismo estándar

- **Estimación:** 6h

- **Assignee:** Leo

- **Tags:** qa

# [SN-03 Porciones IA – Corrección y Validación](../1.0_Estabilidad_Nutricional.md#13-porciones-ia--corrección-y-validación)

**Context:**  
El motor de porciones del DietAgent presenta inconsistencias:

- asignaciones incorrectas,
- equivalentes que no suman lo requerido,
- colaciones sobredimensionadas,
- porciones imposibles (< 0.1),
- distribución no proporcional a GET.

Este bloque define la lógica robusta que sostendrá todos los menús IA y la edición granular del menú.

## TAREAS

### ✅ SN-03.1 Rediseñar algoritmo base de asignación de porciones (v1)

- **Context:**

  - Reescribir distribución inicial basada en GET.
  - Proporción desayuno/comida/cena con base clínica.
  - Crear matriz de distribución por tipo de objetivo (bajar, mantener, subir).

- **Estimación:** 6h

- **Assignee:** Miguel Angel Valdés García

- **Tags:** back

### ✅ SN-03.2 Verificación de límites por comida

- **Context:**

  - Definir máximo de equivalentes por grupo por comida.
  - Asegurar que ninguna comida supere límites clínicos.
  - Integración con SMAE corregido.

- **Estimación:** 6h

- **Assignee:** Miguel Angel Valdés García

- **Tags:** back

### ✅ SN-03.3 Normalizar porciones mínimas y máximas

- **Context:**

  - Garantizar que ninguna porción sea < 0.1.
  - Redondeo inteligente (0.1, 0.25, 0.5, 1.0).
  - Ajustes proporcionales entre comidas.

- **Estimación:** 3h

- **Assignee:** Miguel Angel Valdés García

- **Tags:** back

### ✅ SN-03.4 Ajustar colaciones según GET y distribución clínica

- **Context:**

  - Corregir exceso de calorías en colaciones.
  - Ajustar distribución AM/PM según objetivo del paciente.
  - Regla: colación no mayor que 25% de comida principal.

- **Estimación:** 4h

- **Assignee:** Miguel Angel Valdés García

- **Tags:** back

### ✅ SN-03.5 Ajustar transformadores IA para nuevas reglas de porciones

- **Context:**

  - Adaptar `transformMealPlanToMenus`.
  - Integrar reglas de equivalentes diarios + límites por comida.
  - Proteger menú de valores incoherentes.

- **Estimación:** 6h

- **Assignee:** Miguel Angel Valdés García

- **Tags:** back

### ✅ SN-03.6 QA – Validación de flujo de porciones IA

- **Context:**

  - Casos edge: GET alto, GET bajo, colaciones omitidas, objetivo subir peso.
  - Validar proporciones y equivalentes finales con matriz clínica.
  - Registrar bugs críticos para cierre del sprint.

- **Estimación:** 6h

- **Assignee:** Leo

- **Tags:** qa

# [SN-04 GET / CAF / AF – Unificación y Coherencia](../1.0_Estabilidad_Nutricional.md#14-get--caf--af--unificación-y-coherencia)

**Context:**  
Actualmente existen discrepancias entre:

- AF (Actividad Física)
- CAF (Coeficiente de Actividad Física)
- GET mal calculado según fórmula
- Inputs clínicos dispersos
- Nombres inconsistentes entre APIs, DTOs, DietAgent y formularios.

Este módulo define el **cálculo clínico correcto del GET**, estandariza CAF/AF y asegura que toda la cadena (backend → IA → DTOs → front) use un solo modelo coherente.

## TAREAS

### ✅ SN-04.1 Revisar fórmulas energéticas que hagan uso de CAF/AF

- **Context:**

  - Investigar si el uso del CAF que tenemos es correcto
  - Confirmar implementaciones actuales.
  - Detectar discrepancias entre fórmulas y versiones clínica

- **Estimación:** 6h

- **Assignee:** Samuel Reveles

- **Tags:** back

### ✅ SN-04.2 Unificar uso de CAF/AF en todo el proyecto

- **Context:**

  - Elegir un único parámetro oficial: CAF.
  - Remover duplicados AF/CAF.
  - Crear convertidores si es necesario.
  - Actualizar todos los archivos donde se calcule GET.

- **Estimación:** 6h

- **Assignee:** Samuel Reveles

- **Tags:** back, front

### ✅ SN-04.3 Validación clínica de actividad física desde formulario

- **Context:**

  - Detectar inconsistencias entre la actividad física reportada vs rango correcto.
  - Ajustar valores atípicos (CAF extremos).
  - Preparar inputs limpios para DietAgent.

- **Estimación:** 4h

- **Assignee:** Samuel Reveles

- **Tags:** back

### ✅ SN-04.4 Validación cruzada GET ↔ Porciones IA ↔ Objetivo

- **Context:**

  - Confirmar que el GET final corresponde al objetivo del paciente.
  - Alertar si GET no coincide con la distribución recomendada.
  - Integrar con validaciones del módulo de porciones.

- **Estimación:** 6h

- **Assignee:** Miguel Angel Valdés García

- **Tags:** back

### ✅ SN-04.5 QA – Pruebas de cálculo GET y coherencia

- **Context:**

  - Probar pacientes extremos (peso bajo/alto).
  - Validar CAF mínimos/máximos.
  - Revisar GET en 3 fórmulas distintas.
  - Reportar inconsistencias de cálculo.

- **Estimación:** 4h

- **Assignee:** Leo

- **Tags:** qa

# [SN-05 CRUD de Menús (Manual + IA)](../2.0_Operatividad_Especialista.md#11-crud-de-menús-manual--ia)

**Context:**  
El sistema actual genera menús IA con estructura inconsistente:

- órdenes rotos,
- platillos mal agrupados,
- equivalentes no alineados,
- campos faltantes,
- errores en transformadores,
- incompatibilidad con la edición granular del SN-06.

Este núcleo define la **estructura estandarizada del menú IA completo**, base para edición, visualización y almacenamiento JSON; así como permite la administración de menus y platillos

## TAREAS

### ✅ SN-05.1 Validar agrupación correcta de platillos en cada tiempo de comida

- **Context:**

  - Asegurar que los platillos estén correctamente asociados a su mealType.
  - Prevenir que la IA mezcle colaciones con comidas principales.
  - Validar compatibilidad con SMAE corregido.

- **Estimación:** 4h

- **Assignee:** Miguel Angel Valdés García

- **Tags:** back

### ✅ SN-05.2 Normalizar equivalentes y cálculos por comida

- **Context:**

  - Validar equivalentes por platillo.
  - Sumar equivalentes por comida y compararlos con lo esperado por el día.
  - Asegurar coherencia con el módulo SN-03 (Porciones IA).

- **Estimación:** 4h

- **Assignee:** Miguel Angel Valdés García

- **Tags:** back

### ✅ SN-05.3 Crear módulo de verificación nutricional por comida

- **Context:**

  - Verificar que cada comida cumpla con reglas clínicas mínimas.
  - Detectar comidas vacías o incompletas.
  - Registrar errores en un log nutricional.

- **Estimación:** 4h

- **Assignee:** Miguel Angel Valdés García

- **Tags:** back

### ✅ SN-05.4 QA – Validación núcleo de menús IA

- **Context:**

  - Validar estructura, agrupación, equivalentes, calorías.
  - Revisar compatibilidad app/web.
  - Reportar inconsistencias de transformador.

- **Estimación:** 4h

- **Assignee:** Leo

- **Tags:** qa

### ✅ SN-05.5 Prueba integral: GET → Porciones → Menú IA

- **Context:**

  - Validar pipeline completo desde formulario → GET → porciones → menú final.
  - Detectar rupturas o divergencias.
  - Base para cierre de sprint clínico.

- **Estimación:** h

- **Assignee:** Miguel Angel Valdés García

- **Tags:** back

### ✅ SN-05.6 Agregar el detalle de los platillos en las vista del "Home" y del "Seguimiento a mi plan"

- **Context:**

  - Renderizar menú IA con estructura final (SN-05).
  - Habilitar selección de platillos, inputs de porciones y horarios.

- **Estimación:** 2h

- **Assignee:** Diego Martin Ponce

- **Tags:** front

### ✅ SN-05.7 Crear interfaz para ver, crear, actualizar y eliminar menus

- **Context:** Actualmente los especialistas no cuentan con una interfaz para administrar los menus que crean durante el desarrollo de las dietas de sus pacientes. Crear un espacio que les permita llevar a cabo dicha administración. Considerar agregarlo como una pestaña más desde la vista de "Configuración de Especialidad" (https://www.multinature.mx/specialist/settings/); algo como la pestaña de "Cuestionarios" (https://www.multinature.mx/specialist/settings/?tab=questionnaires). Considerar que la lista del GET será un endpoint páginado que responde con los menus del especialista y después los de Multinature.

- **Estimación:** 3h

- **Assignee:** Diego Martin Ponce

- **Tags:** front

### ✅ SN-05.8 Crear interfaz para ver, crear, actualizar y eliminar alimentos (foods)

- **Context:** Actualmente los especialistas no cuentan con una interfaz para administrar los alimentos (foods o comidas) que crean durante el desarrollo de las dietas de sus pacientes. Crear un espacio que les permita llevar a cabo dicha administración. Considerar agregarlo como una pestaña más desde la vista de "Configuración de Especialidad" (https://www.multinature.mx/specialist/settings/); algo como la pestaña de "Cuestionarios" (https://www.multinature.mx/specialist/settings/?tab=questionnaires). Considerar que la lista del GET será un endpoint páginado que responde con los menus del especialista y después los de Multinature.

- **Estimación:** 3h

- **Assignee:** Diego Martin Ponce

- **Tags:** front

### ✅ SN-05.9 Agregar variable is_global a menus y foods

- **Context:** Agregar variable is_global a menus y foods para que estos puedan ser elegidos como menus y alimentos globales por especialistas

- **Estimación:** 4h

- **Assignee:** Erick Robles

- **Tags:** back

### ✅ SN-05.10 Desarrollar CRUD de menus

- **Context:** Permitir al usuario:

  - Listar menus por specialistId, esta lista debe tener también los menus globales de Multinature (aquellos con specilistId = null). Deben estar ordenados, primero deben aparecer los menus del especialista, después los Multinature. El endpoint debe manejar paginado.
  - Crear menus por especialista
  - Actualizar menus del especialista
  - Eliminar menus del especialista

- **Estimación:** 4h

- **Assignee:** Erick Robles

- **Tags:** back

### ✅ SN-05.11 Desarrollar CRUD de foods (platillos / comidas)

- **Context:** Permitir al usuario:

  - Listar platillos por specialistId, esta lista debe tener también los platillos globales de Multinature (aquellos con specilistId = null). Deben estar ordenados, primero deben aparecer los foods del especialista, después los Multinature. El endpoint debe manejar paginado.
  - Crear foods por especialista. Actualmente solo se permiten ingredientes cargados en el sistema (Ingredientes Multinature)
  - Actualizar foods del especialista. Actualmente solo se permiten ingredientes cargados en el sistema (Ingredientes Multinature)
  - Eliminar foods del especialista

  _**NOTA**: Si la tabla foods no tiene una columna para distinguir entre platillos por usuario, esta debe ser creada con el fin de sostener la logica solicitada._

- **Estimación:** 4h

- **Assignee:** Erick Robles

- **Tags:** back

# [SN-06 Edición de Menús IA](../2.0_Operatividad_Especialista.md#12-edición-de-menús-ia)

**Context:**  
Los especialistas deben editar menús generados por IA: cambiar platillos, mover horarios, ajustar porciones, modificar equivalentes, agregar/eliminar alimentos, etc.  
El sistema actual no permite edición granular, no registra cambios y no tiene un modelo de diff ni trazabilidad.

Esta épica construye el editor completo.

## TAREAS

### ✅ SN-06.1 Implementar UI del editor (v1 – estructura)

- **Context:**

  - Renderizar menú IA con estructura final (SN-05).
  - Habilitar selección de platillos, inputs de porciones y horarios.

- **Estimación:** 6h

- **Assignee:** Diego Martin Ponce

- **Tags:** front

### ✅ SN-06.2 Implementar UI de edición granular (v2 – DietAgent Actions)

- **Context:**

  - Habilitar botones: agregar platillo, eliminar platillo, cambiar orden, editar equivalentes.
  - Integración con endpoint PATCH.

- **Estimación:** 6h

- **Assignee:** Diego Martin Ponce

- **Tags:** front

### ✅ SN-06.3 QA – Validación del editor completo

- **Context:**

  - Probar edición granular: porciones, horarios, equivalentes.
  - Validar diffs, menú final y recalculado nutricional.
  - Probar casos edge: remover comida completa, mover horarios extremos.

- **Estimación:** 5h

- **Assignee:** Leo

- **Tags:** qa

### ✅ SN-06.4 Unificar flujo de creación/edición de Menús con estado local previo al POST de creación de dieta

- **Context:** Edición de la vista /plan/diet/create-menu/menuId=? para que recibir la informacion del Menu a editar, además, actualizar los cambios de los menus unicamente de manera local (en Local Storage), esto con el fin de que se creen los menus junto con las dietas en el POST de creación de dieta

- **Estimación:** 6h

- **Assignee:** Cristopher Reveles

- **Tags:** front

# SN-07 QA Núcleo Nutricional

**Context:**  
Después de los cambios en SMAE, MealTimes, Porciones IA, GET/CAF/AF, Menús IA y Editor IA, es obligatorio validar de forma sistemática que:

- los cálculos sigan siendo clínicamente coherentes,
- no se hayan roto flujos previos,
- los menús generados por IA sean editables sin inconsistencia,
- las respuestas de las APIs nutricionales sean estables y predecibles.

Este bloque define el esfuerzo de QA dedicado al núcleo nutricional.

## TAREAS

### ✅ SN-07.1 Diseñar matriz de pruebas núcleo nutricional

- **Context:**

  - Crear una matriz de casos de prueba que cubra:

  * SMAE corregido,
  * GET/CAF/AF,
  * Porciones IA (SN-03),
  * Menús IA (SN-05),
  * Edición de Menús IA (SN-06),
  * DTOs nutricionales (SN-07).

  - Considerar pacientes con distintos objetivos y perfiles (peso bajo, peso alto, deportistas, etc).

- **Estimación:** 5h

- **Assignee:** Leo

- **Tags:** qa

### ✅ SN-07.2 Ejecutar pruebas manuales sobre flujo completo IA

- **Context:**

  - Validar el flujo: formulario clínico → cálculo GET → generación de dieta IA → porciones → menú IA → edición de menú → menú final.
  - Registrar resultados en la matriz de pruebas.
  - Reportar bugs con evidencia (screenshots, payloads).

- **Estimación:** 6h

- **Assignee:** Leo

- **Tags:** qa

### ✅ _(Nice-to-have)_ SN-07.3 Pruebas específicas de regresión en SMAE y equivalentes

- **Context:**

  - Validar que las correcciones de SMAE no rompan menús ya existentes.
  - Probar menús antiguos vs nuevos con el catálogo corregido.
  - Documentar cualquier diferencia relevante.

- **Estimación:** 4h

- **Assignee:** Leo

- **Tags:** qa

### ✅ _(Nice-to-have)_ SN-07.4 Pruebas de estrés básico en DietAgent (nutrición)

- **Context:**

  - Ejecutar múltiples llamadas consecutivas al DietAgent con distintos perfiles de usuario.
  - Validar tiempo de respuesta y estabilidad.
  - Verificar que no se generen respuestas vacías o incompletas.

- **Estimación:** 4h

- **Assignee:** Leo

- **Tags:** qa

### ✅ SN-07.5 Documentar resultados QA núcleo nutricional

- **Context:**

  - Documentar resumen de hallazgos:

  * bugs críticos,
  * riesgos,
  * comportamientos aceptables.

- **Estimación:** 3h

- **Assignee:** Leo

- **Tags:** qa

### ✅ SN-07.6 QA operativo – Flujo completo del especialista

- **Context:**

  - Recorrer el flujo real “como especialista”:

  * entrar, ver paciente, revisar dietas, editar, guardar, revisar historial.

  - Verificar que nada se sienta roto o contraintuitivo en la operación diaria.
  - Registrar hallazgos en un pequeño resumen para posibles mejoras futuras.

- **Estimación:** 6h

- **Assignee:** Leo

- **Tags:** qa

### ✅ SN-07.7 Actualizar la propiedad de la imagen del platillo que consume el tooltip del resumen de la dieta del agente.

- **Context:** Añadir la propiedad foodUrlImage a la query para el tooltip de platillos, para motrar la imagen del platillo y no la imagen del priimer ingrediente.

- **Estimación:** 2h

- **Assignee:** Erick Robles

- **Tags:** back

### ✅ SN-07.8 Ejecutar pruebas manuales sobre la APP Multinature

- **Context:**

  - Validar todos los flujos disponibles de Multinature
  - Registrar resultados en la matriz de pruebas (Excel y Figma).
  - Reportar bugs con evidencia (screenshots, payloads).

- **Estimación:** 6h

- **Assignee:** Leo

- **Tags:** qa

# SN-08 Actualizaciones a PDF de dietas

**Context:**  
Después de realizar una dieta el sistema permite la generación de un PDF con el resumen de la misma

Este bloque esta dedicado a las innovaciones y a la corrección de BUGs de la funcionalidad responsable de generar los PDF resumenes de dietas.

## TAREAS

### ✅ SN-08.1 El PDF debe permitir la visualización correcta de n cantidad de menus

- **Context:** Al añadir muchos menus a la dieta el PDF recorta el contenido de la dieta lo que provoca que no se visualice de manera correcta la dieta.

- **Estimación:** 3h

- **Assignee:** Antoine Ganem

- **Tags:** back

### ✅ SN-08.2 Permitir que los especialistas puedan subir sus logos al PDF

- **Context:** Agregar lo necesario para permitir a los especialistas manejar sus logos propios en los PDFs resumenes de dietas.

- **Estimación:** 6h

- **Assignee:** Antoine Ganem

- **Tags:** back

# SN-09 Soporte Operativo y Mantenimiento General

**Context:**  
Consolidación de actividades necesarias para asegurar el funcionamiento continuo del ecosistema Multinature, la correcta experiencia de uso (web y app), y las gestiones externas requeridas para próximos despliegues.

## TAREAS

### ✅ SN-09.1 Crear las cuentas de App Store y Google Play Store para el próximo despliegue de la APP.

- **Context:** Crear las cuentas para más adelante subir la APP a las distintas tiendas de aplicaciones mobiles. Esta tarea incluye la sincronización con Pandalatec para ver si se puede realizar el despliegue de la APP desde sus cuentas para después hacerlo desde las nuestras

- **Estimación:** 6h

- **Tags:** back

### ✅ SN-09.2 Revisar el uso del sistema por Lorena.

- **Context:** Revisar los logs de los movimientos de Lorena dentro del sistema

- **Estimación:** 1h

- **Assignee:** Miguel Angel Valdés García

- **Tags:** back

### ✅ SN-09.3 Mostrar siempre los últimos Formularios de evaluación respondidos del paciente

- **Context:** Al ingresar a los “Formularios de evaluación” de un paciente, por defecto debería mostrar los últimos formularios respondidos de ese paciente solo hasta el momento de seleccionar un cuestionario es hasta cuando debería filtrar. “Selecciona un cuestionario para ver sus respuestas.” Eso no debería ser necesario, por defecto mostremos los últimos formularios respondidos del paciente

- **Estimación:** 1h

- **Assignee:** Diego Martin Ponce

- **Tags:** back

### ✅ SN-09.4 Infinitas peticiones al editar un platillo y reparación de loading de los filtros de comidas personales y Multinature.

- **Context:** El dialog de edición de platillo estaba haciendo peticiones infinitas, y los filtros de platillos "Mis platillos" estaba realizando peticiones infinitas porque el scroll infinito de imágenes no detectaba donde era el fin

- **Estimación:** 4h

- **Assignee:** Erick Robles

- **Tags:** front

### ✅ SN-09.5 Permitir gestión de “Configuración de Especialidad” por especialidad

- **Context:** Actualmente las “Configuraciones de Especialidad” se manejan de forma global y no están asociadas a una especialidad específica.
  Se requiere extender el modelo de datos y los endpoints para que cada configuración pueda asignarse explícitamente a una o varias especialidades, permitiendo su creación, edición, consulta y eliminación conforme a dicha relación.

Alcance técnico:

- Asociar Configuración de Especialidad ↔ Especialidad en base de datos.
- Ajustar endpoints para:

  - Crear configuración ligada a especialidad.
  - Editar configuración y su especialidad asociada.
  - Listar configuraciones para que el cliente pueda filtradas por especialidad.
  - Eliminar configuraciones respetando su relación.

- **Estimación**: 4h

- **Assignee:** Erick Robles

- **Tags:** back

### ✅ SN-09.6 Visualizar y administrar “Configuración de Especialidad” por especialidad

- **Context:** Con la nueva lógica de asignación por especialidad, la interfaz debe reflejar claramente que las “Configuraciones de Especialidad” ya no son globales, sino dependientes de la especialidad seleccionada. El usuario debe entender qué configuración pertenece a qué especialidad, y operar sobre ellas sin ambigüedad.

Alcance funcional:

- Permitir seleccionar una especialidad activa (dropdown / selector).
- Mostrar únicamente las configuraciones asociadas a la especialidad seleccionada.
- Ajustar flujos de:
  - Alta (crear configuración ligada a especialidad).
  - Edición (mostrar especialidad actual y permitir cambio si aplica).
  - Eliminación.
- Evitar operaciones “globales” ambiguas (no mezclar configuraciones de distintas especialidades).
- Reflejar estados vacíos claros (“esta especialidad no tiene configuraciones”).

El usuario nunca debe tener duda de:

- Para qué especialidad está viendo configuraciones.
- Para cuál especialidad está creando o editando una configuración.

- **Estimación**: 4h

- **Assignee:** Diego Martin Ponce

- **Tags:** front

---

### ✅ SN-10.1 Añadir la lógica para editar platillos en el endpoint de save-diet

> Tarea creada por Antoine

- **Estimación:** Sin estimación

- **Assignee:** Antoine Ganem
