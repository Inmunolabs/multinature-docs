#!/bin/bash

# Wrapper POSIX para actualizar índices de README.md
# Ejecuta el script TypeScript principal

# Verificar si tsx está disponible
if command -v tsx >/dev/null 2>&1; then
    exec tsx "$(dirname "$0")/update-docs-index.ts" "$@"
elif command -v ts-node >/dev/null 2>&1; then
    exec ts-node "$(dirname "$0")/update-docs-index.ts" "$@"
elif command -v node >/dev/null 2>&1; then
    # Intentar ejecutar directamente si ya está compilado
    exec node "$(dirname "$0")/update-docs-index.ts" "$@"
else
    echo "Error: No se encontró tsx, ts-node o node instalado"
    echo "Instala uno de estos paquetes:"
    echo "  npm install -g tsx"
    echo "  npm install -g ts-node"
    echo "  npm install -g typescript"
    exit 1
fi
