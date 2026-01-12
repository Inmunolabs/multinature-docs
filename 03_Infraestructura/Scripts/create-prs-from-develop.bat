@echo off
setlocal enabledelayedexpansion

REM ============================================================================
REM Script: create-prs-from-develop.bat
REM Description: Creates Pull Requests from develop to master/main for all Git repositories
REM Usage: create-prs-from-develop.bat [--dry-run] [--title=TITLE] [--body=BODY] [--help]
REM Examples:
REM   create-prs-from-develop.bat
REM   create-prs-from-develop.bat --dry-run
REM   create-prs-from-develop.bat --title="Release v1.0.0"
REM ============================================================================

REM Default Configuration
set "DRY_RUN=false"
set "PR_TITLE="
set "PR_BODY="
set "SOURCE_BRANCH=develop"
set "TARGET_BRANCHES=master main"

REM Parse command line arguments
:parse_args
if "%~1"=="" goto end_parse_args
if /i "%~1"=="--help" goto show_help
if /i "%~1"=="-h" goto show_help
if /i "%~1"=="--dry-run" (
    set "DRY_RUN=true"
    shift
    goto parse_args
)
REM Parse --title=value format
echo %~1 | findstr /i "^--title=" >nul
if not errorlevel 1 (
    set "ARG=%~1"
    set "PR_TITLE=!ARG:~8!"
    shift
    goto parse_args
)
REM Parse --body=value format
echo %~1 | findstr /i "^--body=" >nul
if not errorlevel 1 (
    set "ARG=%~1"
    set "PR_BODY=!ARG:~7!"
    shift
    goto parse_args
)
REM Unknown argument
echo [WARNING] Unknown argument: %~1
shift
goto parse_args

:end_parse_args

REM Get script directory - handle both relative and absolute paths
set "SCRIPT_PATH=%~f0"
for %%F in ("%SCRIPT_PATH%") do set "SCRIPT_DIR=%%~dpF"

REM Alternative: if above doesn't work, try to find docs directory
if not exist "%SCRIPT_DIR%create-prs-from-develop.ps1" (
    REM Try to find docs\03_Infraestructura\Scripts from current directory
    if exist "docs\03_Infraestructura\Scripts\create-prs-from-develop.ps1" (
        set "SCRIPT_DIR=%CD%\docs\03_Infraestructura\Scripts\"
    ) else if exist "..\docs\03_Infraestructura\Scripts\create-prs-from-develop.ps1" (
        set "SCRIPT_DIR=%CD%\..\docs\03_Infraestructura\Scripts\"
    ) else if exist "..\..\docs\03_Infraestructura\Scripts\create-prs-from-develop.ps1" (
        set "SCRIPT_DIR=%CD%\..\..\docs\03_Infraestructura\Scripts\"
    )
)

REM Check if PowerShell is available
powershell -Command "exit 0" >nul 2>&1
if errorlevel 1 (
    echo [ERROR] PowerShell is not available. This script requires PowerShell.
    exit /b 1
)

REM Build PowerShell command with conditional parameters
set "PS_FILE=%SCRIPT_DIR%create-prs-from-develop.ps1"

REM Verify PowerShell script exists
if not exist "%PS_FILE%" (
    echo [ERROR] PowerShell script not found: %PS_FILE%
    echo Script directory: %SCRIPT_DIR%
    echo Current directory: %CD%
    exit /b 1
)

REM Build arguments string (use quotes for TargetBranches to handle spaces)
set "PS_ARGS=-SourceBranch:%SOURCE_BRANCH% -TargetBranches:'%TARGET_BRANCHES%'"

REM Add DryRun switch if enabled
if /i "%DRY_RUN%"=="true" (
    set "PS_ARGS=!PS_ARGS! -DryRun"
)

REM Add Title parameter if provided
if not "!PR_TITLE!"=="" (
    set "PS_ARGS=!PS_ARGS! -Title:!PR_TITLE!"
)

REM Add Body parameter if provided
if not "!PR_BODY!"=="" (
    set "PS_ARGS=!PS_ARGS! -Body:!PR_BODY!"
)

REM Execute PowerShell script with environment variable
REM Change to root directory in PowerShell and execute script
if defined GITHUB_TOKEN (
    powershell -ExecutionPolicy Bypass -Command "cd '%ROOT_DIR%'; $env:GITHUB_TOKEN='%GITHUB_TOKEN%'; & '%PS_FILE%' %PS_ARGS%"
) else (
    echo [WARNING] GITHUB_TOKEN not set in batch file, checking PowerShell environment...
    powershell -ExecutionPolicy Bypass -Command "cd '%ROOT_DIR%'; & '%PS_FILE%' %PS_ARGS%"
)

exit /b %ERRORLEVEL%

REM ============================================================================
REM HELP SECTION
REM ============================================================================
:show_help
echo.
echo ============================================================================
echo                    CREATE PULL REQUESTS FROM DEVELOP
echo ============================================================================
echo.
echo USAGE:
echo   create-prs-from-develop.bat [OPTIONS]
echo.
echo OPTIONS:
echo   --dry-run                    Show what would be done without creating PRs
echo.
echo   --title=TITLE                Custom title for the PRs
echo                                (default: "Merge develop into {target-branch}")
echo.
echo   --body=BODY                  Custom body/description for the PRs
echo                                (default: "Automated PR from develop branch")
echo.
echo   --help, -h                   Show this help message
echo.
echo EXAMPLES:
echo   create-prs-from-develop.bat
echo     Creates PRs from develop to master/main for all repositories
echo.
echo   create-prs-from-develop.bat --dry-run
echo     Shows what would be done without actually creating PRs
echo.
echo   create-prs-from-develop.bat --title="Release v1.0.0"
echo     Creates PRs with custom title
echo.
echo REQUIREMENTS:
echo   - GitHub Personal Access Token (GITHUB_TOKEN environment variable)
echo   - PowerShell 5.1 or later
echo   - Git repositories configured with GitHub remotes
echo.
echo NOTE:
echo   The script will attempt to create PRs from 'develop' to 'master' or 'main'
echo   (whichever exists) for each repository in apis/, layers/, api-collection, and docs/
echo.
echo ============================================================================
exit /b 0

