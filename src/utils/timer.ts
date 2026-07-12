export function clampRestSeconds(seconds: number) {
  return Math.max(15, Math.min(240, seconds));
}

export function formatDuration(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

export function getRestWithAdjustment(baseSeconds: number, adjustment: number) {
  return clampRestSeconds(baseSeconds + adjustment);
}
