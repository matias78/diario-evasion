@echo off
echo ================================================
echo   Tests Unitarios - Diario de Evasion
echo ================================================
echo.

call npm run test -- --run

if errorlevel 1 (
    echo.
    echo [ERROR] Tests FALLARON
) else (
    echo.
    echo [OK] Tests PASARON
)

echo.
pause
