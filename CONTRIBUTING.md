# Cómo trabajamos en este repo

Este proyecto lo trabajan dos agentes de IA en la misma máquina, bajo la misma
sesión de GitHub (`NetRN86`). Para no pisarnos el trabajo ni perder claridad
sobre quién hizo qué, seguimos estas reglas:

## 0. Comunicación entre agentes

Antes de empezar CUALQUIER sesión de trabajo, lee (en este orden):

1. [docs/BITACORA.md](docs/BITACORA.md) — la conversación entre agentes:
   preguntas, avisos, bloqueos, acuerdos. Puede haber algo dirigido a ti.
2. [docs/TABLERO.md](docs/TABLERO.md) — qué tarea está en progreso, libre o
   hecha.

Si tienes una pregunta para el otro agente, un aviso importante, o quedas
bloqueado por algo, **escríbelo en `docs/BITACORA.md` en vez de esperar a
que el usuario lo transmita**. Es un archivo append-only (solo se agrega al
final, nunca se edita lo que ya escribió el otro) — el protocolo completo
está en la cabecera de ese archivo.

## 1. Ramas: cortas y por historia, no por agente

Nunca se hacen commits directo a `master`. Cada historia o tarea se trabaja
en una rama corta con nombre descriptivo:

```
feature/rutina-piernas
feature/catalogo-productos
fix/timer-descanso
chore/actualizar-docs
```

Reglas de vida de una rama:

- Se crea desde `master` actualizado (`git fetch origin && git checkout -b feature/x origin/master`).
- Vive **días, no semanas**: en cuanto la historia cumple el Definition of
  Done (ver `docs/METHODOLOGY.md`), se abre PR y se mezcla.
- Después del merge, la rama se borra (local y remota).

> Nota histórica: las ramas permanentes por agente (`feature/claude`,
> `feature/gonzalezjd86`) quedaron **deprecadas** — divergían demasiado de
> `master`. `feature/gonzalezjd86` ya fue mezclada a master (PR #1); el
> agente GonzalezJD86 puede borrarla cuando confirme que no tiene trabajo
> local pendiente basado en ella.

## 2. Autoría de commits

Aunque se usa la misma cuenta de GitHub para el push, cada commit debe
identificar qué agente lo hizo:

```
git commit --author="GonzalezJD86 <email-de-esa-cuenta>" -m "mensaje del commit"
```

Mensajes de commit claros y en modo imperativo: "agrega X", "corrige Y",
no "agregado X" ni "cosas".

## 3. Antes de abrir un PR

- **Vuelve a sincronizar con `origin/master` justo antes de abrir el PR**,
  no solo cuando creaste la rama (`git fetch origin && git merge
  origin/master`). En una sesión larga con dos agentes, `master` sigue
  avanzando mientras trabajas — sincronizar una vez al inicio no basta.
  Revisa `docs/TABLERO.md` en `origin/master` para ver qué se mezcló
  después de que empezaste.
- `npm run build` pasa sin errores.
- `npm test` pasa.
- La app se probó corriendo (`npm run dev`), no solo con tests.

El repo tiene CI (GitHub Actions) que corre build + tests en cada PR y cada
push a `master`. **Un PR con CI en rojo no se mezcla.**

## 4. Integrar a master

1. Abre un Pull Request de tu rama hacia `master`:
   ```
   gh pr create --base master --head feature/<tu-rama> --title "..." --body "..."
   ```
2. Espera a que el CI esté en verde.
3. El otro agente (o el usuario) revisa el PR antes de mezclarlo.
4. Al mezclar, borra la rama (`gh pr merge N --merge --delete-branch`).

## 5. Sincronización y conflictos

- Antes de empezar trabajo nuevo, **siempre** `git fetch origin` y parte de
  `origin/master`, no de una rama vieja.
- Si `master` avanzó mientras trabajabas, trae los cambios a tu rama
  (`git merge origin/master`) y resuelve los conflictos ahí, nunca en
  `master`. Haz esto **de nuevo justo antes de abrir el PR** (ver sección 3)
  — no asumas que sigues sincronizado solo porque lo estabas al empezar.
- Ante la duda en un conflicto, deja el conflicto señalado y pide
  confirmación al usuario en vez de descartar cambios del otro agente.

## 6. Qué no hacer

- No hacer `git push --force` sobre `master`.
- No borrar ni reescribir ramas del otro agente sin coordinarlo antes.
- No mezclar un PR con CI en rojo.
- No commitear archivos de configuración local (`.claude/`, credenciales,
  tokens, `node_modules/`) — ya están en `.gitignore`.

## 7. Reparto de trabajo

Quién es dueño de qué épica y qué archivos son de cada quien:
[docs/WORK_ALLOCATION.md](docs/WORK_ALLOCATION.md).
