import type { WarmupStep, WorkoutSession } from '../types';

export const warmupSteps: WarmupStep[] = [
  { id: 'shoulders', name: 'Rotaciones de hombros', seconds: 45, cue: 'Haz circulos amplios hacia atras y luego hacia adelante.' },
  { id: 'elbows', name: 'Rotaciones de codos', seconds: 35, cue: 'Mantén los brazos relajados y mueve sin dolor.' },
  { id: 'wrists', name: 'Rotaciones de munecas', seconds: 35, cue: 'Gira lento en ambos sentidos.' },
  { id: 'wall-pushups', name: 'Flexiones contra la pared', seconds: 75, cue: 'Cuerpo recto, manos a la altura del pecho.' },
  { id: 'first-light', name: 'Serie lenta del primer ejercicio', seconds: 90, cue: 'Practica el patrón con menos rango y mucha calma.' },
];

export const workoutSessions: WorkoutSession[] = [
  {
    id: 'A',
    name: 'Sesion A',
    dayLabel: 'Martes',
    estimatedMinutes: '25 a 35 min',
    exerciseIds: ['biceps-curl', 'hammer-curl', 'shoulder-press', 'overhead-triceps', 'farmers-walk'],
  },
  {
    id: 'B',
    name: 'Sesion B',
    dayLabel: 'Viernes',
    estimatedMinutes: '25 a 35 min',
    exerciseIds: ['alternating-curl', 'reverse-curl', 'lateral-raise', 'triceps-kickback', 'isometric-hold'],
  },
];
