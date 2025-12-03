# SN-01 Auditoría y Corrección SMAE (Épica)

**Context:** El catálogo SMAE tiene datos corruptos, recipes incompletas, unidades incorrectas y equivalentes mal definidos. Este bloque sienta la base para porciones IA, GET y la edición de menús.

## TAREAS

- SN-01.1 Crear script de auditoría automática SMAE (v1)
  **Context:** Script Node para recorrer catálogo y detectar: unit = null, density default, equivalents.length = 0, categorías inválidas, o cualquier anomalia o irregularidad en los platillos de SMAE.
  Considerar imprimir resultados en consola + archivo audit-log.json.
  **Estimación:** 6h
  **Assignee:** Antoine  
  **Tags:** back

- SN-01.2 Generar reporte de inconsistencias SMAE
  **Context:** Listar platillos con: unidades inválidas, densidades default, equivalentes no válidos, recetas incompletas, etc.
  Generar un reporte en JSON para revisión de los platillos con problemas.
  **Estimación:** 4h
  **Assignee:** Antoine  
  **Tags:** back

- SN-01.3 Crear script de auditoría automática SMAE (v2 – reglas clínicas)
  **Context:** Mejorar auditoría para incluir: proporciones fuera de rango, conversiones imposibles, calorías negativas o > valores clínicos normales.
  Considerar generar audit-clinical-log.json.
  **Estimación:** 6h
  **Assignee:** Antoine  
  **Tags:** back

- SN-01.4 Reparación manual SMAE – Lote 1 (críticos)
  **Context:** Corregir platillos detectados en auditoría v1 y v2: unidades rotas, equivalentes vacíos, categorías incorrectas
  **Estimación:** 6h
  **Assignee:** Antoine  
  **Tags:** back

- SN-01.5 Reparación manual SMAE – Lote 2 (inconsistencias medianas)
  **Context:** Segunda pasada: normalizar densidades, corregir recetas incompletas, validar que equivalentes sumen correctamente
  **Estimación:** 6h
  **Assignee:** Antoine  
  **Tags:** back

- SN-01.6 Reparación manual SMAE – Lote 3 (no críticos)
  **Context:** Correcciones estéticas/finales: etiquetas, orden, nombres duplicados, descripción estándar.
  **Estimación:** 4h
  **Assignee:** Antoine  
  **Tags:** back

- SN-01.7 Validar categorías y grupos equivalentes SMAE
  **Context:** Validar que todos los platillos estén dentro de los grupos aprobados, y que no existan categorías custom fuera del estándar nutricional.
  **Estimación:** 3h
  **Assignee:** Antoine  
  **Tags:** back

- SN-01.8 Normalizar unidades y densidades de todo el catálogo
  **Context:** Homologar grams, ml, pieces, y densidades default. Si se considera, crear tabla de referencia.
  **Estimación:** 4h
  **Assignee:** Antoine  
  **Tags:** back

- SN-01.9 Validación cruzada de recipes SMAE vs equivalentes
  **Context:** Validar que las recetas correspondan a equivalentes reales y no usen ingredientes fuera del catálogo.
  **Estimación:** 4h
  **Assignee:** Antoine  
  **Tags:** back

- SN-01.10 Documentar contenido de SMAE
  **Context:** Crear un documento sql con los insert de todos los platillos (y sus relaciones de ingredientes) de SMAE.  
  Agregar ahí (o en otro documento) los queries que se hicieron para corregir las incongruencias o la mala data de SMAE.
  **Estimación:** 3h
  **Assignee:** Antoine  
  **Tags:** back

- SN-01.11 Implementar logger de fallbacks (densidades / equivalentes por default)
  **Context:** Cada vez que DietAgent use defaults se debe registrar en un log dedicado.
  **Estimación:** 4h
  **Assignee:** Miguel  
  **Tags:** back

- SN-01.12 Construir SMAE Cache (estructura final)
  **Context:** Mapear SMAE en un objeto optimizado para DietAgent: accesos O(1), normalizado, validado, sin valores rotos.
  **Estimación:** 6h
  **Assignee:** Miguel  
  **Tags:** back

# SN-02 Normalización Global de MealTimes (Épica)

**Context:**  
Los horarios de comida están inconsistentes entre módulos (IA, manual, DTOs, base de datos). La IA genera horarios incorrectos (cena 13:30). Se requiere un estándar único, validaciones automáticas y sincronización entre backend, frontend y DietAgent.

## TAREAS

- SN-02.1 Definir estándar final de MealTimes
  **Context:**

  - Diseñar orden oficial: Desayuno → Colación AM → Comida → Colación PM → Cena → Extra.
  - Definir reglas clínicas mínimas (rango permitido por comida).
  - Crear tabla de referencia y documentación base.

    **Estimación:** 3h
    **Assignee:** Miguel Angel Valdes  
     **Tags:** back

- SN-02.2 Crear validador universal de MealTimes (backend)
  **Context:**

  - Validador que asegure el orden correcto.
  - Detectar overlaps, horas fuera de rango, saltos incoherentes.
  - Reutilizable para menús IA y manuales.

    **Estimación:** 6h
    **Assignee:** Miguel Angel Valdes  
     **Tags:** back

- SN-02.3 Ajustar transformadores IA para usar MealTimes estándar
  **Context:**

  - Modificar transformMealPlanToMenus
  - Normalizar horarios generados por la IA
  - Garantizar que DietAgent nunca genere horarios “rotos”

    **Estimación:** 6h
    **Assignee:** Miguel Angel Valdes  
     **Tags:** back

- SN-02.4 Ajustar endpoints de dietas (menus / diets / dto)
  **Context:**

  - Normalizar horarios antes de guardar en DB
  - Actualizar endpoints que usen MealTimes: creación de menús, edición, transformadores
  - Ajustar DTOs y validaciones.
  - Garantizar que el frontend reciba los horarios correctos.
  - Documentar estructura final para frontend

    **Estimación:** 6h
    **Assignee:** Cristopher Reveles  
     **Tags:** back

- SN-02.5 Normalizar MealTimes en DTOs (dietToDTO, menuDTO)
  **Context:**

  - Unificar propiedad mealTimes
  - Asegurar output consistente entre endpoints del API
  - Garantizar que el frontend reciba los horarios correctos.
  - Documentar estructura final para frontend

    **Estimación:** 4h
    **Assignee:** Cristopher Reveles  
     **Tags:** back

- SN-02.6 QA – Validación integral de MealTimes
  **Context:**

  - Revisar: creación de menús, edición, IA, DTOs
  - Matriz especial de casos rotos (horarios fuera de orden)
  - Garantizar que frontend y backend reflejan mismo estándar

  **Estimación:** 4h
  **Assignee:** Leo  
  **Tags:** qa

# SN-03 Porciones IA (Épica)

**Context:**  
El motor de porciones del DietAgent presenta inconsistencias:

- asignaciones incorrectas,
- equivalentes que no suman lo requerido,
- colaciones sobredimensionadas,
- porciones imposibles (< 0.1),
- distribución no proporcional a GET.

Este bloque define la lógica robusta que sostendrá todos los menús IA y la edición granular del menú.

## TAREAS

- SN-03.1 Rediseñar algoritmo base de asignación de porciones (v1)
  **Context:**

  - Reescribir distribución inicial basada en GET.
  - Proporción desayuno/comida/cena con base clínica.
  - Crear matriz de distribución por tipo de objetivo (bajar, mantener, subir).

  **Estimación:** 6h  
  **Assignee:** Miguel Angel Valdes  
  **Tags:** back

- SN-03.2 Crear validador de equivalentes globales
  **Context:**

  - Validar que la suma de equivalentes diarios coincida con el plan calórico objetivo.
  - Prevenir déficits o excesos > ±10%.
  - Generar reporte por comida.

  **Estimación:** 6h  
  **Assignee:** Samuel Reveles  
  **Tags:** back

- SN-03.3 Verificación de límites por comida
  **Context:**

  - Definir máximo de equivalentes por grupo por comida.
  - Asegurar que ninguna comida supere límites clínicos.
  - Integración con SMAE corregido.

  **Estimación:** 6h  
  **Assignee:** Samuel Reveles  
  **Tags:** back

- SN-03.4 Normalizar porciones mínimas y máximas
  **Context:**

  - Garantizar que ninguna porción sea < 0.1.
  - Redondeo inteligente (0.1, 0.25, 0.5, 1.0).
  - Ajustes proporcionales entre comidas.

  **Estimación:** 3h  
  **Assignee:** Miguel Angel Valdes  
  **Tags:** back

- SN-03.5 Ajustar colaciones según GET y distribución clínica
  **Context:**

  - Corregir exceso de calorías en colaciones.
  - Ajustar distribución AM/PM según objetivo del paciente.
  - Regla: colación no mayor que 25% de comida principal.

  **Estimación:** 4h  
  **Assignee:** Samuel Reveles  
  **Tags:** back

- SN-03.6 Crear módulo de logging de desviaciones en porciones
  **Context:**

  - Loggear cuando IA rompa distribución ideal.
  - Registrar equivalentes fuera de rango, o valores de emergencia.
  - Integrar con logging GET/CAF/AF.

  **Estimación:** 3h  
  **Assignee:** Samuel Reveles  
  **Tags:** back

- SN-03.7 Validación cruzada: equivalentes → porciones → kcal finales
  **Context:**

  - Validar coherencia: equivalentes asignados deben producir calorías reales dentro del margen permitido.
  - Generar reporte de calorías por comida.

  **Estimación:** 4h  
  **Assignee:** Samuel Reveles  
  **Tags:** back

- SN-03.8 Ajustar transformadores IA para nuevas reglas de porciones
  **Context:**

  - Adaptar `transformMealPlanToMenus`.
  - Integrar reglas de equivalentes diarios + límites por comida.
  - Proteger menú de valores incoherentes.

  **Estimación:** 6h  
  **Assignee:** Miguel Angel Valdes  
  **Tags:** back

- SN-03.9 QA – Validación de flujo de porciones IA
  **Context:**

  - Casos edge: GET alto, GET bajo, colaciones omitidas, objetivo subir peso.
  - Validar proporciones y equivalentes finales con matriz clínica.
  - Registrar bugs críticos para cierre del sprint.

  **Estimación:** 4h  
  **Assignee:** Leo  
  **Tags:** qa

- SN-03.10 Integración final porciones → edición de menús IA
  **Context:**

  - Preparar output estandarizado para permitir edición granular en SN-06.
  - Validar que la estructura soporta cambios en tiempo real.

  **Estimación:** 4h  
  **Assignee:** Miguel Angel Valdes  
  **Tags:** back

# SN-04 Unificación GET / CAF / AF (Épica)

**Context:**  
Actualmente existen discrepancias entre:

- AF (Actividad Física)
- CAF (Coeficiente de Actividad Física)
- GET mal calculado según fórmula
- Inputs clínicos dispersos
- Nombres inconsistentes entre APIs, DTOs, DietAgent y formularios.

Este módulo define el **cálculo clínico correcto del GET**, estandariza CAF/AF y asegura que toda la cadena (backend → IA → DTOs → front) use un solo modelo coherente.

## TAREAS

- SN-04.1 Revisar fórmulas energéticas que hagan uso de CAF/AF
  **Context:**

  - Investigar si el uso del CAF que tenemos es correcto
  - Confirmar implementaciones actuales.
  - Detectar discrepancias entre fórmulas y versiones clínica

  **Estimación:** 6h  
  **Assignee:** Samuel Reveles  
  **Tags:** back

- SN-04.2 Unificar uso de CAF/AF en todo el proyecto
  **Context:**

  - Elegir un único parámetro oficial: CAF.
  - Remover duplicados AF/CAF.
  - Crear convertidores si es necesario.
  - Actualizar todos los archivos donde se calcule GET.

  **Estimación:** 6h  
  **Assignee:** Samuel Reveles  
  **Tags:** back, front

- SN-04.3 Validación clínica de actividad física desde formulario
  **Context:**

  - Detectar inconsistencias entre la actividad física reportada vs rango correcto.
  - Ajustar valores atípicos (CAF extremos).
  - Preparar inputs limpios para DietAgent.

  **Estimación:** 4h  
  **Assignee:** Samuel Reveles  
  **Tags:** back

- SN-04.4 Normalizar GET en DietAgent (pipeline IA)
  **Context:**

  - Ajustar pipeline para:
    - usar CAF unificado,
    - validar inputs del formulario,
    - corregir valores absurdos,
    - recalcular GET antes de porciones.
  - Integrar con logging.

  **Estimación:** 6h  
  **Assignee:** Samuel Reveles  
  **Tags:** back

- SN-04.5 Crear logger GET con inputs originales y ajustes
  **Context:**

  - Registrar:
    - peso, estatura, edad, fórmula usada, CAF, GET base, GET final.
  - Registrar cada modificación y por qué ocurrió.
  - Conservar logs para debugging clínico.

  **Estimación:** 4h  
  **Assignee:** Miguel Angel Valdes  
  **Tags:** back

- SN-04.6 Validación cruzada GET ↔ Porciones IA ↔ Objetivo
  **Context:**

  - Confirmar que el GET final corresponde al objetivo del paciente.
  - Alertar si GET no coincide con la distribución recomendada.
  - Integrar con validaciones del módulo de porciones.

  **Estimación:** 4h  
  **Assignee:** Miguel Angel Valdes  
  **Tags:** back

- SN-04.7 Actualizar DTOs para GET/CAF unificados
  **Context:**

  - Eliminar propiedades antiguas AF vs CAF.
  - Asegurar que todos los endpoints expongan la misma estructura.
  - Evitar cambios inesperados en front.

  **Estimación:** 3h  
  **Assignee:** Samuel Reveles  
  **Tags:** back

- SN-04.8 QA – Pruebas de cálculo GET y coherencia
  **Context:**

  - Probar pacientes extremos (peso bajo/alto).
  - Validar CAF mínimos/máximos.
  - Revisar GET en 3 fórmulas distintas.
  - Reportar inconsistencias de cálculo.

  **Estimación:** 4h  
  **Assignee:** Leo  
  **Tags:** qa

# SN-05 Menús IA (Núcleo Base) — Épica

**Context:**  
El sistema actual genera menús IA con estructura inconsistente:

- órdenes rotos,
- platillos mal agrupados,
- equivalentes no alineados,
- campos faltantes,
- errores en transformadores,
- incompatibilidad con la edición granular del SN-06.

Este núcleo define la **estructura estandarizada del menú IA completo**, base para edición, visualización y almacenamiento JSON.

## TAREAS

- SN-05.1 Definir estructura final del menú IA (modelo estándar)
  **Context:**

  - Definir: mealType, horario, platillos, equivalentes, kcal, porciones.
  - Establecer formato único para backend, IA y front.
  - Crear ejemplo oficial “menu_IA_example.json”.

  **Estimación:** 4h  
  **Assignee:** Miguel Angel Valdes  
  **Tags:** back

- SN-05.2 Ajustar transformadores IA para estructura final
  **Context:**

  - TransformMealPlanToMenus debe ajustarse al nuevo modelo.
  - Corregir campos faltantes o nombres inconsistentes.
  - Alinear MealTimes estándar y porciones IA nuevas.  
    **Estimación:** 6h  
    **Assignee:** Miguel Angel Valdes  
    **Tags:** back

- SN-05.3 Validar agrupación correcta de platillos en cada tiempo de comida
  **Context:**

  - Asegurar que los platillos estén correctamente asociados a su mealType.
  - Prevenir que la IA mezcle colaciones con comidas principales.
  - Validar compatibilidad con SMAE corregido.

  **Estimación:** 4h  
  **Assignee:** Miguel Angel Valdes  
  **Tags:** back

- SN-05.4 Normalizar equivalentes y cálculos por comida
  **Context:**

  - Validar equivalentes por platillo.
  - Sumar equivalentes por comida y compararlos con lo esperado por el día.
  - Asegurar coherencia con el módulo SN-03 (Porciones IA).

  **Estimación:** 4h  
  **Assignee:** Miguel Angel Valdes  
  **Tags:** back

- SN-05.5 Crear módulo de verificación nutricional por comida
  **Context:**

  - Verificar que cada comida cumpla con reglas clínicas mínimas.
  - Detectar comidas vacías o incompletas.
  - Registrar errores en un log nutricional.

  **Estimación:** 4h  
  **Assignee:** Miguel Angel Valdes  
  **Tags:** back

- SN-05.6 Ajustar API de menús IA para uso por app y web
  **Context:**

  - Definir payload limpio para consumo desde frontend.
  - Evitar campos innecesarios o duplicados.
  - Preparar para edición granular (SN-06).

  **Estimación:** 4h  
  **Assignee:** Miguel Angel Valdes  
  **Tags:** back

- SN-05.7 \* Validar compatibilidad con menús manuales
  **Context:**

  - Asegurar que el nuevo modelo convive con menús manuales.
  - Ajustar DTO unificado para ambos tipos.

  **Estimación:** 4h  
  **Assignee:** Cristopher Reveles  
  **Tags:** back

- SN-05.8 \* Generar documentación “menu-IA-schema.md”
  **Context:**

  - Describir estructura final.
  - Campos obligatorios y opcionales.
  - Ejemplos buenos y malos.

  **Estimación:** 3h  
  **Assignee:** Miguel Angel Valdes  
  **Tags:** doc

- SN-05.9 QA – Validación núcleo de menús IA
  **Context:**

  - Validar estructura, agrupación, equivalentes, calorías.
  - Revisar compatibilidad app/web.
  - Reportar inconsistencias de transformador.

  **Estimación:** 4h  
  **Assignee:** Leo  
  **Tags:** qa

- SN-05.10 Prueba integral: GET → Porciones → Menú IA
  **Context:**

  - Validar pipeline completo desde formulario → GET → porciones → menú final.
  - Detectar rupturas o divergencias.
  - Base para cierre de sprint clínico.

  **Estimación:** 4h  
  **Assignee:** Miguel Angel Valdes  
  **Tags:** back

# SN-06 Edición de Menús IA (Épica)

**Context:**  
Los especialistas deben editar menús generados por IA: cambiar platillos, mover horarios, ajustar porciones, modificar equivalentes, agregar/eliminar alimentos, etc.  
El sistema actual no permite edición granular, no registra cambios y no tiene un modelo de diff ni trazabilidad.

Esta épica construye el editor completo.

## TAREAS

- SN-06.1 Definir modelo de edición granular (operaciones permitidas)
  **Context:**

  - Definir operaciones: add/remove dish, update portions, update equivalences, change mealTime, reorder.
  - Crear tabla oficial de acciones permitidas / no permitidas.

  **Estimación:** 4h  
  **Assignee:** Miguel Angel Valdes  
  **Tags:** back

- SN-06.2 Crear endpoint PATCH para edición granular de menú IA
  **Context:**

  - Endpoint recibe acciones del editor y las aplica al JSON.
  - Validar cada cambio con reglas nutricionales.
  - Será base de guardado incremental.  
    **Estimación:** 6h  
    **Assignee:** Samuel Reveles  
    **Tags:** back

- SN-06.3 Implementar módulo de cálculo dinámico tras cambios
  **Context:**

  - Cuando el especialista ajusta porciones, recalcular equivalentes/kcal en vivo.
  - Mantener coherencia con SN-03 y SN-04.  
    **Estimación:** 6h  
    **Assignee:** Miguel Angel Valdes  
    **Tags:** back

- SN-06.4 Crear sistema de diff de menú (before/after)
  **Context:**

  - Registrar cambios línea por línea.
  - Guardar histórico en tabla menus_history.
  - Preparar estructura para auditoría.

  **Estimación:** 4h  
  **Assignee:** Samuel Reveles  
  **Tags:** back

- SN-06.5 Crear tabla menus_history y modelo ORM
  **Context:**

  - Estructura: menuId, userId, beforeJson, afterJson, actionType, timestamp.
  - Integrar con migrations.

  **Estimación:** 3h  
  **Assignee:** Samuel Reveles  
  **Tags:** back

- SN-06.6 \* Validar compatibilidad del editor con SMAE corregido
  **Context:**

  - Asegurar que los cambios del especialista respeten grupos equivalentes válidos.
  - Integrar normalizador de unidades.

  **Estimación:** 4h  
  **Assignee:** Antoine  
  **Tags:** back

- SN-06.7 Diseñar UI/UX del editor de menús IA
  **Context:**

  - Bocetos interactivos: mover comidas, editar porciones, cambiar horarios.
  - Diseño de componentes editables por platillo.
  - UX clínico claro para especialistas.  
    **Estimación:** 6h  
    **Assignee:** Diego Martin Ponce  
    **Tags:** front

- SN-06.8 Implementar UI del editor (v1 – estructura)
  **Context:**

  - Renderizar menú IA con estructura final (SN-05).
  - Habilitar selección de platillos, inputs de porciones y horarios.  
    **Estimación:** 6h  
    **Assignee:** Diego Martin Ponce  
    **Tags:** front

- SN-06.9 Implementar UI de edición granular (v2 – acciones)
  **Context:**

  - Habilitar botones: agregar platillo, eliminar platillo, cambiar orden, editar equivalentes.
  - Integración con endpoint PATCH.  
    **Estimación:** 6h  
    **Assignee:** Diego Martin Ponce  
    **Tags:** front

- SN-06.10 \* Implementar vista de historial de cambios
  **Context:**

  - Mostrar diffs almacenados en menus_history.
  - Filtro por usuario/cambio/fecha.

  **Estimación:** 4h  
  **Assignee:** Cristopher Reveles  
  **Tags:** front

- SN-06.11 \* Ajustar DTOs para reflejar cambios editables
  **Context:**

  - Asegurar que front recibe JSON listo para edición.
  - Unificar DTOs entre menú IA y manual.

  **Estimación:** 3h  
  **Assignee:** Cristopher Reveles  
  **Tags:** back

- SN-06.12 QA – Validación del editor completo
  **Context:**
  - Probar edición granular: porciones, horarios, equivalentes.
  - Validar diffs, menú final y recalculado nutricional.
  - Probar casos edge: remover comida completa, mover horarios extremos.  
    **Estimación:** 5h  
    **Assignee:** Leo  
    **Tags:** qa

# SN-07 DTOs Nutricionales y Respuestas Limpias (Épica)

**Context:**  
Las respuestas actuales de las APIs nutricionales (dietas, menús, foods, ingredients) tienen DTOs inconsistentes:

- propiedades duplicadas o con nombres distintos para lo mismo,
- estructuras diferentes entre menú IA y menú manual,
- payloads ruidosos difíciles de consumir para frontend y para la app móvil.

Esta épica busca estandarizar DTOs y limpiar las respuestas para que sean predecibles, ligeras y compatibles con el nuevo núcleo nutricional.

## TAREAS

- SN-07.1 Inventario de DTOs nutricionales actuales
  **Context:**

  - Identificar todos los DTOs involucrados: dietas, menús, foods, ingredients, equivalentes, SMAE, IA.
  - Mapear propiedades actuales vs propiedades deseadas.
  - Entregar un listado claro de “qué se expone hoy” vs “qué debería exponerse”.

  **Estimación:** 6h  
  **Assignee:** Cristopher Reveles  
  **Tags:** back

- SN-07.2 Definir esquema estándar de DTOs nutricionales
  **Context:**

  - Diseñar modelo final para:
    - menú IA,
    - menú manual,
    - platillo,
    - equivalentes,
    - tiempos de comida.
  - Asegurar consistencia con SN-05 (Menús IA núcleo) y SN-06 (Edición).
  - Documentar nombres de propiedades, tipos y obligatorios/opcionales.

  **Estimación:** 6h  
  **Assignee:** Cristopher Reveles, Miguel Angel Valdes  
  **Tags:** back

- SN-07.3 Refactorizar dietToDTO y DTOs de menús
  **Context:**

  - Ajustar `dietToDTO` y DTOs relacionados para alinearlos con el esquema estándar.
  - Eliminar propiedades redundantes o renombradas.
  - Garantizar compatibilidad con el front actual (evitar romper vistas críticas).  
    **Estimación:** 6h  
    **Assignee:** Cristopher Reveles  
    **Tags:** back

- SN-07.4 Unificar DTO de menú IA y menú manual
  **Context:**

  - Asegurar que ambos tipos de menú (IA y manual) compartan la misma estructura base.
  - Agregar flags mínimos para diferenciar origen (IA vs manual) sin cambiar el resto del modelo.
  - Reducir ramos de `if` innecesarios en front.

  **Estimación:** 4h  
  **Assignee:** Cristopher Reveles  
  **Tags:** back

- SN-07.5 \* Documentar dto-nutricional-standard.md
  **Context:**

  - Crear documento con el esquema final de DTOs nutricionales.
  - Incluir ejemplos de requests/responses “antes y después”.
  - Dejarlo como referencia oficial para front, app móvil e IA.

  **Estimación:** 3h  
  **Assignee:** Miguel Angel Valdes  
  **Tags:** doc

- SN-07.6 QA – Validación de respuestas DTO (nutrición)
  **Context:**

  - Probar endpoints clave: obtener dieta, obtener menú, editar menú, listar foods/ingredients.
  - Validar que las respuestas cumplan el esquema estándar y no rompan vistas actuales.
  - Registrar cualquier cambio que implique ajuste en front.

  **Estimación:** 4h  
  **Assignee:** Leo  
  **Tags:** qa

# SN-08 QA Núcleo Nutricional (Épica)

**Context:**  
Después de los cambios en SMAE, MealTimes, Porciones IA, GET/CAF/AF, Menús IA y Editor IA, es obligatorio validar de forma sistemática que:

- los cálculos sigan siendo clínicamente coherentes,
- no se hayan roto flujos previos,
- los menús generados por IA sean editables sin inconsistencia,
- las respuestas de las APIs nutricionales sean estables y predecibles.

Este bloque define el esfuerzo de QA dedicado al núcleo nutricional.

## TAREAS

- SN-08.1 Diseñar matriz de pruebas núcleo nutricional
  **Context:**

  - Crear una matriz de casos de prueba que cubra:
    - SMAE corregido,
    - GET/CAF/AF,
    - Porciones IA (SN-03),
    - Menús IA (SN-05),
    - Edición de Menús IA (SN-06),
    - DTOs nutricionales (SN-07).
  - Considerar pacientes con distintos objetivos y perfiles (peso bajo, peso alto, deportistas, etc).  
    **Estimación:** 5h  
    **Assignee:** Leo  
    **Tags:** qa

- SN-08.2 Ejecutar pruebas manuales sobre flujo completo IA
  **Context:**

  - Validar el flujo: formulario clínico → cálculo GET → generación de dieta IA → porciones → menú IA → edición de menú → menú final.
  - Registrar resultados en la matriz de pruebas.
  - Reportar bugs con evidencia (screenshots, payloads).  
    **Estimación:** 6h  
    **Assignee:** Leo  
    **Tags:** qa

- SN-08.3 Pruebas específicas de regresión en SMAE y equivalentes
  **Context:**

  - Validar que las correcciones de SMAE no rompan menús ya existentes.
  - Probar menús antiguos vs nuevos con el catálogo corregido.
  - Documentar cualquier diferencia relevante.

  **Estimación:** 4h  
  **Assignee:** Leo  
  **Tags:** qa

- SN-08.4 Pruebas de estrés básico en DietAgent (nutrición)
  **Context:**

  - Ejecutar múltiples llamadas consecutivas al DietAgent con distintos perfiles de usuario.
  - Validar tiempo de respuesta y estabilidad.
  - Verificar que no se generen respuestas vacías o incompletas.

  **Estimación:** 4h  
  **Assignee:** Leo  
  **Tags:** qa

- SN-08.5 Documentar resultados QA núcleo nutricional
  **Context:**

  - Documentar resumen de hallazgos:
    - bugs críticos,
    - riesgos,
    - comportamientos aceptables.
  - Crear un documento de referencia rápido para Miguel y Samuel antes de cerrar el sprint.

  **Estimación:** 3h  
  **Assignee:** Leo  
  **Tags:** qa

# SN-09 Frontend Ajuste Nutricional (Épica)

**Context:**  
Después de estabilizar SMAE, GET/CAF/AF, Porciones IA, Menús IA y el Editor IA, el frontend debe:

- reflejar los nuevos modelos y DTOs,
- mostrar la información nutricional de forma clara y útil para el especialista,
- evitar ruido visual / campos ambiguos,
- soportar edición fluida sin romper el flujo de trabajo.

Este bloque se enfoca en limpieza visual, coherencia de datos y UX nutricional para especialistas.

## TAREAS

- SN-09.1 \* Ajustar vistas para nuevo modelo de Menú IA
  **Context:**

  - Actualizar componentes que muestran menús IA para usar el esquema estándar definido en SN-05 y SN-07.
  - Asegurar que se muestren correctamente: tiempos de comida, platillos, equivalentes y porciones.
  - Retirar campos obsoletos o duplicados.  
    **Estimación:** 6h  
    **Assignee:** Diego Martin Ponce  
    **Tags:** front

- SN-09.2 \* Mejorar visualización de equivalentes y porciones por comida
  **Context:**

  - Diseñar una forma clara de ver equivalentes por grupo en cada tiempo de comida.
  - Evitar saturación de datos y priorizar claridad clínica.
  - Permitir al especialista identificar rápidamente excesos o déficits.

  **Estimación:** 4h  
  **Assignee:** Diego Martin Ponce  
  **Tags:** front

- SN-09.3 \* Integrar editor de Menús IA en flujo de trabajo del especialista
  **Context:**

  - Colocar el editor (SN-06) en el punto correcto del flujo: ver dieta → abrir menú IA → editar → guardar.
  - Asegurar navegación fluida (sin pantallas muertas ni loops raros).
  - Implementar estados de carga, éxito y error claros.  
    **Estimación:** 6h  
    **Assignee:** Diego Martin Ponce  
    **Tags:** front

- SN-09.4 \* Mostrar historial de cambios de menú (menus_history)
  **Context:**

  - Implementar una vista simple del historial de cambios:
    - quién modificó,
    - cuándo,
    - qué se cambió a nivel resumen.
  - Foco en trazabilidad rápida, no en detalle técnico profundo.

  **Estimación:** 4h  
  **Assignee:** Cristopher Reveles  
  **Tags:** front

- SN-09.5 \* Ajustar UI según estándar de MealTimes
  **Context:**

  - Alinear los labels y orden visual de los tiempos de comida con SN-02.
  - Evitar que el front permita crear/comportarse con horarios que el backend ya no acepta.
  - Corregir cualquier dropdown/lista de tiempos de comida que esté desactualizada.

  **Estimación:** 3h  
  **Assignee:** Diego Martin Ponce  
  **Tags:** front

- SN-09.6 Mejorar mensajes de error y validación nutricional en front
  **Context:**

  - Mostrar mensajes claros cuando backend rechace cambios por razones clínicas (porciones fuera de rango, equivalentes inconsistentes, etc.).
  - Evitar mensajes genéricos “Error al guardar” sin explicación.
  - Preparar textos claros para especialistas, no para desarrolladores.

  **Estimación:** 4h  
  **Assignee:** Diego Martin Ponce  
  **Tags:** front

- SN-09.7 QA visual y de flujo en módulo nutricional (frontend)
  **Context:**

  - Recorrer todo el flujo nutricional desde la perspectiva del especialista.
  - Validar que no existan pantallas rotas, datos desalineados o comportamientos raros al editar.
  - Documentar hallazgos y proponer pequeños ajustes de UX si son evidentes.

  **Estimación:** 4h  
  **Assignee:** Leo  
  **Tags:** qa

# SN-10 Operatividad del Especialista / Extras Nutricionales (Épica)

**Context:**  
Con el núcleo nutricional estabilizado (SMAE, GET/CAF/AF, Porciones IA, Menús IA, Editor, DTOs y ajustes de frontend), se requiere cerrar el ciclo operativo del especialista:

- que el flujo de trabajo sea claro y utilizable en el día a día,
- que tenga acceso fácil a la info relevante del paciente,
- que pueda entender y justificar los menús IA,
- que pueda trabajar con histórico, seguimiento y puntos clave sin perderse.

Este bloque amarra la operación diaria del especialista con el sistema.

## TAREAS

- SN-10.1 * Definir flujo operativo “de cita” del especialista (visión nutricional)
  **Context:**

  - Diseñar el flujo base de uso: entrar al sistema → seleccionar paciente → revisar contexto clínico → revisar dieta / menú IA → editar si es necesario → guardar → registrar notas.
  - Identificar pantallas y acciones mínimas que el especialista debe tener a la mano.
  - Entregar diagrama o breve documento de flujo.

  **Estimación:** 4h  
  **Assignee:** Diego Martin Ponce, Miguel Angel Valdes  
  **Tags:** ops

- SN-10.2 Integrar accesos rápidos a menús IA y edición desde ficha del paciente
  **Context:**

  - Asegurar que desde la ficha del paciente se pueda:
    - abrir el menú IA actual,
    - editarlo,
    - revisar historial de cambios,
    - ver la justificación nutricional base.
  - Evitar que el especialista tenga que “navegar por mil vistas” para hacer algo básico.

  **Estimación:** 4h  
  **Assignee:** Diego Martin Ponce  
  **Tags:** front

- SN-10.3 Resumen nutricional compacto por paciente
  **Context:**

  - Crear un pequeño resumen que incluya:
    - GET actual,
    - distribución de porciones por día,
    - objetivo (bajar, mantener, subir),
    - fecha de última actualización del menú IA.
  - Mostrarlo en la ficha del paciente o en un panel lateral.

  **Estimación:** 4h  
  **Assignee:** Cristopher Reveles  
  **Tags:** front

- SN-10.4 Ajustar permisos y validaciones de edición de menús IA
  **Context:**

  - Garantizar que solo el especialista asignado (o roles autorizados) puedan modificar menús IA.
  - Asegurar que las rutas de edición usen correctamente userBelongsToSpecialist y middleware de permisos.
  - Documentar brevemente el modelo de permisos aplicado a nutrición.

  **Estimación:** 4h  
  **Assignee:** Samuel Reveles  
  **Tags:** back

- SN-10.5 * Documentar “Guía rápida para especialistas – Módulo Nutricional”
  **Context:**

  - Crear una guía corta (no técnica) explicando:
    - cómo se calcula el GET,
    - cómo se reparten las porciones,
    - cómo usar el editor de menús IA,
    - qué significan los mensajes de error más comunes.
  - Orientada a especialistas, no a desarrolladores.

  **Estimación:** 4h  
  **Assignee:** Miguel Angel Valdes  
  **Tags:** doc

- SN-10.6 QA operativo – Flujo completo del especialista
  **Context:**

  - Recorrer el flujo real “como especialista”:
    - entrar, ver paciente, revisar dietas, editar, guardar, revisar historial.
  - Verificar que nada se sienta roto o contraintuitivo en la operación diaria.
  - Registrar hallazgos en un pequeño resumen para posibles mejoras futuras.

  **Estimación:** 6h  
  **Assignee:** Leo  
  **Tags:** qa
