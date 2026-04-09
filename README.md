# Diario de Evasión

Blog personal moderno y elegante construido con Next.js 14, TypeScript y Tailwind CSS.

## ✨ Características Principales

### 🎨 Diseño y UX
- ✅ **Tema oscuro/claro** - Toggle con persistencia en localStorage
- ✅ **Diseño responsive** - Perfecto en móvil, tablet y desktop
- ✅ **Tipografía elegante** - Libre Baskerville + Lora optimizada para lectura
- ✅ **Transiciones suaves** - Microinteracciones pulidas
- ✅ **Modo lectura optimizado** - Espaciado y legibilidad profesional

### 📝 Funcionalidades de Contenido
- ✅ **Sistema de posts en Markdown** - Escribe en formato sencillo
- ✅ **Búsqueda en tiempo real** - Busca por título, contenido o extracto
- ✅ **Filtrado por categorías** - Organiza y filtra posts fácilmente
- ✅ **Tiempo de lectura** - Cálculo automático para cada post
- ✅ **Tabla de contenidos** - Navegación automática en posts largos
- ✅ **Imágenes SVG vectoriales** - Alta calidad, escalables

### 🔗 Social y Compartir
- ✅ **Botones para compartir** - Twitter, Facebook, WhatsApp, copiar enlace
- ✅ **Comentarios con Giscus** - Sistema de comentarios basado en GitHub Discussions
- ✅ **RSS Feed** - Suscripción para lectores RSS
- ✅ **Open Graph tags** - Vista previa perfecta en redes sociales

### 🚀 SEO y Performance
- ✅ **SEO optimizado** - Meta tags, Open Graph, Twitter Cards
- ✅ **Sitemap XML** - Para mejor indexación en buscadores
- ✅ **robots.txt** - Configuración para crawlers
- ✅ **Lazy loading** - Carga optimizada de imágenes
- ✅ **Compresión automática** - Assets optimizados
- ✅ **Cache headers** - Mejor performance

### 🔐 Panel de Administración
- ✅ **Autenticación segura** - Login protegido con contraseña
- ✅ **Editor de posts** - Markdown con preview en tiempo real
- ✅ **Sistema de secciones** - INTRO, LADO A, LADO B, BONUS TRACK
- ✅ **Ordenamiento de posts** - Control total del orden en cada sección
- ✅ **Gestión de colores** - Cambia los colores del tema (oscuro y claro)
- ✅ **Borradores** - Guarda posts sin publicar
- ✅ **Dashboard intuitivo** - Gestión fácil de todo el contenido

## 🚀 Comenzar

### 1. Instalar dependencias

```bash
npm install
```

### 2. Ejecutar el servidor de desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

### 3. Acceder al Panel de Administración

**URL:** [http://localhost:3000/admin/login](http://localhost:3000/admin/login)

**Credenciales por defecto:**
- Usuario: `admin`
- Contraseña: `admin123`

⚠️ **IMPORTANTE:** Cambia las credenciales en `.env.local` antes de deployar:

```env
ADMIN_USERNAME=tu_usuario
ADMIN_PASSWORD=tu_contraseña_segura
```

📖 **Guía completa del panel:** Lee [ADMIN_GUIDE.md](ADMIN_GUIDE.md)

### 4. Crear nuevos posts

#### Opción A: Panel de Administración (Recomendado)

1. Ve a [http://localhost:3000/admin](http://localhost:3000/admin)
2. Click en "Nuevo Post"
3. Completa el formulario:
   - Título
   - Contenido (Markdown)
   - Sección (INTRO, LADO A, LADO B, BONUS TRACK)
   - Orden (posición en la sección)
4. Click "Publicar" o "Guardar Borrador"

#### Opción B: Manual (Archivos Markdown)

Crea archivos en `content/posts/`:

```markdown
---
title: "TÍTULO DEL POST"
date: "2026-04-09"
excerpt: "Descripción breve"
category: "Categoría"
section: "lado-a"
order: 1
draft: false
---

![Imagen destacada](/images/imagen.svg)

# Contenido del post

Tu contenido aquí...
```

## 📁 Estructura del Proyecto

```
diario-evasion/
├── app/
│   ├── layout.tsx              # Layout con ThemeProvider
│   ├── page.tsx                # Página principal
│   ├── posts/[slug]/           # Páginas dinámicas de posts
│   ├── rss.xml/                # Feed RSS
│   ├── sitemap.xml/            # Sitemap
│   └── globals.css             # Estilos globales + dark/light mode
├── components/
│   ├── ThemeProvider.tsx       # Context para tema
│   ├── ThemeToggle.tsx         # Botón de cambio de tema
│   ├── LayoutContent.tsx       # Layout principal del sitio
│   ├── SearchBar.tsx           # Barra de búsqueda
│   ├── PostsList.tsx           # Lista con búsqueda y filtros
│   ├── PostCard.tsx            # Tarjeta de post individual
│   ├── PostContent.tsx         # Contenido completo del post
│   ├── ShareButtons.tsx        # Botones para compartir
│   ├── Comments.tsx            # Sistema de comentarios
│   └── TableOfContents.tsx     # Tabla de contenidos automática
├── content/
│   └── posts/                  # Posts en Markdown
├── lib/
│   ├── posts.ts                # Funciones para leer posts
│   └── utils.ts                # Utilidades (tiempo de lectura, etc)
├── public/
│   ├── images/                 # Imágenes del blog
│   └── robots.txt              # Configuración para crawlers
└── MEJORAS.md                  # Documento con ideas y mejoras
```

## ⚙️ Configuración

### Comentarios (Giscus)

1. Ve a [giscus.app](https://giscus.app)
2. Habilita Discussions en tu repositorio de GitHub
3. Obtén tu repo ID y category ID
4. Actualiza `components/Comments.tsx` con tus datos:

```typescript
script.setAttribute('data-repo', 'tu-usuario/tu-repo');
script.setAttribute('data-repo-id', 'TU_REPO_ID');
script.setAttribute('data-category-id', 'TU_CATEGORY_ID');
```

### URL del Sitio

Actualiza la URL en estos archivos antes de deployar:

- `app/rss.xml/route.ts` - Cambia `siteUrl`
- `app/sitemap.xml/route.ts` - Cambia `siteUrl`
- `public/robots.txt` - Cambia la URL del sitemap

## 🎨 Personalización

### Colores

Edita `app/globals.css` para cambiar los colores:

```css
:root {
  --background: #2b2b2b;
  --foreground: #e8e8e8;
  --sidebar-bg: #1f1f1f;
  --card-bg: #333333;
  --border-color: #4a4a4a;
  --accent-orange: #ff6b35;
}

.light {
  --background: #f5f5f5;
  --foreground: #1a1a1a;
  /* ... */
}
```

### Tipografía

Las fuentes se cargan desde Google Fonts en `globals.css`:
- **Libre Baskerville** - Títulos
- **Lora** - Cuerpo de texto

Para cambiar, modifica el `@import` y las propiedades `font-family`.

## 🌐 Deploy en Vercel

1. Sube el proyecto a GitHub
2. Ve a [vercel.com](https://vercel.com)
3. Importa tu repositorio
4. Deploy automático ✨

Vercel detectará Next.js automáticamente y configurará todo.

## 📊 Analytics (Opcional)

Para agregar analytics, puedes usar:
- **Vercel Analytics** - Integración nativa
- **Google Analytics** - Agregar script en `layout.tsx`
- **Plausible** - Privacy-friendly

## 🛠️ Comandos Útiles

```bash
# Desarrollo
npm run dev

# Desarrollo (limpiando caché primero)
npm run dev:clean

# Build para producción
npm run build

# Preview del build
npm start

# Linting
npm run lint

# Limpiar caché de Next.js
npm run clean

# Limpiar todo (caché + tests)
npm run clean:all
```

### 🔧 Solución de Problemas de Caché

Si los cambios no se reflejan en el navegador:

**Windows:**
```cmd
restart-fresh.bat
```

**Cualquier OS:**
```bash
npm run dev:clean
```

Ver [CACHE-TROUBLESHOOTING.md](CACHE-TROUBLESHOOTING.md) para más detalles.

## 📝 Categorías Sugeridas

- Libros
- Música
- Viajes
- Reflexiones
- Fotografía
- Cine

## 🔧 Tecnologías

- [Next.js 14](https://nextjs.org/) - Framework React
- [TypeScript](https://www.typescriptlang.org/) - Tipado estático
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
- [date-fns](https://date-fns.org/) - Manejo de fechas
- [gray-matter](https://github.com/jonschlinkert/gray-matter) - Parser de frontmatter
- [Giscus](https://giscus.app) - Comentarios

## 📄 Licencia

MIT

---

Hecho con ❤️ y código limpio por Nico Dalmasso
