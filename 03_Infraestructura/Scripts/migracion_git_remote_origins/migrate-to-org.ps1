# ============================================================
# Script de Migración de APIs a Organización de GitHub
# ============================================================
# Este script configura todos los repositorios Git de las APIs
# para apuntar a la cuenta organizacional de inmunosalud.
# ============================================================

param(
    [Parameter(Mandatory=$false)]
    [switch]$DryRun = $false,
    
    [Parameter(Mandatory=$false)]
    [switch]$Push = $false
)

# Configuración fija
$OrganizationName = "inmunosalud"

# Colores para output
function Write-ColorOutput($ForegroundColor) {
    $fc = $host.UI.RawUI.ForegroundColor
    $host.UI.RawUI.ForegroundColor = $ForegroundColor
    if ($args) {
        Write-Output $args
    }
    $host.UI.RawUI.ForegroundColor = $fc
}

function Write-Success($message) {
    Write-Host "[OK] $message" -ForegroundColor Green
}

function Write-Info($message) {
    Write-Host "[INFO] $message" -ForegroundColor Cyan
}

function Write-Warning($message) {
    Write-Host "[WARN] $message" -ForegroundColor Yellow
}

function Write-Error($message) {
    Write-Host "[ERROR] $message" -ForegroundColor Red
}

# Funcion para convertir nombre local a nombre de repo en GitHub
function Get-GitHubRepoName {
    param([string]$localName)
    
    # Mapeo de nombres locales a nombres de GitHub
    # APIs: agregar prefijo "multinature-" si no lo tiene
    # Layers: cambiar "multi-" por "multinature-"
    
    switch -Regex ($localName) {
        # Layers: multi-xxx-layer -> multinature-xxx-layer
        "^multi-(.+)-layer$" {
            return "multinature-$($Matches[1])-layer"
        }
        # APIs que ya tienen multinature- (agentes)
        "^multinature-.+" {
            return $localName
        }
        # APIs collection
        "^apis-collection$" {
            return "multinature-apis-collection"
        }
        # Resto de APIs: xxx-api -> multinature-xxx-api
        default {
            return "multinature-$localName"
        }
    }
}

# Directorio base
$baseDir = $PSScriptRoot

# Lista de todas las APIs (nombre de carpeta local)
$apis = @(
    "addresses-api",
    "bookings-api",
    "cart-api",
    "commissions-api",
    "constants-api",
    "diets-api",
    "forms-api",
    "monthly-purchases-api",
    "multinature-diet-agent-api",
    "multinature-routine-agent-api",
    "notifications-api",
    "openpay-api",
    "orders-api",
    "payment-methods-api",
    "products-api",
    "public-resources-api",
    "routines-api",
    "user-files-api",
    "users-api"
)

# Layers (nombre de carpeta local)
$layers = @(
    "multi-commons-layer",
    "multi-emails-layer",
    "multi-mysql-layer"
)

# Otros repositorios
$others = @(
    "apis-collection"
)

Write-Host ""
Write-Host "============================================================" -ForegroundColor Magenta
Write-Host "  MIGRACION DE REPOSITORIOS A ORGANIZACION DE GITHUB" -ForegroundColor Magenta
Write-Host "============================================================" -ForegroundColor Magenta
Write-Host ""
Write-Info "Organizacion destino: $OrganizationName"
Write-Info "Modo DryRun: $DryRun"
Write-Info "Push automatico: $Push"
Write-Host ""

if ($DryRun) {
    Write-Warning "MODO DRY RUN - No se ejecutaran cambios reales"
    Write-Host ""
}

# Funcion para procesar un repositorio
function Process-Repository {
    param(
        [string]$repoPath,
        [string]$localName,
        [string]$orgName,
        [bool]$isDryRun,
        [bool]$shouldPush
    )
    
    $fullPath = Join-Path $baseDir $repoPath
    
    if (-not (Test-Path $fullPath)) {
        Write-Warning "Directorio no encontrado: $fullPath"
        return @{
            Name = $localName
            Status = "NOT_FOUND"
            Path = $fullPath
        }
    }
    
    # Obtener nombre del repo en GitHub
    $githubRepoName = Get-GitHubRepoName -localName $localName
    
    Write-Host ""
    Write-Host "-----------------------------------------------------------" -ForegroundColor DarkGray
    Write-Info "Procesando: $localName"
    Write-Host "   Carpeta local: $fullPath" -ForegroundColor DarkGray
    Write-Host "   Repo GitHub:   $githubRepoName" -ForegroundColor DarkGray
    
    $gitDir = Join-Path $fullPath ".git"
    $repoUrl = "https://github.com/$orgName/$githubRepoName.git"
    
    $result = @{
        LocalName = $localName
        GitHubName = $githubRepoName
        Path = $fullPath
        RepoUrl = $repoUrl
        Status = "PENDING"
        Actions = @()
    }
    
    Push-Location $fullPath
    
    try {
        # Verificar si ya existe .git
        if (Test-Path $gitDir) {
            Write-Info "Git ya inicializado"
            $result.Actions += "GIT_EXISTS"
            
            # Verificar remote actual
            $currentRemote = git remote get-url origin 2>$null
            if ($currentRemote) {
                Write-Host "   Remote actual: $currentRemote" -ForegroundColor DarkGray
                $result.OldRemote = $currentRemote
                
                if ($currentRemote -eq $repoUrl) {
                    Write-Success "Remote ya configurado correctamente"
                    $result.Status = "ALREADY_CONFIGURED"
                } else {
                    Write-Info "Actualizando remote origin..."
                    if (-not $isDryRun) {
                        git remote set-url origin $repoUrl
                        Write-Success "Remote actualizado a: $repoUrl"
                    } else {
                        Write-Host "   [DRY RUN] Ejecutaria: git remote set-url origin $repoUrl" -ForegroundColor Yellow
                    }
                    $result.Actions += "REMOTE_UPDATED"
                    $result.Status = "UPDATED"
                }
            } else {
                Write-Info "Agregando remote origin..."
                if (-not $isDryRun) {
                    git remote add origin $repoUrl
                    Write-Success "Remote agregado: $repoUrl"
                } else {
                    Write-Host "   [DRY RUN] Ejecutaria: git remote add origin $repoUrl" -ForegroundColor Yellow
                }
                $result.Actions += "REMOTE_ADDED"
                $result.Status = "CONFIGURED"
            }
        } else {
            Write-Info "Inicializando Git..."
            if (-not $isDryRun) {
                git init
                git remote add origin $repoUrl
                Write-Success "Git inicializado y remote configurado"
            } else {
                Write-Host "   [DRY RUN] Ejecutaria: git init" -ForegroundColor Yellow
                Write-Host "   [DRY RUN] Ejecutaria: git remote add origin $repoUrl" -ForegroundColor Yellow
            }
            $result.Actions += "GIT_INIT"
            $result.Actions += "REMOTE_ADDED"
            $result.Status = "INITIALIZED"
        }
        
        # Verificar si hay archivos para commit
        if (-not $isDryRun -and (Test-Path $gitDir)) {
            $status = git status --porcelain
            if ($status) {
                $fileCount = ($status | Measure-Object).Count
                Write-Info "Hay $fileCount archivo(s) sin commit"
                $result.UncommittedFiles = $fileCount
            }
            
            # Verificar branch actual
            $branch = git branch --show-current 2>$null
            if (-not $branch) {
                $branch = "main"
            }
            $result.Branch = $branch
        }
        
        # Push si se solicita
        if ($shouldPush -and -not $isDryRun) {
            Write-Info "Ejecutando push..."
            $branch = git branch --show-current 2>$null
            if (-not $branch) {
                $branch = "main"
            }
            
            # Verificar si hay commits
            $hasCommits = git rev-parse HEAD 2>$null
            if ($hasCommits) {
                git push -u origin $branch 2>&1
                if ($LASTEXITCODE -eq 0) {
                    Write-Success "Push completado exitosamente"
                    $result.Actions += "PUSHED"
                } else {
                    Write-Error "Error en push - verifica que el repo exista en GitHub"
                    $result.Actions += "PUSH_FAILED"
                }
            } else {
                Write-Warning "No hay commits para hacer push"
            }
        }
        
    } catch {
        Write-Error "Error procesando $localName : $_"
        $result.Status = "ERROR"
        $result.Error = $_.Exception.Message
    } finally {
        Pop-Location
    }
    
    return $result
}

# Procesar todas las APIs
Write-Host ""
Write-Host "============================================================" -ForegroundColor Cyan
Write-Host "  PROCESANDO APIs" -ForegroundColor Cyan
Write-Host "============================================================" -ForegroundColor Cyan

$apiResults = @()
foreach ($api in $apis) {
    $result = Process-Repository -repoPath "apis\$api" -localName $api -orgName $OrganizationName -isDryRun $DryRun -shouldPush $Push
    $apiResults += $result
}

# Procesar Layers
Write-Host ""
Write-Host "============================================================" -ForegroundColor Cyan
Write-Host "  PROCESANDO LAYERS" -ForegroundColor Cyan
Write-Host "============================================================" -ForegroundColor Cyan

$layerResults = @()
foreach ($layer in $layers) {
    $result = Process-Repository -repoPath "layers\$layer" -localName $layer -orgName $OrganizationName -isDryRun $DryRun -shouldPush $Push
    $layerResults += $result
}

# Procesar otros
Write-Host ""
Write-Host "============================================================" -ForegroundColor Cyan
Write-Host "  PROCESANDO OTROS REPOSITORIOS" -ForegroundColor Cyan
Write-Host "============================================================" -ForegroundColor Cyan

$otherResults = @()
foreach ($other in $others) {
    $result = Process-Repository -repoPath $other -localName $other -orgName $OrganizationName -isDryRun $DryRun -shouldPush $Push
    $otherResults += $result
}

# Resumen final
Write-Host ""
Write-Host ""
Write-Host "============================================================" -ForegroundColor Magenta
Write-Host "  RESUMEN DE MIGRACION" -ForegroundColor Magenta
Write-Host "============================================================" -ForegroundColor Magenta
Write-Host ""

$allResults = $apiResults + $layerResults + $otherResults

$configured = ($allResults | Where-Object { $_.Status -in @("CONFIGURED", "UPDATED", "INITIALIZED", "ALREADY_CONFIGURED") }).Count
$errors = ($allResults | Where-Object { $_.Status -eq "ERROR" }).Count
$notFound = ($allResults | Where-Object { $_.Status -eq "NOT_FOUND" }).Count

Write-Host "Total de repositorios procesados: $($allResults.Count)" -ForegroundColor White
Write-Success "Configurados correctamente: $configured"
if ($errors -gt 0) { Write-Error "Con errores: $errors" }
if ($notFound -gt 0) { Write-Warning "No encontrados: $notFound" }

Write-Host ""
Write-Host "-----------------------------------------------------------" -ForegroundColor DarkGray
Write-Host "DETALLE POR REPOSITORIO:" -ForegroundColor White
Write-Host ""

foreach ($result in $allResults) {
    $statusColor = switch ($result.Status) {
        "ALREADY_CONFIGURED" { "Green" }
        "CONFIGURED" { "Green" }
        "UPDATED" { "Cyan" }
        "INITIALIZED" { "Cyan" }
        "ERROR" { "Red" }
        "NOT_FOUND" { "Yellow" }
        default { "White" }
    }
    Write-Host "  $($result.LocalName) -> $($result.GitHubName): " -NoNewline
    Write-Host "$($result.Status)" -ForegroundColor $statusColor
    if ($result.RepoUrl) {
        Write-Host "    URL: $($result.RepoUrl)" -ForegroundColor DarkGray
    }
}

Write-Host ""
Write-Host "============================================================" -ForegroundColor Magenta

if ($DryRun) {
    Write-Host ""
    Write-Warning "Este fue un DRY RUN - ningun cambio fue aplicado"
    Write-Info "Para aplicar los cambios, ejecuta sin el flag -DryRun:"
    Write-Host ""
    Write-Host "  .\migrate-to-org.ps1" -ForegroundColor Yellow
    Write-Host ""
    Write-Info "Para tambien hacer push automatico:"
    Write-Host ""
    Write-Host "  .\migrate-to-org.ps1 -Push" -ForegroundColor Yellow
}

Write-Host ""

# Exportar resultados a JSON para referencia
$outputFile = Join-Path $baseDir "migration-results.json"
$exportData = @{
    Timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    Organization = $OrganizationName
    DryRun = $DryRun
    Results = $allResults
}

if (-not $DryRun) {
    $exportData | ConvertTo-Json -Depth 10 | Out-File $outputFile -Encoding UTF8
    Write-Info "Resultados exportados a: $outputFile"
}

Write-Host ""
