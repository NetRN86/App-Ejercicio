# Tablero de trabajo - estado vivo

> **Proposito:** que el Product Owner pueda asignar trabajo a cualquier
> agente en cualquier momento sin esperar a que otro termine. Cada agente
> **actualiza este archivo al empezar y al terminar** una tarea (mismo PR).
> Si vas a empezar algo, marcalo "En progreso" con tu nombre ANTES de
> escribir codigo, para que nadie lo duplique.
>
> Este archivo dice **que** esta pendiente. Para preguntas, avisos o
> bloqueos entre agentes, usa [docs/BITACORA.md](BITACORA.md).

_Ultima actualizacion: 2026-07-17 por GonzalezJD86 - G4, G5 y X1b listas en `feature/plan-semanal`; C9 y README ya estaban mezcladas en `master`._

## Como usar este tablero (para el Product Owner)

Dile a cualquier agente: **"toma la siguiente tarea libre del tablero"**.
El agente debe: (1) leer este archivo en `master`, (2) elegir la primera
tarea `Libre` de su columna, (3) marcarla `En progreso`, (4) trabajarla en
una rama corta segun [CONTRIBUTING.md](../CONTRIBUTING.md), (5) al mezclar
su PR, marcarla `Hecha` y agregar la(s) siguiente(s) tarea(s) que su epica
necesite.

## En progreso ahora

| Tarea | Agente | Rama | Nota |
|---|---|---|---|

## Tareas libres para GonzalezJD86 (Epicas 5 y 6)

| # | Tarea | Detalle |
|---|---|---|
| - | Sin tareas libres | Epicas 5 y 6 completas en `feature/plan-semanal`; falta abrir PR y mezclar. |

## Tareas libres para Claude (Epicas 7, 8 y 9)

| # | Tarea | Detalle |
|---|---|---|
| C5 | Rediseno visual de las figuras de animacion | **Fuera de alcance por ahora, indefinidamente** - decision del usuario (2026-07-13). No tomar ni preguntar por esto salvo que el lo pida explicitamente. |

## Tareas cruzadas (Epica 10 - cualquiera puede tomarlas)

| # | Tarea | Detalle |
|---|---|---|
| - | Sin tareas cruzadas libres | X1b quedo revisada y corregida en `feature/plan-semanal`. |

## Hechas (mas reciente primero)

- [x] G5 - Progresion sugerida simple: si el usuario completo todas las series de un ejercicio en sus ultimas 3 sesiones programadas, la app sugiere subir una repeticion durante el entrenamiento (GonzalezJD86, PR por abrir)
- [x] X1b - Revision de contenido de productos y practica: sin hallazgos en productos; se corrigio la practica de ritmo para no ofrecerla en ejercicios por tiempo, donde "marcar repeticiones" era confuso (GonzalezJD86, PR por abrir)
- [x] G4 - Plan semanal configurable: `UserSettings` versionado con `weeklyPlan`, editor por dia en Ajustes e Inicio/Progreso/Rutina leyendo el plan en vez del orden fijo (GonzalezJD86, PR por abrir)
- [x] C9 - Reanudar entrenamiento interrumpido: `saveActiveWorkout` guardaba progreso pero nada lo leia de vuelta; ahora un banner en Inicio ofrece reanudar (retoma ejercicio/serie exactos, salta el calentamiento) o descartar (Claude, PR #33)
- [x] Actualiza README para reflejar el estado real de la app (Claude, PR #32)
- [x] C8 - Resumen de practica de ritmo en Progreso: intentos totales, precision promedio, mejor precision por ejercicio (Claude, PR #31)
- [x] C7 - Banner propio de instalacion PWA (captura `beforeinstallprompt`, boton instalar/cerrar, no vuelve a insistir por 14 dias) (Claude, PR #30)
- [x] C6 - Respaldo de progreso: descargar/restaurar historial, ajustes e intentos de practica como archivo JSON, con validacion de formato/version (Epica 11) (Claude, PR #29)
- [x] Vinculo de productos con los 10 ejercicios de core y pecho + revision de seguridad de ambos grupos (sin hallazgos, buena calidad) (Claude, PR #28)
- [x] **Epica 5 completa** - cobertura de los 6 grupos musculares (brazos x2, piernas, espalda, core, pecho) terminada
- [x] G2 - Rutina de pecho con 5 ejercicios (knee-pushup, floor-press, squeeze-press, floor-fly, chest-squeeze-hold), poses propias en el sistema de animacion y calentamiento (GonzalezJD86, PR #26)
- [x] G3 - Rutina de core con 5 ejercicios (dead-bug, bird-dog, side-plank, russian-twist, hollow-hold), poses propias en el sistema de animacion y calentamiento (GonzalezJD86, PR #23)
- [x] X1a - Revision de contenido de brazos, piernas y espalda: los 3 ejercicios de bisagra de cadera (peso muerto rumano, remo inclinado, pajaro inclinado) no tenian la instruccion explicita "detente si sientes dolor agudo en la espalda baja" pese a ser los de mayor riesgo lumbar para principiantes - corregido (Claude, PR #22)
- [x] Vinculo de productos con los 5 ejercicios de espalda + etiquetas de grupo muscular en Progreso/Inicio (Claude, PR #21)
- [x] G1 - Rutina de espalda con 5 ejercicios, poses propias en el nuevo sistema de animacion y calentamiento (GonzalezJD86, PR #19)
- [x] C4 - App instalable como PWA con manifest, iconos y assets offline (Claude, PR #16). Epica 7-9 de Claude completa; queda pendiente que el usuario la instale y pruebe en un telefono real.
- [x] C3 - Productos ligados a ejercicios reales por id, sugeridos en la tarjeta del ejercicio (Claude, PR #15)
- [x] C2 - Sonido y vibracion en el metronomo de practica, respetando Ajustes (Claude, PR #14)
- [x] X2 - Rediseno de figuras de animacion por ejercicio (Claude, PR #12)
- [x] C1 - Practica de ritmo ofrecida antes del primer set de un ejercicio nuevo (Claude, PR #11)
- [x] Charter v2 + backlog de epicas 5-10 (Claude, PR #9)
- [x] Correccion de estado multi-grupo: titulo, progreso, proxima sesion (Claude, PR #8)
- [x] Modo de practica interactivo, ritmo visual (Claude, PR #7)
- [x] Rutina de piernas con calentamiento propio (GonzalezJD86, PR #6)
- [x] Catalogo de productos recomendados (Claude, PR #5)
- [x] Deploy automatico a GitHub Pages (Claude, PR #4)
- [x] CI build+test (Claude, PR #2)
- [x] MVP rutina de brazos (GonzalezJD86, PR #1)

## Reglas rapidas (resumen de CONTRIBUTING)

- Rama corta desde `origin/master`, PR con CI verde, mezclar y borrar rama.
- No tocar archivos de datos/paginas de la epica del otro agente sin avisar.
- Tipos nuevos en archivo propio (`src/types/<feature>.ts`) + re-export.
- Actualizar ESTE archivo en el mismo PR que empieza/termina la tarea.
- Guarda los archivos en UTF-8 con saltos de linea LF (no CRLF) para evitar perder acentos o generar diffs enormes.
- Preguntas, avisos o bloqueos para el otro agente van en [docs/BITACORA.md](BITACORA.md), no solo en el chat con el usuario.
