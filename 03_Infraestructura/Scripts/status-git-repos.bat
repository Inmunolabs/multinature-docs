@echo off
setlocal enabledelayedexpansion

REM ============================================================================
REM Script: status-git-repos.bat
REM Description: Shows detailed status of all git repositories in the workspace
REM Usage: status-git-repos.bat [--detailed] [--help]
REM Examples:
REM   status-git-repos.bat
REM   status-git-repos.bat --detailed
REM ============================================================================

REM Default Configuration
set "SHOW_DETAILED=false"

REM Parse command line arguments
:parse_args
if "%~1"=="" goto end_parse_args
if /i "%~1"=="--help" goto show_help
if /i "%~1"=="-h" goto show_help
if /i "%~1"=="--detailed" (
    set "SHOW_DETAILED=true"
    shift
    goto parse_args
)
if /i "%~1"=="-d" (
    set "SHOW_DETAILED=true"
    shift
    goto parse_args
)
REM Unknown argument
echo [WARNING] Unknown argument: %~1
shift
goto parse_args

:end_parse_args

REM Counter for statistics
set /a CLEAN_COUNT=0
set /a DIRTY_COUNT=0
set /a AHEAD_COUNT=0
set /a BEHIND_COUNT=0
set /a DIVERGED_COUNT=0
set "DIRTY_REPOS="
set "AHEAD_REPOS="
set "CLEAN_REPOS="

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
echo                    MULTINATURE GIT REPOSITORIES STATUS
echo ============================================================================
echo.
echo USAGE:
echo   status-git-repos.bat [OPTIONS]
echo.
echo OPTIONS:
echo   --detailed, -d                Show detailed file changes for each repo
echo                                 (default: disabled)
echo.
echo   --help, -h                    Show this help message
echo.
echo EXAMPLES:
echo   status-git-repos.bat
echo     Shows summary status of all repositories
echo.
echo   status-git-repos.bat --detailed
echo     Shows detailed status including all modified files
echo.
echo   status-git-repos.bat -d
echo     Same as above using short option
echo.
echo STATUS INDICATORS:
echo   [CLEAN]     - No changes, up to date with remote
echo   [MODIFIED]  - Has uncommitted changes
echo   [AHEAD]     - Has commits not pushed to remote
echo   [BEHIND]    - Remote has commits not pulled yet
echo   [DIVERGED]  - Both local and remote have different commits
echo.
echo FILE INDICATORS (detailed mode):
echo   [+] Staged      [~] Modified      [?] Untracked
echo.
echo NOTE:
echo   In normal mode, only repositories with changes are shown in detail.
echo   Clean repositories are listed at the end.
echo.
echo ============================================================================
exit /b 0

:start_script

echo.
echo ============================================================================
echo                    MULTINATURE GIT REPOSITORIES STATUS
echo ============================================================================
echo Root Directory: %CD%
echo Detailed Mode: %SHOW_DETAILED%
echo ============================================================================
echo.

REM ============================================================================
REM CHECK LAYERS
REM ============================================================================
echo.
echo [1/3] CHECKING LAYERS...
echo ----------------------------------------------------------------------------
if exist "layers" (
    for /D %%F in ("layers\*") do (
        call :CheckRepo "%%F"
    )
) else (
    echo [WARNING] layers directory not found!
    echo.
)

REM ============================================================================
REM CHECK APIs
REM ============================================================================
echo.
echo [2/3] CHECKING APIs...
echo ----------------------------------------------------------------------------
if exist "apis" (
    for /D %%F in ("apis\*") do (
        call :CheckRepo "%%F"
    )
) else (
    echo [WARNING] apis directory not found!
    echo.
)

REM ============================================================================
REM CHECK OTHER REPOSITORIES
REM ============================================================================
echo.
echo [3/3] CHECKING OTHER REPOSITORIES...
echo ----------------------------------------------------------------------------

REM Check api-collection
if exist "api-collection" (
    call :CheckRepo "api-collection"
) else (
    echo [WARNING] api-collection directory not found!
)

REM Check docs
if exist "docs" (
    call :CheckRepo "docs"
) else (
    echo [WARNING] docs directory not found!
)

REM ============================================================================
REM SUMMARY
REM ============================================================================
echo.
echo ============================================================================
echo                             STATUS SUMMARY
echo ============================================================================
echo Clean (up to date):        %CLEAN_COUNT%
echo With local changes:        %DIRTY_COUNT%
echo Ahead of remote:           %AHEAD_COUNT%
echo Behind remote:             %BEHIND_COUNT%
echo Diverged from remote:      %DIVERGED_COUNT%
echo ============================================================================
echo.

if %DIRTY_COUNT% GTR 0 (
    echo [!] Repositories with uncommitted changes:
    echo %DIRTY_REPOS%
    echo.
)

if %AHEAD_COUNT% GTR 0 (
    echo [^] Repositories with unpushed commits:
    echo %AHEAD_REPOS%
    echo.
)

if %CLEAN_COUNT% GTR 0 (
    echo [OK] Clean repositories (%CLEAN_COUNT%):
    echo ----------------------------------------
    echo %CLEAN_REPOS%
    echo.
)

if %DIRTY_COUNT% EQU 0 if %AHEAD_COUNT% EQU 0 if %BEHIND_COUNT% EQU 0 if %DIVERGED_COUNT% EQU 0 (
    echo [SUCCESS] All repositories are clean and up to date!
) else (
    echo [INFO] Some repositories need attention. See details above.
)

echo ============================================================================
echo.

exit /b 0

REM ============================================================================
REM FUNCTION: CheckRepo
REM Parameters:
REM   %1 - Repository path
REM ============================================================================
:CheckRepo
set "REPO_PATH=%~1"
set "REPO_NAME=%~nx1"

REM Check if directory exists and is a git repository
if not exist "%REPO_PATH%\.git\" (
    goto :eof
)

REM Navigate to repository
pushd "%REPO_PATH%" 2>nul
if errorlevel 1 (
    goto :eof
)

REM Get current branch
for /f "tokens=*" %%i in ('git rev-parse --abbrev-ref HEAD 2^>nul') do set "CURRENT_BRANCH=%%i"

REM Fetch remote info (silently)
git fetch --quiet 2>nul

REM Check for uncommitted changes
set "HAS_CHANGES=false"
git diff-index --quiet HEAD -- 2>nul
if errorlevel 1 (
    set "HAS_CHANGES=true"
    set /a DIRTY_COUNT+=1
    set "DIRTY_REPOS=!DIRTY_REPOS! %REPO_NAME%"
)

REM Count untracked files
set "UNTRACKED_COUNT=0"
for /f %%i in ('git ls-files --others --exclude-standard 2^>nul ^| find /c /v ""') do set "UNTRACKED_COUNT=%%i"

REM Count modified files
set "MODIFIED_COUNT=0"
for /f %%i in ('git diff --name-only 2^>nul ^| find /c /v ""') do set "MODIFIED_COUNT=%%i"

REM Count staged files
set "STAGED_COUNT=0"
for /f %%i in ('git diff --cached --name-only 2^>nul ^| find /c /v ""') do set "STAGED_COUNT=%%i"

REM Get commit counts (ahead/behind)
set "AHEAD=0"
set "BEHIND=0"
for /f "tokens=1,2" %%a in ('git rev-list --left-right --count HEAD...@{u} 2^>nul') do (
    set "AHEAD=%%a"
    set "BEHIND=%%b"
)

REM Determine overall status
set "STATUS=CLEAN"
set "STATUS_DETAIL="
set "SHOW_REPO=false"

if !HAS_CHANGES!==true (
    set "STATUS=MODIFIED"
    set "STATUS_DETAIL=!STATUS_DETAIL! Modified:!MODIFIED_COUNT! Staged:!STAGED_COUNT! Untracked:!UNTRACKED_COUNT!"
    set "SHOW_REPO=true"
)

if !AHEAD! GTR 0 (
    if "!STATUS!"=="CLEAN" set "STATUS=AHEAD"
    if "!STATUS!"=="MODIFIED" set "STATUS=MODIFIED+AHEAD"
    set "STATUS_DETAIL=!STATUS_DETAIL! Ahead:!AHEAD!"
    set /a AHEAD_COUNT+=1
    set "AHEAD_REPOS=!AHEAD_REPOS! %REPO_NAME%"
    set "SHOW_REPO=true"
)

if !BEHIND! GTR 0 (
    if "!STATUS!"=="CLEAN" set "STATUS=BEHIND"
    if "!STATUS!"=="AHEAD" set "STATUS=DIVERGED"
    if "!STATUS!"=="MODIFIED" set "STATUS=MODIFIED+BEHIND"
    if "!STATUS!"=="MODIFIED+AHEAD" set "STATUS=MODIFIED+DIVERGED"
    set "STATUS_DETAIL=!STATUS_DETAIL! Behind:!BEHIND!"
    set /a BEHIND_COUNT+=1
    set "SHOW_REPO=true"
)

if !AHEAD! GTR 0 if !BEHIND! GTR 0 (
    set /a DIVERGED_COUNT+=1
)

REM Update counters
if "!STATUS!"=="CLEAN" (
    set /a CLEAN_COUNT+=1
    set "CLEAN_REPOS=!CLEAN_REPOS! %REPO_NAME%"
)

REM In normal mode, only show repos with changes. In detailed mode, show all.
if "%SHOW_DETAILED%"=="true" set "SHOW_REPO=true"

if "!SHOW_REPO!"=="true" (
    echo.
    echo [!STATUS!] %REPO_NAME%
    echo ----------------------------------------
    echo   Branch: !CURRENT_BRANCH!
    
    if "!STATUS!"=="CLEAN" (
        echo   Status: [CLEAN] Up to date
    ) else (
        echo   Status: [!STATUS!] !STATUS_DETAIL!
    )
    
    REM Show last commit
    for /f "tokens=*" %%i in ('git log -1 --pretty^=format:"%%h - %%s (%%cr)" 2^>nul') do (
        echo   Last commit: %%i
    )
)

REM Show detailed file changes if requested
if "%SHOW_DETAILED%"=="true" (
    if !HAS_CHANGES!==true (
        echo.
        echo   --- Detailed Changes ---
        
        REM Show staged files
        if !STAGED_COUNT! GTR 0 (
            echo   Staged files:
            for /f "tokens=*" %%f in ('git diff --cached --name-only 2^>nul') do (
                echo     [+] %%f
            )
        )
        
        REM Show modified files
        if !MODIFIED_COUNT! GTR 0 (
            echo   Modified files:
            for /f "tokens=*" %%f in ('git diff --name-only 2^>nul') do (
                echo     [~] %%f
            )
        )
        
        REM Show untracked files
        if !UNTRACKED_COUNT! GTR 0 (
            echo   Untracked files:
            for /f "tokens=*" %%f in ('git ls-files --others --exclude-standard 2^>nul') do (
                echo     [?] %%f
            )
        )
    )
    
    REM Show unpushed commits
    if !AHEAD! GTR 0 (
        echo.
        echo   --- Unpushed Commits ---
        for /f "tokens=*" %%c in ('git log --oneline @{u}..HEAD 2^>nul') do (
            echo     %%c
        )
    )
    
    REM Show unpulled commits
    if !BEHIND! GTR 0 (
        echo.
        echo   --- Unpulled Commits ---
        for /f "tokens=*" %%c in ('git log --oneline HEAD..@{u} 2^>nul') do (
            echo     %%c
        )
    )
)

popd
goto :eof

