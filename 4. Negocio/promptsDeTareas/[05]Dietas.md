# [05] Dietas

Genera un archivo CSV con las siguientes tareas, siguiendo el formato que te pasé antes:

- ✅ [05004] Refactorizar estructura de diets_snapshots y actualizar su uso en el sistema

  Contexto: Agregar las siguientes columnas a la tabla de `diets_snapshots`

  `startDate` date NOT NULL,
  `endDate` date NOT NULL,

  Que representan de que periodo a que periodo abarca el snapshot, que debería ser desde la última dieta registrada hasta el día de su creación, o desde la creación de la dieta vigente hasta el día de hoy

  Tags: back

  Assignee: Samuel Reveles

- ✅ [05005] Refactorizar estructura de diets y actualizar su uso en el sistema

  Contexto: Agregar las siguientes columnas a la tabla de `diets`

  `calories_per_day` double NOT NULL,
  `protein_per_day` double NOT NULL,
  `lipids_per_day` double NOT NULL,
  `carbohydrates_per_day` double NOT NULL,

  Tags: back

  Assignee: Samuel Reveles

- ✅ [05006] Refactorizar estructura de foods_equivalences y actualizar su uso en el sistema

  Contexto: Renombrar la columna `quantity` por `equivalent_quantity` en la tabla de `foods_equivalences`, la columna debe ser un double NOT NULL,

  Tags: back

  Assignee: Samuel Reveles

- ✅ [05007] Agregar las propiedades `caloriesPerDay`, `proteinPerDay`, `lipidsPerDay`, `carbohydratesPerDay` a los diet snapshots

  Contexto: Agregar las columnas a la tabla `diets_snapshots`, actualizar el código que este involucrado con esa tabla (CRUD de `diets_snapshots`) y actualizar también el archivo `src/dto/userSummaryDTO.js` para que se incluyan las propiedades `caloriesPerDay`, `proteinPerDay`, `lipidsPerDay`, `carbohydratesPerDay` a los objetos `diet`.

  Tags: back

  Assignee: Erick Robles