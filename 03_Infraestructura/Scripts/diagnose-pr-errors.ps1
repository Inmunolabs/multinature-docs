# Script para diagnosticar errores al crear PRs
# Uso: .\diagnose-pr-errors.ps1

param(
    [string]$Owner = "Inmunolabs",
    [string]$Repo = "",
    [string]$SourceBranch = "develop",
    [string]$TargetBranch = "master"
)

$GITHUB_TOKEN = $env:GITHUB_TOKEN
if (-not $GITHUB_TOKEN -or $GITHUB_TOKEN.Trim() -eq "") {
    Write-Host "[ERROR] GITHUB_TOKEN no está configurado." -ForegroundColor Red
    Write-Host "Configúralo con: `$env:GITHUB_TOKEN='tu_token'" -ForegroundColor Yellow
    exit 1
}

$GITHUB_API_BASE = "https://api.github.com"

$headers = @{
    "Authorization" = "token $GITHUB_TOKEN"
    "Accept" = "application/vnd.github.v3+json"
    "User-Agent" = "PowerShell-Diagnostic-Script"
}

Write-Host "`n============================================================================" -ForegroundColor Cyan
Write-Host "                    DIAGNÓSTICO DE ERRORES DE PR" -ForegroundColor Cyan
Write-Host "============================================================================" -ForegroundColor Cyan

# Verificar autenticación
Write-Host "`n[1] Verificando autenticación..." -ForegroundColor Yellow
try {
    $userResponse = Invoke-RestMethod -Uri "$GITHUB_API_BASE/user" -Headers $headers -Method Get -ErrorAction Stop
    Write-Host "  [OK] Autenticado como: $($userResponse.login)" -ForegroundColor Green
    
    # Verificar permisos del token
    Write-Host "`n[2] Verificando permisos del token..." -ForegroundColor Yellow
    try {
        $reposResponse = Invoke-RestMethod -Uri "$GITHUB_API_BASE/user/repos?per_page=1" -Headers $headers -Method Get -ErrorAction Stop
        Write-Host "  [OK] El token tiene acceso a repositorios" -ForegroundColor Green
    }
    catch {
        Write-Host "  [ERROR] El token NO tiene acceso a repositorios" -ForegroundColor Red
        Write-Host "  Asegúrate de que el token tenga el scope 'repo'" -ForegroundColor Yellow
    }
}
catch {
    Write-Host "  [ERROR] Fallo en la autenticación" -ForegroundColor Red
    Write-Host "  $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}

# Si se especificó un repositorio, diagnosticarlo
if ($Repo) {
    Write-Host "`n[3] Diagnosticando repositorio: $Owner/$Repo" -ForegroundColor Yellow
    Write-Host "  Branches: $SourceBranch -> $TargetBranch" -ForegroundColor Gray
    
    # Verificar acceso al repositorio
    Write-Host "`n  [3.1] Verificando acceso al repositorio..." -ForegroundColor Cyan
    try {
        $repoResponse = Invoke-RestMethod -Uri "$GITHUB_API_BASE/repos/$Owner/$Repo" -Headers $headers -Method Get -ErrorAction Stop
        Write-Host "    [OK] Acceso al repositorio confirmado" -ForegroundColor Green
        Write-Host "    Nombre: $($repoResponse.full_name)" -ForegroundColor Gray
        Write-Host "    Privado: $($repoResponse.private)" -ForegroundColor Gray
        Write-Host "    Default branch: $($repoResponse.default_branch)" -ForegroundColor Gray
    }
    catch {
        $statusCode = $_.Exception.Response.StatusCode.value__
        $reader = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())
        $responseBody = $reader.ReadToEnd()
        
        Write-Host "    [ERROR] No se puede acceder al repositorio" -ForegroundColor Red
        Write-Host "    HTTP Status: $statusCode" -ForegroundColor Red
        
        try {
            $errorJson = $responseBody | ConvertFrom-Json
            Write-Host "    Mensaje: $($errorJson.message)" -ForegroundColor Red
            
            if ($statusCode -eq 404) {
                Write-Host "    Posibles causas:" -ForegroundColor Yellow
                Write-Host "      - El repositorio no existe" -ForegroundColor Gray
                Write-Host "      - No tienes acceso al repositorio" -ForegroundColor Gray
                Write-Host "      - El token no tiene permisos suficientes" -ForegroundColor Gray
            }
            elseif ($statusCode -eq 403) {
                Write-Host "    Posibles causas:" -ForegroundColor Yellow
                Write-Host "      - El token no tiene el scope 'repo'" -ForegroundColor Gray
                Write-Host "      - El repositorio requiere permisos especiales" -ForegroundColor Gray
            }
        }
        catch { }
        exit 1
    }
    
    # Verificar si las ramas existen
    Write-Host "`n  [3.2] Verificando ramas..." -ForegroundColor Cyan
    
    # Verificar rama source
    try {
        $sourceBranchResponse = Invoke-RestMethod -Uri "$GITHUB_API_BASE/repos/$Owner/$Repo/branches/$SourceBranch" -Headers $headers -Method Get -ErrorAction Stop
        Write-Host "    [OK] Rama '$SourceBranch' existe" -ForegroundColor Green
    }
    catch {
        Write-Host "    [ERROR] Rama '$SourceBranch' no existe o no es accesible" -ForegroundColor Red
    }
    
    # Verificar rama target
    try {
        $targetBranchResponse = Invoke-RestMethod -Uri "$GITHUB_API_BASE/repos/$Owner/$Repo/branches/$TargetBranch" -Headers $headers -Method Get -ErrorAction Stop
        Write-Host "    [OK] Rama '$TargetBranch' existe" -ForegroundColor Green
    }
    catch {
        Write-Host "    [ERROR] Rama '$TargetBranch' no existe o no es accesible" -ForegroundColor Red
    }
    
    # Verificar si ya existe un PR
    Write-Host "`n  [3.3] Verificando PRs existentes..." -ForegroundColor Cyan
    try {
        $prsUrl = "$GITHUB_API_BASE/repos/$Owner/$Repo/pulls?head=$Owner`:$SourceBranch&base=$TargetBranch&state=open"
        $prsResponse = Invoke-RestMethod -Uri $prsUrl -Headers $headers -Method Get -ErrorAction Stop
        
        if ($prsResponse.Count -gt 0) {
            Write-Host "    [INFO] Ya existe un PR abierto:" -ForegroundColor Yellow
            foreach ($pr in $prsResponse) {
                Write-Host "      - #$($pr.number): $($pr.title) ($($pr.html_url))" -ForegroundColor Gray
            }
        }
        else {
            Write-Host "    [OK] No hay PRs abiertos entre estas ramas" -ForegroundColor Green
        }
    }
    catch {
        Write-Host "    [ERROR] No se pudo verificar PRs existentes" -ForegroundColor Red
        Write-Host "    $($_.Exception.Message)" -ForegroundColor Red
    }
    
    # Intentar crear un PR de prueba (dry-run)
    Write-Host "`n  [3.4] Intentando crear PR (simulación)..." -ForegroundColor Cyan
    $prData = @{
        title = "Test PR - Diagnostic Script"
        body = "Este es un PR de prueba generado por el script de diagnóstico"
        head = $SourceBranch
        base = $TargetBranch
    } | ConvertTo-Json
    
    try {
        $createUrl = "$GITHUB_API_BASE/repos/$Owner/$Repo/pulls"
        $createResponse = Invoke-RestMethod -Uri $createUrl -Headers $headers -Method Post -Body $prData -ErrorAction Stop
        Write-Host "    [OK] PR creado exitosamente!" -ForegroundColor Green
        Write-Host "    URL: $($createResponse.html_url)" -ForegroundColor Gray
        
        # Cerrar el PR de prueba
        Write-Host "`n    Cerrando PR de prueba..." -ForegroundColor Yellow
        $closeUrl = "$GITHUB_API_BASE/repos/$Owner/$Repo/pulls/$($createResponse.number)"
        $closeData = @{ state = "closed" } | ConvertTo-Json
        Invoke-RestMethod -Uri $closeUrl -Headers $headers -Method Patch -Body $closeData -ErrorAction Stop | Out-Null
        Write-Host "    [OK] PR de prueba cerrado" -ForegroundColor Green
    }
    catch {
        $statusCode = $_.Exception.Response.StatusCode.value__
        $reader = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())
        $responseBody = $reader.ReadToEnd()
        
        Write-Host "    [ERROR] Fallo al crear PR" -ForegroundColor Red
        Write-Host "    HTTP Status: $statusCode" -ForegroundColor Red
        
        try {
            $errorJson = $responseBody | ConvertFrom-Json
            Write-Host "    Mensaje: $($errorJson.message)" -ForegroundColor Red
            
            if ($errorJson.errors) {
                Write-Host "    Errores adicionales:" -ForegroundColor Red
                foreach ($err in $errorJson.errors) {
                    if ($err.message) {
                        Write-Host "      - $($err.message)" -ForegroundColor Red
                    }
                    if ($err.code) {
                        Write-Host "      - Código: $($err.code), Campo: $($err.field)" -ForegroundColor Red
                    }
                }
            }
            
            # Sugerencias basadas en el código de estado
            if ($statusCode -eq 401) {
                Write-Host "`n    Sugerencia: El token es inválido o ha expirado" -ForegroundColor Yellow
            }
            elseif ($statusCode -eq 403) {
                Write-Host "`n    Sugerencia: El token no tiene permisos suficientes" -ForegroundColor Yellow
                Write-Host "      - Verifica que el token tenga el scope 'repo'" -ForegroundColor Gray
                Write-Host "      - Verifica que tengas acceso de escritura al repositorio" -ForegroundColor Gray
            }
            elseif ($statusCode -eq 422) {
                Write-Host "`n    Sugerencia: Error de validación" -ForegroundColor Yellow
                Write-Host "      - Verifica que las ramas existan" -ForegroundColor Gray
                Write-Host "      - Verifica que no haya un PR duplicado" -ForegroundColor Gray
            }
        }
        catch {
            Write-Host "    Respuesta: $responseBody" -ForegroundColor Red
        }
    }
}
else {
    Write-Host "`n[INFO] Para diagnosticar un repositorio específico, usa:" -ForegroundColor Yellow
    Write-Host "  .\diagnose-pr-errors.ps1 -Owner Inmunolabs -Repo nombre-repo" -ForegroundColor Cyan
    Write-Host "`nEjemplo:" -ForegroundColor Yellow
    Write-Host "  .\diagnose-pr-errors.ps1 -Owner Inmunolabs -Repo multinature-addresses-api" -ForegroundColor Cyan
}

Write-Host "`n============================================================================" -ForegroundColor Cyan
