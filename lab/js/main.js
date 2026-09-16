/* ============================================================================
   main.js
   ----------------------------------------------------------------------------
   Aquí SÍ hay lógica de interfaz. Está dividido en funciones pequeñas:
   cada una hace una sola cosa y se llama al final del archivo, dentro de
   DOMContentLoaded (es decir: "cuando el HTML ya esté listo, ejecuta esto").

   No necesitas tocar este archivo para cambiar contenido: para eso está
   contenido.js. Solo edita main.js si quieres cambiar CÓMO se comporta o
   se dibuja la interfaz.

   Cada función empieza revisando si el elemento que necesita existe en la
   página actual (por ejemplo, el filtro de publicaciones solo existe en
   publicaciones.html). Así el mismo main.js sirve para las 4 páginas sin
   generar errores en la consola cuando algo no aplica.
   ============================================================================ */

/**
 * 0) ESCAPAR HTML ANTES DE INSERTARLO
 * Varias funciones de aquí abajo insertan texto de contenido.js usando
 * innerHTML (es la forma más simple de generar tarjetas/listas dinámicas).
 * Si ese texto llega a contener algo como "<script>" o un atributo
 * "onerror=", el navegador podría llegar a ejecutarlo en vez de mostrarlo
 * como texto — eso es un XSS.
 *
 * Mientras tú eras la única persona que editaba contenido.js a mano, el
 * riesgo era mínimo. Pero si este proyecto pasa a aceptar cambios de otras
 * personas mediante Pull Requests (ver CONTRIBUTING.md), conviene que el
 * propio sitio también se defienda solo, además de la revisión humana.
 * Por eso todo texto que viene de contenido.js pasa por esta función antes
 * de insertarse.
 */
function escapeHTML(texto) {
  if (typeof texto !== "string") return "";
  return texto
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/**
 * 1) MENÚ RESPONSIVE
 * Muestra/oculta la navegación en pantallas angostas al presionar el botón
 * hamburguesa. Usa aria-expanded para que lectores de pantalla sepan si el
 * menú está abierto o cerrado.
 */
function initNavToggle() {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".main-nav");
  if (!toggle || !nav) return;

  toggle.addEventListener("click", () => {
    const abierto = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", abierto ? "true" : "false");
  });
}

/**
 * 2) RESALTAR EL LINK DE LA PÁGINA ACTUAL
 * Compara la URL actual con el href de cada link del menú y le agrega
 * aria-current="page" al que coincide. De paso, esta misma "ruta actual"
 * la reutilizan otras funciones de más abajo.
 */
function obtenerPaginaActual() {
  return window.location.pathname.split("/").pop() || "index.html";
}

function marcarPaginaActiva() {
  const rutaActual = obtenerPaginaActual();
  document.querySelectorAll(".main-nav a").forEach((link) => {
    const href = link.getAttribute("href");
    if (href === rutaActual) {
      link.setAttribute("aria-current", "page");
    }
  });
}

/**
 * 3) RENDERIZAR LÍNEAS DE INVESTIGACIÓN (index.html)
 * Recorre el arreglo LINEAS_INVESTIGACION (definido en contenido.js) y
 * genera una tarjeta HTML por cada elemento.
 */
function renderLineasInvestigacion() {
  const contenedor = document.querySelector("#lineas-investigacion");
  if (!contenedor || typeof LINEAS_INVESTIGACION === "undefined") return;

  if (LINEAS_INVESTIGACION.length === 0) {
    contenedor.innerHTML = '<p class="empty-state">Aún no hay líneas de investigación cargadas.</p>';
    return;
  }

  contenedor.innerHTML = LINEAS_INVESTIGACION.map((linea) => `
    <article class="research-card">
      <h3>${escapeHTML(linea.titulo)}</h3>
      <p>${escapeHTML(linea.descripcion)}</p>
    </article>
  `).join("");
}

/**
 * 4) RENDERIZAR EQUIPO (equipo.html)
 * Agrupa INTEGRANTES por "categoria" (Docentes, Estudiantes de posgrado,
 * etc.), respetando el orden definido en CATEGORIAS_EQUIPO. Cada grupo se
 * dibuja como su propia sub-sección con encabezado, igual que las
 * publicaciones se agrupan por año. Si "foto" está vacío, muestra las
 * iniciales del nombre en vez de una imagen rota.
 */
function tarjetaIntegrante(persona) {
  const nombreSeguro = escapeHTML(persona.nombre);
  const iniciales = escapeHTML(
    persona.nombre
      .split(" ")
      .map((palabra) => palabra[0])
      .join("")
      .slice(0, 2)
      .toUpperCase()
  );

  // Si hay foto, se usa la imagen; si no, se muestran las iniciales.
  // loading="lazy" evita descargar fotos que están fuera de pantalla hasta
  // que el usuario se acerca a ellas (útil cuando hay muchos integrantes).
  const foto = persona.foto
    ? `<img src="${escapeHTML(persona.foto)}" alt="Foto de ${nombreSeguro}" loading="lazy">`
    : iniciales;

  return `
    <div class="member-card">
      <div class="member-photo">${foto}</div>
      <div class="member-name">${nombreSeguro}</div>
      <div class="member-role">${escapeHTML(persona.rol)}</div>
      <p class="member-bio">${escapeHTML(persona.bio)}</p>
    </div>
  `;
}

function renderEquipo() {
  const contenedor = document.querySelector("#lista-equipo");
  if (!contenedor || typeof INTEGRANTES === "undefined") return;

  if (INTEGRANTES.length === 0) {
    contenedor.innerHTML = '<p class="empty-state">Aún no hay integrantes cargados.</p>';
    return;
  }

  // Agrupa integrantes por categoría, respetando el orden de
  // CATEGORIAS_EQUIPO (contenido.js). Los que tengan una categoría no
  // listada ahí (o ninguna) caen en "Otros", al final de la página.
  const categorias = typeof CATEGORIAS_EQUIPO !== "undefined" ? CATEGORIAS_EQUIPO : [];
  const grupos = {};
  INTEGRANTES.forEach((persona) => {
    const categoria = persona.categoria && categorias.includes(persona.categoria)
      ? persona.categoria
      : "Otros";
    if (!grupos[categoria]) grupos[categoria] = [];
    grupos[categoria].push(persona);
  });

  const ordenFinal = [...categorias.filter((c) => grupos[c]), ...(grupos["Otros"] ? ["Otros"] : [])];

  contenedor.innerHTML = ordenFinal.map((categoria) => `
    <div class="team-category">
      <h3 class="team-category-title">${escapeHTML(categoria)}</h3>
      <div class="team-grid">
        ${grupos[categoria].map(tarjetaIntegrante).join("")}
      </div>
    </div>
  `).join("");
}

/**
 * 4b) RENDERIZAR EGRESADOS (equipo.html)
 * Formato más simple que las tarjetas del equipo actual (sin foto grande),
 * pensado para mostrar de un vistazo quién pasó por el laboratorio. Si
 * EGRESADOS está vacío, la sección completa queda oculta (ver el atributo
 * "hidden" en equipo.html).
 */
function renderEgresados() {
  const contenedor = document.querySelector("#lista-egresados");
  const seccion = document.querySelector("#seccion-egresados");
  if (!contenedor || !seccion || typeof EGRESADOS === "undefined") return;

  if (EGRESADOS.length === 0) {
    seccion.hidden = true;
    return;
  }

  seccion.hidden = false;
  contenedor.innerHTML = EGRESADOS.map((persona) => {
    const periodo = persona.periodo ? ` <span class="alumni-periodo">(${escapeHTML(persona.periodo)})</span>` : "";
    const trabajo = persona.trabajo ? `<div class="alumni-meta">${escapeHTML(persona.trabajo)}</div>` : "";
    const destino = persona.destino ? `<div class="alumni-meta">${escapeHTML(persona.destino)}</div>` : "";
    return `
      <li class="alumni-item">
        <div class="alumni-name">${escapeHTML(persona.nombre)}${periodo}</div>
        ${trabajo}
        ${destino}
      </li>
    `;
  }).join("");
}

/**
 * 5) RENDERIZAR PUBLICACIONES (publicaciones.html)
 * Agrupa el arreglo PUBLICACIONES por año antes de dibujarlo. Además arma
 * el <select> para filtrar por año y vuelve a dibujar la lista cada vez
 * que cambia el filtro, sin recargar la página.
 */
function agruparPublicacionesPorAnio(lista) {
  const ordenadas = [...lista].sort((a, b) => b.anio - a.anio);
  const agrupadas = {};
  ordenadas.forEach((pub) => {
    if (!agrupadas[pub.anio]) agrupadas[pub.anio] = [];
    agrupadas[pub.anio].push(pub);
  });
  return agrupadas;
}

function dibujarListaPublicaciones(contenedor, anioSeleccionado) {
  const lista = anioSeleccionado === "todos"
    ? PUBLICACIONES
    : PUBLICACIONES.filter((pub) => String(pub.anio) === anioSeleccionado);

  if (lista.length === 0) {
    contenedor.innerHTML = '<p class="empty-state">No hay publicaciones para ese año.</p>';
    return;
  }

  const agrupadas = agruparPublicacionesPorAnio(lista);
  let html = "";
  Object.keys(agrupadas)
    .sort((a, b) => b - a)
    .forEach((anio) => {
      html += `<h3 class="pub-year">${escapeHTML(String(anio))}</h3>`;
      agrupadas[anio].forEach((pub) => {
        html += `
          <div class="pub-item">
            <div class="pub-title"><a href="${escapeHTML(pub.enlace)}">${escapeHTML(pub.titulo)}</a></div>
            <div class="pub-meta">${escapeHTML(pub.autores)} — ${escapeHTML(pub.revista)}</div>
          </div>
        `;
      });
    });

  contenedor.innerHTML = html;
}

function renderPublicaciones() {
  const contenedor = document.querySelector("#lista-publicaciones");
  const filtroContenedor = document.querySelector("#pub-filtro");
  const filtroSelect = document.querySelector("#filtro-anio");
  if (!contenedor || typeof PUBLICACIONES === "undefined") return;

  if (PUBLICACIONES.length === 0) {
    contenedor.innerHTML = '<p class="empty-state">Aún no hay publicaciones cargadas.</p>';
    if (filtroContenedor) filtroContenedor.hidden = true;
    return;
  }

  // El filtro por año solo tiene sentido si hay más de un año distinto.
  const aniosUnicos = [...new Set(PUBLICACIONES.map((pub) => pub.anio))].sort((a, b) => b - a);

  if (filtroSelect && filtroContenedor && aniosUnicos.length > 1) {
    filtroContenedor.hidden = false;
    filtroSelect.innerHTML =
      '<option value="todos">Todos los años</option>' +
      aniosUnicos.map((anio) => `<option value="${anio}">${escapeHTML(String(anio))}</option>`).join("");

    filtroSelect.addEventListener("change", () => {
      dibujarListaPublicaciones(contenedor, filtroSelect.value);
    });
  } else if (filtroContenedor) {
    filtroContenedor.hidden = true;
  }

  dibujarListaPublicaciones(contenedor, "todos");
}

/**
 * 6) DATOS GENERALES DEL LABORATORIO
 * Inserta nombre, eslogan, descripción, correo, etc. en cualquier elemento
 * que tenga el atributo data-lab="campo". Usa textContent (no innerHTML),
 * así que no necesita pasar por escapeHTML: el navegador nunca interpreta
 * textContent como HTML.
 */
function renderDatosLab() {
  if (typeof DATOS_LAB === "undefined") return;
  document.querySelectorAll("[data-lab]").forEach((el) => {
    const campo = el.getAttribute("data-lab");
    if (DATOS_LAB[campo] !== undefined) {
      el.textContent = DATOS_LAB[campo];
    }
  });
}

/**
 * 7) TÍTULO DE PESTAÑA Y AÑO DEL PIE DE PÁGINA
 */
function actualizarTitulo() {
  if (typeof DATOS_LAB === "undefined") return;
  document.title = document.title.replace("[Nombre del Laboratorio]", DATOS_LAB.nombre);
}

function actualizarAnio() {
  const el = document.getElementById("anio-actual");
  if (el) el.textContent = new Date().getFullYear();
}

/**
 * 8) ETIQUETAS META PARA BUSCADORES Y REDES SOCIALES (SEO básico)
 * Usa setAttribute (no innerHTML), así que igual que renderDatosLab no
 * necesita escapeHTML.
 */
function actualizarMetaEtiquetas() {
  if (typeof DATOS_LAB === "undefined") return;

  const descripcion = DATOS_LAB.descripcion || "";

  const metaDescripcion = document.querySelector('meta[name="description"]');
  if (metaDescripcion) metaDescripcion.setAttribute("content", descripcion);

  const ogTitulo = document.querySelector('meta[property="og:title"]');
  if (ogTitulo) ogTitulo.setAttribute("content", document.title);

  const ogDescripcion = document.querySelector('meta[property="og:description"]');
  if (ogDescripcion) ogDescripcion.setAttribute("content", descripcion);
}

/**
 * 9) DATOS ESTRUCTURADOS (JSON-LD) PARA BUSCADORES
 * JSON.stringify() ya produce un JSON válido y textContent lo inserta como
 * texto plano (no como HTML), así que esto tampoco necesita escapeHTML.
 */
function inyectarDatosEstructurados() {
  if (typeof DATOS_LAB === "undefined") return;
  if (obtenerPaginaActual() !== "index.html") return;

  const datos = {
    "@context": "https://schema.org",
    "@type": "ResearchOrganization",
    name: DATOS_LAB.nombre,
    description: DATOS_LAB.descripcion,
    email: DATOS_LAB.correo,
    address: DATOS_LAB.direccion,
    parentOrganization: DATOS_LAB.institucion,
  };

  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.textContent = JSON.stringify(datos);
  document.head.appendChild(script);
}

/**
 * 10) BOTÓN "VOLVER ARRIBA"
 */
function initBotonVolverArriba() {
  const boton = document.createElement("button");
  boton.className = "back-to-top";
  boton.type = "button";
  boton.setAttribute("aria-label", "Volver arriba");
  boton.hidden = true;
  boton.textContent = "↑";
  document.body.appendChild(boton);

  window.addEventListener("scroll", () => {
    boton.hidden = window.scrollY < 400;
  });

  boton.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

/**
 * 11) REDES / PERFILES ACADÉMICOS (contacto.html)
 */
function renderRedesSociales() {
  const lista = document.querySelector("#redes-sociales");
  if (!lista || typeof DATOS_LAB === "undefined" || !DATOS_LAB.redes) return;

  const ETIQUETAS = {
    scholar: "Google Scholar",
    orcid: "ORCID",
    linkedin: "LinkedIn",
    twitter: "Twitter / X",
    github: "GitHub",
  };

  const enlaces = Object.entries(DATOS_LAB.redes)
    .filter(([, url]) => url && url.trim() !== "")
    .map(([clave, url]) => `<li><a href="${escapeHTML(url)}">${escapeHTML(ETIQUETAS[clave] || clave)}</a></li>`)
    .join("");

  if (enlaces === "") return; // se queda oculta (atributo "hidden" del HTML)

  lista.innerHTML = enlaces;
  lista.hidden = false;
}

/**
 * 12) FORMULARIO DE CONTACTO
 */
function initFormularioContacto() {
  const formulario = document.getElementById("form-contacto");
  const mensaje = document.getElementById("form-mensaje");
  if (!formulario) return;

  formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();
    formulario.reset();
    if (mensaje) {
      mensaje.textContent =
        "Mensaje de ejemplo enviado. Recuerda: el formulario aún no está " +
        "conectado a un servicio de envío real (ver README.md).";
    }
  });
}

/**
 * 13) NOTICIAS / ANUNCIOS (index.html)
 * Ordena NOTICIAS de la más reciente a la más antigua automáticamente
 * (no depende del orden en que las escribiste en contenido.js). Si el
 * arreglo está vacío, la sección completa queda oculta.
 */
function renderNoticias() {
  const contenedor = document.querySelector("#lista-noticias");
  const seccion = document.querySelector("#seccion-noticias");
  if (!contenedor || !seccion || typeof NOTICIAS === "undefined") return;

  if (NOTICIAS.length === 0) {
    seccion.hidden = true;
    return;
  }
  seccion.hidden = false;

  const ordenadas = [...NOTICIAS].sort((a, b) => new Date(b.fecha) - new Date(a.fecha));

  contenedor.innerHTML = ordenadas.map((noticia) => {
    // "T00:00:00" evita que, según la zona horaria del navegador, la fecha
    // se corra un día hacia atrás al convertirla a texto legible.
    const fechaLegible = new Date(`${noticia.fecha}T00:00:00`).toLocaleDateString("es-ES", {
      year: "numeric", month: "long", day: "numeric",
    });
    const tituloSeguro = escapeHTML(noticia.titulo);
    const titulo = noticia.enlace
      ? `<a href="${escapeHTML(noticia.enlace)}">${tituloSeguro}</a>`
      : tituloSeguro;
    return `
      <article class="news-item">
        <time class="news-date" datetime="${escapeHTML(noticia.fecha)}">${escapeHTML(fechaLegible)}</time>
        <h3 class="news-title">${titulo}</h3>
        <p class="news-summary">${escapeHTML(noticia.resumen)}</p>
      </article>
    `;
  }).join("");
}

/* ----------------------------------------------------------------------------
   PUNTO DE ENTRADA
   Espera a que el HTML esté completamente cargado antes de tocar el DOM.
   ---------------------------------------------------------------------------- */
document.addEventListener("DOMContentLoaded", () => {
  initNavToggle();
  marcarPaginaActiva();
  actualizarAnio();
  renderDatosLab();
  actualizarTitulo();
  actualizarMetaEtiquetas();
  inyectarDatosEstructurados();
  renderLineasInvestigacion();
  renderEquipo();
  renderEgresados();
  renderNoticias();
  renderPublicaciones();
  renderRedesSociales();
  initFormularioContacto();
  initBotonVolverArriba();
});
