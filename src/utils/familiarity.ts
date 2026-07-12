import type { PracticeAttempt, WorkoutLog } from '../types';

/**
 * Un ejercicio es "desconocido" si el usuario nunca lo ha practicado en el
 * modo de práctica ni completado en un entrenamiento real. Se usa para
 * ofrecer (sin forzar) una práctica de ritmo antes de su primer set.
 */
export function isExerciseUnfamiliar(exerciseId: string, logs: WorkoutLog[], attempts: PracticeAttempt[]): boolean {
  const trained = logs.some((log) => log.completedExercises.includes(exerciseId));
  const practiced = attempts.some((attempt) => attempt.exerciseId === exerciseId);
  return !trained && !practiced;
}
