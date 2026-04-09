@echo off
echo ================================================
echo   Tests con Coverage - Diario de Evasion
echo ================================================
echo.

echo [*] Ejecutando tests unitarios con coverage...
echo ================================================
call npm run test:coverage

if errorlevel 1 (
    echo.
    echo [ERROR] Tests FALLARON
) else (
    echo.
    echo [OK] Tests PASARON
    echo.
    echo [i] Reporte de coverage generado en: coverage/index.html
)

echo.
pause
