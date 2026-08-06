# Ciudadanía Italiana Uruguay — cómo trabajar con el sitio

## Lo importante en 30 segundos

- **Lo que se publica está en `public/`.** Esa carpeta se genera sola: no edites nada ahí adentro.
- **Lo que se edita está en `src/`.**
- Después de cualquier cambio, corré el generador:

```bash
node ciudadania-italiana/build.mjs
```

## Publicar

1. Entrá a [app.netlify.com/drop](https://app.netlify.com/drop)
2. Arrastrá **la carpeta `public/`** (no la carpeta del proyecto entera)
3. Te devuelve una URL pública

**Apenas tengas la URL definitiva**, corré el generador pasándosela una sola vez:

```bash
node ciudadania-italiana/build.mjs la-pratica.netlify.app
```

Eso actualiza de una sola vez el canonical, las etiquetas para compartir, el sitemap y el robots.txt de las 11 páginas, y **deja el dominio guardado** en `src/dominio.txt`. De ahí en más alcanza con `node ciudadania-italiana/build.mjs` a secas. Después subí de nuevo la carpeta `public/`.

No importa si pegás la URL con `https://` o sin, con barra al final o sin: el generador la normaliza.

Después, en [Google Search Console](https://search.google.com/search-console): verificá el dominio y mandá `https://tudominio/sitemap.xml`. Sin eso no hay forma de saber cómo va el posicionamiento.

## Dónde se edita cada cosa

| Querés cambiar | Archivo |
|---|---|
| Una novedad legal o un texto del test | `src/datos.json` |
| El contenido de las páginas que ya existían | `src/secciones.html` |
| Los textos y metadatos de cada página | `src/paginas.mjs` y `src/paginas-nuevas.mjs` |
| Estilos | `src/styles.css` |
| Comportamiento (test, fascículo, árbol) | `src/app.js` |
| Cabecera, pie, etiquetas del `<head>` | `src/layout.html` |
| La imagen que se ve al compartir | `src/og-image.ps1` → genera `src/og.png` |

`src/datos.json` es fuente única: de ahí salen tanto los seis escenarios que se ven en la página de la ley como los textos que usa el test interactivo. Cambiás una vez y quedan sincronizados.

## Agregar una novedad al bollettino

Metela primera en el array `novedades` de `src/datos.json`:

```json
{ "fecha": "2026-09-15", "label": "15/09/2026", "texto": "Lo que pasó." }
```

Corré el generador. El sello **NUEVO** aparece solo durante 60 días desde esa fecha.

## Agregar una página

Sumá un objeto al array de `src/paginas-nuevas.mjs`:

```js
{
  slug: "mi-pagina",              // será mi-pagina.html
  nav: "Etiqueta",                 // o null si no va en el menú
  title: "…",                      // hasta 60 caracteres
  description: "…",                // hasta 155 caracteres
  ogTitle: "…",
  tipo: "articulo",
  h1: "…",
  content: `<p class="entrada">…</p> …`
}
```

Sitemap, menú, mapa del pie, breadcrumbs y datos estructurados se generan solos.

## Qué genera automáticamente el build

- Las 11 páginas HTML con canonical, Open Graph y Twitter Card
- Datos estructurados por página: `Article`, `BreadcrumbList`, `FAQPage` (leído de las preguntas reales) y `HowTo` (leído de los pasos reales)
- `sitemap.xml` y `robots.txt`
- Las tipografías autoalojadas en `public/fuentes/` (se descargan una vez y quedan en caché en `src/fonts/`)
- `compartir.html` en la raíz: el sitio en un solo archivo, con todo embebido, para mandar por WhatsApp

## Archivos que no se publican

`src/`, `build.mjs`, este LEEME, `PRODUCT.md` y `DESIGN.md` son de trabajo. Si arrastrás solo `public/` a Netlify, no se suben.
