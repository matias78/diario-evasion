# 🔧 Solución de Problemas de Caché

## ❓ ¿Cuándo usar estos comandos?

Si experimentas alguno de estos problemas:
- ✅ Los cambios en el código no se reflejan en el navegador
- ✅ Error 405 (Method Not Allowed) después de modificar rutas API
- ✅ Componentes mostrando versión antigua del código
- ✅ Comportamiento extraño después de actualizar código

---

## 🚀 Soluciones Rápidas

### Opción 1: Scripts .BAT (Recomendado para Windows) ⭐

#### `clean-cache.bat` - Solo limpiar caché
```cmd
clean-cache.bat
```
**Qué hace:**
- 🧹 Detiene servidor si está corriendo
- 🗑️ Elimina carpeta `.next`
- 🗑️ Elimina `node_modules/.cache`
- ✅ Listo para `npm run dev`

---

#### `restart-fresh.bat` - Limpiar y reiniciar
```cmd
restart-fresh.bat
```
**Qué hace:**
- 🧹 Limpia toda la caché
- 🚀 Inicia el servidor automáticamente
- ✅ Todo en un solo paso

**💡 Usa este cuando:** Cambies código y no se refleje en el navegador.

---

### Opción 2: Comandos NPM (Funciona en cualquier OS)

#### Limpiar caché manualmente
```bash
npm run clean
```
Elimina `.next` y `node_modules/.cache`

#### Iniciar con caché limpia
```bash
npm run dev:clean
```
Limpia caché y luego inicia el servidor.

#### Limpiar TODO (incluyendo tests)
```bash
npm run clean:all
```
Elimina:
- `.next/`
- `node_modules/.cache/`
- `coverage/`
- `playwright-report/`
- `test-results/`

---

## 📋 Flujo de Trabajo Recomendado

### Durante Desarrollo Normal:
```bash
npm run dev
```

### Si los cambios no se ven:
```bash
# Opción A (Windows): Doble click
restart-fresh.bat

# Opción B (Terminal):
npm run dev:clean
```

### Antes de hacer commit/push:
```bash
npm run clean:all
npm run test:all
```

---

## 🔍 Diagnóstico de Problemas

### Problema: Cambios en componentes no se reflejan

**Síntomas:**
- Modificaste un componente
- Guardaste el archivo
- El navegador no muestra los cambios

**Solución:**
```bash
# 1. Hard refresh en navegador
Ctrl + Shift + R

# 2. Si no funciona, limpia caché
npm run dev:clean
```

---

### Problema: Error 405 en rutas API

**Síntomas:**
- `DELETE http://localhost:3000/api/... 405 (Method Not Allowed)`
- Modificaste una ruta API
- El navegador llama a la URL incorrecta

**Solución:**
```bash
# Limpiar caché de Next.js
npm run clean

# O usar el script
clean-cache.bat
```

---

### Problema: TypeScript errors después de actualizar

**Síntomas:**
- Errores de tipos TypeScript
- Código correcto pero Next.js se queja

**Solución:**
```bash
# Detener servidor
Ctrl + C

# Limpiar todo
npm run clean:all

# Reiniciar
npm run dev
```

---

## 🛠️ Comandos Disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Inicia servidor normal |
| `npm run dev:clean` | Limpia caché y inicia servidor |
| `npm run clean` | Elimina caché de Next.js |
| `npm run clean:all` | Elimina TODO (caché, tests, builds) |
| `clean-cache.bat` | Script Windows - limpia caché |
| `restart-fresh.bat` | Script Windows - limpia y reinicia |

---

## 💡 Tips para Evitar Problemas de Caché

### 1. Hard Refresh Regular
Durante desarrollo, usa **Ctrl + Shift + R** con frecuencia.

### 2. DevTools abierto con "Disable cache"
En Chrome DevTools (F12):
- Ve a **Network tab**
- Marca ✅ **Disable cache**
- Deja DevTools abierto mientras desarrollas

### 3. Usa `npm run dev:clean` después de:
- ✅ Cambiar archivos en `/app/api/`
- ✅ Modificar rutas dinámicas `[slug]`
- ✅ Actualizar configuración Next.js
- ✅ Pull de cambios de Git

### 4. Limpieza preventiva
Si vas a hacer cambios importantes:
```bash
npm run clean
npm run dev
```

---

## 🚨 Cuándo NO limpiar caché

**NO es necesario limpiar caché si:**
- Solo cambiaste CSS/estilos (hot reload funciona)
- Solo cambiaste texto en componentes
- Agregaste console.logs

**En estos casos, el hot reload de Next.js funciona perfecto.**

---

## 📊 Orden de Soluciones (del más rápido al más completo)

1. **Hard Refresh** (`Ctrl + Shift + R`) - 1 segundo
2. **Reiniciar servidor** (`Ctrl+C` → `npm run dev`) - 5-10 segundos
3. **Limpiar caché** (`npm run clean`) - 15 segundos
4. **Limpiar y reiniciar** (`npm run dev:clean`) - 20 segundos
5. **Limpiar todo** (`npm run clean:all`) - 30 segundos

**Empieza por el más rápido y ve subiendo si no funciona.**

---

## 🎯 Caso de Uso Real: Modificar API Route

```bash
# 1. Modificas app/api/admin/posts/[slug]/route.ts
# 2. Guardas el archivo
# 3. Next.js dice "compiled successfully"
# 4. PERO el navegador usa código viejo

# Solución:
npm run dev:clean

# O en Windows:
restart-fresh.bat
```

---

**Documentación creada para prevenir problemas de caché en Next.js 14** 🚀
