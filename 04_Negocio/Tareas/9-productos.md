# [09] Productos

Genera un archivo CSV con las siguientes tareas, siguiendo el formato que te pasé antes:

- ✅ [09001] Cambiar la propiedad de imágenes de productos

  Context: por `urlImages: []` o `urlImage: ''` según sea el caso, para el endpoint de `GET {{productHost}}/products` (list products) debe ser solo un string, para los detalles de un producto `GET {{productHost}}/products/{{productId}}` debe ser un arreglo

- ✅ [09002] Agregar el campo specialties (string[]) a los productos

  Context: El campo debe ser un arreglo de UUIDs. Los productos deben tener un arreglo de identificadores de las especialidades que estos productos abarcarán, esto servirá para determinar que especialistas (a partir de sus especialidades) pueden recomendar o no un producto. Modificar toda la products-api para permitir la creación y actualización de este campo en los productos

  **Revisar los detalles de esta tarea en la [documentación](https://github.com/Inmunolabs/multinature-docs/blob/master/4.%20Negocio/promptsDeTareas/%5B09%5D%20Productos.md)**.

  Tags: back

  Assignee: Erick Robles

- ✅ [09003] Desarrollar las recomendaciones de productos por especialidad

  Context: El campo debe ser un arreglo de UUIDs. Los productos deben tener un arreglo de identificadores de las especialidades que estos productos abarcarán, esto servirá para determinar que especialistas (a partir de sus especialidades) pueden recomendar o no un producto. Modificar la lógica de recommendations para permitir que los especialistas solo puedan recomendar productos que su especialidad les permite

  **Revisar los detalles de esta tarea en la [documentación](https://github.com/Inmunolabs/multinature-docs/blob/master/4.%20Negocio/promptsDeTareas/%5B09%5D%20Productos.md)**.

  Tags: back

  Assignee: Erick Robles

- ✅ [09004] Agregar el campo specialties (string[]) a los productos

  Context: El campo debe ser un arreglo de UUIDs. Los productos deben tener un arreglo de identificadores de las especialidades que estos productos abarcarán, esto servirá para determinar que especialistas (a partir de sus especialidades) pueden recomendar o no un producto. Modificar la lógica de creación y edición de productos para agregar el arreglo de especialidades que cada producto puede abarcar, esto con el fin de permitir que los especialistas solo puedan recomendar productos que su especialidad les permita.

  **Revisar los detalles de esta tarea en la [documentación](https://github.com/Inmunolabs/multinature-docs/blob/master/4.%20Negocio/promptsDeTareas/%5B09%5D%20Productos.md)**.

  Tags: front

  Assignee: Diego Martin Ponce
