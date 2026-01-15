# ============================================================================
# Script: create-prs-from-develop.ps1
# Description: Creates Pull Requests from develop to master/main for all Git repositories
# Author: Automated script for Multinature backend
# ============================================================================

param(
    [switch]$DryRun = $false,
    [string]$SourceBranch = "develop",
    [string]$TargetBranches = "master main",
    [string]$Title = "",
    [string]$Body = ""
)

# Configuration
$ErrorActionPreference = "Continue"
$GITHUB_API_BASE = "https://api.github.com"

# Colors for output
function Write-ColorOutput {
    param(
        [string]$Message,
        [string]$Color = "White"
    )
    Write-Host $Message -ForegroundColor $Color
}

# Check for GitHub token
$GITHUB_TOKEN = $env:GITHUB_TOKEN
if (-not $GITHUB_TOKEN -or $GITHUB_TOKEN.Trim() -eq "") {
    Write-ColorOutput "[ERROR] GITHUB_TOKEN environment variable is not set." "Red"
    Write-ColorOutput "Please set it with:" "Yellow"
    Write-ColorOutput "  PowerShell: `$env:GITHUB_TOKEN='your_token_here'" "Yellow"
    Write-ColorOutput "  CMD: set GITHUB_TOKEN=your_token_here" "Yellow"
    Write-ColorOutput "" "White"
    Write-ColorOutput "The token must be a GitHub Personal Access Token (classic) with 'repo' scope." "Yellow"
    Write-ColorOutput "Create one at: https://github.com/settings/tokens" "Yellow"
    exit 1
}

# Validate token format (GitHub tokens start with ghp_ for classic tokens)
if ($GITHUB_TOKEN -notmatch '^ghp_[A-Za-z0-9]{36}$' -and $GITHUB_TOKEN -notmatch '^gho_' -and $GITHUB_TOKEN -notmatch '^ghu_' -and $GITHUB_TOKEN -notmatch '^ghs_' -and $GITHUB_TOKEN -notmatch '^ghr_') {
    Write-ColorOutput "[WARNING] Token format doesn't look like a valid GitHub token." "Yellow"
    Write-ColorOutput "GitHub tokens typically start with 'ghp_' for classic tokens." "Yellow"
}

# Parse target branches
$TargetBranchList = $TargetBranches -split '\s+'

# Statistics
$script:SuccessCount = 0
$script:FailCount = 0
$script:SkippedCount = 0
$script:FailedRepos = @()

# Function to extract owner/repo from git remote URL
function Get-GitHubRepoInfo {
    param([string]$RepoPath)
    
    try {
        Push-Location $RepoPath
        $remoteUrl = git remote get-url origin 2>$null
        Pop-Location
        
        if (-not $remoteUrl) {
            return $null
        }
        
        # Handle both SSH and HTTPS URLs
        # SSH: git@github.com:owner/repo.git
        # HTTPS: https://github.com/owner/repo.git
        if ($remoteUrl -match 'github\.com[:/]([^/]+)/([^/]+?)(?:\.git)?$') {
            return @{
                Owner = $matches[1]
                Repo = $matches[2]
            }
        }
        
        return $null
    }
    catch {
        Pop-Location
        return $null
    }
}

# Function to check if branch exists
function Test-BranchExists {
    param(
        [string]$RepoPath,
        [string]$BranchName
    )
    
    try {
        Push-Location $RepoPath
        $result = git rev-parse --verify "origin/$BranchName" 2>$null
        Pop-Location
        return ($LASTEXITCODE -eq 0)
    }
    catch {
        Pop-Location
        return $false
    }
}

# Function to get default branch (master or main)
function Get-DefaultBranch {
    param([string]$RepoPath)
    
    foreach ($branch in $TargetBranchList) {
        if (Test-BranchExists -RepoPath $RepoPath -BranchName $branch) {
            return $branch
        }
    }
    return $null
}

# Function to check if PR already exists
function Test-PRExists {
    param(
        [string]$Owner,
        [string]$Repo,
        [string]$SourceBranch,
        [string]$TargetBranch
    )
    
    $headers = @{
        "Authorization" = "token $GITHUB_TOKEN"
        "Accept" = "application/vnd.github.v3+json"
    }
    
    try {
        $url = "$GITHUB_API_BASE/repos/$Owner/$Repo/pulls?head=$Owner`:$SourceBranch&base=$TargetBranch&state=open"
        $response = Invoke-RestMethod -Uri $url -Headers $headers -Method Get -ErrorAction Stop
        
        # Handle both array and single object responses
        if ($response -is [System.Array]) {
            return ($response.Count -gt 0)
        }
        else {
            return ($null -ne $response)
        }
    }
    catch {
        return $false
    }
}

# Function to create PR
function New-GitHubPR {
    param(
        [string]$Owner,
        [string]$Repo,
        [string]$SourceBranch,
        [string]$TargetBranch,
        [string]$Title,
        [string]$Body
    )
    
    $headers = @{
        "Authorization" = "token $GITHUB_TOKEN"
        "Accept" = "application/vnd.github.v3+json"
    }
    
    $prData = @{
        title = $Title
        body = $Body
        head = $SourceBranch
        base = $TargetBranch
    } | ConvertTo-Json
    
    try {
        $url = "$GITHUB_API_BASE/repos/$Owner/$Repo/pulls"
        
        # Agregar pequeño delay para evitar rate limiting
        Start-Sleep -Milliseconds 500
        
        $response = Invoke-RestMethod -Uri $url -Headers $headers -Method Post -Body $prData -ErrorAction Stop
        
        return @{
            Success = $true
            PR = $response
            URL = $response.html_url
        }
    }
    catch {
        $errorMessage = $_.Exception.Message
        $statusCode = $null
        $errorDetails = @()
        
        if ($_.Exception.Response) {
            $statusCode = $_.Exception.Response.StatusCode.value__
            $reader = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())
            $responseBody = $reader.ReadToEnd()
            
            try {
                $errorJson = $responseBody | ConvertFrom-Json
                
                # Capturar mensaje principal
                if ($errorJson.message) {
                    $errorMessage = $errorJson.message
                }
                
                # Capturar errores adicionales si existen
                if ($errorJson.errors) {
                    foreach ($err in $errorJson.errors) {
                        if ($err.message) {
                            $errorDetails += $err.message
                        }
                        elseif ($err.code) {
                            $errorDetails += "$($err.code): $($err.field)"
                        }
                    }
                }
                
                # Capturar documentación URL si existe
                if ($errorJson.documentation_url) {
                    $errorDetails += "Docs: $($errorJson.documentation_url)"
                }
                
                # Manejo especial para rate limiting
                if ($statusCode -eq 403 -and $errorJson.message -match "rate limit") {
                    $errorMessage = "Rate limit excedido. Espera antes de intentar de nuevo."
                    if ($_.Exception.Response.Headers['X-RateLimit-Reset']) {
                        $resetTime = [DateTimeOffset]::FromUnixTimeSeconds([int]$_.Exception.Response.Headers['X-RateLimit-Reset']).LocalDateTime
                        $errorDetails += "El límite se restablecerá a las: $resetTime"
                    }
                }
            }
            catch {
                # Si no se puede parsear JSON, usar el body completo
                if ($responseBody) {
                    $errorMessage = "$errorMessage`nResponse: $responseBody"
                }
            }
            
            # Verificar rate limit headers incluso si no hay JSON
            if ($statusCode -eq 403 -and $_.Exception.Response.Headers['X-RateLimit-Remaining'] -eq '0') {
                $errorMessage = "Rate limit excedido"
                if ($_.Exception.Response.Headers['X-RateLimit-Reset']) {
                    $resetTime = [DateTimeOffset]::FromUnixTimeSeconds([int]$_.Exception.Response.Headers['X-RateLimit-Reset']).LocalDateTime
                    $errorDetails += "El límite se restablecerá a las: $resetTime"
                }
            }
        }
        
        # Construir mensaje de error completo
        $fullErrorMessage = $errorMessage
        if ($statusCode) {
            $fullErrorMessage = "[HTTP $statusCode] $errorMessage"
        }
        if ($errorDetails.Count -gt 0) {
            $fullErrorMessage += "`n" + ($errorDetails -join "`n")
        }
        
        return @{
            Success = $false
            Error = $fullErrorMessage
            StatusCode = $statusCode
        }
    }
}

# Function to process a repository
function Process-Repository {
    param(
        [string]$RepoPath,
        [string]$RepoName
    )
    
    Write-ColorOutput "`n----------------------------------------" "Cyan"
    Write-ColorOutput "$RepoName" "Cyan"
    Write-ColorOutput "----------------------------------------" "Cyan"
    
    # Check if it's a git repository
    if (-not (Test-Path (Join-Path $RepoPath ".git"))) {
        Write-ColorOutput "  Status: [SKIP] Not a git repository" "Yellow"
        $script:SkippedCount++
        return
    }
    
    # Get GitHub repo info
    $repoInfo = Get-GitHubRepoInfo -RepoPath $RepoPath
    if (-not $repoInfo) {
        Write-ColorOutput "  Status: [SKIP] Could not determine GitHub repository" "Yellow"
        $script:SkippedCount++
        return
    }
    
    Write-ColorOutput "  Repository: $($repoInfo.Owner)/$($repoInfo.Repo)" "Gray"
    
    # Check if source branch exists
    if (-not (Test-BranchExists -RepoPath $RepoPath -BranchName $SourceBranch)) {
        Write-ColorOutput "  Status: [SKIP] Source branch '$SourceBranch' does not exist" "Yellow"
        $script:SkippedCount++
        return
    }
    
    # Get target branch
    $targetBranch = Get-DefaultBranch -RepoPath $RepoPath
    if (-not $targetBranch) {
        Write-ColorOutput "  Status: [SKIP] No target branch (master/main) found" "Yellow"
        $script:SkippedCount++
        return
    }
    
    Write-ColorOutput "  Branches: $SourceBranch -> $targetBranch" "Gray"
    
    # Check if PR already exists
    if (Test-PRExists -Owner $repoInfo.Owner -Repo $repoInfo.Repo -SourceBranch $SourceBranch -TargetBranch $targetBranch) {
        Write-ColorOutput "  Status: [SKIP] PR already exists" "Yellow"
        $script:SkippedCount++
        return
    }
    
    # Generate PR title and body
    if ($Title) {
        $prTitle = $Title
    } else {
        $prTitle = "Merge $SourceBranch into $targetBranch"
    }
    
    if ($Body) {
        $prBody = $Body
    } else {
        $prBody = "Automated PR from $SourceBranch branch`n`nCreated by create-prs-from-develop script."
    }
    
    if ($DryRun) {
        Write-ColorOutput "  Status: [DRY-RUN] Would create PR:" "Yellow"
        Write-ColorOutput "    Title: $prTitle" "Gray"
        Write-ColorOutput "    Body: $prBody" "Gray"
        $script:SuccessCount++
        return
    }
    
    # Create PR
    Write-ColorOutput "  Action: Creating PR..." "Gray"
    $result = New-GitHubPR -Owner $repoInfo.Owner -Repo $repoInfo.Repo -SourceBranch $SourceBranch -TargetBranch $targetBranch -Title $prTitle -Body $prBody
    
    if ($result.Success) {
        Write-ColorOutput "  Status: [OK] PR created successfully" "Green"
        Write-ColorOutput "  URL: $($result.URL)" "Gray"
        $script:SuccessCount++
    }
    else {
        Write-ColorOutput "  Status: [ERROR] Failed to create PR" "Red"
        
        # Mostrar error de forma más detallada
        $errorMsg = $result.Error
        if ($result.StatusCode) {
            Write-ColorOutput "  HTTP Status: $($result.StatusCode)" "Red"
        }
        
        if ($errorMsg -and $errorMsg.Trim() -ne "") {
            # Dividir el mensaje en líneas para mejor legibilidad
            $errorLines = $errorMsg -split "`n"
            foreach ($line in $errorLines) {
                if ($line.Trim() -ne "") {
                    Write-ColorOutput "  Error: $line" "Red"
                }
            }
        }
        else {
            Write-ColorOutput "  Error: No se pudo obtener información del error" "Red"
        }
        
        $script:FailCount++
        $shortError = if ($errorMsg) { ($errorLines[0] -replace "`n", " ").Trim() } else { "Unknown error" }
        $script:FailedRepos += "$RepoName ($shortError)"
    }
}

# Main execution
# Ensure we're in the backend root directory
$currentDir = $PWD.Path
$backendRoot = $currentDir

# Try to find backend root by looking for apis or layers directory
$maxLevels = 5
$level = 0
while ($level -lt $maxLevels -and -not ((Test-Path (Join-Path $backendRoot "apis")) -or (Test-Path (Join-Path $backendRoot "layers")))) {
    $backendRoot = Split-Path $backendRoot -Parent
    $level++
    if (-not $backendRoot -or $backendRoot -eq (Split-Path $backendRoot -Parent)) {
        break
    }
}

# Change to backend root if found
if ((Test-Path (Join-Path $backendRoot "apis")) -or (Test-Path (Join-Path $backendRoot "layers"))) {
    Set-Location $backendRoot
}

Write-ColorOutput "`n============================================================================" "Cyan"
Write-ColorOutput "                    CREATE PULL REQUESTS FROM DEVELOP" "Cyan"
Write-ColorOutput "============================================================================" "Cyan"
Write-ColorOutput "Root Directory: $PWD" "Gray"
Write-ColorOutput "Source Branch: $SourceBranch" "Gray"
Write-ColorOutput "Target Branches: $TargetBranches" "Gray"
Write-ColorOutput "Dry Run: $DryRun" "Gray"
Write-ColorOutput "============================================================================" "Cyan"

# Process Layers
Write-ColorOutput "`n[1/4] PROCESSING LAYERS..." "Cyan"
Write-ColorOutput "---------------------------------------------------------------------------" "Cyan"
if (Test-Path "layers") {
    Get-ChildItem -Path "layers" -Directory | ForEach-Object {
        Process-Repository -RepoPath $_.FullName -RepoName $_.Name
    }
}
else {
    Write-ColorOutput "[WARNING] layers directory not found!" "Yellow"
}

# Process APIs
Write-ColorOutput "`n[2/4] PROCESSING APIs..." "Cyan"
Write-ColorOutput "---------------------------------------------------------------------------" "Cyan"
if (Test-Path "apis") {
    Get-ChildItem -Path "apis" -Directory | ForEach-Object {
        Process-Repository -RepoPath $_.FullName -RepoName $_.Name
    }
}
else {
    Write-ColorOutput "[WARNING] apis directory not found!" "Yellow"
}

# Process api-collection
Write-ColorOutput "`n[3/4] PROCESSING OTHER REPOSITORIES..." "Cyan"
Write-ColorOutput "---------------------------------------------------------------------------" "Cyan"
if (Test-Path "api-collection") {
    Process-Repository -RepoPath (Resolve-Path "api-collection") -RepoName "api-collection"
}
else {
    Write-ColorOutput "[WARNING] api-collection directory not found!" "Yellow"
}

# Process docs
Write-ColorOutput "`n[4/4] PROCESSING DOCS..." "Cyan"
Write-ColorOutput "---------------------------------------------------------------------------" "Cyan"
if (Test-Path "docs") {
    Process-Repository -RepoPath (Resolve-Path "docs") -RepoName "docs"
}
else {
    Write-ColorOutput "[WARNING] docs directory not found!" "Yellow"
}

# Summary
Write-ColorOutput "`n============================================================================" "Cyan"
Write-ColorOutput "                             SUMMARY" "Cyan"
Write-ColorOutput "============================================================================" "Cyan"
Write-ColorOutput "Successful: $script:SuccessCount" "Green"
Write-ColorOutput "Failed: $script:FailCount" $(if ($script:FailCount -gt 0) { "Red" } else { "Gray" })
Write-ColorOutput "Skipped: $script:SkippedCount" "Yellow"
Write-ColorOutput "============================================================================" "Cyan"

if ($script:FailCount -gt 0) {
    Write-ColorOutput "`n[!] Failed repositories:" "Red"
    foreach ($failed in $script:FailedRepos) {
        Write-ColorOutput "  - $failed" "Red"
    }
    exit 1
}

if ($script:SuccessCount -eq 0 -and $script:SkippedCount -gt 0) {
    Write-ColorOutput "`n[INFO] No PRs were created. All repositories were skipped." "Yellow"
    Write-ColorOutput "Possible reasons:" "Yellow"
    Write-ColorOutput "  - PRs already exist" "Gray"
    Write-ColorOutput "  - Source or target branches don't exist" "Gray"
    Write-ColorOutput "  - Repository is not a GitHub repository" "Gray"
}

exit 0

