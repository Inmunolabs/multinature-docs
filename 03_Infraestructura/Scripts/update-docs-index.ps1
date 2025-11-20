# Wrapper PowerShell para actualizar índices de README.md
# Ejecuta el script TypeScript principal

param(
    [switch]$DryRun,
    [switch]$Verbose
)

$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$tsScript = Join-Path $scriptDir "update-docs-index.ts"

# Construir argumentos
$args = @()
if ($DryRun) { $args += "--dry-run" }
if ($Verbose) { $args += "--verbose" }

# Verificar si tsx está disponible
try {
    $tsxPath = Get-Command tsx -ErrorAction Stop
    Write-Host "Ejecutando con tsx..."
    & tsx $tsScript $args
    exit $LASTEXITCODE
} catch {
    # Intentar con ts-node
    try {
        $tsNodePath = Get-Command ts-node -ErrorAction Stop
        Write-Host "Ejecutando con ts-node..."
        & ts-node $tsScript $args
        exit $LASTEXITCODE
    } catch {
        # Intentar con node directamente
        try {
            $nodePath = Get-Command node -ErrorAction Stop
            Write-Host "Ejecutando con node..."
            & node $tsScript $args
            exit $LASTEXITCODE
        } catch {
            Write-Error "Error: No se encontró tsx, ts-node o node instalado"
            Write-Host "Instala uno de estos paquetes:"
            Write-Host "  npm install -g tsx"
            Write-Host "  npm install -g ts-node"
            Write-Host "  npm install -g typescript"
            exit 1
        }
    }
}
