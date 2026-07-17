import { describe, expect, it } from 'vitest';
import { isExerciseUnfamiliar, isTempoPracticeEligible } from '../utils/familiarity';
import type { Exercise, PracticeAttempt, WorkoutLog } from '../types';

const logWith = (exerciseId: string): WorkoutLog => ({
  id: 'log-1',
  date: '2026-07-11T20:00:00.000Z',
  sessionId: 'A',
  completedExercises: [exerciseId],
  completedSets: [],
  durationSeconds: 100,
  rests: [],
  effort: 5,
  notes: '',
});

const attemptFor = (exerciseId: string): PracticeAttempt => ({
  id: 'practice-1',
  exerciseId,
  date: '2026-07-11T20:00:00.000Z',
  reps: 6,
  accuracyScore: 80,
  feedback: 'ok',
});

describe('isExerciseUnfamiliar', () => {
  it('is unfamiliar with no history at all', () => {
    expect(isExerciseUnfamiliar('biceps-curl', [], [])).toBe(true);
  });

  it('is familiar once trained in a workout', () => {
    expect(isExerciseUnfamiliar('biceps-curl', [logWith('biceps-curl')], [])).toBe(false);
  });

  it('is familiar once practiced in practice mode', () => {
    expect(isExerciseUnfamiliar('biceps-curl', [], [attemptFor('biceps-curl')])).toBe(false);
  });

  it('history of other exercises does not count', () => {
    expect(isExerciseUnfamiliar('biceps-curl', [logWith('goblet-squat')], [attemptFor('hammer-curl')])).toBe(true);
  });
});

describe('isTempoPracticeEligible', () => {
  function exerciseWithReps(reps: string): Exercise {
    return {
      id: 'demo',
      name: 'Demo',
      category: 'Biceps',
      equipment: 'Peso corporal',
      difficulty: 'Principiante',
      sets: 3,
      reps,
      restSeconds: 60,
      instructions: [],
      techniqueTips: [],
      commonMistakes: [],
      breathing: '',
      safetyNotes: [],
      easierVariation: '',
      harderVariation: '',
      animationType: 'biceps-curl',
      musclesWorked: [],
    };
  }

  it('allows rhythm practice for repetition-based exercises', () => {
    expect(isTempoPracticeEligible(exerciseWithReps('10 a 12 repeticiones'))).toBe(true);
  });

  it('skips rhythm practice for time-based exercises', () => {
    expect(isTempoPracticeEligible(exerciseWithReps('20 a 30 segundos'))).toBe(false);
  });
});
