# Changelog

## 2025-11-13

- [Updated] `dailyEquivalences` excluye `Libre`; nueva colección `freeAdditions` con unidades y gramos inferidos dinámicamente.
- [Added] Campos `mealStructure.adaptiveLabels`, `meals[].mealLabel`, `meals[].mealNotes` para etiquetas adaptativas.
- [Added] Metadata nutricional por ingrediente: `unitOfficial`, `gramsPerUnit`, `uncertainWeight`, `caloriesPerUnit`, `impactCategory`.
- [Added] Métricas de cumplimiento calórico (`actualAverageKcal`, `actualDailyKcal`, `compliance`) con validación ±5%.
- [Updated] Documentación del endpoint y modelo para reflejar los nuevos campos.

## 2025-11-12

- [Added] Campo `dailyEquivalences` al objeto de respuesta del DietAgent (cuadro dietosintético diario).
- [Updated] Documentación de endpoints y modelos para reflejar este cambio.

