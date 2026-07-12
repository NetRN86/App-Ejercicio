export interface RhythmResult {
  accuracyScore: number;
  perRepOffsetMs: number[];
  feedback: string;
}

/**
 * Compara los momentos en que el usuario marcó cada repetición contra el
 * ritmo objetivo (startTimeMs + intervalMs * n) y calcula qué tan cerca
 * estuvo. No mide el movimiento real, solo el ritmo con el que lo simuló.
 */
export function scoreRhythmAttempt(tapTimestampsMs: number[], startTimeMs: number, intervalMs: number): RhythmResult {
  const perRepOffsetMs = tapTimestampsMs.map((tap, index) => {
    const targetMs = startTimeMs + intervalMs * (index + 1);
    return tap - targetMs;
  });

  if (perRepOffsetMs.length === 0) {
    return { accuracyScore: 0, perRepOffsetMs, feedback: feedbackForScore(0) };
  }

  const avgAbsOffsetMs = perRepOffsetMs.reduce((sum, offset) => sum + Math.abs(offset), 0) / perRepOffsetMs.length;
  const accuracyScore = Math.round(Math.max(0, 100 - (avgAbsOffsetMs / intervalMs) * 100));

  return { accuracyScore, perRepOffsetMs, feedback: feedbackForScore(accuracyScore) };
}

export function feedbackForScore(accuracyScore: number): string {
  if (accuracyScore >= 85) return 'Excelente ritmo. Ya conoces el tempo de este ejercicio.';
  if (accuracyScore >= 60) return 'Buen ritmo. Practica un poco más antes de usar peso real.';
  return 'Vas rápido o lento respecto al tempo. Repite la práctica antes de usar peso real.';
}
