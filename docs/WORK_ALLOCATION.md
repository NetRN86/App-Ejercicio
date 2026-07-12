# Reparto de trabajo entre agentes

Cada agente es dueño de un conjunto de épicas del [PRODUCT_BACKLOG.md](PRODUCT_BACKLOG.md),
para poder avanzar en paralelo sin bloquearse mutuamente. Esto no reemplaza
el flujo de ramas/PR de [CONTRIBUTING.md](../CONTRIBUTING.md), lo complementa.

## Dueños por épica

| Épica | Dueño | Estado |
|---|---|---|
| 1 — Rutina guiada de brazos (MVP) | GonzalezJD86 | Hecho |
| 4 — Recomendación de productos (v1, lista curada) | Claude | Hecho |
| 2 — Modo de práctica interactivo (ritmo visual) | Claude | Hecho |
| 3 — Expandir a otros grupos musculares (piernas) | GonzalezJD86 | Hecho |
| 5 — Cobertura completa (espalda, pecho, core) | GonzalezJD86 | Pendiente — siguiente para GonzalezJD86 |
| 6 — Plan semanal configurable y progresión sugerida | GonzalezJD86 | Pendiente |
| 7 — Práctica integrada al flujo de entrenamiento | Claude | Pendiente — siguiente para Claude |
| 8 — Productos ligados a la rutina real | Claude | Pendiente |
| 9 — App instalable (PWA) | Claude | Pendiente |
| 10 — Revisión cruzada de contenido de seguridad | Ambos | Pendiente, cruzada (cada uno revisa el contenido del otro) |

**Razón del reparto v2:** cada agente continúa el área donde ya construyó
contexto. GonzalezJD86 sigue en datos/rutinas (grupos musculares y plan
semanal); Claude sigue en las features independientes de la biblioteca
(práctica, productos, PWA). La Épica 10 es la única deliberadamente cruzada,
porque el punto es que un agente revise lo que el otro no vio.

**Orden dentro de cada épica:** ramas cortas por historia, cada una
mezclada a `master` en cuanto está lista — no una rama gigante por épica.

## Decisiones de alcance ya tomadas

- **Épica 4 (productos):** lista curada manual (nombre, precio de
  referencia, enlace a la tienda). API de tienda real queda para después.
- **Épica 2 (práctica):** solo ritmo visual (sin cámara). Detección de
  movimiento real quedaría como épica separada si se decide abordarla.

## Cómo evitamos pisarnos: tipos y archivos por feature

En lugar de repartir "territorios" sobre archivos compartidos, cada épica
crea sus propios archivos:

- **Tipos:** cada épica define sus tipos en su propio archivo
  (`src/types/products.ts`, `src/types/practice.ts`, etc.).
  `src/types/index.ts` solo agrega re-exports (`export * from './products'`),
  una línea por feature — conflictos triviales de resolver.
- **Datos:** `src/data/products.ts`, archivos de ejercicios por grupo
  muscular, etc. — nunca editar los archivos de datos de la épica del otro.
- **Páginas y componentes:** archivos nuevos (`src/pages/ProductsPage.tsx`,
  `src/components/Product*.tsx`); no se modifican las páginas del otro
  agente salvo coordinación previa.

## Puntos de contacto compartidos

- **`src/App.tsx`**: cada agente solo agrega su entrada de navegación y su
  rama de `page === '...'` — cambios de pocas líneas, sin reordenar lo
  existente.
- **`src/pages/HomePage.tsx`**: a partir de la Épica 6 (plan semanal) este
  archivo deja de ser solo "territorio de GonzalezJD86" porque va a
  necesitar reflejar también productos/práctica sugeridos. Si Claude
  necesita tocarlo, avisar antes en el chat.
- Como las ramas son cortas y se mezclan seguido, la ventana de conflicto
  es mínima; si aun así hay conflicto, se resuelve en la rama de quien
  mezcla después.

## `docs/PRODUCT_BACKLOG.md`

Cada agente actualiza el estado solo de sus propias historias
(`Por priorizar` → `En sprint` → `Hecho`), sin reescribir las del otro.

## Qué hacer si hay que tocar el área del otro agente

Si una épica realmente necesita cambiar algo que es del otro agente, se
avisa en el chat con el usuario antes de tocar esos archivos, para evitar
conflictos silenciosos.
