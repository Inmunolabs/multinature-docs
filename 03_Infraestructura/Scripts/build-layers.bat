@echo off
setlocal enabledelayedexpansion

REM Get the script directory and navigate to backend root
REM Script is in: docs/03_Infraestructura/Scripts/
REM Need to go to: backend/
cd /d "%~dp0"
cd ..\..\..
set "originalDir=%CD%"

set "layersPath=layers"

echo ================================================================================
echo ============================== Building Layers =================================
echo ================================================================================
cd /d "%originalDir%"
for /D %%F in ("%layersPath%\*") do (
    echo =============================== Building %%F ===============================
    cd /d "%%F"
    npm run build
    cd /d "%originalDir%"
)
