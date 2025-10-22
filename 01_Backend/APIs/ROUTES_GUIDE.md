# Guía de diseño de rutas REST

> **Propuesto por:** Diego Martin Ponce   
> **Redactado por:** Diego Martin Ponce — *Última edición: 30/julio/2025*

> Documento destinado al equipo **Backend**.
>
> Objetivo: definir un contrato uniforme de URLs que facilite la coherencia, documentación, seguridad y la invalidez automática de caché en el _frontend_.

---

## 1. Principios generales

| Principio      | Descripción                                                |
| -------------- | ---------------------------------------------------------- |
| **Predecible** | Misma forma para todos los recursos.                       |
| **Jerárquico** | De lo general a lo específico (`/users/{id}/sub-recurso`). |
| **Expresivo**  | La URL describe por sí sola el recurso/colección.          |
| **Extensible** | Añadir sub-recursos sin _breaking changes_.                |
| **Idiomas**    | Plural, `kebab-case`, en inglés.                           |

---

## 2. Agrupación por dominios y sub-recursos

### 2.1 Estructura base

```
/{dominio}/{id?}/{sub-recurso?}/{sub-id?}/{acción?}
```

Nota: si el `{id}` se omite, el backend tomará la identidad del usuario autenticado a partir del token.

Ejemplo completo (operación de administrador):

```
admin/users/123/activities/replacements
```

Ejemplo equivalente para el propio usuario (sin `id`):

```
/users/activities/replacements
```

### 2.2 Dominios propuestos

| Dominio      | Ruta raíz   | Sub-recursos habituales                                              |
| ------------ | ----------- | -------------------------------------------------------------------- |
| **Users**    | `/users`    | `profile`, `activities` (`summary`, `events`, `history`), `settings` |
| **Products** | `/products` | `details`, `images`, `prices`                                        |
| **Orders**   | `/orders`   | `items`, `payments`                                                  |

---

## 3. Endpoints exclusivos para administradores

Si la operación **solo** la puede ejecutar un administrador, expón un endpoint segregado. Dos opciones válidas:

### 3.1 Prefijo `/admin` (recomendado)

```
/admin/users/{id}/reset-password
/admin/orders/{id}/refund
/admin/products/{id}/toggle-visibility
```

Ventajas:

- Middleware único para verificar el rol `admin`.
- Métricas y _rate-limits_ diferenciados.
- Documentación agrupada bajo la sección **Admin**.

---

## 4. Ejemplos de uso

### 4.1 Operaciones de usuario estándar

| Acción                                   | Verbo & Ruta                                                 |
| ---------------------------------------- | ------------------------------------------------------------ |
| Resumen de actividades (hoy)             | `GET /users/activities/summary/today`                        |
| Resumen de actividades (día específico)  | `GET /users/activities/summary/2023-09-03`                   |
| Eventos de actividades (rango de fechas) | `GET /users/activities/events?from=2023-09-01&to=2023-09-30` |
| Enviar replacements                      | `PUT /users/activities/replacements`                         |

### 4.2 Operaciones del administrador sobre otro usuario

| Acción                                                 | Verbo & Ruta                                                           |
| ------------------------------------------------------ | ---------------------------------------------------------------------- |
| Resumen de actividades (hoy) de un usuario             | `GET /admin/users/123/activities/summary/today`                        |
| Resumen de actividades (día específico) de un usuario  | `GET /admin/users/123/activities/summary/2023-09-03`                   |
| Eventos de actividades (rango de fechas) de un usuario | `GET /admin/users/123/activities/events?from=2023-09-01&to=2023-09-30` |
| Modificar replacements de un usuario                   | `PUT /admin/users/123/activities/replacements`                         |
| Histórico de actividades de un usuario                 | `GET /admin/users/123/activities/history`                              |

### 4.3 Flujo de catálogo

| Acción                      | Verbo & Ruta                |
| --------------------------- | --------------------------- |
| Lista de productos          | `GET /products`             |
| Detalle de producto         | `GET /products/456`         |
| Actualizar producto (admin) | `PATCH /admin/products/456` |

---

## 5. Beneficios para la capa de caché

1. **Invalidación genérica**: basta con limpiar el “tronco” común.
   - Ej.: `invalidate('/users/123/activities')` vacía listas y detalles.
2. **Menos reglas ad-hoc** en `EXTRA_INVALIDATIONS` del _frontend_.
3. **Documentación clara** → OpenAPI agrupa todo bajo los mismos tags.
