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

**Estado: Por priorizar**

- Como usuario, quiero simular el movimiento de un ejercicio dentro de la
  app (siguiendo un patrón/ritmo en pantalla) para practicar la secuencia
  antes de hacerlo con peso real.
- Como usuario, quiero recibir retroalimentación simple (a tiempo/ritmo
  correcto vs. fuera de ritmo) sobre mi simulación para saber si voy
  entendiendo el movimiento.
- Como usuario, quiero que mis intentos de práctica se guarden para ver si
  voy mejorando.

*Nota de alcance a definir con el Product Owner*: si la simulación se basa
solo en seguir un ritmo/patrón visual (sin cámara), o si se integra cámara
para detectar el movimiento real (mayor complejidad y requiere permisos del
dispositivo).

## Épica 3 — Expandir a otros grupos musculares

**Estado: Por priorizar**

- Como usuario, quiero rutinas de piernas, espalda, pecho y core, con la
  misma estructura que brazos (biblioteca, calentamiento, animaciones,
  progreso).
- Como usuario, quiero elegir qué grupo muscular entrenar cada día desde
  Inicio.

## Épica 4 — Recomendación de productos

**Estado: Por priorizar**

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
