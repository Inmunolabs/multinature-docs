# Matriz de Pruebas primer entrega - 30 de junio de 2025

Las pruebas se realizaron simulando el uso del sistema como usuario final con acceso real desde red.

**Nota:** Los permisos por perfil son escalonados:

- Lo que puede hacer un *Usuario*, también lo puede hacer un *Especialista*, y así sucesivamente.
- El *Especialista* tiene funciones adicionales sobre usuarios.
- El *Administrador General* tiene acceso a casi todo, excepto a funciones específicas de perfiles de usuario final.
- Los *Administradores de Productos* y *Logística* solo tienen acceso a las secciones que les competen.

---

| Funcionalidad esperada | URL | Perfil | Tester | ¿Funciona correctamente? | Resultado real | Observaciones |
|------------------------|-----|--------|-------------|---------------------------|----------------|---------------|
| Autenticación del usuario | /login | Usuario | Miguel Valdés | ✅ | Acceso al sistema, respuesta con token |  |
| Cierre de sesión del usuario | /* | Usuario | Miguel Valdés | ✅ | Cierre de sesión del usuario |  |
| Registro de usuario a partir de una invitación | /join/register | Administrador General | Miguel Valdés |  |  |  |
| Visualización del home | /home | Administrador General | Miguel Valdés | ⛔ | No muestra nada Application error: a client-side exception has occurred (see the browser console for more information). | Esperando el despliegue para resolver el error |
| Invitación a unirse al sistema | /join | Administrador General | Miguel Valdés |  |  |  |
| Listado de pacientes asignados al especialista | /customers | Administrador General | Miguel Valdés |  |  |  |
| Formulario para registrar un nuevo especialista | /register/specialist | Administrador General | Miguel Valdés |  |  |  |
| Detalle y evolución del paciente | /customers/profile/[id] | Administrador General | Miguel Valdés |  |  |  |
| Catálogo de productos disponibles | /marketplace | Administrador General | Miguel Valdés |  |  |  |
| Detalle de producto y agregar al carrito | /marketplace/product/[id] | Administrador General | Miguel Valdés |  |  |  |
| Vista y seguimiento del plan de comisiones | /compensation-plan | Administrador General | Miguel Valdés |  |  |  |
| Listado de especialistas del usuario | /my-specialists | Administrador General | Miguel Valdés |  |  |  |
| Ver o editar perfil propio | /my-profile/[id] | Administrador General | Miguel Valdés |  |  |  |
| Exploración del catálogo de especialistas | /specialists-catalog | Administrador General | Miguel Valdés |  |  |  |
| Detalle de un especialista | /specialists-catalog/profile/[id] | Administrador General | Miguel Valdés |  |  |  |
| Herramienta de cálculo de dieta | /plan/diet-calculation | Administrador General | Miguel Valdés |  |  |  |
| Planificación semanal de alimentación | /plan/weekly-diet | Administrador General | Miguel Valdés |  |  |  |
| Creación y edición de formularios clínicos | /plan/forms | Administrador General | Miguel Valdés |  |  |  |
| Formulario de alta de especialista | /specialist/register | Administrador General | Miguel Valdés |  |  |  |
| Configuración general del especialista | /specialist/settings | Administrador General | Miguel Valdés |  |  |  |
| Plan personalizado del usuario | /your-plan | Administrador General | Miguel Valdés |  |  |  |
| Vista de red de referidos o comisiones | /network | Administrador General | Miguel Valdés |  |  |  |
| Selección de compra mensual | /monthly-purchase/your-selection | Administrador General | Miguel Valdés |  |  |  |
| Sugerencias automáticas de compra | /monthly-purchase/suggestions | Administrador General | Miguel Valdés |  |  |  |
| Listado de pedidos realizados | /orders | Administrador General | Miguel Valdés |  |  |  |
| Perfil del usuario | /profile | Administrador General | Miguel Valdés |  |  |  |
| Carrito de compras | /cart | Administrador General | Miguel Valdés |  |  |  |
| Configuraciones generales del sistema | /admin/general | Administrador General | Miguel Valdés |  |  |  |
| Panel de administración de comisiones | /admin/comissions | Administrador General | Miguel Valdés |  |  |  |
| Gestión logística de entregas | /admin/logistics | Administrador General | Miguel Valdés |  |  |  |
| Catálogo de constantes del sistema | /admin/constants | Administrador General | Miguel Valdés |  |  |  |
| Configuración y vista de notificaciones | /admin/notifications | Administrador General | Miguel Valdés |  |  |  |
| Panel de gestión de pedidos | /admin/orders | Administrador General | Miguel Valdés |  |  |  |
| Alta de nuevo usuario desde admin | /admin/create/user | Administrador General | Miguel Valdés |  |  |  |
| Alta de producto del marketplace | /admin/create/product | Administrador General | Miguel Valdés |  |  |  |
| Edición manual de un pedido | /ecommerce/edit-order | Administrador General | Miguel Valdés |  |  |  |
| Autenticación del usuario | /login | Administrador de Productos | Miguel Valdés |  |  |  |
| Visualización de dashboard personalizado | /home | Administrador de Productos | Miguel Valdés |  |  |  |
| Invitación a unirse al sistema | /join | Administrador de Productos | Miguel Valdés |  |  |  |
| Registro de usuario a partir de una invitación | /join/register | Administrador de Productos | Miguel Valdés |  |  |  |
| Listado de pacientes asignados al especialista | /customers | Administrador de Productos | Miguel Valdés |  |  |  |
| Formulario para registrar un nuevo especialista | /register/specialist | Administrador de Productos | Miguel Valdés |  |  |  |
| Detalle y evolución del paciente | /customers/profile/[id] | Administrador de Productos | Miguel Valdés |  |  |  |
| Catálogo de productos disponibles | /marketplace | Administrador de Productos | Miguel Valdés |  |  |  |
| Detalle de producto y agregar al carrito | /marketplace/product/[id] | Administrador de Productos | Miguel Valdés |  |  |  |
| Vista y seguimiento del plan de comisiones | /compensation-plan | Administrador de Productos | Miguel Valdés |  |  |  |
| Listado de especialistas del usuario | /my-specialists | Administrador de Productos | Miguel Valdés |  |  |  |
| Ver o editar perfil propio | /my-profile/[id] | Administrador de Productos | Miguel Valdés |  |  |  |
| Exploración del catálogo de especialistas | /specialists-catalog | Administrador de Productos | Miguel Valdés |  |  |  |
| Detalle de un especialista | /specialists-catalog/profile/[id] | Administrador de Productos | Miguel Valdés |  |  |  |
| Herramienta de cálculo de dieta | /plan/diet-calculation | Administrador de Productos | Miguel Valdés |  |  |  |
| Planificación semanal de alimentación | /plan/weekly-diet | Administrador de Productos | Miguel Valdés |  |  |  |
| Creación y edición de formularios clínicos | /plan/forms | Administrador de Productos | Miguel Valdés |  |  |  |
| Formulario de alta de especialista | /specialist/register | Administrador de Productos | Miguel Valdés |  |  |  |
| Configuración general del especialista | /specialist/settings | Administrador de Productos | Miguel Valdés |  |  |  |
| Plan personalizado del usuario | /your-plan | Administrador de Productos | Miguel Valdés |  |  |  |
| Vista de red de referidos o comisiones | /network | Administrador de Productos | Miguel Valdés |  |  |  |
| Selección de compra mensual | /monthly-purchase/your-selection | Administrador de Productos | Miguel Valdés |  |  |  |
| Sugerencias automáticas de compra | /monthly-purchase/suggestions | Administrador de Productos | Miguel Valdés |  |  |  |
| Listado de pedidos realizados | /orders | Administrador de Productos | Miguel Valdés |  |  |  |
| Perfil del usuario | /profile | Administrador de Productos | Miguel Valdés |  |  |  |
| Carrito de compras | /cart | Administrador de Productos | Miguel Valdés |  |  |  |
| Configuraciones generales del sistema | /admin/general | Administrador de Productos | Miguel Valdés |  |  |  |
| Panel de administración de comisiones | /admin/comissions | Administrador de Productos | Miguel Valdés |  |  |  |
| Gestión logística de entregas | /admin/logistics | Administrador de Productos | Miguel Valdés |  |  |  |
| Catálogo de constantes del sistema | /admin/constants | Administrador de Productos | Miguel Valdés |  |  |  |
| Configuración y vista de notificaciones | /admin/notifications | Administrador de Productos | Miguel Valdés |  |  |  |
| Panel de gestión de pedidos | /admin/orders | Administrador de Productos | Miguel Valdés |  |  |  |
| Alta de nuevo usuario desde admin | /admin/create/user | Administrador de Productos | Miguel Valdés |  |  |  |
| Alta de producto del marketplace | /admin/create/product | Administrador de Productos | Miguel Valdés |  |  |  |
| Edición manual de un pedido | /ecommerce/edit-order | Administrador de Productos | Miguel Valdés |  |  |  |
| Autenticación del usuario | /login | Administrador de Logística | Miguel Valdés |  |  |  |
| Visualización de dashboard personalizado | /home | Administrador de Logística | Miguel Valdés |  |  |  |
| Invitación a unirse al sistema | /join | Administrador de Logística | Miguel Valdés |  |  |  |
| Registro de usuario a partir de una invitación | /join/register | Administrador de Logística | Miguel Valdés |  |  |  |
| Listado de pacientes asignados al especialista | /customers | Administrador de Logística | Miguel Valdés |  |  |  |
| Formulario para registrar un nuevo especialista | /register/specialist | Administrador de Logística | Miguel Valdés |  |  |  |
| Detalle y evolución del paciente | /customers/profile/[id] | Administrador de Logística | Miguel Valdés |  |  |  |
| Catálogo de productos disponibles | /marketplace | Administrador de Logística | Miguel Valdés |  |  |  |
| Detalle de producto y agregar al carrito | /marketplace/product/[id] | Administrador de Logística | Miguel Valdés |  |  |  |
| Vista y seguimiento del plan de comisiones | /compensation-plan | Administrador de Logística | Miguel Valdés |  |  |  |
| Listado de especialistas del usuario | /my-specialists | Administrador de Logística | Miguel Valdés |  |  |  |
| Ver o editar perfil propio | /my-profile/[id] | Administrador de Logística | Miguel Valdés |  |  |  |
| Exploración del catálogo de especialistas | /specialists-catalog | Administrador de Logística | Miguel Valdés |  |  |  |
| Detalle de un especialista | /specialists-catalog/profile/[id] | Administrador de Logística | Miguel Valdés |  |  |  |
| Herramienta de cálculo de dieta | /plan/diet-calculation | Administrador de Logística | Miguel Valdés |  |  |  |
| Planificación semanal de alimentación | /plan/weekly-diet | Administrador de Logística | Miguel Valdés |  |  |  |
| Creación y edición de formularios clínicos | /plan/forms | Administrador de Logística | Miguel Valdés |  |  |  |
| Formulario de alta de especialista | /specialist/register | Administrador de Logística | Miguel Valdés |  |  |  |
| Configuración general del especialista | /specialist/settings | Administrador de Logística | Miguel Valdés |  |  |  |
| Plan personalizado del usuario | /your-plan | Administrador de Logística | Miguel Valdés |  |  |  |
| Vista de red de referidos o comisiones | /network | Administrador de Logística | Miguel Valdés |  |  |  |
| Selección de compra mensual | /monthly-purchase/your-selection | Administrador de Logística | Miguel Valdés |  |  |  |
| Sugerencias automáticas de compra | /monthly-purchase/suggestions | Administrador de Logística | Miguel Valdés |  |  |  |
| Listado de pedidos realizados | /orders | Administrador de Logística | Miguel Valdés |  |  |  |
| Perfil del usuario | /profile | Administrador de Logística | Miguel Valdés |  |  |  |
| Carrito de compras | /cart | Administrador de Logística | Miguel Valdés |  |  |  |
| Configuraciones generales del sistema | /admin/general | Administrador de Logística | Miguel Valdés |  |  |  |
| Panel de administración de comisiones | /admin/comissions | Administrador de Logística | Miguel Valdés |  |  |  |
| Gestión logística de entregas | /admin/logistics | Administrador de Logística | Miguel Valdés |  |  |  |
| Catálogo de constantes del sistema | /admin/constants | Administrador de Logística | Miguel Valdés |  |  |  |
| Configuración y vista de notificaciones | /admin/notifications | Administrador de Logística | Miguel Valdés |  |  |  |
| Panel de gestión de pedidos | /admin/orders | Administrador de Logística | Miguel Valdés |  |  |  |
| Alta de nuevo usuario desde admin | /admin/create/user | Administrador de Logística | Miguel Valdés |  |  |  |
| Alta de producto del marketplace | /admin/create/product | Administrador de Logística | Miguel Valdés |  |  |  |
| Edición manual de un pedido | /ecommerce/edit-order | Administrador de Logística | Miguel Valdés |  |  |  |
| Autenticación del usuario | /login | Especialista | Miguel Valdés |  |  |  |
| Visualización de dashboard personalizado | /home | Especialista | Miguel Valdés |  |  |  |
| Invitación a unirse al sistema | /join | Especialista | Miguel Valdés |  |  |  |
| Registro de usuario a partir de una invitación | /join/register | Especialista | Miguel Valdés |  |  |  |
| Listado de pacientes asignados al especialista | /customers | Especialista | Miguel Valdés |  |  |  |
| Formulario para registrar un nuevo especialista | /register/specialist | Especialista | Miguel Valdés |  |  |  |
| Detalle y evolución del paciente | /customers/profile/[id] | Especialista | Miguel Valdés |  |  |  |
| Catálogo de productos disponibles | /marketplace | Especialista | Miguel Valdés |  |  |  |
| Detalle de producto y agregar al carrito | /marketplace/product/[id] | Especialista | Miguel Valdés |  |  |  |
| Vista y seguimiento del plan de comisiones | /compensation-plan | Especialista | Miguel Valdés |  |  |  |
| Listado de especialistas del usuario | /my-specialists | Especialista | Miguel Valdés |  |  |  |
| Ver o editar perfil propio | /my-profile/[id] | Especialista | Miguel Valdés |  |  |  |
| Exploración del catálogo de especialistas | /specialists-catalog | Especialista | Miguel Valdés |  |  |  |
| Detalle de un especialista | /specialists-catalog/profile/[id] | Especialista | Miguel Valdés |  |  |  |
| Herramienta de cálculo de dieta | /plan/diet-calculation | Especialista | Miguel Valdés |  |  |  |
| Planificación semanal de alimentación | /plan/weekly-diet | Especialista | Miguel Valdés |  |  |  |
| Creación y edición de formularios clínicos | /plan/forms | Especialista | Miguel Valdés |  |  |  |
| Formulario de alta de especialista | /specialist/register | Especialista | Miguel Valdés |  |  |  |
| Configuración general del especialista | /specialist/settings | Especialista | Miguel Valdés |  |  |  |
| Plan personalizado del usuario | /your-plan | Especialista | Miguel Valdés |  |  |  |
| Vista de red de referidos o comisiones | /network | Especialista | Miguel Valdés |  |  |  |
| Selección de compra mensual | /monthly-purchase/your-selection | Especialista | Miguel Valdés |  |  |  |
| Sugerencias automáticas de compra | /monthly-purchase/suggestions | Especialista | Miguel Valdés |  |  |  |
| Listado de pedidos realizados | /orders | Especialista | Miguel Valdés |  |  |  |
| Perfil del usuario | /profile | Especialista | Miguel Valdés |  |  |  |
| Carrito de compras | /cart | Especialista | Miguel Valdés |  |  |  |
| Configuraciones generales del sistema | /admin/general | Especialista | Miguel Valdés |  |  |  |
| Panel de administración de comisiones | /admin/comissions | Especialista | Miguel Valdés |  |  |  |
| Gestión logística de entregas | /admin/logistics | Especialista | Miguel Valdés |  |  |  |
| Catálogo de constantes del sistema | /admin/constants | Especialista | Miguel Valdés |  |  |  |
| Configuración y vista de notificaciones | /admin/notifications | Especialista | Miguel Valdés |  |  |  |
| Panel de gestión de pedidos | /admin/orders | Especialista | Miguel Valdés |  |  |  |
| Alta de nuevo usuario desde admin | /admin/create/user | Especialista | Miguel Valdés |  |  |  |
| Alta de producto del marketplace | /admin/create/product | Especialista | Miguel Valdés |  |  |  |
| Edición manual de un pedido | /ecommerce/edit-order | Especialista | Miguel Valdés |  |  |  |
| Autenticación del usuario | /login | Usuario | Miguel Valdés |  |  |  |
| Visualización de dashboard personalizado | /home | Usuario | Miguel Valdés |  |  |  |
| Invitación a unirse al sistema | /join | Usuario | Miguel Valdés |  |  |  |
| Registro de usuario a partir de una invitación | /join/register | Usuario | Miguel Valdés |  |  |  |
| Listado de pacientes asignados al especialista | /customers | Usuario | Miguel Valdés |  |  |  |
| Formulario para registrar un nuevo especialista | /register/specialist | Usuario | Miguel Valdés |  |  |  |
| Detalle y evolución del paciente | /customers/profile/[id] | Usuario | Miguel Valdés |  |  |  |
| Catálogo de productos disponibles | /marketplace | Usuario | Miguel Valdés |  |  |  |
| Detalle de producto y agregar al carrito | /marketplace/product/[id] | Usuario | Miguel Valdés |  |  |  |
| Vista y seguimiento del plan de comisiones | /compensation-plan | Usuario | Miguel Valdés |  |  |  |
| Listado de especialistas del usuario | /my-specialists | Usuario | Miguel Valdés |  |  |  |
| Ver o editar perfil propio | /my-profile/[id] | Usuario | Miguel Valdés |  |  |  |
| Exploración del catálogo de especialistas | /specialists-catalog | Usuario | Miguel Valdés |  |  |  |
| Detalle de un especialista | /specialists-catalog/profile/[id] | Usuario | Miguel Valdés |  |  |  |
| Herramienta de cálculo de dieta | /plan/diet-calculation | Usuario | Miguel Valdés |  |  |  |
| Planificación semanal de alimentación | /plan/weekly-diet | Usuario | Miguel Valdés |  |  |  |
| Creación y edición de formularios clínicos | /plan/forms | Usuario | Miguel Valdés |  |  |  |
| Formulario de alta de especialista | /specialist/register | Usuario | Miguel Valdés |  |  |  |
| Configuración general del especialista | /specialist/settings | Usuario | Miguel Valdés |  |  |  |
| Plan personalizado del usuario | /your-plan | Usuario | Miguel Valdés |  |  |  |
| Vista de red de referidos o comisiones | /network | Usuario | Miguel Valdés |  |  |  |
| Selección de compra mensual | /monthly-purchase/your-selection | Usuario | Miguel Valdés |  |  |  |
| Sugerencias automáticas de compra | /monthly-purchase/suggestions | Usuario | Miguel Valdés |  |  |  |
| Listado de pedidos realizados | /orders | Usuario | Miguel Valdés |  |  |  |
| Perfil del usuario | /profile | Usuario | Miguel Valdés |  |  |  |
| Carrito de compras | /cart | Usuario | Miguel Valdés |  |  |  |
| Configuraciones generales del sistema | /admin/general | Usuario | Miguel Valdés |  |  |  |
| Panel de administración de comisiones | /admin/comissions | Usuario | Miguel Valdés |  |  |  |
| Gestión logística de entregas | /admin/logistics | Usuario | Miguel Valdés |  |  |  |
| Catálogo de constantes del sistema | /admin/constants | Usuario | Miguel Valdés |  |  |  |
| Configuración y vista de notificaciones | /admin/notifications | Usuario | Miguel Valdés |  |  |  |
| Panel de gestión de pedidos | /admin/orders | Usuario | Miguel Valdés |  |  |  |
| Alta de nuevo usuario desde admin | /admin/create/user | Usuario | Miguel Valdés |  |  |  |
| Alta de producto del marketplace | /admin/create/product | Usuario | Miguel Valdés |  |  |  |
| Edición manual de un pedido | /ecommerce/edit-order | Usuario | Miguel Valdés |  |  |  |