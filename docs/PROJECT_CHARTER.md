# Project Charter — App Ejercicio (Rutina en casa)

> **v2** — actualizado tras completar el MVP de brazos, piernas, catálogo de
> productos y modo de práctica interactivo. Ver historial de decisiones en
> [PRODUCT_BACKLOG.md](PRODUCT_BACKLOG.md).

## 1. Propósito

Muchas personas evitan hacer ejercicio en casa por miedo a lesionarse al no
saber ejecutar los movimientos correctamente. Esta app resuelve esa barrera
con tres pilares: **aprender la técnica sin miedo** (biblioteca guiada),
**practicar antes de cargar peso** (modo de práctica interactivo) y
**equiparse con lo justo** (recomendación de productos). Ya no es una app
de brazos con extras — es una guía completa de ejercicio en casa.

## 2. Objetivos del proyecto

### Ya cumplidos (v1)

1. Enseñar la técnica correcta de cada ejercicio mediante instrucciones,
   animaciones y errores comunes a evitar. — Hecho (Épica 1).
2. Permitir practicar el movimiento de forma guiada dentro de la app antes
   de hacerlo con peso real. — Hecho (Épica 2, solo ritmo visual, sin
   cámara).
3. Empezar a cubrir más de un grupo muscular (brazos + piernas). — En
   progreso (Épica 3).
4. Recomendar equipo con ejemplos concretos y precio de referencia. —
   Hecho, primera versión con lista curada (Épica 4).

### Siguiente etapa (v2)

5. **Cobertura completa**: sumar espalda, pecho y core a la Épica 3.
6. **Plan semanal real**: hoy el progreso asume sesiones fijas; con 4+
   grupos musculares hace falta un plan configurable (qué grupo qué día) y
   progresión sugerida (cuándo subir repeticiones o peso según el
   historial).
7. **Práctica integrada al flujo**: que el modo de práctica no viva solo en
   su propia pestaña — ofrecerlo antes del primer set de un ejercicio
   nuevo, usando los ajustes de sonido/vibración que ya existen.
8. **Productos ligados a la rutina real**: mostrar "te falta X para
   desbloquear Y ejercicio" en vez de una lista genérica; integración con
   API de tienda real queda para después.
9. **Usable como app de teléfono (PWA)**: instalable y funcional sin
   conexión — es donde realmente se usa mientras se entrena.
10. **Confiabilidad del contenido**: revisión cruzada entre agentes de los
    textos de técnica/seguridad, porque el valor central de la app es no
    lesionarte.

## 3. Alcance

**Incluido:**
- Biblioteca de ejercicios por grupo muscular con instrucciones de
  seguridad.
- Rutinas guiadas (calentamiento específico por grupo, series, descansos,
  registro de progreso).
- Modo de práctica interactivo de ritmo visual.
- Perfilado de productos (equipo recomendado) con precio de referencia y
  enlace de búsqueda al proveedor.
- Plan semanal configurable y progresión sugerida (v2).
- Instalación como PWA (v2).

**Fuera de alcance (por ahora):**
- Planes nutricionales o de dieta.
- Seguimiento médico o diagnóstico de lesiones.
- Entrenadores en vivo o videollamadas.
- Detección de movimiento real por cámara en el modo de práctica.
- Integración con API de tienda en tiempo real (precio/envío verificado
  automáticamente).

## 4. Interesados (stakeholders)

| Rol | Quién | Responsabilidad |
|---|---|---|
| Product Owner | Usuario (dueño del proyecto) | Define prioridades y aprueba entregables |
| Equipo de desarrollo | Agente Claude | Práctica interactiva, productos, PWA (ver [WORK_ALLOCATION.md](WORK_ALLOCATION.md)) |
| Equipo de desarrollo | Agente GonzalezJD86 | Cobertura de grupos musculares, plan semanal (ver [WORK_ALLOCATION.md](WORK_ALLOCATION.md)) |

## 5. Criterios de éxito

**Cumplidos:**
- Un usuario sin experiencia puede completar una rutina completa sin
  ayuda externa para entender cómo se hace cada ejercicio.
- El modo de práctica interactivo existe y da retroalimentación básica.
- El módulo de productos sugiere equipo relevante con precio de
  referencia.

**Nuevos para v2:**
- La app cubre al menos 4 grupos musculares principales con biblioteca,
  calentamiento y rutina propia.
- El usuario puede armar un plan semanal propio, no solo usar el fijo.
- La app es instalable y usable sin conexión desde un teléfono.

## 6. Restricciones y supuestos

- Proyecto desarrollado por agentes de IA en paralelo sobre el mismo
  repositorio (ver [CONTRIBUTING.md](../CONTRIBUTING.md)).
- Sin presupuesto ni fecha límite fija; se prioriza por valor entregado.
- Stack actual: React 19 + TypeScript + Vite (ver
  [DOMAIN_MODEL.md](DOMAIN_MODEL.md) para el modelo de datos).
- Deploy automático a GitHub Pages en cada push a `master`
  (https://netrn86.github.io/App-Ejercicio/).

## 7. Riesgos

| Riesgo | Impacto | Mitigación |
|---|---|---|
| Recomendar productos de forma incorrecta (precio/disponibilidad desactualizados) | Medio | Mostrar precios como referencia, no garantizados; enlazar a la fuente original |
| El modo de práctica interactivo da falsa sensación de seguridad sobre la técnica | Alto | Mantener avisos de seguridad visibles; dejar claro que no sustituye supervisión profesional |
| Duplicación de trabajo entre los dos agentes al no sincronizar ramas | Medio | Seguir el flujo de ramas y PRs de `CONTRIBUTING.md` |
| Cambios en la forma de los datos guardados en `localStorage` (historial, ajustes, intentos de práctica) rompen datos ya guardados de usuarios reales | Medio | Versionar las claves de `localStorage` (ya se usa sufijo `.v1`); si se cambia la forma de un dato existente, migrar o incrementar versión en vez de sobrescribir en silencio |
| Contenido de técnica/seguridad con algún error no detectado | Alto | Revisión cruzada entre agentes antes de publicar ejercicios nuevos |

## 8. Metodología

Ver [METHODOLOGY.md](METHODOLOGY.md) — Scrum ligero con sprints cortos.
