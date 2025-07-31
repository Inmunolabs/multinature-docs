# API de Diets

Esta documentación cubre todos los endpoints relacionados con la gestión de dietas y planes nutricionales.

## Índice de Endpoints

- [GET /diets/:id - Obtener dieta por ID](./diets-get.md)
- [GET /diets/user/:userId - Dietas de un usuario](./diets-list-by-user.md)
- [GET /diets/specialist/:specialistId - Dietas de un especialista](./diets-list-by-specialist.md)
- [GET /diets/foods - Listar alimentos](./diets-foods.md)
- [GET /diets/calculation/:id - Cálculo de dieta](./diets-calculation.md)
- [POST /diets - Crear dieta](./diets-create.md)
- [PATCH /diets/:id - Actualizar dieta](./diets-update.md)
- [GET / - Healthcheck](./diets-healthcheck.md)

---

## Reglas importantes y contexto del proyecto

- Las dietas son planes nutricionales diseñados por especialistas.
- Las dietas pueden incluir diferentes tipos de alimentos y porciones.
- Las dietas pueden tener cálculos automáticos de calorías y macronutrientes.
- Las dietas pueden ser personalizadas según objetivos del usuario.
- Las dietas pueden incluir restricciones alimentarias.
- Las dietas pueden tener diferentes duraciones y objetivos.

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