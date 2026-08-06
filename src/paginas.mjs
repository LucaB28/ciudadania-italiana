/* Páginas armadas a partir de las secciones que ya existían en el sitio.
   {{SECCION:id}} lo reemplaza build.mjs con la sección extraída de secciones.html.
   promover: true convierte el <h2> de la sección en el <h1> de la página. */

export const paginas = [
  {
    slug: "index",
    nav: "Inicio",
    title: "Ciudadanía italiana en Uruguay 2026: qué documentos te faltan",
    description: "Test de elegibilidad con la Ley 74/2025, tracker de documentos con apostillas y traducciones, y guía del trámite desde Uruguay. Gratis y sin registro.",
    ogTitle: "Ciudadanía italiana en Uruguay: armá tu expediente",
    tipo: "inicio",
    content: `
{{SECCION:hero}}
{{SECCION:istruzioni}}

<section class="modulo" aria-labelledby="escenarios-titolo">
  <div class="modulo-intestazione">
    <span class="etichetta">CASUÍSTICA — LOS SEIS ESCENARIOS</span>
    <h2 id="escenarios-titolo">En cuál de estos casos estás</h2>
  </div>
  <p class="modulo-nota">El <a href="mi-expediente.html">test</a> te lleva a uno de estos seis resultados en dos minutos.
  Acá están todos, para que veas el panorama completo.</p>
  {{ESCENARIOS}}
  <p class="escenarios-pie">¿Tu caso cae en los grises? Los tres que más confunden tienen página propia:
  <a href="caso-1948.html">línea materna anterior a 1948</a>,
  <a href="minor-issue.html">minor issue</a> (resuelto por la Casación en julio de 2026) y
  <a href="vias.html">cuál de las tres vías te toca</a>.
  Y si ya te reconocieron, seguí en <a href="despues.html">qué viene después</a>.</p>
</section>

{{SECCION:sostieni}}
`
  },

  {
    slug: "mi-expediente",
    nav: "Mi expediente",
    title: "Armá tu expediente de ciudadanía italiana paso a paso",
    description: "Dos pasos: el test te dice si te corresponde y después armamos la lista exacta de documentos que te faltan, con su estado. Gratis y sin registro.",
    ogTitle: "Armá tu expediente de ciudadanía italiana",
    tipo: "herramienta",
    h1: "Tu expediente",
    sinIntestazione: true,
    content: `
<p class="entrada">Dos pasos. Primero averiguamos si te corresponde; después armamos la lista de documentos
que te faltan y la vas marcando a medida que los conseguís. Todo queda guardado en este navegador.</p>

<ol class="pasos-app">
  <li class="paso-app" id="paso-1">
    <div class="paso-cabeza">
      <span class="paso-num">1</span>
      <div class="paso-titulo">
        <h2>¿Te corresponde?</h2>
        <p class="paso-sub">Unas preguntas sobre tu familia, sin papeles a mano.</p>
      </div>
      <span class="paso-estado mono" id="estado-1">EN CURSO</span>
    </div>
    <div class="paso-cuerpo">
      {{SECCION:test}}
    </div>
  </li>

  <li class="paso-app" id="paso-2">
    <div class="paso-cabeza">
      <span class="paso-num">2</span>
      <div class="paso-titulo">
        <h2>Tus documentos</h2>
        <p class="paso-sub">Qué te falta, qué apostillar y qué traducir.</p>
      </div>
      <span class="paso-estado mono" id="estado-2">PENDIENTE</span>
    </div>
    <div class="paso-cuerpo">
      <p class="paso-espera">Terminá el paso 1 y acá aparece tu lista de documentos, armada según tu familia.</p>
      {{SECCION:fascicolo}}
    </div>
  </li>
</ol>

<section class="modulo" aria-labelledby="que-hace-titolo">
  <div class="modulo-intestazione">
    <span class="etichetta">QUÉ HACE ESTA HERRAMIENTA</span>
    <h2 id="que-hace-titolo">Para qué sirve armar el expediente acá</h2>
  </div>
  <p>El trámite de ciudadanía italiana no se traba por lo difícil, sino por lo desordenado. Son entre seis y doce
  documentos de tres o cuatro personas distintas, cada uno con su propio estado: uno lo pediste y no llegó, otro
  llegó pero falta apostillarlo, otro está apostillado pero sin traducir. Esa cuenta, llevada de memoria o en un
  papel, es la razón número uno por la que la gente llega al turno con algo faltante y tiene que volver.</p>
  <p>Esta herramienta lo ordena por vos. El <strong>paso 1</strong> te dice, con la
  <a href="ley-74-2025.html">ley vigente después de la reforma de 2025</a>, si hoy podés tramitar por la Embajada,
  si tu caso es judicial o si quedaste fuera por ahora — <strong>antes</strong> de que gastes en partidas.
  El <strong>paso 2</strong> arma la cadena de tu familia según ese resultado y te lista los documentos que
  necesita cada persona, ya marcados según sean uruguayos (que se apostillan y traducen) o italianos (que no).</p>
  <p>Después, cada vez que conseguís algo, tocás su sello y avanza: <em>falta</em>, <em>pedida</em>,
  <em>obtenida</em>, <em>apostillada</em>, <em>traducida</em>, <em>lista</em>. Arriba de todo, el sitio agrupa lo
  pendiente <strong>por trámite y no por pariente</strong>: en vez de «a Fulano le falta la partida», te dice
  «llevá estas cuatro a apostillar a Cancillería», que es como se hacen las cosas en la vida real y te ahorra viajes.</p>

  <h3>Lo que necesitás y lo que no</h3>
  <ul class="lista-simple">
    <li><strong>No necesitás papeles</strong> para empezar: el test se contesta de memoria en dos minutos.</li>
    <li><strong>No hay registro ni cuenta.</strong> Nunca te pedimos mail ni teléfono.</li>
    <li><strong>Tus datos no salen de tu navegador.</strong> Los nombres de tu familia quedan guardados en tu
    propio equipo, no en un servidor nuestro. Si abrís el sitio en otro dispositivo, empezás de cero.</li>
    <li><strong>Los papeles físicos quedan con vos.</strong> Acá solo anotás el avance; no se sube ningún archivo.</li>
  </ul>

  <p>Cuando tu expediente esté completo, seguí con la <a href="documentos.html">guía de documentos</a> para saber
  dónde pedir cada cosa, mirá <a href="costos.html">cuánto cuesta</a> para hacer la cuenta antes de gastar, y
  preparate para <a href="turnos-prenotami.html">el turno en Prenot@Mi</a>, que suele ser la parte más difícil.
  Si tu caso resultó judicial, empezá por <a href="vias.html">la comparación de las tres vías</a>.</p>
</section>
`
  },

  {
    slug: "ley-74-2025",
    nav: "La ley",
    title: "Ley 74/2025 de ciudadanía italiana: qué cambió y a quién afecta",
    description: "La reforma limitó el reconocimiento a hijos y nietos de italianos. Qué dice el decreto Tajani, quién queda afuera y cómo sigue en el tribunal europeo.",
    ogTitle: "Ley 74/2025: la reforma de la ciudadanía italiana explicada",
    tipo: "articulo",
    h1: "La Ley 74/2025, explicada sin vueltas",
    content: `
<p class="entrada">El 27 de marzo de 2025 se terminó la ciudadanía italiana «por tatarabuelo». Esta página resume qué
cambió exactamente, quién sigue teniendo derecho, quién quedó afuera y por qué el asunto todavía no está cerrado.</p>

{{SECCION:avviso-ley}}

{{SECCION:actualizaciones}}

<section class="modulo" aria-labelledby="que-hacer-titolo">
  <div class="modulo-intestazione">
    <span class="etichetta">QUÉ HACER AHORA</span>
    <h2 id="que-hacer-titolo">Con la ley así, ¿conviene empezar?</h2>
  </div>
  <p>Si tenés padre, madre, abuelo o abuela nacido en Italia: sí, sin dudarlo. Estás dentro de la ley nueva y lo único
  que te separa del reconocimiento es juntar los papeles y conseguir turno.</p>
  <p>Eso sí, ojo con los plazos: en febrero de 2026 entró en vigor la <a href="ley-11-2026.html">Ley 11/2026</a>,
  que no cambia quién tiene derecho pero sí muda el trámite a un servicio central en Roma, sube el plazo legal de
  análisis a 36 meses y, desde 2029, reemplaza el turno consular por un envío postal. Elegible no es lo mismo
  que rápido.</p>
  <p>Si tu vínculo es de bisabuelo para atrás: la vía consular hoy está cerrada, pero
  <strong>juntar los documentos igual tiene sentido</strong>. Las partidas uruguayas no vencen para el archivo personal,
  el certificado de la Corte Electoral tampoco cambia, y si el Tribunal de Justicia de la UE tumba la retroactividad
  del artículo 3-bis vas a estar meses adelante de la avalancha. Empezá por el
  <a href="mi-expediente.html">expediente</a> y armá tu árbol.</p>
  <p>Si en tu línea hay una mujer que tuvo hijos antes de 1948, tu camino es otro:
  leé <a href="caso-1948.html">el caso 1948</a>. Y si te habían rechazado el trámite porque tu ancestro se
  naturalizó teniendo hijos menores, buenas noticias: eso es <a href="minor-issue.html">el minor issue</a>
  y la Casación lo resolvió a favor de los descendientes en julio de 2026.</p>
  <p>Los seis resultados posibles, con lo que implica cada uno, están resumidos
  <a href="index.html#escenarios-titolo">en la portada</a>. Para elegir por dónde ir,
  <a href="vias.html">comparamos las tres vías</a>; y para lo que viene una vez reconocido,
  <a href="despues.html">AIRE, pasaporte y familia</a>.</p>
</section>
`
  },

  {
    slug: "documentos",
    nav: "Documentos",
    title: "Qué documentos necesito para la ciudadanía italiana en Uruguay",
    description: "Partidas de la DGREC, certificado de la Corte Electoral, apostilla y traducción al italiano: los 6 pasos, en orden y con los enlaces oficiales.",
    ogTitle: "Los documentos de la ciudadanía italiana, paso a paso",
    tipo: "howto",
    h1: "Qué documentos necesitás y en qué orden conseguirlos",
    content: `
<p class="entrada">La regla general es simple: <strong>nacimiento, matrimonio y defunción de cada persona de la línea</strong>,
desde el ancestro italiano hasta vos. Lo uruguayo se apostilla y se traduce; lo italiano no. Estos son los seis pasos,
en el orden en que conviene hacerlos.</p>

{{SECCION:guia}}

<section class="modulo" aria-labelledby="orden-titolo">
  <div class="modulo-intestazione">
    <span class="etichetta">CONSEJO DE ORDEN</span>
    <h2 id="orden-titolo">Empezá por el acta italiana, no por las partidas</h2>
  </div>
  <p>El acta del comune es la que más demora y la que no controlás: puede tardar semanas o meses según el pueblo.
  Pedila primero y mientras esperás juntá lo uruguayo, que es rápido y depende de vos.
  Si todavía no sabés de qué comune era tu ancestro, esa búsqueda es el verdadero primer paso:
  te la explicamos en <a href="acta-comune.html">cómo pedir el acta al comune</a>.</p>
  <p>Y antes de gastar en apostillas, cargá tu línea en el <a href="mi-expediente.html">expediente</a>:
  te dice exactamente cuántos documentos son y en qué estado está cada uno, así no pagás dos veces lo mismo
  ni descubrís un faltante el día del turno.</p>
  <p>Dos situaciones cambian esta lista y conviene descartarlas antes de arrancar: si en tu cadena la ciudadanía
  pasa de madre a hijo con ese hijo nacido antes de 1948, tu camino es <a href="caso-1948.html">el caso 1948</a>;
  y si tu ancestro se naturalizó uruguayo mientras su hijo era menor, mirá
  <a href="minor-issue.html">el minor issue</a>, que la Casación resolvió a favor de los descendientes en 2026.
  Con los papeles prontos, lo que sigue es <a href="turnos-prenotami.html">conseguir turno</a>, y si te lo
  reconocen, <a href="despues.html">el AIRE y el pasaporte</a>.</p>
</section>
`
  },

  {
    slug: "costos",
    nav: "Costos",
    title: "Cuánto cuesta la ciudadanía italiana en Uruguay (precios 2026)",
    description: "Precios de referencia: partidas de la DGREC, apostilla en Cancillería, traducción al italiano y la tasa consular de €600. Qué se paga y cuándo.",
    ogTitle: "Cuánto cuesta la ciudadanía italiana desde Uruguay",
    tipo: "articulo",
    h1: "Cuánto cuesta la ciudadanía italiana desde Uruguay",
    quitarH2: true,
    content: `
<p class="entrada">No hay un precio único: depende de cuántas actas tenga tu línea. Lo único fijo son los €600 de tasa
consular por solicitante. Estos son los valores de referencia para que hagas tu cuenta.</p>

{{SECCION:costi}}

<section class="modulo" aria-labelledby="ahorro-titolo">
  <div class="modulo-intestazione">
    <span class="etichetta">DÓNDE SE VA LA PLATA</span>
    <h2 id="ahorro-titolo">Tres formas de no gastar de más</h2>
  </div>
  <p><strong>Pedí la partida digital cuando sirva.</strong> La DGREC la emite gratis. Confirmá antes con la Embajada
  si para tu caso aceptan la digital: te podés ahorrar el costo de cada manuscrita.</p>
  <p><strong>Contá las actas antes de encargar traducciones.</strong> El traductor cobra por carilla y por documento;
  llevarle todo junto una sola vez suele salir mejor que ir goteando. El
  <a href="mi-expediente.html">expediente</a> te dice cuántas son.</p>
  <p><strong>Desconfiá del «todo incluido».</strong> Una gestoría que te da un precio cerrado sin ver tu línea no sabe
  cuántas actas tenés. Y nadie puede vender un turno: los turnos son gratis y se sacan en
  <a href="turnos-prenotami.html">Prenot@Mi</a>.</p>
</section>

<section class="modulo" aria-labelledby="cuenta-titolo">
  <div class="modulo-intestazione">
    <span class="etichetta">UN EJEMPLO CONCRETO</span>
    <h2 id="cuenta-titolo">Cómo se hace la cuenta</h2>
  </div>
  <p>Supongamos el caso más común: tu abuelo nació en Italia. Tu cadena tiene tres personas —él, tu padre o madre, y vos—
  y necesitás alrededor de <strong>seis documentos uruguayos</strong> entre nacimientos, matrimonios, defunción y el
  certificado de la Corte Electoral, más el acta italiana de tu abuelo.</p>
  <p>Esas seis actas se piden en la DGREC, se apostillan una por una en Cancillería y se traducen una por una.
  A eso se le suman los €600 de la tasa consular el día que presentás. El acta italiana no suma nada: es gratis o casi.</p>
  <p>Por eso el número final varía tanto de una persona a otra: alguien con línea corta y pocas actas gasta bastante menos
  que alguien con un bisabuelo, cuatro generaciones y actas en dos departamentos distintos. Cargá tu línea en el
  <a href="mi-expediente.html">expediente</a> y contá los renglones: ese es tu multiplicador.</p>
</section>

<section class="modulo" aria-labelledby="nocuenta-titolo">
  <div class="modulo-intestazione">
    <span class="etichetta">LO QUE NO ESTÁ EN LA TABLA</span>
    <h2 id="nocuenta-titolo">Gastos que aparecen después</h2>
  </div>
  <ul class="lista-simple">
    <li><strong>Rectificación de partidas.</strong> Si un nombre o una fecha no coincide entre documentos, corregirlo
    en el Registro Civil tiene su costo y su demora.</li>
    <li><strong>Envíos postales.</strong> Algunos comuni mandan el acta por correo y otros piden que pagues el envío.</li>
    <li><strong>Honorarios de abogado.</strong> Solo si tu caso es judicial —línea materna anterior a 1948
    o demanda por falta de turno—. Ahí el presupuesto es otro: mirá <a href="vias.html">las tres vías</a>.</li>
    <li><strong>Pasaporte italiano.</strong> Es un trámite aparte, después del reconocimiento:
    lo detallamos en <a href="despues.html">qué sigue después</a>.</li>
  </ul>
</section>
`
  },

  {
    slug: "preguntas",
    nav: "Preguntas",
    title: "Preguntas frecuentes sobre la ciudadanía italiana en Uruguay",
    description: "Bisabuelos, caso 1948, minor issue, nombres que no coinciden, turnos, costos y plazos: las dudas más repetidas, respondidas con la ley vigente en 2026.",
    ogTitle: "Las 14 dudas más comunes de la ciudadanía italiana",
    tipo: "faq",
    h1: "Preguntas y dudas frecuentes",
    quitarH2: true,
    content: `
{{SECCION:consultorio}}
`
  },

  {
    slug: "turnos-prenotami",
    nav: "Turnos",
    title: "Turnos Prenot@Mi en Uruguay 2026: cómo conseguir la cita",
    description: "Cuándo se liberan las fechas en Prenot@Mi, cómo llegar preparado al minuto exacto y qué opciones tenés si el consulado nunca abre agenda.",
    ogTitle: "Cómo conseguir turno en Prenot@Mi desde Uruguay",
    tipo: "articulo",
    h1: "Turnos en Prenot@Mi: cuándo salen y cómo llegar a tiempo",
    content: `
<p class="entrada">Conseguir el turno es, para mucha gente, más difícil que juntar los documentos. No hay trucos mágicos
ni intermediarios con acceso privilegiado: hay un horario, una preparación previa y, si nada funciona, una vía legal.</p>

<div class="avviso">
  <p class="avviso-capo">ESTO TIENE FECHA DE VENCIMIENTO</p>
  <p>Todo lo que sigue vale mientras la Embajada siga recibiendo pedidos, o sea <strong>hasta 2028</strong>.
  La <a href="ley-11-2026.html">Ley 11/2026</a> le puso un cupo anual a lo que cada oficina puede recibir y, desde
  el <strong class="mono">01/01/2029</strong>, el turno para mayores de edad desaparece: el pedido se manda por
  correo a Roma. Los menores se siguen atendiendo en la Embajada.</p>
</div>

<section class="modulo" aria-labelledby="cuando-titolo">
  <div class="modulo-intestazione">
    <span class="etichetta">EL HORARIO</span>
    <h2 id="cuando-titolo">Las fechas se liberan lunes y miércoles</h2>
  </div>
  <p class="turno-conto" id="turno-conto" aria-live="polite"></p>
  <p>La agenda de <a href="https://prenotami.esteri.it" rel="noopener">Prenot@Mi</a> abre nuevas fechas los
  <strong>lunes y miércoles a la medianoche de Italia</strong>. Por la diferencia horaria, en Uruguay eso cae la
  tarde-noche del domingo y del martes. El contador de arriba calcula el próximo momento exacto en hora uruguaya.</p>
  <p>La cantidad de cupos es limitada y vuelan en minutos. No es una cola: es una carrera.</p>
</section>

<section class="modulo" aria-labelledby="preparar-titolo">
  <div class="modulo-intestazione">
    <span class="etichetta">PREPARACIÓN</span>
    <h2 id="preparar-titolo">Llegá con todo listo antes del minuto cero</h2>
  </div>
  <ol class="passi">
    <li class="passo">
      <h3>Creá la cuenta con anticipación</h3>
      <p>Registrate en Prenot@Mi días antes, no el mismo día. La cuenta pide datos personales y una verificación por
      email; si la hacés cuando se abren los cupos, ya perdiste.</p>
    </li>
    <li class="passo">
      <h3>Completá el perfil entero</h3>
      <p>Nombre exactamente como figura en tu cédula, domicilio en la circunscripción, teléfono. Un perfil incompleto
      te frena justo cuando estás por confirmar.</p>
    </li>
    <li class="passo">
      <h3>Tené los documentos escaneados</h3>
      <p>Algunos servicios piden adjuntar archivos al reservar. Tenelos en el escritorio, en PDF y con nombres claros.</p>
    </li>
    <li class="passo">
      <h3>Conexión estable y sesión abierta</h3>
      <p>Entrá y logueate un rato antes. Actualizá la página de reservas en el horario, sin cerrar sesión.</p>
    </li>
    <li class="passo">
      <h3>Guardá evidencia de cada intento</h3>
      <p>Capturas de pantalla con fecha y hora en las que se vea que no había cupos. Esto no es paranoia:
      es la prueba que se usa en la vía legal que viene abajo.</p>
    </li>
  </ol>
</section>

<section class="modulo" aria-labelledby="nunca-titolo">
  <div class="modulo-intestazione">
    <span class="etichetta">SI NUNCA HAY FECHAS</span>
    <h2 id="nunca-titolo">La demanda por falta de turno</h2>
  </div>
  <p>Cuando un consulado no da citas en un plazo razonable, existe la posibilidad de reclamar ante los tribunales
  italianos para que se fije el turno o se resuelva el reconocimiento por vía judicial. Se hace con abogado en Italia,
  sin viajar, y las capturas que guardaste son parte del expediente.</p>
  <p>Un dato que cambió y que conviene tener antes de contratar a nadie: la
  <a href="ley-11-2026.html">Ley 11/2026</a> subió el plazo legal de la administración de 24 a
  <strong>36 meses</strong>. Ese plazo es justamente el que sostiene los reclamos por inercia, así que ahora hay
  que esperar más antes de poder invocarlo. Que un estudio te diga que «ya se puede demandar» no lo vuelve cierto:
  pedile que te muestre la cuenta.</p>
  <p>No es un atajo ni es gratis: implica honorarios y tiempos judiciales. Pero para quien lleva años sin poder
  reservar, suele ser la única salida real.</p>
  <div class="avviso">
    <p class="avviso-capo">CUIDADO CON LOS INTERMEDIARIOS</p>
    <p>Nadie vende turnos. El turno es gratuito y se saca en el portal oficial. Si alguien te cobra por
    «conseguirte la cita», lo que está vendiendo es que alguien intente reservar por vos en el mismo horario
    en que podés intentarlo solo. La propia Embajada ha advertido públicamente sobre estas prácticas.</p>
  </div>
</section>

<section class="modulo" aria-labelledby="mientras-titolo">
  <div class="modulo-intestazione">
    <span class="etichetta">MIENTRAS ESPERÁS</span>
    <h2 id="mientras-titolo">Que el turno te encuentre con la carpeta pronta</h2>
  </div>
  <p>El motivo número uno de rebote el día de la cita es llegar con un documento faltante, sin apostillar o sin traducir.
  Cargá tu línea en el <a href="mi-expediente.html">expediente</a>: te dice qué te falta y agrupa los trámites
  para que hagas un solo viaje a Cancillería.</p>
  <p>Y si todavía estás juntando papeles, aprovechá la espera: la <a href="documentos.html">guía de documentos</a>
  te dice en qué orden conseguirlos, <a href="costos.html">los costos</a> te dejan hacer la cuenta antes de gastar,
  y si el turno nunca llega, <a href="vias.html">las tres vías</a> comparan qué otras opciones tenés.</p>
</section>
`
  }
];
