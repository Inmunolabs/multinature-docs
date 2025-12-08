# Índice de Épicas - Multinature Backend

Este documento contiene un índice completo de todas las épicas documentadas en los archivos de gestión del proyecto.

## Nomenclatura

- ✅: Significa que ya está documentado en ClickUp
- _(Nice-to-have)_: No necesario para entregables del Sprint

---

## 1.0 Estabilidad Nutricional

### ✅ [1.1. SMAE – Auditoría y Corrección](1.0_Estabilidad_Nutricional.md#11-smae--auditoría-y-corrección)

**Archivo:** `1.0_Estabilidad_Nutricional.md`

Problemas actuales: Datos corruptos o inconsistentes en varios platillos, equivalentes que no corresponden a grupos reales, recipes incompletas o con conversiones rotas.

**Entregables:**

- Auditoría completa del catálogo SMAE
- Corrección de platillos con inconsistencias graves
- Carga del catálogo en startup
- Validación y logging cuando se usen valores por default

---

### ✅ [1.2. MealTimes – Normalización Global](1.0_Estabilidad_Nutricional.md#12-mealtimes--normalización-global)

**Archivo:** `1.0_Estabilidad_Nutricional.md`

Problemas: Inconsistencias por entorno (menús IA vs menús manuales), horarios no alineados con consumo real, la IA produce horarios fuera de orden.

**Entregables:**

- Diccionario único de mealTimes válido
- Validación automática del orden
- Ajuste de mealTimes en IA + formularios + menú manual

---

### ✅ [1.3. Porciones IA – Corrección y Validación](1.0_Estabilidad_Nutricional.md#13-porciones-ia--corrección-y-validación)

**Archivo:** `1.0_Estabilidad_Nutricional.md`

Problemas: La IA produce porciones inconsistentes, equivalentes no suman correctamente, restas de calorías incorrectas, ajuste de equivalentes que no respeta límites por comida.

**Entregables:**

- Cálculo robusto de porciones
- Validaciones por macronutriente
- Límites por comida y por día
- Logging de desviaciones

---

### ✅ [1.4. GET / CAF / AF – Unificación y Coherencia](1.0_Estabilidad_Nutricional.md#14-get--caf--af--unificación-y-coherencia)

**Archivo:** `1.0_Estabilidad_Nutricional.md`

Problemas: Uso incorrecto o duplicado de AF vs CAF, GET mal calculado en función de fórmulas, falta de claridad clínica en el cálculo, input de actividad física disperso en formularios.

**Entregables:**

- Fórmula GET unificada y documentada
- Uso único de CAF/AF en toda la cadena
- Validación clínica robusta
- Logging de inputs originales del usuario y ajustes por IA

---

## 2.0 Operatividad del Especialista

### _(Nice-to-have)_ [1.0. SMAE – Normalización y Cache](2.0_Operatividad_Especialista.md#nice-to-have-10-smae--normalización-y-cache)

**Archivo:** `2.0_Operatividad_Especialista.md`

Problemas actuales: Etiquetas mixtas (mayúsculas, tildes, sinónimos), SMAE cargado _ad-hoc_ en cada cálculo → bajo performance.

**Entregables:**

- Normalización de etiquetas (acentos, mayúsculas, sinónimos)
- Carga del catálogo en startup
- Cache local para evitar queries repetidas

---

### ✅ [1.1. CRUD de Menús (Manual + IA)](2.0_Operatividad_Especialista.md#-11-crud-de-menús-manual--ia)

**Archivo:** `2.0_Operatividad_Especialista.md`

Problemas actuales: Menús generados por IA no son editables desde la interfaz, menús manuales e IA están en vistas separadas, no hay historial/versionado, DTO no está estandarizado.

**Entregables:**

- CRUD completo (crear, leer, actualizar, eliminar)
- Estructura única: menú manual o IA
- Editor visual unificado
- Historial y versionado
- Validaciones de permisos (`userBelongsToSpecialist`)
- DTO estandarizado para frontend

---

### ✅ [1.2. Edición de Menús IA](2.0_Operatividad_Especialista.md#-12-edición-de-menús-ia)

**Archivo:** `2.0_Operatividad_Especialista.md`

Problemas: La IA produce JSON rígido, especialistas no pueden ajustar porciones, horarios o platillos, falta trazabilidad de cambios.

**Entregables:**

- Editor visual completo
- Guardar cambios en JSON
- Trazabilidad (quién lo cambió, cuándo)
- Ajustes dinámicos a partir del catálogo SMAE corregido

---

### _(Nice-to-have)_ [1.3. Mejoras Formularios Clínicos de Pacientes](2.0_Operatividad_Especialista.md#nice-to-have-13-mejoras-formularios-clínicos-de-pacientes)

**Archivo:** `2.0_Operatividad_Especialista.md`

Problemas: Flujo de llenado lento, inconsistencia en unidades, conceptos duplicados, validaciones débiles, UX confusa para especialistas.

**Entregables:**

- Mejorar agrupación lógica
- Unificar unidades
- Flujo lineal optimizado
- Validaciones clínicas completas
- Preparación para histórico graficable

---

### _(Nice-to-have)_ [1.4. Historial Clínico Estructurado](2.0_Operatividad_Especialista.md#nice-to-have-14-historial-clínico-estructurado)

**Archivo:** `2.0_Operatividad_Especialista.md`

Problemas: Navegación complicada, historial disperso entre tablas, pocas gráficas, difícil para especialistas consultar evolución.

**Entregables:**

- Estructura temporal clara
- Búsqueda por tipo de información
- Filtros (signos vitales, bioquímicos, antropometría)
- Gráficas de evolución
- Exportación PDF

---

### ✅ [1.5. Creación de Dieta a partir de la propuesta del Agente de Dietas](2.0_Operatividad_Especialista.md#-15-creación-de-dieta-a-partir-de-la-propuesta-del-agente-de-dietas)

**Archivo:** `2.0_Operatividad_Especialista.md`

Problemas: El Agente de dietas responde con una propuesta de dieta, esta no es creada sino hasta que el especialista lo autoriza.

**Entregables:**

- Crear en base de datos la dieta completa del paciente

---

## 3.0 App, Rutinas y Seguimiento

### _(CANCELADA)_ [1.1. PDFs de Rutinas (Profesional + Legible)](3.0_App_Rutinas_Seguimiento.md#cancelada-11-pdfs-de-rutinas-profesional--legible)

**Archivo:** `3.0_App_Rutinas_Seguimiento.md`

Problemas actuales: Formato básico / sin estilo, no incluye descansos, series y repeticiones correctamente, no refleja estructura semanal, no se integra con la app.

**Entregables:**

- Template PDF profesional
- Layout semanal claro
- Datos del paciente / especialista
- Exportación desde backend y panel

---

### _(Por confirmar)_ [1.2. Asignación de Series de Ejercicios por Semana](3.0_App_Rutinas_Seguimiento.md#por-confirmar-12-asignación-de-series-de-ejercicios-por-semana)

**Archivo:** `3.0_App_Rutinas_Seguimiento.md`

Problemas actuales: No existe una estructura clara para la asignación de series por día/semana, no existen validaciones ni DTO unificados.

**Entregables:**

- Definición de estructura estándar de series por semana
- Asociación ejercicio ←→ serie ←→ día
- _(Nice-to-have)_ Validaciones clínicas: volumen, intensidad, descansos
- DTO final y compatible con RoutinesAgent

---

### _(Nice-to-have)_ [1.3. Selección de Músculos "2D" en la Creación de Series](3.0_App_Rutinas_Seguimiento.md#nice-to-have-13-selección-de-músculos-2d-en-la-creación-de-series)

**Archivo:** `3.0_App_Rutinas_Seguimiento.md`

Problemas: Mejorar la selección de grupos musculares.

**Entregables:**

- Selector visual de músculos

---

### ✅ _(Exploratorio / Por confirmar)_ [1.4. Registro de Métricas y Tiempos del Paciente](3.0_App_Rutinas_Seguimiento.md#-exploratorio--por-confirmar-14-registro-de-métricas-y-tiempos-del-paciente)

**Archivo:** `3.0_App_Rutinas_Seguimiento.md`

Problemas / Consideraciones: Aún no se define si el sistema medirá pesos usados, tiempos, descansos, etc. Implicaría cambios importantes en infraestructura, app y panel. Podría habilitar un modelo de progresión automática en el futuro.

**Entregables si se aprueba:**

- Endpoints para registrar métricas por ejercicio y serie
- Modelo progresivo para adaptar rutinas a partir del desempeño
- Dashboard simple para especialistas

---

### ✅ _(Por confirmar)_ [1.5. Entrenamiento Guiado (APP / posible Web)](3.0_App_Rutinas_Seguimiento.md#-por-confirmar-15-entrenamiento-guiado-app--posible-web)

**Archivo:** `3.0_App_Rutinas_Seguimiento.md`

Este proceso se desarrollará en APP móvil por Pandalatec, pero deben definirse reglas, endpoints y diseño.

**Entregables:**

- Endpoints necesarios para registrar progreso
- Vista equivalente en Web (pendiente a validación)

---

### ✅ [1.6. RoutinesAgent (Generación + Edición)](3.0_App_Rutinas_Seguimiento.md#-16-routinesagent-generación--edición)

**Archivo:** `3.0_App_Rutinas_Seguimiento.md`

Problemas: No existe lógica estable para IA, no hay modelo clínico de rutinas (fuerza, cardio, movilidad), falta editor manual avanzado.

**Entregables:**

- RoutinesAgent funcional
- Generación automática por objetivo
- Edición granular (`actions`)
- Integración completa con app

---

### _(Por confirmar)_ [1.7. Seguimiento de entrenamientos del Paciente (APP)](3.0_App_Rutinas_Seguimiento.md#por-confirmar-17-seguimiento-de-entrenamientos-del-paciente-app)

**Archivo:** `3.0_App_Rutinas_Seguimiento.md`

Problemas: App no tiene rutinas completas, no existe progreso ni métricas, no existe historial de acciones.

**Entregables:**

- Rutinas visibles desde app
- Marcar ejercicios completados
- Progreso semanal
- Notificaciones push (vía Pandalatec)

---

## 4.0 Infraestructura, Pagos y Deuda Técnica

### [1.1. MercadoPago – Integración Completa](4.0_Infra_Pagos_Deuda_Tecnica.md#11-mercadopago--integración-completa)

**Archivo:** `4.0_Infra_Pagos_Deuda_Tecnica.md`

Problemas: Flujo incompleto, conciliación limitada, webhooks débiles.

**Entregables:**

- Flujo completo pagar → confirmar → conciliar
- Webhooks sólidos
- Documentación

---

### [1.2. Openpay – Auditoría y Limpieza](4.0_Infra_Pagos_Deuda_Tecnica.md#12-openpay--auditoría-y-limpieza)

**Archivo:** `4.0_Infra_Pagos_Deuda_Tecnica.md`

Problemas: Validaciones duplicadas, datos inconsistentes, duplicación de métodos.

**Entregables:**

- Limpieza completa de Openpay
- Unificación de `paymentProvider`

---

### [1.3. Wire4 – Validaciones y Cuentas](4.0_Infra_Pagos_Deuda_Tecnica.md#13-wire4--validaciones-y-cuentas)

**Archivo:** `4.0_Infra_Pagos_Deuda_Tecnica.md`

Problemas: CLABE duplicada no validada correctamente.

**Entregables:**

- Validación robusta por usuario

---

### [1.4. Deuda Técnica Crítica](4.0_Infra_Pagos_Deuda_Tecnica.md#14-deuda-técnica-crítica)

**Archivo:** `4.0_Infra_Pagos_Deuda_Tecnica.md`

**Entregables:**

- Refactor `diets.js`
- Limpieza endpoints duplicados
- Validación DDL vs Entities
- Eliminar legacy

---

### [1.5. Infra AWS / VPC](4.0_Infra_Pagos_Deuda_Tecnica.md#15-infra-aws--vpc)

**Archivo:** `4.0_Infra_Pagos_Deuda_Tecnica.md`

**Entregables:**

- Actualizar VPC productiva
- Documentar SG/Subnets
- Estandarizar Lambdas

---

### [1.6. Google Sheets Refresh Token](4.0_Infra_Pagos_Deuda_Tecnica.md#16-google-sheets-refresh-token)

**Archivo:** `4.0_Infra_Pagos_Deuda_Tecnica.md`

**Entregables:**

- Implementar refresh
- Centralizar uso del token

---

## 5.0 Notificaciones, Chatbot y Documentación

### [1.1. Sistema de Notificaciones (Email + Push + Eventos)](5.0_Notificaciones_Chatbot_Documentacion.md#11-sistema-de-notificaciones-email--push--eventos)

**Archivo:** `5.0_Notificaciones_Chatbot_Documentacion.md`

Problemas actuales: No existe un sistema unificado, no hay Lambda central de notificaciones, app no recibe notificaciones push, correos con estilos inconsistentes.

**Entregables:**

- Lambda principal de notificaciones
- Envío de email centralizado
- Preferencias de usuario
- Eventos: citas, recordatorios, dietas, rutinas, estudios
- Notificaciones push (Pandalatec)
- Plantillas de email unificadas

---

### [1.2. Chatbot Inicial / IA de Atención](5.0_Notificaciones_Chatbot_Documentacion.md#12-chatbot-inicial--ia-de-atención)

**Archivo:** `5.0_Notificaciones_Chatbot_Documentacion.md`

Problemas: Versión actual incompleta, sin conexión a módulos inteligentes.

**Entregables:**

- Chatbot funcional
- Preguntas frecuentes
- Reglas IA para clasificación
- Redirección a especialistas
- Conexión a BookingsAgent y DietAgent

---

### [1.3. Documentación Técnica y de Flujos](5.0_Notificaciones_Chatbot_Documentacion.md#13-documentación-técnica-y-de-flujos)

**Archivo:** `5.0_Notificaciones_Chatbot_Documentacion.md`

Problemas: Documentación incompleta, ausencia de reglas críticas formalizadas.

**Entregables:**

- Diagramas de flujo
- Documentación de reglas clínicas
- Documentación de decisiones de arquitectura
- Actualización continua

---

## 6.0 Expansión de Producto

### [1.1. Línea de Médicos Generales (Epic a 3–4 sprints)](6.0_Expansion_Producto.md#11-línea-de-médicos-generales-epic-a-34-sprints)

**Archivo:** `6.0_Expansion_Producto.md`

**Alcance:** Construir una solución clínica completa para consulta general.

**Entregables:**

- Historial clínico completo (motivo, padecimiento, antecedentes)
- Recetas médicas formales
- Gestión de estudios y resultados
- Control de signos vitales
- Clasificación de citas
- Interconsulta entre especialistas
- Panel de diagnóstico + sugerencias IA

---

### [1.2. Recetario Médico Completo](6.0_Expansion_Producto.md#12-recetario-médico-completo)

**Archivo:** `6.0_Expansion_Producto.md`

**Entregables:**

- Editor de recetas
- Buscador de fármacos
- Exportación PDF profesional
- Firma y membrete
- Envío email y WhatsApp

---

### [1.3. Exportación PDF Avanzada](6.0_Expansion_Producto.md#13-exportación-pdf-avanzada)

**Archivo:** `6.0_Expansion_Producto.md`

**Entregables:**

- Unificar motor PDF
- Diseños por tipo de documento
- Personalización paciente/especialista
- Mejor rendimiento

---

### [1.4. Login con Google (OAuth)](6.0_Expansion_Producto.md#14-login-con-google-oauth)

**Archivo:** `6.0_Expansion_Producto.md`

**Entregables:**

- Login rápido
- Conexión con usuarios existentes
- Seguridad OAuth

---

### [1.5. Migración a Microservicios Completa](6.0_Expansion_Producto.md#15-migración-a-microservicios-completa)

**Archivo:** `6.0_Expansion_Producto.md`

**Entregables:**

- Separar monolito en servicios
- API Gateway
- Mensajería/eventos
- Estrategia de despliegue gradual

---

## 7.0 Consolidación Final del Sistema

### [1.1. FoodOptions](7.0_Consolidacion_Final.md#11-foodoptions)

**Archivo:** `7.0_Consolidacion_Final.md`

**Entregables:**

- Ordenar por mayoría de grupos equivalentes
- Filtrar según requerimientos
- Mejorar relevancia IA

---

### [1.2. Migraciones 001/015/016/020](7.0_Consolidacion_Final.md#12-migraciones-001015016020)

**Archivo:** `7.0_Consolidacion_Final.md`

**Entregables:**

- Revisar alineación DDL/Entities
- Integrar migraciones al pipeline
- Documentar dependencias

---

### [1.3. Registro de Cambios en Endpoints](7.0_Consolidacion_Final.md#13-registro-de-cambios-en-endpoints)

**Archivo:** `7.0_Consolidacion_Final.md`

**Entregables:**

- Carpeta versionada
- Guardar before/after
- Breaking changes

---

### [1.4. Monthly Purchases](7.0_Consolidacion_Final.md#14-monthly-purchases)

**Archivo:** `7.0_Consolidacion_Final.md`

**Entregables:**

- nextPurchaseDate
- Quitar legacy
- Compra mensual sin suscripción
- Alertas de stock

---

### [1.5. Validaciones Usuario](7.0_Consolidacion_Final.md#15-validaciones-usuario)

**Archivo:** `7.0_Consolidacion_Final.md`

**Entregables:**

- Asignaciones correctas
- Eliminar especialista
- SELECT password separado

---

### [1.6. Certificados](7.0_Consolidacion_Final.md#16-certificados)

**Archivo:** `7.0_Consolidacion_Final.md`

**Entregables:**

- Validar aprobación
- Ajustar queries

---

### [1.7. Limpieza DTOs](7.0_Consolidacion_Final.md#17-limpieza-dtos)

**Archivo:** `7.0_Consolidacion_Final.md`

**Entregables:**

- Limpieza en diets-api
- Unificar foods/ingredients

---

## Resumen por Estado

### Épicas Documentadas en ClickUp (✅)

- [1.1. SMAE – Auditoría y Corrección](1.0_Estabilidad_Nutricional.md#11-smae--auditoría-y-corrección)
- [1.2. MealTimes – Normalización Global](1.0_Estabilidad_Nutricional.md#12-mealtimes--normalización-global)
- [1.3. Porciones IA – Corrección y Validación](1.0_Estabilidad_Nutricional.md#13-porciones-ia--corrección-y-validación)
- [1.4. GET / CAF / AF – Unificación y Coherencia](1.0_Estabilidad_Nutricional.md#14-get--caf--af--unificación-y-coherencia)
- [1.1. CRUD de Menús (Manual + IA)](2.0_Operatividad_Especialista.md#-11-crud-de-menús-manual--ia)
- [1.2. Edición de Menús IA](2.0_Operatividad_Especialista.md#-12-edición-de-menús-ia)
- [1.5. Creación de Dieta a partir de la propuesta del Agente de Dietas](2.0_Operatividad_Especialista.md#-15-creación-de-dieta-a-partir-de-la-propuesta-del-agente-de-dietas)
- [1.4. Registro de Métricas y Tiempos del Paciente](3.0_App_Rutinas_Seguimiento.md#-exploratorio--por-confirmar-14-registro-de-métricas-y-tiempos-del-paciente) _(Exploratorio / Por confirmar)_
- [1.5. Entrenamiento Guiado (APP / posible Web)](3.0_App_Rutinas_Seguimiento.md#-por-confirmar-15-entrenamiento-guiado-app--posible-web) _(Por confirmar)_
- [1.6. RoutinesAgent (Generación + Edición)](3.0_App_Rutinas_Seguimiento.md#-16-routinesagent-generación--edición)

### Épicas Nice-to-have (No necesarias para entregables del Sprint)

- [1.0. SMAE – Normalización y Cache](2.0_Operatividad_Especialista.md#nice-to-have-10-smae--normalización-y-cache)
- [1.3. Mejoras Formularios Clínicos de Pacientes](2.0_Operatividad_Especialista.md#nice-to-have-13-mejoras-formularios-clínicos-de-pacientes)
- [1.4. Historial Clínico Estructurado](2.0_Operatividad_Especialista.md#nice-to-have-14-historial-clínico-estructurado)
- [1.3. Selección de Músculos "2D" en la Creación de Series](3.0_App_Rutinas_Seguimiento.md#nice-to-have-13-selección-de-músculos-2d-en-la-creación-de-series)

### Épicas Canceladas

- [1.1. PDFs de Rutinas (Profesional + Legible)](3.0_App_Rutinas_Seguimiento.md#cancelada-11-pdfs-de-rutinas-profesional--legible)

### Épicas Por Confirmar

- [1.2. Asignación de Series de Ejercicios por Semana](3.0_App_Rutinas_Seguimiento.md#por-confirmar-12-asignación-de-series-de-ejercicios-por-semana)
- [1.7. Seguimiento de entrenamientos del Paciente (APP)](3.0_App_Rutinas_Seguimiento.md#por-confirmar-17-seguimiento-de-entrenamientos-del-paciente-app)

---

**Última actualización:** 2025-12-05
