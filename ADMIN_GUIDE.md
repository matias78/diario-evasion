# 🔐 Guía del Panel de Administración

## Acceso al Panel

**URL:** `http://localhost:3000/admin/login` (o tu dominio/admin/login en producción)

**Credenciales por defecto:**
- Usuario: `admin`
- Contraseña: `admin123`

⚠️ **IMPORTANTE:** Cambia estas credenciales en producción editando el archivo `.env.local`:

```env
ADMIN_USERNAME=tu_usuario
ADMIN_PASSWORD=tu_contraseña_segura
```

---

## Dashboard Principal

Una vez autenticado, verás:

- **Lista de todos los posts** (publicados y borradores)
- **Botón "Nuevo Post"** para crear contenido
- **Acciones** en cada post:
  - **Editar** - Modificar el post
  - **Eliminar** - Borrar permanentemente

---

## Crear/Editar Posts

### Campos Principales:

1. **Título**
   - El título del post en MAYÚSCULAS o como prefieras
   - Ejemplo: "LADO A: Los años borrados"

2. **Contenido**
   - Editor de Markdown con dos pestañas:
     - **Editor**: Escribe en Markdown
     - **Preview**: Ve cómo se verá el post

3. **Extracto**
   - Breve descripción que aparece en listados
   - 1-2 oraciones recomendadas

### Configuración Lateral:

4. **Categoría**
   - Texto libre: Libros, Música, Viajes, etc.

5. **Sección** ⭐ IMPORTANTE
   - Elige dónde aparecerá el post:
     - **INTRO**: Página de introducción
     - **LADO A**: Los años borrados
     - **LADO B**: De otras vidas que la mía
     - **BONUS TRACK**: Canciones perdidas
     - **Sin sección**: Solo aparece en inicio

6. **Orden**
   - Número que define el orden dentro de la sección
   - **Menor número = aparece primero**
   - Ejemplo: Post con orden 1 aparece antes que orden 2

### Acciones:

- **Guardar Borrador**: Guarda sin publicar (no visible públicamente)
- **Publicar**: Guarda y hace visible el post

---

## Sistema de Secciones

### Cómo funciona:

Cuando publicas una entrada, la puedes asignar a una sección específica:

```
INICIO (/)
├── Muestra posts recientes de todas las secciones
│
INTRO (/section/intro)
├── Posts de introducción/presentación
│
LADO A (/section/lado-a)
├── Post orden 1
├── Post orden 2
└── Post orden 3
│
LADO B (/section/lado-b)
├── Post orden 1
└── Post orden 2
│
BONUS TRACK (/section/bonus-track)
└── Posts bonus
```

### Ejemplo Práctico:

**Crear un post en LADO A:**

1. Click "Nuevo Post"
2. Título: "Primera reflexión sobre los vinilos"
3. Contenido: (escribe tu texto)
4. Sección: **LADO A**
5. Orden: **1** (será el primero en LADO A)
6. Click "Publicar"

✅ Ahora el post aparecerá:
- En la página de inicio (como reciente)
- En `/section/lado-a` (primera posición)
- Al hacer click en "LADO A" en el sidebar

---

## Configuración de Colores

### Acceso:
Dashboard → Botón "Configuración"

### Personalización:

Puedes cambiar todos los colores del blog:

**Tema Oscuro:**
- Fondo Principal
- Color de Texto
- Fondo Sidebar
- Fondo Tarjetas
- Color Bordes
- Color Acento (naranja)

**Tema Claro:**
- Los mismos colores para modo claro

### Cómo usar:

1. Click en el selector de color o escribe el código HEX
2. Ajusta todos los colores que quieras
3. Click "Guardar Cambios"
4. ✨ La página se recarga y aplica los nuevos colores

---

## Markdown - Guía Rápida

### Títulos:
```markdown
# Título 1
## Título 2
### Título 3
```

### Formato de Texto:
```markdown
**negrita**
*cursiva*
***negrita y cursiva***
```

### Enlaces:
```markdown
[Texto del enlace](https://url.com)
```

### Imágenes:
```markdown
![Texto alternativo](/images/nombre-imagen.svg)
```

### Listas:
```markdown
- Item 1
- Item 2
- Item 3

1. Primero
2. Segundo
3. Tercero
```

### Citas:
```markdown
> Esta es una cita
>
> **Autor**
```

### Separador:
```markdown
---
```

---

## Gestión de Imágenes

### Subir Imágenes:

1. Coloca tus imágenes en `/public/images/`
2. Usa en el post: `![Descripción](/images/nombre.jpg)`

### Formatos Recomendados:

- **SVG** - Para ilustraciones (escalables, perfectas)
- **JPG** - Para fotos
- **PNG** - Para imágenes con transparencia

### Ejemplo:

```markdown
![Vinilo naranja](/images/vinilo-naranja.svg)

![Tocadiscos](/images/tocadiscos.svg)
```

---

## Workflow Recomendado

### Para crear una nueva entrada:

1. **Planificar**
   - Decidir a qué sección pertenece
   - Definir el orden dentro de la sección

2. **Crear**
   - Dashboard → "Nuevo Post"
   - Escribir título y contenido
   - Asignar sección y orden

3. **Borrador**
   - "Guardar Borrador" para revisarlo después
   - No será visible públicamente

4. **Revisar**
   - Usar la pestaña "Preview" para ver cómo se ve
   - Editar si es necesario

5. **Publicar**
   - Click "Publicar"
   - ✅ Visible inmediatamente

---

## Ordenar Posts en Secciones

### Cambiar el orden:

1. Edita el post
2. Cambia el número en "Orden"
3. Guarda

**Ejemplo:**

Si tienes en LADO A:
- Post A (orden: 1)
- Post B (orden: 2)
- Post C (orden: 3)

Y quieres que Post C sea el primero:
- Edita Post C
- Cambia orden a: 0
- Ahora aparece primero

---

## Seguridad

### Cambiar Credenciales:

1. Edita `.env.local`:

```env
ADMIN_USERNAME=nico
ADMIN_PASSWORD=miPasswordSuperSeguro123!
```

2. Reinicia el servidor:

```bash
npm run dev
```

### En Producción:

En Vercel/Netlify, agrega las variables de entorno en el panel:
- `ADMIN_USERNAME`
- `ADMIN_PASSWORD`

⚠️ **Nunca** subas `.env.local` a GitHub

---

## Solución de Problemas

### No puedo iniciar sesión:

- Verifica las credenciales en `.env.local`
- Reinicia el servidor después de cambiarlas

### Los cambios no se ven:

- Recarga la página (Ctrl+F5)
- Verifica que el post no esté como "Borrador"

### Error al guardar post:

- Verifica que el título no tenga caracteres especiales
- Asegúrate de que no exista un post con el mismo nombre

### Las imágenes no cargan:

- Verifica que estén en `/public/images/`
- Usa rutas `/images/nombre.jpg` (no `./images/`)

---

## Atajos de Teclado

(En el editor de posts)

- **Ctrl + S** - Guardar borrador (próximamente)
- **Tab** - Indentar en el editor

---

## Tips y Mejores Prácticas

### ✅ Recomendado:

- Usa nombres descriptivos para las imágenes
- Escribe extractos atractivos (aparecen en inicio)
- Asigna siempre una sección a los posts
- Usa orden secuencial (1, 2, 3...)

### ❌ Evitar:

- Títulos muy largos
- Posts sin extracto
- Imágenes muy pesadas (>1MB)
- Orden aleatorio sin sentido

---

## Próximas Mejoras

(Funcionalidades planeadas)

- [ ] Upload de imágenes desde el editor
- [ ] Drag & drop para reordenar posts
- [ ] Historial de versiones
- [ ] Programar publicaciones
- [ ] Multi-usuario con roles
- [ ] Editor WYSIWYG (visual)

---

¿Dudas? Revisa este documento o contacta al desarrollador.
