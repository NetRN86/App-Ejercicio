import { useMemo, useState } from 'react';
import { Gamepad2 } from 'lucide-react';
import { exercises } from '../data/exercises';
import { PracticeMetronome } from '../components/PracticeMetronome';
import { getBestAccuracyForExercise, getPracticeAttempts, savePracticeAttempt } from '../services/practiceStorage';
import { scoreRhythmAttempt } from '../utils/rhythm';
import type { PracticeAttempt, UserSettings } from '../types';

const TARGET_REPS = 6;
const TEMPOS = [
  { id: 'lento', label: 'Lento', intervalMs: 2500 },
  { id: 'moderado', label: 'Moderado', intervalMs: 2000 },
  { id: 'rapido', label: 'Rápido', intervalMs: 1500 },
];

interface Props {
  settings: UserSettings;
}

export function PracticePage({ settings }: Props) {
  const [exerciseId, setExerciseId] = useState(exercises[0]?.id ?? '');
  const [tempoId, setTempoId] = useState(TEMPOS[1].id);
  const [running, setRunning] = useState(false);
  const [startTimeMs, setStartTimeMs] = useState<number | null>(null);
  const [taps, setTaps] = useState<number[]>([]);
  const [lastResult, setLastResult] = useState<PracticeAttempt | null>(null);
  const [attempts, setAttempts] = useState(() => getPracticeAttempts());

  const exercise = exercises.find((item) => item.id === exerciseId) ?? exercises[0];
  const tempo = TEMPOS.find((item) => item.id === tempoId) ?? TEMPOS[1];
  const bestAccuracy = useMemo(() => (exercise ? getBestAccuracyForExercise(exercise.id) : null), [exercise, attempts]);

  function startPractice() {
    setLastResult(null);
    setTaps([]);
    setStartTimeMs(Date.now());
    setRunning(true);
  }

  function registerTap(timestampMs: number) {
    if (!running || !exercise) return;
    const nextTaps = [...taps, timestampMs];
    setTaps(nextTaps);

    if (nextTaps.length >= TARGET_REPS && startTimeMs !== null) {
      setRunning(false);
      const result = scoreRhythmAttempt(nextTaps, startTimeMs, tempo.intervalMs);
      const attempt: PracticeAttempt = {
        id: `practice-${Date.now()}`,
        exerciseId: exercise.id,
        date: new Date().toISOString(),
        reps: TARGET_REPS,
        accuracyScore: result.accuracyScore,
        feedback: result.feedback,
      };
      setLastResult(attempt);
      setAttempts(savePracticeAttempt(attempt));
    }
  }

  if (!exercise) return null;

  return (
    <div className="page-stack">
      <div className="section-heading">
        <div>
          <span className="eyebrow">Practica antes de usar peso real</span>
          <h1>Modo de práctica</h1>
        </div>
      </div>
      <p>
        Sigue el ritmo visual marcando cada repetición simulada. Esto no evalúa tu técnica real,
        solo te ayuda a interiorizar el tempo del ejercicio antes de hacerlo con mancuernas.
      </p>

      <div className="content-band">
        <label className="practice-field">
          <span>Ejercicio</span>
          <select value={exerciseId} onChange={(event) => { setExerciseId(event.target.value); setRunning(false); }} disabled={running}>
            {exercises.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
          </select>
        </label>
        <label className="practice-field">
          <span>Cadencia</span>
          <select value={tempoId} onChange={(event) => { setTempoId(event.target.value); setRunning(false); }} disabled={running}>
            {TEMPOS.map((item) => <option key={item.id} value={item.id}>{item.label}</option>)}
          </select>
        </label>
        {bestAccuracy !== null && <p className="product-note">Mejor precisión registrada: {bestAccuracy}%</p>}

        {!running && (
          <button type="button" className="primary-action" onClick={startPractice}>
            <Gamepad2 size={18} aria-hidden /> Comenzar práctica
          </button>
        )}

        {running && (
          <PracticeMetronome
            intervalMs={tempo.intervalMs}
            targetReps={TARGET_REPS}
            running={running}
            onTap={registerTap}
            repsDone={taps.length}
            soundEnabled={settings.soundEnabled}
            vibrationEnabled={settings.vibrationEnabled}
          />
        )}

        {lastResult && (
          <div className="practice-result">
            <p className="practice-score">{lastResult.accuracyScore}% de precisión de ritmo</p>
            <p>{lastResult.feedback}</p>
          </div>
        )}
      </div>
    </div>
  );
}
