# 🔧 Healthcheck Runner Script

Script para ejecutar automáticamente todas las peticiones HTTP a los endpoints healthcheck de la colección de Bruno.

---

## 📋 Descripción

Este script busca automáticamente todos los archivos `*Healthcheck.bru` en la colección de Bruno, parsea cada archivo para extraer el método HTTP y la URL, reemplaza las variables de entorno con valores reales, y ejecuta las peticiones HTTP a cada endpoint.

---

## 🚀 Uso

### Desde la carpeta `docs/03_Infraestructura/Scripts/`:

```bash
# Ejecutar healthchecks usando entorno local (por defecto)
node healthcheck-runner.js local

# Ejecutar healthchecks usando entorno dev
node healthcheck-runner.js dev

# Ejecutar healthchecks usando entorno prod
node healthcheck-runner.js prod
```

### Desde la raíz del proyecto `backend/`:

```bash
# Ejecutar desde cualquier ubicación
node docs/03_Infraestructura/Scripts/healthcheck-runner.js local
```

### Desde la carpeta `api-collection/`:

```bash
# También funciona desde api-collection
node ../docs/03_Infraestructura/Scripts/healthcheck-runner.js local
```

---

## ✨ Características

1. **Búsqueda automática**: Encuentra todos los archivos `*Healthcheck.bru` recursivamente en la colección
2. **Parsing inteligente**: Extrae método HTTP y URL de cada archivo `.bru`
3. **Variables de entorno**: Carga y reemplaza variables desde `environments/multi-{environment}.bru`
4. **Ejecución paralela**: Procesa múltiples endpoints de forma secuencial
5. **Salida con colores**: Resultados visuales con códigos de color:
   - ✓ **Verde**: Éxito (códigos de estado 2xx)
   - ⚠ **Amarillo**: Advertencia (respuestas válidas pero no 2xx)
   - ✗ **Rojo**: Error (errores de conexión/timeout)
6. **Resumen final**: Muestra conteo de éxitos, advertencias y errores

---

## 📊 Ejemplo de Salida

```
Loading environment: local
Loaded 25 environment variables

Found 16 healthcheck endpoints

================================================================================
→  addresses              http://localhost:3000 ... ✓ OK (200)
→  bookings              http://localhost:3000 ... ✓ OK (200)
→  cart                  http://localhost:3000 ... ✓ OK (200)
→  commissions           http://localhost:3000 ... ✓ OK (200)
→  constants             http://localhost:3000 ... ✓ OK (200)
→  diets                 http://localhost:3000 ... ✓ OK (200)
→  monthlyPurchases      http://localhost:3000 ... ✓ OK (200)
→  notifications         http://localhost:3000 ... ✓ OK (200)
→  orders                http://localhost:3000 ... ✓ OK (200)
→  paymentMethods        http://localhost:3000 ... ✓ OK (200)
→  products              http://localhost:3000 ... ✓ OK (200)
→  publicResources       http://localhost:3000 ... ✓ OK (200)
→  routines              http://localhost:3000 ... ✓ OK (200)
→  users                 http://localhost:3000 ... ✓ OK (200)
→  openpay-api           https://sandbox-api.openpay.mx ... ✓ OK (200)
→  recommendations       http://localhost:3000 ... ✗ ERROR: Request timeout

================================================================================

Summary:
  ✓ Success: 15
  ⚠ Warnings: 0
  ✗ Errors: 1
```

---

## 🔍 Cómo Funciona

### 1. Carga de Variables de Entorno

El script busca el archivo de entorno correspondiente en `api-collection/environments/multi-{environment}.bru` y parsea todas las variables definidas en la sección `vars {}`.

### 2. Búsqueda de Archivos Healthcheck

Recorre recursivamente la estructura de carpetas de `api-collection/` buscando archivos que coincidan con el patrón `*Healthcheck.bru`.

### 3. Parsing de Archivos .bru

Para cada archivo encontrado, extrae:
- **Método HTTP**: `get`, `post`, `put`, `delete`, `patch`
- **URL**: La URL completa, que puede contener variables como `{{cartHost}}`

### 4. Reemplazo de Variables

Sustituye todas las variables de entorno en la URL con sus valores reales. Por ejemplo:
- `{{cartHost}}` → `http://localhost:3000`
- `{{bookingsHost}}` → `https://eb84bye8h4.execute-api.us-east-1.amazonaws.com/`

### 5. Ejecución de Peticiones HTTP

Realiza peticiones HTTP usando los módulos nativos de Node.js (`http` y `https`), con un timeout de 5 segundos por defecto.

### 6. Reporte de Resultados

Muestra los resultados en tiempo real y genera un resumen final con estadísticas.

---

## ⚙️ Requisitos

- **Node.js**: Versión 14 o superior
- **Sin dependencias**: Utiliza únicamente módulos nativos de Node.js
- **Colección de Bruno**: Debe existir la carpeta `api-collection/` con archivos `.bru`

---

## 🎯 Casos de Uso

### Verificación Rápida de Salud de APIs

```bash
# Verificar que todos los servicios locales estén funcionando
node healthcheck-runner.js local
```

### Validación Pre-Deploy

```bash
# Verificar servicios en desarrollo antes de hacer deploy
node healthcheck-runner.js dev
```

### Monitoreo de Producción

```bash
# Verificar estado de servicios en producción
node healthcheck-runner.js prod
```

### Integración en CI/CD

Puedes agregar este script a tu pipeline de CI/CD:

```yaml
# .github/workflows/healthcheck.yml
name: Healthcheck

on: [push, pull_request]

jobs:
  healthcheck:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      
      - name: Run healthchecks
        run: node docs/03_Infraestructura/Scripts/healthcheck-runner.js dev
```

---

## 🐛 Troubleshooting

### Error: "Environment file not found"

**Causa**: El archivo de entorno especificado no existe.

**Solución**: Verifica que exista el archivo `api-collection/environments/multi-{environment}.bru` para el entorno que estás usando.

### Error: "No healthcheck files found"

**Causa**: No se encontraron archivos que coincidan con el patrón `*Healthcheck.bru`.

**Solución**: Verifica que la ruta de `api-collection/` sea correcta y que existan archivos healthcheck en la colección.

### Error: "Missing variables in URL"

**Causa**: La URL contiene variables que no están definidas en el archivo de entorno.

**Solución**: Agrega las variables faltantes al archivo `environments/multi-{environment}.bru`.

### Error: "Request timeout"

**Causa**: El endpoint no respondió dentro del tiempo límite (5 segundos por defecto).

**Solución**: 
- Verifica que el servicio esté ejecutándose
- Verifica la conectividad de red
- Considera aumentar el timeout si es necesario

---

## 📚 Archivos Relacionados

- [README de Scripts](./README.md)
- [Scripts de Validación y Mantenimiento](./validation-tools.md)
- [Colección de Bruno](../../../api-collection/README.md)

---

## 💡 Tips

1. **Ejecuta el script regularmente** para detectar problemas de conectividad temprano
2. **Usa diferentes entornos** para validar configuraciones antes de deployar
3. **Integra en CI/CD** para validación automática en cada push
4. **Revisa el resumen final** para identificar servicios problemáticos rápidamente

---

**Creado**: 2025-01-21  
**Autor**: AI Agent (Cursor/Composer)  
**Mantenedor**: Miguel Valdés

