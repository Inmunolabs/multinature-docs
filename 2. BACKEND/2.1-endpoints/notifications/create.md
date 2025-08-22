# POST /notifications

## Descripción funcional

Crea notificaciones masivas para múltiples usuarios basándose en filtros avanzados. Permite enviar notificaciones por diferentes canales (email, base de datos, WhatsApp) a grupos de usuarios que cumplan con criterios específicos como perfil, especialidades, edad, fechas y más.

## Autorización

Requiere token Bearer válido. Solo usuarios autorizados pueden crear notificaciones masivas.

## Parámetros de ruta

No aplica

## Query parameters

### Filtros de Usuario Disponibles

#### **Filtros Básicos**
- `email` (string, opcional): Email exacto del usuario
- `specialties` (array, opcional): IDs de especialidades médicas

#### **Filtros de Perfil**
- `patient` (boolean, opcional): Usuarios con perfil de paciente
- `specialist` (boolean, opcional): Usuarios con perfil de especialista
- `admin` (boolean, opcional): Usuarios con perfil de administrador

#### **Filtros Demográficos**
- `minAge` (number, opcional): Edad mínima en años
- `maxAge` (number, opcional): Edad máxima en años
- `createdFrom` (string, opcional): Fecha de creación desde (YYYY-MM-DD)
- `createdTo` (string, opcional): Fecha de creación hasta (YYYY-MM-DD)

#### **Filtros de Servicios**
- `hasDiet` (boolean, opcional): Usuarios con dieta activa
- `hasNoDiet` (boolean, opcional): Usuarios sin dieta
- `hasRoutine` (boolean, opcional): Usuarios con rutina de ejercicios
- `hasNoRoutine` (boolean, opcional): Usuarios sin rutina

#### **Filtros de Relaciones**
- `hasSpecialist` (boolean, opcional): Usuarios con especialista asignado
- `hasNoSpecialist` (boolean, opcional): Usuarios sin especialista
- `specialistWithPatients` (boolean, opcional): Especialistas con pacientes
- `specialistWithoutPatients` (boolean, opcional): Especialistas sin pacientes

#### **Filtros de Actividad**
- `withCommissions` (boolean, opcional): Usuarios con comisiones en el período actual
- `withoutCommissions` (boolean, opcional): Usuarios sin comisiones en el período actual
- `withOrdersInProgress` (boolean, opcional): Usuarios con órdenes en preparación
- `withoutOrdersInProgress` (boolean, opcional): Usuarios sin órdenes en preparación
- `withPurchases` (boolean, opcional): Usuarios con compras
- `withoutPurchases` (boolean, opcional): Usuarios sin compras
- `withRecommendations` (boolean, opcional): Usuarios con recomendaciones
- `withoutRecommendations` (boolean, opcional): Usuarios sin recomendaciones

### Ejemplo de Query Parameters
```
POST /notifications?specialist=true&hasPatients=true&minAge=25&maxAge=65&withCommissions=true
```

## Body del request

```json
{
  "type": "string",
  "title": "string",
  "message": "string",
  "subject": "string",
  "subtitle": "string",
  "notificationDetails": "string",
  "footer": "string",
  "redirectUrl": "string",
  "actionText": "string"
}
```

### Ejemplo de body

```json
{
  "type": "email",
  "title": "Nuevo protocolo de seguridad",
  "message": "Se ha implementado un nuevo protocolo de seguridad en la plataforma",
  "subject": "Actualización importante de seguridad",
  "subtitle": "Protocolo de seguridad actualizado",
  "notificationDetails": "Todos los usuarios deben actualizar su contraseña antes del 31 de enero",
  "footer": "Para más información, contacta al equipo de soporte",
  "redirectUrl": "/security-update",
  "actionText": "Actualizar contraseña"
}
```

## Ejemplo de respuesta exitosa (200 OK)

```json
{
  "awsRequestId": "456e7890-e89b-12d3-a456-426614174000",
  "message": "Usuarios encontrados",
  "data": [
    {
      "id": "789e0123-e89b-12d3-a456-426614174000",
      "email": "dr.garcia@example.com",
      "firstName": "Carlos",
      "lastName": "García",
      "profile": "specialist",
      "specialty": "Cardiología"
    },
    {
      "id": "abc123-e89b-12d3-a456-426614174000",
      "email": "dr.martinez@example.com",
      "firstName": "Ana",
      "lastName": "Martínez",
      "profile": "specialist",
      "specialty": "Endocrinología"
    }
  ]
}
```

## Códigos de estado y errores

| Código | Significado | Descripción |
|--------|-------------|-------------|
| 200 | OK | Notificaciones creadas exitosamente |
| 400 | Bad Request | Datos de notificación inválidos o filtros incorrectos |
| 401 | Unauthorized | Token faltante o inválido |
| 403 | Forbidden | Sin permisos para crear notificaciones |
| 500 | Internal Server Error | Error del servidor |

## Notas útiles para el frontend

- **Filtros complejos:** Implementar interfaz intuitiva para los múltiples filtros disponibles
- **Validación de filtros:** Verificar que los filtros sean lógicamente consistentes
- **Canales de notificación:** Distinguir entre email, base de datos y WhatsApp
- **Campos requeridos:** Los campos varían según el tipo de notificación
- **Filtros combinados:** Los filtros se pueden combinar para crear grupos específicos
- **Previsualización:** Mostrar cuántos usuarios recibirán la notificación
- **Historial:** Mantener registro de notificaciones enviadas
- **Plantillas:** Considerar plantillas predefinidas para tipos comunes

## Consideraciones técnicas

- **Middleware:** Aplica `authorize`, `getConstants` y `notificationsValidations.userFiltersValidation`
- **Filtros:** Usa `UsersFilter` para construir consultas SQL dinámicas complejas
- **Factory Pattern:** Usa `NotificationHandlerFactory` para manejar diferentes tipos de notificación
- **Canales soportados:** Email (completo), Base de datos (completo), WhatsApp (no implementado)
- **Base de datos:** Construye consultas SQL dinámicas basadas en filtros
- **Validaciones:** Valida que los filtros sean lógicamente consistentes
- **Performance:** Optimizado para consultas complejas con múltiples JOINs
- **Seguridad:** Solo usuarios autorizados pueden enviar notificaciones masivas
