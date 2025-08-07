# Reglas de visibilidad y edición de pacientes en equipos de trabajo

Este documento describe la lógica de funcionamiento para el acceso y la edición de pacientes por parte de los especialistas dentro de los equipos de trabajo, considerando tanto relaciones directas como parciales.

---

## Reglas de comportamiento

### 1. Conformación de equipos

Los equipos de trabajo están formados por uno o más especialistas. Cada equipo tiene un propietario (`owner_id`), quien es el especialista que lo creó.

### 2. Especialistas pueden pertenecer a múltiples equipos

Un mismo especialista puede formar parte de varios equipos de trabajo al mismo tiempo, ya sea como miembro o como creador.

### 3. Tipos de relación entre pacientes y especialistas

Existen dos tipos de relación que determinan los permisos sobre un paciente:

- **Relación directa:**  
  Se da cuando un especialista crea, atiende o recibe directamente a un paciente. También puede originarse si un paciente selecciona directamente a un especialista.  
  Estas relaciones se almacenan en la tabla `users_specialists`.

- **Relación parcial (compartida):**  
  Se da cuando un especialista que es dueño de un equipo comparte a uno de sus pacientes con otro especialista del mismo equipo.  
  Estas relaciones se almacenan en las tablas `patient_team_shares` y `patient_team_share_specialists`.

### 4. Acceso a pacientes compartidos dentro del equipo

Un especialista tiene visibilidad sobre todos los pacientes que hayan sido compartidos con cualquier otro miembro del mismo equipo.  
Esta visibilidad es de solo lectura, salvo los casos de relación directa o compartida explícita.

### 5. Permisos de edición según tipo de relación

- Los especialistas con **relación directa** pueden realizar todas las acciones asociadas a su especialidad sobre ese paciente.
- Los especialistas con **relación parcial** pueden editar únicamente en el marco de su especialidad.
- Un especialista que recibió un paciente mediante una relación parcial **no puede volver a compartirlo** ni modificar sus relaciones.
- Solo el dueño del equipo puede revocar la relación parcial entre un especialista y un paciente.
- Los pacientes **no pueden eliminar ni desasignar** a sus especialistas.

### 6. Acciones permitidas al dueño del equipo

El especialista que creó el equipo (dueño) puede:

- Compartir a sus pacientes con especialistas del mismo equipo.
- Revocar pacientes previamente compartidos.
- Ver y editar a todos sus pacientes, sin importar la especialidad del especialista con quien lo haya compartido.
- Realizar todas las acciones sobre sus pacientes, incluso fuera de su especialidad (por ejemplo: si es nutriólogo, puede editar rutinas si así lo requiere).

### 7. Gestión del equipo por parte del creador

El especialista creador del equipo puede realizar acciones administrativas sobre dicho equipo, tales como:

- Agregar nuevos especialistas al equipo.
- Eliminar especialistas existentes.
- Renombrar el equipo.
- Eliminar el equipo (ver siguiente punto).

### 8. Eliminación de equipos

Solo el especialista que creó el equipo puede eliminarlo.  
Esta acción puede marcarse mediante un campo `deleted_at` para mantener trazabilidad sin eliminar físicamente los registros.

---

## Consideraciones técnicas del modelo de datos

- Las relaciones **directas** se representan en la tabla `users_specialists`, las cuales deben ser únicas por combinación de `user_id`, `specialist_id` y `specialty_id`.
- Las relaciones **parciales** se manejan mediante las tablas `patient_team_shares` y `patient_team_share_specialists`, permitiendo un control granular sobre qué especialista del equipo tiene permisos sobre qué paciente compartido.
- En ambos casos se recomienda utilizar campos de trazabilidad como, `revoked_at` e `is_active`.

---

## Recomendación técnica

Se recomienda utilizar el tipo `timestamp` en lugar de `date` para las columnas `created_at`, `deleted_at` y `revoked_at` en las tablas involucradas.  
Esto permite mayor precisión y trazabilidad al incluir también la hora exacta de los eventos registrados.
