# Reglas y Memorias del Proyecto - Documentación de Endpoints

**Versión:** 1.0  
**Actualizado:** 2025-08-21
**Proyecto:** MultiNature Backend  
**Stack:** Node.js, Express, MySQL, AWS Lambda  

---

## 🎯 Scope y Aplicación

Estas reglas aplican **ÚNICAMENTE** a la documentación de endpoints de este proyecto. Priorizan las decisiones de este chat por encima de cualquier regla genérica. Si surge ambigüedad, consultar primero este archivo de contexto del proyecto.

---

## 📝 Formato y Estructura Markdown

### Secciones Obligatorias (en este orden):
1. **Título:** `# [MÉTODO] [RUTA]`
2. **Descripción funcional:** Explicación clara de qué hace el endpoint
3. **Autorización:** Requisitos de autenticación/autorización
4. **Parámetros de ruta:** Si aplica, con ejemplos
5. **Query parameters:** Si aplica, con ejemplos
6. **Body del request:** Si aplica, con estructura JSON y ejemplos
7. **Ejemplo de respuesta exitosa (200 OK):** JSON real del proyecto
8. **Códigos de estado y errores:** Tabla con errores comunes
9. **Notas útiles para el frontend:** Consideraciones específicas del endpoint
10. **Consideraciones técnicas:** Solo si el endpoint lo amerita (efectos secundarios, validaciones complejas, etc.)

---

## 🎨 Tono y Estilo

- **Profesional y conciso:** Sin redundancias ni explicaciones innecesarias
- **Español neutro:** Usar terminología técnica estándar
- **Ejemplos reales:** Basados en el código fuente del proyecto, no inventados
- **Comentarios inline:** En JSON cuando sea posible para claridad
- **Sin frases como:** "Aquí está tu respuesta", "Como puedes ver", etc.

---

## 🔧 Convenciones Técnicas

### Nombres de Endpoints:
- Usar la ruta exacta del código: `/bookings`, `/users/:id`, etc.
- Parámetros de ruta en formato `:paramName`
- Query params separados por `&`

### Estructura de Request/Response:
- **Body:** Incluir todos los campos con tipo, formato, required/optional
- **Response:** Usar DTOs reales del proyecto (`*ToDTO.js`)
- **Ejemplos:** JSON ejecutable y consistente con el stack

### Manejo de Errores:
- Códigos estándar: 400, 401, 403, 404, 428, 500
- Mensajes de error específicos del proyecto
- Causas comunes y soluciones

### Autenticación:
- Bearer token en headers
- Manejo de expiración y renovación
- Roles y permisos específicos

---

## 📊 Códigos de Estado HTTP

| Código | Significado | Uso en el Proyecto |
|--------|-------------|-------------------|
| 200 | OK | Respuesta exitosa |
| 201 | Created | Recurso creado exitosamente |
| 400 | Bad Request | Validación fallida, datos incorrectos |
| 401 | Unauthorized | Token faltante o inválido |
| 403 | Forbidden | Sin permisos para el recurso |
| 404 | Not Found | Recurso no encontrado |
| 428 | Precondition Required | Pago requerido antes de continuar |
| 500 | Internal Server Error | Error del servidor |

---

## 🔍 Paginado y Filtros

### Paginado:
- Parámetros: `page`, `limit`
- Respuesta incluir: `total`, `page`, `totalPages`, `data[]`
- Valores por defecto: `page=1`, `limit=10`

### Filtros:
- Query params para filtrar por campos específicos
- Rangos de fechas: formato `YYYY-MM-DD`
- Búsqueda por texto: parámetro `search`
- Ordenamiento: `sortBy`, `sortOrder` (ASC/DESC)

---

## ✅ Criterios de Aceptación

Cada documentación generada debe cumplir:

1. **Secciones completas:** Todas las secciones obligatorias presentes
2. **Ejemplos ejecutables:** JSON válido y consistente con el proyecto
3. **Campos documentados:** Tipo, formato, unidades, required/optional
4. **Códigos de estado:** Todos los errores típicos incluidos
5. **Paginado/filtros:** Si aplican, descritos con casos límite
6. **Consideraciones técnicas:** Cuando el endpoint lo amerite
7. **Notas frontend:** Específicas y útiles para el equipo mobile

---

## 🚫 Restricciones

- **NO inventar:** Nombres, estructuras o comportamientos no presentes en el código
- **NO inferir:** Usar `TODO:` si falta información clara
- **NO cambiar:** Estructura de secciones ya definida
- **NO omitir:** Campos o validaciones presentes en el código

---

## 📁 Organización de Archivos

### Estructura de carpetas:
```
docs/2. BACKEND/2.1-endpoints/
├── [api-name]/
│   ├── README.md (índice y consideraciones generales)
│   ├── [endpoint-name].md (documentación individual)
│   └── ...
```

### Nomenclatura:
- **README.md:** Por carpeta de API
- **Archivos de endpoint:** Nombre descriptivo sin prefijos innecesarios
- **Consistencia:** Seguir el patrón establecido en `bookings/`

---

## 🔄 Proceso de Documentación

1. **Análisis del código:** Revisar rutas, validaciones, middlewares, servicios
2. **Consulta de DTOs:** Usar archivos `*ToDTO.js` para estructura de respuesta
3. **Validación de ejemplos:** Asegurar que coincidan con el servicio real
4. **Revisión de errores:** Incluir todos los códigos de estado relevantes
5. **Consideraciones técnicas:** Agregar cuando sea necesario
6. **Verificación:** Cumplir todos los criterios de aceptación

---

## 📚 Referencias del Proyecto

- **Stack:** Node.js + Express + MySQL + AWS Lambda
- **Autenticación:** JWT Bearer tokens
- **Pagos:** OpenPay + MercadoPago
- **Almacenamiento:** S3 para archivos, presigned URLs
- **Notificaciones:** Email automático
- **Base de datos:** MySQL con queries personalizadas
- **Validaciones:** express-validator
- **DTOs:** Transformación de entidades a respuestas frontend

---

## 🎯 Prioridades de Documentación

1. **Endpoints críticos:** Autenticación, pagos, citas
2. **APIs principales:** Users, Bookings, Orders, Products
3. **Funcionalidades especiales:** Working hours, forms, routines
4. **APIs de soporte:** Constants, notifications, public resources

---

*Estas reglas son la fuente de verdad para la documentación de endpoints en este proyecto. Cualquier desviación debe ser justificada y documentada.*
