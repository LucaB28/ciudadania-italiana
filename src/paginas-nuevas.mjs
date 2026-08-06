/* Páginas nuevas: los temas que la gente busca y que hoy contestan foros con información vieja. */

export const paginasNuevas = [
  {
    slug: "acta-comune",
    nav: "Acta del comune",
    title: "Cómo pedir el acta de nacimiento al comune italiano desde Uruguay",
    description: "Cómo averiguar de qué pueblo era tu ancestro y el modelo de email en italiano para pedirle el acta al comune, gratis y sin intermediarios.",
    ogTitle: "Pedile el acta a tu comune: guía y modelo de email",
    tipo: "articulo",
    h1: "Cómo conseguir el acta italiana de tu ancestro",
    content: `
<p class="entrada">Es el documento que da inicio a todo y el único que no se consigue en Uruguay. La buena noticia:
lo pedís vos, por email, y en general es gratis. La difícil: primero tenés que saber de qué comune era.</p>

<section class="modulo" aria-labelledby="buscar-titolo">
  <div class="modulo-intestazione">
    <span class="etichetta">PASO 1</span>
    <h2 id="buscar-titolo">Averiguar el pueblo exacto</h2>
  </div>
  <p>«Era del norte de Italia» no alcanza: necesitás el comune. Dónde suele estar escrito:</p>
  <ul class="lista-simple">
    <li>La <strong>partida de matrimonio uruguaya</strong> del ancestro: casi siempre declara el lugar de nacimiento.</li>
    <li>La <strong>partida de defunción</strong>, por el mismo motivo.</li>
    <li>Documentos de <strong>desembarco o de la Corte Electoral</strong>, si se naturalizó.</li>
    <li>Libretas, pasaportes viejos y estampitas familiares: en esta búsqueda vale todo.</li>
  </ul>
  <p>Si no aparece por ningún lado, dos herramientas gratuitas resuelven muchos casos:
  el <a href="https://antenati.cultura.gov.it/" rel="noopener">Portale Antenati</a>, que tiene digitalizados los
  registros civiles italianos por provincia, y <a href="https://www.familysearch.org/" rel="noopener">FamilySearch</a>,
  que indexa registros de todo el mundo, incluidas listas de pasajeros.</p>
</section>

<section class="modulo" aria-labelledby="pedir-titolo">
  <div class="modulo-intestazione">
    <span class="etichetta">PASO 2</span>
    <h2 id="pedir-titolo">Escribirle al ufficio di stato civile</h2>
  </div>
  <p>Buscá en Google <span class="mono">comune di [nombre] ufficio stato civile email</span>. Casi todos los comuni
  tienen su dirección publicada. Pedí la <strong>copia integrale dell'atto di nascita</strong>, no el extracto
  resumido: la integral incluye anotaciones al margen (matrimonios, ciudadanía) que al consulado le sirven.</p>
  <p>Escribí en italiano. No hace falta que sea perfecto, pero un mail en español tiene bastante menos chance de
  respuesta. Este modelo funciona:</p>

  <div class="modello">
    <p class="modello-capo mono">MODELO DE EMAIL — copiá y completá lo que está entre corchetes</p>
    <pre>Oggetto: Richiesta copia integrale atto di nascita — [NOMBRE DEL ANCESTRO]

Gentilissimi,

mi chiamo [TU NOMBRE], sono cittadino uruguaiano residente a [TU CIUDAD], Uruguay,
e sto raccogliendo la documentazione necessaria per il riconoscimento della
cittadinanza italiana iure sanguinis.

Chiedo cortesemente il rilascio della copia integrale dell'atto di nascita del
mio [bisnonno / nonno / padre]:

  Nome e cognome: [NOMBRE COMPLETO]
  Data di nascita: [DD/MM/AAAA]
  Luogo di nascita: [COMUNE], provincia di [PROVINCIA]
  Nome del padre: [NOMBRE]
  Nome della madre: [NOMBRE]

Il documento è destinato alla pratica di riconoscimento della cittadinanza
presso l'Ambasciata d'Italia a Montevideo.

Se possibile, chiedo l'invio del documento in formato digitale a questo
indirizzo email e, se necessario, anche per posta ordinaria al seguente
indirizzo: [TU DIRECCIÓN COMPLETA, URUGUAY].

Resto a disposizione per qualsiasi informazione o costo aggiuntivo.

La ringrazio anticipatamente per la cortese collaborazione.

Cordiali saluti,
[TU NOMBRE COMPLETO]
[TU EMAIL] — [TU TELÉFONO]</pre>
  </div>
</section>

<section class="modulo" aria-labelledby="esperar-titolo">
  <div class="modulo-intestazione">
    <span class="etichetta">PASO 3</span>
    <h2 id="esperar-titolo">Esperar, insistir y qué hacer si no contestan</h2>
  </div>
  <p>Los tiempos varían muchísimo: un comune chico puede contestarte en una semana y uno grande tardar meses.
  Si a las tres o cuatro semanas no hubo respuesta, reenviá el mismo mail con un <span class="mono">Sollecito:</span>
  adelante del asunto. Si el comune no usa email, mandá la carta por correo postal con la misma redacción.</p>
  <p><strong>Datos que no coinciden.</strong> Si el nombre italiano difiere del que figura en las partidas uruguayas
  («Giuseppe» que acá fue «José»), no te frenes: pedí igual el acta italiana y después resolvés la concordancia.
  Cómo se maneja eso está en las <a href="preguntas.html">preguntas frecuentes</a>.</p>
  <p>Cuando llegue, cargala en tu <a href="mi-expediente.html">expediente</a>. Es de los pocos documentos que
  <strong>no</strong> necesita apostilla ni traducción: ya es italiano.</p>
</section>
`
  },

  {
    slug: "caso-1948",
    nav: null,
    title: "Caso 1948: ciudadanía italiana por línea materna desde Uruguay",
    description: "Si en tu línea hay una mujer que tuvo hijos antes de 1948, el consulado no puede reconocerte. Qué es el caso 1948 y por qué se resuelve en tribunales.",
    ogTitle: "Caso 1948: la ciudadanía por línea materna",
    tipo: "articulo",
    h1: "El caso 1948: cuando la línea pasa por una mujer",
    content: `
<p class="entrada">Es una de las situaciones que más aparece en los grupos y la que más confusión genera.
Si en tu cadena hay una mujer que tuvo a su hijo antes del 1.º de enero de 1948, tu trámite no es imposible:
es judicial.</p>

<section class="modulo" aria-labelledby="que-titolo">
  <div class="modulo-intestazione">
    <span class="etichetta">EL PROBLEMA</span>
    <h2 id="que-titolo">Qué es exactamente</h2>
  </div>
  <p>Hasta que entró en vigor la Constitución republicana italiana, el 1.º de enero de 1948, la ley no permitía que
  una mujer transmitiera la ciudadanía a sus hijos: solo el padre. Los hijos nacidos <strong>antes</strong> de esa
  fecha quedaron, según la interpretación administrativa, fuera de la cadena.</p>
  <p>La Corte de Casación italiana corrigió esa discriminación por vía jurisprudencial, pero la corrección
  <strong>no llegó a la ventanilla</strong>: los consulados siguen aplicando el criterio viejo. Por eso estos casos
  se llaman «casos 1948» y se resuelven demandando al Estado italiano.</p>
</section>

<section class="modulo" aria-labelledby="como-titolo">
  <div class="modulo-intestazione">
    <span class="etichetta">CÓMO SE RESUELVE</span>
    <h2 id="como-titolo">Un juicio en Italia, sin viajar</h2>
  </div>
  <p>El procedimiento se hace ante tribunales italianos, representado por un abogado habilitado en Italia,
  con poder otorgado desde Uruguay. No necesitás mudarte ni viajar para la audiencia.</p>
  <p>La documentación que se presenta es <strong>la misma que pediría el consulado</strong>: partidas de toda la línea,
  apostilladas y traducidas, más el certificado negativo de la Corte Electoral. Es decir: el trabajo que hacés en el
  <a href="mi-expediente.html">expediente</a> sirve igual, tomes la vía que tomes.</p>
  <p>Lo que cambia es el costo —se suman honorarios profesionales— y el plazo, que depende del tribunal.</p>
</section>

<section class="modulo" aria-labelledby="hoy-titolo">
  <div class="modulo-intestazione">
    <span class="etichetta">CÓMO ESTÁ HOY</span>
    <h2 id="hoy-titolo">El panorama en 2026</h2>
  </div>
  <p>Durante años estos juicios se venían ganando con regularidad. La reforma de 2025 movió el tablero: además del
  límite de generaciones, cambió el terreno en el que se discuten estos casos, y el 23 de julio de 2026 la Corte
  Constitucional <strong>elevó al Tribunal de Justicia de la Unión Europea</strong> la pregunta sobre la retroactividad
  del artículo 3-bis, con la ordenanza 147/2026.</p>
  <p>Traducido: hay una resolución europea pendiente que puede cambiar el resultado de muchas causas.
  Seguimos ese expediente en <a href="ley-74-2025.html">la página de la ley</a>.</p>
  <div class="avviso">
    <p class="avviso-capo">ANTES DE CONTRATAR</p>
    <p>Este sitio ordena información, no litiga. Para un caso 1948 necesitás un estudio con experiencia real en
    ciudadanía italiana. Pedí presupuesto cerrado por escrito, preguntá qué pasa si el TJUE falla en contra,
    y desconfiá de cualquiera que te garantice un resultado: nadie puede.</p>
  </div>
</section>
`
  },

  {
    slug: "minor-issue",
    nav: null,
    title: "Minor issue resuelto: la Casación falló en 2026 (24045/2026)",
    description: "La Casación terminó con el minor issue en julio de 2026: el hijo menor no pierde la ciudadanía aunque el padre se naturalice. Qué significa para tu trámite.",
    ogTitle: "Minor issue: la Casación lo resolvió en julio de 2026",
    tipo: "articulo",
    h1: "El «minor issue», resuelto",
    content: `
<p class="entrada">Durante años frenó miles de expedientes: tu ancestro italiano se hizo ciudadano de otro país
mientras su hijo —el que sigue tu línea— todavía era menor, y el consulado consideraba cortada la cadena.
<strong>El 26 de julio de 2026 la Corte de Casación lo resolvió</strong>, y lo resolvió a favor de los descendientes.</p>

<section class="modulo" aria-labelledby="mi-fallo-titolo">
  <div class="modulo-intestazione">
    <span class="etichetta">LA NOVEDAD</span>
    <h2 id="mi-fallo-titolo">Qué dijo la Casación</h2>
  </div>
  <p>La <strong>sentencia 24045/2026 de las Secciones Unidas</strong> —la formación más alta de la Corte de Casación,
  la que se convoca justamente para zanjar discusiones— estableció que
  <strong>el hijo menor no perdió la ciudadanía italiana</strong> cuando su padre o madre se naturalizó extranjero,
  siempre que ese hijo <strong>ya tuviera la ciudadanía del país donde nació, desde el nacimiento</strong>.</p>
  <p>El razonamiento, leyendo los artículos 7 y 12 de la ley 555 de 1912: el chico ya era italiano por sangre y
  extranjero por suelo desde el día que nació. Esa doble condición original no se pierde por lo que después decida
  el padre.</p>
  <p><strong>Por qué importa tanto en Uruguay:</strong> acá se es uruguayo por haber nacido acá. Así que cualquier
  ancestro tuyo nacido en Uruguay tenía las dos ciudadanías desde el primer día, que es exactamente el supuesto que
  la Casación amparó. Lo mismo vale para las líneas con escala en Argentina, Brasil, Estados Unidos o Venezuela.</p>
</section>

<section class="modulo" aria-labelledby="mi-que-titolo">
  <div class="modulo-intestazione">
    <span class="etichetta">DE DÓNDE VENÍA</span>
    <h2 id="mi-que-titolo">La interpretación que acaba de caer</h2>
  </div>
  <p>La lectura restrictiva decía así: cuando el padre italiano se naturalizó extranjero, el hijo menor que estaba bajo
  su patria potestad perdió con él la ciudadanía italiana. Y si la perdió siendo menor, nunca pudo transmitírsela
  a los que vinieron después.</p>
  <p>Se aplicó de forma sistemática desde 2022-2023 — por eso hay gente cuyo primo tiene la ciudadanía y ella no,
  con el mismo abuelo. Esa etapa terminó.</p>
</section>

<section class="modulo" aria-labelledby="mi-uy-titolo">
  <div class="modulo-intestazione">
    <span class="etichetta">EN CLAVE URUGUAYA</span>
    <h2 id="mi-uy-titolo">Cómo saber si te toca</h2>
  </div>
  <p>Necesitás dos fechas: <strong>cuándo se naturalizó tu ancestro</strong> y <strong>cuándo nació el hijo</strong>
  que sigue la línea. La primera te la da el certificado de la Corte Electoral, que informa si adquirió la ciudadanía
  legal uruguaya y en qué fecha; la segunda, la partida de la DGREC.</p>
  <ul class="lista-simple">
    <li>Se naturalizó <strong>después</strong> de que el hijo cumpliera la mayoría de edad: no hay minor issue.</li>
    <li>Se naturalizó <strong>antes del nacimiento</strong> del hijo: la línea está cortada, y eso no es minor issue
    sino directamente falta de transmisión.</li>
    <li>Se naturalizó <strong>entre el nacimiento y la mayoría de edad</strong> del hijo: ahí estás en el caso.</li>
  </ul>
  <p>Por eso el certificado negativo de la Corte Electoral no es un trámite más: es el que define tu caso.
  Está en el <a href="documentos.html">paso 3 de la guía</a>.</p>
</section>

<section class="modulo" aria-labelledby="mi-salida-titolo">
  <div class="modulo-intestazione">
    <span class="etichetta">QUÉ HACER AHORA</span>
    <h2 id="mi-salida-titolo">Cómo te afecta en la práctica</h2>
  </div>
  <p>Una sentencia de Secciones Unidas fija el criterio para todos los tribunales italianos, así que los expedientes
  que estaban frenados por este motivo tienen ahora un respaldo muy sólido. De todos modos,
  <strong>la ventanilla consular puede tardar en alinearse</strong>: las oficinas suelen esperar instrucciones internas
  antes de cambiar la forma de resolver. Si te rebotaron un trámite por minor issue, este es el momento de
  reclamarlo con la sentencia en la mano.</p>
  <div class="avviso">
    <p class="avviso-capo">OJO: NO CAMBIA EL LÍMITE DE GENERACIONES</p>
    <p>Esto resuelve un problema concreto de la cadena, no la reforma. Si tu vínculo con Italia es de bisabuelo
    para atrás, la <a href="ley-74-2025.html">Ley 74/2025</a> te sigue dejando fuera de la vía consular, tengas o no
    minor issue. Son dos discusiones distintas: esta ya está resuelta, la otra está en el tribunal europeo.</p>
  </div>
  <p>Antes de contratar a nadie, conseguí las dos fechas y confirmá que efectivamente estabas en este caso.
  Muchas consultas que arrancan con «creo que tengo minor issue» terminan siendo otra cosa una vez que aparece
  el certificado de la Corte Electoral. Y para pelear un expediente rebotado, buscá un abogado que ya conozca
  la sentencia 24045/2026.</p>
</section>
`
  },

  {
    slug: "vias",
    nav: null,
    title: "Vía consular, judicial o residencia en Italia: cuál te conviene",
    description: "Las tres formas de obtener la ciudadanía italiana por descendencia comparadas: requisitos, costos, plazos y en qué caso conviene cada una.",
    ogTitle: "Las tres vías para la ciudadanía italiana, comparadas",
    tipo: "articulo",
    h1: "Consulado, tribunal o mudarse: las tres vías",
    content: `
<p class="entrada">Cuando alguien dice «estoy haciendo la ciudadanía» puede estar hablando de tres caminos muy
distintos. Esta es la comparación honesta, con lo bueno y lo malo de cada uno.</p>

<section class="modulo" aria-labelledby="tabla-titolo">
  <div class="modulo-intestazione">
    <span class="etichetta">COMPARATIVA</span>
    <h2 id="tabla-titolo">Las tres, una al lado de la otra</h2>
  </div>
  <div class="tabla-envoltura">
    <table class="comparativa">
      <thead>
        <tr><th scope="col">&nbsp;</th><th scope="col">Vía consular</th><th scope="col">Vía judicial</th><th scope="col">Residencia en Italia</th></tr>
      </thead>
      <tbody>
        <tr><th scope="row">Dónde</th><td>Embajada en Montevideo</td><td>Tribunales italianos, con abogado</td><td>Comune italiano donde vivas</td></tr>
        <tr><th scope="row">Para quién</th><td>Hijos y nietos de italianos</td><td>Caso 1948, falta de turno, expedientes rebotados</td><td>Quien pueda mudarse</td></tr>
        <tr><th scope="row">Hay que viajar</th><td>No</td><td>No</td><td>Sí, y vivir allá durante el trámite</td></tr>
        <tr><th scope="row">Costo principal</th><td>€600 de tasa</td><td>Honorarios de abogado</td><td>Mudanza y manutención</td></tr>
        <tr><th scope="row">Cuello de botella</th><td>Conseguir turno</td><td>Tiempos del tribunal</td><td>Alta anagráfica y verificación</td></tr>
        <tr><th scope="row">Documentos</th><td colspan="3">Los mismos en las tres: la línea completa, apostillada y traducida</td></tr>
      </tbody>
    </table>
  </div>
</section>

<section class="modulo" aria-labelledby="elegir-titolo">
  <div class="modulo-intestazione">
    <span class="etichetta">CÓMO ELEGIR</span>
    <h2 id="elegir-titolo">Cuál te toca, en una línea</h2>
  </div>
  <p><strong>Si tenés padre, madre, abuelo o abuela nacido en Italia y podés esperar el turno:</strong> vía consular,
  sin discusión. Es la más barata y no exige nada extraordinario. Lo único que la traba son los
  <a href="turnos-prenotami.html">turnos</a>.</p>
  <p><strong>Si tu caso es 1948 o llevás años sin conseguir cita:</strong>
  <a href="caso-1948.html">vía judicial</a>. No es un atajo: es el único camino cuando la ventanilla está cerrada por
  definición. El <a href="minor-issue.html">minor issue</a>, en cambio, dejó de ser motivo de juicio en julio de 2026:
  lo resolvió la Casación.</p>
  <p><strong>Si tenés la posibilidad real de mudarte:</strong> fijar residencia en un comune italiano suele ser más
  rápido que esperar turno consular. Requiere alta anagráfica, un domicilio verificable —los vigili pasan a
  constatar que vivís ahí— y sostener la estadía hasta el final. Los límites de la
  <a href="ley-74-2025.html">Ley 74/2025</a> se aplican igual: mudarse no te hace elegible si la ley dice que no.</p>
</section>

<section class="modulo" aria-labelledby="comun-titolo">
  <div class="modulo-intestazione">
    <span class="etichetta">LO QUE NO CAMBIA</span>
    <h2 id="comun-titolo">Los papeles son los mismos</h2>
  </div>
  <p>Elijas la vía que elijas, vas a necesitar la línea completa de actas, apostilladas y traducidas.
  Por eso conviene empezar por ahí y decidir después: armá tu <a href="mi-expediente.html">expediente</a> mientras
  evaluás, que ese trabajo no se pierde en ningún escenario.</p>
</section>

<section class="modulo" aria-labelledby="mitos-titolo">
  <div class="modulo-intestazione">
    <span class="etichetta">TRES CONFUSIONES HABITUALES</span>
    <h2 id="mitos-titolo">Lo que se dice y no es</h2>
  </div>
  <p><strong>«La vía judicial es más rápida».</strong> No necesariamente. Es más rápida que esperar un turno que
  nunca aparece, pero un juicio tiene sus propios tiempos y depende del tribunal que te toque. Se elige por
  necesidad —porque la ventanilla no puede resolver tu caso— y no por velocidad.</p>
  <p><strong>«Yendo a Italia te la dan enseguida».</strong> Fijar residencia implica alta anagráfica real: un domicilio
  donde vivas, con los <em>vigili</em> pasando a verificarlo, y sostener la estadía hasta que el comune resuelva.
  No es turismo con trámite; es mudarse.</p>
  <p><strong>«Un gestor me consigue el turno».</strong> Los turnos son gratuitos y salen en el portal oficial, para
  todos al mismo tiempo. Lo que se contrata, en el mejor de los casos, es que alguien intente reservar por vos en
  el mismo horario en que podés intentarlo solo. Cómo prepararte está en <a href="turnos-prenotami.html">turnos</a>.</p>
</section>

<section class="modulo" aria-labelledby="empezar-titolo">
  <div class="modulo-intestazione">
    <span class="etichetta">POR DÓNDE EMPEZAR</span>
    <h2 id="empezar-titolo">Antes de elegir vía, hacé el test</h2>
  </div>
  <p>La vía no se elige por gusto: la define tu línea familiar y la fecha en que presentaste, si presentaste.
  El <a href="mi-expediente.html">test</a> te dice en dos minutos en cuál de los seis escenarios estás, y de ahí sale
  cuál de estos tres caminos te toca. Si tu caso es de <a href="caso-1948.html">línea materna anterior a 1948</a>,
  ya sabés que vas a tribunales; si es de <a href="minor-issue.html">minor issue</a>, la Casación te dio la razón
  en 2026 y el camino volvió a ser el consular.</p>
</section>
`
  },

  {
    slug: "despues",
    nav: null,
    title: "Después de la ciudadanía italiana: AIRE, pasaporte y qué sigue",
    description: "Te reconocieron la ciudadanía: qué es el AIRE, cómo funciona FAST IT, cómo sacar el pasaporte italiano en Montevideo y si tus hijos la heredan.",
    ogTitle: "Ya sos italiano: AIRE, pasaporte y qué sigue",
    tipo: "articulo",
    h1: "Te reconocieron la ciudadanía. ¿Y ahora?",
    content: `
<p class="entrada">Casi toda la información disponible termina el día del reconocimiento. Pero ahí empieza otra etapa,
más corta y mucho más simple.</p>

<section class="modulo" aria-labelledby="aire-titolo">
  <div class="modulo-intestazione">
    <span class="etichetta">PRIMER PASO</span>
    <h2 id="aire-titolo">El AIRE: el padrón de italianos en el exterior</h2>
  </div>
  <p>El <span class="termine" tabindex="0" data-def="Anagrafe degli Italiani Residenti all'Estero: el registro de ciudadanos italianos que viven fuera de Italia. Es la base de todo lo demás.">AIRE</span>
  es el registro de los italianos que viven fuera de Italia. Estar inscripto es lo que te habilita a pedir pasaporte,
  votar y hacer trámites consulares.</p>
  <p>Buena noticia para quien tramitó por la Embajada en Montevideo: <strong>la inscripción la hace la propia oficina</strong>
  junto con el reconocimiento. No tenés que iniciarla vos. Lo que sí conviene es crear una cuenta en el portal
  <strong>FAST IT</strong> para ver tus datos y avisar cualquier cambio de domicilio.</p>
  <p>Mantener el domicilio actualizado no es un detalle burocrático: de ahí sale a dónde te mandan la documentación
  electoral y con qué datos figurás en el consulado.</p>
</section>

<section class="modulo" aria-labelledby="pass-titolo">
  <div class="modulo-intestazione">
    <span class="etichetta">EL DOCUMENTO</span>
    <h2 id="pass-titolo">El pasaporte italiano</h2>
  </div>
  <p>Con el AIRE en orden, el pasaporte se pide en la Embajada. El costo del pasaporte ronda los
  <strong class="mono">€116</strong> y se saca turno por el mismo sistema
  <a href="turnos-prenotami.html">Prenot@Mi</a>, aunque la agenda de pasaportes suele estar bastante menos peleada
  que la de ciudadanía.</p>
  <p>Consultá siempre el detalle vigente en la
  <a href="https://ambmontevideo.esteri.it/es/servizi-consolari-e-visti/servizi-per-il-cittadino-italiano/pasaportes/" rel="noopener">página oficial de pasaportes</a>
  de la Embajada: los requisitos de fotos y formularios cambian.</p>
</section>

<section class="modulo" aria-labelledby="hijos-titolo">
  <div class="modulo-intestazione">
    <span class="etichetta">LA FAMILIA</span>
    <h2 id="hijos-titolo">Tus hijos y tu cónyuge</h2>
  </div>
  <p>Los <strong>hijos menores</strong> tienen un procedimiento propio ante la Embajada, y la reforma de 2025 también
  lo modificó: hay declaraciones de voluntad y requisitos nuevos según el caso. El detalle está en la
  <a href="https://ambmontevideo.esteri.it/es/servizi-consolari-e-visti/servizi-per-il-cittadino-italiano/cittadinanza-figli-minorenni/" rel="noopener">página de ciudadanía de hijos menores</a>.</p>
  <p>No des por sentada la transmisión automática e infinita que existía antes de la
  <a href="ley-74-2025.html">Ley 74/2025</a>: para hijos nacidos en el exterior, la ley nueva puso condiciones.</p>
  <p>El <strong>cónyuge</strong> no adquiere la ciudadanía por el matrimonio en sí: hay un trámite aparte, con
  requisitos de tiempo de matrimonio y examen de italiano.</p>
</section>

<section class="modulo" aria-labelledby="doble-titolo">
  <div class="modulo-intestazione">
    <span class="etichetta">TRANQUILIDAD</span>
    <h2 id="doble-titolo">No perdés la ciudadanía uruguaya</h2>
  </div>
  <p>La nacionalidad uruguaya no se pierde por adquirir otra e Italia admite la doble ciudadanía. Vas a ser
  uruguayo e italiano —y ciudadano de la Unión Europea— al mismo tiempo, con los derechos de circulación,
  residencia y trabajo que eso implica en los 27 países del bloque.</p>
</section>
`
  }
];
