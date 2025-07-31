# [27] API de alimentos

Genera un archivo CSV con las siguientes tareas, siguiendo el formato que te pasé antes:

- ✅ [27001] Cotizar servicios de API de alimentos

  _Tarea creada por Antoine_

- ✅ [27002] Diseñar diagrama relacional para manejo de dietas, alimentos y equivalencias

  Contexto: Considerar las tablas actuales para la nueva implementación del API de alimentos, considerando equivalentes y grupos de alimentos

  Tags: back

  Assignee: Antoine Ganem

- ✅ [27003] Definir funcionalidad de barra de búsqueda

  Tags: back

  Assignee: Antoine Ganem

  _Tarea creada por Antoine_

- ✅ [27004] Definir endpoints para el requerimiento de creación de planes nutricionales

  Tags: back

  Assignee: Antoine Ganem

  _Tarea creada por Antoine_

- ✅ [27005] Definir guardar selección de platillos por usuario en el diagrama relacional

  Tags: back

  Assignee: Antoine Ganem

  _Tarea creada por Antoine_

- ✅ [27006] Investigación sobre el Sistema Méxicano de Equivalentes

  Contexto: Investigar sobre el Sistema Méxicano de Equivalentes para encontrar una fuente de los grupos de alimentos y sus equivalentes.

  Considerar comprar la lincencia de [smae](https://midietasmae.com.mx/)

  Tags: negocio

  Assignee: Miguel Angel Valdés García

- ✅ [27007] Modificar la estructura de la tabla `foods` para alojar más detalle de los alimentos

  Contexto: Agregar las siguientes columnas a la tabla de `foods`

  `quantity` double NOT NULL,
  `unit` enum('','barra','bolsa','bolsa chica (30g)','botella','cda','cdita','disp. de un segundo','filete','gramos','lata','mitades','paquete','pieza','reb','rebanada delgada','rebanada gruesa','sobre','taza') NOT NULL,
  `equivalents` double NOT NULL,
  `main_group` enum('Alimentos de Origen Animal','Azúcares','Cereal','Etanol','Frutas','Grasas','Leche','Leguminosas','Libre','Verduras') NOT NULL,
  `sub_group` enum('','AOAA','AOAB','AOAM','AOAMB','Con grasa','Con proteína','Con azúcar','Descremada','Entera','Etanol','Leguminosas','Libre','Semidescremada','Sin grasa','Sin proteína') NOT NULL,
  `type` enum('Alimento','Platillo') DEFAULT NULL,
  `calories` double NOT NULL,
  `protein` double NOT NULL,
  `lipids` double NOT NULL,
  `carbohydrates` double NOT NULL,
  `details` json DEFAULT NULL,

  Tags: back

  Assignee: Miguel Angel Valdés García

- ✅ [27008] Ajustar lógica y estructuras impactadas por cambios en la tabla foods para mayor detalle de alimentos

  Contexto: Ajustar el código por los cambios de la tarea 27007, ahí se agregaron las siguientes columnas a la tabla de `foods`

  `quantity` double NOT NULL,
  `unit` enum('','barra','bolsa','bolsa chica (30g)','botella','cda','cdita','disp. de un segundo','filete','gramos','lata','mitades','paquete','pieza','reb','rebanada delgada','rebanada gruesa','sobre','taza') NOT NULL,
  `equivalents` double NOT NULL,
  `main_group` enum('Alimentos de Origen Animal','Azúcares','Cereal','Etanol','Frutas','Grasas','Leche','Leguminosas','Libre','Verduras') NOT NULL,
  `sub_group` enum('','AOAA','AOAB','AOAM','AOAMB','Con grasa','Con proteína','Con azúcar','Descremada','Entera','Etanol','Leguminosas','Libre','Semidescremada','Sin grasa','Sin proteína') NOT NULL,
  `type` enum('Alimento','Platillo') DEFAULT NULL,
  `calories` double NOT NULL,
  `protein` double NOT NULL,
  `lipids` double NOT NULL,
  `carbohydrates` double NOT NULL,
  `details` json DEFAULT NULL,

  Tags: back

  Assignee: Samuel Reveles

- ✅ [27009] Poblar la tabla `foods` con la información de alimentos y platillos de smae

  Contexto: Consultar la página de [smae](https://midietasmae.com.mx/), revisar la estructura de los datos, considerar hacer scraping para obtener la información y poblar la tabla `foods`

  Tags: back

  Assignee: Antoine Ganem
