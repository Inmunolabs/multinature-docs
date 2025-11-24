# API Users

## Descripción general

La API de Users es el núcleo central del sistema MultiNature, gestionando todos los aspectos relacionados con usuarios, especialistas, equipos de trabajo y funcionalidades de red. Incluye autenticación, gestión de perfiles, asignación de especialistas, sistema de referidos, información fiscal, reseñas y más.

## Estructura de la API

La API está organizada en tres routers principales:

### 1. `/users/` - Gestión de Usuarios
- **Autenticación y registro:** Login, creación de usuarios, verificación de cuentas
- **Gestión de perfiles:** Actualización de datos, contraseñas, información fiscal
- **Dashboard y resúmenes:** Información personalizada del usuario
- **Sistema de red:** Gestión de referidos y niveles de red
- **Reseñas:** Creación y actualización de reseñas para especialistas y equipos
- **Reemplazos:** Gestión de sustituciones de comidas/dietas

### 2. `/specialists/` - Gestión de Especialistas
- **Configuración:** Ajustes personalizados del especialista
- **Pacientes:** Listado y gestión de pacientes asignados
- **Especialidades:** Asignación y gestión de especialidades médicas
- **Transferencias:** Movimiento de pacientes entre especialistas
- **Reseñas:** Visualización de reseñas recibidas

### 3. `/teamworks/` - Gestión de Equipos de Trabajo
- **Creación y gestión:** Formación de equipos médicos
- **Miembros:** Adición y eliminación de especialistas
- **Reseñas:** Sistema de reseñas para equipos completos

## Endpoints disponibles

### Gestión de Usuarios (`/users/`)
- **[GET /](healthcheck.md)** - Healthcheck de la API
- **[GET /api/config](api-config.md)** - Configuración de la API
- **[GET /](list.md)** - Listar usuarios con filtros de fecha
- **[GET /dashboard](dashboard.md)** - Dashboard personalizado del usuario
- **[GET /data-user](data-user.md)** - Obtener datos del usuario autenticado
- **[GET /verify-account](verify-account.md)** - Verificar cuenta con código
- **[GET /:id/summary/today](../../specialists-api/Endpoints/get-patients-summary-today.md)** - Resumen del día para un usuario
- **[GET /:id](get-by-id.md)** - Obtener usuario específico por ID
- **[GET /tax-info/:id](tax-info.md)** - Información fiscal del usuario
- **[GET /network/:id](../../../../04_SQL/tables/users_network.md)** - Red de referidos del usuario
- **[GET /network/detail/:id](network-detail.md)** - Detalle de usuario en la red
- **[GET /summary/:id](../../specialists-api/Endpoints/get-patients-summary.md)** - Resumen de usuario para especialista
- **[GET /summary/detail/:id](summary-detail.md)** - Detalle diario del resumen
- **[GET /plan/:id](../../specialists-api/Endpoints/get-patients-summary-plan.md)** - Plan del usuario

### Autenticación y Gestión (`/users/`)
- **[POST /](create.md)** - Crear nuevo usuario
- **[POST /admin](create-admin.md)** - Crear usuario administrador
- **[POST /login](login.md)** - Iniciar sesión
- **[POST /password-recovery-code](password-recovery-code.md)** - Generar código de recuperación
- **[POST /password-recovery-code/validate](password-recovery-validate.md)** - Validar código de recuperación
- **[POST /verification-code](verification-code.md)** - Generar código de verificación
- **[POST /verify-account](verify-account-post.md)** - Verificar cuenta (POST)
- **[POST /contact-us-email](contact-us.md)** - Enviar correo de contacto
- **[POST /send-email](send-email.md)** - Enviar correo a usuario
- **[POST /specialist-review](create-specialist-review.md)** - Crear reseña de especialista
- **[POST /teamwork-review](create-teamwork-review.md)** - Crear reseña de equipo

### Actualizaciones (`/users/`)
- **[PUT /reviews/:id](update-specialist-review.md)** - Actualizar reseña de especialista
- **[PUT /reviews/teamwork/:id](update-teamwork-review.md)** - Actualizar reseña de equipo
- **[PATCH /replacements](../../../../04_SQL/tables/user_action_replacements.md)** - Crear/actualizar reemplazos
- **[PATCH /password](update-password.md)** - Actualizar contraseña
- **[PATCH /:id](update.md)** - Actualizar usuario
- **[PATCH /admin/:id](update-admin.md)** - Actualizar usuario como administrador
- **[PATCH /tax-info/:id](tax-info-upsert.md)** - Crear/actualizar información fiscal
- **[PATCH /specialist/assign](assign-specialist.md)** - Asignar especialista

### Eliminación (`/users/`)
- **[DELETE /:id](delete.md)** - Eliminar usuario

### Gestión de Especialistas (`/specialists/`)
- **[GET /](list-specialists.md)** - Listar especialistas
- **[GET /:id/reviews](specialist-reviews.md)** - Reseñas de un especialista
- **[GET /:id/patients](specialist-patients.md)** - Pacientes de un especialista
- **[GET /:id/patient-detail](patient-detail.md)** - Detalle de paciente para especialista
- **[GET /:id](specialist-details.md)** - Detalles de un especialista
- **[POST /patient](create-patient.md)** - Crear paciente como especialista
- **[PATCH /config/:id](specialist-config.md)** - Configurar especialista
- **[PATCH /transfer](specialists/transfer-patient.md)** - Transferir paciente
- **[PATCH /specialties](specialists/assign-specialties.md)** - Asignar especialidades
- **[PATCH /assign-user](specialists/assign-user.md)** - Asignar usuario por email
- **[PATCH /unassign-transfer](unassign-transfer.md)** - Desasignar y transferir usuario

### Gestión de Equipos (`/teamworks/`)
- **[GET /](list-teamworks.md)** - Listar equipos de trabajo
- **[GET /specialist/:id](teamworks-by-specialist.md)** - Equipos de un especialista
- **[GET /:id/reviews](teamwork-reviews.md)** - Reseñas de un equipo
- **[GET /:id](teamwork-details.md)** - Detalles de un equipo
- **[POST /](create-teamwork.md)** - Crear equipo de trabajo
- **[POST /add](add-specialist.md)** - Agregar especialista al equipo
- **[PATCH /remove-specialist](remove-specialist.md)** - Remover especialista del equipo
- **[PATCH /:id](update-teamwork.md)** - Actualizar equipo
- **[DELETE /:id](delete-teamwork.md)** - Eliminar equipo

## Reglas importantes del proyecto

### Autenticación y Autorización
- **Todos los endpoints** (excepto healthcheck y algunos públicos) requieren token Bearer válido
- **Perfiles de usuario:** `user`, `specialist`, `admin` con diferentes niveles de acceso
- **Propiedad de recursos:** `userOwnResources` para acceso a datos propios
- **Relaciones especialista-paciente:** `userBelongsToSpecialist` para operaciones médicas
- **Administradores:** Acceso completo a todas las funcionalidades

### Validaciones de Negocio
- **Emails únicos:** Validación `uniqueEmailValidation` para evitar duplicados
- **Verificación de cuentas:** Sistema de códigos de verificación por email
- **Recuperación de contraseñas:** Códigos temporales con expiración
- **Asignación de especialistas:** Validación de especialidades y disponibilidad
- **Sistema de red:** Niveles 0-3 con validaciones de referidos
- **Reseñas:** Una por usuario por especialista/equipo

### Estructura de Usuarios
- **Perfiles:** Usuario regular, especialista, administrador
- **Especialidades:** Múltiples especialidades por especialista
- **Configuraciones:** Ajustes personalizados por especialista
- **Información fiscal:** Direcciones y datos fiscales
- **Red de referidos:** Sistema de niveles y comisiones

### Consideraciones Técnicas
- **DTOs complejos:** Transformación de entidades con relaciones anidadas
- **Validaciones personalizadas:** Middleware específico para cada tipo de operación
- **Sistema de red:** Lógica compleja de niveles y referidos
- **Integración OpenPay:** Gestión de usuarios de pago
- **Notificaciones por email:** Enví automático de códigos y confirmaciones

## Notas para el equipo frontend

### Campos clave para UI
- **`profile`:** Determina permisos y funcionalidades disponibles
- **`specialists`:** Array de especialistas asignados al usuario
- **`specialties`:** Especialidades médicas del especialista
- **`network`:** Información de referidos y niveles
- **`isValid`:** Estado de verificación de la cuenta
- **`hasPlan`:** Si el usuario tiene plan activo

### Estados de autorización
- **Usuario regular:** Acceso a sus propios datos y funcionalidades básicas
- **Especialista:** Gestión de pacientes, configuraciones y reseñas
- **Admin:** Acceso completo a todas las funcionalidades del sistema

### Funcionalidades especiales
- **Sistema de red:** Gestión de referidos con niveles y comisiones
- **Reemplazos:** Sustituciones de comidas/dietas con validaciones
- **Reseñas:** Sistema de calificaciones para especialistas y equipos
- **Verificación:** Proceso de validación de cuentas por email
- **Recuperación:** Sistema de recuperación de contraseñas

### Manejo de errores
- **400:** Datos inválidos o validaciones fallidas
- **401:** Token inválido o expirado
- **403:** Sin permisos para la operación
- **404:** Recurso no encontrado
- **500:** Error del servidor 