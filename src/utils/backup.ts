import { getPracticeAttempts, restorePracticeAttempts } from '../services/practiceStorage';
import { getSettings, getWorkoutLogs, restoreWorkoutLogs, saveSettings } from '../services/storage';
import type { PracticeAttempt, UserSettings, WorkoutLog } from '../types';

const BACKUP_VERSION = 1;

export interface BackupPayload {
  version: number;
  exportedAt: string;
  settings: UserSettings;
  logs: WorkoutLog[];
  practiceAttempts: PracticeAttempt[];
}

export function createBackup(): BackupPayload {
  return {
    version: BACKUP_VERSION,
    exportedAt: new Date().toISOString(),
    settings: getSettings(),
    logs: getWorkoutLogs(),
    practiceAttempts: getPracticeAttempts(),
  };
}

export function downloadBackup() {
  const payload = createBackup();
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `respaldo-rutina-${payload.exportedAt.slice(0, 10)}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export class BackupValidationError extends Error {}

function isBackupPayload(value: unknown): value is BackupPayload {
  if (!value || typeof value !== 'object') return false;
  const payload = value as Record<string, unknown>;
  return (
    typeof payload.version === 'number' &&
    typeof payload.settings === 'object' &&
    Array.isArray(payload.logs) &&
    Array.isArray(payload.practiceAttempts)
  );
}

export function parseBackupFile(rawJson: string): BackupPayload {
  let parsed: unknown;
  try {
    parsed = JSON.parse(rawJson);
  } catch {
    throw new BackupValidationError('El archivo no es un JSON válido.');
  }
  if (!isBackupPayload(parsed)) {
    throw new BackupValidationError('El archivo no tiene el formato de un respaldo de esta app.');
  }
  if (parsed.version > BACKUP_VERSION) {
    throw new BackupValidationError('Este respaldo viene de una versión más nueva de la app.');
  }
  return parsed;
}

export function applyBackup(payload: BackupPayload) {
  saveSettings({ ...payload.settings });
  restoreWorkoutLogs(payload.logs);
  restorePracticeAttempts(payload.practiceAttempts);
}
