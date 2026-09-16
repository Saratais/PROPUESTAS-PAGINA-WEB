# Sitio web del laboratorio — guía rápida

Este proyecto es un sitio estático (solo HTML, CSS y JavaScript, sin
backend, sin base de datos y sin instalación de nada). Puedes abrirlo
localmente ahora mismo y, más adelante, subirlo tal cual a un hosting o
publicarlo mediante GitHub (ver la sección "Publicarlo con GitHub" más
abajo).

## Cómo verlo localmente

Simplemente abre `index.html` con doble clic (se abrirá en tu navegador).
También puedes arrastrar el archivo a una ventana del navegador.

> Nota: por eso el encabezado y pie de página están repetidos en cada
> página HTML en lugar de "incluirse" desde un solo archivo — los
> navegadores bloquean por seguridad esa técnica (`fetch`) cuando abres
> archivos directamente con `file://` en vez de con un servidor. Si más
> adelante usas una extensión como "Live Server" en VS Code, sí podrías
> unificarlos.

## Cómo insertar tu contenido real

**Todo tu contenido vive en un solo archivo: `js/contenido.js`.**
Ábrelo con cualquier editor de texto (VS Code, Notepad++, etc.) y
reemplaza los textos entre corchetes `[...]` por tu información real:

1. `DATOS_LAB` → nombre del laboratorio, institución, eslogan, correo,
   dirección y (opcional) redes/perfiles académicos.
2. `LINEAS_INVESTIGACION` → agrega un bloque `{ titulo, descripcion }` por
   cada línea de investigación.
3. `CATEGORIAS_EQUIPO` + `INTEGRANTES` → `CATEGORIAS_EQUIPO` define el
   orden de los grupos (Docentes, Estudiantes de posgrado, etc.) en
   `equipo.html`. Cada persona en `INTEGRANTES` necesita un bloque
   `{ nombre, categoria, rol, bio, foto }` — el texto de `categoria` debe
   coincidir exactamente con uno de los nombres de `CATEGORIAS_EQUIPO`.
   Deja `foto: ""` si no tienes foto todavía (se mostrarán sus iniciales
   automáticamente).
4. `EGRESADOS` (opcional) → agrega un bloque `{ nombre, periodo, trabajo,
   destino }` por cada ex-integrante. Si dejas el arreglo vacío (`[]`), la
   sección "Egresados" no aparece en `equipo.html`.
5. `PUBLICACIONES` → agrega un bloque `{ anio, titulo, autores, revista, enlace }`
   por cada publicación. Se ordenan y agrupan por año automáticamente, y
   aparece un filtro por año si hay publicaciones de más de un año.
6. `NOTICIAS` (opcional) → agrega un bloque `{ fecha, titulo, resumen, enlace }`
   por cada anuncio. Se ordenan solas de la más reciente a la más antigua
   en `index.html`. Si dejas el arreglo vacío (`[]`), la sección
   "Noticias" no aparece.

No necesitas tocar ningún archivo `.html` para agregar integrantes,
publicaciones o noticias: `js/main.js` las dibuja por ti a partir de esos
datos.

Las fotos van en `assets/img/` (lee el archivo `PON_TUS_IMAGENES_AQUI.txt`
dentro de esa carpeta).

Los únicos textos que sí están directamente en el HTML (porque son fijos
en cada página y no se repiten en una lista) son los párrafos de
introducción de cada sección — búscalos en cada `.html`, están marcados
con comentarios `[...]`.

## Estructura del proyecto

```
/
├── index.html            → página de inicio
├── equipo.html            → página de integrantes
├── publicaciones.html     → página de publicaciones
├── contacto.html          → página de contacto
├── css/
│   └── style.css          → todo el diseño visual (colores, tipografía, layout)
├── js/
│   ├── contenido.js        → TUS DATOS (edita este archivo)
│   └── main.js             → lógica de interfaz (menú, renderizado dinámico)
├── assets/
│   └── img/                → fotos e imágenes
├── scripts/
│   └── verificar-enlaces.js → usado por la verificación automática (ver abajo)
├── .github/
│   ├── CODEOWNERS           → quién debe revisar cada parte del proyecto
│   └── workflows/
│       └── verificacion.yml → revisa cada Pull Request automáticamente
├── README.md               → este archivo
├── CONTRIBUTING.md         → roles, permisos y cómo proponer cambios
└── SECURITY.md             → cómo reportar una vulnerabilidad
```

`index.html` está en la raíz a propósito: así, si publicas con GitHub
Pages, funciona sin configuración adicional.

## Cuando compres el dominio (subida manual, sin GitHub)

Si solo quieres subir el sitio por FTP/panel de hosting, no hace falta
cambiar nada en el código: sube todos estos archivos y carpetas tal cual,
asegurándote de que `index.html` quede en la raíz del sitio.

Si en algún momento quieres que el formulario de contacto envíe correos de
verdad, necesitarás conectar el `<form>` de `contacto.html` a un servicio
como Formspree, o a un backend propio — actualmente solo tiene la interfaz.

## Publicarlo con GitHub (control de versiones y colaboración)

Si varias personas (docentes, estudiantes) van a mantener este sitio, la
forma recomendada NO es que cada quien edite archivos y los suba por FTP.
Es usar GitHub como el lugar que controla quién puede cambiar qué. Este
proyecto ya está preparado para eso: `CONTRIBUTING.md` describe la política
completa (roles, permisos, cómo se aprueban los cambios), `SECURITY.md`
explica cómo reportar una vulnerabilidad, y `.github/CODEOWNERS` +
`.github/workflows/verificacion.yml` la hacen cumplir automáticamente.

Para activarlo, alguien con permisos de administrador tiene que hacer esto
**una vez**, directamente en la web de GitHub (no es algo que se pueda
dejar "ya configurado" dentro del código):

1. Crear el repositorio (idealmente dentro de una organización de GitHub
   del laboratorio, no en una cuenta personal — así el proyecto no
   depende de una sola persona).
2. Subir estos archivos tal cual, con `index.html` en la raíz del
   repositorio.
3. Editar `.github/CODEOWNERS` y reemplazar los usuarios de GitHub entre
   corchetes por los reales (administradores y docentes).
4. En **Settings → Branches → Branch protection rules**, proteger `main`:
   exigir Pull Request, exigir revisión aprobatoria, exigir que el check
   "Verificación del sitio" pase, bloquear push directo y force-push, y
   marcar la opción de que la regla también aplique a administradores.
5. En **Settings → Collaborators and teams**, dar a cada docente permiso
   *Write* (no *Admin*) y agregar administradores como *Owner* de la
   organización, según lo descrito en `CONTRIBUTING.md`.
6. Publicar el sitio con **Settings → Pages** (rama `main`, carpeta `/`) si
   vas a usar GitHub Pages, o configurar el despliegue hacia el servidor
   que la universidad te asigne.

Con eso, el flujo del día a día queda así: alguien propone un cambio en
una rama, abre un Pull Request, `verificacion.yml` revisa automáticamente
que no haya errores de sintaxis ni enlaces rotos, un docente lo revisa y
aprueba, y recién ahí se fusiona a `main` y se publica. Nadie edita el
sitio en producción directamente.

## Extras ya incluidos (no requieren que hagas nada)

Además del contenido, el sitio ya trae listas estas mejoras. No necesitas
tocarlas, pero es bueno saber que existen:

- **Nombre del laboratorio centralizado**: el logo, el título de la pestaña
  y el pie de página se completan solos desde `DATOS_LAB.nombre` — solo lo
  escribes una vez en `contenido.js`.
- **SEO básico**: `js/main.js` completa automáticamente la descripción y las
  etiquetas Open Graph de cada página (las que se ven al compartir el link
  en redes sociales) usando `DATOS_LAB.descripcion`.
- **Redes / perfiles académicos (opcional)**: en `contenido.js`, dentro de
  `DATOS_LAB.redes`, puedes agregar tu Google Scholar, ORCID, LinkedIn, X o
  GitHub. Si los dejas vacíos, esa lista simplemente no aparece en
  `contacto.html`.
- **Equipo por categorías y egresados** en `equipo.html` (ver
  `CATEGORIAS_EQUIPO` y `EGRESADOS` arriba).
- **Noticias/anuncios** en `index.html` (ver `NOTICIAS` arriba).
- **Filtro por año** en `publicaciones.html`: aparece solo si tienes
  publicaciones de más de un año.
- **Botón "volver arriba"** y **enlace "Saltar al contenido principal"**
  (accesibilidad por teclado).
- **Favicon de marcador de posición** en `assets/img/favicon.svg` — puedes
  reemplazarlo por tu logo real cuando lo tengas (mismo nombre de archivo,
  o cambia la ruta en el `<link rel="icon">` de cada `.html`).
- **Protección contra HTML/JavaScript malicioso en el contenido**: todo lo
  que viene de `contenido.js` pasa por una función `escapeHTML()` antes de
  mostrarse (ver `js/main.js`). Esto importa especialmente si el proyecto
  empieza a aceptar cambios de otras personas mediante Pull Requests (ver
  `CONTRIBUTING.md`): aunque alguien meta código malicioso en un nombre o
  un título, el sitio lo muestra como texto en vez de ejecutarlo.
