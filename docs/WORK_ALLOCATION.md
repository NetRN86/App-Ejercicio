# Reparto de trabajo entre agentes

Cada agente es dueño de una épica completa del [PRODUCT_BACKLOG.md](PRODUCT_BACKLOG.md),
para poder avanzar en paralelo sin bloquearse mutuamente. Esto no reemplaza
el flujo de ramas/PR de [CONTRIBUTING.md](../CONTRIBUTING.md), lo complementa.

## Dueños por épica

| Épica | Dueño | Rama |
|---|---|---|
| Épica 1 — Rutina guiada de brazos (MVP) | GonzalezJD86 | `feature/gonzalezjd86` (ya entregado) |
| Épica 3 — Expandir a otros grupos musculares | GonzalezJD86 | `feature/gonzalezjd86` |
| Épica 2 — Modo de práctica interactivo | Claude | `feature/claude` |
| Épica 4 — Recomendación de productos | Claude | `feature/claude` |

**Razón del reparto:** GonzalezJD86 ya conoce a fondo el patrón de
`Exercise` / `WorkoutSession` / biblioteca porque construyó el MVP, así que
extenderlo a más grupos musculares es continuidad directa de su trabajo.
Claude toma las dos épicas que son funcionalidad nueva (no tocan la
biblioteca existente), lo que evita pisar el trabajo del otro agente desde
el diseño.

## Archivos exclusivos por agente

Mientras se trabaja una épica, estos archivos se consideran de uso
exclusivo del agente dueño (el otro agente no los edita sin coordinarlo
antes en el chat con el usuario):

- **GonzalezJD86** (Épica 3): `src/data/exercises.ts`, `src/data/workouts.ts`,
  `src/pages/LibraryPage.tsx`, `src/pages/RoutinePage.tsx`,
  `src/components/ExerciseCard.tsx`, `src/components/ExerciseAnimation.tsx`.
- **Claude** (Épicas 2 y 4): archivos nuevos bajo `src/pages/PracticePage.*`,
  `src/pages/ProductsPage.*`, `src/data/products.*`,
  `src/components/Practice*`, `src/components/Product*`.

## Archivos compartidos (requieren cambios pequeños y aislados)

Estos archivos los tocan ambos agentes en algún momento (routing, tipos de
dominio, navegación). Regla: cambios mínimos, un solo propósito por commit,
y mencionar en el mensaje de commit/PR qué se agregó, para que el merge sea
predecible:

- `src/types/index.ts` — cada agente solo agrega los tipos de su épica
  (ej. `Product`, `PracticeAttempt`), sin modificar los tipos existentes del
  otro.
- `src/App.tsx` — cada agente solo agrega su nueva entrada de navegación y
  su rama de `page === '...'`, sin reordenar ni tocar las páginas del otro.
- `docs/PRODUCT_BACKLOG.md` — se actualiza el estado de la historia propia
  (`Por priorizar` → `En sprint` → `Hecho`) sin reescribir historias del
  otro agente.

## Qué hacer si hay que tocar el área del otro agente

Si una épica realmente necesita cambiar algo que es del otro agente (ej.
Épica 4 quiere sugerir productos ligados a un `Exercise` existente), se
avisa en el chat con el usuario antes de tocar esos archivos, para evitar
conflictos silenciosos.
