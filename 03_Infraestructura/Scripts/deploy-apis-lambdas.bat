@echo off
setlocal enabledelayedexpansion

REM Get the script directory and navigate to backend root
REM Script is in: docs/03_Infraestructura/Scripts/
REM Need to go to: backend/
cd /d "%~dp0"
cd ..\..\..
set "originalDir=%CD%"

set "apisPath=apis"

echo ================================================================================
echo =============================== Deploying APIs =================================
echo ================================================================================
cd /d "%originalDir%"
for /D %%F in ("%apisPath%\*") do (
    echo =============================== Deploying %%F ===============================
    cd /d "%%F"
    npm run deploy
    cd /d "%originalDir%"
)


