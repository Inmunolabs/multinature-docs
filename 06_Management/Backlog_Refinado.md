# Backlog Refinado

> ARCHIVO EN REVISIÓN

Backlog general organizado por sprints y categorías para facilitar la planificación y ejecución. Este backlog incluye tareas y funcionalidades de todo tipo:

- **Propuestas del equipo**: Ideas y mejoras sugeridas por miembros del equipo
- **Feedback de usuarios/especialistas/Andrés**: Requerimientos y sugerencias basadas en uso real
- **Deuda técnica**: Mejoras técnicas, refactorizaciones y optimizaciones pendientes
- **Innovaciones**: Nuevas funcionalidades y características que mejoran el producto
- **Nuevas funcionalidades**: Features solicitadas o identificadas como necesarias
- **Bugs**: Problemas identificados que requieren corrección
- **Mejoras**: Optimizaciones de funcionalidades existentes

Cada ítem incluye contexto suficiente para que el equipo pueda trabajar sin necesidad de consultas adicionales.

---

## Sprint 1 – Beta Final

### Bugs

#### SMAE roto en varios platillos

El sistema SMAE (Sistema de Menús y Alimentos Equivalentes) presenta inconsistencias en varios platillos, afectando la precisión de las equivalencias nutricionales y la generación de dietas.

#### Porciones incorrectas en dietas IA

Las porciones calculadas por el DietAgent no siempre son correctas, generando discrepancias entre lo planificado y lo recomendado. Requiere revisión de los algoritmos de cálculo de porciones.

#### MealTimes inconsistentes

Los horarios de comida (mealTimes) presentan inconsistencias en diferentes partes del sistema, afectando la visualización y organización de menús.

### Mejora

#### Formularios más legibles

Mejorar la legibilidad de los formularios clínicos mediante mejor organización visual, agrupación lógica de preguntas y mejor uso del espacio en pantalla. Incluye unificar unidades de medida y optimizar flujo de llenado.

### Funcionalidad Nueva

#### Vista unificada de menús (manual + IA)

Crear interfaz que muestre tanto menús creados manualmente como generados por IA en una sola vista. Permitir comparación y transición entre ambos tipos. Mejorar navegación y organización.

#### Edición de menús generados por IA desde JSON en DB

Implementar capacidad de editar menús generados por IA. Modificar platillos, porciones y horarios directamente desde la interfaz. Guardar cambios en formato JSON en base de datos manteniendo trazabilidad.

#### CRUD completo de platillos

Crear, leer, actualizar y eliminar platillos individuales. Validaciones de datos y permisos. Integración con SMAE para búsqueda de recetas.

#### CRUD de menús

Crear, leer, actualizar y eliminar menús completos. Asociación con pacientes y especialistas. Gestión de versiones y historial. Soporte para menús tanto manuales como generados por IA.

### Débito Técnico

#### Validación de endpoints críticos con Leo

Ejecutar pruebas completas de endpoints críticos. Validar casos edge y manejo de errores. Documentar resultados y corregir issues encontrados.

---

## Sprint 2 – Rumbo a Versión 1.0

### Bugs

#### Emails: corrección de contenido + estilo unificado

- Corregir campos incorrectos en plantillas de email
- Unificar estilo y formato de todos los emails
- Validar datos antes de envío
- Asegurar consistencia visual y de contenido en todas las comunicaciones por email

### Funcionalidad Nueva

#### Completar módulo de Rutinas

- **Generar PDFs de rutinas para los pacientes**

  - Implementar generador de PDF para rutinas completas
  - Incluir información de ejercicios, series, repeticiones y descansos
  - Formato profesional y legible

- **CRUD Rutina por semana**

  - Implementar gestión de rutinas organizadas por semana
  - Crear, leer, actualizar y eliminar rutinas semanales
  - Asociación de ejercicios por día de la semana
  - Validaciones de consistencia semanal
  - Integración con sistema de seguimiento

- **Migración de sistema antiguo a nuevo**
  - Identificar y documentar tablas antiguas de rutinas
  - Crear scripts de migración de datos antiguos a nueva estructura
  - Eliminar queries y código legacy relacionado con rutinas
  - Validar integridad de datos migrados
  - Ejecutar migración en ambiente de desarrollo
  - Ejecutar migración en producción con plan de rollback
  - Actualizar documentación de esquema de base de datos

#### Agente de Rutinas (RoutinesAgent) (generación + edición)

Implementar generación automática de rutinas de ejercicio usando IA. Crear editor visual para modificar rutinas generadas. Integrar con sistema de seguimiento para usuarios en app móvil. Validar rutinas con especialistas en ejercicio.

#### Agente de citas (BookingsAgent)

Implementar asistente IA para agendamiento de citas. Recordatorios automáticos.

#### Chatbot inicial

Implementar chatbot básico para atención inicial de pacientes. Respuestas a preguntas frecuentes. Derivación a especialista cuando sea necesario. Integración con sistema de notificaciones.

> Estatus actual del Chatbot (**ia-agent-api**) (_a criterio de Samuel_): Agregaba cosas al carrito, recomendaba productos, te decía como hacer algunas cosas en la página Y te investigaba disponibilidad de horario para citas

#### App: implementación de rutinas

> (Pandalatec)

Completar funcionalidad de rutinas en app móvil. Visualización de rutinas asignadas. Seguimiento de ejercicios completados. Notificaciones de recordatorios. Sincronización con backend.

### Mejora

#### Mejoras al DietAgent

- Mejorar precisión de cálculos GET/AF
- Clarificar diferencia entre CAF y AF
- Mejorar justificaciones clínicas
- Mejorar validaciones
- Completar refinamientos iniciados en Sprint 1
- Optimizar performance
- Optimizar experiencia de usuario

#### Mejoras a formularios

- Completar refinamientos iniciados en Sprint 1
- Mejorar validaciones
- Optimizar experiencia de usuario

### Experiencia del Paciente

#### App rutinas

Implementar funcionalidad completa de rutinas de ejercicio en la app móvil:

- Visualización de rutinas asignadas
- Seguimiento de ejercicios completados
- Notificaciones de recordatorios
- Gráficas de progreso

---

## Sprint 3 – Rumbo a Versión 1.1

### Funcionalidad Nueva

#### Agente Clínico

Análisis de historial clínico de pacientes usando IA. Consulta de bibliografías, libros médicos, publicaciones, etc.

#### Chatbot inicial / Agente Clínico

Implementar resúmenes de pacientes para facilitarle la consulta al especialista.

### Mejora

#### Mejoras a PDFs de rutinas

- Personalización con datos del paciente y especialista
- Opción de descarga y envío por email/WhatsApp

#### Mejoras al RoutinesAgent

- Mejorar precisión de generación de rutinas de ejercicio
- Validar rutinas con especialistas en ejercicio
- Completar refinamientos iniciados en Sprint 2
- Mejorar validaciones
- Optimizar experiencia de usuario

#### Mejoras al BookingsAgent

- Sugerencias inteligentes de horarios basadas en disponibilidad
- Recordatorios automáticos personalizados
- Optimización de agenda del especialista
- Completar refinamientos iniciados en Sprint 2
- Mejorar validaciones
- Optimizar experiencia de usuario

---

## Sprint 4 – Notificaciones y Documentación

### Funcionalidad Nueva

#### Primer set de notificaciones

- Implementar lambda principal de notificaciones
- Notificaciones por email
- Sistema de preferencias de usuario
- Eventos: citas, recordatorios de dieta, resultados de estudios

> (Pandalatec)

- Notificaciones push para app móvil

#### Documentación de reglas y flujos

- Documentar todas las reglas de negocio críticas
- Crear diagramas de flujo de procesos principales
- Documentar decisiones arquitectónicas importantes
- Mantener documentación actualizada

---

## Backlog General (Sin Sprint Asignado)

### Bugs

(Ninguno pendiente fuera de sprints)

### Mejora

#### Historial clínico estructurado

Reestructurar el historial clínico para que sea más fácil de navegar, con mejor organización temporal, agrupación por tipo de información y búsqueda/filtrado.

#### Plantillas de menús reutilizables

Implementar sistema de plantillas de menús que permita a especialistas crear estructuras reutilizables para diferentes pacientes, ahorrando tiempo en la creación de dietas.

### Funcionalidad Nueva

#### Recetario completo

Implementar sistema completo de recetario médico que incluya editor de recetas, buscador de fármacos, generación de PDF con membrete y firma, y envío por WhatsApp o email.

#### Login con Google

Implementar autenticación OAuth con Google para facilitar el acceso de usuarios al sistema, reduciendo fricción en el registro y login.

#### Exportación PDF personalizada

Mejorar el generador de PDF para incluir personalización avanzada, diferentes formatos según tipo de documento (dieta, receta, historial) y mejor diseño visual.

#### Migrar a arquitectura completamente de microservicios

Migrar el sistema actual a una arquitectura completamente basada en microservicios. Esto implica:

- Descomponer el monolito actual en servicios independientes
- Implementar comunicación entre servicios (API Gateway, message queues, eventos)
- Configurar despliegues independientes en AWS Lambda
- Establecer estrategia de transición progresiva que minimice riesgos
- Definir contratos de API entre servicios y versionado
- Implementar monitoreo y observabilidad distribuida

#### Funcionalidades de médicos generales

Desarrollar línea de producto completa para médicos generales, incluyendo:

- Historial clínico completo con motivo de consulta, antecedentes, alergias, enfermedades crónicas
- Creación de recetas médicas con editor y buscador de fármacos
- Gestión de estudios y resultados (laboratorios, rayos X, etc.)
- Seguimiento de signos vitales y controles con gráficas
- Clasificación de citas por tipo (consulta general, control, seguimiento, resultados)
- Interconsulta entre especialistas
- Panel de diagnóstico y sugerencias automáticas
- Bitácora de evolución médica

**Nota**: Esta es una iniciativa futura (epic) que se considera para fases posteriores a la versión 1.0.

#### Revisar migraciones 001, 015, 016, 020 y migración de diets-api/doc

Realizar revisión técnica completa de los archivos de migración:

- `001-insert-concepts-and-products.sql` (multi-mysql-layer)
- `015-update_dietagent_intake_form.sql` (multi-mysql-layer)
- `016-update_dietagent_questions_index.sql` (multi-mysql-layer)
- `020-insert-dietagent-form.sql` (multi-mysql-layer)
- Migración existente en `diets-api/doc` (identificar y documentar)

Tareas:

- Verificar alineación del DDL con las entidades actuales en código
- Validar que todas las migraciones estén aplicadas correctamente
- Integrar la migración de `diets-api/doc` al flujo oficial de migraciones
- Documentar dependencias entre migraciones
- Asegurar que el orden de ejecución sea correcto

#### Registro de cambios de endpoints en api-collection

Implementar sistema de registro de cambios para endpoints en el repositorio `api-collection`:

- Cuando un endpoint se modifique, registrar:
  - Cómo se actualizó la respuesta del endpoint (antes/después)
  - Justificación del cambio
  - Asociación con la rama de Git correspondiente
  - Asociación con la tarea de ClickUp relacionada
- Crear estructura de versionado (changelog, carpeta de specs versionadas o similar)
- Mantener historial de cambios para facilitar debugging y comunicación con frontend
- Documentar breaking changes y migraciones necesarias

#### En FoodOptions: ordenar y filtrar por mayoría de grupos equivalentes

Implementar funcionalidad de ordenamiento y filtrado en el endpoint `FoodOptions` basado en la mayoría de grupos equivalentes:

- Ordenar opciones de comida por cantidad de grupos equivalentes que cumplen
- Filtrar opciones que cumplan con un mínimo de grupos equivalentes requeridos
- Mejorar la relevancia de resultados para el agente IA y flujos manuales
- Impacto en UX: mostrar primero las opciones más completas y relevantes

#### Mercado Pago de Multi

Completar integración de Mercado Pago para Multinature (Multi):

- Verificar que el flujo de pagos esté completamente funcional
- Implementar conciliación básica de pagos
- Configurar webhooks para notificaciones de pago
- Documentar proceso de pagos y órdenes con Mercado Pago
- Validar manejo de errores y casos edge

#### Credenciales de Openpay de Multi

Revisar, almacenar de forma segura y usar correctamente las credenciales de Openpay:

- Auditar dónde se almacenan las credenciales (variables de entorno, secrets)
- Asegurar que no estén hardcodeadas en código
- Verificar que el flujo de pago que las usa esté bien referenciado en documentación
- Implementar rotación segura de credenciales
- Validar que las credenciales de producción y desarrollo estén separadas

#### Implementación de Kuesky

Integrar Kuesky como medio de pago adicional en el ecosistema:

- Investigar API y documentación de Kuesky
- Implementar integración similar a Openpay y Mercado Pago
- Agregar Kuesky como opción en el sistema de métodos de pago
- Configurar flujo de pagos y conciliación
- Documentar proceso y casos de uso

### Débito Técnico

#### Gitflow completo + workflows automáticos

Implementar gitflow completo y estricto en todo el proyecto:

- Definir y documentar flujo de ramas (main, develop, feature, hotfix)
- Configurar protecciones de rama en GitHub
- Configurar workflows de CI/CD completos
- Automatizar testing y validaciones en pipelines
- Establecer proceso de code review obligatorio
- Integrar validaciones automáticas (linting, tests, builds) en cada push/PR

#### Dockerización backend

Dockerizar el backend completo para facilitar desarrollo local y despliegues:

- Crear Dockerfiles para cada API y layer
- Configurar docker-compose para desarrollo local
- Documentar proceso de build y deploy con Docker
- Integrar con CI/CD

#### Limpieza de endpoints repetidos

Identificar y eliminar endpoints duplicados o redundantes:

- Auditar todas las APIs para encontrar duplicación
- Consolidar funcionalidad en endpoints únicos
- Actualizar documentación y clientes que usen endpoints eliminados
- Reducir superficie de ataque y complejidad de mantenimiento

#### Validación DDL vs entities

Completar y automatizar validación de alineación entre DDL documentado y entities en código:

- Mejorar script `validate-entities-vs-ddl.js`
- Ejecutar validación en CI/CD
- Documentar discrepancias encontradas y plan de corrección
- Establecer proceso para mantener sincronización

#### Refactorizar queries de diets.js

El archivo `layers/multi-mysql-layer/src/queries/diets.js` contiene demasiados queries y necesita refactorización:

- Separar queries en archivos diferentes por dominio
- Agregar comentarios descriptivos
- Eliminar queries no utilizados
- Mejorar organización y mantenibilidad

#### Refactorizar validación de rutas Openpay

Revisar si Openpay debe validar sus rutas en el sistema de permisos de Multinature (`layers/multi-commons-layer/src/utils/permissions/routes.js`):

- Evaluar necesidad de validación
- Simplificar lógica si no es necesaria
- Documentar decisión

#### Mejorar manejo de errores en pagos

Cambiar todos los `throw new Error` por `response.error` en el sistema de pagos donde sea posible:

- Revisar `apis/payments-api/src/rules/OrderPaymentRules.js`
- Usar constantes para mensajes de error para facilitar i18n
- Mejorar consistencia en manejo de errores

#### Refactorizar propiedades de métodos de pago

Refactorizar uso de `usedMethod` en código de pagos:

- Considerar cambiar propiedades `openpay` y `mercadopago` por `paymentProvider`
- Unificar estructura de datos de métodos de pago
- Simplificar lógica de procesamiento

#### Revisar consultas redundantes en Openpay

Eliminar consultas redundantes aprovechando `req.requestUser` almacenado desde middleware:

- Revisar `layers/multi-commons-layer/src/services/openpay.js`
- Optimizar queries a base de datos
- Mejorar performance

#### Revisar método de actualización de suscripciones

Revisar `updateSubscriptionDate()` en `monthly-purchases-api`:

- Evaluar si usar `now()` es suficiente
- Verificar lógica de cálculo de fechas
- Mejorar precisión y confiabilidad

#### Revisar almacenamiento de datos de Openpay

Clarificar qué datos de Openpay se deben guardar:

- ID de suscripción, ID de cliente o ID de método de pago
- Documentar qué se guarda y por qué
- Asegurar consistencia en almacenamiento

#### Completar funcionalidades pendientes de monthly-purchases

Varias funcionalidades pendientes en `monthly-purchases-api`:

- Agregar `nextPurchaseDate` a respuesta de monthly purchases
- Eliminar método `getMonthlyPurchaseByUserId` (solo una compra mensual por usuario)
- Permitir guardar compra mensual sin generar suscripción en Openpay (como carrito)
- Actualizar método de pago por defecto al cambiar método de pago
- Generar orden en sistema al generar compra mensual (mes a mes)
- Eliminar producto de compras mensuales al eliminar producto
- Notificar admin si producto sin stock al generar orden de compra mensual

#### Revisar validación de certificados

Agregar validación de cuando un certificado está aprobado en `layers/multi-mysql-layer/src/queries/usersSpecialties.js`:

- Implementar lógica de validación
- Mejorar seguridad y consistencia de datos

#### Corregir nombres de tablas en queries de foods

Corregir nombres de tablas usando constantes en lugar de strings hardcodeados en `layers/multi-mysql-layer/src/queries/foods.js`:

- Usar constantes de nombres de tablas
- Mejorar mantenibilidad

#### Adaptar para usar createFood

Adaptar código para usar `createFood` en lugar de `insertFood` en queries de foods:

- Unificar métodos de creación
- Mejorar consistencia

#### Revisar refresh token de Google Sheets

Implementar refresh token para scripts de Google Sheets:

- `layers/multi-commons-layer/src/utils/googleSheetsScripts/sheetScript.js`
- `layers/multi-commons-layer/src/utils/googleSheetsScripts/dietScript.js`
- `layers/multi-commons-layer/src/utils/googleSheetsScripts/routineScript.js`
- Evitar pérdida de funcionalidad cuando token vence

#### Revisar registro de cuentas Wire4

Revisar si se pueden registrar cuentas con la misma CLABE pero diferente información de usuario en `layers/multi-commons-layer/src/services/wire4/accounts.js`:

- Evaluar lógica de validación
- Mejorar manejo de casos edge

#### Revisar método de dateTools

Aplicar single responsibility al método en `layers/multi-commons-layer/src/utils/dateTools.js`:

- Refactorizar para mejorar mantenibilidad
- Separar responsabilidades si es necesario

#### Revisar constante de métodos de pago

Verificar si constante en `layers/multi-commons-layer/src/utils/constants/paymentMethods.js` está en uso o fue sustituida por `CardUses`:

- Eliminar si no se usa
- Documentar si se mantiene

#### Completar TODOs críticos de users-api

Varios TODOs críticos en `apis/users-api/handler.js`:

- Cuando se elimine especialista, eliminarlo también de usuarios que lo tienen asignado
- Permitir que usuario cambie su especialista
- Agregar proceso para que consumidor se haga socio
- Agregar proceso para que consumidor se haga especialista
- Agregar proceso para que socio se haga especialista
- Hacer SELECT de password separado del SELECT \* para no exponer contraseñas

#### Revisar endpoint de foods and ingredients

Revisar cómo se envía la respuesta en endpoint de foods and ingredients (`apis/diets-api/src/dto/dietToDTO.js`):

- Verificar estructura de respuesta
- Agregar elementos en foods e ingredients si no es posible respetar estructura

#### Reutilizar método de verificación de código

Reutilizar método de `apis/users-api/src/services/verificationCode.js` en `apis/users-api/src/middlewares/validator.js` (passRecoveryCodeValidation):

- Eliminar duplicación
- Mejorar mantenibilidad

#### Revisar implementación de MercadoPago

Revisar implementación de MercadoPago en `apis/orders-api/src/classes/PaymentMethods.js`:

- Evaluar si requiere valores específicos en constructor
- Revisar por qué se recicló `toString` de OpenpayStorePaymentMethod
- Revisar por qué no se genera `createOrderURL` aquí

#### Revisar status de orden

Revisar por qué no aparece el status como "preparando pedido" aunque se haya pagado en `apis/orders-api/src/classes/OrderTemplate.js`:

- Corregir lógica de actualización de status
- Mejorar flujo de estados

#### Revisar configuración de VPC en producción

Actualizar configuración de VPC con subnets y security groups de producción en `apis/payments-api/configDeploy/serverless-prod.yaml`:

- Completar configuración de infraestructura
- Asegurar seguridad y conectividad

#### Revisar dataOrigin en agent.js

Aplicar `dataOrigin` correctamente en todos los niveles en `apis/diets-api/src/openai/agent.js`:

- Mejorar trazabilidad de datos
- Asegurar consistencia

#### Agregar concepts obligatorios para IA

Agregar 3 concepts como obligatorios a nuevo formulario de admin para IA en `apis/diets-api/src/openai/utils/format.js`:

- Definir qué concepts son necesarios
- Implementar validación

#### Agregar validación en creación de menús

Agregar validación middleware y `userBelongsToSpecialist` en `apis/diets-api/src/routes/menus.js`:

- Mejorar seguridad
- Validar permisos

#### Extraer grupo SMAE del dish

Extraer grupo SMAE del dish en `apis/diets-api/src/nutrition/dishes.js`:

- Requiere metadata adicional
- Mejorar integración con SMAE

#### Cargar catálogo SMAE desde DB

Cargar catálogo SMAE desde DB en startup para evitar queries repetidas en `apis/diets-api/src/utils/smae-helpers.js`:

- Optimizar performance
- Reducir carga en base de datos

#### Centralizar catálogo SMAE

Centralizar catálogo SMAE (con subgrupos) y normalizador de etiquetas en `apis/diets-api/src/constants/smae.js`:

- Mejorar organización
- Facilitar mantenimiento

#### Confirmar densidad en conversiones

Confirmar densidad y loggear cuando se usa default en `apis/diets-api/src/nutrition/unit-conversions.js`:

- Mejorar precisión de conversiones
- Añadir logging para debugging

#### Revisar validaciones de usuarios

Agregar validaciones en `apis/users-api/src/routes/users.js`:

- Validación similar a `validateSpecialtyAssignBySpecialist`
- Solo el mismo usuario puede asignarse a un especialista (o admin)
- Corregir respuesta del endpoint

#### Revisar vulnerabilidad SQL injection

Revisar posible vulnerabilidad SQL injection en `apis/notifications-api/src/classes/UsersFilter.js`:

- Aunque no se usa de momento, corregir para prevenir futuros problemas
- Usar prepared statements

### Experiencia del Paciente

#### App seguimiento completo

Completar funcionalidad de seguimiento en la app móvil:

- Seguimiento de dietas con gráficas
- Seguimiento de rutinas
- Historial completo de evolución
- Notificaciones personalizadas

### Experiencia del Especialista

#### Menús IA editables

Permitir edición completa de menús generados por IA directamente desde la interfaz:

- Modificar platillos, porciones y horarios
- Guardar cambios en JSON en DB
- Mantener trazabilidad de cambios

#### Datos clínicos organizados

Mejorar organización y visualización de datos clínicos del paciente:

- Vista unificada de historial
- Búsqueda y filtrado avanzado
- Exportación de datos
- Gráficas de evolución

#### PDF con info correcta

Asegurar que los PDFs generados contengan información correcta y completa:

- Validar datos antes de generar PDF
- Incluir toda la información relevante
- Mejorar formato y legibilidad

### IA – Diet Agent

#### Mejoras cálculo GET

Mejorar precisión y robustez del cálculo de GET (Gasto Energético Total):

- Revisar fórmulas utilizadas
- Validar inputs
- Mejorar manejo de casos edge
- Añadir logging para debugging

#### Claridad entre CAF / AF

Aclarar y documentar diferencia entre CAF (Coeficiente de Actividad Física) y AF (Actividad Física):

- Mejorar documentación
- Unificar uso en código
- Asegurar consistencia en cálculos

#### Justificaciones clínicas robustas

Mejorar calidad y robustez de las justificaciones clínicas generadas por el DietAgent:

- Incluir más contexto clínico
- Mejorar coherencia y precisión
- Validar contra mejores prácticas nutricionales
