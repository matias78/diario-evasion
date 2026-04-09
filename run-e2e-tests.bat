@echo off
echo ================================================
echo   Tests E2E - Diario de Evasion
echo ================================================
echo.
echo [!] NOTA: Este proceso iniciara el servidor dev automaticamente
echo          y ejecutara los tests en modo headless.
echo.

call npm run test:e2e

if errorlevel 1 (
    echo.
    echo [ERROR] Tests E2E FALLARON
    echo.
    echo [i] Tip: Ejecuta run-e2e-ui.bat para ver que fallo
) else (
    echo.
    echo [OK] Tests E2E PASARON
)

echo.
pause
