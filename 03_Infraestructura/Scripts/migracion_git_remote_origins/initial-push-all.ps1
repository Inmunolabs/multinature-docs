# ============================================================
# Script para hacer Push Inicial de todas las APIs
# ============================================================
# Ejecutar DESPUES de haber ejecutado migrate-to-org.ps1
# Los repos deben existir en: https://github.com/inmunosalud/
# ============================================================

param(
    [Parameter(Mandatory=$false)]
    [string]$CommitMessage = "Initial commit - migration to organization",
    
    [Parameter(Mandatory=$false)]
    [string]$Branch = "main",
    
    [Parameter(Mandatory=$false)]
    [switch]$DryRun = $false
)

$baseDir = $PSScriptRoot

# Todos los repositorios (ruta local)
$repositories = @(
    # APIs
    "apis\addresses-api",
    "apis\bookings-api",
    "apis\cart-api",
    "apis\commissions-api",
    "apis\constants-api",
    "apis\diets-api",
    "apis\forms-api",
    "apis\monthly-purchases-api",
    "apis\multinature-diet-agent-api",
    "apis\multinature-routine-agent-api",
    "apis\notifications-api",
    "apis\openpay-api",
    "apis\orders-api",
    "apis\payment-methods-api",
    "apis\products-api",
    "apis\public-resources-api",
    "apis\routines-api",
    "apis\user-files-api",
    "apis\users-api",
    # Layers
    "layers\multi-commons-layer",
    "layers\multi-emails-layer",
    "layers\multi-mysql-layer",
    # Otros
    "apis-collection"
)

Write-Host ""
Write-Host "============================================================" -ForegroundColor Magenta
Write-Host "  PUSH INICIAL DE TODOS LOS REPOSITORIOS" -ForegroundColor Magenta
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
    $fullPath = Join-Path $baseDir $repo
    $repoName = Split-Path $repo -Leaf
    
    Write-Host ""
    Write-Host "-----------------------------------------------------------" -ForegroundColor DarkGray
    Write-Host "[INFO] Procesando: $repoName" -ForegroundColor Cyan
    
    if (-not (Test-Path $fullPath)) {
        Write-Host "[WARN] No encontrado: $fullPath" -ForegroundColor Yellow
        $skippedCount++
        continue
    }
    
    Push-Location $fullPath
    
    try {
        # Verificar si hay .git
        if (-not (Test-Path ".git")) {
            Write-Host "[WARN] Git no inicializado en $repoName" -ForegroundColor Yellow
            $skippedCount++
            Pop-Location
            continue
        }
        
        # Verificar remote
        $remote = git remote get-url origin 2>$null
        if (-not $remote) {
            Write-Host "[WARN] No hay remote configurado en $repoName" -ForegroundColor Yellow
            $skippedCount++
            Pop-Location
            continue
        }
        
        Write-Host "   Remote: $remote" -ForegroundColor DarkGray
        
        if ($DryRun) {
            Write-Host "   [DRY RUN] Ejecutaria:" -ForegroundColor Yellow
            Write-Host "     git add ." -ForegroundColor Yellow
            Write-Host "     git commit -m '$CommitMessage'" -ForegroundColor Yellow
            Write-Host "     git branch -M $Branch" -ForegroundColor Yellow
            Write-Host "     git push -u origin $Branch" -ForegroundColor Yellow
            $successCount++
        } else {
            # Agregar todos los archivos
            git add .
            
            # Verificar si hay cambios para commit
            $status = git status --porcelain
            if ($status) {
                git commit -m $CommitMessage
                Write-Host "[OK] Commit creado" -ForegroundColor Green
            } else {
                # Verificar si ya hay commits
                $hasCommits = git rev-parse HEAD 2>$null
                if (-not $hasCommits) {
                    Write-Host "[WARN] No hay archivos para commit" -ForegroundColor Yellow
                    $skippedCount++
                    Pop-Location
                    continue
                }
                Write-Host "[INFO] No hay cambios nuevos, usando commits existentes" -ForegroundColor Cyan
            }
            
            # Renombrar branch a main si es necesario
            $currentBranch = git branch --show-current
            if ($currentBranch -ne $Branch) {
                git branch -M $Branch
                Write-Host "[OK] Branch renombrado a $Branch" -ForegroundColor Green
            }
            
            # Push
            Write-Host "[INFO] Ejecutando push..." -ForegroundColor Cyan
            $pushResult = git push -u origin $Branch 2>&1
            
            if ($LASTEXITCODE -eq 0) {
                Write-Host "[OK] Push exitoso a $remote" -ForegroundColor Green
                $successCount++
            } else {
                Write-Host "[ERROR] Error en push: $pushResult" -ForegroundColor Red
                $errorCount++
            }
        }
        
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
Write-Host "  RESUMEN" -ForegroundColor Magenta
Write-Host "============================================================" -ForegroundColor Magenta
Write-Host ""
Write-Host "Total repositorios: $($repositories.Count)" -ForegroundColor White
Write-Host "[OK] Exitosos: $successCount" -ForegroundColor Green
if ($errorCount -gt 0) { Write-Host "[ERROR] Con errores: $errorCount" -ForegroundColor Red }
if ($skippedCount -gt 0) { Write-Host "[WARN] Omitidos: $skippedCount" -ForegroundColor Yellow }
Write-Host ""

if ($DryRun) {
    Write-Host "[INFO] Para ejecutar realmente, quita el flag -DryRun" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "  .\initial-push-all.ps1" -ForegroundColor Yellow
    Write-Host ""
}
