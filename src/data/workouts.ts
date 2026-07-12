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

export const backWarmupSteps: WarmupStep[] = [
  { id: 'scapular-circles', name: 'Circulos escapulares', seconds: 40, cue: 'Lleva los hombros atras, abajo y adelante sin dolor para activar la espalda alta.' },
  { id: 'cat-cow', name: 'Gato-vaca', seconds: 50, cue: 'Alterna extension y flexion suave de columna mientras respiras profundo.' },
  { id: 'thoracic-rotation', name: 'Rotacion toracica', seconds: 50, cue: 'Gira el torso con calma hacia cada lado manteniendo la cadera estable.' },
  { id: 'hip-hinge-drill', name: 'Bisagra de cadera sin peso', seconds: 60, cue: 'Practica llevar la cadera atras con espalda larga y cuello neutral.' },
  { id: 'light-row', name: 'Remo lento sin peso', seconds: 60, cue: 'Lleva los codos hacia atras apretando los omoplatos al final.' },
];

export const chestWarmupSteps: WarmupStep[] = [
  { id: 'chest-circles', name: 'Circulos de hombros y pecho', seconds: 45, cue: 'Haz circulos amplios hacia atras y abre el pecho sin dolor.' },
  { id: 'wall-slide', name: 'Deslizamientos en pared', seconds: 45, cue: 'Apoya brazos en la pared y sube-baja con costillas controladas.' },
  { id: 'scapular-pushup', name: 'Flexion escapular suave', seconds: 50, cue: 'Desde pared o mesa, separa y junta los omoplatos sin doblar mucho los codos.' },
  { id: 'chest-opener', name: 'Apertura de pecho sin peso', seconds: 50, cue: 'Abre y cierra los brazos con codos suaves para preparar hombros y pectoral.' },
  { id: 'light-floor-press', name: 'Press lento sin peso', seconds: 60, cue: 'Simula el press con recorrido corto y hombros estables.' },
];

export const warmupStepsByGroup: Record<WorkoutGroup, WarmupStep[]> = {
  Brazos: armWarmupSteps,
  Piernas: legWarmupSteps,
  Espalda: backWarmupSteps,
  Pecho: chestWarmupSteps,
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
  {
    id: 'D',
    name: 'Sesion Espalda',
    dayLabel: 'Domingo',
    estimatedMinutes: '30 a 40 min',
    group: 'Espalda',
    exerciseIds: ['one-arm-row', 'bent-over-row', 'pullover', 'reverse-fly', 'superman-hold'],
  },
  {
    id: 'F',
    name: 'Sesion Pecho',
    dayLabel: 'Miercoles',
    estimatedMinutes: '30 a 40 min',
    group: 'Pecho',
    exerciseIds: ['knee-pushup', 'floor-press', 'squeeze-press', 'floor-fly', 'chest-squeeze-hold'],
  },
];
