import { Gamepad2 } from 'lucide-react';
import { useState } from 'react';
import type { Exercise, PracticeAttempt, UserSettings } from '../types';
import { savePracticeAttempt } from '../services/practiceStorage';
import { scoreRhythmAttempt } from '../utils/rhythm';
import { PracticeMetronome } from './PracticeMetronome';

interface Props {
  exercise: Exercise;
  settings: UserSettings;
  onContinue: () => void;
}

const TARGET_REPS = 6;
const INTERVAL_MS = 2000;

type Stage = 'offer' | 'running' | 'result';

export function PreSetPractice({ exercise, settings, onContinue }: Props) {
  const [stage, setStage] = useState<Stage>('offer');
  const [startTimeMs, setStartTimeMs] = useState(0);
  const [taps, setTaps] = useState<number[]>([]);
  const [result, setResult] = useState<PracticeAttempt | null>(null);

  function startPractice() {
    setTaps([]);
    setStartTimeMs(Date.now());
    setStage('running');
  }

  function registerTap(timestampMs: number) {
    const nextTaps = [...taps, timestampMs];
    setTaps(nextTaps);
    if (nextTaps.length >= TARGET_REPS) {
      const score = scoreRhythmAttempt(nextTaps, startTimeMs, INTERVAL_MS);
      const attempt: PracticeAttempt = {
        id: `practice-${Date.now()}`,
        exerciseId: exercise.id,
        date: new Date().toISOString(),
        reps: TARGET_REPS,
        accuracyScore: score.accuracyScore,
        feedback: score.feedback,
      };
      savePracticeAttempt(attempt);
      setResult(attempt);
      setStage('result');
    }
  }

  if (stage === 'offer') {
    return (
      <div className="pre-set-practice">
        <p><strong>¿Primera vez con este ejercicio?</strong> Practica el ritmo sin peso antes de tu primera serie, para interiorizar el tempo del movimiento.</p>
        <div className="action-row">
          <button type="button" className="primary-action" onClick={startPractice}>
            <Gamepad2 size={18} aria-hidden /> Practicar el ritmo
          </button>
          <button type="button" className="ghost-button" onClick={onContinue}>Continuar sin practicar</button>
        </div>
      </div>
    );
  }

  if (stage === 'running') {
    return (
      <div className="pre-set-practice">
        <p>Marca cada repetición simulada al ritmo del pulso, sin peso en las manos.</p>
        <PracticeMetronome
          intervalMs={INTERVAL_MS}
          targetReps={TARGET_REPS}
          running
          onTap={registerTap}
          repsDone={taps.length}
          soundEnabled={settings.soundEnabled}
          vibrationEnabled={settings.vibrationEnabled}
        />
      </div>
    );
  }

  return (
    <div className="pre-set-practice">
      <div className="practice-result">
        <p className="practice-score">{result?.accuracyScore}% de precisión de ritmo</p>
        <p>{result?.feedback}</p>
      </div>
      <button type="button" className="primary-action" onClick={onContinue}>Continuar con la serie</button>
    </div>
  );
}
