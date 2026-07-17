# Rutina en casa: guía de ejercicio

Aplicación web (PWA instalable) para aprender y practicar ejercicio en casa
sin miedo a lesionarte: biblioteca de técnica, rutinas guiadas por grupo
muscular, un modo de práctica de ritmo antes de usar peso real, y equipo
recomendado ligado a lo que realmente vas a entrenar.

App en vivo: <https://netrn86.github.io/App-Ejercicio/>

## Ejecutar localmente

```bash
npm install
npm run dev
```

Para compilar, probar y previsualizar el build de producción:

```bash
npm run build
npm test
npm run preview
```

## Arquitectura

- `src/data/`: ejercicios, sesiones y productos precargados.
- `src/types/`: contratos TypeScript (ejercicios, sesiones, ajustes, registros, productos, práctica) — un archivo por dominio, re-exportados desde `src/types/index.ts`.
- `src/services/`: persistencia con `localStorage` (progreso, ajustes, intentos de práctica).
- `src/utils/`: lógica pura — temporizador, progreso, puntuación de ritmo, sonido/vibración, respaldo.
- `src/components/`: tarjetas, animaciones, temporizador, banner de instalación, y demás piezas de UI reutilizables.
- `src/pages/`: Inicio, Rutina, Entrenamiento activo, Biblioteca, Practicar, Productos, Progreso y Configuración.

## Funcionalidades incluidas

**Rutinas y biblioteca**
- 6 sesiones guiadas cubriendo brazos, piernas, espalda, core y pecho, cada una con su propio calentamiento.
- Entrenamiento activo ejercicio por ejercicio: series completables, omisión de ejercicios y descanso automático.
- Biblioteca filtrable por grupo muscular y equipo, con animaciones propias por ejercicio (reproducir, pausar, reiniciar, cámara lenta).

**Practicar antes de usar peso real**
- Modo de práctica de ritmo: sigues un pulso visual y la app puntúa qué tan preciso fuiste.
- Se ofrece automáticamente antes del primer set de un ejercicio que nunca has hecho.
- Respeta tus ajustes de sonido/vibración.

**Productos**
- Catálogo de equipo recomendado con precio de referencia y enlace de búsqueda al proveedor.
- Cada ejercicio muestra en su tarjeta qué producto le sirve, si aplica.

**Progreso y respaldo**
- Historial, calendario semanal, racha de constancia y resumen de práctica (intentos, precisión promedio, mejor puntaje por ejercicio).
- Exportar/importar tu progreso completo como archivo, para no perderlo si cambias de teléfono.

**Instalación y accesibilidad**
- PWA instalable (funciona offline tras la primera visita), con banner propio de instalación.
- Navegación por teclado, etiquetas ARIA, buen contraste, botones grandes y soporte para `prefers-reduced-motion`.

## Cómo trabajamos en este repo

El proyecto lo desarrollan dos agentes de IA en paralelo. Antes de tocar
código, lee:

- [CONTRIBUTING.md](CONTRIBUTING.md) — flujo de ramas, PRs y CI.
- [docs/BITACORA.md](docs/BITACORA.md) — comunicación entre agentes.
- [docs/TABLERO.md](docs/TABLERO.md) — qué está en progreso, libre o hecho.
- [docs/PROJECT_CHARTER.md](docs/PROJECT_CHARTER.md) y [docs/PRODUCT_BACKLOG.md](docs/PRODUCT_BACKLOG.md) — propósito y épicas del proyecto.

La aplicación no sustituye a un médico ni a un entrenador. Detén el ejercicio si aparece dolor agudo.
