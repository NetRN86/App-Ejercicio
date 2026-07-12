# Tablero de trabajo — estado vivo

> **Propósito:** que el Product Owner pueda asignar trabajo a cualquier
> agente en cualquier momento sin esperar a que otro termine. Cada agente
> **actualiza este archivo al empezar y al terminar** una tarea (mismo PR).
> Si vas a empezar algo, márcalo "En progreso" con tu nombre ANTES de
> escribir código, para que nadie lo duplique.

_Última actualización: 2026-07-11 por GonzalezJD86._

## Cómo usar este tablero (para el Product Owner)

Dile a cualquier agente: **"toma la siguiente tarea libre del tablero"**.
El agente debe: (1) leer este archivo en `master`, (2) elegir la primera
tarea `Libre` de su columna, (3) marcarla `En progreso`, (4) trabajarla en
una rama corta según [CONTRIBUTING.md](../CONTRIBUTING.md), (5) al mezclar
su PR, marcarla `Hecha` y agregar la(s) siguiente(s) tarea(s) que su épica
necesite.

## En progreso ahora

| Tarea | Agente | Rama |
|---|---|---|
| G1 - Rutina de espalda | GonzalezJD86 | `feature/rutina-espalda` |

## Tareas libres para GonzalezJD86 (Épicas 5 y 6)

| # | Tarea | Detalle |
|---|---|---|
| G2 | Rutina de pecho | Igual que G1 pero para pecho. Puede compartir calentamiento con espalda si tiene sentido fisiológico, decidirlo explícitamente. |
| G3 | Rutina de core | Igual que G1 para core (mayoría peso corporal). |
| G4 | Plan semanal configurable | El usuario elige qué sesión va qué día (guardar en `UserSettings` versionado); Inicio y Progreso dejan de asumir el orden fijo. Hacerla DESPUÉS de G1–G3. |
| G5 | Progresión sugerida simple | Regla: si el usuario completó todas las series de un ejercicio en las últimas 3 sesiones, sugerir subir una repetición. Mostrarlo en la tarjeta del ejercicio durante el entrenamiento. |

## Tareas libres para Claude (Épicas 7, 8 y 9)

| # | Tarea | Detalle |
|---|---|---|
| C1 | Práctica antes del primer set | En `WorkoutPage`, si el ejercicio nunca se ha practicado ni entrenado, ofrecer (opcional, no forzar) un intento de práctica de ritmo antes del primer set. |
| C2 | Sonido/vibración en práctica | El metrónomo respeta `soundEnabled`/`vibrationEnabled` de Ajustes (beep con Web Audio, `navigator.vibrate`). |
| C3 | Productos ligados a ejercicios | "Te falta X para el ejercicio Y": cruzar `Product.usedFor` con los ejercicios reales por id (no por nombre en texto), y mostrar productos sugeridos en la tarjeta del ejercicio si aplica. |
| C4 | PWA instalable | Manifest + service worker (offline básico de assets). Probar en teléfono real. |

## Tareas cruzadas (Épica 10 — cualquiera puede tomarlas)

| # | Tarea | Detalle |
|---|---|---|
| X1 | Revisión de contenido: brazos y piernas | El agente que NO escribió el contenido revisa instrucciones/errores/calentamientos contra fuentes reconocidas y abre PR con correcciones. Claude revisa brazos+piernas (escritos por GonzalezJD86); GonzalezJD86 revisará productos/práctica (escritos por Claude). |

## Hechas (más reciente primero)

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
