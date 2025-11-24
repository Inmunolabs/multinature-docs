@echo off
setlocal enabledelayedexpansion

REM ============================================================================
REM Script: pull-git-repos.bat
REM Description: Updates all git repositories in the multinature backend workspace
REM Usage: pull-git-repos.bat [--branch=BRANCH] [--checkout] [--help]
REM Examples:
REM   pull-git-repos.bat
REM   pull-git-repos.bat --branch=main
REM   pull-git-repos.bat --checkout
REM   pull-git-repos.bat --branch=develop --checkout
REM ============================================================================

REM Default Configuration
set "DEFAULT_BRANCH=develop"
set "MASTER_BRANCH=master"
set "DO_CHECKOUT=false"

REM Parse command line arguments
:parse_args
if "%~1"=="" goto end_parse_args
if /i "%~1"=="--help" goto show_help
if /i "%~1"=="-h" goto show_help
if /i "%~1"=="--checkout" (
    set "DO_CHECKOUT=true"
    shift
    goto parse_args
)
if /i "%~1"=="-c" (
    set "DO_CHECKOUT=true"
    shift
    goto parse_args
)
REM Parse --branch=value format
echo %~1 | findstr /i "^--branch=" >nul
if not errorlevel 1 (
    set "ARG=%~1"
    set "DEFAULT_BRANCH=!ARG:~9!"
    shift
    goto parse_args
)
REM Parse -b value format
if /i "%~1"=="-b" (
    set "DEFAULT_BRANCH=%~2"
    shift
    shift
    goto parse_args
)
REM Unknown argument
echo [WARNING] Unknown argument: %~1
shift
goto parse_args

:end_parse_args

REM Counter for statistics
set /a SUCCESS_COUNT=0
set /a FAIL_COUNT=0
set "FAILED_REPOS="

REM Save current directory to return later
REM Script is in: docs/03_Infraestructura/Scripts/
REM Need to go to: backend/
set "SCRIPT_DIR=%~dp0"
set "ROOT_DIR=%SCRIPT_DIR%..\..\.."
cd /d "%ROOT_DIR%"

goto start_script

REM ============================================================================
REM HELP SECTION
REM ============================================================================
:show_help
echo.
echo ============================================================================
echo                    MULTINATURE GIT REPOSITORIES UPDATE
echo ============================================================================
echo.
echo USAGE:
echo   pull-git-repos.bat [OPTIONS]
echo.
echo OPTIONS:
echo   --branch=BRANCH, -b BRANCH    Specify the default branch to pull
echo                                 (default: develop)
echo.
echo   --checkout, -c                Enable automatic checkout to target branch
echo                                 before pulling (default: disabled)
echo.
echo   --help, -h                    Show this help message
echo.
echo EXAMPLES:
echo   pull-git-repos.bat
echo     Updates all repos using default branch (develop) without checkout
echo.
echo   pull-git-repos.bat --branch=main
echo     Updates all repos using 'main' branch without checkout
echo.
echo   pull-git-repos.bat --checkout
echo     Updates all repos with automatic checkout to develop branch
echo.
echo   pull-git-repos.bat --branch=feature/new-feature --checkout
echo     Updates all repos switching to 'feature/new-feature' branch first
echo.
echo   pull-git-repos.bat -b main -c
echo     Same as above using short options
echo.
echo NOTES:
echo   - Repositories with uncommitted changes will be skipped
echo   - api-collection and docs always use 'master' branch
echo   - The script must be run from the backend directory
echo.
echo ============================================================================
exit /b 0

:start_script

echo.
echo ============================================================================
echo                    MULTINATURE GIT REPOSITORIES UPDATE
echo ============================================================================
echo Root Directory: %CD%
echo Default Branch: %DEFAULT_BRANCH%
echo Checkout before pull: %DO_CHECKOUT%
echo ============================================================================
echo.

REM ============================================================================
REM UPDATE LAYERS
REM ============================================================================
echo.
echo [1/3] UPDATING LAYERS...
echo ----------------------------------------------------------------------------
if exist "layers" (
    for /D %%F in ("layers\*") do (
        call :UpdateRepo "%%F" "%DEFAULT_BRANCH%"
    )
) else (
    echo [WARNING] layers directory not found!
    echo.
)

REM ============================================================================
REM UPDATE APIs
REM ============================================================================
echo.
echo [2/3] UPDATING APIs...
echo ----------------------------------------------------------------------------
if exist "apis" (
    for /D %%F in ("apis\*") do (
        call :UpdateRepo "%%F" "%DEFAULT_BRANCH%"
    )
) else (
    echo [WARNING] apis directory not found!
    echo.
)

REM ============================================================================
REM UPDATE OTHER REPOSITORIES
REM ============================================================================
echo.
echo [3/3] UPDATING OTHER REPOSITORIES...
echo ----------------------------------------------------------------------------

REM Update api-collection
if exist "api-collection" (
    call :UpdateRepo "api-collection" "%MASTER_BRANCH%"
) else (
    echo [WARNING] api-collection directory not found!
)

REM Update docs
if exist "docs" (
    call :UpdateRepo "docs" "%MASTER_BRANCH%"
) else (
    echo [WARNING] docs directory not found!
)

REM ============================================================================
REM SUMMARY
REM ============================================================================
echo.
echo ============================================================================
echo                             UPDATE SUMMARY
echo ============================================================================
echo Successful updates:    %SUCCESS_COUNT%
echo Failed updates:        %FAIL_COUNT%
echo ============================================================================
echo.

if %FAIL_COUNT% GTR 0 (
    echo [!] Failed repositories:
    echo %FAILED_REPOS%
    echo ]
    echo.
    echo [WARNING] Some repositories failed to update. Check details above.
    echo ============================================================================
    echo.
    exit /b 1
) else (
    echo [OK] All repositories updated successfully!
    echo ============================================================================
    echo.
    exit /b 0
)

REM ============================================================================
REM FUNCTION: UpdateRepo
REM Parameters:
REM   %1 - Repository path
REM   %2 - Branch name
REM ============================================================================
:UpdateRepo
set "REPO_PATH=%~1"
set "BRANCH=%~2"
set "REPO_NAME=%~nx1"

echo.
echo ----------------------------------------
echo %REPO_NAME%
echo ----------------------------------------

REM Check if directory exists and is a git repository
if not exist "%REPO_PATH%\.git\" (
    echo   Status: [SKIP] Not a git repository
    goto :eof
)

REM Navigate to repository
pushd "%REPO_PATH%" 2>nul
if errorlevel 1 (
    echo   Status: [ERROR] Cannot access directory
    set /a FAIL_COUNT+=1
    set "FAILED_REPOS=!FAILED_REPOS! %REPO_NAME%,"
    goto :eof
)

REM Get current branch
for /f "tokens=*" %%i in ('git rev-parse --abbrev-ref HEAD 2^>nul') do set "CURRENT_BRANCH=%%i"
echo   Branch: %CURRENT_BRANCH% ^> %BRANCH%

REM Check for uncommitted changes
git diff-index --quiet HEAD -- 2>nul
if errorlevel 1 (
    echo   Status: [SKIP] Has uncommitted changes - skipping to avoid conflicts
    popd
    set /a FAIL_COUNT+=1
    set "FAILED_REPOS=!FAILED_REPOS! %REPO_NAME%,"
    goto :eof
)

REM Checkout target branch if needed and if enabled
if "%DO_CHECKOUT%"=="true" (
    if not "%CURRENT_BRANCH%"=="%BRANCH%" (
        echo   Action: Switching to branch %BRANCH%...
        git checkout "%BRANCH%" 2>nul
        if errorlevel 1 (
            echo   Status: [ERROR] Failed to checkout branch
            popd
            set /a FAIL_COUNT+=1
            set "FAILED_REPOS=!FAILED_REPOS! %REPO_NAME%,"
            goto :eof
        )
    )
)

REM Pull latest changes
echo   Action: Pulling from origin/%BRANCH%...
git pull origin "%BRANCH%" 2>nul
if errorlevel 1 (
    echo   Status: [ERROR] Failed to pull changes
    popd
    set /a FAIL_COUNT+=1
    set "FAILED_REPOS=!FAILED_REPOS! %REPO_NAME%,"
    goto :eof
)

REM Show latest commit
for /f "tokens=*" %%i in ('git log -1 --pretty^=format:"%%h - %%s (%%cr)"') do (
    echo   Commit: %%i
)

echo   Status: [OK] Updated successfully
set /a SUCCESS_COUNT+=1
popd
goto :eof