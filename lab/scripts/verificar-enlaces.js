/* ============================================================================
   verificar-enlaces.js
   ----------------------------------------------------------------------------
   Revisa que cada href="..." o src="..." dentro de los .html del sitio
   apunte a un archivo que realmente existe en el repositorio. Se ejecuta
   automáticamente en cada Pull Request (ver
   .github/workflows/verificacion.yml) para detectar enlaces rotos antes de
   que lleguen a producción — por ejemplo, un typo al escribir la ruta de
   una foto en contenido.js, o un <link>/<script> mal escrito en un .html.

   Ignora enlaces externos (http/https), anclas (#...) y enlaces "mailto:".
   No revisa los enlaces que arma JavaScript en tiempo de ejecución a partir
   de contenido.js (por ejemplo pub.enlace) — eso es contenido, no
   estructura del sitio, y puede apuntar legítimamente a "#" o a un DOI
   externo.

   Se ejecuta con: node scripts/verificar-enlaces.js
   Termina con código de salida distinto de 0 si encuentra algún enlace
   roto, para que GitHub Actions marque el Pull Request como fallido.
   ============================================================================ */

const fs = require("fs");
const path = require("path");

const PAGINAS = ["index.html", "equipo.html", "publicaciones.html", "contacto.html"];

let huboError = false;

PAGINAS.forEach((pagina) => {
  if (!fs.existsSync(pagina)) {
    console.error(`❌ No se encontró ${pagina} en la raíz del repositorio.`);
    huboError = true;
    return;
  }

  const contenido = fs.readFileSync(pagina, "utf-8");
  const referencias = [...contenido.matchAll(/(?:href|src)="([^"]+)"/g)].map((m) => m[1]);

  referencias.forEach((ref) => {
    // Ignora enlaces externos, anclas dentro de la misma página, correo,
    // y el href="" vacío que main.js completa dinámicamente (meta tags).
    if (
      ref === "" ||
      /^(https?:)?\/\//.test(ref) ||
      ref.startsWith("#") ||
      ref.startsWith("mailto:") ||
      ref.startsWith("data:")
    ) {
      return;
    }

    const rutaLimpia = ref.split("#")[0];
    if (rutaLimpia === "") return;

    if (!fs.existsSync(path.resolve(rutaLimpia))) {
      console.error(`❌ ${pagina}: enlace roto -> "${ref}"`);
      huboError = true;
    }
  });
});

if (huboError) {
  console.error("\nHay enlaces rotos. Corrígelos antes de fusionar este Pull Request.");
  process.exit(1);
}

console.log("✅ No se encontraron enlaces internos rotos.");
