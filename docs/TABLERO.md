# Tablero de trabajo - estado vivo

> **Proposito:** que el Product Owner pueda asignar trabajo a cualquier
> agente en cualquier momento sin esperar a que otro termine. Cada agente
> **actualiza este archivo al empezar y al terminar** una tarea (mismo PR).
> Si vas a empezar algo, marcalo "En progreso" con tu nombre ANTES de
> escribir codigo, para que nadie lo duplique.

_Ultima actualizacion: 2026-07-12 por GonzalezJD86 - G2 recreada en `feature/rutina-pecho-v2`; G3 sigue abierta en PR #23 con CI verde._

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
| G2 - Rutina de pecho | GonzalezJD86 | `feature/rutina-pecho-v2` | Rama nueva creada desde `origin/master`. Reaplicando la rutina sin arrastrar la base vieja; la sesion convivira con core cuando se resincronice antes del PR. |
| G3 - Rutina de core | GonzalezJD86 | `feature/rutina-core` | PR #23 abierto con CI verde; pendiente de merge a `master`. |

## Tareas libres para GonzalezJD86 (Epicas 5 y 6)

| # | Tarea | Detalle |
|---|---|---|
| G4 | Plan semanal configurable | El usuario elige que sesion va que dia (guardar en `UserSettings` versionado); Inicio y Progreso dejan de asumir el orden fijo. Hacerla DESPUES de G1-G3. |
| G5 | Progresion sugerida simple | Regla: si el usuario completo todas las series de un ejercicio en las ultimas 3 sesiones, sugerir subir una repeticion. Mostrarlo en la tarjeta del ejercicio durante el entrenamiento. |

## Tareas libres para Claude (Epicas 7, 8 y 9)

| # | Tarea | Detalle |
|---|---|---|
| C5 | Rediseno visual de las figuras de animacion | **En pausa** - el usuario esta definiendo el estilo en otro proyecto. No tomar todavia. |

## Tareas cruzadas (Epica 10 - cualquiera puede tomarlas)

| # | Tarea | Detalle |
|---|---|---|
| X1b | Revision de contenido: productos y practica | Pendiente. GonzalezJD86 revisa `data/products.ts`, `PracticePage.tsx` y textos de `PreSetPractice.tsx` (escritos por Claude) contra criterios de claridad/seguridad, igual que Claude ya hizo con brazos/piernas/espalda (ver Hechas). |

## Hechas (mas reciente primero)

- [x] X1a - Revision de contenido de brazos, piernas y espalda: los 3 ejercicios de bisagra de cadera (peso muerto rumano, remo inclinado, pajaro inclinado) no tenian la instruccion explicita "detente si sientes dolor agudo en la espalda baja" pese a ser los de mayor riesgo lumbar para principiantes - corregido (Claude, PR pendiente de mezclar)
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
