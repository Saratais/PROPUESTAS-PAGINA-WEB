# Cómo contribuir a este repositorio

Este proyecto no tiene un sistema propio de usuarios y contraseñas. La
identidad de cada colaborador, sus permisos y el historial de cambios los
gestiona GitHub. Este documento describe quién puede cambiar qué, y cómo —
es la política de gobernanza del repositorio, no solo una guía técnica.

## Roles

### Administradores (2 personas)
Tienen la máxima autoridad sobre el repositorio (permiso *Owner/Admin* de
la organización de GitHub). Son responsables de configurar la protección
de la rama `main`, aprobar cambios al núcleo técnico del sitio (`css/`,
`js/main.js`, `.github/`, `scripts/`), e intervenir si algo sale mal.

Incluso los administradores trabajan mediante Pull Request en el flujo
ordinario: `main` está protegida también para ellos (ver más abajo). Un
administrador no puede aprobar su propio Pull Request.

### Docentes
Pueden proponer cambios a cualquier parte del proyecto — contenido y
código — pero no pueden hacer push directo a `main`. Sus cambios pasan por
revisión igual que los de cualquier otra persona, y un docente no puede
aprobar su propio Pull Request (separación de funciones).

Los docentes son quienes:
- Autorizan a nuevos colaboradores (ver "Política de incorporación").
- Revisan y aprueban los Pull Request de contenido (`js/contenido.js`, los
  archivos `.html`, `assets/`) que proponen los estudiantes.

Un docente puede otorgar acceso a un estudiante, pero **nunca** a un nivel
de permiso igual o superior al suyo propio (no puede nombrar administradores
ni otros docentes). Nadie puede delegar una autoridad que no posee.

### Estudiantes
No tienen permiso de escritura permanente sobre el repositorio. Para
proponer un cambio (agregar una publicación, actualizar el equipo, escribir
una noticia):

1. Crean una rama o un fork con el cambio.
2. Abren un Pull Request describiendo qué cambiaron y por qué.
3. La verificación automática (`.github/workflows/verificacion.yml`) revisa
   que no haya errores de sintaxis ni enlaces rotos.
4. Un docente revisa el cambio y lo aprueba o lo rechaza.
5. Solo entonces se fusiona a `main` y se publica.

Puede otorgarse un permiso de escritura temporal para un trabajo puntual,
pero no queda permanente por defecto — el modelo preferido es que el
estudiante nunca tenga capacidad continua de modificar el repositorio
oficial, solo de proponer cambios.

## Política de incorporación

Para unirse como colaborador (docente o estudiante) se requiere:

1. Cuenta de GitHub con correo verificado.
2. Ese correo debe terminar en `@epn.edu.ec`.
3. Verificación **manual** por parte de un docente responsable del
   laboratorio — no hay ninguna automatización que revise el dominio del
   correo; el docente entra a la cuenta de GitHub de la persona, confirma
   el correo institucional verificado, y decide.
4. Rol asignado por ese docente o por un administrador (nunca superior al
   suyo propio).

Una cuenta sin correo institucional `@epn.edu.ec` verificado no se
incorpora a la organización, sin excepciones, aunque el docente conozca
personalmente a esa persona.

## Protección de `main`

La rama `main` debe tener activadas estas reglas (se configuran una vez en
**Settings → Branches** de GitHub — ver README.md):

- ❌ Push directo (incluye administradores)
- ❌ Force push
- ❌ Eliminación de la rama
- ✅ Solo se puede fusionar mediante Pull Request
- ✅ Revisión aprobatoria obligatoria, según `.github/CODEOWNERS`
- ✅ El workflow `verificacion.yml` debe pasar antes de poder fusionar

## Qué revisa cada Pull Request

`.github/CODEOWNERS` define quién debe aprobar según qué archivos se
tocan: los cambios de contenido (`js/contenido.js`, los `.html`,
`assets/`) requieren aprobación de un docente; los cambios al núcleo
técnico (`css/`, `js/main.js`, `.github/`, `scripts/`) requieren
aprobación de un administrador.

## Prohibido

- Subir contraseñas, tokens o claves privadas al repositorio, ni siquiera
  temporalmente — el historial de Git los conserva aunque se "borren"
  después. Si en algún momento se necesita una clave (por ejemplo, para
  conectar el formulario de contacto a un servicio de envío de correos),
  se guarda como *GitHub Secret*, nunca en un archivo del repositorio.
- Modificar `main` directamente, saltándose el Pull Request.
- Desactivar las reglas de protección de rama.
- Modificar `.github/workflows/` o `scripts/` sin autorización de un
  administrador.
- Subir información personal de integrantes que ellos no hayan autorizado
  a publicar.

## Si algo sale mal

Git conserva el historial completo. Si un cambio aprobado resulta ser un
error, cualquier administrador puede revertirlo (`git revert`) sin
necesidad de reconstruirlo a mano. Aun así, se recomienda mantener un
backup del repositorio independiente de GitHub — el historial de Git ayuda
mucho, pero no debería ser la única copia de seguridad.

Si tienes dudas sobre si puedes hacer un cambio, contacta directamente con
uno de los administradores en vez de intentarlo primero y preguntar
después.
