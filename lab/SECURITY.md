# Política de seguridad

Este sitio es un proyecto estático (HTML, CSS y JavaScript) sin backend ni
base de datos, así que la mayoría de vulnerabilidades típicas de
aplicaciones web (inyección SQL, manejo de sesiones, IDOR, subida de
archivos, etc.) no aplican por diseño. Aun así, pueden aparecer problemas:
contenido que se inserta sin escapar, enlaces rotos, dependencias externas
comprometidas, configuración incorrecta del hosting, o accesos indebidos al
repositorio.

## Cómo reportar una vulnerabilidad

1. **No abras un issue público** describiendo el problema — eso lo expone
   antes de que se pueda corregir.
2. Contacta directamente y en privado a uno de los administradores del
   repositorio (ver `.github/CODEOWNERS` o la sección de contacto de
   README.md).
3. Describe el problema con el mayor detalle posible: qué encontraste, cómo
   reproducirlo y su impacto potencial.
4. No divulgues ni publiques la vulnerabilidad hasta que se haya corregido.

## Qué SÍ cubre esta política

- Contenido en `js/contenido.js` que logre ejecutarse como HTML/JavaScript
  en el navegador de otros visitantes (XSS) — aunque el sitio ya escapa
  este contenido automáticamente (`escapeHTML()` en `js/main.js`), un
  reporte de que esa protección falla en algún caso es bienvenido.
- Secretos (tokens, claves) expuestos accidentalmente en el historial de
  Git.
- Configuración insegura del hosting o el dominio (falta de HTTPS,
  cabeceras de seguridad ausentes, DNS mal configurado, etc.).
- Accesos de colaboradores fuera de la política descrita en
  `CONTRIBUTING.md` (por ejemplo, alguien con permisos que no debería
  tener, o una cuenta sin correo institucional verificado).
- Fallos en la protección de la rama `main` (por ejemplo, que se pueda
  hacer push directo sin pasar por revisión).

## Qué NO aplica (y por qué)

Este listado existe para que quien reporte algo sepa qué ya está fuera de
alcance por diseño, no por descuido:

- **Inyección SQL / NoSQL** — no hay base de datos.
- **Manipulación de sesiones o cookies de autenticación** — el sitio no
  tiene sistema de login propio; la identidad de los colaboradores la
  gestiona GitHub, no esta aplicación.
- **IDOR / control de acceso a recursos por ID** — no hay API ni backend
  que sirva datos por usuario.
- **Subida de archivos por parte de visitantes** — el sitio no ofrece
  ningún formulario de carga de archivos.
- **CSRF sobre el formulario de contacto** — mientras el formulario no esté
  conectado a un backend real (ver README.md), no ejecuta ninguna acción
  con efectos secundarios del lado del servidor.
