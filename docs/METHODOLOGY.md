# Metodología — Scrum ligero

Versión reducida de Scrum, adaptada a un equipo de dos agentes de IA + un
Product Owner humano, sin ceremonias en vivo (se sustituyen por documentos y
mensajes async).

## Roles

- **Product Owner**: el usuario. Prioriza el backlog y acepta o rechaza
  entregables.
- **Equipo de desarrollo**: los agentes (Claude y GonzalezJD86). Estiman,
  implementan y proponen orden técnico dentro de cada sprint.

## Duración de sprint

Sprints cortos orientados a entregable, no a calendario fijo (dado que el
ritmo lo marca cuánto tiempo dedica el usuario a revisar). Un sprint =
"una épica o conjunto pequeño de historias que produce algo demostrable en
la app".

## Artefactos

- **Product Backlog**: [PRODUCT_BACKLOG.md](PRODUCT_BACKLOG.md) — lista
  priorizada de épicas e historias de usuario.
- **Sprint activo**: se marca dentro del propio backlog qué historias están
  en el sprint actual (columna Estado).
- **Incremento**: cada sprint termina con una rama lista para PR y, si aplica,
  una demo (correr la app y mostrarla).

## Ceremonias (versión async)

| Ceremonia Scrum | Equivalente aquí |
|---|---|
| Sprint Planning | El Product Owner y el agente acuerdan qué historias entran al sprint, en el chat |
| Daily Standup | No aplica (trabajo async); se sustituye por actualizar el estado de la historia en el backlog al tocarla |
| Sprint Review | Se corre la app y se muestra el incremento al Product Owner antes de cerrar el PR |
| Retrospectiva | Notas de lecciones aprendidas al final de cada épica, si aplica, en el propio PR |

## Definition of Ready (para que una historia entre a un sprint)

- Tiene criterios de aceptación claros.
- No depende de una decisión de producto pendiente.
- Se sabe en qué rama se va a implementar.

## Definition of Done

- Código implementado y sin errores de tipos (`npm run build` o `tsc`).
- Tests relevantes pasan (`npm test`).
- Probado corriendo la app (no solo tests).
- Sin datos sensibles ni credenciales en el commit.
- PR abierto hacia `master` siguiendo [CONTRIBUTING.md](../CONTRIBUTING.md).
