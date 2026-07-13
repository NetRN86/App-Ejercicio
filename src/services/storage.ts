import type { ActiveWorkoutState, UserSettings, WorkoutLog } from '../types';

const LOGS_KEY = 'armRoutine.logs.v1';
const SETTINGS_KEY = 'armRoutine.settings.v1';
const ACTIVE_KEY = 'armRoutine.activeWorkout.v1';

export const defaultSettings: UserSettings = {
  trainingDays: ['Martes', 'Viernes'],
  restAdjustmentSeconds: 0,
  soundEnabled: true,
  vibrationEnabled: true,
  theme: 'light',
  textSize: 'normal',
  showRecommendations: true,
};

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

export function getWorkoutLogs(): WorkoutLog[] {
  return readJson<WorkoutLog[]>(LOGS_KEY, []);
}

export function saveWorkoutLog(log: WorkoutLog): WorkoutLog[] {
  const logs = [log, ...getWorkoutLogs()];
  writeJson(LOGS_KEY, logs);
  return logs;
}

export function restoreWorkoutLogs(logs: WorkoutLog[]) {
  writeJson(LOGS_KEY, logs);
}

export function getSettings(): UserSettings {
  return { ...defaultSettings, ...readJson<Partial<UserSettings>>(SETTINGS_KEY, {}) };
}

export function saveSettings(settings: UserSettings) {
  writeJson(SETTINGS_KEY, settings);
}

export function getActiveWorkout(): ActiveWorkoutState | null {
  return readJson<ActiveWorkoutState | null>(ACTIVE_KEY, null);
}

export function saveActiveWorkout(state: ActiveWorkoutState) {
  writeJson(ACTIVE_KEY, state);
}

export function clearActiveWorkout() {
  if (typeof window !== 'undefined') window.localStorage.removeItem(ACTIVE_KEY);
}

export function resetAllProgress() {
  if (typeof window === 'undefined') return;
  window.localStorage.removeItem(LOGS_KEY);
  window.localStorage.removeItem(ACTIVE_KEY);
}
