# Clean Architecture y Testing — MultiNature Backend

**Versión:** 1.0
**Actualizado:** 2026-04-14

---

## Clean Architecture

### Principio fundamental

Las dependencias apuntan hacia adentro. El código más importante (lógica de negocio) no sabe que existe Express, MySQL ni AWS Lambda.

```
┌──────────────────────────────────────────────────┐
│  Infraestructura                                 │
│  Express, MySQL pool, serverless-http            │
│                                                  │
│  ┌────────────────────────────────────────────┐  │
│  │  Adaptadores                               │  │
│  │  routes/, middlewares/, dto/               │  │
│  │                                            │  │
│  │  ┌──────────────────────────────────────┐  │  │
│  │  │  Servicios / Casos de uso            │  │  │
│  │  │  services/                           │  │  │
│  │  │                                      │  │  │
│  │  │  ┌────────────────────────────────┐  │  │  │
│  │  │  │  Dominio (núcleo)              │  │  │  │
│  │  │  │  domain/, utils/               │  │  │  │
│  │  │  │  Funciones puras               │  │  │  │
│  │  │  │  Sin dependencias de layers    │  │  │  │
│  │  │  └────────────────────────────────┘  │  │  │
│  │  └──────────────────────────────────────┘  │  │
│  └────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────┘
```

Una capa interna **nunca** importa de una capa externa.

### Capas y su mapeo al proyecto

#### Capa 1 — Dominio (`domain/`, `utils/`)

Funciones puras que reciben datos y devuelven datos. Contienen reglas de negocio, validaciones, cálculos y transformaciones.

**Regla:** No pueden importar de `multi-mysql-layer`, `multi-commons-layer`, ni acceder a `req`/`res`.

```
src/domain/          → reglas de negocio específicas del dominio de la API
src/utils/           → utilidades genéricas reutilizables (formateo, parsing, etc.)
```

Ejemplos de funciones de dominio:
- Validar que un par de IDs de relink sea completo o vacío
- Clasificar la intención de una pregunta (CREATE, REUSE, CLONE)
- Detectar conceptos faltantes en un contrato de IA
- Determinar si una fila está bloqueada para edición

#### Capa 2 — Servicios (`services/`)

Orquestan: consultan MySQL, aplican lógica de dominio, devuelven resultados. Son el puente entre la infraestructura y el dominio. Estos importan de `domain/`, `utils/` y de las layers. Contienen las funciones que ejecutan queries y coordinan flujos.

```
src/services/        → funciones que usan BD + lógica de dominio
```

#### Capa 3 — Adaptadores (`routes/`, `middlewares/`, `dto/`)

Conectan el mundo HTTP con los servicios:
- **Routes:** mapean URLs a handlers
- **Middlewares:** validación de requests, autorización
- **DTOs:** transforman datos internos a formato de respuesta HTTP

#### Capa 4 — Infraestructura (`server.js`, layers)

Express, MySQL pool, serverless-http, AWS Lambda. La capa más externa.

### Flujo de dependencias

```
routes/ → middlewares/ → services/ → domain/
                            ↓
                        MySQL layer
```

`domain/` y `utils/` nunca apuntan hacia afuera.

### Estructura objetivo por API

```
src/
├── domain/                     ← NUNCA importa de layers
│   ├── conceptPolicies.js
│   └── aiContract.js
│
├── utils/                      ← NUNCA importa de layers
│   └── dateHelpers.js
│
├── services/                   ← importa de domain/ + layers
│   ├── list.js
│   ├── create.js
│   └── update.js
│
├── middlewares/                 ← importa de domain/ + layers
├── routes/                     ← importa de services/ + middlewares/
├── dto/                        ← transformaciones de datos
└── server.js                   ← ensambla todo
```

### Regla de separación

> Las funciones que no dependan de `multi-mysql-layer`, `multi-commons-layer`, ni de `req`/`res` de Express deben vivir en `domain/` o `utils/`. Los archivos de `services/`, `middlewares/` y `routes/` importan de estos módulos puros, nunca al revés.

**Consecuencia:** todo lo que viva en `domain/` y `utils/` es testeable con unit tests sin necesidad de BD, servidor, mocks ni stubs.

### Referencia

- **Clean Architecture** — Robert C. Martin (2017). [The Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
---

## Unit Testing

### Propósito

Valida que la lógica pura funcione correctamente en aislamiento. No necesita BD, red ni servidor. Responde a: *"¿mi función hace bien el cálculo/transformación/validación?"*

### Características

- **Rápido:** el suite completo corre en menos de 1 segundo.
- **Determinista:** no depende de datos en BD ni de conexión a internet. Siempre da el mismo resultado.
- **Localiza el error exacto:** si falla, se sabe qué función se rompió, no hay que investigar BD ni middleware.
- **Documenta el comportamiento:** un desarrollador nuevo lee el test y entiende qué debe hacer la función, con qué inputs y qué outputs.
- **Previene regresiones:** si alguien modifica una función pura, el test le dice inmediatamente si rompió el comportamiento existente.

### Qué testear

Funciones puras de `domain/` y `utils/`:
- Transformaciones (¿construye bien el Set de conceptos?)
- Cálculos (¿detecta los conceptos faltantes?)
- Políticas de negocio (¿clasifica correctamente la intención?)

### Qué NO testear aquí

- Queries a base de datos
- Flujos HTTP completos
- Autorización con tokens reales

### Dónde viven

```
__tests__/__unit__/domain/       ← tests de funciones de dominio
__tests__/__unit__/utils/        ← tests de utilidades
```

### Cuándo se ejecutan

- En cada push local
- En CI de Pull Requests (no necesitan BD ni secrets)
- Son la puerta antes de merge a develop

---

## Integration Testing

### Propósito

Valida que los componentes conectados funcionen juntos como sistema. Responde a: *"¿el flujo completo funciona? ¿auth + servicio + BD + respuesta HTTP?"*

### Características

- **Valida el contrato HTTP:** que el endpoint responda con el status, estructura y datos correctos.
- **Detecta problemas de integración:** un query SQL mal armado, un middleware que no pasa `next()`, un DTO que olvida un campo.
- **Prueba autorización real:** token → JWT verify → consulta usuario en BD → validación de permisos.
- **Da confianza antes de deployar:** si pasan, se sabe que la ruta funciona end-to-end contra la BD real.

### Qué testear

- Endpoints completos via supertest contra la app de Express
- Flujos de autorización (con token válido, sin token, token de otro perfil)
- Respuestas HTTP (status codes, estructura del body, campos esperados)
- Creación, actualización y eliminación de datos (con cleanup posterior)

### Qué NO testear aquí

- Lógica pura de funciones individuales (eso es unit)
- Casos edge de una función de transformación (eso es unit)

### Dónde viven

```
__tests__/__integration__/server.test.js          ← healthcheck
__tests__/__integration__/services/list.test.js   ← endpoints de lectura
__tests__/__integration__/test.server.js           ← setup de supertest + apiGateway mock
__tests__/__integration__/test.data.js             ← tokens y datos de prueba
__tests__/__integration__/test.db.js               ← conexión directa para cleanup
```

### Cuándo se ejecutan

- En desarrollo local (requieren acceso a BD)
- Antes del deploy a dev (como safety gate)
- No corren en CI de PRs

---

No se reemplazan entre sí. Los unit tests confirman que las piezas individuales funcionan. Los integration tests confirman que las piezas conectadas funcionan juntas.
