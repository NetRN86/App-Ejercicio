import type { WarmupStep, WorkoutGroup, WorkoutSession } from '../types';

export const armWarmupSteps: WarmupStep[] = [
  { id: 'shoulders', name: 'Rotaciones de hombros', seconds: 45, cue: 'Haz circulos amplios hacia atras y luego hacia adelante.' },
  { id: 'elbows', name: 'Rotaciones de codos', seconds: 35, cue: 'Mueve los codos con suavidad y sin dolor.' },
  { id: 'wrists', name: 'Rotaciones de munecas', seconds: 35, cue: 'Gira lento en ambos sentidos.' },
  { id: 'wall-pushups', name: 'Flexiones contra la pared', seconds: 75, cue: 'Cuerpo recto, manos a la altura del pecho.' },
  { id: 'first-light', name: 'Serie lenta del primer ejercicio', seconds: 90, cue: 'Practica el patron con menos rango y mucha calma.' },
];

export const legWarmupSteps: WarmupStep[] = [
  { id: 'hip-circles', name: 'Rotaciones de cadera', seconds: 45, cue: 'Dibuja circulos lentos con la cadera en ambos sentidos.' },
  { id: 'knee-ankle-circles', name: 'Movilidad de rodillas y tobillos', seconds: 45, cue: 'Flexiona suave las rodillas y gira los tobillos sin dolor.' },
  { id: 'leg-swings', name: 'Balanceo de piernas', seconds: 60, cue: 'Balancea una pierna a la vez al frente y atras, sujetandote si hace falta.' },
  { id: 'bodyweight-squat', name: 'Sentadilla sin peso', seconds: 75, cue: 'Baja lento con pecho alto y rodillas siguiendo la linea de los pies.' },
  { id: 'calf-warmup', name: 'Elevaciones de talones sin peso', seconds: 45, cue: 'Sube y baja los talones con control para preparar tobillos y pantorrillas.' },
];

export const warmupStepsByGroup: Record<WorkoutGroup, WarmupStep[]> = {
  Brazos: armWarmupSteps,
  Piernas: legWarmupSteps,
};

export const warmupSteps = armWarmupSteps;

export const workoutSessions: WorkoutSession[] = [
  {
    id: 'A',
    name: 'Sesion A',
    dayLabel: 'Martes',
    estimatedMinutes: '25 a 35 min',
    group: 'Brazos',
    exerciseIds: ['biceps-curl', 'hammer-curl', 'shoulder-press', 'overhead-triceps', 'farmers-walk'],
  },
  {
    id: 'B',
    name: 'Sesion B',
    dayLabel: 'Viernes',
    estimatedMinutes: '25 a 35 min',
    group: 'Brazos',
    exerciseIds: ['alternating-curl', 'reverse-curl', 'lateral-raise', 'triceps-kickback', 'isometric-hold'],
  },
  {
    id: 'C',
    name: 'Sesion Piernas',
    dayLabel: 'Sabado',
    estimatedMinutes: '30 a 40 min',
    group: 'Piernas',
    exerciseIds: ['goblet-squat', 'romanian-deadlift', 'reverse-lunge', 'calf-raise', 'glute-bridge'],
  },
];
