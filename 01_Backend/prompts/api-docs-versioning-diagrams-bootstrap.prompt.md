Actúa como Tech Lead senior (Node.js + Express + AWS). Estás trabajando en el repo/API: addresses-api.

Objetivo:
Estandarizar documentación mínima y mantenible para versionado, releases y diagramas por endpoint en este repo, siguiendo el estándar ya definido en bookings-api y el patrón de docs/diagramas de diets-api.

Referencias obligatorias (estándar a imitar):
1) Estructura/estilo base:
- apis/bookings-api/openapi.yaml
- apis/bookings-api/CHANGELOG.md
- apis/bookings-api/docs/VERSIONADO.md
- apis/bookings-api/docs/SERVICE.md
- apis/bookings-api/docs/releases/v1.0.0.md

2) Estándar de naming + estructura de diagramas:
- apis/diets-api/docs/diagrams/endpoints/* (naming como `foods-patch-by-id.mmd`, `diets-get-by-user-id.mmd`, etc.)
- Ejemplo de profundidad/estilo:
  - apis/diets-api/docs/diagrams/endpoints/foods-patch-by-id.mmd

3) Estándar de índice de docs:
- apis/diets-api/docs/README.md (indexa endpoints ↔ diagramas)

Contexto del routing en addresses-api:
- El entrypoint principal de rutas es: `apis/addresses-api/src/routes/router.js`
- Pueden existir múltiples routers adicionales en: `apis/addresses-api/src/routes/*`
- Debes detectar y documentar TODOS los endpoints (públicos y privados), recorriendo todos los routers que se monten desde el router principal (directa o indirectamente).

Reglas del flujo real (documentar lo que existe, NO inventar):
- Deploy a DEV al hacer push/merge a `develop`.
- Deploy a PROD al hacer push/merge a `master` o `main`.
- Por ahora, la “versión estable” corresponde al estado actual en `master/main` desplegado a PROD.
- Si el repo ya usa tags o SemVer, respétalo; si no, documenta la realidad (master/main=prod).

Tareas (solo documentación/diagramas; NO tocar lógica de negocio):
1) Crear carpeta `docs/` si no existe.
2) Crear/actualizar estos archivos:
   - `docs/VERSIONADO.md` (corto, 1 página máx)
   - `docs/SERVICE.md` (tarjeta de 1 pantalla)
   - `docs/README.md` (índice general, estilo diets-api)
3) Crear carpeta `docs/releases/` si no existe.
4) Crear release notes SOLO si se indica una versión objetivo:
   - Si se especifica versión: crear `docs/releases/<VERSION>.md`
   - Si NO se especifica versión: NO crear releases “inventados”
5) Crear `CHANGELOG.md` en raíz si no existe; si existe, actualizarlo SOLO si se especifica versión.
   - Mantenerlo corto (3–8 bullets por versión)
   - No duplicar contenido del release
6) Crear `openapi.yaml` en raíz si no existe.
   - Inferir endpoints reales desde routers/controladores/handlers.
   - No inventar endpoints.
   - Si no se puede inferir schema exacto: usar `type: object` y marcar `TODO` en `description`.
7) Crear carpeta: `docs/diagrams/endpoints/`
8) Generar un archivo Mermaid `.mmd` POR CADA endpoint real expuesto por addresses-api (incluye públicos y privados):
   - Debe existir correspondencia 1:1 (endpoint ↔ archivo).
   - NUNCA combines múltiples endpoints en un solo archivo.
   - Los diagramas deben reflejar la lógica real del código (sin inventar).
9) Requisitos de contenido por diagrama:
   Cada `.mmd` debe modelar como mínimo:
   - Autenticación/autorización (si existe middleware)
   - Validaciones de params/query/body (si existen)
   - Condiciones (if/else) y bifurcaciones por caso
   - Caminos de error relevantes (400/401/403/404/409/500) con causa
   - Llamadas a DB/servicios externos (nodos claros)
   - Respuesta final por cada camino principal
10) Nivel de detalle:
   - Igual o muy similar a `foods-patch-by-id.mmd`.
   - Si el endpoint delega en services/helpers, sigue el flujo lo suficiente para capturar decisiones y condiciones importantes.
   - Si algo NO se puede inferir con certeza, agrega un nodo “Por confirmar” y NO inventes.
11) Convención de nombres de los diagramas (igual a diets-api):
   - Formato: `<recurso>-<metodo>-<variacion>.mmd`
   - Reglas:
     - `GET /addresses/:id` → `addresses-get-by-id.mmd`
     - `PATCH /addresses/:id` → `addresses-patch-by-id.mmd`
     - `GET /addresses/options` → `addresses-get-options.mmd`
     - Para endpoints anidados, usa una variación corta pero clara (evita paths larguísimos).
   - El “recurso” debe ser consistente y basado en el path principal.
12) Actualizar `docs/README.md` al estilo de `apis/diets-api/docs/README.md`:
   - Incluir sección “Endpoints” con una tabla que liste TODOS los endpoints detectados:
     Columnas mínimas:
     - Método
     - Path
     - Descripción corta (1 línea)
     - Link al diagrama `.mmd`
     - (opcional) Link a OpenAPI (archivo o endpoint si existe)
   - El índice debe enlazar todos los diagramas 1:1.
13) Si existe `README.md` en raíz del repo, agrega una sección “Documentación” con links a:
   - `docs/README.md`
   - `openapi.yaml`
   - `CHANGELOG.md`

Plantilla sugerida para `docs/releases/<VERSION>.md` (tablas, digerible):
# addresses-api — <VERSION>

| Campo | Valor |
|---|---|
| Tipo | PATCH / MINOR / MAJOR |
| Entorno | PROD |
| Rama | master/main |
| Fecha | mes/año |
| Riesgo | Bajo/Medio/Alto |
| Compatibilidad | Sin breaking changes / Breaking changes |

## Resumen (1 línea)
...

## Cambios
| Área/Endpoint | Antes | Ahora | Motivo |
|---|---|---|---|

## Impacto
| Impacto | Detalle |
|---|---|
| Usuario final | ... |
| Técnico | ... |
| Datos | ... |

## Validación mínima
| Prueba | Resultado |
|---|---|
| ... | ✅/⏳ |

## Referencias
- PR/Issue/Incidente si existe

Verificación final (OBLIGATORIA):
- No copiar features de otras APIs que no existan en addresses-api.
- No inventar endpoints.
- Diagramas 1:1 con endpoints reales.
- `docs/README.md` debe indexar TODOS los endpoints y enlazar a su diagrama.
