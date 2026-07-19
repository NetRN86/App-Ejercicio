import { PauseCircle, SkipForward } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { ExerciseAnimation } from '../components/ExerciseAnimation';
import { PreSetPractice } from '../components/PreSetPractice';
import { ProgressBar } from '../components/ProgressBar';
import { RestTimer } from '../components/RestTimer';
import { WarmupAnimation } from '../components/WarmupAnimation';
import { exercises } from '../data/exercises';
import { warmupStepsByGroup, workoutSessions } from '../data/workouts';
import { getPracticeAttempts } from '../services/practiceStorage';
import { clearActiveWorkout, getWorkoutLogs, saveActiveWorkout } from '../services/storage';
import type { ActiveWorkoutState, CompletedSet, SessionId, UserSettings, WorkoutLog } from '../types';
import { isExerciseUnfamiliar, isTempoPracticeEligible } from '../utils/familiarity';
import { getProgressionSuggestion } from '../utils/progression';
import { getRestWithAdjustment } from '../utils/timer';

interface Props {
  sessionId: SessionId;
  settings: UserSettings;
  resumeState?: ActiveWorkoutState | null;
  onFinish: (log: WorkoutLog) => void;
  onExit: () => void;
}

type Phase = 'warmup' | 'exercise' | 'rest' | 'summary';

export function WorkoutPage({ sessionId, settings, resumeState, onFinish, onExit }: Props) {
  const session = workoutSessions.find((item) => item.id === sessionId) ?? workoutSessions[0];
  const warmupSteps = warmupStepsByGroup[session.group];
  const workoutExercises = useMemo(() => session.exerciseIds.map((id) => exercises.find((item) => item.id === id)).filter(Boolean), [session.exerciseIds]);
  const [phase, setPhase] = useState<Phase>(resumeState ? 'exercise' : 'warmup');
  const [warmupIndex, setWarmupIndex] = useState(0);
  const [warmupRemaining, setWarmupRemaining] = useState(warmupSteps[0].seconds);
  const [exerciseIndex, setExerciseIndex] = useState(resumeState?.currentExerciseIndex ?? 0);
  const [setNumber, setSetNumber] = useState(resumeState?.currentSet ?? 1);
  const [completedSets, setCompletedSets] = useState<CompletedSet[]>(resumeState?.completedSets ?? []);
  const [skippedIds, setSkippedIds] = useState<string[]>(resumeState?.skippedExerciseIds ?? []);
  const [rests, setRests] = useState<number[]>(resumeState?.rests ?? []);
  const [paused, setPaused] = useState(false);
  const [effort, setEffort] = useState(6);
  const [notes, setNotes] = useState('');
  const [startedAt] = useState(resumeState?.startedAt ?? Date.now());
  const [workoutHistory] = useState<WorkoutLog[]>(() => getWorkoutLogs());
  const [unfamiliarIds] = useState<string[]>(() => {
    const attempts = getPracticeAttempts();
    return session.exerciseIds.filter((id) => {
      const exercise = exercises.find((item) => item.id === id);
      return !!exercise && isTempoPracticeEligible(exercise) && isExerciseUnfamiliar(id, workoutHistory, attempts);
    });
  });
  const [practiceDismissedIds, setPracticeDismissedIds] = useState<string[]>([]);

  const currentExercise = workoutExercises[exerciseIndex];
  const progressionSuggestion = currentExercise ? getProgressionSuggestion(currentExercise, workoutHistory) : null;
  const offerPractice = phase === 'exercise' && setNumber === 1 && !!currentExercise
    && unfamiliarIds.includes(currentExercise.id) && !practiceDismissedIds.includes(currentExercise.id);
  const totalSets = workoutExercises.reduce((sum, exercise) => sum + (exercise?.sets ?? 0), 0);
  const completion = totalSets ? (completedSets.length / totalSets) * 100 : 0;

  useEffect(() => {
    if (phase !== 'warmup' || warmupRemaining <= 0) return;
    const id = window.setInterval(() => setWarmupRemaining((value) => Math.max(0, value - 1)), 1000);
    return () => window.clearInterval(id);
  }, [phase, warmupRemaining]);

  function persist(nextExerciseIndex = exerciseIndex, nextSet = setNumber, nextCompleted = completedSets, nextSkipped = skippedIds) {
    const state: ActiveWorkoutState = {
      sessionId,
      startedAt,
      currentExerciseIndex: nextExerciseIndex,
      currentSet: nextSet,
      completedSets: nextCompleted,
      skippedExerciseIds: nextSkipped,
      rests,
    };
    saveActiveWorkout(state);
  }

  function completeWarmupStep() {
    if (warmupIndex >= warmupSteps.length - 1) {
      setPhase('exercise');
      return;
    }
    const next = warmupIndex + 1;
    setWarmupIndex(next);
    setWarmupRemaining(warmupSteps[next].seconds);
  }

  function completeSet() {
    if (!currentExercise) return;
    const nextCompleted = [...completedSets, { exerciseId: currentExercise.id, setNumber, repsTarget: currentExercise.reps, completedAt: new Date().toISOString() }];
    setCompletedSets(nextCompleted);
    setPhase('rest');
    persist(exerciseIndex, setNumber, nextCompleted);
  }

  function continueAfterRest() {
    if (!currentExercise) return;
    if (setNumber < currentExercise.sets) {
      const nextSet = setNumber + 1;
      setSetNumber(nextSet);
      setPhase('exercise');
      persist(exerciseIndex, nextSet);
      return;
    }
    const nextExerciseIndex = exerciseIndex + 1;
    if (nextExerciseIndex >= workoutExercises.length) {
      setPhase('summary');
      return;
    }
    setExerciseIndex(nextExerciseIndex);
    setSetNumber(1);
    setPhase('exercise');
    persist(nextExerciseIndex, 1);
  }

  function skipExercise() {
    if (!currentExercise) return;
    const nextSkipped = [...skippedIds, currentExercise.id];
    const nextExerciseIndex = exerciseIndex + 1;
    setSkippedIds(nextSkipped);
    if (nextExerciseIndex >= workoutExercises.length) {
      setPhase('summary');
    } else {
      setExerciseIndex(nextExerciseIndex);
      setSetNumber(1);
      setPhase('exercise');
    }
    persist(nextExerciseIndex, 1, completedSets, nextSkipped);
  }

  function finishAndSave() {
    const log: WorkoutLog = {
      id: crypto.randomUUID(),
      date: new Date().toISOString(),
      sessionId,
      completedExercises: Array.from(new Set(completedSets.map((set) => set.exerciseId))),
      completedSets,
      durationSeconds: Math.max(1, Math.round((Date.now() - startedAt) / 1000)),
      rests,
      effort,
      notes,
    };
    clearActiveWorkout();
    onFinish(log);
  }

  if (phase === 'warmup') {
    const step = warmupSteps[warmupIndex];
    return (
      <div className="workout-shell">
        <section className="active-card">
          <span className="eyebrow">Calentamiento guiado · paso {warmupIndex + 1} de {warmupSteps.length}</span>
          <h1>{step.name}</h1>
          <p>{step.cue}</p>
          <WarmupAnimation motion={step.motion} label={step.name} />
          <div className="warmup-time">{warmupRemaining}s</div>
          <input aria-label="Tiempo restante de calentamiento" type="range" min="0" max={step.seconds} value={warmupRemaining} onChange={(event) => setWarmupRemaining(Number(event.target.value))} />
          <button className="primary-action" type="button" onClick={completeWarmupStep}>Avanzar</button>
        </section>
      </div>
    );
  }

  if (phase === 'summary') {
    const percent = totalSets ? Math.round((completedSets.length / totalSets) * 100) : 0;
    return (
      <div className="workout-shell">
        <section className="active-card">
          <span className="eyebrow">Resumen</span>
          <h1>Sesión {sessionId} completada</h1>
          <div className="summary-grid">
            <div><span>Series completadas</span><strong>{completedSets.length}</strong></div>
            <div><span>Ejercicios completados</span><strong>{new Set(completedSets.map((set) => set.exerciseId)).size}</strong></div>
            <div><span>Rutina terminada</span><strong>{percent}%</strong></div>
          </div>
          <label>Percepción de esfuerzo: {effort}/10<input type="range" min="1" max="10" value={effort} onChange={(event) => setEffort(Number(event.target.value))} /></label>
          <label>Notas<textarea value={notes} onChange={(event) => setNotes(event.target.value)} placeholder="Cómo te sentiste, molestias, técnica..." /></label>
          <button className="primary-action" type="button" onClick={finishAndSave}>Finalizar y guardar</button>
        </section>
      </div>
    );
  }

  if (!currentExercise) return null;

  return (
    <div className="workout-shell">
      <section className="active-card">
        <div className="section-heading">
          <div>
            <span className="eyebrow">{session.name} · ejercicio {exerciseIndex + 1} de {workoutExercises.length}{resumeState ? ' · reanudado' : ''}</span>
            <h1>{currentExercise.name}</h1>
          </div>
          <button className="icon-text-button" type="button" onClick={() => setPaused((value) => !value)}><PauseCircle size={18} /> {paused ? 'Reanudar' : 'Pausar'}</button>
        </div>
        <ProgressBar value={completion} label="Progreso total de la sesión" />
        <ExerciseAnimation type={currentExercise.animationType} label={currentExercise.name} />
        <div className="training-grid">
          <div><span>Peso</span><strong>{currentExercise.equipment}</strong></div>
          <div><span>Serie</span><strong>{setNumber} de {currentExercise.sets}</strong></div>
          <div><span>Objetivo</span><strong>{currentExercise.reps}</strong></div>
          <div><span>Músculos</span><strong>{currentExercise.musclesWorked.join(', ')}</strong></div>
        </div>
        {progressionSuggestion && (
          <div className="progression-note" role="status" aria-live="polite">
            <strong>Sugerencia de progresión</strong>
            <p>
              Completaste todas las series de este ejercicio en tus últimas {progressionSuggestion.supportingSessions} sesiones.
              Si hoy te sientes sólido, prueba subir de <strong>{progressionSuggestion.currentTarget}</strong> a <strong>{progressionSuggestion.suggestedTarget}</strong>.
            </p>
          </div>
        )}
        {currentExercise.warning && <p className="warning-text">{currentExercise.warning}</p>}
        <details open>
          <summary>Ver instrucciones</summary>
          <p>{currentExercise.instructions.join(' ')}</p>
          <p><strong>Errores comunes:</strong> {currentExercise.commonMistakes.join(' ')}</p>
        </details>
        {phase === 'rest' ? (
          <>
            <RestTimer seconds={getRestWithAdjustment(currentExercise.restSeconds, settings.restAdjustmentSeconds)} soundEnabled={settings.soundEnabled} vibrationEnabled={settings.vibrationEnabled} onRecordRest={(seconds) => setRests((value) => [...value, seconds])} onComplete={() => setPaused(true)} />
            <button className="primary-action" type="button" onClick={continueAfterRest}>Continuar</button>
          </>
        ) : offerPractice ? (
          <PreSetPractice exercise={currentExercise} settings={settings} onContinue={() => setPracticeDismissedIds((value) => [...value, currentExercise.id])} />
        ) : (
          <div className="action-row">
            <button className="primary-action" type="button" disabled={paused} onClick={completeSet}>Serie completada</button>
            <button className="ghost-button" type="button" onClick={skipExercise}><SkipForward size={18} /> Omitir ejercicio</button>
          </div>
        )}
        <button type="button" className="quiet-link" onClick={onExit}>Salir al inicio</button>
      </section>
    </div>
  );
}
