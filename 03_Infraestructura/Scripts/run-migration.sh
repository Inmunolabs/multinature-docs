#!/bin/bash

# ============================================================================
# Script Maestro de Migración de Documentación
# ============================================================================
#
# Ejecuta todos los pasos de la migración en orden.
#
# Uso:
#   bash scripts/migration/run-migration.sh [--confirm]
#
# Opciones:
#   --confirm   Ejecutar migración real (sin esto, es dry-run)
#
# ============================================================================

set -e  # Salir si hay errores

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Configuración
CONFIRM=false
SKIP_BACKUP=false

# Parsear argumentos
for arg in "$@"; do
  case $arg in
    --confirm)
      CONFIRM=true
      ;;
    --skip-backup)
      SKIP_BACKUP=true
      ;;
  esac
done

# ============================================================================
# FUNCIONES
# ============================================================================

log_header() {
  echo ""
  echo -e "${CYAN}╔════════════════════════════════════════════════════════════════════╗${NC}"
  echo -e "${CYAN}║${NC}  $1"
  echo -e "${CYAN}╚════════════════════════════════════════════════════════════════════╝${NC}"
  echo ""
}

log_step() {
  echo -e "${BLUE}▶ $1${NC}"
}

log_success() {
  echo -e "${GREEN}✓ $1${NC}"
}

log_warning() {
  echo -e "${YELLOW}⚠ $1${NC}"
}

log_error() {
  echo -e "${RED}✗ $1${NC}"
}

ask_confirmation() {
  local question="$1"
  read -p "$(echo -e ${YELLOW}${question}${NC} (y/n): )" -n 1 -r
  echo
  [[ $REPLY =~ ^[Yy]$ ]]
}

# ============================================================================
# VALIDACIONES PREVIAS
# ============================================================================

log_header "VALIDACIONES PREVIAS"

# Verificar que existe Node.js
if ! command -v node &> /dev/null; then
  log_error "Node.js no está instalado"
  exit 1
fi
log_success "Node.js detectado: $(node --version)"

# Verificar que existe el directorio docs/
if [ ! -d "docs/" ]; then
  log_error "Directorio docs/ no encontrado"
  exit 1
fi
log_success "Directorio docs/ encontrado"

# Verificar que existe migrations-map.json
if [ ! -f "docs/migrations-map.json" ]; then
  log_error "Archivo docs/migrations-map.json no encontrado"
  log_warning "Crea el archivo según docs/migrations-map.example.json"
  exit 1
fi
log_success "Archivo migrations-map.json encontrado"

# Verificar dependencias npm
if ! npm list glob &> /dev/null; then
  log_warning "Módulo 'glob' no instalado"
  log_step "Instalando dependencias..."
  npm install glob
  log_success "Dependencias instaladas"
fi

# ============================================================================
# MODO DRY-RUN O CONFIRMACIÓN
# ============================================================================

if [ "$CONFIRM" = false ]; then
  log_header "MODO DRY-RUN"
  log_warning "Se ejecutará en modo simulación"
  log_warning "Para ejecutar de verdad: bash scripts/migration/run-migration.sh --confirm"
  echo ""
else
  log_header "MODO CONFIRMACIÓN"
  log_error "⚠️  SE MODIFICARÁN ARCHIVOS REALMENTE"
  echo ""
  
  if ! ask_confirmation "¿Continuar con la migración REAL?"; then
    log_warning "Migración cancelada por el usuario"
    exit 0
  fi
fi

# ============================================================================
# FASE 1: DRY-RUN DE MIGRACIÓN
# ============================================================================

log_header "FASE 1: REVISIÓN DEL PLAN DE MIGRACIÓN"

log_step "Ejecutando migrate-docs-structure.js en modo dry-run..."
node scripts/migration/migrate-docs-structure.js --dry-run

if [ $? -ne 0 ]; then
  log_error "Dry-run falló. Revisa el plan de migración."
  exit 1
fi

log_success "Dry-run completado"

# Preguntar si continuar
if [ "$CONFIRM" = true ]; then
  echo ""
  if ! ask_confirmation "¿Continuar con la migración?"; then
    log_warning "Migración cancelada"
    exit 0
  fi
fi

# ============================================================================
# FASE 2: MIGRACIÓN REAL (si --confirm)
# ============================================================================

if [ "$CONFIRM" = true ]; then
  log_header "FASE 2: MIGRACIÓN DE ARCHIVOS"
  
  log_step "Ejecutando migración real..."
  
  if [ "$SKIP_BACKUP" = true ]; then
    node scripts/migration/migrate-docs-structure.js --confirm --skip-backup
  else
    node scripts/migration/migrate-docs-structure.js --confirm
  fi
  
  if [ $? -ne 0 ]; then
    log_error "Migración falló. Revisa logs/"
    echo ""
    log_warning "Puedes hacer rollback con:"
    echo "  bash logs/rollback-*.sh"
    exit 1
  fi
  
  log_success "Migración de archivos completada"
else
  log_header "FASE 2: MIGRACIÓN (SALTADA - DRY-RUN)"
  log_warning "Ejecuta con --confirm para migrar archivos"
fi

# ============================================================================
# FASE 3: GENERACIÓN DE ÍNDICES
# ============================================================================

log_header "FASE 3: GENERACIÓN DE ÍNDICES"

log_step "Ejecutando generate-indexes.js..."

if [ "$CONFIRM" = true ]; then
  node scripts/migration/generate-indexes.js
else
  node scripts/migration/generate-indexes.js --dry-run
fi

if [ $? -ne 0 ]; then
  log_error "Generación de índices falló"
  exit 1
fi

log_success "Índices generados"

# ============================================================================
# FASE 4: VALIDACIÓN DE ENLACES
# ============================================================================

log_header "FASE 4: VALIDACIÓN DE ENLACES"

# Primero validar solo público
log_step "Validando enlaces en documentación pública..."
node scripts/migration/validate-docs-links.js --public-only

if [ $? -ne 0 ]; then
  log_warning "Se encontraron enlaces rotos en documentación pública"
  log_warning "Revisa logs/broken-links-*.json para detalles"
else
  log_success "Todos los enlaces públicos están válidos"
fi

echo ""

# Luego validar todo
log_step "Validando todos los enlaces (incluye privado)..."
node scripts/migration/validate-docs-links.js --fix

VALIDATION_RESULT=$?

if [ $VALIDATION_RESULT -ne 0 ]; then
  log_warning "Se encontraron enlaces rotos"
  log_warning "Revisa logs/broken-links-*.json"
  
  if [ "$CONFIRM" = true ]; then
    echo ""
    log_warning "Necesitas corregir los enlaces rotos antes de continuar"
    echo ""
    echo "Pasos sugeridos:"
    echo "  1. Revisar logs/broken-links-*.json"
    echo "  2. Corregir enlaces manualmente"
    echo "  3. Re-ejecutar: node scripts/migration/validate-docs-links.js"
  fi
else
  log_success "Todos los enlaces están válidos ✓"
fi

# ============================================================================
# RESUMEN FINAL
# ============================================================================

log_header "RESUMEN DE MIGRACIÓN"

if [ "$CONFIRM" = true ]; then
  echo -e "${GREEN}✓ Archivos migrados${NC}"
  echo -e "${GREEN}✓ Índices generados${NC}"
  
  if [ $VALIDATION_RESULT -eq 0 ]; then
    echo -e "${GREEN}✓ Enlaces validados (0 rotos)${NC}"
  else
    echo -e "${YELLOW}⚠ Enlaces con errores (ver logs/)${NC}"
  fi
  
  echo ""
  echo "Logs disponibles en:"
  echo "  - logs/migration-*.log"
  echo "  - logs/rollback-*.sh (script de rollback)"
  if [ $VALIDATION_RESULT -ne 0 ]; then
    echo "  - logs/broken-links-*.json"
  fi
  
  echo ""
  log_success "Migración completada"
  
  if [ $VALIDATION_RESULT -eq 0 ]; then
    echo ""
    echo "Próximos pasos:"
    echo "  1. Revisar cambios: git status"
    echo "  2. Probar navegación manual"
    echo "  3. Commit: git add docs/ && git commit -m 'docs: restructure v2'"
    echo "  4. Push: git push origin docs/restructure-v2"
  else
    echo ""
    echo "Próximos pasos:"
    echo "  1. Corregir enlaces rotos (ver logs/broken-links-*.json)"
    echo "  2. Re-validar: node scripts/migration/validate-docs-links.js"
    echo "  3. Continuar con git commit cuando todo esté OK"
  fi
else
  log_warning "DRY-RUN completado - No se aplicaron cambios"
  echo ""
  echo "Para ejecutar de verdad:"
  echo "  bash scripts/migration/run-migration.sh --confirm"
fi

echo ""

# Código de salida
if [ "$CONFIRM" = true ] && [ $VALIDATION_RESULT -ne 0 ]; then
  exit 1
else
  exit 0
fi

