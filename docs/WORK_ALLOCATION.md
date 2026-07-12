# Reparto de trabajo entre agentes

Cada agente es dueño de una épica completa del [PRODUCT_BACKLOG.md](PRODUCT_BACKLOG.md),
para poder avanzar en paralelo sin bloquearse mutuamente. Esto no reemplaza
el flujo de ramas/PR de [CONTRIBUTING.md](../CONTRIBUTING.md), lo complementa.

## Dueños por épica

| Épica | Dueño | Estado |
|---|---|---|
| Épica 1 — Rutina guiada de brazos (MVP) | GonzalezJD86 | Hecho — mezclado a `master` (PR #1) |
| Épica 3 — Expandir a otros grupos musculares | GonzalezJD86 | Pendiente |
| Épica 4 — Recomendación de productos | Claude | Pendiente — **siguiente para Claude** |
| Épica 2 — Modo de práctica interactivo | Claude | Pendiente — después de Épica 4 |

**Razón del reparto:** GonzalezJD86 ya conoce a fondo el patrón de
`Exercise` / `WorkoutSession` / biblioteca porque construyó el MVP, así que
extenderlo a más grupos musculares es continuidad directa de su trabajo.
Claude toma las dos épicas que son funcionalidad nueva (no tocan la
biblioteca existente). La Épica 4 va antes que la 2 porque es más acotada
(lista curada de productos) y entrega valor rápido; la práctica interactiva
es la más compleja y se aborda cuando el resto fluya.

**Orden dentro de cada épica:** ramas cortas por historia (ej.
`feature/rutina-piernas`, luego `feature/rutina-espalda`), cada una mezclada
a `master` en cuanto está lista — no una rama gigante por épica.

## Decisiones de alcance ya tomadas

- **Épica 4 (productos):** se empieza con una **lista curada manual** de
  productos (nombre, precio de referencia, enlace a la tienda). La
  integración con una API de tienda real queda para una iteración
  posterior; el modelo `Product` se diseña para soportar ambas fuentes.

## Cómo evitamos pisarnos: tipos y archivos por feature

En lugar de repartir "territorios" sobre archivos compartidos, cada épica
crea sus propios archivos:

- **Tipos:** cada épica define sus tipos en su propio archivo
  (`src/types/products.ts`, `src/types/practice.ts`, etc.).
  `src/types/index.ts` solo agrega re-exports (`export * from './products'`),
  una línea por feature — conflictos triviales de resolver.
- **Datos:** `src/data/products.ts`, nuevos archivos de ejercicios por grupo
  muscular, etc. — nunca editar los archivos de datos de la épica del otro.
- **Páginas y componentes:** archivos nuevos (`src/pages/ProductsPage.tsx`,
  `src/components/Product*.tsx`); no se modifican las páginas del otro
  agente salvo coordinación previa.

## Único punto de contacto real: `src/App.tsx`

Cada agente solo agrega ahí su entrada de navegación y su rama de
`page === '...'` — cambios de pocas líneas, sin reordenar lo existente.
Como las ramas son cortas y se mezclan seguido, la ventana de conflicto es
mínima; si aun así hay conflicto, se resuelve en la rama de quien mezcla
después.

## `docs/PRODUCT_BACKLOG.md`

Cada agente actualiza el estado solo de sus propias historias
(`Por priorizar` → `En sprint` → `Hecho`), sin reescribir las del otro.

## Qué hacer si hay que tocar el área del otro agente

Si una épica realmente necesita cambiar algo que es del otro agente (ej.
Épica 4 quiere ligar productos a un `Exercise` existente), se avisa en el
chat con el usuario antes de tocar esos archivos, para evitar conflictos
silenciosos.
