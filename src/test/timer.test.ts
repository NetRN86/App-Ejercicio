import { describe, expect, it } from 'vitest';
import { clampRestSeconds, formatDuration, getRestWithAdjustment } from '../utils/timer';

describe('timer utilities', () => {
  it('formats seconds as minutes and seconds', () => {
    expect(formatDuration(75)).toBe('1:15');
    expect(formatDuration(5)).toBe('0:05');
  });

  it('keeps rest duration within safe app bounds', () => {
    expect(clampRestSeconds(3)).toBe(15);
    expect(clampRestSeconds(300)).toBe(240);
    expect(clampRestSeconds(75)).toBe(75);
  });

  it('applies user rest adjustments', () => {
    expect(getRestWithAdjustment(75, 15)).toBe(90);
    expect(getRestWithAdjustment(60, -60)).toBe(15);
  });
});
