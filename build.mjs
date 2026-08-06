/* Generador del sitio Ciudadanía Italiana Uruguay.
   Uso: node build.mjs   →   deja el sitio listo para publicar en public/
   Para cambiar de dominio, tocá SOLO la constante SITIO. */

import { readFileSync, writeFileSync, mkdirSync, copyFileSync, existsSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const RAIZ = dirname(fileURLToPath(import.meta.url));
const SRC = join(RAIZ, "src");
const OUT = join(RAIZ, "public");

/* El dominio del sitio.
   No hace falta editar este archivo: pasalo como argumento una sola vez y queda guardado.
       node build.mjs https://la-pratica.netlify.app
   Después alcanza con `node build.mjs` y sigue usando el último que le diste. */
const ARCHIVO_DOMINIO = join(RAIZ, "src", "dominio.txt");

const normalizar = (d) => "https://" + d.trim().replace(/^https?:\/\//, "").replace(/\/+$/, "");

const SITIO = (() => {
  const arg = process.argv[2];
  if (arg) {                                  // 1) lo que se pase por línea de comandos
    const limpio = normalizar(arg);
    writeFileSync(ARCHIVO_DOMINIO, limpio, "utf8");
    return limpio;
  }
  if (process.env.URL) return normalizar(process.env.URL);   // 2) en Netlify, la URL real del sitio
  if (existsSync(ARCHIVO_DOMINIO)) return readFileSync(ARCHIVO_DOMINIO, "utf8").trim();   // 3) el último usado acá
  return "https://ciudadania-italiana.netlify.app";          // 4) provisorio
})();
/* Fecha de última verificación de los datos legales.
   Actualizala cuando revises que la información sigue vigente. */
const FECHA_ISO = "2026-08-06";
const FECHA = "06/08/2026";

const { paginas } = await import("./src/paginas.mjs");
const { paginasNuevas } = await import("./src/paginas-nuevas.mjs");
const TODAS = [...paginas, ...paginasNuevas];

mkdirSync(OUT, { recursive: true });
mkdirSync(join(OUT, "fuentes"), { recursive: true });

/* ─────────── secciones heredadas ─────────── */

const secciones = (() => {
  const html = readFileSync(join(SRC, "secciones.html"), "utf8");
  const mapa = {};
  for (const bloque of html.match(/<section\b[^>]*>[\s\S]*?<\/section>/g) || []) {
    const abre = bloque.match(/<section\b[^>]*>/)[0];
    const id = abre.match(/id="([^"]+)"/)?.[1];
    const etiqueta = abre.match(/aria-labelledby="([^"]+)"/)?.[1];
    if (id) mapa[id] = bloque;
    else if (/class="hero"/.test(abre)) mapa.hero = bloque;
    else if (etiqueta === "come-titolo") mapa.istruzioni = bloque;
    else if (etiqueta === "avviso-titolo") mapa["avviso-ley"] = bloque;
  }
  return mapa;
})();

/* ─────────── datos: escenarios y novedades ─────────── */

const datos = JSON.parse(readFileSync(join(SRC, "datos.json"), "utf8"));

const escape = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const escenariosHTML = Object.entries(datos.verdictos).map(([clave, v]) => `
  <details class="scenario" id="escenario-${clave}">
    <summary>
      <span class="timbro ${v.cls}">${escape(v.txt)}</span>
      <span class="scenario-capo">${escape(v.capo)}</span>
    </summary>
    <p>${escape(v.detalle)}</p>
  </details>`).join("\n");

const DIAS60 = 60 * 864e5;
const filaNovedad = (n) => {
  const nuevo = n.fecha && (Date.now() - new Date(n.fecha).getTime()) < DIAS60;
  return `      <div class="boll-riga"${n.fecha ? ` data-fecha="${n.fecha}"` : ""}>
        <div class="boll-testa">
          <span class="mono boll-fecha">${escape(n.label)}</span>${nuevo ? `
          <span class="timbro timbro-obtenida timbro-inline">NUEVO</span>` : ""}
        </div>
        <p class="boll-testo">${escape(n.texto)}</p>
      </div>`;
};

/* las tres novedades más nuevas quedan a la vista; el resto, en un desplegable */
const novedadesHTML = datos.novedades.slice(0, 3).map(filaNovedad).join("\n") +
  (datos.novedades.length > 3 ? `
      <details class="mas">
        <summary>Ver el historial completo (${datos.novedades.length - 3} más)</summary>
        <div class="boll-historial">
${datos.novedades.slice(3).map(filaNovedad).join("\n")}
        </div>
      </details>` : "");

writeFileSync(join(OUT, "datos.js"),
  "/* generado por build.mjs — no editar a mano; la fuente es src/datos.json */\n" +
  "window.PRATICA = " + JSON.stringify({ verdictos: datos.verdictos }) + ";\n", "utf8");

/* ─────────── schema.org ─────────── */

const editor = {
  "@type": "Organization",
  "@id": SITIO + "/#editor",
  name: "Ciudadanía Italiana Uruguay",
  url: SITIO + "/",
  logo: SITIO + "/og.png",
  email: "lucaban28@hotmail.com",
  areaServed: { "@type": "Country", name: "Uruguay" }
};

/* Quién escribe: señal de confianza para Google y para los asistentes de IA,
   que cada vez miran más si hay una persona identificable detrás. */
const autor = {
  "@type": "Person",
  "@id": SITIO + "/#autor",
  name: "Luca",
  email: "lucaban28@hotmail.com",
  url: SITIO + "/",
  nationality: { "@type": "Country", name: "Uruguay" },
  description: "Uruguayo descendiente de italianos. Ordena y verifica la información del trámite; no es abogado ni gestor."
};

const sinEtiquetas = (s) => s.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();

function faqDesde(html) {
  const items = [...html.matchAll(/<summary>([\s\S]*?)<\/summary>[\s\S]*?<div class="quesito-risposta">([\s\S]*?)<\/div>/g)];
  if (!items.length) return null;
  return {
    "@type": "FAQPage",
    mainEntity: items.map(([, q, a]) => ({
      "@type": "Question",
      name: sinEtiquetas(q),
      acceptedAnswer: { "@type": "Answer", text: sinEtiquetas(a) }
    }))
  };
}

function howToDesde(html, pagina) {
  const pasos = [...html.matchAll(/<li class="passo">\s*<h3>([\s\S]*?)<\/h3>([\s\S]*?)<\/li>/g)];
  if (!pasos.length) return null;
  return {
    "@type": "HowTo",
    name: pagina.title,
    description: pagina.description,
    totalTime: "P6M",
    step: pasos.map(([, nombre, cuerpo], i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: sinEtiquetas(nombre),
      text: sinEtiquetas(cuerpo).slice(0, 500)
    }))
  };
}

function schemaDe(pagina, html, url) {
  const grafo = [];

  if (pagina.tipo === "inicio") {
    grafo.push({
      "@type": "WebSite", "@id": SITIO + "/#sitio", url: SITIO + "/",
      name: "Ciudadanía Italiana Uruguay", inLanguage: "es-UY",
      publisher: editor, author: autor,
      description: pagina.description
    });
    grafo.push({
      "@type": "WebApplication",
      name: "Tracker de ciudadanía italiana",
      url, applicationCategory: "UtilitiesApplication",
      operatingSystem: "Cualquiera con navegador",
      inLanguage: "es-UY",
      offers: { "@type": "Offer", price: "0", priceCurrency: "UYU" },
      featureList: [
        "Test de elegibilidad según la Ley 74/2025",
        "Tracker de documentos con estados de apostilla y traducción",
        "Árbol genealógico de la línea de transmisión",
        "Guía del trámite desde Uruguay"
      ]
    });
  } else {
    grafo.push({
      "@type": "Article", "@id": url + "#articulo", url,
      headline: pagina.title.slice(0, 110),
      description: pagina.description,
      inLanguage: "es-UY",
      datePublished: FECHA_ISO, dateModified: FECHA_ISO,
      author: autor, publisher: editor,
      isPartOf: { "@id": SITIO + "/#sitio" }
    });
    grafo.push({
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Inicio", item: SITIO + "/" },
        { "@type": "ListItem", position: 2, name: pagina.nav || sinEtiquetas(pagina.h1 || pagina.title), item: url }
      ]
    });
  }

  const faq = faqDesde(html);
  if (faq) grafo.push(faq);
  const howto = pagina.tipo === "howto" ? howToDesde(html, pagina) : null;
  if (howto) grafo.push(howto);

  return JSON.stringify({ "@context": "https://schema.org", "@graph": grafo });
}

/* ─────────── composición ─────────── */

const layout = readFileSync(join(SRC, "layout.html"), "utf8");
const archivo = (slug) => slug === "index" ? "index.html" : slug + ".html";
const urlDe = (slug) => slug === "index" ? SITIO + "/" : SITIO + "/" + slug + ".html";

const nav = (activo) => TODAS.filter(p => p.nav).map(p =>
  `    <a href="${archivo(p.slug)}" data-sez="${p.slug}"${p.slug === activo ? ' class="attivo" aria-current="page"' : ""}>${p.nav}</a>`
).join("\n");

/* el mapa completo va solo en la portada: en el resto ya está el índice de arriba */
const mapa = (slug) => slug !== "index" ? "" :
  `  <nav class="mappa" aria-label="Todas las páginas">
    <span class="etichetta">TODAS LAS PÁGINAS</span>
    <ul>
` + TODAS.map(p =>
  `      <li><a href="${archivo(p.slug)}">${p.nav || sinEtiquetas(p.h1 || p.title)}</a></li>`
).join("\n") + `
    </ul>
  </nav>`;

let generadas = 0;
for (const pagina of TODAS) {
  let contenido = pagina.content
    .replace(/\{\{SECCION:([a-z0-9-]+)\}\}/g, (_, id) => {
      if (!secciones[id]) throw new Error("Falta la sección «" + id + "» en secciones.html");
      let s = secciones[id];
      if (pagina.quitarH2) s = s.replace(/\s*<h2[^>]*>[\s\S]*?<\/h2>/, "");
      // dentro de un paso numerado, el encabezado propio de la sección sobra
      if (pagina.sinIntestazione) s = s.replace(/\s*<div class="modulo-intestazione">[\s\S]*?<\/div>/, "");
      return s;
    })
    .replace("{{ESCENARIOS}}", escenariosHTML);

  if (pagina.slug === "ley-74-2025") {
    contenido = contenido.replace('<div id="bollettino-lista"></div>',
      '<div id="bollettino-lista">\n' + novedadesHTML + "\n    </div>");
  }

  if (pagina.h1) {
    contenido = `<header class="pagina-testa">\n  <h1>${pagina.h1}</h1>\n</header>\n` + contenido;
  } else if (pagina.promover) {
    contenido = contenido.replace(/<h2( [^>]*)?>([\s\S]*?)<\/h2>/, "<h1$1>$2</h1>");
  }

  const url = urlDe(pagina.slug);
  const html = layout
    .replace(/\{\{TITLE\}\}/g, pagina.title)
    .replace(/\{\{DESCRIPTION\}\}/g, pagina.description)
    .replace(/\{\{OG_TITLE\}\}/g, pagina.ogTitle || pagina.title)
    .replace(/\{\{OG_TYPE\}\}/g, pagina.tipo === "inicio" ? "website" : "article")
    .replace(/\{\{CANONICAL\}\}/g, url)
    .replace(/\{\{SITIO\}\}/g, SITIO)
    .replace(/\{\{FECHA_ISO\}\}/g, FECHA_ISO)
    .replace(/\{\{FECHA\}\}/g, FECHA)
    .replace("{{NAV}}", nav(pagina.slug))
    .replace("{{MAPA}}", mapa(pagina.slug))
    .replace("{{CONTENT}}", contenido)
    .replace("{{SCHEMA}}", schemaDe(pagina, contenido, url));

  writeFileSync(join(OUT, archivo(pagina.slug)), html, "utf8");
  generadas++;
}

/* ─────────── fuentes autoalojadas ─────────── */

const cssGoogle = "https://fonts.googleapis.com/css2?family=Archivo:wght@400..800&family=Courier+Prime:wght@400;700&display=swap";
const UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36";

let fuentesCss = "", fuentesInline = "";
{
  const cacheCss = join(SRC, "fonts", "google.css");
  if (!existsSync(cacheCss)) {
    const r = await fetch(cssGoogle, { headers: { "User-Agent": UA } });
    writeFileSync(cacheCss, await r.text(), "utf8");
  }
  const gf = readFileSync(cacheCss, "utf8");
  const bloques = (gf.split("@font-face").slice(1)).map(b => "@font-face" + b.split("}")[0] + "}");
  const latinos = bloques.filter(b => /unicode-range:[^;]*U\+0000-00FF/.test(b));

  for (const bloque of latinos) {
    const url = bloque.match(/url\((https:[^)]+)\)/)[1];
    const nombre = url.split("/").pop();
    const destino = join(SRC, "fonts", nombre);
    if (!existsSync(destino)) {
      const bin = Buffer.from(await (await fetch(url)).arrayBuffer());
      writeFileSync(destino, bin);
    }
    copyFileSync(destino, join(OUT, "fuentes", nombre));
    fuentesCss += bloque.replace(/url\(https:[^)]+\)/, `url(fuentes/${nombre})`) + "\n";
    fuentesInline += bloque.replace(/url\(https:[^)]+\)/,
      `url(data:font/woff2;base64,${readFileSync(destino).toString("base64")})`) + "\n";
  }
  writeFileSync(join(OUT, "fuentes.css"), fuentesCss, "utf8");
}

/* ─────────── estáticos, sitemap y robots ─────────── */

for (const f of ["styles.css", "app.js", "og.png"]) copyFileSync(join(SRC, f), join(OUT, f));

/* archivos sueltos que hay que servir tal cual: verificación de Search Console,
   cabeceras de seguridad de Netlify, etc. */
for (const f of readdirSync(SRC).filter(n => /^google[0-9a-f]+\.html$/.test(n) || n === "_headers")) {
  copyFileSync(join(SRC, f), join(OUT, f));
}

writeFileSync(join(OUT, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  TODAS.map(p => `  <url>\n    <loc>${urlDe(p.slug)}</loc>\n    <lastmod>${FECHA_ISO}</lastmod>\n` +
    `    <changefreq>${p.slug === "ley-74-2025" ? "weekly" : "monthly"}</changefreq>\n` +
    `    <priority>${p.slug === "index" ? "1.0" : p.nav ? "0.8" : "0.6"}</priority>\n  </url>`).join("\n") +
  `\n</urlset>\n`, "utf8");

/* Los asistentes de IA son un canal real para este tema: mucha gente pregunta
   «¿me corresponde la ciudadanía italiana?» en un chat antes que en Google.
   Se los deja entrar a propósito, para poder ser la fuente citada. */
writeFileSync(join(OUT, "robots.txt"),
  `User-agent: *\nAllow: /\n\n` +
  ["GPTBot", "OAI-SearchBot", "ChatGPT-User", "ClaudeBot", "Claude-User",
   "PerplexityBot", "Google-Extended", "Applebot-Extended"]
    .map(b => `User-agent: ${b}\nAllow: /\n`).join("\n") +
  `\nSitemap: ${SITIO}/sitemap.xml\n`, "utf8");

/* ─────────── versión de un solo archivo, para mandar por WhatsApp ─────────── */

{
  const inicio = readFileSync(join(OUT, "index.html"), "utf8");
  const css = readFileSync(join(SRC, "styles.css"), "utf8");
  const js = readFileSync(join(SRC, "app.js"), "utf8");
  const dat = readFileSync(join(OUT, "datos.js"), "utf8");

  const unico = inicio
    .replace('<link rel="stylesheet" href="fuentes.css">', `<style>\n${fuentesInline}\n</style>`)
    .replace('<link rel="stylesheet" href="styles.css">', `<style>\n${css}\n</style>`)
    .replace('<script src="datos.js"></script>', `<script>\n${dat}\n</script>`)
    .replace('<script src="app.js"></script>', `<script>\n${js}\n</script>`)
    // en el archivo suelto no hay otras páginas: los enlaces internos vuelven al sitio publicado
    .replace(/href="((?!http|#|data:)[a-z0-9-]+\.html)/g, `href="${SITIO}/$1`);

  writeFileSync(join(RAIZ, "compartir.html"), unico, "utf8");
  writeFileSync(join(RAIZ, "la-pratica-uruguay.html"), unico, "utf8");
}

const kb = (f) => Math.round(readFileSync(join(OUT, f)).length / 1024) + " KB";
console.log(`✓ ${generadas} páginas en public/`);
console.log("  " + readdirSync(OUT).join("  "));
console.log("  index.html " + kb("index.html") + " · compartir.html " +
  Math.round(readFileSync(join(RAIZ, "compartir.html")).length / 1024) + " KB");
console.log("  dominio configurado: " + SITIO +
  (existsSync(ARCHIVO_DOMINIO) ? "" : "  (provisorio — pasá tu URL como argumento cuando publiques)"));
