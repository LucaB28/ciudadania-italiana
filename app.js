/* La Pratica — tracker de ciudadanía italiana (Uruguay) */
(function () {
  "use strict";

  const KEY = "pratica-uy-v1";
  const REDUCED = matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ── Estado ── */

  const defaultState = () => ({
    protocol: "UY-" + new Date().getFullYear() + "-" + String(Math.floor(1000 + Math.random() * 9000)),
    persons: [],
    quiz: null // {verdict: string}
  });

  function load() {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) return migrate(Object.assign(defaultState(), JSON.parse(raw)));
    } catch (e) { /* respaldo corrupto: se arranca de cero */ }
    return defaultState();
  }

  /* el rol "intermedio" del formato viejo pasa a un parentesco concreto */
  function migrate(s) {
    if (!Array.isArray(s.persons)) s.persons = [];
    s.persons = s.persons.filter(p => p && typeof p === "object");
    s.persons.forEach(p => {
      if (p.role === "intermedio") p.role = "nonno";
      if (!ROLES[p.role]) p.role = "nonno";               // rol desconocido: no romper la vista
      if (typeof p.name !== "string") p.name = "";
      if (!Array.isArray(p.docs)) p.docs = [];
      p.docs = p.docs.filter(d => d && typeof d === "object");
      p.docs.forEach(d => {
        if (typeof d.label !== "string") d.label = "Documento sin nombre";
        if (d.own === undefined) d.own = /Cédula|comprobante de residencia/i.test(d.label);
        // un respaldo editado a mano puede traer un estado que no existe
        if (!chain(d).includes(d.status)) { d.status = "falta"; delete d.done; }
      });
    });
    return s;
  }

  function save() {
    localStorage.setItem(KEY, JSON.stringify(state));
  }

  /* ── Catálogo de documentos por rol ── */

  const PARENTELA = [
    { id: "avo",      ord: 0, tmpl: "avo",        label: "ANCESTRO NACIDO EN ITALIA", corto: "Ancestro nacido en Italia", placeholder: "Nombre del ancestro (ej.: Giuseppe Rossi)" },
    { id: "bisnonno", ord: 1, tmpl: "intermedio", label: "BISABUELO / BISABUELA",     corto: "Bisabuelo/a",              placeholder: "Nombre del bisabuelo/a" },
    { id: "nonno",    ord: 2, tmpl: "intermedio", label: "ABUELO / ABUELA",           corto: "Abuelo/a",                 placeholder: "Nombre del abuelo/a" },
    { id: "genitore", ord: 3, tmpl: "intermedio", label: "PADRE / MADRE",             corto: "Padre/Madre",              placeholder: "Nombre de tu padre o madre" },
    { id: "vos",      ord: 4, tmpl: "vos",        label: "VOS (SOLICITANTE)",         corto: "Vos (solicitante)",        placeholder: "Tu nombre" }
  ];

  const ROLES = Object.fromEntries(PARENTELA.map(p => [p.id, p]));
  const rol = (p) => ROLES[p.role] || ROLES.nonno;

  const DOCS = {
    avo: [
      { label: "Acta de nacimiento italiana (estratto del comune)", it: true },
      { label: "Acta de matrimonio", it: false },
      { label: "Acta de defunción (si falleció)", it: false },
      { label: "Certificado negativo de ciudadanía legal (Corte Electoral)", it: false }
    ],
    intermedio: [
      { label: "Partida de nacimiento (DGREC)", it: false },
      { label: "Partida de matrimonio (si corresponde)", it: false }
    ],
    vos: [
      { label: "Partida de nacimiento (DGREC)", it: false },
      { label: "Cédula / comprobante de residencia en la circunscripción", it: false, own: true }
    ]
  };

  let uid = Date.now();
  const newDoc = (label, it, own) => ({ id: ++uid, label, it, own: !!own, status: "falta" });
  const newPerson = (role) => ({
    id: ++uid, role, name: "",
    docs: DOCS[ROLES[role].tmpl].map(d => newDoc(d.label, d.it, d.own))
  });

  /* ── Estados de documento ── */

  const chain = (doc) => doc.own
    ? ["falta", "lista"]                                    // documento propio: lo tenés o no
    : doc.it
      ? ["falta", "pedida", "obtenida", "lista"]             // italiano: sin apostilla ni traducción
      : ["falta", "pedida", "obtenida", "apostillada", "traducida", "lista"];

  const STATUS_TXT = {
    falta: "FALTA", pedida: "PEDIDA", obtenida: "OBTENIDA",
    apostillada: "APOSTILLADA", traducida: "TRADUCIDA", lista: "LISTA ✓"
  };

  const hoy = () => new Date().toLocaleDateString("es-UY", { day: "2-digit", month: "2-digit", year: "numeric" });

  /* se carga acá, después de ROLES y chain, porque migrate() los necesita
     (si se cargara antes, el try/catch de load() se comería el error y
     borraría el expediente guardado sin avisar) */
  let state = load();

  /* ── Helpers DOM ── */

  const $ = (sel) => document.querySelector(sel);
  const on = (sel, evento, fn) => { const n = $(sel); if (n) n.addEventListener(evento, fn); };
  function el(tag, cls, text) {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }

  /* ── Donaciones ──
     Pegá acá tus links de cobro (url: "") y el bloque aparece solo.
     Ej.: link de pago de Mercado Pago (mpago.la/...), Ko-fi, PayPal.me, etc. */

  const DONAZIONI = [
    { label: "Invitame una marca da bollo · Mercado Pago", url: "https://link.mercadopago.com.uy/lucabitalia" },
    { label: "Donar desde el exterior · Ko-fi / PayPal", url: "" }
  ];

  function renderDonazioni() {
    const sec = $("#sostieni");
    const cont = $("#dona-azioni");
    if (!sec || !cont) return;
    const activos = DONAZIONI.filter(d => d.url);
    if (!activos.length) return; // sin links configurados, la sección queda oculta
    activos.forEach(d => {
      const a = el("a", "bottone bottone-timbro", d.label);
      a.href = d.url;
      a.rel = "noopener";
      a.target = "_blank";
      cont.append(a);
    });
    sec.hidden = false;
  }

  /* ── Bollettino (actualizaciones) ── */

  /* las novedades se generan en el HTML desde src/datos.json; acá solo se refresca el sello NUEVO */
  function renderBollettino() {
    const cont = $("#bollettino-lista");
    if (!cont) return;
    const DIAS60 = 60 * 24 * 60 * 60 * 1000;
    cont.querySelectorAll(".boll-riga[data-fecha]").forEach(riga => {
      const nuevo = (Date.now() - new Date(riga.dataset.fecha).getTime()) < DIAS60;
      const sello = riga.querySelector(".timbro-inline");
      if (nuevo && !sello) {
        riga.querySelector(".boll-testa").append(el("span", "timbro timbro-obtenida timbro-inline", "NUEVO"));
      } else if (!nuevo && sello) {
        sello.remove();
      }
    });
  }

  /* ── Los dos pasos de la herramienta ──
     Que se vea en qué punto del proceso está: paso 1 en curso o resuelto,
     paso 2 esperando o en marcha. Sin esto son dos cuadros iguales apilados. */

  function renderPasos() {
    const p1 = $("#paso-1"), p2 = $("#paso-2");
    if (!p1 || !p2) return;

    const testHecho = !!(state.quiz && state.quiz.verdict && VERDICTS[state.quiz.verdict]);
    const docs = state.persons.flatMap(p => p.docs);
    const listos = docs.filter(d => d.status === "lista").length;
    const hayLista = state.persons.length > 0;

    p1.classList.toggle("paso-hecho", testHecho);
    p1.classList.toggle("paso-activo", !testHecho);
    $("#estado-1").textContent = testHecho ? "RESUELTO ✓" : "EN CURSO";

    p2.classList.toggle("paso-espera-activa", !hayLista);
    p2.classList.toggle("paso-activo", hayLista);
    p2.classList.toggle("paso-hecho", hayLista && docs.length > 0 && listos === docs.length);
    $("#estado-2").textContent = !hayLista ? "ESPERANDO EL PASO 1"
      : listos === docs.length ? "COMPLETO ✓"
      : listos + " DE " + docs.length + " LISTOS";
  }

  /* ── Riepilogo (progreso global) ── */

  function renderProgress() {
    if (!$("#riepilogo-count")) return;
    const docs = state.persons.flatMap(p => p.docs);
    const done = docs.filter(d => d.status === "lista").length;
    const pct = docs.length ? Math.round(done / docs.length * 100) : 0;
    $("#riepilogo-count").textContent = docs.length
      ? done + " / " + docs.length + " documentos listos"
      : "FASCICOLO SIN ABRIR — empezá por el test";
    $("#regola-fill").style.transform = "scaleX(" + pct / 100 + ")";
    $("#regola").setAttribute("aria-valuenow", String(pct));
  }

  /* ── Orden de la línea: ancestro → intermedios → vos ── */

  const ordered = () => state.persons
    .map((p, i) => ({ p, i }))
    .sort((a, b) => (rol(a.p).ord - rol(b.p).ord) || (a.i - b.i))
    .map(x => x.p);

  /* ── Albero genealogico ── */

  const prevComplete = new Set();

  function renderTree() {
    const cont = $("#albero");
    if (!cont) return;
    cont.replaceChildren();

    const line = ordered();
    if (!line.length) {
      const seme = el("button", "nodo nodo-seme");
      seme.type = "button";
      seme.append(
        el("span", "nodo-rel", "ACÁ CRECE TU ÁRBOL"),
        el("span", "nodo-nome", "+ agregá al ancestro nacido en Italia")
      );
      seme.addEventListener("click", () => $("#agg-persona").click());
      cont.append(seme);
      return;
    }

    line.forEach((p, idx) => {
      if (idx > 0) cont.append(el("div", "nodo-collegamento"));

      const done = p.docs.filter(d => d.status === "lista").length;
      const tot = p.docs.length;
      const complete = tot > 0 && done === tot;

      const nodo = el("button", "nodo" + (complete ? " nodo-completo" : ""));
      nodo.type = "button";
      nodo.title = "Ir a los documentos de esta persona";
      nodo.setAttribute("aria-label",
        rol(p).label + (p.name ? ": " + p.name : "") + " — " + done + " de " + tot + " documentos listos");

      nodo.append(el("span", "nodo-rel", rol(p).label));
      nodo.append(el("span", "nodo-nome" + (p.name ? "" : " nodo-anonimo"), p.name || "(sin nombre todavía)"));

      const prog = el("span", "nodo-progresso");
      const bar = el("span", "nodo-bar");
      const fill = el("i", "nodo-fill");
      fill.style.transform = "scaleX(" + (tot ? done / tot : 0) + ")";
      bar.append(fill);
      prog.append(bar, el("span", "mono nodo-count", done + "/" + tot));
      nodo.append(prog);

      if (complete) {
        const t = el("span", "timbro timbro-lista nodo-timbro", "COMPLETO");
        if (!prevComplete.has(p.id) && !REDUCED) t.classList.add("stampa");
        nodo.append(t);
      }

      nodo.addEventListener("click", () => {
        const card = document.querySelector('[data-persona="' + p.id + '"]');
        if (card) {
          card.scrollIntoView({ behavior: REDUCED ? "auto" : "smooth", block: "center" });
          card.classList.remove("lampeggio");
          void card.offsetWidth;
          card.classList.add("lampeggio");
        }
      });

      cont.append(nodo);
    });

    prevComplete.clear();
    line.forEach(p => {
      if (p.docs.length && p.docs.every(d => d.status === "lista")) prevComplete.add(p.id);
    });
  }

  /* ── Prossimo adempimento: qué tenés que hacer ahora, agrupado por trámite ── */

  function destino(d) {
    if (d.it) return "el comune italiano";
    if (/Corte Electoral/i.test(d.label)) return "la Corte Electoral";
    return "la DGREC";
  }

  function diligenze() {
    const docs = state.persons.flatMap(p => p.docs.map(d => ({ d, p })));
    const g = [];
    const push = (accion, lugar, items) => { if (items.length) g.push({ accion, lugar, items }); };

    // pedir, agrupado por dónde se pide
    const porPedir = docs.filter(x => x.d.status === "falta" && !x.d.own);
    [...new Set(porPedir.map(x => destino(x.d)))].forEach(dest => {
      const items = porPedir.filter(x => destino(x.d) === dest);
      push(items.length > 1 ? "Pedir " + items.length + " documentos" : "Pedir 1 documento", "en " + dest, items);
    });

    push("Tener a mano", "el día del turno", docs.filter(x => x.d.own && x.d.status !== "lista"));
    push("Apostillar", "en Cancillería (MRREE)", docs.filter(x => !x.d.it && !x.d.own && x.d.status === "obtenida"));
    push("Traducir al italiano", "con traductor público", docs.filter(x => x.d.status === "apostillada"));
    push("Revisar y estampar LISTA", "en tu fascículo", docs.filter(x => x.d.status === "traducida" || (x.d.it && x.d.status === "obtenida")));

    const esperando = docs.filter(x => x.d.status === "pedida");
    return { grupos: g, esperando, total: docs.length, listos: docs.filter(x => x.d.status === "lista").length };
  }

  function renderDiligenza() {
    const cont = $("#diligenza");
    if (!cont) return;
    cont.replaceChildren();
    if (!state.persons.length) return;

    const { grupos, esperando, total, listos } = diligenze();
    const quadro = el("div", "diligenza-quadro");
    quadro.append(el("span", "etichetta", "PROSSIMO ADEMPIMENTO — tu próxima diligencia"));

    if (!grupos.length && total && listos === total) {
      quadro.append(el("p", "diligenza-fine", "Expediente completo. Te queda sacar turno en Prenot@Mi y presentarte con todo en la Embajada."));
      const a = el("a", "bottone bottone-timbro", "Ver el paso del turno →");
      a.href = "#guia";
      quadro.append(a);
      cont.append(quadro);
      return;
    }

    const lista = el("ol", "diligenza-lista");
    grupos.forEach((gr, i) => {
      const li = el("li", "diligenza-item" + (i === 0 ? " diligenza-prima" : ""));
      const cabeza = el("p", "diligenza-accion");
      cabeza.append(el("strong", null, gr.accion), " " + gr.lugar);
      li.append(cabeza);
      const quien = gr.items
        .map(x => x.d.label.replace(/\s*\([^)]*\)/g, "") + (x.p.name ? " — " + x.p.name : ""))
        .join(" · ");
      li.append(el("p", "diligenza-quien mono", quien));
      lista.append(li);
    });
    quadro.append(lista);

    if (esperando.length) {
      quadro.append(el("p", "diligenza-attesa",
        "Esperando respuesta: " + esperando.length + " documento" + (esperando.length > 1 ? "s" : "") +
        " ya pedido" + (esperando.length > 1 ? "s" : "") + "."));
    }
    cont.append(quadro);
  }

  /* ── Expediente de ejemplo ── */

  function cargarEjemplo() {
    const mk = (role, name, estados) => {
      const p = newPerson(role);
      p.name = name;
      p.docs.forEach((d, i) => {
        d.status = estados[i] || "falta";
        if (d.status === "lista") d.done = hoy();
      });
      return p;
    };
    state.persons = [
      mk("avo", "Giuseppe Rossi", ["lista", "traducida", "apostillada", "obtenida"]),
      mk("nonno", "María Rossi Bentancur", ["obtenida", "pedida"]),
      mk("genitore", "Ana Fernández Rossi", ["pedida", "falta"]),
      mk("vos", "Vos", ["falta", "lista"])
    ];
    state.demo = true;
    save(); renderPersons();
    $("#fascicolo").scrollIntoView({ behavior: REDUCED ? "auto" : "smooth", block: "start" });
  }

  function renderDemoAvviso() {
    const cont = $("#demo-avviso");
    if (!cont) return;
    cont.replaceChildren();
    if (!state.demo) return;
    const box = el("div", "avviso avviso-demo");
    box.append(el("p", "avviso-capo", "EJEMPLO — no es tu expediente"));
    box.append(el("p", null, "Así se ve un fascículo a medio camino: mirá los sellos, el árbol y la diligencia que el sitio calcula. Cuando quieras, borralo y cargá tu línea real."));
    const b = el("button", "bottone", "Borrar el ejemplo y empezar el mío");
    b.type = "button";
    b.addEventListener("click", () => {
      state.persons = []; state.demo = false;
      save(); renderPersons();
    });
    box.append(b);
    cont.append(box);
  }

  /* ── Prenot@Mi: cuenta regresiva a la próxima apertura de turnos ── */

  function romeOffset(d) {
    const p = new Intl.DateTimeFormat("en-US", {
      timeZone: "Europe/Rome", hour12: false,
      year: "numeric", month: "2-digit", day: "2-digit",
      hour: "2-digit", minute: "2-digit", second: "2-digit"
    }).formatToParts(d).reduce((a, x) => (a[x.type] = x.value, a), {});
    return Date.UTC(+p.year, +p.month - 1, +p.day, +p.hour % 24, +p.minute, +p.second) - d.getTime();
  }

  function prossimaApertura(now) {
    const off = romeOffset(now);
    const roma = new Date(now.getTime() + off);
    for (let i = 0; i <= 8; i++) {
      const medianoche = Date.UTC(roma.getUTCFullYear(), roma.getUTCMonth(), roma.getUTCDate() + i);
      const dia = new Date(medianoche).getUTCDay();
      if (dia !== 1 && dia !== 3) continue;
      const off2 = romeOffset(new Date(medianoche - off));
      const instante = medianoche - off2;
      if (instante > now.getTime()) return { instante, dia };
    }
    return null;
  }

  function renderConto() {
    const nodo = $("#turno-conto");
    if (!nodo) return;
    const now = new Date();
    const prox = prossimaApertura(now);
    if (!prox) return;
    const falta = prox.instante - now.getTime();
    const d = Math.floor(falta / 864e5);
    const h = Math.floor(falta % 864e5 / 36e5);
    const m = Math.floor(falta % 36e5 / 6e4);
    const cuando = d ? d + " d " + h + " h " + m + " min" : h + " h " + m + " min";
    const nombreDia = prox.dia === 1 ? "lunes" : "miércoles";
    nodo.replaceChildren(
      el("span", "conto-capo", "PRÓXIMA APERTURA DE TURNOS"),
      el("span", "conto-cifra mono", "faltan " + cuando),
      el("span", "conto-nota", "(" + nombreDia + " a la medianoche de Roma · " +
        new Date(prox.instante).toLocaleString("es-UY", { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" }) + " en Uruguay)")
    );
  }

  /* ── Índice: marca la sección en la que estás ── */

  function indice() {
    const nav = $("#indice");
    if (!nav) return;
    const enlaces = [...nav.querySelectorAll("a")];
    const secciones = enlaces
      .map(a => ({ a, sec: document.getElementById(a.dataset.sez) }))
      .filter(x => x.sec);

    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        const x = secciones.find(s => s.sec === e.target);
        if (!x) return;
        if (e.isIntersecting) {
          enlaces.forEach(a => a.classList.remove("attivo"));
          x.a.classList.add("attivo");
        }
      });
    }, { rootMargin: "-20% 0px -70% 0px" });

    secciones.forEach(x => io.observe(x.sec));
  }

  /* ── Impresión ──
     Ya no hay botón: la hoja @media print se aplica igual con Ctrl+P,
     así que la cabecera del expediente se completa al pintar. */

  function sellarCabeceraImpresion() {
    const testata = $("#print-testata");
    if (!testata) return;
    testata.textContent = "PROT. N. " + state.protocol + (state.demo ? " · EJEMPLO" : "");
  }

  /* ── Fascicolo ── */

  function stampEl(doc, animate) {
    const txt = doc.status === "lista" && doc.done
      ? STATUS_TXT.lista + " " + doc.done
      : STATUS_TXT[doc.status];
    const s = el("span", "timbro timbro-" + doc.status, txt);
    if (animate && !REDUCED) s.classList.add("stampa");
    return s;
  }

  /* la primera vez que aparece la lista armada, hay que decir qué se hace con ella */
  function tipPrimerUso() {
    const caja = el("div", "tip-primero");
    caja.append(el("p", "tip-capo", "TU LISTA ESTÁ ARMADA — ASÍ SE USA"));
    const pasos = el("ol", "tip-pasos");
    [
      "Escribí el nombre de cada persona donde dice «Nombre…». No es obligatorio, pero ayuda a no perderte.",
      "Cada renglón es un documento que vas a tener que conseguir.",
      "Cuando consigas uno, tocá su sello gris: pasa a PEDIDA, después OBTENIDA, y así hasta LISTA.",
      "Arriba de todo, el sitio te va diciendo cuál es tu próxima diligencia."
    ].forEach(t => pasos.append(el("li", null, t)));
    caja.append(pasos);
    const ok = el("button", "collegamento", "Entendido, ocultar esta ayuda");
    ok.type = "button";
    ok.addEventListener("click", () => { state.tip = false; save(); renderPersons(); });
    caja.append(ok);
    return caja;
  }

  function renderPersons(animDocId) {
    const cont = $("#persone");
    if (!cont) return;
    cont.replaceChildren();

    renderPasos();

    if (!state.persons.length) {
      const vacio = el("div", "fascicolo-vuoto");
      vacio.append(
        el("p", "mono", "FASCICOLO VACÍO"),
        el("p", null, "Cebate un mate y empezá: agregá al ancestro que nació en Italia; después el resto de la cadena hasta vos.")
      );
      const azioni = el("div", "vuoto-azioni");
      const nuevo = el("button", "bottone bottone-timbro", "+ Agregar la primera persona");
      nuevo.type = "button";
      nuevo.addEventListener("click", () => $("#agg-persona").click());
      const ej = el("button", "bottone", "Ver un expediente de ejemplo");
      ej.type = "button";
      ej.addEventListener("click", cargarEjemplo);
      azioni.append(nuevo, ej);
      vacio.append(azioni);
      cont.append(vacio);
      renderProgress();
      renderTree();
      renderDiligenza();
      renderDemoAvviso();
      return;
    }

    ordered().forEach(p => {
      const card = el("article", "persona");
      card.dataset.persona = p.id;

      // testa
      const testa = el("div", "persona-testa");
      const chi = el("div", "persona-chi");

      const sel = el("select", "persona-rel-sel");
      sel.setAttribute("aria-label", "Parentesco de esta persona con vos");
      PARENTELA.forEach(r => {
        const o = el("option", null, r.corto);
        o.value = r.id;
        if (r.id === p.role) o.selected = true;
        sel.append(o);
      });
      sel.addEventListener("change", () => {
        p.role = sel.value;
        save(); renderPersons();
      });
      chi.append(sel);

      const nome = el("input", "persona-nome");
      nome.placeholder = rol(p).placeholder;
      nome.value = p.name;
      nome.setAttribute("aria-label", "Nombre — " + rol(p).label);
      nome.addEventListener("change", () => { p.name = nome.value.trim(); save(); renderTree(); });
      chi.append(nome);
      const quitar = el("button", "collegamento", "Quitar persona");
      quitar.type = "button";
      quitar.addEventListener("click", () => {
        if (confirm("¿Quitar a esta persona y sus documentos del fascículo?")) {
          state.persons = state.persons.filter(x => x.id !== p.id);
          save(); renderPersons();
        }
      });
      testa.append(chi, quitar);
      card.append(testa);

      // documentos
      p.docs.forEach(d => {
        const riga = el("div", "doc-riga");
        const info = el("div", "doc-info");
        info.append(el("span", "doc-nome", d.label));
        const meta = el("span", "doc-meta " + (d.it ? "origine-it" : "origine-uy"));
        if (d.it) {
          meta.append("Documento italiano — sin apostilla ni traducción");
        } else if (d.own) {
          meta.append("Documento propio — lo llevás el día del turno, sin apostilla");
        } else {
          const req = el("span", "req", "requiere apostilla (MRREE) + traducción al italiano");
          meta.append("Documento uruguayo — ", req);
        }
        info.append(meta);

        const azioni = el("div", "doc-azioni");
        const c = chain(d);
        const i = c.indexOf(d.status);

        const limpio = (s) => STATUS_TXT[s].replace(" ✓", "").toLowerCase();

        if (i > 0) {
          const undo = el("button", "collegamento doc-undo", "↩");
          undo.type = "button";
          undo.title = "Volver a «" + limpio(c[i - 1]) + "»";
          undo.setAttribute("aria-label", "Volver a " + limpio(c[i - 1]) + " — " + d.label);
          undo.addEventListener("click", () => {
            d.status = c[i - 1];
            delete d.done;
            save(); renderPersons(d.id);
          });
          azioni.append(undo);
        }

        const last = i === c.length - 1;
        const btn = el("button", "timbro-btn" + (last ? " timbro-btn-fin" : ""));
        btn.type = "button";
        btn.title = last
          ? "Ya está listo. Usá ↩ si te equivocaste."
          : "Tocá para marcar «" + limpio(c[i + 1]) + "»";
        btn.setAttribute("aria-label", d.label + " — estado actual: " + limpio(d.status) +
          (last ? ". Es el estado final; usá el botón volver para corregir."
                : ". Tocá para marcarlo como " + limpio(c[i + 1]) + "."));
        btn.append(stampEl(d, d.id === animDocId));

        /* el sello solo no dice que se puede tocar ni qué hace: se lo decimos */
        if (!last) {
          const pista = el("span", "doc-pista");
          pista.append(el("span", "doc-pista-flecha", "→"), " marcar «" + limpio(c[i + 1]) + "»");
          btn.append(pista);
        }
        if (!last) {
          btn.addEventListener("click", () => {
            d.status = c[i + 1];
            if (d.status === "lista") d.done = hoy();
            save(); renderPersons(d.id); renderProgress();
          });
        }
        azioni.append(btn);

        const borrar = el("button", "collegamento", "×");
        borrar.type = "button";
        borrar.title = "Quitar documento";
        borrar.setAttribute("aria-label", "Quitar documento: " + d.label);
        borrar.addEventListener("click", () => {
          if (confirm("¿Quitar el documento «" + d.label + "» del fascículo?")) {
            p.docs = p.docs.filter(x => x.id !== d.id);
            save(); renderPersons(); renderProgress();
          }
        });
        azioni.append(borrar);

        riga.append(info, azioni);
        card.append(riga);
      });

      // piede
      const piede = el("div", "persona-piede");
      const aggDocUy = el("button", "collegamento origine-uy", "+ documento uruguayo");
      aggDocUy.type = "button";
      const aggDocIt = el("button", "collegamento origine-it", "+ documento italiano");
      aggDocIt.type = "button";
      const addDoc = (it) => {
        if (piede.querySelector(".doc-add-input")) return;
        const inp = el("input", "doc-add-input");
        inp.placeholder = it ? "Nombre del documento italiano…" : "Nombre del documento uruguayo…";
        inp.setAttribute("aria-label", inp.placeholder);
        const commit = () => {
          const v = inp.value.trim();
          if (v) {
            p.docs.push(newDoc(v, it));
            save(); renderPersons(); renderProgress();
          } else {
            inp.remove();
          }
        };
        inp.addEventListener("keydown", (e) => {
          if (e.key === "Enter") commit();
          if (e.key === "Escape") { inp.value = ""; inp.remove(); }
        });
        inp.addEventListener("blur", commit);
        piede.append(inp);
        inp.focus();
      };
      aggDocUy.addEventListener("click", () => addDoc(false));
      aggDocIt.addEventListener("click", () => addDoc(true));
      const grp = el("span", "fascicolo-io");
      grp.append(aggDocUy, aggDocIt);
      piede.append(grp);
      card.append(piede);

      cont.append(card);
    });

    if (state.tip) cont.prepend(tipPrimerUso());

    renderProgress();
    renderTree();
    renderDiligenza();
    sellarCabeceraImpresion();
    renderDemoAvviso();
  }

  /* ── Agregar persona ── */

  on("#agg-persona", "click", () => {
    const falta = (id) => !state.persons.some(p => p.role === id);
    const sugerido = falta("avo") ? "avo"
      : falta("nonno") ? "nonno"
      : falta("genitore") ? "genitore"
      : falta("vos") ? "vos"
      : "bisnonno";
    const nueva = newPerson(sugerido);
    state.persons.push(nueva);
    save(); renderPersons();
    const campo = document.querySelector('[data-persona="' + nueva.id + '"] .persona-nome');
    if (campo) { campo.focus(); campo.scrollIntoView({ behavior: REDUCED ? "auto" : "smooth", block: "center" }); }
  });

  /* ── Export / import ── */

  /* ── MOD. A — test de elegibilidad ── */

  const VERDICTS = (window.PRATICA && window.PRATICA.verdictos) || {};

  /* ── MOD. A — test de elegibilidad ──
     Pensado para alguien que llega sin saber nada del trámite:
     empieza por la pregunta que cualquiera contesta de memoria, admite «no sé»
     en todas, y al final arma el fascículo solo para que nadie quede
     frente a una pantalla vacía. */

  const GENERACIONES = {
    padre:     { etiqueta: "tu papá o tu mamá",   cadena: ["avo", "vos"] },
    abuelo:    { etiqueta: "tu abuelo o abuela",  cadena: ["avo", "genitore", "vos"] },
    bisabuelo: { etiqueta: "tu bisabuelo/a",      cadena: ["avo", "nonno", "genitore", "vos"] },
    lejos:     { etiqueta: "un ancestro más lejano", cadena: ["avo", "bisnonno", "nonno", "genitore", "vos"] }
  };

  const PREGUNTAS = {
    quien: {
      paso: 1,
      text: "¿Quién es el familiar más cercano a vos que nació en Italia?",
      ayuda: "Importa el MÁS CERCANO, no el primero que llegó a Uruguay. Si tu bisabuelo vino de Italia pero tu abuelo también nació allá antes de que la familia emigrara, contestá «mi abuelo»: eso te deja mucho mejor parado con la ley nueva. Contá las generaciones desde vos y no importa si esa persona ya falleció.",
      opts: [
        ["Mi papá o mi mamá", () => { gen("padre"); fallo("padre"); }],
        ["Mi abuelo o mi abuela", () => { gen("abuelo"); fallo("abuelo"); }],
        ["Mi bisabuelo o bisabuela — el abuelo de mi papá o mamá", () => { gen("bisabuelo"); ir("presentado"); }],
        ["Más lejos todavía (tatarabuelo o antes)", () => { gen("lejos"); ir("presentado"); }],
        ["No estoy seguro de qué generación es", () => { duda(); ir("noSeGeneracion"); }],
        ["Nadie de mi familia nació en Italia", () => fallo("nohoy")]
      ]
    },

    noSeGeneracion: {
      paso: 1,
      text: "Vamos a averiguarlo juntos",
      ayuda: null,
      texto: "Empezá por vos y subí una generación por vez: tu papá o mamá, después tus abuelos, después tus bisabuelos. La persona que nació en Italia es la que te interesa. Si tenés dudas, la partida de matrimonio o de defunción de esa persona suele decir dónde nació.",
      opts: [
        ["Ya está, es mi papá o mamá", () => { gen("padre"); fallo("padre"); }],
        ["Ya está, es mi abuelo o abuela", () => { gen("abuelo"); fallo("abuelo"); }],
        ["Ya está, es mi bisabuelo/a o más lejos", () => { gen("bisabuelo"); ir("presentado"); }],
        ["Sigo sin saber — mostrame igual el panorama", () => { gen("bisabuelo"); ir("presentado"); }]
      ]
    },

    presentado: {
      paso: 2,
      text: "¿Vos ya habías presentado tu solicitud de ciudadanía en la Embajada antes del 27 de marzo de 2025?",
      ayuda: "Hablamos de TU trámite, no del de un hermano, un primo ni un padre: cada persona tiene el suyo. Y de la solicitud presentada en la ventanilla de la Embajada, no de haberte registrado en Prenot@Mi ni de haber empezado a juntar papeles. La fecha exacta de corte es el 27/03/2025 a las 23:59 hora de Roma.",
      opts: [
        ["No, todavía no presenté nada", () => ir("residencia")],
        ["Sí, la presenté en la Embajada antes de esa fecha", () => fallo("regimen")],
        ["Tenía turno agendado y los papeles prontos antes de esa fecha", () => fallo("regimen")]
      ]
    },

    residencia: {
      paso: 3,
      text: "¿Tu papá o tu mamá, ya siendo ciudadano italiano, vivió en Italia dos años seguidos antes de que nacieras?",
      ayuda: "Tienen que darse las tres cosas a la vez: que ese padre o madre YA tuviera la ciudadanía italiana reconocida, que haya vivido en Italia de forma legal y registrada (empadronado en un comune, no de vacaciones ni de mochilero), y que hayan sido dos años seguidos ANTES de tu nacimiento. Si tu padre o madre es uruguayo sin ciudadanía italiana, la respuesta es «no».",
      opts: [
        ["No", () => ir("mujerEnCadena")],
        ["Sí, las tres cosas se cumplen", () => fallo("residencia")],
        ["No sé", () => { duda(); ir("mujerEnCadena"); }]
      ]
    },

    /* Dos preguntas en vez de una: un tester preguntó «¿sería una mujer italiana
       de mi familia?». No se trata de cualquier mujer, sino del eslabón de la
       cadena donde la ciudadanía pasa de madre a hijo. */
    mujerEnCadena: {
      paso: 4,
      text: "En la cadena que va del italiano hasta vos, ¿en algún momento pasa de una madre a su hijo o hija?",
      ayuda: "No preguntamos por cualquier mujer de la familia, sino por los eslabones de tu cadena. Ejemplo: si el italiano era tu bisabuelo y le pasó la ciudadanía a tu abuela, y tu abuela a tu papá, ahí hay una mujer en el medio. Preguntamos porque hasta 1948 la ley italiana no permitía que las mujeres transmitieran la ciudadanía.",
      opts: [
        ["No: siempre pasó de padre a hijo", () => fallo("nohoy")],
        ["Sí, hay una mujer en el medio", () => ir("antesDel48")],
        ["No sé cómo viene la cadena", () => { duda(); ir("antesDel48"); }]
      ]
    },

    antesDel48: {
      paso: 5,
      text: "Ese hijo o hija de la mujer, ¿nació antes del 1.º de enero de 1948?",
      ayuda: "La fecha que importa es la del nacimiento del hijo, no la del casamiento ni la de la madre. Si nació antes de 1948, el consulado no puede reconocerte y el caso va a tribunales; si nació después, esa mujer transmitió sin problema.",
      opts: [
        ["Sí, nació antes de 1948", () => fallo("judicial")],
        ["No, nació de 1948 en adelante", () => fallo("nohoy")],
        ["No sé la fecha", () => { duda(); fallo("judicial"); }]
      ]
    }
  };

  const historia = [];
  let empezado = false;

  const gen = (g) => { state.quiz = Object.assign({}, state.quiz, { gen: g }); };
  const duda = () => { state.quiz = Object.assign({}, state.quiz, { dudas: true }); };

  function ir(clave, atras) {
    if (!atras) historia.push(clave);
    pintarPregunta(clave);
  }

  function pintarPregunta(clave) {
    renderPasos();
    const q = PREGUNTAS[clave];
    const box = $("#quiz");
    box.replaceChildren();

    box.append(puntos(q.paso));

    const dom = el("p", "quiz-domanda", q.text);
    box.append(dom);

    if (q.texto) box.append(el("p", "quiz-texto", q.texto));

    if (q.ayuda) {
      const det = el("details", "quiz-ayuda");
      det.append(el("summary", null, "¿Por qué preguntamos esto?"), el("p", null, q.ayuda));
      box.append(det);
    }

    const opts = el("div", "quiz-opzioni");
    q.opts.forEach(([label, fn]) => {
      const b = el("button", "bottone", label);
      b.type = "button";
      b.addEventListener("click", fn);
      opts.append(b);
    });
    box.append(opts);

    if (historia.length > 1) {
      const back = el("button", "collegamento quiz-indietro", "← volver a la pregunta anterior");
      back.type = "button";
      back.addEventListener("click", () => {
        historia.pop();
        ir(historia[historia.length - 1], true);
      });
      box.append(back);
    }
  }

  function puntos(paso) {
    const fila = el("div", "quiz-puntos");
    fila.setAttribute("aria-label", "Pregunta " + paso + " de 5 como máximo");
    for (let i = 1; i <= 5; i++) {
      fila.append(el("span", "punto" + (i < paso ? " punto-hecho" : i === paso ? " punto-actual" : "")));
    }
    fila.append(el("span", "mono quiz-num", "PREGUNTA " + paso));
    return fila;
  }

  function fallo(clave) {
    state.quiz = Object.assign({}, state.quiz, { verdict: clave });
    save();
    pintarVerdicto(true);
  }

  function pintarIntro() {
    renderPasos();
    const box = $("#quiz");
    box.replaceChildren();
    const intro = el("div", "quiz-intro");
    intro.append(el("p", "quiz-domanda", "¿Te corresponde la ciudadanía italiana?"));
    intro.append(el("p", "quiz-texto",
      "Empieza con una sola pregunta sobre tu familia; según lo que contestes pueden ser hasta cinco. No necesitás tener ningún papel a mano: se contestan de memoria, en dos minutos."));
    const lista = el("ul", "quiz-promesa");
    [
      "Te decimos si hoy podés tramitar en la Embajada, si tu caso es judicial o si quedaste afuera.",
      "Si en alguna no sabés la respuesta, hay una opción para eso.",
      "Al final te armamos la lista de documentos de tu familia."
    ].forEach(t => lista.append(el("li", null, t)));
    intro.append(lista);

    const b = el("button", "bottone bottone-timbro", "Empezar el test →");
    b.type = "button";
    b.addEventListener("click", () => { empezado = true; historia.length = 0; ir("quien"); });
    intro.append(b);

    /* salidas laterales, discretas: no compiten con el camino principal */
    const otras = el("p", "quiz-otras");
    const ej = el("button", "collegamento", "Ver un expediente de ejemplo");
    ej.type = "button";
    ej.addEventListener("click", cargarEjemplo);
    const manual = el("button", "collegamento", "Armar la lista a mano, sin test");
    manual.type = "button";
    manual.addEventListener("click", () => {
      state.persons = ["avo", "genitore", "vos"].map(r => newPerson(r));
      state.demo = false;
      state.tip = true;
      save(); renderPersons();
      $("#fascicolo")?.scrollIntoView({ behavior: REDUCED ? "auto" : "smooth", block: "start" });
    });
    otras.append(ej, el("span", "quiz-otras-sep", "·"), manual);
    intro.append(otras);

    box.append(intro);
  }

  function pintarVerdicto(animar) {
    renderPasos();
    const v = VERDICTS[state.quiz.verdict];
    if (!v) return;
    const box = $("#quiz");
    box.replaceChildren();

    const wrap = el("div", "verdetto");
    const riga = el("div", "verdetto-timbro-riga");
    const t = el("span", "timbro timbro-grande " + v.cls, v.txt);
    if (animar && !REDUCED) t.classList.add("stampa");
    riga.append(t);
    wrap.append(riga);

    const capo = el("p");
    capo.append(el("strong", null, v.capo));
    wrap.append(capo);
    wrap.append(el("p", "verdetto-spiega", v.detalle));

    if (state.quiz.dudas) {
      wrap.append(el("p", "verdetto-duda",
        "Contestaste «no sé» en alguna pregunta: confirmá ese dato antes de tomar decisiones, porque puede cambiar el resultado."));
    }

    const acciones = el("div", "hero-azioni");
    const g = GENERACIONES[state.quiz.gen];
    if (g) {
      const armar = el("button", "bottone bottone-timbro", "Armar mi lista de documentos →");
      armar.type = "button";
      armar.addEventListener("click", () => armarDesdeTest(state.quiz.gen));
      acciones.append(armar);
    }
    const redo = el("button", "bottone", "Rehacer el test");
    redo.type = "button";
    redo.addEventListener("click", () => {
      state.quiz = null; save();
      historia.length = 0; empezado = true;
      ir("quien");
    });
    acciones.append(redo);
    wrap.append(acciones);

    if (g) {
      wrap.append(el("p", "verdetto-pie",
        "Con " + g.etiqueta + " nacido en Italia, tu cadena tiene " + g.cadena.length +
        " personas. El botón de arriba te la deja armada."));
    }

    box.append(wrap);
  }

  /* el puente entre el test y el fascículo: nadie tiene que empezar de cero */
  function armarDesdeTest(clave) {
    const g = GENERACIONES[clave];
    if (!g) return;

    /* solo preguntamos si de verdad hay trabajo hecho que se puede perder:
       una lista recién creada, vacía o de ejemplo se reemplaza sin molestar */
    const docs = state.persons.flatMap(p => p.docs);
    const avanzados = docs.filter(d => d.status !== "falta").length;
    const conNombre = state.persons.filter(p => p.name).length;
    const hayTrabajo = !state.demo && (avanzados > 0 || conNombre > 0);

    if (hayTrabajo) {
      const detalle = [];
      if (conNombre) detalle.push(conNombre + (conNombre === 1 ? " nombre cargado" : " nombres cargados"));
      if (avanzados) detalle.push(avanzados + (avanzados === 1 ? " documento marcado" : " documentos marcados"));
      if (!confirm("Ya tenés una lista con " + detalle.join(" y ") +
                   ".\n\nSi seguís, se reemplaza por una nueva armada según tu resultado. ¿Querés reemplazarla?")) return;
    }
    state.persons = g.cadena.map(rol => newPerson(rol));
    state.demo = false;
    state.tip = true;
    save();
    renderPersons();
    const destino = $("#fascicolo");
    if (destino) destino.scrollIntoView({ behavior: REDUCED ? "auto" : "smooth", block: "start" });
  }

  function renderQuiz() {
    if (!$("#quiz") || !VERDICTS.padre) return;
    historia.length = 0;
    if (state.quiz && state.quiz.verdict && VERDICTS[state.quiz.verdict]) pintarVerdicto(false);
    else if (empezado) ir("quien");
    else pintarIntro();
  }

  /* ── Protocolo tipeado ── */

  function typeProtocol() {
    const target = "PROT. N. " + state.protocol + " — FASCICOLO PERSONALE";
    const elP = $("#protocollo");
    if (!elP) return;
    if (REDUCED) { elP.textContent = target; return; }
    elP.textContent = "";
    elP.classList.add("cursore");
    let i = 0;
    (function tick() {
      elP.textContent = target.slice(0, ++i);
      if (i < target.length) setTimeout(tick, 26);
      else setTimeout(() => elP.classList.remove("cursore"), 1600);
    })();
  }

  /* ── Banderas: el flameo se detiene fuera de pantalla ── */

  function bandiere() {
    const s = $("#scrivania");
    if (!s || REDUCED) return;
    const io = new IntersectionObserver(([e]) => {
      s.classList.toggle("ferma", !e.isIntersecting);
    });
    io.observe(s);
    document.addEventListener("visibilitychange", () => {
      s.classList.toggle("ferma", document.hidden);
    });
  }

  /* ── Reveals ── */

  function reveals() {
    const targets = document.querySelectorAll(".modulo, .chiusura");
    targets.forEach(t => t.classList.add("rivela"));
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add("visibile"); io.unobserve(e.target); }
      });
    }, { threshold: .08 });
    targets.forEach(t => io.observe(t));
  }

  /* ── Init ── */

  typeProtocol();
  renderQuiz();
  renderDonazioni();
  renderBollettino();
  renderPersons();
  renderConto();
  setInterval(renderConto, 30000);
  indice();
  bandiere();
  reveals();
  save();
})();
