# [05] Dietas

Genera un archivo CSV con las siguientes tareas, siguiendo el formato que te pasé antes:

- ✅ [05001] Crear template de Google sheets para que se ajuste a dieta o rutinas

_Tarea creada por Samuel_

- ✅ [05002] BUG. Corregir Invalid grant al crear una hoja de Google sheets

_Tarea creada por Samuel_

- ✅ [05003] Guardar las dietas y rutinas con el nuevo formato

  Tags: back

  Assignee: Samuel Reveles

  _Tarea creada por Samuel_

- ✅ [05004] Refactorizar estructura de diets_snapshots y actualizar su uso en el sistema

  Context: Agregar las siguientes columnas a la tabla de `diets_snapshots`

  `startDate` date NOT NULL,
  `endDate` date NOT NULL,

  Que representan de que periodo a que periodo abarca el snapshot, que debería ser desde la última dieta registrada hasta el día de su creación, o desde la creación de la dieta vigente hasta el día de hoy

  Tags: back

  Assignee: Samuel Reveles

- ✅ [05005] Refactorizar estructura de diets y actualizar su uso en el sistema

  Context: Agregar las siguientes columnas a la tabla de `diets`

  `calories_per_day` double NOT NULL,
  `protein_per_day` double NOT NULL,
  `lipids_per_day` double NOT NULL,
  `carbohydrates_per_day` double NOT NULL,

  Tags: back

  Assignee: Samuel Reveles

- ✅ [05006] Refactorizar estructura de foods_equivalences y actualizar su uso en el sistema

  Context: Renombrar la columna `quantity` por `equivalent_quantity` en la tabla de `foods_equivalences`, la columna debe ser un double NOT NULL,

  Tags: back

  Assignee: Samuel Reveles

- ✅ [05007] Agregar las propiedades `caloriesPerDay`, `proteinPerDay`, `lipidsPerDay`, `carbohydratesPerDay` a los diet snapshots

  Context: Agregar las columnas a la tabla `diets_snapshots`, actualizar el código que este involucrado con esa tabla (CRUD de `diets_snapshots`) y actualizar también el archivo `src/dto/userSummaryDTO.js` para que se incluyan las propiedades `caloriesPerDay`, `proteinPerDay`, `lipidsPerDay`, `carbohydratesPerDay` a los objetos `diet`.

  Tags: back

  Assignee: Erick Robles

- ✅ [05008] Bug en el calendario y en los detalles del día Samuel Reveles

  Tags: back

  Assignee: Samuel Reveles

  _Tarea creada por Samuel_

- ✅ [05009] Agregar los grupos de equivalencias a las dietas Samuel Reveles, Antoine Ganem

  Tags: back

  Assignee: Samuel Reveles

  _Tarea creada por Samuel_

- ✅ [05010] No se generan las gráficas Samuel Reveles

  Tags: back

  Assignee: Samuel Reveles

  _Tarea creada por Samuel_

- ✅ [05011] Vista para asignar porciones de grupos alimenticios.

  Tags: front

  Assignee: Erick Robles

  _Tarea creada por Erick_

- ✅ [05012] Endpoint para consultar todas las recetas de los platillos

  Tags: back

  Assignee: Erick Robles

  _Tarea creada por Erick_

- ✅ [05013] Crear endpoint para listar el menu completo del usuario

  Tags: back

  Assignee: Erick Robles

  _Tarea creada por Erick_

- ✅ [05014] Crear endpoint para listar la receta de un platillo

  Tags: back

  Assignee: Erick Robles

  _Tarea creada por Erick_

- ✅ [05015] Crear endpoint para obtener foods y menus que cumplan con equivalencias alimenticias

  Tags: back

  Assignee: Erick Robles

  _Tarea creada por Erick_

- ✅ [05016] Implementar endpoint POST /diets

  Tags: back

  Assignee: Antoine Ganem

  _Tarea creada por Antoine_

- ✅ [05017] Implementar endpoint PUT /diets/:id

  Tags: back

  Assignee: Antoine Ganem

  _Tarea creada por Antoine_

- ✅ [05018] Implementar endpoint PUT /diets/:id/equivalences

  Tags: back

  Assignee: Antoine Ganem

  _Tarea creada por Antoine_

- ✅ [05019] Implementar endpoint POST /diets/:id/menus

  Tags: back

  Assignee: Antoine Ganem

  _Tarea creada por Antoine_

- ✅ [05020] Implementar endpoint PUT /menus/

  Tags: back

  Assignee: Antoine Ganem

  _Tarea creada por Antoine_

- ✅ [05021] Implementar endpoint POST /menus/:id/foods

  Tags: back

  Assignee: Antoine Ganem

  _Tarea creada por Antoine_

- ✅ [05022] Implementar endpoint PUT /menus/:m/foods/:f/overrides

  Tags: back

  Assignee: Antoine Ganem

  _Tarea creada por Antoine_

- ✅ [05023] Implementar endpoint GET /diets/:id/plan

  Tags: back

  Assignee: Antoine Ganem

  _Tarea creada por Antoine_

- ✅ [05024] Crear endpoint para obtener equivalencias por grupo desde una vista SQL combinada

  Tags: back

  Assignee: Antoine Ganem

  _Tarea creada por Antoine_

- ✅ [05025] Cambios a la respuesta de crearMenu, similar a listado de menus

  Tags: back

  Assignee: Antoine Ganem

  _Tarea creada por Antoine_

- ✅ [05026] Crear endpoint que consulte la receta de un platillo

  Tags: back

  Assignee: Antoine Ganem

  _Tarea creada por Antoine_

- ✅ [05027] Hacer un plan de desarrollo de pruebas

  Tags: back

  Assignee: Antoine Ganem

  _Tarea creada por Antoine_

- ✅ [05028] Validar endpoint de DietUpsert

  Tags: back

  Assignee: Antoine Ganem

  _Tarea creada por Antoine_

- ✅ [05029] Revisar los flujos de Menus

  Context: Los menus son entidades, deben guardarse de manera independiente a la dieta, no en la misma consulta, deberían tener su propio CRUD

  Tags: back, front

  Assignee: Samuel Reveles
