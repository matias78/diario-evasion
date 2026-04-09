# 📜 Scripts Útiles - Windows

Scripts `.bat` para testing, caché y desarrollo en Windows.

## 🚀 Scripts Disponibles

---

## 🔧 Scripts de Caché (NUEVOS)

### `clean-cache.bat` - Limpiar caché de Next.js
Elimina archivos de caché que pueden causar problemas.

```cmd
clean-cache.bat
```

**Qué hace:**
- 🧹 Detiene el servidor Node.js
- 🗑️ Elimina carpeta `.next`
- 🗑️ Elimina `node_modules/.cache`

**Cuándo usar:**
- Cambios en el código no se reflejan
- Error 405 en APIs después de modificarlas
- Comportamiento extraño después de actualizar código

---

### `restart-fresh.bat` - Reinicio limpio ⭐
Limpia caché y reinicia el servidor automáticamente.

```cmd
restart-fresh.bat
```

**Qué hace:**
- 🧹 Limpia toda la caché
- 🚀 Inicia `npm run dev` automáticamente

**Cuándo usar:**
- **Úsalo siempre que los cambios no se vean en el navegador**
- Después de modificar rutas API
- Cuando hagas `git pull` de cambios importantes

---

## 🧪 Scripts de Testing

### `run-tests.bat` - Todos los tests
Ejecuta primero los tests unitarios y luego los tests E2E.

```cmd
run-tests.bat
```

**Qué hace:**
1. ✅ Ejecuta tests unitarios (Vitest)
2. ✅ Ejecuta tests E2E (Playwright)
3. ✅ Muestra resultado final
4. ⚠️ Se detiene si alguno falla

---

### `run-unit-tests.bat` - Solo tests unitarios
Ejecuta únicamente los tests unitarios (rápido).

```cmd
run-unit-tests.bat
```

**Cuándo usar:** Cuando solo quieres verificar lógica de negocio sin levantar el navegador.

---

### `run-e2e-tests.bat` - Solo tests E2E
Ejecuta tests end-to-end en modo headless.

```cmd
run-e2e-tests.bat
```

**Qué hace:**
- Inicia el servidor dev automáticamente
- Ejecuta tests en Chromium y Firefox
- Genera screenshots en caso de fallos

**Cuándo usar:** Para verificar flujos completos de usuario.

---

### `run-e2e-ui.bat` - Tests E2E con interfaz gráfica ⭐
Abre la interfaz gráfica de Playwright (RECOMENDADO).

```cmd
run-e2e-ui.bat
```

**Qué hace:**
- Abre UI interactiva
- Puedes ver tests ejecutándose en tiempo real
- Inspeccionar elementos
- Time-travel debugging
- Ver screenshots y traces

**Cuándo usar:** 
- Cuando quieres VER qué hace cada test
- Para debugging
- Para aprender cómo funcionan los tests

---

### `run-tests-with-coverage.bat` - Tests con coverage
Ejecuta tests unitarios y genera reporte de cobertura.

```cmd
run-tests-with-coverage.bat
```

**Qué hace:**
- Ejecuta tests unitarios
- Genera reporte HTML de coverage
- Abre el reporte en el navegador

**Reporte en:** `coverage/index.html`

---

## 💡 Recomendaciones

### Durante desarrollo:
```cmd
run-unit-tests.bat
```
Rápido, ejecuta en 1-2 segundos.

### Para ver tests E2E en acción:
```cmd
run-e2e-ui.bat
```
La interfaz gráfica es excelente para entender qué hace cada test.

### Antes de hacer commit:
```cmd
run-tests.bat
```
Asegura que todo funciona correctamente.

### Para verificar cobertura:
```cmd
run-tests-with-coverage.bat
```
Ve qué código está cubierto por tests.

---

## 🐛 Troubleshooting

### Script no ejecuta
- Asegúrate de estar en el directorio del proyecto
- Click derecho > "Ejecutar como administrador" (si es necesario)

### "npm no se reconoce como comando"
- Node.js no está instalado o no está en el PATH
- Reinstala Node.js: https://nodejs.org/

### Tests E2E fallan con timeout
- El servidor dev puede tardar en iniciar
- Playwright lo iniciará automáticamente
- Espera unos segundos

### Puerto 3000 ocupado
- Detén el servidor dev si está corriendo: `Ctrl+C`
- O Playwright usará el servidor existente

---

## 📊 Interpretación de Resultados

### ✅ Éxito
```
Test Files  2 passed (2)
      Tests  29 passed (29)
```
Todos los tests pasaron correctamente.

### ❌ Fallo
```
Test Files  1 failed | 1 passed (2)
      Tests  1 failed | 28 passed (29)
```
Revisa el error mostrado en consola.

### 📈 Coverage
```
Statements   : 85.5%
Branches     : 78.2%
Functions    : 82.1%
Lines        : 85.5%
```
Porcentaje de código cubierto por tests.

---

## 🎯 Flujo de Trabajo Recomendado

1. **Mientras desarrollas:**
   ```cmd
   run-unit-tests.bat
   ```

2. **Antes de commit:**
   ```cmd
   run-tests.bat
   ```

3. **Si algo falla en E2E:**
   ```cmd
   run-e2e-ui.bat
   ```
   (para ver qué está pasando)

4. **Semanalmente:**
   ```cmd
   run-tests-with-coverage.bat
   ```
   (para verificar cobertura)

---

## 📝 Notas

- Los scripts usan `chcp 65001` para soportar caracteres Unicode (emojis)
- Todos los scripts hacen `pause` al final para ver resultados
- Los errores se muestran claramente en rojo/verde
- Los scripts soportan Ctrl+C para cancelar

---

**Creado para el proyecto Diario de Evasión** 🎨
