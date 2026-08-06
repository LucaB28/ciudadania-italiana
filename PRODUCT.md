# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Descendientes de italianos en Uruguay (luego Brasil) que quieren la ciudadanía por descendencia. Hoy preguntan en Reddit/Facebook y nadie les dice qué documentos les faltan, qué hay que apostillar o traducir, ni cómo los afecta la reforma de 2025. No son abogados; necesitan claridad y orden.

## Product Purpose

Sitio que centraliza y ordena el trámite de ciudadanía italiana por descendencia: (1) test de elegibilidad bajo la Ley 74/2025, (2) tracker de documentos por ancestro con estados (falta → obtenida → apostillada → traducida → lista), (3) guía Uruguay con pasos, costos y links oficiales. Éxito = la persona sabe exactamente qué le falta.

## Positioning

El expediente ("pratica") que el consulado nunca te arma. Orden y verdad legal actualizada, sin humo ni promesas de gestor.

## Capabilities and Constraints

- Sitio estático de 11 páginas generado con `build.mjs` desde `src/`; se publica `public/`. Vanilla HTML/CSS/JS, sin backend. Estado en localStorage, export/import JSON.
- Arquitectura SEO: una página por tema (ley, documentos, costos, turnos, preguntas, acta del comune, caso 1948, minor issue, vías, después del reconocimiento) más la portada, que aloja la herramienta (test + fascículo + árbol).
- Español rioplatense. Versión Uruguay primero; Brasil después (arquitectura preparada por país).
- Contenido legal verificado a jul-2026: DL 36/2025 (27/3/2025), Ley 74/2025 (24/5/2025), sentencia 142/2025, Corte Constitucional 12/3/2026 rechaza planteos, ordinanza 147/2026 eleva cuestión al TJUE (pendiente).
- No es asesoría legal: disclaimer obligatorio. Nunca inventar plazos, precios ni resultados; solo datos con fuente.

## Brand Commitments

Nombre de trabajo: "Ciudadanía Italiana Uruguay". Sin logo previo.

## Evidence on Hand

Fuentes públicas: Embajada de Italia en Montevideo (ambmontevideo.esteri.it), tasa consular €600, Prenot@Mi, apostilla MRREE Uruguay, prensa especializada (La Nación, Italo Tribu, InfoCivitano).

## Product Principles

- Decir la verdad legal aunque duela (mucha gente quedó fuera con la Ley 74/2025).
- Cada documento con su estado visible; el progreso es el producto.
- Claridad sobre completitud: mejor 10 datos exactos que 50 vagos.
- Nada de urgencia artificial ni venta de gestión.
