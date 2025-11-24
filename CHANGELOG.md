# Changelog

## 2025-11-24

- [Docs] Actualización completa de todos los README.md en `docs/` con formato consistente
- [Docs] Mejora de documentación de scripts en `docs/03_Infraestructura/Scripts/README.md`
- [Docs] Actualización de README principales: `docs/README.md`, `docs/00_Overview/README.md`, `docs/01_Backend/README.md`, `docs/02_Frontend/README.md`, `docs/03_Infraestructura/README.md`
- [Docs] Actualización de README de secciones: `docs/04_SQL/README.md`, `docs/05_Negocio/README.md`, `docs/99_Privado/README.md`
- [Docs] Mejora de documentación de APIs, Database y Layers en `docs/01_Backend/`
- [Docs] Consolidación de README.md en `docs/02_Frontend/` (eliminado old-README.md)
- [Docs] Formato consistente aplicado a todos los README con secciones organizadas, descripciones claras y metadatos actualizados

## 2025-11-14

- [Added] Cada `dish` expone `dataOrigin` (`fromDb`, `agentAdjusted`, `notes`) para trazar si la información proviene directo de la BD o de ajustes del agente.
- [Changed] `dailyEquivalences` confía exclusivamente en la propuesta del DietAgent; se eliminó el fallback que sumaba equivalencias desde los menús.
- [Changed] La normalización centralizada elimina `unitOfficial`, `freeAdditions`, `smaeTags` y cualquier `value` que solo refleje `items.length`.
- [Docs] Se documentó el nuevo campo `dataOrigin`, los redondeos y la depuración de campos en el contrato del endpoint y el modelo.

## 2025-11-13

- [Updated] `dailyEquivalences` ahora proviene de la propuesta del agente; solo se conserva como fallback el cálculo desde ingredientes.
- [Removed] Campos `freeAdditions`, `menus.value`, `unitOfficial` y `smaeTags` de la respuesta pública.
- [Updated] Equivalencias de cada meal se obtienen únicamente con ingredientes reales (sin usar portionDistribution como respaldo).
- [Updated] Se normalizan los valores numéricos (2 decimales técnicos, 1 decimal en `displayQuantity`) antes de responder.
- [Docs] Se alinearon los modelos y endpoints con el nuevo contrato simplificado.

## 2025-11-12

- [Added] Campo `dailyEquivalences` al objeto de respuesta del DietAgent (cuadro dietosintético diario).
- [Updated] Documentación de endpoints y modelos para reflejar este cambio.

