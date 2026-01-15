# Script para probar el token de GitHub
# Uso: .\test-github-token.ps1

$GITHUB_TOKEN = $env:GITHUB_TOKEN

if (-not $GITHUB_TOKEN -or $GITHUB_TOKEN.Trim() -eq "") {
    Write-Host "[ERROR] GITHUB_TOKEN no está configurado." -ForegroundColor Red
    Write-Host "Configúralo con: `$env:GITHUB_TOKEN='tu_token'" -ForegroundColor Yellow
    exit 1
}

Write-Host "Probando token de GitHub..." -ForegroundColor Cyan
Write-Host "Token (primeros 10 caracteres): $($GITHUB_TOKEN.Substring(0, [Math]::Min(10, $GITHUB_TOKEN.Length)))..." -ForegroundColor Gray

$headers = @{
    "Authorization" = "token $GITHUB_TOKEN"
    "Accept" = "application/vnd.github.v3+json"
    "User-Agent" = "PowerShell-Script"
}

try {
    # Probar autenticación con la API de GitHub
    $response = Invoke-RestMethod -Uri "https://api.github.com/user" -Headers $headers -Method Get -ErrorAction Stop
    
    Write-Host "[OK] Token válido!" -ForegroundColor Green
    Write-Host "Usuario autenticado: $($response.login)" -ForegroundColor Green
    Write-Host "Nombre: $($response.name)" -ForegroundColor Gray
    Write-Host "Email: $($response.email)" -ForegroundColor Gray
    
    # Verificar permisos del token
    Write-Host "`nVerificando permisos del token..." -ForegroundColor Cyan
    
    # Probar acceso a repositorios (necesario para crear PRs)
    try {
        $reposResponse = Invoke-RestMethod -Uri "https://api.github.com/user/repos?per_page=1" -Headers $headers -Method Get -ErrorAction Stop
        Write-Host "[OK] El token tiene acceso a repositorios" -ForegroundColor Green
    }
    catch {
        Write-Host "[ERROR] El token NO tiene acceso a repositorios" -ForegroundColor Red
        Write-Host "Asegúrate de que el token tenga el scope 'repo'" -ForegroundColor Yellow
    }
    
    Write-Host "`nEl token está listo para usar!" -ForegroundColor Green
}
catch {
    $errorMessage = $_.Exception.Message
    if ($_.Exception.Response) {
        $statusCode = $_.Exception.Response.StatusCode.value__
        $reader = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())
        $responseBody = $reader.ReadToEnd()
        
        Write-Host "[ERROR] Fallo en la autenticación" -ForegroundColor Red
        Write-Host "Código de estado: $statusCode" -ForegroundColor Red
        
        if ($statusCode -eq 401) {
            Write-Host "El token es inválido o ha expirado" -ForegroundColor Red
            Write-Host "Crea un nuevo token en: https://github.com/settings/tokens" -ForegroundColor Yellow
        }
        elseif ($statusCode -eq 403) {
            Write-Host "El token no tiene los permisos necesarios" -ForegroundColor Red
            Write-Host "Asegúrate de que el token tenga el scope 'repo'" -ForegroundColor Yellow
        }
        
        try {
            $errorJson = $responseBody | ConvertFrom-Json
            Write-Host "Mensaje: $($errorJson.message)" -ForegroundColor Red
        }
        catch { }
    }
    else {
        Write-Host "[ERROR] $errorMessage" -ForegroundColor Red
    }
    exit 1
}
