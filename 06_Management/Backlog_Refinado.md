# Backlog Refinado Reconstruido

Backlog reorganizado en bloques.

## [SN-01 SMAE – Auditoría y Corrección](./1.0_Estabilidad_Nutricional.md#11-smae--auditoría-y-corrección)

### ✅ SN-01.2 Aplicar Data Analyst con Pandas a los foods de SMAE para su exploración y limpieza

- **Context:** Aplicar Data Analyst con Pandas a los foods de la base de datos para mejorar la limpieza de los mismos

- **Estimación:** 5h

- **Assignee:** Antoine Ganem

- **Tags:** back

## [SN-06 Edición de Menús IA](../2.0_Operatividad_Especialista.md#12-edición-de-menús-ia)

### ✅ SN-06.5 Terminar el desarrollo del endpoint de edición de propuestas de dietas del Agente de Dietas (DietAgent Actions)

- **Context:**

  - Terminar el desarrollo del endpoint actions de dietas, este endpoint se encarga de orquestar el pipeline de dietas, es decir, es el encargado de ejecutar los pasos del pipeline de dietas de manera independiente o en conjunto, ideal para ajustes, pruebas y validaciones por parte del especialista sin impactar la base de datos.

- **Estimación:** 6h

- **Assignee:** Samuel Reveles

- **Tags:** back

## SN-08 Actualizaciones a PDF de dietas

### ✅ SN-08.3 Crear vista para permitir a los especialistas agregar su logo a los PDFs

- **Context:** Permitir que cada especialista pueda agregar su logo por especialidad para que sea visible en los PDFs que resumen las dietas

- **Estimación:** 4h

- **Assignee:** Diego Martin Ponce

- **Tags:** back

## SN-09 Soporte Operativo y Mantenimiento General

### ✅ SN-09.7 Preparación de pitch de ventas de Multinature

- **Context:** El pitch de venta para nutriologos y entrenadores de gimnasio debe dejar claro a los vendedores para que ellos cubran los siguientes puntos:

  - Presentar Multinature a nutriólogos y entrenadores de gimnasio.
  - Realizar sesiones uno a uno (presenciales o virtuales).
  - Entender las necesidades del especialista antes de ofrecer la solución.
  - Explicar claramente el funcionamiento del sistema y su valor.
  - Acompañar al especialista en su proceso inicial de adopción.
  - Retroalimentar al equipo sobre objeciones, dudas y mejoras detectadas.
  - Mantener registros básicos de seguimiento comercial.

- **Estimación:** 6h

- **Assignee:** Antoine Ganem, Miguel Angel Valdes

- **Tags:** ops

### ✅ SN-09.8 Onboarding para ventas de Multinature

- **Context:** Capacitar a los vendedores para que ellos cubran los siguientes puntos:

  - Presentar Multinature a nutriólogos y entrenadores de gimnasio.
  - Realizar sesiones uno a uno (presenciales o virtuales).
  - Entender las necesidades del especialista antes de ofrecer la solución.
  - Explicar claramente el funcionamiento del sistema y su valor.
  - Acompañar al especialista en su proceso inicial de adopción.
  - Retroalimentar al equipo sobre objeciones, dudas y mejoras detectadas.
  - Mantener registros básicos de seguimiento comercial.

- **Estimación:** 6h

- **Assignee:** Miguel Angel Valdes

- **Tags:** ops

### ✅ SN-09.9 Permitir a los usuarios desactivar su cuenta

- **Context:** Por petición de Pandalatec se agrego esta funcionalidad que permite al usuario eliminar su propia cuenta. El eliminado debe ser un eliminado lógico (desactivación de la cuenta)

  Mensaje de Liliana Monserrath de Pandalatec: _"Para la aplicación en iOS dependemos que nos apoyen con el botón de eliminar cuenta para poder subir la app ya que nos lo pide como requisito. Me gustaria que nos den una fecha aproximada para que lo tengan al igual que con la parte de notificaciones"_

- **Estimación:** 4h

- **Assignee:** Miguel Angel Valdes

- **Tags:** back

### ✅ SN-09.10 Registro de consultas de usuarios en base de datos (Auditoria de consultas)

- **Context:** Crear un auditLogger para registrar en base de datos las consultas que cada usuario ha realizado al sistema

- **Estimación:** 4h

- **Assignee:** Miguel Angel Valdes

- **Tags:** back

## [Sprint - Infraestructura, Pagos y Deuda Técnica](./4.0_Infra_Pagos_Deuda_Tecnica.md#14-deuda-técnica-crítica)

### ✅ S_Infra_Pagos_Deuda_Tecnica-04.1 Crear las tablas de ejercicios para rutinas en español

- **Context:** Actualmente solo se tienen los ejercicios y todos sus registros relacionados con rutinas en inglés, traducir todos estos registros y crear las tablas en base de datos de los mismos pero en español

- **Estimación:** 4h

- **Assignee:** Erick Robles

- **Tags:** back

### ✅ S_Infra_Pagos_Deuda_Tecnica-04.2 Implementar soporte de idioma (i18n) EN/ES para api de rutinas

- **Context:** Actualmente el sistema no tiene una forma estándar de distinguir el idioma (EN/ES) en los contenidos y respuestas. Se requiere definir un mecanismo en backend para:

  - Identificar el idioma deseado por usuario/cliente (preferencia configurable),
  - Responder consistentemente en ese idioma desde los endpoints,
  - Preparar la base para manejar catálogos multi-idioma (ej. ejercicios, descripciones, instrucciones) sin duplicar lógica ni romper compatibilidad con lo existente.

- **Estimación:** 6h

- **Assignee:** Erick Robles

- **Tags:** back

### ✅ S_Infra_Pagos_Deuda_Tecnica-04.3 Implementación en backend de inventario de productos

- **Context:**

  - Alertar a los administradores sobre futura escases de productos.
  - Limitar a los usuarios el número de productos comprados a solo lo permitido por el inventario.
  - Correcto manejo del inventario, considerar devoluciones y cancelaciones en el sistema.
  - NOTA del creador de la tarea: Esta tarea podría desarrollar tareas diferentes por la duración de la misma

- **Estimación:** 6h

- **Assignee:** Cristopher Reveles

- **Tags:** back

### ✅ S_Infra_Pagos_Deuda_Tecnica-04.4 Implementación en frontend de inventario de productos

- **Context:**

  - Alertar a los administradores sobre futura escases de productos.
  - Limitar a los usuarios el número de productos comprados a solo lo permitido por el inventario.
  - Correcto manejo del inventario, considerar devoluciones y cancelaciones en el sistema.
  - NOTA del creador de la tarea: Esta tarea podría desarrollar tareas diferentes por la duración de la misma

- **Estimación:** 6h

- **Assignee:** Diego Martin Ponce

- **Tags:** front

### ✅ S_Infra_Pagos_Deuda_Tecnica-04.5 Quitar "specialistSettings" de la respuesta del login

- **Context:**

  - Quitar "specialistSettings" de la respuesta del login y dejar solo las "settingsBySpecialty".
  - Notificar a Pandalatec el nuevo cambio o considerar con negocio aplicar el cambio directamente en la applicación mobil.

- **Estimación:** 4h

- **Assignee:** Cristopher Reveles

- **Tags:** back

### ✅ S_Infra_Pagos_Deuda_Tecnica-04.6 Dejar de utilizar "specialistSettings" desde la respuesta del login y consultarlo de manera individual

- **Context:**

  - Dejar de utilizar "specialistSettings" desde la respuesta del login y consultarlo de manera individual en cada apartado donde sea necesario.
  - Mantener en el estado global del cliente las "specialistSettings", si en alguna vista las settings son necesarias y no se cuenta con ellas se debe consultar al backend, si ya se tiene dicha información en el estado global (o local) del cliente, no consultar al backend de nuevo.
  - Estas configuraciones de especialista deben ser atomicas por usuario y specialidad.
  - Estructura:
    ```
    "specialistSettings": {
      "chargeAdvancePayment": 32,
      "chargePerConsultation": 201,
      "monthlyCharge": 103,
      "receiveEmails": false
    }
    ```

- **Estimación:** 4h

- **Assignee:** Diego Martin Ponce

- **Tags:** back

### ✅ S_Infra_Pagos_Deuda_Tecnica-04.7 Limpieza de endpoints sin utilizar y del api-collection de Bruno

- **Context:**

  - Actualmente las apis tiene vigentes endpoints que actualmente estan en desuso, eliminarlos para mantener el código limpio.
  - Al igual que los endpoints de cada api, el api-collection de Bruno esta desactualizado, hay falta de endpoints o inclusive falta agregar algunos endpoints, encargarse de limpiar toda el api-collection para permitir que todos los endpoints del sistema puedan ser consultados desde el api-collection de Bruno

- **Estimación:** 4h

- **Assignee:** Cristopher Reveles

- **Tags:** back
