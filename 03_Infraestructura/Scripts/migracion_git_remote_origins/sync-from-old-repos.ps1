# ============================================================
# Script para Sincronizar desde Repos Originales (Inmunolabs)
# ============================================================
# Este script:
# 1. Restaura el remote original (Inmunolabs)
# 2. Hace fetch y pull de develop
# 3. Vuelve a configurar el remote a inmunosalud
# ============================================================

param(
    [Parameter(Mandatory=$false)]
    [switch]$DryRun = $false
)

$baseDir = $PSScriptRoot

# Datos de los repositorios extraídos del migration-results.json
$repositories = @(
    @{ LocalPath = "apis\addresses-api"; OldRemote = "https://github.com/Inmunolabs/multinature-addresses-api.git"; NewRemote = "https://github.com/inmunosalud/multinature-addresses-api.git" },
    @{ LocalPath = "apis\bookings-api"; OldRemote = "https://github.com/Inmunolabs/multinature-bookings-api.git"; NewRemote = "https://github.com/inmunosalud/multinature-bookings-api.git" },
    @{ LocalPath = "apis\cart-api"; OldRemote = "https://github.com/Inmunolabs/multinature-cart-api.git"; NewRemote = "https://github.com/inmunosalud/multinature-cart-api.git" },
    @{ LocalPath = "apis\commissions-api"; OldRemote = "https://github.com/Inmunolabs/multinature-commissions-api.git"; NewRemote = "https://github.com/inmunosalud/multinature-commissions-api.git" },
    @{ LocalPath = "apis\constants-api"; OldRemote = "https://github.com/Inmunolabs/multinature-constants-api.git"; NewRemote = "https://github.com/inmunosalud/multinature-constants-api.git" },
    @{ LocalPath = "apis\diets-api"; OldRemote = "https://github.com/Inmunolabs/multinature-diets-api.git"; NewRemote = "https://github.com/inmunosalud/multinature-diets-api.git" },
    @{ LocalPath = "apis\forms-api"; OldRemote = "https://github.com/Inmunolabs/multinature-forms-api.git"; NewRemote = "https://github.com/inmunosalud/multinature-forms-api.git" },
    @{ LocalPath = "apis\monthly-purchases-api"; OldRemote = "https://github.com/Inmunolabs/multinature-monthly-purchases-api.git"; NewRemote = "https://github.com/inmunosalud/multinature-monthly-purchases-api.git" },
    @{ LocalPath = "apis\multinature-diet-agent-api"; OldRemote = "https://github.com/Inmunolabs/multinature-diet-agent-api.git"; NewRemote = "https://github.com/inmunosalud/multinature-diet-agent-api.git" },
    @{ LocalPath = "apis\multinature-routine-agent-api"; OldRemote = "https://github.com/Inmunolabs/multinature-routine-agent-api.git"; NewRemote = "https://github.com/inmunosalud/multinature-routine-agent-api.git" },
    @{ LocalPath = "apis\notifications-api"; OldRemote = "https://github.com/Inmunolabs/multinature-notifications-api.git"; NewRemote = "https://github.com/inmunosalud/multinature-notifications-api.git" },
    @{ LocalPath = "apis\openpay-api"; OldRemote = "https://github.com/Inmunolabs/openpay-api.git"; NewRemote = "https://github.com/inmunosalud/multinature-openpay-api.git" },
    @{ LocalPath = "apis\orders-api"; OldRemote = "https://github.com/Inmunolabs/multinature-orders-api.git"; NewRemote = "https://github.com/inmunosalud/multinature-orders-api.git" },
    @{ LocalPath = "apis\payment-methods-api"; OldRemote = "https://github.com/Inmunolabs/multinature-payment-methods-api.git"; NewRemote = "https://github.com/inmunosalud/multinature-payment-methods-api.git" },
    @{ LocalPath = "apis\products-api"; OldRemote = "https://github.com/Inmunolabs/multinature-products-api.git"; NewRemote = "https://github.com/inmunosalud/multinature-products-api.git" },
    @{ LocalPath = "apis\public-resources-api"; OldRemote = "https://github.com/Inmunolabs/multinature-public-resources-api.git"; NewRemote = "https://github.com/inmunosalud/multinature-public-resources-api.git" },
    @{ LocalPath = "apis\routines-api"; OldRemote = "https://github.com/Inmunolabs/multinature-routines-api.git"; NewRemote = "https://github.com/inmunosalud/multinature-routines-api.git" },
    @{ LocalPath = "apis\user-files-api"; OldRemote = "https://github.com/Inmunolabs/multinature-user-files-api.git"; NewRemote = "https://github.com/inmunosalud/multinature-user-files-api.git" },
    @{ LocalPath = "apis\users-api"; OldRemote = "https://github.com/Inmunolabs/multinature-users-api.git"; NewRemote = "https://github.com/inmunosalud/multinature-users-api.git" },
    @{ LocalPath = "layers\multi-commons-layer"; OldRemote = "https://github.com/Inmunolabs/multinature-commons-layer.git"; NewRemote = "https://github.com/inmunosalud/multinature-commons-layer.git" },
    @{ LocalPath = "layers\multi-emails-layer"; OldRemote = "https://github.com/Inmunolabs/multinature-emails-layer.git"; NewRemote = "https://github.com/inmunosalud/multinature-emails-layer.git" },
    @{ LocalPath = "layers\multi-mysql-layer"; OldRemote = "https://github.com/Inmunolabs/multinature-mysql-layer.git"; NewRemote = "https://github.com/inmunosalud/multinature-mysql-layer.git" },
    @{ LocalPath = "apis-collection"; OldRemote = "https://github.com/Inmunolabs/multinature-api-collection.git"; NewRemote = "https://github.com/inmunosalud/multinature-apis-collection.git" }
)

Write-Host ""
Write-Host "============================================================" -ForegroundColor Magenta
Write-Host "  SINCRONIZACION DESDE REPOS ORIGINALES (Inmunolabs)" -ForegroundColor Magenta
Write-Host "============================================================" -ForegroundColor Magenta
Write-Host ""

if ($DryRun) {
    Write-Host "[WARN] MODO DRY RUN - No se ejecutaran cambios reales" -ForegroundColor Yellow
    Write-Host ""
}

$successCount = 0
$errorCount = 0
$skippedCount = 0

foreach ($repo in $repositories) {
    $fullPath = Join-Path $baseDir $repo.LocalPath
    $repoName = Split-Path $repo.LocalPath -Leaf
    
    Write-Host ""
    Write-Host "-----------------------------------------------------------" -ForegroundColor DarkGray
    Write-Host "[INFO] Procesando: $repoName" -ForegroundColor Cyan
    Write-Host "   Ruta: $fullPath" -ForegroundColor DarkGray
    
    if (-not (Test-Path $fullPath)) {
        Write-Host "[WARN] Directorio no encontrado" -ForegroundColor Yellow
        $skippedCount++
        continue
    }
    
    Push-Location $fullPath
    
    try {
        # Verificar si hay cambios sin commit
        $status = git status --porcelain
        if ($status) {
            $fileCount = ($status | Measure-Object).Count
            Write-Host "[WARN] Hay $fileCount archivo(s) sin commit - guardando con stash" -ForegroundColor Yellow
            if (-not $DryRun) {
                git stash push -m "Auto-stash before sync"
            }
        }
        
        # Paso 1: Restaurar remote original
        Write-Host "[INFO] Paso 1: Restaurando remote original (Inmunolabs)..." -ForegroundColor Cyan
        if ($DryRun) {
            Write-Host "   [DRY RUN] git remote set-url origin $($repo.OldRemote)" -ForegroundColor Yellow
        } else {
            git remote set-url origin $repo.OldRemote
            Write-Host "[OK] Remote restaurado: $($repo.OldRemote)" -ForegroundColor Green
        }
        
        # Paso 2: Fetch de todos los branches
        Write-Host "[INFO] Paso 2: Haciendo fetch..." -ForegroundColor Cyan
        if ($DryRun) {
            Write-Host "   [DRY RUN] git fetch origin" -ForegroundColor Yellow
        } else {
            git fetch origin 2>&1 | Out-Null
            Write-Host "[OK] Fetch completado" -ForegroundColor Green
        }
        
        # Paso 3: Checkout a develop
        Write-Host "[INFO] Paso 3: Cambiando a branch develop..." -ForegroundColor Cyan
        if ($DryRun) {
            Write-Host "   [DRY RUN] git checkout develop" -ForegroundColor Yellow
        } else {
            $checkoutResult = git checkout develop 2>&1
            if ($LASTEXITCODE -ne 0) {
                # Intentar crear develop desde origin/develop
                Write-Host "[INFO] Creando branch develop desde origin/develop..." -ForegroundColor Cyan
                git checkout -b develop origin/develop 2>&1 | Out-Null
            }
            $currentBranch = git branch --show-current
            Write-Host "[OK] Branch actual: $currentBranch" -ForegroundColor Green
        }
        
        # Paso 4: Pull de develop
        Write-Host "[INFO] Paso 4: Haciendo pull de develop..." -ForegroundColor Cyan
        if ($DryRun) {
            Write-Host "   [DRY RUN] git pull origin develop" -ForegroundColor Yellow
        } else {
            $pullResult = git pull origin develop 2>&1
            if ($LASTEXITCODE -eq 0) {
                Write-Host "[OK] Pull completado" -ForegroundColor Green
            } else {
                Write-Host "[WARN] Pull con advertencias: $pullResult" -ForegroundColor Yellow
            }
        }
        
        # Paso 5: Restaurar remote nuevo (inmunosalud)
        Write-Host "[INFO] Paso 5: Configurando remote nuevo (inmunosalud)..." -ForegroundColor Cyan
        if ($DryRun) {
            Write-Host "   [DRY RUN] git remote set-url origin $($repo.NewRemote)" -ForegroundColor Yellow
        } else {
            git remote set-url origin $repo.NewRemote
            Write-Host "[OK] Remote configurado: $($repo.NewRemote)" -ForegroundColor Green
        }
        
        # Restaurar stash si se guardó
        if ($status -and -not $DryRun) {
            Write-Host "[INFO] Restaurando cambios del stash..." -ForegroundColor Cyan
            git stash pop 2>&1 | Out-Null
        }
        
        Write-Host "[OK] $repoName sincronizado correctamente" -ForegroundColor Green
        $successCount++
        
    } catch {
        Write-Host "[ERROR] Error procesando $repoName : $_" -ForegroundColor Red
        $errorCount++
    } finally {
        Pop-Location
    }
}

Write-Host ""
Write-Host ""
Write-Host "============================================================" -ForegroundColor Magenta
Write-Host "  RESUMEN DE SINCRONIZACION" -ForegroundColor Magenta
Write-Host "============================================================" -ForegroundColor Magenta
Write-Host ""
Write-Host "Total repositorios: $($repositories.Count)" -ForegroundColor White
Write-Host "[OK] Exitosos: $successCount" -ForegroundColor Green
if ($errorCount -gt 0) { Write-Host "[ERROR] Con errores: $errorCount" -ForegroundColor Red }
if ($skippedCount -gt 0) { Write-Host "[WARN] Omitidos: $skippedCount" -ForegroundColor Yellow }
Write-Host ""

if ($DryRun) {
    Write-Host "[INFO] Para ejecutar realmente, quita el flag -DryRun:" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "  .\sync-from-old-repos.ps1" -ForegroundColor Yellow
    Write-Host ""
}

Write-Host "[INFO] Despues de sincronizar, ejecuta:" -ForegroundColor Cyan
Write-Host ""
Write-Host "  .\initial-push-all.ps1" -ForegroundColor Yellow
Write-Host ""
Write-Host "para subir todo a los nuevos repos de inmunosalud" -ForegroundColor Cyan
Write-Host ""
