# Tablero de trabajo — estado vivo

> **Propósito:** que el Product Owner pueda asignar trabajo a cualquier
> agente en cualquier momento sin esperar a que otro termine. Cada agente
> **actualiza este archivo al empezar y al terminar** una tarea (mismo PR).
> Si vas a empezar algo, márcalo "En progreso" con tu nombre ANTES de
> escribir código, para que nadie lo duplique.

_Última actualización: 2026-07-12 por GonzalezJD86 — G3 iniciada en feature/rutina-core._

## Cómo usar este tablero (para el Product Owner)

Dile a cualquier agente: **"toma la siguiente tarea libre del tablero"**.
El agente debe: (1) leer este archivo en `master`, (2) elegir la primera
tarea `Libre` de su columna, (3) marcarla `En progreso`, (4) trabajarla en
una rama corta según [CONTRIBUTING.md](../CONTRIBUTING.md), (5) al mezclar
su PR, marcarla `Hecha` y agregar la(s) siguiente(s) tarea(s) que su épica
necesite.

## En progreso ahora

| Tarea | Agente | Rama | Nota |
|---|---|---|---|
| G2 — Rutina de pecho | GonzalezJD86 | `feature/rutina-pecho` (commit `f94514b`, desactualizado) | G1 ya se mezcló (PR #19). Ya puedes **recrear la rama desde `origin/master` limpio** (`git fetch origin && git checkout -b feature/rutina-pecho-v2 origin/master`) y reaplicar los cambios de pecho ahí — no hagas merge de la rama vieja. No olvides las poses en `ExerciseAnimation.tsx` (sigue el patrón de `one-arm-row`/`bent-over-row`/etc. que ya quedó en `master`). |
| G3 - Rutina de core | GonzalezJD86 | `feature/rutina-core` | Mayormente peso corporal; misma estructura que G1 con calentamiento y poses propias. |`r`n
## Tareas libres para GonzalezJD86 (Épicas 5 y 6)

| # | Tarea | Detalle |
|---|---|---|
| G4 | Plan semanal configurable | El usuario elige qué sesión va qué día (guardar en `UserSettings` versionado); Inicio y Progreso dejan de asumir el orden fijo. Hacerla DESPUÉS de G1–G3. |
| G5 | Progresión sugerida simple | Regla: si el usuario completó todas las series de un ejercicio en las últimas 3 sesiones, sugerir subir una repetición. Mostrarlo en la tarjeta del ejercicio durante el entrenamiento. |

## Tareas libres para Claude (Épicas 7, 8 y 9)

| # | Tarea | Detalle |
|---|---|---|
| C5 | Rediseño visual de las figuras de animación | El usuario pidió un cambio de estilo completo (no solo ajustes) porque las figuras actuales "no se ven bien" y no comunican explícitamente cómo hacer el ejercicio. Se está eligiendo dirección con el usuario (mockups comparativos ya mostrados); pendiente de que confirme el estilo antes de rehacer las 20 poses. |

## Tareas cruzadas (Épica 10 — cualquiera puede tomarlas)

| # | Tarea | Detalle |
|---|---|---|
| X1 | Revisión de contenido: brazos y piernas | El agente que NO escribió el contenido revisa instrucciones/errores/calentamientos contra fuentes reconocidas y abre PR con correcciones. Claude revisa brazos+piernas (escritos por GonzalezJD86); GonzalezJD86 revisará productos/práctica (escritos por Claude). |

## Hechas (más reciente primero)

- ✅ G1 — Rutina de espalda con 5 ejercicios, poses propias en el nuevo sistema de animación y calentamiento (GonzalezJD86, PR #19)
- ✅ C4 — App instalable como PWA con manifest, iconos y assets offline (Claude, PR #16). Épica 7-9 de Claude completa; queda pendiente que el usuario la instale y pruebe en un teléfono real.
- ✅ C3 — Productos ligados a ejercicios reales por id, sugeridos en la tarjeta del ejercicio (Claude, PR #15)
- ✅ C2 — Sonido y vibración en el metrónomo de práctica, respetando Ajustes (Claude, PR #14)
- ✅ X2 — Rediseño de figuras de animación por ejercicio (Claude, PR #12)
- ✅ C1 — Práctica de ritmo ofrecida antes del primer set de un ejercicio nuevo (Claude, PR #11)
- ✅ Charter v2 + backlog de épicas 5–10 (Claude, PR #9)
- ✅ Corrección de estado multi-grupo: título, progreso, próxima sesión (Claude, PR #8)
- ✅ Modo de práctica interactivo, ritmo visual (Claude, PR #7)
- ✅ Rutina de piernas con calentamiento propio (GonzalezJD86, PR #6)
- ✅ Catálogo de productos recomendados (Claude, PR #5)
- ✅ Deploy automático a GitHub Pages (Claude, PR #4)
- ✅ CI build+test (Claude, PR #2)
- ✅ MVP rutina de brazos (GonzalezJD86, PR #1)

## Reglas rápidas (resumen de CONTRIBUTING)

- Rama corta desde `origin/master`, PR con CI verde, mezclar y borrar rama.
- No tocar archivos de datos/páginas de la épica del otro agente sin avisar.
- Tipos nuevos en archivo propio (`src/types/<feature>.ts`) + re-export.
- Actualizar ESTE archivo en el mismo PR que empieza/termina la tarea.

