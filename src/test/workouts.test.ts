import { describe, expect, it } from 'vitest';
import { exercises } from '../data/exercises';
import { backWarmupSteps, coreWarmupSteps, warmupStepsByGroup, workoutSessions } from '../data/workouts';

describe('workout catalog', () => {
  it('includes the back session with five valid exercises', () => {
    const backSession = workoutSessions.find((session) => session.id === 'D');

    expect(backSession).toBeDefined();
    expect(backSession?.group).toBe('Espalda');
    expect(backSession?.exerciseIds).toHaveLength(5);

    for (const exerciseId of backSession?.exerciseIds ?? []) {
      const exercise = exercises.find((item) => item.id === exerciseId);
      expect(exercise).toBeDefined();
      expect(exercise?.category).toBe('Espalda');
    }
  });

  it('maps a dedicated back warmup by group', () => {
    expect(warmupStepsByGroup.Espalda).toEqual(backWarmupSteps);
    expect(backWarmupSteps.map((step) => step.id)).toEqual([
      'scapular-circles',
      'cat-cow',
      'thoracic-rotation',
      'hip-hinge-drill',
      'light-row',
    ]);
  });

  it('includes the core session with five valid exercises and warmup', () => {
    const coreSession = workoutSessions.find((session) => session.id === 'E');

    expect(coreSession).toBeDefined();
    expect(coreSession?.group).toBe('Core');
    expect(coreSession?.exerciseIds).toHaveLength(5);
    expect(warmupStepsByGroup.Core).toEqual(coreWarmupSteps);

    for (const exerciseId of coreSession?.exerciseIds ?? []) {
      const exercise = exercises.find((item) => item.id === exerciseId);
      expect(exercise).toBeDefined();
      expect(exercise?.category).toBe('Core');
    }
  });
});
