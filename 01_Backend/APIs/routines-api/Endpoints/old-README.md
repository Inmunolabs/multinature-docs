# API Routines

## Descripción general

La API de Routines gestiona rutinas de ejercicios personalizadas creadas por especialistas para sus pacientes. Permite crear, actualizar, consultar y eliminar rutinas completas con ejercicios organizados por días de la semana. El sistema incluye funcionalidad de historial automático para rutinas que han sido modificadas después de 6 días.

## Endpoints disponibles

### Gestión de Rutinas
- **[GET /routines/:id](get-by-id.md)** - Obtener rutina específica por ID
- **[GET /routines/user/:id](get-by-user-id.md)** - Obtener rutinas de un usuario específico
- **[GET /routines/specialist/:id](get-by-specialist-id.md)** - Obtener rutinas creadas por un especialista
- **[POST /routines](upsert.md)** - Crear o actualizar rutina (upsert inteligente)

### Gestión de Ejercicios
- **[GET /routines/exercise/](exercises/list-exercises.md)** - Listar ejercicios de un especialista
- **[GET /routines/exercise/:id](exercises/get-exercise.md)** - Obtener ejercicio específico por ID
- **[POST /routines/exercise](exercises/create-exercise.md)** - Crear nuevo ejercicio
- **[PATCH /routines/exercise/:id](exercises/update-exercise.md)** - Actualizar ejercicio existente
- **[DELETE /routines/exercise/:id](exercises/delete-exercise.md)** - Eliminar ejercicio

## Reglas importantes del proyecto

### Autenticación y Autorización
- **Todos los endpoints** requieren token Bearer válido
- **Rutinas:** Solo especialistas pueden crear/actualizar rutinas para sus pacientes
- **Ejercicios:** Solo especialistas pueden crear/editar ejercicios (propios o como admin)
- **Acceso:** Usuarios solo pueden ver sus propias rutinas, especialistas ven las que crearon

### Validaciones de Negocio
- **Propiedad de rutina:** Usuarios solo pueden acceder a rutinas propias o creadas por su especialista
- **Propiedad de ejercicio:** Solo el especialista creador o administradores pueden modificar ejercicios
- **Historial automático:** Rutinas modificadas después de 6 días generan snapshot automático
- **Relación especialista-paciente:** Validación `userBelongsToSpecialist` para creación de rutinas

### Estructura de Rutinas
- **Organización por días:** Ejercicios organizados por días de la semana
- **Orden de ejercicios:** Campo `index` para controlar secuencia de ejercicios
- **Repeticiones:** Campo `repetitions` para cada ejercicio en la rutina
- **Notas:** Campo `notes` para comentarios del especialista

### Consideraciones Técnicas
- **Upsert inteligente:** Lógica compleja para crear/actualizar con historial automático
- **Snapshots:** Sistema de versionado automático para rutinas antiguas
- **DTOs especializados:** Transformación de entidades a respuestas frontend-friendly
- **Validaciones personalizadas:** Middleware específico para rutinas y ejercicios

## Notas para el equipo frontend

### Campos clave para UI
- **`exercises`:** Objeto organizado por días de la semana (lunes, martes, etc.)
- **`index`:** Orden de ejercicios dentro de cada día
- **`repetitions`:** Número de repeticiones para cada ejercicio
- **`specialistId`:** ID del especialista que creó la rutina
- **`userId`:** ID del paciente asignado a la rutina

### Estados de autorización
- **Paciente:** Solo puede ver sus propias rutinas
- **Especialista:** Puede crear/editar rutinas para sus pacientes y ejercicios propios
- **Admin:** Acceso completo a todas las rutinas y ejercicios

### Manejo de errores
- **200:** Rutina no encontrada (con mensaje específico)
- **403:** Sin permisos para acceder o modificar
- **404:** Ejercicio no encontrado
- **500:** Error del servidor

### Funcionalidades especiales
- **Historial automático:** Snapshots se crean automáticamente para rutinas antiguas
- **Upsert inteligente:** Un solo endpoint maneja creación y actualización
- **Validación de relación:** Verifica que el especialista tenga relación con el paciente 