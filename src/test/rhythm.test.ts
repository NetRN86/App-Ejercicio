import { describe, expect, it } from 'vitest';
import { feedbackForScore, scoreRhythmAttempt } from '../utils/rhythm';

describe('rhythm scoring', () => {
  it('scores a perfectly-timed attempt near 100', () => {
    const start = 0;
    const interval = 2000;
    const taps = [2000, 4000, 6000];
    const result = scoreRhythmAttempt(taps, start, interval);
    expect(result.accuracyScore).toBe(100);
  });

  it('penalizes taps that drift from the target beat', () => {
    const start = 0;
    const interval = 2000;
    const taps = [2500, 4600, 7200];
    const result = scoreRhythmAttempt(taps, start, interval);
    expect(result.accuracyScore).toBeLessThan(100);
    expect(result.accuracyScore).toBeGreaterThanOrEqual(0);
  });

  it('never goes below zero for wildly off attempts', () => {
    const start = 0;
    const interval = 1000;
    const taps = [20000];
    const result = scoreRhythmAttempt(taps, start, interval);
    expect(result.accuracyScore).toBe(0);
  });

  it('maps score ranges to feedback messages', () => {
    expect(feedbackForScore(95)).toMatch(/Excelente/);
    expect(feedbackForScore(70)).toMatch(/Buen ritmo/);
    expect(feedbackForScore(20)).toMatch(/rápido o lento/);
  });
});
