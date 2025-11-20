# [21] Dietocálculo

Genera un archivo CSV con las siguientes tareas, siguiendo el formato que te pasé antes:

- ✅ [21001] Diseñar con patrones de diseño el funcionamiento de dietocalculos

  Context: Este funcionamiento debe ser agregado a la diets-api y consiste en diseñar un modelo de clases para utilizar las diferentes fórmulas de dietocáculo con el fin de calcular el Gasto Energético Basal (GEB) de un usuario. Las fórmulas identificadas hasta el momento son:

  1.  Harris Benedict
  2.  Institute of medicine (IOM)
  3.  Mifflin-St Jeor (19–78 años)
  4.  American Gastroenterological Association (AGA)
  5.  Food and Agriculture Organization / Organización Mundial de la Salud (FAO/OMS)
  6.  Health Canada
  7.  Cunningham
  8.  Cunningham ajustado (hombre y mujer)
  9.  Cunningham modificado (_(22.771 × MLG) + 484.264_)
  10. Katch-McArdle
  11. Owen

  La intención es llegar a tener algo como lo que se tiene implementado en el orders-api, con los patrones de diseño **_Factory Method_** y **_Template Method_** para que cada que un nutriólogo quiera realizar algún dietocálculo el pueda seleccionar con que fórmula(s) quiere calcularlo

  Las fórmulas pueden verser desde la [imagen en la documentación](https://github.com/Inmunolabs/multinature-docs/blob/master/1.%20Definicion%20del%20proyecto/epics&UserStories.png) o descargando el [.excalidraw](https://github.com/Inmunolabs/multinature-docs/blob/master/1.%20Definicion%20del%20proyecto/epics%26UserStories.excalidraw) y abriendolo desde su [web](https://excalidraw.com/)

  Tags: back

  Assignee: Samuel Reveles

- ✅ [21002] Crear las clases para cada fórmula de dietocálculo

  Context: Tener en cuenta que existen "fórmulas" que más que fórmulas son tablas.

  Fórmulas:

  1.  Harris Benedict
  2.  Institute of medicine (IOM)
  3.  Mifflin-St Jeor (19–78 años)
  4.  American Gastroenterological Association (AGA)
  5.  Food and Agriculture Organization / Organización Mundial de la Salud (FAO/OMS)
  6.  Health Canada
  7.  Cunningham
  8.  Cunningham ajustado (hombre y mujer)
  9.  Cunningham modificado (_(22.771 × MLG) + 484.264_)
  10. Katch-McArdle
  11. Owen

  Tags: back

  Assignee: Samuel Reveles

- ✅ [21003] Crear endpoint en el diets-api que permita obtener el resultado de un dietocálculo

  Context: El endpoint debe ser capaz de recibir las diferentes fórmulas con las que se busca obtener el resultado del dietocálculo. Cada fórmula debe tener una validación de los campos que necesita, como edad, peso, estatura, etc. (debe haber una validación general y que cada formula la implemente de acuerdo a sus necesidades). Este endpoint debe obtener las calorias por día que debe consumir el paciente y guardarlo en el registro de la base de datos para su dieta. El proceso del dietocálculo debe ser correctamente logeado, para posibles futuras revisiones.

  Tags: back

  Assignee: Samuel Reveles

- ✅ [21004] Agregar fórmulario de macronutrientes al panel de atención de cita (consulta de paciente)

  Context: Agregar fórmulario de macronutrientes (Lípidos, Proteinas y Carbohidratos) al panel de atención de cita (consulta de paciente)

  Tags: front

  Assignee: Diego Martin Ponce

- ✅ [21005] Agregar el promedio de los resultados de las fórmulas del dietocalculo

  Context: Durante el cálculo del dietocalculo se seleccionan varias formulas para obtener las calorias por día para la generación de la dieta de una persona, en la respuesta de este cálculo se responde el resultado de cada fórmula, agregar a esa respuesta el promediado de cada fórmula.

  Tags: back

  Assignee: Samuel

- ✅ [21006] Implementar la obtención de la Masa Libre de Grasa (MLG)

  Context: Corroborar que la MLG debe ser ingresada por el especialista y considerarla para los cálculos del dietocalculo

  Tags: back

  Assignee: Samuel

- ✅ [21007] Revisión y Corrección del Cálculo del GET y Variables CAF / AF

  Context: Revisar completamente la lógica actual del cálculo energético (GEB/GET) en el backend, especialmente las fórmulas que usan Health Canada, para validar si el GET está duplicando el impacto del CAF. Definir con precisión cómo debe calcularse el GET, renombrar variables confusas (CAF, AF, ETA), documentar la lógica final y aplicar los ajustes necesarios en backend y frontend para usar únicamente los parámetros correctos. Dejar bien establecido si se requiere uno o dos parámetros relacionados con actividad física, y reflejarlo en la vista del paciente.

  Tags: back, front

  Assignee: Samuel
