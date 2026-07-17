import { PlayCircle, X } from 'lucide-react';
import { workoutSessions } from '../data/workouts';
import type { ActiveWorkoutState } from '../types';

interface Props {
  state: ActiveWorkoutState;
  onResume: () => void;
  onDiscard: () => void;
}

export function ResumeWorkoutBanner({ state, onResume, onDiscard }: Props) {
  const session = workoutSessions.find((item) => item.id === state.sessionId);

  return (
    <div className="install-banner resume-banner" role="complementary" aria-label="Entrenamiento sin terminar">
      <PlayCircle size={20} aria-hidden />
      <p>Tienes un entrenamiento sin terminar{session ? `: ${session.name} · ${session.group}` : ''}.</p>
      <button type="button" className="primary-small" onClick={onResume}>Reanudar</button>
      <button type="button" className="icon-button" onClick={onDiscard} aria-label="Descartar entrenamiento sin terminar">
        <X size={18} />
      </button>
    </div>
  );
}
