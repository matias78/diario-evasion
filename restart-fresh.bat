@echo off
echo ================================================
echo   Reinicio Limpio - Diario de Evasion
echo ================================================
echo.

echo [*] Deteniendo servidor...
taskkill /F /IM node.exe >nul 2>&1

echo [*] Limpiando cache...
if exist .next rmdir /s /q .next
if exist node_modules\.cache rmdir /s /q node_modules\.cache

echo.
echo [*] Iniciando servidor en modo desarrollo...
echo.
npm run dev
