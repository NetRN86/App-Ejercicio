import type { PracticeAttempt } from '../types';

const ATTEMPTS_KEY = 'armRoutine.practiceAttempts.v1';

function readJson<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function writeJson<T>(key: string, value: T) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(key, JSON.stringify(value));
}

export function getPracticeAttempts(): PracticeAttempt[] {
  return readJson<PracticeAttempt[]>(ATTEMPTS_KEY, []);
}

export function savePracticeAttempt(attempt: PracticeAttempt): PracticeAttempt[] {
  const attempts = [attempt, ...getPracticeAttempts()];
  writeJson(ATTEMPTS_KEY, attempts);
  return attempts;
}

export function getBestAccuracyForExercise(exerciseId: string): number | null {
  const attempts = getPracticeAttempts().filter((attempt) => attempt.exerciseId === exerciseId);
  if (attempts.length === 0) return null;
  return Math.max(...attempts.map((attempt) => attempt.accuracyScore));
}
