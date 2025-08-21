# Reglas de Documentación - MultiNature Backend

**Versión:** 1.0  
**Actualizado:** 2025-08-21
**Estado:** ✅ Activo y vigente

---

## 📚 Archivos de Reglas

Este directorio contiene las reglas y memorias del proyecto para la documentación de endpoints:

- **`PROJECT-DOCS-RULES.md`** - Reglas completas y detalladas del proyecto
- **`PROJECT-CONFIG.json`** - Configuración técnica y constantes
- **`ENDPOINT-TEMPLATE.md`** - Plantilla base para todos los endpoints
- **`README-RULES.md`** - Este archivo de índice

---

## 🎯 Aplicación

**IMPORTANTE:** Estas reglas aplican **ÚNICAMENTE** a la documentación de endpoints de este proyecto MultiNature Backend. Priorizan las decisiones de este chat por encima de cualquier regla genérica.

---

## 🚀 Uso Rápido

### Para documentar un nuevo endpoint:

1. **Copiar** `ENDPOINT-TEMPLATE.md`
2. **Renombrar** siguiendo la nomenclatura del proyecto
3. **Seguir** la estructura de secciones obligatorias
4. **Consultar** `PROJECT-DOCS-RULES.md` para detalles
5. **Verificar** que cumple todos los criterios de aceptación

### Estructura obligatoria:

```markdown
# [MÉTODO] [RUTA]
## Descripción funcional
## Autorización
## Parámetros de ruta (si aplica)
## Query parameters (si aplica)
## Body del request (si aplica)
## Ejemplo de respuesta exitosa (200 OK)
## Códigos de estado y errores
## Notas útiles para el frontend
## Consideraciones técnicas (solo si amerita)
```

---

## 🔍 Criterios de Aceptación

Cada documentación debe cumplir:

- ✅ **Secciones completas:** Todas las obligatorias presentes
- ✅ **Ejemplos ejecutables:** JSON válido del proyecto
- ✅ **Campos documentados:** Tipo, formato, required/optional
- ✅ **Códigos de estado:** Todos los errores típicos incluidos
- ✅ **Paginado/filtros:** Si aplican, descritos completamente
- ✅ **Consideraciones técnicas:** Cuando el endpoint lo amerite
- ✅ **Notas frontend:** Específicas para el equipo mobile

---

## 🚫 Restricciones Clave

- **NO inventar** nombres, estructuras o comportamientos
- **NO inferir** - usar `TODO:` si falta información
- **NO cambiar** la estructura de secciones ya definida
- **NO omitir** campos o validaciones del código

---

## 📁 Organización

```
docs/2. BACKEND/2.1-endpoints/
├── PROJECT-DOCS-RULES.md      ← Reglas principales
├── PROJECT-CONFIG.json        ← Configuración técnica
├── ENDPOINT-TEMPLATE.md       ← Plantilla base
├── README-RULES.md            ← Este archivo
├── [api-name]/
│   ├── README.md              ← Índice de la API
│   ├── [endpoint].md          ← Documentación individual
│   └── ...
```

---

## 🔄 Proceso de Documentación

1. **Analizar código:** Rutas, validaciones, middlewares, servicios
2. **Consultar DTOs:** Archivos `*ToDTO.js` para respuestas
3. **Validar ejemplos:** Que coincidan con el servicio real
4. **Revisar errores:** Incluir todos los códigos relevantes
5. **Agregar consideraciones:** Técnicas cuando sea necesario
6. **Verificar:** Cumplir todos los criterios de aceptación

---

## 📞 Soporte

Si tienes dudas sobre estas reglas:

1. **Primero:** Consultar `PROJECT-DOCS-RULES.md`
2. **Segundo:** Revisar ejemplos en `bookings/` (carpeta de referencia)
3. **Tercero:** Usar `ENDPOINT-TEMPLATE.md` como base
4. **Último:** Contactar al equipo de documentación

---

## 📋 Checklist de Verificación

Antes de considerar una documentación como completa:

- [ ] Sigue la estructura de secciones obligatorias
- [ ] Incluye ejemplos JSON reales del proyecto
- [ ] Documenta todos los campos (tipo, formato, required/optional)
- [ ] Lista todos los códigos de estado relevantes
- [ ] Incluye notas útiles para el frontend
- [ ] Agrega consideraciones técnicas si amerita
- [ ] Cumple con la nomenclatura del proyecto
- [ ] No contiene información inventada o inferida

---

*Estas reglas son la fuente de verdad para la documentación de endpoints en este proyecto. Cualquier desviación debe ser justificada y documentada.*
