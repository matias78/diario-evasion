@echo off
echo ================================================
echo   Sistema de Testing - Diario de Evasion
echo ================================================
echo.

echo [1/2] Ejecutando tests unitarios...
echo ================================================
call npm run test -- --run
if errorlevel 1 (
    echo.
    echo [ERROR] Tests unitarios FALLARON
    echo.
    pause
    exit /b 1
)

echo.
echo [OK] Tests unitarios PASARON
echo.
echo.

echo [2/2] Ejecutando tests E2E...
echo ================================================
call npm run test:e2e
if errorlevel 1 (
    echo.
    echo [ERROR] Tests E2E FALLARON
    echo.
    pause
    exit /b 1
)

echo.
echo ================================================
echo   [OK] TODOS LOS TESTS PASARON
echo ================================================
echo.
pause
