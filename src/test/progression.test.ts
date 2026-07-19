import { describe, expect, it } from 'vitest';
import { exercises } from '../data/exercises';
import type { WorkoutLog } from '../types';
import { getProgressionSuggestion, increaseRepTarget } from '../utils/progression';

function buildLog(sessionId: WorkoutLog['sessionId'], completedExerciseIds: string[]): WorkoutLog {
  return {
    id: `${sessionId}-${completedExerciseIds.join('-')}`,
    date: new Date().toISOString(),
    sessionId,
    completedExercises: completedExerciseIds,
    completedSets: completedExerciseIds.flatMap((exerciseId) => {
      const exercise = exercises.find((item) => item.id === exerciseId);
      const sets = exercise?.sets ?? 0;
      return Array.from({ length: sets }, (_, index) => ({
        exerciseId,
        setNumber: index + 1,
        repsTarget: exercise?.reps ?? '',
        completedAt: new Date().toISOString(),
      }));
    }),
    durationSeconds: 1200,
    rests: [],
    effort: 6,
    notes: '',
  };
}

describe('increaseRepTarget', () => {
  it('increments every numeric part of a rep target', () => {
    expect(increaseRepTarget('8 a 10 repeticiones por lado')).toBe('9 a 11 repeticiones por lado');
  });
});

describe('getProgressionSuggestion', () => {
  it('suggests progression after 3 full recent completions', () => {
    const exercise = exercises.find((item) => item.id === 'biceps-curl');
    if (!exercise) throw new Error('exercise missing');

    const logs = [buildLog('A', ['biceps-curl']), buildLog('A', ['biceps-curl']), buildLog('A', ['biceps-curl'])];
    const suggestion = getProgressionSuggestion(exercise, logs);

    expect(suggestion?.currentTarget).toBe('10 a 12 repeticiones');
    expect(suggestion?.suggestedTarget).toBe('11 a 13 repeticiones');
  });

  it('does not suggest progression when one of the last 3 sessions was incomplete', () => {
    const exercise = exercises.find((item) => item.id === 'biceps-curl');
    if (!exercise) throw new Error('exercise missing');

    const incompleteLog: WorkoutLog = {
      ...buildLog('A', ['biceps-curl']),
      completedSets: [{ exerciseId: 'biceps-curl', setNumber: 1, repsTarget: exercise.reps, completedAt: new Date().toISOString() }],
    };
    const logs = [buildLog('A', ['biceps-curl']), incompleteLog, buildLog('A', ['biceps-curl'])];

    expect(getProgressionSuggestion(exercise, logs)).toBe(null);
  });

  it('does not suggest progression for time-based exercises', () => {
    const exercise = exercises.find((item) => item.id === 'isometric-hold');
    if (!exercise) throw new Error('exercise missing');

    const logs = [buildLog('B', ['isometric-hold']), buildLog('B', ['isometric-hold']), buildLog('B', ['isometric-hold'])];
    expect(getProgressionSuggestion(exercise, logs)).toBe(null);
  });
});
