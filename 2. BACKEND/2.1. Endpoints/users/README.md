# API de Users

Esta documentación cubre todos los endpoints relacionados con la gestión de usuarios, especialistas, equipos de trabajo y funcionalidades de cuenta.

## Índice de Endpoints

### Usuarios
- [GET /users - Listar usuarios](./users-list.md)
- [GET /users/dashboard - Dashboard de usuarios](./users-dashboard.md)
- [GET /users/data-user - Obtener datos del usuario](./users-data-user.md)
- [GET /users/:id/summary/today - Información del día](./users-summary-today.md)
- [GET /users/:id - Obtener usuario por ID](./users-get.md)
- [GET /users/tax-info/:id - Información fiscal](./users-tax-info.md)
- [GET /users/network/:id - Red de usuarios](./users-network.md)
- [GET /users/network/detail/:id - Detalle de red](./users-network-detail.md)
- [GET /users/summary/:id - Resumen de usuario](./users-summary.md)
- [GET /users/summary/detail/:id - Detalle de resumen](./users-summary-detail.md)
- [GET /users/plan/:id - Plan del usuario](./users-plan.md)
- [POST /users - Crear usuario](./users-create.md)
- [POST /users/admin - Crear usuario admin](./users-create-admin.md)
- [POST /users/login - Iniciar sesión](./users-login.md)
- [POST /users/password-recovery-code - Código de recuperación](./users-password-recovery-code.md)
- [POST /users/password-recovery-code/validate - Validar código](./users-password-recovery-validate.md)
- [POST /users/verification-code - Código de verificación](./users-verification-code.md)
- [POST /users/verify-account - Verificar cuenta](./users-verify-account.md)
- [POST /users/contact-us-email - Contacto](./users-contact-us.md)
- [POST /users/send-email - Enviar email](./users-send-email.md)
- [POST /users/specialist-review - Crear reseña de especialista](./users-specialist-review.md)
- [POST /users/teamwork-review - Crear reseña de equipo](./users-teamwork-review.md)
- [PUT /users/reviews/:id - Actualizar reseña de especialista](./users-update-specialist-review.md)
- [PUT /users/reviews/teamwork/:id - Actualizar reseña de equipo](./users-update-teamwork-review.md)
- [PATCH /users/replacements - Actualizar reemplazos](./users-replacements.md)
- [PATCH /users/password - Actualizar contraseña](./users-password.md)
- [PATCH /users/:id - Actualizar usuario](./users-update.md)
- [PATCH /users/admin/:id - Actualizar usuario admin](./users-update-admin.md)
- [PATCH /users/tax-info/:id - Actualizar información fiscal](./users-tax-info-update.md)
- [PATCH /users/specialist/assign - Asignar especialista](./users-assign-specialist.md)
- [DELETE /users/:id - Eliminar usuario](./users-delete.md)
- [DELETE /users/specialist/:id - Desasignar especialista](./users-unassign-specialist.md)

### Especialistas
- [GET /specialists - Listar especialistas](./specialists-list.md)
- [GET /specialists/:id/reviews - Reseñas de especialista](./specialists-reviews.md)
- [GET /specialists/:id/patients - Pacientes del especialista](./specialists-patients.md)
- [GET /specialists/:id/patient-detail - Detalle de paciente](./specialists-patient-detail.md)
- [GET /specialists/:id - Detalles del especialista](./specialists-get.md)
- [POST /specialists/patient - Crear paciente](./specialists-create-patient.md)
- [PATCH /specialists/config/:id - Configurar especialista](./specialists-config.md)
- [PATCH /specialists/transfer - Transferir paciente](./specialists-transfer.md)
- [PATCH /specialists/specialties - Asignar especialidades](./specialists-specialties.md)
- [PATCH /specialists/assign-user - Asignar usuario](./specialists-assign-user.md)

### Equipos de Trabajo
- [GET /teamworks - Listar equipos](./teamworks-list.md)
- [GET /teamworks/specialist/:id - Equipos por especialista](./teamworks-by-specialist.md)
- [GET /teamworks/:id/reviews - Reseñas del equipo](./teamworks-reviews.md)
- [GET /teamworks/:id - Detalles del equipo](./teamworks-get.md)
- [POST /teamworks - Crear equipo](./teamworks-create.md)
- [POST /teamworks/add - Agregar especialista](./teamworks-add-specialist.md)
- [PATCH /teamworks/:id - Actualizar equipo](./teamworks-update.md)
- [DELETE /teamworks/remove-specialist - Remover especialista](./teamworks-remove-specialist.md)
- [DELETE /teamworks/:id - Eliminar equipo](./teamworks-delete.md)

---

## Reglas importantes y contexto del proyecto

- Los usuarios pueden ser pacientes o especialistas según su perfil.
- Los especialistas pueden tener múltiples especialidades y configuraciones de pago.
- Los equipos de trabajo permiten agrupar especialistas para colaboración.
- Las reseñas pueden ser de especialistas individuales o equipos completos.
- La información fiscal es obligatoria para especialistas que facturan.
- Los códigos de verificación y recuperación tienen tiempo de expiración.

---

## Consideraciones generales para el frontend

- **Autenticación:** La mayoría de los endpoints requieren un token Bearer válido.
- **Perfiles:** Validar el perfil del usuario (paciente/especialista) antes de mostrar opciones específicas.
- **Permisos:** Algunos endpoints requieren permisos de admin o pertenencia a especialista.
- **Validaciones:** Los emails deben ser únicos y las contraseñas cumplir requisitos de seguridad.
- **Códigos temporales:** Los códigos de verificación y recuperación expiran, mostrar mensajes claros.
- **Red de usuarios:** La funcionalidad de red permite conectar usuarios por niveles.
- **Reseñas:** Las reseñas pueden ser anónimas o con nombre, validar permisos de edición.
- **Configuraciones:** Los especialistas pueden configurar horarios, precios y preferencias.
- **Equipos:** Los equipos de trabajo tienen dueños y miembros con diferentes permisos.
- **Información fiscal:** Requerida para especialistas que facturan servicios. 