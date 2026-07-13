import { describe, expect, it } from 'vitest';
import { BackupValidationError, createBackup, parseBackupFile } from '../utils/backup';
import { defaultSettings, saveSettings, saveWorkoutLog } from '../services/storage';
import { savePracticeAttempt } from '../services/practiceStorage';
import type { PracticeAttempt, WorkoutLog } from '../types';

const sampleLog: WorkoutLog = {
  id: 'log-1',
  date: '2026-07-11T20:00:00.000Z',
  sessionId: 'A',
  completedExercises: ['biceps-curl'],
  completedSets: [],
  durationSeconds: 600,
  rests: [],
  effort: 6,
  notes: '',
};

const sampleAttempt: PracticeAttempt = {
  id: 'practice-1',
  exerciseId: 'biceps-curl',
  date: '2026-07-11T20:00:00.000Z',
  reps: 6,
  accuracyScore: 80,
  feedback: 'ok',
};

describe('backup', () => {
  it('round-trips settings, logs and practice attempts through JSON', () => {
    window.localStorage.clear();
    saveSettings({ ...defaultSettings, theme: 'dark' });
    saveWorkoutLog(sampleLog);
    savePracticeAttempt(sampleAttempt);

    const backup = createBackup();
    const json = JSON.stringify(backup);
    const parsed = parseBackupFile(json);

    expect(parsed.settings.theme).toBe('dark');
    expect(parsed.logs).toHaveLength(1);
    expect(parsed.practiceAttempts).toHaveLength(1);
  });

  it('rejects invalid JSON', () => {
    expect(() => parseBackupFile('not json')).toThrow(BackupValidationError);
  });

  it('rejects a JSON file that is not a backup', () => {
    expect(() => parseBackupFile(JSON.stringify({ hello: 'world' }))).toThrow(BackupValidationError);
  });

  it('rejects a backup from a newer version than this app supports', () => {
    const future = { version: 99, settings: {}, logs: [], practiceAttempts: [] };
    expect(() => parseBackupFile(JSON.stringify(future))).toThrow(BackupValidationError);
  });
});
