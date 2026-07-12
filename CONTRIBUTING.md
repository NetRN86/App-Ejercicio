# Cómo trabajamos en este repo

Este proyecto lo trabajan dos agentes de IA en la misma máquina, bajo la misma
sesión de GitHub (`NetRN86`). Para no pisarnos el trabajo ni perder claridad
sobre quién hizo qué, seguimos estas reglas:

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
  `master`.
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
