# ============================================================
# Script para Restaurar Remotes Antiguos (Inmunolabs)
# ============================================================
# Este script solo restaura los remotes originales para
# seguir trabajando en los repos antiguos.
# ============================================================

param(
    [Parameter(Mandatory=$false)]
    [switch]$DryRun = $false
)

$baseDir = $PSScriptRoot

# Datos de los repositorios (solo remotes antiguos)
$repositories = @(
    @{ LocalPath = "apis\addresses-api"; OldRemote = "https://github.com/Inmunolabs/multinature-addresses-api.git" },
    @{ LocalPath = "apis\bookings-api"; OldRemote = "https://github.com/Inmunolabs/multinature-bookings-api.git" },
    @{ LocalPath = "apis\cart-api"; OldRemote = "https://github.com/Inmunolabs/multinature-cart-api.git" },
    @{ LocalPath = "apis\commissions-api"; OldRemote = "https://github.com/Inmunolabs/multinature-commissions-api.git" },
    @{ LocalPath = "apis\constants-api"; OldRemote = "https://github.com/Inmunolabs/multinature-constants-api.git" },
    @{ LocalPath = "apis\diets-api"; OldRemote = "https://github.com/Inmunolabs/multinature-diets-api.git" },
    @{ LocalPath = "apis\forms-api"; OldRemote = "https://github.com/Inmunolabs/multinature-forms-api.git" },
    @{ LocalPath = "apis\monthly-purchases-api"; OldRemote = "https://github.com/Inmunolabs/multinature-monthly-purchases-api.git" },
    @{ LocalPath = "apis\multinature-diet-agent-api"; OldRemote = "https://github.com/Inmunolabs/multinature-diet-agent-api.git" },
    @{ LocalPath = "apis\multinature-routine-agent-api"; OldRemote = "https://github.com/Inmunolabs/multinature-routine-agent-api.git" },
    @{ LocalPath = "apis\notifications-api"; OldRemote = "https://github.com/Inmunolabs/multinature-notifications-api.git" },
    @{ LocalPath = "apis\openpay-api"; OldRemote = "https://github.com/Inmunolabs/openpay-api.git" },
    @{ LocalPath = "apis\orders-api"; OldRemote = "https://github.com/Inmunolabs/multinature-orders-api.git" },
    @{ LocalPath = "apis\payment-methods-api"; OldRemote = "https://github.com/Inmunolabs/multinature-payment-methods-api.git" },
    @{ LocalPath = "apis\products-api"; OldRemote = "https://github.com/Inmunolabs/multinature-products-api.git" },
    @{ LocalPath = "apis\public-resources-api"; OldRemote = "https://github.com/Inmunolabs/multinature-public-resources-api.git" },
    @{ LocalPath = "apis\routines-api"; OldRemote = "https://github.com/Inmunolabs/multinature-routines-api.git" },
    @{ LocalPath = "apis\user-files-api"; OldRemote = "https://github.com/Inmunolabs/multinature-user-files-api.git" },
    @{ LocalPath = "apis\users-api"; OldRemote = "https://github.com/Inmunolabs/multinature-users-api.git" },
    @{ LocalPath = "layers\multi-commons-layer"; OldRemote = "https://github.com/Inmunolabs/multinature-commons-layer.git" },
    @{ LocalPath = "layers\multi-emails-layer"; OldRemote = "https://github.com/Inmunolabs/multinature-emails-layer.git" },
    @{ LocalPath = "layers\multi-mysql-layer"; OldRemote = "https://github.com/Inmunolabs/multinature-mysql-layer.git" },
    @{ LocalPath = "apis-collection"; OldRemote = "https://github.com/Inmunolabs/multinature-api-collection.git" }
)

Write-Host ""
Write-Host "============================================================" -ForegroundColor Magenta
Write-Host "  RESTAURAR REMOTES ANTIGUOS (Inmunolabs)" -ForegroundColor Magenta
Write-Host "============================================================" -ForegroundColor Magenta
Write-Host ""

if ($DryRun) {
    Write-Host "[WARN] MODO DRY RUN - No se ejecutaran cambios reales" -ForegroundColor Yellow
    Write-Host ""
}

$successCount = 0
$errorCount = 0

foreach ($repo in $repositories) {
    $fullPath = Join-Path $baseDir $repo.LocalPath
    $repoName = Split-Path $repo.LocalPath -Leaf
    
    Write-Host "Procesando: $repoName ... " -NoNewline
    
    if (-not (Test-Path $fullPath)) {
        Write-Host "NO ENCONTRADO" -ForegroundColor Yellow
        continue
    }
    
    Push-Location $fullPath
    
    try {
        if ($DryRun) {
            Write-Host "[DRY RUN] -> $($repo.OldRemote)" -ForegroundColor Yellow
        } else {
            git remote set-url origin $repo.OldRemote 2>$null
            Write-Host "OK" -ForegroundColor Green
        }
        $successCount++
    } catch {
        Write-Host "ERROR" -ForegroundColor Red
        $errorCount++
    } finally {
        Pop-Location
    }
}

Write-Host ""
Write-Host "-----------------------------------------------------------" -ForegroundColor DarkGray
Write-Host "Repositorios restaurados: $successCount" -ForegroundColor Green
if ($errorCount -gt 0) { Write-Host "Con errores: $errorCount" -ForegroundColor Red }
Write-Host ""

if (-not $DryRun) {
    Write-Host "[OK] Todos los remotes ahora apuntan a Inmunolabs" -ForegroundColor Green
    Write-Host ""
    Write-Host "Cuando estes listo para migrar a inmunosalud, ejecuta:" -ForegroundColor Cyan
    Write-Host "  .\migrate-to-org.ps1" -ForegroundColor Yellow
}
Write-Host ""
