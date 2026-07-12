# Project Charter — App Ejercicio (Rutina en casa)

## 1. Propósito

Muchas personas evitan hacer ejercicio en casa por miedo a lesionarse al no
saber ejecutar los movimientos correctamente. Esta app resuelve esa barrera
ofreciendo una guía clara, visual y progresiva de ejercicios para hacer en
casa, empezando por brazos, con la meta de cubrir todos los grupos
musculares principales.

## 2. Objetivos del proyecto

1. Enseñar la técnica correcta de cada ejercicio mediante instrucciones,
   animaciones y errores comunes a evitar.
2. Permitir practicar el movimiento de forma guiada/interactiva dentro de la
   app antes de hacerlo con peso real, para reducir el riesgo de lesión.
3. Expandir la cobertura de ejercicios a todos los grupos musculares
   (piernas, espalda, pecho, core, además de brazos).
4. Recomendar al usuario el equipo que va a necesitar conforme avanza,
   con ejemplos concretos, precio de referencia y opción de envío a su zona.

## 3. Alcance

**Incluido:**
- Biblioteca de ejercicios por grupo muscular con instrucciones de
  seguridad.
- Rutinas guiadas (calentamiento, series, descansos, registro de progreso).
- Modo de práctica interactivo tipo "simulacro" del movimiento.
- Perfilado de productos (equipo recomendado) con precio y envío.

**Fuera de alcance (por ahora):**
- Planes nutricionales o de dieta.
- Seguimiento médico o diagnóstico de lesiones.
- Entrenadores en vivo o videollamadas.

## 4. Interesados (stakeholders)

| Rol | Quién | Responsabilidad |
|---|---|---|
| Product Owner | Usuario (dueño del proyecto) | Define prioridades y aprueba entregables |
| Equipo de desarrollo | Agente Claude (`feature/claude`) | Implementación, revisión, documentación técnica |
| Equipo de desarrollo | Agente GonzalezJD86 (`feature/gonzalezjd86`) | Implementación de features asignadas |

## 5. Criterios de éxito

- Un usuario sin experiencia puede completar una rutina completa sin
  necesitar ayuda externa para entender cómo se hace cada ejercicio.
- La app cubre al menos 4 grupos musculares principales con biblioteca y
  rutina propia.
- El modo de práctica interactivo existe y da retroalimentación básica
  sobre la ejecución simulada.
- El módulo de productos sugiere equipo relevante con precio y opción de
  envío para al menos una tienda/proveedor.

## 6. Restricciones y supuestos

- Proyecto desarrollado por agentes de IA en paralelo sobre el mismo
  repositorio (ver [CONTRIBUTING.md](../CONTRIBUTING.md)).
- Sin presupuesto ni fecha límite fija; se prioriza por valor entregado.
- Stack actual: React 19 + TypeScript + Vite (ver
  [DOMAIN_MODEL.md](DOMAIN_MODEL.md) para el modelo de datos).

## 7. Riesgos iniciales

| Riesgo | Impacto | Mitigación |
|---|---|---|
| Recomendar productos de forma incorrecta (precio/disponibilidad desactualizados) | Medio | Mostrar precios como referencia, no garantizados; enlazar a la fuente original |
| El modo de práctica interactivo da falsa sensación de seguridad sobre la técnica | Alto | Mantener avisos de seguridad visibles; dejar claro que no sustituye supervisión profesional |
| Duplicación de trabajo entre los dos agentes al no sincronizar ramas | Medio | Seguir el flujo de ramas y PRs de `CONTRIBUTING.md` |

## 8. Metodología

Ver [METHODOLOGY.md](METHODOLOGY.md) — Scrum ligero con sprints cortos.
