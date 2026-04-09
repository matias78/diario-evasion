@echo off
echo ================================================
echo   Limpieza de Cache - Diario de Evasion
echo ================================================
echo.

echo [*] Deteniendo servidor si esta corriendo...
taskkill /F /IM node.exe >nul 2>&1

echo [*] Eliminando carpeta .next...
if exist .next (
    rmdir /s /q .next
    echo [OK] Carpeta .next eliminada
) else (
    echo [i] Carpeta .next no existe
)

echo.
echo [*] Eliminando node_modules\.cache...
if exist node_modules\.cache (
    rmdir /s /q node_modules\.cache
    echo [OK] Cache de node_modules eliminada
) else (
    echo [i] Cache de node_modules no existe
)

echo.
echo [OK] Cache limpiada exitosamente!
echo.
echo [i] Ahora ejecuta: npm run dev
echo.
pause
