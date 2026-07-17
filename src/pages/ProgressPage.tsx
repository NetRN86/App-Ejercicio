import { BarChart3, Clock, Gamepad2, ListChecks, Repeat, Target } from 'lucide-react';
import { WeeklyCalendar } from '../components/WeeklyCalendar';
import { exercises } from '../data/exercises';
import { workoutSessions } from '../data/workouts';
import { getPracticeAttempts } from '../services/practiceStorage';
import type { WorkoutLog } from '../types';
import { countActiveWeekStreak, getWeeklyCounts } from '../utils/progress';
import { formatDuration } from '../utils/timer';

export function ProgressPage({ logs }: { logs: WorkoutLog[] }) {
  const totalSets = logs.reduce((sum, log) => sum + log.completedSets.length, 0);
  const totalTime = logs.reduce((sum, log) => sum + log.durationSeconds, 0);
  const weeklyCounts = Object.entries(getWeeklyCounts(logs)).slice(-8);
  const streak = countActiveWeekStreak(logs);
  const maxCount = Math.max(1, ...weeklyCounts.map(([, count]) => count));

  const practiceAttempts = getPracticeAttempts();
  const avgAccuracy = practiceAttempts.length
    ? Math.round(practiceAttempts.reduce((sum, attempt) => sum + attempt.accuracyScore, 0) / practiceAttempts.length)
    : 0;
  const bestByExercise = new Map<string, number>();
  for (const attempt of practiceAttempts) {
    const current = bestByExercise.get(attempt.exerciseId) ?? 0;
    if (attempt.accuracyScore > current) bestByExercise.set(attempt.exerciseId, attempt.accuracyScore);
  }
  const practicedExercises = Array.from(bestByExercise.entries())
    .map(([exerciseId, bestAccuracy]) => ({ exercise: exercises.find((item) => item.id === exerciseId), bestAccuracy }))
    .filter((item): item is { exercise: NonNullable<typeof item.exercise>; bestAccuracy: number } => Boolean(item.exercise))
    .sort((a, b) => b.bestAccuracy - a.bestAccuracy);

  return (
    <div className="page-stack">
      <div className="section-heading">
        <div>
          <span className="eyebrow">Constancia sin métricas inventadas</span>
          <h1>Progreso</h1>
        </div>
      </div>
      <div className="stats-grid">
        <div><Repeat aria-hidden="true" /><span>Racha de semanas activas</span><strong>{streak}</strong></div>
        <div><ListChecks aria-hidden="true" /><span>Total de sesiones</span><strong>{logs.length}</strong></div>
        <div><BarChart3 aria-hidden="true" /><span>Total de series</span><strong>{totalSets}</strong></div>
        <div><Clock aria-hidden="true" /><span>Tiempo acumulado</span><strong>{formatDuration(totalTime)}</strong></div>
      </div>
      <section className="content-band">
        <h2>Calendario reciente</h2>
        <WeeklyCalendar logs={logs} />
      </section>
      <section className="content-band">
        <h2>Constancia semanal</h2>
        <div className="bar-chart" aria-label="Grafica simple de entrenamientos por semana">
          {weeklyCounts.length === 0 && <p>Aún no hay sesiones guardadas.</p>}
          {weeklyCounts.map(([week, count]) => (
            <div key={week}>
              <span style={{ height: `${Math.max(12, (count / maxCount) * 100)}%` }} />
              <strong>{count}</strong>
              <small>S{week.split('-')[1]}</small>
            </div>
          ))}
        </div>
      </section>
      <section className="content-band">
        <h2>Práctica de ritmo</h2>
        {practiceAttempts.length === 0 ? (
          <p>Aún no has practicado ningún ejercicio. Ve a la pestaña Practicar para empezar.</p>
        ) : (
          <>
            <div className="stats-grid">
              <div><Gamepad2 aria-hidden="true" /><span>Intentos de práctica</span><strong>{practiceAttempts.length}</strong></div>
              <div><Target aria-hidden="true" /><span>Precisión promedio</span><strong>{avgAccuracy}%</strong></div>
            </div>
            <div className="compact-list">
              {practicedExercises.map(({ exercise, bestAccuracy }) => (
                <div key={exercise.id}><strong>{exercise.name}</strong><span>Mejor precisión: {bestAccuracy}%</span></div>
              ))}
            </div>
          </>
        )}
      </section>
      <section className="content-band">
        <h2>Historial por fecha</h2>
        <div className="history-list">
          {logs.length === 0 && <p>No hay entrenamientos guardados todavía.</p>}
          {logs.map((log) => {
            const session = workoutSessions.find((item) => item.id === log.sessionId);
            const sessionLabel = session ? (session.name.includes(session.group) ? session.name : `${session.name} · ${session.group}`) : `Sesión ${log.sessionId}`;
            return (
            <article key={log.id}>
              <strong>{sessionLabel} · {new Date(log.date).toLocaleString('es-MX')}</strong>
              <span>{log.completedSets.length} series · esfuerzo {log.effort}/10 · {formatDuration(log.durationSeconds)}</span>
              {log.notes && <p>{log.notes}</p>}
            </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}
