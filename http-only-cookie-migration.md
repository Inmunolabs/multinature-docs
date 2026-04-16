# Migración HttpOnly Cookie Auth — Plan por Etapas

> **Objetivo:** Preparar todas las APIs del backend para soportar autenticación vía HttpOnly cookies, con CORS configurado correctamente tanto a nivel de API Gateway como de Express.
>
> **Estado actual:** `users-api` ya está completamente migrada y funcionando en dev.

---

## Contexto técnico

### ¿Qué cambia en cada API?

| Archivo | Cambio |
|---------|--------|
| `src/server.js` | Agregar `cookie-parser`, configurar CORS dinámico con `credentials: true` |
| `package.json` | Agregar `cookie-parser` como dependencia |
| `configDeploy/serverless.yaml` | Agregar `httpApi.cors` y `CORS_ORIGIN` como variable de entorno |

### ¿Por qué es necesario?

El middleware `authorize` (en `multi-commons-layer`) ya busca el token en este orden:
1. `req.cookies.access_token` (cookie HttpOnly)
2. `req.headers.authorization` (Bearer token — fallback)

Para que `req.cookies` exista, cada API necesita `cookie-parser`. Para que el browser envíe la cookie cross-origin, CORS debe tener `credentials: true` y API Gateway debe estar configurado.

### Nota sobre dominios

Cada API tiene su propio endpoint de API Gateway (dominio distinto). Las cookies son por dominio, así que la cookie seteada por `users-api` no se envía automáticamente a otras APIs. El **Bearer token sigue funcionando como fallback**. Cuando se implemente un dominio compartido (ej. `api.multinature.mx`), las cookies serán compartidas automáticamente.

---

## Progreso

| # | Etapa | API | `server.js` | `package.json` | `serverless.yaml` | Desplegado |
|---|-------|-----|:-----------:|:---------------:|:------------------:|:----------:|
| 0 | Completada | `users-api` | ✅ | ✅ | ✅ | ✅ |
| 1 | Código listo | `products-api` | ✅ | ✅ | ✅ | ⬜ |
| 2 | Código listo | `orders-api` | ✅ | ✅ | ✅ | ⬜ |
| 3 | Código listo | `bookings-api` | ✅ | ✅ | ✅ | ⬜ |
| 4 | Código listo | `diets-api` | ✅ | ✅ | ✅ | ⬜ |
| 5 | Código listo | `cart-api` | ✅ | ✅ | ✅ | ⬜ |
| 6 | Código listo | `addresses-api` | ✅ | ✅ | ✅ | ⬜ |
| 7 | Código listo | `routines-api` | ✅ | ✅ | ✅ | ⬜ |
| 8 | Código listo | `forms-api` | ✅ | ✅ | ✅ | ⬜ |
| 9 | Código listo | `notifications-api` | ✅ | ✅ | ✅ | ⬜ |
| 10 | Código listo | `commissions-api` | ✅ | ✅ | ✅ | ⬜ |
| 11 | Código listo | `constants-api` | ✅ | ✅ | ✅ | ⬜ |
| 12 | Código listo | `payment-methods-api` | ✅ | ✅ | ✅ | ⬜ |
| 13 | Código listo | `monthly-purchases-api` | ✅ | ✅ | ✅ | ⬜ |
| 14 | Pendiente | `openpay-api` | ✅ | ⬜ | ⬜ | ⬜ |
| 15 | Código listo | `public-resources-api` | ✅ | ✅ | ✅ | ⬜ |
| 16 | Código listo | `user-files-api` | ✅ | ✅ | ✅ | ⬜ |
| 17 | Código listo | `multinature-migrations-api` | ✅ | ✅ | ✅ | ⬜ |

> **Nota:** `multinature-diet-agent-api` y `multinature-routine-agent-api` son TypeScript y tienen estructura diferente. Se migrarán por separado.

---

## Etapas

### Etapa 0 — `users-api` (COMPLETADA)

API principal de autenticación. Login, logout, `/auth/me`, cookies HttpOnly. Ya desplegada y funcionando.

---

### Etapa 1 — `products-api` (CÓDIGO LISTO — pendiente deploy)

Todos los cambios de código están aplicados. Falta desplegar.

- [x] `server.js` — cookie-parser y CORS con credentials
- [x] `package.json` — `"cookie-parser": "^1.4.7"` en dependencies
- [x] `configDeploy/serverless.yaml` — `httpApi.cors` + `CORS_ORIGIN`
- [ ] Deploy a dev

---

### Etapa 2 — `orders-api` (CÓDIGO LISTO — pendiente deploy)

Todos los cambios de código están aplicados. Falta desplegar.

- [x] `server.js` — cookie-parser y CORS con credentials
- [x] `package.json` — `"cookie-parser": "^1.4.7"` en dependencies
- [x] `configDeploy/serverless.yaml` — `httpApi.cors` + `CORS_ORIGIN`
- [ ] Deploy a dev

---

### Etapa 3 — `bookings-api` (CÓDIGO LISTO — pendiente deploy)

Todos los cambios de código están aplicados. Falta desplegar.

- [x] `server.js` — cookie-parser y CORS con credentials
- [x] `package.json` — `"cookie-parser": "^1.4.7"` en dependencies
- [x] `configDeploy/serverless.yaml` — `httpApi.cors` + `CORS_ORIGIN`
- [ ] Deploy a dev

---

### Etapa 4 — `diets-api` (CÓDIGO LISTO — pendiente deploy)

Todos los cambios de código están aplicados. Falta desplegar.

- [x] `server.js` — cookie-parser y CORS con credentials
- [x] `package.json` — `"cookie-parser": "^1.4.7"` en dependencies
- [x] `configDeploy/serverless.yaml` — `httpApi.cors` + `CORS_ORIGIN`
- [ ] Deploy a dev

---

### Etapa 5 — `cart-api` (CÓDIGO LISTO — pendiente deploy)

Todos los cambios de código están aplicados. Falta desplegar.

- [x] `server.js` — cookie-parser y CORS con credentials
- [x] `package.json` — `"cookie-parser": "^1.4.7"` en dependencies
- [x] `configDeploy/serverless.yaml` — `httpApi.cors` + `CORS_ORIGIN`
- [ ] Deploy a dev

---

### Etapa 6 — `addresses-api` (CÓDIGO LISTO — pendiente deploy)

Todos los cambios de código están aplicados. Falta desplegar.

- [x] `server.js` — cookie-parser y CORS con credentials
- [x] `package.json` — `"cookie-parser": "^1.4.7"` en dependencies
- [x] `configDeploy/serverless.yaml` — `httpApi.cors` + `CORS_ORIGIN`
- [ ] Deploy a dev

---

### Etapa 7 — `routines-api` (CÓDIGO LISTO — pendiente deploy)

Todos los cambios de código están aplicados. Falta desplegar.

- [x] `server.js` — cookie-parser y CORS con credentials
- [x] `package.json` — `"cookie-parser": "^1.4.7"` en dependencies
- [x] `configDeploy/serverless.yaml` — `httpApi.cors` + `CORS_ORIGIN`
- [ ] Deploy a dev

---

### Etapa 8 — `forms-api` (CÓDIGO LISTO — pendiente deploy)

Todos los cambios de código están aplicados. Falta desplegar.

- [x] `server.js` — cookie-parser y CORS con credentials
- [x] `package.json` — `"cookie-parser": "^1.4.7"` en dependencies
- [x] `configDeploy/serverless.yaml` — `httpApi.cors` + `CORS_ORIGIN`
- [ ] Deploy a dev

---

### Etapa 9 — `notifications-api` (CÓDIGO LISTO — pendiente deploy)

Todos los cambios de código están aplicados. Falta desplegar.

- [x] `server.js` — cookie-parser y CORS con credentials
- [x] `package.json` — `"cookie-parser": "^1.4.7"` en dependencies
- [x] `configDeploy/serverless.yaml` — `httpApi.cors` + `CORS_ORIGIN`
- [ ] Deploy a dev

---

### Etapa 10 — `commissions-api` (CÓDIGO LISTO — pendiente deploy)

Todos los cambios de código están aplicados. Falta desplegar.

- [x] `server.js` — cookie-parser y CORS con credentials
- [x] `package.json` — `"cookie-parser": "^1.4.7"` en dependencies
- [x] `configDeploy/serverless.yaml` — `httpApi.cors` + `CORS_ORIGIN`
- [ ] Deploy a dev

---

### Etapa 11 — `constants-api` (CÓDIGO LISTO — pendiente deploy)

Todos los cambios de código están aplicados. Falta desplegar.

- [x] `server.js` — cookie-parser y CORS con credentials
- [x] `package.json` — `"cookie-parser": "^1.4.7"` en dependencies
- [x] `configDeploy/serverless.yaml` — `httpApi.cors` + `CORS_ORIGIN`
- [ ] Deploy a dev

---

### Etapa 12 — `payment-methods-api` (CÓDIGO LISTO — pendiente deploy)

Todos los cambios de código están aplicados. Falta desplegar.

- [x] `server.js` — cookie-parser y CORS con credentials
- [x] `package.json` — `"cookie-parser": "^1.4.7"` en dependencies
- [x] `configDeploy/serverless.yaml` — `httpApi.cors` + `CORS_ORIGIN`
- [ ] Deploy a dev

---

### Etapa 13 — `monthly-purchases-api` (CÓDIGO LISTO — pendiente deploy)

Todos los cambios de código están aplicados. Falta desplegar.

- [x] `server.js` — cookie-parser y CORS con credentials
- [x] `package.json` — `"cookie-parser": "^1.4.7"` en dependencies
- [x] `configDeploy/serverless.yaml` — `httpApi.cors` + `CORS_ORIGIN`
- [ ] Deploy a dev

---

### Etapa 14 — `openpay-api`

**Prompt:**
```
Necesito completar la migración de HttpOnly cookie auth para openpay-api.

El server.js ya está actualizado. Faltan dos cosas:

1. En package.json (backend/apis/openpay-api/package.json), agregar "cookie-parser": "^1.4.7" a dependencies.

2. En configDeploy/serverless.yaml (backend/apis/openpay-api/configDeploy/serverless.yaml):
   - Agregar bloque httpApi.cors bajo provider (después de runtime) con:
     allowedOrigins: [https://multinature-frontend-dev.vercel.app, http://localhost:3001]
     allowedHeaders: [content-type, authorization, cookie]
     allowedMethods: [GET, POST, PUT, PATCH, DELETE, OPTIONS]
     allowCredentials: true
     exposedHeaders: [set-cookie]
     maxAge: 86400
   - Agregar CORS_ORIGIN: https://multinature-frontend-dev.vercel.app,http://localhost:3001 al final de environment

Lee los archivos antes de editar. Cuida la indentación YAML (2 espacios).
```

---

### Etapa 15 — `public-resources-api` (CÓDIGO LISTO — pendiente deploy)

Todos los cambios de código están aplicados. Falta desplegar.

- [x] `server.js` — cookie-parser y CORS con credentials
- [x] `package.json` — `"cookie-parser": "^1.4.7"` en dependencies
- [x] `configDeploy/serverless.yaml` — `httpApi.cors` + `CORS_ORIGIN`
- [ ] Deploy a dev

---

### Etapa 16 — `user-files-api` (CÓDIGO LISTO — pendiente deploy)

Todos los cambios de código están aplicados. Falta desplegar.

- [x] `server.js` — cookie-parser y CORS con credentials
- [x] `package.json` — `"cookie-parser": "^1.4.7"` en dependencies
- [x] `configDeploy/serverless.yaml` — `httpApi.cors` + `CORS_ORIGIN`
- [ ] Deploy a dev

---

### Etapa 17 — `multinature-migrations-api` (CÓDIGO LISTO — pendiente deploy)

Todos los cambios de código están aplicados. Falta desplegar.

- [x] `server.js` — cookie-parser y CORS con credentials
- [x] `package.json` — `"cookie-parser": "^1.4.7"` en dependencies
- [x] `configDeploy/serverless.yaml` — `httpApi.cors` + `CORS_ORIGIN`
- [ ] Deploy a dev

---

## Etapa final — Frontend

Después de migrar todas las APIs, actualizar `frontend/multinature-frontend/src/services/api/axiosInstance.js` para incluir todas las bases en `COOKIE_ENABLED_BASES` (actualmente solo tiene `USERS_BASE` y `SPECIALISTS_BASE`).

---

## Checklist de producción

Cuando se esté listo para producción, en cada `configDeploy/serverless-prod.yaml`:

- [ ] Agregar `httpApi.cors` con `allowedOrigins: [https://www.multinature.mx]` (sin localhost)
- [ ] Agregar `CORS_ORIGIN: https://www.multinature.mx`
- [ ] Verificar `IS_OFFLINE: false` en secrets de producción
- [ ] Considerar `COOKIE_DOMAIN: .multinature.mx` si se usa dominio compartido

---

## Archivos de referencia

- **Layer compartido:** `backend/layers/multi-commons-layer/src/utils/cookieConfig.js`
- **Middleware authorize:** `backend/layers/multi-commons-layer/src/middlewares/profilesValidations.js`
- **API de referencia:** `backend/apis/users-api/` (ya migrada)
- **Frontend axios:** `frontend/multinature-frontend/src/services/api/axiosInstance.js`
