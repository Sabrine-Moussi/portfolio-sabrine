@echo off
echo ========================================
echo Test Local - Portfolio DevOps POC
echo ========================================
echo.

echo [1/4] Installation des dependances...
call npm install
if %errorlevel% neq 0 (
    echo ERREUR: Installation des dependances a echoue
    pause
    exit /b 1
)
echo OK
echo.

echo [2/4] Execution des tests unitaires...
call npm test -- --watchAll=false --ci
if %errorlevel% neq 0 (
    echo ERREUR: Les tests ont echoue
    pause
    exit /b 1
)
echo OK
echo.

echo [3/4] Build de l'application...
call npm run build
if %errorlevel% neq 0 (
    echo ERREUR: Le build a echoue
    pause
    exit /b 1
)
echo OK
echo.

echo [4/4] Build de l'image Docker...
docker build -t portfolio-sabrine:local .
if %errorlevel% neq 0 (
    echo ERREUR: Le build Docker a echoue
    echo Verifie que Docker Desktop est demarre
    pause
    exit /b 1
)
echo OK
echo.

echo ========================================
echo Tous les tests sont passes avec succes!
echo ========================================
echo.
echo Pour tester l'image Docker localement:
echo   docker run -p 8080:80 portfolio-sabrine:local
echo.
echo Puis ouvre http://localhost:8080 dans ton navigateur
echo.
pause

