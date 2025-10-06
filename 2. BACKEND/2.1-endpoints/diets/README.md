# API de Diets

Esta documentación cubre todos los endpoints relacionados con la gestión de dietas y planes nutricionales.

## Índice de Endpoints

### Router Principal `/diets/`
#### Consulta de Dietas
- [GET /diets/:id - Obtener dieta por ID](./diets-get.md)
- [GET /diets/user/:id - Dietas de un usuario](./diets-list-by-user.md)
- [GET /diets/specialist/:id - Dietas de un especialista](./diets-list-by-specialist.md)

#### Gestión de Alimentos e Ingredientes
- [GET /diets/foods - Listar alimentos disponibles](./diets-foods.md)
- [GET /diets/ingredients/ - Listar ingredientes](./diets-ingredients.md)
- [GET /diets/ingredients/:id - Ingredientes por alimento](./diets-ingredients-by-food.md)
- [GET /diets/equivalences/group - Grupos de equivalencias](./diets-equivalences-group.md)

#### Cálculos y Creación
- [POST /diets/generate-automatic - Generar dieta automática con IA](./diets-generate-automatic.md) ✨
- [POST /diets/diet-calculations/:id - Calcular dieta](./diets-diet-calculations.md)
- [POST /diets/:id - Crear/actualizar dieta](./diets-upsert.md)
- [POST /diets/equivalences/:id - Establecer equivalencias](./diets-equivalences.md)

#### Endpoints Comentados (No Activos en Producción)
- [POST /diets/generate-diet - Generar dieta](./diets-generate-diet.md) ⚠️
- [POST /diets/confirm-diet - Confirmar dieta](./diets-confirm-diet.md) ⚠️

### Router `/menus/`
- [POST /menus/ - Establecer menús](./menus-create.md)
- [POST /menus/foods - Establecer alimentos de menús](./menus-foods.md)
- [POST /menus/foods/ingredients - Establecer ingredientes](./menus-ingredients.md)

### Router `/smae/` (No Activo en Producción) ⚠️
- [GET /smae/dishes/search - Buscar platillos](./smae-search.md)
- [GET /smae/dishes/equi - Equivalencias por grupo](./smae-equivalences.md)
- [GET /smae/dishes/recipe - Receta de platillo](./smae-recipe.md)
- [GET /smae/dishes/equiFood - Equivalencias por alimentos](./smae-equivalences-food.md)
- [GET /smae/dishes/ingredients - Ingredientes por platillo](./smae-ingredients.md)

### Sistema
- [GET / - Healthcheck](./healthcheck.md)

---

**⚠️ Nota:** Los endpoints marcados con ⚠️ no están activos en producción pero están documentados para referencia completa.

---

## Reglas importantes y contexto del proyecto

- Las dietas son planes nutricionales diseñados por especialistas.
- Las dietas pueden incluir diferentes tipos de alimentos y porciones.
- Las dietas pueden tener cálculos automáticos de calorías y macronutrientes.
- Las dietas pueden ser personalizadas según objetivos del usuario.
- Las dietas pueden incluir restricciones alimentarias.
- Las dietas pueden tener diferentes duraciones y objetivos.
- El sistema incluye equivalencias alimentarias para intercambios.
- Los menús se organizan por días y tipos de comida.
- El sistema SMAE proporciona búsqueda y recetas de platillos.
- Los cálculos nutricionales consideran edad, género, peso y actividad física.

---

## Consideraciones generales para el frontend

- **Objetivos:** Mostrar dietas según objetivos del usuario (pérdida, ganancia, mantenimiento).
- **Alimentos:** Mostrar alimentos con información nutricional detallada.
- **Porciones:** Mostrar porciones recomendadas para cada alimento.
- **Cálculos:** Mostrar cálculos automáticos de calorías y macronutrientes.
- **Restricciones:** Considerar restricciones alimentarias del usuario.
- **Progreso:** Permitir seguimiento del progreso nutricional.
- **Personalización:** Permitir ajustes según preferencias del usuario.
- **Historial:** Mostrar historial de dietas anteriores.
- **Equivalencias:** Permitir intercambios de alimentos equivalentes.
- **Menús:** Organizar comidas por días y tipos (desayuno, almuerzo, cena, snack).
- **Búsqueda:** Implementar búsqueda de platillos y recetas.
- **Ingredientes:** Mostrar ingredientes detallados de cada alimento. 