# 🧪 Sistema de Testing Automatizado - Diario de Evasión

Sistema completo de testing implementado exitosamente con **Playwright** (E2E) y **Vitest** (Unit tests).

## ✅ Estado Actual

- ✅ **Dependencias instaladas**: Playwright, Vitest, Testing Library
- ✅ **Browsers instalados**: Chromium, Firefox, WebKit
- ✅ **Configuración completa**: playwright.config.ts, vitest.config.ts
- ✅ **Scripts de NPM agregados**: test, test:e2e, test:e2e:ui, etc.
- ✅ **Tests E2E implementados**: 5 archivos spec con ~40 tests
- ✅ **Tests unitarios implementados**: 2 archivos con 29 tests
- ✅ **Helpers creados**: auth.ts, cleanup.ts
- ✅ **Data-testids agregados**: PostCard, SearchBar, ThemeToggle, ShareButtons
- ✅ **Documentación**: tests/README.md completo

**Tests unitarios corriendo:** ✅ 29/29 passing

## 🚀 Cómo Usar

### Ejecutar Tests Unitarios

```bash
# Ejecutar todos los tests unitarios
npm run test

# Con coverage
npm run test:coverage

# En modo watch (desarrollo)
npm run test -- --watch
```

### Ejecutar Tests E2E

**IMPORTANTE:** Los tests E2E requieren que el servidor de desarrollo esté corriendo o se iniciará automáticamente.

```bash
# Ejecutar todos los tests E2E
npm run test:e2e

# UI Mode - Recomendado para ver los tests en acción
npm run test:e2e:ui

# Debug mode - Paso a paso
npm run test:e2e:debug

# Ver report del último run
npm run test:e2e:report

# Ejecutar test específico
npm run test:e2e -- tests/e2e/public/homepage.spec.ts

# Solo en Chrome
npm run test:e2e -- --project=chromium
```

### Ejecutar Todo

```bash
# Unit + E2E
npm run test:all
```

## 📊 Cobertura de Tests

### Tests E2E (Playwright) - ~40 tests

#### Funcionalidad Pública

**Homepage (homepage.spec.ts)** - 6 tests
- ✅ Carga de página con posts
- ✅ Búsqueda por título
- ✅ Filtro por categoría
- ✅ Búsqueda + filtro combinados
- ✅ Mensaje "no results"
- ✅ Navegación a post

**Post Page (post-page.spec.ts)** - 10 tests
- ✅ Título y contenido
- ✅ Metadata (fecha, categoría)
- ✅ Tiempo de lectura
- ✅ Botones de compartir
- ✅ Copy to clipboard
- ✅ Tabla de contenidos
- ✅ Comentarios
- ✅ Volver a inicio
- ✅ Markdown rendering
- ✅ Imágenes responsive

**Theme (theme.spec.ts)** - 6 tests
- ✅ Toggle dark/light
- ✅ Persistencia localStorage
- ✅ CSS variables dark mode
- ✅ CSS variables light mode
- ✅ Tema entre páginas
- ✅ Transiciones suaves

#### Panel Admin

**Auth (auth.spec.ts)** - 6 tests
- ✅ Login correcto
- ✅ Login incorrecto
- ✅ Logout
- ✅ Redirección rutas protegidas
- ✅ Persistencia de sesión
- ✅ Acceso a secciones del dashboard

**Post Editor (post-editor.spec.ts)** - 6 tests
- ✅ Crear borrador
- ✅ Publicar post
- ✅ Editar post
- ✅ Eliminar post
- ✅ Validación de campos
- ✅ Preview markdown

### Tests Unitarios (Vitest) - 29 tests ✅

**Posts Library (posts.test.ts)** - 15 tests
- ✅ getAllPosts()
- ✅ getAllPostsIncludingDrafts()
- ✅ getPostBySlug()
- ✅ getPostsBySection()
- ✅ Exclusión de drafts
- ✅ Ordenamiento por fecha
- ✅ Ordenamiento por order
- ✅ Campos requeridos
- ✅ Conversión markdown → HTML

**Utils (utils.test.ts)** - 14 tests
- ✅ calculateReadingTime()
- ✅ formatReadingTime()
- ✅ Edge cases (vacío, espacios)
- ✅ Integración calculate + format

## 📁 Archivos Creados

### Configuración
```
playwright.config.ts
vitest.config.ts
```

### Tests E2E
```
tests/e2e/public/
  ├── homepage.spec.ts
  ├── post-page.spec.ts
  └── theme.spec.ts

tests/e2e/admin/
  ├── auth.spec.ts
  └── post-editor.spec.ts
```

### Tests Unitarios
```
tests/unit/lib/
  ├── posts.test.ts
  └── utils.test.ts
```

### Helpers
```
tests/helpers/
  ├── auth.ts
  └── cleanup.ts
```

### Documentación
```
tests/README.md
TESTING.md (este archivo)
```

## 🎯 Próximos Pasos

### Para comenzar a usar los tests:

1. **Ejecutar tests unitarios:**
   ```bash
   npm run test
   ```
   Deberías ver: ✅ 29 tests passing

2. **Ejecutar tests E2E en UI mode:**
   ```bash
   npm run test:e2e:ui
   ```
   - Se abrirá una interfaz gráfica
   - Podrás ver cada test ejecutándose
   - Útil para entender qué hace cada test

3. **Ejecutar todos los tests:**
   ```bash
   npm run test:all
   ```

### Tests adicionales a considerar (opcional):

- ✨ Tests de secciones (intro, lado-a, lado-b, bonus-track)
- ✨ Tests de comentarios (submit, validation)
- ✨ Tests de settings (cambio de colores)
- ✨ Tests de account (cambio de password)
- ✨ Tests de SEO (RSS, sitemap)

## 🐛 Debugging

### Si un test E2E falla:

```bash
# Ver el test ejecutándose
npm run test:e2e:ui

# Ver trace del último run
npm run test:e2e:report
```

### Si un test unitario falla:

```bash
# Ejecutar solo ese archivo
npm run test -- tests/unit/lib/posts.test.ts

# Con UI
npm run test -- --ui
```

## 📖 Documentación Completa

Ver `tests/README.md` para:
- Guía completa de comandos
- Cómo escribir nuevos tests
- Best practices
- Troubleshooting detallado

## 🎉 Beneficios

Con este sistema de testing puedes:

✅ **Detectar bugs** antes de que lleguen a producción  
✅ **Refactorizar con confianza** - los tests alertan si algo se rompe  
✅ **Documentar comportamiento** - los tests muestran cómo debe funcionar cada feature  
✅ **Integración continua** - listo para CI/CD (GitHub Actions, etc.)  
✅ **Desarrollo más rápido** - menos tiempo debugging manualmente  

---

**Sistema de testing implementado exitosamente! 🚀**

Para cualquier duda, consulta `tests/README.md` o la documentación oficial:
- [Playwright](https://playwright.dev/)
- [Vitest](https://vitest.dev/)
