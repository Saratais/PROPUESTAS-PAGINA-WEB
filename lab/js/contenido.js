/* ============================================================================
   contenido.js
   ----------------------------------------------------------------------------
   ESTE ES EL ÚNICO ARCHIVO QUE NECESITAS EDITAR PARA CARGAR TU CONTENIDO REAL.

   Aquí NO hay diseño ni HTML complicado: solo datos (nombres, textos, links).
   Los archivos equipo.html y publicaciones.html leen estos datos y los
   dibujan automáticamente en la página usando JavaScript (ver js/main.js).

   Reemplaza los valores de ejemplo (marcados como "[...]") por tu información
   real. No borres las comas ni las llaves { } - solo cambia el texto entre
   comillas "".
   ============================================================================ */

/* --------------------------------------------------------------------------
   1) DATOS GENERALES DEL LABORATORIO
   Usados en el hero de la página de inicio (index.html)
   -------------------------------------------------------------------------- */
const DATOS_LAB = {
  nombre: "[Nombre del Laboratorio]",
  institucion: "[Universidad / Facultad]",
  eslogan: "[Frase corta que resuma la misión del laboratorio]",
  descripcion:
    "[Párrafo de 2-3 líneas describiendo a qué se dedica el laboratorio, " +
    "qué problemas investiga y por qué importa]",
  correo: "[correo@institucion.edu]",
  direccion: "[Edificio, oficina, dirección postal]",

  /* "redes" es OPCIONAL: se usa para mostrar enlaces (Google Scholar,
     ORCID, LinkedIn, etc.) en la página de contacto. Si dejas un campo
     vacío ("") ese enlace simplemente no se muestra — no hace falta
     borrar la línea ni tocar ningún HTML. */
  redes: {
    scholar: "",   // Google Scholar del laboratorio o su director(a)
    orcid: "",     // Perfil ORCID
    linkedin: "",
    twitter: "",   // o "X"
    github: "",
  },
};

/* --------------------------------------------------------------------------
   2) LÍNEAS DE INVESTIGACIÓN
   Se muestran como tarjetas en index.html
   Agrega o quita objetos { } dentro del arreglo [ ] según necesites.
   -------------------------------------------------------------------------- */
const LINEAS_INVESTIGACION = [
  {
    titulo: "[Línea de investigación 1]",
    descripcion: "[Breve explicación de en qué consiste esta línea]",
  },
  {
    titulo: "[Línea de investigación 2]",
    descripcion: "[Breve explicación de en qué consiste esta línea]",
  },
  {
    titulo: "[Línea de investigación 3]",
    descripcion: "[Breve explicación de en qué consiste esta línea]",
  },
];

/* --------------------------------------------------------------------------
   3) EQUIPO ACTUAL
   Se muestran como tarjetas en equipo.html, agrupadas por "categoria".

   CATEGORIAS_EQUIPO define el ORDEN en que aparecen los grupos en la
   página (de arriba hacia abajo). Puedes agregar, quitar o renombrar
   categorías según cómo esté organizado tu laboratorio — solo asegúrate
   de que el texto de "categoria" en cada integrante coincida exactamente
   con uno de estos nombres. Si un integrante tiene una categoría que no
   está en esta lista (o no tiene "categoria"), se agrupa al final bajo
   "Otros".

   "foto" debe ser la ruta a una imagen dentro de assets/img/ (por ejemplo
   "assets/img/nombre-apellido.jpg"). Si la dejas vacía (""), se muestra
   un recuadro con las iniciales en su lugar.
   -------------------------------------------------------------------------- */
const CATEGORIAS_EQUIPO = [
  "Docentes",
  "Estudiantes de posgrado",
  "Estudiantes de pregrado",
  "Colaboradores",
];

const INTEGRANTES = [
  {
    nombre: "[Nombre Apellido]",
    categoria: "Docentes",
    rol: "[Director(a) del laboratorio]",
    bio: "[Una o dos líneas sobre su área de investigación]",
    foto: "",
  },
  {
    nombre: "[Nombre Apellido]",
    categoria: "Estudiantes de posgrado",
    rol: "[Estudiante de posgrado]",
    bio: "[Una o dos líneas sobre su área de investigación]",
    foto: "",
  },
  {
    nombre: "[Nombre Apellido]",
    categoria: "Estudiantes de pregrado",
    rol: "[Estudiante de pregrado]",
    bio: "[Una o dos líneas sobre su área de investigación]",
    foto: "",
  },
];

/* --------------------------------------------------------------------------
   3b) EGRESADOS / ALUMNI
   Se muestran en una sección aparte al final de equipo.html, en un formato
   más simple que las tarjetas del equipo actual (sin foto grande) — pensado
   para mostrar de un vistazo quién pasó por el laboratorio y a dónde llegó
   después, algo que suelen mostrar los laboratorios ya consolidados.

   "trabajo" y "destino" son opcionales: déjalos como "" si no aplican y
   esa línea simplemente no se muestra.

   Si dejas el arreglo vacío ([]), la sección "Egresados" completa
   desaparece de la página — no hace falta borrar el HTML.
   -------------------------------------------------------------------------- */
const EGRESADOS = [
  {
    nombre: "[Nombre Apellido]",
    periodo: "[2020–2023]",          // años que estuvo en el laboratorio
    trabajo: "[Título de tesis o proyecto, opcional]",
    destino: "[Dónde está ahora / primer puesto tras egresar, opcional]",
  },
];

/* --------------------------------------------------------------------------
   4) PUBLICACIONES
   Se muestran agrupadas por año en publicaciones.html
   "enlace" puede apuntar a un PDF, DOI, o dejarse como "#" si aún no existe.
   -------------------------------------------------------------------------- */
const PUBLICACIONES = [
  {
    anio: 2025,
    titulo: "[Título del artículo o paper]",
    autores: "[Apellido, A., Apellido, B.]",
    revista: "[Nombre de la revista o conferencia]",
    enlace: "#",
  },
  {
    anio: 2024,
    titulo: "[Título del artículo o paper]",
    autores: "[Apellido, A., Apellido, B.]",
    revista: "[Nombre de la revista o conferencia]",
    enlace: "#",
  },
];

/* --------------------------------------------------------------------------
   5) NOTICIAS / ANUNCIOS
   Se muestran en index.html, ordenadas automáticamente de la más reciente
   a la más antigua (no hace falta que las escribas en orden). Úsalas para
   avisos cortos: una publicación aceptada, una beca, un evento, alguien
   que se unió al equipo, etc. — lo que le da al sitio la sensación de que
   el laboratorio está activo.

   "fecha" va en formato "AAAA-MM-DD" (por ejemplo "2025-03-14") para que
   el orden funcione bien. "enlace" es opcional: déjalo como "" si la
   noticia no tiene más detalle en otra parte.

   Como el sitio no tiene paginación, te conviene ir borrando las noticias
   más viejas de tanto en tanto en vez de dejar que la lista crezca sin
   límite. Si dejas el arreglo vacío ([]), la sección "Noticias" completa
   desaparece de la página de inicio.
   -------------------------------------------------------------------------- */
const NOTICIAS = [
  {
    fecha: "2025-01-01",
    titulo: "[Título breve del anuncio]",
    resumen: "[Una o dos líneas describiendo la noticia]",
    enlace: "",
  },
];
