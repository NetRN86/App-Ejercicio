export type ExerciseCategory = 'Biceps' | 'Triceps' | 'Hombros' | 'Antebrazos';
export type Equipment = 'Una mancuerna de 5 kg' | 'Dos mancuernas de 5 kg';
export type Difficulty = 'Principiante';
export type AnimationType =
  | 'biceps-curl'
  | 'hammer-curl'
  | 'shoulder-press'
  | 'overhead-triceps'
  | 'farmers-walk'
  | 'alternating-curl'
  | 'reverse-curl'
  | 'lateral-raise'
  | 'triceps-kickback'
  | 'isometric-hold';

export interface Exercise {
  id: string;
  name: string;
  category: ExerciseCategory;
  equipment: Equipment;
  difficulty: Difficulty;
  sets: number;
  reps: string;
  restSeconds: number;
  instructions: string[];
  techniqueTips: string[];
  commonMistakes: string[];
  breathing: string;
  safetyNotes: string[];
  easierVariation: string;
  harderVariation: string;
  animationType: AnimationType;
  musclesWorked: string[];
  warning?: string;
}

export interface WarmupStep {
  id: string;
  name: string;
  seconds: number;
  cue: string;
}

export interface WorkoutSession {
  id: 'A' | 'B';
  name: string;
  dayLabel: string;
  estimatedMinutes: string;
  exerciseIds: string[];
}

export interface CompletedSet {
  exerciseId: string;
  setNumber: number;
  repsTarget: string;
  completedAt: string;
}

export interface WorkoutLog {
  id: string;
  date: string;
  sessionId: 'A' | 'B';
  completedExercises: string[];
  completedSets: CompletedSet[];
  durationSeconds: number;
  rests: number[];
  effort: number;
  notes: string;
}

export interface UserSettings {
  trainingDays: string[];
  restAdjustmentSeconds: number;
  soundEnabled: boolean;
  vibrationEnabled: boolean;
  theme: 'light' | 'dark';
  textSize: 'normal' | 'large';
  showRecommendations: boolean;
}

export interface ActiveWorkoutState {
  sessionId: 'A' | 'B';
  startedAt: number;
  currentExerciseIndex: number;
  currentSet: number;
  completedSets: CompletedSet[];
  skippedExerciseIds: string[];
  rests: number[];
}
