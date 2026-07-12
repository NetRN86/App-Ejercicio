import { useEffect, useState } from 'react';

interface Props {
  intervalMs: number;
  targetReps: number;
  running: boolean;
  onTap: (timestampMs: number) => void;
  repsDone: number;
}

export function PracticeMetronome({ intervalMs, targetReps, running, onTap, repsDone }: Props) {
  const [beat, setBeat] = useState(0);

  useEffect(() => {
    if (!running) return;
    const id = window.setInterval(() => setBeat((value) => value + 1), intervalMs);
    return () => window.clearInterval(id);
  }, [running, intervalMs]);

  return (
    <div className="practice-metronome">
      <div className={running ? 'practice-pulse is-running' : 'practice-pulse'} style={{ animationDuration: `${intervalMs}ms` }} key={beat} aria-hidden />
      <p className="practice-progress">{repsDone} de {targetReps} repeticiones marcadas</p>
      <button
        type="button"
        className="primary-action"
        disabled={!running || repsDone >= targetReps}
        onClick={() => onTap(Date.now())}
      >
        Marcar repetición
      </button>
    </div>
  );
}
