import { describe, expect, it } from 'vitest';
import type { WorkoutLog } from '../types';
import { countCompletedPlannedSessionsThisWeek, getDefaultWeeklyPlan, getNextPlannedEntry } from '../utils/planning';

function buildLog(sessionId: WorkoutLog['sessionId'], date: Date): WorkoutLog {
  return {
    id: `${sessionId}-${date.toISOString()}`,
    date: date.toISOString(),
    sessionId,
    completedExercises: [],
    completedSets: [],
    durationSeconds: 900,
    rests: [],
    effort: 6,
    notes: '',
  };
}

describe('planning utilities', () => {
  it('uses the planned session for today when it is still pending', () => {
    const plan = getDefaultWeeklyPlan();
    const reference = new Date(2026, 6, 17, 10, 0, 0);
    const next = getNextPlannedEntry(plan, [], reference);

    expect(next?.day).toBe('Viernes');
    expect(next?.sessionId).toBe('B');
  });

  it('moves to the next planned day when today is already completed', () => {
    const plan = getDefaultWeeklyPlan();
    const reference = new Date(2026, 6, 17, 10, 0, 0);
    const logs = [buildLog('B', new Date(2026, 6, 17, 8, 30, 0))];
    const next = getNextPlannedEntry(plan, logs, reference);

    expect(next?.day).toBe('Sábado');
    expect(next?.sessionId).toBe('C');
  });

  it('counts only planned day-session matches for the current week', () => {
    const plan = getDefaultWeeklyPlan();
    const reference = new Date(2026, 6, 17, 10, 0, 0);
    const logs = [
      buildLog('E', new Date(2026, 6, 13, 9, 0, 0)),
      buildLog('B', new Date(2026, 6, 17, 8, 30, 0)),
      buildLog('C', new Date(2026, 6, 18, 8, 30, 0)),
      buildLog('A', new Date(2026, 6, 17, 18, 0, 0)),
    ];

    expect(countCompletedPlannedSessionsThisWeek(plan, logs, reference)).toBe(3);
  });
});
