@echo off
echo ================================================
echo   Tests E2E - Modo UI - Diario de Evasion
echo ================================================
echo.
echo [*] Abriendo interfaz grafica de Playwright...
echo     Podras ver los tests ejecutandose en tiempo real
echo.

call npm run test:e2e:ui

echo.
pause
