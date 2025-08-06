# Reglas de visibilidad y edición de pacientes en equipos de trabajo

Este documento describe la lógica de funcionamiento para el acceso y la edición de pacientes por parte de los especialistas dentro de los equipos de trabajo.

## Reglas de comportamiento

1. *Conformación de equipos*  
   Los equipos de trabajo están formados por uno o más especialistas. Cada equipo tiene un propietario (owner_id), quien es el especialista que lo creó.

2. *Especialistas pueden pertenecer a múltiples equipos*  
   Un mismo especialista puede formar parte de varios equipos de trabajo al mismo tiempo, ya sea como miembro o como creador.

3. *Acceso a pacientes compartidos dentro del equipo*  
   Un especialista tiene visibilidad sobre todos los pacientes que hayan sido compartidos con *cualquier otro miembro* del mismo equipo. Esta visibilidad es de solo lectura, salvo en los casos indicados en la siguiente regla.

4. *Permisos de edición restringidos a relaciones directas*  
   Solo los especialistas que tengan una relación directa con un paciente (es decir, que lo hayan atendido o que lo compartan explícitamente mediante users_specialists) pueden modificar la información del paciente.  
   Los demás miembros del equipo solo podrán visualizar el perfil del paciente.

5. *Gestión del equipo por parte del creador*  
   El especialista creador del equipo puede realizar acciones administrativas sobre dicho equipo, tales como:
   - Agregar nuevos especialistas al equipo
   - Eliminar especialistas existentes
   - Renombrar el equipo

6. *Eliminación de equipos*  
   Solo el especialista que creó el equipo puede eliminarlo. Esta acción puede marcarse mediante un campo deleted_at para mantener trazabilidad sin eliminar físicamente los registros.

---

## Sugerencia sobre el modelo de datos

Se recomienda utilizar el tipo timestamp en lugar de date para las columnas created_at y deleted_at en las tablas teamworks y teamwork_specialists. Esto permite mayor precisión y trazabilidad al incluir también la hora exacta de los eventos registrados.

```sql
-- Ejemplo sugerido:
created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
deleted_at timestamp NULL DEFAULT NULL