# Product Backlog

Historias agrupadas por épica, en orden de prioridad. Estado:
`Hecho` / `En sprint` / `Por priorizar`.

## Épica 1 — Rutina guiada de brazos (MVP)

**Estado: Hecho** (rama `feature/gonzalezjd86`)

- Como usuario sin experiencia, quiero ver una rutina de brazos precargada
  para saber qué hacer hoy sin tener que planearla yo mismo.
- Como usuario, quiero un calentamiento guiado antes del ejercicio para
  reducir el riesgo de lesión.
- Como usuario, quiero ver instrucciones, errores comunes y músculos
  trabajados de cada ejercicio para aprender la técnica correcta.
- Como usuario, quiero registrar mi progreso semanal para mantenerme
  motivado.

## Épica 2 — Modo de práctica interactivo (tipo juego)

**Estado: Hecho** (primera versión) · Dueño: Claude (ver [WORK_ALLOCATION.md](WORK_ALLOCATION.md))

Decisión de alcance tomada: solo ritmo visual (sin cámara). El usuario elige
ejercicio y cadencia (lento/moderado/rápido), sigue un pulso visual y marca
cada repetición simulada; se calcula un puntaje de precisión de ritmo
(0-100) comparando el momento del tap contra el tempo objetivo, con
retroalimentación textual y guardado del mejor puntaje por ejercicio.
Pendiente para una siguiente iteración: detección de movimiento real
(cámara), que quedaría como épica separada si se decide abordarla.

- Como usuario, quiero simular el movimiento de un ejercicio dentro de la
  app (siguiendo un patrón/ritmo en pantalla) para practicar la secuencia
  antes de hacerlo con peso real.
- Como usuario, quiero recibir retroalimentación simple (a tiempo/ritmo
  correcto vs. fuera de ritmo) sobre mi simulación para saber si voy
  entendiendo el movimiento.
- Como usuario, quiero que mis intentos de práctica se guarden para ver si
  voy mejorando.

## Épica 3 — Expandir a otros grupos musculares

**Estado: En sprint** · Dueño: GonzalezJD86 (ver [WORK_ALLOCATION.md](WORK_ALLOCATION.md))

- Como usuario, quiero rutinas de piernas, espalda, pecho y core, con la
  misma estructura que brazos (biblioteca, calentamiento, animaciones,
  progreso).
- Como usuario, quiero elegir qué grupo muscular entrenar cada día desde
  Inicio.

## Épica 4 — Recomendación de productos

**Estado: Hecho** (primera versión) · Dueño: Claude (ver [WORK_ALLOCATION.md](WORK_ALLOCATION.md))

Primera versión con lista curada manual (6 productos: mancuernas, bandas,
accesorios, superficie), precios de referencia en MXN, enlaces de búsqueda
a Mercado Libre / Amazon México y nota de para qué ejercicio sirve cada uno.
Pendiente para una siguiente iteración: integración con API real de tienda
para precio/disponibilidad en vivo, y "envío a tu zona" verificado (por
ahora el usuario lo confirma él mismo al entrar al enlace).

- Como usuario, quiero ver qué equipo necesito para los ejercicios que aún
  no puedo hacer por falta de material (ej. bandas, mancuernas de otro
  peso, banco).
- Como usuario, quiero ver ejemplos concretos de producto con precio de
  referencia, no solo el nombre genérico.
- Como usuario, quiero saber si ese producto puede enviarse a mi zona antes
  de decidir comprarlo.

*Nota de alcance a definir*: de qué tienda(s)/API se obtienen precio y
disponibilidad de envío real (afecta si esto se puede automatizar o si por
ahora se cura manualmente una lista de productos).

## Backlog técnico (transversal)

- Formalizar `MuscleGroup` como entidad en vez de string literal (soporta
  Épica 3).
- Definir el modelo de `Product` y de dónde se obtienen sus datos (soporta
  Épica 4).
- Definir el modelo de `PracticeAttempt` y la mecánica de retroalimentación
  (soporta Épica 2).
