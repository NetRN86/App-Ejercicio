# Rutina de brazos principiante

Aplicación web responsive para seguir una rutina inicial de brazos, hombros y antebrazos en casa con dos mancuernas de 5 kg.

## Ejecutar localmente

```bash
npm install
npm run dev
```

Para compilar y probar:

```bash
npm run build
npm test
```

## Arquitectura

- `src/data/`: ejercicios y sesiones precargadas.
- `src/types/`: contratos TypeScript de ejercicios, sesiones, ajustes y registros.
- `src/services/`: persistencia con `localStorage`.
- `src/utils/`: lógica pura para temporizador y progreso.
- `src/components/`: tarjetas, animaciones, temporizador, barra de progreso y avisos.
- `src/pages/`: Inicio, Rutina, Entrenamiento activo, Biblioteca, Progreso y Configuración.

## Funcionalidades incluidas

- Sesiones A y B programadas para martes y viernes.
- Calentamiento guiado con contador y avance manual.
- Entrenamiento activo ejercicio por ejercicio.
- Series completables, omisión de ejercicios y descanso automático.
- Animaciones SVG/CSS propias para todos los ejercicios, con reproducir, pausar, reiniciar y cámara lenta.
- Biblioteca filtrable por grupo muscular y equipo.
- Registro de entrenamientos con esfuerzo y notas.
- Progreso persistente: historial, calendario semanal, totales y gráfica simple.
- Configuración de días, descanso, sonido, vibración, tema, tamaño de texto, recomendaciones y reinicio de progreso.
- Accesibilidad: navegación por teclado, etiquetas ARIA, buen contraste, botones grandes y soporte para `prefers-reduced-motion`.

La aplicación no sustituye a un médico ni a un entrenador. Detén el ejercicio si aparece dolor agudo.
