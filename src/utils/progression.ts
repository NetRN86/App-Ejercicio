import { workoutSessions } from '../data/workouts';
import type { Exercise, WorkoutLog } from '../types';

export interface ProgressionSuggestion {
  currentTarget: string;
  suggestedTarget: string;
  supportingSessions: number;
}

function isRepProgressionEligible(exercise: Exercise) {
  return !exercise.reps.toLowerCase().includes('segundos');
}

function getLogsForExerciseSession(logs: WorkoutLog[], exerciseId: string) {
  return logs.filter((log) => {
    const session = workoutSessions.find((item) => item.id === log.sessionId);
    return !!session?.exerciseIds.includes(exerciseId);
  });
}

function completedAllSets(log: WorkoutLog, exercise: Exercise) {
  return log.completedSets.filter((set) => set.exerciseId === exercise.id).length >= exercise.sets;
}

export function increaseRepTarget(target: string) {
  return target.replace(/\d+/g, (match) => String(Number(match) + 1));
}

export function getProgressionSuggestion(exercise: Exercise, logs: WorkoutLog[]): ProgressionSuggestion | null {
  if (!isRepProgressionEligible(exercise)) return null;

  const recentRelevantLogs = getLogsForExerciseSession(logs, exercise.id).slice(0, 3);
  if (recentRelevantLogs.length < 3) return null;
  if (!recentRelevantLogs.every((log) => completedAllSets(log, exercise))) return null;

  return {
    currentTarget: exercise.reps,
    suggestedTarget: increaseRepTarget(exercise.reps),
    supportingSessions: 3,
  };
}
