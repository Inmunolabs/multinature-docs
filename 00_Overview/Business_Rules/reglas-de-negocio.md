# Reglas de Negocio - Proyecto Multinature

**Versión:** 1.0  
**Fecha de creación:** 2025-01-26  
**Estado:** ✅ Activo y vigente

---

## 📋 Índice

1. [Autenticación y Autorización](#autenticación-y-autorización)
2. [Gestión de Usuarios](#gestión-de-usuarios)
3. [Sistema de Citas](#sistema-de-citas)
4. [Gestión de Pagos](#gestión-de-pagos)
5. [Compras y Órdenes](#compras-y-órdenes)
6. [Compras Mensuales](#compras-mensuales)
7. [Sistema de Comisiones](#sistema-de-comisiones)
8. [Gestión de Dietas](#gestión-de-dietas)
9. [Rutinas de Ejercicios](#rutinas-de-ejercicios)
10. [Formularios Médicos](#formularios-médicos)
11. [Productos y Catálogo](#productos-y-catálogo)
12. [Direcciones y Ubicaciones](#direcciones-y-ubicaciones)
13. [Sistema de Notificaciones](#sistema-de-notificaciones)
14. [Médicos Generales](#médicos-generales)
15. [Validaciones y Reglas Técnicas](#validaciones-y-reglas-técnicas)
16. [Reglas de Negocio Pendientes (TODO)](#reglas-de-negocio-pendientes-todo)

---

## 🔐 Autenticación y Autorización

### Tokens y Sesiones

- **Todos los endpoints** (excepto healthcheck y algunos públicos) requieren token Bearer válido
- Los tokens se validan en cada request mediante middleware de autenticación
- **Tiempo de vida de tokens**: 30 días de validez
- **Expiración de códigos de verificación**: 24 horas para códigos de verificación y recuperación de contraseñas

### Perfiles de Usuario

- **`user`**: Usuario regular (paciente/cliente)
- **`specialist`**: Especialista médico (nutriólogo, entrenador, médico general)
- **`admin`**: Administrador del sistema con acceso completo

### Niveles de Acceso

- **Propiedad de recursos**: `userOwnResources` para acceso a datos propios
- **Relaciones especialista-paciente**: `userBelongsToSpecialist` para operaciones médicas
- **Administradores**: Acceso completo a todas las funcionalidades

---

## 👥 Gestión de Usuarios

### Registro y Verificación

- **Emails únicos**: Validación `uniqueEmailValidation` para evitar duplicados
- **Verificación de cuentas**: Sistema de códigos de verificación por email
- **Recuperación de contraseñas**: Códigos temporales con expiración
- **Perfiles obligatorios**: Todos los usuarios deben tener un perfil definido

### Asignación de Especialistas

- **Validación de especialidades**: Solo especialistas con especialidades válidas pueden ser asignados
- **Disponibilidad**: Verificación de que el especialista esté disponible para nuevos pacientes
- **Relación bidireccional**: Usuario y especialista deben confirmar la relación

### Sistema de Red y Referidos

- **Niveles 0-3**: Sistema de referidos con validaciones de niveles
- **Comisiones por referidos**: Cálculo automático de comisiones por nivel
- **Validación de red**: Verificación de que no se formen ciclos en la red

### Reseñas y Calificaciones

- **Una por usuario**: Solo se permite una reseña por usuario por especialista/equipo
- **Validación de relación**: Solo usuarios con relación confirmada pueden dejar reseñas

---

## 📅 Sistema de Citas

### Agendamiento de Citas

- **Determinación de agendador**: El token determina quién está agendando la cita
  - Si `specialistId` es igual al `requestUser.id`: Especialista agendando cita a usuario
  - Si `userId` es igual al `requestUser.id`: Usuario agendando cita a especialista

### Validaciones de Fecha y Hora

- **Fecha futura**: La fecha de la cita debe ser después del día en curso
- **Formato de fecha**: Debe cumplir formato ISO8601 (`isISO8601()`)
- **Hora de finalización**: `endDate` debe ser mayor a `startDate`
- **Disponibilidad**: Tanto usuario como especialista deben tener disponibilidad en el horario

### Validaciones de Relación

- **Pertenencia**: El usuario debe pertenecer a la lista de pacientes/clientes del especialista
- **Dirección física**: Si la cita es física, la dirección debe pertenecer al especialista
- **Consultorio**: La dirección debe ser de un consultorio del especialista (`address.isClinic === true`)

### Sistema de Pagos por Citas

- **Cobro por consulta**: Si `chargePerConsultation > 0`, se genera `service_payment` por consulta
- **Anticipo**: Si `chargeAdvancePayment > 0`, se genera complemento de anticipo
- **Sin cobro**: Si ambos valores son 0, no se genera ningún `service_payment`
- **Liquidación**: El sistema permite liquidar pagos pendientes considerando anticipos

### Estados de Citas

- **Confirmada**: Cita con pago completo o confirmado
- **Pendiente**: Cita sin confirmar o con pago pendiente
- **Cancelada**: Cita cancelada por usuario o especialista
- **Completada**: Cita realizada exitosamente

---

## 💳 Gestión de Pagos

### Métodos de Pago Soportados

- **Tarjeta de crédito/débito**: Integración con OpenPay y MercadoPago
- **Balance interno**: Pago desde saldo disponible del usuario
- **Efectivo**: Para liquidaciones fuera del sistema

### Validaciones de Pago

- **Usuario OpenPay**: El usuario debe tener `openpayUserId` válido
- **Método de pago**: Verificación de que el método de pago pertenezca al usuario
- **Saldo suficiente**: Validación de fondos disponibles para el pago

### Procesamiento de Transacciones

- **Estado de transacción**: Solo transacciones con estado "completed" o "accredited" se procesan
- **Confirmación automática**: Notificaciones automáticas al confirmar pagos
- **Manejo de errores**: Rollback automático en caso de fallo en el pago

---

## 🛒 Compras y Órdenes

### Creación de Órdenes

- **Productos requeridos**: Array de productos con ID y cantidad
- **Dirección de envío**: Debe pertenecer al usuario que realiza la orden
- **Método de pago**: Validación del método de pago seleccionado
- **Stock disponible**: Verificación de inventario antes de procesar

### Estados de Órdenes

- **Preparando**: Orden confirmada y en proceso de preparación
- **Enviando**: Orden en tránsito
- **Entregada**: Orden completada exitosamente
- **Cancelada**: Orden cancelada por usuario o sistema

### Validaciones de Envío

- **Compañías de envío**: Solo DHL, FEDEX y Estafeta están permitidas
- **URL de seguimiento**: Debe ser una URL válida si se proporciona
- **Fecha de entrega**: Formato YYYY-MM-DD obligatorio

---

## 🔄 Compras Mensuales

### Tipos de Compra

- **Compra única**: Sin suscripción, solo el pedido inmediato
- **Compra recurrente**: Con suscripción automática mensual en OpenPay

### Validaciones de Suscripción

- **Una por usuario**: Cada usuario puede tener solo una compra mensual activa
- **Dirección de envío**: Requerida para suscripciones
- **Método de pago**: Requerido para suscripciones
- **Productos válidos**: Verificación de que los productos estén disponibles

### Gestión de Suscripciones

- **Creación automática**: Plan y suscripción se crean automáticamente en OpenPay
- **Renovación mensual**: Cobro automático cada mes en la fecha configurada
- **Actualización**: Al modificar productos, se actualiza plan y suscripción en OpenPay
- **Cancelación**: Eliminación completa de plan y suscripción

### Procesamiento Automático

- **Generación de órdenes**: Cada mes se genera una orden automática
- **Verificación de stock**: Alerta al admin si no hay stock disponible
- **Actualización de productos**: Si se elimina un producto, se actualiza la suscripción

---

## 💰 Sistema de Comisiones

### Cálculo de Comisiones

- **Porcentajes por nivel**: Configurables por administrador
- **Monto mínimo**: Solo comisiones con monto mayor a $0.01 se procesan
- **Períodos de corte**: Fechas configurables para liquidación mensual

### Liquidación de Comisiones

- **Cuenta de cobro**: Usuario debe tener cuenta bancaria válida registrada
- **Validación de usuario**: Solo usuarios válidos reciben comisiones
- **Integración Wire4**: Transferencias SPEI automáticas
- **Notificaciones**: Emails automáticos a usuarios sin cuenta de cobro

### Validaciones de Liquidación

- **Contraseña especial**: Requiere contraseña adicional al token Bearer
- **Período actual**: Solo procesa comisiones del período de corte vigente
- **Estado de comisión**: Actualización automática del estado a "liquidada"

---

## 🥗 Gestión de Dietas

### Creación y Actualización

- **Upsert inteligente**: Lógica automática para crear/actualizar con historial
- **Snapshots automáticos**: Si la dieta tiene más de 6 días, se crea copia histórica
- **Cálculos nutricionales**: Conversión automática de calorías a gramos

### Cálculos Nutricionales

- **Fórmulas disponibles**: Múltiples fórmulas para cálculo de calorías
- **Factores de actividad**: CAF (Coeficiente de Actividad Física) obligatorio
- **ETA**: Efecto Térmico de los Alimentos (0-100%)
- **Validación de equivalencias**: Tolerancia configurable para macronutrientes

### Estructura de Dietas

- **Objetivos**: Pérdida, ganancia o mantenimiento de peso
- **Restricciones**: Alergias, intolerancias y preferencias alimentarias
- **Menús por día**: Organización por días de la semana
- **Tipos de comida**: Desayuno, colación, comida, colación 2, cena

### Validaciones de Alimentos

- **Grupos de equivalencia**: Categorías predefinidas (AOA, Cereal, Verdura, etc.)
- **Porciones**: Cantidades específicas por alimento
- **Calorías**: Cálculo automático basado en porciones y alimentos

---

## 🏃‍♂️ Rutinas de Ejercicios

### Creación de Rutinas

- **Upsert inteligente**: Lógica automática para crear/actualizar con historial
- **Snapshots automáticos**: Si la rutina tiene más de 6 días, se crea copia histórica
- **Organización por días**: Ejercicios organizados por días de la semana (0-6)

### Validaciones de Ejercicios

- **Índices consecutivos**: Los índices deben empezar en 1 y ser consecutivos
- **Sin duplicados**: No se permiten índices duplicados en el mismo día
- **Repeticiones**: Campo obligatorio para cada ejercicio
- **Ejercicios por día**: Mínimo un ejercicio por día activo

### Estructura de Rutinas

- **Título y descripción**: Información general de la rutina
- **Notas del especialista**: Comentarios personalizados
- **Ejercicios por día**: Array de ejercicios con índice y repeticiones
- **Días vacíos**: Se permiten días sin ejercicios

### Propiedad y Acceso

- **Solo especialistas**: Solo especialistas pueden crear/editar rutinas
- **Relación paciente**: Validación de que el especialista tenga relación con el paciente
- **Ejercicios propios**: Especialistas solo pueden modificar ejercicios propios

---

## 📋 Formularios Médicos

### Conceptos y Plantillas

- **Conceptos globales**: "Estatura" y "Peso" se agregan automáticamente
- **Conceptos personalizados**: Especialistas pueden crear conceptos específicos
- **Plantillas reutilizables**: Estructura base para múltiples formularios
- **Validaciones configurables**: Campos obligatorios y graficables

### Estructura de Formularios

- **Preguntas**: Array de conceptos con validaciones
- **Unidades**: Unidades de medida personalizables por concepto
- **Graficabilidad**: Indicador de si el campo se puede graficar
- **Obligatoriedad**: Campos que deben ser completados obligatoriamente

### Validaciones de Respuestas

- **Campos obligatorios**: Verificación de que todos los campos obligatorios estén completos
- **Formato de respuestas**: Validación según el tipo de concepto
- **Metas y observaciones**: Campos opcionales para seguimiento

### Gestión de Formularios Completados

- **Asociación a citas**: Vinculación con citas específicas
- **Historial de respuestas**: Seguimiento temporal de valores graficables
- **Actualización**: Modificación de formularios existentes
- **Versionado**: Sistema de versiones para formularios antiguos

---

## 🛍️ Productos y Catálogo

### Creación de Productos

- **Información básica**: Nombre, descripción, ingredientes, contenido
- **Precio y stock**: Valores numéricos mayores a cero
- **Imágenes**: URLs HTTPS obligatorias
- **Especialidades**: Asociación con especialidades médicas

### Validaciones de Productos

- **URLs válidas**: Todas las imágenes deben ser HTTPS
- **Stock positivo**: Cantidad disponible mayor a cero
- **Precio válido**: Precio mayor a cero
- **Especialidades**: Verificación de que las especialidades existan

### Gestión de Inventario

- **Actualización automática**: Stock se actualiza al procesar órdenes
- **Productos eliminados**: Se eliminan de todas las compras mensuales
- **Alertas de stock**: Notificación al admin cuando no hay inventario

---

## 🏠 Direcciones y Ubicaciones

### Validaciones de Direcciones

- **Código postal**: Formato de 4 o 5 dígitos
- **Campos obligatorios**: Calle, número exterior, colonia, ciudad, estado
- **País opcional**: Por defecto México
- **Referencias**: Campo opcional para ubicación específica

### Tipos de Dirección

- **Dirección personal**: Para envíos del usuario
- **Consultorio**: `isClinic = true` para direcciones de especialistas
- **Múltiples direcciones**: Usuario puede tener varias direcciones
- **Dirección principal**: Una dirección marcada como principal

---

## 📧 Sistema de Notificaciones

### Canales de Notificación

- **Email**: Notificaciones por correo electrónico
- **Base de datos**: Notificaciones almacenadas en el sistema
- **WhatsApp**: Integración con WhatsApp Business API

### Tipos de Notificación

- **Nuevo usuario en red**: Notificación automática al referido
- **Compra de referido**: Notificación de comisión generada
- **Estado de envío**: Actualizaciones sobre pedidos
- **Confirmación de pago**: Recibo de pago recibido

### Filtros de Usuarios

- **Perfil**: Filtro por tipo de usuario (paciente, especialista, admin)
- **Especialidades**: Filtro por especialidades médicas
- **Edad**: Rango de edad configurable
- **Fechas**: Filtro por fecha de creación
- **Servicios**: Usuarios con/sin dieta, rutina, especialista
- **Actividad**: Usuarios con comisiones, órdenes en progreso

### Plantillas de Email

- **Handlebars**: Sistema de plantillas con variables dinámicas
- **Partials**: Componentes reutilizables para emails
- **Personalización**: Contenido dinámico según el contexto
- **Múltiples idiomas**: Soporte para diferentes idiomas

---

## 👨‍⚕️ Médicos Generales

### Funcionalidades Principales

- **Historial clínico**: Motivo de consulta, antecedentes, alergias, enfermedades
- **Recetas médicas**: Editor con buscador de fármacos y formato PDF
- **Estudios médicos**: Carga de órdenes y resultados con IA
- **Signos vitales**: Seguimiento de tensión, glucosa, frecuencia cardíaca

### Interconsulta

- **Referencias**: Un especialista puede referir a un médico general
- **Notas médicas**: Comentarios sobre el estado clínico del paciente
- **Seguimiento**: Continuidad de atención entre especialistas

### Panel de Diagnóstico

- **Recomendaciones automáticas**: Sugerencias basadas en historial del paciente
- **Alertas de riesgo**: Notificaciones por condiciones de riesgo
- **Bitácora evolutiva**: Notas evolutivas y seguimiento longitudinal

---

## ⚙️ Validaciones y Reglas Técnicas

### Validaciones de Entrada

- **UUIDs**: Validación de formato UUID para todos los IDs
- **Emails**: Formato de email válido
- **Fechas**: Formato ISO8601 para fechas
- **Números**: Validación de rangos y tipos numéricos

### Middleware de Validación

- **Express-validator**: Validación automática de parámetros
- **Validaciones personalizadas**: Lógica específica por endpoint
- **Manejo de errores**: Respuestas estandarizadas para errores de validación

### Constantes del Sistema

- **Días para histórico**: 6 días para generar snapshots automáticos
- **Monto máximo suscripción**: Límite configurable para compras mensuales
- **Tolerancia nutricional**: Porcentaje de tolerancia para equivalencias
- **Períodos de corte**: Fechas configurables para liquidación de comisiones

### Integraciones Externas

- **OpenPay**: Pagos con tarjeta y suscripciones
- **MercadoPago**: Método de pago alternativo
- **Wire4**: Transferencias bancarias SPEI
- **Google APIs**: Integración con servicios de Google
- **AWS S3**: Almacenamiento de plantillas de email

---

## 📝 Notas de Implementación

### Consideraciones Técnicas

- **Serverless**: Arquitectura basada en AWS Lambda
- **MySQL**: Base de datos principal del sistema
- **DynamoDB**: Para funcionalidades específicas (rutinas)
- **S3**: Almacenamiento de archivos y plantillas

### Seguridad

- **Encriptación**: Contraseñas hasheadas con bcrypt
- **JWT**: Tokens de autenticación seguros
- **Validación de entrada**: Sanitización de todos los parámetros
- **Control de acceso**: Middleware de autorización en cada endpoint

### Escalabilidad

- **APIs modulares**: Separación por funcionalidad
- **Layers compartidas**: Código común reutilizable
- **Base de datos optimizada**: Consultas eficientes y índices apropiados
- **Caché**: Implementación de caché para datos frecuentemente accedidos

---

## 🔄 Flujos Principales del Sistema

### Flujo de Alta de Paciente

1. **Registro**: Usuario se registra en el sistema
2. **Verificación**: Confirmación de email con código
3. **Asignación**: Vinculación con especialista
4. **Formulario inicial**: Llenado de formulario de valoración inicial
5. **Primera cita**: Agendamiento de primera consulta

### Flujo de Cita

1. **Agendamiento**: Selección de fecha, hora y especialista
2. **Confirmación**: Verificación de disponibilidad
3. **Pago**: Procesamiento de pago si aplica
4. **Consulta**: Realización de la consulta médica
5. **Formularios**: Llenado de formularios de seguimiento
6. **Seguimiento**: Programación de próximas citas

### Flujo de Compra

1. **Selección**: Agregar productos al carrito
2. **Verificación**: Validación de stock y disponibilidad
3. **Pago**: Procesamiento del método de pago
4. **Confirmación**: Generación de orden y confirmación
5. **Envío**: Procesamiento y envío del pedido
6. **Entrega**: Confirmación de entrega

### Flujo de Comisiones

1. **Generación**: Cálculo automático por transacciones
2. **Acumulación**: Acumulación por períodos de corte
3. **Validación**: Verificación de usuarios y cuentas
4. **Liquidación**: Procesamiento automático con Wire4
5. **Confirmación**: Actualización de estado de comisiones

---

## 📊 Métricas y Reportes

### Indicadores de Negocio

- **Usuarios activos**: Conteo de usuarios con actividad reciente
- **Citas realizadas**: Número de consultas completadas
- **Ventas**: Volumen de transacciones procesadas
- **Comisiones**: Monto total de comisiones liquidadas

### Reportes del Sistema

- **Logs de transacciones**: Historial completo de operaciones
- **Métricas de rendimiento**: Tiempo de respuesta y disponibilidad
- **Errores del sistema**: Registro de fallos y excepciones
- **Uso de recursos**: Consumo de servicios y almacenamiento

---

## 🚧 Reglas de Negocio Pendientes (TODO)

### Límites de Uso y Cuotas

- **TODO**: Definir límites máximos de citas por día por especialista
- **TODO**: Establecer límites de productos en carrito por usuario
- **TODO**: Configurar límites de formularios por paciente por período
- **TODO**: Definir límites de rutinas de ejercicios por usuario

### Casos Edge y Manejo de Errores Específicos

- **TODO**: Definir comportamiento cuando falla un pago en OpenPay
- **TODO**: Establecer reglas para cancelaciones de citas con menos de 24h de anticipación
- **TODO**: Definir manejo de productos sin stock en compras mensuales
- **TODO**: Establecer reglas para usuarios que no completan verificación de email

### Privacidad y Manejo de Datos Sensibles

- **TODO**: Definir reglas de retención de datos médicos
- **TODO**: Establecer reglas de acceso a historial clínico
- **TODO**: Configurar reglas de exportación de datos personales
- **TODO**: Definir reglas de backup y recuperación de datos sensibles

---

## 🚨 Casos Especiales y Excepciones

### Manejo de Errores

- **Pagos fallidos**: Rollback automático de transacciones
- **Stock insuficiente**: Cancelación automática de órdenes
- **Usuarios inválidos**: Bloqueo automático de cuentas problemáticas
- **Integraciones fallidas**: Fallback a métodos alternativos

### Recuperación de Datos

- **Snapshots automáticos**: Preservación de datos históricos
- **Backups**: Respaldo automático de información crítica
- **Auditoría**: Registro de todas las modificaciones importantes
- **Versionado**: Control de versiones para entidades críticas

---

## 📚 Documentación y Mantenimiento

### Estándares de Documentación

- **Endpoints**: Documentación completa de todas las APIs
- **Código**: Comentarios explicativos en funciones complejas
- **Diagramas**: Flujos visuales para procesos complejos
- **Ejemplos**: Casos de uso y ejemplos de implementación

### Mantenimiento del Sistema

- **Actualizaciones**: Proceso de despliegue automatizado
- **Monitoreo**: Supervisión continua del rendimiento
- **Backups**: Respaldo regular de datos y configuración
- **Seguridad**: Auditorías de seguridad periódicas

---

_Este documento debe mantenerse actualizado con cualquier cambio en las reglas de negocio del sistema. Para modificaciones, contactar al equipo de desarrollo._
