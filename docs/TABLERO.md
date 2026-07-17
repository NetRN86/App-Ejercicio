# Tablero de trabajo — estado vivo

> **Propósito:** que el Product Owner pueda asignar trabajo a cualquier
> agente en cualquier momento sin esperar a que otro termine. Cada agente
> **actualiza este archivo al empezar y al terminar** una tarea (mismo PR).
> Si vas a empezar algo, márcalo "En progreso" con tu nombre ANTES de
> escribir código, para que nadie lo duplique.
>
> Este archivo dice **qué** está pendiente. Para preguntas, avisos o
> bloqueos entre agentes, usa [docs/BITACORA.md](BITACORA.md).

_Última actualización: 2026-07-17 por GonzalezJD86 — G4, G5 y X1b listas en `feature/plan-semanal`; C8 ya estaba mezclada en `master`._

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

## Tareas libres para GonzalezJD86 (Épicas 5 y 6)

| # | Tarea | Detalle |
|---|---|---|
| — | Sin tareas libres | Épicas 5 y 6 completas en `feature/plan-semanal`; falta abrir PR y mezclar. |

## Tareas libres para Claude (Épicas 7, 8 y 9)

| # | Tarea | Detalle |
|---|---|---|
| C5 | Rediseño visual de las figuras de animación | **Fuera de alcance por ahora, indefinidamente** — decisión del usuario (2026-07-13). No tomar ni preguntar por esto salvo que él lo pida explícitamente. |

## Tareas cruzadas (Épica 10 — cualquiera puede tomarlas)

| # | Tarea | Detalle |
|---|---|---|
| — | Sin tareas cruzadas libres | X1b quedó revisada y corregida en `feature/plan-semanal`. |

## Hechas (más reciente primero)

- ✅ G5 — Progresión sugerida simple: si el usuario completó todas las series de un ejercicio en sus últimas 3 sesiones programadas, la app sugiere subir una repetición durante el entrenamiento (GonzalezJD86, PR por abrir)
- ✅ X1b — Revisión de contenido de productos y práctica: sin hallazgos en productos; se corrigió la práctica de ritmo para no ofrecerla en ejercicios por tiempo, donde "marcar repeticiones" era confuso (GonzalezJD86, PR por abrir)
- ✅ G4 — Plan semanal configurable: `UserSettings` versionado con `weeklyPlan`, editor por día en Ajustes e Inicio/Progreso/Rutina leyendo el plan en vez del orden fijo (GonzalezJD86, PR por abrir)
- ✅ C8 — Resumen de práctica de ritmo en Progreso: intentos totales, precisión promedio, mejor precisión por ejercicio (Claude, PR pendiente)
- ✅ C7 — Banner propio de instalación PWA (captura `beforeinstallprompt`, botón instalar/cerrar, no vuelve a insistir por 14 días) (Claude, PR #30)
- ✅ C6 — Respaldo de progreso: descargar/restaurar historial, ajustes e intentos de práctica como archivo JSON, con validación de formato/versión (Épica 11) (Claude, PR #29)
- ✅ Vínculo de productos con los 10 ejercicios de core y pecho + revisión de seguridad de ambos grupos (sin hallazgos, buena calidad) (Claude, PR #28)
- ✅ **Épica 5 completa** — cobertura de los 6 grupos musculares (brazos ×2, piernas, espalda, core, pecho) terminada
- ✅ G2 — Rutina de pecho con 5 ejercicios (knee-pushup, floor-press, squeeze-press, floor-fly, chest-squeeze-hold), poses propias en el sistema de animación y calentamiento (GonzalezJD86, PR #26)
- ✅ G3 — Rutina de core con 5 ejercicios (dead-bug, bird-dog, side-plank, russian-twist, hollow-hold), poses propias en el sistema de animación y calentamiento (GonzalezJD86, PR #23)
- ✅ X1a — Revisión de contenido de brazos, piernas y espalda: los 3 ejercicios de bisagra de cadera (peso muerto rumano, remo inclinado, pájaro inclinado) no tenían la instrucción explícita "detente si sientes dolor agudo en la espalda baja" pese a ser los de mayor riesgo lumbar para principiantes — corregido (Claude, PR #22)
- ✅ Vínculo de productos con los 5 ejercicios de espalda + etiquetas de grupo muscular en Progreso/Inicio (Claude, PR #21)
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
- Guarda los archivos en UTF-8 con saltos de línea LF (no CRLF) para evitar perder acentos o generar diffs enormes.
- Preguntas, avisos o bloqueos para el otro agente van en [docs/BITACORA.md](BITACORA.md), no solo en el chat con el usuario.
