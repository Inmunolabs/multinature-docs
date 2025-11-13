# [23] Plan de Dieta

Genera un archivo CSV con las siguientes tareas, siguiendo el formato que te pasé antes:

- ✅ [23001] Creación de endpoint para consultar platillos desde smae

  Tags: back

  Assignee: Antoine Ganem

  _Tarea creada por Antoine_

- ✅ [23002] Crear endpoint para busqueda de recetas consultando a SMAE

  Context: Crear el endpoint `GET /diets/dishes/search?q=pollo` para realizar una búsqueda en el portal de SMAE, el resultado de su respuesta tenemos que tratarlo para poder guardar los respectivos alimentos y su detalle en nuestra base de datos, y una vez este tratada y guardada la respuesta de SMAE responder al cliente con dichos resultados

  Tags: back

  Assignee: Antoine Ganem

- ✅ [23003] Modificar los pasos del flujo de plan de dieta.

  Context: El nutriólogo debe poder elegir si después de la distibución de macronutrientes quiere continuar con la distribución de los Grupos de Alimentos (distribución de porciones) o con la asignación del Plan de Alimentación (que define los días de la semana, las comidas y selecciona los platillos para cada tiempo)

  Tags: front

  Assignee: Diego Martin Ponce

- ✅ [23004] Cambiar el nombre o agregar como toolkit para reconocer que a las "Porciones de grupos alimenticios" también se les conoce como "Cuadro dietosintetico"

  Tags: front

  Assignee: Diego Martin Ponce

- ✅ [23005] Cambiar el nombre o agregar como toolkit para reconocer que los "Alimentos (como Desayuno, Comida, Cena, etc.)" también se les conoce como "Tiempos"

  Tags: front

  Assignee: Diego Martin Ponce

- ✅ [23006] Que se vean las cantidades en gramos de los alimentos en las vistas donde sea requerida o de ayuda esta información

  Context: Considerar gramos por porciones de ingredientes, por ejemplo una tortilla pesa 50gr.
  En consulta los nutriólogos utilizan "Modelos de alimentos" que son estas figuras de plastico para representar el tamaño (porción) de los alimentos o en su defecto utilizan gramos para poder medirlos; nuestro sistema utilizará gramos

  Tags: back, front

  Assignee: Erick Robles
