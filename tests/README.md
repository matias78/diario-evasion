# Tests Automatizados - Diario de Evasión

Sistema completo de testing automatizado con Playwright (E2E) y Vitest (Unit tests).

## 📋 Contenido

- **Tests E2E (End-to-End)**: Playwright
  - Tests de funcionalidad pública (homepage, posts, tema)
  - Tests del panel de administración (auth, editor, settings)

- **Tests Unitarios**: Vitest
  - Tests de lógica de negocio (lib/posts.ts, lib/utils.ts)
  - Tests de funciones helper

## 🚀 Comandos de Testing

### Tests Unitarios

```bash
# Ejecutar tests unitarios
npm run test

# Ejecutar con coverage
npm run test:coverage

# Modo watch (útil durante desarrollo)
npm run test -- --watch
```

### Tests E2E

```bash
# Ejecutar todos los tests E2E
npm run test:e2e

# Ejecutar con UI interactiva (recomendado para debugging)
npm run test:e2e:ui

# Ejecutar en modo debug (paso a paso)
npm run test:e2e:debug

# Ver report HTML del último run
npm run test:e2e:report

# Ejecutar test específico
npm run test:e2e -- tests/e2e/public/homepage.spec.ts

# Ejecutar solo en Chrome
npm run test:e2e -- --project=chromium
```

### Ejecutar Todos los Tests

```bash
# Ejecutar unit + E2E
npm run test:all
```

## 📁 Estructura de Tests

```
tests/
├── e2e/                           # Tests End-to-End (Playwright)
│   ├── public/                    # Tests de funcionalidad pública
│   │   ├── homepage.spec.ts       # Búsqueda, filtros, navegación
│   │   ├── post-page.spec.ts      # Posts individuales, share, TOC
│   │   ├── theme.spec.ts          # Toggle dark/light, persistencia
│   │   └── sections.spec.ts       # Navegación por secciones
│   └── admin/                     # Tests del panel admin
│       ├── auth.spec.ts           # Login, logout, sesión
│       ├── post-editor.spec.ts    # CRUD de posts
│       ├── drafts.spec.ts         # Workflow de borradores
│       ├── settings.spec.ts       # Configuración de colores
│       └── account.spec.ts        # Cambio de contraseña
├── unit/                          # Tests Unitarios (Vitest)
│   ├── lib/
│   │   ├── posts.test.ts          # Funciones de posts
│   │   └── utils.test.ts          # Utilidades
│   └── components/                # Tests de componentes React
└── helpers/                       # Utilidades para tests
    ├── auth.ts                    # Login helper, createTestPost
    └── cleanup.ts                 # Limpieza de archivos de test
```

## ✅ Cobertura de Tests

### Tests E2E - Funcionalidad Pública

**Homepage (homepage.spec.ts)**
- ✅ Carga de página con posts
- ✅ Búsqueda en tiempo real
- ✅ Filtrado por categorías
- ✅ Búsqueda + filtro combinados
- ✅ Mensaje "no results"
- ✅ Navegación a post individual

**Post Page (post-page.spec.ts)**
- ✅ Renderizado de título y contenido
- ✅ Metadata (fecha, categoría)
- ✅ Tiempo de lectura
- ✅ Botones de compartir
- ✅ Copy to clipboard
- ✅ Tabla de contenidos
- ✅ Sección de comentarios
- ✅ Botón volver a inicio
- ✅ Renderizado de markdown
- ✅ Imágenes responsive

**Theme (theme.spec.ts)**
- ✅ Toggle dark/light mode
- ✅ Persistencia en localStorage
- ✅ CSS variables correctas
- ✅ Tema persiste entre páginas
- ✅ Transiciones suaves

### Tests E2E - Panel Admin

**Authentication (auth.spec.ts)**
- ✅ Login con credenciales correctas
- ✅ Error con credenciales incorrectas
- ✅ Logout funcional
- ✅ Redirección en rutas protegidas
- ✅ Persistencia de sesión
- ✅ Navegación en dashboard

**Post Editor (post-editor.spec.ts)**
- ✅ Crear borrador
- ✅ Publicar post
- ✅ Editar post existente
- ✅ Eliminar post
- ✅ Validación de campos
- ✅ Preview de markdown

### Tests Unitarios

**Posts Library (posts.test.ts)**
- ✅ getAllPosts() - obtener posts publicados
- ✅ getAllPostsIncludingDrafts() - incluir borradores
- ✅ getPostBySlug() - obtener por slug
- ✅ getPostsBySection() - filtrar por sección
- ✅ Exclusión de drafts
- ✅ Ordenamiento por fecha
- ✅ Ordenamiento por order field

**Utils (utils.test.ts)**
- ✅ calculateReadingTime() - cálculo correcto
- ✅ formatReadingTime() - formato singular/plural
- ✅ Manejo de edge cases (vacío, múltiples espacios)
- ✅ Integración calculate + format

## 🔧 Configuración

### Playwright Config

Ubicación: `playwright.config.ts`

```typescript
- baseURL: http://localhost:3000
- Browsers: Chromium, Firefox
- Auto-start dev server
- Screenshots on failure
- Trace on retry
```

### Vitest Config

Ubicación: `vitest.config.ts`

```typescript
- Environment: jsdom
- Coverage: v8 provider
- Globals enabled
```

## 🎯 Cómo Escribir Nuevos Tests

### Test E2E con Playwright

```typescript
import { test, expect } from '@playwright/test';

test.describe('Feature Name', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should do something', async ({ page }) => {
    // Arrange
    const button = page.locator('[data-testid="my-button"]');

    // Act
    await button.click();

    // Assert
    await expect(page.locator('text=Success')).toBeVisible();
  });
});
```

### Test Unitario con Vitest

```typescript
import { describe, it, expect } from 'vitest';
import { myFunction } from '@/lib/myModule';

describe('myFunction', () => {
  it('should return expected value', () => {
    const result = myFunction('input');
    expect(result).toBe('expected');
  });
});
```

## 🐛 Debugging Tests

### Playwright Debug

1. **UI Mode** (recomendado):
   ```bash
   npm run test:e2e:ui
   ```
   - Ver tests en tiempo real
   - Inspeccionar elementos
   - Time travel debugging

2. **Debug Mode**:
   ```bash
   npm run test:e2e:debug
   ```
   - Paso a paso con debugger
   - Inspección en DevTools

3. **Ver Traces**:
   ```bash
   npm run test:e2e:report
   ```
   - Timeline de eventos
   - Screenshots
   - Network logs

### Vitest Debug

```bash
# Con --ui para interfaz gráfica
npm run test:ui

# Con debugger en VSCode
# Agregar breakpoint y usar "Debug Test" en VSCode
```

## 📊 Interpretar Resultados

### Tests Passed ✅

```
✓ tests/e2e/public/homepage.spec.ts (6 tests passed)
```

Todo funciona correctamente.

### Tests Failed ❌

```
✗ tests/e2e/admin/auth.spec.ts › should login with correct credentials

Expected URL to be "/admin"
Received: "/admin/login"
```

El test falló - revisa la funcionalidad o actualiza el test.

### Coverage Report

```bash
npm run test:coverage
```

- **Statements**: Líneas de código ejecutadas
- **Branches**: Condiciones if/else cubiertas
- **Functions**: Funciones llamadas
- **Lines**: Total de líneas cubiertas

## 🚨 Solución de Problemas

### "Cannot find module '@/...'"

Asegúrate de que el alias está configurado en `vitest.config.ts`:

```typescript
resolve: {
  alias: {
    '@': path.resolve(__dirname, './')
  }
}
```

### "Browser not found"

Reinstalar browsers:

```bash
npx playwright install
```

### Tests E2E fallan con timeout

Aumentar timeout en `playwright.config.ts` o en el test específico:

```typescript
test('slow test', async ({ page }) => {
  test.setTimeout(60000); // 60 segundos
  // ...
});
```

### Port 3000 already in use

Detener servidor dev antes de ejecutar tests E2E, o Playwright lo iniciará automáticamente.

## 📚 Recursos

- [Playwright Docs](https://playwright.dev/)
- [Vitest Docs](https://vitest.dev/)
- [Testing Library](https://testing-library.com/)

## 🎓 Best Practices

1. **Usa data-testid** para selectors estables
2. **Evita sleep/wait arbitrarios** - usa `waitFor...` de Playwright
3. **Tests independientes** - cada test debe poder ejecutarse solo
4. **Cleanup después de tests** - elimina datos de prueba
5. **Descriptive names** - nombres claros de tests
6. **Arrange-Act-Assert** - estructura clara en tests

## ⚡ Tips de Performance

- **Paralelización**: Playwright ejecuta tests en paralelo por defecto
- **Reusar estado**: Usa `beforeEach` para setup común
- **Test específicos**: Ejecuta solo los tests que necesitas durante desarrollo
- **Skip tests lentos**: Usa `.skip` para tests que no necesitas ahora

```typescript
test.skip('slow integration test', async ({ page }) => {
  // ...
});
```

---

**¡Tests exitosos! 🎉**
