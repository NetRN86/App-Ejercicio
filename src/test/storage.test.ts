import { beforeEach, describe, expect, it } from 'vitest';
import { defaultSettings, getSettings, getWorkoutLogs, resetAllProgress, saveSettings, saveWorkoutLog } from '../services/storage';
import type { WorkoutLog } from '../types';

const sampleLog: WorkoutLog = {
  id: 'log-1',
  date: '2026-07-11T20:00:00.000Z',
  sessionId: 'A',
  completedExercises: ['biceps-curl'],
  completedSets: [{ exerciseId: 'biceps-curl', setNumber: 1, repsTarget: '10 a 12 repeticiones', completedAt: '2026-07-11T20:02:00.000Z' }],
  durationSeconds: 1200,
  rests: [75],
  effort: 6,
  notes: 'Buena técnica.',
};

describe('storage service', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('saves and reads workout logs', () => {
    saveWorkoutLog(sampleLog);
    expect(getWorkoutLogs()).toHaveLength(1);
    expect(getWorkoutLogs()[0].sessionId).toBe('A');
  });

  it('merges saved settings with defaults', () => {
    saveSettings({ ...defaultSettings, theme: 'dark', soundEnabled: false });
    expect(getSettings().theme).toBe('dark');
    expect(getSettings().soundEnabled).toBe(false);
    expect(getSettings().trainingDays).toEqual(['Martes', 'Viernes']);
  });

  it('resets logs without breaking settings', () => {
    saveWorkoutLog(sampleLog);
    saveSettings({ ...defaultSettings, textSize: 'large' });
    resetAllProgress();
    expect(getWorkoutLogs()).toEqual([]);
    expect(getSettings().textSize).toBe('large');
  });
});
