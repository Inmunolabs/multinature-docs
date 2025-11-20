@echo off
setlocal enabledelayedexpansion

REM Get the script directory and navigate to backend root
REM Script is in: docs/03_Infraestructura/Scripts/
REM Need to go to: backend/
cd /d "%~dp0"
cd ..\..\..

set "layersPath=layers"
set "apisPath=apis"
set "remote=origin"
set "originalDir=%CD%"

echo ================================================================================
echo                    Git Commit and Push Script
echo ================================================================================
echo.

REM Request commit message
set /p "commitMessage=Enter commit message: "
if "!commitMessage!"=="" (
    echo Error: Commit message cannot be empty.
    exit /b 1
)

REM Request source branch (pull branch)
set /p "pullBranch=Enter source branch (default: develop): "
if "!pullBranch!"=="" set "pullBranch=develop"

REM Request destination branch (push branch)
set /p "pushBranch=Enter destination branch (default: %pullBranch%): "
if "!pushBranch!"=="" set "pushBranch=%pullBranch%"

REM Request what to process
echo.
echo What do you want to process?
echo [1] APIs only
echo [2] Layers only
echo [3] Both APIs and Layers
set /p "choice=Enter your choice (1-3, default: 1): "
if "!choice!"=="" set "choice=1"

REM Validate choice
if "!choice!" NEQ "1" if "!choice!" NEQ "2" if "!choice!" NEQ "3" (
    echo Invalid choice. Defaulting to APIs only.
    set "choice=1"
)

echo.
echo ================================================================================
echo Configuration:
echo   Commit message: %commitMessage%
echo   Source branch:  %pullBranch%
echo   Destination branch: %pushBranch%
echo   Remote: %remote%
echo   Process: 
if "!choice!"=="1" echo     - APIs only
if "!choice!"=="2" echo     - Layers only
if "!choice!"=="3" echo     - Both APIs and Layers
echo ================================================================================
echo.

REM Confirm before proceeding
set /p "confirm=Do you want to proceed? (Y/N, default: N): "
if /i not "!confirm!"=="Y" (
    echo Operation cancelled.
    exit /b 0
)

echo.
echo Starting process...
echo.

REM Process Layers if selected
if "!choice!"=="2" goto ProcessLayers
if "!choice!"=="3" goto ProcessLayers
goto ProcessAPIs

:ProcessLayers
echo ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
echo ::::::::::::::::::::::::::::::: Updating Layers ::::::::::::::::::::::::::::::::
echo ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
cd /d "%originalDir%"
for /D %%F in ("%layersPath%\*") do (
    echo =============================== Updating %%F ===============================
    cd /d "%%F"
    if exist ".git" (
        git checkout "%pushBranch%" 2>nul || git checkout -b "%pushBranch%"
        git pull "%remote%" "%pullBranch%" 2>nul
        git add .
        git commit -m "%commitMessage%"
        if !errorlevel! equ 0 (
            git push "%remote%" "%pushBranch%"
        ) else (
            echo No changes to commit in %%F
        )
    ) else (
        echo Warning: %%F is not a git repository, skipping...
    )
    cd /d "%originalDir%"
    echo.
)
if "!choice!"=="2" goto End

:ProcessAPIs
echo ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
echo :::::::::::::::::::::::::::::::: Updating APIs ::::::::::::::::::::::::::::::::
echo ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
cd /d "%originalDir%"
for /D %%F in ("%apisPath%\*") do (
    echo =============================== Updating %%F ===============================
    cd /d "%%F"
    if exist ".git" (
        git checkout "%pushBranch%" 2>nul || git checkout -b "%pushBranch%"
        git pull "%remote%" "%pullBranch%" 2>nul
        git add .
        git commit -am "%commitMessage%"
        if !errorlevel! equ 0 (
            git push "%remote%" "%pushBranch%"
        ) else (
            echo No changes to commit in %%F
        )
    ) else (
        echo Warning: %%F is not a git repository, skipping...
    )
    cd /d "%originalDir%"
    echo.
)

:End
echo ================================================================================
echo Process completed!
echo ================================================================================
endlocal
