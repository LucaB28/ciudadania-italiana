# Design

Mundo visual: **la modulística del registro civil italiano** (seed 94ee5aff, índice asignado 4). El sitio ES una pratica: papel de formulario oficial, fincature (líneas de rayado) impresas, datos "dactilografiados" en mono, y sellos de goma que caen cuando un documento cambia de estado. El progreso del usuario se lee como se lee un expediente: filas, protocolos, timbres.

## Paleta

- `--carta: #FAF9F3` — papel de formulario (blanco cálido, NO cream editorial)
- `--ink: #1B1A15` — tinta de imprenta (texto, títulos)
- `--muted: #5F5C50` — texto secundario
- `--fincatura: rgba(27,26,21,.16)` / `--fincatura-forte: rgba(27,26,21,.32)` — hairlines 1px del rayado; nunca bordes gruesos
- `--modulo: #4A5A7C` — azul grisáceo del formulario preimpreso (labels de campo, marcos)
- `--timbro: #4B3A8C` — violeta de sello de goma: SOLO estados y acción de estampar
- `--timbro-ok: #2F6B4F` — verde sello para LISTA / verdicto favorable
- `--avviso: #A3352B` — rojo ministerial: solo avisos legales y estados negativos
- Tricolor italiano: filete de 4px (verde/blanco/rojo) con hairlines arriba y abajo, una sola vez por vista (testata)

Estrategia: Restrained — papel + tinta + violeta timbro como único acento activo.

## Tipografía

- UI, títulos, labels de formulario: **Archivo** (Omnibus-Type) — caps con tracking para intestazioni, 400–800.
- Datos, números, entradas "escritas a máquina": **Courier Prime** — todo lo que el usuario u oficina "escribe" sobre el formulario: nombres, estados, protocolos, fechas, montos. Mono = dato mecanografiado, nunca disfraz.

## Gramática de componentes

- Secciones = "moduli" con intestazione: label caps chico en `--modulo` + rule 1px. Sin eyebrows genéricos: el kicker es el número de modulo (MOD. A, ALLEGATO 1) porque el expediente se cita así.
- Filas de documento = renglones de formulario: hairline inferior, nombre en mono, estado como sello.
- Sello (timbro): borde 2px del color de estado, caps mono, leve rotación (−2° a 2°), tinta irregular (opacity/blur mínimo). Al cambiar de estado, animación de estampado: cae con scale 1.35→1 + settle, ease-out expo. Al llegar a LISTA estampa la fecha (dd/mm/aaaa). El sello de verdicto (grande) lleva doble anillo (box-shadow carta + currentColor). El estado final no se pisa con click; solo retrocede con ↩.
- Botones = acciones de oficina: rectángulos con hairline, hover invierte a tinta. CTA de estampar en `--timbro`.
- Cajas de aviso legal: doble filete fino (border 1px + outline 1px offset), título "AVVISO" en `--avviso`. Nunca border-left grueso.
- Progreso de pratica: barra fina tipo regla con marcas; el fill anima con transform scaleX (nunca width).
- Albero genealogico: columna vertical de "schede" (fichas de papel con sombra dura 0 2px), ancestro arriba → vos abajo, conectadas por hairline vertical. Cada ficha: rol en caps azul, nombre en mono, mini-barra de progreso; al completar todos los documentos la ficha vira a verde y recibe timbro COMPLETO estampado. Click en ficha → scroll a la card de la persona + flash de outline (lampeggio).
- Bollettino: lista de novedades fechadas, hairlines entre filas, fecha en mono violeta; timbro chico NUEVO para entradas de ≤60 días. Datos en UPDATES (app.js).
- Índice: barra sticky bajo la testata, enlaces en fila, sección activa subrayada en violeta; en ≤620px se desliza en horizontal con degradado de continuación. `section[id]` lleva scroll-margin-top para que el índice no tape los títulos.
- Prossimo adempimento: cuadro con filete violeta arriba del árbol; agrupa los pendientes por trámite (pedir en DGREC / Corte Electoral / comune, apostillar, traducir, cerrar), no por persona. El primer grupo va en violeta: es la próxima diligencia.
- Tariffario: lista de precios de referencia con guía punteada entre concepto y monto (arancel de oficina pública), precio en mono violeta y chip de bandera según origen. Sin cálculo ni campos editables: solo datos con fuente. En ≤620px se apila y la guía punteada desaparece.
- Glosario: `.termine` con subrayado punteado azul y tooltip en panel LCD oscuro; accesible por hover y por foco de teclado (tabindex 0).
- Tipos de documento: italiano (sin apostilla), uruguayo (apostilla + traducción) y propio (cédula: se lleva, no se tramita) — cada uno con su cadena de estados y su chip de bandera.
- Impresión: `@media print` deja solo el fascículo (diligencia + árbol + documentos) sobre papel blanco, con casilla ☐ delante de cada documento para tildar a mano en el mostrador.

## Movimiento

- UN momento autoral: el estampado del sello al cambiar estado (scale + rotate settle + ink blot). Todo lo demás casi quieto.
- Banderas de escritorio consular (Italia + Uruguay sobre peana, arriba a la derecha del hero): flameo lento 3.4s — rotateY/skewY leve + pliegues viajando por gradiente; la uruguaya desfasada -1.1s para que no vayan sincronizadas. Detrás del texto (z-index 0), se pausa fuera de viewport y con pestaña oculta, apagado con reduced-motion. En ≤600px se retira al aire del encabezado.
- Hero: línea de protocolo se "tipea" con cursor de máquina una sola vez.
- Reveals por scroll: fade + 16px slide, expo ease-out, sin stagger teatral.
- `prefers-reduced-motion`: todo estático, sellos aparecen sin animación.

- Páginas internas: `.pagina-testa` con H1 grande y `.entrada` de bajada en `--muted`; `.tarjetas` como grilla de enlaces separada por hairlines (no cards con sombra); `.lista-simple` con guion mono en `--modulo`; `.modello` para el email de ejemplo (cabecera con etiqueta y cuerpo en mono); `.comparativa` como tabla de hairlines dentro de `.tabla-envoltura` con scroll propio.
- Navegación: la barra sticky pasó de anclas a páginas; la activa lleva subrayado violeta y `aria-current`. El pie repite el mapa completo del sitio.

## Reglas

- Español rioplatense; términos italianos oficiales (pratica, timbro, allegato) solo como sabor, siempre con el significado claro en contexto.
- Contraste ≥4.5:1 en cuerpo; mono chico nunca en `--muted` sobre `--carta` si baja de 4.5.
- Prohibido: gradientes, glass, cards con icono+título+texto como estructura, cream+serif editorial, urgencia artificial, datos legales sin fuente.
