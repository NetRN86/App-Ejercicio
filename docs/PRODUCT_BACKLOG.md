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

## Épica 3 — Expandir a otros grupos musculares (piernas)

**Estado: Hecho** · Dueño: GonzalezJD86 (ver [WORK_ALLOCATION.md](WORK_ALLOCATION.md))

Rutina de piernas con biblioteca, animaciones y calentamiento propio
(movilidad de cadera/rodilla, no el calentamiento de brazos reutilizado).
Inicio ya permite elegir qué sesión entrenar entre brazos y piernas.

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

## Épica 5 — Cobertura completa (espalda, pecho, core)

**Estado: Hecho** · Dueño: GonzalezJD86 (ver [WORK_ALLOCATION.md](WORK_ALLOCATION.md))

Los 6 grupos musculares (brazos ×2 sesiones, piernas, espalda, core, pecho)
ya tienen biblioteca, calentamiento propio, poses de animación y equipo
recomendado. La app cubre el cuerpo completo para un principiante.

- Como usuario, quiero rutinas de espalda, pecho y core con la misma
  estructura que brazos y piernas (biblioteca, calentamiento propio,
  animaciones).
- Como usuario, quiero que cada grupo muscular nuevo tenga su propio
  calentamiento relevante (no reutilizar el de otro grupo sin adaptar).

## Épica 6 — Plan semanal configurable y progresión sugerida

**Estado: Por priorizar** · Dueño: GonzalezJD86 (ver [WORK_ALLOCATION.md](WORK_ALLOCATION.md))

- Como usuario, quiero armar mi propio plan semanal (qué grupo muscular
  entreno qué día), no solo usar el orden fijo que trae la app.
- Como usuario, quiero que la app me sugiera cuándo subir repeticiones o
  peso según mi historial, para progresar sin adivinar.

*Nota de alcance a definir*: si la progresión sugerida es una regla simple
(ej. "llevas 3 sesiones completando todas las series, sube una repetición")
o algo más elaborado; empezar con la regla simple.

## Épica 7 — Práctica integrada al flujo de entrenamiento

**Estado: Hecho** · Dueño: Claude (ver [WORK_ALLOCATION.md](WORK_ALLOCATION.md))

- Como usuario, quiero que se me ofrezca practicar el ritmo de un ejercicio
  nuevo justo antes de su primer set, no solo si entro manualmente a la
  pestaña de Practicar.
- Como usuario, quiero que la práctica respete mis ajustes de sonido y
  vibración ya configurados en Ajustes.

## Épica 8 — Productos ligados a la rutina real

**Estado: Hecho** · Dueño: Claude (ver [WORK_ALLOCATION.md](WORK_ALLOCATION.md))

- Como usuario, quiero ver "te falta X para desbloquear Y ejercicio" en vez
  de una lista genérica de productos sin relación con mi rutina actual.

## Épica 9 — App instalable (PWA)

**Estado: Hecho** · Dueño: Claude (ver [WORK_ALLOCATION.md](WORK_ALLOCATION.md))

- Como usuario, quiero instalar la app en mi teléfono y usarla sin
  conexión, porque es donde realmente entreno.

## Épica 10 — Revisión cruzada de contenido de seguridad

**Estado: En curso** · Dueño: Ambos, cruzada (ver [WORK_ALLOCATION.md](WORK_ALLOCATION.md))

- Cada agente revisa el contenido de técnica/seguridad que escribió el
  otro (instrucciones, errores comunes, calentamientos) contra fuentes
  reconocidas, porque el valor central de la app es no lesionar al usuario.
- Claude ya revisó brazos, piernas, espalda, core y pecho (sin hallazgos
  graves salvo el de bisagra de cadera, corregido). Falta X1b: GonzalezJD86
  revisa el contenido escrito por Claude (`products.ts`, textos de
  práctica).

## Épica 11 — Respaldo de progreso (exportar/importar)

**Estado: Hecho** · Dueño: Claude (ver [WORK_ALLOCATION.md](WORK_ALLOCATION.md))

- Como usuario, quiero exportar mi historial de entrenamientos y ajustes a
  un archivo para no perderlos si cambio de teléfono o borro datos del
  navegador.
- Como usuario, quiero poder importar ese archivo de vuelta y recuperar mi
  progreso exacto.

Motivación: todo el progreso vive únicamente en `localStorage` del
navegador — no hay ninguna copia fuera del dispositivo. Con 6 grupos
musculares y meses de historial potencial, perderlo por limpiar el
navegador o cambiar de equipo sería un golpe real a la constancia del
usuario.

## Backlog técnico (transversal)

- Formalizar `MuscleGroup` como entidad en vez de string literal (soporta
  Épica 5).
- Definir el modelo de `Product` y de dónde se obtienen sus datos (soporta
  Épica 8).
- Versionar cualquier cambio a la forma de los datos en `localStorage`
  (historial, ajustes, intentos de práctica) para no romper datos ya
  guardados de usuarios reales (ver riesgo en `PROJECT_CHARTER.md`).
