# Ciudadanía Italiana Uruguay

Sitio que centraliza el trámite de ciudadanía italiana por descendencia para uruguayos: test de
elegibilidad con la ley vigente, seguimiento de los documentos de cada persona de la línea familiar
y guía del trámite desde Uruguay.

Sin backend, sin registro y sin analítica: los datos del expediente quedan en el navegador de quien
lo usa y nunca salen de ahí.

## Cómo funciona

- **`src/`** — lo que se edita.
- **`public/`** — lo que se publica. Se genera solo; no se versiona.
- **`node build.mjs`** — arma las 12 páginas, el sitemap, el robots.txt y la versión de un solo archivo.

Netlify corre ese comando en cada push y publica `public/`, así que alcanza con hacer commit.

La guía completa de mantenimiento está en [LEEME.md](LEEME.md).

## Aviso

No es asesoría legal ni tiene vínculo con el Estado italiano. La información se verifica contra
fuentes oficiales y lleva fecha de verificación a la vista.
