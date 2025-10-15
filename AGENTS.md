# AGENTS.md — Guía para agentes (Codex) en el monorepo de Multinature

> **Índice rápido**
> - [Modelos de BD (índice)](./DB_MODELS.md)
> - Tablas: revisa `docs/db/*.md` antes de tocar queries/repos/entities.


> **Propósito**: Este documento le dice al agente (Codex – OpenAI’s coding agent en VS Code) **cómo trabajar dentro de este repo**: estructura, comandos, convenciones, límites y plantillas de tareas. La idea es que puedas pedirle features o arreglos y que el agente ejecute, pruebe y entregue cambios listos para revisión.

---

## 1) Contexto del proyecto
- **Stack principal**: NodeJS (JS/TS), Express/Serverless (AWS Lambda), MySQL (RDS) y algo de DynamoDB; frontend en NextJS.
- **Monorepo**: APIs y capas compartidas:
  - `apis/addresses-api`
  - `apis/diets-api`
  - `apis/routines-api`
  - `apis/payments-api`
  - `multi-mysql-layer` (queries y utilidades de base de datos)
  - `multi-commons-layer` (utilidades comunes)
  - (Opcional) `multi-emails-layer`, `multi-knowledge-vault`, etc.
- **Dominios clave**: nutrición (cálculo de GEB/GET/macros), rutinas, recomendaciones, pagos e integraciones.

> **Nota**: Las rutas, nombres y capas listadas reflejan la organización actual. Si el repo difiere, **el agente debe detectar la estructura real** (`tree -L 2`) y ajustarse sin romper convenciones.

---

## 2) Requisitos locales
- **Node.js** LTS (>= 18.x) y npm.
- **VS Code** con la extensión **Codex – OpenAI’s coding agent**.
- **Sistema operativo**: Windows con **WSL** recomendado (Ubuntu). Ejecutar el workspace dentro de WSL para evitar issues al correr scripts.
- **Credenciales/vars** (ver `.env.example`):
  - MySQL: `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME` (por entorno).
  - AWS: `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_REGION`.
  - OpenAI: `OPENAI_API_KEY`.
  - Otros: `JWT_SECRET`, `FRONTEND_ORIGIN`, etc.

> **Regla**: Nunca commitear secretos. Usar `.env.local` / `dotenv` / variables de entorno en CI/CD.

---

## 3) Scripts estándar (npm/yarn/pnpm)
> Los nombres pueden variar por paquete. El agente debe **leer los package.json** relevantes y adaptar comandos.

### Comandos por paquete (ejemplo)
- **Desarrollo**: `npm run dev`
- **Build**: `npm run build`
- **Start**: `npm start`
- **Lint**: `npm run lint`
- **Test** (Jest): `npm test` o `npm run test:watch`
- **Cobertura**: `npm run coverage`
- **DB migrate**: `npm run db:migrate`
- **DB rollback**: `npm run db:rollback`
- **DB seed**: `npm run db:seed`

> Si no existen, **crear scripts mínimos** sin romper compatibilidad.

---

## 4) Estructura y convenciones
- **TypeScript** preferido en nuevos módulos; JS permitido en capas legadas.
- **Arquitectura**: Controller → Service → Repo → DB (queries en `multi-mysql-layer`).
- **Convenciones de import**: Reutilizar utilidades en `multi-commons-layer`. **No duplicar** helpers.
- **Formateo**: Prettier (respetar saltos de línea configurados por el usuario). ESLint para reglas.
- **Commits/PRs**: Mensajes claros (feat/fix/chore/refactor/docs/test), PRs pequeños con checklist y pasos de prueba.

---

## 5) multi-mysql-layer (guía rápida)
- Existen funciones utilitarias como `executeQuery`, `insertEntity`, `updateEntity` y otros métodos **vigentes**.
- **Regla del agente**: Antes de eliminar/renombrar **verificar uso** global (búsqueda en monorepo). Si un método se usa (p. ej., `getSpecialtiesByUserId`), **no eliminar**; si se refactoriza, **actualizar todos los call sites**.
- **Migraciones**: Mantener `up` y `down` atómicos y seguros. Nunca hacer cambios destructivos sin respaldo o sin `down` equivalente.

### Ejemplo de migración segura
```sql
-- up
ALTER TABLE `form_templates`
  ADD COLUMN `base_template_id` CHAR(36) DEFAULT NULL,
  ADD KEY `fk_form_templates_base` (`base_template_id`),
  ADD CONSTRAINT `fk_form_templates_base`
    FOREIGN KEY (`base_template_id`) REFERENCES `form_templates` (`id`)
    ON DELETE SET NULL ON UPDATE CASCADE;

-- down (rollback)
ALTER TABLE `form_templates`
  DROP FOREIGN KEY `fk_form_templates_base`,
  DROP KEY `fk_form_templates_base`,
  DROP COLUMN `base_template_id`;
```

> **Nunca** usar sintaxis inválida como `REMOVE COLUMN`; usar `DROP COLUMN` correctamente, cuidando llaves y constraints.

---

## 6) diets-api (dominio ejemplo)
- **Propósito**: generación/gestión de dietas, macros, alimentos `foods`, ingredientes `ingredients`, y relaciones.
- **Tablas** (ejemplo):
  - `foods`, `ingredients` (valores nutricionales por unidad/base),
  - (si existe) `foods_ingredients` para relaciones; si fue deprecada, **retirar referencias con un plan**.
- **Endpoints comunes**: `/foods`, `/ingredients`, `/diets`, `/diets/generate-automatic`.
- **Agente**: Optimizar queries (paginación, filtros), validar payloads (JOI/Zod), y **no cargar tablas completas en prompts** (usar repos y consultas paginadas).

---

## 7) Serverless/AWS
- **Lambdas** por API con `serverless.yml` o infraestructura equivalente.
- Ajustar `memorySize`, `timeout`, `environment` y permisos mínimos (IAM). No exponer secretos.
- Log/Tracing: usar logs estructurados.

---

## 8) Seguridad
- **Autenticación**: JWT o mecanismo equivalente.
- **Autorización**: validar `user.profile` (e.g., `Especialista`, `Administrador General`) en endpoints según reglas.
- **CORS**: Restringir a orígenes confiables (usar `FRONTEND_ORIGIN`).
- **Datos sensibles**: anonimizar en logs.

---

## 9) Tests
- **Jest** con `tests/**/*`.
- **Tipos** de pruebas: unitarias (services/repos) e integración (endpoints/DB).
- **Regla**: Si el agente crea/edita features, **añadir/actualizar tests** y ejecutar `npm test`. Entregar reporte.

---

## 10) Convenciones de PR y calidad
- **Checklist de PR** (agente debe incluir en la descripción):
  - [ ] Motivo y alcance
  - [ ] Cambios relevantes (archivos)
  - [ ] Script para reproducir (dev/test)
  - [ ] Evidencias (logs, screenshots, cobertura)
  - [ ] Migraciones (si aplica) con `up/down`
  - [ ] Impacto en otros servicios/capas

---

## 11) Modos de Codex y límites operativos
- **Chat**: análisis/planeación sin tocar archivos.
- **Agent**: puede leer/editar/ejecutar **dentro del workspace**. Si necesita salir o usar red, **pedirá permiso**.
- **Agent (Full Access)**: acceso amplio (incluye red). **Usar con cuidado** y solo cuando se solicite explícitamente.

**Áreas permitidas** (por defecto):
- Directorios `apis/*`, `multi-commons-layer`, `multi-mysql-layer`, `tests`, `scripts`, `infrastructure`.
- Prohibido modificar: credenciales, pipelines sensibles sin confirmación, o archivos fuera del repo.

**Acciones peligrosas** (requieren confirmación del usuario):
- Migraciones destructivas (`DROP TABLE`, `DROP COLUMN` sin `down`).
- Cambios masivos en exports de `multi-mysql-layer`.
- Cambios en `serverless.yml` que alteren permisos/IAM.

---

## 12) Plantillas de tarea para el agente

### A) Arreglar error de imports/exports (multi-mysql-layer)
> **Prompt**
```
Revisa @apis/diets-api/src/db/repos/DietRepo.js y @multi-mysql-layer/src/queries/*.
Corrige imports/exports inconsistentes (p. ej., deleteEntity no existe). Mantén API pública estable.
Actualiza todos los call sites y ejecuta `npm test`. Muéstrame diffs y resultados.
```

### B) Agregar endpoint REST (Node/Express)
> **Prompt**
```
Con base en @apis/users-api/src/routes/users.ts y @controllers/users.ts, agrega GET /users/:id.
Valida auth, retorna 404 si no existe, y añade tests en @tests/users.test.ts.
Ejecuta pruebas y comparte reporte.
```

### C) Migración MySQL con rollback
> **Prompt**
```
Crea una migración que agregue base_template_id a form_templates con FK a form_templates(id) ON DELETE SET NULL.
Incluye down simétrico eliminando FK/KEY/COLUMN en orden correcto.
Ejecuta db:migrate y prepara db:rollback (no ejecutar en PROD).
```

### D) Optimizar Lambda (Serverless)
> **Prompt**
```
Revisa @apis/diets-api/serverless.yml y @src/handler.ts.
Optimiza memory/timeout, añade variables de entorno seguras y justifica cambios en comentarios.
Genera plan de despliegue.
```

### E) Documentar módulo
> **Prompt**
```
Explica @apis/diets-api/src/openai/agent.ts y su interacción con repos/servicios.
Agrega JSDoc con ejemplos de uso.
```

---

## 13) Flujo recomendado para tareas grandes (Cloud Tasks)
1. Preparar rama: `git checkout -b feat/<descripcion>`.
2. Delegar a cloud si la tarea implica refactors extensos o muchas pruebas.
3. Revisar diffs, logs y resultados de tests.
4. Aceptar cambios → push → PR.

> Si el agente propone múltiples commits, que deje mensajes claros y un resumen en el PR.

---

## 14) Troubleshooting (rápido)
- **Windows**: si hay fallos al ejecutar scripts, mover el workspace a **WSL**.
- **Rate limits OpenAI**: ajustar tamaño de contexto, dividir tareas, o bajar “reasoning effort”.
- **Dependencias rotas**: reinstalar en el paquete afectado (`rm -rf node_modules && npm i`) respetando versiones.

---

## 15) Estándares de calidad y estilo
- Mantener funciones pequeñas y legibles.
- Validaciones en frontera (controllers) y reglas de negocio en services.
- Manejo de errores consistente (HTTP codes, mensajes claros, sin filtrar internals).
- Logs útiles (sin secretos), feature flags donde aplique.

---

## 16) Anexos
- **Glosario**: GEB, GET, macros, SMAE, etc.
- **Enlaces internos**: README por paquete, diagramas (si existen), políticas de ramas y releases.

> **Cierre**: El agente debe **proponer** pero no imponer cambios. Cualquier acción destructiva o que afecte permisos/seguridad debe confirmarse con Miguel antes de aplicar.

---

## 17) Estructura detectada del monorepo (depth 2)

**Raíz (backend)**
```
C:\Users\mvald\OneDrive\Desktop\workspace\multinature\backend
├── .cursor
├── .prettierrc.json
├── api-collection
├── apis
├── build-layers.bat
├── commitAndPush-git-repos.bat
├── deploy-apis-lambdas.bat
├── docs
├── layers
├── package-lock.json
├── pull-git-repos.bat
├── scripts
└── tools
```

**apis/**
```
C:\...\backend\apis
├── addresses-api
├── bookings-api
├── cart-api
├── commissions-api
├── constants-api
├── diets-api
├── forms-api
├── monthly-purchases-api
├── notifications-api
├── orders-api
├── payment-methods-api
├── payments-api
├── products-api
├── public-resources-api
├── routines-api
└── users-api
```

**layers/**
```
C:\...\backend\layers
├── multi-commons-layer
├── multi-emails-layer
└── multi-mysql-layer
```

**scripts/**
```
C:\...\backend\scripts
├── update-docs-index.ps1
├── update-docs-index.sh
└── update-docs-index.ts
```

**tools/**
```
C:\...\backend\tools
└── reports
```

### Alcance del agente por carpeta
- **apis/**: núcleo de servicios. Aquí hará la mayor parte de lecturas/ediciones/tests.
- **layers/**: librerías compartidas. Cambios aquí impactan a múltiples APIs → *revisar usos globales y actualizar call sites + tests*.
- **scripts/**: utilitarios de DX y docs. Mantenerlos idempotentes y documentados si se agregan nuevos.
- **tools/reports**: generación de reportes. No tocar sin instrucción.
- **api-collection**: colecciones (Bruno/Postman). Sincronizar cuando se cambien endpoints.
- **.prettierrc.json**: respetar formato del repo.

---

## 18) Descubrimiento y comandos por paquete

> Regla: antes de ejecutar, el agente debe leer `package.json` de cada API y de cada layer que lo tenga para construir un **mapa real de scripts**.

**Scripts esperados por paquete (si faltan, proponerlos):**
- `dev`, `build`, `start`, `lint`, `test`, `coverage`
- `db:migrate`, `db:rollback`, `db:seed` (solo donde aplique)

**APIs detectadas** (plantilla de trabajo por cada una):
- `apis/addresses-api`
- `apis/bookings-api`
- `apis/cart-api`
- `apis/commissions-api`
- `apis/constants-api`
- `apis/diets-api`
- `apis/forms-api`
- `apis/monthly-purchases-api`
- `apis/notifications-api`
- `apis/orders-api`
- `apis/payment-methods-api`
- `apis/payments-api`
- `apis/products-api`
- `apis/public-resources-api`
- `apis/routines-api`
- `apis/users-api`

Para **cada API**:
1. Detectar estructura `src/**` (routes, controllers, services, repos, middlewares, openai/agent.ts si aplica).
2. Verificar si existe `serverless.yml` (o equivalente) y respetar límites de permisos/IAM.
3. Construir comandos con los scripts **reales** del `package.json`.
4. Si no hay tests, **crear carpeta de pruebas** y casos mínimos para nuevos endpoints o bugs corregidos.
5. Actualizar `api-collection` (si corresponde) cuando se añadan/alteren endpoints.

**Layers detectadas**:
- `layers/multi-commons-layer`
- `layers/multi-emails-layer`
- `layers/multi-mysql-layer`

Reglas para **layers**:
- Mantener **API pública estable** (archivo de export principal).
- Antes de eliminar/renombrar funciones (ej. en `multi-mysql-layer`), buscar usos en **todas** las APIs.
- Si se agregan funciones nuevas, incluir ejemplo de uso (README del layer) y tests si aplica.

---

## 19) Guardarraíles específicos (aplicando a tu estructura)

1. **Cambios en `multi-mysql-layer`**  
   - No eliminar helpers (p. ej. `getSpecialtiesByUserId`) si están en uso.  
   - Si se refactoriza, actualizar imports/llamadas en todas las APIs afectadas (**búsqueda global**) y correr `npm test` por paquete.

2. **Migraciones MySQL (en APIs que usen DB relacional)**  
   - Siempre `up` + `down` simétricos.  
   - Prohibido `DROP COLUMN/TABLE` sin `down` y sin confirmación explícita.  
   - Si la migración es grande, PR dedicado y plan de rollback en la descripción.

3. **Serverless/AWS**  
   - No elevar permisos IAM ni exponer secretos.  
   - Ajustar `memorySize`/`timeout` con comentarios justificando el cambio.  
   - Mantener variables de entorno en `.env`/CI, **no** en código.

4. **Formato/estilo**  
   - Prettier y ESLint del repo mandan.  
   - TypeScript en lo nuevo; JS solo para mantener compatibilidad en módulos legados.

---

## 20) Prompts de trabajo (con tus rutas)

### A) Arreglar inconsistencias en layer y repos
```
Revisa usos de multi-mysql-layer en todas las APIs de apis/*.
Si algún export no existe (p. ej. deleteEntity), corrige imports/llamadas o implementa el helper donde corresponda.
Actualiza call sites y ejecuta test por paquete. Entrega diffs + reporte.
```

### B) Endpoint nuevo con tests (ejemplo en users-api)
```
En apis/users-api agrega GET /users/:id.
Usa el repo real (src/db/repos/UserRepo.*). Valida auth, 404 si no existe y 200 con payload mínimo.
Crea tests en tests/users.test.* y ejecuta npm test. Entrega reporte.
```

### C) Migración segura (ejemplo form_templates)
```
Crea migración up/down para base_template_id con FK (ON DELETE SET NULL ON UPDATE CASCADE).
Incluye scripts db:migrate y db:rollback si faltan. No ejecutar en PROD.
```

### D) Optimización de Lambda (diets-api)
```
Revisa apis/diets-api/serverless.yml y src/handler.*.
Propón memory/timeout razonables y justifica en comentarios.
Genera plan de despliegue (pasos y validaciones post-deploy).
```

---

## 21) Siguientes pasos sugeridos para el agente

1. **Inventario de scripts**: leer `package.json` en cada carpeta de `apis/*` y `layers/*` y producir una tabla `paquete → scripts`.
2. **Mapa de dependencias cruzadas**: detectar dónde se usa cada export de `multi-mysql-layer` / `multi-commons-layer`.
3. **Chequeo de salud**: correr `lint` y `test` por paquete (donde existan) y listar fallos.
4. **Docs vivas**: si se crean o modifican endpoints, actualizar `api-collection` y `docs/` correspondientes.